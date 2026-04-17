import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { trackEvent } from '../utils/analytics';
import styles from './LanguageSwitcher.module.css';

const langs = [
  { code: 'en', label: 'EN' },
  { code: 'pl', label: 'PL' },
  { code: 'ua', label: 'UA' },
  { code: 'ru', label: 'RU' },
];

// Paths that exist in every intl language variant (PL/UA/RU). Used to decide
// whether a language switch can stay on the current page.
const I18N_PATHS = ['/copart-shipping', '/ship-my-car', '/faq', '/about', '/quote', '/dealer-quote'];
const I18N_PREFIXES = ['/ports/', '/quote/', '/agreement/'];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { lang } = useParams();

  const langCodes = langs.map(l => l.code);
  const firstSegment = location.pathname.split('/').filter(Boolean)[0];
  const urlLang = lang || (langCodes.includes(firstSegment) ? firstSegment : null);
  const current = urlLang || i18n.language || 'en';
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (urlLang && urlLang !== i18n.language) {
      i18n.changeLanguage(urlLang);
    }
  }, [urlLang, i18n]);

  function switchLang(code) {
    i18n.changeLanguage(code);
    trackEvent('language_switch', { language: code });

    // Strip any leading language prefix to get the pure English path.
    let basePath = location.pathname;
    const pathParts = basePath.split('/').filter(Boolean);
    if (pathParts.length > 0 && langCodes.includes(pathParts[0])) {
      basePath = '/' + pathParts.slice(1).join('/');
    }
    if (!basePath || basePath === '/') basePath = '';

    // Does the current page have an intl version?
    const hasIntlVariant = basePath === '' ||
      I18N_PATHS.includes(basePath) ||
      I18N_PREFIXES.some(p => basePath.startsWith(p));

    let target;
    if (code === 'en') {
      // Back to English — keep base path if known route, else fall back to root.
      target = basePath || '/';
    } else if (hasIntlVariant) {
      // Stay on the same page in the target language.
      target = `/${code}${basePath}`;
    } else {
      // No intl version for this page — land on the intl Home.
      target = `/${code}`;
    }

    navigate(target);
    setOpen(false);
  }

  const currentLabel = langs.find(l => l.code === current)?.label || 'EN';

  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <>
      {/* Desktop: pill group */}
      <div className={styles.desktop}>
        {langs.map(l => (
          <button
            key={l.code}
            onClick={() => switchLang(l.code)}
            className={current === l.code ? styles.btnActive : styles.btn}
            aria-pressed={current === l.code}
            aria-label={`Switch language to ${l.label}`}
          >
            {l.label}
          </button>
        ))}
      </div>

      {/* Mobile: dropdown */}
      <div className={styles.mobile} ref={ref}>
        <button
          onClick={() => setOpen(!open)}
          className={styles.mobileBtn}
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          {currentLabel}
          <span className={styles.mobileCaret}>&#9662;</span>
        </button>
        {open && (
          <div className={styles.mobilePanel} role="listbox">
            {langs.map(l => (
              <button
                key={l.code}
                onClick={() => switchLang(l.code)}
                className={current === l.code ? styles.mobileItemActive : styles.mobileItem}
                role="option"
                aria-selected={current === l.code}
              >
                {l.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
