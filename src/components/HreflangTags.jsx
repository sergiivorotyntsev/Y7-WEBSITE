import { Helmet } from 'react-helmet-async';

const BASE = 'https://www.y7agency.com';

export default function HreflangTags({
  currentPath = '',
  hasPolishVersion = false,
  hasUkrainianVersion = false,
  hasRussianUSVersion = false,
}) {
  return (
    <Helmet>
      <link rel="alternate" hrefLang="en" href={`${BASE}${currentPath}`} />
      <link rel="alternate" hrefLang="en-US" href={`${BASE}${currentPath}`} />
      {hasPolishVersion && (
        <>
          <link rel="alternate" hrefLang="pl" href={`${BASE}/pl${currentPath}`} />
          <link rel="alternate" hrefLang="pl-PL" href={`${BASE}/pl${currentPath}`} />
          <link rel="alternate" hrefLang="pl-US" href={`${BASE}/pl-us${currentPath}`} />
        </>
      )}
      {hasUkrainianVersion && (
        <>
          <link rel="alternate" hrefLang="uk" href={`${BASE}/ua${currentPath}`} />
          <link rel="alternate" hrefLang="uk-UA" href={`${BASE}/ua${currentPath}`} />
          <link rel="alternate" hrefLang="uk-US" href={`${BASE}/ua-us${currentPath}`} />
        </>
      )}
      {hasRussianUSVersion && (
        <link rel="alternate" hrefLang="ru-US" href={`${BASE}/ru-us${currentPath}`} />
      )}
      <link rel="alternate" hrefLang="x-default" href={`${BASE}${currentPath}`} />
    </Helmet>
  );
}
