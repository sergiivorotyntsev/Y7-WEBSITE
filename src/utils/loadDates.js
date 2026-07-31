// CAB-LOADS T03 — calendar-day formatting for load dates.
//
// Extracted from DealerDashboard so it can be regression-tested. It exists
// because of a defect the runtime smoke caught, not because of tidiness.
//
// THE DEFECT. A pickup date is a CALENDAR DAY, not an instant.
// `new Date('2026-08-03')` parses a date-only ISO string as UTC midnight — the
// ECMAScript spec requires that — and `toLocaleDateString` then renders it in
// local time. Anywhere west of UTC that lands on the PREVIOUS day: the server
// sent 2026-08-03 and the cabinet displayed "Aug 2, 2026" in America/New_York.
// A customer would turn up a day early for their own car.
//
// A bare YYYY-MM-DD is therefore constructed as a LOCAL date. Full timestamps
// (actual pickup/delivery instants) keep normal parsing — those really are
// instants and should localise.

const DATE_ONLY = /^(\d{4})-(\d{2})-(\d{2})$/;

export function formatLoadDate(iso) {
  if (!iso) return null;
  const m = DATE_ONLY.exec(String(iso));
  let d;
  if (m) {
    const [y, mo, day] = [+m[1], +m[2], +m[3]];
    d = new Date(y, mo - 1, day);
    // `new Date(2026, 12, 45)` does not throw — it ROLLS OVER, silently, to
    // "Feb 14, 2027". An out-of-range date must be rejected, not turned into a
    // different and entirely plausible day in front of a customer. Round-trip
    // the components to prove no rollover happened.
    if (d.getFullYear() !== y || d.getMonth() !== mo - 1 || d.getDate() !== day) {
      return null;
    }
  } else {
    d = new Date(iso);
  }
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
