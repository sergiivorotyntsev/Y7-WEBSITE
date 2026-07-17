import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import HreflangTags from '../../components/HreflangTags';
import ContextualCTA from '../../components/ContextualCTA';
import styles from './UkraineHome.module.css';
import {
  PersonalCarIcon,
  GlobeRouteIcon,
  TruckIcon,
} from '../../components/icons';
import HeroRouteVisual from '../../components/HeroRouteVisual';

// =============================================================================
// UkraineHome.jsx — Merged audience (Ukraine + діаспора в США)
// Route: /ua
// Primary audience: Ukraine buyers importing cars from US auctions
// Secondary audience: Ukrainian diaspora in USA needing inland transport
// Y7-centric messaging: FMCSA broker, Ukrainian-speaking support
// International transport described generically (Y7-centric, no sister-brand dependency)
// Visual structure mirrors English Home.jsx (badge + italic H1 + cards + stats)
// =============================================================================

// -- Structured data ----------------------------------------------------------

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Скільки коштує пригнати авто з США в Україну?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Загальна вартість складається з трьох частин: ціна авто на аукціоні, логістика (транспорт по США + морський фрахт + доставка до України), розмитнення в Україні. Для седана середнього класу (Toyota Camry, Honda Accord) логістика типово $2 500-4 000 плюс розмитнення в Україні (мито, акциз, ПДВ — залежить від віку, типу двигуна, екологічного класу). Для точної вартості надішліть номер лоту з Copart або IAAI — порахуємо конкретно під ваше авто.',
      },
    },
    {
      '@type': 'Question',
      name: 'Через який порт найкраще пригнати авто зараз?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Три основні маршрути: 1) Гдиня або Гданськ (Польща) плюс автовоз через польсько-український кордон — найпопулярніший варіант, перевірена логістика, 6-8 тижнів; 2) Клайпеда (Литва) — альтернативний балтійський маршрут, зручний для західних та північних областей України; 3) Констанца (Румунія) — маршрут через південний кордон, зручний для півдня країни. Вибір залежить від вашого місцезнаходження в Україні та ситуації на конкретних напрямках. Ми радимо оптимальний варіант під кожен кейс.',
      },
    },
    {
      '@type': 'Question',
      name: 'Скільки часу займає весь процес від купівлі до доставки в Україну?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Типово 6-8 тижнів від виграшу лоту до отримання авто в Україні. Розподіл: перевезення з аукціонного майданчика до порту в США 3-10 днів, очікування завантаження контейнера 1-2 тижні, морський фрахт до європейського порту 3-5 тижнів, розмитнення в Україні 2-5 днів, доставка автовозом до вашого міста 1-3 дні. Маршрут через Констанцу може бути дещо швидшим для південних областей; маршрут через Гдиню — надійніший за рахунок обсягів перевезень.',
      },
    },
    {
      '@type': 'Question',
      name: 'Y7 Logistics має українськомовну підтримку?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Так. У нашій команді є українськомовні співробітники — ми розуміємо контекст, специфіку ринку після 2022 року та потреби українських клієнтів. Комунікуємо через Telegram — це швидше, зручніше і є повна історія переписки. Відповідаємо у робочий час (9:00-18:00 за східним часом США, тобто 16:00-01:00 за київським) протягом 1-2 годин.',
      },
    },
    {
      '@type': 'Question',
      name: 'Які документи потрібні для пригону та розмитнення?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Для пригону з США: номер лоту з Copart або IAAI, копія title або bill of sale після виграшу, дані одержувача. Для розмитнення в Україні: технічний паспорт (title), інвойс, коносамент (BOL), експортна декларація США, документ про відповідність екологічним нормам Euro-5. Митний брокер в Україні допоможе зібрати повний пакет — ми надаємо всі документи з американської сторони, український брокер доповнює локальними.',
      },
    },
    {
      '@type': 'Question',
      name: 'Я живу в США — чи можу замовити просто перевезення між штатами?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Так. Y7 Logistics обслуговує українську діаспору в США — перевозимо авто між усіма 50 штатами, забираємо з Copart та IAAI, доставляємо від дилерів або приватних продавців, веземо до американського порту для тих, хто планує самостійно відправити авто родичам в Україну. У цьому випадку робимо тільки внутрішню логістику США, без міжнародного етапу. Спілкування українською через Telegram.',
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
  ],
};

