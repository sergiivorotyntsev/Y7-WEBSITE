import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const BASE = 'https://www.y7agency.com';

const OG_LOCALE = { en: 'en_US', uk: 'uk_UA', pl: 'pl_PL', ru: 'ru_RU' };
const HTML_LANG = { en: 'en', ua: 'uk', pl: 'pl', ru: 'ru' };

function detectLocale(pathname) {
  const m = pathname.match(/^\/(ua|pl|ru)(\/|$)/);
  return m ? m[1] : 'en';
}

/**
 * PageMeta — SEO head tags. Title, description, og, canonical, optional schema.
 *
 * Locale-aware: canonical/og:url derive from the actual current URL (not the
 * legacy `path` prop), so /ua/services gets canonical=/ua/services and
 * og:locale=uk_UA. Callers may still pass `path` for backwards compatibility
 * but it is only used as a fallback when useLocation is unavailable.
 *
 * Hreflang is intentionally NOT handled here — HreflangTags auto-mounts in
 * Layout for every translatable path.
 */
export default function PageMeta({ title, description, path = '', schema, ogType, ogImage, articlePublishedTime, articleAuthor, articleSection, noindex = false }) {
  const location = useLocation();
  const pathname = location?.pathname || path || '/';
  const locale = detectLocale(pathname);
  const htmlLang = HTML_LANG[locale] || 'en';
  const ogLocale = OG_LOCALE[htmlLang] || 'en_US';

  const fullTitle = title
    ? (title.endsWith('| Y7 Logistics') ||
       title.endsWith('- Y7 Logistics') ||
       title.endsWith('— Y7 Logistics')
        ? title
        : `${title} | Y7 Logistics`)
    : 'Y7 Logistics | Nationwide Auto Transport';
  const canonical = `${BASE}${pathname}`;

  return (
    <Helmet>
      <html lang={htmlLang} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={ogType || 'website'} />
      <meta property="og:site_name" content="Y7 Logistics" />
      <meta property="og:image" content={ogImage || `${BASE}/og-image.svg`} />
      <meta property="og:locale" content={ogLocale} />
      {ogType === 'article' && articlePublishedTime && (
        <meta property="article:published_time" content={articlePublishedTime} />
      )}
      {ogType === 'article' && articleAuthor && (
        <meta property="article:author" content={articleAuthor} />
      )}
      {ogType === 'article' && articleSection && (
        <meta property="article:section" content={articleSection} />
      )}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={ogImage || `${BASE}/og-image.svg`} />
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex, follow" />}
      {schema && <script type="application/ld+json">{schema}</script>}
    </Helmet>
  );
}
