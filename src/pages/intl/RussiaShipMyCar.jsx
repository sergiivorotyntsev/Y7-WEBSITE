import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import HreflangTags from '../../components/HreflangTags';
import pageStyles from './RussiaShipMyCar.module.css';

// =============================================================================
// RussiaShipMyCar.jsx — Template C (Action/Ordering)
// Route: /ru/ship-my-car | lang="ru"
// Audience: Russian-speaking US diaspora ready to order transport
// =============================================================================
// IMPORTANT NOTES:
// - Y7 HAS Russian-speaking team members
// - DO NOT mention Russia as a destination (sanctions compliance)
// - Mention DaytonaCargo only as "international shipping" without specifying country
// - Content translated from PLACEHOLDERs — Audit-T1D
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
      name: 'Какая информация нужна для заказа перевозки?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Для расчёта и оформления заказа нам нужны: адрес забора и доставки (ZIP-код или город), марка, модель и год выпуска автомобиля, состояние (на ходу или нет), желаемые сроки и тип транспорта (открытый или закрытый).',
      },
    },
    {
      '@type': 'Question',
      name: 'Как быстро можно забрать автомобиль?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Стандартный срок подачи перевозчика — 1–5 дней после подтверждения заказа. При срочной необходимости возможен экспресс-забор за 24–48 часов (доплата зависит от маршрута).',
      },
    },
    {
      '@type': 'Question',
      name: 'Нужно ли присутствовать при погрузке и выгрузке?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Желательно, но не обязательно. Вы можете назначить доверенное лицо. При передаче составляется Bill of Lading с фиксацией состояния автомобиля — это ваша защита.',
      },
    },
    {
      '@type': 'Question',
      name: 'Какие способы оплаты принимаются?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Оплата банковским переводом, Zelle, кредитной/дебетовой картой. Предоплата или оплата при доставке (COD) — зависит от маршрута и суммы заказа.',
      },
    },
    {
      '@type': 'Question',
      name: 'Что делать, если автомобиль повреждён в пути?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'При получении сверьте состояние автомобиля с Bill of Lading. Если обнаружены новые повреждения — зафиксируйте их на BOL и сфотографируйте. Все наши перевозчики застрахованы, претензия подаётся через страховую компанию перевозчика.',
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
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Заказать перевозку',
      item: 'https://www.y7agency.com/ru/ship-my-car',
    },
  ],
};

// ---------------------------------------------------------------------------
// Data arrays
// ---------------------------------------------------------------------------

const CHECKLIST = [
  { label: 'Адреса забора и доставки', detail: 'Точный адрес или ZIP-код точки отправления и назначения. Для аукционов — номер площадки и номер лота.' },
  { label: 'Данные автомобиля', detail: 'Марка, модель, год выпуска. Если есть VIN — укажите его для точной идентификации.' },
  { label: 'Состояние автомобиля', detail: 'На ходу (operable) или нет (inoperable). Для неходовых авто требуется лебёдка, что влияет на стоимость.' },
  { label: 'Тип транспорта', detail: 'Открытый автовоз (стандарт, дешевле) или закрытый (enclosed, +40–60% к стоимости). Закрытый рекомендуется для премиальных авто.' },
  { label: 'Желаемые сроки', detail: 'Когда автомобиль готов к забору и когда нужна доставка. Чем гибче сроки, тем лучше цена.' },
  { label: 'Контактные данные', detail: 'Имя и контакт лица, присутствующего при погрузке и выгрузке. Может быть другой человек.' },
];

const WORKFLOW_STEPS = [
  { num: 1, title: 'Отправьте запрос', desc: 'Напишите в Telegram @y7dispatch_bot или на info@y7agency.com. Укажите маршрут, автомобиль и желаемые сроки.' },
  { num: 2, title: 'Получите расчёт', desc: 'Мы рассчитаем стоимость на основе данных Central Dispatch за несколько минут. Цена фиксируется при подтверждении.' },
  { num: 3, title: 'Подтвердите заказ', desc: 'Согласуйте условия и подпишите договор-заказ (Broker-Shipper Agreement). Оплата — переводом, Zelle или картой.' },
  { num: 4, title: 'Ожидайте перевозчика', desc: 'Мы подбираем перевозчика из нашей сети. Стандартный срок подачи — 1–5 дней. Вы получаете данные водителя заранее.' },
  { num: 5, title: 'Передайте автомобиль', desc: 'Перевозчик осматривает авто, составляет Bill of Lading и производит погрузку. Фотофиксация состояния.' },
  { num: 6, title: 'Получите доставку', desc: 'При получении сверьте состояние с BOL, подпишите документы. Автомобиль доставлен.' },
];

