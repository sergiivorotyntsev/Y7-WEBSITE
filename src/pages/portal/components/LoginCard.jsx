import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Trans } from 'react-i18next';
import SmsConsent from '../../../components/SmsConsent';
import PhoneInput from '../../../components/PhoneInput';
import EmailInputWithCheck from '../../../components/EmailInputWithCheck';

const fonts = {
  serif: "'Playfair Display', Georgia, serif",
  sans: "'DM Sans', system-ui, sans-serif",
  mono: "'DM Mono', monospace",
};

const C = {
  bgPage: '#FAF6EF',
  bgCard: '#FFFFFF',
  bgInput: '#FAF6EF',
  border: '#E8DFD3',
  borderInput: '#E8DFD3',
  borderFocused: '#A0411F',
  text: '#1A1612',
  textMuted: '#5B5226',
  accent: '#A0411F',
  accentHover: '#8A3819',
  accentText: '#F5EFE6',
  errorBg: '#FFF0EC',
};

const labelStyle = {
  fontFamily: fonts.sans,
  fontSize: '12px',
  fontWeight: 600,
  color: C.text,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  display: 'block',
  marginBottom: '4px',
};

const inputStyle = {
  fontFamily: fonts.sans,
  fontSize: '16px',
  padding: '12px 14px',
  height: '48px',
  borderRadius: '8px',
  border: `1px solid ${C.borderInput}`,
  background: C.bgInput,
  color: C.text,
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
};

const primaryBtn = {
  fontFamily: fonts.sans,
  fontSize: '14px',
  fontWeight: 700,
  color: C.accentText,
  background: C.accent,
  border: 'none',
  borderRadius: '8px',
  padding: '14px',
  width: '100%',
  cursor: 'pointer',
};

const secondaryBtn = {
  fontFamily: fonts.sans,
  fontSize: '12px',
  fontWeight: 600,
  color: C.textMuted,
  background: 'transparent',
  border: `1px solid ${C.border}`,
  borderRadius: '8px',
  padding: '10px',
  width: '100%',
  cursor: 'pointer',
};

// REGC-S13-W01: account-type cards lifted verbatim from Onboarding.jsx:43-88
// (title + description + 3 benefits + tone). Dealer is now SHOWN at signup.
const REG_TYPES = [
  {
    id: 'individual',
    title: 'Ship My Car',
    description: 'Single vehicle, personal shipment',
    benefits: [
      'One-vehicle web quote, door-to-door',
      'Pay carrier directly on delivery (COD)',
      '$50 COD or $65 Full Service fee',
    ],
    tone: { border: '#993C1D', bg: '#FFF8F5' },
  },
  {
    id: 'auction_buyer',
    title: 'Auction Buyer',
    description: 'Copart, IAA, Manheim, or similar',
    benefits: [
      'Auction presets (Copart / IAA / Manheim)',
      'Gate-pass upload + VIN decode',
      '$50 COD or $65 Full Service fee',
    ],
    tone: { border: '#B8851F', bg: '#FFFBF0' },
  },
  {
    id: 'dealer',
    title: 'Auto Dealer',
    description: 'Licensed dealer moving inventory / trades',
    benefits: [
      'Volume shipping + saved locations',
      'Dedicated dealer agreement',
      '$50 COD / $65 Full Service (AP service available separately)',
    ],
    tone: { border: '#0F6E56', bg: '#F0FAF6' },
  },
  {
    id: 'exporter',
    title: 'Exporter',
    description: 'Shipping to US ports, warehouses, or containers',
    benefits: [
      'Saved port + warehouse addresses',
      'Container-ready delivery',
      '$50 COD or $65 Full Service fee',
    ],
    tone: { border: '#14648C', bg: '#F0F6FA' },
  },
];

// REGC-S13-W01: pinned dealer pending note (verbatim — no time/SLA promises).
const DEALER_PENDING_NOTE =
  'Dealer accounts require verification before you can place orders directly. ' +
  "You can finish setting up your account now — our team will review your " +
  "dealership and email you once you're approved.";

