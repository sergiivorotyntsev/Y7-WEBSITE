import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { colors, fonts } from '../theme';

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
}

export function getConsent() {
  return getCookie('y7_consent');
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getCookie('y7_consent')) {
      setVisible(true);
    }
  }, []);

  function accept(level) {
    setCookie('y7_consent', level, 365);
    setVisible(false);
    if (level === 'all') {
      // Enable GA4 if measurement ID exists
      const gaId = import.meta.env.VITE_GA_ID;
      if (gaId && typeof window.gtag === 'function') {
        window.gtag('config', gaId);
      }
    }
  }

  if (!visible) return null;

  return (
    <>
      <style>{`
        .cookie-banner {
          position: fixed; bottom: 0; left: 0; right: 0; z-index: 999;
          background: ${colors.bg}; border-top: 1px solid ${colors.border};
          box-shadow: 0 -4px 24px rgba(0,0,0,0.08);
          padding: 20px 24px;
        }
        .cookie-inner {
          max-width: 900px; margin: 0 auto;
          display: flex; align-items: center; gap: 20px; flex-wrap: wrap;
        }
        .cookie-text { flex: 1; min-width: 280px; }
        .cookie-actions { display: flex; gap: 10px; flex-wrap: wrap; }
        @media (max-width: 600px) {
          .cookie-inner { flex-direction: column; align-items: stretch; }
          .cookie-actions { flex-direction: column; }
          .cookie-actions button, .cookie-actions a {
            width: 100%; text-align: center; box-sizing: border-box;
          }
        }
      `}</style>
      <div className="cookie-banner" role="dialog" aria-label="Cookie consent">
        <div className="cookie-inner">
          <div className="cookie-text">
            <p style={{
              fontFamily: fonts.sans, fontSize: '13px', color: colors.textMuted,
              lineHeight: 1.6, margin: 0,
            }}>
              We use cookies to improve your experience and analyze site traffic.
              By continuing to use this site, you agree to our{' '}
              <Link to="/privacy" style={{ color: colors.accent, textDecoration: 'underline' }}>Privacy Policy</Link>.
            </p>
          </div>
          <div className="cookie-actions">
            <button
              onClick={() => accept('all')}
              style={{
                fontFamily: fonts.sans, fontSize: '13px', fontWeight: 600,
                background: colors.accent, color: '#fff',
                border: 'none', borderRadius: '20px',
                padding: '10px 24px', cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              Accept All
            </button>
            <button
              onClick={() => accept('essential')}
              style={{
                fontFamily: fonts.sans, fontSize: '13px', fontWeight: 600,
                background: 'transparent', color: colors.text,
                border: `1px solid ${colors.border}`, borderRadius: '20px',
                padding: '10px 24px', cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              Essential Only
            </button>
            <Link
              to="/privacy"
              style={{
                fontFamily: fonts.sans, fontSize: '13px', fontWeight: 500,
                color: colors.textMuted, textDecoration: 'none',
                padding: '10px 12px', whiteSpace: 'nowrap',
                display: 'flex', alignItems: 'center',
              }}
            >
              Privacy Policy &rarr;
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
