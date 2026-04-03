import SeoLandingPage from '../SeoLandingPage';

export default function BostonCarShipping() {
  return (
    <SeoLandingPage
      meta={{
        title: 'Boston Car Shipping',
        description:
          'Car shipping in Boston and Greater Boston area. Pickup from any address, dealership, or auction. Licensed broker based in Newton, MA.',
        path: '/boston-car-shipping',
      }}
      heading="Boston Car Shipping — Vehicle Transport in Greater Boston"
      intro="Shipping a car to or from the Greater Boston area requires a broker who knows the city. Y7 Logistics is based in Newton — just minutes from downtown Boston — and handles the logistics of pickup and delivery across the metro area, including navigating tight streets, permit parking zones, and seasonal challenges."
      whenNeeded={[
        'Moving to or from Boston for work or school',
        'Buying a vehicle online and shipping it to Boston',
        'Sending car to Florida for the winter',
        'Dealer trade between Boston-area dealerships',
        'Relocating from Boston to another state',
        'Receiving an auction purchase in Greater Boston',
      ]}
      steps={[
        { title: 'Get a Quote', desc: 'Mention your Boston neighborhood for best pricing.' },
        { title: 'Confirm Transport Dates', desc: 'Lock in your preferred pickup window.' },
        { title: 'Carrier Scheduled', desc: 'A verified carrier is assigned for your pickup window.' },
        { title: 'Vehicle Picked Up', desc: 'Carrier arrives at your Boston-area address.' },
        { title: 'Door-to-Door Delivery', desc: 'Your vehicle is delivered to your destination.' },
      ]}
      requirements={[
        'Exact pickup or delivery address in Greater Boston',
        'Vehicle year/make/model',
        'Preferred dates',
        'Parking situation (driveway, street, garage \u2014 helps carrier plan)',
        'Special notes (gated community, narrow street, etc.)',
      ]}
      capabilities={[
        'Full Greater Boston coverage \u2014 Cambridge, Somerville, Brookline, Newton, Quincy, Dorchester, Back Bay, South End, Allston, Medford, Malden',
        'Carriers experienced with Boston parking and street constraints',
        'Winter scheduling with weather contingency planning',
        'Open and enclosed transport',
        'Same-day quote response from our local Newton office',
      ]}
      faqs={[
        {
          q: 'Can you pick up from a street with permit parking in Boston?',
          a: 'Yes. We coordinate with carriers who are experienced in Boston\u2019s parking situations. For permit-only streets, we may arrange a nearby meeting point or time the pickup for legal parking windows.',
        },
        {
          q: 'What are the most popular routes from Boston?',
          a: 'The busiest routes from Boston are to Miami/South Florida (snowbirds), Los Angeles, Houston, and Port Newark (exports). We run carriers on these corridors regularly, which keeps pricing competitive.',
        },
        {
          q: 'How do Boston\u2019s narrow streets affect car shipping?',
          a: 'Our carriers know which Boston neighborhoods require smaller equipment. For very tight streets, we may use a flatbed or arrange pickup at a nearby accessible location. This is part of our local expertise.',
        },
      ]}
      related={[
        { label: 'Massachusetts Car Shipping', to: '/massachusetts-car-shipping' },
        { label: 'Car Shipping Cost', to: '/car-shipping-cost' },
        { label: 'Ship My Car', to: '/ship-my-car' },
        { label: 'MA to FL Shipping', to: '/massachusetts-to-florida-car-shipping' },
      ]}
    />
  );
}
