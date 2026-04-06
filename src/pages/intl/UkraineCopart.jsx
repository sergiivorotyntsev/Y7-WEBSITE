import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import HreflangTags from '../../components/HreflangTags';

// =============================================================================
// UkraineCopart.jsx — Merged audience (Ukraine import + діаспора в США)
// Route: /ua/copart-shipping
// Primary audience: Ukraine buyers importing from Copart auctions
// Secondary audience: Ukrainian diaspora in USA using Copart for local purchases
// Y7-centric: FMCSA broker, Ukrainian-speaking support
// International leg: "через перевірених партнерів-експедиторів" (Y7-centric)
// Sources: native Ukrainian auto sites, Copart public data, post-2022 market
// =============================================================================

// -- Shared style objects -----------------------------------------------------

const pageStyle = {
  fontFamily: 'Georgia, "Times New Roman", serif',
  color: '#2C2C2A',
  background: '#F7F5F0',
};

const sectionStyle = {
  maxWidth: '900px',
  margin: '0 auto',
  padding: 'clamp(2rem, 5vw, 4rem) clamp(1.25rem, 4vw, 2rem)',
};

const h1Style = {
  fontSize: 'clamp(2rem, 5vw, 3.25rem)',
  lineHeight: '1.15',
  fontWeight: 400,
};

const h2Style = {
  fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
  lineHeight: '1.2',
  fontWeight: 400,
  marginBottom: '1rem',
};

const h3Style = {
  fontSize: '1.25rem',
  fontWeight: 600,
  marginBottom: '0.75rem',
  fontFamily: 'system-ui, sans-serif',
};

const pStyle = {
  fontSize: 'clamp(1rem, 2vw, 1.125rem)',
  lineHeight: '1.7',
  color: '#4A4A46',
};

const cardStyle = {
  background: '#fff',
  padding: '1.5rem',
  borderRadius: '8px',
  border: '1px solid #E8E4DC',
};

const ctaButtonStyle = {
  background: '#993C1D',
  color: '#fff',
  padding: '0.875rem 1.75rem',
  borderRadius: '6px',
  display: 'inline-block',
  textDecoration: 'none',
  fontFamily: 'system-ui, sans-serif',
  fontWeight: 500,
  border: 'none',
  cursor: 'pointer',
};

const darkCtaStyle = {
  background: '#2C2C2A',
  color: '#F7F5F0',
};

const dividerSectionStyle = {
  background: '#EFEAE0',
  borderTop: '1px solid #E8E4DC',
  borderBottom: '1px solid #E8E4DC',
};

const warningCardStyle = {
  background: '#FDF6E8',
  padding: '1.5rem',
  borderRadius: '8px',
  border: '1px solid #E8DCC0',
  borderLeft: '4px solid #C89B3C',
};

const accentColor = '#993C1D';

