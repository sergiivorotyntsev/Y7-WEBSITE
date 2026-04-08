import { Link } from 'react-router-dom';
import { colors, fonts } from '../theme';

/**
 * RelatedGuides — topical clustering for SEO landing pages.
 *
 * Renders a 2-3 column grid of internal links to sibling SEO landings,
 * placed near the bottom of a page (above the final CTA). Builds the
 * topical-clustering signal Google uses to understand site structure
 * and improves crawl depth on otherwise leaf-node SEO pages.
 *
 * Pages declare their related set by importing the matrix from
 * src/data/relatedGuides.js and passing the entry for their route:
 *
 *   <RelatedGuides links={RELATED_GUIDES['/copart-shipping']} />
 *
 * If `links` is missing or empty the component renders nothing, so it
 * is safe to drop into pages whose route key is not yet in the matrix.
 */
export default function RelatedGuides({ links }) {
  if (!links || links.length === 0) return null;

  return (
    <section
      style={{
        padding: '60px 24px',
        background: colors.bgMuted,
        borderTop: `1px solid ${colors.border}`,
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h2
          style={{
            fontFamily: fonts.serif,
            fontSize: '1.75rem',
            fontWeight: 600,
            color: colors.text,
            marginBottom: '1.5rem',
            textAlign: 'center',
          }}
        >
          Related Guides
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '16px',
          }}
        >
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                display: 'block',
                padding: '20px',
                background: colors.bgCard,
                border: `1px solid ${colors.border}`,
                borderRadius: '8px',
                textDecoration: 'none',
                color: colors.text,
                transition: 'border-color 0.2s, transform 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = colors.accent;
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = colors.border;
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div
                style={{
                  fontFamily: fonts.sans,
                  fontWeight: 600,
                  fontSize: '1.05rem',
                  marginBottom: link.description ? '8px' : 0,
                  color: colors.text,
                }}
              >
                {link.title} →
              </div>
              {link.description && (
                <div
                  style={{
                    fontFamily: fonts.sans,
                    fontSize: '0.9rem',
                    color: colors.textMuted,
                    lineHeight: 1.5,
                  }}
                >
                  {link.description}
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
