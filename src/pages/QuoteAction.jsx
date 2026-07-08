import { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { CheckIcon } from '../components/icons';
import { apiGet } from '../hooks/useApi';
import { colors, fonts, button as btnStyles, keyframes, radii, shadows } from '../theme';

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
        <h2 style={{ fontFamily: fonts.serif, fontSize: '24px', color: isConfirm ? colors.success : colors.text, marginBottom: '12px' }}>
          {result.message}
        </h2>
        {isConfirm && (
          <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
            {result.order_ref && (
              <p style={{ fontFamily: fonts.sans, fontSize: '13px', color: colors.textMuted, margin: 0 }}>
                Reference: <strong>{result.order_ref}</strong>
              </p>
            )}
            {/* W7D-T04: auction pickup — the release document is needed NOW;
                the request email is already on its way (auction-aware term). */}
            {result.release_doc?.needed && (
              <p style={{
                fontFamily: fonts.sans, fontSize: '13px', color: '#8a6d1b',
                background: '#FFF8E1', border: '1px solid #F9A825', borderRadius: '10px',
                padding: '10px 16px', maxWidth: '400px', margin: 0, lineHeight: 1.5,
              }}>
                Next step: upload your <strong>{result.release_doc.term}</strong> —
                we&rsquo;ve emailed you a link. The carrier can&rsquo;t pick up without it.
              </p>
            )}
            {result.signin_token ? (
              <Link to={`/portal/magic/${result.signin_token}`} style={{
                ...btnStyles.accent, display: 'inline-block', textDecoration: 'none', padding: '12px 24px', fontSize: '13px',
              }}>
                Continue to onboarding
              </Link>
            ) : (
              <p style={{ fontFamily: fonts.sans, fontSize: '13px', color: colors.textMuted, maxWidth: '380px', margin: 0, lineHeight: 1.5 }}>
                Check your email for the sign-in link to create your account and complete onboarding.
              </p>
            )}
            <Link to={`/agreement/${orderId}`} style={{
              fontFamily: fonts.sans, fontSize: '13px', color: colors.accent, textDecoration: 'none',
            }}>
              Sign Brokerage Agreement
            </Link>
          </div>
        )}
        {!isConfirm && (
          <div style={{ marginTop: '24px' }}>
            <Link to="/ship-my-car" style={{
              ...btnStyles.primary, display: 'inline-block', textDecoration: 'none', padding: '12px 24px', fontSize: '13px',
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
        <style>{keyframes}</style>
        <div style={{
          background: colors.bgCard, border: `1px solid ${colors.border}`, borderRadius: radii.xl,
          boxShadow: shadows.lg, padding: 'clamp(24px, 4vw, 40px)', textAlign: 'center',
          animation: 'popUp 400ms ease-out both',
        }}>
          <div style={{
            display: 'inline-block', padding: '4px 14px', borderRadius: radii.pill, marginBottom: 16,
            background: 'linear-gradient(135deg, #FBE5DE 0%, #F5D9CE 100%)', color: colors.accent,
            fontFamily: fonts.sans, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
          }}>
            Updated Quote
          </div>
          <h1 style={{ fontFamily: fonts.serif, fontSize: 26, fontWeight: 700, color: colors.text, margin: '0 0 10px', letterSpacing: '-0.02em' }}>
            Your price needs re-confirmation
          </h1>
          <p style={{ fontFamily: fonts.sans, fontSize: 14, color: colors.textMuted, lineHeight: 1.6, margin: '0 auto 28px', maxWidth: 420 }}>
            {details.vehicle ? <>For your <strong>{details.vehicle}</strong>, the </> : 'The '}
            assigned carrier came in at <strong>{money(carrier)}</strong>, above your original quote.
            Here's the updated price — please accept it to proceed, or decline.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 28, flexWrap: 'wrap' }}>
            <div style={{
              flex: '1 1 180px', minWidth: 160, padding: '18px 16px', borderRadius: radii.lg,
              background: colors.bgMuted, border: `1px solid ${colors.border}`,
            }}>
              <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: colors.textMuted, marginBottom: 8 }}>
                Carrier price
              </div>
              <div style={{ fontFamily: fonts.mono, fontSize: 24, fontWeight: 700, color: colors.textMuted }}>
                {money(carrier)}
              </div>
            </div>
            <div style={{
              flex: '1 1 180px', minWidth: 160, padding: '18px 16px', borderRadius: radii.lg,
              background: colors.successBg, border: `1px solid ${colors.success}`,
              animation: 'fadeUp 500ms ease-out both',
            }}>
              <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: colors.success, marginBottom: 8 }}>
                Your updated quote
              </div>
              <div style={{ fontFamily: fonts.mono, fontSize: 24, fontWeight: 700, color: colors.success }}>
                {money(lo)}–{money(hi)}
              </div>
            </div>
          </div>

          {error && (
            <div style={{ fontFamily: fonts.sans, fontSize: 13, color: colors.accent, padding: 12, background: '#FFF0EC', borderRadius: radii.md, marginBottom: 16 }}>
              {error}
            </div>
          )}

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => doAction(true)} disabled={loading}
              style={{ ...btnStyles.accent, padding: '14px 28px', fontSize: 13, opacity: loading ? 0.6 : 1, transition: '150ms ease-out' }}>
              {loading ? 'Processing…' : 'Accept Updated Price'}
            </button>
            <button onClick={() => doAction(false)} disabled={loading}
              style={{ ...btnStyles.secondary, padding: '14px 28px', fontSize: 13, opacity: loading ? 0.6 : 1 }}>
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
        <h2 style={{ fontFamily: fonts.serif, fontSize: '22px', color: colors.text, marginBottom: '12px' }}>
          This confirmation link is no longer active
        </h2>
        <p style={{ fontFamily: fonts.sans, fontSize: '13px', color: colors.accent, marginBottom: '16px' }}>{error}</p>
        <p style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted, lineHeight: 1.6, marginBottom: '20px', maxWidth: '380px', marginLeft: 'auto', marginRight: 'auto' }}>
          If you've already confirmed your quote, use the sign-in link in your welcome email
          to create your account and complete onboarding within 48 hours. Otherwise, request a new quote.
        </p>
        <Link to="/ship-my-car" style={{
          ...btnStyles.secondary, display: 'inline-block', textDecoration: 'none', padding: '12px 24px', fontSize: '13px',
        }}>
          Request a New Quote
        </Link>
      </div>
    );
  }

  if (isConfirm && (loading || gateLoading)) {
    return (
      <div style={{ maxWidth: '500px', margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
        <p style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted }}>Confirming your quote...</p>
      </div>
    );
  }

  // Decline page shows a form
  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '60px 24px' }}>
      <h1 style={{ fontFamily: fonts.serif, fontSize: '28px', fontWeight: 700, color: colors.text, textAlign: 'center', marginBottom: '16px' }}>
        {isConfirm ? 'Confirm Your Quote' : 'Decline Quote'}
      </h1>

      {error && (
        <div style={{ fontFamily: fonts.sans, fontSize: '13px', color: colors.accent, padding: '12px', background: '#FFF0EC', borderRadius: '8px', marginBottom: '16px', textAlign: 'center' }}>
          {error}
        </div>
      )}

      {!isConfirm && (
        <>
          <p style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted, textAlign: 'center', marginBottom: '24px' }}>
            We're sorry to see you go. Could you let us know why?
          </p>
          <textarea
            value={reason}
            onChange={e => setReason(e.target.value)}
            placeholder="Reason (optional)..."
            rows={4}
            style={{
              width: '100%', fontFamily: fonts.sans, fontSize: '16px', padding: '12px',
              borderRadius: '8px', border: `1px solid ${colors.borderInput}`, outline: 'none',
              resize: 'vertical', marginBottom: '16px',
            }}
          />
        </>
      )}

      <button
        onClick={() => doAction(isConfirm)}
        disabled={loading}
        style={{
          ...(isConfirm ? btnStyles.accent : btnStyles.secondary),
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
