import SeoLandingPage from './SeoLandingPage';

export default function CarShippingCost() {
  return (
    <SeoLandingPage
      meta={{
        title: 'How Much Does Car Shipping Cost? | Y7 Logistics',
        description:
          'Car shipping costs depend on distance, vehicle type, transport method, and season. Get a free quote from Y7 Logistics — licensed auto transport broker.',
        path: '/car-shipping-cost',
      }}
      heading="How Much Does Car Shipping Cost?"
      intro="Car shipping pricing depends on several factors — distance, vehicle size, transport type, season, and whether the vehicle runs. Y7 Logistics provides transparent, all-inclusive quotes with no hidden fees so you know exactly what you're paying before you book."
      whenNeeded={[
        'Buying a car out of state',
        'Relocating to a new city or state',
        'Sending a vehicle to an auction buyer',
        'Dealer-to-dealer vehicle transfers',
      ]}
      steps={[
        { title: 'Request a Quote', desc: 'Tell us your vehicle details, pickup location, and delivery destination.' },
        { title: 'Receive Pricing', desc: 'We provide an all-inclusive quote based on current market rates and route availability.' },
        { title: 'Confirm & Schedule', desc: 'Accept your quote and we lock in your transport dates.' },
        { title: 'Carrier Picks Up', desc: 'A verified carrier from our network picks up your vehicle at the scheduled time.' },
        { title: 'Vehicle Delivered', desc: 'Your vehicle arrives at the destination and you inspect it upon delivery.' },
      ]}
      requirements={[
        'Vehicle details (year, make, model)',
        'Pickup and delivery locations',
        'Preferred transport dates',
        'Vehicle condition (running or non-running)',
      ]}
      capabilities={[
        'Open and enclosed transport options',
        'Door-to-door service',
        'Expedited shipping available',
        'Inoperable vehicle transport',
        'Real-time tracking',
      ]}
      faqs={[
        {
          q: 'What affects car shipping cost?',
          a: 'The main factors are distance, vehicle size and weight, transport type (open vs. enclosed), time of year, and whether the vehicle is running. Longer routes, larger vehicles, enclosed trailers, peak summer season, and inoperable vehicles all increase the price.',
        },
        {
          q: 'Is open or enclosed transport cheaper?',
          a: 'Open transport is typically 30\u201340% less expensive than enclosed. Open carriers hold more vehicles, spreading the cost. Enclosed is recommended for luxury, classic, or high-value vehicles where extra protection is worth the premium.',
        },
        {
          q: 'How much does it cost to ship a car across the country?',
          a: 'Cross-country rates vary depending on the specific route, vehicle type, and season. The best way to get an accurate price is to request a free quote with your exact details \u2014 we\u2019ll provide all-inclusive pricing within minutes.',
        },
        {
          q: 'Are there hidden fees?',
          a: 'No. Y7 Logistics provides all-inclusive quotes that cover carrier transport, insurance, and door-to-door service. The price you see is the price you pay.',
        },
        {
          q: 'When is the cheapest time to ship a car?',
          a: 'Winter months (November through February) typically have lower demand and lower prices. Summer is peak season due to relocations and snowbird migration, so rates tend to be higher.',
        },
      ]}
      ctaLabel="Get a Free Quote"
      ctaTo="/quote"
      related={[
        { label: 'Ship My Car', to: '/ship-my-car' },
        { label: 'Enclosed Shipping', to: '/enclosed-car-shipping' },
        { label: 'Auction Shipping', to: '/auction-car-shipping' },
        { label: 'Get a Quote', to: '/quote' },
      ]}
    />
  );
}
