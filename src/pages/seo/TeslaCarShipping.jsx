import SeoLandingPage, { Section } from './SeoLandingPage';
import { colors, fonts } from '../../theme';

const teslaModels = [
  { model: 'Model 3', weight: '3,862–4,250 lbs', clearance: '5.5"', note: 'Standard open carrier OK' },
  { model: 'Model Y', weight: '4,416 lbs', clearance: '6.6"', note: 'Standard carrier, rear-wheel drive tow mode' },
  { model: 'Model S', weight: '4,561 lbs', clearance: '4.6" (Air 5.5")', note: 'LOW clearance — enclosed recommended' },
  { model: 'Model X', weight: '5,185 lbs', clearance: '5.4" (Air 6.5")', note: 'Falcon doors — interior load required' },
  { model: 'Cybertruck', weight: '6,603 lbs', clearance: '9.1–16"', note: 'Heavy duty carrier needed, stainless body requires careful handling' },
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

export default function TeslaCarShipping() {
  return (
    <SeoLandingPage
      meta={{
        title: 'Tesla Car Shipping',
        description: 'Professional Tesla transport service. Licensed broker handling Model S, 3, X, Y, and Cybertruck shipping with specialized carriers. Free quotes, insured, nationwide.',
        path: '/tesla-car-shipping',
      }}
      primaryCTA={{ intlKey: 'shipMyCar', to: '/ship-my-car', tone: 'coral' }}
      secondaryCTA={{ intlKey: 'exporters', to: '/exporters', tone: 'amber' }}
      heading="Tesla Shipping — Specialized Transport for Every Tesla Model"
      intro="Shipping a Tesla requires more than a standard car carrier. Ground clearance limitations, regenerative braking behavior, battery charge management, and unique body materials like Cybertruck's stainless steel all demand carriers with specific EV experience. Y7 Logistics works with vetted carriers who understand Tesla's transport mode, air suspension settings, and Falcon wing door positioning — so your vehicle arrives exactly as it left."
      faqs={[
        { q: 'How much does it cost to ship a Tesla across the country?', a: 'Cross-country Tesla shipping typically ranges from $850 to $2,400 depending on the model, transport type (open vs. enclosed), and route. Model 3 and Model Y are standard-size vehicles that fit on open carriers. Model S, Model X, and Cybertruck often require enclosed or specialized transport, increasing the cost.' },
        { q: 'Does Tesla offer their own shipping service?', a: 'Tesla only handles factory-to-customer deliveries for new vehicle purchases. For all other shipping needs — relocation, resale, auction purchases, or port delivery — you need a third-party auto transport broker like Y7 Logistics.' },
        { q: 'Can you ship a Cybertruck?', a: 'Yes. Cybertruck requires heavy-duty carriers due to its 6,600+ lb weight and oversized dimensions. We use carriers experienced with stainless steel body vehicles who use protective padding on all tie-down points to prevent surface damage.' },
        { q: 'Do I need to charge my Tesla before pickup?', a: 'We recommend charging to 50–60% before pickup. Never charge above 80% — extended periods at high state of charge can cause minor range degradation. The carrier needs enough charge to load, unload, and move the vehicle short distances.' },
        { q: 'What\'s "Transport Mode" in Tesla vehicles?', a: 'Transport Mode disables the parking brake and allows the vehicle to be moved freely without triggering regenerative braking or other drive systems. It\'s accessed through Vehicle Settings → Service → Transport Mode. Carriers should always enable this before loading.' },
        { q: 'Can you ship a Tesla with a low battery?', a: 'We recommend at least 20% charge. Below that, the vehicle may enter energy-saving mode and disable features needed for loading. If the battery is critically low, a flatbed may be needed as the vehicle won\'t roll onto a standard carrier.' },
        { q: 'Is enclosed transport worth the extra cost for a Tesla?', a: 'For Model 3 and Model Y in standard trims, open transport is perfectly safe and cost-effective. For Model S, Model X, Performance trims, new deliveries, and Cybertruck, enclosed transport provides extra protection from road debris and weather — worth the 40–60% premium for high-value vehicles.' },
        { q: 'How do I prepare my Tesla for auto transport?', a: 'Charge to 50–60%, enable Transport Mode, disable Sentry Mode (to preserve battery), remove personal items, fold mirrors, and note any existing damage. For Model X, ensure Falcon wing doors are fully closed and latched.' },
      ]}
      related={[
        { label: 'EV Auto Transport', to: '/ev-auto-transport' },
        { label: 'Cybertruck Shipping', to: '/cybertruck-shipping' },
        { label: 'Enclosed Car Shipping', to: '/enclosed-car-shipping' },
        { label: 'Car Shipping Cost', to: '/car-shipping-cost' },
        { label: 'Get a Quote', to: '/quote' },
      ]}
      ctaLabel="Get Your Tesla Shipping Quote"
    >
      {/* Tesla-specific data table */}
      <Section title="Tesla Model Shipping Specifications">
        <div style={{ overflowX: 'auto', marginBottom: '40px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${colors.border}`, borderRadius: '12px' }}>
            <thead>
              <tr style={{ background: colors.bgMuted }}>
                <th style={headerCellStyle}>Model</th>
                <th style={headerCellStyle}>Weight</th>
                <th style={headerCellStyle}>Ground Clearance</th>
                <th style={headerCellStyle}>Loading Consideration</th>
              </tr>
            </thead>
            <tbody>
              {teslaModels.map((m, i) => (
                <tr key={i}>
                  <td style={{ ...cellStyle, fontWeight: 600, color: colors.text }}>{m.model}</td>
                  <td style={cellStyle}>{m.weight}</td>
                  <td style={cellStyle}>{m.clearance}</td>
                  <td style={cellStyle}>{m.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Why Tesla needs specialized carriers */}
      <Section title="Why Tesla Shipping Needs Specialized Carriers">
        <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <li style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted, lineHeight: 1.7 }}>
            <strong style={{ color: colors.text }}>Ground clearance issues:</strong> Model S in standard air suspension sits at just 4.6 inches — too low for many open trailer ramps. Carriers must adjust air suspension to entry height or use enclosed trailers with hydraulic lift gates.
          </li>
          <li style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted, lineHeight: 1.7 }}>
            <strong style={{ color: colors.text }}>Regenerative braking limitations:</strong> In transport mode, regenerative braking is disabled to allow free rolling during loading and unloading. Carriers unfamiliar with Tesla may not enable this, risking brake lock-ups on the ramp.
          </li>
          <li style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted, lineHeight: 1.7 }}>
            <strong style={{ color: colors.text }}>Battery charge considerations:</strong> Carriers should never let the battery drop below 20% during transit. Extended periods at very low charge can trigger battery protection modes that prevent the vehicle from being moved.
          </li>
          <li style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted, lineHeight: 1.7 }}>
            <strong style={{ color: colors.text }}>Falcon wing doors (Model X):</strong> These doors extend vertically and require careful positioning on the carrier. Interior loading on enclosed trailers must account for overhead clearance and door sensor sensitivity.
          </li>
          <li style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted, lineHeight: 1.7 }}>
            <strong style={{ color: colors.text }}>Cybertruck stainless steel:</strong> The brushed stainless finish shows every scratch and cannot be buffed out like painted surfaces. All strapping points require protective padding, and metal-on-metal contact must be strictly avoided.
          </li>
        </ul>
      </Section>

      {/* Transport options */}
      <Section title="Transport Options for Your Tesla">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            { type: 'Open Transport', range: '$850–$1,400 typical', models: 'Model 3, Model Y, standard trims', desc: 'The most cost-effective option. Your Tesla is loaded on a multi-car carrier alongside other vehicles. Suitable for daily-driver Teslas in standard trims.' },
            { type: 'Enclosed Transport', range: '$1,400–$2,400 typical', models: 'Model S, Model X, Performance trims, new Teslas', desc: 'Fully enclosed trailer protects your Tesla from road debris, weather, and UV exposure. Recommended for luxury trims, new factory deliveries, and any Tesla over $60,000 in value.' },
            { type: 'Flatbed Transport', range: '$1,100–$1,800 typical', models: 'Cybertruck and when ground clearance prevents standard loading', desc: 'Single-vehicle flatbed for oversized or heavy Teslas. The only reliable option for Cybertruck and Model S in lowered suspension configurations.' },
          ].map((opt, i) => (
            <div key={i} style={{
              background: colors.bg,
              border: `1px solid ${colors.border}`,
              borderRadius: '12px',
              padding: '20px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '8px', marginBottom: '6px' }}>
                <span style={{ fontFamily: fonts.sans, fontSize: '15px', fontWeight: 600, color: colors.text }}>{opt.type}</span>
                <span style={{ fontFamily: fonts.mono, fontSize: '13px', color: colors.accent, fontWeight: 600 }}>{opt.range}</span>
              </div>
              <div style={{ fontFamily: fonts.sans, fontSize: '12px', color: colors.textMuted, marginBottom: '8px' }}>Best for: {opt.models}</div>
              <div style={{ fontFamily: fonts.sans, fontSize: '13px', color: colors.textMuted, lineHeight: 1.6 }}>{opt.desc}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Factory pickups */}
      <Section title="From Tesla Factory to Your Door">
        <p style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted, lineHeight: 1.7, marginBottom: '16px' }}>
          Y7 Logistics has experience coordinating direct factory pickup from all major Tesla manufacturing locations. Our carriers understand factory pickup procedures, scheduling requirements, and vehicle inspection protocols specific to each facility.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            { name: 'Fremont, CA', desc: 'Primary US factory — Model S, Model X, Model 3, Model Y' },
            { name: 'Austin, TX (Gigafactory Texas)', desc: 'Cybertruck and Model Y production' },
            { name: 'Sparks, NV (Gigafactory)', desc: 'Battery and powertrain facility' },
          ].map((f, i) => (
            <div key={i} style={{
              background: colors.bgMuted,
              borderRadius: '8px',
              padding: '12px 16px',
            }}>
              <span style={{ fontFamily: fonts.sans, fontSize: '14px', fontWeight: 600, color: colors.text }}>{f.name}</span>
              <span style={{ fontFamily: fonts.sans, fontSize: '13px', color: colors.textMuted }}> — {f.desc}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Sales & Salvage */}
      <Section title="Tesla Sales & Salvage Auction Experience">
        <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            'Direct Tesla dealer-to-customer delivery — coordination with Tesla service centers and showrooms',
            'Copart and IAAI Tesla auction pickup — increasingly common for damaged and salvage Teslas being purchased for repair and resale',
            'Export Tesla shipping via port delivery — growing international demand for US-market Teslas, especially Cybertruck (unavailable overseas)',
          ].map((item, i) => (
            <li key={i} style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted, lineHeight: 1.6 }}>{item}</li>
          ))}
        </ul>
      </Section>
    </SeoLandingPage>
  );
}
