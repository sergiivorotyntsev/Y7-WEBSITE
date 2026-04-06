import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import HreflangTags from '../../components/HreflangTags';

// =============================================================================
// PolandUSShipMyCar.jsx — Template C (Action/Ordering)
// Route: /pl-us/ship-my-car
// Audience: Polish diaspora ordering US domestic transport
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
  ],
};

// Breadcrumb: Home -> Polish US -> Ship My Car (this page)
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
      item: 'https://www.y7agency.com/pl-us/ship-my-car',
    },
  ],
};

// -- Data arrays --------------------------------------------------------------

// TODO-PL-US: Replace all PLACEHOLDER strings with real Polish content
const checklistItems = [
  'PLACEHOLDER_CHECKLIST_ITEM_1',
  'PLACEHOLDER_CHECKLIST_ITEM_2',
  'PLACEHOLDER_CHECKLIST_ITEM_3',
  'PLACEHOLDER_CHECKLIST_ITEM_4',
  'PLACEHOLDER_CHECKLIST_ITEM_5',
  'PLACEHOLDER_CHECKLIST_ITEM_6',
];

// TODO-PL-US: Replace all PLACEHOLDER strings with real Polish content
const orderingSteps = [
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
  {
    num: 6,
    title: 'PLACEHOLDER_STEP_6_TITLE',
    desc: 'PLACEHOLDER_STEP_6_DESCRIPTION',
  },
];

// =============================================================================
// Component
// =============================================================================

