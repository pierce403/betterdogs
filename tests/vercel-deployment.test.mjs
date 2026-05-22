import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const firebaseClient = readFileSync(new URL('../lib/firebaseClient.ts', import.meta.url), 'utf8');
const packageJson = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));

test('firebase client uses lazy accessors to avoid import-time crashes during build', () => {
  assert.match(firebaseClient, /let cachedApp: FirebaseApp \| null = null;/);
  assert.match(firebaseClient, /function getOrInitApp\(\): FirebaseApp/);
  assert.match(firebaseClient, /export function getClientAuth\(\): Auth/);
  assert.doesNotMatch(firebaseClient, /export const auth\s*=\s*getAuth\(/);
  assert.doesNotMatch(firebaseClient, /export const db\s*=\s*getFirestore\(/);
});

test('project exposes a vercel-compatible production build script', () => {
  assert.equal(packageJson.scripts.build, 'next build');
});
