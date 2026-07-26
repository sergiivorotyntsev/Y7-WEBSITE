import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { API_URL } from '../../config';
import { fonts } from '../../theme';

/**
 * NEX-2-T06 — set-password landing for an invited account member.
 *
 * The token in the URL IS the credential: GET validates it, POST exchanges it
 * for a password + session. Every failure mode gets its OWN message — an
 * expired link and a typo'd link are different problems for the person holding
 * them.
 *
 * V2 Dispatch Board system, tokens with fallbacks (never bare hex). The system
 * has no green: success is stated in ink, not colour.
 */

const INK = 'var(--v2-ink, #050607)';
const INK_MUTED = 'var(--v2-ink-muted, #5c5851)';
const PAPER = 'var(--v2-paper, #f4f0e8)';
const CARD = 'var(--v2-card-cream, #fffaf1)';
const LINE = 'var(--v2-line-on-paper, rgba(5, 6, 7, 0.14))';
const RED = 'var(--v2-red, #d70f24)';
const RED_DEEP = 'var(--v2-red-deep, #a90918)';

const MIN_LEN = 8;

// One message per state — deliberately distinct (Phase 6 requirement).
const FAILURE_COPY = {
  invitation_invalid: {
    title: 'This link is not valid',
    body: 'Double-check the link from your invitation email — it may have been cut short by your mail client. If it still fails, ask Y7 to send a new invitation.',
  },
  invitation_expired: {
    title: 'This invitation has expired',
    body: 'Invitation links are valid for 7 days. Ask Y7 to send a new one and it will work immediately.',
  },
  invitation_used: {
    title: 'This invitation has already been used',
    body: 'Your password is already set. Sign in with your email and password.',
    signIn: true,
  },
  invitation_revoked: {
    title: 'This invitation was revoked',
    body: 'Y7 cancelled this link, most likely because a newer one was sent. Check your inbox for the latest invitation email.',
  },
};

export default function AcceptInvitation() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const token = params.get('token') || '';

  const [state, setState] = useState('loading'); // loading | ready | failed | done
  const [invite, setInvite] = useState(null);
  const [failure, setFailure] = useState(null);
  const [pw, setPw] = useState('');
  const [pw2, setPw2] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      setFailure(FAILURE_COPY.invitation_invalid);
      setState('failed');
      return;
    }
    let alive = true;
    (async () => {
      try {
        const r = await fetch(`${API_URL}/api/portal/auth/invitation/${encodeURIComponent(token)}`);
        const body = await r.json().catch(() => ({}));
        if (!alive) return;
        if (r.ok) {
          setInvite(body);
          setState('ready');
          return;
        }
        const code = body?.detail?.error || body?.error;
        setFailure(FAILURE_COPY[code] || FAILURE_COPY.invitation_invalid);
        setState('failed');
      } catch {
        if (!alive) return;
        setFailure({
          title: 'We could not check this link',
          body: 'Something went wrong reaching Y7. Please try again in a moment.',
        });
        setState('failed');
      }
    })();
    return () => { alive = false; };
  }, [token]);

  const tooShort = pw.length > 0 && pw.length < MIN_LEN;
  const mismatch = pw2.length > 0 && pw !== pw2;
  const canSubmit = pw.length >= MIN_LEN && pw === pw2 && !submitting;

  async function submit(e) {
    e?.preventDefault?.();
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);
    try {
      const r = await fetch(`${API_URL}/api/portal/auth/accept-invitation`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password: pw }),
      });
      const body = await r.json().catch(() => ({}));
      if (r.ok) {
        setState('done');
        setTimeout(() => navigate('/portal/dashboard'), 900);
        return;
      }
      const code = body?.detail?.error || body?.error;
      if (FAILURE_COPY[code]) {
        setFailure(FAILURE_COPY[code]);
        setState('failed');
        return;
      }
      setError(body?.detail?.message || body?.detail || 'Could not set your password. Please try again.');
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={wrap}>
      <div style={card}>
        <div style={eyebrow}>Y7 Logistics · Account access</div>

        {state === 'loading' && (
          <p style={{ ...text, margin: 0 }}>Checking your invitation…</p>
        )}

        {state === 'failed' && failure && (
          <>
            <h1 style={heading}>{failure.title}</h1>
            <p style={text}>{failure.body}</p>
            <div style={{ display: 'flex', gap: 12, marginTop: 20, flexWrap: 'wrap' }}>
              {failure.signIn && (
                <button type="button" onClick={() => navigate('/portal/login')} style={primaryBtn}>
                  Go to sign in
                </button>
              )}
              <a href="/contact" style={{ ...secondaryBtn, textDecoration: 'none' }}>Contact Y7</a>
            </div>
          </>
        )}

        {state === 'ready' && (
          <form onSubmit={submit}>
            <h1 style={heading}>Set your password</h1>
            <p style={text}>
              You have been invited to the{' '}
              <strong style={{ color: INK }}>{invite?.company_name || 'Y7'}</strong> account.
              You will sign in with{' '}
              <strong style={{ color: INK, fontFamily: 'monospace' }}>{invite?.email}</strong>.
            </p>

            <label style={label} htmlFor="nex2-pw">New password</label>
            <input
              id="nex2-pw"
              type="password"
              value={pw}
              onChange={e => setPw(e.target.value)}
              autoComplete="new-password"
              autoFocus
              style={input}
            />
            <div style={rules}>
              At least {MIN_LEN} characters. Use something you do not reuse elsewhere.
            </div>
            {tooShort && <div style={fieldError}>Too short — {MIN_LEN} characters minimum.</div>}

            <label style={{ ...label, marginTop: 16 }} htmlFor="nex2-pw2">Repeat password</label>
            <input
              id="nex2-pw2"
              type="password"
              value={pw2}
              onChange={e => setPw2(e.target.value)}
              autoComplete="new-password"
              style={input}
            />
            {mismatch && <div style={fieldError}>The two passwords do not match.</div>}

            {error && <div style={errorBox}>{error}</div>}

            <button type="submit" disabled={!canSubmit} style={{
              ...primaryBtn,
              marginTop: 20,
              width: '100%',
              opacity: canSubmit ? 1 : 0.45,
              cursor: canSubmit ? 'pointer' : 'not-allowed',
            }}>
              {submitting ? 'Setting your password…' : 'Set password and sign in'}
            </button>
          </form>
        )}

        {state === 'done' && (
          <>
            <h1 style={heading}>Password set</h1>
            <p style={text}>Signing you in…</p>
          </>
        )}
      </div>
    </div>
  );
}

