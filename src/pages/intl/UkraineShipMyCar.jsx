import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import HreflangTags from '../../components/HreflangTags';

// =============================================================================
// UkraineShipMyCar.jsx — Merged audience (Ukraine import + діаспора в США)
// Route: /ua/ship-my-car
// Primary audience: Ukraine buyers ordering car import from US
// Secondary audience: Ukrainian diaspora in USA ordering inland US transport
// Y7-centric: international leg via "перевірені партнери-експедитори"
// Type: Action/ordering page (not a guide — shorter, focused on "how to order")
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

const accentColor = '#993C1D';

// -- Structured data ----------------------------------------------------------

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Чи обовʼязково вже мати куплене авто, щоб замовити пригін?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ні. Ви можете написати нам до торгів — надішлете номер лоту з Copart або IAAI, отримаєте повний розрахунок логістики до вашого міста в Україні ще до ставки. Розрахунок безкоштовний і нічого не зобовʼязує. Альтернативно звертаєтесь одразу після виграшу лоту, ми реєструємо авто в системі і беремось за забір з майданчика.',
      },
    },
    {
      '@type': 'Question',
      name: 'Скільки триває весь процес від виграшу до отримання авто в Україні?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Типово 6-8 тижнів. Розподіл: забір з майданчика Copart 3-10 днів, транспорт до порту в США 2-5 днів, очікування завантаження контейнера 1-2 тижні, морський фрахт 3-5 тижнів, розмитнення у європейському порту 2-5 днів, доставка автовозом в Україну 2-4 дні. Маршрут через Констанцу інколи на тиждень швидший для південних областей.',
      },
    },
    {
      '@type': 'Question',
      name: 'Хто відповідає за авто на кожному етапі?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Y7 Logistics як ліцензований FMCSA-брокер (MC #1741537) обслуговує американську частину: забір з аукціонного майданчика, транспорт до порту завантаження в США, передача у термінал. Далі авто переходить під відповідальність перевірених партнерів-експедиторів для морського перевезення і доставки в Європу. В Україні останню милю робить локальний перевізник, а розмитнення — український митний брокер. Ми координуємо передачі між етапами, щоб ви не мали справи з кількома компаніями окремо.',
      },
    },
    {
      '@type': 'Question',
      name: 'Які документи потрібні для замовлення?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Мінімум для початку: номер лоту з Copart або IAAI (або інший ідентифікатор, якщо авто від дилера або від приватної особи), копія title або bill of sale після виграшу, контактні дані отримувача, адреса доставки, вибраний порт призначення (Гдиня, Клайпеда або Констанца — радимо відповідно до вашої локації). Для розмитнення в Україні додатково знадобляться: паспортні дані, ІПН, експортна декларація США та коносамент (BOL) — їх ми надамо вчасно.',
      },
    },
    {
      '@type': 'Question',
      name: 'Живу в США — чи можна замовити лише перевезення між штатами?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Так. Y7 Logistics обслуговує українську діаспору в США у повному обсязі внутрішніх перевезень: забір з аукціонів Copart та IAAI, доставка від дилерів або приватних продавців, перевезення між штатами, доставка до американського порту. У цьому випадку не залучаємо міжнародних партнерів — робимо лише американську частину. Українською спілкуємося через Telegram.',
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
      name: 'Замовити пригін',
      item: 'https://www.y7agency.com/ua/ship-my-car',
    },
  ],
};

// -- Data arrays --------------------------------------------------------------

const checklistItems = [
  'Номер лоту з Copart або IAAI (або ідентифікатор авто від дилера)',
  'Копія title або bill of sale після виграшу лоту',
  'Контактні дані отримувача (імʼя, телефон, email)',
  'Точна адреса доставки в Україні — місто, вулиця, індекс',
  'Вибраний порт призначення: Гдиня, Клайпеда або Констанца (порадимо)',
  'Стан авто: їде, не їде, без ключів — це впливає на вартість завантаження',
];

