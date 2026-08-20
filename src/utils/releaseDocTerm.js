// W7U-T03: auction-aware naming for the vehicle release document.
// Client mirror of TRANSPORT services/release_doc_terms.py — "Gate Pass" is
// Copart/IAAI language; Manheim says Vehicle Release, ACV says Pickup Slip.
// Surfaces that fetch an order should prefer the server-computed
// order.release_doc_term; this map is for surfaces that only have the
// auction code client-side (e.g. the NewOrder auction selector).

export const RELEASE_DOC_TERMS = {
  COPART: 'Gate Pass PIN',
  IAA: 'Gate Pass PIN',
  MANHEIM: 'Vehicle Release',
  ACV: 'Pickup Slip',
};

// AUCT-W2B-T03.1 CORRECTION — kept byte-identical to
// TRANSPORT services/release_doc_terms.GENERIC_TERM. This read
// "release document (Gate Pass / Vehicle Release / Pickup Slip) or PIN", whose
// trailing "or PIN" offers the PIN as an alternative to the purchase document —
// the same inversion T03.2/T03.4 removed for the four named houses. The purchase
// document is always required; only the FORM of the release varies, and for an
// unknown house we do not yet know it.
export const GENERIC_RELEASE_DOC_TERM =
  'auction release (a Gate Pass PIN, Vehicle Release or Pickup Slip — whichever your auction issues)';

export function releaseDocTerm(code) {
  if (!code) return GENERIC_RELEASE_DOC_TERM;
  return RELEASE_DOC_TERMS[String(code).trim().toUpperCase()] || GENERIC_RELEASE_DOC_TERM;
}

// Short form for titles / row labels where the generic phrase is too long.
export function releaseDocShortTerm(code) {
  if (!code) return 'Release document';
  return RELEASE_DOC_TERMS[String(code).trim().toUpperCase()] || 'Release document';
}
