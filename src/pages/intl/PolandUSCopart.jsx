import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import HreflangTags from '../../components/HreflangTags';

// =============================================================================
// PolandUSCopart.jsx — Template B (Copart Guide)
// Route: /pl-us/copart-shipping
// Audience: Polish diaspora buying from Copart in USA
// All visible text is PLACEHOLDER — replace with Polish copy before launch
// =============================================================================

// -- Shared style objects -----------------------------------------------------

const pageStyle = {
  fontFamily: 'Georgia, "Times New Roman", serif',
  color: '#2C2C2A',
  background: '#F7F5F0',
};

const sectionStyle = {
  maxWidth: '900px',
  margin: '0 auto',
  padding: 'clamp(2rem, 5vw, 4rem) clamp(1.25rem, 4vw, 2rem)',
};

const h1Style = {
  fontSize: 'clamp(2rem, 5vw, 3.25rem)',
  lineHeight: '1.15',
  fontWeight: 400,
};

const h2Style = {
  fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
  lineHeight: '1.2',
  fontWeight: 400,
  marginBottom: '1rem',
};

const pStyle = {
  fontSize: 'clamp(1rem, 2vw, 1.125rem)',
  lineHeight: '1.7',
  color: '#4A4A46',
};

const cardStyle = {
  background: '#fff',
  padding: '1.5rem',
  borderRadius: '8px',
  border: '1px solid #E8E4DC',
};

const ctaButtonStyle = {
  background: '#993C1D',
  color: '#fff',
  padding: '0.875rem 1.75rem',
  borderRadius: '6px',
  display: 'inline-block',
  textDecoration: 'none',
  fontFamily: 'system-ui, sans-serif',
  fontWeight: 500,
  border: 'none',
  cursor: 'pointer',
};

const darkCtaStyle = {
  background: '#2C2C2A',
  color: '#F7F5F0',
};

const accentColor = '#993C1D';

// -- Structured data ----------------------------------------------------------

// TODO-PL-US: Replace all PLACEHOLDER strings with real Polish content
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'PLACEHOLDER_FAQ_QUESTION_1',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PLACEHOLDER_FAQ_ANSWER_1',
      },
    },
    {
      '@type': 'Question',
      name: 'PLACEHOLDER_FAQ_QUESTION_2',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PLACEHOLDER_FAQ_ANSWER_2',
      },
    },
    {
      '@type': 'Question',
      name: 'PLACEHOLDER_FAQ_QUESTION_3',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PLACEHOLDER_FAQ_ANSWER_3',
      },
    },
    {
      '@type': 'Question',
      name: 'PLACEHOLDER_FAQ_QUESTION_4',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PLACEHOLDER_FAQ_ANSWER_4',
      },
    },
    {
      '@type': 'Question',
      name: 'PLACEHOLDER_FAQ_QUESTION_5',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PLACEHOLDER_FAQ_ANSWER_5',
      },
    },
    {
      '@type': 'Question',
      name: 'PLACEHOLDER_FAQ_QUESTION_6',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PLACEHOLDER_FAQ_ANSWER_6',
      },
    },
    {
      '@type': 'Question',
      name: 'PLACEHOLDER_FAQ_QUESTION_7',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PLACEHOLDER_FAQ_ANSWER_7',
      },
    },
  ],
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'PLACEHOLDER_SERVICE_TYPE',
  provider: {
    '@type': 'Organization',
    name: 'Y7 Logistics',
    url: 'https://www.y7agency.com',
  },
  areaServed: {
    '@type': 'Country',
    name: 'United States',
  },
  description: 'PLACEHOLDER_SERVICE_DESCRIPTION',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://www.y7agency.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'PLACEHOLDER_BREADCRUMB_PARENT',
      item: 'https://www.y7agency.com/pl-us',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'PLACEHOLDER_BREADCRUMB_CURRENT',
      item: 'https://www.y7agency.com/pl-us/copart-shipping',
    },
  ],
};

// -- Data arrays --------------------------------------------------------------

