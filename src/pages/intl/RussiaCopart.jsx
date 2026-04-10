import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import HreflangTags from '../../components/HreflangTags';

// =============================================================================
// RussiaCopart.jsx — Template B (Copart Guide)
// Route: /ru/copart-shipping | lang="ru"
// Audience: Russian-speaking US diaspora buying from Copart/IAAI
// =============================================================================
// IMPORTANT NOTES:
// - Y7 HAS Russian-speaking team members
// - DO NOT mention Russia as a destination (sanctions compliance)
// - Mention DaytonaCargo only as "international shipping" without specifying country
// - Content translated from PLACEHOLDERs — Audit-T1C
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
      name: 'Что такое Copart и как там покупать автомобили?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Copart — крупнейший онлайн-аукцион подержанных и повреждённых автомобилей в США. Для участия нужна лицензия дилера или аккаунт через брокера (например, CrashedToys). Торги проходят онлайн, автомобиль нужно забрать с площадки в течение 3–5 рабочих дней после оплаты.',
      },
    },
    {
      '@type': 'Question',
      name: 'Чем отличается Copart от IAAI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Обе площадки продают автомобили после ДТП, страховых случаев и конфискаций. Copart — крупнее по объёму (200+ площадок), IAAI — часто предлагает лучшие цены на отдельные лоты. Рекомендуем отслеживать обе площадки.',
      },
    },
    {
      '@type': 'Question',
      name: 'Сколько стоит забрать автомобиль с площадки Copart?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Транспортировка с площадки Copart стоит от $150 до $500 в зависимости от расстояния до конечного пункта. Дополнительно Copart взимает gate fee ($79) и storage fees при задержке забора.',
      },
    },
    {
      '@type': 'Question',
      name: 'Можно ли перевезти неисправный автомобиль?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Да. Большинство автомобилей с Copart — неходовые. Наши перевозчики используют лебёдки (winch) для погрузки. Укажите при заказе, что автомобиль inoperable — это влияет на стоимость (+$50–$150) и выбор перевозчика.',
      },
    },
    {
      '@type': 'Question',
      name: 'За какой срок нужно забрать авто с Copart?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Стандартный срок — 3 рабочих дня после оплаты (business days). После этого начисляется storage fee: $40–$75 в день. Мы рекомендуем бронировать транспорт заранее, до завершения торгов.',
      },
    },
    {
      '@type': 'Question',
      name: 'Y7 помогает с оформлением title после покупки?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Y7 Logistics — транспортный брокер, мы не занимаемся оформлением title. Для оформления salvage title обратитесь в DMV вашего штата. Мы доставим автомобиль по любому адресу — домой, в мастерскую или в порт.',
      },
    },
    {
      '@type': 'Question',
      name: 'Как отследить перевозку?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'После бронирования вы получаете данные перевозчика и ориентировочные даты забора и доставки. Статус обновляется через нашу диспетчерскую — пишите в Telegram @y7dispatch_bot в любое время.',
      },
    },
  ],
};

// ---------------------------------------------------------------------------
// Structured Data — Service
// ---------------------------------------------------------------------------
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Перевозка автомобилей с Copart и IAAI',
  serviceType: 'Автоперевозки с аукционов',
  provider: {
    '@type': 'Organization',
    name: 'Y7 Logistics',
    url: 'https://www.y7agency.com',
  },
  areaServed: {
    '@type': 'Country',
    name: 'United States',
  },
  description: 'Перевозка автомобилей с аукционных площадок Copart и IAAI по всей территории США. Лицензированный брокер FMCSA MC #1741537.',
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
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Copart и IAAI',
      item: 'https://www.y7agency.com/ru/copart-shipping',
    },
  ],
};

// ---------------------------------------------------------------------------
// Data arrays
// ---------------------------------------------------------------------------