// -- Data arrays --------------------------------------------------------------

const audienceCards = [
  {
    title: 'Замовити перевезення',
    desc: 'Покрокова інструкція як замовити пригін авто з США в Україну. Документи, оплата, етапи доставки.',
    cta: 'Деталі замовлення',
    to: '/ua/ship-my-car',
    icon: <PersonalCarIcon size={40} color="currentColor" />,
  },
  {
    title: 'Гайд по Copart та IAAI',
    desc: 'Як купувати на американських аукціонах: title-коди, фото, ставки, ризики. Чесна аналітика без прикрас.',
    cta: 'Читати гайд',
    to: '/ua/copart-shipping',
    icon: <GlobeRouteIcon size={40} color="currentColor" />,
  },
  {
    title: 'Для діаспори в США',
    desc: 'Перевезення між штатами по всій території США. Українська підтримка, прозорі ціни, без прихованих комісій.',
    cta: 'Дізнатись більше',
    to: '#diaspora',
    icon: <TruckIcon size={40} color="currentColor" />,
  },
];

const stats = [
  { value: 'MC #1741537', label: 'FMCSA-ліцензія' },
  { value: '3', label: 'Маршрути в Україну' },
  { value: '6-8', label: 'Тижнів від лоту' },
  { value: 'UA·EN·RU', label: 'Мови підтримки' },
];

const routeOptions = [
  {
    port: 'Гдиня / Гданськ',
    country: 'Польща',
    desc: 'Найпопулярніший маршрут. Перевірена логістика, великі обсяги перевезень, стабільні терміни. Після прибуття в порт — автовоз через польсько-український кордон до вашого міста. Зручно для всіх регіонів України, особливо західних та центральних.',
    transit: '6-8 тижнів',
    bestFor: 'Львів, Київ, Івано-Франківськ, Хмельницький, Тернопіль',
  },
  {
    port: 'Клайпеда',
    country: 'Литва',
    desc: 'Альтернативний балтійський маршрут. Менше обсягу ніж Гдиня, але інколи швидше завантаження та менша черга у порту. Після Клайпеди — транзит через Литву, Латвію або Польщу до України. Підходить для клієнтів, які шукають альтернативу польському коридору.',
    transit: '6-7 тижнів',
    bestFor: 'Житомир, Київ, Рівне, Луцьк',
  },
  {
    port: 'Констанца',
    country: 'Румунія',
    desc: 'Чорноморський маршрут через південний кордон. У нинішніх умовах Констанца стала важливим хабом для транзиту в Україну. Після прибуття — автовоз через молдовсько-український або румунсько-український кордон. Оптимальний варіант для південних областей.',
    transit: '6-8 тижнів',
    bestFor: 'Одеса, Миколаїв, Вінниця, південь України',
  },
];

