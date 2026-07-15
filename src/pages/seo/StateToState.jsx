import SeoLandingPage, { Section } from './SeoLandingPage';
import { prose, muted, subhead, tableWrap, table, th, td } from './_enrichedStyles';

export default function StateToState() {
  return (
    <SeoLandingPage
      meta={{
        title: 'State to State Car Shipping — Interstate Auto Transport | Y7 Logistics',
        description:
          'State to state car shipping across all 50 states. Licensed FMCSA broker, verified carriers, transparent pricing. Quote in 1 hour.',
        path: '/state-to-state-car-shipping',
      }}
      primaryCTA={{ intlKey: 'shipMyCar', to: '/ship-my-car', tone: 'coral' }}
      secondaryCTA={{ intlKey: 'dealers', to: '/dealers', tone: 'teal' }}
      heading="State-to-State Car Shipping — Interstate Auto Transport"
      intro="Moving a vehicle across state lines is federally regulated commerce. It requires a licensed broker, a carrier with interstate operating authority, and a paper trail at both ends. Y7 Logistics is an FMCSA-licensed broker (MC #1741537, USDOT #4427359) based in Newton, MA. We coordinate vehicle transport between all 50 US states using a vetted network of 700+ carriers on Central Dispatch. We do not own trucks — our value is carrier vetting, dispatch expertise, and a single point of contact through the whole process."
      whenNeeded={[
        'Relocating to a new state for work, school, or family',
        'Buying a car from a seller or dealer in another state',
        'Sending a vehicle to a family member across the country',
        'Dealer moving inventory between state locations',
        'Snowbird seasonal transport (Northeast to Florida and back)',
        'Military PCS move — orders to a new duty station',
        'College student transport at the start or end of a semester',
        'Estate or probate settlement involving a vehicle in another state',
      ]}
      steps={[
        { title: 'Provide origin and destination', desc: 'Full pickup and delivery addresses in both states. ZIP codes alone produce approximate quotes — addresses produce firm quotes.' },
        { title: 'Receive a route-specific quote', desc: 'Pricing depends on distance, corridor traffic, trailer type, and season. Popular corridors (Northeast-FL, CA-TX) price more competitively than thin lanes.' },
        { title: 'Confirm and schedule', desc: 'Choose your preferred first-available date. The carrier is assigned and dispatched once the corridor has matching capacity — typically within 24-72 hours.' },
        { title: 'Pickup with Bill of Lading', desc: 'Carrier arrives within a 1-3 hour window, performs a condition inspection, and signs the BOL. You or your representative must be present.' },
        { title: 'Interstate transit', desc: 'Vehicle moves along federal highways under federal motor carrier rules. Transit time depends on distance and the carrier\u2019s route plan.' },
        { title: 'Delivery and final BOL', desc: 'Final inspection, BOL signature, and door-to-door handoff at your destination address.' },
      ]}
      requirements={[
        'Pickup street address (origin state)',
        'Delivery street address (destination state)',
        'Vehicle year, make, model, VIN if available',
        'Vehicle condition (running, non-running, modifications)',
        'Preferred first-available pickup date',
        'Contact info for both pickup and delivery (18+ must sign BOL at each end)',
        'Any access constraints (gated community, narrow street, HOA rules)',
      ]}
      capabilities={[
        'All 50 US states covered',
        'FMCSA-licensed broker — USDOT #4427359, MC #1741537',
        'All carriers verified for interstate operating authority',
        'Open and enclosed trailer options',
        'Door-to-door service — no terminal drop-off required',
        'Expedited and guaranteed pickup windows available',
        'Shipment status updates from dispatch to delivery',
        'Common corridors: Northeast-Florida, Texas-East, California-Midwest, I-95, I-10, I-40, I-80',
      ]}
      faqs={[
        {
          q: 'How much does state-to-state car shipping cost?',
          a: 'Base open-trailer pricing runs $0.40-$0.70 per mile, with shorter distances priced higher per mile because the base dispatch cost is fixed. Expect $350-$650 under 500 miles, $550-$900 for 500-1000 miles, $750-$1,200 for 1000-1500 miles, and $1,100-$1,700 for cross-country 2,500+ miles. Enclosed transport is 40-60% higher. Non-running vehicles add $100-$300.',
        },
        {
          q: 'How long for cross-country transport?',
          a: 'Plan on 8-12 days from door to door for a 2,500+ mile cross-country move. That includes a 1-5 day dispatch window (time between your first-available date and when the carrier actually shows up) plus 6-8 days of actual driving and delivery. Weather, fuel stops, mandatory driver rest periods, and stops for other vehicles on the same trailer all factor into transit.',
        },
        {
          q: 'What\'s the difference between broker and carrier?',
          a: 'A broker holds an MC number authorizing them to arrange transport — they coordinate shipments but do not own trucks. A carrier holds an MC number authorizing them to physically move vehicles on their own equipment. Y7 is a broker. Our carriers are all independently authorized. FMCSA requires both parties to be licensed for any interstate move.',
        },
        {
          q: 'Do you ship between any two states?',
          a: 'Yes. All 50 states including Alaska (via the Tacoma or Bellingham barge) and Hawaii (via Long Beach or Oakland RoRo). The continental 48 move via standard over-the-road carriers. Alaska and Hawaii require additional port coordination and longer lead times. Common corridors dispatch fastest; thin lanes may need 3-7 days extra for carrier match.',
        },
        {
          q: 'Are state permits required?',
          a: 'Not for standard passenger vehicles — they move freely across state lines under the carrier\'s federal operating authority. Oversized loads (vehicles wider, taller, or longer than standard trailer limits) require state-by-state oversize permits, particularly in CA, OR, and WA. Port-bound loads in NJ, TX, SC, and GA require a terminal gate pass coordinated before pickup.',
        },
        {
          q: 'Insurance during interstate transport?',
          a: 'FMCSA-authorized carriers carry cargo insurance — typically $100,000–$250,000 for open carriers and $250,000–$500,000 for enclosed transport. (The $750,000+ figure sometimes cited is FMCSA-mandated liability insurance for bodily injury and property damage — a separate policy from cargo coverage.) We verify active insurance before assigning any load. Coverage applies to damage caused during transit — not to pre-existing damage, which is why the Bill of Lading inspection at pickup matters. Keep a copy of the BOL; it is the document any insurance claim depends on.',
        },
      ]}
      related={[
        { label: 'Car Shipping Cost', to: '/car-shipping-cost' },
        { label: 'Ship My Car', to: '/ship-my-car' },
        { label: 'Open Car Shipping', to: '/open-car-shipping' },
        { label: 'Auction Car Shipping', to: '/auction-car-shipping' },
      ]}
    >
      <Section title="How Interstate Transport Works">
        <p style={prose}>
          Interstate auto transport is federally regulated under the Federal Motor Carrier Safety
          Administration (FMCSA). Any business arranging or performing vehicle transport across a
          state line must hold federal operating authority. That authority is issued as two
          numbers: an MC number (Motor Carrier or broker authority) and a USDOT number (unique
          identifier for any commercial vehicle operator). You should see both on every quote and
          every truck you hire.
        </p>
        <p style={muted}>
          Y7 Logistics holds MC #1741537 and USDOT #4427359 as a broker — we arrange shipments
          but we do not own or operate trucks. When we dispatch a load, we hire a carrier that
          holds its own MC and USDOT numbers. FMCSA requires that both parties — the broker
          arranging the shipment and the carrier performing it — be independently authorized.
          Every commercial truck moving interstate is required to display its USDOT number on the
          side of the cab. If a truck arrives without visible authority markings, that is your
          signal to call the broker before you release the vehicle.
        </p>
        <p style={muted}>
          The practical effect of this regulatory structure is that the quote price you see
          reflects a chain: your payment goes to the broker, the broker pays the carrier on
          dispatch or delivery, and the broker&rsquo;s margin is the difference. A reputable broker
          shows you a single all-in price. The carrier&rsquo;s cut is invisible to you, which is
          exactly how FMCSA intends the structure to work.
        </p>
      </Section>

      <Section title="Pricing by Distance Tier">
        <p style={prose}>
          Auto transport pricing is driven primarily by distance, but the relationship is not
          linear. Short moves cost more per mile because the carrier still has to dispatch a
          truck, load, drive, unload, and handle paperwork regardless of whether the run is 300
          miles or 3,000. Longer moves amortize that fixed cost across more miles and drop the
          per-mile rate. The table below shows typical open-trailer ranges for a standard sedan
          or SUV on common corridors.
        </p>
        <div style={tableWrap}>
          <table style={table}>
            <thead>
              <tr>
                <th style={th}>Distance Tier</th>
                <th style={th}>Typical Price (Open)</th>
                <th style={th}>Enclosed Adder</th>
                <th style={th}>Transit Time</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={td}>Under 500 miles</td><td style={td}>$350&ndash;$650</td><td style={td}>+40&ndash;60%</td><td style={td}>1&ndash;3 days</td></tr>
              <tr><td style={td}>500&ndash;1,000 miles</td><td style={td}>$550&ndash;$900</td><td style={td}>+40&ndash;60%</td><td style={td}>3&ndash;5 days</td></tr>
              <tr><td style={td}>1,000&ndash;1,500 miles</td><td style={td}>$750&ndash;$1,200</td><td style={td}>+40&ndash;60%</td><td style={td}>4&ndash;6 days</td></tr>
              <tr><td style={td}>1,500&ndash;2,500 miles</td><td style={td}>$950&ndash;$1,450</td><td style={td}>+40&ndash;60%</td><td style={td}>6&ndash;9 days</td></tr>
              <tr><td style={td}>2,500+ miles (cross-country)</td><td style={td}>$1,100&ndash;$1,700</td><td style={td}>+40&ndash;60%</td><td style={td}>8&ndash;12 days</td></tr>
            </tbody>
          </table>
        </div>
        <p style={muted}>
          Ranges reflect season, vehicle size, trailer type, and corridor density. Large SUVs,
          pickup trucks, and lifted vehicles price at the top of each band because they take up
          more deck space. Non-running condition adds $100-$300 regardless of tier. Guaranteed
          pickup windows (a specific date rather than a first-available date) add 15-30%.
        </p>
      </Section>

      <Section title="Most Popular Interstate Corridors">
        <p style={prose}>
          Some routes run full trailers every day. Others see one carrier a week. The difference
          matters because high-volume corridors have more carrier competition, which keeps prices
          tighter and dispatch faster. Knowing which corridor your shipment falls on helps you
          set realistic expectations.
        </p>
        <h3 style={subhead}>Northeast &harr; Florida (snowbird)</h3>
        <p style={muted}>
          The I-95 corridor from Maine down to Miami is the highest-volume auto transport lane in
          the country. October through January carries retirees south; April through June brings
          them back. Rates run $700-$1,100 for Boston-Miami, $650-$1,000 for NYC-Miami, $600-$950
          for Philadelphia-Miami. Transit 4-7 days. Off-season summer rates drop 15-25% in the
          southbound direction and rise in the northbound direction as carriers reposition.
        </p>
        <h3 style={subhead}>California &harr; Texas (dealer)</h3>
        <p style={muted}>
          LA to Dallas, Houston, and San Antonio runs weekly with heavy dealer trade volume on
          both sides. Rates $750-$1,100, transit 3-5 days. Reverse direction (TX-CA) prices
          similarly. This corridor is unusually dense for a 1,500-mile lane because auction
          volume (Copart, Manheim, IAAI) at both ends keeps carriers moving.
        </p>
        <h3 style={subhead}>Midwest &harr; Florida (retiree)</h3>
        <p style={muted}>
          Chicago, Detroit, Columbus, and Indianapolis down to Tampa, Orlando, and Fort Myers
          follows the same seasonal pattern as the Northeast corridor but at a slightly lower
          volume. Rates $750-$1,100, transit 4-6 days. Midwest-FL peaks in November-December
          and reverses in April-May.
        </p>
        <h3 style={subhead}>Northeast &harr; California (cross-country)</h3>
        <p style={muted}>
          Boston, NYC, and Philadelphia to LA, San Francisco, and San Diego is the classic
          cross-country lane. Rates $1,100-$1,700, transit 8-12 days. Summer months have more
          carrier supply and slightly better pricing. Winter weather in the Rockies and upper
          Midwest can add 1-3 days.
        </p>
      </Section>

      <Section title="Transit Time Expectations by Distance">
        <p style={prose}>
          The most common source of customer frustration in auto transport is a mismatch between
          the date you give us as "first available" and the date the carrier actually arrives.
          These are two different things. First-available is the earliest date you are willing to
          release the vehicle. Actual pickup is when a carrier with space on that corridor
          arrives at your address — typically 1-5 days later.
        </p>
        <p style={muted}>
          Here is how to read the timeline. If you list a first-available date of Monday, a
          carrier is typically assigned within 24-72 hours (so by Wednesday or Thursday). The
          carrier then calls you with a 2-hour pickup window usually the day before or the
          morning of. Pickup happens. Then transit begins. Transit itself runs:
        </p>
        <div style={tableWrap}>
          <table style={table}>
            <thead>
              <tr>
                <th style={th}>Distance</th>
                <th style={th}>Dispatch Window</th>
                <th style={th}>Transit</th>
                <th style={th}>Total Door-to-Door</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={td}>Under 500 mi</td><td style={td}>1&ndash;3 days</td><td style={td}>1&ndash;3 days</td><td style={td}>2&ndash;6 days</td></tr>
              <tr><td style={td}>500&ndash;1,000 mi</td><td style={td}>1&ndash;3 days</td><td style={td}>3&ndash;5 days</td><td style={td}>4&ndash;8 days</td></tr>
              <tr><td style={td}>1,000&ndash;1,500 mi</td><td style={td}>1&ndash;4 days</td><td style={td}>4&ndash;6 days</td><td style={td}>5&ndash;10 days</td></tr>
              <tr><td style={td}>Cross-country 2,500+ mi</td><td style={td}>1&ndash;5 days</td><td style={td}>8&ndash;12 days</td><td style={td}>9&ndash;17 days</td></tr>
            </tbody>
          </table>
        </div>
        <p style={muted}>
          If you have a firm deadline, book early and consider a guaranteed pickup window. That
          locks a specific pickup date in exchange for a 15-30% rate premium and reserves carrier
          capacity in advance.
        </p>
      </Section>

      <Section title="State-Specific Regulations">
        <p style={prose}>
          Standard passenger vehicles move freely across state lines under the carrier&rsquo;s
          federal authority. A few categories trigger state-specific rules that can affect
          pickup, cost, or scheduling. We flag these at quote time when we see the addresses.
        </p>
        <h3 style={subhead}>Oversize permits (CA, OR, WA)</h3>
        <p style={muted}>
          California, Oregon, and Washington enforce strict oversize rules for commercial auto
          transport. A vehicle taller than 13&rsquo;6&quot;, wider than 8&rsquo;6&quot;, or heavier
          than standard trailer limits may trigger state oversize permits. Most stock passenger
          vehicles pass clean. Lifted trucks, heavy-duty duallys, and modified vehicles may need
          routing review. Permits cost $50-$300 per state depending on route and are handled by
          the carrier.
        </p>
        <h3 style={subhead}>Port gate passes (NJ, TX, SC, GA)</h3>
        <p style={muted}>
          Port-bound deliveries in Port Newark (NJ), Port Houston (TX), Port Charleston (SC), and
          Port Savannah (GA) require a gate pass coordinated with the port terminal before
          pickup. We handle gate-pass coordination when you provide the freight forwarder info at
          booking. Without a gate pass, the carrier cannot enter the terminal — this is the most
          common delay on port-destined loads.
        </p>
        <h3 style={subhead}>Exports via freight forwarder</h3>
        <p style={muted}>
          Vehicles heading for export by container or RoRo (roll-on roll-off) vessel require
          coordination with the freight forwarder who owns the booking. We deliver to the
          forwarder&rsquo;s warehouse or directly to the port terminal per the booking
          instructions. You must provide the forwarder contact, booking number, and cutoff date
          when requesting the quote — export cutoffs are firm and missing them means the vehicle
          sits until the next vessel.
        </p>
        <h3 style={subhead}>Emissions and title (destination state)</h3>
        <p style={muted}>
          Every state has its own emissions, inspection, and registration rules. Y7 arranges
          transport only — we do not file DMV paperwork, apply for titles, or handle emissions
          tests. That is the vehicle owner&rsquo;s responsibility once the vehicle arrives. Some
          states (CA, CO, NY) have stricter rules on out-of-state-titled vehicles; research your
          destination state&rsquo;s DMV requirements before shipment.
        </p>
      </Section>
    </SeoLandingPage>
  );
}
