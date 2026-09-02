import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import HreflangTags from '../../components/HreflangTags';
import ContextualCTA from '../../components/ContextualCTA';
import pageStyles from './RussiaHome.module.css';
import HeroRouteVisual from '../../components/HeroRouteVisual';

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
        text: 'Y7 Logistics — лицензированный брокер автоперевозок FMCSA (MC #1741537, USDOT #4427359). Мы координируем доставку через сеть 700+ проверенных перевозчиков, подбирая оптимальный вариант по маршруту, срокам и бюджету.',
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
  { number: 'FMCSA', label: 'лицензированный брокер (MC #1741537)' },
  { number: '700+', label: 'проверенных перевозчиков в сети' },
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
    description: 'Полный цикл доставки за рубеж через аффилированную компанию с дилерской лицензией — от аукциона в США до конечного пункта.',
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
  { q: 'Y7 — это перевозчик или брокер?', a: 'Y7 Logistics — лицензированный брокер FMCSA (MC #1741537). Мы работаем с сетью 700+ проверенных перевозчиков, подбирая оптимальный вариант для каждого заказа.' },
  { q: 'Застрахован ли автомобиль при перевозке?', a: 'Да. Все перевозчики в нашей сети имеют действующий полис cargo insurance. Перед отправкой мы проверяем актуальность страховки и предоставляем информацию о покрытии.' },
  { q: 'Можно ли перевезти машину с аукциона?', a: 'Да, вывоз с Copart, IAAI и Manheim — одна из наших специализаций. Мы координируем оплату, gate pass и своевременный забор автомобиля.' },
  { q: 'Как с вами связаться?', a: 'Самый быстрый способ — Telegram-бот @y7dispatch_bot (ответ в течение минут). Также можно написать на info@y7agency.com. Диспетчерская на связи в рабочие часы.' },
];

