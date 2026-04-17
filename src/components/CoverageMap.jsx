import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './CoverageMap.module.css';

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

export default function CoverageMap() {
  const { t } = useTranslation('home');

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.kicker}>&#9670; {t('coverage.kicker')}</span>
        <h2 className={styles.title}>{t('coverage.title')}</h2>
      </div>
      <div className={styles.row}>
        {LOCATIONS.map(loc => (
          <Link key={loc.to} to={loc.to} className={styles.pill}>
            {loc.label}
          </Link>
        ))}
      </div>
      <div className={styles.row}>
        {ROUTES.map(rt => (
          <Link
            key={rt.to}
            to={rt.to}
            className={rt.badge ? styles.pillBadge : styles.pill}
          >
            {rt.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
