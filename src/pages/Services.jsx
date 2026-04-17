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
  { to: '/electric-vehicle-port-delivery', title: 'EV Port Delivery', desc: 'Ship EVs from US auctions and dealers to export ports. Battery safety compliance, international shipping coordination.' },
];

export default function Services() {
  const { t } = useTranslation('services');
  const navigate = useNavigate();
  const list = t('list', { returnObjects: true });

  return (
    <div className={styles.wrap}>
      <BreadcrumbSchema items={[{name:'Home',url:'/'},{name:'Services',url:'/services'}]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Auto Transport Brokerage",
        "provider": {"@type": "MovingCompany", "name": "Y7 Logistics"},
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
      <PageMeta title="Auto Transport Services" description="Auction pickup, dealer trades, port delivery, enclosed transport. Licensed broker with 100+ verified carriers." path="/services" />

      <h1 className={styles.title}>{t('title')}</h1>
      <p className={styles.subtitle}>{t('subtitle')}</p>

      <div className={styles.grid}>
        {Array.isArray(list) && list.map((item, i) => (
          <div key={i} className={styles.card}>
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.cardDesc}>{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Service pages hub */}
      <div className={styles.section}>
        <h2 className={styles.sectionHeading}>Explore Our Services</h2>
        <p className={styles.sectionLede}>Learn more about each service we offer</p>
        <div className={styles.grid}>
          {servicePages.map((page) => (
            <Link key={page.to} to={page.to} className={styles.linkCard}>
              <h3 className={styles.linkTitle}>{page.title}</h3>
              <p className={styles.linkDesc}>{page.desc}</p>
              <span className={styles.linkCta}>Learn more &rarr;</span>
            </Link>
          ))}
        </div>
      </div>

      {/* EV & Tesla Services */}
      <div className={styles.section}>
        <h2 className={styles.sectionHeading}>Electric Vehicle Transport</h2>
        <p className={styles.sectionLede}>Specialized carriers for Tesla, Rivian, Lucid, and every major EV brand</p>
        <div className={styles.grid}>
          {evPages.map((page) => (
            <Link key={page.to} to={page.to} className={styles.linkCard}>
              <h3 className={styles.linkTitle}>{page.title}</h3>
              <p className={styles.linkDesc}>{page.desc}</p>
              <span className={styles.linkCta}>Learn more &rarr;</span>
            </Link>
          ))}
        </div>
      </div>

      <div className={styles.ctaWrap}>
        <button onClick={() => navigate('/quote')} className={btn.btnAccent}>
          Get a Free Quote
        </button>
      </div>
    </div>
  );
}
