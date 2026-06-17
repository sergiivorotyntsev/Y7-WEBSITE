// DEALER-DASH-S1-T03 — Unified load-status mapper (display-only).
//
// The dealer dashboard presents ONE clear progress sequence, but the data
// comes from two separate state machines:
//   - customer_orders.status   (8 values, customer-facing)
//       pending | quoted | confirmed | dispatched | completed
//       + terminal: declined | cancelled | expired
//   - dispatch_loads.status    (18 values, internal dispatch board)
//       DRAFT | POSTED | ASSIGNED | AWAITING_RELEASE | DISPATCHED |
//       PICKED_UP | IN_TRANSIT | DELIVERED | DOCS_* | INVOICED | ... | ARCHIVED
//
// This helper folds both into the dealer-facing sequence below. It is PURE and
// DISPLAY-ONLY — it never writes status, and it never exposes margin / CD
// internals. The orders list endpoint currently returns customer_orders.status
// (+ carrier_name + dispatch_load_id) but NOT the dispatch status, so the
// dispatch leg is derived from carrier presence; the optional `dispatch_status`
// input is honoured when a future slice exposes it (forward-compatible).

export const UNIFIED_STAGES = [
  { key: 'submitted', label: 'Submitted' },
  { key: 'quoted', label: 'Quoted' },
  { key: 'confirmed', label: 'Confirmed' },
  { key: 'listed', label: 'Listed' },
  { key: 'carrier_assigned', label: 'Carrier Assigned' },
  { key: 'picked_up', label: 'Picked Up' },
  { key: 'in_transit', label: 'In Transit' },
  { key: 'delivered', label: 'Delivered' },
];

const STAGE_INDEX = UNIFIED_STAGES.reduce((m, s, i) => { m[s.key] = i; return m; }, {});

// dispatch_loads.status -> unified stage (used only when the API exposes it).
const DISPATCH_TO_STAGE = {
  DRAFT: 'listed',
  POSTED: 'listed',
  ASSIGNED: 'carrier_assigned',
  AWAITING_RELEASE: 'carrier_assigned',
  DISPATCHED: 'carrier_assigned',
  PICKED_UP: 'picked_up',
  IN_TRANSIT: 'in_transit',
  DELIVERED: 'delivered',
  DOCS_REQUESTED: 'delivered',
  DOCS_RECEIVED: 'delivered',
  INVOICED: 'delivered',
  PAYMENT_REQUESTED: 'delivered',
  READY_TO_PAY: 'delivered',
  PAID: 'delivered',
  PAYMENT_RECEIVED: 'delivered',
  ARCHIVED: 'delivered',
};

// customer_orders.status terminal states — shown off the progress bar.
const TERMINAL_LABELS = {
  declined: 'Declined',
  cancelled: 'Cancelled',
  expired: 'Expired',
};

function stage(key) {
  return {
    stageKey: key,
    stageIndex: STAGE_INDEX[key],
    terminal: false,
    label: UNIFIED_STAGES[STAGE_INDEX[key]].label,
  };
}

/**
 * Map an order row to its unified dealer-facing progress stage.
 *
 * @param {object} order - portal order row (status, carrier_name,
 *   dispatch_load_id, and optionally dispatch_status).
 * @returns {{stageKey: string|null, stageIndex: number, terminal: boolean, label: string}}
 *   terminal=true (stageIndex -1) for declined/cancelled/expired.
 */
export function mapUnifiedStage(order) {
  const cs = String(order?.status || '').toLowerCase();
  const ds = order?.dispatch_status
    ? String(order.dispatch_status).toUpperCase()
    : null;

  if (TERMINAL_LABELS[cs]) {
    return { stageKey: null, stageIndex: -1, terminal: true, label: TERMINAL_LABELS[cs] };
  }
  if (cs === 'pending') return stage('submitted');
  if (cs === 'quoted') return stage('quoted');
  if (cs === 'confirmed') return stage('confirmed');
  if (cs === 'completed') return stage('delivered');
  if (cs === 'dispatched') {
    // Prefer the precise dispatch status when the API provides it.
    if (ds && DISPATCH_TO_STAGE[ds]) return stage(DISPATCH_TO_STAGE[ds]);
    // Fallback from what the orders list currently exposes.
    if (order?.carrier_name) return stage('carrier_assigned');
    if (order?.dispatch_load_id) return stage('listed');
    return stage('confirmed');
  }
  // Unknown / new status — fail safe to the earliest stage.
  return stage('submitted');
}
