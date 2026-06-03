import { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { CheckIcon } from '../components/icons';
import { apiGet } from '../hooks/useApi';
import { colors, fonts, button as btnStyles } from '../theme';

export default function QuoteAction() {
  const { orderId, action } = useParams();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const isConfirm = action === 'confirm';

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [reason, setReason] = useState('');

  async function handleAction() {
    setLoading(true);
    setError(null);
    try {
      const path = isConfirm
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

  // Auto-confirm on page load for confirm action
  useEffect(() => {
    if (isConfirm && token) handleAction();
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
            {/* CONFIRM-DECOUPLE (ADR-A): confirm = price acceptance only — route to
                onboarding, not "order moving". The SIGNING STEP stays in the flow as a
                legal shield (agreement text is attorney-reviewed separately). */}
            <Link to="/portal/register" style={{
              ...btnStyles.accent, display: 'inline-block', textDecoration: 'none', padding: '12px 24px', fontSize: '13px',
            }}>
              Create Your Account
            </Link>
            <Link to={`/agreement/${orderId}`} style={{
              fontFamily: fonts.sans, fontSize: '13px', color: colors.accent, textDecoration: 'none',
            }}>
              Sign Transport Agreement
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

  if (isConfirm && loading) {
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
        onClick={handleAction}
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
