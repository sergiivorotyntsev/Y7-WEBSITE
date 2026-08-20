import { colors } from '../theme';

/**
 * Canonical order status enum, labels, colors, and badge helper.
 * Single source of truth for status display across the app.
 */
export const ORDER_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
  LINKED: 'linked',
  QUOTED: 'quoted',
  CONFIRMED: 'confirmed',
  DECLINED: 'declined',
  DISPATCHED: 'dispatched',
  LISTED: 'listed',
  PICKED_UP: 'picked_up',
  IN_TRANSIT: 'in_transit',
  DELIVERED: 'delivered',
  COMPLETED: 'completed',
  EXPIRED: 'expired',
  CANCELLED: 'cancelled',
};

/* STAT-W1-T03 — THIS MAP IS NOW A FALLBACK, NOT THE DECISION.
 *
 * WHAT IT WAS. A second customer-facing status vocabulary, serving the
 * individual dashboard, EVERY order-detail page (both customer types) and the
 * public Track page — while `services/load_status_vocabulary.py` in TRANSPORT
 * called itself "the ONE customer-facing status vocabulary" and served only the
 * B2B list. Measured, 2026-08-20: `listed` was "Sourcing New Carrier" here and
 * "Posted" there; `dispatched` was "Carrier Assigned" here and "Dispatched"
 * there. A dealer read one word in their list and the other on the same order's
 * detail page, one click later.
 *
 * WHY IT IS NOT SIMPLY DELETED. The two repos cannot share a module, and a
 * BETTER COPY is still a copy — rule 20's "born identical, latent" mode, which
 * passes every test until the day somebody edits one side. So the fix is not to
 * synchronise two maps; it is to stop the client deciding at all.
 *
 * WHAT HAPPENS NOW. `/api/portal/data/orders` and `/api/portal/data/orders/{id}`
 * send `status_label` / `status_display` / `status_phase` / `status_active`,
 * resolved server-side by the one vocabulary. Render those — `labelFor()` below
 * does it — and this map is reached only when a payload predates the field.
 *
 * THE DUPLICATION IS DOCUMENTED AT BOTH ENDS, per the sprint brief: see the
 * header of `services/load_status_vocabulary.py` (TRANSPORT) for the other half.
 * There is no automated cross-repo guard and there cannot be one from here; what
 * replaces it is that the server is the only writer of the words a customer
 * sees, so a drift in this file changes nothing a customer reads.
 */
export const STATUS_LABELS = {
  [ORDER_STATUS.PENDING]: 'Quote Requested',
  [ORDER_STATUS.ACCEPTED]: 'Accepted',
  [ORDER_STATUS.REJECTED]: 'Rejected',
  [ORDER_STATUS.LINKED]: 'Carrier Matched',
  [ORDER_STATUS.QUOTED]: 'Quote Sent',
  [ORDER_STATUS.CONFIRMED]: 'Confirmed',
  [ORDER_STATUS.DECLINED]: 'Declined',
  [ORDER_STATUS.DISPATCHED]: 'Carrier Assigned',
  [ORDER_STATUS.LISTED]: 'Sourcing New Carrier',
  [ORDER_STATUS.PICKED_UP]: 'Picked Up',
  [ORDER_STATUS.IN_TRANSIT]: 'In Transit',
  [ORDER_STATUS.DELIVERED]: 'Delivered',
  [ORDER_STATUS.COMPLETED]: 'Completed',
  [ORDER_STATUS.EXPIRED]: 'Expired',
  [ORDER_STATUS.CANCELLED]: 'Cancelled',
};

export const STATUS_COLORS = {
  [ORDER_STATUS.PENDING]: '#6c757d',
  [ORDER_STATUS.ACCEPTED]: '#28a745',
  [ORDER_STATUS.REJECTED]: '#dc3545',
  [ORDER_STATUS.LINKED]: '#17a2b8',
  [ORDER_STATUS.QUOTED]: '#0d6efd',
  [ORDER_STATUS.CONFIRMED]: '#28a745',
  [ORDER_STATUS.DECLINED]: '#dc3545',
  [ORDER_STATUS.DISPATCHED]: '#6f42c1',
  [ORDER_STATUS.LISTED]: '#fd7e14',
  [ORDER_STATUS.PICKED_UP]: '#17a2b8',
  [ORDER_STATUS.IN_TRANSIT]: '#fd7e14',
  [ORDER_STATUS.DELIVERED]: '#198754',
  [ORDER_STATUS.COMPLETED]: '#198754',
  [ORDER_STATUS.EXPIRED]: '#adb5bd',
  [ORDER_STATUS.CANCELLED]: '#adb5bd',
};

/* SPRINT-W7 C0: canonical status -> V2 chip-variant mapping (owner-ruled
   four-variant system in src/styles/v2/portal.module.css — blue/purple
   semantics collapse into ink):
     ink  = neutral / informational progress
     pine = terminal success
     red  = danger / action-required only
     soft = pending / attention (low-alpha red)
   C1+ pages consume this instead of STATUS_COLORS; the bootstrap colors
   above remain only for not-yet-migrated surfaces. */
