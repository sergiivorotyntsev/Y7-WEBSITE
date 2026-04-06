import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import HreflangTags from '../../components/HreflangTags';

// =============================================================================
// RussiaUSShipMyCar.jsx — Template C (Action/Ordering)
// Route: /ru-us/ship-my-car | lang="ru"
// Audience: Russian-speaking US diaspora ready to order transport
// =============================================================================
// IMPORTANT NOTES:
// - Y7 HAS Russian-speaking team members
// - DO NOT mention Russia as a destination (sanctions compliance)
// - Mention DaytonaCargo only as "international shipping" without specifying country
// - All visible text is PLACEHOLDER — replace with real copy before launch
// =============================================================================

// ---------------------------------------------------------------------------
// Structured Data — FAQ
// ---------------------------------------------------------------------------
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'PLACEHOLDER_FAQ_Q1',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PLACEHOLDER_FAQ_A1',
      },
    },
    {
      '@type': 'Question',
      name: 'PLACEHOLDER_FAQ_Q2',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PLACEHOLDER_FAQ_A2',
      },
    },
    {
      '@type': 'Question',
      name: 'PLACEHOLDER_FAQ_Q3',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PLACEHOLDER_FAQ_A3',
      },
    },
    {
      '@type': 'Question',
      name: 'PLACEHOLDER_FAQ_Q4',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PLACEHOLDER_FAQ_A4',
      },
    },
    {
      '@type': 'Question',
      name: 'PLACEHOLDER_FAQ_Q5',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PLACEHOLDER_FAQ_A5',
      },
    },
  ],
};

// ---------------------------------------------------------------------------
// Structured Data — Breadcrumb
// ---------------------------------------------------------------------------
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'PLACEHOLDER_BREADCRUMB_HOME',
      item: 'https://www.y7agency.com/',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'PLACEHOLDER_BREADCRUMB_RU_US',
      item: 'https://www.y7agency.com/ru-us',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'PLACEHOLDER_BREADCRUMB_SHIP',
      item: 'https://www.y7agency.com/ru-us/ship-my-car',
    },
  ],
};

// ---------------------------------------------------------------------------
// Data arrays
// ---------------------------------------------------------------------------

// TODO-RU-US: Replace with real checklist items
const CHECKLIST = [
  { label: 'PLACEHOLDER_CHECK_1_LABEL', detail: 'PLACEHOLDER_CHECK_1_DETAIL' },
  { label: 'PLACEHOLDER_CHECK_2_LABEL', detail: 'PLACEHOLDER_CHECK_2_DETAIL' },
  { label: 'PLACEHOLDER_CHECK_3_LABEL', detail: 'PLACEHOLDER_CHECK_3_DETAIL' },
  { label: 'PLACEHOLDER_CHECK_4_LABEL', detail: 'PLACEHOLDER_CHECK_4_DETAIL' },
  { label: 'PLACEHOLDER_CHECK_5_LABEL', detail: 'PLACEHOLDER_CHECK_5_DETAIL' },
  { label: 'PLACEHOLDER_CHECK_6_LABEL', detail: 'PLACEHOLDER_CHECK_6_DETAIL' },
];

// TODO-RU-US: Replace with real workflow steps
const WORKFLOW_STEPS = [
  { num: 1, title: 'PLACEHOLDER_WORKFLOW_1_TITLE', desc: 'PLACEHOLDER_WORKFLOW_1_DESC' },
  { num: 2, title: 'PLACEHOLDER_WORKFLOW_2_TITLE', desc: 'PLACEHOLDER_WORKFLOW_2_DESC' },
  { num: 3, title: 'PLACEHOLDER_WORKFLOW_3_TITLE', desc: 'PLACEHOLDER_WORKFLOW_3_DESC' },
  { num: 4, title: 'PLACEHOLDER_WORKFLOW_4_TITLE', desc: 'PLACEHOLDER_WORKFLOW_4_DESC' },
  { num: 5, title: 'PLACEHOLDER_WORKFLOW_5_TITLE', desc: 'PLACEHOLDER_WORKFLOW_5_DESC' },
  { num: 6, title: 'PLACEHOLDER_WORKFLOW_6_TITLE', desc: 'PLACEHOLDER_WORKFLOW_6_DESC' },
];

// TODO-RU-US: Replace with real FAQ content
const FAQS = [
  { q: 'PLACEHOLDER_FAQ_Q1', a: 'PLACEHOLDER_FAQ_A1' },
  { q: 'PLACEHOLDER_FAQ_Q2', a: 'PLACEHOLDER_FAQ_A2' },
  { q: 'PLACEHOLDER_FAQ_Q3', a: 'PLACEHOLDER_FAQ_A3' },
  { q: 'PLACEHOLDER_FAQ_Q4', a: 'PLACEHOLDER_FAQ_A4' },
  { q: 'PLACEHOLDER_FAQ_Q5', a: 'PLACEHOLDER_FAQ_A5' },
];

