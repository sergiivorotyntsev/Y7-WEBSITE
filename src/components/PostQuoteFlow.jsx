import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth, portalFetch } from '../hooks/useAuth';
import { colors, fonts, button as btnStyles } from '../theme';

export default function PostQuoteFlow({ quoteResult, formData }) {
  const { t } = useTranslation('quote');
  const { user, login } = useAuth();
  const [step, setStep] = useState('success'); // 'success' | 'code' | 'done'
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [codeLoading, setCodeLoading] = useState(false);
  const [codeError, setCodeError] = useState(null);
  const [codeSent, setCodeSent] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const codeRefs = useRef([]);

  const name = formData?.name || '';
  const email = formData?.email || '';
  const phone = formData?.phone || '';
  const reference = quoteResult?.reference || '';

  // Auto-register + send code
  async function startRegistration() {
    setCodeLoading(true);
    setCodeError(null);
    try {
      // Try to register (may already exist)
      const regRes = await portalFetch('/api/portal/auth/web-register', {
        method: 'POST',
        body: JSON.stringify({
          contact_name: name,
          email,
          phone,
          company_name: '',
        }),
      });
      if (regRes.ok) {
        const data = await regRes.json();
        login(data.session_token, { id: data.customer.id, name: data.customer.name });
        setStep('done');
        setCodeLoading(false);
        return;
      }
      // If 409 (already exists), send login code instead
      if (regRes.status === 409) {
        await portalFetch('/api/portal/auth/request-code', {
          method: 'POST',
          body: JSON.stringify({ email }),
        });
        setCodeSent(true);
        setStep('code');
      } else {
        const err = await regRes.json().catch(() => ({}));
        setCodeError(err.detail || 'Registration failed');
      }
    } catch (err) {
      setCodeError(err.message || 'Network error');
    } finally {
      setCodeLoading(false);
    }
  }

  function handleCodeChange(i, val) {
    if (val.length > 1) val = val.slice(-1);
    if (val && !/^\d$/.test(val)) return;
    const next = [...code];
    next[i] = val;
    setCode(next);
    if (val && i < 5) codeRefs.current[i + 1]?.focus();
    if (val && i === 5 && next.every(d => d)) verifyCode(next.join(''));
  }

  function handleCodeKeyDown(i, e) {
    if (e.key === 'Backspace' && !code[i] && i > 0) codeRefs.current[i - 1]?.focus();
  }

  function handleCodePaste(e) {
    const paste = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '').slice(0, 6);
    if (paste.length === 6) {
      e.preventDefault();
      const next = paste.split('');
      setCode(next);
      codeRefs.current[5]?.focus();
      verifyCode(paste);
    }
  }

  async function verifyCode(fullCode) {
    setCodeLoading(true);
    setCodeError(null);
    try {
      const res = await portalFetch('/api/portal/auth/verify-code', {
        method: 'POST',
        body: JSON.stringify({ code: fullCode }),
      });
      const data = await res.json();
      if (res.ok && data.status === 'ok') {
        login(data.session_token, { id: data.customer_id, name: data.customer_name });
        setStep('done');
      } else {
        setCodeError(data.detail || 'Invalid code');
        setCode(['', '', '', '', '', '']);
        codeRefs.current[0]?.focus();
      }
    } catch (err) {
      setCodeError(err.message || 'Verification failed');
    } finally {
      setCodeLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto' }}>
      {/* Success Card */}
      <div style={{
        textAlign: 'center',
        padding: '32px 24px',
        background: colors.successBg,
        borderRadius: '16px',
        marginBottom: '24px',
      }}>
        <div style={{ fontSize: '40px', marginBottom: '12px' }}>&#10003;</div>
        <h3 style={{ fontFamily: fonts.serif, fontSize: '22px', color: colors.success, marginBottom: '8px' }}>
          {t('success.title')}
        </h3>
        <p style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted, marginBottom: '12px' }}>
          {t('success.message')}
        </p>
        {reference && (
          <p style={{ fontFamily: fonts.mono, fontSize: '15px', color: colors.text, fontWeight: 600 }}>
            {t('success.reference')} {reference}
          </p>
        )}
      </div>

      {/* Registration section — only if not logged in */}
      {!user && step === 'success' && !dismissed && (
        <div style={{
          background: colors.bgCard,
          border: `1px solid ${colors.border}`,
          borderRadius: '16px',
          padding: '28px 24px',
          marginBottom: '20px',
        }}>
          <h4 style={{
            fontFamily: fonts.serif,
            fontSize: '18px',
            fontWeight: 700,
            color: colors.text,
            marginBottom: '8px',
          }}>
            Create Your Account
          </h4>
          <p style={{
            fontFamily: fonts.sans,
            fontSize: '13px',
            color: colors.textMuted,
            lineHeight: 1.6,
            marginBottom: '20px',
          }}>
            Track your orders, get instant updates, and manage all shipments in one place.
            Your details are pre-filled from your quote.
          </p>

          {/* Pre-filled info (read-only) */}
          <div style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            marginBottom: '20px',
            fontFamily: fonts.sans,
            fontSize: '13px',
          }}>
            {name && <span style={{ color: colors.textMuted }}>Name: <strong style={{ color: colors.text }}>{name}</strong></span>}
            {email && <span style={{ color: colors.textMuted }}>Email: <strong style={{ color: colors.text }}>{email}</strong></span>}
            {phone && <span style={{ color: colors.textMuted }}>Phone: <strong style={{ color: colors.text }}>{phone}</strong></span>}
          </div>

          {codeError && (
            <div style={{
              fontFamily: fonts.sans, fontSize: '12px', color: colors.accent,
              padding: '8px 12px', background: '#FFF0EC', borderRadius: '8px', marginBottom: '16px',
            }}>
              {codeError}
            </div>
          )}

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={startRegistration}
              disabled={codeLoading || !email}
              style={{
                ...btnStyles.accent,
                padding: '12px 24px',
                fontSize: '13px',
                opacity: (codeLoading || !email) ? 0.6 : 1,
                flex: 1,
              }}
            >
              {codeLoading ? 'Creating...' : 'Create Account & Track Order'}
            </button>
            <button
              onClick={() => setDismissed(true)}
              style={{ ...btnStyles.secondary, padding: '12px 16px', fontSize: '12px' }}
            >
              Skip
            </button>
          </div>
        </div>
      )}

      {/* Code verification step */}
      {!user && step === 'code' && (
        <div style={{
          background: colors.bgCard,
          border: `1px solid ${colors.border}`,
          borderRadius: '16px',
          padding: '28px 24px',
          textAlign: 'center',
          marginBottom: '20px',
        }}>
          <h4 style={{ fontFamily: fonts.serif, fontSize: '18px', fontWeight: 700, color: colors.text, marginBottom: '8px' }}>
            Verify Your Email
          </h4>
          <p style={{ fontFamily: fonts.sans, fontSize: '13px', color: colors.textMuted, marginBottom: '20px' }}>
            We sent a 6-digit code to <strong>{email}</strong>
          </p>

          {codeError && (
            <div style={{
              fontFamily: fonts.sans, fontSize: '12px', color: colors.accent,
              padding: '8px 12px', background: '#FFF0EC', borderRadius: '8px', marginBottom: '16px',
            }}>
              {codeError}
            </div>
          )}

          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '16px' }}>
            {code.map((digit, i) => (
              <input
                key={i}
                ref={el => { codeRefs.current[i] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleCodeChange(i, e.target.value)}
                onKeyDown={e => handleCodeKeyDown(i, e)}
                onPaste={handleCodePaste}
                autoFocus={i === 0}
                style={{
                  width: '44px', height: '52px', textAlign: 'center',
                  fontFamily: fonts.mono, fontSize: '22px', fontWeight: 700,
                  borderRadius: '10px', border: `2px solid ${digit ? colors.accent : colors.borderInput}`,
                  background: colors.bgCard, color: colors.text, outline: 'none',
                }}
              />
            ))}
          </div>
          {codeLoading && (
            <p style={{ fontFamily: fonts.sans, fontSize: '12px', color: colors.textMuted }}>Verifying...</p>
          )}
        </div>
      )}

      {/* Account created — show Telegram prompt */}
      {(user || step === 'done') && (
        <div style={{
          background: colors.bgCard,
          border: `1px solid ${colors.border}`,
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '20px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '28px', marginBottom: '8px' }}>&#10003;</div>
          <p style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.success, fontWeight: 600, marginBottom: '16px' }}>
            Account created! You can now track your orders.
          </p>
          <Link to="/portal/dashboard" style={{
            ...btnStyles.primary,
            display: 'inline-block',
            padding: '10px 20px',
            fontSize: '12px',
            textDecoration: 'none',
          }}>
            Go to Dashboard
          </Link>
        </div>
      )}

      {/* Telegram connect — always show after success */}
      {(user || step === 'done' || dismissed) && (
        <div style={{
          background: colors.bgMuted,
          borderRadius: '12px',
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}>
          <span style={{ fontSize: '32px', flexShrink: 0 }}>{'\uD83D\uDCAC'}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: fonts.sans, fontSize: '14px', fontWeight: 600, color: colors.text, marginBottom: '4px' }}>
              Get instant updates via Telegram
            </div>
            <div style={{ fontFamily: fonts.sans, fontSize: '12px', color: colors.textMuted, lineHeight: 1.5 }}>
              Carrier assigned, pickup scheduled, delivery confirmed — all in real time.
            </div>
          </div>
          <a
            href="https://t.me/y7dispatch_bot"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              ...btnStyles.secondary,
              padding: '8px 16px',
              fontSize: '11px',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            Connect Bot
          </a>
        </div>
      )}

      {/* Dismissed banner */}
      {!user && dismissed && step === 'success' && (
        <div style={{
          background: colors.bgCard,
          border: `1px solid ${colors.border}`,
          borderRadius: '10px',
          padding: '12px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '16px',
        }}>
          <span style={{ fontFamily: fonts.sans, fontSize: '13px', color: colors.textMuted }}>
            Create an account to track your shipment
          </span>
          <button
            onClick={() => { setDismissed(false); }}
            style={{ ...btnStyles.accent, padding: '6px 14px', fontSize: '11px' }}
          >
            Sign Up
          </button>
        </div>
      )}
    </div>
  );
}
