import { Link } from 'react-router-dom';
import SeoLandingPage, { Section } from './SeoLandingPage';
import { colors, fonts } from '../../theme';
import { tableWrap, table, th, td } from './_enrichedStyles';

// [NJPORTS-T4] Door-to-port optimisation. Ownership after this sprint:
//   /auction-to-port-transport  — the auction workflow + gate passes
//   /door-to-port-auto-transport — non-auction origins + the six-port comparison (THIS page)
//   /nj-export-warehouse-shipping-cost — pricing methodology (linked from here)
// Every dollar/day figure added here traces to §2 of SPRINT_NJPORTS_3 / the
// NJPORTS-2 fact table. §2a band rates are CARRIER rates for the NJ-inbound
// corridor; §2b transit times run FROM DISPATCH (a carrier already assigned) and
// are NJ-inbound only — both qualifiers are mandatory on every use. The
// pre-existing end-to-end timeline (3-7 days etc.) is the customer's full
// window and is deliberately left unchanged (T4a).

const p = {
  fontFamily: fonts.sans,
  fontSize: '14px',
  color: colors.textMuted,
  lineHeight: 1.7,
  marginBottom: '16px',
};

const strong = { color: colors.text };

export default function DoorToPort() {
  return (
    <SeoLandingPage
      meta={{
        title: 'Door-to-Port Auto Transport Cost & Transit Time to US Ports | Y7 Logistics',
        description:
          'Door-to-port auto transport cost and dispatch-to-delivery transit times to the six major US export ports — Newark, Houston, Savannah, LA, Baltimore, Jacksonville. Licensed FMCSA broker MC #1741537.',
        path: '/door-to-port-auto-transport',
      }}
      primaryCTA={{ intlKey: 'exporters', to: '/exporters', tone: 'amber' }}
      secondaryCTA={{ intlKey: 'dealers', to: '/dealers', tone: 'teal' }}
      heading="Door-to-Port Auto Transport — Vehicle Delivery to US Ports"
      intro="Y7 Logistics delivers vehicles from any US location to major export ports. Whether you're an exporter shipping overseas or need port-side delivery for any reason, we coordinate the entire domestic leg — from your door to the port warehouse. This page covers what that leg costs, how long it takes once a carrier is dispatched, and the one thing that separates a door pickup from an auction pickup."
      tldr={{
        kicker: 'Door-to-port, in brief',
        ariaLabel: 'Door-to-port auto transport, in brief',
        text: 'Y7 Logistics (MC #1741537, USDOT #4427359) runs the domestic leg from any US origin to consolidation warehouses at the six major export ports — Newark, Houston, Savannah, Los Angeles, Baltimore, and Jacksonville. On the New Jersey corridor, carrier rates run from about $180 for a sub-100-mile haul to about $600 beyond 1,200 miles, and once a carrier is dispatched the median NJ-inbound delivery is 2 days. A pickup from a private or dealer address costs roughly $70 more per vehicle than an auction yard. The carrier is paid at cost; the Y7 fee is separate.',
      }}
      whenNeeded={[
        'Exporting a vehicle overseas',
        'Shipping auction purchase to port for export',
        'Dealer sending inventory to port',
        'Relocating vehicle for international shipping',
        'Consolidating multiple vehicles at port',
      ]}
      steps={[
        { title: 'Provide vehicle and port details', desc: 'Tell us what you are shipping and which port it needs to reach.' },
        { title: 'We quote the door-to-port route', desc: 'You receive a competitive quote for the full domestic transport leg.' },
        { title: 'Carrier assigned for your route', desc: 'A verified carrier is matched to your origin-to-port route.' },
        { title: 'Vehicle picked up from origin', desc: 'Carrier picks up from your home, dealership, auction yard, or other location.' },
        { title: 'Delivered to port warehouse or designated facility', desc: 'Vehicle arrives at the specific port warehouse or facility you specify.' },
      ]}
      requirements={[
        'Vehicle details',
        'Origin address',
        'Destination port',
        'Target delivery date',
        'Warehouse/facility name at port (if applicable)',
        'Any export documentation needs',
      ]}
      capabilities={[
        'All 6 major US export ports',
        'Auction-to-port service',
        'Multi-vehicle consolidation',
        'Warehouse delivery coordination',
        'Flexible scheduling for vessel dates',
        'Open and enclosed transport',
      ]}
      faqs={[
        {
          q: 'Which ports do you deliver to?',
          a: 'The six major US vehicle export ports: Port Newark NJ (the largest East Coast vehicle export gateway), Port Houston TX (the number-one US port by export volume), Port Savannah GA (fast-growing, lower handling fees), Port Los Angeles CA (the Pacific gateway to Asia and Australia), Port Baltimore MD (a premier RoRo terminal at Dundalk), and Port Jacksonville FL (the Caribbean and South American gateway via JAXPORT). We deliver to the specific consolidation warehouse you designate at any of them, and to smaller ports on request.',
        },
        {
          q: 'How much does door-to-port transport cost?',
          a: 'The carrier rate is set almost entirely by distance. For the New Jersey corridor, measured on 586 real dispatches, typical carrier rates run about $180 for a haul under 100 miles ($2.56/mile), $270 at 101–250 miles, $360 at 251–500 miles, $525 at 501–800 miles, $550 at 801–1,200 miles, and about $600 beyond 1,200 miles — the per-mile rate falls from $2.56 to $0.52 as the haul lengthens. These are band-level carrier rates for the NJ-inbound corridor, not a named-lane quote; the full methodology is on our NJ export-warehouse shipping cost page, and the Y7 fee is separate (dealers and exporters $50 per vehicle, individuals $75).',
        },
        {
          q: 'How long does door-to-port delivery take?',
          a: 'Two different clocks. Your end-to-end window — booking, sourcing a carrier, pickup, and transit — is typically 3–7 days depending on distance. Separately, once a carrier is actually dispatched, the driving leg is fast and consistent: on 156 New Jersey-inbound dispatches with confirmed delivery dates, the median was 2 days from dispatch, 71% arrived within 3 days of dispatch, and 96% within 7 days of dispatch. The variable part is sourcing a carrier at the right rate, not the driving. These dispatch-to-delivery figures are New Jersey-inbound only and should not be read as transit for Houston, Savannah, LA, Baltimore, or Jacksonville.',
        },
        {
          q: 'Can you pick up from an auction and deliver to port?',
          a: 'Yes — auction-to-port is one of our most common services for exporters. We pick up from Copart, IAAI, and Manheim yards nationwide, coordinate the gate pass at the yard, and deliver to your designated port warehouse with the port gate pass on file. The full auction workflow (gate passes, storage windows, buyer numbers) is detailed on our auction-to-port transport page; this page covers the non-auction door pickups and the port comparison.',
        },
        {
          q: 'Is it cheaper to ship from an auction than from my home or dealership?',
          a: 'Yes, and it is measurable. A pickup from a private or dealer address costs roughly $70 more per vehicle than the same haul from an auction yard, and that surcharge is roughly flat in dollars regardless of distance — so it is about +48% on a haul under 100 miles but only about +14% on a haul over 500 miles. This $70 is part of the carrier rate, not the Y7 fee — Y7’s flat fee (dealers and exporters $50, individuals $75) is unchanged by where the car is picked up. An auction yard lets a carrier collect several vehicles at one organised stop with loading equipment and predictable hours; a residential or dealer address is a dedicated detour for one car, often with no dock and uncertain timing. That extra time and risk is the roughly $70.',
        },
        {
          q: 'Do you handle export paperwork?',
          a: 'No — we handle the domestic transport leg only, and that boundary is deliberate. Y7 is a licensed FMCSA auto-transport broker; export documentation (the EEI/AES filing, ocean freight booking, title surrender for export, and destination-country requirements) is regulated separately and is your freight forwarder’s role. We deliver to the port warehouse and provide delivery-confirmation documentation; your forwarder takes over from there. If you do not have a forwarder, we can recommend partners we work with at each port.',
        },
        {
          q: 'How do you coordinate with port warehouses?',
          a: 'We deliver to the specific warehouse or consolidation facility you designate and book a delivery window that aligns with your vessel date. Most port warehouses — Newark especially — are appointment-based and require 24–48 hours’ notice; you cannot simply arrive with a car hauler and drop off. We confirm the receiving warehouse can accept the vehicle before dispatch, so the driver is not turned away at the gate with storage fees running.',
        },
        {
          q: 'Can you deliver multiple vehicles to the same port?',
          a: 'Yes. We coordinate multi-vehicle consolidation for port delivery — whether it is 2 vehicles or 20, we route and schedule them to arrive at the same warehouse within your target window, which simplifies your forwarder’s container loading. Carrier rates are set per vehicle by distance, as shown above.',
        },
      ]}
      ctaLabel="Get a Port Delivery Quote"
      ctaTo="/quote"
      related={[
        { label: 'Port Newark', to: '/ports/newark' },
        { label: 'Port Houston', to: '/ports/houston' },
        { label: 'Port Savannah', to: '/ports/savannah' },
        { label: 'Port Los Angeles', to: '/ports/los-angeles' },
        { label: 'Port Baltimore', to: '/ports/baltimore' },
        { label: 'Port Jacksonville', to: '/ports/jacksonville' },
        { label: 'Auction to Port', to: '/auction-to-port-transport' },
        { label: 'NJ Export-Warehouse Pricing', to: '/nj-export-warehouse-shipping-cost' },
        { label: 'Newark vs Houston vs Savannah', to: '/blog/port-specific-export-newark-houston-savannah' },
        { label: 'For Exporters', to: '/exporters' },
        { label: 'Get a Quote', to: '/quote' },
      ]}
    >
      <Section title="Major US Export Ports: What to Know">
        <p style={p}>
          Each port operates differently, and those differences affect how we plan your domestic transport. Here is a brief overview of the six ports we deliver to most frequently. For full details on each port — including warehouse contacts, terminal maps, and delivery scheduling — see the individual port pages linked below. The per-port timing notes below reflect our operating experience rather than a measured dispatch sample — only the New Jersey figures elsewhere on this page are drawn from the 156-dispatch dataset.
        </p>
        <p style={p}>
          <strong style={{ color: colors.text }}><Link to="/ports/newark" style={{ color: colors.accent, textDecoration: 'none' }}>Port Newark, NJ</Link></strong> is the largest vehicle export port on the East Coast. Nearly every major auto exporter in the Northeast routes through Newark. Delivery to port warehouses is appointment-based — you cannot just show up with a car hauler and expect to drop off. Yard parking near the port is limited and expensive, so timing matters. Most warehouses in the Newark port area (along Doremus Avenue and surrounding blocks) require 24-48 hour delivery scheduling. We coordinate directly with your warehouse to secure a delivery window that aligns with your vessel date.
        </p>
        <p style={p}>
          <strong style={{ color: colors.text }}><Link to="/ports/houston" style={{ color: colors.accent, textDecoration: 'none' }}>Port Houston, TX</Link></strong> is the number one US port for vehicle exports by volume, primarily through the Barbours Cut terminal. Houston handles a massive flow of auction vehicles headed to West Africa, the Middle East, and Central America. Scheduling is more flexible than Newark — most Houston-area warehouses accept deliveries on a wider window. The advantage of Houston for Texas-based auction purchases (Copart and IAAI both have major yards across Texas) is that domestic transit is short, often same-day or next-day delivery from auction to port.
        </p>
        <p style={p}>
          <strong style={{ color: colors.text }}><Link to="/ports/savannah" style={{ color: colors.accent, textDecoration: 'none' }}>Port Savannah, GA</Link></strong> is a fast-growing export hub with competitive rates, operating through the Garden City Terminal. Savannah is increasingly popular with exporters because warehouse and handling fees tend to be lower than Newark or Houston. It is well-positioned for auction purchases from the Southeast — Copart and IAAI yards in Georgia, Florida, and the Carolinas are all within a day's drive.
        </p>
        <p style={p}>
          <strong style={{ color: colors.text }}><Link to="/ports/los-angeles" style={{ color: colors.accent, textDecoration: 'none' }}>Port Los Angeles, CA</Link></strong> is the Pacific gateway for exports to Asia, Australia, and the Pacific Islands. LA port operations involve stricter emissions and compliance checks than East Coast ports, and security screening is more rigorous. Warehouse access in the LA/Long Beach port complex can be congested, especially during peak shipping periods. We factor in extra buffer time for LA deliveries to account for port-area traffic and warehouse scheduling constraints.
        </p>
        <p style={p}>
          <strong style={{ color: colors.text }}><Link to="/ports/baltimore" style={{ color: colors.accent, textDecoration: 'none' }}>Port Baltimore, MD</Link></strong> operates one of the premier RoRo (Roll-on/Roll-off) terminals in the US at the Dundalk Marine Terminal. Baltimore is the top choice for exporters shipping running vehicles via RoRo service rather than container. The port has deep relationships with major ocean carriers offering RoRo routes to Europe, the Middle East, and Africa. Delivery coordination at Dundalk requires advance scheduling through the terminal operator.
        </p>
        <p style={p}>
          <strong style={{ color: colors.text }}><Link to="/ports/jacksonville" style={{ color: colors.accent, textDecoration: 'none' }}>Port Jacksonville, FL</Link></strong> serves as the primary gateway for Caribbean and South American vehicle exports, operating through JAXPORT's Blount Island terminal. Jacksonville is the closest major port for the massive Florida auction market — dozens of Copart and IAAI yards across the state feed vehicles into Jacksonville-area warehouses. Transit from South Florida auctions to Jacksonville port warehouses is typically 1-2 days.
        </p>
      </Section>

      <Section title="What Y7 Handles vs. What You Handle">
        <p style={p}>
          This is the most common source of confusion for first-time exporters, so here is a clear breakdown of responsibilities.
        </p>
        <p style={p}>
          <strong style={{ color: colors.text }}>Y7 Logistics handles:</strong> the entire domestic transport leg. That means pickup from your origin (home, dealership, auction yard, or any US address), carrier dispatch, transit management, and delivery to the specific port warehouse or facility you designate. We provide delivery confirmation documentation showing when and where the vehicle was dropped off. If you are shipping multiple vehicles, we coordinate consolidation so all units arrive at the warehouse within your target window.
        </p>
        <p style={p}>
          <strong style={{ color: colors.text }}>You or your freight forwarder handle:</strong> everything on the export side. That includes customs documentation, export declarations (EEI filing through AES), ocean freight booking (container or RoRo), port warehouse handling fees, title surrender or processing for export, and any destination-country import requirements. If you do not have a freight forwarder, we can recommend partners we have worked with at each port, but we do not act as a freight forwarder ourselves.
        </p>
        <p style={p}>
          This division of responsibility exists because domestic auto transport and international freight forwarding are two different regulatory environments with different licensing requirements. We are experts at the domestic leg. Your freight forwarder is the expert at the international leg. Clean handoff at the port warehouse.
        </p>
      </Section>

      <Section title="Warehouse vs. Direct Terminal Delivery">
        <p style={p}>
          Most exporters use a warehouse or consolidation facility near the port rather than delivering directly to the terminal. Here is why.
        </p>
        <p style={p}>
          Port terminals generally do not accept individual vehicle deliveries from car haulers. Vehicles going into containers need to be loaded at a warehouse — the container is packed there, then trucked to the terminal as a sealed unit. Even for RoRo shipments, most exporters stage vehicles at a nearby warehouse first for inspection, documentation, and scheduling alignment with the vessel.
        </p>
        <p style={p}>
          The warehouse serves as a buffer zone. Your vehicle might arrive 3-5 days before the vessel sails, and it needs somewhere to sit. The warehouse handles storage, pre-export inspection, container loading (if applicable), and final documentation. We deliver to the warehouse door, your freight forwarder manages everything from that point forward.
        </p>
        <p style={p}>
          In rare cases — typically large dealer or fleet exports with direct terminal agreements — we can arrange terminal delivery. But for 95% of export shipments, warehouse delivery is the standard and most practical option.
        </p>
      </Section>

      <Section title="What Door-to-Port Costs (New Jersey Corridor)">
        <p style={p}>
          The carrier rate for the domestic leg is set almost entirely by distance. The table below shows typical carrier rates into the export warehouses on the New Jersey corridor, measured on 586 real dispatches. These are band-level carrier rates for the NJ-inbound corridor only — not a quote for a named lane, and not transit for the other five ports.
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
        <p style={p}>
          The per-mile rate falls as the haul lengthens because a fixed per-vehicle cost (dispatch, paperwork, loading, unloading) is spread over more miles. For the full explanation and the live rate on your exact route, see our{' '}
          <strong style={{ color: colors.text }}><Link to="/nj-export-warehouse-shipping-cost" style={{ color: colors.accent, textDecoration: 'none' }}>NJ export-warehouse shipping cost</Link></strong> methodology page. The Y7 fee is separate from the carrier rate: dealers and exporters pay $50 per vehicle ($60 when Y7 also processes the carrier payment), individuals pay $75 (or 10% of the carrier price when that is greater).
        </p>
      </Section>

      <Section title="The Door Premium: Auction Yard vs. a Private or Dealer Address">
        <p style={p}>
          This is the part of &ldquo;door-to-port&rdquo; that most exporters underestimate: <strong style={strong}>where the car is picked up changes the rate</strong>. A pickup from a private residence or a dealer lot costs roughly <strong style={strong}>$70 more per vehicle</strong> than the same haul out of an auction yard, and that surcharge is roughly flat in dollars no matter how far the car is going. That $70 is added to the <strong style={strong}>carrier rate</strong> &mdash; the amount paid to the trucker &mdash; not to Y7&rsquo;s fee, which stays the same flat figure whichever pickup point you choose.
        </p>
        <p style={p}>
          The economics are operational, not arbitrary. An auction yard is built for carriers: several vehicles can be collected at one organised stop, there is loading equipment, and the hours are predictable. A private or dealer address is a dedicated detour for a single car, frequently with no dock, no forklift, and uncertain availability — the driver may wait or make a second trip. That extra time and risk is the roughly $70.
        </p>
        <p style={p}>
          Because the surcharge is flat in dollars, it is a large percentage on a short haul and a small one on a long haul: about <strong style={strong}>+48% on a haul under 100 miles</strong> and only about <strong style={strong}>+14% on a haul over 500 miles</strong>. If you are exporting and have a choice of pickup point, an auction or a consolidation yard is measurably cheaper than a residential door — most on short local runs, least on long hauls.
        </p>
      </Section>

      <Section title="Transit Times and Scheduling">
        <p style={p}>
          The domestic leg typically takes 3-7 days depending on distance from origin to port. A vehicle shipping from a Texas auction to Port Houston might arrive same-day. A vehicle going from a Midwest auction to Port Newark will take 4-6 days. Cross-country routes (West Coast origin to East Coast port or vice versa) run 6-8 days.
        </p>
        <p style={p}>
          On top of domestic transit, budget 1-2 days for port processing — that is the time between when the vehicle arrives at the warehouse and when it is ready for container loading or RoRo staging. So total time from auction win or pickup to "ready for export" is typically 5-10 days for most routes.
        </p>
        <p style={p}>
          The key to smooth port delivery is working backward from your vessel date. Tell us when the ship sails, and we calculate the latest pickup date that still gives enough buffer for transit and warehouse processing. We always recommend at least 2 days of buffer between scheduled warehouse arrival and vessel cutoff — ocean schedules shift, weather happens, and having your vehicle sitting at the warehouse a day early costs almost nothing compared to missing the vessel and waiting two weeks for the next one.
        </p>
      </Section>

      <Section title="Where the Time Actually Goes: Sourcing vs. Driving">
        <p style={p}>
          The 3–7 day window above is your end-to-end timeline, and it is a range for one reason: it has two parts that behave very differently.
        </p>
        <p style={p}>
          <strong style={{ color: colors.text }}>Sourcing the carrier is the variable part.</strong> Before any truck moves, a carrier has to accept the load at a fair market rate for the lane. On a busy corridor with an honest rate, that can happen the same day; on a thin lane, or with a rate posted below market, it can sit for days. This interval is exactly why the quoted window is a range rather than a fixed number — and it is not something we can quantify from delivery data, because the export records the dispatch date, not the date the load was first posted.
        </p>
        <p style={p}>
          <strong style={{ color: colors.text }}>Once a carrier is dispatched, the driving is fast and consistent.</strong> On 156 New Jersey-inbound dispatches with confirmed delivery dates, here is how long the trucking leg took, measured <strong style={strong}>from dispatch</strong> (a carrier already assigned) — not from booking or from pickup:
        </p>
        <div style={tableWrap}>
          <table style={table}>
            <thead>
              <tr>
                <th style={th}>Haul distance</th>
                <th style={th}>Median (from dispatch)</th>
                <th style={th}>25th&ndash;75th pct</th>
                <th style={th}>Sample (n)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={td}>under 100 mi</td><td style={td}>1 day</td><td style={td}>1 &ndash; 2</td><td style={td}>49</td></tr>
              <tr><td style={td}>101 &ndash; 250 mi</td><td style={td}>2 days</td><td style={td}>1 &ndash; 4</td><td style={td}>35</td></tr>
              <tr><td style={td}>251 &ndash; 500 mi</td><td style={td}>2 days</td><td style={td}>1 &ndash; 4</td><td style={td}>29</td></tr>
              <tr><td style={td}>501 &ndash; 800 mi</td><td style={td}>2 days</td><td style={td}>2 &ndash; 4</td><td style={td}>26</td></tr>
              <tr><td style={td}>801 &ndash; 1,200 mi</td><td style={td}>4 days</td><td style={td}>3 &ndash; 7</td><td style={td}>13</td></tr>
              <tr><td style={td}><strong style={strong}>all hauls</strong></td><td style={td}><strong style={strong}>2 days</strong></td><td style={td}>&mdash;</td><td style={td}>156</td></tr>
            </tbody>
          </table>
        </div>
        <p style={p}>
          71% of these vehicles were delivered within 3 days <strong style={strong}>of dispatch</strong>, and 96% within 7 days of dispatch. These figures are <strong style={strong}>New Jersey-inbound only</strong> and describe the trucking leg after a carrier is assigned; they are not transit times for Houston, Savannah, Los Angeles, Baltimore, or Jacksonville, and they do not include carrier sourcing.
        </p>
        <p style={p}>
          The practical lesson: a low quoted rate does not make a car arrive sooner. It leaves the load sitting on the board while the storage clock runs. A rate that actually clears the market gets a carrier assigned — and once assigned, the drive is quick and predictable.
        </p>
      </Section>

      <Section title="Common Export Corridors">
        <p style={p}>
          Most auction-to-port shipments follow predictable corridors based on geography. Understanding these patterns helps you plan purchasing and budget for transport costs.
        </p>
        <p style={p}>
          <strong style={{ color: colors.text }}>Texas auctions to Port Houston.</strong> This is the shortest and cheapest corridor. Copart and IAAI have over a dozen yards across Texas. Transit to Houston-area warehouses is typically same-day to 2 days. If you are buying Texas auction vehicles for export, Houston is almost always your best port choice.
        </p>
        <p style={p}>
          <strong style={{ color: colors.text }}>Northeast and Mid-Atlantic auctions to <Link to="/ports/newark" style={{ color: colors.accent, textDecoration: 'none' }}>Port Newark</Link>.</strong> Auctions in New Jersey, Pennsylvania, New York, Connecticut, and surrounding states route naturally to Newark. This corridor handles the highest volume of export vehicles on the East Coast; its dispatch-to-delivery times are the New Jersey-inbound figures shown in the transit section above.
        </p>
        <p style={p}>
          <strong style={{ color: colors.text }}>Southeast auctions to <Link to="/ports/savannah" style={{ color: colors.accent, textDecoration: 'none' }}>Savannah</Link> or <Link to="/ports/jacksonville" style={{ color: colors.accent, textDecoration: 'none' }}>Jacksonville</Link>.</strong> Georgia, Florida, South Carolina, and Alabama auction purchases feed into these two ports. Jacksonville is better for Caribbean-bound exports; Savannah offers more container route options for West Africa and the Middle East.
        </p>
        <p style={p}>
          <strong style={{ color: colors.text }}>Midwest auctions to any coast port.</strong> Vehicles purchased at auctions in Ohio, Indiana, Illinois, Michigan, and surrounding states are roughly equidistant from Newark, Savannah, and Houston. The best port choice depends on your ocean freight route and rates, not domestic transit cost. We quote all options so you can compare.
        </p>
      </Section>
    </SeoLandingPage>
  );
}
