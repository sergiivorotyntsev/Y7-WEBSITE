import SeoLandingPage from './SeoLandingPage';

export default function CopartShipping() {
  return (
    <SeoLandingPage
      meta={{
        title: 'Copart Shipping — Vehicle Transport from Copart Auctions | Y7 Logistics',
        description:
          'Ship your Copart purchase nationwide. Gate pass coordination, salvage & clean title vehicles, inoperable transport. Licensed broker Y7 Logistics.',
        path: '/copart-shipping',
      }}
      heading="Copart Shipping — Vehicle Transport from Copart Auctions"
      intro="Copart is the largest online vehicle auction in the US. Y7 Logistics specializes in picking up vehicles from Copart locations nationwide — whether clean title, salvage, or non-running."
      whenNeeded={[
        'Won a vehicle on Copart.com',
        'Need transport from any Copart yard',
        'Buying salvage vehicles for rebuild or resale',
        'Purchasing clean title vehicles from Copart',
        'Dealer buying inventory from Copart',
        'Exporter shipping Copart purchase to port',
      ]}
      steps={[
        { title: 'Win & Complete Payment', desc: 'Win your Copart vehicle and complete payment through Copart.' },
        { title: 'Share Your Details', desc: 'Provide your lot number and buyer number to Y7 Logistics.' },
        { title: 'Gate Pass & Scheduling', desc: 'We coordinate the gate pass and schedule pickup within the free storage window.' },
        { title: 'Carrier Picks Up', desc: 'Carrier arrives at the Copart yard and loads your vehicle.' },
        { title: 'Vehicle Delivered', desc: 'Your vehicle is delivered to your address or port.' },
      ]}
      requirements={[
        'Copart lot number',
        'Buyer or member number',
        'Payment completed with Copart',
        'Gate pass (Copart issues after payment clears)',
        'Delivery destination',
      ]}
      capabilities={[
        'All 200+ Copart locations nationwide',
        'Salvage and clean title vehicles',
        'Non-running vehicles with winch loading',
        'Fast pickup within storage-free period',
        'Delivery to home, shop, or port',
        'Open and enclosed transport options',
      ]}
      faqs={[
        {
          q: 'How does Copart pickup work?',
          a: 'After you win and pay for your vehicle, Copart issues a gate pass. We then schedule a carrier to pick up your vehicle from the Copart yard within the free storage window so you avoid daily storage fees.',
        },
        {
          q: 'What\u2019s the Copart storage fee deadline?',
          a: 'Copart typically gives 3\u20135 free days after payment clears. After that, storage fees range from $25\u2013$75 per day depending on the location. We prioritize scheduling pickup within this window.',
        },
        {
          q: 'Can you pick up inoperable Copart vehicles?',
          a: 'Yes. Many Copart vehicles are non-running. Our carriers have winch and forklift equipment to safely load inoperable vehicles.',
        },
        {
          q: 'Do you ship from Copart to ports?',
          a: 'Yes, Copart-to-port transport is one of our most common services. We work with exporters regularly and deliver to all major US ports.',
        },
      ]}
      ctaLabel="Get a Copart Shipping Quote"
      ctaTo="/quote"
      related={[
        { label: 'Auction Shipping', to: '/auction-car-shipping' },
        { label: 'IAA Transport', to: '/iaai-transport' },
        { label: 'Salvage Shipping', to: '/salvage-car-shipping' },
        { label: 'Port Delivery', to: '/door-to-port-auto-transport' },
        { label: 'Get a Quote', to: '/quote' },
      ]}
    />
  );
}