const processSteps = [
  {
    num: 1,
    title: 'Попередній запит і розрахунок',
    desc: 'Пишете нам у Telegram або на email. Надсилаєте номер лоту з Copart/IAAI або посилання на аукціон. Протягом 1-2 годин отримуєте розрахунок: транспорт по США, орієнтовний морський фрахт, очікуване розмитнення. Розрахунок безкоштовний.',
  },
  {
    num: 2,
    title: 'Виграш лоту та підтвердження',
    desc: 'Після виграшу надсилаєте нам підтвердження з Copart або IAAI. Ми реєструємо авто в нашій системі і видаємо вам доступ до клієнтського порталу, де ви бачите статус на кожному етапі.',
  },
  {
    num: 3,
    title: 'Забір з аукціонного майданчика',
    desc: 'Наш перевізник забирає авто протягом 3-10 днів після дозволу. Важливо: Copart нараховує плату за зберігання з 3-го дня після виграшу, тому швидке підтвердження замовлення економить $100-300. Під час завантаження робимо фотодокументацію стану.',
  },
  {
    num: 4,
    title: 'Доставка до порту в США',
    desc: 'Авто потрапляє до одного з портів завантаження: Newark (NJ), Baltimore (MD), Savannah (GA), Houston (TX) або Los Angeles (CA). Вибір залежить від локації майданчика Copart та доступності контейнерних слотів. На цьому етапі завершується американська частина логістики від Y7.',
  },
  {
    num: 5,
    title: 'Морське перевезення до Європи',
    desc: 'Завантаження у контейнер 40HC (типово 1-3 авто у контейнері) або на корабель RoRo. Морський транзит триває 3-5 тижнів. На цьому етапі ви отримуєте коносамент (BOL) — документ, що підтверджує завантаження і є титулом для отримання в порту призначення.',
  },
  {
    num: 6,
    title: 'Розмитнення і доставка в Україні',
    desc: "Після прибуття до європейського порту (Гдиня, Клайпеда або Констанца) локальний експедитор передає авто українському митному брокеру. Ви сплачуєте мито, акциз та ПДВ — розрахунок залежить від віку авто, об'єму двигуна та типу палива. Після розмитнення автовоз доставляє авто до вашого міста.",
  },
];

const diasporaUseCases = [
  {
    title: 'Забір з Copart чи IAAI під дім',
    desc: 'Купуєте авто на аукціоні в одному штаті, живете в іншому — Y7 організовує перевезення. Типовий маршрут (наприклад, Каліфорнія → Нью-Йорк) займає 7-10 днів і коштує $1 100-1 600 для седана.',
  },
  {
    title: 'Перевезення між штатами — переїзд',
    desc: 'Переїжджаєте з Чикаго до Флориди і не хочете їхати три дні за кермом. Забираємо авто від вашого дому, доставляємо за новою адресою. Опція закритого автовозу доступна для нових чи колекційних авто.',
  },
  {
    title: 'Продаж приватно — доставка покупцеві',
    desc: 'Продаєте авто на Facebook Marketplace чи Cars.com покупцеві з іншого кінця країни. Організовуємо забір і доставку — ви виставляєте рахунок за перевезення, ми координуємо перевізника.',
  },
  {
    title: 'Доставка до порту — відправлення родичам',
    desc: 'Плануєте відправити авто родичам в Україну і співпрацюєте з власним експедитором. Доставляємо авто до вказаного порту в США (Newark, Baltimore, Savannah, Houston, LA) — далі ви самостійно організовуєте морську частину.',
  },
];

// -- Audience card sub-component (mirrors English AudienceCards) --------------

function AudienceCard({ title, desc, cta, to, icon }) {
  const navigate = useNavigate();
  const isHash = to.startsWith('#');

  const handleClick = (e) => {
    if (isHash) {
      e.preventDefault();
      const el = document.querySelector(to);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate(to);
    }
  };

  return (
    <div className={styles.audienceCard} onClick={handleClick}>
      <div className={styles.audienceIcon}>{icon}</div>
      <h3 className={styles.audienceTitle}>{title}</h3>
      <p className={styles.audienceDesc}>{desc}</p>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleClick(e);
        }}
        className={styles.audienceBtn}
      >
        {cta} →
      </button>
    </div>
  );
}

// -- Stat card sub-component (mirrors English TrustBar) -----------------------

