import { Helmet } from 'react-helmet-async';

/**
 * PageMeta — SEO head tags. Title, description, og, canonical, optional schema.
 *
 * Hreflang is intentionally NOT handled here — pages that need hreflang must
 * render <HreflangTags /> separately. This keeps the source of truth for
 * alternates in one place and avoids generating non-existent /en/path URLs.
 *
 * @param {string} title       Page title (appended with " | Y7 Logistics")
 * @param {string} description Meta description
 * @param {string} path        Path like "/services" (include leading slash)
 * @param {string} schema      Optional JSON-LD schema string
 */
export default function PageMeta({ title, description, path = '', schema }) {
  const base = 'https://www.y7agency.com';
  const fullTitle = title ? `${title} | Y7 Logistics` : 'Y7 Logistics | Nationwide Auto Transport';
  const canonical = `${base}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Y7 Logistics" />
      <meta property="og:image" content={`${base}/og-image.svg`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={`${base}/og-image.svg`} />
      <link rel="canonical" href={canonical} />
      {schema && <script type="application/ld+json">{schema}</script>}
    </Helmet>
  );
}