const wrap = {
  minHeight: '100vh',
  background: PAPER,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  padding: '48px 20px 80px',
};

const card = {
  width: '100%',
  maxWidth: 460,
  background: CARD,
  border: `1px solid ${LINE}`,
  borderRadius: 18,
  padding: 32,
  boxShadow: '0 4px 16px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.06)',
};

const eyebrow = {
  fontFamily: fonts.sans,
  fontSize: 11,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: INK_MUTED,
  marginBottom: 14,
};

const heading = {
  fontFamily: 'var(--v2-font-display, Oswald, system-ui)',
  textTransform: 'uppercase',
  fontSize: 24,
  fontWeight: 600,
  letterSpacing: '0.01em',
  lineHeight: 1.05,
  color: INK,
  margin: '0 0 10px',
};

const text = {
  fontFamily: fonts.sans,
  fontSize: 14,
  lineHeight: 1.6,
  color: INK_MUTED,
  margin: '0 0 18px',
};

const label = {
  display: 'block',
  fontFamily: fonts.sans,
  fontSize: 13,
  fontWeight: 600,
  color: INK,
  marginBottom: 6,
};

const input = {
  width: '100%',
  padding: '10px 12px',
  fontSize: 16, // >=16px avoids iOS focus-zoom
  fontFamily: fonts.sans,
  border: `1px solid ${LINE}`,
  borderRadius: 8,
  background: CARD,
  color: INK,
  boxSizing: 'border-box',
};

const rules = {
  fontFamily: fonts.sans,
  fontSize: 12,
  color: INK_MUTED,
  marginTop: 6,
};

const fieldError = {
  fontFamily: fonts.sans,
  fontSize: 12,
  color: RED_DEEP,
  marginTop: 6,
};

const errorBox = {
  fontFamily: fonts.sans,
  fontSize: 13,
  color: RED_DEEP,
  background: 'rgba(215, 15, 36, 0.06)',
  border: `1px solid ${RED}`,
  borderRadius: 8,
  padding: '10px 12px',
  marginTop: 16,
};

const primaryBtn = {
  padding: '12px 24px',
  background: 'var(--v2-red-gradient, linear-gradient(135deg, #d70f24, #a90918))',
  color: '#fff7ed',
  border: 'none',
  borderRadius: 8,
  fontSize: 13,
  fontWeight: 600,
  fontFamily: fonts.sans,
  letterSpacing: '0.5px',
  cursor: 'pointer',
};

const secondaryBtn = {
  padding: '12px 24px',
  background: 'transparent',
  color: INK,
  border: `1px solid ${LINE}`,
  borderRadius: 8,
  fontSize: 13,
  fontWeight: 600,
  fontFamily: fonts.sans,
  letterSpacing: '0.5px',
  cursor: 'pointer',
  display: 'inline-block',
};
