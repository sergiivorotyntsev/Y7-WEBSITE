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

export default function UkraineUSHome() {
  return (
    <>
      <Helmet>
        <title>Перевезення авто в США — підтримка українською | Y7 Logistics</title>
        <meta name="description" content="Транспорт автомобілів між штатами США з підтримкою українською мовою." />
        <html lang="uk" />
        {HREFLANG.map(h => <link key={h.lang} rel="alternate" hrefLang={h.lang} href={h.href} />)}
      </Helmet>
      <main id="main" style={{ padding: '2rem 1.5rem', maxWidth: 800, margin: '0 auto', fontFamily: 'Georgia, serif' }}>
        <h1>Перевезення авто в США — підтримка українською</h1>
        <p style={{ fontStyle: 'italic', color: '#666' }}>[S5-TODO] Content coming in next session. Infrastructure placeholder.</p>
        <p>Живете в США і потрібно перевезти авто? Обслуговуємо клієнтів українською мовою.</p>
      </main>
    </>
  );
}
