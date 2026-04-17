import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import HreflangTags from '../../components/HreflangTags';

// =============================================================================
// RussiaHome.jsx — Template A (Home/Overview)
// Route: /ru | lang="ru" | Audience: Russian-speaking US diaspora + CIS
// =============================================================================
// IMPORTANT NOTES:
// - Y7 HAS Russian-speaking team members
// - DO NOT mention Russia as a destination (sanctions compliance)
// - Mention DaytonaCargo only as "international shipping" without specifying country
// - Content translated from PLACEHOLDER — Sprint C / Audit-T1B
// =============================================================================

// ---------------------------------------------------------------------------
// Structured Data — FAQ
// ---------------------------------------------------------------------------
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Сколько стоит перевозка автомобиля по США?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Стоимость зависит от расстояния, типа транспорта (открытый или закрытый) и размера автомобиля. Типичный диапазон: $300–$600 для коротких маршрутов (до 500 миль), $600–$1200 для средних (500–1500 миль) и $900–$1600 для кросс-кантри перевозок. Запросите точный расчёт через нашего Telegram-бота @y7dispatch_bot.',
      },
    },
    {
      '@type': 'Question',
      name: 'Как долго занимает доставка автомобиля?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Сроки доставки зависят от расстояния: локальная перевозка (до 500 миль) — 2–4 дня, средняя дистанция — 4–7 дней, перевозка через всю страну — 7–14 дней. На сроки также влияют сезон, маршрут и доступность перевозчиков.',
      },
    },
    {
      '@type': 'Question',
      name: 'Y7 Logistics — это перевозчик или брокер?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Y7 Logistics — лицензированный брокер автоперевозок FMCSA (MC #1741537, USDOT #4427359). Мы координируем доставку через сеть 100+ проверенных перевозчиков, подбирая оптимальный вариант по маршруту, срокам и бюджету.',
      },
    },
    {
      '@type': 'Question',
      name: 'Застрахован ли автомобиль во время перевозки?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Да. Каждый перевозчик в нашей сети обязан иметь действующую страховку cargo insurance на полную стоимость перевозимых автомобилей. Перед погрузкой мы проверяем актуальность полиса и предоставляем информацию о покрытии.',
      },
    },
    {
      '@type': 'Question',
      name: 'Можно ли перевезти автомобиль с аукциона Copart или IAAI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Да, это одна из наших основных специализаций. Мы организуем вывоз автомобилей со всех площадок Copart и IAAI по всей территории США. Подробности — на странице /ru/copart-shipping.',
      },
    },
    {
      '@type': 'Question',
      name: 'Как связаться с Y7 Logistics?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Самый быстрый способ — через Telegram-бот @y7dispatch_bot (ответ в течение нескольких минут). Также можно написать на info@y7agency.com. Диспетчер отвечает в рабочие часы.',
      },
    },
  ],
};

// ---------------------------------------------------------------------------
// Structured Data — Breadcrumb
// ---------------------------------------------------------------------------
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Главная',
      item: 'https://www.y7agency.com/',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Русский',
      item: 'https://www.y7agency.com/ru',
    },
  ],
};

// ---------------------------------------------------------------------------
// Data arrays
// ---------------------------------------------------------------------------

const STATS = [
  { number: '10+', label: 'лет в автоперевозках по США' },
  { number: '100+', label: 'проверенных перевозчиков в сети' },
  { number: '50', label: 'штатов — полное покрытие' },
];

const SERVICES = [
  {
    title: 'Доставка с аукционов',
    description: 'Вывоз автомобилей с площадок Copart, IAAI и Manheim по всей территории США. Координация оплаты, оформления и вывоза в одном окне.',
    icon: '🏷️',
  },
  {
    title: 'Перевозка до порта',
    description: 'Доставка автомобиля от любой точки в США до ближайшего порта — Newark, Houston, Savannah, Baltimore, Los Angeles, Jacksonville.',
    icon: '🚢',
  },
  {
    title: 'Внутренняя перевозка',
    description: 'Перевозка между городами и штатами на открытом или закрытом автовозе. Подходит для переезда, покупки или продажи автомобиля.',
    icon: '🚛',
  },
  {
    title: 'Дилерские перевозки',
    description: 'Регулярные маршруты для автодилеров: оптовые тарифы, приоритетная диспетчеризация, ежемесячная отчётность.',
    icon: '🏢',
  },
  {
    title: 'Международная логистика',
    description: 'Полный цикл доставки за рубеж совместно с партнёрской компанией DaytonaCargo — от аукциона в США до конечного пункта.',
    icon: '🌍',
  },
];

