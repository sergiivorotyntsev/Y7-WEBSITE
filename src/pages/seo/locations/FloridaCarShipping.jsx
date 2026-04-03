import SeoLandingPage from '../SeoLandingPage';

export default function FloridaCarShipping() {
  return (
    <SeoLandingPage
      meta={{
        title: 'Florida Car Shipping',
        description:
          'Ship your car to or from Florida. Snowbird transport, dealer inventory, auction pickup from Copart/IAAI FL locations.',
        path: '/florida-car-shipping',
      }}
      heading="Florida Car Shipping — Auto Transport to and from FL"
      intro="Florida is one of the most popular car shipping destinations in the United States. Whether you're a snowbird heading south for the winter, relocating to the Sunshine State, or a dealer moving inventory, Y7 Logistics provides reliable auto transport to and from every corner of Florida."
      whenNeeded={[
        'Snowbird seasonal transport (fall south + spring north)',
        'Relocating to or from Florida',
        'Buying a vehicle from a Florida dealer or private seller',
        'Shipping auction purchase from Copart/IAAI Florida locations',
        'Dealer inventory transport to/from FL lots',
        'Exporting through Port Jacksonville',
      ]}
      steps={[
        { title: 'Request a Quote', desc: 'Provide your FL pickup or delivery address.' },
        { title: 'Receive Competitive Pricing', desc: 'FL is a high-volume corridor = better rates.' },
        { title: 'Confirm and Schedule', desc: 'Lock in your transport dates.' },
        { title: 'Carrier Picks Up', desc: 'Your vehicle is picked up at the scheduled time.' },
        { title: 'Door-to-Door Delivery', desc: 'Delivered in Florida or from FL to your destination.' },
      ]}
      requirements={[
        'Florida address (pickup or delivery)',
        'Vehicle details',
        'Preferred dates (seasonal timing affects pricing)',
        'Vehicle condition',
        'Any gated community or HOA access requirements',
      ]}
      capabilities={[
        'All major Florida cities \u2014 Miami + Orlando + Tampa + Jacksonville + Fort Lauderdale + Naples',
        'Snowbird seasonal packages',
        'Copart and IAAI Florida location pickups',
        'Port Jacksonville delivery for exports',
        'Open and enclosed transport',
        'High-volume corridor pricing (FL routes run frequently)',
      ]}
      faqs={[
        {
          q: 'When is the best time to ship a car to Florida?',
          a: 'January through March has the highest demand (and prices) for southbound routes as snowbirds head to Florida. For the best rates, book your southbound transport in September\u2013October before peak season, or choose summer when demand is lowest.',
        },
        {
          q: 'How long does shipping to Florida take?',
          a: 'From the Northeast (Boston, New York, New Jersey): 4\u20136 days. From the Midwest (Chicago, Detroit): 4\u20135 days. From Texas: 3\u20134 days. From California: 6\u20138 days.',
        },
        {
          q: 'Do you pick up from Florida auctions?',
          a: 'Yes. We pick up from all Copart and IAAI locations in Florida, including Miami, Orlando, Tampa, and Jacksonville. We coordinate gate passes and handle all pickup logistics.',
        },
      ]}
      related={[
        { label: 'MA to FL Car Shipping', to: '/massachusetts-to-florida-car-shipping' },
        { label: 'NJ to FL Car Shipping', to: '/new-jersey-to-florida-car-shipping' },
        { label: 'Port Jacksonville', to: '/ports/jacksonville' },
        { label: 'Car Shipping Cost', to: '/car-shipping-cost' },
        { label: 'Auction Shipping', to: '/auction-car-shipping' },
      ]}
    />
  );
}
