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

export default function UkraineShipMyCar() {
  return (
    <>
      <Helmet>
        <title>Як пригнати авто з США | Y7 Logistics</title>
        <meta name="description" content="Покроковий гайд: як купити та привезти авто з США в Україну." />
        <html lang="uk" />
        {HREFLANG.map(h => <link key={h.lang} rel="alternate" hrefLang={h.lang} href={h.href} />)}
      </Helmet>
      <main id="main" style={{ padding: '2rem 1.5rem', maxWidth: 800, margin: '0 auto', fontFamily: 'Georgia, serif' }}>
        <h1>Як пригнати авто з США</h1>
        <p style={{ fontStyle: 'italic', color: '#666' }}>[S5-TODO] Content coming in next session. Infrastructure placeholder.</p>
        <p>Повний гайд з пригону авто — від покупки на аукціоні до розмитнення в Україні.</p>
      </main>
    </>
  );
}