const PROCESS_STEPS = [
  { num: 1, title: 'Запрос расчёта', desc: 'Напишите нам в Telegram @y7dispatch_bot или на info@y7agency.com. Укажите откуда, куда и какой автомобиль.' },
  { num: 2, title: 'Расчёт стоимости', desc: 'В течение нескольких минут мы рассчитаем стоимость и сроки доставки на основе реальных данных Central Dispatch.' },
  { num: 3, title: 'Подтверждение заказа', desc: 'После согласования условий мы бронируем перевозчика. Предоплата или оплата при доставке — зависит от маршрута.' },
  { num: 4, title: 'Забор автомобиля', desc: 'Перевозчик прибывает в согласованное время. Осмотр автомобиля, фиксация состояния, погрузка на автовоз.' },
  { num: 5, title: 'Отслеживание в пути', desc: 'Вы получаете обновления по статусу доставки. Диспетчер на связи в рабочие часы через Telegram и email.' },
];

const COST_CARDS = [
  {
    title: 'Локальная перевозка',
    amount: '$300–$600',
    note: 'До 500 миль. Например, внутри одного штата или между соседними штатами.',
  },
  {
    title: 'Средняя дистанция',
    amount: '$600–$1 200',
    note: '500–1 500 миль. Например, Нью-Йорк — Флорида или Техас — Джорджия.',
  },
  {
    title: 'Кросс-кантри',
    amount: '$900–$1 600',
    note: 'Более 1 500 миль. Например, Калифорния — Нью-Йорк или побережье — побережье.',
  },
  {
    title: 'Закрытый транспорт',
    amount: '+40–60%',
    note: 'Надбавка за закрытый автовоз. Рекомендуется для премиальных и классических автомобилей.',
  },
];

const CAR_EXAMPLES = [
  {
    title: 'BMW X5 с аукциона Copart',
    route: 'Dallas, TX → Port Newark, NJ',
    price: '$750–$950',
    detail: 'Открытый автовоз, 5–7 дней. Типичный маршрут для экспорта через восточное побережье.',
  },
  {
    title: 'Tesla Model 3',
    route: 'Los Angeles, CA → Miami, FL',
    price: '$1 100–$1 400',
    detail: 'Закрытый транспорт, 8–12 дней. Кросс-кантри маршрут с защитой от непогоды.',
  },
  {
    title: 'Ford F-150 для переезда',
    route: 'Chicago, IL → Houston, TX',
    price: '$650–$850',
    detail: 'Открытый автовоз, 4–6 дней. Популярный маршрут Средний Запад — Техас.',
  },
];

const RISKS = [
  { title: 'Нелицензированные перевозчики', desc: 'Работа с нелицензированным брокером или перевозчиком — главный риск. Всегда проверяйте наличие MC-номера в базе FMCSA. Наш номер: MC #1741537.' },
  { title: 'Скрытые доплаты', desc: 'Некоторые компании занижают начальную цену, а потом добавляют «топливный сбор», «страховку» или «плату за пикап». В Y7 цена фиксируется при бронировании.' },
  { title: 'Задержки без уведомления', desc: 'Погода, поломки, загруженность маршрута — задержки случаются. Разница в том, предупреждают ли вас. Наш диспетчер информирует о любых изменениях.' },
  { title: 'Повреждения при перевозке', desc: 'Перед погрузкой и при выгрузке составляется Bill of Lading с фиксацией состояния автомобиля. Это ваша защита при подаче претензии. Все наши перевозчики застрахованы.' },
];

