import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { API_URL } from '../config';
import { colors, fonts, button as btnStyles } from '../theme';
import { trackEvent } from '../utils/analytics';

/**
 * Magic-link landing page (SPRINT-DBIS-T3).
 *
 * Dealers receive an email with a link of the form
 * `https://y7agency.com/portal/magic/{token}`. This page mounts, posts the
 * token to `/api/public/magic/consume`, and on success drops the dealer
 * into `/portal/dashboard` already logged in.
 *
 * The session token returned by the backend is held in the same in-memory
 * `_sessionToken` slot used by `/api/public/telegram-login` (via
 * `useAuth.login`). It is intentionally NOT persisted to localStorage —
 * the dealer stays signed in for the rest of this tab session, and a
 * fresh tab requires a fresh magic link or email-code login.
 *
 * Failure modes (expired, already used, malformed) all collapse to a
 * single user-friendly error state with a path back to the homepage and
 * the dealer-inquiry form, since automatic retry is meaningless for
 * single-use tokens.
 */
export default function MagicLogin() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [status, setStatus] = useState('loading'); // 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState(null);
  // Strict-mode and React 19 invoke effects twice in development; the
  // backend marks tokens used on first verify, so a naive double-call
  // would always fail the second invocation. Guard with a ref.
  const consumedRef = useRef(false);

  useEffect(() => {
    if (consumedRef.current) return;
    consumedRef.current = true;

    if (!token) {
      setStatus('error');
      setErrorMessage('Missing magic link token.');
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${API_URL}/api/public/magic/consume`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });
        const data = await res.json().catch(() => ({}));
        if (cancelled) return;
        if (res.ok && data.ok && data.session_token) {
          login(data.session_token, data.user);
          trackEvent('portal_login', { method: 'magic_link' });
          // Land in the portal dashboard. The session is in memory only,
          // so we navigate within the SPA rather than doing a hard
          // redirect (which would discard the in-memory session).
          navigate('/portal/dashboard', { replace: true });
          return;
        }
        // Backend returns 401 with `detail: "Invalid or expired magic link"`
        // for any failed verify. We surface a single, friendly message
        // because the dealer cannot meaningfully distinguish the cases.
        setStatus('error');
        setErrorMessage(data.detail || data.error || null);
      } catch {
        if (cancelled) return;
        setStatus('error');
        setErrorMessage('Network error. Please check your connection and try again.');
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [token, login, navigate]);

  if (status === 'loading') {
    return (
      <div style={{
        maxWidth: '480px',
        margin: '0 auto',
        padding: '120px 24px 80px',
        textAlign: 'center',
      }}>
        <div style={{
          fontFamily: fonts.serif,
          fontSize: '22px',
          fontWeight: 700,
          color: colors.text,
          marginBottom: '12px',
        }}>
          Signing you in...
        </div>
        <p style={{
          fontFamily: fonts.sans,
          fontSize: '14px',
          color: colors.textMuted,
          lineHeight: 1.6,
        }}>
          One moment while we open your dealer portal.
        </p>
      </div>
    );
  }

  // status === 'error'
  return (
    <div style={{
      maxWidth: '480px',
      margin: '0 auto',
      padding: '80px 24px',
      textAlign: 'center',
    }}>
      <div style={{
        fontFamily: fonts.serif,
        fontSize: '24px',
        fontWeight: 700,
        color: colors.text,
        marginBottom: '12px',
      }}>
        This link has expired or been used
      </div>
      <p style={{
        fontFamily: fonts.sans,
        fontSize: '14px',
        color: colors.textMuted,
        lineHeight: 1.7,
        marginBottom: '24px',
      }}>
        Magic links can only be used once and expire 72 hours after they
        are sent. Please contact Y7 Logistics or submit a new dealer
        inquiry to receive a fresh link.
      </p>
      {errorMessage && (
        <div style={{
          fontFamily: fonts.sans,
          fontSize: '12px',
          color: colors.textMuted,
          marginBottom: '24px',
          fontStyle: 'italic',
        }}>
          ({errorMessage})
        </div>
      )}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        alignItems: 'center',
      }}>
        <Link
          to="/dealers"
          style={{
            ...btnStyles.accent,
            display: 'inline-block',
            padding: '12px 28px',
            fontSize: '14px',
            textDecoration: 'none',
          }}
        >
          Submit a new dealer inquiry
        </Link>
        <Link
          to="/"
          style={{
            fontFamily: fonts.sans,
            fontSize: '13px',
            color: colors.accent,
            textDecoration: 'none',
            marginTop: '4px',
          }}
        >
          Back to homepage
        </Link>
      </div>
    </div>
  );
}
