import SeoLandingPage, { Section } from './SeoLandingPage';
import { colors, fonts } from '../../theme';

const specs = [
  { label: 'Length', value: '223.7 inches (18.6 ft)' },
  { label: 'Width', value: '86.7 inches (7.2 ft)' },
  { label: 'Height', value: '70.5 inches (5.9 ft)' },
  { label: 'Weight', value: '6,603 lbs (Dual Motor)' },
  { label: 'Ground Clearance', value: '9.1–16 inches (adaptive)' },
  { label: 'Tonneau-Closed Cargo', value: '121 cu ft' },
  { label: 'Max Towing', value: '11,000 lbs' },
];

const cellStyle = {
  fontFamily: fonts.sans,
  fontSize: '14px',
  color: colors.textMuted,
  padding: '12px 16px',
  borderBottom: `1px solid ${colors.border}`,
};

export default function CybertruckShipping() {
  return (
    <SeoLandingPage
      meta={{
        title: 'Cybertruck Shipping',
        description: 'Professional Cybertruck shipping service. Specialized heavy-duty carriers, stainless steel safe handling, enclosed options available. Licensed broker, nationwide delivery.',
        path: '/cybertruck-shipping',
      }}
      heading="Cybertruck Shipping — Specialized Transport for the Heaviest Tesla"
      intro="The Tesla Cybertruck presents unique shipping challenges that most auto transport carriers aren't equipped to handle. At over 6,600 pounds, 18.6 feet long, and clad in 3mm cold-rolled stainless steel, it exceeds the weight and size capacity of standard carrier slots. Its angular body shape places tie-down points in non-traditional locations, and the brushed stainless finish shows every scratch — making careful handling not optional but essential. Y7 Logistics matches your Cybertruck with heavy-duty carriers who have documented experience transporting this specific vehicle."
      faqs={[
        { q: 'How much does Cybertruck shipping cost?', a: 'Nationwide Cybertruck shipping typically ranges from $1,200 to $3,800 depending on transport type and distance. Heavy-duty open carriers run $1,200–$1,900, enclosed transport $2,200–$3,800, and flatbed $1,500–$2,500. The premium over standard vehicles reflects the weight, size, and handling requirements.' },
        { q: 'Can a standard car carrier transport a Cybertruck?', a: 'Most standard 9–10 car open carriers cannot safely accommodate a Cybertruck. Standard carrier slots are rated for approximately 5,000 lbs — the Cybertruck at 6,603 lbs exceeds this. Heavy-duty carriers with higher per-slot ratings or reduced vehicle counts are required.' },
        { q: 'Should I ship my Cybertruck on an open or enclosed trailer?', a: 'Both options are available. Heavy-duty open carriers are more affordable ($1,200–$1,900) and perfectly safe with proper tie-down padding. Enclosed transport ($2,200–$3,800) is recommended for new Cybertrucks, Cyberbeast trim, or long-distance shipments where maximum protection is desired.' },
        { q: 'How do I prepare my Cybertruck for transport?', a: 'Charge to 50–60%, enable Transport Mode (Vehicle Settings → Service → Transport Mode), lower air suspension to lowest setting, close tonneau cover completely, remove personal items from cargo area, disable Sentry Mode to preserve battery, and provide Mobile Service contact info to the carrier.' },
        { q: 'What\'s the maximum distance you\'ll ship a Cybertruck?', a: 'We ship Cybertrucks coast-to-coast — any distance within the continental US. The most common route is Austin, TX (Gigafactory) to anywhere in the US. Cross-country transit typically takes 5–8 business days.' },
        { q: 'Can you ship a Cyberbeast (tri-motor)?', a: 'Yes. The Cyberbeast is slightly heavier than the Dual Motor variant but ships on the same heavy-duty carriers. The same tie-down and stainless steel handling protocols apply to all Cybertruck trims.' },
        { q: 'How long does Cybertruck delivery from the Austin factory take?', a: 'Transit from Gigafactory Texas in Austin depends on destination: East Coast 3–5 days, West Coast 4–6 days, Midwest 2–4 days. We coordinate with Tesla\'s delivery team for same-day or next-day pickup from the factory.' },
        { q: 'Do I need to be present for Cybertruck delivery?', a: 'We recommend being present to inspect the vehicle at delivery and sign the Bill of Lading. If you can\'t be there, you can designate an authorized representative. We provide photo documentation at pickup and delivery regardless.' },
      ]}
      related={[
        { label: 'Tesla Car Shipping', to: '/tesla-car-shipping' },
        { label: 'EV Auto Transport', to: '/ev-auto-transport' },
        { label: 'Enclosed Car Shipping', to: '/enclosed-car-shipping' },
        { label: 'EV Port Delivery', to: '/electric-vehicle-port-delivery' },
        { label: 'Get a Quote', to: '/quote' },
      ]}
      ctaLabel="Ship Your Cybertruck Safely"
    >
      {/* Specifications Table */}
      <Section title="Cybertruck Specifications">
        <div style={{ overflowX: 'auto', marginBottom: '40px' }}>
          <table style={{ width: '100%', maxWidth: '500px', borderCollapse: 'collapse', border: `1px solid ${colors.border}` }}>
            <tbody>
              {specs.map((s, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? colors.bgCard : colors.bgMuted }}>
                  <td style={{ ...cellStyle, fontWeight: 600, color: colors.text, width: '45%' }}>{s.label}</td>
                  <td style={cellStyle}>{s.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Why different */}
      <Section title="Why Cybertruck Shipping Is Different">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {[
            {
              title: 'Size and weight',
              desc: 'Too large and heavy for standard 10-car open carriers. Typical 9-car trailers maxed at 5,000 lbs per spot cannot accommodate Cybertruck\'s 6,603 lbs. Carriers must run reduced vehicle counts or use heavy-duty equipment to stay within DOT weight limits.',
            },
            {
              title: 'Stainless steel body',
              desc: 'Tesla\'s 3mm cold-rolled stainless alloy is extremely durable but the brushed finish shows every scratch and imperfection. Unlike painted vehicles, these marks cannot be buffed out. Loading straps must use protective padding at all contact points, and metal-on-metal contact must be absolutely avoided.',
            },
            {
              title: 'Adaptive air suspension',
              desc: 'Ground clearance varies from 9.1 inches to 16 inches depending on the suspension setting. Carriers must know how to activate Transport Mode (lowest setting) for safe loading and secure tie-down positioning.',
            },
            {
              title: 'Angular body shape',
              desc: 'The unique angular design means standard tie-down points are in non-traditional locations. Carriers experienced with Cybertruck know the correct anchor points and strap angles to secure the vehicle without risking surface damage.',
            },
            {
              title: 'Battery and range',
              desc: 'The large 123 kWh battery (Cyberbeast) requires careful charge management during shipping. We recommend 50–60% SOC at pickup — enough for loading/unloading maneuvers without risking battery stress from high-charge inactivity.',
            },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: colors.accent,
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: 700,
                fontFamily: fonts.sans,
                flexShrink: 0,
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

      {/* Transport Options */}
      <Section title="Y7 Cybertruck Transport Options">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            { type: 'Heavy-duty open carrier', range: '$1,200–$1,900', desc: 'Nationwide average. Carriers with proper tie-down protection and heavy-duty weight ratings. Most cost-effective option for Cybertruck.' },
            { type: 'Enclosed transport', range: '$2,200–$3,800', desc: 'Recommended for new Cybertrucks, Cyberbeast trim, or long-distance transport. Full weather and debris protection for the stainless finish.' },
            { type: 'Flatbed specialized', range: '$1,500–$2,500', desc: 'Single-vehicle transport when standard loading isn\'t feasible. Ideal for Cybertrucks with aftermarket accessories or lowered suspension.' },
          ].map((opt, i) => (
            <div key={i} style={{
              background: colors.bg,
              border: `1px solid ${colors.border}`,
              borderRadius: '12px',
              padding: '20px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontFamily: fonts.sans, fontSize: '15px', fontWeight: 600, color: colors.text }}>{opt.type}</span>
                <span style={{ fontFamily: fonts.mono, fontSize: '13px', color: colors.accent, fontWeight: 600 }}>{opt.range}</span>
              </div>
              <div style={{ fontFamily: fonts.sans, fontSize: '13px', color: colors.textMuted, lineHeight: 1.6 }}>{opt.desc}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* From Austin Gigafactory */}
      <Section title="From Austin Gigafactory to Your Driveway">
        <p style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted, lineHeight: 1.7, marginBottom: '16px' }}>
          Every Cybertruck is built at Tesla's Gigafactory Texas in Austin. Factory deliveries require specific coordination that Y7 Logistics handles routinely:
        </p>
        <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted, lineHeight: 1.6 }}>Coordination with Tesla's delivery team for pickup scheduling and vehicle release</li>
          <li style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted, lineHeight: 1.6 }}>Same-day or next-day pickup availability from the Gigafactory</li>
          <li style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted, lineHeight: 1.6 }}>Experienced carriers familiar with Gigafactory Texas pickup procedures and security protocols</li>
          <li style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted, lineHeight: 1.6 }}>Photo documentation before loading to establish pre-transport condition</li>
        </ul>
      </Section>

      {/* Preparation Checklist */}
      <Section title="Preparing Your Cybertruck for Transport">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            'Charge to 50–60% (enough for transit but not stressing battery)',
            'Enable Transport Mode (Vehicle Settings → Service → Transport Mode)',
            'Lower air suspension to lowest setting',
            'Close tonneau cover completely',
            'Remove personal items from cargo area',
            'Disable Sentry Mode to preserve battery during transit',
            'Provide Mobile Service contact info to carrier (in case of vehicle issue)',
          ].map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{
                fontFamily: fonts.mono,
                fontSize: '12px',
                fontWeight: 700,
                color: colors.accent,
                minWidth: '20px',
              }}>
                {i + 1}.
              </span>
              <span style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted, lineHeight: 1.6 }}>{step}</span>
            </div>
          ))}
        </div>
      </Section>
    </SeoLandingPage>
  );
}
