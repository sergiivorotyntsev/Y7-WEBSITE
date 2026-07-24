import { useState, useEffect } from 'react';
import { portalFetch } from './useAuth';

// [SPRINT-P2b] Fetch the REAL Y7 service fee for one order, per candidate account type,
// from the backend fee engine — GET /api/portal/orders/{orderId}/fee-preview.
//
// This is the anti-drift rule of the sprint made literal: every fee number the customer
// sees at the account-type step comes from here, never from a frontend constant. The
// account-type cards used to state a generic formula ("$75 minimum or 10% of carrier
// price") keyed on the CUSTOMER's stored pricing_model, but the fee actually charged is
// keyed on the ORDER's resolved model — which is how order 285 came to show ind_2026 terms
// on a legacy-stamped order (data/accountTypes.js:4-9 records the 12-day prod drift that
// forced WAC-T01). The endpoint keys on the order, so it is the only honest per-order
// source, and it already respects legacy customers (_prospective_pricing_model).
//
// A null orderId means "no order in context" (the dashboard change-type modal, or a
// wizard reached without ?next): the hook stays idle and the caller falls back to the
// generic engine-synced card terms. It NEVER synthesises a number on failure — a wrong
// fee is worse than no fee.
//
// Returns { state, previews, order, reload }:
//   state    'idle' | 'loading' | 'ok' | 'error'
//   previews { [account_type]: { fee_cents, fee_range_min_cents, fee_range_max_cents,
//                                basis, carrier_paid_by, explanation, pricing_model } }
//   order    { order_id, service_tier, quote_price_min_cents, quote_price_max_cents,
//              final_price_cents }  — the order-level context, or null
export function useFeePreview(orderId) {
  const [state, setState] = useState(orderId ? 'loading' : 'idle');
  const [previews, setPreviews] = useState(null);
  const [order, setOrder] = useState(null);
  const [nonce, setNonce] = useState(0);

  // The initial-state sync (idle when there's no order, loading while fetching) is exactly
  // the external-system synchronisation this rule exempts; the codebase disables it around
  // such effects (see Onboarding.jsx). The async resolve/error setStates are already off the
  // synchronous path.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!orderId) {
      setState('idle');
      setPreviews(null);
      setOrder(null);
      return;
    }
    let alive = true;
    setState('loading');
    (async () => {
      try {
        const res = await portalFetch(`/api/portal/orders/${orderId}/fee-preview`);
        if (!res.ok) throw new Error(`fee-preview ${res.status}`);
        const data = await res.json();
        if (!alive) return;
        const byType = {};
        for (const p of data.previews || []) byType[p.account_type] = p;
        setPreviews(byType);
        setOrder({
          order_id: data.order_id,
          service_tier: data.service_tier,
          quote_price_min_cents: data.quote_price_min_cents,
          quote_price_max_cents: data.quote_price_max_cents,
          final_price_cents: data.final_price_cents,
        });
        setState('ok');
      } catch {
        if (!alive) return;
        // No fallback number, ever. The card shows the generic terms + an honest
        // "we couldn't price this shipment" note (FeePreviewLine handles the state).
        setPreviews(null);
        setOrder(null);
        setState('error');
      }
    })();
    return () => {
      alive = false;
    };
  }, [orderId, nonce]);
  /* eslint-enable react-hooks/set-state-in-effect */

  return { state, previews, order, reload: () => setNonce((n) => n + 1) };
}

// Parse the order id the magic link was minted for out of a ?next= path
// (e.g. /portal/order/284/dispatch-details -> 284). Returns null when the path
// names no single order — the decision #5 fallback to generic wording.
export function orderIdFromNext(rawNext) {
  if (!rawNext) return null;
  const m = /\/portal\/order\/(\d+)\b/.exec(rawNext);
  return m ? Number(m[1]) : null;
}
