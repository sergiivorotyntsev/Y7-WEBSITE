// [WEBFIX-T05/T07] Marketing attribution that must survive the hop from a
// landing URL to /quote.
//
// QuoteForm.jsx reads exactly these seven keys from window.location.search
// when it mounts and posts them with the quote (QUOTE-P2 T09); TRANSPORT
// writes them to the order. Any link or navigate() that builds a fresh query
// string without them drops the campaign on the floor - and four doors did:
// QuoteFormCompact (submit + "use the full form"), QuoteStrip, and the port
// pages' delivery CTA. All four now go through here.
export const ATTRIBUTION_KEYS = [
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
  'gclid', 'fbclid',
];

/** The attribution pairs present in a query string (only non-empty ones). */
export function readAttribution(search) {
  const out = {};
  if (!search) return out;
  const src = new URLSearchParams(search);
  for (const k of ATTRIBUTION_KEYS) {
    const v = src.get(k);
    if (v) out[k] = v;
  }
  return out;
}

function currentSearch() {
  return typeof window !== 'undefined' ? window.location.search : '';
}

/** Copies attribution from `search` (default: the live URL) onto `params`.
 *  Never overwrites a key the caller already set. Returns `params`. */
export function carryAttribution(params, search = currentSearch()) {
  for (const [k, v] of Object.entries(readAttribution(search))) {
    if (!params.has(k)) params.set(k, v);
  }
  return params;
}

/** `${path}?${params + attribution}` for an <a href> / <Link to>. */
export function withAttribution(path, params = new URLSearchParams(), search = currentSearch()) {
  carryAttribution(params, search);
  const qs = params.toString();
  return qs ? `${path}?${qs}` : path;
}
