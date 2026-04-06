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

export default function UkraineUSShipMyCar() {
  return (
    <>
      <Helmet>
        <title>Перевезення авто між штатами США | Y7 Logistics</title>
        <meta name="description" content="Перевезення авто між штатами. Онлайн розрахунок, підтримка українською." />
        <html lang="uk" />
        {HREFLANG.map(h => <link key={h.lang} rel="alternate" hrefLang={h.lang} href={h.href} />)}
      </Helmet>
      <main id="main" style={{ padding: '2rem 1.5rem', maxWidth: 800, margin: '0 auto', fontFamily: 'Georgia, serif' }}>
        <h1>Перевезення авто між штатами США</h1>
        <p style={{ fontStyle: 'italic', color: '#666' }}>[S5-TODO] Content coming in next session. Infrastructure placeholder.</p>
        <p>Потрібно перевезти авто між штатами? Отримайте розрахунок за 2 хвилини.</p>
      </main>
    </>
  );
}
