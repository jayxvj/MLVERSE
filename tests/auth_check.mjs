import assert from 'node:assert';
import {
  findUserByEmail,
  createUser,
  verifyUserPassword,
  purgeInactiveAccounts,
} from '../src/lib/db.ts';

// @ts-ignore
import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';

console.log('Testing SQL Auth Engine & 7-Day Auto-Purge Policy...');

const db = new DatabaseSync(path.join(process.cwd(), 'data', 'mlverse.sqlite'));

const testEmail = `test_scholar_${Date.now()}@mlverse.ai`;
const testPassword = 'Password#123';

// 1. Create user in SQL
const user = createUser({
  email: testEmail,
  password: testPassword,
  fullName: 'Scholar',
});
assert.strictEqual(user.email, testEmail);
console.log('✓ SQL User creation succeeded');

// 2. Query user from SQL
const queried = findUserByEmail(testEmail);
assert.ok(queried);
assert.strictEqual(queried.email, testEmail);
assert.notStrictEqual(queried.password_hash, testPassword, 'Password must be hashed, not plaintext');
console.log('✓ SQL User queried and verified hashed');

// 3. Verify incorrect password fails
const failResult = verifyUserPassword(testEmail, 'WrongPassword');
assert.strictEqual(failResult.success, false);
console.log('✓ Incorrect password correctly rejected');

// 4. Verify correct password succeeds
const passResult = verifyUserPassword(testEmail, testPassword);
assert.strictEqual(passResult.success, true);
assert.strictEqual(passResult.user?.email, testEmail);
console.log('✓ Correct password matched via scrypt hash');

// 5. Test 7-Day Auto-Purge:
// Inactive for 8 days, streak = 5 (< 15) -> MUST BE PURGED
const inactiveEmail = `test_inactive_${Date.now()}@mlverse.ai`;
createUser({ email: inactiveEmail, password: testPassword });

db.prepare(`
  UPDATE users 
  SET last_active_at = datetime('now', '-8 days'), streak_days = 5 
  WHERE email = ?
`).run(inactiveEmail);

const purgedCount = purgeInactiveAccounts();
assert.ok(purgedCount >= 1, 'Inactive account must be purged');

const checkInactive = findUserByEmail(inactiveEmail);
assert.strictEqual(checkInactive, null, 'Purged user must no longer exist in SQL database');
console.log('✓ Inactive account (> 7 days, streak < 15) successfully purged from database');

// 6. Test Retention with 15+ Days Streak:
// Inactive for 8 days, but streak = 18 (>= 15) -> MUST BE RETAINED
const streakEmail = `test_streak_${Date.now()}@mlverse.ai`;
createUser({ email: streakEmail, password: testPassword });

db.prepare(`
  UPDATE users 
  SET last_active_at = datetime('now', '-8 days'), streak_days = 18 
  WHERE email = ?
`).run(streakEmail);

purgeInactiveAccounts();
const checkStreak = findUserByEmail(streakEmail);
assert.ok(checkStreak !== null, 'Account with 15+ continuous streak must be retained');
console.log('✓ Account with 15+ continuous day streak successfully retained across 7 days');

// Cleanup
db.prepare("DELETE FROM users WHERE email LIKE 'test_%'").run();
db.close();

console.log('ALL SQL AUTH & 7-DAY RETENTION POLICY CHECKS PASSED SUCCESSFULLY!');