// ---------------------------------------------------------------------------
// Shared inline styles
// ---------------------------------------------------------------------------
const styles = {
  main: {
    fontFamily: 'Georgia, "Times New Roman", serif',
    color: '#2C2C2A',
    background: '#F7F5F0',
  },
  section: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: 'clamp(2rem, 5vw, 4rem) clamp(1.25rem, 4vw, 2rem)',
  },
  h1: {
    fontSize: 'clamp(2rem, 5vw, 3.25rem)',
    lineHeight: '1.15',
    fontWeight: 400,
  },
  h2: {
    fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
    lineHeight: '1.2',
    fontWeight: 400,
    marginBottom: '1rem',
  },
  paragraph: {
    fontSize: 'clamp(1rem, 2vw, 1.125rem)',
    lineHeight: '1.7',
    color: '#4A4A46',
  },
  card: {
    background: '#fff',
    padding: '1.5rem',
    borderRadius: '8px',
    border: '1px solid #E8E4DC',
  },
  ctaButton: {
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
  },
  darkCta: {
    background: '#2C2C2A',
    color: '#F7F5F0',
  },
  statNumber: {
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: 300,
    color: '#993C1D',
  },
  sansFont: {
    fontFamily: 'system-ui, sans-serif',
  },
  accent: {
    color: '#993C1D',
  },
};