const orderingSteps = [
  {
    num: 1,
    title: 'Попередній запит і розрахунок',
    desc: 'Пишете нам у Telegram або на email. Надсилаєте номер лоту з Copart/IAAI або посилання на аукціон. Протягом 1-2 годин отримуєте конкретний розрахунок: транспорт лядовий по США (Y7), орієнтовний морський фрахт, доставка до вашого міста в Україні. Розрахунок безкоштовний і не зобовʼязує до замовлення.',
  },
  {
    num: 2,
    title: 'Підтвердження після виграшу лоту',
    desc: 'Після виграшу надсилаєте нам підтвердження з Copart або IAAI. Ми реєструємо авто в нашій системі dispatch.y7agency.com і призначаємо до транспорту. Ви отримуєте доступ до клієнтського порталу, де бачите статус на кожному етапі.',
  },
  {
    num: 3,
    title: 'Забір з аукціонного майданчика',
    desc: 'Наш перевізник забирає авто протягом 3-10 днів після дозволу. Важливо: Copart нараховує storage fee з 3 дня після виграшу — швидке підтвердження замовлення економить $100-300. Під час завантаження робимо фотодокументацію стану.',
  },
  {
    num: 4,
    title: 'Транспорт до порту в США',
    desc: 'Авто їде до одного з портів: Newark (NJ), Baltimore (MD), Savannah (GA), Houston (TX) або Los Angeles (CA). Вибір залежить від локації майданчика Copart та доступності контейнерних слотів. На цьому етапі завершується американська частина логістики від Y7.',
  },
  {
    num: 5,
    title: 'Морське перевезення до Європи',
    desc: 'Далі авто передається перевіреним партнерам-експедиторам для завантаження у контейнер 40HC (типово 1-3 авто) або на корабель RoRo. Тривалість морського транзиту 3-5 тижнів. Ви отримуєте коносамент (BOL) — документ, що підтверджує завантаження і є титулом для отримання в порту призначення.',
  },
  {
    num: 6,
    title: 'Розмитнення і доставка в Україну',
    desc: 'Після прибуття до європейського порту (Гдиня, Клайпеда або Констанца) локальний експедитор передає авто українському митному брокеру. Ви сплачуєте мито, акциз та ПДВ — розрахунок залежить від віку, обʼєму двигуна та типу палива. Після розмитнення авто їде автовозом до вашого міста.',
  },
];

const diasporaUseCases = [
  {
    title: 'Забір з Copart чи IAAI під дім',
    desc: 'Купуєте авто на аукціоні в одному штаті, живете в іншому. Типова траса (Каліфорнія → Нью-Йорк) — 7-10 днів, $1 100-1 600 для седана.',
  },
  {
    title: 'Перевезення між штатами — переїзд',
    desc: 'Переїжджаєте між штатами і не хочете їхати за кермом кілька днів. Забираємо авто від вашого дому, доставляємо за новою адресою. Опція закритого автовозу доступна.',
  },
  {
    title: 'Продаж приватно — доставка покупцеві',
    desc: 'Продаєте авто на Facebook Marketplace або Cars.com покупцеві з іншого кінця країни. Організовуємо забір і доставку — ви виставляєте рахунок, ми координуємо перевізника.',
  },
  {
    title: 'Доставка до порту для відправки родичам',
    desc: 'Плануєте відправити авто родині в Україну через власного експедитора. Доставляємо до вказаного порту в США (Newark, Baltimore, Savannah, Houston, LA).',
  },
];

// =============================================================================
// Component
// =============================================================================

