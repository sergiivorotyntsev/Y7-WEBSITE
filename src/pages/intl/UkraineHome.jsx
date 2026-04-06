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

export default function UkraineHome() {
  return (
    <>
      <Helmet>
        <title>Ригін авто з США в Україну | Y7 Logistics</title>
        <meta name="description" content="Y7 Logistics та DaytonaCargo — доставка авто з США в Україну. Ліцензований брокер FMCSA MC #1741537." />
        <html lang="uk" />
        {HREFLANG.map(h => <link key={h.lang} rel="alternate" hrefLang={h.lang} href={h.href} />)}
      </Helmet>
      <main id="main" style={{ padding: '2rem 1.5rem', maxWidth: 800, margin: '0 auto', fontFamily: 'Georgia, serif' }}>
        <h1>Пригін авто з США в Україну</h1>
        <p style={{ fontStyle: 'italic', color: '#666' }}>[S5-TODO] Content coming in next session. Infrastructure placeholder.</p>
        <p>Y7 Logistics (ліцензований брокер FMCSA, MC #1741537) забезпечує наземний транспорт в США. Міжнародну доставку в Україну здійснює наша сестринська компанія DaytonaCargo LLC.</p>
      </main>
    </>
  );
}
