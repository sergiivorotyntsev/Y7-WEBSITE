import SeoLandingPage, { Section } from './SeoLandingPage';
import { colors, fonts } from '../../theme';

const ports = [
  { port: 'Port Newark, NJ', regions: 'Europe, Africa, Middle East', volume: 'Highest — Tesla, BMW, Mercedes EVs' },
  { port: 'Port of Houston, TX', regions: 'Latin America, Africa', volume: 'Texas-built Cybertruck, Model Y' },
  { port: 'Port of Los Angeles, CA', regions: 'Asia, Pacific', volume: 'Tesla, Lucid (California-made)' },
  { port: 'Port of Savannah, GA', regions: 'Europe, Caribbean', volume: 'Southeast EV traffic' },
  { port: 'Port of Baltimore, MD', regions: 'Europe, West Africa', volume: 'Mid-Atlantic EV exports' },
  { port: 'JAXPORT, FL', regions: 'Caribbean, Latin America', volume: 'Florida auction EVs' },
];

const cellStyle = {
  fontFamily: fonts.sans,
  fontSize: '13px',
  color: colors.textMuted,
  padding: '10px 12px',
  borderBottom: `1px solid ${colors.border}`,
  lineHeight: 1.5,
};

const headerCellStyle = {
  ...cellStyle,
  fontWeight: 600,
  color: colors.text,
  fontSize: '12px',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
};

