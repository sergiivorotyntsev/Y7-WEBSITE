import React from 'react';
import { Link } from 'react-router-dom';

export default function CopartStorageFeesRealCost({ theme }) {
  const p = { marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text };
  const h2 = { fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' };
  const link = { color: theme.accent, fontWeight: 600, textDecoration: 'none', borderBottom: `1px solid ${theme.accent}` };

  return (
    <article>
      <p style={p}>
        I&apos;ve watched this play out about a hundred times. A buyer wins a Copart lot on
        Friday afternoon and thinks they got a great deal. The complimentary window runs Friday
        through Sunday. If the car is still sitting after two paid-storage days, Monday and Tuesday,
        the $40-$60 daily range Y7 typically sees adds $80-$120 they never budgeted for. Copart
        sets the exact rate per yard and shows it on that location&apos;s page. The math on the
        &quot;great deal&quot; starts looking different fast.
      </p>

      <p style={p}>
        Here&apos;s the honest truth about Copart storage fees. I&apos;m not going to tell you
        I can make them go away — no broker can. What I can do is walk you through exactly
        how the system works so you can go into your next auction informed and not blindsided.
      </p>

      <h2 style={h2}>Wait, HOW MUCH per day?</h2>

      <p style={p}>
        Copart publishes no national storage rate. Each yard sets its own rate and shows it on
        that location&apos;s page. Across the yards Y7 ships from, storage typically runs $40-$60 per
        day once the free window closes:
      </p>
      <ul style={p}>
        <li>Y7 observation across the yards we ship from: typically $40-$60 per day</li>
        <li>Exact Copart rate: set per yard and posted on that location&apos;s page</li>
        <li>Charge period: every calendar day after the free window until the vehicle leaves</li>
      </ul>
      <p style={p}>
        These are Copart&apos;s fees, not the broker&apos;s. That distinction matters because
        every year I get buyers asking if we can waive the storage fee, discount it, eat it
        into our rate. We can&apos;t. It&apos;s not our fee. It&apos;s between you and Copart.
      </p>

      <h2 style={h2}>What counts as a &quot;business day&quot;?</h2>

      <p style={p}>
        Payment and storage use different clocks. Payment is due within three business days
        including sale day; weekends and holidays do not count as business days for that deadline.
        The three-day complimentary storage window starts on sale day and runs on calendar days.
        You win, use the window to pay and arrange collection, then paid storage starts when it
        closes and continues every calendar day until the vehicle leaves.
      </p>

      <p style={p}>
        Real example: you win Friday afternoon. You wire payment Friday afternoon. Payment
        clears Monday morning and the gate pass generates Monday noon. Friday is day one of the
        complimentary window, Saturday is day two, and Sunday is day three. Paid storage starts
        Monday and continues until the vehicle leaves. The weekend counts toward storage even
        though it does not count as business days for the payment deadline.
      </p>

      <h2 style={h2}>Why can&apos;t a broker just pick it up faster?</h2>

      <p style={p}>
        Because dispatch speed depends on variables neither the broker nor you controls:
      </p>
      <ul style={p}>
        <li>Is a carrier actually running that lane this week?</li>
        <li>Is the yard remote or easy to reach?</li>
        <li>Is the vehicle drivable or does it need special loading equipment?</li>
        <li>Is it a peak season for that region (Q4 Northeast export rush, Florida snowbird)?</li>
      </ul>
      <p style={p}>
        When conditions line up — metro yard, regular lane, running vehicle, quiet season —
        we&apos;re often dispatching inside 24-48 hours. When they don&apos;t — rural yard,
        thin carrier pool, non-running vehicle needing winch, Friday-afternoon win — it can
        take 3-5 days just to get a truck committed. That&apos;s not a broker failing;
        that&apos;s the market.
      </p>

      <p style={p}>
        Any broker who promises you free-window pickup without knowing any of that is just
        selling. The honest thing to do is look at your specific lane and tell you what
        realistic looks like, before you bid.
      </p>

      <h2 style={h2}>My situation is weird — can I avoid these?</h2>

      <p style={p}>
        Maybe. Here are the scenarios where buyers do usually avoid fees:
      </p>
      <ul style={p}>
        <li><strong>Win Monday or Tuesday at a metro yard with a popular lane.</strong>
          Payment clears Tue/Wed, gate pass issues Wed/Thu, carrier dispatched and loaded by
          Friday. Clean. This happens all the time — just not because of anything fancy the
          broker did.</li>
        <li><strong>Paying by wire same day.</strong> Every hour you shave off payment clearing
          is an hour back on the free-window clock.</li>
        <li><strong>Being flexible on delivery.</strong> If the carrier can drop at a nearby
          warehouse instead of insisting on a specific residential address, more carriers
          will take the load.</li>
      </ul>

      <p style={p}>
        Scenarios where you <em>are</em> going to pay storage, honestly:
      </p>
      <ul style={p}>
        <li>Remote yard + long delivery distance</li>
        <li>Friday afternoon wins with CashierPay payment</li>
        <li>Non-running exotic or commercial vehicle needing specialized equipment</li>
        <li>International buyers — consolidation warehouse steps eat most of the window</li>
      </ul>

      <h2 style={h2}>What does a real storage-fee disaster look like?</h2>

      <p style={p}>
        I had a buyer last year win a salvage Lexus at Copart LA for $14,200. Great price on
        paper. He paid by CashierPay Friday (took until Tuesday to clear). Gate pass Wednesday.
        He&apos;d bid without quoting transport first. LA-to-Austin isn&apos;t a weekly lane
        for the carriers he was used to. Dispatch took until the following Monday. Pickup
        Wednesday afternoon, twelve calendar days after the Friday win.
      </p>

      <p style={p}>
        The complimentary window ran Friday through Sunday. Paid storage then ran ten calendar
        days, Monday through the Wednesday pickup. At the $40-$60 daily range Y7 typically sees,
        that is $400-$600; the exact amount comes from the Copart LA location page. It was a cost
        he never saw coming. The &quot;great price&quot; still held up fine on the Lexus, but the storage
        bill pointedly reframed what he thought he&apos;d saved.
      </p>

      <h2 style={h2}>The pre-bid quote that saves you</h2>

      <p style={p}>
        The single best defense against storage-fee surprise is the easiest thing in the
        world: ask for a transport quote <em>before</em> you bid. Lot number and delivery ZIP,
        that&apos;s it. We come back with real pricing and a realistic dispatch window for
        that specific lane. You bid knowing if the lane&apos;s tight or loose. If it&apos;s
        tight and free-window pickup looks unlikely, you factor 3-5 days of storage into the
        bid ceiling. Suddenly the auction discount is what it is, not what you hoped.
      </p>

      <h2 style={h2}>5 things I tell every new auction buyer</h2>

      <ol style={p}>
        <li><strong>Quote transport before bidding.</strong> Not optional. This is the step
          that separates experienced auction buyers from panicked ones.</li>
        <li><strong>Pay by wire, same day.</strong> CashierPay timing varies; allow 1-3
          business days. Cashier&apos;s checks typically take two to three.</li>
        <li><strong>Check which lanes have weekly trucks running them.</strong> Your broker
          knows. Rural yards are not all bad, but they are not all equal either.</li>
        <li><strong>Avoid Friday wins if schedule matters.</strong> Weekends count toward the
          storage clock, but not as business days for the payment deadline.</li>
        <li><strong>Budget 3-5 days of storage even when you think the lane&apos;s clean.</strong>
          That way surprise is a pleasant one, not a painful one.</li>
      </ol>

      <p style={p}>
        Storage fees are what they are. They exist because Copart needs to clear inventory and
        can&apos;t let cars park forever for free. Understanding them is the whole job. If
        you want to run the math on a specific lot before you bid, hit the{' '}
        <Link to="/quote" style={link}>quote form</Link>, see the full{' '}
        <Link to="/copart-storage-fees" style={link}>Copart storage fees guide</Link>, or check
        where the rest of the budget goes in the{' '}
        <Link to="/auction-transport-savings" style={link}>auction transport savings breakdown</Link>.
      </p>
    </article>
  );
}
