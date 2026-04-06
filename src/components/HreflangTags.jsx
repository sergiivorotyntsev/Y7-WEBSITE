import { Helmet } from 'react-helmet-async';

const BASE = 'https://www.y7agency.com';

export default function HreflangTags({
  currentPath = '',
  hasPolishVersion = false,
  hasUkrainianVersion = false,
  hasRussianVersion = false,
}) {
  return (
    <Helmet>
      <link rel="alternate" hrefLang="en" href={`${BASE}${currentPath}`} />
      <link rel="alternate" hrefLang="en-US" href={`${BASE}${currentPath}`} />
      {hasPolishVersion && (
        <>
          <link rel="alternate" hrefLang="pl" href={`${BASE}/pl${currentPath}`} />
          <link rel="alternate" hrefLang="pl-PL" href={`${BASE}/pl${currentPath}`} />
        </>
      )}
      {hasUkrainianVersion && (
        <>
          <link rel="alternate" hrefLang="uk" href={`${BASE}/ua${currentPath}`} />
          <link rel="alternate" hrefLang="uk-UA" href={`${BASE}/ua${currentPath}`} />
        </>
      )}
      {hasRussianVersion && (
        <link rel="alternate" hrefLang="ru" href={`${BASE}/ru${currentPath}`} />
      )}
      <link rel="alternate" hrefLang="x-default" href={`${BASE}${currentPath}`} />
    </Helmet>
  );
}
