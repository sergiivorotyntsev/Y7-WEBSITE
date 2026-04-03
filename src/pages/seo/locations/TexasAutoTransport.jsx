import SeoLandingPage from '../SeoLandingPage';

export default function TexasAutoTransport() {
  return (
    <SeoLandingPage
      meta={{
        title: 'Texas Auto Transport',
        description:
          'Vehicle shipping to and from Texas. Houston port delivery, Dallas/Fort Worth auction pickup, dealer transport across TX.',
        path: '/texas-auto-transport',
      }}
      heading="Texas Auto Transport — Car Shipping in TX"
      intro="Texas is one of the largest auto transport markets in the country, home to high-volume auction yards, a major export port in Houston, and a thriving dealer network across Dallas, Houston, San Antonio, and Austin. Y7 Logistics serves the entire Lone Star State with reliable, competitively-priced vehicle shipping."
      whenNeeded={[
        'Shipping to or from Texas',
        'Picking up auction vehicles from Copart/IAAI Texas locations (high volume state)',
        'Delivering to Port Houston for export',
        'Dealer transport across Texas or interstate',
        'Relocating to Texas from another state',
        'Buying a vehicle from a TX seller',
      ]}
      steps={[
        { title: 'Request a Quote', desc: 'Provide your TX details and vehicle information.' },
        { title: 'Receive Competitive Pricing', desc: 'TX is a high-volume state = frequent carrier availability.' },
        { title: 'Confirm and Schedule', desc: 'Lock in your transport dates.' },
        { title: 'Carrier Picks Up', desc: 'From your TX location at the scheduled time.' },
        { title: 'Delivered to Destination', desc: 'Door-to-door or port delivery completed.' },
      ]}
      requirements={[
        'Texas pickup or delivery address',
        'Vehicle details (year/make/model)',
        'Destination or origin',
        'Timing preferences',
        'For port delivery \u2014 Houston warehouse details',
      ]}
      capabilities={[
        'All major TX metros \u2014 Houston + Dallas/Fort Worth + San Antonio + Austin + El Paso',
        'Port Houston delivery for exports',
        'All Copart and IAAI Texas locations (one of the highest-volume states)',
        'Dealer transport across TX\u2019s large geography',
        'Open and enclosed options',
        'Long-distance corridors \u2014 TX to East Coast + West Coast + Midwest',
      ]}
      faqs={[
        {
          q: 'How long does it take to ship a car from Texas?',
          a: 'To the East Coast (New York, New Jersey): 4\u20136 days. To California: 3\u20134 days. To the Midwest (Chicago): 3\u20134 days. To Florida: 3\u20134 days. Texas\u2019s central location provides efficient transit times in all directions.',
        },
        {
          q: 'Do you deliver to Port Houston?',
          a: 'Yes. We deliver vehicles to Port Houston warehouses for export. This is a popular route for auction-to-port transport from Texas Copart and IAAI locations.',
        },
        {
          q: 'Is Texas car shipping expensive?',
          a: 'Texas is one of the better-priced states for auto transport because of high carrier volume and central location. Many carriers run through Texas regularly, keeping rates competitive.',
        },
      ]}
      related={[
        { label: 'Port Houston', to: '/ports/houston' },
        { label: 'TX to Port Newark', to: '/texas-to-newark-port-auto-transport' },
        { label: 'Copart Shipping', to: '/copart-shipping' },
        { label: 'Auction Shipping', to: '/auction-car-shipping' },
        { label: 'Car Shipping Cost', to: '/car-shipping-cost' },
      ]}
    />
  );
}
