import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { trackEvent } from '../utils/analytics';
import styles from './LanguageSwitcher.module.css';

const langs = [
  { code: 'en', label: 'EN' },
  { code: 'pl', label: 'PL' },
  { code: 'ua', label: 'UA' },
  { code: 'ru', label: 'RU' },
];

const STORAGE_KEY = 'y7_lang';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.language || 'en';
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  function switchLang(code) {
    if (code === current) { setOpen(false); return; }
    i18n.changeLanguage(code);
    try { localStorage.setItem(STORAGE_KEY, code); } catch {}
    trackEvent('language_switch', { language: code });
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

      {/* Mobile: dropdown */}
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
