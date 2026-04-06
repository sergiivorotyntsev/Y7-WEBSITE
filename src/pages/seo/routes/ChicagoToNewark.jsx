import SeoLandingPage from '../SeoLandingPage';
import PricingRange from '../../../components/PricingRange';

export default function ChicagoToNewark() {
  return (
    <SeoLandingPage
      meta={{
        title: 'Chicago to Port Newark Auto Transport',
        description:
          'Ship vehicles from Chicago area to Port Newark. Auction pickup, dealer transport, export delivery. ~800 miles, 3-4 days.',
        path: '/chicago-to-port-newark-car-shipping',
      }}
      heading="Chicago to Port Newark Car Shipping"
      intro="The Chicago-to-Port Newark route serves exporters, dealers, and individuals who need vehicles shipped from the Midwest to the East Coast's busiest export terminal. At approximately 800 miles via I-80/I-76, this corridor offers fast transit times and competitive pricing."
      whenNeeded={[
        'Exporting vehicles through Port Newark from the Midwest',
        'Chicago-area auction purchases heading to Newark port',
        'Dealer inventory moves from Chicago to New Jersey',
        'Midwest vehicle relocation to the East Coast',
        'Consolidating Midwest purchases at Port Newark',
      ]}
      steps={[
        { title: 'Provide pickup details', desc: 'Chicago-area address or auction location.' },
        { title: 'We quote the ~800-mile corridor', desc: 'Competitive pricing on this well-traveled route.' },
        { title: 'Carrier assigned on the I-80/I-76 route', desc: 'Frequent carrier availability on this corridor.' },
        { title: 'Vehicle picked up from Chicago area', desc: 'All metro and suburban locations served.' },
        { title: 'Delivered to Port Newark warehouse', desc: 'Door-to-port delivery in 3–4 business days.' },
      ]}
      requirements={[
        'Chicago-area pickup address or auction location',
        'Port Newark warehouse details',
        'Vehicle information',
        'Timing to coordinate with port operations',
        'For auctions — lot number and gate pass',
      ]}
      capabilities={[
        'All Chicago metro and suburban areas',
        '~800 miles via I-80/I-76 corridor',
        'Transit 3–4 business days',
        'Copart and IAAI Chicagoland pickup',
        'Port Newark warehouse delivery',
        'Multi-vehicle transport available',
        'Open and enclosed options',
      ]}
      faqs={[
        {
          q: 'How long does Chicago to Port Newark take?',
          a: 'Standard transit is 3–4 business days. The ~800-mile I-80/I-76 route is well-traveled by carriers, ensuring consistent scheduling.',
        },
        {
          q: 'Do you pick up from Chicago-area auctions?',
          a: 'Yes. We pick up from all Copart and IAAI locations in the Chicagoland area and across Illinois. Gate pass coordination included.',
        },
        {
          q: 'Can I combine multiple vehicles on this route?',
          a: 'Yes. Multi-vehicle shipments from Chicago to Port Newark are common for exporters and often come with per-unit savings.',
        },
      ]}
      related={[
        { label: 'Port Newark', to: '/ports/newark' },
        { label: 'Door-to-Port Transport', to: '/door-to-port-auto-transport' },
        { label: 'Auction Shipping', to: '/auction-car-shipping' },
        { label: 'Auction to Port', to: '/auction-to-port-transport' },
        { label: 'Car Shipping Cost', to: '/car-shipping-cost' },
      ]}
    >
      <PricingRange
        routeName="Chicago to Port Newark"
        openLow={600}
        openHigh={950}
        enclosedLow={1150}
        enclosedHigh={1650}
        distance={800}
        typicalTransitDays="2-4"
      />
    </SeoLandingPage>
  );
}