const FAQS = [
  { q: 'Сколько стоит перевозка автомобиля по США?', a: 'Стоимость зависит от расстояния, типа транспорта и размера автомобиля. Локальная перевозка (до 500 миль) — $300–$600, средняя дистанция — $600–$1 200, через всю страну — $900–$1 600. Запросите точный расчёт через @y7dispatch_bot.' },
  { q: 'Как долго занимает доставка?', a: 'Типичные сроки: 2–4 дня (локально), 4–7 дней (средняя дистанция), 7–14 дней (кросс-кантри). Сроки могут меняться в зависимости от сезона и маршрута.' },
  { q: 'Y7 — это перевозчик или брокер?', a: 'Y7 Logistics — лицензированный брокер FMCSA (MC #1741537). Мы работаем с сетью 100+ проверенных перевозчиков, подбирая оптимальный вариант для каждого заказа.' },
  { q: 'Застрахован ли автомобиль при перевозке?', a: 'Да. Все перевозчики в нашей сети имеют действующий полис cargo insurance. Перед отправкой мы проверяем актуальность страховки и предоставляем информацию о покрытии.' },
  { q: 'Можно ли перевезти машину с аукциона?', a: 'Да, вывоз с Copart, IAAI и Manheim — одна из наших специализаций. Мы координируем оплату, gate pass и своевременный забор автомобиля.' },
  { q: 'Как с вами связаться?', a: 'Самый быстрый способ — Telegram-бот @y7dispatch_bot (ответ в течение минут). Также можно написать на info@y7agency.com. Диспетчерская на связи в рабочие часы.' },
];

// ---------------------------------------------------------------------------
// Shared inline styles
// ---------------------------------------------------------------------------
const styles = {
  main: {
    fontFamily: 'Georgia, "Times New Roman", serif',
    color: '#2C2C2A',
    background: '#F7F5F0',
  },
  section: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: 'clamp(2rem, 5vw, 4rem) clamp(1.25rem, 4vw, 2rem)',
  },
  h1: {
    fontSize: 'clamp(2rem, 5vw, 3.25rem)',
    lineHeight: '1.15',
    fontWeight: 400,
  },
  h2: {
    fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
    lineHeight: '1.2',
    fontWeight: 400,
    marginBottom: '1rem',
  },
  paragraph: {
    fontSize: 'clamp(1rem, 2vw, 1.125rem)',
    lineHeight: '1.7',
    color: '#4A4A46',
  },
  card: {
    background: '#fff',
    padding: '1.5rem',
    borderRadius: '8px',
    border: '1px solid #E8E4DC',
  },
  ctaButton: {
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
  },
  darkCta: {
    background: '#2C2C2A',
    color: '#F7F5F0',
  },
  statNumber: {
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: 300,
    color: '#993C1D',
  },
  sansFont: {
    fontFamily: 'system-ui, sans-serif',
  },
  accent: {
    color: '#993C1D',
  },
};

