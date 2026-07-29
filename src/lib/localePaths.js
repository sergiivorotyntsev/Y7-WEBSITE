// src/lib/localePaths.js
// Single source of truth for the locale URL-prefix scheme and the pure path
// helpers that depend on it. Imported by HreflangTags (alternate URLs) and
// LanguageSwitcher (switch targets) so both agree on which pages have localized
// versions and how to build their URLs — preventing dead localized links.
//
// Scheme: EN = root (no prefix), PL = /pl, UA = /ua, RU = /ru. UA uses the
// country-style 'ua' segment, NOT the ISO-639 'uk'.

import { PORT_SLUGS } from '../pages/ports/portData.js';

export const SUPPORTED_LOCALES = ['en', 'pl', 'ua', 'ru'];
export const LOCALIZED_PREFIXES = ['pl', 'ua', 'ru'];

// Valid port slugs, as a Set for O(1) membership. /ports/<slug> is translatable
// only for these exact slugs, so hreflang/switcher never advertise a 404.
const PORT_SLUG_SET = new Set(PORT_SLUGS);

// Paths that exist in all four languages as same-content translations.
// Must stay in sync with the prerendered localized routes (scripts/prerender.mjs
// :236-247) and the sitemap's translated group (scripts/generateSitemap.js).
// Moved verbatim from the former inline copy in HreflangTags.jsx.
export const TRANSLATABLE_PATHS = new Set([
  '/', '/services', '/dealers', '/exporters', '/ship-my-car',
  '/about', '/contact', '/faq', '/quote', '/track',
  '/certificate-of-origin', // CO-COPY-T15
]);

const LOCALE_PREFIX_RE = /^\/(ua|pl|ru)(\/.*)?$/;

/** True when `seg` is a real localized URL prefix (pl | ua | ru). 'en' is NOT a
 *  prefix (English lives at root), so isValidLocale('en') === false. */
export function isValidLocale(seg) {
  return LOCALIZED_PREFIXES.includes(seg);
}

/** Split a pathname into its locale and the locale-free base path. A path with
 *  no /ua|/pl|/ru prefix is locale 'en' with the pathname unchanged as basePath. */
export function stripLocale(pathname) {
  const m = pathname.match(LOCALE_PREFIX_RE);
  if (!m) return { locale: 'en', basePath: pathname };
  return { locale: m[1], basePath: m[2] || '/' };
}

/** True when the locale-free base path has same-content translations. Covers
 *  the fixed translatable set plus any valid /ports/<slug> page (exact-slug
 *  match only — a nonexistent /ports/zzz is NOT translatable). */
export function isTranslatable(basePath) {
  if (TRANSLATABLE_PATHS.has(basePath)) return true;
  const m = basePath.match(/^\/ports\/([^/]+)$/);
  return m ? PORT_SLUG_SET.has(m[1]) : false;
}

/**
 * The target URL *path* (not absolute) for switching `pathname` to
 * `targetLocale`, applying the Phase 1 fallback rule so we never link to a
 * non-existent localized URL:
 *   - Translatable page: 'en' -> its English base; otherwise -> '/{locale}{base}'.
 *   - Non-translatable page: a non-EN target -> that locale's home ('/{locale}');
 *     an EN target stays on the current English page if it is already English
 *     (no prefix), or falls back to root when leaving a localized unique page
 *     (which has no English twin).
 */
export function localizedHref(targetLocale, pathname) {
  const { locale, basePath } = stripLocale(pathname);

  if (targetLocale === 'en') {
    if (isTranslatable(basePath)) return basePath;
    // Already-English non-translatable page (e.g. /ports/newark) stays put;
    // a localized unique page (e.g. /ua/import-z-usa) has no English version.
    return locale === 'en' ? basePath : '/';
  }

  if (isTranslatable(basePath)) {
    return basePath === '/' ? `/${targetLocale}` : `/${targetLocale}${basePath}`;
  }
  return `/${targetLocale}`;
}
