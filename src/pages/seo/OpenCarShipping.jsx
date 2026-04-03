import SeoLandingPage from './SeoLandingPage';

export default function OpenCarShipping() {
  return (
    <SeoLandingPage
      meta={{
        title: 'Open Car Shipping',
        description: 'Open car carrier transport — the most affordable way to ship your vehicle. Multi-car haulers, nationwide routes.',
        path: '/open-car-shipping',
      }}
      heading="Open Car Shipping — Standard Auto Transport"
      intro="Open car shipping is the most common and cost-effective way to transport a vehicle in the United States. Your car travels on a multi-car hauler alongside other vehicles — the same method dealerships use to move new inventory. It's safe, reliable, and significantly cheaper than enclosed transport."
      whenNeeded={[
        'Shipping a daily driver or standard vehicle',
        'Relocating and need your car moved',
        'Buying a car out of state',
        'Dealer inventory transport',
        'Any vehicle where maximum weather protection isn\'t critical',
        'Budget-conscious shipping without sacrificing reliability',
      ]}
      steps={[
        { title: 'Request a quote', desc: 'Open transport is the default option — just provide your vehicle details and route for pricing.' },
        { title: 'Receive competitive pricing', desc: 'Open carriers hold 7-10 vehicles, spreading the cost across multiple customers. This makes open transport 30-40% cheaper than enclosed.' },
        { title: 'Carrier assigned', desc: 'A verified carrier with an open multi-car hauler is dispatched for your route.' },
        { title: 'Vehicle inspected and loaded', desc: 'Driver performs a condition inspection, documents existing damage, and secures your vehicle on the carrier.' },
        { title: 'Delivered with inspection report', desc: 'At delivery, another inspection confirms your vehicle arrived in the same condition. You sign the Bill of Lading.' },
      ]}
      requirements={[
        'Vehicle year, make, and model',
        'Pickup and delivery addresses',
        'Preferred dates',
        'Vehicle must be accessible for a standard car hauler',
        'Keys must be available for the carrier',
      ]}
      capabilities={[
        'Standard 7-10 car open haulers',
        'Door-to-door pickup and delivery',
        'Nationwide coverage — all 50 states',
        'Fully insured carriers with cargo insurance',
        'Real-time tracking during transit',
        'Condition inspection at pickup and delivery',
      ]}
      faqs={[
        {
          q: 'Is open car shipping safe?',
          a: 'Yes. Open transport is how the vast majority of vehicles are shipped in the US, including new cars from manufacturers to dealerships. While vehicles are exposed to weather and road conditions, actual damage from open transport is extremely rare. All carriers carry cargo insurance for added protection.',
        },
        {
          q: 'What\'s the difference between open and enclosed shipping?',
          a: 'Open carriers are uncovered multi-car haulers (7-10 vehicles). Enclosed carriers are fully covered trailers (2-6 vehicles) that protect from all weather and debris. Open is 30-40% cheaper and suitable for most vehicles. Enclosed is recommended for luxury, classic, or high-value cars.',
        },
        {
          q: 'How much does open car shipping cost?',
          a: 'Open transport pricing depends on distance, vehicle size, and season. As a general guide: 500 miles might be $500-$800, while cross-country (2,500+ miles) could be $1,000-$1,500. Request a quote for exact pricing on your specific route.',
        },
        {
          q: 'When should I choose enclosed instead of open?',
          a: 'Consider enclosed transport for vehicles worth over $50,000, classic or vintage cars, exotic or sports cars, show-condition vehicles, or any car where you want maximum protection regardless of cost.',
        },
      ]}
      related={[
        { label: 'Enclosed Car Shipping', to: '/enclosed-car-shipping' },
        { label: 'Car Shipping Cost', to: '/car-shipping-cost' },
        { label: 'Ship My Car', to: '/ship-my-car' },
        { label: 'State to State Shipping', to: '/state-to-state-car-shipping' },
        { label: 'Get a Quote', to: '/quote' },
      ]}
    />
  );
}
