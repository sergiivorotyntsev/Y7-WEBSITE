import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import BreadcrumbSchema from '../components/BreadcrumbSchema';
import styles from './Services.module.css';
import v2s from '../styles/v2/surfaces.module.css';
import v2t from '../styles/v2/type.module.css';
import v2b from '../styles/v2/buttons.module.css';
import v2c from '../styles/v2/cards.module.css';

// SVC-T01: three-tier link hub on the Earned Container principle. The page used
// to be 36 identical tiles in five consecutive grids; a container now has to
// earn its place, so only the three audience anchors keep a box and everything
// else is typographic index rows on hairlines (the BAND-T01 portGrid pattern).
//
// The i18n arrays keep their ORIGINAL index order so the four locales stay 1:1
// aligned — grouping happens here by index, never by re-ordering the JSON.
const servicePages = [
  { to: '/ship-my-car' },                 // 0  -> Tier 1
  { to: '/dealers' },                     // 1  -> Tier 1
  { to: '/exporters' },                   // 2  -> Tier 1
  { to: '/car-shipping-cost' },           // 3  -> Tier 2 pricing
  { to: '/enclosed-car-shipping' },       // 4  -> Tier 2 transport
  { to: '/auction-car-shipping' },        // 5  -> Tier 2 auction
  { to: '/copart-shipping' },             // 6  -> Tier 2 auction
  { to: '/iaai-transport' },              // 7  -> Tier 2 auction
  { to: '/manheim-transport' },           // 8  -> Tier 2 auction
  { to: '/door-to-port-auto-transport' }, // 9  -> Tier 2 export
  { to: '/dealer-auto-transport' },       // 10 -> Tier 2 export
  { to: '/open-car-shipping' },           // 11 -> Tier 2 transport
  { to: '/salvage-car-shipping' },        // 12 -> Tier 2 transport
  { to: '/state-to-state-car-shipping' }, // 13 -> Tier 2 transport
  { to: '/auction-to-port-transport' },   // 14 -> Tier 2 auction
];

const evPages = [
  { to: '/tesla-car-shipping' },
  { to: '/ev-auto-transport' },
  { to: '/cybertruck-shipping' },
  { to: '/electric-vehicle-port-delivery' },
];

const locationPages = [
  { to: '/newton-auto-transport' },
  { to: '/boston-car-shipping' },
  { to: '/massachusetts-car-shipping' },
  { to: '/florida-car-shipping' },
  { to: '/new-jersey-auto-transport' },
  { to: '/texas-auto-transport' },
];

const routePages = [
  { to: '/massachusetts-to-florida-car-shipping' },
  { to: '/new-jersey-to-florida-car-shipping' },
  { to: '/texas-to-newark-port-auto-transport' },
  { to: '/chicago-to-port-newark-car-shipping' },
  { to: '/auction-to-port-transport' },
];

// Tier 1 — the page's real decision: who the visitor is. B2B-first (dealers and
// exporters lead on dark cards, individuals fully served on the cream card).
// `absorbed` indexes services.list — the retired "What We Offer" prose, kept
// verbatim rather than deleted. Multi-Vehicle Shipments (list 5) has no page of
// its own and folds into the dealers anchor.
const anchors = [
  { card: 1, to: '/dealers', tag: 'dealers', dark: true, absorbed: [1, 5] },
  { card: 2, to: '/exporters', tag: 'exporters', dark: true, absorbed: [2] },
  { card: 0, to: '/ship-my-car', tag: 'individuals', dark: false, absorbed: [3] },
];

// Tier 2 — the tail, grouped so it is scannable instead of flat. `intro` indexes
// services.list for the two remaining absorbed descriptions.
const groups = [
  { key: 'auction', items: [5, 6, 7, 8, 14], intro: 0 },
  { key: 'transport', items: [11, 4, 12, 13], intro: 4 },
  { key: 'export', items: [9, 10], intro: null },
  { key: 'pricing', items: [3], intro: null },
];

// Tier 2/3 row: a link on the plane, not a card. The title is underlined AT REST
// (Body-Link Law) so the row reads as a link on touch, where hover cannot.
function IndexRow({ to, title, desc }) {
  return (
    <Link to={to} className={styles.row}>
      <h3 className={styles.rowTitle}>{title}</h3>
      <p className={styles.rowDesc}>{desc}</p>
    </Link>
  );
}