// =============================================================================
// Component
// =============================================================================
function RussiaHome() {
  return (
    <div style={styles.main}>
      {/* ----------------------------------------------------------------- */}
      {/* Head / SEO                                                        */}
      {/* ----------------------------------------------------------------- */}
      <Helmet>
        <html lang="ru" />
        <title>Перевозка автомобилей по США — Y7 Logistics</title>
        <meta name="description" content="Y7 Logistics (MC #1741537) — перевозка авто по всем 50 штатам. Доставка с Copart и IAAI, до порта, дилерские маршруты. Русскоязычная поддержка." />
        <link rel="canonical" href="https://www.y7agency.com/ru" />
        <meta property="og:title" content="Перевозка автомобилей по США — Y7 Logistics" />
        <meta property="og:description" content="Лицензированный брокер FMCSA. 100+ перевозчиков, все 50 штатов. Русскоязычная поддержка." />
        <meta property="og:url" content="https://www.y7agency.com/ru" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ru" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <HreflangTags
        currentPath=""
        hasPolishVersion={true}
        hasUkrainianVersion={true}
        hasRussianVersion={true}
      />

      {/* ================================================================= */}
      {/* SECTION 1 — Hero                                                  */}
      {/* ================================================================= */}
      <section style={styles.section}>
        {/* Brand line */}
        <p
          style={{
            ...styles.sansFont,
            fontSize: '0.875rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#993C1D',
            marginBottom: '0.75rem',
          }}
        >
          Y7 Logistics
        </p>

        <h1 style={styles.h1}>
          Перевозка автомобилей по всей территории США — от аукциона до вашего адреса
        </h1>

        <p
          style={{
            ...styles.paragraph,
            marginTop: '1.5rem',
            maxWidth: '720px',
          }}
        >
          Y7 Logistics — лицензированный брокер автоперевозок FMCSA (MC&nbsp;#1741537).
          Мы организуем доставку автомобилей по всем 50 штатам: с аукционов Copart и IAAI,
          между городами, до морских портов. Более 10 лет опыта, сеть из 100+ проверенных
          перевозчиков и русскоязычная команда, которая отвечает быстро через Telegram и email. Наши цены
          формируются на основе реальных данных Central Dispatch — без скрытых доплат
          и неприятных сюрпризов.
        </p>

        {/* CTA button */}
        <div style={{ marginTop: '2rem' }}>
          <Link to="/ru/ship-my-car" style={styles.ctaButton}>
            Рассчитать стоимость доставки
          </Link>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 2 — Quick Stats                                           */}
      {/* ================================================================= */}
      <section
        style={{
          ...styles.section,
          borderTop: '1px solid #E8E4DC',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            textAlign: 'center',
          }}
        >
          {STATS.map((stat, i) => (
            <div key={i}>
              <p style={styles.statNumber}>{stat.number}</p>
              <p
                style={{
                  ...styles.sansFont,
                  fontSize: '0.95rem',
                  color: '#4A4A46',
                  marginTop: '0.25rem',
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 3 — Our Services (US diaspora framing)                    */}
      {/* ================================================================= */}
      <section style={styles.section}>
        <h2 style={styles.h2}>Наши услуги</h2>
        <p style={{ ...styles.paragraph, marginBottom: '2rem' }}>
          Полный спектр автоперевозок внутри США — от единичного заказа до регулярных дилерских
          маршрутов. Все услуги доступны на русском языке.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {SERVICES.map((svc, i) => (
            <div key={i} style={styles.card}>
              <p
                style={{
                  fontSize: '1.75rem',
                  marginBottom: '0.5rem',
                }}
              >
                {svc.icon}
              </p>
              <h3
                style={{
                  ...styles.sansFont,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  color: '#2C2C2A',
                }}
              >
                {svc.title}
              </h3>
              <p style={{ ...styles.paragraph, fontSize: '0.95rem' }}>
                {svc.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 4 — Process Steps                                         */}
      {/* ================================================================= */}
      <section
        style={{
          ...styles.section,
          borderTop: '1px solid #E8E4DC',
        }}
      >
        <h2 style={styles.h2}>Как это работает</h2>

        <ol
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'grid',
            gap: '1.5rem',
          }}
        >
          {PROCESS_STEPS.map((step) => (
            <li
              key={step.num}
              style={{
                ...styles.card,
                display: 'grid',
                gridTemplateColumns: '3rem 1fr',
                gap: '1rem',
                alignItems: 'start',
              }}
            >
              <span
                style={{
                  ...styles.statNumber,
                  fontSize: '1.75rem',
                  lineHeight: '1',
                }}
              >
                {step.num}
              </span>
              <div>
                <h3
                  style={{
                    ...styles.sansFont,
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    marginBottom: '0.35rem',
                    color: '#2C2C2A',
                  }}
                >
                  {step.title}
                </h3>
                <p style={{ ...styles.paragraph, fontSize: '0.95rem' }}>
                  {step.desc}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ================================================================= */}
      {/* SECTION 5 — Cost Breakdown                                        */}
      {/* ================================================================= */}
      <section style={styles.section}>
        <h2 style={styles.h2}>Ориентировочная стоимость</h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {COST_CARDS.map((cost, i) => (
            <div key={i} style={styles.card}>
              <p
                style={{
                  ...styles.sansFont,
                  fontSize: '0.85rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: '#4A4A46',
                  marginBottom: '0.5rem',
                }}
              >
                {cost.title}
              </p>
              <p
                style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  fontWeight: 300,
                  color: '#993C1D',
                  marginBottom: '0.5rem',
                }}
              >
                {cost.amount}
              </p>
              <p
                style={{
                  ...styles.paragraph,
                  fontSize: '0.875rem',
                }}
              >
                {cost.note}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 6 — Real Examples                                         */}
      {/* ================================================================= */}
      <section
        style={{
          ...styles.section,
          borderTop: '1px solid #E8E4DC',
        }}
      >
        <h2 style={styles.h2}>Примеры реальных маршрутов</h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {CAR_EXAMPLES.map((car, i) => (
            <div key={i} style={styles.card}>
              <h3
                style={{
                  ...styles.sansFont,
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  color: '#2C2C2A',
                }}
              >
                {car.title}
              </h3>
              <p
                style={{
                  ...styles.paragraph,
                  fontSize: '0.9rem',
                  marginBottom: '0.25rem',
                }}
              >
                {car.route}
              </p>
              <p
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 500,
                  color: '#993C1D',
                  marginBottom: '0.5rem',
                }}
              >
                {car.price}
              </p>
              <p
                style={{
                  ...styles.paragraph,
                  fontSize: '0.85rem',
                }}
              >
                {car.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 7 — Risks                                                 */}
      {/* ================================================================= */}
      <section style={styles.section}>
        <h2 style={styles.h2}>На что обратить внимание</h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {RISKS.map((risk, i) => (
            <div
              key={i}
              style={{
                ...styles.card,
                borderLeft: '3px solid #993C1D',
              }}
            >
              <h3
                style={{
                  ...styles.sansFont,
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  color: '#2C2C2A',
                }}
              >
                {risk.title}
              </h3>
              <p style={{ ...styles.paragraph, fontSize: '0.9rem' }}>
                {risk.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 8 — FAQ                                                   */}
      {/* ================================================================= */}
      <section
        style={{
          ...styles.section,
          borderTop: '1px solid #E8E4DC',
        }}
      >
        <h2 style={styles.h2}>Часто задаваемые вопросы</h2>

        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {FAQS.map((faq, i) => (
            <details
              key={i}
              style={{
                ...styles.card,
                cursor: 'pointer',
              }}
            >
              <summary
                style={{
                  ...styles.sansFont,
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  color: '#2C2C2A',
                  listStyle: 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                {faq.q}
                <span
                  style={{
                    fontSize: '1.25rem',
                    color: '#993C1D',
                    marginLeft: '1rem',
                    flexShrink: 0,
                  }}
                >
                  +
                </span>
              </summary>
              <p
                style={{
                  ...styles.paragraph,
                  marginTop: '1rem',
                  fontSize: '0.95rem',
                }}
              >
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 9 — Dark CTA                                              */}
      {/* ================================================================= */}
      <section
        style={{
          ...styles.darkCta,
          padding: 'clamp(3rem, 6vw, 5rem) clamp(1.25rem, 4vw, 2rem)',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2
            style={{
              ...styles.h2,
              color: '#F7F5F0',
            }}
          >
            Готовы перевезти автомобиль?
          </h2>
          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.125rem)',
              lineHeight: '1.7',
              color: '#A8A49C',
              marginBottom: '2rem',
            }}
          >
            Получите расчёт стоимости за несколько минут. Укажите маршрут — мы подберём
            оптимального перевозчика из нашей сети.
          </p>
          <Link
            to="/ru/ship-my-car"
            style={{
              ...styles.ctaButton,
              fontSize: '1.05rem',
            }}
          >
            Рассчитать стоимость
          </Link>
          <p
            style={{
              ...styles.sansFont,
              fontSize: '0.85rem',
              color: '#6B6963',
              marginTop: '1rem',
            }}
          >
            MC #1741537 · USDOT #4427359 · Лицензированный брокер FMCSA
          </p>
        </div>
      </section>
    </div>
  );
}

export default RussiaHome;
