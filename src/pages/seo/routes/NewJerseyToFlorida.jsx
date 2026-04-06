import SeoLandingPage from '../SeoLandingPage';
import PricingRange from '../../../components/PricingRange';

export default function NewJerseyToFlorida() {
  return (
    <SeoLandingPage
      meta={{
        title: 'NJ to FL Auto Transport',
        description:
          'Auto transport from New Jersey to Florida. Door-to-door, dealer trades, snowbird transport. 3-5 business days.',
        path: '/new-jersey-to-florida-car-shipping',
      }}
      heading="New Jersey to Florida Car Shipping"
      intro="New Jersey to Florida is one of the highest-volume auto transport corridors on the East Coast. Whether you're a snowbird, relocating, or a dealer moving inventory, Y7 Logistics provides fast, reliable transport along the I-95 corridor from any NJ address to anywhere in Florida."
      whenNeeded={[
        'Snowbird seasonal transport (NJ→FL and back)',
        'Relocating from New Jersey to Florida',
        'Dealer inventory moves between NJ and FL',
        'Sending a vehicle ahead of your move',
        'Purchasing a vehicle from the other state',
        'Snowbird returning to NJ in spring',
      ]}
      steps={[
        { title: 'Request a quote', desc: 'Provide your NJ and FL addresses.' },
        { title: 'Receive pricing', desc: 'High-volume corridor means competitive rates.' },
        { title: 'Confirm and schedule', desc: 'Lock in your preferred transport window.' },
        { title: 'Carrier picks up from your NJ location', desc: 'Door-to-door pickup anywhere in New Jersey.' },
        { title: 'Delivered in Florida', desc: 'Door-to-door delivery in 3–5 business days.' },
      ]}
      requirements={[
        'NJ pickup address',
        'FL delivery address',
        'Vehicle information',
        'Preferred dates',
        'Any special access instructions',
      ]}
      capabilities={[
        '~1,100 miles via I-95 corridor',
        'Transit 3–5 business days',
        'High-volume route with frequent carrier availability',
        'Popular pairs — Newark→Miami, Princeton→Orlando, Jersey City→Tampa',
        'Open and enclosed transport',
        'Year-round service with seasonal expertise',
      ]}
      faqs={[
        {
          q: 'How long does NJ to FL car shipping take?',
          a: 'Standard transit time is 3–5 business days via the I-95 corridor. This is one of the fastest East Coast routes due to high carrier volume.',
        },
        {
          q: 'Is NJ to FL cheaper than other routes?',
          a: 'Yes — this is one of the most competitive corridors in auto transport. High carrier volume and a direct highway route keep prices lower than many comparable distances.',
        },
        {
          q: 'Do you offer round-trip snowbird transport?',
          a: 'Yes. Many of our customers ship southbound in the fall and northbound in the spring. We offer scheduling for both legs and can set up recurring seasonal transport.',
        },
      ]}
      related={[
        { label: 'New Jersey Auto Transport', to: '/new-jersey-auto-transport' },
        { label: 'Florida Car Shipping', to: '/florida-car-shipping' },
        { label: 'Car Shipping Cost', to: '/car-shipping-cost' },
        { label: 'State to State Shipping', to: '/state-to-state-car-shipping' },
        { label: 'Get a Quote', to: '/quote' },
      ]}
    >
      <PricingRange
        routeName="New Jersey to Florida"
        openLow={550}
        openHigh={900}
        enclosedLow={1050}
        enclosedHigh={1550}
        distance={1150}
        typicalTransitDays="3-5"
        seasonalNote="Expect 15-20% higher rates November-March due to snowbird migration."
      />
    </SeoLandingPage>
  );
}
