import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import HreflangTags from '../../components/HreflangTags';
import ContextualCTA from '../../components/ContextualCTA';
import pageStyles from './RussiaCopart.module.css';

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
  provider: { '@id': 'https://www.y7agency.com/#organization' },
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
  { title: 'Дальнейшая логистика', desc: 'Нужен экспорт? Организуем международную доставку через аффилированную компанию с дилерской лицензией. Напишите нам для деталей.' },
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

// =============================================================================
// Component
// =============================================================================
function RussiaCopart() {
  return (
    <div className={pageStyles.page}>
      {/* ----------------------------------------------------------------- */}
      {/* Head / SEO                                                        */}
      {/* ----------------------------------------------------------------- */}
      <Helmet>
        <html lang="ru" />
        <title>Доставка с Copart и IAAI по США — Y7 Logistics</title>
        <meta name="description" content="Перевозка авто с аукционов Copart и IAAI по всей территории США. Забор с площадки, доставка до адреса или порта. Брокер FMCSA MC #1741537." />
        <link rel="canonical" href="https://www.y7agency.com/ru/copart-i-iaai" />
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
      <nav className={pageStyles.breadcrumb} aria-label="Breadcrumb">
        <div className={pageStyles.breadcrumbInner}>
          <ol className={pageStyles.breadcrumbList}>
            <li>
              <Link to="/ru" className={pageStyles.breadcrumbLink}>
                Y7 Logistics
              </Link>
              <span className={pageStyles.breadcrumbSep}>/</span>
            </li>
            <li>
              <Link to="/ru" className={pageStyles.breadcrumbLink}>
                Русский
              </Link>
              <span className={pageStyles.breadcrumbSep}>/</span>
            </li>
            <li>
              Copart и IAAI
            </li>
          </ol>
        </div>
      </nav>

      {/* ================================================================= */}
      {/* SECTION 1 — Hero (board-black)                                     */}
      {/* ================================================================= */}
      <section className={`${pageStyles.heroBand} ${pageStyles.hero}`}>
        <div className={pageStyles.inner}>
          <h1 className={pageStyles.heroTitle}>
            Перевозка автомобилей с аукционов Copart и IAAI по всей территории США
          </h1>
          <p className={pageStyles.heroLede}>
            Покупаете автомобили на аукционах Copart или IAAI? Y7 Logistics организует забор
            с площадки и доставку в любую точку США — домой, в мастерскую или в морской порт.
            Лицензированный брокер FMCSA (MC&nbsp;#1741537), русскоязычная команда, опыт работы
            со всеми площадками Copart и IAAI.
          </p>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 2 — What Copart really is (paper)                          */}
      {/* ================================================================= */}
      <section className={pageStyles.paperBand}>
        <div className={pageStyles.inner}>
          <span className={pageStyles.eyebrowRulePaper}>COPART И IAAI</span>
          <h2 className={pageStyles.sectionTitle}>Что такое Copart и IAAI</h2>
          <p className={pageStyles.prose}>
            Copart и IAAI — два крупнейших онлайн-аукциона подержанных и повреждённых автомобилей
            в Соединённых Штатах. Вместе они обрабатывают миллионы лотов ежегодно: автомобили после ДТП,
            страховых случаев, лизинговые возвраты, конфискации и fleet-списания.
          </p>
          <p className={pageStyles.prose}>
            Для покупки на этих площадках нужна дилерская лицензия или аккаунт через
            брокера-посредника (CrashedToys, BidFax и другие). Торги проходят полностью
            онлайн — вы можете участвовать из любой точки мира.
          </p>
          <p className={pageStyles.prose}>
            После выигрыша и оплаты лота вам даётся ограниченное время на вывоз автомобиля
            с площадки (обычно 3 бизнес-дня). Именно на этом этапе подключается Y7 Logistics —
            мы забираем автомобиль и доставляем его по указанному адресу.
          </p>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 3 — Copart vs IAAI comparison table (paper)               */}
      {/* ================================================================= */}
      <section className={pageStyles.paperBand}>
        <div className={pageStyles.inner}>
          <span className={pageStyles.eyebrowPlainPaper}>СРАВНЕНИЕ</span>
          <h2 className={pageStyles.sectionTitle}>Сравнение Copart и IAAI</h2>

          <div className={pageStyles.tableWrap}>
            <table className={pageStyles.tableOnPaper}>
              <thead>
                <tr>
                  <th>Параметр</th>
                  <th>Copart</th>
                  <th>IAAI</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={i}>
                    <td>{row.feature}</td>
                    <td>{row.copart}</td>
                    <td>{row.iaai}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 4 — Fees breakdown (paper)                                */}
      {/* ================================================================= */}
      <section className={pageStyles.paperBand}>
        <div className={pageStyles.inner}>
          <span className={pageStyles.eyebrowRulePaper}>РАСХОДЫ</span>
          <h2 className={pageStyles.sectionTitle}>Какие расходы учитывать</h2>

          <div className={pageStyles.feesList}>
            {FEES.map((fee, i) => (
              <div key={i} className={`${pageStyles.cardPaper} ${pageStyles.feeRow}`}>
                <div>
                  <h3 className={pageStyles.feeName}>{fee.name}</h3>
                  <p className={pageStyles.bodyText}>{fee.note}</p>
                </div>
                <p className={pageStyles.feeAmount}>{fee.amount}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 5 — Transport routes (board mid band)                     */}
      {/* ================================================================= */}
      <section className={pageStyles.boardBand}>
        <div className={pageStyles.inner}>
          <span className={pageStyles.eyebrowRuleDark}>МАРШРУТЫ</span>
          <h2 className={pageStyles.sectionTitle}>Популярные маршруты с аукционов</h2>

          <div className={`${pageStyles.grid} ${pageStyles.grid4}`}>
            {ROUTES.map((route, i) => (
              <div key={i} className={pageStyles.cardBoard}>
                <p className={pageStyles.routeFrom}>{route.from}</p>
                <p className={pageStyles.routeTo}>{route.to}</p>
                <div className={pageStyles.routeMeta}>
                  <span>{route.distance}</span>
                  <span>{route.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 6 — Seven pitfalls (paper)                                */}
      {/* ================================================================= */}
      <section className={pageStyles.paperBand}>
        <div className={pageStyles.inner}>
          <span className={pageStyles.eyebrowPlainPaper}>РИСКИ</span>
          <h2 className={pageStyles.sectionTitle}>7 ошибок при покупке на аукционе</h2>

          <ol className={pageStyles.stepList}>
            {PITFALLS.map((pit, i) => (
              <li key={i} className={pageStyles.step} data-step={i + 1}>
                <h3 className={pageStyles.cardHeading}>{pit.title}</h3>
                <p className={pageStyles.bodyText}>{pit.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 7 — How it works (board)                                  */}
      {/* ================================================================= */}
      <section className={pageStyles.boardBand}>
        <div className={pageStyles.inner}>
          <span className={pageStyles.eyebrowRuleDark}>ЗАКАЗ</span>
          <h2 className={pageStyles.sectionTitle}>Как заказать перевозку с аукциона</h2>

          <ol className={pageStyles.stepFlow}>
            {HOW_IT_WORKS.map((step, i) => (
              <li key={i} className={pageStyles.flowItem}>
                <span className={pageStyles.flowNumDark}>{i + 1}</span>
                <div>
                  <h3 className={pageStyles.cardHeading}>{step.title}</h3>
                  <p className={pageStyles.bodyText}>{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 8 — FAQ (paper)                                           */}
      {/* ================================================================= */}
      <section className={pageStyles.paperBand}>
        <div className={pageStyles.inner}>
          <span className={pageStyles.eyebrowPlainPaper}>FAQ</span>
          <h2 className={pageStyles.sectionTitle}>Часто задаваемые вопросы</h2>

          <div className={pageStyles.faqList}>
            {FAQS.map((faq, i) => (
              <details key={i} className={pageStyles.faqItem}>
                <summary className={pageStyles.faqSummary}>
                  {faq.q}
                  <span className={pageStyles.faqIcon} aria-hidden="true">+</span>
                </summary>
                <p className={pageStyles.faqAnswer}>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <ContextualCTA variant="card" to="/exporters" intlKey="exporters" tone="amber" />

      {/* ================================================================= */}
      {/* SECTION 9 — Dark CTA (board, page closes dark)                    */}
      {/* ================================================================= */}
      <section className={`${pageStyles.boardBand} ${pageStyles.ctaBand}`}>
        <div className={pageStyles.inner}>
          <div className={pageStyles.ctaInner}>
            <h2 className={pageStyles.sectionTitle}>
              Выиграли лот? Закажите перевозку
            </h2>
            <p className={pageStyles.ctaLede}>
              Напишите нам VIN и номер площадки — мы рассчитаем стоимость и постараемся
              организовать забор как можно быстрее (storage fees устанавливает Copart, не
              брокер; мы не гарантируем забор в бесплатном окне, но помогаем планировать).
            </p>
            <Link to="/ru/ship-my-car" className={pageStyles.cta}>
              Заказать перевозку
            </Link>
            <p className={pageStyles.ctaCredential}>
              MC #1741537 · USDOT #4427359 · Лицензированный брокер FMCSA
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RussiaCopart;
