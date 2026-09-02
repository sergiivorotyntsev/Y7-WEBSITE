import React from 'react';
import { Link } from 'react-router-dom';

export default function PortExportNewarkHoustonSavannah({ theme }) {
  return (
    <article>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        For vehicle exporters, the US port decision shapes cost, timing, and destination-country
        access far more than most buyers realize. Port Newark (actually Port Newark / Elizabeth
        Marine Terminal), Port Houston, and Port Savannah each serve distinct destination networks,
        run different vessel cadences, and price their warehouse operations differently. Choosing the
        wrong port for a given destination can add 7–21 days to transit and $500–$1,200 to total cost.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        Why Port Selection Matters More Than Most Realize
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Ocean carriers do not run every vessel to every destination from every port. Each port has
        established trade lanes — regular vessel services connecting it to specific destination
        networks. Port Newark dominates the North Atlantic and West Africa trade. Port Houston
        dominates the Gulf-Mexico, Central/South America, and Middle East corridors. Port Savannah
        has grown into a major South Atlantic trade hub with strong European connections. Shipping
        from the "wrong" port to a given destination either adds a transshipment leg or forces you
        to wait for a less frequent direct sailing.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        Port Newark (NJ) — the East Coast Giant
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        The combined Port Newark / Elizabeth Marine Terminal complex handles the largest share of
        US vehicle exports, by a wide margin. The warehouse network is the deepest — dozens of
        bonded facilities with established workflows for RoRo (roll-on/roll-off) and container
        loading, plus direct relationships with most of the major ocean carriers running West
        Africa, the Mediterranean, and European lanes.
      </p>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        <strong>Vessel cadence:</strong> 3–5 vehicle-carrying vessel departures per week to Europe,
        2–4 per week to West Africa, 1–2 per week to the Middle East.<br />
        <strong>Destinations:</strong> Germany (Bremerhaven), UK (Southampton, Tilbury), Netherlands
        (Amsterdam/Rotterdam), Poland (Gdynia), Belgium (Zeebrugge), Nigeria (Lagos), Ghana (Tema),
        Togo (Lomé), UAE (Jebel Ali).<br />
        <strong>Warehouse drop fees:</strong> typically $75–$125 per vehicle.<br />
        <strong>Daily storage after free window:</strong> $10–$20.<br />
        <strong>Gate pass notes:</strong> mature and efficient; direct-from-auction drop-offs
        standard.
      </p>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        The downsides: congestion during peak export cycles (August–October particularly), higher
        labor costs reflected in handling fees, and the occasional weather disruption that stacks
        the yard for days after a major Atlantic storm.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        Port Houston (TX) — the Gulf Hub
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Port Houston is the primary export gateway for Mexico, Central America, South America, and
        has meaningful volume to the Middle East and parts of West Africa. The complex serves as
        the natural choice for exporters sourcing from Texas auctions (Copart Dallas/Houston/San
        Antonio, IAA Dallas/Houston) and for any southern-US origin heading to Gulf-coast or
        Latin American destinations.
      </p>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        <strong>Vessel cadence:</strong> 4–6 departures per week to Mexico and Central America,
        2–3 per week to the Middle East, 1–2 per week to West Africa.<br />
        <strong>Destinations:</strong> Mexico (Veracruz, Altamira), Dominican Republic (Rio Haina),
        Jamaica (Kingston), Colombia (Cartagena), Honduras (Puerto Cortés), UAE (Jebel Ali), Nigeria.<br />
        <strong>Warehouse drop fees:</strong> $60–$110.<br />
        <strong>Daily storage after free window:</strong> $8–$18.<br />
        <strong>Gate pass notes:</strong> slightly less mature than Newark for non-Texas origins;
        paperwork handoffs sometimes need 24-hour lead time.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        Port Savannah (GA) — the Fast-Growing European Lane
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Savannah has quietly become a major vehicle-export corridor over the past decade, with strong
        European lane development and cleaner operations than Newark in several respects. Less
        congestion, newer warehouse facilities, and direct Bremerhaven and Hamburg vessel services
        are the main draws.
      </p>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        <strong>Vessel cadence:</strong> 2–3 per week to Europe, 1 per week to West Africa, regional
        feeder services to the Caribbean.<br />
        <strong>Destinations:</strong> Germany (Bremerhaven), UK (Southampton), Netherlands, Spain
        (Barcelona, Vigo), Nigeria, Dominican Republic.<br />
        <strong>Warehouse drop fees:</strong> $70–$120.<br />
        <strong>Daily storage after free window:</strong> $8–$16.<br />
        <strong>Gate pass notes:</strong> efficient, modern yard operations.
      </p>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Savannah is increasingly the natural choice for Southeast US origins heading to Europe. A
        Florida Copart pickup destined for Rotterdam routes through Savannah more efficiently than
        through Newark — shorter domestic transport, cleaner yard, comparable vessel schedules.
      </p>

      <div style={{ background: 'linear-gradient(135deg, rgba(15,110,86,0.06), rgba(15,110,86,0.02))', border: '1px solid rgba(15,110,86,0.15)', borderRadius: 12, padding: '20px 24px', margin: '24px 0' }}>
        <div style={{ fontWeight: 700, color: theme.success, marginBottom: 8, fontSize: '0.85rem', letterSpacing: 0.5, textTransform: 'uppercase' }}>Key Takeaway</div>
        <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.7, color: theme.text }}>
          Match the port to two things: (1) vessel frequency to your specific destination and
          (2) distance from your origin auction. Getting both right cuts <strong style={{ color: theme.accent }}>
          7–14 days</strong> and <strong style={{ color: theme.accent }}>$400–$900</strong> off a
          typical export cycle compared to defaulting to the nearest large port.
        </p>
      </div>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        Comparison Table (2026 Data)
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        <strong>Vessel frequency to Hamburg (Europe):</strong> Newark 3–5/wk, Savannah 2–3/wk,
        Houston 0–1/wk.<br />
        <strong>Vessel frequency to Veracruz (Mexico):</strong> Houston 2–3/wk, Newark 0/wk direct,
        Savannah 0/wk direct.<br />
        <strong>Vessel frequency to Lagos (Nigeria):</strong> Newark 2–4/wk, Houston 1–2/wk,
        Savannah 1/wk.<br />
        <strong>Warehouse labor strike exposure:</strong> Newark highest (ILA concentration),
        Houston moderate, Savannah lowest.<br />
        <strong>Domestic transport cost from Chicago Copart:</strong> Newark $725, Savannah $850,
        Houston $1,000.<br />
        <strong>Domestic transport cost from Dallas IAA:</strong> Houston $350, Savannah $900,
        Newark $1,350.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        How to Choose
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Start with the destination. Does your forwarder have a preferred vessel service? What's the
        typical transit time they quote to the destination country? Then overlay the auction origin —
        which port is closest and which port has the vessel frequency that matches your target
        sailing window?
      </p>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        For European destinations from Midwest origins, Newark still dominates. For European
        destinations from Southeast US origins, Savannah is increasingly the smart call. For Latin
        American destinations from anywhere south of the Mason-Dixon line, Houston is essentially
        automatic. For West African destinations, Newark has the deepest vessel roster but Houston
        is competitive for Texas-origin loads.
      </p>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        The other factor: which port does your freight forwarder know best? A forwarder with an
        established Newark office and no Savannah relationships is better for Newark loads even if
        Savannah would theoretically be cheaper. The human-relationship layer at the warehouse matters
        more than the fee schedule for getting things done quickly when something goes wrong.
      </p>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Y7 handles the domestic leg to any of these ports — see <Link to="/exporters" style={{ color: theme.accent, fontWeight: 600 }}>
        the exporter services page</Link> for the full auction-to-port workflow, or browse individual
        port detail pages (<Link to="/ports/newark" style={{ color: theme.accent, fontWeight: 600 }}>Newark</Link>,
        <Link to="/ports/houston" style={{ color: theme.accent, fontWeight: 600 }}> Houston</Link>,
        <Link to="/ports/savannah" style={{ color: theme.accent, fontWeight: 600 }}> Savannah</Link>)
        for port-specific operational details. Shipping to the EU from any of the three: the{' '}
        <Link to="/certificate-of-origin" style={{ color: theme.accent, fontWeight: 600 }}>Certificate of Origin</Link>{' '}
        Y7 files is what qualifies a US-built vehicle for 0% import duty on arrival.
      </p>
    </article>
  );
}
