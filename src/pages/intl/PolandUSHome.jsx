import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import HreflangTags from '../../components/HreflangTags';

// =============================================================================
// PolandUSHome.jsx — Template A (Home/Overview)
// Route: /pl-us
// Audience: Polish diaspora in USA (US-internal transport)
// Primary service: US domestic auto transport
// NOTE: Do NOT claim Y7 has Polish speakers. Polish support is via
//       DaytonaCargo partnership.
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

const statNumberStyle = {
  fontSize: 'clamp(2rem, 4vw, 3rem)',
  fontWeight: 300,
  color: '#993C1D',
};

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
  ],
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
      name: 'PLACEHOLDER_BREADCRUMB_CURRENT',
      item: 'https://www.y7agency.com/pl-us',
    },
  ],
};

// -- Data arrays --------------------------------------------------------------

// TODO-PL-US: Replace all PLACEHOLDER strings with real content
const quickStats = [
  {
    number: 'PLACEHOLDER_STAT_NUMBER_1',
    label: 'PLACEHOLDER_STAT_LABEL_1',
  },
  {
    number: 'PLACEHOLDER_STAT_NUMBER_2',
    label: 'PLACEHOLDER_STAT_LABEL_2',
  },
  {
    number: 'PLACEHOLDER_STAT_NUMBER_3',
    label: 'PLACEHOLDER_STAT_LABEL_3',
  },
];

// TODO-PL-US: This is "Our Services" for US diaspora — NOT "two companies"
const serviceItems = [
  {
    title: 'PLACEHOLDER_SERVICE_1_TITLE',
    desc: 'PLACEHOLDER_SERVICE_1_DESCRIPTION',
  },
  {
    title: 'PLACEHOLDER_SERVICE_2_TITLE',
    desc: 'PLACEHOLDER_SERVICE_2_DESCRIPTION',
  },
  {
    title: 'PLACEHOLDER_SERVICE_3_TITLE',
    desc: 'PLACEHOLDER_SERVICE_3_DESCRIPTION',
  },
  {
    title: 'PLACEHOLDER_SERVICE_4_TITLE',
    desc: 'PLACEHOLDER_SERVICE_4_DESCRIPTION',
  },
  {
    title: 'PLACEHOLDER_SERVICE_5_TITLE',
    desc: 'PLACEHOLDER_SERVICE_5_DESCRIPTION',
  },
];

const processSteps = [
  {
    num: 1,
    title: 'PLACEHOLDER_STEP_1_TITLE',
    desc: 'PLACEHOLDER_STEP_1_DESCRIPTION',
  },
  {
    num: 2,
    title: 'PLACEHOLDER_STEP_2_TITLE',
    desc: 'PLACEHOLDER_STEP_2_DESCRIPTION',
  },
  {
    num: 3,
    title: 'PLACEHOLDER_STEP_3_TITLE',
    desc: 'PLACEHOLDER_STEP_3_DESCRIPTION',
  },
  {
    num: 4,
    title: 'PLACEHOLDER_STEP_4_TITLE',
    desc: 'PLACEHOLDER_STEP_4_DESCRIPTION',
  },
  {
    num: 5,
    title: 'PLACEHOLDER_STEP_5_TITLE',
    desc: 'PLACEHOLDER_STEP_5_DESCRIPTION',
  },
];

const costCards = [
  {
    title: 'PLACEHOLDER_COST_1_TITLE',
    amount: 'PLACEHOLDER_COST_1_AMOUNT',
    note: 'PLACEHOLDER_COST_1_NOTE',
  },
  {
    title: 'PLACEHOLDER_COST_2_TITLE',
    amount: 'PLACEHOLDER_COST_2_AMOUNT',
    note: 'PLACEHOLDER_COST_2_NOTE',
  },
  {
    title: 'PLACEHOLDER_COST_3_TITLE',
    amount: 'PLACEHOLDER_COST_3_AMOUNT',
    note: 'PLACEHOLDER_COST_3_NOTE',
  },
  {
    title: 'PLACEHOLDER_COST_4_TITLE',
    amount: 'PLACEHOLDER_COST_4_AMOUNT',
    note: 'PLACEHOLDER_COST_4_NOTE',
  },
];