export const STATUS_CHIP_VARIANT = {
  [ORDER_STATUS.PENDING]: 'soft',
  [ORDER_STATUS.QUOTED]: 'soft',
  [ORDER_STATUS.ACCEPTED]: 'ink',
  [ORDER_STATUS.LINKED]: 'ink',
  [ORDER_STATUS.CONFIRMED]: 'ink',
  [ORDER_STATUS.DISPATCHED]: 'ink',
  [ORDER_STATUS.LISTED]: 'ink',
  [ORDER_STATUS.PICKED_UP]: 'ink',
  [ORDER_STATUS.IN_TRANSIT]: 'ink',
  [ORDER_STATUS.DELIVERED]: 'pine',
  [ORDER_STATUS.COMPLETED]: 'pine',
  [ORDER_STATUS.REJECTED]: 'red',
  [ORDER_STATUS.DECLINED]: 'red',
  [ORDER_STATUS.CANCELLED]: 'red',
  // C2 gate correction (owner): expired is action-adjacent, not neutral.
  [ORDER_STATUS.EXPIRED]: 'soft',
};

export const CANCELLATION_REASON_LABELS = {
  carrier_refused: 'Carrier became unavailable',
  carrier_broke_down: 'Carrier mechanical issue',
  no_show: 'Carrier did not arrive',
  other: 'Other reason',
  // NEX-7 (1d): board-side fall-through codes — the operator's internal note
  // never reaches the customer; these curated lines do.
  carrier_backed_out: 'Carrier became unavailable — we are sourcing a replacement',
  status_reverted: 'Order status was corrected by our team',
  // CUST-1-T01: never-quoted orders expire 48h after creation (exporters exempt).
  not_confirmed_in_time: 'Request expired — it was not confirmed within 2 days',
};

/** Ordered list of statuses for timeline progression.
 * NEX-7 (NEX-4 W9 / NEX-6 Q14): 'listed' ranks between confirmed and
 * dispatched. Before this, indexOf('listed') was -1 and the tracker rendered
 * every step hollow ("Waiting...") at the exact moment a carrier backed out.
 * Renderers treat it as a TRANSIENT step: shown only while current, never as a
 * permanent milestone every order appears to pass through. */
export const STATUS_PIPELINE = [
  ORDER_STATUS.PENDING,
  ORDER_STATUS.QUOTED,
  ORDER_STATUS.CONFIRMED,
  ORDER_STATUS.LISTED,
  ORDER_STATUS.DISPATCHED,
  ORDER_STATUS.PICKED_UP,
  ORDER_STATUS.IN_TRANSIT,
  ORDER_STATUS.DELIVERED,
  ORDER_STATUS.COMPLETED,
];

// EXP-T1: no-quote pipeline for direct_submit (dealer/exporter) orders — the two
// quote steps are dropped entirely and "pending" reads as "Request Received".
export const NO_QUOTE_PIPELINE = [
  ORDER_STATUS.PENDING,
  ORDER_STATUS.CONFIRMED,
  ORDER_STATUS.LISTED,
  ORDER_STATUS.DISPATCHED,
  ORDER_STATUS.PICKED_UP,
  ORDER_STATUS.IN_TRANSIT,
  ORDER_STATUS.DELIVERED,
  ORDER_STATUS.COMPLETED,
];

export const NO_QUOTE_LABELS = {
  ...STATUS_LABELS,
  [ORDER_STATUS.PENDING]: 'Request Received',
};

/**
 * Returns a styled badge object { label, color, backgroundColor } for a given status.
 * @param {string} status - raw status string from the API
 * @returns {{ label: string, color: string, backgroundColor: string }}
 */
export function getStatusBadge(status) {
  const normalized = (status || '').toLowerCase();
  const label = STATUS_LABELS[normalized] || status || 'Unknown';
  const color = STATUS_COLORS[normalized] || colors.textMuted;
  // Derive a light background from the status color
  const backgroundColor = color + '18'; // ~10% opacity hex suffix
  return { label, color, backgroundColor };
}

/**
 * STAT-W1-T03 — the ONE thing a surface should call to name a status.
 *
 * Prefers what the server resolved (`status_label`), which is produced by
 * `services/load_status_vocabulary.py` from BOTH the order's status and its
 * board load's status. Falls back to the local map only for a payload that
 * predates the field, and to the raw value only if that misses too — never to
 * a blank, because a blank teaches the reader to distrust the screen.
 *
 * @param {object} order - an order row from /api/portal/data/orders[/{id}]
 * @param {object} [opts] - { noQuote: true } for the direct-submit pipeline
 * @returns {string}
 */
export function labelFor(order, opts = {}) {
  if (order && order.status_label) return order.status_label;
  const raw = (order && order.status) || '';
  const map = opts.noQuote ? NO_QUOTE_LABELS : STATUS_LABELS;
  return map[raw] || raw || 'Unknown';
}
