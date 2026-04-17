import { useParams, Link } from 'react-router-dom';
import PageMeta from '../../components/PageMeta';
import AuctionToPortWorkflow from '../../components/AuctionToPortWorkflow';
import { PORTS } from './portData';
import styles from './PortPage.module.css';
import btn from '../../styles/buttons.module.css';

export default function PortPage() {
  const { slug } = useParams();
  const port = PORTS[slug];

  if (!port) {
    return (
      <div className={styles.notFound}>
        <h1 className={styles.notFoundTitle}>Port Not Found</h1>
        <p className={styles.notFoundMsg}>
          The port page you are looking for does not exist.
        </p>
        <Link to="/exporters" className={`${btn.btnPrimary} ${styles.notFoundBtn}`}>
          View All Ports
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <PageMeta
        title={port.metaTitle}
        description={port.metaDesc}
        path={`/ports/${slug}`}
        i18n
      />

      {/* Hero */}
      <section className={styles.hero}>
        <span className={styles.heroKicker}>&#9670; Port Delivery</span>
        <h1 className={styles.title}>{port.name}</h1>
        <p className={styles.subtitle}>{port.fullName}</p>
        <p className={styles.location}>{port.city}, {port.state} {port.zip}</p>
        <div className={styles.credentials}>
          <span className={styles.credBadge}>USDOT #4427359</span>
          <span className={styles.credBadge}>MC #1741537</span>
        </div>
      </section>

      <div className={styles.body}>
        {/* About */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionMicro}>Overview</span>
            <h2 className={styles.sectionTitle}>About This Port</h2>
          </div>
          <p className={styles.bodyText}>
            {port.description} Y7 Logistics provides door-to-port auto transport to {port.name} with
            verified carriers. Whether you are shipping a single vehicle or managing bulk export
            operations, we coordinate pickup from any US location and deliver directly to the terminal.
          </p>
        </section>

        {/* Address & Gate Hours */}
        {(port.address || port.gateHours) && (
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionMicro}>Terminal</span>
              <h2 className={styles.sectionTitle}>Address &amp; Gate Hours</h2>
            </div>
            <div className={styles.infoCard}>
              {port.address && (
                <>
                  <div className={styles.infoLabel}>Terminal Address</div>
                  <div className={styles.infoValue}>{port.address}</div>
                </>
              )}
              {port.gateHours && (
                <>
                  <div className={styles.infoLabel}>Gate Hours</div>
                  <div className={styles.infoValue}>{port.gateHours}</div>
                </>
              )}
            </div>
          </section>
        )}

        {/* Popular Routes */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionMicro}>Transit Times</span>
            <h2 className={styles.sectionTitle}>Popular Routes to {port.name}</h2>
          </div>
          <div className={styles.routesGrid}>
            {port.routes.map((route, i) => (
              <div key={i} className={styles.routeCard} style={{ '--i': i }}>
                <div>
                  <div className={styles.routeFrom}>{route.from}</div>
                  <div className={styles.routeTo}>to {port.city}, {port.state}</div>
                </div>
                <div className={styles.routeDays}>
                  {route.days} {route.days === '1' ? 'day' : 'days'}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Documents */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionMicro}>Paperwork</span>
            <h2 className={styles.sectionTitle}>Documents Required</h2>
          </div>
          <div className={styles.infoCardMuted}>
            <ul className={styles.docsList}>
              {port.documents.map((doc, i) => (
                <li key={i}>{doc}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Storage Info */}
        {port.storageInfo && (
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionMicro}>Timing</span>
              <h2 className={styles.sectionTitle}>Storage &amp; Demurrage</h2>
            </div>
            <p className={styles.bodyText}>{port.storageInfo}</p>
          </section>
        )}

        {/* Shipping Destinations */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionMicro}>Export Routes</span>
            <h2 className={styles.sectionTitle}>Shipping Destinations</h2>
          </div>
          <p className={styles.bodyText}>
            Vehicles delivered to {port.name} are shipped to {port.destinations}. Ocean carriers
            at this terminal handle both Roll-on/Roll-off (RoRo) and containerized vehicle shipments.
            Contact us for guidance on which shipping method works best for your destination.
          </p>
        </section>

        {/* Auction-to-Port Workflow */}
        <AuctionToPortWorkflow />

        {/* Tips */}
        {port.tips && (
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionMicro}>Pro Tips</span>
              <h2 className={styles.sectionTitle}>Tips for {port.name}</h2>
            </div>
            <div className={styles.infoCard}>
              <p className={styles.bodyText}>{port.tips}</p>
            </div>
          </section>
        )}

        {/* CTA */}
        <div className={styles.ctaCard}>
          <h2 className={styles.ctaTitle}>Get a Port Delivery Quote</h2>
          <p className={styles.ctaSubtitle}>
            Door-to-port transport to {port.name}. Transparent pricing, verified carriers.
          </p>
          <Link
            to={`/?delivery_zip=${port.zip}#quote-section`}
            className={`${btn.btn} ${styles.ctaBtn}`}
          >
            Get Port Delivery Quote
          </Link>
        </div>

        {/* Company footer */}
        <div className={styles.companyFooter}>
          <p className={styles.companyName}>Y7 Logistics LLC</p>
          <p className={styles.companyDesc}>Licensed auto transport broker serving all US ports.</p>
          <div className={styles.companyIds}>USDOT #4427359 &middot; MC #1741537</div>
        </div>
      </div>
    </div>
  );
}
