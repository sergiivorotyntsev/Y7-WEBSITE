import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import BreadcrumbSchema from '../components/BreadcrumbSchema';
import styles from './Services.module.css';
import btn from '../styles/buttons.module.css';

const servicePages = [
  { to: '/ship-my-car', title: 'Ship My Car', desc: 'Door-to-door auto transport for individuals. Open or enclosed carriers, status updates at every stage.' },
  { to: '/car-shipping-cost', title: 'Car Shipping Cost', desc: 'Understand pricing factors and get a transparent quote with no hidden fees.' },
  { to: '/enclosed-car-shipping', title: 'Enclosed Car Shipping', desc: 'Premium covered transport for luxury, classic, and high-value vehicles.' },
  { to: '/auction-car-shipping', title: 'Auction Car Shipping', desc: 'Pickup from Copart, IAAI, Manheim, and independent auctions nationwide.' },
  { to: '/copart-shipping', title: 'Copart Shipping', desc: 'Fast pickup from all 200+ Copart locations. Gate pass coordination included.' },
  { to: '/iaai-transport', title: 'IAA Transport', desc: 'Vehicle transport from IAA auction yards. Salvage and clean title vehicles.' },
  { to: '/manheim-transport', title: 'Manheim Transport', desc: 'Dealer auction vehicle shipping with volume pricing and recurring scheduling.' },
  { to: '/door-to-port-auto-transport', title: 'Door-to-Port Transport', desc: 'Deliver vehicles to any major US export port — Newark, Houston, Savannah, LA, Baltimore, Jacksonville.' },
  { to: '/dealer-auto-transport', title: 'Dealer Auto Transport', desc: 'B2B transport for dealerships. Volume pricing, auction pickup, dealer trades.' },
  { to: '/open-car-shipping', title: 'Open Car Shipping', desc: 'Standard multi-car hauler transport — the most affordable way to ship your vehicle.' },
  { to: '/salvage-car-shipping', title: 'Salvage & Non-Running', desc: 'Transport for salvage, inoperable, and non-running vehicles with specialized equipment.' },
  { to: '/state-to-state-car-shipping', title: 'State-to-State Shipping', desc: 'Interstate auto transport between all 50 US states. FMCSA-licensed broker.' },
  { to: '/auction-to-port-transport', title: 'Auction to Port', desc: 'Direct pipeline from US auction yards to export ports. Gate pass to port delivery.' },
];

const evPages = [
  { to: '/tesla-car-shipping', title: 'Tesla Shipping', desc: 'Specialized transport for Model S, 3, X, Y, and Cybertruck. Air suspension, transport mode, stainless steel handling expertise.' },
  { to: '/ev-auto-transport', title: 'Electric Vehicle Transport', desc: 'Nationwide EV shipping for Tesla, Rivian, Lucid, Ford Lightning, Porsche Taycan, Hummer EV, and more.' },
  { to: '/cybertruck-shipping', title: 'Cybertruck Shipping', desc: 'Heavy-duty carriers for the 6,600 lb Cybertruck. Stainless steel safe handling, enclosed options available.' },
  { to: '/electric-vehicle-port-delivery', title: 'EV Port Delivery', desc: 'Ship EVs from US auctions and dealers to export ports. Battery safety compliance, coordination with your freight forwarder for international shipping.' },
];

const locationPages = [
  { to: '/newton-auto-transport',      title: 'Newton, MA Auto Transport', desc: 'Our home base. Local broker service for all 13 Newton villages plus Wellesley, Brookline, Waltham, Watertown, Needham.' },
  { to: '/boston-car-shipping',        title: 'Boston Car Shipping',       desc: 'Greater Boston pickup and delivery. Cambridge, Somerville, Back Bay, Dorchester, Southie — carriers who know the city.' },
  { to: '/massachusetts-car-shipping', title: 'Massachusetts Car Shipping', desc: 'Statewide coverage. Boston metro, Western MA, Cape Cod, MetroWest. Copart Lowell and IAAI East Taunton pickups.' },
  { to: '/florida-car-shipping',       title: 'Florida Car Shipping',      desc: 'America\u2019s #1 destination. Miami, Tampa, Orlando, Jacksonville. Snowbird corridor expertise and port delivery.' },
  { to: '/new-jersey-auto-transport',  title: 'New Jersey Auto Transport', desc: 'Port Newark export gateway. Dealer-dense market. Route 287, Turnpike, Garden State Parkway carrier frequency.' },
  { to: '/texas-auto-transport',       title: 'Texas Auto Transport',      desc: 'Houston, Dallas, Austin, San Antonio. Port of Houston export coordination. Copart Houston + IAAI Dallas pickups.' },
];

