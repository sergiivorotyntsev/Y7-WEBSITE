import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { trackEvent } from '../utils/trackEvent';
import { stripLocale, localizedHref } from '../lib/localePaths';
import styles from './LanguageSwitcher.module.css';

// [WEBFIX2-T04d] hreflang per entry: the URL prefix for Ukrainian is /ua but
// the language tag is uk (same mapping as PageMeta.jsx / HreflangTags.jsx).
const langs = [
  { code: 'en', label: 'EN', hreflang: 'en' },
  { code: 'pl', label: 'PL', hreflang: 'pl' },
  { code: 'ua', label: 'UA', hreflang: 'uk' },
  { code: 'ru', label: 'RU', hreflang: 'ru' },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const current = stripLocale(pathname).locale;
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // [WEBFIX2-T04d] The entries are real <a href> now (they were <button>s with
  // navigate(): between the four locales there was not one link a crawler
  // could follow). The href is the same target the click used; the click
  // handler keeps the SPA behaviour (no reload, i18n switch, tracking).
  const hrefFor = (code) => localizedHref(code, pathname);

  function switchLang(e, code) {
    e.preventDefault();
    if (code === current) { setOpen(false); return; }
    trackEvent('language_switch', { language: code });
    try { localStorage.setItem('y7_lang', code); } catch { /* storage unavailable — ignore */ }

    // Shared helper guarantees we never link to a non-existent localized URL:
    // non-translatable pages fall back to the target locale's home.
    const target = hrefFor(code);

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
          <a
            key={l.code}
            href={hrefFor(l.code)}
            hrefLang={l.hreflang}
            lang={l.hreflang}
            onClick={(e) => switchLang(e, l.code)}
            className={current === l.code ? styles.btnActive : styles.btn}
            aria-current={current === l.code ? 'true' : undefined}
            aria-label={`Switch language to ${l.label}`}
          >
            {l.label}
          </a>
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
              <a
                key={l.code}
                href={hrefFor(l.code)}
                hrefLang={l.hreflang}
                lang={l.hreflang}
                onClick={(e) => switchLang(e, l.code)}
                className={current === l.code ? styles.mobileItemActive : styles.mobileItem}
                role="option"
                aria-selected={current === l.code}
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
