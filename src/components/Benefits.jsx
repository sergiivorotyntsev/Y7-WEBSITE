import { useTranslation } from 'react-i18next';
import ScrollReveal from './ScrollReveal';
import {
  QuoteIcon,
  TelegramIcon,
  ScalesIcon,
  DollarIcon,
  ShieldCheckIcon,
  DocumentIcon,
} from './icons';
import styles from './Benefits.module.css';

export default function Benefits() {
  const { t } = useTranslation('home');

  const ICON_COLOR = '#ffffff';
  const items = [
    { icon: <QuoteIcon size={22} color={ICON_COLOR} />,       title: t('benefits.quoteAnywhereTitle'),  desc: t('benefits.quoteAnywhereDesc') },
    { icon: <TelegramIcon size={22} color={ICON_COLOR} />,    title: t('benefits.realTimeTitle'),       desc: t('benefits.realTimeDesc') },
    { icon: <ScalesIcon size={22} color={ICON_COLOR} />,      title: t('benefits.transparentTitle'),    desc: t('benefits.transparentDesc') },
    { icon: <DollarIcon size={22} color={ICON_COLOR} />,      title: t('benefits.flexibleTitle'),       desc: t('benefits.flexibleDesc') },
    { icon: <ShieldCheckIcon size={22} color={ICON_COLOR} />, title: t('benefits.verifiedTitle'),       desc: t('benefits.verifiedDesc') },
    { icon: <DocumentIcon size={22} color={ICON_COLOR} />,    title: t('benefits.documentationTitle'),  desc: t('benefits.documentationDesc') },
  ];

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.kicker}>&#9670; {t('benefits.kicker')}</span>
        <h2 className={styles.title}>{t('benefits.title')}</h2>
      </div>
      <div className={styles.grid}>
        {items.map(({ icon, title, desc }, i) => (
          <ScrollReveal key={title} delay={i * 80} style={{ display: 'contents' }}>
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
