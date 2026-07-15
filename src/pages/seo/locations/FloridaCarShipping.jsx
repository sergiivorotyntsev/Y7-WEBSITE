import SeoLandingPage, { Section } from '../SeoLandingPage';
import { prose, muted, subhead, tableWrap, table, th, td } from '../_enrichedStyles';

export default function FloridaCarShipping() {
  return (
    <SeoLandingPage
      meta={{
        title: 'Florida Car Shipping — Auto Transport To and From FL | Y7 Logistics',
        description:
          'Car shipping to and from Florida. Miami, Orlando, Tampa, Jacksonville. Snowbird corridor specialist. Licensed FMCSA broker MC #1741537.',
        path: '/florida-car-shipping',
      }}
      primaryCTA={{ intlKey: 'shipMyCar', to: '/ship-my-car', tone: 'coral' }}
      secondaryCTA={{ intlKey: 'exporters', to: '/exporters', tone: 'amber' }}
      heading="Florida Car Shipping — Auto Transport to and from FL"
      intro="Florida is the busiest state in the country for inbound auto transport, driven by snowbird traffic, retiree relocations, college moves, military transfers, and year-round tourism. Y7 Logistics coordinates Florida shipments from our Newton, MA office using a vetted network of 700+ carriers on Central Dispatch. We are a licensed FMCSA broker (MC #1741537, USDOT #4427359), covering every Florida ZIP from Pensacola to Key West, and every auction yard, dealer lot, and port terminal in between."
      whenNeeded={[
        'Snowbird seasonal transport (fall south + spring north)',
        'Relocating to or from Florida permanently',
        'Buying a vehicle from a Florida dealer or private seller',
        'Shipping auction purchases from Copart or IAAI Florida yards',
        'Dealer inventory moves to or from FL lots',
        'Exporting through Port of Jacksonville (JAXPORT)',
        'College transport to UF, UCF, USF, FSU, Miami, FAU, FIU',
        'Military PCS moves to Tampa (MacDill), Pensacola, Jacksonville NAS, or Eglin AFB',
      ]}
      steps={[
        { title: 'Request a quote with your FL address', desc: 'Florida is a deep market — pricing varies by city. Miami and Fort Lauderdale price differently than Jacksonville or Pensacola.' },
        { title: 'Receive route-specific pricing', desc: 'Snowbird corridor pricing swings 20-30% by season. We quote based on current demand, not a fixed rate card.' },
        { title: 'Confirm and schedule', desc: 'Lock in your first-available date. We typically dispatch a carrier within 24-72 hours on FL corridors.' },
        { title: 'Pickup with Bill of Lading', desc: 'Carrier arrives, inspects the vehicle, signs the BOL at both ends. Door-to-door service.' },
        { title: 'Delivery anywhere in Florida', desc: 'From Miami high-rises to the Keys to the Panhandle — coverage statewide with no terminal drop-off.' },
      ]}
      requirements={[
        'Florida address (pickup or delivery, full street address)',
        'Vehicle year, make, model, VIN if available',
        'Preferred dates (seasonal timing affects pricing significantly)',
        'Vehicle condition (running, non-running, modifications)',
        'Gated community, HOA, condo tower, or townhouse access notes',
        'Contact information for both ends (18+ must sign BOL)',
      ]}
      capabilities={[
        'All major FL cities — Miami, Orlando, Tampa, Jacksonville, Fort Lauderdale, Naples, Sarasota, Fort Myers, Gainesville, Tallahassee, Pensacola',
        'Snowbird corridor specialist — Northeast/Midwest to FL and back',
        'Copart and IAAI Florida yard pickups (Miami, Orlando, Tampa, Jacksonville, Punta Gorda)',
        'Port of Jacksonville (JAXPORT) delivery for RoRo and container exports',
        'Open and enclosed transport',
        'High-volume corridor pricing — FL routes run daily',
        'Experience with gated communities, condo high-rises, and HOA restrictions',
        'USDOT #4427359 / MC #1741537 — FMCSA-registered broker',
      ]}
      faqs={[
        {
          q: 'How much to ship a car to Florida?',
          a: 'Typical open-trailer pricing to Florida: Boston-Miami $750-$1,100, NYC-Miami $700-$1,050, Chicago-Tampa $800-$1,150, Dallas-Orlando $650-$950, Los Angeles-Miami $1,200-$1,700. Add 40-60% for enclosed transport. Snowbird peak (October-January) runs 20-30% above the quiet season.',
        },
        {
          q: 'Best time to ship to Florida?',
          a: 'September and early October offer the best southbound rates before snowbird demand peaks. By November, southbound pricing climbs 20-30% and stays high through January. Shoulder seasons (mid-April to late May, first two weeks of November) give the best rates in either direction because carrier supply outpaces demand.',
        },
        {
          q: 'How long from Northeast to Florida?',
          a: 'Plan on 4-7 days door-to-door from the Northeast to Florida. Boston, NYC, and Philadelphia to Miami run 5-7 days of transit plus a 1-3 day dispatch window. Faster to Jacksonville and the Panhandle (4-5 days), slightly longer to Key West or the Everglades. Snowbird peak can stretch schedules by 1-2 days.',
        },
        {
          q: 'Can you pick up from any FL city?',
          a: 'Yes. Statewide coverage including Miami, Fort Lauderdale, West Palm Beach, Naples, Fort Myers, Sarasota, Tampa, St. Petersburg, Orlando, Daytona, Jacksonville, Gainesville, Tallahassee, Pensacola, and everything in between. Gated communities and condo high-rises sometimes require a nearby meet-up; we flag these at quote time.',
        },
        {
          q: 'Summer rates FL to Northeast?',
          a: 'Yes — May through August is the cheapest time to ship northbound from Florida. Carriers need loads to reposition north after the snowbird season ends, so FL-to-NE rates discount 15-25% versus the fall season. If you are flexible on timing, a June or July shipment north from FL is the deal window.',
        },
        {
          q: 'Port delivery at JAXPORT?',
          a: 'Yes. We deliver to the Port of Jacksonville for RoRo and container-based vehicle exports. JAXPORT is the largest vehicle export port on the East Coast. We need the freight forwarder info, booking number, and cutoff date at quote time. Port pickups require a gate pass coordinated before the carrier arrives at the terminal.',
        },
      ]}
      related={[
        { label: 'MA to FL', to: '/massachusetts-to-florida-car-shipping' },
        { label: 'NJ to FL', to: '/new-jersey-to-florida-car-shipping' },
        { label: 'Copart FL & Export Hub', to: '/copart-shipping' },
        { label: 'Ship My Car', to: '/ship-my-car' },
        { label: 'Car Shipping Cost', to: '/car-shipping-cost' },
      ]}
    >
      <Section title="Florida as the #1 Auto Transport Destination">
        <p style={prose}>
          Florida receives more inbound vehicle transport volume than any other state. The drivers
          behind that are structural, not seasonal: Florida has the second-highest share of
          residents over 65 in the country, which feeds a permanent retiree-relocation pipeline;
          it adds roughly 1,000 new residents per day through domestic migration; and the state
          economy leans heavily on tourism and hospitality, which needs year-round workforce
          mobility. The snowbird pattern sits on top of those baseline flows and amplifies them
          seasonally.
        </p>
        <p style={muted}>
          For auto transport specifically, Florida has five volume-driving populations. Snowbirds
          ship south in October-December and north in April-May. Permanent retirees relocate year
          round. Colleges — UF in Gainesville, FSU in Tallahassee, UCF in Orlando, USF in Tampa,
          Miami, FAU, FIU — drive August move-in and May move-out surges. Military bases at
          MacDill (Tampa), Pensacola NAS, Jacksonville NAS, Eglin AFB, and Tyndall AFB generate
          steady PCS orders. And tourism-linked seasonal workers move in and out of Orlando,
          Miami, and the Keys on their own cycles. The practical effect: FL is always active, but
          the shape of the active lane changes every quarter.
        </p>
      </Section>

      <Section title="Pricing To and From Florida">
        <p style={prose}>
          Florida pricing is defined by the directional imbalance between inbound and outbound
          loads, which flips twice a year. In fall and early winter (October-January), carriers
          are full southbound and half-empty northbound. By late spring and summer (May-August),
          carriers are full northbound (retirees returning, carriers repositioning) and compete
          for southbound loads at discounted rates. Shippers who understand this cycle save
          15-30% by timing shipments into the off-peak direction.
        </p>
        <div style={tableWrap}>
          <table style={table}>
            <thead>
              <tr>
                <th style={th}>Route</th>
                <th style={th}>Fall/Winter Rate</th>
                <th style={th}>Spring/Summer Rate</th>
                <th style={th}>Transit</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={td}>Boston &rarr; Miami</td><td style={td}>$950&ndash;$1,150</td><td style={td}>$700&ndash;$900</td><td style={td}>5&ndash;7 days</td></tr>
              <tr><td style={td}>NYC &rarr; Orlando</td><td style={td}>$850&ndash;$1,050</td><td style={td}>$650&ndash;$850</td><td style={td}>4&ndash;6 days</td></tr>
              <tr><td style={td}>Chicago &rarr; Tampa</td><td style={td}>$900&ndash;$1,150</td><td style={td}>$700&ndash;$900</td><td style={td}>4&ndash;5 days</td></tr>
              <tr><td style={td}>Miami &rarr; Boston (north)</td><td style={td}>$700&ndash;$900</td><td style={td}>$850&ndash;$1,050</td><td style={td}>5&ndash;7 days</td></tr>
              <tr><td style={td}>Tampa &rarr; NYC (north)</td><td style={td}>$650&ndash;$850</td><td style={td}>$800&ndash;$1,000</td><td style={td}>4&ndash;6 days</td></tr>
              <tr><td style={td}>Dallas &rarr; Orlando</td><td style={td}>$650&ndash;$950</td><td style={td}>$550&ndash;$800</td><td style={td}>3&ndash;4 days</td></tr>
              <tr><td style={td}>LA &rarr; Miami</td><td style={td}>$1,350&ndash;$1,700</td><td style={td}>$1,200&ndash;$1,500</td><td style={td}>8&ndash;11 days</td></tr>
            </tbody>
          </table>
        </div>
        <p style={muted}>
          Add 40-60% for enclosed transport. Non-running vehicles add $100-$300. The seasonal
          delta is most pronounced on the Northeast corridor — Boston, NYC, Philadelphia, and NJ
          to Florida swing 20-30% peak-to-off-peak. Texas-to-Florida swings less (roughly 10-15%)
          because it does not track snowbird cycles as tightly. California-to-Florida swings 10%
          and is dominated by general relocation rather than seasonal travel.
        </p>
      </Section>

      <Section title="Key Florida Destinations">
        <p style={prose}>
          Florida is geographically large — over 500 miles from Pensacola in the western Panhandle
          to Key West in the south. That means intra-Florida pricing differences are real. A load
          headed to Miami costs more than one headed to Jacksonville even when the origin is
          identical, because the carrier is adding 300+ miles of Florida drive time after it
          crosses the state line.
        </p>
        <h3 style={subhead}>Miami &amp; Fort Lauderdale</h3>
        <p style={muted}>
          The largest inbound market in Florida. Dense snowbird destinations (Miami Beach, Coral
          Gables, Boca Raton, Aventura), luxury vehicle traffic, and port-bound exports through
          the Port of Miami. Expect the top of the FL rate band. High-rise condo deliveries often
          require a nearby meet-up because valet and loading-dock access is restricted.
        </p>
        <h3 style={subhead}>Orlando</h3>
        <p style={muted}>
          Central Florida hub. Retirees in The Villages, Winter Park, and Lake Mary; college
          traffic at UCF; year-round tourism workforce. Moderate pricing, strong carrier supply
          in both directions.
        </p>
        <h3 style={subhead}>Tampa &amp; St. Petersburg</h3>
        <p style={muted}>
          West coast hub anchored by MacDill AFB (military PCS volume), USF (college), and
          retirees along the Gulf Coast. Pricing sits slightly below Miami-Fort Lauderdale.
          Transit is 1-2 days shorter from the Northeast vs Miami.
        </p>
        <h3 style={subhead}>Jacksonville</h3>
        <p style={muted}>
          Northeast Florida hub, shortest transit time from the Northeast (4-5 days from Boston).
          Large military population (NAS Jacksonville, Mayport Naval Station) plus the Port of
          Jacksonville for vehicle exports. Best FL pricing for shippers whose final destination
          is flexible.
        </p>
        <h3 style={subhead}>Fort Myers, Naples, Sarasota</h3>
        <p style={muted}>
          Gulf coast retiree destinations. Pricing is close to Miami because the carrier is adding
          west-coast-of-Florida drive time. Gated communities are the norm, so access notes matter
          at quote time.
        </p>
      </Section>

      <Section title="Port Delivery in Florida (JAXPORT)">
        <p style={prose}>
          The Port of Jacksonville is the largest vehicle export port on the East Coast, handling
          both RoRo (roll-on roll-off) and container-based vehicle exports to Europe, the
          Caribbean, South America, and West Africa. Y7 delivers to JAXPORT regularly and
          understands the terminal gate-pass workflow.
        </p>
        <p style={muted}>
          Port deliveries require coordination with the freight forwarder who owns the ocean
          booking. You give us the forwarder contact, booking number, and cutoff date at quote
          time. We dispatch a carrier with a JAXPORT gate pass for the specific delivery window.
          Missed cutoffs mean the vehicle sits until the next vessel, which can be 5-10 days out
          depending on the route. Common origins for JAXPORT-bound shipments: Northeast dealer
          lots, Copart yards nationwide, and private sellers along the East Coast. Port of Miami
          and Port Everglades also handle vehicle exports but at lower volume.
        </p>
      </Section>

      <Section title="Summer Reverse Flow: FL to Northeast">
        <p style={prose}>
          The best-kept secret in Florida auto transport is the summer northbound discount.
          After snowbird season ends in April, carriers that have been running full southbound
          all winter need loads heading north. They discount the northbound direction aggressively
          because the alternative is driving empty back to the Northeast to pick up the next
          southbound load. That carrier economics problem is your opportunity.
        </p>
        <p style={muted}>
          Typical summer discounts on FL-to-Northeast lanes run 15-25% below the same lane priced
          in October. If you own property in both regions, ship your Florida vehicle north in
          May or June, keep it up north through the summer, and ship south again in late
          September before the snowbird rush tightens capacity. That pattern buys you two
          discounted shipments per year instead of paying peak pricing twice.
        </p>
        <p style={muted}>
          The same logic applies if you are buying a vehicle from a Florida seller and live in
          the Northeast — a July-August delivery will cost materially less than a December
          delivery on the exact same route. Our carriers appreciate the northbound loads in
          summer and dispatch faster than usual.
        </p>
      </Section>
    </SeoLandingPage>
  );
}
