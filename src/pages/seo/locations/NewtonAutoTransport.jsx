import SeoLandingPage from '../SeoLandingPage';

export default function NewtonAutoTransport() {
  return (
    <SeoLandingPage
      meta={{
        title: 'Newton MA Auto Transport',
        description:
          'Y7 Logistics is headquartered in Newton, MA. Local auto transport broker serving Newton and all of Greater Boston. USDOT #4427359.',
        path: '/newton-auto-transport',
      }}
      heading="Newton Auto Transport — Your Local Car Shipping Company"
      intro="Y7 Logistics is based in Newton, Massachusetts. Our team coordinates a nationwide auto transport brokerage from the Newton area, serving Greater Boston and the entire United States. When you work with us, you're working with a local business that understands your community and provides personal, responsive service."
      whenNeeded={[
        'Shipping a vehicle from your Newton home',
        'Receiving a car purchased out of state',
        'Sending your car to another state for the season',
        'Dealer transport in the Newton/Wellesley/Needham area',
        'Local business needing fleet transport',
        'Any auto transport need \u2014 we\u2019re your neighbors',
      ]}
      steps={[
        { title: 'Call or Request a Quote', desc: 'Online or by phone \u2014 mention you\u2019re local.' },
        { title: 'Receive Pricing', desc: 'Within 1 hour (often faster for neighbors).' },
        { title: 'Confirm and Schedule', desc: 'At your convenience.' },
        { title: 'Carrier Arrives', desc: 'Picks up at your Newton address.' },
        { title: 'Vehicle Delivered', desc: 'Safely to any US destination.' },
      ]}
      requirements={[
        'Your Newton-area address',
        'Vehicle information',
        'Destination',
        'Preferred timing',
        'Any special instructions (gated driveway, etc.)',
      ]}
      capabilities={[
        'Based in Newton, MA — serving the entire United States',
        'Same-day quote response for local customers',
        'Serving Newton + Wellesley + Needham + Waltham + Watertown + Brookline',
        'All transport types \u2014 open + enclosed + auction + port + dealer',
        'Personal attention from a local team',
        'USDOT #4427359 and MC #1741537',
      ]}
      faqs={[
        {
          q: 'Why choose a Newton-based auto transport broker?',
          a: 'Working with a local broker means faster response times, personal service, and someone who understands your area. We know Newton\u2019s neighborhoods, access points, and can often coordinate same-day pickups for our neighbors.',
        },
        {
          q: 'Do you only serve Newton?',
          a: 'No \u2014 we serve all 50 states. Newton is our headquarters, but we ship vehicles nationwide. Being local just means Newton-area customers get extra-fast service and personal attention.',
        },
        {
          q: 'Can I visit your office?',
          a: 'We are based in Newton, MA. Most of our business is handled remotely via portal and Telegram for maximum efficiency. Local customers in the Greater Boston area can contact us via portal or Telegram to arrange a meeting if needed.',
        },
      ]}
      related={[
        { label: 'Boston Car Shipping', to: '/boston-car-shipping' },
        { label: 'Massachusetts Car Shipping', to: '/massachusetts-car-shipping' },
        { label: 'About Y7', to: '/about' },
        { label: 'Ship My Car', to: '/ship-my-car' },
      ]}
    />
  );
}
