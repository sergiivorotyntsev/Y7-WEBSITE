import { useState, useRef, useEffect } from 'react';
import { portalFetch } from '../../hooks/useAuth';
import EmailInputWithCheck from '../EmailInputWithCheck';
import { colors, fonts, button as btnStyles } from '../../theme';

const overlayStyle = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(20, 20, 20, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
  zIndex: 1000,
};

const modalStyle = {
  background: colors.bgCard,
  border: `1px solid ${colors.border}`,
  borderRadius: '16px',
  padding: '28px 24px',
  width: '100%',
  maxWidth: '440px',
  maxHeight: '90vh',
  overflowY: 'auto',
};

const titleStyle = {
  fontFamily: fonts.serif,
  fontSize: '22px',
  fontWeight: 700,
  color: colors.text,
  margin: '0 0 8px',
};

const subtitleStyle = {
  fontFamily: fonts.sans,
  fontSize: '13px',
  color: colors.textMuted,
  margin: '0 0 20px',
  lineHeight: 1.5,
};

const errorStyle = {
  fontFamily: fonts.sans,
  fontSize: '13px',
  color: colors.accent,
  padding: '10px 14px',
  background: '#FFF0EC',
  borderRadius: '8px',
  marginBottom: '16px',
};

const actionRowStyle = {
  display: 'flex',
  gap: '10px',
  marginTop: '20px',
};

export default function UpdateEmailModal({ onClose }) {
  const [step, setStep] = useState('email');
  const [newEmail, setNewEmail] = useState('');
  const [pendingId, setPendingId] = useState(null);
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const codeRefs = useRef([]);

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose(false); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  async function handleRequest(e) {
    e.preventDefault();
    if (!newEmail.trim() || !newEmail.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await portalFetch('/api/portal/auth/update-email-request', {
        method: 'POST',
        body: JSON.stringify({ new_email: newEmail.trim() }),
      });
      const data = await res.json();
      if (res.ok && data.pending_id) {
        setPendingId(data.pending_id);
        setStep('code');
        setCode(['', '', '', '', '', '']);
        setTimeout(() => codeRefs.current[0]?.focus(), 50);
      } else {
        const detail = data.detail || data;
        if (detail?.suggestion) {
          setError(`That email looks wrong. Did you mean @${detail.suggestion}?`);
        } else if (detail?.error === 'email_already_registered') {
          setError('That email is already registered to another account.');
        } else {
          setError(detail?.detail || detail?.error || 'Could not send verification code.');
        }
      }
    } catch (err) {
      setError(err.message || 'Network error');
    } finally {
      setLoading(false);
    }
  }

  function handleCodeChange(i, val) {
    if (val.length > 1) val = val.slice(-1);
    if (val && !/^\d$/.test(val)) return;
    const next = [...code];
    next[i] = val;
    setCode(next);
    if (val && i < 5) codeRefs.current[i + 1]?.focus();
    if (val && i === 5 && next.every(d => d)) submitCode(next.join(''));
  }

  function handleCodeKeyDown(i, e) {
    if (e.key === 'Backspace' && !code[i] && i > 0) codeRefs.current[i - 1]?.focus();
  }

  async function submitCode(full) {
    setLoading(true);
    setError(null);
    try {
      const res = await portalFetch('/api/portal/auth/update-email-verify', {
        method: 'POST',
        body: JSON.stringify({ pending_id: pendingId, otp_code: full }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        onClose(true);
        return;
      }
      const detail = data.detail || data;
      if (detail?.error === 'invalid_code') {
        const remaining = detail.attempts_remaining ?? 0;
        setError(remaining > 0
          ? `Incorrect code. ${remaining} attempt${remaining === 1 ? '' : 's'} remaining.`
          : 'Incorrect code. Please start over.');
        setCode(['', '', '', '', '', '']);
      } else if (detail?.error === 'too_many_attempts') {
        setError('Too many attempts. Please start over with a new code.');
        setStep('email');
      } else if (detail?.error === 'expired') {
        setError('Code expired. Please request a new one.');
        setStep('email');
      } else {
        setError(detail?.detail || detail?.error || 'Verification failed');
      }
    } catch (err) {
      setError(err.message || 'Network error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={overlayStyle} onClick={() => onClose(false)}>
      <div style={modalStyle} onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
        <h2 style={titleStyle}>
          {step === 'email' ? 'Update Your Email' : 'Check Your New Inbox'}
        </h2>
        <p style={subtitleStyle}>
          {step === 'email'
            ? "Enter a new email address. We'll send a 6-digit code to confirm you own it before swapping it in."
            : `We sent a 6-digit code to ${newEmail}. Enter it below to finish the update.`}
        </p>

        {error && <div style={errorStyle}>{error}</div>}

        {step === 'email' && (
          <form onSubmit={handleRequest}>
            <EmailInputWithCheck
              id="update-email"
              label="New Email"
              value={newEmail}
              onChange={setNewEmail}
              required
              autoFocus
            />
            <div style={actionRowStyle}>
              <button type="button" onClick={() => onClose(false)} style={{
                ...btnStyles.secondary, flex: 1, fontSize: '13px',
              }}>
                Cancel
              </button>
              <button type="submit" disabled={loading} style={{
                ...btnStyles.accent, flex: 2, fontSize: '13px', opacity: loading ? 0.6 : 1,
              }}>
                {loading ? 'Sending...' : 'Send Code'}
              </button>
            </div>
          </form>
        )}

        {step === 'code' && (
          <div>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
              {code.map((digit, i) => (
                <input
                  key={i}
                  ref={el => { codeRefs.current[i] = el; }}
                  type="text" inputMode="numeric" maxLength={1}
                  value={digit}
                  onChange={e => handleCodeChange(i, e.target.value)}
                  onKeyDown={e => handleCodeKeyDown(i, e)}
                  style={{
                    width: '40px', height: '48px', textAlign: 'center',
                    fontFamily: fonts.mono, fontSize: '20px', fontWeight: 700,
                    borderRadius: '8px',
                    border: `2px solid ${digit ? colors.accent : colors.borderInput}`,
                    background: colors.bgCard, color: colors.text, outline: 'none',
                  }}
                />
              ))}
            </div>
            <div style={actionRowStyle}>
              <button type="button" onClick={() => { setStep('email'); setCode(['', '', '', '', '', '']); setError(null); }} style={{
                ...btnStyles.secondary, flex: 1, fontSize: '13px',
              }}>
                Back
              </button>
              <button type="button" onClick={() => onClose(false)} style={{
                ...btnStyles.secondary, flex: 1, fontSize: '13px',
              }}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
