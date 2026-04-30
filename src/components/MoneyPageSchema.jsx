import { Helmet } from 'react-helmet-async';

/**
 * MoneyPageSchema — JSON-LD Service schema for Y7's three primary commercial
 * pages (Dealers / Exporters / ShipMyCar). Augments the root LocalBusiness
 * with page-specific Service + Offer + audience data so Google can show
 * rich-result structured results for each commercial landing.
 */
const BASE = 'https://www.y7agency.com';

const PAGE_SPEC = {
  dealers: {
    serviceType: 'Auto Transport for Dealers',
    description:
      'Auction pickup, dealer trades, and volume auto transport for licensed US dealerships. Same-day Copart / IAA / Manheim dispatch, weekly consolidated invoicing, and a dedicated dispatcher per account.',
    url: '/dealers',
    audienceType: 'Business',
    audienceName: 'Auto Dealers',
    priceRange: '$40-$65',
    offers: [
      { name: 'Auction Pickup', desc: 'Copart, IAA, Manheim gate-pass coordination and same-day dispatch' },
      { name: 'Dealer Trade Transport', desc: 'Dealer-to-dealer inventory moves with consolidated billing' },
      { name: 'Volume Pricing', desc: 'Tiered rates for dealerships shipping 5+ vehicles / month' },
    ],
  },
  exporters: {
    serviceType: 'Vehicle Export Logistics',
    description:
      'End-to-end auction-to-port logistics for international buyers. Gate-pass coordination, warehouse drop-off, and carrier management across Newark, Houston, Savannah, Baltimore, Los Angeles, and Jacksonville ports.',
    url: '/exporters',
    audienceType: 'Business',
    audienceName: 'Vehicle Exporters and International Buyers',
    priceRange: '$50',
    offers: [
      { name: 'Auction to Port Delivery', desc: 'Copart / IAA / Manheim lot to any major US export port' },
      { name: 'Gate Pass Coordination', desc: 'Title release, gate pass purchase, and storage management' },
      { name: 'Warehouse Drop-off', desc: 'Consolidation warehouse drop at all major ports' },
    ],
  },
  shipMyCar: {
    serviceType: 'Auto Transport (Door-to-Door)',
    description:
      'Door-to-door vehicle shipping across all 50 US states for private customers. Open and enclosed trailer options, VIN decode, real-time status updates, and FMCSA-vetted carriers.',
    url: '/ship-my-car',
    audienceType: 'Person',
    audienceName: 'Individual Vehicle Owners',
    priceRange: '$300-$1600',
    offers: [
      { name: 'Open Carrier Transport', desc: 'Standard 7–10 car open trailer — most economical option' },
      { name: 'Enclosed Carrier Transport', desc: 'Covered trailer for luxury, classic, and high-value vehicles' },
      { name: 'Non-Running / Inoperable', desc: 'Winch-equipped carriers for inop or salvage vehicles' },
    ],
  },
};

export default function MoneyPageSchema({ pageType }) {
  const spec = PAGE_SPEC[pageType];
  if (!spec) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${BASE}${spec.url}#service`,
    name: spec.serviceType,
    serviceType: spec.serviceType,
    description: spec.description,
    url: `${BASE}${spec.url}`,
    provider: { '@id': `${BASE}/#organization` },
    areaServed: { '@type': 'Country', name: 'United States' },
    audience: {
      '@type': 'Audience',
      audienceType: spec.audienceType,
      name: spec.audienceName,
    },
    offers: spec.offers.map((o) => ({
      '@type': 'Offer',
      name: o.name,
      description: o.desc,
      priceCurrency: 'USD',
      priceRange: spec.priceRange,
      availability: 'https://schema.org/InStock',
      areaServed: { '@type': 'Country', name: 'United States' },
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: spec.serviceType,
      itemListElement: spec.offers.map((o) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: o.name, description: o.desc },
      })),
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
