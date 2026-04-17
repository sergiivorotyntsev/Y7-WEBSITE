import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import BreadcrumbSchema from '../components/BreadcrumbSchema';
import styles from './Dealers.module.css';
import btn from '../styles/buttons.module.css';

export default function Dealers() {
  const { t } = useTranslation('dealers');
  const navigate = useNavigate();
  const benefits = t('benefits', { returnObjects: true });
  const models = t('pricing.models', { returnObjects: true });
  const tiers = t('pricing.tiers', { returnObjects: true });

  return (
    <div className={styles.wrap}>
      <BreadcrumbSchema items={[{name:'Home',url:'/'},{name:'Dealers',url:'/dealers'}]} />
      <PageMeta title="For Auto Dealers" description="Volume auto transport for dealerships. Fixed pricing, dedicated dispatcher, auction pickups." path="/dealers" />

      <h1 className={styles.title}>{t('title')}</h1>
      <p className={styles.subtitle}>{t('subtitle')}</p>

      <div className={styles.benefitsGrid}>
        {Array.isArray(benefits) && benefits.map((item, i) => (
          <div key={i} className={styles.benefit}>
            <h3 className={styles.benefitTitle}>{item.title}</h3>
            <p className={styles.benefitDesc}>{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Pricing Models */}
      <div className={styles.pricingSection}>
        <h2 className={styles.sectionHeading}>{t('pricing.title')}</h2>
        <div className={styles.pricingGrid}>
          {Array.isArray(models) && models.map((model, i) => (
            <div
              key={i}
              className={`${styles.pricingCard} ${i === 0 ? styles.pricingCardPopular : ''}`}
            >
              {i === 0 && <div className={styles.popularBadge}>Most Popular</div>}
              <h3 className={styles.modelTitle}>{model.title}</h3>
              <p className={styles.modelDesc}>{model.desc}</p>
            </div>
          ))}
        </div>

        {/* Volume Discount Tiers */}
        <h3 className={styles.subHeading}>{t('pricing.volumeTitle')}</h3>
        <div className={styles.tiersGrid}>
          {Array.isArray(tiers) && tiers.map((tier, i) => (
            <div
              key={i}
              className={`${styles.tier} ${i === 3 ? styles.tierHighlighted : ''}`}
            >
              <div className={styles.tierVolume}>{tier.volume}</div>
              <div className={styles.tierLabel}>{tier.label}</div>
              <div className={styles.tierDiscount}>{tier.discount}</div>
              <div className={styles.tierPerk}>{tier.perk}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className={styles.cta}>
        <h2 className={styles.ctaTitle}>{t('ctaTitle')}</h2>
        <p className={styles.ctaSubtitle}>{t('ctaSubtitle')}</p>
        <button onClick={() => navigate('/dealer-quote')} className={btn.btnAccent}>
          {t('ctaButton')}
        </button>
      </div>
    </div>
  );
}
