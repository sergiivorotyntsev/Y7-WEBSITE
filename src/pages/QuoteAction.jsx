import { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { CheckIcon } from '../components/icons';
import { apiGet } from '../hooks/useApi';
import { colors, fonts, radii, shadows } from '../theme';

// DESIGN-V2 "Dispatch Board": local token aliases for this page's inline styles.
const V2_INK = 'var(--v2-ink, #050607)';
const V2_INK_MUTED = 'var(--v2-ink-muted, #5c5851)';
const V2_LINE = 'var(--v2-line-on-paper, rgba(5, 6, 7, 0.14))';
const V2_CREAM = 'var(--v2-card-cream, #fffaf1)';
const V2_DISPLAY = 'var(--v2-font-display, Oswald, system-ui)';
const v2PrimaryBtn = {
  background: 'var(--v2-red-gradient, linear-gradient(135deg, #d70f24, #a90918))',
  color: '#fff7ed',
  padding: '10px 24px',
  borderRadius: 8,
  fontSize: '12px',
  border: 'none',
  cursor: 'pointer',
  fontFamily: fonts.sans,
  fontWeight: 600,
  letterSpacing: '0.5px',
  textTransform: 'uppercase',
};
const v2GhostBtn = {
  background: 'transparent',
  color: V2_INK,
  padding: '10px 24px',
  borderRadius: 8,
  fontSize: '12px',
  border: '1px solid rgba(5, 6, 7, 0.3)',
  cursor: 'pointer',
  fontFamily: fonts.sans,
  fontWeight: 600,
  letterSpacing: '0.5px',
  textTransform: 'uppercase',
};
const v2ErrorBox = {
  color: 'var(--v2-red-deep, #a90918)',
  background: 'rgba(215, 15, 36, 0.06)',
  border: '1px solid rgba(215, 15, 36, 0.25)',
};

const money = (cents) => (cents == null ? '—' : `$${Math.round(cents / 100)}`);

export default function QuoteAction() {
  const { orderId, action } = useParams();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const isConfirm = action === 'confirm';

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [reason, setReason] = useState('');
  // PHASE4B-REPRICE: details drives the branch between silent auto-confirm (first-time
  // quote) and the explicit Accept/Decline screen (a revised quote, requires_reprice).
  const [details, setDetails] = useState(null);
  const [gateLoading, setGateLoading] = useState(isConfirm && !!token);

  async function doAction(accept) {
    setLoading(true);
    setError(null);
    try {
      const path = accept
        ? `/api/public/quote/confirm/${orderId}?token=${encodeURIComponent(token)}`
        : `/api/public/quote/decline/${orderId}?token=${encodeURIComponent(token)}&reason=${encodeURIComponent(reason)}`;
      const data = await apiGet(path);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  // PHASE4B-REPRICE: on a confirm link, first read quote details. A revised quote
  // (requires_reprice) must NOT silently auto-confirm — it gets the Accept/Decline
  // screen. A first-time quote keeps the original auto-confirm behavior.
  useEffect(() => {
    if (!isConfirm || !token) { setGateLoading(false); return; }
    (async () => {
      try {
        const d = await apiGet(`/api/public/quote/${orderId}/details?token=${encodeURIComponent(token)}`);
        setDetails(d);
        if (d && d.requires_reprice) {
          setGateLoading(false);        // show the Accept/Decline screen
        } else {
          await doAction(true);         // first-time quote → auto-confirm as before
          setGateLoading(false);
        }
      } catch {
        // details unavailable (stale/invalid token) → fall back to the confirm attempt,
        // which yields the existing "link no longer active" screen on 403.
        await doAction(true);
        setGateLoading(false);
      }
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (result) {
    return (
      <div style={{ maxWidth: '500px', margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ marginBottom: '16px' }}>
          <CheckIcon size={40} />
        </div>
        <h2 style={{ fontFamily: V2_DISPLAY, textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.01em', lineHeight: 1.05, fontSize: '24px', color: isConfirm ? colors.success : V2_INK, marginBottom: '12px' }}>
          {result.message}
        </h2>
        {isConfirm && (
          <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
            {result.order_ref && (
              <p style={{ fontFamily: fonts.sans, fontSize: '13px', color: V2_INK_MUTED, margin: 0 }}>
                Reference: <strong>{result.order_ref}</strong>
              </p>
            )}
            {/* [SPRINT-P2b] Change 2: the accept step is NUMBER-FREE. The customer owes
                nothing at accept — the Y7 fee obligation is booked only once the account
                type is known and the order is confirmed (P2a-3), and the honest fee is
                shown at the account-type step (fee-preview). State the two facts, no figure;
                this used to hardcode "$75 minimum or 10%", the drift string this arc ends. */}
            <p style={{
              fontFamily: fonts.sans, fontSize: '13px', color: V2_INK_MUTED,
              maxWidth: '400px', margin: 0, lineHeight: 1.5,
            }}>
              Your Y7 service fee is determined by the account type you choose when you
              register. The transport price is paid separately to the carrier.
            </p>
            {/* W7D-T04: auction pickup — the release document is needed NOW;
                the request email is already on its way (auction-aware term). */}
            {result.release_doc?.needed && (
              <p style={{
                fontFamily: fonts.sans, fontSize: '13px', color: V2_INK,
                background: 'rgba(5, 6, 7, 0.04)', border: `1px solid ${V2_LINE}`, borderRadius: '10px',
                padding: '10px 16px', maxWidth: '400px', margin: 0, lineHeight: 1.5,
              }}>
                Next step: upload your <strong>{result.release_doc.term}</strong> —
                we&rsquo;ve emailed you a link. The carrier can&rsquo;t pick up without it.
              </p>
            )}
            {/* WGF-T03d: dispatch-critical facts missing — the required next
                step is the dispatch-details page, listed explicitly. */}
            {result.dispatch_details?.needed && (
              <div style={{
                fontFamily: fonts.sans, fontSize: '13px', color: V2_INK, textAlign: 'left',
                background: 'rgba(5, 6, 7, 0.04)', border: `1px solid ${V2_LINE}`, borderRadius: '10px',
                padding: '10px 16px', maxWidth: '400px', margin: 0, lineHeight: 1.5,
              }}>
                <strong>One step left</strong> — to dispatch a carrier we still need:
                <ul style={{ margin: '6px 0 0', paddingLeft: 18 }}>
                  {(result.dispatch_details.missing || []).map((m) => <li key={m}>{m}</li>)}
                </ul>
              </div>
            )}
            {result.signin_token ? (
              <Link
                to={`/portal/magic/${result.signin_token}${
                  result.dispatch_details?.needed
                    ? `?next=${encodeURIComponent(result.dispatch_details.url)}`
                    : ''
                }`}
                style={{
                  ...v2PrimaryBtn, display: 'inline-block', textDecoration: 'none', padding: '12px 24px', fontSize: '13px',
                }}
              >
                {result.dispatch_details?.needed
                  ? 'Continue — provide pickup details'
                  : 'Continue to onboarding'}
              </Link>
            ) : (
              <p style={{ fontFamily: fonts.sans, fontSize: '13px', color: V2_INK_MUTED, maxWidth: '380px', margin: 0, lineHeight: 1.5 }}>
                Check your email for the sign-in link to create your account and complete onboarding.
              </p>
            )}
            <Link to={`/agreement/${orderId}`} style={{
              fontFamily: fonts.sans, fontSize: '13px', color: V2_INK, textDecoration: 'underline', textUnderlineOffset: 2,
            }}>
              Sign Brokerage Agreement
            </Link>
          </div>
        )}
        {!isConfirm && (
          <div style={{ marginTop: '24px' }}>
            <Link to="/ship-my-car" style={{
              ...v2PrimaryBtn, display: 'inline-block', textDecoration: 'none', padding: '12px 24px', fontSize: '13px',
            }}>
              Request a New Quote
            </Link>
          </div>
        )}
      </div>
    );
  }

  // PHASE4B-REPRICE: premium re-accept screen for a REVISED quote.
  if (isConfirm && details && details.requires_reprice && !result) {
    const carrier = details.final_price_cents;
    const lo = details.quote_price_min_cents;
    const hi = details.quote_price_max_cents;
    return (
      <div style={{ maxWidth: '560px', margin: '0 auto', padding: '64px 24px' }}>
        <div style={{
          background: V2_CREAM, border: `1px solid ${V2_LINE}`, borderRadius: radii.xl,
          boxShadow: shadows.lg, padding: 'clamp(24px, 4vw, 40px)', textAlign: 'center',
        }}>
          <div style={{
            display: 'inline-block', padding: '4px 14px', borderRadius: radii.pill, marginBottom: 16,
            background: 'rgba(215, 15, 36, 0.06)', border: '1px solid rgba(215, 15, 36, 0.25)', color: V2_INK,
            fontFamily: fonts.sans, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
          }}>
            Updated Quote
          </div>
          <h1 style={{ fontFamily: V2_DISPLAY, textTransform: 'uppercase', fontSize: 26, fontWeight: 600, color: V2_INK, margin: '0 0 10px', letterSpacing: '0.01em', lineHeight: 1.05 }}>
            Your price needs re-confirmation
          </h1>
          <p style={{ fontFamily: fonts.sans, fontSize: 14, color: V2_INK_MUTED, lineHeight: 1.6, margin: '0 auto 28px', maxWidth: 420 }}>
            {details.vehicle ? <>For your <strong>{details.vehicle}</strong>, the </> : 'The '}
            assigned carrier came in at <strong>{money(carrier)}</strong>, above your original quote.
            Here's the updated price — please accept it to proceed, or decline.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 28, flexWrap: 'wrap' }}>
            <div style={{
              flex: '1 1 180px', minWidth: 160, padding: '18px 16px', borderRadius: radii.lg,
              background: 'rgba(5, 6, 7, 0.04)', border: `1px solid ${V2_LINE}`,
            }}>
              <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: V2_INK_MUTED, marginBottom: 8 }}>
                Carrier price
              </div>
              <div style={{ fontFamily: fonts.mono, fontSize: 24, fontWeight: 700, color: V2_INK_MUTED }}>
                {money(carrier)}
              </div>
            </div>
            <div style={{
              flex: '1 1 180px', minWidth: 160, padding: '18px 16px', borderRadius: radii.lg,
              background: colors.successBg, border: `1px solid ${colors.success}`,
            }}>
              <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: colors.success, marginBottom: 8 }}>
                Your updated quote
              </div>
              <div style={{ fontFamily: fonts.mono, fontSize: 24, fontWeight: 700, color: colors.success }}>
                {money(lo)}–{money(hi)}
              </div>
            </div>
          </div>

          {/* [SPRINT-P2b] Change 2: number-free. The two cards above show the CARRIER
              (transport) price the customer is re-accepting — that stays. The Y7 SERVICE
              fee is not shown here as a number: it is determined by the account type at
              registration and shown honestly at the account-type step (fee-preview). This
              previously hardcoded "$75 minimum or 10%", the exact drift string. */}
          <p style={{
            fontFamily: fonts.sans, fontSize: 13, color: V2_INK_MUTED, lineHeight: 1.6,
            margin: '0 auto 24px', maxWidth: 420, textAlign: 'left',
            background: 'rgba(5, 6, 7, 0.04)', border: `1px solid ${V2_LINE}`,
            borderRadius: radii.md, padding: '12px 16px',
          }}>
            The price above is the carrier&rsquo;s transport cost, paid separately to the
            carrier. Your Y7 service fee is determined by the account type you choose when
            you register.
          </p>

          {error && (
            <div style={{ ...v2ErrorBox, fontFamily: fonts.sans, fontSize: 13, padding: 12, borderRadius: radii.md, marginBottom: 16 }}>
              {error}
            </div>
          )}

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => doAction(true)} disabled={loading}
              style={{ ...v2PrimaryBtn, padding: '14px 28px', fontSize: 13, opacity: loading ? 0.6 : 1, transition: '150ms ease-out' }}>
              {loading ? 'Processing…' : 'Accept Updated Price'}
            </button>
            <button onClick={() => doAction(false)} disabled={loading}
              style={{ ...v2GhostBtn, padding: '14px 28px', fontSize: 13, opacity: loading ? 0.6 : 1 }}>
              Decline
            </button>
          </div>
        </div>
      </div>
    );
  }

  // CONFIRM-ONBOARD: re-visit / stale-link fallback (403 after the token is cleared).
  if (isConfirm && error) {
    return (
      <div style={{ maxWidth: '500px', margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: V2_DISPLAY, textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.01em', lineHeight: 1.05, fontSize: '22px', color: V2_INK, marginBottom: '12px' }}>
          This confirmation link is no longer active
        </h2>
        <p style={{ fontFamily: fonts.sans, fontSize: '13px', color: 'var(--v2-red-deep, #a90918)', marginBottom: '16px' }}>{error}</p>
        <p style={{ fontFamily: fonts.sans, fontSize: '14px', color: V2_INK_MUTED, lineHeight: 1.6, marginBottom: '20px', maxWidth: '380px', marginLeft: 'auto', marginRight: 'auto' }}>
          {/* WGF-T02a/WDV: confirmed orders don't expire — no false 48h deadline. */}
          If you've already confirmed your quote, use the sign-in link in your welcome email
          to create your account and complete onboarding. Otherwise, request a new quote.
        </p>
        <Link to="/ship-my-car" style={{
          ...v2GhostBtn, display: 'inline-block', textDecoration: 'none', padding: '12px 24px', fontSize: '13px',
        }}>
          Request a New Quote
        </Link>
      </div>
    );
  }

  if (isConfirm && (loading || gateLoading)) {
    return (
      <div style={{ maxWidth: '500px', margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
        <p style={{ fontFamily: fonts.sans, fontSize: '14px', color: V2_INK_MUTED }}>Confirming your quote...</p>
      </div>
    );
  }

  // Decline page shows a form
  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '60px 24px' }}>
      <h1 style={{ fontFamily: V2_DISPLAY, textTransform: 'uppercase', fontSize: '28px', fontWeight: 600, letterSpacing: '0.01em', lineHeight: 1.05, color: V2_INK, textAlign: 'center', marginBottom: '16px' }}>
        {isConfirm ? 'Confirm Your Quote' : 'Decline Quote'}
      </h1>

      {error && (
        <div style={{ ...v2ErrorBox, fontFamily: fonts.sans, fontSize: '13px', padding: '12px', borderRadius: '8px', marginBottom: '16px', textAlign: 'center' }}>
          {error}
        </div>
      )}

      {!isConfirm && (
        <>
          <p style={{ fontFamily: fonts.sans, fontSize: '14px', color: V2_INK_MUTED, textAlign: 'center', marginBottom: '24px' }}>
            We're sorry to see you go. Could you let us know why?
          </p>
          <textarea
            value={reason}
            onChange={e => setReason(e.target.value)}
            placeholder="Reason (optional)..."
            rows={4}
            style={{
              width: '100%', fontFamily: fonts.sans, fontSize: '16px', padding: '12px',
              borderRadius: '8px', border: `1px solid ${V2_LINE}`, background: V2_CREAM, color: V2_INK,
              resize: 'vertical', marginBottom: '16px',
            }}
          />
        </>
      )}

      <button
        onClick={() => doAction(isConfirm)}
        disabled={loading}
        style={{
          ...(isConfirm ? v2PrimaryBtn : v2GhostBtn),
          width: '100%',
          padding: '14px',
          fontSize: '14px',
          opacity: loading ? 0.6 : 1,
        }}
      >
        {loading ? 'Processing...' : (isConfirm ? 'Yes, Confirm Quote' : 'Decline Quote')}
      </button>
    </div>
  );
}
