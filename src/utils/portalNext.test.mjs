// CO5W-T03 — unit test for the ?next= internal-path guard.
// No test framework is configured (frontend rule: no new npm deps), so this is
// a plain node-runnable assertion script:  node src/utils/portalNext.test.mjs
//
// This predicate is the whole security boundary of the return-URL feature: it
// decides which strings the login screen is willing to navigate to after it
// has just authenticated somebody. It is worth pinning the rejections.
import assert from 'node:assert/strict';
import { internalNextPath, loginHrefFor } from './portalNext.js';

let passed = 0;
const check = (name, fn) => { fn(); passed++; console.log(`  ok  ${name}`); };

check('accepts an in-app portal path', () => {
  assert.equal(internalNextPath('/portal/co/requests/42'), '/portal/co/requests/42');
});

check('accepts a portal path carrying a query string', () => {
  assert.equal(internalNextPath('/portal/co/start?t=abc'), '/portal/co/start?t=abc');
});

check('rejects a protocol-relative URL that starts with a slash', () => {
  assert.equal(internalNextPath('//evil.example.com/portal'), null);
});

for (const hostile of [
  'https://evil.example.com/portal',
  'http://evil.example.com',
  'javascript:alert(1)',
  '/dashboard',
  '/',
  '',
  null,
  undefined,
]) {
  check(`rejects ${JSON.stringify(hostile)}`, () => {
    assert.equal(internalNextPath(hostile), null);
  });
}

check('loginHrefFor encodes an internal target', () => {
  assert.equal(
    loginHrefFor('/portal/co/requests/42', '?tab=docs'),
    '/portal/login?next=%2Fportal%2Fco%2Frequests%2F42%3Ftab%3Ddocs',
  );
});

check('loginHrefFor falls back to a bare login for a non-portal path', () => {
  assert.equal(loginHrefFor('/about', ''), '/portal/login');
});

check('loginHrefFor tolerates a missing search string', () => {
  assert.equal(loginHrefFor('/portal/dashboard'), '/portal/login?next=%2Fportal%2Fdashboard');
});

console.log(`\nportalNext: ${passed} assertions passed`);
