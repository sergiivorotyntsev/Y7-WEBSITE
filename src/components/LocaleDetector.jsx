import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LOCALE_PREFIX = /^\/(ua|pl|ru)(\/|$)/;

export default function LocaleDetector() {
  const { pathname } = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    const match = pathname.match(LOCALE_PREFIX);
    const locale = match ? match[1] : 'en';
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale);
      try { localStorage.setItem('y7_lang', locale); } catch { /* storage unavailable */ }
    }
    const htmlLang = locale === 'ua' ? 'uk' : locale;
    if (typeof document !== 'undefined') {
      document.documentElement.lang = htmlLang;
    }
  }, [pathname, i18n]);

  return null;
}
