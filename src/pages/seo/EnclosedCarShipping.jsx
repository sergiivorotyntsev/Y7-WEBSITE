import SeoLandingPage from './SeoLandingPage';

export default function EnclosedCarShipping() {
  return (
    <SeoLandingPage
      meta={{
        title: 'Enclosed Car Shipping — Premium Vehicle Transport | Y7 Logistics',
        description:
          'Enclosed car shipping for luxury, classic, and high-value vehicles. Fully covered transport with premium insurance. Get a quote from Y7 Logistics.',
        path: '/enclosed-car-shipping',
      }}
      heading="Enclosed Car Shipping — Premium Vehicle Transport"
      intro="Enclosed transport provides the highest level of protection for your vehicle. Fully covered trailers shield your car from weather, road debris, and UV exposure — the gold standard for shipping luxury, classic, and high-value vehicles."
      whenNeeded={[
        'Luxury or exotic car transport',
        'Classic or vintage vehicle shipping',
        'Sports car or performance vehicle',
        'Show car or concours-condition vehicle',
        'Any vehicle worth over $50,000',
        'Vehicles requiring maximum protection',
      ]}
      steps={[
        { title: 'Request Enclosed Quote', desc: 'Provide your vehicle details and any special handling requirements.' },
        { title: 'Vehicle Inspection & Documentation', desc: 'We document your vehicle\u2019s condition before transport for your records.' },
        { title: 'Enclosed Carrier Assigned', desc: 'A verified enclosed carrier with specialty experience is matched to your shipment.' },
        { title: 'White-Glove Pickup', desc: 'Your vehicle is carefully loaded onto the enclosed trailer with lift-gate equipment.' },
        { title: 'Secure Delivery with Inspection', desc: 'Vehicle delivered in the same condition it was picked up, with a final inspection on arrival.' },
      ]}
      requirements={[
        'Vehicle details (year, make, model)',
        'Pickup and delivery locations',
        'Special handling notes',
        'Declared value for insurance coverage',
      ]}
      capabilities={[
        'Fully enclosed trailers',
        'Lift-gate loading and unloading',
        'Single-vehicle transport available',
        'Premium insurance coverage',
        'GPS tracking throughout transit',
        'Experienced specialty drivers',
      ]}
      faqs={[
        {
          q: 'What\u2019s the difference between open and enclosed transport?',
          a: 'Open transport uses uncovered multi-car carriers that expose vehicles to weather and road debris. Enclosed transport uses fully covered trailers that hold 2\u20136 vehicles, providing maximum protection from the elements and complete privacy during transit.',
        },
        {
          q: 'When should I choose enclosed shipping?',
          a: 'Choose enclosed for luxury, classic, exotic, or high-value vehicles. It\u2019s also ideal for show cars, concours-condition vehicles, or simply any car you want the highest level of protection for during transport.',
        },
        {
          q: 'How much more does enclosed shipping cost?',
          a: 'Enclosed transport typically costs 30\u201350% more than open transport. For high-value vehicles, the added protection and peace of mind are well worth the premium.',
        },
        {
          q: 'Is my vehicle insured during enclosed transport?',
          a: 'Yes. All carriers in our network carry cargo insurance. Enclosed shipments also have additional coverage options available based on your vehicle\u2019s declared value.',
        },
      ]}
      ctaLabel="Get an Enclosed Quote"
      ctaTo="/quote"
      related={[
        { label: 'Car Shipping Cost', to: '/car-shipping-cost' },
        { label: 'Ship My Car', to: '/ship-my-car' },
        { label: 'Auction Shipping', to: '/auction-car-shipping' },
        { label: 'Get a Quote', to: '/quote' },
      ]}
    />
  );
}
