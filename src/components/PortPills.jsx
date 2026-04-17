import { useTranslation } from 'react-i18next';
import styles from './PortPills.module.css';

export default function PortPills() {
  const { t } = useTranslation('home');
  const ports = t('ports.list', { returnObjects: true });

  return (
    <div className={styles.wrap}>
      <h3 className={styles.title}>{t('ports.title')}</h3>
      <div className={styles.row}>
        {Array.isArray(ports) && ports.map(port => (
          <span key={port} className={styles.pill}>{port}</span>
        ))}
      </div>
    </div>
  );
}