function StatCard({ value, label }) {
  return (
    <div>
      <span className={styles.statValue}>{value}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

// =============================================================================
// Component
// =============================================================================

function UkraineHome() {
  return (
    <div lang="uk" className={styles.page}>
      <Helmet>
        <title>Пригін авто з США в Україну | Y7 Logistics — ліцензований FMCSA-брокер</title>
        <meta
          name="description"
          content="Пригін авто з аукціонів Copart та IAAI в Україну. Y7 Logistics — ліцензований FMCSA-брокер (MC #1741537) з українськомовною підтримкою. Три маршрути доставки, прозорі ціни, розрахунок за 1 годину."
        />
        <meta
          name="keywords"
          content="пригін авто з США, авто з Америки в Україну, Copart Україна, IAAI пригін, доставка авто з США, розмитнення авто, Y7 Logistics"
        />
        <link rel="canonical" href="https://www.y7agency.com/ua/import-z-usa" />
        <meta property="og:title" content="Пригін авто з США в Україну — Y7 Logistics" />
        <meta
          property="og:description"
          content="Ліцензований FMCSA-брокер (MC #1741537) з українськомовною підтримкою. Три маршрути до України, прозорі ціни, без прихованих комісій."
        />
        <meta property="og:url" content="https://www.y7agency.com/ua" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="uk_UA" />
        <meta property="og:image" content="https://www.y7agency.com/og/ukraine-home.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Пригін авто з США в Україну" />
        <meta
          name="twitter:description"
          content="Y7 Logistics: FMCSA-брокер, українськомовна підтримка, три маршрути доставки. Розрахунок за 1 годину."
        />
        <html lang="uk" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <HreflangTags
        currentPath=""
        hasPolishVersion={true}
        hasUkrainianVersion={true}
        hasRussianVersion={true}
      />

      {/* ================================================================== */}
      {/* SECTION 1 — Hero (mirrors English Home.jsx pattern)                 */}
      {/* badge + 2-line H1 with italic accent + short subtitle               */}
      {/* ================================================================== */}
      <section className={styles.hero}>
        <div className={styles.heroVisual} aria-hidden="true">
          <HeroRouteVisual />
        </div>
        <div className={styles.heroInner}>
          <span className={styles.heroKicker}>Пригін авто з США</span>
          <h1 className={styles.heroTitle}>
            Пригін авто з США в Україну —
            <br />
            <span className={styles.heroAccent}>
              чесно, прозоро, з українськомовною підтримкою
            </span>
          </h1>
          <p className={styles.heroLede}>
            Y7 Logistics — ліцензований FMCSA-брокер (MC #1741537), що
            спеціалізується на перевезенні авто по США. Забираємо авто з аукціонів
            Copart та IAAI, доставляємо до портів завантаження, передаємо
            перевіреним партнерам-експедиторам для морської частини.
          </p>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 2 — Audience cards (mirrors English AudienceCards)          */}
      {/* ================================================================== */}
      <section className={styles.boardBand}>
        <div className={styles.innerWide}>
          <div className={styles.audienceGrid}>
            {audienceCards.map((card) => (
              <AudienceCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 3 — Stats row (mirrors English TrustBar)                    */}
      {/* ================================================================== */}
      <section className={styles.boardBand}>
        <div className={styles.innerWide}>
          <div className={styles.statsRow}>
            {stats.map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 4 — About / extended intro (preserves remaining hero text)  */}
      {/* ================================================================== */}
      <section className={styles.paperBand}>
        <div className={styles.inner}>
          <p className={styles.pPaper}>
            У нашій команді є українськомовні співробітники — ми розуміємо
            специфіку ринку, нинішній контекст, потреби українських клієнтів.
            Комунікуємо через Telegram для максимальної зручності: швидко, з
            повною історією переписки, без телефонного марафону. Ця сторінка
            охоплює обидва сценарії — пригін авто з США в Україну для клієнтів
            удома, а також перевезення між штатами для української діаспори в
            Штатах.
          </p>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 5 — Why Y7 (trust signals)                                  */}
      {/* ================================================================== */}
      <section className={styles.paperBand}>
        <div className={styles.inner}>
          <span className={styles.eyebrowPaper}>ЧОМУ Y7</span>
          <h2 className={styles.titlePaper}>Чому варто обрати Y7 Logistics</h2>
          <p className={styles.pPaper}>
            Ринок пригону авто з США переповнений посередниками, які обіцяють
            найнижчі ціни, а потім вимагають доплати на кожному етапі. Ми працюємо
            інакше. Y7 Logistics — це зареєстрований у Масачусетсі брокер з
            активною ліцензією FMCSA (Federal Motor Carrier Safety Administration),
            що означає федеральний нагляд, обов’язкове страхування відповідальності
            та публічну верифікацію через базу SAFER.
          </p>

          <div className={styles.cardGrid}>
            <div className={styles.paperCard}>
              <h3 className={styles.cardTitle}>Ліцензія FMCSA</h3>
              <p className={styles.cardBody}>
                MC #1741537, USDOT #4427359. Статус «активний» можна перевірити у
                базі SAFER (safer.fmcsa.dot.gov) — це публічний реєстр Департаменту
                транспорту США.
              </p>
            </div>

            <div className={styles.paperCard}>
              <h3 className={styles.cardTitle}>Українськомовна підтримка</h3>
              <p className={styles.cardBody}>
                У команді є українськомовні співробітники. Спілкуємося через
                Telegram, відповідаємо протягом 1-2 годин у робочий час. Розуміємо
                контекст і специфіку українського ринку.
              </p>
            </div>

            <div className={styles.paperCard}>
              <h3 className={styles.cardTitle}>Прозорі ціни</h3>
              <p className={styles.cardBody}>
                Розрахунок фіксуємо до початку роботи. Без прихованих комісій,
                без раптових доплат на етапі відвантаження. Якщо щось змінюється —
                повідомляємо одразу, з поясненням.
              </p>
            </div>

            <div className={styles.paperCard}>
              <h3 className={styles.cardTitle}>Портал клієнта</h3>
              <p className={styles.cardBody}>
                Ви бачите статус авто на кожному етапі — від забору з майданчика
                до передачі у порт. Фотодокументація при завантаженні, трекінг
                маршруту, сповіщення про ключові події.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 6 — Three route options                                     */}
      {/* ================================================================== */}
      <section className={styles.boardBand}>
        <div className={styles.inner}>
          <span className={styles.eyebrowDark}>МАРШРУТИ</span>
          <h2 className={styles.titleDark}>Три маршрути доставки в Україну</h2>
          <p className={styles.pDark}>
            У нинішніх умовах вибір маршруту залежить від вашого місцезнаходження
            в Україні, ситуації на конкретних напрямках та доступності
            контейнерних слотів. Нижче — три основні варіанти, які ми
            використовуємо. Конкретний маршрут радимо після аналізу вашого кейсу.
          </p>

          <div className={styles.routeGrid}>
            {routeOptions.map((route, idx) => (
              <div key={idx} className={styles.routeCard}>
                <div className={styles.routeHead}>
                  <h3 className={styles.routeTitle}>
                    {route.port}{' '}
                    <span className={styles.routeCountry}>
                      ({route.country})
                    </span>
                  </h3>
                  <span className={styles.routeTransit}>{route.transit}</span>
                </div>
                <p className={styles.routeDesc}>{route.desc}</p>
                <p className={styles.routeBest}>
                  <strong>Оптимально для:</strong> {route.bestFor}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 7 — Process (6 steps)                                       */}
      {/* ================================================================== */}
      <section className={styles.paperBand}>
        <div className={styles.inner}>
          <span className={styles.eyebrowPlainPaper}>ЯК ЦЕ ПРАЦЮЄ</span>
          <h2 className={styles.titlePaper}>Як виглядає процес — крок за кроком</h2>
          <p className={styles.pPaper}>
            Увесь процес — від першого запиту до отримання авто в Україні —
            займає типово 6-8 тижнів. Нижче показуємо, що відбувається на кожному
            етапі.
          </p>

          <div className={styles.stepGrid}>
            {processSteps.map((step) => (
              <div key={step.num} className={styles.stepCard}>
                <div className={styles.stepNum}>{step.num}</div>
                <div>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 8 — Pricing overview                                        */}
      {/* ================================================================== */}
      <section className={styles.paperBand}>
        <div className={styles.inner}>
          <span className={styles.eyebrowPaper}>ЦІНИ</span>
          <h2 className={styles.titlePaper}>Орієнтовні витрати на логістику</h2>
          <p className={styles.pPaper}>
            Нижче — типові діапазони цін для стандартного легкового авто (седан,
            SUV, кросовер до 2,5 тонни). Точну вартість надаємо після отримання
            номера лоту — різниця між майданчиками Copart та портами завантаження
            може складати кілька сотень доларів. Ціни не включають розмитнення в
            Україні (мито, акциз, ПДВ) — це окрема сума, що залежить від віку
            авто, типу двигуна та екологічного класу.
          </p>

          <div className={styles.priceGrid}>
            <div className={styles.priceCard}>
              <h3 className={styles.priceLabel}>Транспорт по США (Y7)</h3>
              <div className={styles.priceValue}>$300–1 600</div>
              <ul className={styles.priceList}>
                <li>До 500 миль: $300–600</li>
                <li>500–1 500 миль: $600–1 200</li>
                <li>Через усю країну (1 500+ миль): $900–1 600</li>
              </ul>
              <p className={styles.priceNote}>
                Забір з майданчика Copart/IAAI і доставка до порту завантаження. Залежить
                від відстані, стану авто (їде/не їде), сезону.
              </p>
            </div>

            <div className={styles.priceCard}>
              <h3 className={styles.priceLabel}>Морський фрахт</h3>
              <div className={styles.priceValue}>$1 200–2 400</div>
              <p className={styles.priceBody}>
                Контейнер 40HC (зазвичай 1-3 авто у контейнері) або RoRo. Залежить
                від порту в США та європейського порту призначення.
              </p>
            </div>

            <div className={styles.priceCard}>
              <h3 className={styles.priceLabel}>Доставка в Україну</h3>
              <div className={styles.priceValue}>$600–1 200</div>
              <p className={styles.priceBody}>
                Автовоз з європейського порту до вашого міста. Залежить від
                маршруту (через Польщу, Литву чи Румунію) та локації в Україні.
              </p>
            </div>
          </div>

          <p className={styles.pNote}>
            <strong>Застереження:</strong> розмитнення в Україні сплачується
            окремо. Для авто віком до 5 років ставки нижчі, старші авто мають
            підвищені акцизи. Український митний брокер допоможе зробити точний
            розрахунок під ваш кейс.
          </p>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 9 — Для діаспори в США (anchor target for AudienceCard #3)  */}
      {/* ================================================================== */}
      <section id="diaspora" className={styles.boardBand}>
        <div className={styles.inner}>
          <span className={styles.diasporaPill}>Для діаспори в США</span>
          <span className={styles.eyebrowDark}>ДЛЯ ДІАСПОРИ</span>
          <h2 className={styles.titleDark}>Живете в Штатах? Перевозимо авто по всій країні</h2>
          <p className={styles.pDark}>
            Українська громада в США виросла значно після 2022 року, і ми
            допомагаємо тим, кому потрібен лише внутрішній транспорт — без
            міжнародного етапу. Якщо ви купили авто на Copart в одному штаті,
            переїжджаєте між штатами, продаєте авто приватно або доставляєте у
            порт для відправки родичам — Y7 робить цю частину самостійно.
          </p>
          <p className={styles.pDark}>
            Як ліцензований FMCSA-брокер (MC #1741537), маємо доступ до мережі
            перевірених перевізників по всіх 50 штатах. Комунікуємо українською
            через Telegram. Прозорі ціни, без прихованих комісій,
            фотодокументація при завантаженні, повний трекінг до доставки.
          </p>

          <h3 className={styles.diasporaSubhead}>
            Типові замовлення від української діаспори
          </h3>

          <div className={styles.ucGrid}>
            {diasporaUseCases.map((uc, idx) => (
              <div key={idx} className={styles.ucCard}>
                <h4 className={styles.ucTitle}>{uc.title}</h4>
                <p className={styles.ucDesc}>{uc.desc}</p>
              </div>
            ))}
          </div>

          <h3 className={styles.diasporaSubhead}>
            Орієнтовні ціни перевезення між штатами
          </h3>
          <p className={styles.pDark}>
            Ціни для стандартного седана чи кросовера на відкритому автовозі.
            Закриті автовози (enclosed), пікапи та авто, що не їздять, —
            додатково 30-60%.
          </p>

          <div className={styles.dpPriceGrid}>
            <div className={styles.dpPriceCard}>
              <h4 className={styles.dpPriceLabel}>Коротка дистанція (до 500 миль)</h4>
              <div className={styles.dpPriceValue}>$450–750</div>
              <p className={styles.dpPriceBody}>
                Наприклад, NY → Chicago, LA → San Francisco, Miami → Atlanta.
                Доставка 3-5 днів.
              </p>
            </div>

            <div className={styles.dpPriceCard}>
              <h4 className={styles.dpPriceLabel}>Середня дистанція (500-1500 миль)</h4>
              <div className={styles.dpPriceValue}>$750–1 200</div>
              <p className={styles.dpPriceBody}>
                Наприклад, Chicago → Miami, NY → Dallas, Denver → Seattle.
                Доставка 5-8 днів.
              </p>
            </div>

            <div className={styles.dpPriceCard}>
              <h4 className={styles.dpPriceLabel}>Через усю країну (1500+ миль)</h4>
              <div className={styles.dpPriceValue}>$1 100–1 600</div>
              <p className={styles.dpPriceBody}>
                Наприклад, Каліфорнія → Нью-Йорк, Флорида → Вашингтон. Доставка
                7-10 днів.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 10 — Contact                                                */}
      {/* ================================================================== */}
      <section className={styles.paperBand}>
        <div className={styles.inner}>
          <span className={styles.eyebrowPlainPaper}>КОНТАКТИ</span>
          <h2 className={styles.titlePaper}>Зв’яжіться з нами</h2>
          <p className={styles.pPaper}>
            Найшвидший спосіб — Telegram. Відповідаємо протягом 1-2 годин у
            робочий час (9:00-18:00 за східним часом США, тобто 16:00-01:00 за
            київським). Спілкуємося українською, російською або англійською — як
            вам зручніше.
          </p>

          <div className={styles.contactGrid}>
            <div className={styles.contactCard}>
              <p className={styles.contactLabel}>Telegram</p>
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
              <p className={styles.contactLabel}>Email</p>
              <a href="mailto:info@y7agency.com" className={styles.contactLink}>
                info@y7agency.com
              </a>
            </div>

            <div className={styles.contactCard}>
              <p className={styles.contactLabel}>Портал клієнта</p>
              <Link to="/portal/login" className={styles.contactLink}>
                Клієнтський портал
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 11 — FAQ                                                    */}
      {/* ================================================================== */}
      <section className={styles.paperBand}>
        <div className={styles.inner}>
          <span className={styles.eyebrowPlainPaper}>FAQ</span>
          <h2 className={styles.titlePaper}>Часті запитання</h2>
          <p className={styles.pPaper}>
            Ми зібрали запитання, які найчастіше отримуємо від клієнтів — як тих,
            хто пригоняє авто в Україну, так і діаспори в США. Якщо не знайдете
            тут відповіді, напишіть нам у Telegram — відповімо без шаблонів.
          </p>

          <div className={styles.faqList}>
            {faqSchema.mainEntity.map((faq, idx) => (
              <details key={idx} className={styles.faqItem}>
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
      {/* SECTION 12 — Dark CTA                                               */}
      {/* ================================================================== */}
      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>Готові почати?</h2>
          <p className={styles.ctaText}>
            Надішліть номер лоту з Copart або IAAI у Telegram — отримаєте
            конкретний розрахунок протягом 1-2 годин. Безкоштовно і без
            зобов’язань.
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
            <Link to="/ua/ship-my-car" className={styles.ctaGhost}>
              Деталі замовлення →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UkraineHome;
