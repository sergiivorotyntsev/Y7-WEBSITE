import { Link } from 'react-router-dom';
import SeoLandingPage, { Section } from './SeoLandingPage';
import { colors, fonts } from '../../theme';

const p = {
  fontFamily: fonts.sans,
  fontSize: '14px',
  color: colors.textMuted,
  lineHeight: 1.7,
  marginBottom: '16px',
};

export default function DoorToPort() {
  return (
    <SeoLandingPage
      meta={{
        title: 'Door-to-Port Auto Transport',
        description:
          'Transport vehicles from anywhere in the US to major export ports. Newark, Houston, Savannah, LA, Baltimore, Jacksonville. Y7 Logistics.',
        path: '/door-to-port-auto-transport',
      }}
      primaryCTA={{ intlKey: 'exporters', to: '/exporters', tone: 'amber' }}
      secondaryCTA={{ intlKey: 'dealers', to: '/dealers', tone: 'teal' }}
      heading="Door-to-Port Auto Transport — Vehicle Delivery to US Ports"
      intro="Y7 Logistics delivers vehicles from any US location to major export ports. Whether you're an exporter shipping overseas or need port-side delivery for any reason, we coordinate the entire domestic leg — from your door to the port warehouse."
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
          a: 'Newark NJ, Houston TX, Savannah GA, Los Angeles CA, Baltimore MD, Jacksonville FL — plus others on request.',
        },
        {
          q: 'Can you pick up from an auction and deliver to port?',
          a: 'Yes, auction-to-port is one of our most popular services for exporters. We handle the full chain from auction yard to port warehouse.',
        },
        {
          q: 'Do you handle export paperwork?',
          a: 'We handle the domestic transport leg. For export documentation such as title processing and customs filings, work with your freight forwarder.',
        },
        {
          q: 'How do you coordinate with port warehouses?',
          a: 'We deliver to the specific warehouse or facility you designate, coordinating delivery windows to align with your schedule and vessel dates.',
        },
        {
          q: 'Can you deliver multiple vehicles to the same port?',
          a: 'Yes, we offer multi-vehicle discounts for port consolidation. Whether it is 2 vehicles or 20, we coordinate efficient delivery.',
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
        { label: 'Auction Shipping', to: '/auction-car-shipping' },
        { label: 'Newark vs Houston vs Savannah', to: '/blog/port-specific-export-newark-houston-savannah' },
        { label: 'For Exporters', to: '/exporters' },
        { label: 'Get a Quote', to: '/quote' },
      ]}
    >
      <Section title="Major US Export Ports: What to Know">
        <p style={p}>
          Each port operates differently, and those differences affect how we plan your domestic transport. Here is a brief overview of the six ports we deliver to most frequently. For full details on each port — including warehouse contacts, terminal maps, and delivery scheduling — see the individual port pages linked below.
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

      <Section title="Common Export Corridors">
        <p style={p}>
          Most auction-to-port shipments follow predictable corridors based on geography. Understanding these patterns helps you plan purchasing and budget for transport costs.
        </p>
        <p style={p}>
          <strong style={{ color: colors.text }}>Texas auctions to Port Houston.</strong> This is the shortest and cheapest corridor. Copart and IAAI have over a dozen yards across Texas. Transit to Houston-area warehouses is typically same-day to 2 days. If you are buying Texas auction vehicles for export, Houston is almost always your best port choice.
        </p>
        <p style={p}>
          <strong style={{ color: colors.text }}>Northeast and Mid-Atlantic auctions to <Link to="/ports/newark" style={{ color: colors.accent, textDecoration: 'none' }}>Port Newark</Link>.</strong> Auctions in New Jersey, Pennsylvania, New York, Connecticut, and surrounding states route naturally to Newark. Transit is 1-3 days. This corridor handles the highest volume of export vehicles on the East Coast.
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
