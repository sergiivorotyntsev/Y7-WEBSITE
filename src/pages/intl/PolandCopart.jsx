import { Helmet } from 'react-helmet-async';

const HREFLANG = [
  { lang: 'en', href: 'https://www.y7agency.com/copart-shipping' },
  { lang: 'pl', href: 'https://www.y7agency.com/pl/copart-shipping' },
  { lang: 'pl-US', href: 'https://www.y7agency.com/pl-us/copart-shipping' },
  { lang: 'uk-UA', href: 'https://www.y7agency.com/ua/copart-shipping' },
  { lang: 'uk-US', href: 'https://www.y7agency.com/ua-us/copart-shipping' },
  { lang: 'ru-US', href: 'https://www.y7agency.com/ru-us/copart-shipping' },
  { lang: 'x-default', href: 'https://www.y7agency.com/copart-shipping' },
];

export default function PolandCopart() {
  return (
    <>
      <Helmet>
        <title>Copart — sprowadzanie aut z aukcji do Polski | Y7 Logistics</title>
        <meta name="description" content="Odbior i transport aut z aukcji Copart w USA. Dostawa do portu i wysylka do Polski." />
        <html lang="pl" />
        {HREFLANG.map(h => <link key={h.lang} rel="alternate" hrefLang={h.lang} href={h.href} />)}
      </Helmet>
      <main id="main" style={{ padding: '2rem 1.5rem', maxWidth: 800, margin: '0 auto', fontFamily: 'Georgia, serif' }}>
        <h1>Copart — sprowadzanie aut z aukcji do Polski</h1>
        <p style={{ fontStyle: 'italic', color: '#666' }}>[S5-TODO] Content coming in next session. Infrastructure placeholder.</p>
        <p>Zapewniamy pelna obsluge transportu aut z aukcji Copart — od odbioru z aukcji po dostawe do portu eksportowego.</p>
      </main>
    </>
  );
}
