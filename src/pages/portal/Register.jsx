import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, portalFetch } from '../../hooks/useAuth';
import { API_URL } from '../../config';
import SmsConsent from '../../components/SmsConsent';
import { colors, fonts, button as btnStyles } from '../../theme';
import { trackEvent } from '../../utils/analytics';

let _pendingTgAuthReg = null;

function TelegramLoginWidget({ onAuth }) {
  const ref = useRef(null);
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
  const [form, setForm] = useState({
    company_name: '', contact_name: '', email: '', phone: '',
    delivery_address: '', delivery_city: '', delivery_state: '', delivery_zip: '',
    sms_consent: false,
  });
  const [error, setError] = useState(null);
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

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!form.contact_name.trim()) { setError('Full name is required'); return; }
    if (!form.email.trim() || !form.email.includes('@')) { setError('Valid email is required'); return; }
    if (!form.phone.trim()) { setError('Phone number is required'); return; }

    setLoading(true);
    try {
      const res = await portalFetch('/api/portal/auth/web-register', {
        method: 'POST',
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        login(data.session_token, { id: data.customer.id, name: data.customer.name });
        trackEvent('portal_register', { method: 'email' });
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
        Create Your Account
      </h1>
      <p style={{
        fontFamily: fonts.sans,
        fontSize: '14px',
        color: colors.textMuted,
        textAlign: 'center',
        marginBottom: '32px',
      }}>
        Track shipments, view quotes, and manage your transport orders.
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
        </div>
      )}

      <TelegramLoginWidget onAuth={handleTelegramAuth} />

      <div style={{
        display: 'flex', alignItems: 'center', gap: '16px',
        margin: '8px 0 24px',
      }}>
        <div style={{ flex: 1, height: '1px', background: colors.border }} />
        <span style={{ fontFamily: fonts.sans, fontSize: '12px', color: colors.textMuted }}>or fill in manually</span>
        <div style={{ flex: 1, height: '1px', background: colors.border }} />
      </div>

      <form onSubmit={handleSubmit} style={{
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
          <div>
            <label style={labelStyle}>Email *</label>
            <input type="email" value={form.email} onChange={e => set('email', e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Phone *</label>
            <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} style={inputStyle} />
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
          {loading ? 'Creating account...' : 'Create Account'}
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
    </div>
  );
}