// -- Structured data ----------------------------------------------------------

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Скільки реально коштує пригін авто з Copart в Україну?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Для стандартного седана або кросовера типовий розрахунок: ціна авто на аукціоні + buyer fee Copart ($500-1 200 залежно від суми лоту) + транспорт лядовий по США $350-950 + морський фрахт $1 200-2 400 + доставка в Україну та розмитнення. Тільки логістика (без ціни авто) зазвичай виходить $2 200-4 500. Додайте мито, акциз та ПДВ при розмитненні — це окрема сума, що залежить від віку авто та обʼєму двигуна.',
      },
    },
    {
      '@type': 'Question',
      name: 'Чим Copart відрізняється від IAAI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Обидва — страхові аукціони, де продають авто після ДТП, повеней, градобою або угону. Copart більший (понад 200 майданчиків у США та Канаді, понад 175 тисяч авто щоденно), IAAI трохи менший, але інколи має кращі лоти від конкретних страхових компаній. Процес участі майже ідентичний: реєстрація через брокера, попередні ставки (pre-bid), онлайн-аукціон, оплата протягом 2 робочих днів. На Copart більше вибору, на IAAI інколи менша конкуренція на конкретні лоти.',
      },
    },
    {
      '@type': 'Question',
      name: 'Авто з Copart — це обовʼязково побите і проблемне?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ні. Американські правила зараховують авто до total loss, коли вартість ремонту перевищує 70-80% ринкової вартості. Через високі ціни на запчастини та роботу в США багато авто потрапляють на Copart після легких пошкоджень — розбитий бампер, подушки безпеки, пошкоджена передня оптика. Для українського ринку такі авто після ремонту коштують вдвічі-втричі дорожче закупки. Водночас є і реальні проблемні лоти — утоплені, з серйозним пошкодженням рами, згорілі. Ключ — уважно вивчати фото, історію через Autocheck або Carfax, і ніколи не купувати без інспекції досвідченою людиною.',
      },
    },
    {
      '@type': 'Question',
      name: 'Що таке buyer fee і як він нараховується?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Copart стягує комісію покупця понад ціну лоту. Для непрофесійного покупця (який не є ліцензованим дилером і торгує через брокера) типова схема: фіксований fee залежно від суми лоту плюс gate fee (пропускна плата), environmental fee та інші дрібні збори. Для лоту $5 000 сумарний fee складе приблизно $600-900. На Copart є онлайн калькулятор — перед ставкою завжди перевіряйте точну суму fees саме для вашого лоту.',
      },
    },
    {
      '@type': 'Question',
      name: 'Через який порт везти з Copart — Гдиня, Клайпеда чи Констанца?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Залежить від вашого місцезнаходження в Україні та доступності слотів. Гдиня (Польща) — найпопулярніший маршрут з найбільшим обсягом перевезень, оптимальний для західних та центральних областей (Львів, Тернопіль, Хмельницький, Київ). Клайпеда (Литва) — менше черга, зручно для Житомира, Рівного, Луцька. Констанца (Румунія, Чорне море) — у нинішніх умовах став важливим хабом для півдня (Одеса, Миколаїв, Вінниця). Ми радимо конкретний маршрут після аналізу вашого кейсу.',
      },
    },
    {
      '@type': 'Question',
      name: 'Скільки триває весь процес — від виграшу лоту до авто в Україні?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Типово 6-8 тижнів. Забір з майданчика Copart 3-10 днів (важливо: Copart нараховує storage fee з 3 дня після виграшу, тому швидке підтвердження замовлення економить $100-300), транспорт до порту США 2-5 днів, очікування завантаження контейнера 1-2 тижні, морський фрахт 3-5 тижнів, розмитнення 2-5 днів, доставка автовозом в Україну 2-4 дні. Маршрут через Констанцу інколи на тиждень швидший для південних областей.',
      },
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://www.y7agency.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Пригін авто з США',
      item: 'https://www.y7agency.com/ua',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Copart — пригін авто з аукціону',
      item: 'https://www.y7agency.com/ua/copart-shipping',
    },
  ],
};

// -- Data arrays --------------------------------------------------------------

const copartVsIaai = [
  {
    feature: 'Кількість майданчиків',
    copart: '200+ у США та Канаді',
    iaai: '150+ у США та Канаді',
  },
  {
    feature: 'Обсяг продажів',
    copart: '~175 тис. авто щоденно',
    iaai: '~120 тис. авто щоденно',
  },
  {
    feature: 'Основні продавці',
    copart: 'Великі страхові, банки, дилери',
    iaai: 'Страхові (особливо State Farm, Progressive)',
  },
  {
    feature: 'Система торгів',
    copart: 'VB3 (Virtual Bidding 3.0)',
    iaai: 'Proxy bidding + live auction',
  },
  {
    feature: 'Buyer fee',
    copart: 'Tiered fee + gate + environmental',
    iaai: 'Similar структура, інколи нижча',
  },
];

const riskWarnings = [
  {
    title: 'Фото не показують всієї правди',
    desc: 'Copart робить 8-12 стандартних ракурсів. Те, чого не видно: стан двигуна зсередини, слідки ремонту рами, запах від повені. Перед ставкою замовте огляд на майданчику у людини, яка знає авто — це коштує $50-100, але рятує від купівлі "кота в мішку".',
  },
  {
    title: 'Title код — читайте уважно',
    desc: 'Salvage title — авто списане страховою. Rebuilt — вже відновлене і перевірене, дорожче. Parts only або Junk — на запчастини, реєстрація в Україні ускладнена. Flood або Water damage — утоплене, найризикованіша категорія через приховану корозію електроніки.',
  },
  {
    title: 'Airbag deployed — не дрібниця',
    desc: 'Спрацьовані подушки безпеки означають або серйозний удар, або діагностику системи SRS (Supplemental Restraint System). Заміна повного комплекту на Toyota або BMW коштує $2 500-5 000 у Європі. Завжди додавайте цю суму до бюджету.',
  },
  {
    title: 'Storage fee нараховується щодня',
    desc: 'Після виграшу лоту Copart дає 3 дні без плати. Далі — $20-60 на день залежно від майданчика. Якщо затягнути з оплатою чи організацією забору, за тиждень набіжить $300-400 додатково. Швидке підтвердження замовлення — це не формальність, це реальна економія.',
  },
];

