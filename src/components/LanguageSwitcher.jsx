import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { trackEvent } from '../utils/analytics';
import styles from './LanguageSwitcher.module.css';

const langs = [
  { code: 'en', label: 'EN' },
  { code: 'pl', label: 'PL' },
  { code: 'ua', label: 'UA' },
  { code: 'ru', label: 'RU' },
];

const LOCALE_PREFIX = /^\/(ua|pl|ru)(\/.*)?$/;

// Unique intl landing pages that exist only in their own language.
// If a visitor is on one of these and switches to a different language,
// we fall back to the locale root (or / for EN) instead of trying to
// prefix-swap into a 404.
const UNIQUE_INTL_PATHS = new Set([
  '/ua/import-z-usa', '/ua/copart-ta-iaai', '/ua/dostavka-avto-z-usa',
  '/pl/transport-z-usa', '/pl/transport-z-aukcji', '/pl/wysylka-auta-z-usa',
  '/ru/dostavka-avto-iz-usa', '/ru/copart-i-iaai', '/ru/perevozka-avto',
]);

function currentLocale(pathname) {
  const m = pathname.match(LOCALE_PREFIX);
  return m ? m[1] : 'en';
}

function basePath(pathname) {
  const m = pathname.match(LOCALE_PREFIX);
  if (!m) return pathname;
  return m[2] || '/';
}

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const current = currentLocale(pathname);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  function switchLang(code) {
    if (code === current) { setOpen(false); return; }
    trackEvent('language_switch', { language: code });
    try { localStorage.setItem('y7_lang', code); } catch {}

    // If on a unique intl page, drop to that locale's Home for the target.
    const onUnique = UNIQUE_INTL_PATHS.has(pathname);
    const base = onUnique ? '/' : basePath(pathname);

    let target;
    if (code === 'en') {
      target = base;
    } else {
      target = base === '/' ? `/${code}` : `/${code}${base}`;
    }

    i18n.changeLanguage(code);
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
      <div className={styles.desktop}>
        {langs.map(l => (
          <button
            key={l.code}
            type="button"
            onClick={() => switchLang(l.code)}
            className={current === l.code ? styles.btnActive : styles.btn}
            aria-pressed={current === l.code}
            aria-label={`Switch language to ${l.label}`}
          >
            {l.label}
          </button>
        ))}
      </div>

      <div className={styles.mobile} ref={ref}>
        <button
          type="button"
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
                type="button"
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
