import SeoLandingPage from './SeoLandingPage';

export default function AuctionCarShipping() {
  return (
    <SeoLandingPage
      meta={{
        title: 'Auction Car Shipping — Pickup from Any US Auction | Y7 Logistics',
        description:
          'Ship vehicles from Copart, IAAI, Manheim, and other US auto auctions. Gate pass coordination, storage fee prevention. Licensed broker Y7 Logistics.',
        path: '/auction-car-shipping',
      }}
      heading="Auction Car Shipping — Pickup from Any US Auction"
      intro="Won a vehicle at auction? Y7 Logistics coordinates pickup from all major US auto auctions — Copart, IAAI, Manheim, and independent auctions. We handle gate passes, timing, and transport to prevent costly storage fees."
      whenNeeded={[
        'Won a vehicle at Copart',
        'Purchased from IAAI',
        'Bought at Manheim dealer auction',
        'Independent auction purchase',
        'Need fast pickup to avoid storage fees',
        'Buying salvage vehicles for rebuild',
      ]}
      steps={[
        { title: 'Share Auction Details', desc: 'Provide your lot number, buyer number, and auction location.' },
        { title: 'Gate Pass & Pickup Coordination', desc: 'We coordinate the gate pass and schedule pickup within your storage-free window.' },
        { title: 'Carrier Assigned', desc: 'A carrier experienced with auction pickups is dispatched to your auction yard.' },
        { title: 'Vehicle Picked Up', desc: 'Carrier arrives at the auction yard and loads your vehicle.' },
        { title: 'Delivered to Your Door or Port', desc: 'Vehicle delivered to your home, shop, or port for export.' },
      ]}
      requirements={[
        'Lot number and buyer number',
        'Gate pass (or we coordinate with the auction)',
        'Payment confirmation from the auction',
        'Pickup authorization',
        'Delivery address',
      ]}
      capabilities={[
        'All major auction yards nationwide',
        'Gate pass coordination',
        'Non-running and salvage vehicle transport',
        'Fast pickup to minimize storage fees',
        'Open and enclosed transport options',
        'Port delivery for export shipments',
      ]}
      faqs={[
        {
          q: 'How quickly can you pick up from an auction?',
          a: 'Typically 2\u20135 business days from the time the gate pass is ready. Expedited pickup is available if you need faster service to avoid storage charges.',
        },
        {
          q: 'Do I need a gate pass?',
          a: 'Yes, most auctions require a gate pass before any vehicle can leave the yard. If you\u2019re unsure how to obtain one, we can guide you through the process for your specific auction.',
        },
        {
          q: 'Can you ship non-running auction vehicles?',
          a: 'Yes. We work with carriers equipped to handle inoperable vehicles using winch or forklift loading. Non-running vehicles are one of the most common auction shipments we handle.',
        },
        {
          q: 'What if my vehicle has a salvage title?',
          a: 'No problem at all. We transport vehicles with all title types — clean, salvage, rebuilt, and parts-only. Title status does not affect our ability to ship.',
        },
        {
          q: 'Do you ship from auctions to ports for export?',
          a: 'Yes, auction-to-port is one of our most popular services. We deliver to all major US ports for international export.',
        },
      ]}
      ctaLabel="Get an Auction Shipping Quote"
      ctaTo="/quote"
      related={[
        { label: 'Copart Shipping', to: '/copart-shipping' },
        { label: 'IAA Transport', to: '/iaai-transport' },
        { label: 'Manheim Transport', to: '/manheim-transport' },
        { label: 'Auction to Port', to: '/auction-to-port-transport' },
        { label: 'Salvage Car Shipping', to: '/salvage-car-shipping' },
        { label: 'Port Delivery', to: '/door-to-port-auto-transport' },
        { label: 'Get a Quote', to: '/quote' },
      ]}
    />
  );
}
