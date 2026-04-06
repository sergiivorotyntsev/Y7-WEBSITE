import { useTranslation } from 'react-i18next';
import PageMeta from '../components/PageMeta';
import HreflangTags from '../components/HreflangTags';
import BreadcrumbSchema from '../components/BreadcrumbSchema';
import QuoteForm from '../components/QuoteForm';
import TransportComparison from '../components/TransportComparison';
import WhatHappensNext from '../components/WhatHappensNext';
import { colors, fonts } from '../theme';

export default function ShipMyCar() {
  const { t } = useTranslation('shipMycar');
  const steps = t('steps', { returnObjects: true });
  const faqs = t('faqs', { returnObjects: true });

  return (
    <div>
      <BreadcrumbSchema items={[{name:'Home',url:'/'},{name:'Ship My Car',url:'/ship-my-car'}]} />
      <PageMeta title="Ship My Car" description="Open and enclosed auto transport nationwide. VIN decode, real-time tracking, insured carriers." path="/ship-my-car" />
      <HreflangTags currentPath="/ship-my-car" hasPolishVersion hasUkrainianVersion hasRussianVersion />
      {/* Hero */}
      <section style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '60px 24px 40px',
        textAlign: 'center',
      }}>
        <h1 style={{
          fontFamily: fonts.serif,
          fontSize: 'clamp(28px, 4vw, 42px)',
          fontWeight: 700,
          color: colors.text,
          marginBottom: '12px',
        }}>
          {t('title')}
        </h1>
        <p style={{
          fontFamily: fonts.sans,
          fontSize: '15px',
          color: colors.textMuted,
          lineHeight: 1.6,
          maxWidth: '560px',
          margin: '0 auto',
        }}>
          {t('subtitle')}
        </p>
      </section>

      {/* How it works */}
      <section style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '0 24px 48px',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '24px',
        }}>
          {Array.isArray(steps) && steps.map((step, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: colors.accent,
                color: '#fff',
                fontFamily: fonts.serif,
                fontSize: '18px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px',
              }}>
                {i + 1}
              </div>
              <h3 style={{
                fontFamily: fonts.sans,
                fontSize: '15px',
                fontWeight: 600,
                color: colors.text,
                marginBottom: '6px',
              }}>
                {step.title}
              </h3>
              <p style={{
                fontFamily: fonts.sans,
                fontSize: '13px',
                color: colors.textMuted,
                lineHeight: 1.5,
              }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Factors */}
      <section style={{ maxWidth: '700px', margin: '0 auto', padding: '0 24px 48px' }}>
        <h2 style={{
          fontFamily: fonts.serif,
          fontSize: '22px',
          fontWeight: 700,
          color: colors.text,
          marginBottom: '16px',
        }}>
          What Determines Your Shipping Cost
        </h2>
        <p style={{
          fontFamily: fonts.sans,
          fontSize: '14px',
          color: colors.textMuted,
          lineHeight: 1.7,
        }}>
          {t('pricingFactors')}
        </p>
      </section>

      {/* Peak Season */}
      <section style={{ maxWidth: '700px', margin: '0 auto', padding: '0 24px 48px' }}>
        <h2 style={{
          fontFamily: fonts.serif,
          fontSize: '22px',
          fontWeight: 700,
          color: colors.text,
          marginBottom: '16px',
        }}>
          Seasonal Pricing Patterns
        </h2>
        <p style={{
          fontFamily: fonts.sans,
          fontSize: '14px',
          color: colors.textMuted,
          lineHeight: 1.7,
        }}>
          {t('peakSeason')}
        </p>
      </section>

      {/* Preparation Checklist */}
      <section style={{ maxWidth: '700px', margin: '0 auto', padding: '0 24px 48px' }}>
        <h2 style={{
          fontFamily: fonts.serif,
          fontSize: '22px',
          fontWeight: 700,
          color: colors.text,
          marginBottom: '16px',
        }}>
          How to Prepare Your Car for Shipping
        </h2>
        <ul style={{
          paddingLeft: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}>
          {Array.isArray(t('prepChecklist', { returnObjects: true })) &&
            t('prepChecklist', { returnObjects: true }).map((item, i) => (
              <li key={i} style={{
                fontFamily: fonts.sans,
                fontSize: '14px',
                color: colors.textMuted,
                lineHeight: 1.7,
              }}>
                {item}
              </li>
            ))}
        </ul>
      </section>

      {/* What to Expect at Pickup */}
      <section style={{ maxWidth: '700px', margin: '0 auto', padding: '0 24px 48px' }}>
        <h2 style={{
          fontFamily: fonts.serif,
          fontSize: '22px',
          fontWeight: 700,
          color: colors.text,
          marginBottom: '16px',
        }}>
          What to Expect at Pickup
        </h2>
        <p style={{
          fontFamily: fonts.sans,
          fontSize: '14px',
          color: colors.textMuted,
          lineHeight: 1.7,
        }}>
          {t('pickupProcess')}
        </p>
      </section>

      {/* What to Expect at Delivery */}
      <section style={{ maxWidth: '700px', margin: '0 auto', padding: '0 24px 48px' }}>
        <h2 style={{
          fontFamily: fonts.serif,
          fontSize: '22px',
          fontWeight: 700,
          color: colors.text,
          marginBottom: '16px',
        }}>
          What to Expect at Delivery
        </h2>
        <p style={{
          fontFamily: fonts.sans,
          fontSize: '14px',
          color: colors.textMuted,
          lineHeight: 1.7,
        }}>
          {t('deliveryProcess')}
        </p>
      </section>

      {/* Insurance */}
      <section style={{ maxWidth: '700px', margin: '0 auto', padding: '0 24px 48px' }}>
        <div style={{
          background: '#FFF8F5',
          borderLeft: `4px solid ${colors.accent}`,
          borderRadius: '0 12px 12px 0',
          padding: '24px 28px',
        }}>
          <h3 style={{
            fontFamily: fonts.sans,
            fontSize: '15px',
            fontWeight: 700,
            color: colors.text,
            marginBottom: '10px',
          }}>
            Insurance Coverage During Transport
          </h3>
          <p style={{
            fontFamily: fonts.sans,
            fontSize: '13px',
            color: colors.textMuted,
            lineHeight: 1.7,
          }}>
            {t('insuranceInfo')}
          </p>
        </div>
      </section>

      {/* Open vs Enclosed Comparison */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px 48px' }}>
        <TransportComparison />
      </section>

      {/* BOL Inspection Notice */}
      <section style={{
        maxWidth: '700px',
        margin: '0 auto',
        padding: '0 24px 48px',
      }}>
        <div style={{
          background: '#FFF8F5',
          borderLeft: `4px solid ${colors.accent}`,
          borderRadius: '0 12px 12px 0',
          padding: '24px 28px',
        }}>
          <h3 style={{
            fontFamily: fonts.sans,
            fontSize: '15px',
            fontWeight: 700,
            color: colors.text,
            marginBottom: '10px',
          }}>
            {t('bol.title')}
          </h3>
          <p style={{
            fontFamily: fonts.sans,
            fontSize: '13px',
            color: colors.textMuted,
            lineHeight: 1.7,
          }}>
            {t('bol.text')}
          </p>
        </div>
      </section>

      {/* Quote form */}
      <section id="quote-section" style={{ padding: '48px 24px', background: colors.bgMuted }}>
        <h2 style={{
          fontFamily: fonts.serif,
          fontSize: '24px',
          fontWeight: 700,
          color: colors.text,
          textAlign: 'center',
          marginBottom: '8px',
        }}>
          {t('quoteTitle')}
        </h2>
        <p style={{
          fontFamily: fonts.sans,
          fontSize: '14px',
          color: colors.textMuted,
          textAlign: 'center',
          marginBottom: '28px',
        }}>
          {t('quoteSubtitle')}
        </p>
        <QuoteForm />
      </section>

      {/* What Happens Next */}
      <WhatHappensNext />

      {/* FAQ */}
      <section style={{
        maxWidth: '700px',
        margin: '0 auto',
        padding: '60px 24px 80px',
      }}>
        <h2 style={{
          fontFamily: fonts.serif,
          fontSize: '24px',
          fontWeight: 700,
          color: colors.text,
          textAlign: 'center',
          marginBottom: '32px',
        }}>
          {t('faqTitle')}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {Array.isArray(faqs) && faqs.map((faq, i) => (
            <div key={i} style={{
              background: colors.bgCard,
              border: `1px solid ${colors.border}`,
              borderRadius: '12px',
              padding: '20px',
            }}>
              <h3 style={{
                fontFamily: fonts.sans,
                fontSize: '15px',
                fontWeight: 600,
                color: colors.text,
                marginBottom: '8px',
              }}>
                {faq.q}
              </h3>
              <p style={{
                fontFamily: fonts.sans,
                fontSize: '14px',
                color: colors.textMuted,
                lineHeight: 1.6,
              }}>
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
