// CAB-LOADS T03 — regression test for the calendar-day off-by-one.
// Run under a timezone WEST of UTC, where the bug reproduces:
//   TZ=America/New_York node src/utils/loadDates.test.mjs
// (The npm script below sets it; running bare would pass on a UTC machine and
//  prove nothing — which is how this class of bug survives CI.)
import assert from 'node:assert/strict';
import { formatLoadDate } from './loadDates.js';

let passed = 0;
function check(name, fn) { fn(); passed++; console.log(`  ok  ${name}`); }

const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
console.log(`loadDates: running in ${tz}`);

check('a date-only string renders THAT day, not the day before', () => {
  // The exact value the runtime smoke caught rendering as "Aug 2, 2026".
  assert.equal(formatLoadDate('2026-08-03'), 'Aug 3, 2026');
  assert.equal(formatLoadDate('2026-08-06'), 'Aug 6, 2026');
});

check('new Date() alone WOULD have been wrong west of UTC', () => {
  const naive = new Date('2026-08-03')
    .toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const offset = new Date(2026, 7, 3).getTimezoneOffset();
  if (offset > 0) {
    // west of UTC — this is the bug, and the guard above must differ from it
    assert.notEqual(naive, formatLoadDate('2026-08-03'),
      'the naive parse agreed, so this test is not exercising the defect');
  }
});

check('year and month boundaries do not slip', () => {
  assert.equal(formatLoadDate('2026-01-01'), 'Jan 1, 2026');
  assert.equal(formatLoadDate('2025-12-31'), 'Dec 31, 2025');
  assert.equal(formatLoadDate('2026-03-01'), 'Mar 1, 2026');
});

check('a full timestamp still localises normally', () => {
  assert.ok(formatLoadDate('2026-08-03T18:30:00Z'));
});

check('absent input yields null, never a string', () => {
  for (const v of [null, undefined, '']) assert.equal(formatLoadDate(v), null);
});

check('garbage yields null rather than "Invalid Date"', () => {
  assert.equal(formatLoadDate('not-a-date'), null);
  assert.equal(formatLoadDate('2026-13-45'), null);
});

console.log(`loadDates: ${passed} groups passed`);