const carExamples = [
  {
    emoji: 'PLACEHOLDER_EMOJI_1',
    car: 'PLACEHOLDER_CAR_1_NAME',
    route: 'PLACEHOLDER_CAR_1_ROUTE',
    price: 'PLACEHOLDER_CAR_1_PRICE',
  },
  {
    emoji: 'PLACEHOLDER_EMOJI_2',
    car: 'PLACEHOLDER_CAR_2_NAME',
    route: 'PLACEHOLDER_CAR_2_ROUTE',
    price: 'PLACEHOLDER_CAR_2_PRICE',
  },
  {
    emoji: 'PLACEHOLDER_EMOJI_3',
    car: 'PLACEHOLDER_CAR_3_NAME',
    route: 'PLACEHOLDER_CAR_3_ROUTE',
    price: 'PLACEHOLDER_CAR_3_PRICE',
  },
];

const riskCards = [
  {
    title: 'PLACEHOLDER_RISK_1_TITLE',
    desc: 'PLACEHOLDER_RISK_1_DESCRIPTION',
  },
  {
    title: 'PLACEHOLDER_RISK_2_TITLE',
    desc: 'PLACEHOLDER_RISK_2_DESCRIPTION',
  },
  {
    title: 'PLACEHOLDER_RISK_3_TITLE',
    desc: 'PLACEHOLDER_RISK_3_DESCRIPTION',
  },
  {
    title: 'PLACEHOLDER_RISK_4_TITLE',
    desc: 'PLACEHOLDER_RISK_4_DESCRIPTION',
  },
];

// =============================================================================
// Component
// =============================================================================

