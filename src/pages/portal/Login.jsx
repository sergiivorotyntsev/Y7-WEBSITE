import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, portalFetch } from '../../hooks/useAuth';
import { colors, fonts, button as btnStyles } from '../../theme';

const inputStyle = {
  fontFamily: fonts.sans,
  fontSize: '14px',
  padding: '12px 14px',
  borderRadius: '8px',
  border: `1px solid ${colors.borderInput}`,
  background: colors.bgInput,
  color: colors.text,
  outline: 'none',
  width: '100%',
};

export default function Login() {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [step, setStep] = useState('email'); // 'email' | 'code'
  const [email, setEmail] = useState('');
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const codeRefs = useRef([]);

  // Redirect if already logged in
  useEffect(() => {
    if (user) navigate('/portal/dashboard', { replace: true });
  }, [user, navigate]);

  async function handleRequestCode(e) {
    e.preventDefault();
    setError(null);
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    setLoading(true);
    try {
      const res = await portalFetch('/api/portal/auth/request-code', {
        method: 'POST',
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (res.ok) {
        setStep('code');
      } else {
        setError(data.detail || data.error || 'Failed to send code');
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
    // Auto-submit when all 6 filled
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

  return (
    <div style={{ maxWidth: '440px', margin: '0 auto', padding: '60px 24px 80px' }}>
      <h1 style={{
        fontFamily: fonts.serif,
        fontSize: '28px',
        fontWeight: 700,
        color: colors.text,
        textAlign: 'center',
        marginBottom: '8px',
      }}>
        {step === 'email' ? 'Log In to Your Account' : 'Enter Verification Code'}
      </h1>
      <p style={{
        fontFamily: fonts.sans,
        fontSize: '14px',
        color: colors.textMuted,
        textAlign: 'center',
        marginBottom: '32px',
      }}>
        {step === 'email'
          ? 'Enter your email and we\'ll send you a 6-digit login code.'
          : `We sent a code to ${email}. Check your inbox.`}
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
          textAlign: 'center',
        }}>
          {error}
        </div>
      )}

      {step === 'email' ? (
        <form onSubmit={handleRequestCode}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              fontFamily: fonts.sans,
              fontSize: '12px',
              fontWeight: 600,
              color: colors.text,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              display: 'block',
              marginBottom: '6px',
            }}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@company.com"
              style={inputStyle}
              autoFocus
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              ...btnStyles.accent,
              width: '100%',
              padding: '14px',
              fontSize: '14px',
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? 'Sending...' : 'Send Login Code'}
          </button>
        </form>
      ) : (
        <div>
          <div style={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'center',
            marginBottom: '24px',
          }}>
            {code.map((digit, i) => (
              <input
                key={i}
                ref={el => { codeRefs.current[i] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleCodeChange(i, e.target.value)}
                onKeyDown={e => handleCodeKeyDown(i, e)}
                autoFocus={i === 0}
                style={{
                  width: '48px',
                  height: '56px',
                  textAlign: 'center',
                  fontFamily: fonts.mono,
                  fontSize: '24px',
                  fontWeight: 700,
                  borderRadius: '10px',
                  border: `2px solid ${digit ? colors.accent : colors.borderInput}`,
                  background: colors.bgCard,
                  color: colors.text,
                  outline: 'none',
                  transition: 'border-color 200ms ease',
                }}
              />
            ))}
          </div>
          {loading && (
            <p style={{ textAlign: 'center', fontFamily: fonts.sans, fontSize: '13px', color: colors.textMuted }}>
              Verifying...
            </p>
          )}
          <button
            type="button"
            onClick={() => { setStep('email'); setCode(['', '', '', '', '', '']); setError(null); }}
            style={{
              ...btnStyles.secondary,
              width: '100%',
              marginTop: '16px',
              fontSize: '12px',
            }}
          >
            Use a different email
          </button>
        </div>
      )}

      <div style={{
        marginTop: '32px',
        textAlign: 'center',
        fontFamily: fonts.sans,
        fontSize: '13px',
        color: colors.textMuted,
      }}>
        <div style={{ marginBottom: '12px' }}>
          Don't have an account?{' '}
          <Link to="/portal/register" style={{ color: colors.accent, fontWeight: 600 }}>Register</Link>
        </div>
        <div>
          Or connect via{' '}
          <a href="https://t.me/y7dispatch_bot" target="_blank" rel="noopener noreferrer"
            style={{ color: colors.accent, fontWeight: 600 }}>
            Telegram Bot
          </a>
        </div>
      </div>
    </div>
  );
}
