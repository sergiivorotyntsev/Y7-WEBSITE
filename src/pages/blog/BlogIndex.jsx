import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '../../components/PageMeta';
import BreadcrumbSchema from '../../components/BreadcrumbSchema';
import articles, { CATEGORIES } from '../../data/blogArticles';
import BANNER_MAP from './BlogBanners';
import { colors, fonts } from '../../theme';

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
      <section style={{
        background: colors.dark,
        padding: 'clamp(48px, 8vw, 80px) 24px clamp(40px, 6vw, 64px)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{
            fontFamily: fonts.sans,
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: colors.accent,
            marginBottom: 16,
          }}>
            &#9670; Dispatches from the Road
          </div>
          <h1 style={{
            fontFamily: fonts.serif,
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 700,
            color: colors.bg,
            lineHeight: 1.15,
            marginBottom: 16,
          }}>
            Real Stories. Real Loads.{' '}
            <span style={{ display: 'block' }}>No Sugarcoating.</span>
          </h1>
          <p style={{
            fontFamily: fonts.sans,
            fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
            color: '#A8A49C',
            lineHeight: 1.7,
            maxWidth: 600,
            marginBottom: 32,
          }}>
            Industry insights from a team that processes thousands of loads, carrier messages, and compliance events every month. Written for brokers, dealers, and exporters who want substance over marketing.
          </p>
          <div style={{
            display: 'flex',
            gap: 'clamp(16px, 3vw, 32px)',
            flexWrap: 'wrap',
          }}>
            {[
              { num: '267+', label: 'Carriers' },
              { num: '3,674', label: 'Messages' },
              { num: 'MC #1741537', label: 'FMCSA Licensed' },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontFamily: fonts.mono, fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', fontWeight: 700, color: colors.accent }}>
                  {s.num}
                </div>
                <div style={{ fontFamily: fonts.sans, fontSize: '0.75rem', color: '#888780', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 2 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section style={{
        background: colors.bg,
        borderBottom: `1px solid ${colors.border}`,
        padding: '16px 24px',
        position: 'sticky',
        top: 64,
        zIndex: 50,
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
        }}>
          {ALL_FILTERS.map(f => {
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                style={{
                  fontFamily: fonts.sans,
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  letterSpacing: '0.03em',
                  textTransform: 'uppercase',
                  padding: '8px 16px',
                  borderRadius: 20,
                  border: active ? 'none' : `1px solid ${colors.border}`,
                  background: active ? colors.dark : 'transparent',
                  color: active ? '#fff' : colors.textMuted,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Articles Grid */}
      <section style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '40px 24px 80px',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: 24,
        }}>
          {filtered.map(article => {
            const cat = CATEGORIES[article.category] || {};
            const Banner = BANNER_MAP[article.category];
            return (
              <Link
                key={article.slug}
                to={`/blog/${article.slug}`}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  background: '#fff',
                  borderRadius: 12,
                  overflow: 'hidden',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'; }}
              >
                {/* Banner */}
                <div style={{ height: 160, overflow: 'hidden' }}>
                  {Banner && <Banner />}
                </div>

                {/* Content */}
                <div style={{ padding: '20px 24px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  {/* Category + Meta */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <span style={{
                      fontFamily: fonts.sans,
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      color: '#fff',
                      background: cat.color || colors.dark,
                      padding: '3px 10px',
                      borderRadius: 10,
                    }}>
                      {cat.label}
                    </span>
                    <span style={{ fontFamily: fonts.sans, fontSize: '0.78rem', color: colors.textMuted }}>
                      {article.date} &middot; {article.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 style={{
                    fontFamily: fonts.serif,
                    fontSize: 'clamp(1.05rem, 2vw, 1.2rem)',
                    fontWeight: 700,
                    color: colors.text,
                    lineHeight: 1.35,
                    marginBottom: 10,
                  }}>
                    {article.title}
                  </h2>

                  {/* Excerpt */}
                  <p style={{
                    fontFamily: fonts.sans,
                    fontSize: '0.88rem',
                    color: colors.textMuted,
                    lineHeight: 1.6,
                    flex: 1,
                    marginBottom: 16,
                  }}>
                    {article.excerpt}
                  </p>

                  {/* Tags */}
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {article.tags.slice(0, 3).map(tag => (
                      <span key={tag} style={{
                        fontFamily: fonts.mono,
                        fontSize: '0.7rem',
                        color: colors.textMuted,
                        background: colors.bgMuted,
                        padding: '2px 8px',
                        borderRadius: 6,
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p style={{
            fontFamily: fonts.sans,
            fontSize: '1rem',
            color: colors.textMuted,
            textAlign: 'center',
            padding: '60px 0',
          }}>
            No articles in this category yet. Check back soon.
          </p>
        )}
      </section>
    </div>
  );
}