function PolandUSShipMyCar() {
  return (
    <div style={pageStyle} lang="pl">
      {/* -- Head ----------------------------------------------------------- */}
      <Helmet>
        <title>PLACEHOLDER_META_TITLE</title>
        <meta name="description" content="PLACEHOLDER_META_DESCRIPTION" />
        <meta name="keywords" content="PLACEHOLDER_META_KEYWORDS" />
        <link rel="canonical" href="https://www.y7agency.com/pl-us/ship-my-car" />
        <meta property="og:title" content="PLACEHOLDER_OG_TITLE" />
        <meta property="og:description" content="PLACEHOLDER_OG_DESCRIPTION" />
        <meta property="og:url" content="https://www.y7agency.com/pl-us/ship-my-car" />
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
        currentPath="/ship-my-car"
        hasPolishVersion={true}
        hasUkrainianVersion={true}
        hasRussianUSVersion={true}
      />

      {/* ================================================================== */}
      {/* SECTION 1 — Hero (short, action-focused)                           */}
      {/* TODO-PL-US: Replace with compelling Polish hero copy for US         */}
      {/* diaspora ordering domestic US transport                             */}
      {/* ================================================================== */}
      <section style={{ ...sectionStyle, paddingTop: 'clamp(3rem, 8vw, 6rem)' }}>
        <h1 style={h1Style}>
          PLACEHOLDER_H1
        </h1>
        <p style={{ ...pStyle, marginTop: '1.5rem', maxWidth: '720px' }}>
          {/* ~80 words placeholder lead paragraph about ordering US transport */}
          PLACEHOLDER_LEAD_PARAGRAPH_SENTENCE_1.{' '}
          PLACEHOLDER_LEAD_PARAGRAPH_SENTENCE_2.{' '}
          PLACEHOLDER_LEAD_PARAGRAPH_SENTENCE_3.{' '}
          PLACEHOLDER_LEAD_PARAGRAPH_SENTENCE_4.{' '}
          PLACEHOLDER_LEAD_PARAGRAPH_SENTENCE_5.{' '}
          PLACEHOLDER_LEAD_PARAGRAPH_SENTENCE_6.{' '}
          PLACEHOLDER_LEAD_PARAGRAPH_SENTENCE_7.{' '}
          PLACEHOLDER_LEAD_PARAGRAPH_SENTENCE_8.
        </p>
      </section>

      {/* ================================================================== */}
      {/* SECTION 2 — What you need before ordering                          */}
      {/* TODO-PL-US: Replace checklist items with real requirements          */}
      {/* ================================================================== */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>
          PLACEHOLDER_CHECKLIST_HEADING
        </h2>
        <p style={{ ...pStyle, marginBottom: '1.5rem' }}>
          PLACEHOLDER_CHECKLIST_INTRO
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1rem',
          }}
        >
          {checklistItems.map((item, idx) => (
            <div key={idx} style={cardStyle}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                }}
              >
                <span
                  style={{
                    color: accentColor,
                    fontWeight: 600,
                    fontSize: '1.25rem',
                    lineHeight: '1',
                    flexShrink: 0,
                  }}
                >
                  &#10003;
                </span>
                <span style={pStyle}>{item}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 3 — Ordering workflow (6 steps)                            */}
      {/* TODO-PL-US: Replace step titles and descriptions                   */}
      {/* ================================================================== */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>
          PLACEHOLDER_WORKFLOW_HEADING
        </h2>
        <p style={{ ...pStyle, marginBottom: '2rem' }}>
          PLACEHOLDER_WORKFLOW_INTRO
        </p>

        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {orderingSteps.map((step) => (
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
      {/* SECTION 4 — Contact section                                        */}
      {/* Telegram link, email, DaytonaCargo link                            */}
      {/* TODO-PL-US: Replace contact heading and descriptive text           */}
      {/* ================================================================== */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>
          PLACEHOLDER_CONTACT_HEADING
        </h2>
        <p style={{ ...pStyle, marginBottom: '1.5rem' }}>
          PLACEHOLDER_CONTACT_INTRO
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1rem',
          }}
        >
          {/* Telegram */}
          <div style={cardStyle}>
            <p
              style={{
                fontFamily: 'system-ui, sans-serif',
                fontWeight: 600,
                marginBottom: '0.5rem',
              }}
            >
              Telegram
            </p>
            <a
              href="PLACEHOLDER_TELEGRAM_LINK"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: accentColor, textDecoration: 'underline' }}
            >
              PLACEHOLDER_TELEGRAM_HANDLE
            </a>
          </div>

          {/* Email */}
          <div style={cardStyle}>
            <p
              style={{
                fontFamily: 'system-ui, sans-serif',
                fontWeight: 600,
                marginBottom: '0.5rem',
              }}
            >
              Email
            </p>
            <a
              href="mailto:PLACEHOLDER_EMAIL"
              style={{ color: accentColor, textDecoration: 'underline' }}
            >
              PLACEHOLDER_EMAIL
            </a>
          </div>

          {/* DaytonaCargo partner link */}
          <div style={cardStyle}>
            <p
              style={{
                fontFamily: 'system-ui, sans-serif',
                fontWeight: 600,
                marginBottom: '0.5rem',
              }}
            >
              DaytonaCargo
            </p>
            <a
              href="PLACEHOLDER_DAYTONA_LINK"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: accentColor, textDecoration: 'underline' }}
            >
              PLACEHOLDER_DAYTONA_LABEL
            </a>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 4b — Pricing overview                                      */}
      {/* TODO-PL-US: Replace pricing heading and card content               */}
      {/* ================================================================== */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>
          PLACEHOLDER_PRICING_HEADING
        </h2>
        <p style={{ ...pStyle, marginBottom: '1.5rem' }}>
          PLACEHOLDER_PRICING_INTRO
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1rem',
          }}
        >
          <div style={cardStyle}>
            <h3
              style={{
                fontFamily: 'system-ui, sans-serif',
                fontWeight: 600,
                fontSize: '0.95rem',
                marginBottom: '0.75rem',
                color: '#4A4A46',
              }}
            >
              PLACEHOLDER_PRICING_CARD_1_TITLE
            </h3>
            <div
              style={{
                fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                fontWeight: 300,
                color: accentColor,
                marginBottom: '0.5rem',
              }}
            >
              PLACEHOLDER_PRICING_CARD_1_AMOUNT
            </div>
            <p style={{ ...pStyle, fontSize: '0.9rem', margin: 0 }}>
              PLACEHOLDER_PRICING_CARD_1_NOTE
            </p>
          </div>

          <div style={cardStyle}>
            <h3
              style={{
                fontFamily: 'system-ui, sans-serif',
                fontWeight: 600,
                fontSize: '0.95rem',
                marginBottom: '0.75rem',
                color: '#4A4A46',
              }}
            >
              PLACEHOLDER_PRICING_CARD_2_TITLE
            </h3>
            <div
              style={{
                fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                fontWeight: 300,
                color: accentColor,
                marginBottom: '0.5rem',
              }}
            >
              PLACEHOLDER_PRICING_CARD_2_AMOUNT
            </div>
            <p style={{ ...pStyle, fontSize: '0.9rem', margin: 0 }}>
              PLACEHOLDER_PRICING_CARD_2_NOTE
            </p>
          </div>

          <div style={cardStyle}>
            <h3
              style={{
                fontFamily: 'system-ui, sans-serif',
                fontWeight: 600,
                fontSize: '0.95rem',
                marginBottom: '0.75rem',
                color: '#4A4A46',
              }}
            >
              PLACEHOLDER_PRICING_CARD_3_TITLE
            </h3>
            <div
              style={{
                fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                fontWeight: 300,
                color: accentColor,
                marginBottom: '0.5rem',
              }}
            >
              PLACEHOLDER_PRICING_CARD_3_AMOUNT
            </div>
            <p style={{ ...pStyle, fontSize: '0.9rem', margin: 0 }}>
              PLACEHOLDER_PRICING_CARD_3_NOTE
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 5 — Trust signals card                                     */}
      {/* MC#1741537, FMCSA, DaytonaCargo mention                           */}
      {/* TODO-PL-US: Replace trust heading and descriptions                 */}
      {/* ================================================================== */}
      <section style={sectionStyle}>
        <div
          style={{
            ...cardStyle,
            borderLeft: `4px solid ${accentColor}`,
          }}
        >
          <h2 style={{ ...h2Style, fontSize: '1.5rem' }}>
            PLACEHOLDER_TRUST_HEADING
          </h2>
          <p style={{ ...pStyle, marginBottom: '1rem' }}>
            PLACEHOLDER_TRUST_DESCRIPTION_1
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.5rem',
              marginTop: '1rem',
            }}
          >
            {/* MC number */}
            <div>
              <span
                style={{
                  fontFamily: 'system-ui, sans-serif',
                  fontWeight: 600,
                  display: 'block',
                  marginBottom: '0.25rem',
                }}
              >
                PLACEHOLDER_MC_LABEL
              </span>
              <span style={pStyle}>MC#1741537</span>
            </div>

            {/* FMCSA */}
            <div>
              <span
                style={{
                  fontFamily: 'system-ui, sans-serif',
                  fontWeight: 600,
                  display: 'block',
                  marginBottom: '0.25rem',
                }}
              >
                PLACEHOLDER_FMCSA_LABEL
              </span>
              <span style={pStyle}>PLACEHOLDER_FMCSA_STATUS</span>
            </div>

            {/* DaytonaCargo co-brand */}
            <div>
              <span
                style={{
                  fontFamily: 'system-ui, sans-serif',
                  fontWeight: 600,
                  display: 'block',
                  marginBottom: '0.25rem',
                }}
              >
                PLACEHOLDER_PARTNER_LABEL
              </span>
              <span style={pStyle}>DaytonaCargo</span>
            </div>
          </div>

          <p style={{ ...pStyle, marginTop: '1rem' }}>
            PLACEHOLDER_TRUST_DESCRIPTION_2
          </p>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 6 — FAQ                                                    */}
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
      {/* SECTION 7 — Dark CTA                                               */}
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

export default PolandUSShipMyCar;
