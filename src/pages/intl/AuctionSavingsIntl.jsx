/* eslint-disable react-refresh/only-export-components */
// AuctionSavingsIntl.jsx
// Shared, presentational layout for the localized "save vs the auction's
// in-house transport" flagship pages (RU / UA / PL). These are UNIQUE
// international landing pages — native slugs, distinct per-audience content,
// SELF-CANONICAL, and intentionally NOT hreflang twins of the English
// /auction-transport-savings page (the audience + framing differ: RU = US
// diaspora shipping inside the USA; UA/PL = importers, US inland leg to the
// export port). No DaytonaCargo handoff — Y7 owns the US-side chain.
//
// All visible chrome is driven by props so nothing English leaks into a
// localized body. Schema is BreadcrumbList + FAQPage + Service, PRICE-FREE
// (no Offer / price), matching the English flagship.
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { colors, fonts } from '../../theme';

const BASE = 'https://www.y7agency.com';

export const pStyle = {
  fontFamily: fonts.sans,
  fontSize: '15px',
  color: colors.textMuted,
  lineHeight: 1.75,
  marginBottom: '16px',
};

export const strongStyle = { color: colors.text };

// Two-column comparison card (auction-in-house vs Y7 direct). Fact-based, no
// fabricated total, no priced Offer. Collapses to one column under 560px.
export function ComparisonCard({ auctionLabel, auctionChildren, y7Label, y7Children }) {
  return (
    <div
      style={{
        border: `1px solid ${colors.border}`,
        borderRadius: '16px',
        padding: '32px',
        marginBottom: '24px',
        background: colors.bgCard,
      }}
    >
      <style>{`
        .asi-compare-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        @media (max-width: 560px) { .asi-compare-grid { grid-template-columns: 1fr; } }
      `}</style>
      <div className="asi-compare-grid">
        <div
          style={{
            background: colors.bg,
            borderRadius: '12px',
            padding: '20px 22px',
            border: `1px solid ${colors.border}`,
          }}
        >
          <div
            style={{
              fontFamily: fonts.sans,
              fontSize: '12px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: colors.textMuted,
              marginBottom: '10px',
            }}
          >
            {auctionLabel}
          </div>
          <p style={{ ...pStyle, marginBottom: 0 }}>{auctionChildren}</p>
        </div>

        <div
          style={{
            background: colors.bg,
            borderRadius: '12px',
            padding: '20px 22px',
            border: `1px solid ${colors.border}`,
          }}
        >
          <div
            style={{
              fontFamily: fonts.sans,
              fontSize: '12px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: colors.accent,
              marginBottom: '10px',
            }}
          >
            {y7Label}
          </div>
          <p style={{ ...pStyle, marginBottom: 0 }}>{y7Children}</p>
        </div>
      </div>
    </div>
  );
}