export default function Services() {
  const { t } = useTranslation('services');
  const { t: tCommon } = useTranslation('common');
  const navigate = useNavigate();
  const list = t('list', { returnObjects: true });
  // V2-CLEANUP T04: card titles/descs moved to i18n (services.cards.*),
  // arrays keep only slugs; EN strings byte-identical to the old literals.
  const cardFor = (group, i) => (Array.isArray(group) && group[i]) || {};
  const listFor = (i) => (Array.isArray(list) && list[i]) || {};
  const cardsServices = t('cards.services', { returnObjects: true });
  const cardsEv = t('cards.ev', { returnObjects: true });
  const cardsLocations = t('cards.locations', { returnObjects: true });
  const cardsRoutes = t('cards.routes', { returnObjects: true });

  return (
    <div className={styles.wrap}>
      <BreadcrumbSchema items={[{name:'Home',url:'/'},{name:'Services',url:'/services'}]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Auto Transport Brokerage",
        "provider": {"@id": "https://www.y7agency.com/#organization"},
        "areaServed": "United States",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Auto Transport Services",
          "itemListElement": [
            {"@type":"Offer","itemOffered":{"@type":"Service","name":"Open Auto Transport"}},
            {"@type":"Offer","itemOffered":{"@type":"Service","name":"Enclosed Auto Transport"}},
            {"@type":"Offer","itemOffered":{"@type":"Service","name":"Auction Car Pickup"}},
            {"@type":"Offer","itemOffered":{"@type":"Service","name":"Door-to-Port Delivery"}},
            {"@type":"Offer","itemOffered":{"@type":"Service","name":"Dealer Transport"}}
          ]
        }
      }) }} />
      <PageMeta title={tCommon('meta.servicesTitle')} description={tCommon('meta.servicesDescription')} path="/services" />

      {/* Compact dark hero */}
      {/* DESIGN-V2-W4-T04: link-hub page (DESIGN.md §2 amendment) — dark is
          hero + closing CTA only; catalogs stay manifest. */}
      <section className={`${v2s.boardHero} ${styles.hero}`}>
        <div className={`${v2s.inner} ${styles.heroInner}`}>
          <p className={`${v2t.eyebrowPlain} ${styles.heroMicro}`}>{t('heroKicker')}</p>
          <h1 className={styles.title}>{t('title')}</h1>
          <p className={styles.subtitle}>{t('subtitle')}</p>
        </div>
      </section>

      <section className={v2s.manifest}><div className={`${v2s.inner} ${styles.bodyWrap}`}>

        {/* TIER 1 — who you are. The only earned containers on the page.
            No eyebrow here: the dark cards already carry the weight, and it
            keeps the red rule-line count inside the Signal Budget. */}
        <div className={styles.sectionFirst}>
          <div className={styles.sectionHeadingWrap}>
            <h2 className={styles.sectionHeading}>{t('gridHeading')}</h2>
          </div>
          <div className={styles.anchorGrid}>
            {anchors.map((a) => {
              const card = cardFor(cardsServices, a.card);
              return (
                <Link
                  key={a.to}
                  to={a.to}
                  aria-label={card.title}
                  className={`${a.dark ? v2c.boardSolid : v2c.paper} ${styles.anchor} ${a.dark ? styles.anchorDark : styles.anchorCream}`}
                >
                  <span className={`${v2t.monoMicro} ${styles.anchorTag}`}>{t(`tags.${a.tag}`)}</span>
                  <h3 className={`${v2t.cardTitle} ${styles.anchorTitle}`}>{card.title}</h3>
                  <p className={styles.anchorLead}>{card.desc}</p>
                  {a.absorbed.map((k) => (
                    <p key={k} className={styles.anchorNote}>{listFor(k).desc}</p>
                  ))}
                  <span className={styles.anchorCta}>
                    {t('linkCta')} <span aria-hidden="true">&rarr;</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* TIER 2 — the tail as a grouped index */}
        <div className={styles.section}>
          <div className={styles.sectionHeadingWrap}>
            <p className={`${v2t.eyebrow} ${v2t.eyebrowOnPaper}`}>{t('exploreKicker')}</p>
            <h2 className={styles.sectionHeading}>{t('exploreTitle')}</h2>
          </div>
          {groups.map((g) => (
            <div key={g.key} className={styles.group}>
              <p className={`${v2t.monoLabel} ${styles.groupLabel}`}>{t(`groups.${g.key}`)}</p>
              {g.intro !== null && (
                <p className={styles.groupIntro}>{listFor(g.intro).desc}</p>
              )}
              <div className={styles.index}>
                {g.items.map((i) => (
                  <IndexRow
                    key={servicePages[i].to}
                    to={servicePages[i].to}
                    title={cardFor(cardsServices, i).title}
                    desc={cardFor(cardsServices, i).desc}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* TIER 3 — coverage indexes */}
        <div className={styles.section}>
          <div className={styles.sectionHeadingWrap}>
            <p className={`${v2t.eyebrow} ${v2t.eyebrowOnPaper}`}>{t('locationsKicker')}</p>
            <h2 className={styles.sectionHeading}>{t('locationsTitle')}</h2>
          </div>
          <div className={styles.index}>
            {locationPages.map((page, i) => (
              <IndexRow
                key={page.to}
                to={page.to}
                title={cardFor(cardsLocations, i).title}
                desc={cardFor(cardsLocations, i).desc}
              />
            ))}
          </div>
        </div>

        {/* Popular Routes — no eyebrow: breaks the consecutive rule-line run
            (DESIGN.md: max 2 consecutive sections open with the pair). */}
        <div className={styles.section}>
          <div className={styles.sectionHeadingWrap}>
            <h2 className={styles.sectionHeading}>{t('routesTitle')}</h2>
          </div>
          <div className={styles.index}>
            {routePages.map((page, i) => (
              <IndexRow
                key={page.to}
                to={page.to}
                title={cardFor(cardsRoutes, i).title}
                desc={cardFor(cardsRoutes, i).desc}
              />
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeadingWrap}>
            <p className={`${v2t.eyebrow} ${v2t.eyebrowOnPaper}`}>{t('evKicker')}</p>
            <h2 className={styles.sectionHeading}>{t('evTitle')}</h2>
            <p className={styles.sectionLede}>{t('evLede')}</p>
          </div>
          <div className={styles.index}>
            {evPages.map((page, i) => (
              <IndexRow
                key={page.to}
                to={page.to}
                title={cardFor(cardsEv, i).title}
                desc={cardFor(cardsEv, i).desc}
              />
            ))}
          </div>
        </div>

        {/* CTA strip — the hub's closing dark band */}
        <div className={styles.ctaStrip}>
          <h2 className={`${v2t.sectionDisplay} ${styles.ctaTitle}`}>{t('ctaTitle')}</h2>
          <p className={`${v2t.lede} ${v2t.ledeOnDark} ${styles.ctaSubtitle}`}>{t('ctaSubtitle')}</p>
          <button onClick={() => navigate('/quote')} className={v2b.cta}>
            {t('ctaButton')}
          </button>
        </div>
      </div></section>
    </div>
  );
}
