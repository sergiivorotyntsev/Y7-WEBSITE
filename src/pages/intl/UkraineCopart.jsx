import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import HreflangTags from '../../components/HreflangTags';
import styles from './UkraineCopart.module.css';

// =============================================================================
// UkraineCopart.jsx — Merged audience (Ukraine import + діаспора в США)
// Route: /ua/copart-shipping
// Primary audience: Ukraine buyers importing from Copart auctions
// Secondary audience: Ukrainian diaspora in USA using Copart for local purchases
// Y7-centric: FMCSA broker, Ukrainian-speaking support
// International leg: "через перевірених партнерів-експедиторів" (Y7-centric)
// Visual structure mirrors English CopartShipping.jsx + SeoLandingPage template
// (breadcrumb + H1 + intro + Section blocks + Real Scenario + lists + FAQ + CTA)
// =============================================================================

// Inline Section helper (paper reading section — mirrors SeoLandingPage's Section)
function Section({ title, kicker, children }) {
  return (
    <section className={styles.sectionWrap}>
      {kicker && <span className={styles.eyebrowPaper}>{kicker}</span>}
      <h2 className={styles.titlePaper}>{title}</h2>
      {children}
    </section>
  );
}

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
        text: 'Для стандартного седана або кросовера типовий розрахунок: ціна авто на аукціоні + buyer fee Copart ($500-1 200 залежно від суми лоту) + транспорт лядовий по США (до 500 миль $300-600, 500-1 500 миль $600-1 200, через усю країну $900-1 600) + морський фрахт $1 200-2 400 + доставка в Україну та розмитнення. Тільки логістика (без ціни авто) зазвичай виходить $2 200-4 500. Додайте мито, акциз та ПДВ при розмитненні — це окрема сума, що залежить від віку авто та обʼєму двигуна.',
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
    title: 'Вибір лоту і попередній розрахунок',
    desc: 'Надсилаєте нам номер лоту з Copart або IAAI до початку торгів. Ми рахуємо повну логістику до вашого міста, щоб ви знали реальну кінцеву ціну ще до ставки. Розрахунок безкоштовний і нічого не зобовʼязує.',
  },
  {
    title: 'Участь у торгах',
    desc: 'Купівля з Copart відбувається через ліцензованого дилера або брокера з правом участі. Ми не займаємося самою ставкою — це робите ви особисто через брокера або замовляєте послугу у спеціалізованої компанії. Ми включаємося на етапі логістики після виграшу.',
  },
  {
    title: 'Оплата та документи Copart',
    desc: 'Після виграшу у вас 2 робочих дні для повної оплати лоту плюс buyer fees. Copart надсилає title (документ на авто) поштою протягом 1-2 тижнів. Для транспортування title не обовʼязковий одразу — ми забираємо авто за dispatch order.',
  },
  {
    title: 'Забір з майданчика Copart',
    desc: 'Наш перевізник забирає авто протягом 3-10 днів після дозволу. Водій робить фотодокументацію стану перед завантаженням. Якщо авто не заводиться (non-running), додаткова плата за лебідку $100-200.',
  },
  {
    title: 'Транспорт до порту завантаження',
    desc: 'Авто їде до одного з портів: Newark (NJ), Baltimore (MD), Savannah (GA), Houston (TX) або Los Angeles (CA). Вибір порту залежить від локації майданчика Copart і доступності контейнерних слотів. На цьому етапі завершується американська частина від Y7.',
  },
  {
    title: 'Морський фрахт і доставка в Україну',
    desc: 'Далі авто передається перевіреним партнерам-експедиторам для морського перевезення та доставки до вашого міста в Україні через один з трьох маршрутів: Гдиня, Клайпеда або Констанца. Ви отримуєте коносамент (BOL) після завантаження на корабель і далі працюєте з митним брокером в Україні для розмитнення.',
  },
];

const whenNeeded = [
  'Виграли лот на Copart або IAAI і не маєте перевізника по США',
  'Купуєте авто на американському аукціоні для імпорту в Україну',
  'Потрібна доставка з будь-якого з 200+ майданчиків Copart до порту',
  'Купуєте salvage title для відновлення в Україні',
  'Дилер закуповує інвентар з Copart для українського ринку',
  'Експортуєте авто в Україну — потрібна доставка з Copart до порту США',
];

const requirements = [
  'Номер лоту з Copart або IAAI',
  'Buyer number або member number',
  'Підтвердження оплати лоту в Copart',
  'Gate pass (Copart видає після того, як платіж пройде)',
  'Адреса призначення (порт США або українське місто)',
];

