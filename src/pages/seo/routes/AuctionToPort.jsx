import SeoLandingPage from '../SeoLandingPage';
import PricingRange from '../../../components/PricingRange';

export default function AuctionToPort() {
  return (
    <SeoLandingPage
      meta={{
        title: 'Auction to Port Auto Transport',
        description:
          'Direct vehicle transport from US auctions to export ports. Copart, IAAI, Manheim to Newark, Houston, Savannah, and more.',
        path: '/auction-to-port-transport',
      }}
      heading="Auction to Port Transport — Direct from Auction to Export Port"
      intro="Y7 Logistics specializes in the complete auction-to-port pipeline — from winning a vehicle at Copart, IAAI, or Manheim to delivering it directly to a US export port. We coordinate gate passes, carrier dispatch, and port warehouse delivery so you can focus on your export business."
      whenNeeded={[
        'Exporter buying auction vehicles for overseas markets',
        'Shipping Copart/IAAI purchases directly to port',
        'Dealer exporting auction inventory',
        'Multiple auction purchases consolidated at one port',
        'Any auction → port domestic transport need',
      ]}
      steps={[
        { title: 'Win your vehicle at auction', desc: 'Complete payment and secure the title.' },
        { title: 'Share auction details with Y7', desc: 'Lot number, buyer number, and gate pass authorization.' },
        { title: 'Carrier pickup scheduled', desc: 'We schedule within the free storage window to avoid fees.' },
        { title: 'Vehicle transported to port', desc: 'Direct delivery to your designated port warehouse.' },
        { title: 'Receive BOL and delivery confirmation', desc: 'Full documentation for export processing.' },
      ]}
      requirements={[
        'Auction platform and lot number',
        'Buyer/member number',
        'Gate pass authorization',
        'Destination port and warehouse name',
        'VIN and vehicle details',
        'Vessel/export timeline (so we coordinate delivery)',
      ]}
      capabilities={[
        'All auction platforms — Copart (200+ locations), IAAI (170+ locations), Manheim, and independent auctions',
        'All 6 major export ports — Newark, Houston, Savannah, Los Angeles, Baltimore, Jacksonville',
        'Gate pass coordination and storage fee prevention',
        'Single or multi-vehicle consolidation',
        'Open transport (most common) or enclosed for high-value',
        'Complete documentation — BOL, delivery receipts, carrier insurance',
      ]}
      faqs={[
        {
          q: 'Which auctions do you pick up from?',
          a: 'We pick up from all Copart, IAAI, and Manheim locations nationwide — over 500 auction yards in total. We also serve independent and regional auctions.',
        },
        {
          q: 'Which ports do you deliver to?',
          a: 'We deliver to all 6 major US export ports — Port Newark (NJ), Port Houston (TX), Port Savannah (GA), Port of Los Angeles (CA), Port of Baltimore (MD), and JAXPORT (FL). Other ports available on request.',
        },
        {
          q: 'How do you prevent auction storage fees?',
          a: 'We prioritize pickup within the auction\u2019s free storage period (typically 3–5 days after payment). Our dispatch team schedules carriers to arrive before storage charges begin.',
        },
        {
          q: 'Can you handle multiple vehicles from different auctions to one port?',
          a: 'Yes. We regularly consolidate vehicles from multiple auction locations and coordinate delivery to a single port warehouse. This is one of our most common export logistics scenarios.',
        },
        {
          q: 'What documentation do I get?',
          a: 'You receive a Bill of Lading (BOL) for the transport, carrier insurance certificate, and port warehouse delivery receipt. These documents are typically required by freight forwarders for export processing.',
        },
      ]}
      related={[
        { label: 'Copart Shipping', to: '/copart-shipping' },
        { label: 'IAA Transport', to: '/iaai-transport' },
        { label: 'Manheim Transport', to: '/manheim-transport' },
        { label: 'Door-to-Port Transport', to: '/door-to-port-auto-transport' },
        { label: 'Port Newark', to: '/ports/newark' },
        { label: 'Port Houston', to: '/ports/houston' },
        { label: 'Port Savannah', to: '/ports/savannah' },
        { label: 'For Exporters', to: '/exporters' },
      ]}
    >
      <PricingRange
        routeName="Auction to Port"
        variants={[
          { label: 'Copart Dallas → Houston Port', low: 300, high: 500, distance: 250, transit: '1-2 days' },
          { label: 'IAAI Newark → Port Newark', low: 150, high: 350, distance: 15, transit: '1 day' },
          { label: 'Manheim Atlanta → Savannah Port', low: 400, high: 650, distance: 250, transit: '1-2 days' },
        ]}
      />
    </SeoLandingPage>
  );
}
