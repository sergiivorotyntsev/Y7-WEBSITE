import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '../../components/PageMeta';
import BreadcrumbSchema from '../../components/BreadcrumbSchema';
import articles, { CATEGORIES } from '../../data/blogArticles';
import BANNER_MAP from './BlogBanners';
import styles from './BlogIndex.module.css';

const ALL_FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'fmcsa', label: 'FMCSA' },
  { key: 'insurance', label: 'Insurance' },
  { key: 'carrier', label: 'Carrier Stories' },
  { key: 'broker', label: 'Broker Tips' },
  { key: 'dealer', label: 'For Dealers' },
  { key: 'exporter', label: 'For Exporters' },
];

const collectionSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Y7 Logistics Blog — Dispatches from the Road',
  description: 'Auto transport industry insights from a licensed FMCSA broker. Carrier stories, compliance guides, dealer tips, and exporter checklists.',
  url: 'https://www.y7agency.com/blog',
  publisher: {
    '@type': 'Organization',
    name: 'Y7 Consulting Inc.',
    url: 'https://www.y7agency.com',
  },
});

export default function BlogIndex() {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? articles : articles.filter(a => a.category === filter);

  return (
    <div>
      <PageMeta
        title="Blog — Dispatches from the Road"
        description="Auto transport industry insights from a licensed FMCSA broker. Carrier stories, compliance guides, dealer tips, and exporter checklists."
        path="/blog"
        schema={collectionSchema}
      />
      <BreadcrumbSchema items={[{ name: 'Home', url: '/' }, { name: 'Blog', url: '/blog' }]} />

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroKicker}>&#9670; Dispatches from the Road</div>
          <h1 className={styles.heroTitle}>
            Real Stories. Real Loads.{' '}
            <span style={{ display: 'block' }}>No Sugarcoating.</span>
          </h1>
          <p className={styles.heroDesc}>
            Industry insights from a team that processes thousands of loads, carrier messages, and compliance events every month. Written for brokers, dealers, and exporters who want substance over marketing.
          </p>
          <div className={styles.heroStats}>
            {[
              { num: '267+', label: 'Carriers' },
              { num: '3,674', label: 'Messages' },
              { num: 'MC #1741537', label: 'FMCSA Licensed' },
            ].map(s => (
              <div key={s.label}>
                <div className={styles.heroStatNum}>{s.num}</div>
                <div className={styles.heroStatLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className={styles.filterBar}>
        <div className={styles.filterInner}>
          {ALL_FILTERS.map(f => {
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`${styles.filterBtn} ${active ? styles.filterBtnActive : ''}`}
                aria-pressed={active}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Articles Grid */}
      <section className={styles.articlesSection}>
        <div className={styles.grid}>
          {filtered.map(article => {
            const cat = CATEGORIES[article.category] || {};
            const Banner = BANNER_MAP[article.category];
            return (
              <Link key={article.slug} to={`/blog/${article.slug}`} className={styles.card}>
                <div className={styles.banner}>
                  {Banner && <Banner />}
                </div>

                <div className={styles.content}>
                  <div className={styles.meta}>
                    <span
                      className={styles.categoryBadge}
                      style={{ background: cat.color || 'var(--text)' }}
                    >
                      {cat.label}
                    </span>
                    <span className={styles.metaText}>
                      {article.date} &middot; {article.readTime}
                    </span>
                  </div>

                  <h2 className={styles.cardTitle}>{article.title}</h2>
                  <p className={styles.cardExcerpt}>{article.excerpt}</p>

                  <div className={styles.tags}>
                    {article.tags.slice(0, 3).map(tag => (
                      <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className={styles.empty}>No articles in this category yet. Check back soon.</p>
        )}
      </section>
    </div>
  );
}
