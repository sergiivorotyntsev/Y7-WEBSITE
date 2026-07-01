import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import BreadcrumbSchema from '../components/BreadcrumbSchema';
import { ChevronRightIcon } from '../components/icons';
import styles from './FAQ.module.css';

// One FAQPage JSON-LD block, derived directly from the visible categories/items
// so the markup text always matches what renders on the page (Google requires
// markup to match visible content; a mismatch is a structured-data quality risk).
//
// NOTE ON VALUE: this schema no longer earns Google's FAQ rich-result dropdown —
// Google fully deprecated that SERP feature on 2026-05-07. It is kept because it
// still helps Bing (which parses FAQPage), AI answer engines (ChatGPT / Perplexity
// / Google AI Overviews) that consume clean Q&A, and general machine-readability.
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

// Kebab-case anchor id from a category name, used when a locale category
// has no explicit `id` (keeps older locale files working unchanged).
function slugify(name) {
  return String(name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Render an answer string, turning any configured `links` phrases into
// internal <Link>s (first occurrence of each phrase). The plain-text `a`
// stays the single source of truth, so the JSON-LD stays an exact match.
function renderAnswer(text, links) {
  if (!Array.isArray(links) || links.length === 0) return text;

  const marks = [];
  links.forEach(({ text: phrase, href }) => {
    const idx = text.indexOf(phrase);
    if (idx !== -1) marks.push({ idx, phrase, href });
  });
  marks.sort((a, b) => a.idx - b.idx);

  const nodes = [];
  let cursor = 0;
  marks.forEach((m, i) => {
    if (m.idx < cursor) return; // overlapping phrase, skip
    if (m.idx > cursor) nodes.push(text.slice(cursor, m.idx));
    nodes.push(
      <Link key={i} to={m.href} className={styles.answerLink}>{m.phrase}</Link>
    );
    cursor = m.idx + m.phrase.length;
  });
  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
}

function QAItem({ question, answer, links }) {
  return (
    <details className={styles.qaItem}>
      <summary className={styles.qaSummary}>
        <h3 className={styles.qaQuestion}>{question}</h3>
        <span className={styles.qaChevron} aria-hidden="true">
          <ChevronRightIcon size={16} />
        </span>
      </summary>
      <p className={styles.qaAnswer}>{renderAnswer(answer, links)}</p>
    </details>
  );
}

export default function FAQ() {
  const { t, i18n } = useTranslation('faq');
  const { t: tCommon } = useTranslation('common');

  const categories = t('categories', { returnObjects: true });
  const validCategories = Array.isArray(categories) ? categories : [];
  const sections = validCategories.map(cat => ({
    ...cat,
    anchor: cat.id || slugify(cat.name),
  }));

  // Read these directly from the active locale's bundle (not via t(), which would
  // fall back to the English string). Keeps the enriched EN-only fields — TL;DR,
  // last-updated, nav label — from leaking onto the untouched ru/pl/ua pages.
  const lng = i18n.language;
  const tldr = i18n.getResource(lng, 'faq', 'tldr') || '';
  const lastUpdated = i18n.getResource(lng, 'faq', 'lastUpdated') || '';
  const navLabel = i18n.getResource(lng, 'faq', 'navLabel') || '';

  return (
    <div className={styles.wrap}>
      <BreadcrumbSchema items={[{ name: 'Home', url: '/' }, { name: 'FAQ', url: '/faq' }]} />
      <PageMeta
        title={tCommon('meta.faqTitle')}
        description={tCommon('meta.faqDescription')}
        path="/faq"
      />

      {validCategories.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: buildJsonLd(validCategories) }}
        />
      )}

      <section className={styles.hero}>
        <span className={styles.kicker}>&#9670; Help Center</span>
        <h1 className={styles.title}>{t('title')}</h1>
        <p className={styles.subtitle}>{t('subtitle')}</p>
        {lastUpdated && (
          <p className={styles.updated}>Last updated: {lastUpdated}</p>
        )}
      </section>

      <div className={styles.body}>
        {tldr && (
          <aside className={styles.tldr} aria-label="About Y7 Logistics">
            <span className={styles.tldrKicker}>&#9670; Who is Y7</span>
            <p className={styles.tldrText}>{tldr}</p>
          </aside>
        )}

        {sections.length > 1 && (
          <nav className={styles.jumpNav} aria-label={navLabel || 'Sections'}>
            {navLabel && <span className={styles.jumpLabel}>{navLabel}</span>}
            <div className={styles.jumpLinks}>
              {sections.map(sec => (
                <a key={sec.anchor} href={`#${sec.anchor}`} className={styles.jumpLink}>
                  {sec.name}
                </a>
              ))}
            </div>
          </nav>
        )}

        {sections.map((sec, i) => (
          <section key={sec.anchor} id={sec.anchor} className={styles.section} style={{ '--i': i }}>
            <div className={styles.sectionHead}>
              {sec.kicker && (
                <span className={styles.sectionKicker}>&#9670; {sec.kicker}</span>
              )}
              <h2 className={styles.sectionTitle}>{sec.name}</h2>
            </div>
            <div className={styles.card}>
              {Array.isArray(sec.items) && sec.items.map((item, j) => (
                <QAItem key={j} question={item.q} answer={item.a} links={item.links} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
