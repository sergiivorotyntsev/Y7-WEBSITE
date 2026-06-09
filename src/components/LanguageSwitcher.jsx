import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { trackEvent } from '../utils/trackEvent';
import { stripLocale, localizedHref } from '../lib/localePaths';
import styles from './LanguageSwitcher.module.css';

const langs = [
  { code: 'en', label: 'EN' },
  { code: 'pl', label: 'PL' },
  { code: 'ua', label: 'UA' },
  { code: 'ru', label: 'RU' },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const current = stripLocale(pathname).locale;
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  function switchLang(code) {
    if (code === current) { setOpen(false); return; }
    trackEvent('language_switch', { language: code });
    try { localStorage.setItem('y7_lang', code); } catch { /* storage unavailable — ignore */ }

    // Shared helper guarantees we never link to a non-existent localized URL:
    // non-translatable pages fall back to the target locale's home.
    const target = localizedHref(code, pathname);

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
