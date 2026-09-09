import { Link } from 'react-router-dom';
import PageMeta from '../../../components/PageMeta';
import BreadcrumbSchema from '../../../components/BreadcrumbSchema';
import styles from './GuidePage.module.css';

// DESIGN-V2-W5-T06: V2 "Dispatch Board" restyle. CODEX-18 later corrected
// fee facts while preserving all heading texts, levels, and order.

// Hand-rolled FAQPage schema source (guide pages have no SeoLandingPage faqs generator).
// The visible Q&A blocks below render from these exact constants, so the schema always
// mirrors visible text 1:1. Keep question wording stable: both target ranked GSC queries.
const SNIPPET_FAQS = [
  {
    q: 'How much are Copart storage fees per day?',
    a: 'Copart publishes no national storage rate. Across the yards Y7 Logistics ships from, storage typically runs $40-$60 per day once the three-day complimentary window closes. Copart sets the exact rate per yard, so check that location\'s page. The window begins on sale day; paid storage then accrues every calendar day until the vehicle leaves. Y7 Logistics, a licensed and bonded FMCSA broker (MC #1741537), quotes transport before you bid so storage risk is priced into your bid ceiling.',
  },
  {
    q: 'Does Copart charge storage fees on weekends?',
    a: 'Yes. Weekends and holidays count toward the storage clock, including the three-day complimentary window. They do not count as business days for the payment deadline, which is three business days including sale day. A Friday win uses Saturday and Sunday on the storage timeline before Monday. Once the free window closes, paid storage accrues every calendar day until the vehicle leaves. Saturday pickup is possible at some yards, but loading usually stops earlier than the posted closing time and Sundays are closed, so tell us on the quote if a Saturday pickup matters.',
  },
];

const snippetFaqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: SNIPPET_FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

