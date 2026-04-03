import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { colors, fonts } from '../theme';
import { trackEvent } from '../utils/analytics';

const langs = [
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' },
  { code: 'pl', label: 'PL' },
  { code: 'uk', label: 'UA' },
];

// Routes that have /:lang/ prefix versions in App.jsx
const I18N_PATHS = ['/faq', '/about', '/quote', '/dealer-quote'];
const I18N_PREFIXES = ['/ports/'];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { lang } = useParams();
  const current = lang || i18n.language || 'en';
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  function switchLang(code) {
    i18n.changeLanguage(code);
    trackEvent('language_switch', { language: code });

    // Determine the base path (strip current lang prefix if present)
    let basePath = location.pathname;
    const langCodes = langs.map(l => l.code);
    const pathParts = basePath.split('/').filter(Boolean);
    if (pathParts.length > 0 && langCodes.includes(pathParts[0])) {
      basePath = '/' + pathParts.slice(1).join('/');
    }
    if (!basePath || basePath === '/') basePath = '';

    // Check if this path has a /:lang/ version
    const hasLangRoute = basePath === '' ||
      I18N_PATHS.includes(basePath) ||
      I18N_PREFIXES.some(p => basePath.startsWith(p));

    if (hasLangRoute) {
      navigate(code === 'en' ? (basePath || '/') : `/${code}${basePath}`);
    } else {
      // No lang route — stay on current path, just switch i18n
      // (navigate to same path to trigger re-render if needed)
    }
    setOpen(false);
  }

  const currentLabel = langs.find(l => l.code === current)?.label || 'EN';

  // Close dropdown on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <>
      {/* Desktop: flat links */}
      <div className="lang-desktop" style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
        {langs.map((l, i) => (
          <span key={l.code} style={{ display: 'flex', alignItems: 'center' }}>
            <button
              onClick={() => switchLang(l.code)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px 6px',
                fontSize: '13px',
                fontFamily: fonts.sans,
                fontWeight: current === l.code ? 700 : 400,
                color: current === l.code ? colors.accent : colors.textMuted,
                letterSpacing: '0.5px',
              }}
            >
              {l.label}
            </button>
            {i < langs.length - 1 && (
              <span style={{ color: colors.border, fontSize: '13px' }}>|</span>
            )}
          </span>
        ))}
      </div>

      {/* Mobile: dropdown */}
      <div className="lang-mobile" ref={ref} style={{ display: 'none', position: 'relative' }}>
        <button
          onClick={() => setOpen(!open)}
          style={{
            background: 'none',
            border: `1px solid ${colors.border}`,
            borderRadius: '6px',
            cursor: 'pointer',
            padding: '4px 10px',
            fontSize: '13px',
            fontFamily: fonts.sans,
            fontWeight: 600,
            color: colors.text,
            letterSpacing: '0.5px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          {currentLabel}
          <span style={{ fontSize: '10px', color: colors.textMuted }}>&#9662;</span>
        </button>
        {open && (
          <div style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: '4px',
            background: colors.bgCard,
            border: `1px solid ${colors.border}`,
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            zIndex: 200,
            minWidth: '80px',
            overflow: 'hidden',
          }}>
            {langs.map(l => (
              <button
                key={l.code}
                onClick={() => switchLang(l.code)}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '8px 14px',
                  fontSize: '13px',
                  fontFamily: fonts.sans,
                  fontWeight: current === l.code ? 700 : 400,
                  color: current === l.code ? colors.accent : colors.text,
                  background: current === l.code ? colors.bgMuted : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  letterSpacing: '0.5px',
                }}
              >
                {l.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .lang-desktop { display: none !important; }
          .lang-mobile { display: block !important; }
        }
        @media (min-width: 769px) {
          .lang-desktop { display: flex !important; }
          .lang-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}
