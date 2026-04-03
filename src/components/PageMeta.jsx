import { Helmet } from 'react-helmet-async';

export default function PageMeta({ title, description, path, lang = 'en' }) {
  const fullTitle = title ? `${title} | Y7 Logistics` : 'Y7 Logistics | Nationwide Auto Transport';
  const url = `https://www.y7agency.com/${lang}${path || ''}`;
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Y7 Logistics" />
      <link rel="canonical" href={url} />
      <link rel="alternate" hreflang="en" href={`https://www.y7agency.com/en${path || ''}`} />
      <link rel="alternate" hreflang="ru" href={`https://www.y7agency.com/ru${path || ''}`} />
      <link rel="alternate" hreflang="pl" href={`https://www.y7agency.com/pl${path || ''}`} />
      <link rel="alternate" hreflang="uk" href={`https://www.y7agency.com/uk${path || ''}`} />
    </Helmet>
  );
}