// TODO-PL-US: Replace all PLACEHOLDER strings with real content

// Copart vs IAAI comparison table: 8 rows
const comparisonRows = [
  {
    feature: 'PLACEHOLDER_FEATURE_1',
    copart: 'PLACEHOLDER_COPART_1',
    iaai: 'PLACEHOLDER_IAAI_1',
  },
  {
    feature: 'PLACEHOLDER_FEATURE_2',
    copart: 'PLACEHOLDER_COPART_2',
    iaai: 'PLACEHOLDER_IAAI_2',
  },
  {
    feature: 'PLACEHOLDER_FEATURE_3',
    copart: 'PLACEHOLDER_COPART_3',
    iaai: 'PLACEHOLDER_IAAI_3',
  },
  {
    feature: 'PLACEHOLDER_FEATURE_4',
    copart: 'PLACEHOLDER_COPART_4',
    iaai: 'PLACEHOLDER_IAAI_4',
  },
  {
    feature: 'PLACEHOLDER_FEATURE_5',
    copart: 'PLACEHOLDER_COPART_5',
    iaai: 'PLACEHOLDER_IAAI_5',
  },
  {
    feature: 'PLACEHOLDER_FEATURE_6',
    copart: 'PLACEHOLDER_COPART_6',
    iaai: 'PLACEHOLDER_IAAI_6',
  },
  {
    feature: 'PLACEHOLDER_FEATURE_7',
    copart: 'PLACEHOLDER_COPART_7',
    iaai: 'PLACEHOLDER_IAAI_7',
  },
  {
    feature: 'PLACEHOLDER_FEATURE_8',
    copart: 'PLACEHOLDER_COPART_8',
    iaai: 'PLACEHOLDER_IAAI_8',
  },
];

// Fees breakdown: 6 fee items
const feeItems = [
  {
    name: 'PLACEHOLDER_FEE_1_NAME',
    amount: 'PLACEHOLDER_FEE_1_AMOUNT',
    note: 'PLACEHOLDER_FEE_1_NOTE',
  },
  {
    name: 'PLACEHOLDER_FEE_2_NAME',
    amount: 'PLACEHOLDER_FEE_2_AMOUNT',
    note: 'PLACEHOLDER_FEE_2_NOTE',
  },
  {
    name: 'PLACEHOLDER_FEE_3_NAME',
    amount: 'PLACEHOLDER_FEE_3_AMOUNT',
    note: 'PLACEHOLDER_FEE_3_NOTE',
  },
  {
    name: 'PLACEHOLDER_FEE_4_NAME',
    amount: 'PLACEHOLDER_FEE_4_AMOUNT',
    note: 'PLACEHOLDER_FEE_4_NOTE',
  },
  {
    name: 'PLACEHOLDER_FEE_5_NAME',
    amount: 'PLACEHOLDER_FEE_5_AMOUNT',
    note: 'PLACEHOLDER_FEE_5_NOTE',
  },
  {
    name: 'PLACEHOLDER_FEE_6_NAME',
    amount: 'PLACEHOLDER_FEE_6_AMOUNT',
    note: 'PLACEHOLDER_FEE_6_NOTE',
  },
];

// Transport routes: 4 route cards
const routeCards = [
  {
    from: 'PLACEHOLDER_ROUTE_1_FROM',
    to: 'PLACEHOLDER_ROUTE_1_TO',
    distance: 'PLACEHOLDER_ROUTE_1_DISTANCE',
    time: 'PLACEHOLDER_ROUTE_1_TIME',
  },
  {
    from: 'PLACEHOLDER_ROUTE_2_FROM',
    to: 'PLACEHOLDER_ROUTE_2_TO',
    distance: 'PLACEHOLDER_ROUTE_2_DISTANCE',
    time: 'PLACEHOLDER_ROUTE_2_TIME',
  },
  {
    from: 'PLACEHOLDER_ROUTE_3_FROM',
    to: 'PLACEHOLDER_ROUTE_3_TO',
    distance: 'PLACEHOLDER_ROUTE_3_DISTANCE',
    time: 'PLACEHOLDER_ROUTE_3_TIME',
  },
  {
    from: 'PLACEHOLDER_ROUTE_4_FROM',
    to: 'PLACEHOLDER_ROUTE_4_TO',
    distance: 'PLACEHOLDER_ROUTE_4_DISTANCE',
    time: 'PLACEHOLDER_ROUTE_4_TIME',
  },
];

