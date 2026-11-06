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

export function deleteUserPermanently(email: string): boolean {
  const normalized = email.trim().toLowerCase();
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
  } else {
    db.prepare(`
      UPDATE users 
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
