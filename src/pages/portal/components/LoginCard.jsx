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
          {step === 'code' ? t('login.codeHeading') : step === 'register' ? t('login.registerHeading') : t('login.heading')}
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
            {t('login.registerSub', { email })}
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
          <form onSubmit={onSubmitEmail}>
            <div style={{ marginBottom: '20px' }}>
              <EmailInputWithCheck
                id="login-email"
                label={t('login.emailLabel')}
                value={email}
                onChange={setEmail}
                autoFocus
                required
              />
            </div>
            <button type="submit" disabled={loading} style={{
              ...primaryBtn,
              opacity: loading ? 0.6 : 1,
            }}>
              {loading ? t('login.submitting') : t('login.submitButton')}
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

        {step === 'register' && (
          <form onSubmit={onSubmitRegister} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}>
            <div style={{
              fontFamily: fonts.sans, fontSize: '13px', color: C.textMuted,
              background: C.bgInput, padding: '10px 14px', borderRadius: '8px',
            }}>
              Email: <strong>{email}</strong>
            </div>
            <div>
              <label style={labelStyle} htmlFor="reg-name">Full Name *</label>
              <input id="reg-name" value={reg.contact_name} onChange={e => setRegField('contact_name', e.target.value)} style={inputStyle} autoFocus />
            </div>
            <div>
              <label style={labelStyle} htmlFor="reg-company">Company Name (optional)</label>
              <input id="reg-company" value={reg.company_name} onChange={e => setRegField('company_name', e.target.value)} placeholder="Leave empty for private customers" style={inputStyle} />
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
        <p style={{
          fontFamily: fonts.sans,
          fontSize: '13px',
          color: C.textMuted,
          textAlign: 'center',
          marginTop: '24px',
        }}>
          {t('login.newToY7')}{' '}
          <Link to="/ship-my-car" style={{
            fontFamily: fonts.sans,
            fontSize: '13px',
            fontWeight: 700,
            color: C.accent,
            textDecoration: 'none',
          }}>
            {t('login.getQuote')} →
          </Link>
        </p>
      )}
    </div>
  );
}
