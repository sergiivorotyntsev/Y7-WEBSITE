import { useParams, Link, Navigate } from 'react-router-dom';
import PageMeta from '../../components/PageMeta';
import BreadcrumbSchema from '../../components/BreadcrumbSchema';
import articles, { CATEGORIES } from '../../data/blogArticles';
import BANNER_MAP from './BlogBanners';
import ShareButtons from '../../components/ShareButtons';
import { colors, fonts } from '../../theme';

// Static imports — required for prerender (no React.lazy)
import CarrierWhoVanished from './articles/CarrierWhoVanished';
import CarrierCOIVerification from './articles/CarrierCOIVerification';
import FMCSA2026NewRules from './articles/FMCSA2026NewRules';
import OutboxPatternDispatch from './articles/OutboxPatternDispatch';
import DealerAuctionPickupGuide from './articles/DealerAuctionPickupGuide';
import ExporterDocumentationChecklist from './articles/ExporterDocumentationChecklist';
import FMCSABrokerRecordkeeping from './articles/FMCSABrokerRecordkeeping';
import BondClaimsGuide from './articles/BondClaimsGuide';

const ARTICLE_COMPONENTS = {
  'carrier-who-vanished': CarrierWhoVanished,
  'carrier-coi-verification-guide': CarrierCOIVerification,
  'fmcsa-2026-new-rules': FMCSA2026NewRules,
  'outbox-pattern-dispatch': OutboxPatternDispatch,
  'dealer-auction-pickup-guide': DealerAuctionPickupGuide,
  'exporter-documentation-checklist': ExporterDocumentationChecklist,
  'fmcsa-broker-recordkeeping-2026': FMCSABrokerRecordkeeping,
  '75000-bond-claims-guide': BondClaimsGuide,
};

const theme = { text: colors.text, accent: colors.accent, success: colors.success, dark: colors.dark, bg: colors.bg, fonts };

export default function BlogArticle() {
  const { slug } = useParams();
  const article = articles.find(a => a.slug === slug);

  if (!article) return <Navigate to="/blog" replace />;

  const ArticleContent = ARTICLE_COMPONENTS[slug];
  const cat = CATEGORIES[article.category] || {};
  const Banner = BANNER_MAP[article.category];

  // Related: same category, exclude current, max 3
  const related = articles
    .filter(a => a.category === article.category && a.slug !== slug)
    .slice(0, 3);

  const blogPostingSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.dateISO,
    dateModified: article.dateISO,
    author: {
      '@type': 'Organization',
      name: 'Y7 Logistics',
      url: 'https://www.y7agency.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Y7 Consulting Inc.',
      url: 'https://www.y7agency.com',
    },
    mainEntityOfPage: `https://www.y7agency.com/blog/${slug}`,
  });

  return (
    <div>
      <PageMeta
        title={article.metaTitle}
        description={article.metaDescription}
        path={`/blog/${slug}`}
        schema={blogPostingSchema}
        ogType="article"
        ogImage="https://www.y7agency.com/og-blog.svg"
        articlePublishedTime={article.dateISO}
        articleAuthor="Y7 Logistics"
        articleSection={cat.label}
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Blog', url: '/blog' },
        { name: article.title, url: `/blog/${slug}` },
      ]} />

      {/* Banner */}
      <div style={{ height: 'clamp(200px, 20vw, 280px)', overflow: 'hidden' }}>
        {Banner && <Banner />}
      </div>

      {/* Content container */}
      <article style={{ maxWidth: 720, margin: '0 auto', padding: '40px 24px 80px' }}>
        {/* Category badge */}
        <span style={{
          display: 'inline-block',
          fontFamily: fonts.sans,
          fontSize: '0.72rem',
          fontWeight: 700,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          color: '#fff',
          background: cat.color || colors.dark,
          padding: '4px 12px',
          borderRadius: 10,
          marginBottom: 16,
        }}>
          {cat.label}
        </span>

        {/* Title */}
        <h1 style={{
          fontFamily: fonts.serif,
          fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
          fontWeight: 700,
          color: colors.text,
          lineHeight: 1.2,
          marginBottom: 16,
        }}>
          {article.title}
        </h1>

        {/* Meta line */}
        <div style={{
          fontFamily: fonts.sans,
          fontSize: '0.88rem',
          color: colors.textMuted,
          marginBottom: 24,
          display: 'flex',
          gap: 12,
          flexWrap: 'wrap',
          alignItems: 'center',
        }}>
          <span>{article.date}</span>
          <span>&middot;</span>
          <span>{article.readTime}</span>
          <span>&middot;</span>
          <span>Y7 Dispatch Team</span>
        </div>

        {/* Share buttons (top) */}
        <ShareButtons
          url={`https://www.y7agency.com/blog/${article.slug}`}
          title={article.title}
          description={article.excerpt}
        />

        {/* Divider */}
        <div style={{ height: 1, background: colors.border, marginBottom: 32 }} />

        {/* Article body */}
        {ArticleContent && <ArticleContent theme={theme} />}

        {/* Share buttons (bottom) */}
        <div style={{ borderTop: `1px solid ${colors.border}`, paddingTop: 24, marginTop: 36 }}>
          <ShareButtons
            url={`https://www.y7agency.com/blog/${article.slug}`}
            title={article.title}
            description={article.excerpt}
          />
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 40, marginBottom: 32 }}>
          {article.tags.map(tag => (
            <span key={tag} style={{
              fontFamily: fonts.mono,
              fontSize: '0.75rem',
              color: colors.textMuted,
              background: colors.bgMuted,
              padding: '4px 12px',
              borderRadius: 8,
            }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Back to Blog */}
        <Link
          to="/blog"
          style={{
            fontFamily: fonts.sans,
            fontSize: '0.9rem',
            fontWeight: 600,
            color: colors.accent,
            textDecoration: 'none',
          }}
        >
          &larr; Back to Blog
        </Link>
      </article>

      {/* Related Articles */}
      {related.length > 0 && (
        <section style={{
          background: colors.bgMuted,
          borderTop: `1px solid ${colors.border}`,
          padding: '48px 24px 64px',
        }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <h2 style={{
              fontFamily: fonts.serif,
              fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
              fontWeight: 700,
              color: colors.text,
              marginBottom: 24,
            }}>
              Related Articles
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 20,
            }}>
              {related.map(r => {
                const rCat = CATEGORIES[r.category] || {};
                return (
                  <Link
                    key={r.slug}
                    to={`/blog/${r.slug}`}
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                      background: '#fff',
                      borderRadius: 10,
                      padding: '20px 24px',
                      boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
                      transition: 'transform 0.2s ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
                  >
                    <span style={{
                      fontFamily: fonts.sans,
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      color: '#fff',
                      background: rCat.color || colors.dark,
                      padding: '2px 8px',
                      borderRadius: 8,
                      letterSpacing: '0.04em',
                    }}>
                      {rCat.label}
                    </span>
                    <h3 style={{
                      fontFamily: fonts.serif,
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: colors.text,
                      lineHeight: 1.35,
                      marginTop: 10,
                      marginBottom: 6,
                    }}>
                      {r.title}
                    </h3>
                    <span style={{
                      fontFamily: fonts.sans,
                      fontSize: '0.78rem',
                      color: colors.textMuted,
                    }}>
                      {r.date} &middot; {r.readTime}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
