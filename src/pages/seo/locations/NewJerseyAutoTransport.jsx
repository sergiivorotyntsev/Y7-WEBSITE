import SeoLandingPage from '../SeoLandingPage';

export default function NewJerseyAutoTransport() {
  return (
    <SeoLandingPage
      meta={{
        title: 'New Jersey Auto Transport',
        description:
          'Auto transport in New Jersey. Port Newark delivery, dealer trades, auction pickup. Licensed broker with nationwide coverage.',
        path: '/new-jersey-auto-transport',
      }}
      heading="New Jersey Auto Transport — Vehicle Shipping in NJ"
      intro="New Jersey is a critical hub for auto transport, home to Port Newark — one of the busiest vehicle export terminals on the East Coast. Y7 Logistics provides comprehensive auto transport services throughout New Jersey, from residential door-to-door shipping to high-volume dealer and port delivery operations."
      whenNeeded={[
        'Shipping a vehicle to or from New Jersey',
        'Delivering to Port Newark/Elizabeth for export',
        'NJ dealer-to-dealer trades',
        'Picking up from Copart or IAAI New Jersey locations',
        'Relocating to/from the Garden State',
        'Receiving auction purchases at your NJ address',
      ]}
      steps={[
        { title: 'Request a Quote', desc: 'Provide your NJ address and vehicle details.' },
        { title: 'Receive Pricing', desc: 'Within 1 hour based on current market rates.' },
        { title: 'Confirm and Schedule', desc: 'Lock in your transport dates.' },
        { title: 'Carrier Picks Up or Delivers', desc: 'A verified carrier handles your NJ transport.' },
        { title: 'Transport Completed', desc: 'Door-to-door or port delivery finished.' },
      ]}
      requirements={[
        'NJ pickup or delivery address',
        'Vehicle details',
        'Destination (or origin if inbound)',
        'For port delivery \u2014 warehouse name and contact',
        'Timing preferences',
      ]}
      capabilities={[
        'All of New Jersey \u2014 North + Central + South',
        'Port Newark/Elizabeth delivery and coordination',
        'High dealer density corridor support',
        'Copart NJ and IAAI NJ auction pickup',
        'Residential and commercial pickup/delivery',
        'Open and enclosed transport options',
      ]}
      faqs={[
        {
          q: 'Do you deliver to Port Newark?',
          a: 'Yes. Port Newark delivery is one of our core services. We coordinate with port warehouses, provide accurate delivery timing, and handle all required documentation for the domestic transport leg.',
        },
        {
          q: 'How long does it take to ship a car from New Jersey?',
          a: 'To Florida: 3\u20135 days. To California: 7\u20139 days. To New England: 1\u20132 days. NJ\u2019s location on the I-95 corridor makes it well-connected for fast transit times.',
        },
        {
          q: 'Do you serve all of New Jersey?',
          a: 'Yes \u2014 from Bergen County to Cape May, Newark to Princeton. We pick up and deliver to any address in the state.',
        },
      ]}
      related={[
        { label: 'Port Newark', to: '/ports/newark' },
        { label: 'NJ to FL Shipping', to: '/new-jersey-to-florida-car-shipping' },
        { label: 'Dealer Transport', to: '/dealer-auto-transport' },
        { label: 'Auction Shipping', to: '/auction-car-shipping' },
        { label: 'Car Shipping Cost', to: '/car-shipping-cost' },
      ]}
    />
  );
}
