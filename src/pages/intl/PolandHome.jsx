import { Helmet } from 'react-helmet-async';

const HREFLANG = [
  { lang: 'en', href: 'https://www.y7agency.com/' },
  { lang: 'pl', href: 'https://www.y7agency.com/pl' },
  { lang: 'pl-US', href: 'https://www.y7agency.com/pl-us' },
  { lang: 'uk-UA', href: 'https://www.y7agency.com/ua' },
  { lang: 'uk-US', href: 'https://www.y7agency.com/ua-us' },
  { lang: 'ru-US', href: 'https://www.y7agency.com/ru-us' },
  { lang: 'x-default', href: 'https://www.y7agency.com/' },
];

export default function PolandHome() {
  return (
    <>
      <Helmet>
        <title>Sprowadzanie aut z USA do Polski | Y7 Logistics</title>
        <meta name="description" content="Y7 Logistics i DaytonaCargo — kompleksowe sprowadzanie aut z USA do Polski. Licencjonowany broker FMCSA MC #1741537." />
        <html lang="pl" />
        {HREFLANG.map(h => <link key={h.lang} rel="alternate" hrefLang={h.lang} href={h.href} />)}
      </Helmet>
      <main id="main" style={{ padding: '2rem 1.5rem', maxWidth: 800, margin: '0 auto', fontFamily: 'Georgia, serif' }}>
        <h1>Sprowadzanie aut z USA do Polski</h1>
        <p style={{ fontStyle: 'italic', color: '#666' }}>[S5-TODO] Content coming in next session. Infrastructure placeholder.</p>
        <p>Y7 Logistics (licencjonowany broker FMCSA, MC #1741537) zapewnia transport ladowy w USA. Miedzynarodowa wysylka do Polski to specjalnosc naszej siostrzanej firmy DaytonaCargo LLC.</p>
      </main>
    </>
  );
}
