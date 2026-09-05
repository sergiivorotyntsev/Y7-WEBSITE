import { useParams, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageMeta from '../../components/PageMeta';
import BreadcrumbSchema from '../../components/BreadcrumbSchema';
import AuctionToPortWorkflow from '../../components/AuctionToPortWorkflow';
import { PORTS } from './portData';
import styles from './PortPage.module.css';
import btn from '../../styles/buttons.module.css';
import { withAttribution } from '../../utils/attribution';
import useAttributionSearch from '../../hooks/useAttributionSearch';

const RELATED_BY_PORT = {
  newark: [
    { to: '/new-jersey-auto-transport', label: 'New Jersey Auto Transport services' },
    { to: '/auction-to-port-transport', label: 'Auction-to-port shipping workflow' },
    { to: '/new-jersey-to-florida-car-shipping', label: 'NJ to Florida corridor' },
    { to: '/door-to-port-auto-transport', label: 'Door-to-port transport overview' },
  ],
  houston: [
    { to: '/dallas-to-port-houston-auto-transport', label: 'Dallas to Port Houston corridor' },
    { to: '/texas-auto-transport', label: 'Texas auto transport services' },
    { to: '/texas-to-newark-port-auto-transport', label: 'TX to Port Newark corridor' },
    { to: '/auction-to-port-transport', label: 'Auction-to-port shipping workflow' },
    { to: '/door-to-port-auto-transport', label: 'Door-to-port transport overview' },
  ],
  savannah: [
    { to: '/atlanta-to-savannah-port-auto-transport', label: 'Atlanta to Savannah port corridor' },
    { to: '/florida-car-shipping', label: 'Florida car shipping services' },
    { to: '/auction-to-port-transport', label: 'Auction-to-port shipping workflow' },
    { to: '/door-to-port-auto-transport', label: 'Door-to-port transport overview' },
    { to: '/state-to-state-car-shipping', label: 'State-to-state shipping' },
  ],
  'los-angeles': [
    { to: '/state-to-state-car-shipping', label: 'State-to-state shipping' },
    { to: '/enclosed-car-shipping', label: 'Enclosed car shipping' },
    { to: '/auction-to-port-transport', label: 'Auction-to-port shipping workflow' },
    { to: '/door-to-port-auto-transport', label: 'Door-to-port transport overview' },
  ],
  baltimore: [
    { to: '/state-to-state-car-shipping', label: 'State-to-state shipping' },
    { to: '/auction-to-port-transport', label: 'Auction-to-port shipping workflow' },
    { to: '/door-to-port-auto-transport', label: 'Door-to-port transport overview' },
    { to: '/new-jersey-auto-transport', label: 'New Jersey auto transport' },
  ],
  jacksonville: [
    { to: '/florida-to-jacksonville-port-car-shipping', label: 'Florida auctions to JAXPORT corridor' },
    { to: '/florida-car-shipping', label: 'Florida car shipping services' },
    { to: '/massachusetts-to-florida-car-shipping', label: 'Massachusetts to Florida corridor' },
    { to: '/new-jersey-to-florida-car-shipping', label: 'New Jersey to Florida corridor' },
    { to: '/auction-to-port-transport', label: 'Auction-to-port shipping workflow' },
  ],
};

export default function PortPage() {
  const { slug } = useParams();
  const { t } = useTranslation('ports');
  const port = PORTS[slug];
  // [WEBFIX-T04] locale prefix from the URL (same rule as ContextualCTA), so
  // the localized port pages link to their own locale's pages.
  const { pathname } = useLocation();
  const lm = pathname.match(/^\/(ua|pl|ru)(\/|$)/);
  const prefix = lm ? `/${lm[1]}` : '';
  // [WEBFIX-T07] live query after hydration, for the static CTA href below.
  const attributionSearch = useAttributionSearch();

  if (!port) {
    return (
      <div className={styles.notFound}>
        <h1 className={styles.notFoundTitle}>{t('labels.notFoundTitle')}</h1>
        <p className={styles.notFoundMsg}>
          {t('labels.notFoundMsg')}
        </p>
        <Link to="/exporters" className={`${btn.btnPrimary} ${styles.notFoundBtn}`}>
          {t('labels.notFoundCta')}
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <PageMeta
        title={t(`${slug}.metaTitle`)}
        description={t(`${slug}.metaDesc`)}
        path={`/ports/${slug}`}
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Services', url: '/services' },
        { name: 'Port Delivery', url: '/exporters' },
        { name: port.name, url: `/ports/${slug}` },
      ]} />

      {/* Hero */}
      <section className={styles.hero}>
        <span className={styles.heroKicker}>&#9670; {t('labels.heroKicker')}</span>
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
            <span className={styles.sectionMicro}>{t('labels.overviewMicro')}</span>
            <h2 className={styles.sectionTitle}>{t('labels.aboutPort')}</h2>
          </div>
          <p className={styles.bodyText}>
            {t(`${slug}.description`)} {t('labels.aboutBody', { name: port.name })}
          </p>
        </section>

        {/* Address & Gate Hours */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionMicro}>{t('labels.terminalMicro')}</span>
            <h2 className={styles.sectionTitle}>{t('labels.addressGateHours')}</h2>
          </div>
          <div className={styles.infoCard}>
            {port.address && (
              <>
                <div className={styles.infoLabel}>{t('labels.terminalAddress')}</div>
                <div className={styles.infoValue}>{port.address}</div>
              </>
            )}
            <div className={styles.infoLabel}>{t('labels.gateHours')}</div>
            <div className={styles.infoValue}>{t(`${slug}.gateHours`)}</div>
          </div>
        </section>

        {/* Popular Routes */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionMicro}>{t('labels.transitTimesMicro')}</span>
            <h2 className={styles.sectionTitle}>{t('labels.popularRoutes', { name: port.name })}</h2>
          </div>
          <div className={styles.routesGrid}>
            {port.routes.map((route, i) => (
              <div key={i} className={styles.routeCard} style={{ '--i': i }}>
                <div>
                  <div className={styles.routeFrom}>{route.from}</div>
                  <div className={styles.routeTo}>{t('labels.routeTo')} {port.city}, {port.state}</div>
                </div>
                <div className={styles.routeDays}>
                  {route.days} {route.days === '1' ? t('labels.day') : t('labels.days')}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Documents */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionMicro}>{t('labels.paperworkMicro')}</span>
            <h2 className={styles.sectionTitle}>{t('labels.documentsRequired')}</h2>
          </div>
          <div className={styles.infoCardMuted}>
            <ul className={styles.docsList}>
              {t(`${slug}.documents`, { returnObjects: true }).map((doc, i) => (
                <li key={i}>{doc}</li>
              ))}
            </ul>
            {/* [WEBFIX-T04] the one export document Y7 itself issues, linked from
                the paperwork context where an exporter is already reading. */}
            <p className={styles.bodyText}>
              {t('labels.coNote')}{' '}
              <Link to={`${prefix}/certificate-of-origin`} className={styles.relatedLink}>
                {t('labels.coLink')} &rarr;
              </Link>
            </p>
          </div>
        </section>

        {/* Storage Info */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionMicro}>{t('labels.timingMicro')}</span>
            <h2 className={styles.sectionTitle}>{t('labels.storageDemurrage')}</h2>
          </div>
          <p className={styles.bodyText}>{t(`${slug}.storageInfo`)}</p>
        </section>

        {/* Shipping Destinations */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionMicro}>{t('labels.exportRoutesMicro')}</span>
            <h2 className={styles.sectionTitle}>{t('labels.shippingDestinations')}</h2>
          </div>
          <p className={styles.bodyText}>
            {t('labels.destinationsBody', { name: port.name, destinations: t(`${slug}.destinations`) })}
          </p>
        </section>

        {/* Auction-to-Port Workflow */}
        <AuctionToPortWorkflow />

        {/* Tips */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionMicro}>{t('labels.proTipsMicro')}</span>
            <h2 className={styles.sectionTitle}>{t('labels.tipsFor', { name: port.name })}</h2>
          </div>
          <div className={styles.infoCard}>
            <p className={styles.bodyText}>{t(`${slug}.tips`)}</p>
          </div>
        </section>

        {/* Related Services */}
        {RELATED_BY_PORT[slug] && (
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionMicro}>{t('labels.relatedMicro')}</span>
              <h2 className={styles.sectionTitle}>{t('labels.relatedServices')}</h2>
            </div>
            <ul className={styles.relatedList}>
              {RELATED_BY_PORT[slug].map((link, i) => (
                <li key={i}>
                  <Link to={link.to} className={styles.relatedLink}>
                    {link.label} &rarr;
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* CTA */}
        <div className={styles.ctaCard}>
          <h2 className={styles.ctaTitle}>{t('labels.ctaTitle')}</h2>
          <p className={styles.ctaSubtitle}>
            {t('labels.ctaSubtitle', { name: port.name })}
          </p>
          {/* [WEBFIX-T07] was `/?delivery_zip=...#quote-section`: the home page never
              read the parameter (24 parametric copies of "/" for nothing) and the
              locale was dropped. /quote DOES read delivery_zip (QuoteForm prefill),
              carries a self-canonical, and the campaign parameters ride along
              (door 4 of 4, see utils/attribution.js). */}
          <Link
            to={`${withAttribution(`${prefix}/quote`, new URLSearchParams({ delivery_zip: port.zip }), attributionSearch)}#top`}
            className={`${btn.btn} ${styles.ctaBtn}`}
          >
            {t('labels.ctaButton')}
          </Link>
        </div>

        {/* Company footer */}
        <div className={styles.companyFooter}>
          <p className={styles.companyName}>Y7 Logistics</p>
          <p className={styles.companyDesc}>{t('labels.companyDesc')}</p>
          <div className={styles.companyIds}>USDOT #4427359 &middot; MC #1741537</div>
        </div>
      </div>
    </div>
  );
}
