import { useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { CheckIcon } from '../components/icons';
import { apiGet } from '../hooks/useApi';
import { colors, fonts } from '../theme';
import ConfirmQuotePanel from './ConfirmQuotePanel';

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

export default function QuoteAction() {
  const { orderId, action } = useParams();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const isConfirm = action === 'confirm';

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [reason, setReason] = useState('');

  // AGRGATE-T02: DECLINE only. The confirm half of this function is gone with
  // the auto-confirm — ConfirmQuotePanel owns it, and it POSTs rather than GETs.
  // `details`/`gateLoading` and the reprice screen went with it: the panel shows
  // the updated price and the Decline button in the same place. Leaving those
  // branches behind would have left four screens that read as live and can no
  // longer be reached.
  async function doDecline() {
    setLoading(true);
    setError(null);
    try {
      const data = await apiGet(
        `/api/public/quote/decline/${orderId}?token=${encodeURIComponent(token)}&reason=${encodeURIComponent(reason)}`,
      );
      setResult(data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  /* AGRGATE-T02: THE AUTO-CONFIRM IS GONE.
   *
   * This effect used to call `GET /api/public/quote/confirm/{id}` on page load,
   * before the customer had read a word. That is how order 307 (`0901-TATOYR`)
   * became `confirmed` with no signature and no delivery details — the page
   * accepted on their behalf and then told them it had.
   *
   * Confirming is now the LAST step of ConfirmQuotePanel, and the backend
   * refuses it until the agreement and the details are there
   * (services/confirm_gate.py). Both halves ship together: a page that posts to
   * a route that does not exist, or a route that requires a signature no page
   * can supply, breaks the customer path in production. Deploy TRANSPORT first.
   *
   * The reprice screen below is reached from inside the panel, which shows the
   * updated price and the Decline button in the same place as before.
   */

  if (isConfirm && !result) {
    return (
      <ConfirmQuotePanel
        orderId={orderId}
        token={token}
        onConfirmed={setResult}
      />
    );
  }

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
            {/* AGRGATE-T02: the bare "Sign Brokerage Agreement" link that used
                to sit here is GONE. It pointed at /agreement/{orderId} — a
                different door from the one the primary CTA above opens — and it
                rendered unconditionally, so it competed with the CTA for the
                customer's attention at the exact moment it peaks, and it offered
                a step that is now already DONE: the signature is taken before
                this screen exists, in step 1 of ConfirmQuotePanel. A link to an
                already-completed step is worse than no link. */}
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

  // Decline page shows a form
  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '60px 24px' }}>
      <h1 style={{ fontFamily: V2_DISPLAY, textTransform: 'uppercase', fontSize: '28px', fontWeight: 600, letterSpacing: '0.01em', lineHeight: 1.05, color: V2_INK, textAlign: 'center', marginBottom: '16px' }}>
        Decline Quote
      </h1>

      {error && (
        <div style={{ ...v2ErrorBox, fontFamily: fonts.sans, fontSize: '13px', padding: '12px', borderRadius: '8px', marginBottom: '16px', textAlign: 'center' }}>
          {error}
        </div>
      )}

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

      <button
        onClick={doDecline}
        disabled={loading}
        style={{
          ...v2GhostBtn,
          width: '100%',
          padding: '14px',
          fontSize: '14px',
          opacity: loading ? 0.6 : 1,
        }}
      >
        {loading ? 'Processing...' : 'Decline Quote'}
      </button>
    </div>
  );
}
