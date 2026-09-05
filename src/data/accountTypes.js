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
// - Dealer: $50 per vehicle when the dealer pays the carrier directly (COD),
//   or $60 when Y7 handles carrier payment. Carrier charges pass through at
//   cost (no markup).
// - Exporter: $50 per vehicle with carrier-payment handling included. Y7 pays
//   the carrier from the funded account; there is no direct-pay option and no
//   $60 tier.
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
// B2B-T01/T03: the dealer + exporter commercial models (Sergii-confirmed).
// Kept in step with services/b2b_pricing.py — B2B_FLAT_FEE_CENTS = 5000 ($50)
// and DEALER_Y7_PAYS_FEE_CENTS = 6000 ($60). The anti-drift tests in
// tests/unit/test_b2b_cards.py derive these strings from those constants.
export const DEALER_FEE_LINE =
  'Y7 fee: $50 per load — $60 when Y7 processes the carrier payment (after prepay)';
export const EXPORTER_FEE_LINE = 'Y7 fee: $50 per load';
export const PASS_THROUGH_LINE =
  'Carrier price passed through at cost — Y7 never marks it up';
export const B2B_INVOICING_LINE = 'Y7 fee invoiced every 2 weeks or monthly';
export const EXPORTER_CARRIER_LINE =
  'Y7 pays the carriers from the joint account you fund';
export const DEALER_CARRIER_LINE =
  'You pay the carrier on delivery — or prepay the transport cost and Y7 pays for you';

// Each card separates CAPABILITIES (what you can do) from TERMS (what it
// costs). B2B-T04 highlights only the terms on hover, so the split has to be
// structural rather than "the last two bullets".
export const ACCOUNT_TYPE_CARDS = [
  {
    id: 'individual',
    title: 'Ship My Car',
    description: 'Personal or auction purchase — single vehicles',
    benefits: [
      'One-vehicle web quote, door-to-door',
      'Auction pickups (Copart / IAA / Manheim): gate-pass upload, VIN decode, document auto-fill',
    ],
    // terms resolved per pricing model at render time (see accountTypeCards)
    terms: [],
  },
  {
    id: 'dealer',
    title: 'Auto Dealer',
    description: 'Licensed dealer moving inventory / trades',
    benefits: [
      'Volume shipping + saved locations',
      'Dedicated dealer agreement and dispatch',
    ],
    terms: [DEALER_FEE_LINE, PASS_THROUGH_LINE, DEALER_CARRIER_LINE, B2B_INVOICING_LINE],
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
    terms: [EXPORTER_FEE_LINE, PASS_THROUGH_LINE, EXPORTER_CARRIER_LINE, B2B_INVOICING_LINE],
    note: VERIFICATION_NOTE,
  },
];

// A dealer/exporter still on the legacy tier must NOT be shown the 2026 terms:
// until the T06 migration stamps their account, the engine charges them the
// $50 COD / $65 Full Service schedule, and a card promising "$50 per load, $60
// when Y7 pays" would be the same over-promise this sprint set out to remove.
// Mirrors how the individual card has always resolved per model.
export const B2B_LEGACY_TERMS = [
  'Y7 fee: $50 COD or $65 Full Service — the schedule your account signed up under',
  'Carrier price passed through at cost — Y7 never marks it up',
];

// The card set with the terms resolved for THIS viewer's pricing model.
// `benefits` stays the concatenated list so existing consumers keep working;
// `terms` is what B2B-T04 highlights on hover.
//
// Pre-account surfaces (portal signup) pass the model the account will be
// CREATED on, so a prospective dealer sees the 2026 terms they will actually
// get. Post-account surfaces pass the viewer's stored pricing_model.
export const accountTypeCards = (pricingModel) =>
  ACCOUNT_TYPE_CARDS.map((c) => {
    let terms;
    if (c.id === 'individual') {
      terms = individualFeeBenefits(pricingModel);
    } else if (pricingModel === 'legacy') {
      terms = B2B_LEGACY_TERMS;
    } else {
      terms = c.terms;
    }
    return { ...c, terms, benefits: [...c.benefits, ...terms] };
  });
