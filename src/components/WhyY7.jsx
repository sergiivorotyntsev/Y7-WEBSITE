import { useTranslation } from 'react-i18next';
import ScrollReveal from './ScrollReveal';
import { ShieldCheckIcon, VerifiedIcon, EyeIcon, MapPinIcon, GlobeIcon, ClockIcon } from './icons';
import styles from './WhyY7.module.css';

export default function WhyY7() {
  const { t } = useTranslation('home');

  const items = [
    { icon: <ShieldCheckIcon />, title: t('whyY7.licensedTitle'),     desc: t('whyY7.licensedDesc') },
    { icon: <VerifiedIcon />,    title: t('whyY7.verifiedTitle'),     desc: t('whyY7.verifiedDesc') },
    { icon: <EyeIcon />,         title: t('whyY7.transparentTitle'),  desc: t('whyY7.transparentDesc') },
    { icon: <MapPinIcon />,      title: t('whyY7.statusTitle'),       desc: t('whyY7.statusDesc') },
    { icon: <GlobeIcon />,       title: t('whyY7.multilingualTitle'), desc: t('whyY7.multilingualDesc') },
    { icon: <ClockIcon />,       title: t('whyY7.fastTitle'),         desc: t('whyY7.fastDesc') },
  ];

  return (
    <div>
      <div className={styles.header}>
        <span className={styles.micro}>{t('whyY7.kicker')}</span>
        <h2 className={styles.title}>{t('whyY7.title')}</h2>
      </div>
      <div className={styles.grid}>
        {items.map(({ icon, title, desc }, i) => (
          <ScrollReveal key={title} delay={i * 60} style={{ display: 'contents' }}>
            <div className={styles.item}>
              <span className={styles.iconWrap}>{icon}</span>
              <div className={styles.itemTitle}>{title}</div>
              <div className={styles.itemDesc}>{desc}</div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