const COMPARISON_ROWS = [
  { feature: 'Количество площадок', copart: '200+ по всей территории США', iaai: '170+ площадок' },
  { feature: 'Типы автомобилей', copart: 'Salvage, clean title, восстановленные', iaai: 'Преимущественно salvage и страховые' },
  { feature: 'Доступ для покупателей', copart: 'Через брокера или дилерскую лицензию', iaai: 'Прямой доступ (с ограничениями) или через брокера' },
  { feature: 'Аукционный сбор', copart: '10–18% от цены + gate fee $79', iaai: '10–15% от цены + gate fee $79' },
  { feature: 'Срок забора', copart: '3 бизнес-дня после оплаты', iaai: '3 бизнес-дня после оплаты' },
  { feature: 'Storage fee', copart: '$40–$75/день после дедлайна', iaai: '$35–$60/день после дедлайна' },
  { feature: 'VIN-история', copart: 'Предоставляет Run & Drive статус', iaai: 'Указывает Primary Damage' },
  { feature: 'Онлайн-торги', copart: 'VB3 (Virtual Bidding 3rd Gen)', iaai: 'ACV Auctions platform' },
];

const FEES = [
  { name: 'Gate fee', amount: '$79', note: 'Разовый сбор при заборе автомобиля с площадки. Одинаков для Copart и IAAI.' },
  { name: 'Аукционный сбор', amount: '10–18%', note: 'Процент от финальной цены. Зависит от стоимости лота и типа аккаунта покупателя.' },
  { name: 'Транспорт с площадки', amount: '$150–$500', note: 'Зависит от расстояния. Включает погрузку лебёдкой для неходовых авто.' },
  { name: 'Storage fee', amount: '$40–$75/день', note: 'Начисляется после истечения бесплатного срока хранения (обычно 3 дня).' },
  { name: 'Title processing', amount: '$55–$150', note: 'Оформление title через DMV. Стоимость варьируется по штатам.' },
  { name: 'Закрытый транспорт', amount: '+40–60%', note: 'Надбавка за закрытый автовоз. Рекомендуется для дорогих автомобилей.' },
];

const ROUTES = [
  { from: 'Copart Dallas, TX', to: 'Port Newark, NJ', distance: '~1 550 миль', time: '5–8 дней' },
  { from: 'IAAI Los Angeles, CA', to: 'Port Houston, TX', distance: '~1 550 миль', time: '5–8 дней' },
  { from: 'Copart Atlanta, GA', to: 'Port Savannah, GA', distance: '~250 миль', time: '2–3 дня' },
  { from: 'IAAI Chicago, IL', to: 'Port Newark, NJ', distance: '~790 миль', time: '3–5 дней' },
];

const PITFALLS = [
  { title: 'Не проверили VIN-историю', desc: 'Перед торгами обязательно проверьте VIN через NMVTIS, Carfax или AutoCheck. Скрытые повреждения рамы, flood damage или лимонный закон — всё это влияет на стоимость восстановления.' },
  { title: 'Не учли все сборы', desc: 'Цена молотка — не финальная цена. Прибавьте аукционный сбор (10–18%), gate fee ($79), транспорт и storage fees. Реальная стоимость может быть на 30–50% выше цены лота.' },
  { title: 'Задержали забор', desc: 'После 3 бизнес-дней начинается storage fee ($40–$75/день). За две недели задержки это может составить $500–$1 000. Бронируйте транспорт заранее.' },
  { title: 'Не указали inoperable', desc: 'Если автомобиль не на ходу, перевозчику нужна лебёдка. Неожиданный inoperable на месте — это задержка, доплата или отказ перевозчика.' },
  { title: 'Выбрали нелицензированного перевозчика', desc: 'Дешёвые перевозчики без MC-номера не имеют страховки. При повреждении в пути вы не получите компенсацию. Всегда проверяйте MC в базе FMCSA.' },
  { title: 'Не зафиксировали состояние', desc: 'При получении автомобиля сфотографируйте его со всех сторон и сверьте с Bill of Lading. Претензии принимаются только при задокументированных расхождениях.' },
  { title: 'Пропустили дедлайн оплаты', desc: 'Copart и IAAI аннулируют покупку при просрочке оплаты и удерживают депозит. Убедитесь, что средства готовы до участия в торгах.' },
];

