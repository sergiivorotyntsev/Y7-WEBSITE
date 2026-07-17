import { Link } from 'react-router-dom';
import PageMeta from '../../../components/PageMeta';
import styles from './GuidePage.module.css';

// DESIGN-V2-W5-T06: V2 "Dispatch Board" restyle. All heading texts/levels/
// order, copy, and comparison values are byte-identical to V1; shells +
// tokens only.

export default function OpenVsEnclosed() {
  return (
    <div className={styles.page}>
      <PageMeta
        title="Open vs Enclosed Auto Transport"
        description="Compare open and enclosed auto transport. Cost differences, risk factors, and when to choose each option. Expert guide from Y7 Logistics."
        path="/open-vs-enclosed-auto-transport"
      />

      {/* Hero — board band */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
            <Link to="/" className={styles.crumbLink}>Home</Link>
            <span className={styles.crumbSep}>/</span>
            <Link to="/services" className={styles.crumbLink}>Services</Link>
            <span className={styles.crumbSep}>/</span>
            <span className={styles.crumbCurrent}>Open vs Enclosed Auto Transport</span>
          </nav>

          <span className={styles.kicker}>Transport methods guide</span>

          {/* H1 */}
          <h1 className={styles.h1}>
            Open vs Enclosed Auto Transport: Which Is Right for Your Vehicle?
          </h1>
        </div>
      </section>

      <div className={styles.body}>
        {/* Intro */}
        <p className={styles.intro}>
          When shipping a vehicle, one of the first decisions you need to make is whether to use open or enclosed transport. Both methods are safe and widely used, but they differ in cost, protection level, and availability. This guide breaks down the key differences so you can make an informed choice based on your vehicle's value, your budget, and your priorities.
        </p>

        {/* What Is Open Transport */}
        <h2 className={styles.h2}>What Is Open Auto Transport?</h2>
        <p className={styles.p}>
          Open auto transport is the most common method of vehicle shipping in the United States. If you have ever seen a multi-car carrier on the highway loaded with vehicles on an exposed trailer, that is open transport. These carriers typically hold 7-10 vehicles at a time, arranged on two levels of an open steel frame.
        </p>
        <p className={styles.p}>
          Open carriers are the workhorses of the auto transport industry. The vast majority of vehicles shipped in the US, including brand-new cars delivered from factories to dealerships, travel on open carriers. The vehicles are securely strapped to the trailer using wheel nets and tie-downs, but they are exposed to the elements during transit. This means they can encounter road spray, dust, minor debris, and weather conditions along the route.
        </p>
        <p className={styles.p}>
          The primary advantage of open transport is cost and availability. Because open carriers are far more common than enclosed ones, scheduling is faster and prices are lower. For most vehicles, open transport is the practical and cost-effective choice.
        </p>

        {/* What Is Enclosed Transport */}
        <h2 className={styles.h2}>What Is Enclosed Auto Transport?</h2>
        <p className={styles.p}>
          Enclosed auto transport uses a fully covered trailer that protects vehicles from all external elements during transit. There are two types: hard-side enclosed trailers, which have solid metal walls and a roof, and soft-side enclosed trailers, which use heavy-duty fabric or vinyl covers over a metal frame.
        </p>
        <p className={styles.p}>
          Enclosed carriers typically hold 2-6 vehicles, significantly fewer than open carriers. Many enclosed trailers feature hydraulic lift gates for low-clearance vehicles, climate control options, and premium tie-down systems. The vehicles inside are completely shielded from road debris, weather, dust, and UV exposure.
        </p>
        <p className={styles.p}>
          Enclosed transport is the premium option in auto shipping. It is the method of choice for high-value, collectible, and exotic vehicles where maximum protection is non-negotiable. The trade-off is higher cost and potentially longer scheduling times due to fewer available carriers.
        </p>

        {/* Cost Comparison */}
        <h2 className={styles.h2}>Cost Comparison</h2>
        <p className={styles.p}>
          The price difference between open and enclosed transport is significant. As a general rule, enclosed transport costs 40-60% more than open transport for the same route. For example, if an open transport quote for a cross-country shipment is $1,000, the enclosed equivalent would typically range from $1,400 to $1,600.
        </p>
        <p className={styles.p}>
          Several factors drive this price difference. Enclosed carriers hold fewer vehicles, so the carrier needs to charge more per vehicle to cover operating costs. Enclosed trailers are more expensive to purchase and maintain. And the specialized nature of the service means fewer carriers offer it, reducing competition. The higher price is directly tied to the additional protection and care your vehicle receives.
        </p>
        <div className={styles.compare}>
          <div className={styles.compareHeader}>
            <span className={styles.compareHead}>Factor</span>
            <div className={styles.compareCols}>
              <span className={styles.compareHeadCol}>Open</span>
              <span className={styles.compareHeadCol}>Enclosed</span>
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
            <div key={i} className={i < 5 ? styles.compareRow : styles.compareRowLast}>
              <span className={styles.compareCell}>{label}</span>
              <div className={styles.compareCols}>
                <span className={styles.compareCellCol}>{open}</span>
                <span className={styles.compareCellCol}>{enclosed}</span>
              </div>
            </div>
          ))}
        </div>

        {/* When to Choose Open */}
        <h2 className={styles.h2}>When to Choose Open Transport</h2>
        <p className={styles.p}>
          Open transport is the right choice for the majority of vehicle shipments. Consider open transport when:
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}><strong>You are shipping a daily driver.</strong> Standard sedans, SUVs, trucks, and minivans are perfectly suited for open transport. These vehicles are designed to handle normal road conditions, and the minimal exposure during transport is no different from driving them on the highway.</li>
          <li className={styles.listItem}><strong>You are budget-conscious.</strong> If cost is a primary concern, open transport delivers the same reliable A-to-B service at a significantly lower price point.</li>
          <li className={styles.listItem}><strong>You need fast scheduling.</strong> Open carriers are far more common, so your vehicle can typically be picked up sooner. This is especially important for auction vehicles where storage fees are accruing.</li>
          <li className={styles.listItem}><strong>You are a dealer moving inventory.</strong> Dealers shipping multiple standard vehicles will find open transport to be the most cost-effective and efficient option.</li>
          <li className={styles.listItem}><strong>You are shipping an auction or salvage vehicle.</strong> For vehicles that already have existing damage or are destined for rebuild, the premium of enclosed transport is rarely justified.</li>
        </ul>

        {/* When to Choose Enclosed */}
        <h2 className={styles.h2}>When to Choose Enclosed Transport</h2>
        <p className={styles.p}>
          Enclosed transport is the right choice when the value of the vehicle justifies the additional cost. Consider enclosed transport when:
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}><strong>Your vehicle is worth $50,000 or more.</strong> At this value threshold, the additional cost of enclosed transport is a small percentage of the vehicle's worth and provides meaningful peace of mind.</li>
          <li className={styles.listItem}><strong>You are shipping a classic or vintage vehicle.</strong> Classic cars often have original paint, chrome, and trim that are irreplaceable. Even minor road debris damage could require expensive specialist restoration work.</li>
          <li className={styles.listItem}><strong>You own an exotic or supercar.</strong> Ferraris, Lamborghinis, McLarens, and similar exotics deserve the maximum protection that enclosed transport provides. Many enclosed carriers also offer lift-gate loading for low-ground-clearance vehicles.</li>
          <li className={styles.listItem}><strong>You are transporting a show car.</strong> If the vehicle is headed to a car show, concours event, or photo shoot, it needs to arrive in pristine condition without any road dust or water spots.</li>
          <li className={styles.listItem}><strong>You are a dealer shipping high-end inventory.</strong> Luxury dealerships shipping vehicles to clients expect flawless delivery. Enclosed transport protects both the vehicle and the dealership's reputation.</li>
          <li className={styles.listItem}><strong>You are shipping a brand-new vehicle.</strong> New vehicles with factory-fresh paint are more susceptible to visible damage from road debris. If the vehicle has never been driven on public roads, enclosed transport preserves that condition.</li>
        </ul>

        {/* Risk Factors */}
        <h2 className={styles.h2}>Risk Factors: How Safe Is Open Transport?</h2>
        <p className={styles.p}>
          One of the biggest concerns buyers have about open transport is the risk of damage from road debris, weather, and dust. It is important to put this risk in perspective. The actual damage rate for vehicles on open carriers is very low, estimated at less than 1% of all shipments. Most vehicles arrive at their destination in the same condition they were loaded.
        </p>
        <p className={styles.p}>
          The most common types of exposure on open carriers include road spray and water spots from rain, fine dust accumulation during transit, and very rarely, minor chips from road debris kicked up by other vehicles on the highway. Serious damage from open transport is exceedingly rare. Carriers are professionals who drive these routes daily and take precautions to protect their cargo, as damage claims directly affect their business and insurance costs.
        </p>
        <p className={styles.p}>
          That said, risk tolerance is personal. If the idea of your vehicle being exposed to any elements during a multi-day transport causes you stress, enclosed transport eliminates that concern entirely. For many owners of high-value vehicles, the peace of mind alone is worth the premium.
        </p>

        {/* Insurance */}
        <h2 className={styles.h2}>Insurance Coverage</h2>
        <p className={styles.p}>
          Both open and enclosed carriers in the Y7 Logistics network are required to maintain cargo insurance — typically $100,000 to $250,000 per vehicle for open carriers and $250,000 to $500,000 for enclosed transport. This is our network verification requirement, not an FMCSA regulation for non-household-goods motor carriers. We confirm active coverage through Central Dispatch before dispatching any load, regardless of whether the carrier operates open or enclosed equipment.
        </p>
        <p className={styles.p}>
          If you are shipping a vehicle worth more than the carrier's standard coverage limit, additional insurance can be arranged through your broker. This is more common with enclosed shipments of high-value vehicles. Always confirm the carrier's insurance coverage with your broker before the vehicle is loaded, and ensure the Bill of Lading accurately documents the vehicle's pre-transport condition.
        </p>

        {/* CTA — the page's one closing board moment */}
        <div className={styles.ctaBlock}>
          <h2 className={styles.ctaTitle}>
            Get a Quote for Open or Enclosed Transport
          </h2>
          <p className={styles.ctaSubtitle}>
            Y7 Logistics offers both open and enclosed auto transport with verified, insured carriers. Tell us about your vehicle and we will recommend the right option.
          </p>
          <Link to="/quote" className={styles.ctaBtn}>
            Get a Free Quote
          </Link>
        </div>

        {/* Related Pages */}
        <div className={styles.relatedBlock}>
          <h3 className={styles.relatedHeading}>
            Related Pages
          </h3>
          <div className={styles.relatedPills}>
            {[
              { label: 'Car Shipping Cost', to: '/car-shipping-cost' },
              { label: 'Open Car Shipping', to: '/open-car-shipping' },
              { label: 'Enclosed Car Shipping', to: '/enclosed-car-shipping' },
              { label: 'How to Ship an Auction Car', to: '/how-to-ship-a-car-bought-at-auction' },
              { label: 'What Is a Bill of Lading?', to: '/what-is-a-bill-of-lading' },
              { label: 'Dealer Auto Transport', to: '/dealer-auto-transport' },
            ].map((link, i) => (
              <Link key={i} to={link.to} className={styles.relatedPill}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
