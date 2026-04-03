import SeoLandingPage from './SeoLandingPage';

export default function StateToState() {
  return (
    <SeoLandingPage
      meta={{
        title: 'State to State Car Shipping',
        description: 'Ship your car between any US states. Door-to-door pickup and delivery. Licensed interstate auto transport broker.',
        path: '/state-to-state-car-shipping',
      }}
      heading="State-to-State Car Shipping — Interstate Auto Transport"
      intro="Shipping a vehicle across state lines requires a federally licensed broker and verified interstate carriers. Y7 Logistics holds USDOT #4427359 and MC #1677498, authorizing us to arrange vehicle transport between all 50 US states. Whether it's a neighboring state or coast-to-coast, we handle the logistics from door to door."
      whenNeeded={[
        'Relocating to a new state for work or family',
        'Buying a car from a seller in another state',
        'Sending a vehicle to a family member across the country',
        'Dealer moving inventory between state locations',
        'Snowbird seasonal transport between home states',
        'Military PCS move requiring vehicle transport',
      ]}
      steps={[
        { title: 'Provide origin and destination states', desc: 'Tell us your pickup and delivery addresses — we handle all interstate logistics and routing.' },
        { title: 'Receive a route-specific quote', desc: 'Pricing depends on distance, route popularity, and vehicle type. High-volume corridors (like Northeast to Florida) get better rates.' },
        { title: 'Confirm and schedule', desc: 'Pick your preferred pickup window. We assign a carrier licensed for your specific interstate route.' },
        { title: 'Vehicle picked up at origin', desc: 'Carrier arrives at your pickup address, performs a condition inspection, and loads your vehicle.' },
        { title: 'Delivered at destination', desc: 'Your vehicle arrives at your new-state address with a final condition inspection and signed Bill of Lading.' },
      ]}
      requirements={[
        'Pickup address (full street address in origin state)',
        'Delivery address (full street address in destination state)',
        'Vehicle year, make, model',
        'Vehicle condition (running or non-running)',
        'Preferred pickup dates',
        'Contact information for both ends',
      ]}
      capabilities={[
        'All 50 US states covered',
        'FMCSA-licensed broker (USDOT #4427359, MC #1677498)',
        'All carriers verified for interstate authority',
        'Open and enclosed transport options',
        'Door-to-door service — no terminal drop-off needed',
        'Real-time tracking throughout transit',
        'Common corridors: Northeast↔Florida, Texas↔East Coast, California↔Midwest',
      ]}
      faqs={[
        {
          q: 'How long does state-to-state car shipping take?',
          a: 'Transit time depends on distance. Neighboring states: 1-3 days. Mid-range (500-1,000 miles): 3-5 days. Cross-country (2,000+ miles): 6-10 days. High-volume routes often have faster transit due to more carrier availability.',
        },
        {
          q: 'Do I need to be present for pickup and delivery?',
          a: 'Someone 18+ must be present to sign the Bill of Lading at both pickup and delivery. It doesn\'t have to be the vehicle owner — you can designate a representative.',
        },
        {
          q: 'Is interstate auto transport regulated?',
          a: 'Yes. Interstate vehicle transport is regulated by the Federal Motor Carrier Safety Administration (FMCSA). Both brokers and carriers must hold federal operating authority. Y7 Logistics is fully licensed with USDOT #4427359 and MC #1677498.',
        },
        {
          q: 'What are the most popular state-to-state routes?',
          a: 'The busiest corridors include: Massachusetts/New York/New Jersey to Florida (snowbirds), Texas to East Coast ports (exports), California to Midwest (relocations), and dealer trade routes along the I-95 corridor.',
        },
        {
          q: 'Does distance always determine the price?',
          a: 'Distance is the biggest factor, but route popularity matters too. High-volume corridors (like NJ→FL) have more carrier competition, which keeps prices lower per mile than less-traveled routes.',
        },
      ]}
      related={[
        { label: 'Car Shipping Cost', to: '/car-shipping-cost' },
        { label: 'Ship My Car', to: '/ship-my-car' },
        { label: 'Open Car Shipping', to: '/open-car-shipping' },
        { label: 'MA to FL Shipping', to: '/massachusetts-to-florida-car-shipping' },
        { label: 'NJ to FL Shipping', to: '/new-jersey-to-florida-car-shipping' },
        { label: 'Get a Quote', to: '/quote' },
      ]}
    />
  );
}
