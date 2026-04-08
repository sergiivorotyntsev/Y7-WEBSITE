import SeoLandingPage from './SeoLandingPage';

export default function SalvageCarShipping() {
  return (
    <SeoLandingPage
      meta={{
        title: 'Salvage Car Shipping',
        description: 'Transport salvage, non-running, and inoperable vehicles. Winch/forklift loading, auction pickup, nationwide delivery.',
        path: '/salvage-car-shipping',
      }}
      heading="Salvage & Non-Running Car Shipping"
      intro="Not every vehicle drives onto a carrier. Y7 Logistics arranges transport for salvage-title, non-running, and inoperable vehicles using carriers equipped with winches, forklifts, and roll-back equipment. Whether your vehicle was purchased at auction, involved in an accident, or simply won't start — we get it where it needs to go."
      whenNeeded={[
        'Purchased a salvage-title vehicle at Copart or IAAI',
        'Vehicle won\'t start or isn\'t drivable',
        'Accident-damaged car needs transport to a body shop',
        'Rebuild project vehicle needs shipping to your garage',
        'Non-running vehicle needs delivery to port for export',
        'Insurance total loss vehicle transport',
      ]}
      steps={[
        { title: 'Share vehicle details', desc: 'Tell us the vehicle condition — does it roll, steer, and brake? This determines the equipment needed.' },
        { title: 'Receive a quote', desc: 'Non-running vehicles require specialized equipment, which affects pricing. We provide transparent all-inclusive quotes.' },
        { title: 'Carrier with proper equipment assigned', desc: 'We match your vehicle with a carrier that has winch, forklift, or roll-back capability as needed.' },
        { title: 'Vehicle loaded and transported', desc: 'Carrier uses appropriate equipment to safely load and secure your vehicle for transit.' },
        { title: 'Delivered to your destination', desc: 'Vehicle delivered to your address, body shop, port, or any location with unloading access.' },
      ]}
      requirements={[
        'Vehicle year, make, model, and VIN',
        'Condition details: does it roll, steer, and brake?',
        'Title type (salvage, rebuilt, clean)',
        'Pickup location (auction yard, home, body shop)',
        'Delivery address',
        'Photos of damage (helpful for carrier preparation)',
      ]}
      capabilities={[
        'Winch-equipped carriers for non-rolling vehicles',
        'Forklift loading for severely damaged vehicles',
        'All title types — salvage, rebuilt, clean, parts-only',
        'Auction pickup from Copart and IAAI nationwide',
        'Delivery to homes, shops, ports, or storage facilities',
        'Open and enclosed transport options',
      ]}
      faqs={[
        {
          q: 'Does a non-running vehicle cost more to ship?',
          a: 'Yes, typically $100-$200 more than a running vehicle of the same size and route. Non-running vehicles require carriers with specialized loading equipment (winch or forklift), which limits available carriers and increases the cost.',
        },
        {
          q: 'What if my vehicle doesn\'t roll, steer, or brake?',
          a: 'We can still ship it. Vehicles that don\'t roll require forklift loading. Vehicles that roll but don\'t steer or brake can be winched onto a carrier. Let us know the exact condition so we can assign the right equipment.',
        },
        {
          q: 'Can you ship a vehicle with a salvage title?',
          a: 'Yes. We transport all title types — salvage, rebuilt, clean, and even parts-only vehicles. Title type doesn\'t affect our ability to ship; it\'s vehicle condition (running/non-running) that matters for logistics.',
        },
        {
          q: 'Do you pick up salvage vehicles from auctions?',
          a: 'Yes. A large portion of our salvage vehicle transport is auction pickup from Copart and IAAI. We coordinate gate passes, schedule carriers with proper equipment, and deliver to your destination.',
        },
      ]}
      related={[
        { label: 'Auction Car Shipping', to: '/auction-car-shipping' },
        { label: 'Copart Shipping', to: '/copart-shipping' },
        { label: 'IAA Transport', to: '/iaai-transport' },
        { label: 'Car Shipping Cost', to: '/car-shipping-cost' },
        { label: 'Get a Quote', to: '/quote' },
      ]}
    />
  );
}
