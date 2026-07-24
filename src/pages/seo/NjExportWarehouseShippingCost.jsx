import { Link } from 'react-router-dom';
import SeoLandingPage, { Section } from './SeoLandingPage';
import { prose, muted, tableWrap, table, th, td } from './_enrichedStyles';

// [NJPORTS-T1] Evidence-backed explanation of how carrier pricing to the NJ
// export warehouses is formed. EVERY figure on this page comes from the
// NJPORTS-2 fact table (586 dispatches, 27 Aug 2025 - 23 Jul 2026, 213
// carriers). Do not add a number that is not measured there. All dollar
// figures are CARRIER rates, framed to match the homepage calculator
// ("Typical carrier rate for this route"); the Y7 fee is stated separately per
// [NJPORTS-T1] (dealers/exporters $50, $60 when Y7 pays; individuals $75 or 10%
// of carrier price, whichever is greater). Compliance: Y7 is a Licensed &
// Bonded FMCSA broker (surety bond, NOT insurance); it does not own or operate
// a warehouse. Third-party facilities are referred to only as "export
// warehouses in the Newark / Irvington area" — never by company name.

export default function NjExportWarehouseShippingCost() {
  return (
    <SeoLandingPage
      meta={{
        title: 'NJ Export-Warehouse Shipping Cost — How Carrier Pricing Is Formed | Y7 Logistics',
        description:
          'How auto-transport carrier pricing to the New Jersey export warehouses is actually formed, measured on 586 real dispatches. Distance, pickup type, auction brand, vehicle size. Licensed FMCSA broker MC #1741537.',
        path: '/nj-export-warehouse-shipping-cost',
      }}
      primaryCTA={{ intlKey: 'exporters', to: '/exporters', tone: 'amber' }}
      secondaryCTA={{ intlKey: 'dealers', to: '/dealers', tone: 'teal' }}
      heading="NJ Export-Warehouse Shipping Cost: How the Carrier Rate Is Formed"
      intro="Getting a vehicle from a US auction to the export warehouses in the Newark / Irvington area is the domestic leg of most East Coast car exports — and the carrier rate for that leg is not a mystery. Y7 Logistics (MC #1741537 / USDOT #4427359), a licensed and bonded FMCSA broker, analysed 586 real dispatches into those warehouses between 27 August 2025 and 23 July 2026, moved by 213 different carriers. The pattern is consistent enough to explain plainly: one factor sets most of the price, and everything else is a single-digit adjustment on top of it. The figures below are carrier rates — what the trucker is paid — stated the same way the quote calculator on our homepage states them, with the separate Y7 fee described at the end."
      tldr={{
        kicker: 'NJ export-warehouse pricing, in brief',
        ariaLabel: 'How NJ export-warehouse carrier pricing is formed, in brief',
        text: 'Across 586 dispatches (27 Aug 2025 - 23 Jul 2026, 213 carriers) into the export warehouses in the Newark / Irvington area, distance alone explains 88% of the carrier rate. A typical 500-800-mile haul runs about $500-$560; cost per mile falls as the haul lengthens (about $2.56/mi at 71 miles down to $0.52/mi at 1,294 miles). A non-auction pickup adds roughly $70 flat per vehicle; the auction brand (Copart, IAAI, Manheim) changes the rate by no more than 3%; an SUV is about 5% over a sedan, a minivan 8%, a pickup 17%. Which NJ warehouse receives the car makes no measurable difference. These are carrier rates; Y7 charges a separate flat fee (dealers and exporters $50, individuals $75).',
      }}
      faqs={[
        {
          q: 'What determines the carrier rate to a New Jersey export warehouse?',
          a: 'Distance, overwhelmingly. Across 586 real dispatches (27 August 2025 to 23 July 2026, 213 carriers) into the export warehouses in the Newark / Irvington area, distance alone explains 88% of the variation in carrier rates. Everything else — the auction brand, the vehicle size, which warehouse receives the car — moves the rate by single-digit percentages at most.',
        },
        {
          q: 'Why does the price per mile drop on a longer haul?',
          a: 'Because a large part of each dispatch is a fixed per-vehicle cost that does not scale with distance: dispatching the load, the auction paperwork and gate pass, loading, securing, and unloading. On a short run those fixed costs are spread over few miles, so the per-mile figure is high — around $2.56 per mile at 71 miles. On a long run they are spread over many miles, falling to about $0.52 per mile at 1,294 miles. The practical takeaway: comparing quotes on dollars-per-mile across different haul lengths is meaningless — compare against the typical rate for your own distance.',
        },
        {
          q: 'Does an auction pickup cost less than a dealer or private address?',
          a: 'Yes. A non-auction pickup — a dealer lot or a private address — adds roughly $70 per vehicle, and that surcharge is roughly flat regardless of distance. An auction yard lets a carrier load several vehicles at one organised stop with loading equipment and predictable hours; a private address is a separate detour for one car, often with no dock and uncertain timing. Because the $70 is flat in dollars, it works out to about +48% on a haul under 100 miles but only about +14% on a haul over 500 miles — the opposite of what most people expect.',
        },
        {
          q: 'Does it matter whether I buy from Copart, IAAI, or Manheim?',
          a: 'Not for the transport rate. Across the 586 dispatches, Copart, IAAI, and Manheim pickups all sit within about 3% of the same baseline. What matters is the distance and whether the pickup is an auction at all — not which auction brand it is.',
        },
        {
          q: 'How much does vehicle size change the rate?',
          a: 'Single digits, measured against a sedan: an SUV runs about 5% higher, a minivan about 8%, and a pickup about 17%. Enclosed transport is a separate premium and was not part of this open-carrier dataset.',
        },
        {
          q: 'What is not included in the carrier rate, and what does Y7 charge?',
          a: 'The carrier rate covers the truck move only. It does not include auction and buyer fees, storage or demurrage, port charges, container loading, export documentation, ocean freight, or the carrier’s cargo insurance. Y7’s broker fee is separate and flat: dealers and exporters pay $50 per vehicle ($60 when Y7 also handles the carrier payment), and individual customers pay $75 per vehicle, or 10% of the carrier price when that is greater. Y7 never marks up the carrier rate.',
        },
      ]}
      related={[
        { label: 'Auction to Port', to: '/auction-to-port-transport' },
        { label: 'New Jersey Auto Transport', to: '/new-jersey-auto-transport' },
        { label: 'Car Shipping Cost', to: '/car-shipping-cost' },
        { label: 'Exporter Logistics', to: '/exporters' },
        { label: 'Port Newark', to: '/ports/newark' },
      ]}
    >
      <Section title="What Actually Sets the Price">
        <p style={prose}>
          The single most useful thing to know about shipping a car to the export warehouses in the
          Newark / Irvington area is that the carrier rate is not improvised. Across 586 real
          dispatches into those warehouses &mdash; 27 August 2025 to 23 July 2026, carried by 213
          different truckers &mdash; <strong>distance alone explains 88% of the variation</strong> in
          what the carrier is paid. That is a high number. It means the honest answer to &ldquo;why
          does it cost that much?&rdquo; is almost always &ldquo;because of how far the car has to
          travel,&rdquo; and every other factor &mdash; the auction, the vehicle, the exact
          warehouse &mdash; is a small adjustment layered on top.
        </p>
        <p style={muted}>
          Stating the sample up front is deliberate: these are not list prices or a sales estimate,
          they are what 213 independent carriers actually accepted to run these lanes over eleven
          months. All the figures on this page are carrier rates &mdash; the amount paid to the
          trucker &mdash; framed exactly as the calculator on our{' '}
          <Link to="/">homepage</Link> frames them: a typical carrier rate for a route, with the Y7
          fee stated separately.
        </p>
      </Section>

      <Section title="Why the Cost Per Mile Falls as the Haul Gets Longer">
        <p style={prose}>
          Longer hauls cost more in total but less per mile. That is not a discount &mdash; it is the
          arithmetic of fixed costs. Every dispatch carries a set of per-vehicle costs that do not
          change with distance: arranging the load, the auction paperwork and gate pass, loading the
          car, securing it, and unloading it at the warehouse. On a short run those fixed costs are
          spread over a handful of miles; on a long run they are spread over hundreds.
        </p>
        <div style={tableWrap}>
          <table style={table}>
            <thead>
              <tr>
                <th style={th}>Haul distance</th>
                <th style={th}>Typical carrier rate per mile</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={td}>71 miles</td><td style={td}>$2.56 / mile</td></tr>
              <tr><td style={td}>190 miles</td><td style={td}>$1.42 / mile</td></tr>
              <tr><td style={td}>356 miles</td><td style={td}>$1.05 / mile</td></tr>
              <tr><td style={td}>676 miles</td><td style={td}>$0.79 / mile</td></tr>
              <tr><td style={td}>930 miles</td><td style={td}>$0.61 / mile</td></tr>
              <tr><td style={td}>1,294 miles</td><td style={td}>$0.52 / mile</td></tr>
            </tbody>
          </table>
        </div>
        <p style={muted}>
          The practical conclusion matters more than the curve: comparing two quotes on
          dollars-per-mile when they are different haul lengths tells you nothing. A $2.56-per-mile
          71-mile run and a $0.52-per-mile 1,294-mile run can both be completely fair. The only meaningful
          comparison is against the typical carrier rate for <em>your</em> distance &mdash; which is
          exactly what the homepage calculator gives you for a specific route.
        </p>
      </Section>

      <Section title="What Each Distance Band Costs">
        <p style={prose}>
          The decay curve above explains <em>why</em> the unit rate falls; this table shows{' '}
          <em>what you actually pay</em>. These are typical carrier rates into the export warehouses in
          the Newark / Irvington area, by haul distance, from the same 586 dispatches. The median is the
          midpoint; the range is the 25th to 75th percentile &mdash; half of all dispatches land inside it.
        </p>
        <div style={tableWrap}>
          <table style={table}>
            <thead>
              <tr>
                <th style={th}>Haul distance</th>
                <th style={th}>Median carrier rate</th>
                <th style={th}>Typical range (25th&ndash;75th pct)</th>
                <th style={th}>Per mile</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={td}>under 100 mi</td><td style={td}>$180</td><td style={td}>$170 &ndash; $200</td><td style={td}>$2.56</td></tr>
              <tr><td style={td}>101 &ndash; 250 mi</td><td style={td}>$270</td><td style={td}>$250 &ndash; $300</td><td style={td}>$1.42</td></tr>
              <tr><td style={td}>251 &ndash; 500 mi</td><td style={td}>$360</td><td style={td}>$325 &ndash; $400</td><td style={td}>$1.05</td></tr>
              <tr><td style={td}>501 &ndash; 800 mi</td><td style={td}>$525</td><td style={td}>$500 &ndash; $560</td><td style={td}>$0.79</td></tr>
              <tr><td style={td}>801 &ndash; 1,200 mi</td><td style={td}>$550</td><td style={td}>$510 &ndash; $600</td><td style={td}>$0.61</td></tr>
              <tr><td style={td}>over 1,200 mi</td><td style={td}>$600</td><td style={td}>$600 &ndash; $665</td><td style={td}>$0.52</td></tr>
            </tbody>
          </table>
        </div>
        <p style={muted}>
          These are band-level carrier rates for the NJ-inbound corridor, not a quote for a named lane.
          For the live rate on your exact origin and destination, use the{' '}
          <Link to="/">homepage calculator</Link>. The Y7 fee is separate (see below).
        </p>
      </Section>

      <Section title="Auction Pickup Versus a Dealer or Private Address">
        <p style={prose}>
          Where the car is picked up changes the rate, and the reason is operational rather than
          arbitrary. A non-auction pickup &mdash; a dealer lot or a private residence &mdash; adds
          roughly <strong>$70 per vehicle</strong>, and that surcharge is roughly flat no matter how
          far the car is going.
        </p>
        <p style={muted}>
          The economics are straightforward. An auction yard is built for carriers: several vehicles
          can be collected at one organised stop, there is loading equipment, and the hours are
          predictable. A dealer or private address is a separate detour for a single car, frequently
          with no dock, no forklift, and uncertain availability &mdash; the driver may wait, or make
          a second trip. That extra time and risk is the roughly $70.
        </p>
        <p style={muted}>
          Here is the part that surprises people: because the surcharge is flat in dollars, it is a
          large percentage on a short haul and a small one on a long haul. It works out to about
          <strong> +48% on a haul under 100 miles</strong> and only about <strong>+14% on a haul
          over 500 miles</strong>. Most people assume a residential pickup is a bigger penalty on a
          long, expensive move; in fact it is proportionally cheapest exactly there.
        </p>
      </Section>

      <Section title="Which Auction You Buy From Does Not Matter">
        <p style={prose}>
          It is natural to assume that a Copart car, an IAAI car, and a Manheim car cost different
          amounts to move. They do not. Across the 586 dispatches, all three brands sit within about
          <strong> 3% of the same baseline</strong> once distance is accounted for. The transport
          market prices the lane, not the logo on the gate.
        </p>
        <p style={muted}>
          What genuinely moves the rate is distance and whether the pickup is an auction at all
          (see the flat non-auction surcharge above). The auction brand is not a lever worth
          optimising for when you are choosing where to buy &mdash; the transport cost will be
          essentially the same.
        </p>
      </Section>

      <Section title="Vehicle Size">
        <p style={prose}>
          Larger vehicles take more deck space and weight, so they cost a little more, but the effect
          is smaller than most people expect &mdash; single-digit percentages against a standard
          sedan:
        </p>
        <div style={tableWrap}>
          <table style={table}>
            <thead>
              <tr>
                <th style={th}>Vehicle type</th>
                <th style={th}>Carrier rate vs. a sedan</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={td}>Sedan</td><td style={td}>baseline</td></tr>
              <tr><td style={td}>SUV / crossover</td><td style={td}>about +5%</td></tr>
              <tr><td style={td}>Minivan / van</td><td style={td}>about +8%</td></tr>
              <tr><td style={td}>Pickup truck</td><td style={td}>about +17%</td></tr>
            </tbody>
          </table>
        </div>
        <p style={muted}>
          These figures are for open transport, which is what this dataset covers. Enclosed transport
          is a separate, larger premium and was not part of these 586 open-carrier dispatches.
        </p>
      </Section>

      <Section title="Where in New Jersey You Deliver Does Not Matter">
        <p style={prose}>
          The export warehouses in the Newark / Irvington area sit close enough together that the
          transport market treats them as a single delivery point. Across the dataset there is
          <strong> no measurable rate difference</strong> based on which warehouse receives the
          vehicle. When you are estimating cost, you can treat &ldquo;the NJ export cluster&rdquo; as
          one destination rather than trying to price each facility separately.
        </p>
      </Section>

      <Section title="What Moves the Market">
        <p style={prose}>
          Two market-level effects are worth knowing, because both cut against common assumptions.
        </p>
        <p style={muted}>
          <strong>Rates drifted up into 2026.</strong> At equal distance, 2026 carrier rates run
          about <strong>7% above</strong> the August&ndash;December 2025 level. That is a genuine
          market shift, not seasonality &mdash; a quote from late 2025 will read a little low against
          today.
        </p>
        <p style={muted}>
          <strong>There is no winter premium in this data.</strong> The widespread belief that
          winter shipping is more expensive did not hold: no winter premium was found, and
          <strong> December 2025 was among the cheapest months</strong> in the sample. Timing your
          export around an imagined seasonal spike is not supported by what the carriers actually
          charged.
        </p>
      </Section>

      <Section title="Where the Cars Come From">
        <p style={prose}>
          The New Jersey export warehouses draw vehicles from across the country. The 586 dispatches
          originated in <strong>25 states</strong>, from <strong>79 distinct pickup locations</strong>
          {' '}that each saw at least three dispatches &mdash; a genuinely national feeder network, not
          a handful of local lanes.
        </p>
        <p style={muted}>
          By volume, the busiest origin states are (in order, highest first): New York, Pennsylvania,
          Illinois, Massachusetts, New Jersey, Ohio, Indiana, Virginia, Maryland, Minnesota,
          Michigan, and Connecticut. That ordering reflects how many cars move on each lane, not what
          they cost &mdash; per-lane and per-state dollar figures are not published, because the
          carrier rate for any specific route is best read live from the{' '}
          <Link to="/">homepage calculator</Link> for that exact origin and destination.
        </p>
      </Section>

      <Section title="What the Carrier Rate Does Not Include">
        <p style={prose}>
          Every figure on this page is the <strong>carrier rate</strong> &mdash; the amount paid to
          the trucker for the domestic move. It is only one line of the total landed cost of an
          export. The carrier rate does <em>not</em> include:
        </p>
        <ul style={prose}>
          <li>Auction and buyer fees</li>
          <li>Storage and demurrage</li>
          <li>The broker / dispatch service fee (Y7’s fee, below)</li>
          <li>Port charges</li>
          <li>Container loading</li>
          <li>Export documentation</li>
          <li>Ocean freight</li>
          <li>The carrier’s cargo insurance (carried by the trucker, not by Y7)</li>
        </ul>
        <p style={muted}>
          Y7’s fee is separate from the carrier rate and never a markup on it. <strong>Dealers
          and exporters pay a flat $50 per vehicle</strong> ($60 when Y7 also processes the carrier
          payment); <strong>individual customers pay $75 per vehicle, or 10% of the carrier price
          when that is greater</strong>. The carrier is paid separately, at cost &mdash; Y7 is a
          licensed and bonded FMCSA broker (MC #1741537), and does not mark up, resell, or take a
          spread on the carrier rate. To see the current carrier rate for a specific origin and
          destination, use the calculator on our <Link to="/">homepage</Link> or{' '}
          <Link to="/quote">request an exact quote</Link>.
        </p>
      </Section>
    </SeoLandingPage>
  );
}
