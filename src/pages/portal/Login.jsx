import { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageMeta from '../../components/PageMeta';
import { useAuth, portalFetch } from '../../hooks/useAuth';
import SmsConsent from '../../components/SmsConsent';
import PhoneInput, { getCleanPhone, isValidPhone } from '../../components/PhoneInput';
import { colors, fonts, button as btnStyles } from '../../theme';
import { trackEvent } from '../../utils/analytics';

const inputStyle = {
  fontFamily: fonts.sans,
  fontSize: '16px',
  padding: '12px 14px',
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

export default function Login() {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const codeRefs = useRef([]);
  const [reg, setReg] = useState({
    company_name: '', contact_name: '', phone: '',
    delivery_address: '', delivery_city: '', delivery_state: '', delivery_zip: '',
    sms_consent: false,
  });

  // Keep login + navigate in refs so TG callback always has latest
  const loginRef = useRef(login);
  const navigateRef = useRef(navigate);
  loginRef.current = login;
  navigateRef.current = navigate;

  useEffect(() => {
    if (user) navigate('/portal/dashboard', { replace: true });
  }, [user, navigate]);

  function setRegField(field, value) {
    setReg(prev => ({ ...prev, [field]: value }));
  }

  // Telegram auth — completely decoupled from component lifecycle.
  // Uses refs for login/navigate so it works even if component re-renders.
  const handleTelegramAuth = useCallback(async (tgUser) => {
    try {
      const res = await portalFetch('/api/public/telegram-login', {
        method: 'POST',
        body: JSON.stringify(tgUser),
      });
      const data = await res.json();
      if (data.ok && data.session_token) {
        loginRef.current(data.session_token, data.user);
        trackEvent('portal_login', { method: 'telegram' });
        navigateRef.current('/portal/dashboard', { replace: true });
      } else {
        setError(data.error || data.detail || 'Telegram login failed. Try email login instead.');
      }
    } catch {
      setError('Connection error. Please try email login instead.');
    }
  }, []);

  // Step 1: Enter email
  async function handleEmailSubmit(e) {
    e.preventDefault();
    setError(null);
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    setLoading(true);
    try {
      const res = await portalFetch('/api/portal/auth/start', {
        method: 'POST',
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.detail || 'Something went wrong');
        return;
      }
      if (data.action === 'code_sent') {
        setStep('code');
      } else if (data.action === 'register') {
        setStep('register');
      }
    } catch (err) {
      setError(err.message || 'Network error');
    } finally {
      setLoading(false);
    }
  }

  // Step register
  async function handleRegisterSubmit(e) {
    e.preventDefault();
    setError(null);
    if (!reg.contact_name.trim()) { setError('Full name is required'); return; }
    if (reg.phone && !isValidPhone(reg.phone)) {
      setError('Please enter a valid 10-digit phone number, or leave it blank.');
      return;
    }

    setLoading(true);
    try {
      const res = await portalFetch('/api/portal/auth/web-register', {
        method: 'POST',
        body: JSON.stringify({
          ...reg,
          email: email.trim(),
          phone: reg.phone ? getCleanPhone(reg.phone) : '',
        }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        login(data.session_token, { id: data.customer.id, name: data.customer.name });
        try {
          const profileRes = await portalFetch('/api/portal/data/profile');
          const profile = await profileRes.json();
          if (!profile.delivery_city && !profile.delivery_address) {
            navigate('/portal/profile', { replace: true, state: { incomplete: true } });
            return;
          }
        } catch { /* proceed to dashboard */ }
        navigate('/portal/dashboard', { replace: true });
      } else {
        setError(data.detail || data.error || 'Registration failed');
      }
    } catch (err) {
      setError(err.message || 'Network error');
    } finally {
      setLoading(false);
    }
  }

  // Code input handlers
  function handleCodeChange(i, val) {
    if (val.length > 1) val = val.slice(-1);
    if (val && !/^\d$/.test(val)) return;
    const next = [...code];
    next[i] = val;
    setCode(next);
    if (val && i < 5) {
      codeRefs.current[i + 1]?.focus();
    }
    if (val && i === 5 && next.every(d => d)) {
      submitCode(next.join(''));
    }
  }

  function handleCodeKeyDown(i, e) {
    if (e.key === 'Backspace' && !code[i] && i > 0) {
      codeRefs.current[i - 1]?.focus();
    }
  }

  async function submitCode(fullCode) {
    setError(null);
    setLoading(true);
    try {
      const res = await portalFetch('/api/portal/auth/verify-code', {
        method: 'POST',
        body: JSON.stringify({ code: fullCode }),
      });
      const data = await res.json();
      if (res.ok && data.status === 'ok') {
        login(data.session_token, { id: data.customer_id, name: data.customer_name });
        trackEvent('portal_login', { method: 'email_code' });
        try {
          const profileRes = await portalFetch('/api/portal/data/profile');
          const profile = await profileRes.json();
          if (!profile.delivery_city && !profile.delivery_address) {
            navigate('/portal/profile', { replace: true, state: { incomplete: true } });
            return;
          }
        } catch { /* proceed to dashboard */ }
        navigate('/portal/dashboard', { replace: true });
      } else {
        setError(data.detail || 'Invalid or expired code');
        setCode(['', '', '', '', '', '']);
        codeRefs.current[0]?.focus();
      }
    } catch (err) {
      setError(err.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  }

  const headings = {
    email: { title: 'Welcome to Y7 Logistics', sub: 'Enter your email to get started \u2014 log in or create an account.' },
    code: { title: 'Enter Verification Code', sub: `We sent a 6-digit code to ${email}. Check your inbox.` },
    register: { title: 'Create Your Account', sub: `No account found for ${email}. Fill in your details below.` },
  };
  const h = headings[step];

  return (
    <div style={{ maxWidth: '480px', margin: '0 auto', padding: '60px 24px 80px' }}>
      <PageMeta title="Customer Login" description="Log in to track orders, view quotes, manage shipments." path="/portal/login" />
      <h1 style={{
        fontFamily: fonts.serif, fontSize: '26px', fontWeight: 700,
        color: colors.text, textAlign: 'center', marginBottom: '8px',
      }}>
        {h.title}
      </h1>
      <p style={{
        fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted,
        textAlign: 'center', marginBottom: '32px',
      }}>
        {h.sub}
      </p>

      {error && (
        <div style={{
          fontFamily: fonts.sans, fontSize: '13px', color: colors.accent,
          padding: '10px 14px', background: '#FFF0EC', borderRadius: '8px',
          marginBottom: '20px', textAlign: 'center',
        }}>
          {error}
        </div>
      )}

      {/* -- STEP: EMAIL -- */}
      {step === 'email' && (
        <form onSubmit={handleEmailSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Email Address</label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="you@company.com" style={inputStyle} autoFocus
            />
          </div>
          <button type="submit" disabled={loading} style={{
            ...btnStyles.accent, width: '100%', padding: '14px', fontSize: '14px',
            opacity: loading ? 0.6 : 1,
          }}>
            {loading ? 'Checking...' : 'Continue'}
          </button>
        </form>
      )}

      {/* -- STEP: CODE -- */}
      {step === 'code' && (
        <div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '24px' }}>
            {code.map((digit, i) => (
              <input
                key={i}
                ref={el => { codeRefs.current[i] = el; }}
                type="text" inputMode="numeric" maxLength={1}
                value={digit}
                onChange={e => handleCodeChange(i, e.target.value)}
                onKeyDown={e => handleCodeKeyDown(i, e)}
                autoFocus={i === 0}
                style={{
                  width: '48px', height: '56px', textAlign: 'center',
                  fontFamily: fonts.mono, fontSize: '24px', fontWeight: 700,
                  borderRadius: '10px',
                  border: `2px solid ${digit ? colors.accent : colors.borderInput}`,
                  background: colors.bgCard, color: colors.text, outline: 'none',
                }}
              />
            ))}
          </div>
          {loading && (
            <p style={{ textAlign: 'center', fontFamily: fonts.sans, fontSize: '13px', color: colors.textMuted }}>
              Verifying...
            </p>
          )}
          <button type="button"
            onClick={() => { setStep('email'); setCode(['', '', '', '', '', '']); setError(null); }}
            style={{ ...btnStyles.secondary, width: '100%', marginTop: '16px', fontSize: '12px' }}
          >
            Use a different email
          </button>
        </div>
      )}

      {/* -- STEP: REGISTER -- */}
      {step === 'register' && (
        <form onSubmit={handleRegisterSubmit} style={{
          background: colors.bgCard, border: `1px solid ${colors.border}`,
          borderRadius: '16px', padding: '24px',
          display: 'flex', flexDirection: 'column', gap: '14px',
        }}>
          <div style={{
            fontFamily: fonts.sans, fontSize: '13px', color: colors.textMuted,
            background: colors.bgMuted, padding: '10px 14px', borderRadius: '8px',
          }}>
            Email: <strong>{email}</strong>
          </div>

          <div>
            <label style={labelStyle}>Full Name *</label>
            <input value={reg.contact_name} onChange={e => setRegField('contact_name', e.target.value)} style={inputStyle} autoFocus />
          </div>
          <div>
            <label style={labelStyle}>Company Name (optional)</label>
            <input value={reg.company_name} onChange={e => setRegField('company_name', e.target.value)}
              placeholder="Leave empty for private customers" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Phone</label>
            <PhoneInput value={reg.phone} onChange={v => setRegField('phone', v)} style={inputStyle} />
          </div>

          <div style={{
            fontFamily: fonts.sans, fontSize: '11px', fontWeight: 600,
            color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px',
            paddingTop: '8px', borderTop: `1px solid ${colors.border}`,
          }}>
            Delivery Address (your lot {'\u2014'} optional)
          </div>
          <div>
            <label style={labelStyle}>Street Address</label>
            <input value={reg.delivery_address} onChange={e => setRegField('delivery_address', e.target.value)} style={inputStyle} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '10px' }}>
            <div>
              <label style={labelStyle}>City</label>
              <input value={reg.delivery_city} onChange={e => setRegField('delivery_city', e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>State</label>
              <input value={reg.delivery_state} onChange={e => setRegField('delivery_state', e.target.value)} maxLength={2}
                style={{ ...inputStyle, textTransform: 'uppercase' }} />
            </div>
            <div>
              <label style={labelStyle}>ZIP</label>
              <input value={reg.delivery_zip} onChange={e => setRegField('delivery_zip', e.target.value)} maxLength={5}
                inputMode="numeric" style={inputStyle} />
            </div>
          </div>

          <SmsConsent checked={reg.sms_consent} onChange={v => setRegField('sms_consent', v)} />

          <p style={{
            fontFamily: fonts.sans, fontSize: '11px', color: colors.textMuted,
            lineHeight: 1.5, textAlign: 'center', margin: '0 0 12px',
          }}>
            By creating an account, you agree to our{' '}
            <a href="/terms" target="_blank" rel="noopener noreferrer" style={{ color: colors.accent, textDecoration: 'underline' }}>Terms &amp; Conditions</a>
            {' '}and{' '}
            <a href="/privacy" target="_blank" rel="noopener noreferrer" style={{ color: colors.accent, textDecoration: 'underline' }}>Privacy Policy</a>.
          </p>

          <button type="submit" disabled={loading} style={{
            ...btnStyles.accent, width: '100%', padding: '14px', fontSize: '14px',
            opacity: loading ? 0.6 : 1,
          }}>
            {loading ? 'Creating account...' : 'Create Account & Continue'}
          </button>

          <button type="button"
            onClick={() => { setStep('email'); setError(null); }}
            style={{ ...btnStyles.secondary, width: '100%', fontSize: '12px' }}
          >
            Use a different email
          </button>
        </form>
      )}

      {/* Divider + Telegram Login Widget */}
      {step === 'email' && (
        <>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '16px',
            margin: '28px 0 20px',
          }}>
            <div style={{ flex: 1, height: '1px', background: colors.border }} />
            <span style={{ fontFamily: fonts.sans, fontSize: '12px', color: colors.textMuted }}>or</span>
            <div style={{ flex: 1, height: '1px', background: colors.border }} />
          </div>
          <TelegramWidget onAuth={handleTelegramAuth} />
        </>
      )}
    </div>
  );
}

// Telegram Login Widget — mounted ONCE, never unmounts during auth flow.
// The onAuth callback is stored globally so it survives any parent re-renders.
function TelegramWidget({ onAuth }) {
  const ref = useRef(null);
  const onAuthRef = useRef(onAuth);
  // Assigning a ref during render is intentional here — this is the
  // documented "latest-callback" pattern so the useEffect below can
  // reference onAuthRef.current and always see the freshest handler
  // without re-running the telegram-script load on every prop change.
  // eslint-disable-next-line react-hooks/refs
  onAuthRef.current = onAuth;

  useEffect(() => {
    if (!ref.current) return;
    // Set up global callback ONCE — uses ref so it's always current
    window.__y7_tg_login = (user) => {
      if (onAuthRef.current) onAuthRef.current(user);
    };
    const s = document.createElement('script');
    s.src = 'https://telegram.org/js/telegram-widget.js?22';
    s.setAttribute('data-telegram-login', 'y7dispatch_bot');
    s.setAttribute('data-size', 'large');
    s.setAttribute('data-radius', '20');
    s.setAttribute('data-request-access', 'write');
    s.setAttribute('data-onauth', '__y7_tg_login(user)');
    s.async = true;
    ref.current.appendChild(s);
    // Do NOT clean up the global — the popup may call it after component effects run
  }, []);

  return <div ref={ref} style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }} />;
}
