import { Link } from 'react-router-dom';
import PageMeta from '../../../components/PageMeta';
import BreadcrumbSchema from '../../../components/BreadcrumbSchema';
import styles from './GuidePage.module.css';

// DESIGN-V2-W5-T06: V2 "Dispatch Board" restyle. All heading texts/levels/
// order, copy, table values, and the FAQPage schema source are byte-identical
// to V1; shells + tokens only.

// Hand-rolled FAQPage schema source (guide pages have no SeoLandingPage faqs generator).
// The visible Q&A blocks below render from these exact constants, so the schema always
// mirrors visible text 1:1. Keep question wording stable: both target ranked GSC queries.
const SNIPPET_FAQS = [
  {
    q: 'How much are Copart storage fees per day?',
    a: 'Copart storage fees typically run $20 to $40 per day, set by each yard: roughly $20-$25 at rural yards, $25-$35 at most suburban locations, and $35-$40 and up at high-volume urban yards like LA, Miami, and Newark. Most yards give a three-business-day free window after payment clears; once it expires, storage accrues every calendar day. Y7 Logistics, a licensed and bonded FMCSA broker (MC #1741537), quotes transport before you bid so storage risk is priced into your bid ceiling.',
  },
  {
    q: 'Does Copart charge storage fees on weekends?',
    a: 'Yes. Once the free window has expired, Copart charges storage for every calendar day, weekends and holidays included. Weekends only pause the count while the free window is still running, because the free window counts business days. A Friday free-window expiry followed by a Monday pickup adds two weekend days of storage at the yard’s daily rate. Saturday pickup is possible at some yards, but loading usually stops earlier than the posted closing time and Sundays are closed, so tell us on the quote if a Saturday pickup matters.',
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
        title="Copart Storage Fees Explained — Planning Guide Before You Bid"
        description="How Copart storage fees work: free window rules, fee schedule by yard, weekend counting, and what brokers can (and cannot) do. Honest pre-bid planning guide."
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
          Most Copart yards give a three-business-day free window after payment clears. Two
          details trip up first-time buyers:
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}><strong>&quot;After payment clears&quot;</strong> is not the same as
            &quot;after you pay.&quot; A wire transfer typically clears same-day or next-day.
            CashierPay and cashier&apos;s checks take two to three business days. If you paid
            Friday by cashier&apos;s check, the clock might not even start until Tuesday.</li>
          <li className={styles.listItem}><strong>Weekends and holidays do not count as business days for
            the free window</strong> — but the yard still charges storage fees on those days once
            the free window has expired. Friday win → Tuesday gate pass → Friday free-window end
            → Monday pickup = two days of storage fees accrued over the weekend.</li>
        </ul>

        <h2 className={styles.h2}>{SNIPPET_FAQS[1].q}</h2>
        <p className={styles.p}>{SNIPPET_FAQS[1].a}</p>

        <h2 className={styles.h2}>Fee schedule by yard type</h2>
        <p className={styles.p}>
          Rates are yard-specific. Typical daily charges:
        </p>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Yard type</th>
              <th>Daily storage fee</th>
              <th>Example markets</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Rural / low-volume</td>
              <td>$20-$25</td>
              <td>Smaller state yards, rural Plains/Mountain West</td>
            </tr>
            <tr>
              <td>Suburban / mid-volume</td>
              <td>$25-$35</td>
              <td>Most US locations</td>
            </tr>
            <tr>
              <td>Urban / high-volume</td>
              <td>$35-$40+</td>
              <td>LA, Miami, Newark, NYC metro, Chicago</td>
            </tr>
          </tbody>
        </table>
        <p className={styles.p}>
          On a 5-day delay at a California urban yard, expect $175-$200 in fees on a single
          vehicle. That is often enough to swallow an auction discount.
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
            Monday, and the free window has already lost two days by pickup.</li>
          <li className={styles.listItem}><strong>Peak export seasons</strong> — late Q4 and early Q1 see
            capacity squeezes in Northeast and Florida.</li>
        </ul>

        <h2 className={styles.h2}>5 practical steps to minimize (not eliminate) risk</h2>
        <ol className={styles.list}>
          <li className={styles.listItem}><strong>Quote transport before bidding.</strong> The single most
            important step. If the lane looks tight, factor expected storage days into your bid
            ceiling. Winning $200 under budget and then paying $250 in storage is not a win.</li>
          <li className={styles.listItem}><strong>Pay by wire the same day.</strong> Every hour of payment
            delay shortens your free-window runway. CashierPay and cashier&apos;s checks add days
            you might not have.</li>
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
          CashierPay. Tuesday-Wednesday payment clears. Thursday gate pass issues. Lane to your
          Phoenix delivery is not a weekly carrier run, so dispatch takes until the following
          Tuesday. Pickup Wednesday afternoon. Free window ended Monday; storage clock has been
          running for 2 days. At $35/day that is $70. Manageable — but only because you knew
          before bidding that the lane would cost you a couple days.
        </p>
        <p className={styles.p}>
          Had you budgeted zero storage and assumed free-window pickup (because that is what the
          broker&apos;s ad copy suggested), the $70 surprise might reframe the whole deal.
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
          <li className={styles.listItem}><Link to="/copart-shipping" className={styles.link}>Copart shipping main page</Link></li>
          <li className={styles.listItem}><Link to="/copart-gate-pass-guide" className={styles.link}>Copart gate pass guide</Link></li>
          <li className={styles.listItem}><Link to="/copart-international-shipping" className={styles.link}>Copart international shipping</Link></li>
          <li className={styles.listItem}><Link to="/auction-to-port-transport" className={styles.link}>Auction to port transport</Link></li>
        </ul>
      </div>
    </div>
  );
}
