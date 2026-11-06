import assert from 'node:assert';
import {
  findUserByEmail,
  createUser,
  verifyUserPassword,
  deleteUserPermanently,
} from '../src/lib/db.ts';

// @ts-ignore
import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';

console.log('Testing SQL Auth Engine & Account Deletion...');

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

// 5. Delete Account Permanently
const deleted = deleteUserPermanently(testEmail);
assert.strictEqual(deleted, true);

const checkDeleted = findUserByEmail(testEmail);
assert.strictEqual(checkDeleted, null, 'Deleted account must not exist in SQL database');
console.log('✓ Account permanently deleted from database');

// 6. User can re-register after deletion
const reRegistered = createUser({
  email: testEmail,
  password: 'NewPassword#999',
  fullName: 'New Scholar',
});
assert.strictEqual(reRegistered.email, testEmail);

const verifyNew = verifyUserPassword(testEmail, 'NewPassword#999');
assert.strictEqual(verifyNew.success, true);
console.log('✓ Re-registration with new credentials succeeded after deletion');

// Cleanup
db.prepare("DELETE FROM users WHERE email LIKE 'test_%'").run();
db.close();

console.log('ALL SQL AUTH & PERMANENT DELETION CHECKS PASSED SUCCESSFULLY!');