export default function CopartStorageFees() {
  return (
    <div className={styles.page}>
      <PageMeta
        title="Copart Storage Fees & Weekend Rules"
        description="Y7 sees Copart storage typically run $40-$60 per day after the free window. Weekends count, rates vary by yard, and each location page shows its fee."
        path="/copart-storage-fees"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Copart Shipping', url: '/copart-shipping' },
        { name: 'Storage Fees Guide', url: '/copart-storage-fees' },
      ]} />
      {/* Hand-rolled FAQPage (approved CONT-T01): mirrors the visible SNIPPET_FAQS blocks 1:1 */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: snippetFaqSchema }} />

      {/* Hero — board band */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
            <Link to="/" className={styles.crumbLink}>Home</Link>
            <span className={styles.crumbSep}>/</span>
            <Link to="/copart-shipping" className={styles.crumbLink}>Copart Shipping</Link>
            <span className={styles.crumbSep}>/</span>
            <span className={styles.crumbCurrent}>Storage Fees</span>
          </nav>

          <span className={styles.kicker}>Pre-bid planning guide</span>

          <h1 className={styles.h1}>
            Copart Storage Fees Explained — What Every Buyer Should Know Before Bidding
          </h1>
        </div>
      </section>

      <div className={styles.body}>
        <p className={styles.intro}>
          This guide is not about avoiding fees — it is about understanding them. Copart storage
          fees are between you and Copart; no transport broker can control when they start, how
          much they charge, or whether the free window closes before a carrier arrives. What the
          guide gives you is everything you need to plan intelligently so you factor storage risk
          into your bid price instead of discovering it after you win.
        </p>

        <div className={styles.callout}>
          <strong>Plain statement of fact:</strong> If you are shopping for a broker who will
          &quot;guarantee no storage fees,&quot; stop here — they are selling you a story. Storage
          fees depend on whether a carrier is running your lane when your gate pass issues. Any
          honest broker will tell you the same.
        </div>

        <h2 className={styles.h2}>{SNIPPET_FAQS[0].q}</h2>
        <p className={styles.p}>{SNIPPET_FAQS[0].a}</p>

        <h2 className={styles.h2}>How the free window actually works</h2>
        <p className={styles.p}>
          You win the vehicle, and Copart&apos;s three-day complimentary storage window starts on
          sale day while you pay and arrange collection. When that window closes, paid storage
          starts and continues every calendar day until the vehicle leaves, so arrange{' '}
          <Link to="/copart-shipping" className={styles.link}>Copart car transport</Link> before the
          complimentary period ends. Two details trip up first-time buyers:
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}><strong>Payment and storage use different clocks.</strong> Payment
            is due within three business days including sale day, but the vehicle is not released
            until payment clears. A wire transfer typically clears the same or next business day.
            CashierPay timing varies; allow 1-3 business days. Cashier&apos;s checks typically
            take two to three business days.</li>
          <li className={styles.listItem}><strong>Weekends and holidays count toward the storage clock.</strong>
            They do not count as business days for the payment deadline. A Friday win uses Saturday
            and Sunday on the storage timeline before Monday; after the free window closes, those
            days are charged like any other calendar day.</li>
        </ul>

        <h2 className={styles.h2}>{SNIPPET_FAQS[1].q}</h2>
        <p className={styles.p}>{SNIPPET_FAQS[1].a}</p>

        <h2 className={styles.h2}>Fee schedule by yard type</h2>
        <p className={styles.p}>
          Copart does not publish national tiers by yard type. It sets each yard&apos;s rate and shows
          it on that location&apos;s page. Use this planning view:
        </p>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Reference</th>
              <th>Storage rule</th>
              <th>Where or when it applies</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Copart rate</td>
              <td>Yard-specific</td>
              <td>Check the location page before bidding</td>
            </tr>
            <tr>
              <td>Y7 observation</td>
              <td>Typically $40-$60 per day</td>
              <td>Across the yards Y7 ships from</td>
            </tr>
            <tr>
              <td>Paid storage clock</td>
              <td>Every calendar day</td>
              <td>After the free window until the vehicle leaves</td>
            </tr>
          </tbody>
        </table>
        <p className={styles.p}>
          On a five-day paid-storage delay, Y7&apos;s observed range works out to $200-$300 for one
          vehicle. The exact total depends on the rate shown on that yard&apos;s location page. That
          is often enough to swallow an auction discount.
        </p>

        <h2 className={styles.h2}>When fees become unavoidable</h2>
        <p className={styles.p}>
          Honest about the cases where free-window pickup is not realistic:
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}><strong>International buyers</strong> — export requires consolidation
            at a warehouse, often in a different state. Multi-step logistics eat most of the free
            window even when everything goes smoothly.</li>
          <li className={styles.listItem}><strong>Remote yards</strong> — if no carrier is running that lane
            this week, dispatch can take 3-5 days even with everything else lined up.</li>
          <li className={styles.listItem}><strong>Non-running vehicles at specific yards</strong> — some yards
            have limited winch/forklift availability. Loading waits for equipment.</li>
          <li className={styles.listItem}><strong>Weekend wins</strong> — Friday payment rarely clears before
            Monday, while Saturday and Sunday have already used two days on the storage timeline.</li>
          <li className={styles.listItem}><strong>Peak export seasons</strong> — late Q4 and early Q1 see
            capacity squeezes in Northeast and Florida.</li>
        </ul>

        <h2 className={styles.h2}>5 practical steps to minimize (not eliminate) risk</h2>
        <ol className={styles.list}>
          <li className={styles.listItem}><strong>Quote transport before bidding.</strong> The single most
            important step. If the lane looks tight, factor expected storage days into your bid
            ceiling. Winning $200 under budget and then paying $250 in storage is not a win.</li>
          <li className={styles.listItem}><strong>Pay by wire the same day.</strong> Every hour of payment
            delay reduces the time available to arrange collection. CashierPay timing varies;
            allow 1-3 business days. Cashier&apos;s checks typically take two to three.</li>
          <li className={styles.listItem}><strong>Confirm carrier availability in that specific lane first.</strong>
            Your broker knows which lanes have trucks running weekly vs which are a 3-5 day wait.
            That intel should drive whether you bid or skip this lot.</li>
          <li className={styles.listItem}><strong>Avoid Friday or pre-holiday wins when schedule matters.</strong>
            Weekends count toward the storage clock whether anyone is working or not.</li>
          <li className={styles.listItem}><strong>Be flexible on delivery address if speed matters.</strong> A
            nearby hub or warehouse drop-off can accept carriers that a residential-only delivery
            cannot.</li>
        </ol>

        <h2 className={styles.h2}>What brokers can and cannot do — honestly</h2>
        <h3 className={styles.h3}>We can:</h3>
        <ul className={styles.list}>
          <li className={styles.listItem}>Work to dispatch a carrier as fast as market conditions allow.</li>
          <li className={styles.listItem}>Give you a realistic pre-bid timeline for your specific lane.</li>
          <li className={styles.listItem}>Flag tight-lane situations before you commit.</li>
          <li className={styles.listItem}>Rebook quickly if a dispatch falls through.</li>
          <li className={styles.listItem}>Reach carriers outside Copart&apos;s Transporter App network via
            Central Dispatch.</li>
        </ul>
        <h3 className={styles.h3}>We cannot:</h3>
        <ul className={styles.list}>
          <li className={styles.listItem}>Guarantee pickup within the free window.</li>
          <li className={styles.listItem}>Control carrier schedules or route availability.</li>
          <li className={styles.listItem}>Speed up Copart payment clearing times.</li>
          <li className={styles.listItem}>Influence Copart&apos;s fee structure or yard appointment systems.</li>
          <li className={styles.listItem}>Force a driver into a yard that is hours off their route.</li>
        </ul>

        <h2 className={styles.h2}>A real cost example</h2>
        <p className={styles.p}>
          Monday: you win a 2018 Tesla Model 3 at Copart LA for $18,400. You pay immediately by
          CashierPay; timing varies, so assume payment clears Wednesday. Thursday the gate pass
          issues. The Phoenix lane is not a weekly carrier run, so dispatch takes until the following
          Tuesday and pickup is Wednesday afternoon. The complimentary window ran Monday through
          Wednesday. Paid storage ran Thursday through pickup Wednesday, seven calendar days. At
          the $40-$60 per-day range Y7 typically sees, that is $280-$420; check the Copart LA
          location page for the exact rate.
        </p>
        <p className={styles.p}>
          Had you budgeted zero storage and assumed free-window pickup (because that is what the
          broker&apos;s ad copy suggested), the $280-$420 surprise might reframe the whole deal.
        </p>

        <h2 className={styles.h2}>The quote-before-bidding workflow</h2>
        <p className={styles.p}>
          Simplest version: the morning of the auction, ping us with the lot number and your
          delivery ZIP. We come back with a realistic transport quote, typical dispatch window for
          that lane, and a note if the lane looks tight. You bid with the full picture.
        </p>
        <p className={styles.p}>
          <Link to="/quote" className={styles.link}>Start a pre-bid quote →</Link>
        </p>

        <h2 className={styles.h2}>Related</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}><Link to="/blog/copart-storage-fees-real-cost-2026" className={styles.link}>The 2026 deep-dive: what storage fees really cost buyers</Link></li>
          <li className={styles.listItem}><Link to="/copart-shipping" className={styles.link}>Plan transport from Copart</Link></li>
          <li className={styles.listItem}><Link to="/copart-gate-pass-guide" className={styles.link}>Copart gate pass guide</Link></li>
          <li className={styles.listItem}><Link to="/copart-international-shipping" className={styles.link}>Copart international shipping</Link></li>
          <li className={styles.listItem}><Link to="/auction-to-port-transport" className={styles.link}>Auction to port transport</Link></li>
        </ul>
      </div>
    </div>
  );
}
