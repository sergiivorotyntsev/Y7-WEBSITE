import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import BreadcrumbSchema from '../components/BreadcrumbSchema';
import MoneyPageSchema from '../components/MoneyPageSchema';
import ContextualCTA from '../components/ContextualCTA';
import styles from './Dealers.module.css';
import btn from '../styles/buttons.module.css';

export default function Dealers() {
  const { t } = useTranslation('dealers');
  const { t: tCommon } = useTranslation('common');
  const navigate = useNavigate();
  const benefits = t('benefits', { returnObjects: true });
  const models = t('pricing.models', { returnObjects: true });
  const tiers = t('pricing.tiers', { returnObjects: true });
  const timeline = t('timeline', { returnObjects: true });
  const volumeTable = t('volumeTable', { returnObjects: true });
  const dealerFeatures = t('dealerFeatures', { returnObjects: true });
  const trustSignals = t('trustSignals', { returnObjects: true });
  const dealerFaq = t('dealerFaq', { returnObjects: true });
  const timelineSteps = timeline && timeline.steps ? timeline.steps : [];
  const volumeRows = volumeTable && volumeTable.rows ? volumeTable.rows : [];
  const featureItems = dealerFeatures && dealerFeatures.items ? dealerFeatures.items : [];
  const trustItems = trustSignals && trustSignals.items ? trustSignals.items : [];
  const faqItems = dealerFaq && dealerFaq.items ? dealerFaq.items : [];

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

        {/* Timeline — Day 1 to Day 10 onboarding cadence */}
        {timeline && timelineSteps.length > 0 && (
          <section className={styles.timeline}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionMicro}>&#9670; {timeline.kicker}</span>
              <h2 className={styles.sectionHeading}>{timeline.title}</h2>
            </div>
            <ol className={styles.timelineList}>
              {timelineSteps.map((step, i) => (
                <li key={i} className={styles.timelineItem}>
                  <span className={styles.timelineDay}>{step.day}</span>
                  <div>
                    <h3 className={styles.timelineTitle}>{step.title}</h3>
                    <p className={styles.timelineDesc}>{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* Volume pricing table */}
        {volumeTable && volumeRows.length > 0 && (
          <section className={styles.volumeSection}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionMicro}>&#9670; {volumeTable.kicker}</span>
              <h2 className={styles.sectionHeading}>{volumeTable.title}</h2>
            </div>
            <div className={styles.volumeTableWrap}>
              <table className={styles.volumeTable}>
                <thead>
                  <tr>
                    <th>{volumeTable.headerVolume}</th>
                    <th>{volumeTable.headerTier}</th>
                    <th>{volumeTable.headerDiscount}</th>
                    <th>{volumeTable.headerPerk}</th>
                  </tr>
                </thead>
                <tbody>
                  {volumeRows.map((row, i) => (
                    <tr key={i} className={i === 3 ? styles.volumeRowHighlight : ''}>
                      <td className={styles.volumeCellVolume}>{row.volume}</td>
                      <td>{row.tier}</td>
                      <td className={styles.volumeCellDiscount}>{row.discount}</td>
                      <td>{row.perk}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={styles.volumeFootnote}>{volumeTable.footnote}</p>
          </section>
        )}

        {/* Dealer features grid */}
        {dealerFeatures && featureItems.length > 0 && (
          <section className={styles.featuresSection}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionMicro}>&#9670; {dealerFeatures.kicker}</span>
              <h2 className={styles.sectionHeading}>{dealerFeatures.title}</h2>
            </div>
            <div className={styles.featuresGrid}>
              {featureItems.map((f, i) => (
                <div key={i} className={styles.featureItem}>
                  <h3 className={styles.featureTitle}>{f.title}</h3>
                  <p className={styles.featureDesc}>{f.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Trust signals */}
        {trustSignals && trustItems.length > 0 && (
          <section className={styles.trustSection}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionMicro}>&#9670; {trustSignals.kicker}</span>
              <h2 className={styles.sectionHeading}>{trustSignals.title}</h2>
            </div>
            <div className={styles.trustGrid}>
              {trustItems.map((item, i) => (
                <div key={i} className={styles.trustItem}>
                  <span className={styles.trustLabel}>{item.label}</span>
                  <span className={styles.trustValue}>{item.value}</span>
                  {item.link && item.linkLabel && (
                    <a href={item.link} className={styles.trustLink} target="_blank" rel="noopener noreferrer">
                      {item.linkLabel} &rarr;
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contextual CTA to exporters */}
        <ContextualCTA variant="card" to="/exporters" intlKey="exporters" tone="amber" />

        {/* Dealer FAQ */}
        {dealerFaq && faqItems.length > 0 && (
          <section className={styles.faqSection}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionMicro}>&#9670; {dealerFaq.kicker}</span>
              <h2 className={styles.sectionHeading}>{dealerFaq.title}</h2>
            </div>
            <div className={styles.faqList}>
              {faqItems.map((item, i) => (
                <details key={i} className={styles.faqItem}>
                  <summary className={styles.faqSummary}>
                    <span>{item.q}</span>
                    <span className={styles.faqChevron} aria-hidden="true">&#9662;</span>
                  </summary>
                  <p className={styles.faqAnswer}>{item.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

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