const processSteps = [
  {
    num: 1,
    title: 'Вибір лоту і попередній розрахунок',
    desc: 'Надсилаєте нам номер лоту з Copart або IAAI до початку торгів. Ми рахуємо повну логістику до вашого міста, щоб ви знали реальну кінцеву ціну ще до ставки. Розрахунок безкоштовний і нічого не зобовʼязує.',
  },
  {
    num: 2,
    title: 'Участь у торгах',
    desc: 'Купівля з Copart відбувається через ліцензованого дилера або брокера з правом участі. Ми не займаємося самою ставкою — це робите ви особисто через брокера або замовляєте послугу у спеціалізованої компанії. Ми включаємося на етапі логістики після виграшу.',
  },
  {
    num: 3,
    title: 'Оплата та документи Copart',
    desc: 'Після виграшу у вас 2 робочих дні для повної оплати лоту плюс buyer fees. Copart надсилає title (документ на авто) поштою протягом 1-2 тижнів. Для транспортування title не обовʼязковий одразу — ми забираємо авто за dispatch order.',
  },
  {
    num: 4,
    title: 'Забір з майданчика Copart',
    desc: 'Наш перевізник забирає авто протягом 3-10 днів після дозволу. Водій робить фотодокументацію стану перед завантаженням. Якщо авто не заводиться (non-running), додаткова плата за лебідку $100-200.',
  },
  {
    num: 5,
    title: 'Транспорт до порту завантаження',
    desc: 'Авто їде до одного з портів: Newark (NJ), Baltimore (MD), Savannah (GA), Houston (TX) або Los Angeles (CA). Вибір порту залежить від локації майданчика Copart і доступності контейнерних слотів. На цьому етапі завершується американська частина від Y7.',
  },
  {
    num: 6,
    title: 'Морський фрахт і доставка в Україну',
    desc: 'Далі авто передається перевіреним партнерам-експедиторам для морського перевезення та доставки до вашого міста в Україні через один з трьох маршрутів: Гдиня, Клайпеда або Констанца. Ви отримуєте коносамент (BOL) після завантаження на корабель і далі працюєте з митним брокером в Україні для розмитнення.',
  },
];

const diasporaUseCases = [
  {
    title: 'Забір з Copart пiд дiм в США',
    desc: 'Купуєте авто на аукціоні в одному штаті, живете в іншому — ми доставимо. Типова міжштатна траса (Каліфорнія → Нью-Йорк) — 7-10 днів, $1 100-1 600 для седана.',
  },
  {
    title: 'Доставка до вашого автосервісу',
    desc: 'Багато покупців з Copart відразу везуть авто у майстерню для ремонту. Ми доставляємо прямо до вказаного сервісу — не потрібно зустрічати водія вдома.',
  },
  {
    title: 'Продаж готового проекту',
    desc: 'Купуєте на Copart, ремонтуєте, продаєте на Cars.com або Facebook Marketplace. Ми організовуємо доставку покупцеві у будь-який штат.',
  },
  {
    title: 'Доставка до порту для відправки в Україну',
    desc: 'Якщо плануєте самостійно відправити авто родичам в Україну, доставимо лот з Copart до вказаного порту в США — Newark, Baltimore, Savannah, Houston або LA.',
  },
];

// =============================================================================
// Component
// =============================================================================

