import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageMeta from '../../components/PageMeta';
import { useAuth, portalFetch } from '../../hooks/useAuth';
import { getCleanPhone, isValidPhone } from '../../components/PhoneInput';
import { trackEvent } from '../../utils/trackEvent';
import LoginCard from './components/LoginCard';

export default function Login() {
  const navigate = useNavigate();
  const { t } = useTranslation('portal');
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
        login(data.session_token, data.customer);
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
        login(data.session_token, data);
        trackEvent('portal_login', { method: 'email_code' });
        if (!data.delivery_city && !data.delivery_address) {
          navigate('/portal/profile', { replace: true, state: { incomplete: true } });
          return;
        }
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

  function handleBackToEmail() {
    setStep('email');
    setCode(['', '', '', '', '', '']);
    setError(null);
  }

  return (
    <>
      <PageMeta title="Customer Login" description="Log in to track orders, view quotes, manage shipments." path="/portal/login" />
      <LoginCard
        t={t}
        step={step}
        email={email}
        setEmail={setEmail}
        code={code}
        loading={loading}
        error={error}
        reg={reg}
        setRegField={setRegField}
        onSubmitEmail={handleEmailSubmit}
        onCodeChange={handleCodeChange}
        onCodeKeyDown={handleCodeKeyDown}
        onBackToEmail={handleBackToEmail}
        onSubmitRegister={handleRegisterSubmit}
        codeRefs={codeRefs}
      />
    </>
  );
}
