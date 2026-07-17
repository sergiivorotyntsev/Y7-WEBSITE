import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import HreflangTags from '../../components/HreflangTags';
import ContextualCTA from '../../components/ContextualCTA';
import styles from './UkraineShipMyCar.module.css';

// =============================================================================
// UkraineShipMyCar.jsx — Merged audience (Ukraine import + діаспора в США)
// Route: /ua/ship-my-car
// Primary audience: Ukraine buyers ordering car import from US
// Secondary audience: Ukrainian diaspora in USA ordering inland US transport
// Y7-centric: international leg via "перевірені партнери-експедитори"
// Visual structure mirrors English ShipMyCar.jsx (custom layout, NOT SeoLandingPage)
// hero centered + numbered steps grid + editorial sections + highlight boxes + FAQ
// =============================================================================

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
    title: 'Попередній запит',
    desc: 'Пишете в Telegram, надсилаєте номер лоту. Розрахунок за 1-2 години.',
  },
  {
    title: 'Підтвердження виграшу',
    desc: 'Після виграшу лоту реєструємо авто в нашій системі та видаємо доступ до клієнтського порталу.',
  },
  {
    title: 'Забір з майданчика',
    desc: 'Перевізник забирає авто з Copart/IAAI протягом 3-10 днів.',
  },
  {
    title: 'Транспорт до порту',
    desc: 'Доставка до порту США (Newark, Houston, Savannah, LA, Baltimore).',
  },
  {
    title: 'Морський фрахт',
    desc: 'Контейнер 40HC або RoRo, транзит 3-5 тижнів. Видається BOL.',
  },
  {
    title: 'Розмитнення в Україні',
    desc: 'Український митний брокер + автовоз до вашого міста.',
  },
];

