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
  // STRIPE-LOGIN-PHASE2-A2: state machine extended with two new steps
  // ('forgot_code' and 'reset_password') for the password reset flow.
  // Existing 'email' / 'code' / 'register' steps are preserved.
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
  // Phase 2 password auth state
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [forgotCodeArr, setForgotCodeArr] = useState(['', '', '', '', '', '']);
  const forgotCodeRefs = useRef([]);

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

  // STRIPE-LOGIN-PHASE2-A2: primary email-step submit. Tries password login;
  // on 401 (any cause: wrong password, no password set, unknown email) auto-
  // falls back to /start so legacy customers without password_hash transition
  // into the OTP code flow transparently. Anti-enumeration: same UX path for
  // every 401 cause.
  async function handleLoginSubmit(e) {
    e.preventDefault();
    setError(null);
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !trimmedEmail.includes('@')) {
      setError(t('login.enterEmailFirst'));
      return;
    }
    setLoading(true);
    try {
      // Empty password short-circuits to OTP — no point round-tripping a
      // login that's guaranteed 401. Calls /start directly.
      if (password.length > 0) {
        const loginRes = await portalFetch('/api/portal/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email: trimmedEmail, password }),
        });
        if (loginRes.ok) {
          const data = await loginRes.json();
          login(data.session_token, data);
          trackEvent('portal_login', { method: 'password' });
          setPassword('');
          if (!data.delivery_city && !data.delivery_address) {
            navigate('/portal/profile', { replace: true, state: { incomplete: true } });
            return;
          }
          navigate('/portal/dashboard', { replace: true });
          return;
        }
        // 401 falls through to /start auto-fallback. Other statuses (429,
        // 5xx) handled below as "could not send code".
        if (loginRes.status !== 401) {
          setError(t('login.unknownError'));
          return;
        }
      }
      // Auto-fallback to OTP flow
      const startRes = await portalFetch('/api/portal/auth/start', {
        method: 'POST',
        body: JSON.stringify({ email: trimmedEmail }),
      });
      const startData = await startRes.json();
      if (!startRes.ok) {
        setError(startData.detail || t('login.startFailed'));
        return;
      }
      setPassword('');
      if (startData.action === 'code_sent') {
        setStep('code');
      } else if (startData.action === 'register') {
        setStep('register');
      }
    } catch (err) {
      setError(err.message || t('login.networkError'));
    } finally {
      setLoading(false);
    }
  }

  async function handleForgotPassword(e) {
    e.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !trimmedEmail.includes('@')) {
      setError(t('login.enterEmailFirst'));
      return;
    }
    setError(null);
    setLoading(true);
    try {
      // Backend always returns 200 (anti-enumeration); we don't branch on body.
      await portalFetch('/api/portal/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email: trimmedEmail }),
      });
      setForgotCodeArr(['', '', '', '', '', '']);
      setNewPassword('');
      setConfirmPassword('');
      setStep('forgot_code');
    } catch (err) {
      setError(err.message || t('login.networkError'));
    } finally {
      setLoading(false);
    }
  }

  function handleForgotCodeChange(i, val) {
    if (val.length > 1) val = val.slice(-1);
    if (val && !/^\d$/.test(val)) return;
    const next = [...forgotCodeArr];
    next[i] = val;
    setForgotCodeArr(next);
    if (val && i < 5) {
      forgotCodeRefs.current[i + 1]?.focus();
    }
    if (val && i === 5 && next.every((d) => d)) {
      // All 6 digits entered — transition to password-set step. POST waits
      // until the user submits the new password (single round-trip).
      setStep('reset_password');
    }
  }

  function handleForgotCodeKeyDown(i, e) {
    if (e.key === 'Backspace' && !forgotCodeArr[i] && i > 0) {
      forgotCodeRefs.current[i - 1]?.focus();
    }
  }

  async function handleResetPasswordSubmit(e) {
    e.preventDefault();
    setError(null);
    if (newPassword.length < 8) {
      setError(t('login.passwordTooShort'));
      return;
    }
    if (newPassword !== confirmPassword) {
      setError(t('login.passwordsMismatch'));
      return;
    }
    setLoading(true);
    try {
      const otpCode = forgotCodeArr.join('');
      const res = await portalFetch('/api/portal/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify({
          email: email.trim(),
          otp_code: otpCode,
          new_password: newPassword,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        login(data.session_token, data);
        trackEvent('portal_login', { method: 'password_reset' });
        setNewPassword('');
        setConfirmPassword('');
        setForgotCodeArr(['', '', '', '', '', '']);
        if (!data.delivery_city && !data.delivery_address) {
          navigate('/portal/profile', { replace: true, state: { incomplete: true } });
          return;
        }
        navigate('/portal/dashboard', { replace: true });
        return;
      }
      if (res.status === 400) {
        setError(data.error || t('login.resetFailed'));
        return;
      }
      setError(t('login.unknownError'));
    } catch (err) {
      setError(err.message || t('login.networkError'));
    } finally {
      setLoading(false);
    }
  }

  function handleBackToEmailFromForgot() {
    setStep('email');
    setForgotCodeArr(['', '', '', '', '', '']);
    setNewPassword('');
    setConfirmPassword('');
    setError(null);
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
        password={password}
        setPassword={setPassword}
        onSubmitLogin={handleLoginSubmit}
        onClickForgotPassword={handleForgotPassword}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        forgotCodeArr={forgotCodeArr}
        onForgotCodeChange={handleForgotCodeChange}
        onForgotCodeKeyDown={handleForgotCodeKeyDown}
        forgotCodeRefs={forgotCodeRefs}
        onSubmitResetPassword={handleResetPasswordSubmit}
        onBackToEmailFromForgot={handleBackToEmailFromForgot}
      />
    </>
  );
}
