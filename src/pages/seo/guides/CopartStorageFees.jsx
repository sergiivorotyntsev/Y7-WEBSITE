import { Link } from 'react-router-dom';
import PageMeta from '../../../components/PageMeta';
import BreadcrumbSchema from '../../../components/BreadcrumbSchema';
import { colors, fonts } from '../../../theme';

const h2Style = {
  fontFamily: fonts.serif,
  fontSize: '22px',
  fontWeight: 700,
  color: colors.text,
  marginBottom: '16px',
  marginTop: '48px',
};

const h3Style = {
  fontFamily: fonts.serif,
  fontSize: '17px',
  fontWeight: 700,
  color: colors.text,
  marginBottom: '10px',
  marginTop: '28px',
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
  fontSize: '15px',
  color: colors.textMuted,
  lineHeight: 1.7,
  marginBottom: '8px',
};

const noteStyle = {
  background: colors.bgMuted,
  borderLeft: `3px solid ${colors.accent}`,
  padding: '16px 20px',
  borderRadius: '6px',
  fontFamily: fonts.sans,
  fontSize: '14.5px',
  color: colors.text,
  lineHeight: 1.7,
  margin: '16px 0 24px',
};

const linkStyle = { color: colors.accent, textDecoration: 'none', fontWeight: 600, borderBottom: `1px solid ${colors.accent}` };

const tableStyle = { width: '100%', borderCollapse: 'collapse', fontFamily: fonts.sans, fontSize: '14px', margin: '12px 0 24px' };
const thStyle = { textAlign: 'left', padding: '10px 12px', borderBottom: `2px solid ${colors.border}`, background: colors.bgMuted, fontWeight: 700, color: colors.text };
const tdStyle = { padding: '10px 12px', borderBottom: `1px solid ${colors.border}`, color: colors.textMuted };