export function Section({ kicker, title, children }) {
  return (
    <section style={{ marginBottom: '40px' }}>
      {kicker && (
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: '12px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: colors.accent,
            marginBottom: '10px',
          }}
        >
          ◆ {kicker}
        </div>
      )}
      <h2
        style={{
          fontFamily: fonts.serif,
          fontWeight: 700,
          letterSpacing: '-0.02em',
          fontSize: 'clamp(1.4rem, 3vw, 1.85rem)',
          color: colors.text,
          marginTop: 0,
          marginBottom: '16px',
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

export const accentLinkStyle = {
  display: 'inline-block',
  background: colors.accent,
  color: '#fff',
  padding: '12px 28px',
  borderRadius: '20px',
  fontFamily: fonts.sans,
  fontSize: '13px',
  fontWeight: 600,
  letterSpacing: '0.5px',
  textTransform: 'uppercase',
  textDecoration: 'none',
};

export default function AuctionSavingsIntl({
  urlLang,
  htmlLang,
  ogLocale,
  path,
  title,
  description,
  homeLabel,
  currentLabel,
  kicker,
  h1,
  intro,
  children,
  faqTitle,
  faqs = [],
  cta,
}) {
  const homeUrl = `${BASE}/${urlLang}`;
  const pageUrl = `${BASE}${path}`;

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: homeLabel, item: homeUrl },
        { '@type': 'ListItem', position: 2, name: h1, item: pageUrl },
      ],
    },
  ];
  if (faqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: h1,
    description,
    provider: {
      '@type': 'Organization',
      name: 'Y7 Logistics',
      url: BASE,
      identifier: { '@type': 'PropertyValue', propertyID: 'FMCSA MC', value: '1741537' },
      areaServed: { '@type': 'Country', name: 'United States' },
    },
    url: pageUrl,
  });

  return (
    <>
      <Helmet>
        <html lang={htmlLang} />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:locale" content={ogLocale} />
        <link rel="canonical" href={pageUrl} />
        <script type="application/ld+json">{JSON.stringify(schemas)}</script>
      </Helmet>

      <div
        style={{
          maxWidth: '820px',
          margin: '0 auto',
          padding: 'clamp(1.5rem, 4vw, 2.5rem) clamp(1.25rem, 4vw, 2rem) 4rem',
          fontFamily: fonts.sans,
        }}
      >
        <nav
          aria-label="Breadcrumb"
          style={{
            fontFamily: fonts.sans,
            fontSize: '13px',
            color: colors.textMuted,
            marginBottom: '20px',
          }}
        >
          <Link to={`/${urlLang}`} style={{ color: colors.textMuted, textDecoration: 'none' }}>
            {homeLabel}
          </Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <span style={{ color: colors.text }}>{currentLabel}</span>
        </nav>

        {kicker && (
          <div
            style={{
              fontFamily: fonts.sans,
              fontSize: '12px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: colors.accent,
              marginBottom: '12px',
            }}
          >
            {kicker}
          </div>
        )}

        <h1
          style={{
            fontFamily: fonts.serif,
            fontWeight: 700,
            letterSpacing: '-0.02em',
            fontSize: 'clamp(1.9rem, 5vw, 2.7rem)',
            lineHeight: 1.15,
            color: colors.text,
            marginTop: 0,
            marginBottom: '20px',
          }}
        >
          {h1}
        </h1>

        <div style={{ marginBottom: '40px' }}>{intro}</div>

        {children}

        {faqs.length > 0 && (
          <Section title={faqTitle}>
            <div>
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  style={{
                    borderBottom: `1px solid ${colors.border}`,
                    paddingBottom: '8px',
                    marginBottom: '8px',
                  }}
                >
                  <summary
                    style={{
                      fontFamily: fonts.sans,
                      fontSize: '15px',
                      fontWeight: 600,
                      color: colors.text,
                      cursor: 'pointer',
                      listStyle: 'none',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 0',
                    }}
                  >
                    <span>{faq.q}</span>
                    <span style={{ color: colors.accent, fontSize: '1.3rem', lineHeight: 1 }}>+</span>
                  </summary>
                  <p style={{ ...pStyle, marginBottom: '8px' }}>{faq.a}</p>
                </details>
              ))}
            </div>
          </Section>
        )}

        {cta && (
          <div
            style={{
              background: colors.bgCard,
              border: `1px solid ${colors.border}`,
              borderRadius: '16px',
              padding: 'clamp(1.75rem, 4vw, 2.5rem)',
              textAlign: 'center',
              marginTop: '8px',
            }}
          >
            <h2
              style={{
                fontFamily: fonts.serif,
                fontWeight: 700,
                letterSpacing: '-0.02em',
                fontSize: 'clamp(1.4rem, 3vw, 1.85rem)',
                color: colors.text,
                marginTop: 0,
                marginBottom: '12px',
              }}
            >
              {cta.title}
            </h2>
            {cta.subtitle && (
              <p style={{ ...pStyle, maxWidth: '520px', margin: '0 auto 24px' }}>{cta.subtitle}</p>
            )}
            <div
              style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              <Link to={cta.primaryTo} style={accentLinkStyle}>
                {cta.primaryLabel}
              </Link>
              {cta.telegramLabel && (
                <a
                  href="https://t.me/y7dispatch_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    ...accentLinkStyle,
                    background: 'transparent',
                    color: colors.accent,
                    border: `1px solid ${colors.accent}`,
                  }}
                >
                  {cta.telegramLabel}
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
