import SeoLandingPage from './SeoLandingPage';

export default function DealerAutoTransport() {
  return (
    <SeoLandingPage
      meta={{
        title: 'Dealer Auto Transport — Vehicle Shipping for Dealerships | Y7 Logistics',
        description:
          'Auto transport for car dealerships. Volume pricing, auction pickup, dealer trades, dedicated dispatcher. Licensed broker Y7 Logistics.',
        path: '/dealer-auto-transport',
      }}
      heading="Dealer Auto Transport — Vehicle Shipping for Dealerships"
      intro="Y7 Logistics is the transport partner for dealerships that need reliable, cost-effective vehicle shipping. From auction pickups to dealer trades to customer deliveries — we handle the logistics so you can focus on selling cars."
      whenNeeded={[
        'Stocking inventory from auctions (Copart, IAAI, Manheim)',
        'Dealer-to-dealer trades',
        'Customer vehicle deliveries',
        'Fleet acquisitions',
        'Port delivery for export inventory',
        'Relocating vehicles between lots',
      ]}
      steps={[
        { title: 'Set up your dealer account with Y7', desc: 'Quick onboarding with your dealer license — takes minutes, not days.' },
        { title: 'Submit transport requests (single or bulk)', desc: 'Send one vehicle or an entire list. We handle both the same way.' },
        { title: 'Dedicated dispatcher assigns carriers', desc: 'Your account manager coordinates verified carriers for each shipment.' },
        { title: 'Vehicles picked up on schedule', desc: 'Carriers arrive at auctions, lots, or other origins on the agreed timeline.' },
        { title: 'Delivered to your lot with documentation', desc: 'Vehicles arrive at your dealership with condition reports and delivery confirmation.' },
      ]}
      requirements={[
        'Dealer license',
        'Pickup and delivery locations',
        'Vehicle details per unit',
        'Preferred timing',
        'Any special handling requirements',
      ]}
      capabilities={[
        'Volume contract pricing',
        'Dedicated account manager',
        'Auction pickup coordination (all major platforms)',
        'Dealer-to-dealer trades',
        'Multi-car hauling discounts',
        'Priority dispatch',
        'Enclosed transport for high-value inventory',
        'Real-time tracking dashboard',
      ]}
      faqs={[
        {
          q: 'Do you offer dealer pricing?',
          a: 'Yes, dealerships get volume contract rates based on shipping frequency. The more consistently you ship, the better your rates.',
        },
        {
          q: 'Can you pick up from multiple auctions?',
          a: 'Yes, we coordinate pickups from Copart, IAAI, Manheim, and independent auctions. One account, all platforms covered.',
        },
        {
          q: 'Do you handle dealer trades?',
          a: 'Yes, dealer-to-dealer swaps with coordinated timing at both ends. We make sure the logistics match your trade agreements.',
        },
        {
          q: 'Is there a minimum number of vehicles?',
          a: 'No minimum — single vehicle or full truckload, same dedicated service. We scale with your needs.',
        },
        {
          q: 'Can you deliver vehicles directly to our customers?',
          a: 'Yes, we offer door-to-door delivery on behalf of your dealership. Your customer gets a professional delivery experience.',
        },
      ]}
      ctaLabel="Get a Quote"
      ctaTo="/quote"
      related={[
        { label: 'For Dealers', to: '/dealers' },
        { label: 'Auction Shipping', to: '/auction-car-shipping' },
        { label: 'Copart Shipping', to: '/copart-shipping' },
        { label: 'Manheim Transport', to: '/manheim-transport' },
        { label: 'Dealer Quote', to: '/dealer-quote' },
        { label: 'Get a Quote', to: '/quote' },
      ]}
    />
  );
}
