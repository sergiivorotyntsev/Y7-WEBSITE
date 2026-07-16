/* eslint-disable react-refresh/only-export-components */
// This file intentionally co-exports the component and a consent-key
// constant; the Fast-Refresh HMR impact is dev-only.
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { fonts, v2 } from '../theme';

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
  // CWV2-T03: lazy initializer instead of effect — with the effect the banner
  // rendered null for the first client frame(s), so on the createRoot rebuild
  // the already-visible prerendered banner blinked out and back in.
  const [visible, setVisible] = useState(() => !getCookie('y7_consent'));

  function accept(level) {
    setCookie('y7_consent', level, 365);
    setVisible(false);
    if (level === 'all') {
      window.dispatchEvent(new Event('y7-consent-accepted'));
    }
  }

  if (!visible) return null;

  return (
    <>
      <style>{`
        .cookie-banner {
          position: fixed; bottom: 0; left: 0; right: 0; z-index: 999;
          background: ${v2.colors.panel}; border-top: 1px solid ${v2.colors.lineOnDark};
          box-shadow: 0 -12px 40px rgba(0,0,0,0.35);
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
              fontFamily: fonts.sans, fontSize: '13px', color: v2.colors.textOnDarkSecondary,
              lineHeight: 1.6, margin: 0,
            }}>
              We use cookies to improve your experience and analyze site traffic.
              By continuing to use this site, you agree to our{' '}
              <Link to="/privacy" style={{ color: v2.colors.textOnDark, textDecoration: 'underline', textUnderlineOffset: '2px' }}>Privacy Policy</Link>.
            </p>
          </div>
          <div className="cookie-actions">
            <button
              onClick={() => accept('all')}
              style={{
                fontFamily: fonts.sans, fontSize: '13px', fontWeight: 600,
                background: v2.gradients.cta, color: '#fff',
                border: 'none', borderRadius: '6px',
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
                background: 'transparent', color: v2.colors.textOnDark,
                border: `1px solid ${v2.colors.lineOnDarkStrong}`, borderRadius: '999px',
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
                color: v2.colors.textOnDarkMuted, textDecoration: 'none',
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
