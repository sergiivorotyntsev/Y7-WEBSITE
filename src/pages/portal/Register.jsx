import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, portalFetch } from '../../hooks/useAuth';
import { API_URL } from '../../config';
import SmsConsent from '../../components/SmsConsent';
import PhoneInput, { getCleanPhone, isValidPhone } from '../../components/PhoneInput';
import EmailInputWithCheck from '../../components/EmailInputWithCheck';
import { colors, fonts, button as btnStyles } from '../../theme';
import { trackEvent } from '../../utils/trackEvent';

let _pendingTgAuthReg = null;

function TelegramLoginWidget({ onAuth }) {
  const ref = useRef(null);
  // Reassigning a module-level var during render is the "latest-callback"
  // bridge pattern — the Telegram widget's global window callback dereferences
  // this module variable, which always needs the freshest onAuth.
  // eslint-disable-next-line react-hooks/globals
  _pendingTgAuthReg = onAuth;

  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = '';
    window.__tg_auth_callback_reg = (user) => {
      if (_pendingTgAuthReg) _pendingTgAuthReg(user);
    };
    const s = document.createElement('script');
    s.src = 'https://telegram.org/js/telegram-widget.js?22';
    s.setAttribute('data-telegram-login', 'y7dispatch_bot');
    s.setAttribute('data-size', 'large');
    s.setAttribute('data-radius', '20');
    s.setAttribute('data-request-access', 'write');
    s.setAttribute('data-onauth', '__tg_auth_callback_reg(user)');
    s.async = true;
    ref.current.appendChild(s);
    return () => { delete window.__tg_auth_callback_reg; _pendingTgAuthReg = null; };
  }, []);
  return <div ref={ref} style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }} />;
}

const inputStyle = {
  fontFamily: fonts.sans,
  fontSize: '16px',
  padding: '10px 14px',
  borderRadius: '8px',
  border: `1px solid ${colors.borderInput}`,
  background: colors.bgInput,
  color: colors.text,
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
};

const labelStyle = {
  fontFamily: fonts.sans,
  fontSize: '12px',
  fontWeight: 600,
  color: colors.text,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  display: 'block',
  marginBottom: '4px',
};

