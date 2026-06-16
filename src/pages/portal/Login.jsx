import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageMeta from '../../components/PageMeta';
import { useAuth, portalFetch } from '../../hooks/useAuth';
import { getCleanPhone, isValidPhone } from '../../components/PhoneInput';
import { trackEvent } from '../../utils/trackEvent';
import LoginCard from './components/LoginCard';
import RegisterOtpStep from '../../components/RegisterOtpStep';

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation('portal');
  const { user, login } = useAuth();
  // STRIPE-LOGIN-PHASE2-A2: state machine extended with two new steps
  // ('forgot_code' and 'reset_password') for the password reset flow.
  // Existing 'email' / 'code' / 'register' steps are preserved.
  const [step, setStep] = useState('email');
  // S4-SMALL-W03: a /portal/register?email=…&ref=… link (e.g. PostQuoteFlow's
  // post-quote "create account" CTA) is redirected here with its query string
  // preserved (App.jsx RegisterRedirect). Seed the email from ?email once so the
  // customer doesn't retype it before signing in / resetting a password /
  // signing up. We do NOT auto-advance into the register form: a post-quote
  // "new" customer already has a customers row, so register-verify-email would
  // 409 — the email screen lets them log in or reset instead.
  const [email, setEmail] = useState(() => searchParams.get('email') || '');
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const codeRefs = useRef([]);
  const [reg, setReg] = useState({
    company_name: '', contact_name: '', phone: '',
    delivery_address: '', delivery_city: '', delivery_state: '', delivery_zip: '',
    sms_consent: false,
  });
  // REGC-S13-W01/W03: OTP-first signup with an account-type step.
  // regType: chosen customer_type ('' until selected); pendingId: from
  // register-verify-email, consumed by the RegisterOtpStep.
  const [regType, setRegType] = useState('');
  const [pendingId, setPendingId] = useState(null);
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

  // HOTFIX-LOGIN-UX: primary email-step submit. Calls /login with email +
  // password. On 401 the user sees an explicit error + CTAs (Forgot password
  // / Sign up). NO auto-fallback to /start — the prior fallback leaked
  // customer existence by routing unknown emails into the OTP path while
  // wrong-password stayed there too. Empty password short-circuits with a
  // local message instead of round-tripping a guaranteed-401 to the server.
  async function handleLoginSubmit(e) {
    e.preventDefault();
    setError(null);
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !trimmedEmail.includes('@')) {
      setError(t('login.enterEmailFirst'));
      return;
    }
    if (!password) {
      setError(t('login.passwordRequired'));
      return;
    }
    setLoading(true);
    try {
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
      if (loginRes.status === 401) {
        setError(t('login.invalidCredentials'));
        return;
      }
      setError(t('login.unknownError'));
    } catch (err) {
      setError(err.message || t('login.networkError'));
    } finally {
      setLoading(false);
    }
  }

  // HOTFIX-LOGIN-UX: direct register-step transition. No server roundtrip —
  // the user explicitly chose 'Sign up' from the login screen, so we move
  // them straight to the register form. Email is preserved so they don't
  // re-type. Anti-enumeration: this transition is user-initiated, never
  // server-driven (the /start endpoint no longer signals 'register').
  function handleClickSignUp() {
    // REGC-S13-W01: signup now starts with the account-type step.
    setStep('reg_type');
    setError(null);
  }

  // REGC-S13-W01: account-type selection. Choosing a card sets the type;
  // Continue advances to the profile step. Dealer shows a pending note inline.
  function handleSelectType(typeId) {
    setRegType(typeId);
    setError(null);
  }

  function handleTypeContinue() {
    if (!regType) { setError('Please choose an account type to continue.'); return; }
    setError(null);
    setStep('register');
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

  // REGC-S13-W03: OTP-first signup. Profile submit now POSTs
  // register-verify-email (NOT web-register) with the chosen customer_type +
  // sms_consent; on success we transition to the RegisterOtpStep. The customer
  // row is created only after the OTP is confirmed (register-verify-code).
  async function handleRegisterSubmit(e) {
    e.preventDefault();
    setError(null);
    if (!reg.contact_name.trim()) { setError('Full name is required'); return; }
    if (['dealer', 'exporter'].includes(regType) && !reg.company_name.trim()) {
      setError('Company name is required for dealer and exporter accounts.');
      return;
    }
    if (reg.phone && !isValidPhone(reg.phone)) {
      setError('Please enter a valid 10-digit phone number, or leave it blank.');
      return;
    }
    setLoading(true);
    try {
      const res = await portalFetch('/api/portal/auth/register-verify-email', {
        method: 'POST',
        body: JSON.stringify({
          ...reg,
          email: email.trim(),
          phone: reg.phone ? getCleanPhone(reg.phone) : '',
          customer_type: regType || undefined,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok && data.pending_id) {
        setPendingId(data.pending_id);
        setStep('reg_otp');
      } else {
        const detail = data?.detail;
        if (detail && typeof detail === 'object') {
          setError(detail.message || detail.detail || detail.error || 'Could not start verification.');
        } else {
          setError(detail || data.error || 'Could not start verification.');
        }
      }
    } catch (err) {
      setError(err.message || 'Network error');
    } finally {
      setLoading(false);
    }
  }

  // REGC-S13-W03 / S4-SMALL-W02: RegisterOtpStep success → session established
  // by the backend (session_token + cookie) AND applied synchronously by the
  // login() call below — it sets the in-memory token + normalized `user`
  // (which carries customer_type, contact_name, phone, agreement_signed=false
  // from the register-verify-code response) BEFORE we navigate. So go STRAIGHT
  // to the onboarding wizard instead of bouncing through /portal/dashboard:
  // the ProtectedRoute on /portal/onboarding sees `user` immediately (no
  // re-fetch, no bounce-to-login), and firstIncompleteStep lands the classified
  // registrant on Agreement (type step skipped, profile pre-filled). This
  // removes the visible dashboard flash — the "two disjoint pieces" feeling.
  function handleRegisterOtpSuccess(data) {
    login(data.session_token, data);
    trackEvent('portal_register', { method: 'otp', customer_type: regType || 'unknown' });
    navigate('/portal/onboarding', { replace: true });
  }

  function handleRegisterOtpCancel() {
    setPendingId(null);
    setStep('register');
    setError(null);
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
        onClickSignUp={handleClickSignUp}
        regType={regType}
        onSelectType={handleSelectType}
        onTypeContinue={handleTypeContinue}
        otpStep={
          step === 'reg_otp' ? (
            <RegisterOtpStep
              pendingId={pendingId}
              email={email}
              onSuccess={handleRegisterOtpSuccess}
              onCancel={handleRegisterOtpCancel}
            />
          ) : null
        }
      />
    </>
  );
}
