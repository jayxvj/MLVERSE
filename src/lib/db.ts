// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - node:sqlite is built-in in Node 22+ / 24, typed in newer @types/node
import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

// Ensure data directory exists
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'mlverse.sqlite');
const db = new DatabaseSync(dbPath);

// Enable WAL mode for high durability and concurrent safety across restarts
try {
  db.exec('PRAGMA journal_mode = WAL;');
  db.exec('PRAGMA synchronous = NORMAL;');
} catch (e) {
  console.warn('[DB PRAGMA WARNING]', e);
}

// Initialize SQL tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL COLLATE NOCASE,
    password_hash TEXT NOT NULL,
    salt TEXT NOT NULL,
    full_name TEXT,
    avatar_url TEXT DEFAULT '',
    streak_days INTEGER DEFAULT 1,
    last_active_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS user_progress (
    user_id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL COLLATE NOCASE,
    completed_lessons TEXT DEFAULT '[]',
    completed_modules TEXT DEFAULT '[]',
    bookmarked_lessons TEXT DEFAULT '[]',
    notes TEXT DEFAULT '{}',
    quiz_scores TEXT DEFAULT '{}',
    earned_badges TEXT DEFAULT '[]',
    streak_days INTEGER DEFAULT 1,
    last_active_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
`);

export interface DbUser {
  id: string;
  email: string;
  password_hash: string;
  salt: string;
  full_name: string;
  avatar_url: string;
  streak_days: number;
  last_active_at: string;
  created_at: string;
  updated_at: string;
}

export interface DbUserProgress {
  user_id: string;
  email: string;
  completed_lessons: string; // JSON array
  completed_modules: string; // JSON array
  bookmarked_lessons: string; // JSON array
  notes: string; // JSON object
  quiz_scores: string; // JSON object
  earned_badges: string; // JSON array
  streak_days: number;
  last_active_at: string;
  updated_at: string;
}

export interface ParsedUserProgress {
  completedLessons: string[];
  completedModules: string[];
  bookmarkedLessons: string[];
  notes: Record<string, string>;
  quizScores: Record<string, { score: number; total: number; timestamp: string; badgeId?: string }>;
  earnedBadges: string[];
  streakDays: number;
}

/**
 * Strict RFC-compliant email & domain validation helper
 */
export function validateEmailFormat(rawEmail: string): { valid: boolean; normalized: string; error?: string } {
  if (!rawEmail || typeof rawEmail !== 'string') {
    return { valid: false, normalized: '', error: 'Email address is required.' };
  }

  const normalized = rawEmail.trim().toLowerCase();

  // Basic RFC 5322 regex pattern
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!emailRegex.test(normalized)) {
    return { valid: false, normalized, error: 'Please enter a valid, complete email address (e.g. name@domain.com).' };
  }

  const parts = normalized.split('@');
  if (parts.length !== 2) {
    return { valid: false, normalized, error: 'Email address must contain exactly one "@" symbol.' };
  }

  const [username, domain] = parts;

  // Typo detector for common mistake domains
  const typoMap: Record<string, string> = {
    'gmial.com': 'gmail.com',
    'gamil.com': 'gmail.com',
    'gmal.com': 'gmail.com',
    'gmaill.com': 'gmail.com',
    'yaho.com': 'yahoo.com',
    'hotmial.com': 'hotmail.com',
    'outlok.com': 'outlook.com',
  };

  if (typoMap[domain]) {
    return {
      valid: false,
      normalized,
      error: `Did you mean @${typoMap[domain]}? Please verify your email spelling.`,
    };
  }

  // Gmail-specific validation
  if (domain === 'gmail.com') {
    if (username.length < 6 || username.length > 30) {
      return {
        valid: false,
        normalized,
        error: 'Gmail username must be between 6 and 30 characters long.',
      };
    }

    if (!/^[a-z0-9.]+$/.test(username)) {
      return {
        valid: false,
        normalized,
        error: 'Gmail usernames may only contain letters (a-z), numbers (0-9), and periods (.).',
      };
    }

    if (username.startsWith('.') || username.endsWith('.')) {
      return {
        valid: false,
        normalized,
        error: 'Gmail username cannot start or end with a period.',
      };
    }

    if (username.includes('..')) {
      return {
        valid: false,
        normalized,
        error: 'Gmail username cannot contain consecutive periods.',
      };
    }
  }

  return { valid: true, normalized };
}

export function findUserByEmail(email: string): DbUser | null {
  const normalized = email.trim().toLowerCase();
  const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
  const user = stmt.get(normalized) as DbUser | undefined;
  return user || null;
}

export function createUser(params: {
  email: string;
  password: string;
  fullName?: string;
  avatarUrl?: string;
}): { id: string; email: string; fullName: string; avatarUrl: string; streakDays: number } {
  const normalized = params.email.trim().toLowerCase();
  const salt = crypto.randomBytes(16).toString('hex');
  const passwordHash = crypto.scryptSync(params.password, salt, 64).toString('hex');
  const id = 'usr_' + crypto.randomBytes(8).toString('hex');
  const fullName = params.fullName?.trim() || normalized.split('@')[0];
  const avatarUrl = params.avatarUrl || '';

  const stmt = db.prepare(`
    INSERT INTO users (id, email, password_hash, salt, full_name, avatar_url, streak_days, last_active_at)
    VALUES (?, ?, ?, ?, ?, ?, 1, CURRENT_TIMESTAMP)
  `);

  stmt.run(id, normalized, passwordHash, salt, fullName, avatarUrl);

  // Initialize individual empty LMS progress record for the newly registered user
  try {
    const progStmt = db.prepare(`
      INSERT INTO user_progress (user_id, email, completed_lessons, completed_modules, bookmarked_lessons, notes, quiz_scores, earned_badges, streak_days)
      VALUES (?, ?, '[]', '[]', '[]', '{}', '{}', '[]', 1)
    `);
    progStmt.run(id, normalized);
  } catch (err) {
    console.warn('[DB USER PROGRESS INIT WARNING]', err);
  }

  return {
    id,
    email: normalized,
    fullName,
    avatarUrl,
    streakDays: 1,
  };
}

export function verifyUserPassword(
  email: string,
  plainPassword: string
): { success: boolean; error?: string; user?: { id: string; email: string; fullName: string; avatarUrl: string; streakDays: number } } {
  const user = findUserByEmail(email);
  if (!user) {
    return {
      success: false,
      error: 'No account registered with this email address.',
    };
  }

  const hashToVerify = crypto.scryptSync(plainPassword, user.salt, 64).toString('hex');
  const bufActual = Buffer.from(user.password_hash, 'hex');
  const bufExpected = Buffer.from(hashToVerify, 'hex');

  if (bufActual.length !== bufExpected.length || !crypto.timingSafeEqual(bufActual, bufExpected)) {
    return { success: false, error: 'Incorrect password. Please verify your credentials.' };
  }

  // Record active heartbeat
  db.prepare(`UPDATE users SET last_active_at = CURRENT_TIMESTAMP WHERE id = ?`).run(user.id);
  db.prepare(`UPDATE user_progress SET last_active_at = CURRENT_TIMESTAMP WHERE email = ?`).run(user.email);

  return {
    success: true,
    user: {
      id: user.id,
      email: user.email,
      fullName: user.full_name,
      avatarUrl: user.avatar_url,
      streakDays: user.streak_days || 1,
    },
  };
}

export function getUserProgress(email: string): ParsedUserProgress {
  const normalized = email.trim().toLowerCase();
  const user = findUserByEmail(normalized);

  const defaultProgress: ParsedUserProgress = {
    completedLessons: [],
    completedModules: [],
    bookmarkedLessons: [],
    notes: {},
    quizScores: {},
    earnedBadges: [],
    streakDays: user ? user.streak_days || 1 : 1,
  };

  if (!user) return defaultProgress;

  const stmt = db.prepare('SELECT * FROM user_progress WHERE email = ?');
  let row = stmt.get(normalized) as DbUserProgress | undefined;

  if (!row) {
    // Upsert fresh row for user
    try {
      db.prepare(`
        INSERT INTO user_progress (user_id, email, completed_lessons, completed_modules, bookmarked_lessons, notes, quiz_scores, earned_badges, streak_days)
        VALUES (?, ?, '[]', '[]', '[]', '{}', '{}', '[]', ?)
      `).run(user.id, normalized, user.streak_days || 1);

      row = stmt.get(normalized) as DbUserProgress | undefined;
    } catch (e) {
      console.warn('[DB GET PROGRESS INSERT WARNING]', e);
    }
  }

  if (!row) return defaultProgress;

  try {
    return {
      completedLessons: JSON.parse(row.completed_lessons || '[]'),
      completedModules: JSON.parse(row.completed_modules || '[]'),
      bookmarkedLessons: JSON.parse(row.bookmarked_lessons || '[]'),
      notes: JSON.parse(row.notes || '{}'),
      quizScores: JSON.parse(row.quiz_scores || '{}'),
      earnedBadges: JSON.parse(row.earned_badges || '[]'),
      streakDays: row.streak_days || 1,
    };
  } catch (err) {
    console.error('[DB PARSE PROGRESS ERROR]', err);
    return defaultProgress;
  }
}

export function saveUserProgress(
  email: string,
  progress: Partial<ParsedUserProgress>
): boolean {
  const normalized = email.trim().toLowerCase();
  const user = findUserByEmail(normalized);
  if (!user) return false;

  const current = getUserProgress(normalized);

  const completedLessons = JSON.stringify(progress.completedLessons ?? current.completedLessons);
  const completedModules = JSON.stringify(progress.completedModules ?? current.completedModules);
  const bookmarkedLessons = JSON.stringify(progress.bookmarkedLessons ?? current.bookmarkedLessons);
  const notes = JSON.stringify(progress.notes ?? current.notes);
  const quizScores = JSON.stringify(progress.quizScores ?? current.quizScores);
  const earnedBadges = JSON.stringify(progress.earnedBadges ?? current.earnedBadges);
  const streakDays = typeof progress.streakDays === 'number' ? progress.streakDays : current.streakDays;

  const stmt = db.prepare(`
    INSERT INTO user_progress (user_id, email, completed_lessons, completed_modules, bookmarked_lessons, notes, quiz_scores, earned_badges, streak_days, last_active_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT(user_id) DO UPDATE SET
      completed_lessons = excluded.completed_lessons,
      completed_modules = excluded.completed_modules,
      bookmarked_lessons = excluded.bookmarked_lessons,
      notes = excluded.notes,
      quiz_scores = excluded.quiz_scores,
      earned_badges = excluded.earned_badges,
      streak_days = excluded.streak_days,
      last_active_at = CURRENT_TIMESTAMP,
      updated_at = CURRENT_TIMESTAMP
  `);

  const result = stmt.run(
    user.id,
    normalized,
    completedLessons,
    completedModules,
    bookmarkedLessons,
    notes,
    quizScores,
    earnedBadges,
    streakDays
  );

  return result.changes > 0;
}

export function deleteUserPermanently(email: string): boolean {
  const normalized = email.trim().toLowerCase();
  try {
    db.prepare('DELETE FROM user_progress WHERE email = ?').run(normalized);
  } catch (e) {
    console.warn('[DB DELETE USER PROGRESS WARNING]', e);
  }
  const stmt = db.prepare('DELETE FROM users WHERE email = ?');
  const result = stmt.run(normalized);
  return result.changes > 0;
}

export function updateUserActivity(email: string, streakDays?: number): void {
  const normalized = email.trim().toLowerCase();
  if (typeof streakDays === 'number' && streakDays >= 0) {
    db.prepare(`
      UPDATE users 
      SET last_active_at = CURRENT_TIMESTAMP, streak_days = ?, updated_at = CURRENT_TIMESTAMP 
      WHERE email = ?
    `).run(streakDays, normalized);

    db.prepare(`
      UPDATE user_progress 
      SET last_active_at = CURRENT_TIMESTAMP, streak_days = ?, updated_at = CURRENT_TIMESTAMP 
      WHERE email = ?
    `).run(streakDays, normalized);
  } else {
    db.prepare(`
      UPDATE users 
      SET last_active_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP 
      WHERE email = ?
    `).run(normalized);

    db.prepare(`
      UPDATE user_progress 
      SET last_active_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP 
      WHERE email = ?
    `).run(normalized);
  }
}

export function updateUserAvatar(email: string, avatarUrl: string): boolean {
  const normalized = email.trim().toLowerCase();
  const stmt = db.prepare(`
    UPDATE users 
    SET avatar_url = ?, last_active_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP 
    WHERE email = ?
  `);
  const result = stmt.run(avatarUrl, normalized);
  return result.changes > 0;
}
