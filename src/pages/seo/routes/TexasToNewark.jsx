import SeoLandingPage from '../SeoLandingPage';
import PricingRange from '../../../components/PricingRange';

export default function TexasToNewark() {
  return (
    <SeoLandingPage
      meta={{
        title: 'TX to Port Newark Vehicle Shipping',
        description:
          'Vehicle transport from Texas to Port Newark for export. Auction pickup in TX, door-to-port delivery. All documentation handled.',
        path: '/texas-to-newark-port-auto-transport',
      }}
      heading="Texas to Port Newark Auto Transport"
      intro="The Texas-to-Port Newark corridor is one of the most active export routes in US auto transport. Exporters purchasing vehicles from Texas auctions (Copart, IAAI) regularly ship to Port Newark/Elizabeth for overseas shipping. Y7 Logistics handles the entire domestic leg — from Texas auction yard to port warehouse."
      whenNeeded={[
        'Exporter buying at Texas Copart/IAAI for overseas shipping',
        'Dealer shipping inventory from TX to Port Newark',
        'Vehicle export requiring Port Newark delivery',
        'Multiple vehicles from TX auctions to Newark port',
        'Consolidating TX auction purchases for export',
      ]}
      steps={[
        { title: 'Win your vehicle at a Texas auction', desc: 'Or provide pickup details for any TX address.' },
        { title: 'Share lot number and buyer info with Y7', desc: 'We coordinate gate pass and port warehouse delivery.' },
        { title: 'Carrier dispatched on the TX→Newark corridor', desc: 'Via I-40/I-78 or I-81 corridor.' },
        { title: 'Vehicle delivered to your Port Newark warehouse', desc: 'Door-to-port delivery in 4–6 business days.' },
        { title: 'Receive BOL and delivery confirmation', desc: 'Full documentation for export processing.' },
      ]}
      requirements={[
        'Texas pickup location (auction yard or address)',
        'Port Newark warehouse name and contact',
        'Vehicle details including VIN',
        'Gate pass (for auction pickups)',
        'Delivery timing to coordinate with vessel schedule',
      ]}
      capabilities={[
        'All Copart and IAAI Texas locations',
        '~1,700 miles via I-40/I-78 or I-81 corridor',
        'Transit time 4–6 business days',
        'Port Newark/Elizabeth warehouse delivery coordination',
        'Multi-vehicle consolidation',
        'Gate pass and BOL documentation',
        'Open transport (standard) or enclosed for high-value exports',
      ]}
      faqs={[
        {
          q: 'How long does TX to Port Newark take?',
          a: 'Standard transit is 4–6 business days. We can coordinate delivery timing with your vessel schedule to avoid early arrival warehouse storage fees.',
        },
        {
          q: 'Can you pick up from any Copart/IAAI in Texas?',
          a: 'Yes. Texas has some of the highest-volume auction locations in the country. We pick up from all Copart and IAAI yards across the state — Houston, Dallas, San Antonio, and beyond.',
        },
        {
          q: 'Do you handle documentation for port delivery?',
          a: 'We handle the domestic transport documentation — Bill of Lading, carrier insurance, delivery receipts. For export-specific paperwork (title, customs), work with your freight forwarder.',
        },
        {
          q: 'Can you deliver multiple vehicles to the same port warehouse?',
          a: 'Yes. We regularly consolidate multiple auction purchases for delivery to the same Newark port warehouse. Multi-vehicle shipments often qualify for better per-unit pricing.',
        },
      ]}
      related={[
        { label: 'Texas Auto Transport', to: '/texas-auto-transport' },
        { label: 'Port Newark', to: '/ports/newark' },
        { label: 'Door-to-Port Transport', to: '/door-to-port-auto-transport' },
        { label: 'Copart Shipping', to: '/copart-shipping' },
        { label: 'Auction to Port', to: '/auction-to-port-transport' },
      ]}
    >
      <PricingRange
        routeName="Texas to Port Newark"
        openLow={950}
        openHigh={1450}
        enclosedLow={1700}
        enclosedHigh={2400}
        distance={1650}
        typicalTransitDays="4-6"
      />
    </SeoLandingPage>
  );
}