const routePages = [
  { to: '/massachusetts-to-florida-car-shipping',   title: 'Massachusetts → Florida', desc: 'The #1 snowbird corridor. $750\u2013$1,050 open trailer, 5\u20137 days transit. Peak season Oct\u2013Jan.' },
  { to: '/new-jersey-to-florida-car-shipping',     title: 'New Jersey → Florida',    desc: 'Dealer trades and snowbird traffic. $600\u2013$900 range, 4\u20136 days transit. High volume corridor.' },
  { to: '/texas-to-newark-port-auto-transport',    title: 'Texas → Port Newark',     desc: 'Long-haul export corridor. Houston and Dallas to Port Newark, where your freight forwarder takes over for international shipping.' },
  { to: '/chicago-to-port-newark-car-shipping',    title: 'Chicago → Port Newark',   desc: 'Midwest export lane. Dealer trade and auction-to-port combined loads.' },
  { to: '/auction-to-port-transport',              title: 'Auction → Port',          desc: 'Copart and IAAI purchase → export port delivery. Gate pass coordination, flatbed for inoperables.' },
];

export default function Services() {
  const { t } = useTranslation('services');
  const { t: tCommon } = useTranslation('common');
  const navigate = useNavigate();
  const list = t('list', { returnObjects: true });

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
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.heroMicro}>&#9670; {t('heroKicker')}</span>
          <h1 className={styles.title}>{t('title')}</h1>
          <p className={styles.subtitle}>{t('subtitle')}</p>
        </div>
      </section>

      <div className={styles.bodyWrap}>
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
            <span className={styles.sectionMicro}>{t('exploreKicker')}</span>
            <h2 className={styles.sectionHeading}>{t('exploreTitle')}</h2>
          </div>
          <div className={styles.grid}>
            {servicePages.map((page, i) => (
              <Link key={page.to} to={page.to} className={styles.linkCard} style={{ '--i': i }}>
                <h3 className={styles.linkTitle}>{page.title}</h3>
                <p className={styles.linkDesc}>{page.desc}</p>
                <span className={styles.linkCta}>{t('linkCta')} &rarr;</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Locations We Serve */}
        <div className={styles.section}>
          <div className={styles.sectionHeadingWrap}>
            <span className={styles.sectionMicro}>&#9670; {t('locationsKicker')}</span>
            <h2 className={styles.sectionHeading}>{t('locationsTitle')}</h2>
          </div>
          <div className={styles.grid}>
            {locationPages.map((page, i) => (
              <Link key={page.to} to={page.to} className={styles.linkCard} style={{ '--i': i }}>
                <h3 className={styles.linkTitle}>{page.title}</h3>
                <p className={styles.linkDesc}>{page.desc}</p>
                <span className={styles.linkCta}>{t('linkCta')} &rarr;</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Popular Routes */}
        <div className={styles.section}>
          <div className={styles.sectionHeadingWrap}>
            <span className={styles.sectionMicro}>&#9670; {t('routesKicker')}</span>
            <h2 className={styles.sectionHeading}>{t('routesTitle')}</h2>
          </div>
          <div className={styles.grid}>
            {routePages.map((page, i) => (
              <Link key={page.to} to={page.to} className={styles.linkCard} style={{ '--i': i }}>
                <h3 className={styles.linkTitle}>{page.title}</h3>
                <p className={styles.linkDesc}>{page.desc}</p>
                <span className={styles.linkCta}>{t('linkCta')} &rarr;</span>
              </Link>
            ))}
          </div>
        </div>

        {/* EV & Tesla Services */}
        <div className={styles.section}>
          <div className={styles.sectionHeadingWrap}>
            <span className={styles.sectionMicro}>{t('evKicker')}</span>
            <h2 className={styles.sectionHeading}>{t('evTitle')}</h2>
            <p className={styles.sectionLede}>{t('evLede')}</p>
          </div>
          <div className={styles.grid}>
            {evPages.map((page, i) => (
              <Link key={page.to} to={page.to} className={styles.linkCard} style={{ '--i': i }}>
                <h3 className={styles.linkTitle}>{page.title}</h3>
                <p className={styles.linkDesc}>{page.desc}</p>
                <span className={styles.linkCta}>{t('linkCta')} &rarr;</span>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA strip */}
        <div className={styles.ctaStrip}>
          <h2 className={styles.ctaTitle}>{t('ctaTitle')}</h2>
          <p className={styles.ctaSubtitle}>{t('ctaSubtitle')}</p>
          <button
            onClick={() => navigate('/quote')}
            className={`${btn.btn} ${styles.ctaBtnLight}`}
          >
            {t('ctaButton')}
          </button>
        </div>
      </div>
    </div>
  );
}
