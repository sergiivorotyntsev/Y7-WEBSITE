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

export default function UkraineUSCopart() {
  return (
    <>
      <Helmet>
        <title>Copart — забір і доставка в США | Y7 Logistics</title>
        <meta name="description" content="Забір авто з аукціону Copart та доставка по США. Підтримка українською." />
        <html lang="uk" />
        {HREFLANG.map(h => <link key={h.lang} rel="alternate" hrefLang={h.lang} href={h.href} />)}
      </Helmet>
      <main id="main" style={{ padding: '2rem 1.5rem', maxWidth: 800, margin: '0 auto', fontFamily: 'Georgia, serif' }}>
        <h1>Copart — забір і доставка в США</h1>
        <p style={{ fontStyle: 'italic', color: '#666' }}>[S5-TODO] Content coming in next session. Infrastructure placeholder.</p>
        <p>Спеціалізуємось на транспорті авто з аукціонів Copart по всій території США.</p>
      </main>
    </>
  );
}
