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

export default function PolandShipMyCar() {
  return (
    <>
      <Helmet>
        <title>Jak sprowadzic auto z USA | Y7 Logistics</title>
        <meta name="description" content="Przewodnik: jak kupic i sprowadzic auto z USA do Polski krok po kroku." />
        <html lang="pl" />
        {HREFLANG.map(h => <link key={h.lang} rel="alternate" hrefLang={h.lang} href={h.href} />)}
      </Helmet>
      <main id="main" style={{ padding: '2rem 1.5rem', maxWidth: 800, margin: '0 auto', fontFamily: 'Georgia, serif' }}>
        <h1>Jak sprowadzic auto z USA</h1>
        <p style={{ fontStyle: 'italic', color: '#666' }}>[S5-TODO] Content coming in next session. Infrastructure placeholder.</p>
        <p>Kompleksowy poradnik sprowadzania auta z USA — od zakupu na aukcji po rejestracje w Polsce.</p>
      </main>
    </>
  );
}
