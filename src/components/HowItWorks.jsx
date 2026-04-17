import { useTranslation } from 'react-i18next';
import { ClipboardIcon, DollarIcon, HandshakeIcon, TruckIcon, CheckIcon } from './icons';
import styles from './HowItWorks.module.css';

export default function HowItWorks() {
  const { t } = useTranslation('home');

  const steps = [
    { icon: <ClipboardIcon size={14} />, title: t('howItWorks.steps.submitTitle'),    desc: t('howItWorks.steps.submitDesc'),    stat: t('howItWorks.steps.submitStat') },
    { icon: <DollarIcon size={14} />,    title: t('howItWorks.steps.priceTitle'),     desc: t('howItWorks.steps.priceDesc'),     stat: t('howItWorks.steps.priceStat') },
    { icon: <HandshakeIcon size={14} />, title: t('howItWorks.steps.signTitle'),      desc: t('howItWorks.steps.signDesc'),      stat: t('howItWorks.steps.signStat') },
    { icon: <TruckIcon size={14} />,     title: t('howItWorks.steps.carrierTitle'),   desc: t('howItWorks.steps.carrierDesc'),   stat: t('howItWorks.steps.carrierStat') },
    { icon: <CheckIcon size={14} />,     title: t('howItWorks.steps.deliveredTitle'), desc: t('howItWorks.steps.deliveredDesc'), stat: t('howItWorks.steps.deliveredStat') },
  ];

  return (
    <div className={styles.wrap}>
      <div className={styles.steps}>
        {steps.map((step, i) => (
          <div key={step.title} className={styles.step} style={{ '--i': i }}>
            <div className={styles.numWrap}>
              <div className={styles.num}>
                {String(i + 1).padStart(2, '0')}
                <span className={styles.numIconOverlay}>{step.icon}</span>
              </div>
            </div>
            <div className={styles.content}>
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.desc}>{step.desc}</p>
              <span className={styles.stat}>{step.stat}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