// Seven pitfalls: 7 items
const pitfalls = [
  {
    title: 'PLACEHOLDER_PITFALL_1_TITLE',
    desc: 'PLACEHOLDER_PITFALL_1_DESCRIPTION',
  },
  {
    title: 'PLACEHOLDER_PITFALL_2_TITLE',
    desc: 'PLACEHOLDER_PITFALL_2_DESCRIPTION',
  },
  {
    title: 'PLACEHOLDER_PITFALL_3_TITLE',
    desc: 'PLACEHOLDER_PITFALL_3_DESCRIPTION',
  },
  {
    title: 'PLACEHOLDER_PITFALL_4_TITLE',
    desc: 'PLACEHOLDER_PITFALL_4_DESCRIPTION',
  },
  {
    title: 'PLACEHOLDER_PITFALL_5_TITLE',
    desc: 'PLACEHOLDER_PITFALL_5_DESCRIPTION',
  },
  {
    title: 'PLACEHOLDER_PITFALL_6_TITLE',
    desc: 'PLACEHOLDER_PITFALL_6_DESCRIPTION',
  },
  {
    title: 'PLACEHOLDER_PITFALL_7_TITLE',
    desc: 'PLACEHOLDER_PITFALL_7_DESCRIPTION',
  },
];

// How it works: 7 ordered steps
const howItWorksSteps = [
  {
    num: 1,
    title: 'PLACEHOLDER_HIW_STEP_1_TITLE',
    desc: 'PLACEHOLDER_HIW_STEP_1_DESCRIPTION',
  },
  {
    num: 2,
    title: 'PLACEHOLDER_HIW_STEP_2_TITLE',
    desc: 'PLACEHOLDER_HIW_STEP_2_DESCRIPTION',
  },
  {
    num: 3,
    title: 'PLACEHOLDER_HIW_STEP_3_TITLE',
    desc: 'PLACEHOLDER_HIW_STEP_3_DESCRIPTION',
  },
  {
    num: 4,
    title: 'PLACEHOLDER_HIW_STEP_4_TITLE',
    desc: 'PLACEHOLDER_HIW_STEP_4_DESCRIPTION',
  },
  {
    num: 5,
    title: 'PLACEHOLDER_HIW_STEP_5_TITLE',
    desc: 'PLACEHOLDER_HIW_STEP_5_DESCRIPTION',
  },
  {
    num: 6,
    title: 'PLACEHOLDER_HIW_STEP_6_TITLE',
    desc: 'PLACEHOLDER_HIW_STEP_6_DESCRIPTION',
  },
  {
    num: 7,
    title: 'PLACEHOLDER_HIW_STEP_7_TITLE',
    desc: 'PLACEHOLDER_HIW_STEP_7_DESCRIPTION',
  },
];

// =============================================================================
// Component
// =============================================================================

