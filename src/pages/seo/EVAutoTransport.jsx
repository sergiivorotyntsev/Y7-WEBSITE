import SeoLandingPage, { Section } from './SeoLandingPage';
import { colors, fonts } from '../../theme';

const evBrands = [
  { brand: 'Tesla', models: 'Model 3/Y/S/X/Cybertruck', weight: '3,800–6,600 lbs', notes: 'Air suspension, transport mode' },
  { brand: 'Rivian', models: 'R1T, R1S', weight: '7,000+ lbs', notes: 'Heavy duty carrier required' },
  { brand: 'Lucid', models: 'Air, Gravity', weight: '5,200+ lbs', notes: 'Low clearance on Air Dream' },
  { brand: 'Ford', models: 'F-150 Lightning, Mach-E', weight: '4,800–6,800 lbs', notes: 'Lightning is heavy — HD carrier' },
  { brand: 'Porsche', models: 'Taycan', weight: '4,800–5,100 lbs', notes: 'PASM adaptive suspension' },
  { brand: 'Audi', models: 'e-tron, e-tron GT', weight: '5,400–5,700 lbs', notes: 'Air suspension' },
  { brand: 'BMW', models: 'i4, iX, i5, i7', weight: '4,700–6,000 lbs', notes: 'Standard carriers' },
  { brand: 'Mercedes', models: 'EQS, EQE, EQB', weight: '5,000–5,900 lbs', notes: 'EQS particularly long — length check' },
  { brand: 'Hyundai/Kia', models: 'Ioniq 5/6, EV6, EV9', weight: '4,000–5,500 lbs', notes: 'Standard carriers' },
  { brand: 'GM', models: 'Silverado EV, Hummer EV, Lyriq', weight: '4,900–9,600 lbs', notes: 'Hummer is massive — special transport' },
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

export default function EVAutoTransport() {
  return (
    <SeoLandingPage
      meta={{
        title: 'EV Auto Transport | Electric Vehicle Shipping Services Nationwide',
        description: 'Expert electric vehicle transport for Tesla, Rivian, Lucid, BMW i-Series, Porsche Taycan, Ford Lightning & more. Licensed broker, specialized EV carriers, nationwide.',
        path: '/ev-auto-transport',
      }}
      heading="Electric Vehicle Transport — Every EV Safely Shipped"
      intro="Electric vehicles are not like their ICE counterparts. Heavier battery packs shift weight distribution, lower ground clearance limits trailer compatibility, each manufacturer has different transport mode settings, and battery state-of-charge must be carefully managed throughout transit. Y7 Logistics works exclusively with carriers who have documented EV transport experience — because the carrier who ships sedans all day may not know how to safely load a 9,600-pound Hummer EV."
      faqs={[
        { q: 'Is shipping an EV different from shipping a gas car?', a: 'Yes. EVs are significantly heavier than comparable ICE vehicles (battery packs add 1,000–2,000 lbs), often have lower ground clearance, and require specific transport mode settings to disable regenerative braking during loading. Carriers need EV-specific experience to handle these differences safely.' },
        { q: 'How much does it cost to ship an electric vehicle?', a: 'EV transport typically costs 10–20% more than equivalent ICE vehicles due to the extra weight (fewer vehicles per carrier load) and specialized handling requirements. Expect $900–$1,600 for standard EVs on open transport, $1,500–$2,800 for enclosed, and significantly more for oversized EVs like Hummer EV or Cybertruck.' },
        { q: 'What charge level should my EV be at for pickup?', a: 'We recommend 50% state of charge at pickup. Never charge above 80% — extended periods at high SOC during inactivity can cause minor battery degradation. Below 20% risks the vehicle entering energy-saving mode, which can disable features needed for loading.' },
        { q: 'Can you ship a Rivian R1T or Hummer EV?', a: 'Yes, but these oversized EVs require heavy-duty carriers. The Rivian R1T weighs over 7,000 lbs and the Hummer EV can exceed 9,000 lbs — far above the ~5,000 lb per-slot capacity of standard multi-car carriers. We use specialized carriers with proper weight ratings.' },
        { q: 'Do I need enclosed transport for my EV?', a: 'Not necessarily. Standard EVs like Tesla Model 3, Model Y, Hyundai Ioniq 5, and BMW i4 ship safely on open carriers. Enclosed transport is recommended for luxury EVs (Lucid Air, Porsche Taycan, Mercedes EQS), new factory deliveries, and vehicles worth over $60,000.' },
        { q: 'What\'s "tow mode" on electric vehicles?', a: 'Most EVs have a transport or tow mode that disables regenerative braking and allows free-rolling wheels for safe loading onto carriers. Each manufacturer has a different name and activation process — Tesla calls it Transport Mode, Rivian has Transport Mode in Service settings, BMW uses Transport Mode via iDrive.' },
        { q: 'Can carriers charge my EV during transit?', a: 'For most transits (under 5 days), charging is unnecessary. For longer transits, carriers can stop at DC fast charging stations — this requires extra coordination and may add to transit time. We recommend starting at 50% charge to avoid any mid-transit charging needs.' },
      ]}
      related={[
        { label: 'Tesla Car Shipping', to: '/tesla-car-shipping' },
        { label: 'Cybertruck Shipping', to: '/cybertruck-shipping' },
        { label: 'EV Port Delivery', to: '/electric-vehicle-port-delivery' },
        { label: 'Enclosed Car Shipping', to: '/enclosed-car-shipping' },
        { label: 'Get a Quote', to: '/quote' },
      ]}
      ctaLabel="Ship Your EV With Confidence"
    >
      {/* Supported EV Brands Table */}
      <Section title="Supported Electric Vehicle Brands">
        <div style={{ overflowX: 'auto', marginBottom: '40px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${colors.border}` }}>
            <thead>
              <tr style={{ background: colors.bgMuted }}>
                <th style={headerCellStyle}>Brand</th>
                <th style={headerCellStyle}>Popular Models</th>
                <th style={headerCellStyle}>Weight Range</th>
                <th style={headerCellStyle}>Special Notes</th>
              </tr>
            </thead>
            <tbody>
              {evBrands.map((b, i) => (
                <tr key={i}>
                  <td style={{ ...cellStyle, fontWeight: 600, color: colors.text }}>{b.brand}</td>
                  <td style={cellStyle}>{b.models}</td>
                  <td style={cellStyle}>{b.weight}</td>
                  <td style={cellStyle}>{b.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Why EVs need experienced carriers */}
      <Section title="Why EVs Need Experienced Carriers">
        <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <li style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted, lineHeight: 1.7 }}>
            <strong style={{ color: colors.text }}>Weight distribution:</strong> EV battery packs add 1,000–2,000 lbs compared to ICE equivalents. Carriers must calculate proper load distribution — an overweight position can damage trailer axles and void insurance coverage.
          </li>
          <li style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted, lineHeight: 1.7 }}>
            <strong style={{ color: colors.text }}>Ground clearance:</strong> Many EVs sit lower than ICE vehicles due to the flat battery pack mounted under the floor. Low-ramp carriers can damage front splitters, undercarriage panels, and battery housings.
          </li>
          <li style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted, lineHeight: 1.7 }}>
            <strong style={{ color: colors.text }}>Tow mode variations:</strong> Each brand has different transport mode settings that disable regenerative braking and parking systems. A carrier who doesn't enable the right mode risks brake drag, error codes, or vehicle damage during loading.
          </li>
          <li style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted, lineHeight: 1.7 }}>
            <strong style={{ color: colors.text }}>Battery safety:</strong> Lithium-ion batteries require temperature management during long transits. Extreme heat or cold can affect battery health, and carriers should avoid parking loaded EVs in direct sun for extended periods.
          </li>
          <li style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted, lineHeight: 1.7 }}>
            <strong style={{ color: colors.text }}>Charging considerations:</strong> State of charge management is critical — too high risks degradation during inactivity, too low risks the vehicle entering limp mode and becoming unloadable without a flatbed.
          </li>
        </ul>
      </Section>

      {/* EV-Specific Pricing */}
      <Section title="EV-Specific Pricing">
        <p style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted, lineHeight: 1.7, marginBottom: '16px' }}>
          EV transport typically costs more than shipping a comparable ICE vehicle. The primary cost drivers are weight (heavier vehicles mean fewer per load), longer loading times due to transport mode procedures, and specialized equipment for oversized EVs.
        </p>
        <div style={{
          background: colors.bgMuted,
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '16px',
        }}>
          <div style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted, lineHeight: 1.8 }}>
            <strong style={{ color: colors.text }}>Typical EV transport premium:</strong><br />
            Standard-size EVs (Model 3, Ioniq 5, i4): <strong style={{ color: colors.accent }}>10–20% above ICE equivalent</strong><br />
            Heavy/oversized EVs (Hummer EV, Rivian R1T, Cybertruck): <strong style={{ color: colors.accent }}>20–30%+ above ICE equivalent</strong><br />
            Specialized needs (flatbed, enclosed for luxury EV): <strong style={{ color: colors.accent }}>40–60% above standard open</strong>
          </div>
        </div>
      </Section>

      {/* EV Charging During Transit */}
      <Section title="EV Charging During Transit">
        <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted, lineHeight: 1.6 }}>Most transits under 5 days don't require any charging — a 50% starting charge is plenty</li>
          <li style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted, lineHeight: 1.6 }}>Longer transits: carriers CAN charge at Level 3 DC fast charging stations (requires extra coordination and may add transit time)</li>
          <li style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted, lineHeight: 1.6 }}>Customer recommendation: 50% charge at pickup, avoid full charge (battery stress during extended inactivity)</li>
        </ul>
      </Section>

      {/* Specific EV Services */}
      <Section title="EV Transport Services We Offer">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
          {[
            'Door-to-door EV delivery (all 50 states)',
            'Open transport for daily-driver EVs',
            'Enclosed transport for luxury EVs',
            'Flatbed for oversized EVs',
            'Dealer-to-customer EV delivery',
            'EV auction pickup (Copart, IAAI)',
          ].map((svc, i) => (
            <div key={i} style={{
              background: colors.bgCard,
              border: `1px solid ${colors.border}`,
              borderRadius: '12px',
              padding: '16px 20px',
              fontFamily: fonts.sans,
              fontSize: '14px',
              color: colors.text,
              lineHeight: 1.5,
            }}>
              {svc}
            </div>
          ))}
        </div>
      </Section>
    </SeoLandingPage>
  );
}