const capabilities = [
  'Усі 200+ майданчиків Copart по США',
  'Salvage та clean title — обидва типи',
  'Non-running авто з лебідкою або форкліфтом',
  'Попередня котировка до ставки — щоб ви закладали storage-ризик у ціну',
  'Доставка до порту, дому або сервісу',
  'Відкритий і закритий (enclosed) автовоз',
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

const relatedLinks = [
  { label: 'Замовити перевезення', to: '/ua/ship-my-car' },
  { label: 'Головна (Україна)', to: '/ua' },
  { label: 'Експорт авто з США', to: '/ua/exporters' },
  { label: 'Copart Shipping (EN)', to: '/copart-shipping' },
  { label: 'Auction Shipping (EN)', to: '/auction-car-shipping' },
];

// =============================================================================
// Component
// =============================================================================

function UkraineCopart() {
  return (
    <div lang="uk" className={styles.page}>
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
        <link rel="canonical" href="https://www.y7agency.com/ua/copart-ta-iaai" />
        <meta property="og:title" content="Copart — пригін авто з аукціону в Україну" />
        <meta
          property="og:description"
          content="Чесний гайд без маркетингу: реальна вартість, ризики, процес. Ліцензований FMCSA-брокер з українськомовною підтримкою."
        />
        <meta property="og:url" content="https://www.y7agency.com/ua/copart-shipping" />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="uk_UA" />
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

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          {/* Breadcrumb (mirrors SeoLandingPage) */}
          <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
            <Link to="/ua" className={styles.crumbLink}>
              Головна (UA)
            </Link>
            <span className={styles.crumbSep}>/</span>
            <span>Послуги</span>
            <span className={styles.crumbSep}>/</span>
            <span className={styles.crumbCurrent}>Copart — пригін з аукціону</span>
          </nav>

          {/* H1 (mirrors SeoLandingPage typography) */}
          <h1 className={styles.h1}>
            Пригін авто з Copart в Україну — чесний гайд без маркетингу
          </h1>

          {/* Intro paragraph */}
          <p className={styles.intro}>
            Copart — найбільший страховий аукціон у США. Понад 175 тисяч авто
            щоденно, понад 200 майданчиків, мільйон продажів на рік. Для
            українського покупця це шанс купити авто на 30-50% дешевше ніж на
            внутрішньому ринку — але шлях від «молотка до гаража» має більше
            етапів і пасток, ніж обіцяє реклама. Y7 Logistics — ліцензований
            FMCSA-брокер (MC #1741537), що обслуговує американську частину
            процесу.
          </p>
        </div>
      </section>

      <div className={styles.body}>

        {/* Editorial Section: What is Copart */}
        <Section kicker="ПРО COPART" title="Що таке Copart насправді">
          <p className={styles.pPaper}>
            Copart (Copart Inc., заснований 1982 року в Каліфорнії) — це
            платформа, що зʼєднує страхові компанії, дилерів і банки з
            покупцями по всьому світу. На відміну від класичних аукціонних
            домів, Copart працює виключно онлайн — усі торги відбуваються через
            інтернет у системі VB3 (Virtual Bidding 3.0). Штаб-квартира у
            Далласі, Техас.
          </p>
          <p className={styles.pPaper}>
            Більшість авто на Copart — це пошкоджені транспортні засоби від
            страхових компаній. Після ДТП, крадіжки, повені або градобою
            страхова визнає авто total loss (повна конструктивна загибель) і
            передає на аукціон. Ключовий момент: «total loss» у США не завжди
            означає знищення. Американські правила вимагають визнання авто
            збитковим, коли ремонт перевищує 70-80% ринкової вартості. Через
            високі ціни на запчастини та роботу в США багато легко пошкоджених
            авто потрапляє на Copart лише тому, що їх невигідно ремонтувати для
            американського ринку.
          </p>
          <p className={styles.pPaper}>
            Для українського імпортера це шанс: авто після легкого ДТП у США за
            $10 000 може після ремонту та пригону коштувати в Україні значно
            дорожче. Але ця ж логіка діє у зворотний бік — недосвідчений
            покупець може виграти лот з прихованими проблемами, вартість
            ремонту яких зʼїсть всю економію.
          </p>
        </Section>

        {/* Editorial Section: Copart vs IAAI table */}
        <Section kicker="COPART vs IAAI" title="Copart vs IAAI — у чому різниця">
          <p className={styles.pPaper}>
            В США працює два великих страхових аукціони. Обидва продають
            подібний товар — авто після страхових випадків — але мають свої
            особливості.
          </p>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Характеристика</th>
                  <th>Copart</th>
                  <th>IAAI</th>
                </tr>
              </thead>
              <tbody>
                {copartVsIaai.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.feature}</td>
                    <td>{row.copart}</td>
                    <td>{row.iaai}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={styles.pNote}>
            Для більшості українських покупців обидва аукціони працюють
            аналогічно. Ми обслуговуємо логістику з обох — різниця лише у
            номері лоту, який ви нам надсилаєте.
          </p>
        </Section>

        {/* Editorial Section: Risk warnings */}
        <Section kicker="ПЕРЕД СТАВКОЮ" title="На що звернути увагу до ставки">
          <p className={styles.pPaper}>
            Найбільша помилка новачків — покладатися лише на фото і mileage.
            Copart не дає гарантій стану авто, умови продажу «as-is». Нижче —
            чотири речі, які реально впливають на фінансовий результат.
          </p>
          <div className={styles.warnList}>
            {riskWarnings.map((warn, idx) => (
              <div key={idx} className={styles.warnCard}>
                <h3 className={styles.warnTitle}>{warn.title}</h3>
                <p className={styles.warnDesc}>{warn.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Real Scenario (mirrors English "Real Scenario: Copart Dallas to Houston") */}
        <section className={styles.darkPanel}>
          <h2 className={styles.titleDark}>Реальний приклад: Copart Dallas → Одеса</h2>
          <p className={styles.pDark}>
            Ви виграли Honda Civic 2019 з salvage title на Copart Dallas у
            понеділок за $6 800. У вівторок робите wire-переказ; платіж
            проходить у середу зранку. У четвер опівдні Copart видає gate pass.
            У пʼятницю наш перевізник забирає авто з майданчика (Civic не
            заводиться через ушкодження передньої частини — завантажуємо
            лебідкою) і доставляє до порту Houston у понеділок. Вартість
            наземного транспорту по США: $580 (відстань 384 милі + доплата за
            non-running). Storage fees: нуль, бо в цьому сценарії забір вклався у
            безкоштовне вікно. Це один з можливих результатів, не гарантія — на
            віддаленому майданчику або при виграші у п'ятницю історія могла
            коштувати кілька днів зберігання.
          </p>
          <p className={styles.pDark}>
            У Houston авто чекає на завантаження у 40HC контейнер близько 10
            днів. Морський фрахт до Констанци (Румунія) — $1 850, транзит 28
            днів. Локальний експедитор передає авто українському митному
            брокеру; розмитнення в Україні (мито + акциз + ПДВ для авто 2019
            року з бензиновим двигуном 2.0л) — приблизно $2 100. Автовоз від
            Констанци до Одеси — $250. Сумарна логістика від Dallas до Одеси:
            $2 680 без розмитнення, $4 780 з розмитненням. Загальний термін
            від виграшу лоту до отримання у Одесі: 6 тижнів і 4 дні.
          </p>
        </section>

        {/* When You Need This (mirrors SeoLandingPage whenNeeded) */}
        <Section title="Коли вам потрібен Y7 для Copart">
          <ul className={styles.list}>
            {whenNeeded.map((item, i) => (
              <li key={i} className={styles.listItem}>
                {item}
              </li>
            ))}
          </ul>
        </Section>

        {/* How It Works — numbered steps (mirrors SeoLandingPage steps) */}
        <Section kicker="ЯК ЦЕ ПРАЦЮЄ" title="Як це працює">
          <p className={styles.pPaper}>
            Увесь цикл — від виграшу лоту до отримання авто в Україні — займає
            типово 6-8 тижнів. Нижче деталі кожного етапу і що саме робить Y7,
            а що залежить від вас та інших учасників процесу.
          </p>
          <div className={styles.procList}>
            {processSteps.map((step, i) => (
              <div key={i} className={styles.procItem}>
                <div className={styles.procNum}>{i + 1}</div>
                <div>
                  <div className={styles.procTitle}>{step.title}</div>
                  <div className={styles.procDesc}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* What You Need (requirements) */}
        <Section title="Що потрібно від вас">
          <ul className={styles.list}>
            {requirements.map((item, i) => (
              <li key={i} className={styles.listItem}>
                {item}
              </li>
            ))}
          </ul>
        </Section>

        {/* Our Capabilities */}
        <Section title="Наші можливості">
          <div className={styles.capGrid}>
            {capabilities.map((item, i) => (
              <div key={i} className={styles.capCard}>
                {item}
              </div>
            ))}
          </div>
        </Section>

        {/* Pricing (preserved from original) */}
        <Section kicker="ЦІНИ" title="Орієнтовні витрати на логістику">
          <p className={styles.pPaper}>
            Нижче типові діапазони для стандартного легкового авто (седан, SUV,
            кросовер до 2,5 тонни). Конкретну вартість рахуємо після отримання
            номера лоту — різниця між майданчиками Copart і портами завантаження
            може складати кілька сотень доларів. Ціни не включають саме авто,
            buyer fee Copart та розмитнення в Україні.
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
                Забір з майданчика Copart до порту. Залежить від відстані, стану
                авто (їде/не їде), сезону.
              </p>
            </div>
            <div className={styles.priceCard}>
              <span className={styles.priceLabel}>Морський фрахт</span>
              <div className={styles.priceValue}>$1 200–2 400</div>
              <p className={styles.priceBody}>
                Контейнер 40HC (1-3 авто у контейнері) або RoRo. Залежить від
                порту США та європейського порту призначення.
              </p>
            </div>
            <div className={styles.priceCard}>
              <span className={styles.priceLabel}>Доставка в Україну</span>
              <div className={styles.priceValue}>$600–1 200</div>
              <p className={styles.priceBody}>
                Автовоз з європейського порту до вашого міста через один з
                трьох маршрутів (Гдиня, Клайпеда, Констанца).
              </p>
            </div>
          </div>
          <p className={styles.pNote}>
            <strong>Застереження:</strong> не забудьте додати buyer fee Copart
            ($500-1 200 залежно від лоту), мито, акциз та ПДВ при розмитненні.
            Для точного розрахунку надішліть номер лоту — дамо конкретні цифри
            для вашого кейсу.
          </p>
        </Section>

        {/* Why Y7 Trust Box */}
        <section className={styles.darkPanel}>
          <span className={styles.eyebrowDark}>ЧОМУ Y7</span>
          <h2 className={styles.titleDark}>Чому Y7 Logistics</h2>
          <p className={styles.pDark}>
            Y7 Logistics працює як ліцензований FMCSA-брокер — це означає
            федеральний нагляд Департаменту транспорту США, обовʼязкове
            страхування відповідальності, публічна реєстрація в базі SAFER
            (safer.fmcsa.dot.gov). Ви можете перевірити наш статус за номером
            MC #1741537 самостійно в будь-який момент.
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
          <p className={styles.pDark}>
            Для українських клієнтів ми пропонуємо українськомовну підтримку
            через Telegram, прозорі ціни без прихованих комісій і реальний
            досвід роботи з маршрутами через Гдиню, Клайпеду та Констанцу.
          </p>
        </section>

        {/* Diaspora section (preserved as inline editorial) */}
        <section className={styles.darkPanel}>
          <h2 className={styles.titleDark}>Для діаспори в США — Copart під дім</h2>
          <p className={styles.pDark}>
            Якщо ви з української діаспори в США і купуєте авто для
            використання у Штатах або на продаж — ваш маршрут коротший: від
            майданчика Copart одразу під дім у Чикаго, Лос-Анджелесі, Нью-Йорку
            чи будь-де в США. Y7 обслуговує цей обсяг самостійно, без
            міжнародного етапу.
          </p>
          <p className={styles.pDark}>
            Як ліцензований FMCSA-брокер (MC #1741537) маємо доступ до мережі
            перевірених перевізників по всіх 50 штатах. Типовий маршрут між
            штатами для седана з Copart — 5-8 днів від виграшу лоту до
            доставки за вашою адресою. <strong>Важливо:</strong> памʼятайте, що
            Copart нараховує плату за зберігання з 3 дня після виграшу, тому
            швидке підтвердження замовлення економить $100-300.
          </p>
          <div className={styles.ucGrid}>
            {diasporaUseCases.map((uc, idx) => (
              <div key={idx} className={styles.ucCard}>
                <h4 className={styles.ucTitle}>{uc.title}</h4>
                <p className={styles.ucDesc}>{uc.desc}</p>
              </div>
            ))}
          </div>
          <p className={styles.pNoteDark}>
            Ціни для стандартного седана чи кросовера на відкритому автовозі.
            Non-running авто — доплата $150-300 за завантаження лебідкою.
            Закриті автовози (enclosed) — доплата 30-60%. Діапазони: $450-750
            (до 500 миль), $750-1 200 (500-1500 миль), $1 100-1 600 (через усю
            країну).
          </p>
        </section>

        {/* FAQ (mirrors SeoLandingPage faqs) */}
        <Section kicker="FAQ" title="Часті запитання">
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
        </Section>
      </div>

      {/* CTA (mirrors SeoLandingPage CTA) */}
      <section className={styles.ctaBand}>
        <a
          href="https://t.me/y7dispatch_bot"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ctaBtn}
        >
          Розрахунок у Telegram
        </a>
      </section>

      {/* Related Pages (mirrors SeoLandingPage related) */}
      <section className={styles.relatedBand}>
        <div className={styles.relatedInner}>
          <h3 className={styles.relatedHeading}>
            Повʼязані сторінки
          </h3>
          <div className={styles.relatedPills}>
            {relatedLinks.map((link, i) => (
              <Link key={i} to={link.to} className={styles.relatedPill}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default UkraineCopart;
