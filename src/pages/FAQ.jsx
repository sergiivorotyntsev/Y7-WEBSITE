import { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import PageMeta from '../components/PageMeta';
import { colors, fonts } from '../theme';

/* ── helpers ─────────────────────────────────── */

function buildJsonLd(categories) {
  const entities = [];
  categories.forEach(cat => {
    cat.items.forEach(item => {
      entities.push({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      });
    });
  });
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: entities,
  });
}

/* ── single Q/A row ──────────────────────────── */

function QAItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (bodyRef.current) setHeight(bodyRef.current.scrollHeight);
  }, [answer]);

  return (
    <div style={{ borderBottom: `1px solid ${colors.border}` }}>
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          padding: '16px 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          fontFamily: fonts.sans,
          fontSize: '15px',
          fontWeight: 600,
          color: colors.text,
          lineHeight: 1.5,
        }}
      >
        <span>{question}</span>
        <span
          style={{
            color: colors.accent,
            fontSize: '18px',
            flexShrink: 0,
            transition: 'transform 250ms ease',
            transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
          }}
          aria-hidden="true"
        >
          &#9656;
        </span>
      </button>
      <div
        ref={bodyRef}
        style={{
          maxHeight: open ? height + 'px' : '0px',
          overflow: 'hidden',
          transition: 'max-height 300ms ease',
        }}
      >
        <p
          style={{
            fontFamily: fonts.sans,
            fontSize: '14px',
            color: colors.textMuted,
            lineHeight: 1.7,
            padding: '0 0 16px',
            margin: 0,
          }}
        >
          {answer}
        </p>
      </div>
    </div>
  );
}

/* ── category accordion ──────────────────────── */

function Category({ name, items, isOpen, onToggle }) {
  const bodyRef = useRef(null);
  const [height, setHeight] = useState(0);

  const measure = useCallback(() => {
    if (bodyRef.current) setHeight(bodyRef.current.scrollHeight);
  }, []);

  useEffect(() => { measure(); }, [items, isOpen, measure]);

  return (
    <div
      style={{
        background: colors.bgCard,
        border: `1px solid ${colors.border}`,
        borderRadius: '16px',
        marginBottom: '16px',
        overflow: 'hidden',
      }}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          padding: '20px 24px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span
          style={{
            fontFamily: fonts.serif,
            fontSize: '18px',
            fontWeight: 700,
            color: colors.text,
          }}
        >
          {name}
        </span>
        <span
          style={{
            color: colors.accent,
            fontSize: '20px',
            flexShrink: 0,
            transition: 'transform 300ms ease',
            transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
            lineHeight: 1,
          }}
          aria-hidden="true"
        >
          &#9656;
        </span>
      </button>
      <div
        ref={bodyRef}
        style={{
          maxHeight: isOpen ? height + 'px' : '0px',
          overflow: 'hidden',
          transition: 'max-height 350ms ease',
        }}
      >
        <div style={{ padding: '0 24px 8px' }}>
          {items.map((item, j) => (
            <QAItem key={j} question={item.q} answer={item.a} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── page ─────────────────────────────────────── */

export default function FAQ() {
  const { t } = useTranslation('faq');
  const categories = t('categories', { returnObjects: true });
  const [openCat, setOpenCat] = useState(0);

  const validCategories = Array.isArray(categories) ? categories : [];

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 24px 80px' }}>
      <PageMeta
        title="FAQ"
        description="Common questions about auto transport: pricing, timing, insurance, BOL, auction pickup, port delivery."
        path="/faq"
      />

      {validCategories.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: buildJsonLd(validCategories) }}
        />
      )}

      <h1
        style={{
          fontFamily: fonts.serif,
          fontSize: 'clamp(28px, 4vw, 42px)',
          fontWeight: 700,
          color: colors.text,
          textAlign: 'center',
          marginBottom: '8px',
        }}
      >
        {t('title')}
      </h1>
      <p
        style={{
          fontFamily: fonts.sans,
          fontSize: '15px',
          color: colors.textMuted,
          textAlign: 'center',
          marginBottom: '48px',
        }}
      >
        {t('subtitle')}
      </p>

      {validCategories.map((cat, i) => (
        <Category
          key={i}
          name={cat.name}
          items={cat.items}
          isOpen={openCat === i}
          onToggle={() => setOpenCat(prev => (prev === i ? -1 : i))}
        />
      ))}
    </div>
  );
}