export default function LoginCard({
  t,
  step,
  email,
  setEmail,
  code,
  loading,
  error,
  reg,
  setRegField,
  onSubmitEmail,
  onCodeChange,
  onCodeKeyDown,
  onBackToEmail,
  onSubmitRegister,
  codeRefs,
  // STRIPE-LOGIN-PHASE2-A2: password auth props
  password,
  setPassword,
  onSubmitLogin,
  onClickForgotPassword,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  forgotCodeArr,
  onForgotCodeChange,
  onForgotCodeKeyDown,
  forgotCodeRefs,
  onSubmitResetPassword,
  onBackToEmailFromForgot,
  // HOTFIX-LOGIN-UX: explicit "Sign up" CTA (footer + post-error)
  onClickSignUp,
  // REGC-S13-W01: account-type step
  regType,
  onSelectType,
  onTypeContinue,
  // REGC-S13-W02/W03: OTP step renders RegisterOtpStep (passed as a node)
  otpStep,
}) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 16px',
      background: 'radial-gradient(ellipse at 30% 30%, #FAF6EF 0%, #F5EFE6 100%)',
    }}>
      <div style={{
        width: '440px',
        maxWidth: '92vw',
        padding: '40px 36px',
        borderRadius: '16px',
        background: C.bgCard,
        boxShadow: '0 4px 24px rgba(26, 22, 18, 0.08)',
      }}>
        <h1 style={{
          fontFamily: fonts.serif,
          fontSize: '24px',
          fontWeight: 700,
          color: C.text,
          textAlign: 'center',
          marginBottom: '8px',
          marginTop: 0,
        }}>
          {step === 'code'
            ? t('login.codeHeading')
            : step === 'reg_type'
            ? 'Choose your account type'
            : step === 'reg_otp'
            ? 'Verify your email'
            : step === 'register'
            ? t('login.registerHeading')
            : step === 'forgot_code'
            ? t('login.forgotCodeHeading')
            : step === 'reset_password'
            ? t('login.resetPasswordHeading')
            : t('login.heading')}
        </h1>

        {step === 'code' && (
          <p style={{
            fontFamily: fonts.sans,
            fontSize: '14px',
            color: C.textMuted,
            textAlign: 'center',
            marginBottom: '28px',
            lineHeight: 1.5,
          }}>
            <Trans i18nKey="login.codeSent" ns="portal" values={{ email }} components={{ strong: <strong style={{ color: C.text }} /> }} />
          </p>
        )}

        {step === 'register' && (
          <p style={{
            fontFamily: fonts.sans,
            fontSize: '14px',
            color: C.textMuted,
            textAlign: 'center',
            marginBottom: '28px',
            lineHeight: 1.5,
          }}>
            {t('login.registerSub')}
          </p>
        )}

        {step === 'email' && (
          <div style={{ height: '20px' }} />
        )}

        {error && (
          <div role="alert" style={{
            fontFamily: fonts.sans,
            fontSize: '13px',
            color: C.accent,
            padding: '10px 14px',
            background: C.errorBg,
            borderRadius: '8px',
            marginBottom: '20px',
            textAlign: 'center',
          }}>
            {error}
          </div>
        )}

        {step === 'email' && (
          <form onSubmit={onSubmitLogin}>
            <div style={{ marginBottom: '16px' }}>
              <EmailInputWithCheck
                id="login-email"
                label={t('login.emailLabel')}
                value={email}
                onChange={setEmail}
                autoFocus
                required
              />
            </div>
            {/* PHASE2-A2: optional password input. Not marked `required` —
                empty submit triggers /login then auto-fallback to /start (OTP),
                same UX as legacy customers without password_hash. */}
            <div style={{ marginBottom: '8px' }}>
              <label style={labelStyle} htmlFor="login-password">
                {t('login.passwordLabel')}
              </label>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('login.passwordPlaceholder')}
                autoComplete="current-password"
                style={inputStyle}
              />
            </div>
            <div style={{ textAlign: 'right', marginBottom: '20px' }}>
              <button
                type="button"
                onClick={onClickForgotPassword}
                style={{
                  fontFamily: fonts.sans,
                  fontSize: '12px',
                  fontWeight: 600,
                  color: C.textMuted,
                  background: 'transparent',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                {t('login.forgotPassword')}
              </button>
            </div>
            <button type="submit" disabled={loading} style={{
              ...primaryBtn,
              opacity: loading ? 0.6 : 1,
            }}>
              {loading ? t('login.signingIn') : t('login.signInButton')}
            </button>
          </form>
        )}

        {step === 'forgot_code' && (
          <div>
            <p style={{
              fontFamily: fonts.sans,
              fontSize: '14px',
              color: C.textMuted,
              textAlign: 'center',
              marginBottom: '24px',
              lineHeight: 1.5,
            }}>
              <Trans
                i18nKey="login.forgotCodeSent"
                ns="portal"
                values={{ email }}
                components={{ strong: <strong style={{ color: C.text }} /> }}
              />
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px' }}>
              {forgotCodeArr.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => { forgotCodeRefs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => onForgotCodeChange(i, e.target.value)}
                  onKeyDown={(e) => onForgotCodeKeyDown(i, e)}
                  autoFocus={i === 0}
                  aria-label={`${t('login.codeLabel')} digit ${i + 1}`}
                  style={{
                    width: '48px',
                    height: '56px',
                    textAlign: 'center',
                    fontFamily: fonts.mono,
                    fontSize: '24px',
                    fontWeight: 700,
                    borderRadius: '10px',
                    border: `2px solid ${digit ? C.accent : C.borderInput}`,
                    background: C.bgCard,
                    color: C.text,
                    outline: 'none',
                  }}
                />
              ))}
            </div>
            <button type="button" onClick={onBackToEmailFromForgot} style={{ ...secondaryBtn, marginTop: '8px' }}>
              {t('login.backToLogin')}
            </button>
          </div>
        )}

        {step === 'reset_password' && (
          <form onSubmit={onSubmitResetPassword}>
            <p style={{
              fontFamily: fonts.sans,
              fontSize: '14px',
              color: C.textMuted,
              textAlign: 'center',
              marginBottom: '20px',
              lineHeight: 1.5,
            }}>
              {t('login.resetPasswordSub')}
            </p>
            <div style={{ marginBottom: '14px' }}>
              <label style={labelStyle} htmlFor="login-new-password">
                {t('login.newPasswordLabel')}
              </label>
              <input
                id="login-new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                autoComplete="new-password"
                minLength={8}
                required
                autoFocus
                style={inputStyle}
              />
            </div>
            <div style={{ marginBottom: '8px' }}>
              <label style={labelStyle} htmlFor="login-confirm-password">
                {t('login.confirmPasswordLabel')}
              </label>
              <input
                id="login-confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                minLength={8}
                required
                style={inputStyle}
              />
            </div>
            <p style={{
              fontFamily: fonts.sans,
              fontSize: '11px',
              color: C.textMuted,
              margin: '0 0 18px',
            }}>
              {t('login.passwordRequirements')}
            </p>
            <button type="submit" disabled={loading} style={{
              ...primaryBtn,
              opacity: loading ? 0.6 : 1,
            }}>
              {loading ? t('login.resetting') : t('login.resetButton')}
            </button>
            <button type="button" onClick={onBackToEmailFromForgot} style={{ ...secondaryBtn, marginTop: '8px' }}>
              {t('login.backToLogin')}
            </button>
          </form>
        )}

        {step === 'code' && (
          <div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '24px' }}>
              {code.map((digit, i) => (
                <input
                  key={i}
                  ref={el => { codeRefs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={e => onCodeChange(i, e.target.value)}
                  onKeyDown={e => onCodeKeyDown(i, e)}
                  autoFocus={i === 0}
                  aria-label={`${t('login.codeLabel')} digit ${i + 1}`}
                  style={{
                    width: '48px',
                    height: '56px',
                    textAlign: 'center',
                    fontFamily: fonts.mono,
                    fontSize: '24px',
                    fontWeight: 700,
                    borderRadius: '10px',
                    border: `2px solid ${digit ? C.accent : C.borderInput}`,
                    background: C.bgCard,
                    color: C.text,
                    outline: 'none',
                  }}
                />
              ))}
            </div>
            {loading && (
              <p style={{ textAlign: 'center', fontFamily: fonts.sans, fontSize: '13px', color: C.textMuted }}>
                {t('login.verifying')}
              </p>
            )}
            <button type="button" onClick={onBackToEmail} style={{ ...secondaryBtn, marginTop: '16px' }}>
              {t('login.differentEmail')}
            </button>
          </div>
        )}

        {step === 'reg_type' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {REG_TYPES.map((tp) => {
              const selected = regType === tp.id;
              return (
                <button
                  key={tp.id}
                  type="button"
                  onClick={() => onSelectType(tp.id)}
                  style={{
                    textAlign: 'left',
                    border: `2px solid ${selected ? tp.tone.border : C.border}`,
                    background: selected ? tp.tone.bg : C.bgCard,
                    borderRadius: '12px',
                    padding: '14px 16px',
                    cursor: 'pointer',
                    width: '100%',
                  }}
                >
                  <div style={{ fontFamily: fonts.sans, fontSize: '15px', fontWeight: 700, color: C.text }}>{tp.title}</div>
                  <div style={{ fontFamily: fonts.sans, fontSize: '12px', color: C.textMuted, marginTop: '2px' }}>{tp.description}</div>
                  <ul style={{ margin: '8px 0 0', paddingLeft: '18px' }}>
                    {tp.benefits.map((b, i) => (
                      <li key={i} style={{ fontFamily: fonts.sans, fontSize: '12px', color: C.textMuted, lineHeight: 1.5 }}>{b}</li>
                    ))}
                  </ul>
                </button>
              );
            })}
            {regType === 'dealer' && (
              <div style={{
                fontFamily: fonts.sans, fontSize: '12px', color: '#0F6E56',
                background: '#F0FAF6', border: '1px solid #0F6E56',
                borderRadius: '8px', padding: '10px 12px', lineHeight: 1.5,
              }}>
                {DEALER_PENDING_NOTE}
              </div>
            )}
            <button type="button" onClick={onTypeContinue} disabled={loading} style={{ ...primaryBtn, opacity: loading ? 0.6 : 1, marginTop: '4px' }}>
              Continue
            </button>
            <button type="button" onClick={onBackToEmail} style={secondaryBtn}>
              {t('login.backToLogin')}
            </button>
          </div>
        )}

        {step === 'reg_otp' && (
          <div>{otpStep}</div>
        )}

        {step === 'register' && (
          <form onSubmit={onSubmitRegister} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}>
            <div>
              <label style={labelStyle} htmlFor="reg-email">{t('login.emailLabel')}</label>
              <input
                id="reg-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={t('login.emailPlaceholder')}
                required
                autoComplete="email"
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle} htmlFor="reg-name">Full Name *</label>
              <input id="reg-name" value={reg.contact_name} onChange={e => setRegField('contact_name', e.target.value)} style={inputStyle} autoFocus />
            </div>
            <div>
              {/* REGC-S13-W03: company required for dealer/exporter, optional otherwise. */}
              <label style={labelStyle} htmlFor="reg-company">
                {['dealer', 'exporter'].includes(regType) ? 'Company Name *' : 'Company Name (optional)'}
              </label>
              <input id="reg-company" value={reg.company_name} onChange={e => setRegField('company_name', e.target.value)} placeholder={['dealer', 'exporter'].includes(regType) ? 'Your dealership / company' : 'Leave empty for private customers'} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Phone</label>
              <PhoneInput value={reg.phone} onChange={v => setRegField('phone', v)} style={inputStyle} />
            </div>
            <div style={{
              fontFamily: fonts.sans, fontSize: '11px', fontWeight: 600,
              color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px',
              paddingTop: '8px', borderTop: `1px solid ${C.border}`,
            }}>
              Delivery Address (your lot — optional)
            </div>
            <div>
              <label style={labelStyle} htmlFor="reg-addr">Street Address</label>
              <input id="reg-addr" value={reg.delivery_address} onChange={e => setRegField('delivery_address', e.target.value)} style={inputStyle} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '10px' }}>
              <div>
                <label style={labelStyle} htmlFor="reg-city">City</label>
                <input id="reg-city" value={reg.delivery_city} onChange={e => setRegField('delivery_city', e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle} htmlFor="reg-state">State</label>
                <input id="reg-state" value={reg.delivery_state} onChange={e => setRegField('delivery_state', e.target.value)} maxLength={2} style={{ ...inputStyle, textTransform: 'uppercase' }} />
              </div>
              <div>
                <label style={labelStyle} htmlFor="reg-zip">ZIP</label>
                <input id="reg-zip" value={reg.delivery_zip} onChange={e => setRegField('delivery_zip', e.target.value)} maxLength={5} inputMode="numeric" style={inputStyle} />
              </div>
            </div>
            <SmsConsent checked={reg.sms_consent} onChange={v => setRegField('sms_consent', v)} />
            <p style={{
              fontFamily: fonts.sans, fontSize: '11px', color: C.textMuted,
              lineHeight: 1.5, textAlign: 'center', margin: '0 0 12px',
            }}>
              By creating an account, you agree to our{' '}
              <a href="/terms" target="_blank" rel="noopener noreferrer" style={{ color: C.accent, textDecoration: 'underline' }}>Terms &amp; Conditions</a>
              {' '}and{' '}
              <a href="/privacy" target="_blank" rel="noopener noreferrer" style={{ color: C.accent, textDecoration: 'underline' }}>Privacy Policy</a>.
            </p>
            <button type="submit" disabled={loading} style={{
              ...primaryBtn,
              opacity: loading ? 0.6 : 1,
            }}>
              {loading ? t('login.registering') : t('login.registerButton')}
            </button>
            <button type="button" onClick={onBackToEmail} style={secondaryBtn}>
              {t('login.differentEmail')}
            </button>
          </form>
        )}
      </div>

      {step === 'email' && (
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <p style={{
            fontFamily: fonts.sans, fontSize: '13px', color: C.textMuted, margin: '0 0 10px',
          }}>
            {t('login.newToY7')}
          </p>
          {/* REGC-S13-W07c: prominent, button-like registration CTA. Was a faint
              inline text link ("кнопка для регистрации еле заметна"); now a
              bordered accent button so the create-account path is clearly visible.
              Still onClickSignUp — direct register-step transition, no roundtrip. */}
          <button type="button" onClick={onClickSignUp} style={{
            fontFamily: fonts.sans,
            fontSize: '14px',
            fontWeight: 700,
            color: C.accent,
            background: 'transparent',
            border: `1.5px solid ${C.accent}`,
            borderRadius: '8px',
            padding: '11px 24px',
            cursor: 'pointer',
            display: 'inline-block',
          }}>
            {t('login.signUp')}
          </button>
          <p style={{
            fontFamily: fonts.sans, fontSize: '12px', color: C.textMuted, margin: '12px 0 0',
          }}>
            <Link to="/ship-my-car" style={{
              fontFamily: fonts.sans, fontWeight: 600, color: C.accent, textDecoration: 'none',
            }}>
              {t('login.getQuote')} →
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
