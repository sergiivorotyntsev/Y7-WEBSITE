import SeoLandingPage, { Section } from './SeoLandingPage';
import { prose, muted, subhead, tableWrap, table, th, td } from './_enrichedStyles';

export default function OpenCarShipping() {
  return (
    <SeoLandingPage
      meta={{
        title: 'Open Car Shipping — Open Trailer Auto Transport | Y7 Logistics',
        description:
          'Open-trailer auto transport across all 50 states. Most affordable and most common shipping method. Licensed FMCSA broker. Free quote in under 1 hour.',
        path: '/open-car-shipping',
      }}
      heading="Open Car Shipping — The Standard for Auto Transport"
      intro="Open-trailer auto transport is the industry default — roughly 85% of vehicles shipped in the United States move on open carriers, including virtually every new car delivered from factory to dealership. Y7 Logistics is a licensed FMCSA broker (MC #1741537 / USDOT #4427359) based in Newton, MA, coordinating open-trailer shipments through a vetted network of carriers on Central Dispatch. Open is the most affordable option, the most widely available, and for any daily driver or standard vehicle, it's the option you should start with."
      whenNeeded={[
        'Shipping a daily driver, standard sedan, SUV, or pickup truck',
        'Relocating across states and moving one or two personal vehicles',
        'Buying a used car online and shipping it home',
        'Auction purchases from Copart, IAAI, or Manheim on standard vehicles',
        'Dealer-to-dealer trades on non-exotic inventory',
        'Any vehicle under roughly $50,000 where full weather protection is not required',
        'Budget-conscious shipping where reliability matters more than premium handling',
      ]}
      steps={[
        { title: 'Request a Quote', desc: 'Send vehicle details and route — open is the default option.' },
        { title: 'Receive Pricing', desc: 'Transparent all-in rate within 1 hour, with no hidden broker fees.' },
        { title: 'Load Posted', desc: 'We post the load to Central Dispatch and vet bids by authority and insurance.' },
        { title: 'Carrier Assigned', desc: 'Verified carrier with active operating authority accepts the load.' },
        { title: 'Pickup and Inspection', desc: 'Driver calls 12–24h before arrival, documents condition on the BOL.' },
        { title: 'Delivery with BOL Sign-Off', desc: 'Final inspection at delivery; both signatures close the load.' },
      ]}
      requirements={[
        'Vehicle year, make, and model (or VIN)',
        'Pickup and delivery addresses or ZIP codes',
        'Preferred pickup window (first-available date works best)',
        'Running or non-running condition',
        'Keys available at pickup; vehicle accessible for a multi-car hauler',
        'Access notes for low canopy, narrow streets, or gated entries',
      ]}
      capabilities={[
        'Standard 7–10 car open multi-car haulers',
        'Door-to-door pickup and delivery nationwide',
        'All 50 states plus Canadian border coordination',
        'Cargo insurance minimum $750,000 per carrier; most $1M+',
        'Condition inspection at pickup and delivery',
        'Auction and dealer pickup workflows',
        'USDOT #4427359 • MC #1741537 • FMCSA-registered broker',
      ]}
      faqs={[
        {
          q: 'How much cheaper is open car shipping than enclosed?',
          a: 'Open transport runs 40–60% cheaper than enclosed on the same lane. A typical open-trailer rate is $0.40–$0.70 per mile; the same vehicle on an enclosed trailer runs $0.70–$1.20 per mile. On a coast-to-coast 2,800-mile move, that difference is roughly $1,200–$2,000 in your pocket.',
        },
        {
          q: 'Is open car transport safe for my vehicle?',
          a: 'Yes. Every new car delivered from the factory to a US dealership moves on an open trailer — the method is the industry default for a reason. Carriers strap each vehicle with four-point wheel tie-downs, not chains on the body, so the mechanical risk is extremely low. Damage claims on open transport are rare.',
        },
        {
          q: 'Will my car get dirty during open transport?',
          a: 'Usually yes — a light coating of road dust and occasionally road salt in winter months. It is cosmetic only and fully washable. Customers shipping luxury or classic cars in winter often upgrade to enclosed specifically to avoid salt exposure, but for a daily driver a quick wash at delivery handles it.',
        },
        {
          q: 'Can any car go on an open trailer?',
          a: 'Most vehicles up to a standard full-size pickup or large SUV fit. Lifted trucks, low-clearance sports cars, oversized vans, or vehicles with roof racks over 7 feet may require special equipment or an enclosed trailer. Non-running vehicles need carriers equipped for winch loading, which adds $100–$300.',
        },
        {
          q: 'Is weather damage a real risk during open transport?',
          a: 'Rain exposure is real but not damaging — your car gets wet the same way it would in a parking lot. Road debris is minimal because vehicles ride 3–4 feet off the road on the trailer deck, well above spray zones. Sun bleaching is not a concern on short transits. Hail storms are the only serious risk, and carriers reroute around forecasted hail when possible.',
        },
        {
          q: 'How long does open car shipping take?',
          a: 'Transit time is the same as enclosed — open is not slower. Typical times: 1–2 days for short East Coast lanes, 4–6 days for Midwest or Florida destinations, 8–12 days coast-to-coast. Pickup itself happens 1–5 days after your first-available date, and door-to-door delivery follows immediately.',
        },
      ]}
      related={[
        { label: 'Enclosed Car Shipping', to: '/enclosed-car-shipping' },
        { label: 'Car Shipping Cost', to: '/car-shipping-cost' },
        { label: 'Auction Car Shipping', to: '/auction-car-shipping' },
        { label: 'Ship My Car', to: '/ship-my-car' },
      ]}
    >
      <Section title="What Open Car Transport Is">
        <p style={prose}>
          An open car transport trailer is a two-deck multi-car hauler, typically
          carrying 7–10 vehicles at a time — the same rig you see on every interstate
          in the country delivering new cars from factories to dealerships.
          Approximately 85% of all vehicles shipped in the United States move on open
          carriers. That volume is why open rates are as low as they are: carriers
          spread operating costs across 7–10 paying vehicles instead of 2–3.
        </p>
        <p style={muted}>
          The trailer is exposed to weather and road conditions, which is the
          trade-off for the lower price. But vehicles sit 3–4 feet above the road on
          steel decks, protected from rock spray, and are strapped with wheel-net
          tie-downs that never touch the body panels. The trailer itself is engineered
          to flex with load shifts and road vibration. For any standard vehicle —
          commuter sedans, family SUVs, pickup trucks, non-luxury crossovers — open
          transport is the safe, cost-effective default.
        </p>
        <p style={prose}>
          Y7 Logistics coordinates open shipments through Central Dispatch, the
          industry's primary load board. We do not own trucks. We verify carrier
          operating authority (FMCSA active), cargo insurance ($750,000 minimum; most
          carry $1M+), and safety ratings before assigning any load. That vetting is
          where a broker earns the fee, and it is the single most important factor in
          whether your shipment goes smoothly.
        </p>
      </Section>

      <Section title="When Open Transport Is Right for You">
        <p style={prose}>
          Open makes sense for most shipments. The cases where it does not are
          narrow and specific — we cover them on the enclosed page. For everything
          below, open is the right call:
        </p>
        <h3 style={subhead}>Daily drivers and family vehicles</h3>
        <p style={muted}>
          Commuter sedans, family SUVs, crossovers, minivans, pickup trucks. These
          vehicles were built for weather exposure. A 5-day cross-country transit on
          an open trailer is less wear than a single winter in Massachusetts.
        </p>
        <h3 style={subhead}>Budget-conscious shipping</h3>
        <p style={muted}>
          If price is a factor, open is the answer. You will save $400–$2,000 on the
          same lane versus enclosed depending on distance. That money is better spent
          on anything else — including a professional detail at the destination.
        </p>
        <h3 style={subhead}>Used vehicles from online purchase</h3>
        <p style={muted}>
          Cars purchased from Carvana, AutoTrader, Cars.com, or similar online
          marketplaces almost always ship open. The exception is high-value
          specialty listings, but for a standard 3–8 year old used vehicle, open is
          universal and appropriate.
        </p>
        <h3 style={subhead}>Auction vehicles</h3>
        <p style={muted}>
          Copart, IAAI, and Manheim purchases — clean-title and salvage — typically
          ship open. Most auction vehicles are non-luxury, and many are already
          weather-exposed at the auction yard. Open transport with gate-pass
          coordination is the standard workflow.
        </p>
        <h3 style={subhead}>Non-exotic vehicles under ~$50,000</h3>
        <p style={muted}>
          The rough industry threshold for considering enclosed is $50,000 vehicle
          value. Below that, open transport is the default. Above that, enclosed is
          worth consideration depending on the specific vehicle and the customer's
          preference.
        </p>
      </Section>

      <Section title="How Open Carriers Actually Work">
        <p style={prose}>
          A 7–10 car open carrier has two decks. Where your vehicle loads depends on
          its order in the route and its physical characteristics — and it affects
          how quickly you will get it back.
        </p>
        <h3 style={subhead}>Top deck vs bottom deck</h3>
        <p style={muted}>
          Top-deck loading is slightly preferred because it avoids any drip from
          vehicles loaded above. Heavier or taller vehicles (pickup trucks, full-size
          SUVs) often load on the bottom deck for stability. Drivers typically load
          last-on-first-off — so if you are the final pickup on the carrier's route,
          you will be among the first deliveries. Ask at pickup if timing matters.
        </p>
        <h3 style={subhead}>Wheel straps and tie-downs</h3>
        <p style={muted}>
          Modern open carriers use wheel-net tie-downs that loop through the wheels
          and tension to anchor points on the trailer. The straps never contact the
          body, bumpers, or drivetrain. Older chain-and-hook tie-downs are no longer
          the industry standard and should be avoided on any shipment — if your
          assigned carrier arrives with chains-on-axles equipment, call us.
        </p>
        <h3 style={subhead}>The 12–24 hour pickup call</h3>
        <p style={muted}>
          The driver calls you directly 12–24 hours before arrival to confirm a
          two-hour pickup window. You meet the carrier, walk the vehicle together,
          sign the Bill of Lading with any pre-existing damage noted, hand over the
          keys, and you are done. Same workflow at delivery in reverse.
        </p>
      </Section>

      <Section title="Open Transport Pricing">
        <p style={prose}>
          Open-trailer pricing is driven primarily by distance and secondarily by
          season, vehicle size, and origin/destination carrier density. The working
          rate range for open transport is $0.40 to $0.70 per mile, with shoulder-season
          shipments on dense lanes hitting the low end and peak-season shipments on
          rural lanes hitting the top. Here are realistic ranges:
        </p>
        <div style={tableWrap}>
          <table style={table}>
            <thead>
              <tr>
                <th style={th}>Route Length</th>
                <th style={th}>Typical Price (Open)</th>
                <th style={th}>Transit</th>
                <th style={th}>Enclosed Equivalent</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={td}>Under 500 mi (regional)</td><td style={td}>$400&ndash;$700</td><td style={td}>1&ndash;3 days</td><td style={td}>$650&ndash;$1,100</td></tr>
              <tr><td style={td}>500&ndash;1,000 mi</td><td style={td}>$500&ndash;$900</td><td style={td}>3&ndash;5 days</td><td style={td}>$800&ndash;$1,400</td></tr>
              <tr><td style={td}>1,000&ndash;1,500 mi</td><td style={td}>$700&ndash;$1,100</td><td style={td}>4&ndash;7 days</td><td style={td}>$1,100&ndash;$1,700</td></tr>
              <tr><td style={td}>1,500&ndash;2,500 mi</td><td style={td}>$900&ndash;$1,400</td><td style={td}>6&ndash;10 days</td><td style={td}>$1,400&ndash;$2,200</td></tr>
              <tr><td style={td}>2,500+ mi (coast-to-coast)</td><td style={td}>$1,100&ndash;$1,500</td><td style={td}>8&ndash;12 days</td><td style={td}>$1,800&ndash;$2,500</td></tr>
            </tbody>
          </table>
        </div>
        <p style={muted}>
          Seasonal swings move pricing within these ranges predictably. Snowbird
          season (October–January) pushes southbound rates 20–30% higher and
          northbound rates slightly lower. College move-in (August) pushes
          Northeast-bound rates higher. Shoulder seasons (mid-April–May, first two
          weeks of November) offer 10–20% savings versus peak windows. Non-running
          vehicles add $100–$300 for winch or forklift loading.
        </p>
      </Section>

      <Section title="Protection, Insurance, and Weather Reality">
        <p style={prose}>
          The biggest concern customers raise about open transport is weather. The
          actual risk profile is narrower than most people expect. Here is the
          honest breakdown:
        </p>
        <h3 style={subhead}>Cargo insurance</h3>
        <p style={muted}>
          Every carrier in our network carries minimum $750,000 cargo insurance.
          Most carry $1M+. We verify active coverage through FMCSA's SAFER system
          before assigning any load. Coverage is on the carrier's policy, not the
          broker's — the Bill of Lading is the evidence base for any claim.
        </p>
        <h3 style={subhead}>Rain and precipitation</h3>
        <p style={muted}>
          Real exposure. Your vehicle gets wet the same way it would sitting in a
          parking lot. No functional damage; it will need a wash at delivery.
        </p>
        <h3 style={subhead}>Road debris and stone chips</h3>
        <p style={muted}>
          Minimal risk. Vehicles ride 3–4 feet above the road on the trailer, well
          above the spray zone. Stone chips from trailing traffic are rare. The one
          recurring exception is trucks throwing mud or tar during highway construction —
          still cosmetic only.
        </p>
        <h3 style={subhead}>Sun and UV exposure</h3>
        <p style={muted}>
          Not a concern on typical transit times. A 7–12 day cross-country move
          produces no measurable paint fade or interior bleaching. Vehicles that sit
          outdoors year-round in Arizona experience 365 days of exposure; your
          shipment experiences one to two weeks at most.
        </p>
        <h3 style={subhead}>Inspection and BOL</h3>
        <p style={muted}>
          The Bill of Lading signed at pickup documents pre-existing condition —
          dings, scratches, paint chips, wheel curb rash. At delivery, a second
          inspection confirms condition. Any new damage is noted on the BOL before
          the driver leaves, and the insurance claim process starts from there. Take
          photos at both ends. It is the single best habit for protecting yourself.
        </p>
      </Section>
    </SeoLandingPage>
  );
}