export default function Register() {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [step, setStep] = useState('form'); // 'form' | 'code'
  const [form, setForm] = useState({
    company_name: '', contact_name: '', email: '', phone: '',
    delivery_address: '', delivery_city: '', delivery_state: '', delivery_zip: '',
    sms_consent: false,
  });
  const [pendingId, setPendingId] = useState(null);
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const codeRefs = useRef([]);
  const [error, setError] = useState(null);
  const [emailSuggestion, setEmailSuggestion] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) navigate('/portal/dashboard', { replace: true });
  }, [user, navigate]);

  async function handleTelegramAuth(tgUser) {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/public/telegram-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(tgUser),
      });
      const data = await res.json();
      if (data.ok && data.session_token) {
        login(data.session_token, data.user);
        trackEvent('portal_register', { method: 'telegram' });
        navigate('/portal/dashboard', { replace: true });
      } else {
        setError(data.error || 'Telegram sign up failed');
      }
    } catch (err) {
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        setError('Connection error. Please check your internet and try again.');
      } else {
        setError('Telegram sign up failed. Try the form below instead.');
      }
    } finally {
      setLoading(false);
    }
  }

  function set(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    setError(null);
    setEmailSuggestion(null);

    if (!form.contact_name.trim()) { setError('Full name is required'); return; }
    if (!form.email.trim() || !form.email.includes('@')) { setError('Valid email is required'); return; }
    if (!form.phone.trim()) { setError('Phone number is required'); return; }
    if (!isValidPhone(form.phone)) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }

    setLoading(true);
    try {
      const res = await portalFetch('/api/portal/auth/register-verify-email', {
        method: 'POST',
        body: JSON.stringify({
          ...form,
          phone: getCleanPhone(form.phone),
        }),
      });
      const data = await res.json();
      if (res.ok && data.ok && data.pending_id) {
        setPendingId(data.pending_id);
        setStep('code');
        setCode(['', '', '', '', '', '']);
        setTimeout(() => codeRefs.current[0]?.focus(), 50);
      } else if (res.status === 409 && data.detail?.error === 'email_already_registered') {
        navigate(`/portal/login?email=${encodeURIComponent(form.email)}`, { replace: true });
      } else if (res.status === 400 && data.detail?.suggestion) {
        setEmailSuggestion(data.detail.suggestion);
        setError(`We couldn't send a code to ${form.email}. Did you mean ${data.detail.suggestion}?`);
      } else {
        const msg = data.detail?.detail || data.detail?.error || data.detail || data.error || 'Could not send verification code';
        setError(typeof msg === 'string' ? msg : 'Registration failed');
      }
    } catch (err) {
      setError(err.message || 'Network error');
    } finally {
      setLoading(false);
    }
  }

  function handleAcceptSuggestion() {
    if (!emailSuggestion) return;
    const atIdx = form.email.indexOf('@');
    if (atIdx === -1) return;
    const local = form.email.slice(0, atIdx);
    set('email', `${local}@${emailSuggestion}`);
    setEmailSuggestion(null);
    setError(null);
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

  async function submitCode(fullCode) {
    setError(null);
    setLoading(true);
    try {
      const res = await portalFetch('/api/portal/auth/register-verify-code', {
        method: 'POST',
        body: JSON.stringify({ pending_id: pendingId, otp_code: fullCode }),
      });
      const data = await res.json();
      if (res.ok && data.ok && data.customer) {
        login(data.session_token, { id: data.customer.id, name: data.customer.name });
        trackEvent('portal_register', { method: 'email_verified' });
        navigate('/portal/onboarding', { replace: true });
        return;
      }
      const detail = data.detail || data;
      const errorCode = detail?.error;
      if (errorCode === 'invalid_code') {
        const remaining = detail.attempts_remaining ?? 0;
        setError(remaining > 0
          ? `Incorrect code. ${remaining} attempt${remaining === 1 ? '' : 's'} remaining.`
          : 'Incorrect code. Please start over.');
        setCode(['', '', '', '', '', '']);
        codeRefs.current[0]?.focus();
      } else if (errorCode === 'too_many_attempts') {
        setError('Too many attempts. Please start over with a new code.');
        setStep('form');
        setPendingId(null);
      } else if (errorCode === 'expired') {
        setError('Code expired. Please request a new one.');
        setStep('form');
        setPendingId(null);
      } else if (errorCode === 'email_taken_during_verification') {
        setError('This email was registered while you were verifying. Please log in instead.');
        setStep('form');
      } else {
        setError(detail?.message || detail?.error || 'Verification failed');
        setCode(['', '', '', '', '', '']);
      }
    } catch (err) {
      setError(err.message || 'Network error');
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    if (loading) return;
    setError(null);
    setLoading(true);
    try {
      const res = await portalFetch('/api/portal/auth/register-verify-email', {
        method: 'POST',
        body: JSON.stringify({
          ...form,
          phone: getCleanPhone(form.phone),
        }),
      });
      const data = await res.json();
      if (res.ok && data.pending_id) {
        setPendingId(data.pending_id);
        setError('New code sent. Check your inbox.');
      } else {
        setError(data.detail?.detail || data.detail?.error || 'Could not resend');
      }
    } catch (err) {
      setError(err.message || 'Network error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: '520px', margin: '0 auto', padding: '48px 24px 80px' }}>
      <h1 style={{
        fontFamily: fonts.serif,
        fontSize: '28px',
        fontWeight: 700,
        color: colors.text,
        textAlign: 'center',
        marginBottom: '8px',
      }}>
        {step === 'code' ? 'Check Your Email' : 'Create Your Account'}
      </h1>
      <p style={{
        fontFamily: fonts.sans,
        fontSize: '14px',
        color: colors.textMuted,
        textAlign: 'center',
        marginBottom: '32px',
      }}>
        {step === 'code'
          ? `We sent a 6-digit code to ${form.email}.`
          : 'Track shipments, view quotes, and manage your transport orders.'}
      </p>

      {error && (
        <div style={{
          fontFamily: fonts.sans,
          fontSize: '13px',
          color: colors.accent,
          padding: '10px 14px',
          background: '#FFF0EC',
          borderRadius: '8px',
          marginBottom: '20px',
        }}>
          {error}
          {emailSuggestion && step === 'form' && (
            <div style={{ marginTop: '8px' }}>
              <button type="button" onClick={handleAcceptSuggestion} style={{
                ...btnStyles.accent,
                fontSize: '12px',
                padding: '6px 12px',
              }}>
                Use {emailSuggestion}
              </button>
            </div>
          )}
        </div>
      )}

      {step === 'form' && (
        <>
          <TelegramLoginWidget onAuth={handleTelegramAuth} />

          <div style={{
            display: 'flex', alignItems: 'center', gap: '16px',
            margin: '8px 0 24px',
          }}>
            <div style={{ flex: 1, height: '1px', background: colors.border }} />
            <span style={{ fontFamily: fonts.sans, fontSize: '12px', color: colors.textMuted }}>or fill in manually</span>
            <div style={{ flex: 1, height: '1px', background: colors.border }} />
          </div>

          <form onSubmit={handleFormSubmit} style={{
            background: colors.bgCard,
            border: `1px solid ${colors.border}`,
            borderRadius: '16px',
            padding: '28px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}>
            <div>
              <label style={labelStyle}>Company Name (optional)</label>
              <input value={form.company_name} onChange={e => set('company_name', e.target.value)}
                placeholder="Leave empty for private customers" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Full Name *</label>
              <input value={form.contact_name} onChange={e => set('contact_name', e.target.value)} style={inputStyle} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <EmailInputWithCheck
                id="register-email"
                value={form.email}
                onChange={v => set('email', v)}
                label="Email"
                required
              />
              <div>
                <label style={labelStyle}>Phone *</label>
                <PhoneInput value={form.phone} onChange={v => set('phone', v)} style={inputStyle} required />
              </div>
            </div>

            <div style={{
              fontFamily: fonts.sans,
              fontSize: '12px',
              fontWeight: 600,
              color: colors.textMuted,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              paddingTop: '8px',
              borderTop: `1px solid ${colors.border}`,
            }}>
              Default Delivery Address (optional)
            </div>
            <div>
              <label style={labelStyle}>Street Address</label>
              <input value={form.delivery_address} onChange={e => set('delivery_address', e.target.value)} style={inputStyle} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '12px' }}>
              <div>
                <label style={labelStyle}>City</label>
                <input value={form.delivery_city} onChange={e => set('delivery_city', e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>State</label>
                <input value={form.delivery_state} onChange={e => set('delivery_state', e.target.value)} maxLength={2} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>ZIP</label>
                <input value={form.delivery_zip} onChange={e => set('delivery_zip', e.target.value)} style={inputStyle} />
              </div>
            </div>

            <SmsConsent checked={form.sms_consent} onChange={v => set('sms_consent', v)} />

            <button type="submit" disabled={loading} style={{
              ...btnStyles.accent,
              width: '100%',
              padding: '14px',
              fontSize: '14px',
              opacity: loading ? 0.6 : 1,
            }}>
              {loading ? 'Sending code...' : 'Send Verification Code'}
            </button>
          </form>

          <div style={{
            marginTop: '24px',
            textAlign: 'center',
            fontFamily: fonts.sans,
            fontSize: '13px',
            color: colors.textMuted,
          }}>
            Already have an account?{' '}
            <Link to="/portal/login" style={{ color: colors.accent, fontWeight: 600 }}>Log in</Link>
          </div>
        </>
      )}

      {step === 'code' && (
        <div style={{
          background: colors.bgCard,
          border: `1px solid ${colors.border}`,
          borderRadius: '16px',
          padding: '28px 24px',
        }}>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
            {code.map((digit, i) => (
              <input
                key={i}
                ref={el => { codeRefs.current[i] = el; }}
                type="text" inputMode="numeric" maxLength={1}
                value={digit}
                onChange={e => handleCodeChange(i, e.target.value)}
                onKeyDown={e => handleCodeKeyDown(i, e)}
                style={{
                  width: '44px', height: '52px', textAlign: 'center',
                  fontFamily: fonts.mono, fontSize: '22px', fontWeight: 700,
                  borderRadius: '10px',
                  border: `2px solid ${digit ? colors.accent : colors.borderInput}`,
                  background: colors.bgCard, color: colors.text, outline: 'none',
                }}
              />
            ))}
          </div>

          {loading && (
            <p style={{ textAlign: 'center', fontFamily: fonts.sans, fontSize: '13px', color: colors.textMuted, margin: '0 0 12px' }}>
              Verifying...
            </p>
          )}

          <p style={{
            fontFamily: fonts.sans,
            fontSize: '12px',
            color: colors.textMuted,
            textAlign: 'center',
            margin: '8px 0 16px',
          }}>
            Didn't receive it? Check your spam folder, or{' '}
            <button type="button" onClick={handleResend} disabled={loading} style={{
              background: 'none', border: 'none', color: colors.accent,
              fontFamily: fonts.sans, fontSize: '12px', fontWeight: 600,
              cursor: 'pointer', textDecoration: 'underline', padding: 0,
            }}>
              resend the code
            </button>.
          </p>

          <button type="button"
            onClick={() => { setStep('form'); setPendingId(null); setCode(['', '', '', '', '', '']); setError(null); }}
            style={{ ...btnStyles.secondary, width: '100%', fontSize: '12px' }}
          >
            Use a different email
          </button>
        </div>
      )}
    </div>
  );
}
