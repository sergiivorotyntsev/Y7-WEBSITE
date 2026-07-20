// WAC-T01: the ONE source of truth for the account-type choice — the card set
// and the terms each type is shown at the moment of choice. Consumed by EVERY
// account-type-choice surface (LoginCard signup step, Onboarding type step,
// AccountTypeModal). A redesign of any surface must restyle THIS content, not
// re-hardcode its own copy — the pre-WAP $50/$65 four-card set survived in a
// hardcoded LoginCard duplicate for 12 days on prod precisely because the copy
// lived in three places. Anti-drift guard: TRANSPORT
// tests/unit/test_wap_surfaces.py reads this file and fails if the fee copy
// disagrees with services/individual_pricing.py (the fee engine).
//
// Business rules bound here (do not edit copy without Sergii's approval):
// - WAP-T02 (Sergii 2026-07-08): Auction Buyer is MERGED into the individual
//   "Ship My Car" type — auction capabilities are described inside that card,
//   never as a separate choice. Existing auction_buyer accounts keep working.
// - ind_2026 (WAP-T01/WPF-T01): every NEW signup is created with
//   customers.pricing_model = 'ind_2026' (DB default) — broker fee =
//   max($75, 10% of the carrier price), fixed when the carrier is assigned;
//   the carrier is paid COD by the customer at pickup/delivery. Legacy
//   customers keep the $50/$65 wording they signed up under.
// - Dealer terms per dealer_agreement_v1.0.md §3-5: fixed per-order service
//   fee quoted for the account, carrier charges pass through at cost (no
//   markup), per-delivery billing + weekly invoicing, optional AP service.
// - Exporter: NO fee numbers (agreement pending legal) — the EXP1-T05 model
//   copy: register warehouses once, upload docs per order, Y7 assigns the
//   destination warehouse and dispatches.
// - Compliance: "Licensed & Bonded FMCSA Broker" — never "insured".

export const CANONICAL_TYPE_IDS = ['individual', 'dealer', 'exporter'];

// The ind_2026 terms — MUST match services/individual_pricing.py
// (IND_2026_FLOOR_CENTS = 7500, IND_2026_RATE = 0.10) and the v2.1 agreement.
export const IND_2026_FEE_LINE = 'Broker fee: $75 minimum or 10% of carrier price';
export const IND_2026_COD_LINE = 'Carrier paid COD at pickup/delivery';

// Legacy tier wording — shown ONLY to customers whose pricing_model is
// 'legacy' (they signed up under it). Never shown pre-account.
export const LEGACY_FEE_LINES = [
  'Pay carrier directly on delivery (COD)',
  '$50 COD or $65 Full Service fee',
];

export const individualFeeBenefits = (pricingModel) =>
  pricingModel === 'ind_2026'
    ? [IND_2026_FEE_LINE, IND_2026_COD_LINE]
    : LEGACY_FEE_LINES;

// Card-level note for the two verified types (short form).
export const VERIFICATION_NOTE =
  'Requires a short verification — apply now, we review and set up a call to activate.';

// Pinned-panel form (FX-6 verbatim — no time/SLA promises).
export const VERIFICATION_NOTE_LONG =
  'Dealer and exporter accounts require a short verification before you can ' +
  'place orders directly. You can finish setting up your account now — our ' +
  'team will review your business and set up a call to activate you.';

// The canonical three cards. The individual card's fee lines are appended at
// render time via individualFeeBenefits(pricingModel) — pass 'ind_2026' on
// pre-account surfaces (every new signup gets the new model).
export const ACCOUNT_TYPE_CARDS = [
  {
    id: 'individual',
    title: 'Ship My Car',
    description: 'Personal or auction purchase — single vehicles',
    benefits: [
      'One-vehicle web quote, door-to-door',
      'Auction pickups (Copart / IAA / Manheim): gate-pass upload, VIN decode, document auto-fill',
      // fee benefits appended per pricing model at render time
    ],
  },
  {
    id: 'dealer',
    title: 'Auto Dealer',
    description: 'Licensed dealer moving inventory / trades',
    benefits: [
      'Volume shipping + saved locations',
      'Fixed per-order broker fee quoted for your account — no markup on carrier charges',
      'Per-delivery billing & weekly invoicing; optional AP service (Y7 pays carriers for you)',
    ],
    note: VERIFICATION_NOTE,
  },
  {
    id: 'exporter',
    title: 'Exporter',
    description: 'Export via US ports — Y7 assigns the destination warehouse',
    benefits: [
      'Register your export warehouses once',
      'Per order: just upload the auction documents',
      'Y7 picks the optimal warehouse and dispatches',
    ],
    note: VERIFICATION_NOTE,
  },
];

// Convenience: the full card set with the individual fee lines resolved.
export const accountTypeCards = (pricingModel) =>
  ACCOUNT_TYPE_CARDS.map((c) =>
    c.id === 'individual'
      ? { ...c, benefits: [...c.benefits, ...individualFeeBenefits(pricingModel)] }
      : c,
  );