function PolandUSCopart() {
  return (
    <div style={pageStyle} lang="pl">
      {/* -- Head ----------------------------------------------------------- */}
      <Helmet>
        <title>PLACEHOLDER_META_TITLE</title>
        <meta name="description" content="PLACEHOLDER_META_DESCRIPTION" />
        <meta name="keywords" content="PLACEHOLDER_META_KEYWORDS" />
        <link rel="canonical" href="https://www.y7agency.com/pl-us/copart-shipping" />
        <meta property="og:title" content="PLACEHOLDER_OG_TITLE" />
        <meta property="og:description" content="PLACEHOLDER_OG_DESCRIPTION" />
        <meta property="og:url" content="https://www.y7agency.com/pl-us/copart-shipping" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="PLACEHOLDER_OG_IMAGE" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PLACEHOLDER_TWITTER_TITLE" />
        <meta name="twitter:description" content="PLACEHOLDER_TWITTER_DESCRIPTION" />
        <html lang="pl" />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <HreflangTags
        currentPath="/copart-shipping"
        hasPolishVersion={true}
        hasUkrainianVersion={true}
        hasRussianUSVersion={true}
      />

      {/* ================================================================== */}
      {/* Breadcrumb navigation                                              */}
      {/* ================================================================== */}
      <nav
        style={{
          ...sectionStyle,
          paddingTop: '1rem',
          paddingBottom: '0',
        }}
        aria-label="Breadcrumb"
      >
        <div
          style={{
            fontFamily: 'system-ui, sans-serif',
            fontSize: '0.875rem',
            color: '#4A4A46',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.25rem',
            alignItems: 'center',
          }}
        >
          <Link
            to="/"
            style={{ color: accentColor, textDecoration: 'none' }}
          >
            Home
          </Link>
          <span style={{ color: '#999' }}>/</span>
          <Link
            to="/pl-us"
            style={{ color: accentColor, textDecoration: 'none' }}
          >
            PLACEHOLDER_BREADCRUMB_PARENT
          </Link>
          <span style={{ color: '#999' }}>/</span>
          <span>PLACEHOLDER_BREADCRUMB_CURRENT</span>
        </div>
      </nav>

      {/* ================================================================== */}
      {/* SECTION 1 — Hero                                                   */}
      {/* TODO-PL-US: Replace with Polish hero copy about Copart shipping    */}
      {/* ================================================================== */}
      <section style={{ ...sectionStyle, paddingTop: 'clamp(2rem, 5vw, 3rem)' }}>
        <h1 style={h1Style}>
          PLACEHOLDER_H1
        </h1>
        <p style={{ ...pStyle, marginTop: '1.5rem', maxWidth: '720px' }}>
          PLACEHOLDER_LEAD_PARAGRAPH_SENTENCE_1.{' '}
          PLACEHOLDER_LEAD_PARAGRAPH_SENTENCE_2.{' '}
          PLACEHOLDER_LEAD_PARAGRAPH_SENTENCE_3.{' '}
          PLACEHOLDER_LEAD_PARAGRAPH_SENTENCE_4.{' '}
          PLACEHOLDER_LEAD_PARAGRAPH_SENTENCE_5.
        </p>
      </section>

      {/* ================================================================== */}
      {/* SECTION 2 — What Copart really is                                  */}
      {/* TODO-PL-US: Replace with educational content about Copart          */}
      {/* ================================================================== */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>
          PLACEHOLDER_WHAT_IS_COPART_HEADING
        </h2>
        <p style={pStyle}>
          PLACEHOLDER_WHAT_IS_COPART_PARAGRAPH_1
        </p>
        <p style={{ ...pStyle, marginTop: '1rem' }}>
          PLACEHOLDER_WHAT_IS_COPART_PARAGRAPH_2
        </p>
        <p style={{ ...pStyle, marginTop: '1rem' }}>
          PLACEHOLDER_WHAT_IS_COPART_PARAGRAPH_3
        </p>
      </section>

      {/* ================================================================== */}
      {/* SECTION 3 — Copart vs IAAI comparison table                        */}
      {/* 8 rows, 3 columns (Feature, Copart, IAAI)                         */}
      {/* TODO-PL-US: Replace comparison data                                */}
      {/* ================================================================== */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>
          PLACEHOLDER_COMPARISON_HEADING
        </h2>
        <p style={{ ...pStyle, marginBottom: '1.5rem' }}>
          PLACEHOLDER_COMPARISON_INTRO
        </p>

        <div
          style={{
            overflowX: 'auto',
            borderRadius: '8px',
            border: '1px solid #E8E4DC',
          }}
        >
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontFamily: 'system-ui, sans-serif',
              fontSize: '0.95rem',
            }}
          >
            <thead>
              <tr style={{ background: '#2C2C2A', color: '#F7F5F0' }}>
                <th
                  style={{
                    padding: '0.875rem 1rem',
                    textAlign: 'left',
                    fontWeight: 600,
                  }}
                >
                  PLACEHOLDER_COL_FEATURE
                </th>
                <th
                  style={{
                    padding: '0.875rem 1rem',
                    textAlign: 'left',
                    fontWeight: 600,
                  }}
                >
                  Copart
                </th>
                <th
                  style={{
                    padding: '0.875rem 1rem',
                    textAlign: 'left',
                    fontWeight: 600,
                  }}
                >
                  IAAI
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, idx) => (
                <tr
                  key={idx}
                  style={{
                    background: idx % 2 === 0 ? '#fff' : '#F7F5F0',
                    borderBottom: '1px solid #E8E4DC',
                  }}
                >
                  <td
                    style={{
                      padding: '0.75rem 1rem',
                      fontWeight: 600,
                      color: '#2C2C2A',
                    }}
                  >
                    {row.feature}
                  </td>
                  <td style={{ padding: '0.75rem 1rem', color: '#4A4A46' }}>
                    {row.copart}
                  </td>
                  <td style={{ padding: '0.75rem 1rem', color: '#4A4A46' }}>
                    {row.iaai}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 4 — Fees breakdown (6 fee items)                           */}
      {/* TODO-PL-US: Replace fee names, amounts, and notes                  */}
      {/* ================================================================== */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>
          PLACEHOLDER_FEES_HEADING
        </h2>
        <p style={{ ...pStyle, marginBottom: '1.5rem' }}>
          PLACEHOLDER_FEES_INTRO
        </p>

        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {feeItems.map((fee, idx) => (
            <div
              key={idx}
              style={{
                ...cardStyle,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.5rem',
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: 'system-ui, sans-serif',
                    fontWeight: 600,
                    display: 'block',
                  }}
                >
                  {fee.name}
                </span>
                <span
                  style={{
                    ...pStyle,
                    fontSize: '0.875rem',
                    display: 'block',
                    marginTop: '0.25rem',
                  }}
                >
                  {fee.note}
                </span>
              </div>
              <span
                style={{
                  color: accentColor,
                  fontWeight: 600,
                  fontFamily: 'system-ui, sans-serif',
                  fontSize: '1.125rem',
                  whiteSpace: 'nowrap',
                }}
              >
                {fee.amount}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 5 — Transport routes (4 route cards)                       */}
      {/* TODO-PL-US: Replace route details                                  */}
      {/* ================================================================== */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>
          PLACEHOLDER_ROUTES_HEADING
        </h2>
        <p style={{ ...pStyle, marginBottom: '1.5rem' }}>
          PLACEHOLDER_ROUTES_INTRO
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
          }}
        >
          {routeCards.map((route, idx) => (
            <div key={idx} style={cardStyle}>
              <div
                style={{
                  fontFamily: 'system-ui, sans-serif',
                  fontWeight: 600,
                  marginBottom: '0.75rem',
                  color: accentColor,
                }}
              >
                {route.from} &rarr; {route.to}
              </div>
              <p style={{ ...pStyle, margin: '0 0 0.25rem', fontSize: '0.9rem' }}>
                {route.distance}
              </p>
              <p style={{ ...pStyle, margin: 0, fontSize: '0.9rem' }}>
                {route.time}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 6 — Seven pitfalls (7 numbered items)                      */}
      {/* TODO-PL-US: Replace pitfall titles and descriptions                */}
      {/* ================================================================== */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>
          PLACEHOLDER_PITFALLS_HEADING
        </h2>
        <p style={{ ...pStyle, marginBottom: '1.5rem' }}>
          PLACEHOLDER_PITFALLS_INTRO
        </p>

        <div style={{ display: 'grid', gap: '1rem' }}>
          {pitfalls.map((pitfall, idx) => (
            <div
              key={idx}
              style={{
                ...cardStyle,
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem',
              }}
            >
              <span
                style={{
                  fontFamily: 'system-ui, sans-serif',
                  fontWeight: 700,
                  fontSize: '1.5rem',
                  color: accentColor,
                  flexShrink: 0,
                  lineHeight: '1.2',
                }}
              >
                {idx + 1}.
              </span>
              <div>
                <h3
                  style={{
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    marginBottom: '0.5rem',
                  }}
                >
                  {pitfall.title}
                </h3>
                <p style={{ ...pStyle, margin: 0 }}>{pitfall.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 7 — How it works (7 ordered steps)                         */}
      {/* TODO-PL-US: Replace step titles and descriptions                   */}
      {/* ================================================================== */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>
          PLACEHOLDER_HOW_IT_WORKS_HEADING
        </h2>
        <p style={{ ...pStyle, marginBottom: '2rem' }}>
          PLACEHOLDER_HOW_IT_WORKS_INTRO
        </p>

        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {howItWorksSteps.map((step) => (
            <div
              key={step.num}
              style={{
                ...cardStyle,
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1.25rem',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: accentColor,
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'system-ui, sans-serif',
                  fontWeight: 600,
                  fontSize: '1.125rem',
                  flexShrink: 0,
                }}
              >
                {step.num}
              </div>
              <div>
                <h3
                  style={{
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    marginBottom: '0.5rem',
                  }}
                >
                  {step.title}
                </h3>
                <p style={{ ...pStyle, margin: 0 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 8 — FAQ                                                    */}
      {/* Rendered from faqSchema.mainEntity with details/summary            */}
      {/* TODO-PL-US: Replace FAQ questions and answers                      */}
      {/* ================================================================== */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>
          PLACEHOLDER_FAQ_HEADING
        </h2>
        <p style={{ ...pStyle, marginBottom: '1.5rem' }}>
          PLACEHOLDER_FAQ_INTRO
        </p>

        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {faqSchema.mainEntity.map((faq, idx) => (
            <details
              key={idx}
              style={{
                ...cardStyle,
                cursor: 'pointer',
              }}
            >
              <summary
                style={{
                  fontFamily: 'system-ui, sans-serif',
                  fontWeight: 600,
                  fontSize: '1.05rem',
                  listStyle: 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                {faq.name}
                <span
                  style={{
                    color: accentColor,
                    fontSize: '1.25rem',
                    marginLeft: '1rem',
                    flexShrink: 0,
                  }}
                >
                  +
                </span>
              </summary>
              <p style={{ ...pStyle, marginTop: '1rem' }}>
                {faq.acceptedAnswer.text}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 9 — Dark CTA                                               */}
      {/* TODO-PL-US: Replace CTA heading, text, and button labels           */}
      {/* ================================================================== */}
      <section
        style={{
          ...darkCtaStyle,
          padding: 'clamp(3rem, 6vw, 5rem) clamp(1.25rem, 4vw, 2rem)',
        }}
      >
        <div
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              ...h2Style,
              color: '#F7F5F0',
            }}
          >
            PLACEHOLDER_CTA_HEADING
          </h2>
          <p
            style={{
              ...pStyle,
              color: '#C5C0B8',
              maxWidth: '600px',
              margin: '0 auto 2rem',
            }}
          >
            PLACEHOLDER_CTA_DESCRIPTION
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              justifyContent: 'center',
            }}
          >
            <Link
              to="/pl-us/ship-my-car"
              style={ctaButtonStyle}
            >
              PLACEHOLDER_CTA_BUTTON_PRIMARY
            </Link>
            <a
              href="PLACEHOLDER_TELEGRAM_LINK"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                ...ctaButtonStyle,
                background: 'transparent',
                border: '1px solid #F7F5F0',
                color: '#F7F5F0',
              }}
            >
              PLACEHOLDER_CTA_BUTTON_SECONDARY
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PolandUSCopart;
