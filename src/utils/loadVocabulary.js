// VIS-2-T02 — ONE vocabulary for the load facts a customer reads.
//
// WHY THIS FILE EXISTS. Phase 0 found the cabinet saying three different things
// about the same fact, and saying most of them by saying nothing:
//
//   - the dispatched price was "Transport (carrier)" on the order detail,
//     " carrier" on the dealer dashboard, and absent from the order list;
//   - an unassigned carrier rendered as an empty cell on one surface, a hidden
//     card on another, and nothing at all on a third;
//   - an absent price rendered as '' in a list where sibling rows showed money.
//
// The owner's ruling (2026-08-05) is that absent values are said in WORDS, on
// every surface, and that the words are decided once. That is this module. A
// second copy of any string below is the drift these constants exist to stop.
//
// WHAT IS DELIBERATELY NOT HERE: '$0'. A zero is a claim that the price is
// nothing; an absent price is a statement that we do not know it yet. The
// formatters return null for absent and "$0" for an actual zero, and callers
// render PRICE_NOT_SET for the first. Collapsing the two is the exact defect
// VIS-1 found upstream, where an order carried $10 backed by no assignment.

import { formatLoadDate } from './loadDates';
import { ORDER_STATUS, STATUS_PIPELINE } from './orderStatus';

/** No carrier is carrying this load yet. Never an empty cell. */
export const CARRIER_NOT_ASSIGNED = 'Carrier not assigned yet';

/**
 * No price is known yet. Distinct from a price that is genuinely zero.
 *
 * EXB-1-T01 REWORDED THIS. It read "Not priced yet", and the owner's objection
 * is exact: that sentence describes Y7's diligence — as though someone had not
 * got round to pricing the load — where the truth is a fact about the load's
 * progress. The cabinet's price comes from a carrier assignment and from
 * nothing else (VIS-2-T06), so an absent price means precisely one thing, and
 * it is now the thing that is said.
 *
 * It also stops contradicting the line directly above it on the same row:
 * `CARRIER_NOT_ASSIGNED` already says no carrier is on this load. Two silences
 * about one cause now read as one statement instead of two symptoms.
 */
export const PRICE_NOT_SET = 'Awaiting a carrier';

// The owner's wording, verbatim. The distinction is load-bearing: Y7 has no
// carrier-declared date today (all populated scheduled_* values were typed by a
// Y7 operator, and the columns that would hold a carrier's own declaration are
// empty), so saying "the dates the carrier declared" would be false. The
// `carrier` branch exists because Central Dispatch does expose a genuinely
// carrier-declared date and those columns may be populated later; it is
// display-only and no sync is built for it.
export const DATE_NOTES = {
  y7: 'These are the dates Y7 arranged with the carrier; they can change — Y7 is a broker and does not control the carrier’s schedule.',
  carrier: 'These are the dates the carrier declared; they can change — Y7 is a broker and does not control the carrier’s schedule.',
};

/**
 * Money from an integer cent amount.
 * @returns {string|null} formatted dollars, or null when the amount is absent.
 *   ZERO IS NOT ABSENT: 0 returns "$0", so a real zero can never be mistaken
 *   for an unknown price by a caller that only checks falsiness.
 */
export function moneyFromCents(cents) {
  if (cents == null) return null;
  return formatUsd(cents / 100);
}

// A DEFECT INHERITED AND FIXED RATHER THAN COPIED. The version this replaces
// used `minimumFractionDigits: 0, maximumFractionDigits: 2`, which renders
// 1600.50 as "$1,600.5" — a money figure with one decimal place, which reads as
// a typo to anyone looking at a price. Whole amounts stay clean ("$1,600") and
// anything with cents gets both digits ("$1,600.50"). Prices are whole dollars
// on almost every load today, which is exactly why this went unnoticed.
function formatUsd(amount) {
  const hasCents = Math.abs(amount * 100 - Math.round(amount) * 100) > 0.001;
  return `$${amount.toLocaleString('en-US', {
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: 2,
  })}`;
}

/**
 * Money from a dollar amount. The customer order endpoints divide by 100
 * server-side, so `dispatched_price` and `final_price` arrive in dollars while
 * /all-loads sends cents. Two formatters rather than one guessed unit: a money
 * figure travels with its unit or it does not travel.
 * @returns {string|null} formatted dollars, or null when absent. 0 returns "$0".
 */
export function moneyFromDollars(dollars) {
  if (dollars == null) return null;
  const n = typeof dollars === 'number' ? dollars : Number(dollars);
  if (!Number.isFinite(n)) return null;
  return formatUsd(n);
}

/**
 * EXB-1-T01 — WHAT CENTRAL DISPATCH REPORTS, WHEN Y7 HAS NOT RECORDED IT YET.
 *
 * THE DEFECT. Eight of the live exporter's nine loads have no carrier
 * assignment. The admin BOARD shows a dispatched price for five of them, read
 * from `cd_dispatch_prices`; the cabinet showed nothing, because since VIS-2-T06
 * it reads the assignment with no fallback. The customer was looking at
 * "Awaiting a carrier" on a load Central Dispatch says is being hauled by B&N
 * TRANSPORTATION for $340. One load, two screens, two answers.
 *
 * THIS IS NOT A FALLBACK AND MUST NEVER BECOME ONE. `carrier_price_cents` is
 * Y7's own record and stays exactly as VIS-2 left it. These are separate server
 * keys carrying a different claim — *Central Dispatch reports this*, not *Y7
 * agreed this* — so no `||` chain can ever collapse the two into one number.
 * If you find yourself writing `carrierPrice || cdPrice`, that is the defect.
 *
 * REFUSES RATHER THAN DEGRADES, the same contract the board's `formatCdCarrier`
 * has: no price, or no as-of date, returns null and nothing renders. Rule 9 —
 * a fact somebody else maintains renders WITH the date we observed it or it does
 * not render at all. A price attributed to Central Dispatch with no date is an
 * assertion; with a date it is evidence, and the customer can see for himself
 * whether it is a week old.
 *
 * @returns {{price: string, carrier: string|null, asOf: string}|null}
 */
export function formatCdDispatch(load) {
  const cents = load?.cd_price_cents;
  const price = moneyFromCents(cents);
  if (price == null) return null;
  const asOf = formatLoadDate(load?.cd_price_as_of);
  if (!asOf) return null;
  const carrier = (load?.cd_carrier_name || '').trim();
  return { price, carrier: carrier || null, asOf };
}

/** The one wording for CD attribution. A second copy of this string is drift. */
export const CD_ATTRIBUTION = 'reported by Central Dispatch';

/**
 * Is a carrier expected on an order at this status yet?
 *
 * Saying "carrier not assigned yet" on a quote request is noise, not honesty —
 * nobody expects a carrier before the order is confirmed, and a warning that
 * fires when nothing is wrong teaches the reader to ignore it. Terminal-negative
 * statuses (declined / cancelled / expired / rejected) are absent from
 * STATUS_PIPELINE and so answer false, which is right: no carrier is coming.
 *
 * Keyed off the canonical pipeline rather than a hand-listed set, so a new
 * status cannot silently fall outside it.
 */
export function carrierExpected(status) {
  const at = STATUS_PIPELINE.indexOf((status || '').toLowerCase());
  if (at === -1) return false;
  return at >= STATUS_PIPELINE.indexOf(ORDER_STATUS.CONFIRMED);
}
