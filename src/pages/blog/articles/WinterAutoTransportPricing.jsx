import React from 'react';
import { Link } from 'react-router-dom';

export default function WinterAutoTransportPricing({ theme }) {
  return (
    <article>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Winter is the single most expensive season for US auto transport — not because of fuel,
        not because of carrier costs, but because of demand geometry. From October through February
        the same carrier capacity gets squeezed by snowbird migration south, dealer inventory
        rebalancing ahead of year-end, weather delays that remove trucks from rotation, and
        holiday driver slowdowns. Understanding why rates spike and when to time a shipment can
        save 20–35% on the same route.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        The Snowbird Migration Pattern
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Every fall, tens of thousands of retirees and seasonal residents move south from the
        Northeast and Upper Midwest to Florida, Arizona, and the Southwest. A chunk of them drive
        themselves, but a significant portion ship one or both household vehicles. The aggregate
        effect on open-trailer carrier capacity is enormous — the southbound lanes between
        Massachusetts, New York, New Jersey, Connecticut, Pennsylvania, and Florida run near
        capacity for four months.
      </p>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        The return migration runs April through mid-May. Northbound capacity tightens sharply during
        this window — sometimes more sharply than southbound because carriers pre-position empty
        capacity south expecting northbound loads, and the return surge doesn't distribute evenly.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        Lane-Specific Winter Pricing
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        The winter premium isn't uniform. It concentrates on specific corridors:
      </p>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        <strong>Northeast → Florida (I-95 corridor).</strong> October–January rates run
        <strong style={{ color: theme.accent }}> 15–30% above</strong> summer baseline. A Boston to
        Miami move that runs $800 in July can easily reach $1,050–$1,100 in December. Peaks hit the
        first two weeks of December and late January.
      </p>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        <strong>Florida → Northeast (return).</strong> April–early May rates spike
        <strong style={{ color: theme.accent }}> 20–35%</strong>, often more sharply than southbound.
        The peak is usually the first two weeks of April when the majority of returning snowbirds
        simultaneously book transport.
      </p>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        <strong>Midwest → Arizona/Texas (I-40 and I-10 corridors).</strong> Smaller premium —
        roughly 10–20% above baseline — because the lane has more carrier diversity and less
        concentrated demand than the East Coast snowbird route.
      </p>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        <strong>Cross-country (Northeast ↔ California).</strong> Winter premium 10–15%. Less
        seasonal because cross-country demand is driven by relocations and auction flows rather
        than snowbird migration.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        Why Capacity Tightens in Winter
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Four forces compound:
      </p>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        <strong>(1) Demand surges from snowbird flows.</strong> Seasonal customers who don't ship the
        rest of the year flood the market in October.<br />
        <strong>(2) Weather delays.</strong> Snowstorms in the Northeast and Midwest take trucks out
        of rotation. A 3-day blizzard doesn't just delay loads currently in transit — it delays
        every load behind them for 7–10 days.<br />
        <strong>(3) Holiday slowdowns.</strong> Christmas through New Year's, a significant portion
        of carriers shut down entirely or run at reduced capacity. Drivers have family obligations.
        The net effect is 2 weeks of reduced supply exactly when demand is highest.<br />
        <strong>(4) Fuel cost pass-through.</strong> Heating-fuel demand in winter can push diesel
        prices up, which carriers pass into their rates.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        How to Time Your Shipment to Save Money
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        The cheapest windows for southbound snowbird transport are September and early October (just
        before the migration wave) and late February through mid-March (after the peak, before the
        return). A mid-September Boston-to-Miami move can save 20–25% vs. the December peak for the
        same carrier on the same route.
      </p>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        For northbound returns, the cheapest windows are late May through mid-June (after the snowbird
        surge has cleared) and August–September (before fall migration starts). Snowbirds who can
        delay a return trip by two weeks from mid-April to early May often save $150–$250.
      </p>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Flexibility on pickup dates is the second-biggest savings lever. A three-day flexible window
        saves roughly 5–10% over a fixed-date booking. A seven-day window can save 15–20% because
        carriers can match your load with the cheapest matching run on the lane.
      </p>

      <div style={{ background: 'linear-gradient(135deg, rgba(15,110,86,0.06), rgba(15,110,86,0.02))', border: '1px solid rgba(15,110,86,0.15)', borderRadius: 12, padding: '20px 24px', margin: '24px 0' }}>
        <div style={{ fontWeight: 700, color: theme.success, marginBottom: 8, fontSize: '0.85rem', letterSpacing: 0.5, textTransform: 'uppercase' }}>Key Takeaway</div>
        <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.7, color: theme.text }}>
          The single biggest winter-pricing lever is timing. Shipping 2 weeks before or after the
          obvious peak saves 20–25%. Flexibility on exact pickup date saves another 10–15%. Combined,
          you can cut the winter premium roughly in half.
        </p>
      </div>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        Weather Contingencies
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        A blizzard in Pennsylvania can add 3–7 days to an I-95 transit. Carriers reroute when
        possible, hold at truck stops when necessary, and won't run through known freezing-rain
        events because the insurance implications of a multi-car loss are severe. This is not
        slippage — it's risk management. Plan for it by booking with extra buffer in your pickup
        and delivery windows.
      </p>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        If the driver decides to hold at a truck stop during a storm, your vehicle is safe — loaded
        on the trailer under insurance coverage — but it's not moving. Expect a 24–72 hour delay
        from any named winter weather event in the transit corridor.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        Enclosed vs Open in Winter
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Road-salt spray on I-95 through the Mid-Atlantic is aggressive. Late-model daily drivers
        arrive at their destination with salt film that washes off, but vehicles with sensitive
        undercarriages — classics, collectors, recently restored cars — can accumulate damage. For
        these specific cases, enclosed transport starts making sense even on short routes where
        enclosed is usually overkill.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        Case Study: NY → FL Rate Through a Full Year
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        A standard open-trailer New York to Miami move (roughly 1,250 miles) through 2025 prices:
      </p>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        January: $850. February: $780. March: $720. April: $700. May: $680. June: $650. July: $640.
        August: $660. September: $700. October: $810. November: $900. December: $920.
      </p>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Peak-to-trough spread: $280, or 44% of the low. That's real money for a customer willing to
        plan ahead two or three months.
      </p>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        If you're a snowbird planning the annual move, book 2–3 weeks ahead of your target date,
        stay flexible on the pickup window, and get quotes in September (for southbound) or March
        (for northbound) instead of two weeks before travel. See <Link to="/ship-my-car" style={{ color: theme.accent, fontWeight: 600 }}>
        our ship-my-car service</Link> for year-round pricing on the standard lanes, or the
        <Link to="/massachusetts-to-florida-car-shipping" style={{ color: theme.accent, fontWeight: 600 }}> Massachusetts
        to Florida corridor page</Link> for the dominant snowbird route specifically. Winter rates
        are high but predictable — discipline on timing turns them into a manageable expense.
      </p>
    </article>
  );
}
