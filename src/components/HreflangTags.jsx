import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { stripLocale, isTranslatable } from '../lib/localePaths';

const BASE = 'https://www.y7agency.com';

/**
 * HreflangTags — auto-detects current path, strips locale prefix, emits
 * bidirectional hreflang alternates for every translatable page. For
 * non-translatable paths (blog, SEO, portal, unique intl slugs) renders
 * nothing, keeping those pages single-language for Google.
 *
 * Legacy prop interface (currentPath, hasPolishVersion, ...) is still
 * accepted by other callers but now ignored — auto-detection replaces it.
 */
export default function HreflangTags() {
  const { pathname } = useLocation();
  const { basePath } = stripLocale(pathname);

  if (!isTranslatable(basePath)) return null;

  const suffix = basePath === '/' ? '' : basePath;
  const enUrl = `${BASE}${basePath}`;
  const uaUrl = `${BASE}/ua${suffix}`;
  const plUrl = `${BASE}/pl${suffix}`;
  const ruUrl = `${BASE}/ru${suffix}`;

  return (
    <Helmet>
      <link rel="alternate" hrefLang="en" href={enUrl} />
      <link rel="alternate" hrefLang="en-US" href={enUrl} />
      <link rel="alternate" hrefLang="uk" href={uaUrl} />
      <link rel="alternate" hrefLang="uk-UA" href={uaUrl} />
      <link rel="alternate" hrefLang="pl" href={plUrl} />
      <link rel="alternate" hrefLang="pl-PL" href={plUrl} />
      <link rel="alternate" hrefLang="ru" href={ruUrl} />
      <link rel="alternate" hrefLang="x-default" href={enUrl} />
    </Helmet>
  );
}