export default function ElectricVehiclePortDelivery() {
  return (
    <SeoLandingPage
      meta={{
        title: 'EV Port Delivery',
        description: 'Ship electric vehicles from US auctions and dealers to major US ports for international export. Tesla, Rivian, Lucid, and more. Specialized EV port delivery service.',
        path: '/electric-vehicle-port-delivery',
      }}
      primaryCTA={{ intlKey: 'exporters', to: '/exporters', tone: 'amber' }}
      secondaryCTA={{ intlKey: 'shipMyCar', to: '/ship-my-car', tone: 'coral' }}
      heading="Electric Vehicle Delivery to US Ports for Export"
      intro="International demand for American electric vehicles is booming. Whether you're exporting Teslas to Europe, Rivians to the Middle East, or Lucids to Asia, Y7 Logistics handles the critical last-mile transport — from US auctions, dealers, or private sellers to major US export ports. We combine EV-specific transport expertise with port delivery coordination to ensure your electric vehicles arrive at the terminal safely and on schedule for your freight forwarder's ocean shipping booking."
      faqs={[
        { q: 'Can I export a Tesla from the US?', a: 'Yes. US-market Teslas are frequently exported worldwide, especially Cybertruck (not sold internationally), Performance variants, and used Teslas priced 15-30% below international markets. Y7 handles the domestic transport from any US location to your chosen export port.' },
        { q: 'What documents do I need to export an EV through a US port?', a: 'Typical export documentation includes the vehicle title or bill of sale, export declaration (filed by your customs broker), EPA/DOT compliance forms, and port-specific delivery instructions. Y7 handles domestic transport documentation (BOL, carrier insurance); your freight forwarder handles ocean shipping and customs.' },
        { q: 'Do you handle Copart EV auction purchases for export?', a: 'Yes — this is one of our most common services. We coordinate gate pass release from Copart or IAAI, arrange EV-experienced carriers for pickup, and deliver directly to your designated port warehouse. Increasingly popular for damaged Teslas purchased for international repair and resale.' },
        { q: 'Which US port is best for exporting EVs to Europe?', a: 'Port Newark (NJ) and Port of Baltimore (MD) are the primary East Coast ports for European vehicle exports. Baltimore is particularly strong for RoRo (Roll-on/Roll-off) shipments. Port of Savannah offers competitive rates for Southern European and Mediterranean destinations.' },
        { q: 'What\'s the battery charge requirement for EV ocean shipping?', a: 'Most shipping lines require 50% or less state of charge for lithium-ion battery safety during ocean transit. Some lines are stricter at 30-40%. We ensure vehicles arrive at port within the required SOC range and can coordinate charging or discharging if needed.' },
        { q: 'Can you coordinate with my freight forwarder?', a: 'Absolutely. We work with your freight forwarder to coordinate delivery timing, port warehouse assignment, and documentation handoff. Proper timing prevents expensive port storage fees and ensures your vehicle is ready for container loading or RoRo booking.' },
        { q: 'How long does auction-to-port transport take for an EV?', a: 'Transit time depends on the auction-to-port distance. Local pickups (within 300 miles of port): 1-3 days. Regional (300-800 miles): 2-4 days. Cross-country: 5-8 days. We factor in auction release timing and port gate schedules.' },
        { q: 'Do you handle Cybertruck port delivery?', a: 'Yes. Cybertruck port delivery requires heavy-duty carriers with proper weight ratings and stainless steel handling experience. We use the same specialized carriers for port delivery as for domestic Cybertruck transport, with added port access credentials.' },
      ]}
      related={[
        { label: 'Tesla Car Shipping', to: '/tesla-car-shipping' },
        { label: 'EV Auto Transport', to: '/ev-auto-transport' },
        { label: 'Door-to-Port Transport', to: '/door-to-port-auto-transport' },
        { label: 'Auction to Port', to: '/auction-to-port-transport' },
        { label: 'Port Newark', to: '/ports/newark' },
        { label: 'Port Houston', to: '/ports/houston' },
      ]}
      ctaLabel="Get Your EV Port Delivery Quote"
    >
      {/* Why Export EVs */}
      <Section title="Why Export EVs from the USA">
        <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            'Pricing advantage: US EV prices are 15–30% lower than international markets for the same models',
            'Tesla Cybertruck is unavailable internationally — drives strong export demand from US buyers',
            'Rivian and Lucid are not yet sold in most international markets',
            'Performance variants and specific configurations often available only in the US market',
            'Auction opportunity: Copart and IAAI damaged EVs are increasingly purchased for international repair and resale',
          ].map((item, i) => (
            <li key={i} style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted, lineHeight: 1.6 }}>{item}</li>
          ))}
        </ul>
      </Section>

      {/* Supported Ports Table */}
      <Section title="Supported Ports for EV Export">
        <div style={{ overflowX: 'auto', marginBottom: '40px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${colors.border}` }}>
            <thead>
              <tr style={{ background: colors.bgMuted }}>
                <th style={headerCellStyle}>Port</th>
                <th style={headerCellStyle}>Primary Export Regions</th>
                <th style={headerCellStyle}>Typical EV Volume</th>
              </tr>
            </thead>
            <tbody>
              {ports.map((p, i) => (
                <tr key={i}>
                  <td style={{ ...cellStyle, fontWeight: 600, color: colors.text }}>{p.port}</td>
                  <td style={cellStyle}>{p.regions}</td>
                  <td style={cellStyle}>{p.volume}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* EV-Specific Export Considerations */}
      <Section title="EV-Specific Export Considerations">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {[
            { title: 'Battery Safety & Regulations', desc: 'Lithium-ion batteries require Class 9 hazardous material compliance for international ocean shipping. We coordinate with export freight forwarders who handle the HazMat documentation and ensure your EV meets all port intake requirements.' },
            { title: 'State of Charge Requirements', desc: 'Most shipping lines require 50% or less SOC for battery safety during ocean transit. We manage charge levels during domestic transport to ensure vehicles arrive at port within acceptable range.' },
            { title: 'Charging Port Compatibility', desc: 'International buyers need Type 2 (EU/AU) or GB/T (China) adapters for destination-country charging. We ensure vehicle compatibility information is documented for the buyer\'s reference.' },
            { title: 'Port Consolidation', desc: 'Multiple EVs can be consolidated at port warehouses before container loading. We coordinate multi-vehicle deliveries for RoRo vs. container decisions based on destination requirements.' },
            { title: 'Gate Pass Coordination', desc: 'For auction purchases, we handle Copart/IAAI release documents and coordinate port gate pass timing to avoid storage fees and ensure seamless handoff to your freight forwarder.' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%', background: colors.accent, color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '14px', fontWeight: 700, fontFamily: fonts.sans, flexShrink: 0,
              }}>
                {i + 1}
              </div>
              <div>
                <div style={{ fontFamily: fonts.sans, fontSize: '15px', fontWeight: 600, color: colors.text, marginBottom: '4px' }}>{item.title}</div>
                <div style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted, lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Service Workflow */}
      <Section title="EV Port Delivery Workflow">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            { step: 'Purchase Confirmation', desc: 'You win an auction or complete a private purchase. Send us VIN, lot number, purchase receipt, and destination port preference.' },
            { step: 'Carrier Assignment', desc: 'We assign a verified carrier experienced with EV transport and port delivery — not all carriers have port credentials or EV handling experience.' },
            { step: 'Pickup & Transport', desc: 'Carrier picks up from auction or dealer with proper EV loading techniques. Transit monitored with status updates at each stage.' },
            { step: 'Port Delivery & Documentation', desc: 'Vehicle delivered directly to port warehouse or export terminal. Gate pass and release documents coordinated with port agents.' },
            { step: 'Handoff to Freight Forwarder', desc: 'We coordinate with your ocean freight forwarder for container loading or RoRo booking. Full documentation package provided.' },
          ].map((item, i) => (
            <div key={i} style={{
              background: colors.bg,
              border: `1px solid ${colors.border}`,
              borderRadius: '12px',
              padding: '16px 20px',
              display: 'flex',
              gap: '16px',
              alignItems: 'flex-start',
            }}>
              <span style={{
                fontFamily: fonts.serif, fontSize: '20px', fontWeight: 700, color: colors.accent, minWidth: '28px',
              }}>
                {i + 1}
              </span>
              <div>
                <div style={{ fontFamily: fonts.sans, fontSize: '14px', fontWeight: 600, color: colors.text, marginBottom: '4px' }}>{item.step}</div>
                <div style={{ fontFamily: fonts.sans, fontSize: '13px', color: colors.textMuted, lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Pricing */}
      <Section title="EV Port Delivery Pricing">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { route: 'Copart auction within 300 miles of port', range: '$300–$600' },
            { route: 'Dealer to port within state', range: '$400–$750' },
            { route: 'Cross-country to port (e.g., California to Newark)', range: '$1,400–$2,200' },
            { route: 'Oversized EVs (Cybertruck, Hummer EV)', range: '25–40% premium above standard' },
          ].map((p, i) => (
            <div key={i} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 16px',
              background: i % 2 === 0 ? colors.bgMuted : colors.bgCard,
              borderRadius: '8px',
              flexWrap: 'wrap',
              gap: '8px',
            }}>
              <span style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.text }}>{p.route}</span>
              <span style={{ fontFamily: fonts.mono, fontSize: '13px', color: colors.accent, fontWeight: 600 }}>{p.range}</span>
            </div>
          ))}
        </div>
        <p style={{ fontFamily: fonts.sans, fontSize: '12px', color: colors.textHint, marginTop: '12px', lineHeight: 1.5 }}>
          Prices are estimates based on current market conditions. Final pricing depends on specific vehicle, route, and transport type.
        </p>
      </Section>
    </SeoLandingPage>
  );
}
