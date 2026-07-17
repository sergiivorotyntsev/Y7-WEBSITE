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

// =============================================================================
// Component
// =============================================================================
function RussiaShipMyCar() {
  return (
    <div className={pageStyles.page}>
      {/* ----------------------------------------------------------------- */}
      {/* Head / SEO                                                        */}
      {/* ----------------------------------------------------------------- */}
      <Helmet>
        <html lang="ru" />
        <title>Заказать перевозку авто по США — Y7 Logistics</title>
        <meta name="description" content="Закажите перевозку авто по США: от аукциона до двери, между городами, до порта. Расчёт за минуты, фиксированная цена. MC #1741537." />
        <link rel="canonical" href="https://www.y7agency.com/ru/perevozka-avto" />
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
      {/* SECTION 1 — Hero (board-black)                                     */}
      {/* ================================================================= */}
      <section className={`${pageStyles.heroBand} ${pageStyles.hero}`}>
        <div className={pageStyles.inner}>
          <h1 className={pageStyles.heroTitle}>
            Заказать перевозку автомобиля по США
          </h1>
          <p className={pageStyles.heroLede}>
            Готовы отправить автомобиль? Ниже — всё, что нужно знать перед оформлением
            заказа: какую информацию подготовить, как проходит процесс и что ожидать
            на каждом этапе. Расчёт стоимости — за несколько минут через Telegram
            @y7dispatch_bot или по email info@y7agency.com.
          </p>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 2 — What you need before ordering (paper)                 */}
      {/* ================================================================= */}
      <section className={pageStyles.paperBand}>
        <div className={pageStyles.inner}>
          <span className={pageStyles.eyebrowRulePaper}>ПОДГОТОВКА</span>
          <h2 className={pageStyles.sectionTitle}>Что подготовить перед заказом</h2>

          <ol className={pageStyles.stepList}>
            {CHECKLIST.map((item, i) => (
              <li key={i} className={`${pageStyles.cardPaper} ${pageStyles.checkItem}`}>
                <span className={pageStyles.checkNum}>{i + 1}</span>
                <div>
                  <h3 className={pageStyles.cardHeading}>{item.label}</h3>
                  <p className={pageStyles.bodyText}>{item.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 3 — Ordering workflow (board)                             */}
      {/* ================================================================= */}
      <section className={pageStyles.boardBand}>
        <div className={pageStyles.inner}>
          <span className={pageStyles.eyebrowRuleDark}>ПРОЦЕСС</span>
          <h2 className={pageStyles.sectionTitle}>Как оформить заказ</h2>

          <ol className={pageStyles.stepFlow}>
            {WORKFLOW_STEPS.map((step) => (
              <li key={step.num} className={pageStyles.flowItem}>
                <span className={pageStyles.flowNumDark}>{step.num}</span>
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
      {/* SECTION 4 — Why choose Y7 (paper)                                 */}
      {/* ================================================================= */}
      <section className={pageStyles.paperBand}>
        <div className={pageStyles.inner}>
          <span className={pageStyles.eyebrowPlainPaper}>ПОЧЕМУ Y7</span>
          <h2 className={pageStyles.sectionTitle}>Почему Y7 Logistics</h2>
          <p className={pageStyles.lede}>
            Лицензированный брокер FMCSA (MC #1741537). Русскоязычная команда,
            быстрый ответ диспетчера, прозрачное ценообразование.
          </p>

          <div className={`${pageStyles.grid} ${pageStyles.grid3}`}>
            <div className={pageStyles.cardPaper}>
              <p className={pageStyles.cardIcon}>🛡️</p>
              <h3 className={pageStyles.cardHeading}>
                Лицензия и страховка
              </h3>
              <p className={pageStyles.bodyText}>
                MC #1741537, USDOT #4427359. Все перевозчики в нашей сети застрахованы.
                Проверьте нас в базе FMCSA.
              </p>
            </div>

            <div className={pageStyles.cardPaper}>
              <p className={pageStyles.cardIcon}>⚡</p>
              <h3 className={pageStyles.cardHeading}>
                Быстрый расчёт
              </h3>
              <p className={pageStyles.bodyText}>
                Стоимость и сроки — за несколько минут. Цена фиксируется при бронировании,
                без скрытых доплат.
              </p>
            </div>

            <div className={pageStyles.cardPaper}>
              <p className={pageStyles.cardIcon}>🇷🇺</p>
              <h3 className={pageStyles.cardHeading}>
                Русскоязычная поддержка
              </h3>
              <p className={pageStyles.bodyText}>
                Общайтесь на русском языке. Наша команда на связи через Telegram в рабочие часы.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 5 — Contact (board)                                       */}
      {/* ================================================================= */}
      <section className={pageStyles.boardBand}>
        <div className={pageStyles.inner}>
          <span className={pageStyles.eyebrowRuleDark}>КОНТАКТЫ</span>
          <h2 className={pageStyles.sectionTitle}>Свяжитесь с нами</h2>

          <div className={`${pageStyles.grid} ${pageStyles.grid3}`}>
            {/* Telegram */}
            <div className={pageStyles.cardBoard}>
              <p className={pageStyles.contactLabel}>Telegram</p>
              <a
                href="https://t.me/y7dispatch_bot"
                target="_blank"
                rel="noopener noreferrer"
                className={pageStyles.contactValue}
              >
                @y7dispatch_bot
              </a>
              <p className={pageStyles.bodyText}>
                Самый быстрый способ связи. Ответ в течение нескольких минут в рабочие часы.
              </p>
            </div>

            {/* Email */}
            <div className={pageStyles.cardBoard}>
              <p className={pageStyles.contactLabel}>Email</p>
              <a
                href="mailto:info@y7agency.com"
                className={pageStyles.contactValue}
              >
                info@y7agency.com
              </a>
              <p className={pageStyles.bodyText}>
                Для подробных запросов и документации. Ответ в рабочие часы.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 6 — Trust signals (paper)                                 */}
      {/* ================================================================= */}
      <section className={pageStyles.paperBand}>
        <div className={pageStyles.inner}>
          <div className={`${pageStyles.cardPaper} ${pageStyles.trustCard}`}>
            <p className={pageStyles.trustLabel}>
              Лицензированный брокер FMCSA
            </p>
            <p className={pageStyles.trustNumber}>
              MC#1741537
            </p>
            <p className={pageStyles.bodyText}>
              Y7 Consulting Inc — зарегистрированный транспортный брокер. USDOT #4427359.
              Сеть из 700+ проверенных перевозчиков, все 50 штатов.
            </p>
            <a
              href="https://safer.fmcsa.dot.gov/CompanySnapshot.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className={pageStyles.trustLink}
            >
              Проверить лицензию на сайте FMCSA →
            </a>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 6b — Открытый vs закрытый автовоз (board)                 */}
      {/* ================================================================= */}
      <section className={pageStyles.boardBand}>
        <div className={pageStyles.inner}>
          <span className={pageStyles.eyebrowPlainDark}>СРАВНЕНИЕ</span>
          <h2 className={pageStyles.sectionTitle}>Открытый или закрытый автовоз — что выбрать</h2>
          <p className={pageStyles.lede}>
            Два формата перевозки — разница в цене и в уровне защиты. Коротко: для
            большинства машин открытый трак — нормальный выбор. Закрытый (enclosed) берут
            для редких, коллекционных, свежекупленных премиум-авто и новых электрокаров.
          </p>
          <div className={`${pageStyles.grid} ${pageStyles.grid2}`}>
            <div className={pageStyles.cardBoard}>
              <h3 className={pageStyles.cardHeading}>Открытый автовоз</h3>
              <p className={pageStyles.comparisonPrice}>базовая цена · стандарт рынка</p>
              <ul className={pageStyles.comparisonList}>
                <li>Большинство машин едет именно так — седаны, кроссоверы, пикапы</li>
                <li>Подача перевозчика быстрее (много траков на рынке)</li>
                <li>Машина видна в пути — возможна пыль и лёгкие осадки</li>
                <li>Страховка cargo покрывает повреждения при ДТП и падениях</li>
                <li>Оптимально для аукционных машин с salvage/clean title</li>
              </ul>
            </div>
            <div className={pageStyles.cardBoard}>
              <h3 className={pageStyles.cardHeading}>Закрытый (enclosed)</h3>
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
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 6c — Что влияет на цену (paper)                            */}
      {/* ================================================================= */}
      <section className={pageStyles.paperBand}>
        <div className={pageStyles.inner}>
          <span className={pageStyles.eyebrowRulePaper}>ФАКТОРЫ ЦЕНЫ</span>
          <h2 className={pageStyles.sectionTitle}>Что влияет на итоговую цену</h2>
          <p className={pageStyles.prose}>
            Цена складывается из пяти факторов. Central Dispatch (биржа перевозчиков)
            показывает реальный диапазон по каждому маршруту — мы ориентируемся на него,
            а не на «средние» цифры с баннеров.
          </p>
          <ul className={pageStyles.proseList}>
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
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 6d — Высокий сезон (board)                                 */}
      {/* ================================================================= */}
      <section className={pageStyles.boardBand}>
        <div className={pageStyles.inner}>
          <span className={pageStyles.eyebrowPlainDark}>СЕЗОН</span>
          <h2 className={pageStyles.sectionTitle}>Высокий сезон — о чём стоит знать</h2>
          <p className={pageStyles.prose}>
            Два пика в году: <strong>январь</strong> (snowbirds едут из северных штатов в Флориду
            и обратно весной) и <strong>июнь–август</strong> (летний переезд, отпуска, аукционные
            закупки перед осенью). В эти периоды ставки поднимаются на 15–30%, подача
            перевозчика занимает больше дней. Совет простой: если знаете маршрут заранее —
            бронируйте за 10–14 дней, не за сутки.
          </p>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 6e — Забор и доставка (paper)                              */}
      {/* ================================================================= */}
      <section className={pageStyles.paperBand}>
        <div className={pageStyles.inner}>
          <span className={pageStyles.eyebrowRulePaper}>ЗАБОР И ДОСТАВКА</span>
          <h2 className={pageStyles.sectionTitle}>Как проходит забор и доставка</h2>
          <div className={`${pageStyles.grid} ${pageStyles.grid2}`}>
            <div className={pageStyles.cardPaper}>
              <h3 className={pageStyles.cardHeading}>
                Забор
              </h3>
              <p className={pageStyles.bodyText}>
                Водитель звонит за 1–2 часа до приезда. Встретьте его или оставьте ключи
                доверенному лицу (аукционы Copart/IAAI — по gate pass). При погрузке
                оформляется <strong>Bill of Lading (BOL)</strong> — это ваша главная защита.
                Перед подписью осмотрите машину, сверьте состояние, сделайте фото на телефон
                со всех сторон. Любая царапина или вмятина должна быть отмечена в BOL.
              </p>
            </div>
            <div className={pageStyles.cardPaper}>
              <h3 className={pageStyles.cardHeading}>
                Доставка
              </h3>
              <p className={pageStyles.bodyText}>
                Водитель согласовывает точное время за 12–24 часа. При получении снова
                осмотрите машину и сверьте с BOL. Если есть новые повреждения — зафиксируйте
                их на BOL <em>до</em> подписи и сфотографируйте. Претензия подаётся через
                страховую компанию перевозчика (cargo insurance) — мы поможем оформить.
                Оплата — банковским переводом, Zelle или COD на месте, в зависимости от
                маршрута.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 7 — FAQ (paper)                                           */}
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
      {/* SECTION 8 — Dark CTA (board, page closes dark)                    */}
      {/* ================================================================= */}
      <section className={`${pageStyles.boardBand} ${pageStyles.ctaBand}`}>
        <div className={pageStyles.inner}>
          <div className={pageStyles.ctaInner}>
            <h2 className={pageStyles.sectionTitle}>
              Готовы заказать перевозку?
            </h2>
            <p className={pageStyles.ctaLede}>
              Напишите нам маршрут и данные автомобиля — мы рассчитаем стоимость
              и подберём перевозчика. Ответ в Telegram — за минуты.
            </p>
            <a
              href="https://t.me/y7dispatch_bot"
              target="_blank"
              rel="noopener noreferrer"
              className={pageStyles.cta}
            >
              Написать в Telegram
            </a>
            <p className={pageStyles.ctaCredential}>
              MC #1741537 · USDOT #4427359 · Диспетчерская в рабочие часы
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RussiaShipMyCar;
