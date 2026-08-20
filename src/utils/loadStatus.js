// CAB-LOADS T02 — progress rendering ONLY. The status map moved to the server.
//
// WHAT THIS FILE USED TO BE, AND WHY IT CHANGED.
//
// It held a second copy of the status vocabulary: an 8-stage sequence plus a
// DISPATCH_TO_STAGE table mapping all 18 internal `dispatch_loads` values and a
// branch over the 12 `customer_orders` values. That copy is exactly how the
// incident happened — the cabinet said "Listed" while the admin panel said
// POSTED for the same load, because each surface owned its own map.
//
// The mapping now lives in ONE place, server-side:
//     services/load_status_vocabulary.py   (TRANSPORT)
// and reaches the client as `status` / `label` / `phase` / `active` on every
// item. This module no longer decides what a load's status IS. It only decides
// how to draw the progress a server-supplied status implies.
//
// TWO PHASES, NOT ONE SCALE (owner's ruling, 2026-07-31). Price negotiation
// (Submitted -> Quoted -> Confirmed) and shipping (Posted -> Dispatched ->
// Delivered) are different phases of the business, not points on one axis.
// Email-pipeline loads have no negotiation phase at all — they arrive already
// posted — so they render the shipping sequence only.

export const NEGOTIATION_STAGES = [
  { key: 'SUBMITTED', label: 'Submitted' },
  { key: 'QUOTED', label: 'Quoted' },
  { key: 'CONFIRMED', label: 'Confirmed' },
];

// STAT-W1-T03 — ASSIGNED is a fourth stage, not a relabelling.
//
// The server's vocabulary gained a displayed ASSIGNED ("Carrier Assigned") on
// the owner's B3 ruling: the customer should learn a carrier is committed
// without being told the vehicle is moving. Without a stage for it here,
// `progressFor` would find index < 0 and draw NO sequence at all — a customer
// whose carrier had just been assigned would lose their progress bar entirely,
// which is the silent-in-the-direction-of-success failure this file exists to
// avoid. Mirrors DISPATCH_LOAD_STATUS/LABELS in
// services/load_status_vocabulary.py (TRANSPORT); see that file's header for
// the other half of this documented cross-repo duplication.
export const SHIPPING_STAGES = [
  { key: 'POSTED', label: 'Posted' },
  { key: 'ASSIGNED', label: 'Carrier Assigned' },
  { key: 'DISPATCHED', label: 'Dispatched' },
  { key: 'DELIVERED', label: 'Delivered' },
];

// Terminal displayed values — no progress bar, just a statement.
// Mirrors TERMINAL_DISPLAY in services/load_status_vocabulary.py.
const TERMINAL = new Set(['CLOSED', 'DECLINED', 'EXPIRED', 'CANCELLED']);

/**
 * How to draw one load's progress, from what the SERVER already decided.
 *
 * @param {object} item - a row from GET /api/portal/data/all-loads, carrying
 *   `status` (displayed value), `label`, and `phase` ("negotiation"|"shipping").
 * @returns {{stages: Array, index: number, terminal: boolean, label: string}}
 *   `terminal` = true means render the label alone, no sequence.
 */
export function progressFor(item) {
  const status = String(item?.status || '');
  const label = item?.label || status || 'Status unavailable';

  if (TERMINAL.has(status)) {
    return { stages: [], index: -1, terminal: true, label };
  }

  const stages = item?.phase === 'negotiation' ? NEGOTIATION_STAGES : SHIPPING_STAGES;
  const index = stages.findIndex(s => s.key === status);

  // An unplaceable status (including the server's UNKNOWN sentinel) draws no
  // sequence rather than guessing a position on it. Silence beats a wrong claim
  // about where somebody's car is.
  if (index < 0) {
    return { stages: [], index: -1, terminal: false, label };
  }
  return { stages, index, terminal: false, label };
}