function UkraineShipMyCar() {
  return (
    <div style={pageStyle} lang="uk">
      {/* -- Head ----------------------------------------------------------- */}
      <Helmet>
        <title>Замовити пригін авто з США в Україну | Y7 Logistics</title>
        <meta
          name="description"
          content="Замовте пригін авто з аукціонів Copart або IAAI. Y7 Logistics — ліцензований FMCSA-брокер (MC #1741537) з українськомовною підтримкою. Розрахунок за 1 годину, без прихованих комісій."
        />
        <meta
          name="keywords"
          content="замовити пригін авто з США, пригін з Copart в Україну, транспорт авто США Україна, Copart замовлення, IAAI пригін, Y7 Logistics"
        />
        <link rel="canonical" href="https://www.y7agency.com/ua/ship-my-car" />
        <meta property="og:title" content="Замовити пригін авто з США в Україну — Y7 Logistics" />
        <meta
          property="og:description"
          content="Ліцензований FMCSA-брокер (MC #1741537). Українськомовна підтримка, прозорі ціни, розрахунок за 1 годину."
        />
        <meta property="og:url" content="https://www.y7agency.com/ua/ship-my-car" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.y7agency.com/og/ship-my-car-ua.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Замовити пригін авто з США в Україну" />
        <meta
          name="twitter:description"
          content="Y7 Logistics: FMCSA-брокер, українськомовна підтримка. Розрахунок за 1 годину."
        />
        <html lang="uk" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <HreflangTags
        currentPath="/ship-my-car"
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
          Замовлення пригону
        </div>
        <h1 style={h1Style}>
          Замовте пригін авто з США — просто і без прихованих комісій
        </h1>
        <p style={{ ...pStyle, marginTop: '1.5rem', maxWidth: '720px' }}>
          Виграли лот на Copart або IAAI? Чи тільки плануєте участь у торгах і
          хочете знати реальну вартість пригону до вашого міста? Чи живете в США
          і потрібен лише транспорт між штатами? Ви у правильному місці. Y7
          Logistics — ліцензований FMCSA-брокер (MC #1741537) з українськомовною
          підтримкою. Обслуговуємо американську частину логістики: забір з
          аукціонного майданчика, транспорт до порту завантаження, передачу
          перевіреним партнерам-експедиторам для морського перевезення. Ця
          сторінка описує обидва сценарії — замовлення повного пригону до України
          і перевезення по США для української діаспори.
        </p>
      </section>

      {/* ================================================================== */}
      {/* SECTION 2 — Checklist                                              */}
      {/* ================================================================== */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Що підготувати перед замовленням</h2>
        <p style={{ ...pStyle, marginBottom: '1.5rem' }}>
          Чим раніше зберете ці відомості, тим швидше отримаєте точний розрахунок
          і коротший час очікування забору з майданчика Copart. Це мінімум, без
          якого не можемо стартувати.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1rem',
          }}
        >
          {checklistItems.map((item, idx) => (
            <div key={idx} style={cardStyle}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <span
                  style={{
                    color: accentColor,
                    fontWeight: 600,
                    fontSize: '1.25rem',
                    lineHeight: '1',
                    flexShrink: 0,
                  }}
                >
                  &#10003;
                </span>
                <span style={pStyle}>{item}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 3 — Ordering workflow (6 steps)                             */}
      {/* ================================================================== */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Як виглядає процес замовлення — крок за кроком</h2>
        <p style={{ ...pStyle, marginBottom: '2rem' }}>
          Увесь процес — від першого запиту до отримання авто в Україні — займає
          типово 6-8 тижнів. Нижче показуємо, що відбувається на кожному етапі
          і хто за що відповідає. Відповідальність переходить з Y7 до партнерів-експедиторів
          у момент передачі у термінал порту США — але для вас це одна безперервна
          координація.
        </p>

        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {orderingSteps.map((step) => (
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
      {/* SECTION 4 — Contact                                                 */}
      {/* ================================================================== */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Звʼяжіться з нами</h2>
        <p style={{ ...pStyle, marginBottom: '1.5rem' }}>
          Найшвидше — через Telegram. Типово відповідаємо протягом 1-2 годин
          у робочий час (9:00-18:00 за східним часом США, тобто 16:00-01:00
          за київським). Спілкуємося українською, російською або англійською —
          як вам зручніше.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1rem',
          }}
        >
          <div style={cardStyle}>
            <p
              style={{
                fontFamily: 'system-ui, sans-serif',
                fontWeight: 600,
                marginBottom: '0.5rem',
              }}
            >
              Telegram
            </p>
            <a
              href="https://t.me/y7dispatch_bot"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: accentColor, textDecoration: 'underline' }}
            >
              @y7dispatch_bot
            </a>
          </div>

          <div style={cardStyle}>
            <p
              style={{
                fontFamily: 'system-ui, sans-serif',
                fontWeight: 600,
                marginBottom: '0.5rem',
              }}
            >
              Email
            </p>
            <a
              href="mailto:info@y7agency.com"
              style={{ color: accentColor, textDecoration: 'underline' }}
            >
              info@y7agency.com
            </a>
          </div>

          <div style={cardStyle}>
            <p
              style={{
                fontFamily: 'system-ui, sans-serif',
                fontWeight: 600,
                marginBottom: '0.5rem',
              }}
            >
              Портал клієнта
            </p>
            <a
              href="https://dispatch.y7agency.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: accentColor, textDecoration: 'underline' }}
            >
              dispatch.y7agency.com
            </a>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 5 — Pricing overview                                        */}
      {/* ================================================================== */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Орієнтовні витрати</h2>
        <p style={{ ...pStyle, marginBottom: '1.5rem' }}>
          Нижче типові діапазони для стандартного легкового авто (седан, SUV,
          кросовер до 2,5 тонни). Точну вартість надаємо після отримання номера
          лоту. Ціни не включають розмитнення в Україні (мито, акциз, ПДВ) —
          це окрема сума, що залежить від віку авто, обʼєму двигуна та типу
          палива.
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
              Забір з майданчика Copart/IAAI і доставка до порту завантаження.
              Залежить від відстані, стану авто, сезону.
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
              Контейнер 40HC (1-3 авто) або RoRo. Залежить від порту в США та
              європейського порту призначення.
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
              Автовоз з європейського порту до вашого міста через Гдиню,
              Клайпеду або Констанцу.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 6 — Trust + FMCSA                                           */}
      {/* ================================================================== */}
      <section style={sectionStyle}>
        <div style={{ ...cardStyle, borderLeft: `4px solid ${accentColor}` }}>
          <h2 style={{ ...h2Style, fontSize: '1.5rem' }}>
            Чому варто довіряти Y7 Logistics
          </h2>
          <p style={{ ...pStyle, marginBottom: '1rem' }}>
            Y7 Logistics працює як ліцензований FMCSA-брокер — це означає
            федеральний нагляд Департаменту транспорту США, обовʼязкове
            страхування відповідальності та публічну реєстрацію в базі SAFER.
            Кожен може перевірити наш статус через пошук на safer.fmcsa.dot.gov
            за номером MC #1741537.
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
            Для українських клієнтів пропонуємо українськомовну підтримку через
            Telegram, прозорі ціни без прихованих комісій і реальний досвід роботи
            з маршрутами через Гдиню, Клайпеду та Констанцу.
          </p>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 7 — Для діаспори в США (diaspora split)                     */}
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
          <h2 style={h2Style}>Живете в Штатах? Перевезення по США без міжнародного етапу</h2>
          <p style={{ ...pStyle, marginBottom: '1.25rem' }}>
            Якщо ви з української громади в США і потрібен лише внутрішній
            транспорт — забір з Copart під дім, переїзд між штатами, доставка
            до порту — Y7 обслуговує цей обсяг самостійно, без залучення
            міжнародних партнерів. Як ліцензований FMCSA-брокер (MC #1741537)
            маємо доступ до мережі перевірених перевізників по всіх 50 штатах.
            Комунікуємо українською через Telegram.
          </p>

          <h3
            style={{
              fontFamily: 'system-ui, sans-serif',
              fontSize: '1.125rem',
              fontWeight: 600,
              marginBottom: '1rem',
              marginTop: '1.5rem',
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
            Орієнтовні ціни перевезення по США
          </h3>
          <p style={{ ...pStyle, marginBottom: '1.5rem' }}>
            Ціни для стандартного седана чи кросовера на відкритому автовозі.
            Закриті автовози, пікапи та авто, що не їздять, — доплата 30-60%.
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
                Коротка дистанція (до 500 миль)
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
                Наприклад, NY → Chicago, LA → San Francisco. Доставка 3-5 днів.
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
                Середня дистанція (500-1500 миль)
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
                Наприклад, Chicago → Miami, NY → Dallas. Доставка 5-8 днів.
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
                Наприклад, California → New York, Florida → Washington. Доставка
                7-10 днів.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 8 — FAQ                                                     */}
      {/* ================================================================== */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Часті запитання</h2>
        <p style={{ ...pStyle, marginBottom: '1.5rem' }}>
          Нижче — запитання, які найчастіше отримуємо перед замовленням пригону.
          Якщо не знайдете тут відповіді, напишіть нам у Telegram — відповімо
          без шаблонів.
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
      {/* SECTION 9 — Dark CTA                                                */}
      {/* ================================================================== */}
      <section
        style={{
          ...darkCtaStyle,
          padding: 'clamp(3rem, 6vw, 5rem) clamp(1.25rem, 4vw, 2rem)',
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ ...h2Style, color: '#F7F5F0' }}>Готові замовити пригін?</h2>
          <p
            style={{
              ...pStyle,
              color: '#C5C0B8',
              maxWidth: '600px',
              margin: '0 auto 2rem',
            }}
          >
            Надішліть номер лоту з Copart або IAAI у Telegram — отримаєте реальний
            розрахунок протягом 1-2 годин. Безкоштовно, без зобовʼязань.
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
              Написати в Telegram
            </a>
            <Link
              to="/ua"
              style={{
                ...ctaButtonStyle,
                background: 'transparent',
                border: '1px solid #F7F5F0',
                color: '#F7F5F0',
              }}
            >
              Повернутися до головної
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UkraineShipMyCar;