const HOW_IT_WORKS = [
  { title: 'Выиграйте лот', desc: 'Участвуйте в торгах на Copart или IAAI через вашего брокера или дилерский аккаунт. Оплатите лот в установленный срок.' },
  { title: 'Свяжитесь с нами', desc: 'Напишите в Telegram @y7dispatch_bot или на info@y7agency.com. Укажите VIN, номер лота, площадку и куда нужно доставить.' },
  { title: 'Получите расчёт', desc: 'Мы рассчитаем стоимость и сроки в течение нескольких минут. Цена фиксируется при подтверждении заказа.' },
  { title: 'Мы забираем автомобиль', desc: 'Перевозчик прибывает на площадку с gate pass. Погрузка лебёдкой для неходовых авто включена.' },
  { title: 'Доставка по назначению', desc: 'Автомобиль доставляется по указанному адресу — домой, в мастерскую, в порт или на склад.' },
  { title: 'Осмотр и подписание', desc: 'При получении вы осматриваете автомобиль и подписываете Bill of Lading. Состояние зафиксировано документально.' },
  { title: 'Дальнейшая логистика', desc: 'Нужен экспорт? Наш партнёр DaytonaCargo организует международную доставку. Напишите нам для деталей.' },
];

const FAQS = [
  { q: 'Что такое Copart и как там покупать?', a: 'Copart — крупнейший онлайн-аукцион подержанных и повреждённых автомобилей в США. Для участия нужна дилерская лицензия или аккаунт через брокера. Торги проходят онлайн, автомобиль нужно забрать в течение 3 бизнес-дней после оплаты.' },
  { q: 'Чем отличается Copart от IAAI?', a: 'Обе площадки продают автомобили после ДТП и страховых случаев. Copart крупнее (200+ площадок), IAAI иногда предлагает лучшие цены. Рекомендуем отслеживать обе.' },
  { q: 'Сколько стоит забрать авто с площадки?', a: 'От $150 до $500 в зависимости от расстояния. Плюс gate fee $79. Для неходовых авто — доплата за лебёдку $50–$150.' },
  { q: 'Можно перевезти неисправный автомобиль?', a: 'Да. Укажите при заказе, что авто inoperable. Наши перевозчики оборудованы лебёдками для погрузки неходовых автомобилей.' },
  { q: 'За сколько дней нужно забрать авто?', a: '3 бизнес-дня после оплаты. Далее — storage fee $40–$75/день. Рекомендуем бронировать транспорт заранее.' },
  { q: 'Помогаете с оформлением title?', a: 'Y7 — транспортный брокер. Оформление salvage title — через DMV вашего штата. Мы доставим авто по любому адресу.' },
  { q: 'Как отследить перевозку?', a: 'После бронирования вы получаете данные перевозчика и ориентировочные даты. Статус — через @y7dispatch_bot в любое время.' },
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
function RussiaCopart() {
  return (
    <div style={styles.main}>
      {/* ----------------------------------------------------------------- */}
      {/* Head / SEO                                                        */}
      {/* ----------------------------------------------------------------- */}
      <Helmet>
        <html lang="ru" />
        <title>Доставка автомобилей с Copart и IAAI — Y7 Logistics | Перевозка с аукционов по США</title>
        <meta name="description" content="Перевозка автомобилей с аукционов Copart и IAAI по всей территории США. Забор с площадки, доставка до адреса или порта. Лицензированный брокер FMCSA MC #1741537. Русскоязычная поддержка 24/7." />
        <link rel="canonical" href="https://www.y7agency.com/ru/copart-shipping" />
        <meta property="og:title" content="Доставка с Copart и IAAI — Y7 Logistics" />
        <meta property="og:description" content="Забор автомобилей с аукционных площадок и доставка по всем 50 штатам. MC #1741537." />
        <meta property="og:url" content="https://www.y7agency.com/ru/copart-shipping" />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="ru" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <HreflangTags
        currentPath="/copart-shipping"
        hasPolishVersion={true}
        hasUkrainianVersion={true}
        hasRussianVersion={true}
      />

      {/* ================================================================= */}
      {/* Breadcrumb nav                                                    */}
      {/* ================================================================= */}
      <nav
        style={{
          ...styles.section,
          paddingTop: '1rem',
          paddingBottom: '0',
        }}
        aria-label="Breadcrumb"
      >
        <ol
          style={{
            ...styles.sansFont,
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            gap: '0.5rem',
            fontSize: '0.85rem',
            color: '#4A4A46',
            flexWrap: 'wrap',
          }}
        >
          <li>
            <Link
              to="/ru"
              style={{ color: '#993C1D', textDecoration: 'none' }}
            >
              Y7 Logistics
            </Link>
            <span style={{ margin: '0 0.25rem' }}>/</span>
          </li>
          <li>
            <Link
              to="/ru"
              style={{ color: '#993C1D', textDecoration: 'none' }}
            >
              Русский
            </Link>
            <span style={{ margin: '0 0.25rem' }}>/</span>
          </li>
          <li style={{ color: '#2C2C2A' }}>
            Copart и IAAI
          </li>
        </ol>
      </nav>

      {/* ================================================================= */}
      {/* SECTION 1 — Hero                                                  */}
      {/* ================================================================= */}
      <section style={styles.section}>
        <h1 style={styles.h1}>
          Перевозка автомобилей с аукционов Copart и IAAI по всей территории США
        </h1>
        <p
          style={{
            ...styles.paragraph,
            marginTop: '1.5rem',
            maxWidth: '720px',
          }}
        >
          Покупаете автомобили на аукционах Copart или IAAI? Y7 Logistics организует забор
          с площадки и доставку в любую точку США — домой, в мастерскую или в морской порт.
          Лицензированный брокер FMCSA (MC&nbsp;#1741537), русскоязычная команда, опыт работы
          со всеми площадками Copart и IAAI.
        </p>
      </section>

      {/* ================================================================= */}
      {/* SECTION 2 — What Copart really is                                 */}
      {/* ================================================================= */}
      <section
        style={{
          ...styles.section,
          borderTop: '1px solid #E8E4DC',
        }}
      >
        <h2 style={styles.h2}>Что такое Copart и IAAI</h2>
        <p style={{ ...styles.paragraph, marginBottom: '1rem' }}>
          Copart и IAAI — два крупнейших онлайн-аукциона подержанных и повреждённых автомобилей
          в Соединённых Штатах. Вместе они обрабатывают миллионы лотов ежегодно: автомобили после ДТП,
          страховых случаев, лизинговые возвраты, конфискации и fleet-списания.
        </p>
        <p style={{ ...styles.paragraph, marginBottom: '1rem' }}>
          Для покупки на этих площадках нужна дилерская лицензия или аккаунт через
          брокера-посредника (CrashedToys, BidFax и другие). Торги проходят полностью
          онлайн — вы можете участвовать из любой точки мира.
        </p>
        <p style={styles.paragraph}>
          После выигрыша и оплаты лота вам даётся ограниченное время на вывоз автомобиля
          с площадки (обычно 3 бизнес-дня). Именно на этом этапе подключается Y7 Logistics —
          мы забираем автомобиль и доставляем его по указанному адресу.
        </p>
      </section>

      {/* ================================================================= */}
      {/* SECTION 3 — Copart vs IAAI comparison table                       */}
      {/* ================================================================= */}
      <section style={styles.section}>
        <h2 style={styles.h2}>Сравнение Copart и IAAI</h2>

        <div
          style={{
            overflowX: 'auto',
            borderRadius: '8px',
            border: '1px solid #E8E4DC',
          }}
        >
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              ...styles.sansFont,
              fontSize: '0.95rem',
              background: '#fff',
            }}
          >
            <thead>
              <tr style={{ background: '#F7F5F0' }}>
                <th
                  style={{
                    padding: '0.875rem 1rem',
                    textAlign: 'left',
                    fontWeight: 600,
                    color: '#2C2C2A',
                    borderBottom: '2px solid #E8E4DC',
                  }}
                >
                  Параметр
                </th>
                <th
                  style={{
                    padding: '0.875rem 1rem',
                    textAlign: 'left',
                    fontWeight: 600,
                    color: '#2C2C2A',
                    borderBottom: '2px solid #E8E4DC',
                  }}
                >
                  Copart
                </th>
                <th
                  style={{
                    padding: '0.875rem 1rem',
                    textAlign: 'left',
                    fontWeight: 600,
                    color: '#2C2C2A',
                    borderBottom: '2px solid #E8E4DC',
                  }}
                >
                  IAAI
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, i) => (
                <tr
                  key={i}
                  style={{
                    borderBottom: '1px solid #E8E4DC',
                    background: i % 2 === 0 ? '#fff' : '#FAFAF8',
                  }}
                >
                  <td
                    style={{
                      padding: '0.75rem 1rem',
                      fontWeight: 500,
                      color: '#2C2C2A',
                    }}
                  >
                    {row.feature}
                  </td>
                  <td style={{ padding: '0.75rem 1rem', color: '#4A4A46' }}>
                    {row.copart}
                  </td>
                  <td style={{ padding: '0.75rem 1rem', color: '#4A4A46' }}>
                    {row.iaai}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 4 — Fees breakdown                                        */}
      {/* ================================================================= */}
      <section
        style={{
          ...styles.section,
          borderTop: '1px solid #E8E4DC',
        }}
      >
        <h2 style={styles.h2}>Какие расходы учитывать</h2>

        <div style={{ display: 'grid', gap: '1rem' }}>
          {FEES.map((fee, i) => (
            <div
              key={i}
              style={{
                ...styles.card,
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: '1rem',
                alignItems: 'center',
              }}
            >
              <div>
                <h3
                  style={{
                    ...styles.sansFont,
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: '#2C2C2A',
                    marginBottom: '0.25rem',
                  }}
                >
                  {fee.name}
                </h3>
                <p
                  style={{
                    ...styles.paragraph,
                    fontSize: '0.85rem',
                  }}
                >
                  {fee.note}
                </p>
              </div>
              <p
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 500,
                  color: '#993C1D',
                  whiteSpace: 'nowrap',
                }}
              >
                {fee.amount}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 5 — Transport routes                                      */}
      {/* ================================================================= */}
      <section style={styles.section}>
        <h2 style={styles.h2}>Популярные маршруты с аукционов</h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {ROUTES.map((route, i) => (
            <div key={i} style={styles.card}>
              <p
                style={{
                  ...styles.sansFont,
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: '#993C1D',
                  marginBottom: '0.5rem',
                }}
              >
                {route.from}
              </p>
              <p
                style={{
                  ...styles.sansFont,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: '#2C2C2A',
                  marginBottom: '0.75rem',
                }}
              >
                {route.to}
              </p>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.9rem',
                  color: '#4A4A46',
                  ...styles.sansFont,
                }}
              >
                <span>{route.distance}</span>
                <span>{route.time}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 6 — Seven pitfalls                                        */}
      {/* ================================================================= */}
      <section
        style={{
          ...styles.section,
          borderTop: '1px solid #E8E4DC',
        }}
      >
        <h2 style={styles.h2}>7 ошибок при покупке на аукционе</h2>

        <div style={{ display: 'grid', gap: '1.25rem' }}>
          {PITFALLS.map((pit, i) => (
            <div
              key={i}
              style={{
                ...styles.card,
                display: 'grid',
                gridTemplateColumns: '2.5rem 1fr',
                gap: '1rem',
                alignItems: 'start',
              }}
            >
              <span
                style={{
                  ...styles.statNumber,
                  fontSize: '1.5rem',
                  lineHeight: '1',
                }}
              >
                {i + 1}
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
                  {pit.title}
                </h3>
                <p style={{ ...styles.paragraph, fontSize: '0.95rem' }}>
                  {pit.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 7 — How it works                                          */}
      {/* ================================================================= */}
      <section style={styles.section}>
        <h2 style={styles.h2}>Как заказать перевозку с аукциона</h2>

        <ol
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'grid',
            gap: '1.25rem',
          }}
        >
          {HOW_IT_WORKS.map((step, i) => (
            <li
              key={i}
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
                  ...styles.sansFont,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '2.5rem',
                  height: '2.5rem',
                  borderRadius: '50%',
                  background: '#993C1D',
                  color: '#fff',
                  fontSize: '1rem',
                  fontWeight: 600,
                }}
              >
                {i + 1}
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
            Выиграли лот? Закажите перевозку
          </h2>
          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.125rem)',
              lineHeight: '1.7',
              color: '#A8A49C',
              marginBottom: '2rem',
            }}
          >
            Напишите нам VIN и номер площадки — мы рассчитаем стоимость и организуем
            забор автомобиля до истечения бесплатного срока хранения.
          </p>
          <Link
            to="/ru/ship-my-car"
            style={{
              ...styles.ctaButton,
              fontSize: '1.05rem',
            }}
          >
            Заказать перевозку
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

export default RussiaCopart;
