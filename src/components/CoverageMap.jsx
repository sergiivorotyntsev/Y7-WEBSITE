import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ScrollReveal from './ScrollReveal';
import VerificationStrip from './VerificationStrip';
import styles from './CoverageMap.module.css';
import v2s from '../styles/v2/surfaces.module.css';
import v2t from '../styles/v2/type.module.css';
import v2c from '../styles/v2/cards.module.css';

// DESIGN-V2-W2-T06: CoverageMap grew into the full Coverage manifest band. The
// SEO contract's non-negotiables all live here: every /locations/* and
// /routes/* internal link (below), the six port tiles as REAL links to
// /ports/* (was unlinked PortPills), and VerificationStrip's external
// authority links (FMCSA SAFER + Central Dispatch, E-E-A-T) inside the
// licensed-broker panel. H2/H3 texts unchanged.
const LOCATIONS = [
  { to: '/newton-auto-transport',         label: 'Newton, MA' },
  { to: '/boston-car-shipping',           label: 'Boston' },
  { to: '/massachusetts-car-shipping',    label: 'Massachusetts' },
  { to: '/florida-car-shipping',          label: 'Florida' },
  { to: '/new-jersey-auto-transport',     label: 'New Jersey' },
  { to: '/texas-auto-transport',          label: 'Texas' },
];

const ROUTES = [
  { to: '/massachusetts-to-florida-car-shipping', label: 'MA → FL' },
  { to: '/new-jersey-to-florida-car-shipping',    label: 'NJ → FL' },
  { to: '/auction-to-port-transport',             label: 'Auction → Port' },
  { to: '/state-to-state-car-shipping',           label: 'All 50 States', badge: true },
];

// Port codes map 1:1 to the six /ports/ pages (order matches ports.list i18n).
const PORTS = [
  { to: '/ports/newark',       code: 'NWK' },
  { to: '/ports/houston',      code: 'HOU' },
  { to: '/ports/savannah',     code: 'SAV' },
  { to: '/ports/baltimore',    code: 'BAL' },
  { to: '/ports/los-angeles',  code: 'LAX' },
  { to: '/ports/jacksonville', code: 'JAX' },
];

export default function CoverageMap() {
  const { t } = useTranslation('home');
  const portNames = t('ports.list', { returnObjects: true });
  // [WEBFIX2-T04a] locale-aware port links (same rule as Header.jsx / Home.jsx):
  // the six port pages exist in all four locales, and the localized home used
  // to send every port tile to the ENGLISH page - the localized port pages had
  // zero inbound links. Location/route pills stay EN: those pages have no twins.
  const { pathname } = useLocation();
  const localeMatch = pathname.match(/^\/(ua|pl|ru)(\/|$)/);
  const prefix = localeMatch ? `/${localeMatch[1]}` : '';
  // [WEBFIX2-T04b] the locale's own landing pages (unique content, not
  // translations) get a link row on the locale's home. home.json carries
  // coverage.intlLinks only for pl/ua/ru; EN renders nothing here.
  const intlLinks = t('coverage.intlLinks', { returnObjects: true });
  const intlRow = Array.isArray(intlLinks) ? intlLinks : [];

  return (
    <section className={v2s.manifest}>
      <div className={v2s.inner}>
        <ScrollReveal>
          <div className={styles.head}>
            <p className={`${v2t.eyebrow} ${v2t.eyebrowOnPaper}`}>{t('coverage.kicker')}</p>
            <h2 className={v2t.sectionDisplay}>{t('coverage.title')}</h2>
          </div>

          <div className={styles.columns}>
            <div>
              <h3 className={`${v2t.cardTitle} ${styles.portsTitle}`}>{t('ports.title')}</h3>
              <div className={styles.portGrid}>
                {PORTS.map((p, i) => (
                  <Link key={p.to} to={`${prefix}${p.to}`} className={styles.portCell}>
                    <span className={v2c.portCode}>{p.code}</span>
                    <span className={`${v2c.portName} ${styles.portCity}`}>
                      {Array.isArray(portNames) ? portNames[i] : ''}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Licensed-broker trust panel: USDOT/MC/$75K facts + external
                verification links (E-E-A-T) — folded VerificationStrip.
                BAND-T01: the single dark anchor of the cream band (board ground,
                no border — value contrast is the edge). */}
            <div className={styles.legalPanel}>
              <VerificationStrip stacked />
            </div>
          </div>

          <div className={styles.linkRows}>
            <div className={styles.row}>
              {LOCATIONS.map(loc => (
                <Link key={loc.to} to={loc.to} className={`${v2c.chipOnPaper} ${styles.pill}`}>
                  {loc.label}
                </Link>
              ))}
            </div>
            {intlRow.length > 0 && (
              <div className={styles.row}>
                {intlRow.map(item => (
                  <Link key={item.to} to={item.to} className={`${v2c.chipOnPaper} ${styles.pill}`}>
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
            <div className={styles.row}>
              {ROUTES.map(rt => (
                <Link
                  key={rt.to}
                  to={rt.to}
                  className={`${v2c.chipOnPaper} ${styles.pill} ${rt.badge ? styles.pillBadge : ''}`}
                >
                  {rt.label}
                </Link>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
