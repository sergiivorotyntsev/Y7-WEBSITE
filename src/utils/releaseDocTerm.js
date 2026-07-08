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

export const GENERIC_RELEASE_DOC_TERM =
  'release document (Gate Pass / Vehicle Release / Pickup Slip) or PIN';

export function releaseDocTerm(code) {
  if (!code) return GENERIC_RELEASE_DOC_TERM;
  return RELEASE_DOC_TERMS[String(code).trim().toUpperCase()] || GENERIC_RELEASE_DOC_TERM;
}

// Short form for titles / row labels where the generic phrase is too long.
export function releaseDocShortTerm(code) {
  if (!code) return 'Release document';
  return RELEASE_DOC_TERMS[String(code).trim().toUpperCase()] || 'Release document';
}
