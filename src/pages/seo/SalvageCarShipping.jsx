import SeoLandingPage, { Section } from './SeoLandingPage';
import { prose, muted, subhead, tableWrap, table, th, td } from './_enrichedStyles';

export default function SalvageCarShipping() {
  return (
    <SeoLandingPage
      meta={{
        title: 'Salvage Car Shipping — Non-Running Vehicle Transport | Y7 Logistics',
        description:
          'Salvage and non-running vehicle transport from Copart, IAAI, and home addresses. Winch and forklift loading. Licensed FMCSA broker. Free quote in 1 hour.',
        path: '/salvage-car-shipping',
      }}
      heading="Salvage & Non-Running Car Shipping"
      intro="Salvage and non-running vehicle transport is a specialty lane inside auto shipping — it requires carriers with the right loading equipment, accurate condition disclosure from the shipper, and a dispatcher who knows how to match the two. Y7 Logistics is a licensed FMCSA broker (MC #1741537, USDOT #4427359) based in Newton, MA. We coordinate salvage pickups from Copart and IAAI yards across the country, plus non-running vehicles from homes, body shops, and storage lots."
      whenNeeded={[
        'Purchased a salvage-title vehicle at Copart or IAAI',
        'Vehicle will not start, run, or drive',
        'Accident-damaged car needs transport to a body shop or buyer',
        'Rebuild project vehicle moving to your garage or shop',
        'Non-running vehicle delivered to a port for export',
        'Insurance total-loss vehicle transport to a re-sale buyer',
        'Flood, fire, or theft recovery vehicle needs relocation',
        'Parts-only / shell vehicle that needs a flatbed or forklift',
      ]}
      steps={[
        { title: 'Share exact vehicle condition', desc: 'Does it roll? Does it steer? Does it brake? Any missing wheels, frame damage, or fluid leaks? The answers determine which carriers can take the load.' },
        { title: 'Confirm pickup location access', desc: 'Copart and IAAI yards require gate passes + payment confirmation. Home pickups need driveway access for a winch operation. Body shops need forklift clearance.' },
        { title: 'Receive a condition-specific quote', desc: 'Non-running surcharge is $100-$300 on top of the base open-trailer rate. Forklift loading costs more than winch loading. Enclosed is 40-60% higher.' },
        { title: 'Carrier with correct equipment assigned', desc: 'We match your vehicle to a carrier with a working winch for rollers, or a forklift-capable carrier for non-rollers. Carrier confirms equipment before dispatch.' },
        { title: 'Loaded, transported, delivered', desc: 'BOL signed at pickup documenting pre-existing damage. Carrier loads safely, transports, and delivers to your address, shop, or port with a final condition check.' },
      ]}
      requirements={[
        'Vehicle year, make, model, VIN',
        'Honest condition report — does it roll, steer, brake?',
        'Title type (salvage, rebuilt, clean, parts-only, no title)',
        'Pickup location (auction lot + lot number, home, body shop, storage yard)',
        'Delivery address with unloading access notes',
        'Photos of damage — especially wheels, suspension, and undercarriage',
        'Copart/IAAI buyer account info + payment confirmation for auction pickups',
      ]}
      capabilities={[
        'Winch-equipped carriers for rolling non-runners',
        'Forklift loading for vehicles with damaged wheels or suspension',
        'Pickup from Copart and IAAI yards nationwide',
        'All title types — salvage, rebuilt, clean, parts-only, bonded',
        'Delivery to homes, body shops, ports, storage, and export forwarders',
        'Open and enclosed transport — enclosed recommended for high-value rebuilds',
        'Gate pass and auction release coordination',
        'Condition documentation on Bill of Lading at both ends',
      ]}
      faqs={[
        {
          q: 'How much extra for non-running vehicle transport?',
          a: 'Plan on a $100-$300 surcharge above the equivalent running-vehicle rate. The exact amount depends on whether the carrier can use a standard winch (cheaper) or needs a forklift-capable flatbed (more). Severely damaged vehicles with no rolling wheels sit at the top of that range. The base open-trailer rate ($0.40-$0.70/mile) still applies underneath the surcharge.',
        },
        {
          q: 'Can you ship a car with no wheels?',
          a: 'Yes, but it requires a forklift-capable flatbed or roll-back carrier rather than a standard multi-car trailer. This limits the carrier pool and raises the price. We need photos of the vehicle and the pickup location before booking so the right equipment is dispatched. Loading without working wheels is slower, so expect a longer pickup window.',
        },
        {
          q: 'Do you handle Copart salvage pickups?',
          a: 'Yes. Copart pickups are a regular part of our business — we coordinate the gate pass, verify the buyer account, confirm payment has cleared on Copart\'s side, and dispatch a carrier with the correct equipment. You remain the buyer of record. We do not file DMV paperwork, register the vehicle, or process title work in any state.',
        },
        {
          q: 'What if the vehicle won\'t steer?',
          a: 'A vehicle that rolls but will not steer usually needs forklift loading rather than a winch, because the carrier cannot line the wheels up on the ramps. Same for seized brakes. Disclose this at quote time — a vehicle advertised as "rolls and steers" that turns out not to steer will be refused at pickup and re-quoted, which costs you 2-5 days.',
        },
        {
          q: 'Insurance on salvage transport?',
          a: 'Every carrier we dispatch carries cargo insurance — typically $100,000–$250,000 for open salvage carriers and $250,000–$500,000 for enclosed transport. Salvage and non-running vehicles are covered for new damage in transit, but pre-existing damage must be documented on the Bill of Lading at pickup. Take photos of the vehicle before the carrier arrives and compare against the BOL notes. Insurance claims require that paper trail.',
        },
        {
          q: 'How long does salvage shipping take?',
          a: 'Transit times match standard auto transport: 2-4 days for a Northeast regional run, 5-7 days cross-region, 8-12 days cross-country. Salvage-specific factors that can add days: waiting for the right equipment to become available in your area, auction gate-pass processing (Copart usually 1-2 business days after payment), and body-shop pickup coordination.',
        },
      ]}
      related={[
        { label: 'Copart Shipping', to: '/copart-shipping' },
        { label: 'Auction Car Shipping', to: '/auction-car-shipping' },
        { label: 'IAAI Transport', to: '/iaai-transport' },
        { label: 'Auction to Port Transport', to: '/auction-to-port-transport' },
      ]}
    >
      <Section title="What Salvage & Non-Running Shipping Involves">
        <p style={prose}>
          Standard auto transport assumes the vehicle drives onto the trailer under its own power.
          Salvage and non-running shipping does not. Instead of driving up the ramp, the vehicle is
          pulled up by a hydraulic winch or lifted by a forklift and set on the deck. Both methods
          work, but they require specific equipment and a carrier who knows how to use it without
          damaging the vehicle, the trailer, or the driver.
        </p>
        <p style={muted}>
          The non-running surcharge is $100-$300 above the equivalent running-vehicle rate. That
          reflects three costs: the specialized equipment (not every carrier has a working winch or
          forklift), the extra loading time (often 30-60 minutes versus 5 for a driver), and the
          smaller carrier pool that can take the job. When we quote a non-running move, we call or
          message the assigned carrier to confirm the equipment is on the truck and operational
          before dispatch. A carrier showing up with a broken winch is the most common preventable
          problem in this lane, and pre-confirmation eliminates it.
        </p>
        <h3 style={subhead}>Winch loading vs forklift loading</h3>
        <p style={muted}>
          Winch loading is the standard method for a non-runner that still has working wheels and
          can steer. The carrier attaches a hydraulic winch cable to the frame or tow hook and
          pulls the vehicle up the ramps onto the trailer deck. Forklift loading is used when the
          wheels are missing, seized, or the suspension is destroyed — the carrier lifts the
          vehicle from underneath and sets it on the deck. Forklift-capable carriers are a smaller
          portion of the market, which is why forklift jobs price higher.
        </p>
      </Section>

      <Section title="Auction-to-Home for Salvage Buyers">
        <p style={prose}>
          A large share of our salvage volume is Copart and IAAI auction pickups delivered to the
          buyer&rsquo;s home, shop, or storage yard. The workflow is well defined and we run it
          weekly. You win the auction, pay Copart or IAAI directly, and give us the lot number plus
          buyer account number. We coordinate the gate pass, confirm the yard shows the vehicle as
          released, and dispatch a carrier with matching equipment. Most Copart and IAAI yards
          require payment to clear before a gate pass issues, which typically takes 1-2 business
          days.
        </p>
        <p style={muted}>
          Important boundaries on what a broker does in this workflow: we arrange transport, not
          ownership. Y7 does not file DMV paperwork, process salvage or rebuilt titles, apply for
          registration in any state, handle emissions inspections, or arrange for a parts-only
          certificate. That is entirely your responsibility as the buyer. Most states require the
          vehicle to arrive before you can start the title process, which is why moving the car
          efficiently from the auction lot to your address is often the first practical step after
          winning the bid.
        </p>
        <div style={tableWrap}>
          <table style={table}>
            <thead>
              <tr>
                <th style={th}>Auction Yard</th>
                <th style={th}>Common Destination</th>
                <th style={th}>Typical Transit</th>
                <th style={th}>Open Rate Band</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={td}>Copart Dallas, TX</td><td style={td}>East Coast / Northeast</td><td style={td}>5&ndash;8 days</td><td style={td}>$900&ndash;$1,400</td></tr>
              <tr><td style={td}>IAAI Orlando, FL</td><td style={td}>Midwest</td><td style={td}>5&ndash;7 days</td><td style={td}>$850&ndash;$1,200</td></tr>
              <tr><td style={td}>Copart Los Angeles, CA</td><td style={td}>Northeast</td><td style={td}>8&ndash;12 days</td><td style={td}>$1,200&ndash;$1,700</td></tr>
              <tr><td style={td}>IAAI East Taunton, MA</td><td style={td}>Southeast / Florida</td><td style={td}>4&ndash;6 days</td><td style={td}>$700&ndash;$1,050</td></tr>
              <tr><td style={td}>Copart Houston, TX</td><td style={td}>West Coast</td><td style={td}>6&ndash;9 days</td><td style={td}>$950&ndash;$1,400</td></tr>
            </tbody>
          </table>
        </div>
        <p style={muted}>
          Ranges are for running vehicles. Add $100-$300 for non-running condition and 40-60% on
          top for enclosed transport. Cross-country salvage moves over $1,500 are common when the
          vehicle is a total-loss rebuild project worth protecting.
        </p>
      </Section>

      <Section title="Non-Running Does Not Mean Non-Shippable">
        <p style={prose}>
          A vehicle that will not start can still ship easily if the wheels turn and the steering
          works. The winch pulls it up the ramps, the driver guides the wheels straight, and it
          rides to destination like any other car. The two conditions we look for at quote time
          are: (1) do the wheels roll freely and (2) does the steering wheel turn and move the
          front tires. If both are yes, winch loading on a standard multi-car carrier is the norm
          and the non-running surcharge sits at the low end of the range.
        </p>
        <p style={muted}>
          Brake function is preferred but not strictly required. Working brakes let the carrier
          control the vehicle on the trailer deck during load and unload. No brakes means the
          driver uses wheel chocks and straps more aggressively, which adds loading time but does
          not block the job. Vehicles with frozen or destroyed front suspension, missing wheels,
          or a cracked frame often cannot winch-load at all and require a forklift-capable carrier.
        </p>
        <h3 style={subhead}>Quick decision table</h3>
        <div style={tableWrap}>
          <table style={table}>
            <thead>
              <tr>
                <th style={th}>Condition</th>
                <th style={th}>Loading Method</th>
                <th style={th}>Surcharge</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={td}>Rolls + steers + brakes</td><td style={td}>Winch</td><td style={td}>$100&ndash;$150</td></tr>
              <tr><td style={td}>Rolls + steers, no brakes</td><td style={td}>Winch + chocks</td><td style={td}>$150&ndash;$200</td></tr>
              <tr><td style={td}>Rolls but will not steer</td><td style={td}>Forklift</td><td style={td}>$200&ndash;$300</td></tr>
              <tr><td style={td}>Missing wheels / frame damage</td><td style={td}>Forklift or roll-back</td><td style={td}>$250&ndash;$500+</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Disclose All Damage at Quote Time">
        <p style={prose}>
          The single biggest source of delay and cost overrun in salvage shipping is incomplete or
          optimistic condition disclosure. A shipper tells us the car rolls and steers, the carrier
          arrives with a standard winch-equipped trailer, and discovers the front wheels are locked
          or the steering column is gone. At that point the carrier has two choices: refuse the
          load, or re-quote at a higher rate for the correct equipment. Either path costs you 2-5
          days of dispatch delay while we re-assign.
        </p>
        <p style={muted}>
          The fix is simple: tell us everything at quote time and send photos. Front three-quarter
          shot, rear three-quarter shot, undercarriage if accessible, close-ups of any damaged
          wheels or suspension, and a note on any fluid leaks. We use the photos to match the
          vehicle to a carrier who has handled similar condition before. A 10-minute photo session
          at pickup saves a week of delay down the road. If you are bidding on an auction vehicle
          you have not seen in person, pull the Copart or IAAI condition report and the photos
          from the auction listing — those are enough to quote accurately.
        </p>
        <p style={muted}>
          Hidden damage disclosed only at pickup also complicates the Bill of Lading. The BOL is
          the legal record of the vehicle&rsquo;s condition when the carrier takes custody. If
          damage exists that was not disclosed and is not noted on the BOL, it becomes the carrier
          and the shipper&rsquo;s problem, not the transport insurance&rsquo;s. Full disclosure
          protects your insurance claim rights.
        </p>
      </Section>

      <Section title="Popular Salvage Corridors">
        <p style={prose}>
          Salvage and non-running traffic flows along predictable corridors because auction yards
          cluster where insurance total-loss volume is highest (Texas, Florida, California) and
          buyers are distributed nationwide. These are the lanes where we run the most volume and
          where carrier supply is densest, which translates to faster dispatch and better pricing.
        </p>
        <h3 style={subhead}>Copart Dallas &rarr; East Coast</h3>
        <p style={muted}>
          Dallas-area Copart yards are among the largest salvage operations in the country. East-
          bound loads toward Atlanta, the Carolinas, DC, Philadelphia, and the Northeast run
          weekly. Transit is typically 5-8 days for a non-running vehicle. Rate band $900-$1,400
          depending on distance and condition.
        </p>
        <h3 style={subhead}>IAAI Florida &rarr; Midwest</h3>
        <p style={muted}>
          IAAI Orlando, Tampa, and Jacksonville yards feed a steady stream of rebuild-project and
          flood-recovery vehicles heading to Midwest buyers in Ohio, Michigan, Indiana, and
          Illinois. Transit 5-7 days, rate band $850-$1,200. Summer hurricane-recovery volume can
          push lead times out by 2-3 days in September and October.
        </p>
        <h3 style={subhead}>Copart Los Angeles &rarr; Northeast</h3>
        <p style={muted}>
          LA-area Copart yards send a significant volume of salvage vehicles cross-country to
          Northeast buyers, particularly for luxury rebuilds (German makes are disproportionate
          here). Transit 8-12 days, rate band $1,200-$1,700. Enclosed is common on this corridor
          for vehicles over $30K rebuild value — budget 40-60% more for enclosed.
        </p>
        <h3 style={subhead}>Regional Northeast runs</h3>
        <p style={muted}>
          IAAI East Taunton (MA), Copart North Boston, and Copart New Jersey feed regional buyers
          in the Northeast corridor. Transit 1-4 days, rate band $400-$900. These short-haul
          salvage moves are the most price-sensitive because the base per-mile rate does not
          amortize the non-running surcharge as well on short distances.
        </p>
      </Section>
    </SeoLandingPage>
  );
}