const orderingStepsLong = [
  {
    num: 1,
    title: 'Попередній запит і розрахунок',
    desc: 'Пишете нам у Telegram або на email. Надсилаєте номер лоту з Copart/IAAI або посилання на аукціон. Протягом 1-2 годин отримуєте конкретний розрахунок: транспорт лядовий по США (Y7), орієнтовний морський фрахт, доставка до вашого міста в Україні. Розрахунок безкоштовний і не зобовʼязує до замовлення.',
  },
  {
    num: 2,
    title: 'Підтвердження після виграшу лоту',
    desc: 'Після виграшу надсилаєте нам підтвердження з Copart або IAAI. Ми реєструємо авто в нашій системі та призначаємо до транспорту. Ви отримуєте доступ до клієнтського порталу, де бачите статус на кожному етапі.',
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
    <div lang="uk" className={styles.page}>
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
        <link rel="canonical" href="https://www.y7agency.com/ua/dostavka-avto-z-usa" />
        <meta property="og:title" content="Замовити пригін авто з США в Україну — Y7 Logistics" />
        <meta
          property="og:description"
          content="Ліцензований FMCSA-брокер (MC #1741537). Українськомовна підтримка, прозорі ціни, розрахунок за 1 годину."
        />
        <meta property="og:url" content="https://www.y7agency.com/ua/ship-my-car" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="uk_UA" />
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
      {/* SECTION 1 — Hero (mirrors English ShipMyCar centered hero)         */}
      {/* ================================================================== */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.heroTitle}>
            Замовте пригін авто з США — просто і без прихованих комісій
          </h1>
          <p className={styles.heroLede}>
            Y7 Logistics — ліцензований FMCSA-брокер (MC #1741537) з
            українськомовною підтримкою. Обслуговуємо американську частину
            логістики: забір з Copart/IAAI, транспорт до порту, передача
            партнерам-експедиторам для морської частини.
          </p>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 2 — How it works (numbered grid, mirrors English steps)    */}
      {/* ================================================================== */}
      <section className={styles.paperBand}>
        <div className={styles.innerWide}>
          <div className={styles.stepsGrid}>
            {orderingSteps.map((step, i) => (
              <div key={i} className={styles.stepCol}>
                <div className={styles.stepNum}>{i + 1}</div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 3 — What to prepare (bulleted checklist)                   */}
      {/* ================================================================== */}
      <section className={styles.paperBand}>
        <div className={styles.inner}>
          <span className={styles.eyebrowPaper}>ПІДГОТОВКА</span>
          <h2 className={styles.titlePaper}>Що підготувати перед замовленням</h2>
          <p className={styles.pPaper}>
            Чим раніше зберете ці відомості, тим швидше отримаєте точний
            розрахунок і коротший час очікування забору з майданчика Copart. Це
            мінімум, без якого не можемо стартувати.
          </p>
          <ul className={styles.checklist}>
            {checklistItems.map((item, i) => (
              <li key={i} className={styles.checkItem}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 4 — Detailed ordering process (editorial)                  */}
      {/* ================================================================== */}
      <section className={styles.boardBand}>
        <div className={styles.inner}>
          <span className={styles.eyebrowDark}>ЯК ЦЕ ПРАЦЮЄ</span>
          <h2 className={styles.titleDark}>Як виглядає процес замовлення — крок за кроком</h2>
          <p className={styles.pDark}>
            Увесь процес — від першого запиту до отримання авто в Україні —
            займає типово 6-8 тижнів. Нижче показуємо, що відбувається на кожному
            етапі і хто за що відповідає. Відповідальність переходить з Y7 до
            партнерів-експедиторів у момент передачі у термінал порту США — але
            для вас це одна безперервна координація.
          </p>
          <div className={styles.procList}>
            {orderingStepsLong.map((step) => (
              <div key={step.num} className={styles.procItem}>
                <div className={styles.procNum}>{step.num}</div>
                <div>
                  <div className={styles.procTitle}>{step.title}</div>
                  <div className={styles.procDesc}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 5 — Pricing overview (editorial section)                   */}
      {/* ================================================================== */}
      <section className={styles.paperBand}>
        <div className={styles.inner}>
          <span className={styles.eyebrowPlainPaper}>ЦІНИ</span>
          <h2 className={styles.titlePaper}>Орієнтовні витрати</h2>
          <p className={styles.pPaper}>
            Нижче типові діапазони для стандартного легкового авто (седан, SUV,
            кросовер до 2,5 тонни). Точну вартість надаємо після отримання номера
            лоту. Ціни не включають розмитнення в Україні (мито, акциз, ПДВ) — це
            окрема сума, що залежить від віку авто, обʼєму двигуна та типу
            палива.
          </p>
          <div className={styles.priceGrid}>
            <div className={styles.priceCard}>
              <span className={styles.priceLabel}>Транспорт по США (Y7)</span>
              <div className={styles.priceValue}>$300–1 600</div>
              <ul className={styles.priceList}>
                <li>До 500 миль: $300–600</li>
                <li>500–1 500 миль: $600–1 200</li>
                <li>Через усю країну (1 500+ миль): $900–1 600</li>
              </ul>
              <p className={styles.priceNote}>
                Забір з майданчика Copart/IAAI і доставка. Залежить від відстані,
                стану авто, сезону.
              </p>
            </div>
            <div className={styles.priceCard}>
              <span className={styles.priceLabel}>Морський фрахт</span>
              <div className={styles.priceValue}>$1 200–2 400</div>
              <p className={styles.priceBody}>
                Контейнер 40HC (1-3 авто) або RoRo. Залежить від порту в США та
                європейського порту призначення.
              </p>
            </div>
            <div className={styles.priceCard}>
              <span className={styles.priceLabel}>Доставка в Україну</span>
              <div className={styles.priceValue}>$600–1 200</div>
              <p className={styles.priceBody}>
                Автовоз з європейського порту до вашого міста через Гдиню,
                Клайпеду або Констанцу.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 6 — Trust highlight box (mirrors English insurance box)    */}
      {/* ================================================================== */}
      <section className={styles.boardBand}>
        <div className={styles.inner}>
          <div className={styles.panel}>
            <h3 className={styles.panelTitle}>
              Чому варто довіряти Y7 Logistics
            </h3>
            <p className={styles.panelText}>
              Y7 Logistics працює як ліцензований FMCSA-брокер — це означає
              федеральний нагляд Департаменту транспорту США, обовʼязкове
              страхування відповідальності та публічну реєстрацію в базі SAFER.
              Кожен може перевірити наш статус через пошук на safer.fmcsa.dot.gov
              за номером MC #1741537. Для українських клієнтів пропонуємо
              українськомовну підтримку через Telegram, прозорі ціни без
              прихованих комісій і реальний досвід роботи з маршрутами через
              Гдиню, Клайпеду та Констанцу.
            </p>
            <div className={styles.metaRow}>
              <div>
                <span className={styles.metaLabel}>Ліцензія брокера</span>
                <div className={styles.metaValue}>MC #1741537</div>
              </div>
              <div>
                <span className={styles.metaLabel}>USDOT</span>
                <div className={styles.metaValue}>#4427359</div>
              </div>
              <div>
                <span className={styles.metaLabel}>Статус FMCSA</span>
                <div className={styles.metaValue}>Активний</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 7 — Contact (editorial)                                    */}
      {/* ================================================================== */}
      <section className={styles.paperBand}>
        <div className={styles.inner}>
          <span className={styles.eyebrowPaper}>КОНТАКТИ</span>
          <h2 className={styles.titlePaper}>Звʼяжіться з нами</h2>
          <p className={styles.pPaper}>
            Найшвидше — через Telegram. Типово відповідаємо протягом 1-2 годин у
            робочий час (9:00-18:00 за східним часом США, тобто 16:00-01:00 за
            київським). Спілкуємося українською, російською або англійською — як
            вам зручніше.
          </p>
          <div className={styles.contactGrid}>
            <div className={styles.contactCard}>
              <span className={styles.contactLabel}>Telegram</span>
              <a
                href="https://t.me/y7dispatch_bot"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactLink}
              >
                @y7dispatch_bot
              </a>
            </div>
            <div className={styles.contactCard}>
              <span className={styles.contactLabel}>Email</span>
              <a href="mailto:info@y7agency.com" className={styles.contactLink}>
                info@y7agency.com
              </a>
            </div>
            <div className={styles.contactCard}>
              <span className={styles.contactLabel}>Портал клієнта</span>
              <Link to="/portal/login" className={styles.contactLink}>
                Клієнтський портал
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 8 — Diaspora highlight box                                 */}
      {/* ================================================================== */}
      <section className={styles.boardBand}>
        <div className={styles.inner}>
          <div className={styles.panel}>
            <h3 className={styles.panelTitle}>
              Живете в Штатах? Перевезення по США без міжнародного етапу
            </h3>
            <p className={styles.panelText}>
              Якщо ви з української громади в США і потрібен лише внутрішній
              транспорт — забір з Copart під дім, переїзд між штатами, доставка
              до порту — Y7 обслуговує цей обсяг самостійно, без залучення
              міжнародних партнерів. Як ліцензований FMCSA-брокер (MC #1741537)
              маємо доступ до мережі перевірених перевізників по всіх 50 штатах.
              Комунікуємо українською через Telegram. Орієнтовні ціни для
              стандартного седана: $450-750 (до 500 миль), $750-1 200 (500-1500
              миль), $1 100-1 600 (через усю країну).
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 9 — Diaspora use cases (editorial)                          */}
      {/* ================================================================== */}
      <section className={styles.paperBand}>
        <div className={styles.inner}>
          <span className={styles.eyebrowPaper}>ДЛЯ ДІАСПОРИ</span>
          <h2 className={styles.titlePaper}>Типові замовлення від діаспори</h2>
          <div className={styles.ucGrid}>
            {diasporaUseCases.map((uc, idx) => (
              <div key={idx} className={styles.ucCard}>
                <h4 className={styles.ucTitle}>{uc.title}</h4>
                <p className={styles.ucDesc}>{uc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 10 — FAQ (mirrors English ShipMyCar FAQ cards)             */}
      {/* ================================================================== */}
      <section className={styles.paperBand}>
        <div className={styles.inner}>
          <h2 className={styles.faqCenterTitle}>
            Часті запитання
          </h2>
          <div className={styles.faqList}>
            {faqSchema.mainEntity.map((faq, i) => (
              <details key={i} className={styles.faqItem}>
                <summary className={styles.faqSummary}>
                  <span>{faq.name}</span>
                </summary>
                <p className={styles.faqAnswer}>{faq.acceptedAnswer.text}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <ContextualCTA variant="card" to="/exporters" intlKey="exporters" tone="amber" />

      {/* ================================================================== */}
      {/* SECTION 11 — CTA (dark band with accent button)                    */}
      {/* ================================================================== */}
      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>
            Готові замовити пригін?
          </h2>
          <p className={styles.ctaText}>
            Надішліть номер лоту з Copart або IAAI у Telegram — отримаєте
            реальний розрахунок протягом 1-2 годин. Безкоштовно, без
            зобовʼязань.
          </p>
          <div className={styles.ctaRow}>
            <a
              href="https://t.me/y7dispatch_bot"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaPrimary}
            >
              Написати в Telegram
            </a>
            <Link to="/ua" className={styles.ctaGhost}>
              На головну
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UkraineShipMyCar;
