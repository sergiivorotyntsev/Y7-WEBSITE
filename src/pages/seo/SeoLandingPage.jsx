import { Link } from 'react-router-dom';
import PageMeta from '../../components/PageMeta';
import RelatedGuides from '../../components/RelatedGuides';
import { RELATED_GUIDES } from '../../data/relatedGuides';
import { colors, fonts, button as btnStyles } from '../../theme';

/**
 * SeoLandingPage — reusable template for SEO landing pages.
 *
 * Props:
 *   meta        { title, description, path }
 *   heading     H1 text
 *   intro       Intro paragraph
 *   whenNeeded  [string]  "When you need this" use cases
 *   steps       [{ title, desc }]  "How it works"
 *   requirements [string]  "What you need"
 *   capabilities [string]  "Our capabilities"
 *   faqs        [{ q, a }]
 *   ctaLabel    CTA button label (default "Get a Free Quote")
 *   ctaTo       CTA link target (default "/quote")
 *   related     [{ label, to }]  related page links
 */
export default function SeoLandingPage({
  meta, heading, intro, whenNeeded, steps, requirements, capabilities, faqs,
  ctaLabel = 'Get a Free Quote', ctaTo = '/quote', related = [], children,
}) {
  const schemas = [];

  // BreadcrumbList schema
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.y7agency.com/' },
      { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://www.y7agency.com/services' },
      { '@type': 'ListItem', position: 3, name: heading, item: `https://www.y7agency.com${meta.path}` },
    ],
  });

  // FAQPage schema
  if (faqs && faqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }

  // Service schema
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: heading,
    description: meta.description,
    provider: {
      '@type': 'Organization',
      name: 'Y7 Logistics',
      url: 'https://www.y7agency.com',
      areaServed: { '@type': 'Country', name: 'United States' },
    },
    url: `https://www.y7agency.com${meta.path}`,
  });

  const combinedSchema = JSON.stringify(schemas);

  // Topical clustering links for this page (looked up by route path).
  // Returns undefined if the page is not in the matrix; <RelatedGuides />
  // renders nothing in that case.
  const relatedGuidesLinks = RELATED_GUIDES[meta.path];

  return (
    <>
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 24px 80px' }}>
      <PageMeta title={meta.title} description={meta.description} path={meta.path} schema={combinedSchema} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" style={{
        fontFamily: fonts.sans, fontSize: '13px', color: colors.textMuted,
        marginBottom: '24px',
      }}>
        <Link to="/" style={{ color: colors.textMuted }}>Home</Link>
        <span style={{ margin: '0 6px' }}>/</span>
        <Link to="/services" style={{ color: colors.textMuted }}>Services</Link>
        <span style={{ margin: '0 6px' }}>/</span>
        <span style={{ color: colors.text }}>{heading}</span>
      </nav>

      {/* H1 */}
      <h1 style={{
        fontFamily: fonts.serif,
        fontSize: 'clamp(28px, 4vw, 40px)',
        fontWeight: 700,
        color: colors.text,
        marginBottom: '16px',
        lineHeight: 1.2,
      }}>
        {heading}
      </h1>

      {/* Intro */}
      <p style={{
        fontFamily: fonts.sans, fontSize: '16px', color: colors.textMuted,
        lineHeight: 1.7, marginBottom: '48px',
      }}>
        {intro}
      </p>

      {/* Rich content sections */}
      {children}

      {/* When You Need This */}
      {whenNeeded && whenNeeded.length > 0 && (
        <Section title="When You Need This">
          <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {whenNeeded.map((item, i) => (
              <li key={i} style={listItemStyle}>{item}</li>
            ))}
          </ul>
        </Section>
      )}

      {/* How It Works */}
      {steps && steps.length > 0 && (
        <Section title="How It Works">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {steps.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={stepNumberStyle}>{i + 1}</div>
                <div>
                  <div style={{ fontFamily: fonts.sans, fontSize: '15px', fontWeight: 600, color: colors.text, marginBottom: '4px' }}>
                    {step.title}
                  </div>
                  <div style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted, lineHeight: 1.6 }}>
                    {step.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* What You Need */}
      {requirements && requirements.length > 0 && (
        <Section title="What You Need">
          <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {requirements.map((item, i) => (
              <li key={i} style={listItemStyle}>{item}</li>
            ))}
          </ul>
        </Section>
      )}

      {/* Our Capabilities */}
      {capabilities && capabilities.length > 0 && (
        <Section title="Our Capabilities">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '12px',
          }}>
            {capabilities.map((item, i) => (
              <div key={i} style={{
                background: colors.bgCard,
                border: `1px solid ${colors.border}`,
                borderRadius: '12px',
                padding: '16px 20px',
                fontFamily: fonts.sans,
                fontSize: '14px',
                color: colors.text,
                lineHeight: 1.5,
              }}>
                {item}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* FAQ */}
      {faqs && faqs.length > 0 && (
        <Section title="Frequently Asked Questions">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{
                background: colors.bgCard,
                border: `1px solid ${colors.border}`,
                borderRadius: '12px',
                padding: '20px 24px',
              }}>
                <h3 style={{ fontFamily: fonts.sans, fontSize: '15px', fontWeight: 600, color: colors.text, marginBottom: '8px' }}>
                  {faq.q}
                </h3>
                <p style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted, lineHeight: 1.6 }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* CTA */}
      <div style={{
        textAlign: 'center',
        padding: '40px 0',
        borderTop: `1px solid ${colors.border}`,
        marginTop: '16px',
      }}>
        <Link to={ctaTo} style={{
          ...btnStyles.accent,
          display: 'inline-block',
          padding: '14px 32px',
          fontSize: '13px',
          textDecoration: 'none',
          borderRadius: '24px',
        }}>
          {ctaLabel}
        </Link>
      </div>

      {/* Related Pages */}
      {related.length > 0 && (
        <div style={{
          borderTop: `1px solid ${colors.border}`,
          paddingTop: '32px',
        }}>
          <h3 style={{ fontFamily: fonts.sans, fontSize: '13px', fontWeight: 600, color: colors.text, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '16px' }}>
            Related Services
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {related.map((link, i) => (
              <Link key={i} to={link.to} style={{
                fontFamily: fonts.sans,
                fontSize: '13px',
                color: colors.accent,
                background: colors.bgCard,
                border: `1px solid ${colors.border}`,
                borderRadius: '20px',
                padding: '8px 16px',
                textDecoration: 'none',
                transition: 'border-color 0.2s',
              }}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
    <RelatedGuides links={relatedGuidesLinks} />
    </>
  );
}

export function Section({ title, children }) {
  return (
    <section style={{ marginBottom: '40px' }}>
      <h2 style={{
        fontFamily: fonts.serif,
        fontSize: '22px',
        fontWeight: 700,
        color: colors.text,
        marginBottom: '16px',
      }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

export const listItemStyle = {
  fontFamily: fonts.sans,
  fontSize: '14px',
  color: colors.textMuted,
  lineHeight: 1.6,
};

const stepNumberStyle = {
  width: 32,
  height: 32,
  borderRadius: '50%',
  background: colors.accent,
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '14px',
  fontWeight: 700,
  fontFamily: fonts.sans,
  flexShrink: 0,
};