function PolandUSHome() {
  return (
    <div style={pageStyle} lang="pl">
      {/* -- Head ----------------------------------------------------------- */}
      <Helmet>
        <title>PLACEHOLDER_META_TITLE</title>
        <meta name="description" content="PLACEHOLDER_META_DESCRIPTION" />
        <meta name="keywords" content="PLACEHOLDER_META_KEYWORDS" />
        <link rel="canonical" href="https://www.y7agency.com/pl-us" />
        <meta property="og:title" content="PLACEHOLDER_OG_TITLE" />
        <meta property="og:description" content="PLACEHOLDER_OG_DESCRIPTION" />
        <meta property="og:url" content="https://www.y7agency.com/pl-us" />
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
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <HreflangTags
        currentPath=""
        hasPolishVersion={true}
        hasUkrainianVersion={true}
        hasRussianUSVersion={true}
      />

      {/* ================================================================== */}
      {/* SECTION 1 — Hero                                                   */}
      {/* TODO-PL-US: Replace with Polish hero copy for US diaspora          */}
      {/* NOTE: Do NOT claim Y7 has Polish speakers. Polish support is via   */}
      {/* DaytonaCargo partnership.                                          */}
      {/* ================================================================== */}
      <section style={{ ...sectionStyle, paddingTop: 'clamp(3rem, 8vw, 6rem)' }}>
        <h1 style={h1Style}>
          PLACEHOLDER_H1
        </h1>
        <p style={{ ...pStyle, marginTop: '1.5rem', maxWidth: '720px' }}>
          {/* ~100 words placeholder lead paragraph about US transport for Polish diaspora */}
          PLACEHOLDER_LEAD_PARAGRAPH_SENTENCE_1.{' '}
          PLACEHOLDER_LEAD_PARAGRAPH_SENTENCE_2.{' '}
          PLACEHOLDER_LEAD_PARAGRAPH_SENTENCE_3.{' '}
          PLACEHOLDER_LEAD_PARAGRAPH_SENTENCE_4.{' '}
          PLACEHOLDER_LEAD_PARAGRAPH_SENTENCE_5.{' '}
          PLACEHOLDER_LEAD_PARAGRAPH_SENTENCE_6.{' '}
          PLACEHOLDER_LEAD_PARAGRAPH_SENTENCE_7.{' '}
          PLACEHOLDER_LEAD_PARAGRAPH_SENTENCE_8.{' '}
          PLACEHOLDER_LEAD_PARAGRAPH_SENTENCE_9.{' '}
          PLACEHOLDER_LEAD_PARAGRAPH_SENTENCE_10.
        </p>
        <div style={{ marginTop: '2rem' }}>
          <Link to="/pl-us/ship-my-car" style={ctaButtonStyle}>
            PLACEHOLDER_HERO_CTA
          </Link>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 2 — Quick stats (3 blocks)                                 */}
      {/* TODO-PL-US: Replace stat numbers and labels                        */}
      {/* ================================================================== */}
      <section style={sectionStyle}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            textAlign: 'center',
          }}
        >
          {quickStats.map((stat, idx) => (
            <div key={idx} style={cardStyle}>
              <div style={statNumberStyle}>
                {stat.number}
              </div>
              <p
                style={{
                  ...pStyle,
                  fontFamily: 'system-ui, sans-serif',
                  marginTop: '0.5rem',
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 3 — Our Services (US diaspora focus, not "two companies")  */}
      {/* TODO-PL-US: Replace service titles and descriptions                */}
      {/* ================================================================== */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>
          PLACEHOLDER_SERVICES_HEADING
        </h2>
        <p style={{ ...pStyle, marginBottom: '1.5rem' }}>
          PLACEHOLDER_SERVICES_INTRO
        </p>

        <div style={{ display: 'grid', gap: '1rem' }}>
          {serviceItems.map((service, idx) => (
            <div
              key={idx}
              style={{
                ...cardStyle,
                borderLeft: `3px solid ${accentColor}`,
              }}
            >
              <h3
                style={{
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                }}
              >
                {service.title}
              </h3>
              <p style={{ ...pStyle, margin: 0 }}>{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 4 — Process steps (5 steps)                                */}
      {/* TODO-PL-US: Replace step titles and descriptions                   */}
      {/* ================================================================== */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>
          PLACEHOLDER_PROCESS_HEADING
        </h2>
        <p style={{ ...pStyle, marginBottom: '2rem' }}>
          PLACEHOLDER_PROCESS_INTRO
        </p>

        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {processSteps.map((step) => (
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
      {/* SECTION 5 — Cost breakdown (4 cards)                               */}
      {/* TODO-PL-US: Replace cost titles, amounts, and notes                */}
      {/* ================================================================== */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>
          PLACEHOLDER_COST_HEADING
        </h2>
        <p style={{ ...pStyle, marginBottom: '1.5rem' }}>
          PLACEHOLDER_COST_INTRO
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
          }}
        >
          {costCards.map((cost, idx) => (
            <div key={idx} style={cardStyle}>
              <h3
                style={{
                  fontFamily: 'system-ui, sans-serif',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  marginBottom: '0.75rem',
                  color: '#4A4A46',
                }}
              >
                {cost.title}
              </h3>
              <div
                style={{
                  fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                  fontWeight: 300,
                  color: accentColor,
                  marginBottom: '0.5rem',
                }}
              >
                {cost.amount}
              </div>
              <p style={{ ...pStyle, fontSize: '0.9rem', margin: 0 }}>
                {cost.note}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 6 — Real examples (3 car cards)                            */}
      {/* TODO-PL-US: Replace car names, routes, and prices                  */}
      {/* ================================================================== */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>
          PLACEHOLDER_EXAMPLES_HEADING
        </h2>
        <p style={{ ...pStyle, marginBottom: '1.5rem' }}>
          PLACEHOLDER_EXAMPLES_INTRO
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem',
          }}
        >
          {carExamples.map((car, idx) => (
            <div key={idx} style={cardStyle}>
              <div
                style={{
                  fontSize: '2rem',
                  marginBottom: '0.75rem',
                }}
              >
                {car.emoji}
              </div>
              <h3
                style={{
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                }}
              >
                {car.car}
              </h3>
              <p style={{ ...pStyle, margin: '0 0 0.25rem' }}>
                {car.route}
              </p>
              <p
                style={{
                  color: accentColor,
                  fontWeight: 600,
                  fontFamily: 'system-ui, sans-serif',
                  fontSize: '1.25rem',
                  margin: 0,
                }}
              >
                {car.price}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 7 — Risks (4 cards)                                        */}
      {/* TODO-PL-US: Replace risk titles and descriptions                   */}
      {/* ================================================================== */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>
          PLACEHOLDER_RISKS_HEADING
        </h2>
        <p style={{ ...pStyle, marginBottom: '1.5rem' }}>
          PLACEHOLDER_RISKS_INTRO
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
          }}
        >
          {riskCards.map((risk, idx) => (
            <div
              key={idx}
              style={{
                ...cardStyle,
                borderTop: `3px solid ${accentColor}`,
              }}
            >
              <h3
                style={{
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                }}
              >
                {risk.title}
              </h3>
              <p style={{ ...pStyle, margin: 0, fontSize: '0.95rem' }}>
                {risk.desc}
              </p>
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
            <Link
              to="/pl-us/copart-shipping"
              style={{
                ...ctaButtonStyle,
                background: 'transparent',
                border: '1px solid #F7F5F0',
                color: '#F7F5F0',
              }}
            >
              PLACEHOLDER_CTA_BUTTON_SECONDARY
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PolandUSHome;
