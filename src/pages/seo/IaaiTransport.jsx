import SeoLandingPage from './SeoLandingPage';

export default function IaaiTransport() {
  return (
    <SeoLandingPage
      meta={{
        title: 'IAA Transport — Ship Your Vehicle from IAA Auctions | Y7 Logistics',
        description:
          'Vehicle transport from IAA (Insurance Auto Auctions) locations nationwide. Gate pass coordination, salvage vehicles, fast pickup. Y7 Logistics.',
        path: '/iaai-transport',
      }}
      heading="IAA Transport — Ship Your Vehicle from IAA Auctions"
      intro="IAA (formerly Insurance Auto Auctions) is one of the largest salvage vehicle auction platforms. Y7 Logistics picks up from IAA yards across the US with efficient gate pass coordination."
      whenNeeded={[
        'Won a vehicle at IAA online auction',
        'Purchased insurance salvage vehicle',
        'Buying from IAA for rebuild or export',
        'Dealer purchasing from IAA',
        'Need fast pickup to avoid IAA storage fees',
      ]}
      steps={[
        { title: 'Complete IAA purchase and payment', desc: 'Finalize your IAA auction transaction and ensure all fees are paid.' },
        { title: 'Provide lot number and buyer info to Y7', desc: 'Share your IAA lot number, buyer number, and delivery details with us.' },
        { title: 'We coordinate IAA gate pass and pickup', desc: 'We guide you through the gate pass process so your vehicle is release-ready.' },
        { title: 'Carrier dispatched to IAA location', desc: 'A verified carrier is assigned and dispatched to the IAA yard.' },
        { title: 'Vehicle delivered to your destination', desc: 'Your vehicle is delivered to your home, shop, dealership, or port.' },
      ]}
      requirements={[
        'IAA lot number',
        'Buyer number',
        'Payment completed',
        'Gate pass authorization',
        'Delivery address or port',
      ]}
      capabilities={[
        'All IAA locations nationwide',
        'Insurance salvage vehicles',
        'Non-running/non-drivable transport',
        'Fast pickup scheduling',
        'Home or port delivery',
        'Competitive pricing for high-volume buyers',
      ]}
      faqs={[
        {
          q: 'How long after IAA purchase can you pick up?',
          a: 'Typically 2-5 business days. We prioritize pickup within the free storage period to help you avoid extra fees.',
        },
        {
          q: 'Do you handle IAA gate passes?',
          a: 'We guide you through the process — IAA issues gate passes after payment clears. We coordinate with the yard to ensure smooth pickup.',
        },
        {
          q: 'Can you ship non-running IAA vehicles?',
          a: 'Yes, many IAA vehicles are non-running. Our carriers have winches, dollies, and other equipment to load and transport inoperable vehicles safely.',
        },
        {
          q: 'What areas do you cover for IAA pickup?',
          a: 'All IAA locations in the continental United States. No matter which IAA yard your vehicle is at, we can arrange transport.',
        },
      ]}
      ctaLabel="Get a Quote"
      ctaTo="/quote"
      related={[
        { label: 'Auction Shipping', to: '/auction-car-shipping' },
        { label: 'Copart Shipping', to: '/copart-shipping' },
        { label: 'Manheim Transport', to: '/manheim-transport' },
        { label: 'Port Delivery', to: '/door-to-port-auto-transport' },
        { label: 'Get a Quote', to: '/quote' },
      ]}
    />
  );
}
