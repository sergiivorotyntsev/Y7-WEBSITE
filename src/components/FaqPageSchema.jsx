import { Helmet } from 'react-helmet-async';

/**
 * FaqPageSchema — Schema.org FAQPage JSON-LD generator for FAQ accordions.
 *
 * Usage:
 *   <FaqPageSchema
 *     pageUrl="https://www.y7agency.com/exporters"
 *     items={[{ q: "...", a: "..." }, ...]}
 *   />
 *
 * Renders nothing visible; emits a single <script type="application/ld+json">
 * via react-helmet-async. Each item becomes a Question/Answer pair under
 * mainEntity.
 *
 * Empty or missing items array returns null (no schema emitted).
 */
export default function FaqPageSchema({ pageUrl, items }) {
  if (!Array.isArray(items) || items.length === 0) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': pageUrl ? `${pageUrl}#faq` : undefined,
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  if (!pageUrl) delete schema['@id'];

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
