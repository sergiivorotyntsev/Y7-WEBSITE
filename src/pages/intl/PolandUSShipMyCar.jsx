import { Helmet } from 'react-helmet-async';

const HREFLANG = [
  { lang: 'en', href: 'https://www.y7agency.com/ship-my-car' },
  { lang: 'pl', href: 'https://www.y7agency.com/pl/ship-my-car' },
  { lang: 'pl-US', href: 'https://www.y7agency.com/pl-us/ship-my-car' },
  { lang: 'uk-UA', href: 'https://www.y7agency.com/ua/ship-my-car' },
  { lang: 'uk-US', href: 'https://www.y7agency.com/ua-us/ship-my-car' },
  { lang: 'ru-US', href: 'https://www.y7agency.com/ru-us/ship-my-car' },
  { lang: 'x-default', href: 'https://www.y7agency.com/ship-my-car' },
];

export default function PolandUSShipMyCar() {
  return (
    <>
      <Helmet>
        <title>Przewoz aut miedzy stanami | Y7 Logistics</title>
        <meta name="description" content="Przewoz samochodow miedzy stanami USA. Wycena online, obsluga po polsku." />
        <html lang="pl" />
        {HREFLANG.map(h => <link key={h.lang} rel="alternate" hrefLang={h.lang} href={h.href} />)}
      </Helmet>
      <main id="main" style={{ padding: '2rem 1.5rem', maxWidth: 800, margin: '0 auto', fontFamily: 'Georgia, serif' }}>
        <h1>Przewoz aut miedzy stanami</h1>
        <p style={{ fontStyle: 'italic', color: '#666' }}>[S5-TODO] Content coming in next session. Infrastructure placeholder.</p>
        <p>Potrzebujesz przetransportowac auto miedzy stanami? Uzyskaj wycene w 2 minuty.</p>
      </main>
    </>
  );
}
