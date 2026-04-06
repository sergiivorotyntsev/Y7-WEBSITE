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

export default function RussiaUSCopart() {
  return (
    <>
      <Helmet>
        <title>Доставка с аукциона Copart — для русскоязычной диаспоры | Y7 Logistics</title>
        <meta name="description" content="Забор и доставка авто с аукционов Copart по всей территории США." />
        <html lang="ru" />
        {HREFLANG.map(h => <link key={h.lang} rel="alternate" hrefLang={h.lang} href={h.href} />)}
      </Helmet>
      <main id="main" style={{ padding: '2rem 1.5rem', maxWidth: 800, margin: '0 auto', fontFamily: 'Georgia, serif' }}>
        <h1>Доставка с аукциона Copart — для русскоязычной диаспоры</h1>
        <p style={{ fontStyle: 'italic', color: '#666' }}>[S5-TODO] Content coming in next session. Infrastructure placeholder.</p>
        <p>Специализируемся на транспорте автомобилей с аукционов Copart в любой штат США.</p>
      </main>
    </>
  );
}
