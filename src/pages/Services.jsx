import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import BreadcrumbSchema from '../components/BreadcrumbSchema';
import styles from './Services.module.css';
import v2s from '../styles/v2/surfaces.module.css';
import v2t from '../styles/v2/type.module.css';
import v2b from '../styles/v2/buttons.module.css';

const servicePages = [
  { to: '/ship-my-car' },
  { to: '/dealers' },
  { to: '/exporters' },
  { to: '/car-shipping-cost' },
  { to: '/enclosed-car-shipping' },
  { to: '/auction-car-shipping' },
  { to: '/copart-shipping' },
  { to: '/iaai-transport' },
  { to: '/manheim-transport' },
  { to: '/door-to-port-auto-transport' },
  { to: '/dealer-auto-transport' },
  { to: '/open-car-shipping' },
  { to: '/salvage-car-shipping' },
  { to: '/state-to-state-car-shipping' },
  { to: '/auction-to-port-transport' },
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

export default function Services() {
  const { t } = useTranslation('services');
  const { t: tCommon } = useTranslation('common');
  const navigate = useNavigate();
  const list = t('list', { returnObjects: true });
  // V2-CLEANUP T04: card titles/descs moved to i18n (services.cards.*),
  // arrays keep only slugs; EN strings byte-identical to the old literals.
  const cardFor = (group, i) => (Array.isArray(group) && group[i]) || {};
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
        <h2 className={styles.sectionHeading}>{t('gridHeading')}</h2>
        <div className={styles.grid}>
          {Array.isArray(list) && list.map((item, i) => (
            <div key={i} className={styles.card} style={{ '--i': i }}>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Service pages hub */}
        <div className={styles.section}>
          <div className={styles.sectionHeadingWrap}>
            <p className={`${v2t.eyebrow} ${v2t.eyebrowOnPaper}`}>{t('exploreKicker')}</p>
            <h2 className={styles.sectionHeading}>{t('exploreTitle')}</h2>
          </div>
          <div className={styles.grid}>
            {servicePages.map((page, i) => (
              <Link key={page.to} to={page.to} className={styles.linkCard} style={{ '--i': i }}>
                <h3 className={styles.linkTitle}>{cardFor(cardsServices, i).title}</h3>
                <p className={styles.linkDesc}>{cardFor(cardsServices, i).desc}</p>
                <span className={styles.linkCta}>{t('linkCta')} &rarr;</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Locations We Serve */}
        <div className={styles.section}>
          <div className={styles.sectionHeadingWrap}>
            <p className={`${v2t.eyebrow} ${v2t.eyebrowOnPaper}`}>{t('locationsKicker')}</p>
            <h2 className={styles.sectionHeading}>{t('locationsTitle')}</h2>
          </div>
          <div className={styles.grid}>
            {locationPages.map((page, i) => (
              <Link key={page.to} to={page.to} className={styles.linkCard} style={{ '--i': i }}>
                <h3 className={styles.linkTitle}>{cardFor(cardsLocations, i).title}</h3>
                <p className={styles.linkDesc}>{cardFor(cardsLocations, i).desc}</p>
                <span className={styles.linkCta}>{t('linkCta')} &rarr;</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Popular Routes */}
        <div className={styles.section}>
          <div className={styles.sectionHeadingWrap}>
            <h2 className={styles.sectionHeading}>{t('routesTitle')}</h2>
          </div>
          <div className={styles.grid}>
            {routePages.map((page, i) => (
              <Link key={page.to} to={page.to} className={styles.linkCard} style={{ '--i': i }}>
                <h3 className={styles.linkTitle}>{cardFor(cardsRoutes, i).title}</h3>
                <p className={styles.linkDesc}>{cardFor(cardsRoutes, i).desc}</p>
                <span className={styles.linkCta}>{t('linkCta')} &rarr;</span>
              </Link>
            ))}
          </div>
        </div>

        {/* EV & Tesla Services */}
        <div className={styles.section}>
          <div className={styles.sectionHeadingWrap}>
            <p className={`${v2t.eyebrow} ${v2t.eyebrowOnPaper}`}>{t('evKicker')}</p>
            <h2 className={styles.sectionHeading}>{t('evTitle')}</h2>
            <p className={styles.sectionLede}>{t('evLede')}</p>
          </div>
          <div className={styles.grid}>
            {evPages.map((page, i) => (
              <Link key={page.to} to={page.to} className={styles.linkCard} style={{ '--i': i }}>
                <h3 className={styles.linkTitle}>{cardFor(cardsEv, i).title}</h3>
                <p className={styles.linkDesc}>{cardFor(cardsEv, i).desc}</p>
                <span className={styles.linkCta}>{t('linkCta')} &rarr;</span>
              </Link>
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