function UkraineCopart() {
  return (
    <div style={pageStyle} lang="uk">
      {/* -- Head ----------------------------------------------------------- */}
      <Helmet>
        <title>Copart — пригін авто з аукціону в Україну | Y7 Logistics</title>
        <meta
          name="description"
          content="Copart пригін авто в Україну: реальна ціна, три маршрути доставки (Гдиня, Клайпеда, Констанца), українськомовна підтримка. Y7 Logistics — ліцензований FMCSA-брокер (MC #1741537)."
        />
        <meta
          name="keywords"
          content="Copart Україна, пригін авто з Copart, авто з аукціону США, IAAI пригін, биті авто з США, розмитнення Copart, Y7 Logistics"
        />
        <link rel="canonical" href="https://www.y7agency.com/ua/copart-shipping" />
        <meta property="og:title" content="Copart — пригін авто з аукціону в Україну" />
        <meta
          property="og:description"
          content="Чесний гайд без маркетингу: реальна вартість, ризики, процес. Ліцензований FMCSA-брокер з українськомовною підтримкою."
        />
        <meta property="og:url" content="https://www.y7agency.com/ua/copart-shipping" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://www.y7agency.com/og/copart-ua.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Copart — пригін авто з аукціону в Україну" />
        <meta
          name="twitter:description"
          content="Y7 Logistics: FMCSA-брокер, українськомовна підтримка, три маршрути доставки."
        />
        <html lang="uk" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <HreflangTags
        currentPath="/copart-shipping"
        hasPolishVersion={true}
        hasUkrainianVersion={true}
        hasRussianVersion={true}
      />

      {/* ================================================================== */}
      {/* SECTION 1 — Hero                                                    */}
      {/* ================================================================== */}
      <section style={{ ...sectionStyle, paddingTop: 'clamp(3rem, 8vw, 6rem)' }}>
        <div
          style={{
            display: 'inline-block',
            padding: '0.375rem 0.875rem',
            background: '#fff',
            border: '1px solid #E8E4DC',
            borderRadius: '999px',
            fontSize: '0.8rem',
            color: accentColor,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          Copart × Україна
        </div>
        <h1 style={h1Style}>
          Пригін авто з Copart в Україну — чесний гайд без маркетингу
        </h1>
        <p style={{ ...pStyle, marginTop: '1.5rem', maxWidth: '720px' }}>
          Copart — найбільший страховий аукціон у США. Понад 175 тисяч авто щоденно,
          понад 200 майданчиків, мільйон продажів на рік. Для українського покупця
          це шанс купити авто на 30-50% дешевше ніж на внутрішньому ринку — але
          шлях від &laquo;молотка до гаража&raquo; має більше етапів і пасток, ніж
          обіцяє реклама. Y7 Logistics — ліцензований FMCSA-брокер (MC #1741537),
          обслуговує американську частину процесу: забір з майданчика Copart, транспорт
          до порту завантаження, передачу перевіреним партнерам-експедиторам для
          морської частини. У нашій команді є українськомовні співробітники.
          Ця сторінка описує процес чесно — що варто знати до ставки і чого не варто
          чекати від аукціонних авто.
        </p>
      </section>

      {/* ================================================================== */}
      {/* SECTION 2 — What Copart really is                                   */}
      {/* ================================================================== */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Що таке Copart насправді</h2>
        <p style={{ ...pStyle, marginBottom: '1.25rem' }}>
          Copart (Copart Inc., заснований 1982 року в Каліфорнії) — це платформа,
          що зʼєднує страхові компанії, дилерів і банки з покупцями по всьому світу.
          На відміну від класичних аукціонних домів, Copart працює виключно онлайн —
          усі торги відбуваються через інтернет у системі VB3 (Virtual Bidding 3.0).
          Штаб-квартира у Далласі, Техас.
        </p>
        <p style={{ ...pStyle, marginBottom: '1.25rem' }}>
          Більшість авто на Copart — це пошкоджені транспортні засоби від страхових
          компаній. Після ДТП, крадіжки, повені або градобою страхова визнає авто
          total loss (повна конструктивна загибель) і передає на аукціон. Ключовий
          момент: &laquo;total loss&raquo; у США не завжди означає знищення. Американські
          правила вимагають визнання авто збитковим, коли ремонт перевищує 70-80%
          ринкової вартості. Через високі ціни на запчастини та роботу в США багато
          легко пошкоджених авто потрапляє на Copart лише тому, що їх невигідно
          ремонтувати для американського ринку.
        </p>
        <p style={{ ...pStyle, marginBottom: 0 }}>
          Для українського імпортера це шанс: авто після легкого ДТП у США за
          $10 000 може після ремонту та пригону коштувати в Україні значно дорожче.
          Але ця ж логіка діє у зворотний бік — недосвідчений покупець може виграти
          лот з прихованими проблемами, вартість ремонту яких зʼїсть всю економію.
        </p>
      </section>

      {/* ================================================================== */}
      {/* SECTION 3 — Copart vs IAAI                                          */}
      {/* ================================================================== */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Copart vs IAAI — у чому різниця</h2>
        <p style={{ ...pStyle, marginBottom: '1.5rem' }}>
          В США працює два великих страхових аукціони. Обидва продають подібний товар —
          авто після страхових випадків — але мають свої особливості.
        </p>

        <div
          style={{
            ...cardStyle,
            padding: 0,
            overflow: 'hidden',
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#F7F5F0', borderBottom: '1px solid #E8E4DC' }}>
                <th
                  style={{
                    padding: '0.875rem 1rem',
                    textAlign: 'left',
                    fontFamily: 'system-ui, sans-serif',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: '#4A4A46',
                  }}
                >
                  Характеристика
                </th>
                <th
                  style={{
                    padding: '0.875rem 1rem',
                    textAlign: 'left',
                    fontFamily: 'system-ui, sans-serif',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: accentColor,
                  }}
                >
                  Copart
                </th>
                <th
                  style={{
                    padding: '0.875rem 1rem',
                    textAlign: 'left',
                    fontFamily: 'system-ui, sans-serif',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: '#4A4A46',
                  }}
                >
                  IAAI
                </th>
              </tr>
            </thead>
            <tbody>
              {copartVsIaai.map((row, idx) => (
                <tr
                  key={idx}
                  style={{
                    borderBottom: idx < copartVsIaai.length - 1 ? '1px solid #E8E4DC' : 'none',
                  }}
                >
                  <td
                    style={{
                      padding: '0.875rem 1rem',
                      fontSize: '0.95rem',
                      color: '#4A4A46',
                      fontFamily: 'system-ui, sans-serif',
                      fontWeight: 500,
                    }}
                  >
                    {row.feature}
                  </td>
                  <td style={{ padding: '0.875rem 1rem', fontSize: '0.95rem', color: '#4A4A46' }}>
                    {row.copart}
                  </td>
                  <td style={{ padding: '0.875rem 1rem', fontSize: '0.95rem', color: '#4A4A46' }}>
                    {row.iaai}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p style={{ ...pStyle, marginTop: '1.25rem', marginBottom: 0, fontStyle: 'italic' }}>
          Для більшості українських покупців обидва аукціони працюють аналогічно.
          Ми обслуговуємо логістику з обох — різниця лише у номері лоту, який ви нам
          надсилаєте.
        </p>
      </section>

      {/* ================================================================== */}
      {/* SECTION 4 — Risks and warnings                                      */}
      {/* ================================================================== */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>На що звернути увагу до ставки</h2>
        <p style={{ ...pStyle, marginBottom: '1.5rem' }}>
          Найбільша помилка новачків — покладатися лише на фото і mileage. Copart
          не дає гарантій стану авто, умови продажу &laquo;as-is&raquo;. Нижче —
          чотири речі, які реально впливають на фінансовий результат.
        </p>

        <div style={{ display: 'grid', gap: '1rem' }}>
          {riskWarnings.map((warn, idx) => (
            <div key={idx} style={warningCardStyle}>
              <h3
                style={{
                  fontFamily: 'system-ui, sans-serif',
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  marginTop: 0,
                  marginBottom: '0.5rem',
                  color: '#8B6B1F',
                }}
              >
                {warn.title}
              </h3>
              <p style={{ ...pStyle, fontSize: '0.95rem', margin: 0 }}>{warn.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 5 — Process                                                 */}
      {/* ================================================================== */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Процес пригону — крок за кроком</h2>
        <p style={{ ...pStyle, marginBottom: '2rem' }}>
          Увесь цикл — від виграшу лоту до отримання авто в Україні — займає типово
          6-8 тижнів. Нижче деталі кожного етапу і що саме робить Y7, а що залежить
          від вас та інших учасників процесу.
        </p>

        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {processSteps.map((step) => (
            <div
              key={step.num}
              style={{
                ...cardStyle,
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1.25rem',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: accentColor,
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'system-ui, sans-serif',
                  fontWeight: 600,
                  fontSize: '1.125rem',
                  flexShrink: 0,
                }}
              >
                {step.num}
              </div>
              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                  {step.title}
                </h3>
                <p style={{ ...pStyle, margin: 0 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 6 — Pricing                                                 */}
      {/* ================================================================== */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Орієнтовні витрати на логістику</h2>
        <p style={{ ...pStyle, marginBottom: '1.5rem' }}>
          Нижче типові діапазони для стандартного легкового авто (седан, SUV,
          кросовер до 2,5 тонни). Конкретну вартість рахуємо після отримання номера
          лоту — різниця між майданчиками Copart і портами завантаження може складати
          кілька сотень доларів. Ціни не включають саме авто, buyer fee Copart та
          розмитнення в Україні.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1rem',
          }}
        >
          <div style={cardStyle}>
            <h3
              style={{
                fontFamily: 'system-ui, sans-serif',
                fontWeight: 600,
                fontSize: '0.95rem',
                marginTop: 0,
                marginBottom: '0.75rem',
                color: '#4A4A46',
              }}
            >
              Транспорт по США (Y7)
            </h3>
            <div
              style={{
                fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                fontWeight: 300,
                color: accentColor,
                marginBottom: '0.5rem',
              }}
            >
              $350–950
            </div>
            <p style={{ ...pStyle, fontSize: '0.9rem', margin: 0 }}>
              Забір з майданчика Copart до порту завантаження. Залежить від відстані,
              стану авто (їде/не їде), сезону.
            </p>
          </div>

          <div style={cardStyle}>
            <h3
              style={{
                fontFamily: 'system-ui, sans-serif',
                fontWeight: 600,
                fontSize: '0.95rem',
                marginTop: 0,
                marginBottom: '0.75rem',
                color: '#4A4A46',
              }}
            >
              Морський фрахт
            </h3>
            <div
              style={{
                fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                fontWeight: 300,
                color: accentColor,
                marginBottom: '0.5rem',
              }}
            >
              $1 200–2 400
            </div>
            <p style={{ ...pStyle, fontSize: '0.9rem', margin: 0 }}>
              Контейнер 40HC (1-3 авто у контейнері) або RoRo. Залежить від порту США
              та європейського порту призначення.
            </p>
          </div>

          <div style={cardStyle}>
            <h3
              style={{
                fontFamily: 'system-ui, sans-serif',
                fontWeight: 600,
                fontSize: '0.95rem',
                marginTop: 0,
                marginBottom: '0.75rem',
                color: '#4A4A46',
              }}
            >
              Доставка в Україну
            </h3>
            <div
              style={{
                fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                fontWeight: 300,
                color: accentColor,
                marginBottom: '0.5rem',
              }}
            >
              $600–1 200
            </div>
            <p style={{ ...pStyle, fontSize: '0.9rem', margin: 0 }}>
              Автовоз з європейського порту до вашого міста через один з трьох
              маршрутів (Гдиня, Клайпеда, Констанца).
            </p>
          </div>
        </div>

        <p
          style={{
            ...pStyle,
            fontSize: '0.95rem',
            marginTop: '1.5rem',
            marginBottom: 0,
            fontStyle: 'italic',
          }}
        >
          <strong>Застереження:</strong> не забудьте додати buyer fee Copart
          ($500-1 200 залежно від лоту), мито, акциз та ПДВ при розмитненні.
          Для точного розрахунку надішліть номер лоту — дамо конкретні цифри для
          вашого кейсу.
        </p>
      </section>

      {/* ================================================================== */}
      {/* SECTION 7 — Trust + FMCSA                                           */}
      {/* ================================================================== */}
      <section style={sectionStyle}>
        <div style={{ ...cardStyle, borderLeft: `4px solid ${accentColor}` }}>
          <h2 style={{ ...h2Style, fontSize: '1.5rem' }}>
            Чому Y7 Logistics
          </h2>
          <p style={{ ...pStyle, marginBottom: '1rem' }}>
            Y7 Logistics працює як ліцензований FMCSA-брокер — це означає федеральний
            нагляд Департаменту транспорту США, обовʼязкове страхування відповідальності,
            публічна реєстрація в базі SAFER (safer.fmcsa.dot.gov). Ви можете перевірити
            наш статус за номером MC #1741537 самостійно в будь-який момент.
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.5rem',
              marginTop: '1rem',
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: 'system-ui, sans-serif',
                  fontWeight: 600,
                  display: 'block',
                  marginBottom: '0.25rem',
                }}
              >
                Ліцензія брокера
              </span>
              <span style={pStyle}>MC #1741537</span>
            </div>
            <div>
              <span
                style={{
                  fontFamily: 'system-ui, sans-serif',
                  fontWeight: 600,
                  display: 'block',
                  marginBottom: '0.25rem',
                }}
              >
                USDOT
              </span>
              <span style={pStyle}>#4427359</span>
            </div>
            <div>
              <span
                style={{
                  fontFamily: 'system-ui, sans-serif',
                  fontWeight: 600,
                  display: 'block',
                  marginBottom: '0.25rem',
                }}
              >
                Статус FMCSA
              </span>
              <span style={pStyle}>Активний, застрахований</span>
            </div>
          </div>

          <p style={{ ...pStyle, marginTop: '1rem', marginBottom: 0 }}>
            Для українських клієнтів ми пропонуємо українськомовну підтримку через
            Telegram, прозорі ціни без прихованих комісій і реальний досвід роботи
            з маршрутами через Гдиню, Клайпеду та Констанцу.
          </p>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 8 — Для діаспори в США (diaspora split)                     */}
      {/* ================================================================== */}
      <section style={dividerSectionStyle}>
        <div style={sectionStyle}>
          <div
            style={{
              display: 'inline-block',
              padding: '0.375rem 0.875rem',
              background: '#fff',
              border: '1px solid #E8E4DC',
              borderRadius: '999px',
              fontSize: '0.8rem',
              color: accentColor,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            Для діаспори в США
          </div>
          <h2 style={h2Style}>
            Купуєте на Copart і живете в Штатах? Доставимо під дім
          </h2>
          <p style={{ ...pStyle, marginBottom: '1.25rem' }}>
            Увесь попередній розділ описує шлях авто з Copart до України — повний
            імпорт з морським фрахтом і розмитненням. Але якщо ви з української
            діаспори в США і купуєте авто для використання у Штатах або на продаж —
            ваш маршрут коротший: від майданчика Copart одразу під дім у Чикаго,
            Лос-Анджелесі, Нью-Йорку чи будь-де в США. Y7 обслуговує цей обсяг
            самостійно, без міжнародного етапу.
          </p>
          <p style={{ ...pStyle, marginBottom: '1.25rem' }}>
            Як ліцензований FMCSA-брокер (MC #1741537) маємо доступ до мережі
            перевірених перевізників по всіх 50 штатах. Типовий маршрут між штатами
            для седана з Copart — 5-8 днів від виграшу лоту до доставки за вашою
            адресою. <strong>Важливо:</strong> памʼятайте, що Copart нараховує плату
            за зберігання з 3 дня після виграшу, тому швидке підтвердження замовлення
            економить $100-300.
          </p>

          <h3
            style={{
              fontFamily: 'system-ui, sans-serif',
              fontSize: '1.125rem',
              fontWeight: 600,
              marginBottom: '1rem',
              marginTop: '2rem',
            }}
          >
            Типові замовлення
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1rem',
              marginBottom: '2rem',
            }}
          >
            {diasporaUseCases.map((uc, idx) => (
              <div key={idx} style={cardStyle}>
                <h4
                  style={{
                    fontFamily: 'system-ui, sans-serif',
                    fontSize: '1rem',
                    fontWeight: 600,
                    marginTop: 0,
                    marginBottom: '0.5rem',
                    color: '#2C2C2A',
                  }}
                >
                  {uc.title}
                </h4>
                <p style={{ ...pStyle, fontSize: '0.95rem', margin: 0 }}>{uc.desc}</p>
              </div>
            ))}
          </div>

          <h3
            style={{
              fontFamily: 'system-ui, sans-serif',
              fontSize: '1.125rem',
              fontWeight: 600,
              marginBottom: '1rem',
              marginTop: '2rem',
            }}
          >
            Орієнтовні ціни доставки з Copart по США
          </h3>
          <p style={{ ...pStyle, marginBottom: '1.5rem' }}>
            Ціни для стандартного седана чи кросовера на відкритому автовозі.
            Non-running авто — доплата $150-300 за завантаження лебідкою. Закриті
            автовози (enclosed) — доплата 30-60%.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1rem',
            }}
          >
            <div style={cardStyle}>
              <h4
                style={{
                  fontFamily: 'system-ui, sans-serif',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  marginTop: 0,
                  marginBottom: '0.75rem',
                  color: '#4A4A46',
                }}
              >
                Copart під дім (до 500 миль)
              </h4>
              <div
                style={{
                  fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                  fontWeight: 300,
                  color: accentColor,
                  marginBottom: '0.5rem',
                }}
              >
                $450–750
              </div>
              <p style={{ ...pStyle, fontSize: '0.9rem', margin: 0 }}>
                В межах одного регіону. Наприклад, Copart NJ → Нью-Йорк, Copart CA →
                Лос-Анджелес. Доставка 3-5 днів.
              </p>
            </div>

            <div style={cardStyle}>
              <h4
                style={{
                  fontFamily: 'system-ui, sans-serif',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  marginTop: 0,
                  marginBottom: '0.75rem',
                  color: '#4A4A46',
                }}
              >
                Copart між регіонами (500-1500 миль)
              </h4>
              <div
                style={{
                  fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                  fontWeight: 300,
                  color: accentColor,
                  marginBottom: '0.5rem',
                }}
              >
                $750–1 200
              </div>
              <p style={{ ...pStyle, fontSize: '0.9rem', margin: 0 }}>
                Наприклад, Copart Texas → Chicago, Copart Florida → New York.
                Доставка 5-8 днів.
              </p>
            </div>

            <div style={cardStyle}>
              <h4
                style={{
                  fontFamily: 'system-ui, sans-serif',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  marginTop: 0,
                  marginBottom: '0.75rem',
                  color: '#4A4A46',
                }}
              >
                Через усю країну (1500+ миль)
              </h4>
              <div
                style={{
                  fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                  fontWeight: 300,
                  color: accentColor,
                  marginBottom: '0.5rem',
                }}
              >
                $1 100–1 600
              </div>
              <p style={{ ...pStyle, fontSize: '0.9rem', margin: 0 }}>
                Наприклад, Copart California → New York, Washington → Florida.
                Доставка 7-10 днів.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 9 — FAQ                                                     */}
      {/* ================================================================== */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Часті запитання</h2>
        <p style={{ ...pStyle, marginBottom: '1.5rem' }}>
          Нижче — запитання, які найчастіше отримуємо від клієнтів перед ставкою
          на Copart. Якщо не знайдете тут відповіді, напишіть нам у Telegram —
          відповімо без шаблонів.
        </p>

        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {faqSchema.mainEntity.map((faq, idx) => (
            <details key={idx} style={{ ...cardStyle, cursor: 'pointer' }}>
              <summary
                style={{
                  fontFamily: 'system-ui, sans-serif',
                  fontWeight: 600,
                  fontSize: '1.05rem',
                  listStyle: 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                {faq.name}
                <span
                  style={{
                    color: accentColor,
                    fontSize: '1.25rem',
                    marginLeft: '1rem',
                    flexShrink: 0,
                  }}
                >
                  +
                </span>
              </summary>
              <p style={{ ...pStyle, marginTop: '1rem' }}>{faq.acceptedAnswer.text}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 10 — Dark CTA                                               */}
      {/* ================================================================== */}
      <section
        style={{
          ...darkCtaStyle,
          padding: 'clamp(3rem, 6vw, 5rem) clamp(1.25rem, 4vw, 2rem)',
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ ...h2Style, color: '#F7F5F0' }}>Маєте вибраний лот на Copart?</h2>
          <p
            style={{
              ...pStyle,
              color: '#C5C0B8',
              maxWidth: '600px',
              margin: '0 auto 2rem',
            }}
          >
            Надішліть номер лоту через Telegram — отримаєте повну кальк&shy;уляцію
            door-to-door протягом години. Безкоштовно, без зобовʼязань, без
            маркетингових продажів.
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              justifyContent: 'center',
            }}
          >
            <a
              href="https://t.me/y7dispatch_bot"
              target="_blank"
              rel="noopener noreferrer"
              style={ctaButtonStyle}
            >
              Telegram — швидкий розрахунок
            </a>
            <Link
              to="/ua/ship-my-car"
              style={{
                ...ctaButtonStyle,
                background: 'transparent',
                border: '1px solid #F7F5F0',
                color: '#F7F5F0',
              }}
            >
              Як замовити пригін →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UkraineCopart;
