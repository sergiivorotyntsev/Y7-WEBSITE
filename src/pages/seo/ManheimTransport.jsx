import SeoLandingPage from './SeoLandingPage';

export default function ManheimTransport() {
  return (
    <SeoLandingPage
      meta={{
        title: 'Manheim Transport — Dealer Auction Vehicle Shipping | Y7 Logistics',
        description:
          'Vehicle transport from Manheim dealer auctions. Contract pricing for dealerships, nationwide coverage. Licensed auto transport broker Y7 Logistics.',
        path: '/manheim-transport',
      }}
      heading="Manheim Transport — Dealer Auction Vehicle Shipping"
      intro="Manheim is the world's largest wholesale vehicle auction marketplace, serving licensed dealers exclusively. Y7 Logistics provides reliable transport from Manheim locations with competitive pricing for dealers who ship regularly."
      whenNeeded={[
        'Dealer purchasing inventory at Manheim',
        'Buying from Manheim online (OVE/Simulcast)',
        'Dealer-to-dealer trade through Manheim',
        'Fleet vehicle acquisition at Manheim',
        'Need reliable ongoing transport partner',
      ]}
      steps={[
        { title: 'Purchase vehicle through Manheim', desc: 'Complete your Manheim auction purchase or online transaction.' },
        { title: 'Provide Manheim purchase details to Y7', desc: 'Share your purchase confirmation, pickup location, and delivery address.' },
        { title: 'Carrier assigned from nearest fleet', desc: 'We match your shipment with a verified carrier in the area.' },
        { title: 'Pickup from Manheim location', desc: 'Carrier picks up your vehicle directly from the Manheim facility.' },
        { title: 'Delivered to your dealership or lot', desc: 'Vehicle arrives at your dealership, lot, or other specified destination.' },
      ]}
      requirements={[
        'Manheim purchase confirmation',
        'Dealer license info',
        'Pickup location details',
        'Delivery address',
        'Any special handling needs',
      ]}
      capabilities={[
        'All Manheim locations nationwide',
        'Dealer volume pricing',
        'Dedicated account management',
        'Recurring pickup scheduling',
        'Priority dispatch for time-sensitive inventory',
        'Open and enclosed options',
      ]}
      faqs={[
        {
          q: 'Do you offer dealer volume pricing?',
          a: 'Yes, dealers with regular shipping needs get contract rates. The more you ship, the better your per-vehicle cost.',
        },
        {
          q: 'How fast is pickup from Manheim?',
          a: 'Typically 2-4 business days. Expedited service is available for priority inventory that needs to hit your lot faster.',
        },
        {
          q: 'Can you set up recurring transport from Manheim?',
          a: 'Yes, we offer dedicated scheduling for dealers who buy regularly. Your account manager handles routing and dispatch so you can focus on buying.',
        },
        {
          q: 'Do you transport from Manheim to other auctions?',
          a: 'Yes, inter-auction and dealer-to-dealer transport is available. We handle logistics between any combination of auctions and dealerships.',
        },
      ]}
      ctaLabel="Get a Quote"
      ctaTo="/quote"
      related={[
        { label: 'Auction Shipping', to: '/auction-car-shipping' },
        { label: 'Dealer Transport', to: '/dealer-auto-transport' },
        { label: 'For Dealers', to: '/dealers' },
        { label: 'Get a Quote', to: '/quote' },
      ]}
    />
  );
}
