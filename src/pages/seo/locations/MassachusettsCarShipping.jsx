import SeoLandingPage from '../SeoLandingPage';

export default function MassachusettsCarShipping() {
  return (
    <SeoLandingPage
      meta={{
        title: 'Massachusetts Car Shipping',
        description:
          'Licensed auto transport broker serving Massachusetts. Door-to-door vehicle shipping, auction pickup, port delivery. Based in Newton, MA.',
        path: '/massachusetts-car-shipping',
      }}
      heading="Massachusetts Car Shipping — Auto Transport in MA"
      intro="Y7 Logistics is headquartered in Newton, Massachusetts, giving us deep local expertise in serving the Bay State. Whether you're shipping a car out of Massachusetts or receiving one, we provide reliable, fully-insured auto transport with transparent pricing."
      whenNeeded={[
        'Relocating to or from Massachusetts',
        'Buying a car out of state and need it shipped to MA',
        'Sending a vehicle to Florida for the winter (snowbird)',
        'Dealer moving inventory to/from MA lots',
        'Shipping auction purchase from Copart Shrewsbury or IAAI Freetown',
        'Transporting vehicle to Port Newark for export',
      ]}
      steps={[
        { title: 'Request a Free Quote', desc: 'Online or by phone — tell us your vehicle and route details.' },
        { title: 'Receive Competitive Pricing', desc: 'Get a quote within 1 hour based on current market rates.' },
        { title: 'Confirm and Schedule', desc: 'Accept your quote and lock in your transport dates.' },
        { title: 'Carrier Picks Up Your Vehicle', desc: 'A verified carrier from our network arrives at your Massachusetts address.' },
        { title: 'Delivery Anywhere', desc: 'Your vehicle is delivered to any address in MA or nationwide.' },
      ]}
      requirements={[
        'Vehicle details (year/make/model)',
        'Pickup address in Massachusetts (or delivery address if inbound)',
        'Preferred pickup dates',
        'Vehicle condition (running or non-running)',
        'Contact information',
      ]}
      capabilities={[
        'All of Massachusetts — Boston metro, Worcester, Springfield, Cape Cod, Berkshires',
        'Pickup and delivery to any residential or commercial address',
        'Open and enclosed carrier options',
        'Auction pickup from MA locations (Copart Shrewsbury + IAAI Freetown)',
        'Port Newark delivery for MA-based exporters',
        'Snowbird routes to Florida and southern states',
      ]}
      faqs={[
        {
          q: 'How long does it take to ship a car from Massachusetts?',
          a: 'Transit time depends on the destination. To Florida: 4\u20136 days. To California: 7\u201310 days. To nearby states like New York or Connecticut: 1\u20132 days. We provide estimated delivery dates with every quote.',
        },
        {
          q: 'Do you pick up from anywhere in Massachusetts?',
          a: 'Yes. We pick up from any address in Massachusetts \u2014 residential driveways, dealerships, auction yards, storage facilities. We serve the entire state from Boston to the Berkshires.',
        },
        {
          q: 'Is car shipping cheaper in winter or summer from MA?',
          a: 'Winter tends to have lower rates for northbound routes, but routes to Florida are actually more expensive due to snowbird demand. Spring and fall offer the most balanced pricing from Massachusetts.',
        },
      ]}
      related={[
        { label: 'Boston Car Shipping', to: '/boston-car-shipping' },
        { label: 'Car Shipping Cost', to: '/car-shipping-cost' },
        { label: 'Ship My Car', to: '/ship-my-car' },
        { label: 'Port Newark', to: '/ports/newark' },
        { label: 'MA to FL Shipping', to: '/massachusetts-to-florida-car-shipping' },
      ]}
    />
  );
}
