import { useParams, Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageMeta from '../../components/PageMeta';
import BreadcrumbSchema from '../../components/BreadcrumbSchema';
import articles, { CATEGORIES, authorFor } from '../../data/blogArticles';
import BANNER_MAP from './BlogBanners';
import ShareButtons from '../../components/ShareButtons';
import { colors, fonts } from '../../theme';
import styles from './BlogArticle.module.css';

// Static imports — required for prerender (no React.lazy)
import CarrierWhoVanished from './articles/CarrierWhoVanished';
import CarrierCOIVerification from './articles/CarrierCOIVerification';
import FMCSA2026NewRules from './articles/FMCSA2026NewRules';
import OutboxPatternDispatch from './articles/OutboxPatternDispatch';
import DealerAuctionPickupGuide from './articles/DealerAuctionPickupGuide';
import ExporterDocumentationChecklist from './articles/ExporterDocumentationChecklist';
import FMCSABrokerRecordkeeping from './articles/FMCSABrokerRecordkeeping';
import BondClaimsGuide from './articles/BondClaimsGuide';
import CopartIaaManheimComparison from './articles/CopartIaaManheimComparison';
import AuctionToPortCostBreakdown2026 from './articles/AuctionToPortCostBreakdown2026';
import CentralDispatchListingDecoded from './articles/CentralDispatchListingDecoded';
import EnclosedTransportWhenToSkip from './articles/EnclosedTransportWhenToSkip';
import NonRunningVehicleShipping from './articles/NonRunningVehicleShipping';
import WinterAutoTransportPricing from './articles/WinterAutoTransportPricing';
import BillOfLadingPickupDelivery from './articles/BillOfLadingPickupDelivery';
import PortExportNewarkHoustonSavannah from './articles/PortExportNewarkHoustonSavannah';
import CopartStorageFeesRealCost from './articles/CopartStorageFeesRealCost';
import CopartInternationalBuyersGuide from './articles/CopartInternationalBuyersGuide';

const ARTICLE_COMPONENTS = {
  'carrier-who-vanished': CarrierWhoVanished,
  'carrier-coi-verification-guide': CarrierCOIVerification,
  'fmcsa-2026-new-rules': FMCSA2026NewRules,
  'outbox-pattern-dispatch': OutboxPatternDispatch,
  'dealer-auction-pickup-guide': DealerAuctionPickupGuide,
  'exporter-documentation-checklist': ExporterDocumentationChecklist,
  'fmcsa-broker-recordkeeping-2026': FMCSABrokerRecordkeeping,
  '75000-bond-claims-guide': BondClaimsGuide,
  'copart-iaa-manheim-comparison': CopartIaaManheimComparison,
  'auction-to-port-cost-breakdown-2026': AuctionToPortCostBreakdown2026,
  'central-dispatch-listing-decoded': CentralDispatchListingDecoded,
  'enclosed-transport-when-to-skip': EnclosedTransportWhenToSkip,
  'non-running-vehicle-shipping-playbook': NonRunningVehicleShipping,
  'winter-auto-transport-pricing': WinterAutoTransportPricing,
  'bill-of-lading-pickup-delivery-guide': BillOfLadingPickupDelivery,
  'port-specific-export-newark-houston-savannah': PortExportNewarkHoustonSavannah,
  'copart-storage-fees-real-cost-2026': CopartStorageFeesRealCost,
  'copart-for-international-buyers-complete-guide': CopartInternationalBuyersGuide,
};

const RELATED_SERVICES = {
  'dealer-auction-pickup-guide': [
    { to: '/auction-car-shipping',   label: 'Auction car shipping' },
    { to: '/copart-shipping',        label: 'Copart shipping services' },
    { to: '/dealer-auto-transport',  label: 'Dealer auto transport' },
  ],
  'exporter-documentation-checklist': [
    { to: '/door-to-port-auto-transport', label: 'Door-to-port transport' },
    { to: '/auction-to-port-transport',   label: 'Auction-to-port shipping' },
    { to: '/new-jersey-auto-transport',   label: 'New Jersey (Port Newark) transport' },
  ],
  'carrier-who-vanished': [
    { to: '/state-to-state-car-shipping', label: 'State-to-state car shipping' },
    { to: '/ship-my-car',                 label: 'Ship my car — door-to-door' },
    { to: '/car-shipping-cost',           label: 'Car shipping cost guide' },
  ],
  'carrier-coi-verification-guide': [
    { to: '/enclosed-car-shipping', label: 'Enclosed car shipping' },
    { to: '/ship-my-car',           label: 'Ship my car service' },
    { to: '/car-shipping-cost',     label: 'Car shipping cost guide' },
  ],
  'fmcsa-2026-new-rules': [
    { to: '/state-to-state-car-shipping', label: 'State-to-state car shipping' },
    { to: '/ship-my-car',                 label: 'Ship my car service' },
    { to: '/car-shipping-cost',           label: 'Car shipping cost guide' },
  ],
  'fmcsa-broker-recordkeeping-2026': [
    { to: '/state-to-state-car-shipping', label: 'State-to-state car shipping' },
    { to: '/dealer-auto-transport',       label: 'Dealer auto transport' },
    { to: '/ship-my-car',                 label: 'Ship my car service' },
  ],
  'outbox-pattern-dispatch': [
    { to: '/state-to-state-car-shipping', label: 'State-to-state car shipping' },
    { to: '/dealer-auto-transport',       label: 'Dealer auto transport' },
    { to: '/ship-my-car',                 label: 'Ship my car service' },
  ],
  '75000-bond-claims-guide': [
    { to: '/car-shipping-cost',     label: 'Car shipping cost guide' },
    { to: '/ship-my-car',           label: 'Ship my car service' },
    { to: '/enclosed-car-shipping', label: 'Enclosed car shipping' },
  ],
  'copart-iaa-manheim-comparison': [
    { to: '/dealers', label: 'Dealer program' },
    { to: '/copart-shipping', label: 'Copart shipping' },
    { to: '/manheim-transport', label: 'Manheim transport' },
  ],
  'auction-to-port-cost-breakdown-2026': [
    { to: '/exporters', label: 'Export services' },
    { to: '/auction-to-port-transport', label: 'Auction-to-port' },
    { to: '/door-to-port-auto-transport', label: 'Door-to-port' },
  ],
  'central-dispatch-listing-decoded': [
    { to: '/dealers', label: 'Dealer program' },
    { to: '/ship-my-car', label: 'Ship my car service' },
    { to: '/state-to-state-car-shipping', label: 'State-to-state' },
  ],
  'enclosed-transport-when-to-skip': [
    { to: '/enclosed-car-shipping', label: 'Enclosed car shipping' },
    { to: '/open-car-shipping', label: 'Open car shipping' },
    { to: '/ship-my-car', label: 'Ship my car' },
  ],
  'non-running-vehicle-shipping-playbook': [
    { to: '/salvage-car-shipping', label: 'Salvage car shipping' },
    { to: '/dealers', label: 'Dealer program' },
    { to: '/ship-my-car', label: 'Ship my car' },
  ],
  'winter-auto-transport-pricing': [
    { to: '/massachusetts-to-florida-car-shipping', label: 'MA to FL' },
    { to: '/new-jersey-to-florida-car-shipping', label: 'NJ to FL' },
    { to: '/ship-my-car', label: 'Ship my car' },
  ],
  'bill-of-lading-pickup-delivery-guide': [
    { to: '/ship-my-car', label: 'Ship my car' },
    { to: '/what-is-a-bill-of-lading', label: 'BOL deep dive' },
    { to: '/enclosed-car-shipping', label: 'Enclosed transport' },
  ],
  'port-specific-export-newark-houston-savannah': [
    { to: '/exporters', label: 'Export services' },
    { to: '/ports/newark', label: 'Port Newark' },
    { to: '/ports/houston', label: 'Port Houston' },
  ],
};

const theme = { text: colors.text, accent: colors.accent, success: colors.success, dark: colors.dark, bg: colors.bg, fonts };

export default function BlogArticle() {
  const { t } = useTranslation();
  const { slug } = useParams();
  const article = articles.find(a => a.slug === slug);

  if (!article) return <Navigate to="/blog" replace />;

  const ArticleContent = ARTICLE_COMPONENTS[slug];
  const cat = CATEGORIES[article.category] || {};
  const Banner = BANNER_MAP[article.category];

  const related = articles
    .filter(a => a.category === article.category && a.slug !== slug)
    .slice(0, 3);

  const author = authorFor(article.category);
  const authorIsPerson = author.name !== 'Y7 Dispatch Team';

  const authorSchema = authorIsPerson
    ? {
        '@type': 'Person',
        name: author.name,
        jobTitle: author.role,
        affiliation: {
          '@type': 'Organization',
          name: 'Y7 Logistics',
          url: 'https://www.y7agency.com',
        },
      }
    : {
        '@type': 'Organization',
        name: author.name,
        url: 'https://www.y7agency.com',
      };

  const blogPostingSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.dateISO,
    dateModified: article.dateISO,
    author: authorSchema,
    publisher: {
      '@type': 'Organization',
      name: 'Y7 Consulting Inc.',
      url: 'https://www.y7agency.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.y7agency.com/y7-logo-512.png',
      },
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
        articleAuthor={author.name}
        articleSection={cat.label}
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Blog', url: '/blog' },
        { name: article.title, url: `/blog/${slug}` },
      ]} />

      <div className={styles.bannerWrap}>
        <div className={styles.bannerInner}>
          {Banner && <Banner />}
        </div>
      </div>

      <article className={styles.article}>
        <span
          className={styles.categoryBadge}
          style={{ background: cat.color || 'var(--text)' }}
        >
          {cat.label}
        </span>

        <h1 className={styles.title}>{article.title}</h1>

        <div className={styles.meta}>
          <span>{article.date}</span>
          <span>&middot;</span>
          <span>{article.readTime}</span>
        </div>

        <div className={styles.authorBlock}>
          <span className={styles.authorName}>{author.name}</span>
          <span className={styles.authorRole}>{author.role}</span>
          <span className={styles.authorCredential}>{author.credential}</span>
        </div>

        <ShareButtons
          url={`https://www.y7agency.com/blog/${article.slug}`}
          title={article.title}
          description={article.excerpt}
        />

        <div className={styles.divider} />

        {ArticleContent && <ArticleContent theme={theme} />}

        <div className={styles.shareFooter}>
          <ShareButtons
            url={`https://www.y7agency.com/blog/${article.slug}`}
            title={article.title}
            description={article.excerpt}
          />
        </div>

        <div className={styles.tags}>
          {article.tags.map(tag => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>

        {RELATED_SERVICES[slug] && (
          <div className={styles.relatedServicesBlock}>
            <h3 className={styles.relatedServicesTitle}>Related Services</h3>
            <ul className={styles.relatedServicesList}>
              {RELATED_SERVICES[slug].map((link, i) => (
                <li key={i}>
                  <Link to={link.to} className={styles.relatedServicesLink}>
                    {link.label} &rarr;
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className={styles.articleCta}>
          <p className={styles.articleCtaQuestion}>{t('blog.articleCta.question')}</p>
          <div className={styles.articleCtaButtons}>
            <Link to="/quote" className={styles.articleCtaPrimary}>
              {t('blog.articleCta.quote')}
            </Link>
            <Link to="/portal/login" className={styles.articleCtaSecondary}>
              {t('blog.articleCta.portal')}
            </Link>
          </div>
        </div>

        <Link to="/blog" className={styles.backLink}>
          &larr; Back to Blog
        </Link>
      </article>

      {related.length > 0 && (
        <section className={styles.relatedSection}>
          <div className={styles.relatedInner}>
            <h2 className={styles.relatedTitle}>Related Articles</h2>
            <div className={styles.relatedGrid}>
              {related.map(r => {
                const rCat = CATEGORIES[r.category] || {};
                return (
                  <Link key={r.slug} to={`/blog/${r.slug}`} className={styles.relatedCard}>
                    <span
                      className={styles.relatedBadge}
                      style={{ background: rCat.color || 'var(--text)' }}
                    >
                      {rCat.label}
                    </span>
                    <h3 className={styles.relatedCardTitle}>{r.title}</h3>
                    <span className={styles.relatedCardMeta}>
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