export default function CopartStorageFees() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 24px 80px' }}>
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

      <nav aria-label="Breadcrumb" style={{ fontFamily: fonts.sans, fontSize: '13px', color: colors.textMuted, marginBottom: '24px' }}>
        <Link to="/" style={{ color: colors.textMuted }}>Home</Link>
        <span style={{ margin: '0 6px' }}>/</span>
        <Link to="/copart-shipping" style={{ color: colors.textMuted }}>Copart Shipping</Link>
        <span style={{ margin: '0 6px' }}>/</span>
        <span style={{ color: colors.text }}>Storage Fees</span>
      </nav>

      <h1 style={{ fontFamily: fonts.serif, fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, color: colors.text, marginBottom: '16px', lineHeight: 1.2 }}>
        Copart Storage Fees Explained — What Every Buyer Should Know Before Bidding
      </h1>

      <p style={{ ...pStyle, fontSize: '16px', marginBottom: '24px', color: colors.text }}>
        This guide is not about avoiding fees — it is about understanding them. Copart storage
        fees are between you and Copart; no transport broker can control when they start, how
        much they charge, or whether the free window closes before a carrier arrives. What the
        guide gives you is everything you need to plan intelligently so you factor storage risk
        into your bid price instead of discovering it after you win.
      </p>

      <div style={noteStyle}>
        <strong>Plain statement of fact:</strong> If you are shopping for a broker who will
        &quot;guarantee no storage fees,&quot; stop here — they are selling you a story. Storage
        fees depend on whether a carrier is running your lane when your gate pass issues. Any
        honest broker will tell you the same.
      </div>

      <h2 style={h2Style}>How the free window actually works</h2>
      <p style={pStyle}>
        Most Copart yards give a three-business-day free window after payment clears. Two
        details trip up first-time buyers:
      </p>
      <ul style={pStyle}>
        <li style={liStyle}><strong>&quot;After payment clears&quot;</strong> is not the same as
          &quot;after you pay.&quot; A wire transfer typically clears same-day or next-day.
          CashierPay and cashier&apos;s checks take two to three business days. If you paid
          Friday by cashier&apos;s check, the clock might not even start until Tuesday.</li>
        <li style={liStyle}><strong>Weekends and holidays do not count as business days for
          the free window</strong> — but the yard still charges storage fees on those days once
          the free window has expired. Friday win → Tuesday gate pass → Friday free-window end
          → Monday pickup = two days of storage fees accrued over the weekend.</li>
      </ul>

      <h2 style={h2Style}>Fee schedule by yard type</h2>
      <p style={pStyle}>
        Rates are yard-specific. Typical daily charges:
      </p>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Yard type</th>
            <th style={thStyle}>Daily storage fee</th>
            <th style={thStyle}>Example markets</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>Rural / low-volume</td>
            <td style={tdStyle}>$20-$25</td>
            <td style={tdStyle}>Smaller state yards, rural Plains/Mountain West</td>
          </tr>
          <tr>
            <td style={tdStyle}>Suburban / mid-volume</td>
            <td style={tdStyle}>$25-$35</td>
            <td style={tdStyle}>Most US locations</td>
          </tr>
          <tr>
            <td style={tdStyle}>Urban / high-volume</td>
            <td style={tdStyle}>$35-$40+</td>
            <td style={tdStyle}>LA, Miami, Newark, NYC metro, Chicago</td>
          </tr>
        </tbody>
      </table>
      <p style={pStyle}>
        On a 5-day delay at a California urban yard, expect $175-$200 in fees on a single
        vehicle. That is often enough to swallow an auction discount.
      </p>

      <h2 style={h2Style}>When fees become unavoidable</h2>
      <p style={pStyle}>
        Honest about the cases where free-window pickup is not realistic:
      </p>
      <ul style={pStyle}>
        <li style={liStyle}><strong>International buyers</strong> — export requires consolidation
          at a warehouse, often in a different state. Multi-step logistics eat most of the free
          window even when everything goes smoothly.</li>
        <li style={liStyle}><strong>Remote yards</strong> — if no carrier is running that lane
          this week, dispatch can take 3-5 days even with everything else lined up.</li>
        <li style={liStyle}><strong>Non-running vehicles at specific yards</strong> — some yards
          have limited winch/forklift availability. Loading waits for equipment.</li>
        <li style={liStyle}><strong>Weekend wins</strong> — Friday payment rarely clears before
          Monday, and the free window has already lost two days by pickup.</li>
        <li style={liStyle}><strong>Peak export seasons</strong> — late Q4 and early Q1 see
          capacity squeezes in Northeast and Florida.</li>
      </ul>

      <h2 style={h2Style}>5 practical steps to minimize (not eliminate) risk</h2>
      <ol style={pStyle}>
        <li style={liStyle}><strong>Quote transport before bidding.</strong> The single most
          important step. If the lane looks tight, factor expected storage days into your bid
          ceiling. Winning $200 under budget and then paying $250 in storage is not a win.</li>
        <li style={liStyle}><strong>Pay by wire the same day.</strong> Every hour of payment
          delay shortens your free-window runway. CashierPay and cashier&apos;s checks add days
          you might not have.</li>
        <li style={liStyle}><strong>Confirm carrier availability in that specific lane first.</strong>
          Your broker knows which lanes have trucks running weekly vs which are a 3-5 day wait.
          That intel should drive whether you bid or skip this lot.</li>
        <li style={liStyle}><strong>Avoid Friday or pre-holiday wins when schedule matters.</strong>
          Weekends count toward the storage clock whether anyone is working or not.</li>
        <li style={liStyle}><strong>Be flexible on delivery address if speed matters.</strong> A
          nearby hub or warehouse drop-off can accept carriers that a residential-only delivery
          cannot.</li>
      </ol>

      <h2 style={h2Style}>What brokers can and cannot do — honestly</h2>
      <h3 style={h3Style}>We can:</h3>
      <ul style={pStyle}>
        <li style={liStyle}>Work to dispatch a carrier as fast as market conditions allow.</li>
        <li style={liStyle}>Give you a realistic pre-bid timeline for your specific lane.</li>
        <li style={liStyle}>Flag tight-lane situations before you commit.</li>
        <li style={liStyle}>Rebook quickly if a dispatch falls through.</li>
        <li style={liStyle}>Reach carriers outside Copart&apos;s Transporter App network via
          Central Dispatch.</li>
      </ul>
      <h3 style={h3Style}>We cannot:</h3>
      <ul style={pStyle}>
        <li style={liStyle}>Guarantee pickup within the free window.</li>
        <li style={liStyle}>Control carrier schedules or route availability.</li>
        <li style={liStyle}>Speed up Copart payment clearing times.</li>
        <li style={liStyle}>Influence Copart&apos;s fee structure or yard appointment systems.</li>
        <li style={liStyle}>Force a driver into a yard that is hours off their route.</li>
      </ul>

      <h2 style={h2Style}>A real cost example</h2>
      <p style={pStyle}>
        Monday: you win a 2018 Tesla Model 3 at Copart LA for $18,400. You pay immediately by
        CashierPay. Tuesday-Wednesday payment clears. Thursday gate pass issues. Lane to your
        Phoenix delivery is not a weekly carrier run, so dispatch takes until the following
        Tuesday. Pickup Wednesday afternoon. Free window ended Monday; storage clock has been
        running for 2 days. At $35/day that is $70. Manageable — but only because you knew
        before bidding that the lane would cost you a couple days.
      </p>
      <p style={pStyle}>
        Had you budgeted zero storage and assumed free-window pickup (because that is what the
        broker&apos;s ad copy suggested), the $70 surprise might reframe the whole deal.
      </p>

      <h2 style={h2Style}>The quote-before-bidding workflow</h2>
      <p style={pStyle}>
        Simplest version: the morning of the auction, ping us with the lot number and your
        delivery ZIP. We come back with a realistic transport quote, typical dispatch window for
        that lane, and a note if the lane looks tight. You bid with the full picture.
      </p>
      <p style={pStyle}>
        <Link to="/quote" style={linkStyle}>Start a pre-bid quote →</Link>
      </p>

      <h2 style={h2Style}>Related</h2>
      <ul style={pStyle}>
        <li style={liStyle}><Link to="/copart-shipping" style={linkStyle}>Copart shipping main page</Link></li>
        <li style={liStyle}><Link to="/copart-gate-pass-guide" style={linkStyle}>Copart gate pass guide</Link></li>
        <li style={liStyle}><Link to="/copart-international-shipping" style={linkStyle}>Copart international shipping</Link></li>
        <li style={liStyle}><Link to="/auction-to-port-transport" style={linkStyle}>Auction to port transport</Link></li>
      </ul>
    </div>
  );
}