// =============================================================================
// Component
// =============================================================================
function RussiaHome() {
  return (
    <div className={pageStyles.page}>
      {/* ----------------------------------------------------------------- */}
      {/* Head / SEO                                                        */}
      {/* ----------------------------------------------------------------- */}
      <Helmet>
        <html lang="ru" />
        <title>Перевозка автомобилей по США — Y7 Logistics</title>
        <meta name="description" content="Y7 Logistics (MC #1741537) — перевозка авто по всем 50 штатам. Доставка с Copart и IAAI, до порта, дилерские маршруты. Русскоязычная поддержка." />
        <link rel="canonical" href="https://www.y7agency.com/ru/dostavka-avto-iz-usa" />
        <meta property="og:title" content="Перевозка автомобилей по США — Y7 Logistics" />
        <meta property="og:description" content="Лицензированный брокер FMCSA. 700+ перевозчиков, все 50 штатов. Русскоязычная поддержка." />
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
      {/* SECTION 1 — Hero (board-black, centered, HeroRouteVisual)          */}
      {/* ================================================================= */}
      <section className={`${pageStyles.heroBand} ${pageStyles.hero}`}>
        <div className={pageStyles.heroVisual} aria-hidden="true">
          <HeroRouteVisual />
        </div>
        <div className={pageStyles.inner}>
          <div className={pageStyles.heroInner}>
            <span className={`${pageStyles.eyebrowPlainDark} ${pageStyles.heroEyebrow}`}>Y7 Logistics</span>

            <h1 className={pageStyles.heroTitle}>
              Перевозка автомобилей по всей территории США — от аукциона до вашего адреса
            </h1>

            <p className={pageStyles.heroLede}>
              Y7 Logistics — лицензированный брокер автоперевозок FMCSA (MC&nbsp;#1741537).
              Мы организуем доставку автомобилей по всем 50 штатам: с аукционов Copart и IAAI,
              между городами, до морских портов. Сеть из 700+ проверенных
              перевозчиков и русскоязычная команда, которая отвечает быстро через Telegram и email. Наши цены
              формируются на основе реальных данных Central Dispatch — без скрытых доплат
              и неприятных сюрпризов.
            </p>

            {/* CTA buttons — centered row */}
            <div className={pageStyles.heroCtas}>
              <Link to="/ru/ship-my-car" className={pageStyles.cta}>
                Рассчитать стоимость доставки
              </Link>
              <Link to="/track" className={pageStyles.ghostDark}>
                Трекинг
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 2 — Quick Stats (paper manifest row)                       */}
      {/* ================================================================= */}
      <section className={pageStyles.paperBand}>
        <div className={pageStyles.inner}>
          <div className={pageStyles.statsGrid}>
            {STATS.map((stat, i) => (
              <div key={i} className={pageStyles.statCell}>
                <p className={pageStyles.statNum}>{stat.number}</p>
                <p className={pageStyles.statLabel}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 3 — Our Services (board)                                   */}
      {/* ================================================================= */}
      <section className={pageStyles.boardBand}>
        <div className={pageStyles.inner}>
          <span className={pageStyles.eyebrowRuleDark}>Услуги</span>
          <h2 className={pageStyles.sectionTitle}>Наши услуги</h2>
          <p className={pageStyles.lede}>
            Полный спектр автоперевозок внутри США — от единичного заказа до регулярных дилерских
            маршрутов. Все услуги доступны на русском языке.
          </p>

          <div className={`${pageStyles.grid} ${pageStyles.grid3}`}>
            {SERVICES.map((svc, i) => (
              <div key={i} className={pageStyles.cardBoard}>
                <p className={pageStyles.cardIcon}>{svc.icon}</p>
                <h3 className={pageStyles.cardHeading}>{svc.title}</h3>
                <p className={pageStyles.bodyText}>{svc.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 4 — Process Steps (paper)                                  */}
      {/* ================================================================= */}
      <section className={pageStyles.paperBand}>
        <div className={pageStyles.inner}>
          <span className={pageStyles.eyebrowRulePaper}>Процесс</span>
          <h2 className={pageStyles.sectionTitle}>Как это работает</h2>

          <ol className={pageStyles.stepList}>
            {PROCESS_STEPS.map((step) => (
              <li key={step.num} className={pageStyles.step} data-step={step.num}>
                <h3 className={pageStyles.cardHeading}>{step.title}</h3>
                <p className={pageStyles.bodyText}>{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 5 — Cost Breakdown (board)                                 */}
      {/* ================================================================= */}
      <section className={pageStyles.boardBand}>
        <div className={pageStyles.inner}>
          <span className={pageStyles.eyebrowPlainDark}>Цены</span>
          <h2 className={pageStyles.sectionTitle}>Ориентировочная стоимость</h2>

          <div className={`${pageStyles.grid} ${pageStyles.grid4}`}>
            {COST_CARDS.map((cost, i) => (
              <div key={i} className={pageStyles.cardBoard}>
                <p className={pageStyles.costLabel}>{cost.title}</p>
                <p className={pageStyles.costAmount}>{cost.amount}</p>
                <p className={pageStyles.bodyText}>{cost.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 6 — Real Examples (paper)                                  */}
      {/* ================================================================= */}
      <section className={pageStyles.paperBand}>
        <div className={pageStyles.inner}>
          <span className={pageStyles.eyebrowRulePaper}>Маршруты</span>
          <h2 className={pageStyles.sectionTitle}>Примеры реальных маршрутов</h2>

          <div className={`${pageStyles.grid} ${pageStyles.grid3}`}>
            {CAR_EXAMPLES.map((car, i) => (
              <div key={i} className={pageStyles.cardPaper}>
                <h3 className={pageStyles.cardHeading}>{car.title}</h3>
                <p className={pageStyles.exampleRoute}>{car.route}</p>
                <p className={pageStyles.examplePrice}>{car.price}</p>
                <p className={pageStyles.bodyText}>{car.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 7 — Risks (board)                                          */}
      {/* ================================================================= */}
      <section className={pageStyles.boardBand}>
        <div className={pageStyles.inner}>
          <span className={pageStyles.eyebrowRuleDark}>Важно знать</span>
          <h2 className={pageStyles.sectionTitle}>На что обратить внимание</h2>

          <div className={`${pageStyles.grid} ${pageStyles.grid3}`}>
            {RISKS.map((risk, i) => (
              <div key={i} className={pageStyles.cardBoard}>
                <h3 className={pageStyles.cardHeading}>{risk.title}</h3>
                <p className={pageStyles.bodyText}>{risk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 8 — FAQ (paper)                                            */}
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

      {/* ================================================================= */}
      {/* SECTION 8b — Отзывы (testimonials, board)                          */}
      {/* ================================================================= */}
      <section className={pageStyles.boardBand}>
        <div className={pageStyles.inner}>
          <span className={pageStyles.eyebrowRuleDark}>Отзывы</span>
          <h2 className={pageStyles.sectionTitle}>Что говорят клиенты</h2>
          <p className={pageStyles.lede}>
            Реальные перевозки — реальные истории. Имена и города сохранены с разрешения клиентов.
          </p>
          <div className={pageStyles.testimonialGrid}>
            <div className={pageStyles.cardBoard}>
              <p className={pageStyles.testimonialQuote}>
                «Купил BMW на Copart в Техасе, Y7 забрали с аукциона и доставили в Нью-Джерси
                за 5 дней. Всё через Telegram, без звонков. Перевозчика подобрали быстро,
                цена совпала с расчётом — без сюрпризов.»
              </p>
              <p className={pageStyles.testimonialAttribution}>
                Алексей · Бруклин, NY · Copart → порт Newark
              </p>
            </div>
            <div className={pageStyles.cardBoard}>
              <p className={pageStyles.testimonialQuote}>
                «Переезжали из Калифорнии в Флориду и нужно было перевезти две машины. Y7
                нашли один трак, обе машины ехали вместе, цена оказалась ниже чем у первых
                двух контор где спрашивал. Диспетчер по-русски — огромный плюс.»
              </p>
              <p className={pageStyles.testimonialAttribution}>
                Марина · Сан-Диего → Майами
              </p>
            </div>
            <div className={pageStyles.cardBoard}>
              <p className={pageStyles.testimonialQuote}>
                «Заказывал доставку авто с IAAI Атланта до порта в Хьюстоне — для отправки
                родственникам. Y7 согласовали забор, привезли без повреждений, передали
                экспедитору. Никаких скрытых доплат, всё как обещали.»
              </p>
              <p className={pageStyles.testimonialAttribution}>
                Дмитрий · Атланта, GA · IAAI → порт Houston
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 8c — Порты (paper, port chips)                             */}
      {/* ================================================================= */}
      <section className={pageStyles.paperBand}>
        <div className={pageStyles.inner}>
          <div className={pageStyles.centered}>
            <span className={pageStyles.eyebrowPlainPaper}>Порты</span>
          </div>
          <h2 className={`${pageStyles.sectionTitle} ${pageStyles.centered}`}>Работаем с основными портами США</h2>
          <p className={`${pageStyles.lede} ${pageStyles.centered} ${pageStyles.centeredLede}`}>
            Доставляем автомобили до порта отправления — дальнейшая экспортная логистика
            на стороне партнёрского экспедитора.
          </p>
          <div className={pageStyles.portGrid}>
            <span className={pageStyles.chipPaper}>Ньюарк (NJ)</span>
            <span className={pageStyles.chipPaper}>Балтимор (MD)</span>
            <span className={pageStyles.chipPaper}>Саванна (GA)</span>
            <span className={pageStyles.chipPaper}>Джексонвилл (FL)</span>
            <span className={pageStyles.chipPaper}>Хьюстон (TX)</span>
            <span className={pageStyles.chipPaper}>Лос-Анджелес (CA)</span>
          </div>
        </div>
      </section>

      <ContextualCTA variant="card" to="/exporters" intlKey="exporters" tone="amber" />
      {/* [WEBFIX-T04] the CO service, in this locale (ContextualCTA prefixes the path). */}
      <ContextualCTA variant="inline" to="/certificate-of-origin" intlKey="certificateOfOrigin" />

      {/* ================================================================= */}
      {/* SECTION 9 — Dark CTA (board, page closes dark)                     */}
      {/* ================================================================= */}
      <section className={`${pageStyles.boardBand} ${pageStyles.ctaBand}`}>
        <div className={pageStyles.inner}>
          <div className={pageStyles.ctaInner}>
            <h2 className={pageStyles.sectionTitle}>
              Готовы перевезти автомобиль?
            </h2>
            <p className={pageStyles.ctaLede}>
              Получите расчёт стоимости за несколько минут. Укажите маршрут — мы подберём
              оптимального перевозчика из нашей сети.
            </p>
            <Link to="/ru/ship-my-car" className={pageStyles.cta}>
              Рассчитать стоимость
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

export default RussiaHome;
