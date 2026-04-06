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

export default function RussiaUSHome() {
  return (
    <>
      <Helmet>
        <title>Перевозка авто по США с русскоязычной поддержкой | Y7 Logistics</title>
        <meta name="description" content="Транспортировка автомобилей между штатами США. Русскоязычная поддержка. Y7 Logistics MC #1741537." />
        <html lang="ru" />
        {HREFLANG.map(h => <link key={h.lang} rel="alternate" hrefLang={h.lang} href={h.href} />)}
      </Helmet>
      <main id="main" style={{ padding: '2rem 1.5rem', maxWidth: 800, margin: '0 auto', fontFamily: 'Georgia, serif' }}>
        <h1>Перевозка авто по США с русскоязычной поддержкой</h1>
        <p style={{ fontStyle: 'italic', color: '#666' }}>[S5-TODO] Content coming in next session. Infrastructure placeholder.</p>
        <p>Живёте в США и нужна перевозка авто? Обслуживаем на русском языке — от расчёта до доставки.</p>
      </main>
    </>
  );
}
