import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

function read(relativePath) {
  return readFileSync(new URL(`../${relativePath}`, import.meta.url), 'utf8');
}

test('landing page includes polished hero section and dual CTA links', () => {
  const landingPage = read('app/page.tsx');

  assert.match(landingPage, /Remote dog training with a real coach/);
  assert.match(landingPage, /bg-gradient-to-br/);
  assert.match(landingPage, /href="\/signup"/);
  assert.match(landingPage, /href="\/pricing"/);
  assert.match(landingPage, /Start now/);
  assert.match(landingPage, /View pricing/);
});

test('landing page communicates three core benefits', () => {
  const landingPage = read('app/page.tsx');

  assert.match(landingPage, /Personalized Training Plan/);
  assert.match(landingPage, /Weekly Video Feedback/);
  assert.match(landingPage, /Progress You Can Measure/);

  const benefitCards = landingPage.match(/<article key=\{benefit\.title\}/g) ?? [];
  assert.equal(benefitCards.length, 1);
  assert.match(landingPage, /benefits\.map\(\(benefit\)/);
});

test('global nav keeps core frontend routes discoverable', () => {
  const layout = read('app/layout.tsx');

  assert.match(layout, /Link href='\/'/);
  assert.match(layout, /Link href='\/dashboard'/);
  assert.match(layout, /Link href='\/pricing'/);
});

test('login page supports password and Google auth flows', () => {
  const loginPage = read('app/login/page.tsx');

  assert.match(loginPage, /signInWithEmailAndPassword/);
  assert.match(loginPage, /signInWithPopup/);
  assert.match(loginPage, /type='password'/);
  assert.match(loginPage, /r\.push\('\/dashboard'\)/);
});

test('signup page creates account and redirects to dashboard', () => {
  const signupPage = read('app/signup/page.tsx');

  assert.match(signupPage, /createUserWithEmailAndPassword/);
  assert.match(signupPage, /placeholder='Email'/);
  assert.match(signupPage, /type='password'/);
  assert.match(signupPage, /r\.push\('\/dashboard'\)/);
});

test('.env.example includes required runtime configuration keys', () => {
  const envExample = read('.env.example');

  for (const key of [
    'NEXT_PUBLIC_FIREBASE_API_KEY=',
    'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=',
    'NEXT_PUBLIC_FIREBASE_PROJECT_ID=',
    'FIREBASE_PROJECT_ID=',
    'FIREBASE_CLIENT_EMAIL=',
    'FIREBASE_PRIVATE_KEY=',
    'R2_ACCOUNT_ID=',
    'R2_ACCESS_KEY_ID=',
    'R2_SECRET_ACCESS_KEY=',
    'R2_BUCKET_NAME=',
    'STRIPE_SECRET_KEY=',
    'STRIPE_PRICE_COACH_MONTHLY=',
    'NEXT_PUBLIC_APP_URL=',
  ]) {
    assert.match(envExample, new RegExp(`^${key}`, 'm'));
  }
});
