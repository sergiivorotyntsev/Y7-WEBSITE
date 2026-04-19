import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import BreadcrumbSchema from '../components/BreadcrumbSchema';
import MoneyPageSchema from '../components/MoneyPageSchema';
import styles from './Dealers.module.css';
import btn from '../styles/buttons.module.css';

export default function Dealers() {
  const { t } = useTranslation('dealers');
  const { t: tCommon } = useTranslation('common');
  const navigate = useNavigate();
  const benefits = t('benefits', { returnObjects: true });
  const models = t('pricing.models', { returnObjects: true });
  const tiers = t('pricing.tiers', { returnObjects: true });

  return (
    <div className={styles.wrap}>
      <BreadcrumbSchema items={[{name:'Home',url:'/'},{name:'Dealers',url:'/dealers'}]} />
      <MoneyPageSchema pageType="dealers" />
      <PageMeta title={tCommon('meta.dealersTitle')} description={tCommon('meta.dealersDescription')} path="/dealers" />

      {/* Hero */}
      <section className={styles.hero}>
        <span className={styles.heroMicro}>&#9670; {t('hero.kicker')}</span>
        <h1 className={styles.title}>{t('title')}</h1>
        <p className={styles.subtitle}>{t('subtitle')}</p>
        <div className={styles.heroTrust}>
          <span className={styles.heroTrustItem}>&#x2713; {t('hero.trust1')}</span>
          <span className={styles.heroTrustDot} aria-hidden="true">&middot;</span>
          <span className={styles.heroTrustItem}>&#x2713; {t('hero.trust2')}</span>
          <span className={styles.heroTrustDot} aria-hidden="true">&middot;</span>
          <span className={styles.heroTrustItem}>&#x2713; {t('hero.trust3')}</span>
        </div>
      </section>

      <div className={styles.body}>
        {/* Benefits — icon list, no card borders */}
        <div className={styles.benefitsGrid}>
          {Array.isArray(benefits) && benefits.map((item, i) => (
            <div key={i} className={styles.benefit}>
              <div className={styles.benefitIcon}>{String(i + 1).padStart(2, '0')}</div>
              <div className={styles.benefitBody}>
                <h3 className={styles.benefitTitle}>{item.title}</h3>
                <p className={styles.benefitDesc}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Models */}
        <div className={styles.pricingSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionMicro}>Pricing</span>
            <h2 className={styles.sectionHeading}>{t('pricing.title')}</h2>
          </div>
          <div className={styles.pricingGrid}>
            {Array.isArray(models) && models.map((model, i) => (
              <div
                key={i}
                className={`${styles.pricingCard} ${i === 0 ? styles.pricingCardPopular : ''}`}
              >
                {i === 0 && <div className={styles.popularBadge}>{t('pricing.popularBadge')}</div>}
                <h3 className={styles.modelTitle}>{model.title}</h3>
                <p className={styles.modelDesc}>{model.desc}</p>
              </div>
            ))}
          </div>

          {/* Volume Discount Tiers — clean table */}
          <h3 className={styles.subHeading}>{t('pricing.volumeTitle')}</h3>
          <div className={styles.tierTable}>
            <div className={styles.tierHead}>
              <div>{t('pricing.colVolume')}</div>
              <div>{t('pricing.colTier')}</div>
              <div>{t('pricing.colDiscount')}</div>
              <div>{t('pricing.colPerk')}</div>
            </div>
            {Array.isArray(tiers) && tiers.map((tier, i) => (
              <div
                key={i}
                className={`${styles.tierRow} ${i === 3 ? styles.tierRowHighlighted : ''}`}
              >
                <div className={styles.tierVolume}>{tier.volume}</div>
                <div className={styles.tierLabel}>{tier.label}</div>
                <div className={styles.tierDiscount}>{tier.discount}</div>
                <div className={styles.tierPerk}>{tier.perk}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA strip */}
        <div className={styles.cta}>
          <h2 className={styles.ctaTitle}>{t('ctaTitle')}</h2>
          <p className={styles.ctaSubtitle}>{t('ctaSubtitle')}</p>
          <button
            onClick={() => navigate('/dealer-quote')}
            className={`${btn.btn} ${styles.ctaBtnLight}`}
          >
            {t('ctaButton')}
          </button>
        </div>

        {/* Cross-links */}
        <div className={styles.crosslinks}>
          <span className={styles.crosslinksTitle}>{t('crosslinks.title')}</span>
          <div className={styles.crosslinksRow}>
            <Link to="/dealer-auto-transport" className={styles.crosslink}>{t('crosslinks.deepDive')} &rarr;</Link>
            <Link to="/dealer-quote" className={styles.crosslink}>{t('crosslinks.quote')} &rarr;</Link>
            <Link to="/exporters" className={styles.crosslink}>{t('crosslinks.exporters')} &rarr;</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