// =============================================================================
// Component
// =============================================================================
function RussiaUSShipMyCar() {
  return (
    <div style={styles.main}>
      {/* ----------------------------------------------------------------- */}
      {/* Head / SEO                                                        */}
      {/* ----------------------------------------------------------------- */}
      <Helmet>
        {/* TODO-RU-US: Replace PLACEHOLDER meta with real Russian copy */}
        <html lang="ru" />
        <title>PLACEHOLDER_META_TITLE</title>
        <meta name="description" content="PLACEHOLDER_META_DESCRIPTION" />
        <link rel="canonical" href="https://www.y7agency.com/ru-us/ship-my-car" />
        <meta property="og:title" content="PLACEHOLDER_OG_TITLE" />
        <meta property="og:description" content="PLACEHOLDER_OG_DESCRIPTION" />
        <meta property="og:url" content="https://www.y7agency.com/ru-us/ship-my-car" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ru_US" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <HreflangTags
        currentPath="/ship-my-car"
        hasPolishVersion={true}
        hasUkrainianVersion={true}
        hasRussianUSVersion={true}
      />

      {/* ================================================================= */}
      {/* SECTION 1 — Hero (short)                                          */}
      {/* ================================================================= */}
      <section style={styles.section}>
        {/* TODO-RU-US: Replace hero heading and lead (~80 words) */}
        <h1 style={styles.h1}>
          PLACEHOLDER_H1
        </h1>
        <p
          style={{
            ...styles.paragraph,
            marginTop: '1.5rem',
            maxWidth: '720px',
          }}
        >
          PLACEHOLDER_LEAD_PARAGRAPH_LINE_1
          PLACEHOLDER_LEAD_PARAGRAPH_LINE_2
          PLACEHOLDER_LEAD_PARAGRAPH_LINE_3
          PLACEHOLDER_LEAD_PARAGRAPH_LINE_4
          PLACEHOLDER_LEAD_PARAGRAPH_LINE_5
          PLACEHOLDER_LEAD_PARAGRAPH_LINE_6
        </p>
      </section>

      {/* ================================================================= */}
      {/* SECTION 2 — What you need before ordering                         */}
      {/* ================================================================= */}
      <section
        style={{
          ...styles.section,
          borderTop: '1px solid #E8E4DC',
        }}
      >
        {/* TODO-RU-US: Replace heading */}
        <h2 style={styles.h2}>PLACEHOLDER_CHECKLIST_H2</h2>

        <div style={{ display: 'grid', gap: '1rem' }}>
          {CHECKLIST.map((item, i) => (
            <div
              key={i}
              style={{
                ...styles.card,
                display: 'grid',
                gridTemplateColumns: '2rem 1fr',
                gap: '1rem',
                alignItems: 'start',
              }}
            >
              <span
                style={{
                  ...styles.sansFont,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '1.75rem',
                  height: '1.75rem',
                  borderRadius: '4px',
                  border: '2px solid #993C1D',
                  color: '#993C1D',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </span>
              <div>
                <h3
                  style={{
                    ...styles.sansFont,
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    marginBottom: '0.25rem',
                    color: '#2C2C2A',
                  }}
                >
                  {item.label}
                </h3>
                <p
                  style={{
                    ...styles.paragraph,
                    fontSize: '0.9rem',
                  }}
                >
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 3 — Ordering workflow                                     */}
      {/* ================================================================= */}
      <section style={styles.section}>
        {/* TODO-RU-US: Replace heading */}
        <h2 style={styles.h2}>PLACEHOLDER_WORKFLOW_H2</h2>

        <ol
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'grid',
            gap: '1.25rem',
          }}
        >
          {WORKFLOW_STEPS.map((step) => (
            <li
              key={step.num}
              style={{
                ...styles.card,
                display: 'grid',
                gridTemplateColumns: '3rem 1fr',
                gap: '1rem',
                alignItems: 'start',
              }}
            >
              <span
                style={{
                  ...styles.sansFont,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '2.5rem',
                  height: '2.5rem',
                  borderRadius: '50%',
                  background: '#993C1D',
                  color: '#fff',
                  fontSize: '1rem',
                  fontWeight: 600,
                }}
              >
                {step.num}
              </span>
              <div>
                <h3
                  style={{
                    ...styles.sansFont,
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    marginBottom: '0.35rem',
                    color: '#2C2C2A',
                  }}
                >
                  {step.title}
                </h3>
                <p style={{ ...styles.paragraph, fontSize: '0.95rem' }}>
                  {step.desc}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ================================================================= */}
      {/* SECTION 4 — Why choose Y7                                         */}
      {/* ================================================================= */}
      <section
        style={{
          ...styles.section,
          borderTop: '1px solid #E8E4DC',
        }}
      >
        {/* TODO-RU-US: Replace heading and reasons */}
        <h2 style={styles.h2}>PLACEHOLDER_WHY_Y7_H2</h2>
        <p style={{ ...styles.paragraph, marginBottom: '2rem' }}>
          PLACEHOLDER_WHY_Y7_INTRO
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.25rem',
          }}
        >
          <div style={styles.card}>
            <p
              style={{
                ...styles.statNumber,
                fontSize: '1.75rem',
                marginBottom: '0.5rem',
              }}
            >
              PLACEHOLDER_WHY_1_ICON
            </p>
            <h3
              style={{
                ...styles.sansFont,
                fontSize: '1.05rem',
                fontWeight: 600,
                marginBottom: '0.35rem',
                color: '#2C2C2A',
              }}
            >
              PLACEHOLDER_WHY_1_TITLE
            </h3>
            <p style={{ ...styles.paragraph, fontSize: '0.9rem' }}>
              PLACEHOLDER_WHY_1_DESC
            </p>
          </div>

          <div style={styles.card}>
            <p
              style={{
                ...styles.statNumber,
                fontSize: '1.75rem',
                marginBottom: '0.5rem',
              }}
            >
              PLACEHOLDER_WHY_2_ICON
            </p>
            <h3
              style={{
                ...styles.sansFont,
                fontSize: '1.05rem',
                fontWeight: 600,
                marginBottom: '0.35rem',
                color: '#2C2C2A',
              }}
            >
              PLACEHOLDER_WHY_2_TITLE
            </h3>
            <p style={{ ...styles.paragraph, fontSize: '0.9rem' }}>
              PLACEHOLDER_WHY_2_DESC
            </p>
          </div>

          <div style={styles.card}>
            <p
              style={{
                ...styles.statNumber,
                fontSize: '1.75rem',
                marginBottom: '0.5rem',
              }}
            >
              PLACEHOLDER_WHY_3_ICON
            </p>
            <h3
              style={{
                ...styles.sansFont,
                fontSize: '1.05rem',
                fontWeight: 600,
                marginBottom: '0.35rem',
                color: '#2C2C2A',
              }}
            >
              PLACEHOLDER_WHY_3_TITLE
            </h3>
            <p style={{ ...styles.paragraph, fontSize: '0.9rem' }}>
              PLACEHOLDER_WHY_3_DESC
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 5 — Contact                                               */}
      {/* ================================================================= */}
      <section
        style={{
          ...styles.section,
          borderTop: '1px solid #E8E4DC',
        }}
      >
        {/* TODO-RU-US: Replace heading */}
        <h2 style={styles.h2}>PLACEHOLDER_CONTACT_H2</h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {/* Telegram */}
          <div style={styles.card}>
            <p
              style={{
                ...styles.sansFont,
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: '#993C1D',
                marginBottom: '0.5rem',
              }}
            >
              Telegram
            </p>
            <a
              href="https://t.me/y7logistics"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                ...styles.sansFont,
                fontSize: '1.1rem',
                fontWeight: 600,
                color: '#2C2C2A',
                textDecoration: 'none',
              }}
            >
              PLACEHOLDER_TELEGRAM_HANDLE
            </a>
            <p
              style={{
                ...styles.paragraph,
                fontSize: '0.85rem',
                marginTop: '0.5rem',
              }}
            >
              PLACEHOLDER_TELEGRAM_NOTE
            </p>
          </div>

          {/* Email */}
          <div style={styles.card}>
            <p
              style={{
                ...styles.sansFont,
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: '#993C1D',
                marginBottom: '0.5rem',
              }}
            >
              Email
            </p>
            <a
              href="mailto:info@y7agency.com"
              style={{
                ...styles.sansFont,
                fontSize: '1.1rem',
                fontWeight: 600,
                color: '#2C2C2A',
                textDecoration: 'none',
              }}
            >
              info@y7agency.com
            </a>
            <p
              style={{
                ...styles.paragraph,
                fontSize: '0.85rem',
                marginTop: '0.5rem',
              }}
            >
              PLACEHOLDER_EMAIL_NOTE
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 6 — Trust signals                                         */}
      {/* ================================================================= */}
      <section style={styles.section}>
        <div
          style={{
            ...styles.card,
            textAlign: 'center',
            padding: '2rem',
            borderLeft: '4px solid #993C1D',
          }}
        >
          <p
            style={{
              ...styles.sansFont,
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#993C1D',
              marginBottom: '0.75rem',
            }}
          >
            PLACEHOLDER_TRUST_LABEL
          </p>
          <p
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 300,
              color: '#2C2C2A',
              marginBottom: '0.5rem',
            }}
          >
            MC#1741537
          </p>
          <p
            style={{
              ...styles.paragraph,
              fontSize: '0.95rem',
            }}
          >
            PLACEHOLDER_TRUST_FMCSA_NOTE
          </p>
          <a
            href="https://safer.fmcsa.dot.gov/CompanySnapshot.aspx"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              ...styles.sansFont,
              display: 'inline-block',
              marginTop: '1rem',
              fontSize: '0.9rem',
              color: '#993C1D',
              textDecoration: 'underline',
            }}
          >
            PLACEHOLDER_TRUST_VERIFY_LINK
          </a>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 7 — FAQ                                                   */}
      {/* ================================================================= */}
      <section
        style={{
          ...styles.section,
          borderTop: '1px solid #E8E4DC',
        }}
      >
        {/* TODO-RU-US: Replace heading */}
        <h2 style={styles.h2}>PLACEHOLDER_FAQ_H2</h2>

        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {FAQS.map((faq, i) => (
            <details
              key={i}
              style={{
                ...styles.card,
                cursor: 'pointer',
              }}
            >
              <summary
                style={{
                  ...styles.sansFont,
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  color: '#2C2C2A',
                  listStyle: 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                {faq.q}
                <span
                  style={{
                    fontSize: '1.25rem',
                    color: '#993C1D',
                    marginLeft: '1rem',
                    flexShrink: 0,
                  }}
                >
                  +
                </span>
              </summary>
              <p
                style={{
                  ...styles.paragraph,
                  marginTop: '1rem',
                  fontSize: '0.95rem',
                }}
              >
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 8 — Dark CTA                                              */}
      {/* ================================================================= */}
      <section
        style={{
          ...styles.darkCta,
          padding: 'clamp(3rem, 6vw, 5rem) clamp(1.25rem, 4vw, 2rem)',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          {/* TODO-RU-US: Replace CTA copy */}
          <h2
            style={{
              ...styles.h2,
              color: '#F7F5F0',
            }}
          >
            PLACEHOLDER_DARK_CTA_H2
          </h2>
          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.125rem)',
              lineHeight: '1.7',
              color: '#A8A49C',
              marginBottom: '2rem',
            }}
          >
            PLACEHOLDER_DARK_CTA_DESCRIPTION
          </p>
          <a
            href="https://t.me/y7logistics"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              ...styles.ctaButton,
              fontSize: '1.05rem',
            }}
          >
            PLACEHOLDER_DARK_CTA_BUTTON
          </a>
          <p
            style={{
              ...styles.sansFont,
              fontSize: '0.85rem',
              color: '#6B6963',
              marginTop: '1rem',
            }}
          >
            PLACEHOLDER_DARK_CTA_SUBTEXT
          </p>
        </div>
      </section>
    </div>
  );
}

export default RussiaUSShipMyCar;
