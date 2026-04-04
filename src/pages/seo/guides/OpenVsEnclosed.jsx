import { Link } from 'react-router-dom';
import PageMeta from '../../../components/PageMeta';
import { colors, fonts, button as btnStyles } from '../../../theme';

const h2Style = {
  fontFamily: fonts.serif,
  fontSize: '22px',
  fontWeight: 700,
  color: colors.text,
  marginBottom: '16px',
  marginTop: '48px',
};

const pStyle = {
  fontFamily: fonts.sans,
  fontSize: '15px',
  color: colors.textMuted,
  lineHeight: 1.7,
  marginBottom: '16px',
};

const liStyle = {
  fontFamily: fonts.sans,
  fontSize: '14px',
  color: colors.textMuted,
  lineHeight: 1.7,
  marginBottom: '8px',
};

export default function OpenVsEnclosed() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 24px 80px' }}>
      <PageMeta
        title="Open vs Enclosed Auto Transport: Which Is Right? | Y7 Logistics"
        description="Compare open and enclosed auto transport. Cost differences, risk factors, and when to choose each option. Expert guide from Y7 Logistics."
        path="/open-vs-enclosed-auto-transport"
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" style={{
        fontFamily: fonts.sans, fontSize: '13px', color: colors.textMuted,
        marginBottom: '24px',
      }}>
        <Link to="/" style={{ color: colors.textMuted }}>Home</Link>
        <span style={{ margin: '0 6px' }}>/</span>
        <Link to="/services" style={{ color: colors.textMuted }}>Services</Link>
        <span style={{ margin: '0 6px' }}>/</span>
        <span style={{ color: colors.text }}>Open vs Enclosed Auto Transport</span>
      </nav>

      {/* H1 */}
      <h1 style={{
        fontFamily: fonts.serif,
        fontSize: 'clamp(28px, 4vw, 40px)',
        fontWeight: 700,
        color: colors.text,
        marginBottom: '16px',
        lineHeight: 1.2,
      }}>
        Open vs Enclosed Auto Transport: Which Is Right for Your Vehicle?
      </h1>

      {/* Intro */}
      <p style={{ ...pStyle, fontSize: '16px', marginBottom: '48px' }}>
        When shipping a vehicle, one of the first decisions you need to make is whether to use open or enclosed transport. Both methods are safe and widely used, but they differ in cost, protection level, and availability. This guide breaks down the key differences so you can make an informed choice based on your vehicle's value, your budget, and your priorities.
      </p>

      {/* What Is Open Transport */}
      <h2 style={h2Style}>What Is Open Auto Transport?</h2>
      <p style={pStyle}>
        Open auto transport is the most common method of vehicle shipping in the United States. If you have ever seen a multi-car carrier on the highway loaded with vehicles on an exposed trailer, that is open transport. These carriers typically hold 7-10 vehicles at a time, arranged on two levels of an open steel frame.
      </p>
      <p style={pStyle}>
        Open carriers are the workhorses of the auto transport industry. The vast majority of vehicles shipped in the US, including brand-new cars delivered from factories to dealerships, travel on open carriers. The vehicles are securely strapped to the trailer using wheel nets and tie-downs, but they are exposed to the elements during transit. This means they can encounter road spray, dust, minor debris, and weather conditions along the route.
      </p>
      <p style={pStyle}>
        The primary advantage of open transport is cost and availability. Because open carriers are far more common than enclosed ones, scheduling is faster and prices are lower. For most vehicles, open transport is the practical and cost-effective choice.
      </p>

      {/* What Is Enclosed Transport */}
      <h2 style={h2Style}>What Is Enclosed Auto Transport?</h2>
      <p style={pStyle}>
        Enclosed auto transport uses a fully covered trailer that protects vehicles from all external elements during transit. There are two types: hard-side enclosed trailers, which have solid metal walls and a roof, and soft-side enclosed trailers, which use heavy-duty fabric or vinyl covers over a metal frame.
      </p>
      <p style={pStyle}>
        Enclosed carriers typically hold 2-6 vehicles, significantly fewer than open carriers. Many enclosed trailers feature hydraulic lift gates for low-clearance vehicles, climate control options, and premium tie-down systems. The vehicles inside are completely shielded from road debris, weather, dust, and UV exposure.
      </p>
      <p style={pStyle}>
        Enclosed transport is the premium option in auto shipping. It is the method of choice for high-value, collectible, and exotic vehicles where maximum protection is non-negotiable. The trade-off is higher cost and potentially longer scheduling times due to fewer available carriers.
      </p>

      {/* Cost Comparison */}
      <h2 style={h2Style}>Cost Comparison</h2>
      <p style={pStyle}>
        The price difference between open and enclosed transport is significant. As a general rule, enclosed transport costs 40-60% more than open transport for the same route. For example, if an open transport quote for a cross-country shipment is $1,000, the enclosed equivalent would typically range from $1,400 to $1,600.
      </p>
      <p style={pStyle}>
        Several factors drive this price difference. Enclosed carriers hold fewer vehicles, so the carrier needs to charge more per vehicle to cover operating costs. Enclosed trailers are more expensive to purchase and maintain. And the specialized nature of the service means fewer carriers offer it, reducing competition. The higher price is directly tied to the additional protection and care your vehicle receives.
      </p>
      <div style={{
        background: colors.bgMuted,
        borderRadius: '16px',
        padding: '24px 32px',
        marginBottom: '16px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', borderBottom: `1px solid ${colors.border}`, paddingBottom: '12px' }}>
          <span style={{ fontFamily: fonts.sans, fontSize: '14px', fontWeight: 600, color: colors.text }}>Factor</span>
          <div style={{ display: 'flex', gap: '40px' }}>
            <span style={{ fontFamily: fonts.sans, fontSize: '14px', fontWeight: 600, color: colors.text, width: '80px', textAlign: 'center' }}>Open</span>
            <span style={{ fontFamily: fonts.sans, fontSize: '14px', fontWeight: 600, color: colors.text, width: '80px', textAlign: 'center' }}>Enclosed</span>
          </div>
        </div>
        {[
          ['Price', 'Lower', 'Higher (+40-60%)'],
          ['Availability', 'High', 'Limited'],
          ['Capacity', '7-10 cars', '2-6 cars'],
          ['Weather protection', 'None', 'Full'],
          ['Debris protection', 'None', 'Full'],
          ['Scheduling speed', 'Faster', 'Slower'],
        ].map(([label, open, enclosed], i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 5 ? `1px solid ${colors.border}` : 'none' }}>
            <span style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted }}>{label}</span>
            <div style={{ display: 'flex', gap: '40px' }}>
              <span style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted, width: '80px', textAlign: 'center' }}>{open}</span>
              <span style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted, width: '80px', textAlign: 'center' }}>{enclosed}</span>
            </div>
          </div>
        ))}
      </div>

      {/* When to Choose Open */}
      <h2 style={h2Style}>When to Choose Open Transport</h2>
      <p style={pStyle}>
        Open transport is the right choice for the majority of vehicle shipments. Consider open transport when:
      </p>
      <ul style={{ paddingLeft: '20px', marginBottom: '24px' }}>
        <li style={liStyle}><strong>You are shipping a daily driver.</strong> Standard sedans, SUVs, trucks, and minivans are perfectly suited for open transport. These vehicles are designed to handle normal road conditions, and the minimal exposure during transport is no different from driving them on the highway.</li>
        <li style={liStyle}><strong>You are budget-conscious.</strong> If cost is a primary concern, open transport delivers the same reliable A-to-B service at a significantly lower price point.</li>
        <li style={liStyle}><strong>You need fast scheduling.</strong> Open carriers are far more common, so your vehicle can typically be picked up sooner. This is especially important for auction vehicles where storage fees are accruing.</li>
        <li style={liStyle}><strong>You are a dealer moving inventory.</strong> Dealers shipping multiple standard vehicles will find open transport to be the most cost-effective and efficient option.</li>
        <li style={liStyle}><strong>You are shipping an auction or salvage vehicle.</strong> For vehicles that already have existing damage or are destined for rebuild, the premium of enclosed transport is rarely justified.</li>
      </ul>

      {/* When to Choose Enclosed */}
      <h2 style={h2Style}>When to Choose Enclosed Transport</h2>
      <p style={pStyle}>
        Enclosed transport is the right choice when the value of the vehicle justifies the additional cost. Consider enclosed transport when:
      </p>
      <ul style={{ paddingLeft: '20px', marginBottom: '24px' }}>
        <li style={liStyle}><strong>Your vehicle is worth $50,000 or more.</strong> At this value threshold, the additional cost of enclosed transport is a small percentage of the vehicle's worth and provides meaningful peace of mind.</li>
        <li style={liStyle}><strong>You are shipping a classic or vintage vehicle.</strong> Classic cars often have original paint, chrome, and trim that are irreplaceable. Even minor road debris damage could require expensive specialist restoration work.</li>
        <li style={liStyle}><strong>You own an exotic or supercar.</strong> Ferraris, Lamborghinis, McLarens, and similar exotics deserve the maximum protection that enclosed transport provides. Many enclosed carriers also offer lift-gate loading for low-ground-clearance vehicles.</li>
        <li style={liStyle}><strong>You are transporting a show car.</strong> If the vehicle is headed to a car show, concours event, or photo shoot, it needs to arrive in pristine condition without any road dust or water spots.</li>
        <li style={liStyle}><strong>You are a dealer shipping high-end inventory.</strong> Luxury dealerships shipping vehicles to clients expect flawless delivery. Enclosed transport protects both the vehicle and the dealership's reputation.</li>
        <li style={liStyle}><strong>You are shipping a brand-new vehicle.</strong> New vehicles with factory-fresh paint are more susceptible to visible damage from road debris. If the vehicle has never been driven on public roads, enclosed transport preserves that condition.</li>
      </ul>

      {/* Risk Factors */}
      <h2 style={h2Style}>Risk Factors: How Safe Is Open Transport?</h2>
      <p style={pStyle}>
        One of the biggest concerns buyers have about open transport is the risk of damage from road debris, weather, and dust. It is important to put this risk in perspective. The actual damage rate for vehicles on open carriers is very low, estimated at less than 1% of all shipments. Most vehicles arrive at their destination in the same condition they were loaded.
      </p>
      <p style={pStyle}>
        The most common types of exposure on open carriers include road spray and water spots from rain, fine dust accumulation during transit, and very rarely, minor chips from road debris kicked up by other vehicles on the highway. Serious damage from open transport is exceedingly rare. Carriers are professionals who drive these routes daily and take precautions to protect their cargo, as damage claims directly affect their business and insurance costs.
      </p>
      <p style={pStyle}>
        That said, risk tolerance is personal. If the idea of your vehicle being exposed to any elements during a multi-day transport causes you stress, enclosed transport eliminates that concern entirely. For many owners of high-value vehicles, the peace of mind alone is worth the premium.
      </p>

      {/* Insurance */}
      <h2 style={h2Style}>Insurance Coverage</h2>
      <p style={pStyle}>
        Both open and enclosed carriers are required to carry cargo insurance. The minimum coverage requirements set by the FMCSA apply equally to both transport types. Carriers in the Y7 Logistics network carry minimum cargo insurance of $100,000 per vehicle, regardless of whether they operate open or enclosed equipment.
      </p>
      <p style={pStyle}>
        If you are shipping a vehicle worth more than the carrier's standard coverage limit, additional insurance can be arranged through your broker. This is more common with enclosed shipments of high-value vehicles. Always confirm the carrier's insurance coverage with your broker before the vehicle is loaded, and ensure the Bill of Lading accurately documents the vehicle's pre-transport condition.
      </p>

      {/* CTA */}
      <div style={{
        textAlign: 'center',
        padding: '40px 0',
        borderTop: `1px solid ${colors.border}`,
        marginTop: '48px',
      }}>
        <h2 style={{
          fontFamily: fonts.serif,
          fontSize: '22px',
          fontWeight: 700,
          color: colors.text,
          marginBottom: '8px',
        }}>
          Get a Quote for Open or Enclosed Transport
        </h2>
        <p style={{
          fontFamily: fonts.sans,
          fontSize: '14px',
          color: colors.textMuted,
          marginBottom: '24px',
          lineHeight: 1.6,
        }}>
          Y7 Logistics offers both open and enclosed auto transport with verified, insured carriers. Tell us about your vehicle and we will recommend the right option.
        </p>
        <Link to="/quote" style={{
          ...btnStyles.accent,
          display: 'inline-block',
          padding: '14px 32px',
          fontSize: '13px',
          textDecoration: 'none',
          borderRadius: '24px',
        }}>
          Get a Free Quote
        </Link>
      </div>

      {/* Related Pages */}
      <div style={{
        borderTop: `1px solid ${colors.border}`,
        paddingTop: '32px',
      }}>
        <h3 style={{
          fontFamily: fonts.sans, fontSize: '13px', fontWeight: 600, color: colors.text,
          textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '16px',
        }}>
          Related Pages
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {[
            { label: 'Car Shipping Cost', to: '/car-shipping-cost' },
            { label: 'Open Car Shipping', to: '/open-car-shipping' },
            { label: 'Enclosed Car Shipping', to: '/enclosed-car-shipping' },
            { label: 'How to Ship an Auction Car', to: '/how-to-ship-a-car-bought-at-auction' },
            { label: 'What Is a Bill of Lading?', to: '/what-is-a-bill-of-lading' },
            { label: 'Dealer Auto Transport', to: '/dealer-auto-transport' },
          ].map((link, i) => (
            <Link key={i} to={link.to} style={{
              fontFamily: fonts.sans,
              fontSize: '13px',
              color: colors.accent,
              background: colors.bgCard,
              border: `1px solid ${colors.border}`,
              borderRadius: '20px',
              padding: '8px 16px',
              textDecoration: 'none',
            }}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
