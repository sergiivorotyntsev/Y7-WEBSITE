import { Helmet } from 'react-helmet-async';

/**
 * PageMeta — SEO head tags.
 *
 * @param {string} title       Page title (appended with " | Y7 Logistics")
 * @param {string} description Meta description
 * @param {string} path        Path like "/services" (include leading slash)
 * @param {string} lang        Current language (default "en")
 * @param {boolean} i18n       True if this page has /:lang/ prefix routes — enables hreflang
 * @param {string} schema      Optional JSON-LD schema string
 */
export default function PageMeta({ title, description, path = '', lang = 'en', i18n = false, schema }) {
  const base = 'https://www.y7agency.com';
  const fullTitle = title ? `${title} | Y7 Logistics` : 'Y7 Logistics | Nationwide Auto Transport';
  const canonical = i18n ? `${base}/${lang}${path}` : `${base}${path}`;

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
      {i18n && (
        <>
          <link rel="alternate" hreflang="en" href={`${base}/en${path}`} />
          <link rel="alternate" hreflang="ru" href={`${base}/ru${path}`} />
          <link rel="alternate" hreflang="pl" href={`${base}/pl${path}`} />
          <link rel="alternate" hreflang="uk" href={`${base}/uk${path}`} />
          <link rel="alternate" hreflang="x-default" href={`${base}${path}`} />
        </>
      )}
      {schema && <script type="application/ld+json">{schema}</script>}
    </Helmet>
  );
}
