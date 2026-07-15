import { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageMeta from '../../components/PageMeta';
import { useAuth, portalFetch } from '../../hooks/useAuth';
import { getCleanPhone, isValidPhone } from '../../components/PhoneInput';
import { trackEvent } from '../../utils/trackEvent';
import LoginCard from './components/LoginCard';
import RegisterOtpStep from '../../components/RegisterOtpStep';
import { colors, fonts, button as btnStyles, keyframes, radii, shadows } from '../../theme';

// PHASE1-RECOVERY: mask an email for the recovery screen (e.g. d••••@gmail.com).
// Pure + module-level (prerender-safe).
function maskEmail(addr) {
  if (!addr || !addr.includes('@')) return addr || '';
  const [local, domain] = addr.split('@');
  const head = local.slice(0, 1) || '';
  return `${head}••••@${domain}`;
}

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
  // CO3W-T05: honor an internal return path (?next=/portal/...) after login —
  // mirrors MagicLogin's nextPath handling (WGF-T03d). External/absolute URLs
  // are ignored; only in-app /portal paths pass.
  const rawNext = searchParams.get('next') || '';
  const nextPath = rawNext.startsWith('/portal') && !rawNext.startsWith('//') ? rawNext : null;
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
  // PHASE1-RECOVERY: 'idle' | 'sending' | 'sent' for the resend-signin control.
  const [resendState, setResendState] = useState('idle');
  // FX-4: true when the existing account is quote-origin (passwordless, created
  // by an anonymous quote) — drives welcoming "finish setting up" recovery copy
  // instead of the misleading "you already started" message.
  const [recoveryQuoteOrigin, setRecoveryQuoteOrigin] = useState(false);

  const loginRef = useRef(login);
  const navigateRef = useRef(navigate);
  loginRef.current = login;
  navigateRef.current = navigate;

  useEffect(() => {
    if (user) navigate(nextPath || '/portal/dashboard', { replace: true });
  }, [user, navigate, nextPath]);

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
        navigate(nextPath || '/portal/dashboard', { replace: true });
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
        navigate(nextPath || '/portal/dashboard', { replace: true });
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
        const errCode = detail && typeof detail === 'object' ? detail.error : null;
        // PHASE1-RECOVERY: an already-registered email is NOT an error. The
        // customer (often a passwordless intake/inquiry dealer) already has an
        // account — route to the friendly recovery screen and email a fresh
        // sign-in link, instead of a red dead-end. This also neutralizes the
        // prior enumeration-flavored "already registered" message.
        if (res.status === 409 && errCode === 'email_already_registered') {
          triggerRecovery(detail.quote_origin === true);
        } else if (detail && typeof detail === 'object') {
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

  // PHASE1-RECOVERY: email the existing account a fresh passwordless sign-in
  // link. Always treated as success (the backend is enumeration-safe / neutral).
  async function sendSigninLink() {
    setResendState('sending');
    try {
      await portalFetch('/api/portal/auth/resend-signin', {
        method: 'POST',
        body: JSON.stringify({ email: email.trim() }),
      });
    } catch {
      // Neutral by design — we still show "sent" so we never leak existence.
    }
    setResendState('sent');
    trackEvent('portal_recovery_link_sent', { method: 'resend_signin' });
  }

  function triggerRecovery(quoteOrigin = false) {
    setError(null);
    setRecoveryQuoteOrigin(quoteOrigin === true);
    setResendState('sending');
    setStep('recovery');
    sendSigninLink();
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
        navigate(nextPath || '/portal/dashboard', { replace: true });
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

  // PHASE1-RECOVERY: premium recovery screen — shown when a self-registering
  // email already has an account. Helps the passwordless intake/inquiry dealer
  // (magic link) without confusing a password user (clear "sign in" path).
  if (step === 'recovery') {
    const masked = maskEmail(email);
    return (
      <>
        <PageMeta title="Check your email" description="We've emailed your sign-in link." path="/portal/login" />
        <style>{keyframes}</style>
        <div style={{
          minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '40px 20px',
          background: `radial-gradient(1100px 480px at 50% -8%, ${colors.bgMuted} 0%, transparent 62%), linear-gradient(160deg, #faf8f4 0%, #ffffff 70%)`,
          animation: 'fadeIn 400ms ease',
        }}>
          <div style={{
            width: '100%', maxWidth: 460, background: colors.bgCard,
            border: `1px solid ${colors.border}`, borderRadius: radii.xl,
            boxShadow: (shadows && shadows.lg) || '0 20px 50px rgba(0,0,0,0.10)',
            padding: '40px 32px', textAlign: 'center',
            animation: 'fadeUp 500ms ease both',
          }}>
            <div style={{
              width: 64, height: 64, margin: '0 auto 20px', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentHover})`,
              boxShadow: `0 10px 24px ${colors.accent}40`,
              animation: 'bounceIn 600ms ease both',
            }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
            </div>

            <h1 style={{ fontFamily: fonts.serif, fontSize: 24, fontWeight: 700, color: colors.text, margin: '0 0 10px' }}>
              {recoveryQuoteOrigin ? 'Welcome — let’s finish setting up' : 'You already started with Y7'}
            </h1>
            <p style={{ fontFamily: fonts.sans, fontSize: 15, lineHeight: 1.6, color: colors.textMuted, margin: '0 0 4px' }}>
              {recoveryQuoteOrigin
                ? 'We found your earlier quote. We’ve emailed a sign-in link to'
                : 'We’ve emailed your sign-in link to'}
            </p>
            <p style={{ fontFamily: fonts.mono, fontSize: 15, fontWeight: 600, color: colors.text, margin: '0 0 18px' }}>
              {masked}
            </p>
            <p style={{ fontFamily: fonts.sans, fontSize: 14, lineHeight: 1.6, color: colors.textMuted, margin: '0 0 22px' }}>
              Click the link to jump straight back into your account &mdash; no password needed. It&rsquo;s valid for 24 hours.
            </p>

            {resendState === 'sent' ? (
              <div style={{
                fontFamily: fonts.sans, fontSize: 13, color: colors.accent, fontWeight: 600,
                marginBottom: 18, animation: 'popUp 300ms ease both',
              }}>
                &#10003; Link sent &mdash; check your inbox (and spam).
              </div>
            ) : (
              <div style={{
                fontFamily: fonts.sans, fontSize: 13, color: colors.textMuted,
                marginBottom: 18, animation: 'pulse 1.2s ease infinite',
              }}>
                Sending your link&hellip;
              </div>
            )}

            <button
              type="button"
              onClick={sendSigninLink}
              disabled={resendState === 'sending'}
              style={{ ...btnStyles.accent, width: '100%', marginBottom: 12, opacity: resendState === 'sending' ? 0.7 : 1, cursor: resendState === 'sending' ? 'default' : 'pointer' }}
            >
              {resendState === 'sending' ? 'Sending…' : 'Resend sign-in link'}
            </button>

            <button
              type="button"
              onClick={() => { setResendState('idle'); setError(null); setStep('email'); }}
              style={{
                width: '100%', background: 'transparent', border: `1px solid ${colors.border}`,
                borderRadius: radii.md, padding: '11px 16px', fontFamily: fonts.sans,
                fontSize: 14, fontWeight: 600, color: colors.text, cursor: 'pointer',
                transition: 'border-color 150ms ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = colors.accent; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = colors.border; }}
            >
              Sign in with a password instead
            </button>

            <button
              type="button"
              onClick={() => { setResendState('idle'); setError(null); setStep('email'); }}
              style={{
                marginTop: 16, background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: fonts.sans, fontSize: 13, color: colors.textMuted, textDecoration: 'underline',
              }}
            >
              Use a different email
            </button>
          </div>
        </div>
      </>
    );
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