const FAQS = [
  { q: 'Какая информация нужна для заказа?', a: 'Адреса забора и доставки (ZIP-код), марка/модель/год автомобиля, состояние (на ходу или нет), желаемые сроки и тип транспорта (открытый или закрытый).' },
  { q: 'Как быстро можно забрать авто?', a: 'Стандартно — 1–5 дней после подтверждения. Экспресс-забор за 24–48 часов возможен за доплату.' },
  { q: 'Нужно ли присутствовать при погрузке?', a: 'Желательно, но не обязательно. Можно назначить доверенное лицо. При передаче составляется Bill of Lading.' },
  { q: 'Какие способы оплаты?', a: 'Банковский перевод, Zelle, кредитная/дебетовая карта. Предоплата или оплата при доставке — зависит от маршрута.' },
  { q: 'Что если авто повредили в пути?', a: 'Зафиксируйте новые повреждения на Bill of Lading при получении и сфотографируйте. Претензия подаётся через страховую перевозчика. Все наши перевозчики застрахованы.' },
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
function RussiaShipMyCar() {
  return (
    <div style={styles.main}>
      {/* ----------------------------------------------------------------- */}
      {/* Head / SEO                                                        */}
      {/* ----------------------------------------------------------------- */}
      <Helmet>
        <html lang="ru" />
        <title>Заказать перевозку авто по США — Y7 Logistics</title>
        <meta name="description" content="Закажите перевозку авто по США: от аукциона до двери, между городами, до порта. Расчёт за минуты, фиксированная цена. MC #1741537." />
        <link rel="canonical" href="https://www.y7agency.com/ru/ship-my-car" />
        <meta property="og:title" content="Заказать перевозку автомобиля — Y7 Logistics" />
        <meta property="og:description" content="Расчёт стоимости за минуты. Фиксированная цена, все 50 штатов. MC #1741537." />
        <meta property="og:url" content="https://www.y7agency.com/ru/ship-my-car" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ru" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <HreflangTags
        currentPath="/ship-my-car"
        hasPolishVersion={true}
        hasUkrainianVersion={true}
        hasRussianVersion={true}
      />

      {/* ================================================================= */}
      {/* SECTION 1 — Hero (short)                                          */}
      {/* ================================================================= */}
      <section style={styles.section}>
        <h1 style={styles.h1}>
          Заказать перевозку автомобиля по США
        </h1>
        <p
          style={{
            ...styles.paragraph,
            marginTop: '1.5rem',
            maxWidth: '720px',
          }}
        >
          Готовы отправить автомобиль? Ниже — всё, что нужно знать перед оформлением
          заказа: какую информацию подготовить, как проходит процесс и что ожидать
          на каждом этапе. Расчёт стоимости — за несколько минут через Telegram
          @y7dispatch_bot или по email info@y7agency.com.
        </p>
      </section>

      {/* ================================================================= */}
      {/* SECTION 2 — What you need before ordering                         */}
      {/* ================================================================= */}
      <section
        style={{
          ...styles.section,
          borderTop: '1px solid #E8E4DC',
        }}
      >
        <span className={pageStyles.sectionKicker}>◆ ПОДГОТОВКА</span>
        <h2 style={styles.h2}>Что подготовить перед заказом</h2>

        <div style={{ display: 'grid', gap: '1rem' }}>
          {CHECKLIST.map((item, i) => (
            <div
              key={i}
              style={{
                ...styles.card,
                display: 'grid',
                gridTemplateColumns: '2rem 1fr',
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
                  width: '1.75rem',
                  height: '1.75rem',
                  borderRadius: '4px',
                  border: '2px solid #993C1D',
                  color: '#993C1D',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  flexShrink: 0,
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
                    marginBottom: '0.25rem',
                    color: '#2C2C2A',
                  }}
                >
                  {item.label}
                </h3>
                <p
                  style={{
                    ...styles.paragraph,
                    fontSize: '0.9rem',
                  }}
                >
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 3 — Ordering workflow                                     */}
      {/* ================================================================= */}
      <section style={styles.section}>
        <span className={pageStyles.sectionKicker}>◆ ПРОЦЕСС</span>
        <h2 style={styles.h2}>Как оформить заказ</h2>

        <ol
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'grid',
            gap: '1.25rem',
          }}
        >
          {WORKFLOW_STEPS.map((step) => (
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
      {/* SECTION 4 — Why choose Y7                                         */}
      {/* ================================================================= */}
      <section
        style={{
          ...styles.section,
          borderTop: '1px solid #E8E4DC',
        }}
      >
        <span className={pageStyles.sectionKicker}>◆ ПОЧЕМУ Y7</span>
        <h2 style={styles.h2}>Почему Y7 Logistics</h2>
        <p style={{ ...styles.paragraph, marginBottom: '2rem' }}>
          Лицензированный брокер FMCSA (MC #1741537). Русскоязычная команда,
          быстрый ответ диспетчера, прозрачное ценообразование.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.25rem',
          }}
        >
          <div className={pageStyles.liftCard} style={styles.card}>
            <p
              style={{
                ...styles.statNumber,
                fontSize: '1.75rem',
                marginBottom: '0.5rem',
              }}
            >
              🛡️
            </p>
            <h3
              style={{
                ...styles.sansFont,
                fontSize: '1.05rem',
                fontWeight: 600,
                marginBottom: '0.35rem',
                color: '#2C2C2A',
              }}
            >
              Лицензия и страховка
            </h3>
            <p style={{ ...styles.paragraph, fontSize: '0.9rem' }}>
              MC #1741537, USDOT #4427359. Все перевозчики в нашей сети застрахованы.
              Проверьте нас в базе FMCSA.
            </p>
          </div>

          <div className={pageStyles.liftCard} style={styles.card}>
            <p
              style={{
                ...styles.statNumber,
                fontSize: '1.75rem',
                marginBottom: '0.5rem',
              }}
            >
              ⚡
            </p>
            <h3
              style={{
                ...styles.sansFont,
                fontSize: '1.05rem',
                fontWeight: 600,
                marginBottom: '0.35rem',
                color: '#2C2C2A',
              }}
            >
              Быстрый расчёт
            </h3>
            <p style={{ ...styles.paragraph, fontSize: '0.9rem' }}>
              Стоимость и сроки — за несколько минут. Цена фиксируется при бронировании,
              без скрытых доплат.
            </p>
          </div>

          <div className={pageStyles.liftCard} style={styles.card}>
            <p
              style={{
                ...styles.statNumber,
                fontSize: '1.75rem',
                marginBottom: '0.5rem',
              }}
            >
              🇷🇺
            </p>
            <h3
              style={{
                ...styles.sansFont,
                fontSize: '1.05rem',
                fontWeight: 600,
                marginBottom: '0.35rem',
                color: '#2C2C2A',
              }}
            >
              Русскоязычная поддержка
            </h3>
            <p style={{ ...styles.paragraph, fontSize: '0.9rem' }}>
              Общайтесь на русском языке. Наша команда на связи через Telegram в рабочие часы.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 5 — Contact                                               */}
      {/* ================================================================= */}
      <section
        style={{
          ...styles.section,
          borderTop: '1px solid #E8E4DC',
        }}
      >
        <span className={pageStyles.sectionKicker}>◆ КОНТАКТЫ</span>
        <h2 style={styles.h2}>Свяжитесь с нами</h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {/* Telegram */}
          <div className={pageStyles.liftCard} style={styles.card}>
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
              Telegram
            </p>
            <a
              href="https://t.me/y7dispatch_bot"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                ...styles.sansFont,
                fontSize: '1.1rem',
                fontWeight: 600,
                color: '#2C2C2A',
                textDecoration: 'none',
              }}
            >
              @y7dispatch_bot
            </a>
            <p
              style={{
                ...styles.paragraph,
                fontSize: '0.85rem',
                marginTop: '0.5rem',
              }}
            >
              Самый быстрый способ связи. Ответ в течение нескольких минут в рабочие часы.
            </p>
          </div>

          {/* Email */}
          <div className={pageStyles.liftCard} style={styles.card}>
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
              Email
            </p>
            <a
              href="mailto:info@y7agency.com"
              style={{
                ...styles.sansFont,
                fontSize: '1.1rem',
                fontWeight: 600,
                color: '#2C2C2A',
                textDecoration: 'none',
              }}
            >
              info@y7agency.com
            </a>
            <p
              style={{
                ...styles.paragraph,
                fontSize: '0.85rem',
                marginTop: '0.5rem',
              }}
            >
              Для подробных запросов и документации. Ответ в рабочие часы.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 6 — Trust signals                                         */}
      {/* ================================================================= */}
      <section style={styles.section}>
        <div
          style={{
            ...styles.card,
            textAlign: 'center',
            padding: '2rem',
            borderLeft: '4px solid #993C1D',
          }}
        >
          <p
            style={{
              ...styles.sansFont,
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#993C1D',
              marginBottom: '0.75rem',
            }}
          >
            Лицензированный брокер FMCSA
          </p>
          <p
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 300,
              color: '#2C2C2A',
              marginBottom: '0.5rem',
            }}
          >
            MC#1741537
          </p>
          <p
            style={{
              ...styles.paragraph,
              fontSize: '0.95rem',
            }}
          >
            Y7 Consulting Inc — зарегистрированный транспортный брокер. USDOT #4427359.
            Сеть из 100+ проверенных перевозчиков, все 50 штатов.
          </p>
          <a
            href="https://safer.fmcsa.dot.gov/CompanySnapshot.aspx"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              ...styles.sansFont,
              display: 'inline-block',
              marginTop: '1rem',
              fontSize: '0.9rem',
              color: '#993C1D',
              textDecoration: 'underline',
            }}
          >
            Проверить лицензию на сайте FMCSA →
          </a>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 6b — Открытый vs закрытый автовоз (transport comparison)  */}
      {/* ================================================================= */}
      <section style={{ ...styles.section, borderTop: '1px solid #E8E4DC' }}>
        <span className={pageStyles.sectionKicker}>◆ СРАВНЕНИЕ</span>
        <h2 style={styles.h2}>Открытый или закрытый автовоз — что выбрать</h2>
        <p style={{ ...styles.paragraph, marginBottom: '1rem', maxWidth: '720px' }}>
          Два формата перевозки — разница в цене и в уровне защиты. Коротко: для
          большинства машин открытый трак — нормальный выбор. Закрытый (enclosed) берут
          для редких, коллекционных, свежекупленных премиум-авто и новых электрокаров.
        </p>
        <div className={pageStyles.comparisonGrid}>
          <div className={`${pageStyles.comparisonCard} ${pageStyles.liftCard}`}>
            <h3 className={pageStyles.comparisonTitle}>Открытый автовоз</h3>
            <p className={pageStyles.comparisonPrice}>базовая цена · стандарт рынка</p>
            <ul className={pageStyles.comparisonList}>
              <li>Большинство машин едет именно так — седаны, кроссоверы, пикапы</li>
              <li>Подача перевозчика быстрее (много траков на рынке)</li>
              <li>Машина видна в пути — возможна пыль и лёгкие осадки</li>
              <li>Страховка cargo покрывает повреждения при ДТП и падениях</li>
              <li>Оптимально для аукционных машин с salvage/clean title</li>
            </ul>
          </div>
          <div className={`${pageStyles.comparisonCard} ${pageStyles.liftCard}`}>
            <h3 className={pageStyles.comparisonTitle}>Закрытый (enclosed)</h3>
            <p className={pageStyles.comparisonPrice}>+40–60% к стандартной цене</p>
            <ul className={pageStyles.comparisonList}>
              <li>Машина едет в закрытом прицепе — ни пыли, ни дождя, ни камней</li>
              <li>Для премиум, классики, лоурайдеров, гоночных машин</li>
              <li>Для EV и новых Tesla — страховка на высокую оценку проще</li>
              <li>Подача дольше — закрытых траков в сети меньше</li>
              <li>Имеет смысл когда цена машины от $60k или есть уникальная ценность</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 6c — Что влияет на цену (pricing factors)                  */}
      {/* ================================================================= */}
      <section style={{ ...styles.section, borderTop: '1px solid #E8E4DC' }}>
        <span className={pageStyles.sectionKicker}>◆ ФАКТОРЫ ЦЕНЫ</span>
        <h2 style={styles.h2}>Что влияет на итоговую цену</h2>
        <p style={{ ...styles.paragraph, maxWidth: '720px' }}>
          Цена складывается из пяти факторов. Central Dispatch (биржа перевозчиков)
          показывает реальный диапазон по каждому маршруту — мы ориентируемся на него,
          а не на «средние» цифры с баннеров.
        </p>
        <ul style={{ ...styles.paragraph, paddingLeft: '1.25rem', maxWidth: '720px' }}>
          <li><strong>Расстояние.</strong> Локальные маршруты (до 500 миль) дешевле в пересчёте
          на милю, кросс-кантри — обычно дороже, но выигрывает консолидация.</li>
          <li><strong>Размер и состояние машины.</strong> Пикапы, SUV и минивэны занимают больше
          места; не на ходу (inop) — доплата $100–$300 за лебёдку.</li>
          <li><strong>Тип транспорта.</strong> Открытый — стандарт; закрытый — +40–60%.</li>
          <li><strong>Сезон и маршрут.</strong> Январь и пик лета (июнь–август) — пиковый спрос
          на популярных маршрутах (снежные штаты → Флорида, Калифорния → Восток).</li>
          <li><strong>Сроки.</strong> Гибкая дата — дешевле. Срочный забор за 24–48 часов —
          доплата $100–$400 в зависимости от маршрута.</li>
        </ul>
      </section>

      {/* ================================================================= */}
      {/* SECTION 6d — Высокий сезон (peak season)                           */}
      {/* ================================================================= */}
      <section style={{ ...styles.section, borderTop: '1px solid #E8E4DC' }}>
        <span className={pageStyles.sectionKicker}>◆ СЕЗОН</span>
        <h2 style={styles.h2}>Высокий сезон — о чём стоит знать</h2>
        <p style={{ ...styles.paragraph, maxWidth: '720px' }}>
          Два пика в году: <strong>январь</strong> (snowbirds едут из северных штатов в Флориду
          и обратно весной) и <strong>июнь–август</strong> (летний переезд, отпуска, аукционные
          закупки перед осенью). В эти периоды ставки поднимаются на 15–30%, подача
          перевозчика занимает больше дней. Совет простой: если знаете маршрут заранее —
          бронируйте за 10–14 дней, не за сутки.
        </p>
      </section>

      {/* ================================================================= */}
      {/* SECTION 6e — Забор и доставка (pickup & delivery details)          */}
      {/* ================================================================= */}
      <section style={{ ...styles.section, borderTop: '1px solid #E8E4DC' }}>
        <span className={pageStyles.sectionKicker}>◆ ЗАБОР И ДОСТАВКА</span>
        <h2 style={styles.h2}>Как проходит забор и доставка</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.25rem',
          }}
        >
          <div className={pageStyles.liftCard} style={styles.card}>
            <h3 style={{ ...styles.sansFont, fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              Забор
            </h3>
            <p style={{ ...styles.paragraph, fontSize: '0.95rem' }}>
              Водитель звонит за 1–2 часа до приезда. Встретьте его или оставьте ключи
              доверенному лицу (аукционы Copart/IAAI — по gate pass). При погрузке
              оформляется <strong>Bill of Lading (BOL)</strong> — это ваша главная защита.
              Перед подписью осмотрите машину, сверьте состояние, сделайте фото на телефон
              со всех сторон. Любая царапина или вмятина должна быть отмечена в BOL.
            </p>
          </div>
          <div className={pageStyles.liftCard} style={styles.card}>
            <h3 style={{ ...styles.sansFont, fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              Доставка
            </h3>
            <p style={{ ...styles.paragraph, fontSize: '0.95rem' }}>
              Водитель согласовывает точное время за 12–24 часа. При получении снова
              осмотрите машину и сверьте с BOL. Если есть новые повреждения — зафиксируйте
              их на BOL <em>до</em> подписи и сфотографируйте. Претензия подаётся через
              страховую компанию перевозчика (cargo insurance) — мы поможем оформить.
              Оплата — банковским переводом, Zelle или COD на месте, в зависимости от
              маршрута.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 7 — FAQ                                                   */}
      {/* ================================================================= */}
      <section
        style={{
          ...styles.section,
          borderTop: '1px solid #E8E4DC',
        }}
      >
        <span className={pageStyles.sectionKicker}>◆ FAQ</span>
        <h2 style={styles.h2}>Часто задаваемые вопросы</h2>

        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {FAQS.map((faq, i) => (
            <details
              key={i}
              className={pageStyles.faqItem}
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
      {/* SECTION 8 — Dark CTA                                              */}
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
            Готовы заказать перевозку?
          </h2>
          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.125rem)',
              lineHeight: '1.7',
              color: '#A8A49C',
              marginBottom: '2rem',
            }}
          >
            Напишите нам маршрут и данные автомобиля — мы рассчитаем стоимость
            и подберём перевозчика. Ответ в Telegram — за минуты.
          </p>
          <a
            href="https://t.me/y7dispatch_bot"
            target="_blank"
            rel="noopener noreferrer"
            className={`${pageStyles.subtleLift} ${pageStyles.focusRing}`}
            style={{
              ...styles.ctaButton,
              fontSize: '1.05rem',
            }}
          >
            Написать в Telegram
          </a>
          <p
            style={{
              ...styles.sansFont,
              fontSize: '0.85rem',
              color: '#6B6963',
              marginTop: '1rem',
            }}
          >
            MC #1741537 · USDOT #4427359 · Диспетчерская в рабочие часы
          </p>
        </div>
      </section>
    </div>
  );
}

export default RussiaShipMyCar;
