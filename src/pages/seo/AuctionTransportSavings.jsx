import { Link } from 'react-router-dom';
import SeoLandingPage, { Section } from './SeoLandingPage';
import { colors, fonts } from '../../theme';

const p = {
  fontFamily: fonts.sans,
  fontSize: '14px',
  color: colors.textMuted,
  lineHeight: 1.7,
  marginBottom: '16px',
};

const strong = { color: colors.text };

// Presentational two-column comparison card (PricingRange-style; tokens from
// theme.js). Fact-based, no fabricated total — see design §7a. No priced Offer.
function AuctionVsBrokerCard() {
  return (
    <div style={{
      border: `1px solid ${colors.border}`,
      borderRadius: '16px',
      padding: '32px',
      marginBottom: '24px',
      background: colors.bgCard,
    }}>
      <style>{`
        .ats-compare-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        @media (max-width: 560px) {
          .ats-compare-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="ats-compare-grid">
        <div style={{
          background: colors.bg,
          borderRadius: '12px',
          padding: '20px 22px',
          border: `1px solid ${colors.border}`,
        }}>
          <div style={{
            fontFamily: fonts.sans,
            fontSize: '12px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: colors.textMuted,
            marginBottom: '10px',
          }}>
            Through the auction
          </div>
          <p style={{ ...p, marginBottom: 0 }}>
            The carrier&rsquo;s rate <strong style={strong}>+ the auction&rsquo;s margin</strong>{' '}
            &mdash; the avoidable cost.
          </p>
        </div>

        <div style={{
          background: colors.bg,
          borderRadius: '12px',
          padding: '20px 22px',
          border: `1px solid ${colors.border}`,
        }}>
          <div style={{
            fontFamily: fonts.sans,
            fontSize: '12px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: colors.accent,
            marginBottom: '10px',
          }}>
            Through Y7 (direct broker)
          </div>
          <p style={{ ...p, marginBottom: 0 }}>
            The <strong style={strong}>same carrier&rsquo;s market rate</strong>, itemized separately.
            Y7 fee per vehicle: dealers pay <strong style={strong}>$50</strong> with direct carrier payment or the
            dealer-only <strong style={strong}>$60</strong> price when Y7 handles it; exporters pay{' '}
            <strong style={strong}>$50</strong> with handling included; individuals pay the greater of{' '}
            <strong style={strong}>$75</strong> or 10% of the carrier price.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AuctionTransportSavings() {
  // Fee-copy binding (keep every $ figure audience-explicit):
  // dealer = $50/load when the dealer pays the carrier, $60 when Y7 pays;
  // exporter = $50/load with carrier-payment handling included and no $60 tier
  //   (TRANSPORT services/b2b_pricing.py: B2B_FLAT_FEE_CENTS / DEALER_Y7_PAYS_FEE_CENTS);
  // individual = max($75, 10% of carrier price)
  //   (TRANSPORT services/individual_pricing.py: IND_2026_FLOOR_CENTS / IND_2026_RATE).
  return (
    <SeoLandingPage
      meta={{
        title: 'Save on Auction Car Transport — Broker Direct, Skip the Markup | Y7 Logistics',
        description:
          "The auction's in-house transport quote includes its own margin. Y7 is an FMCSA broker that dispatches the same carriers directly — dealers pay the real market rate. Copart, IAA, Manheim, ADESA, ACV.",
        path: '/auction-transport-savings',
      }}
      heading="What You Save Shipping Auction Cars Broker-Direct"
      intro="When you win at Copart, IAA, Manheim, ADESA or ACV, the in-house transport quote you're offered includes the carrier's rate plus the auction's own margin. Y7 Logistics is an FMCSA-licensed auto transport broker (MC#1741537, Natick MA) that dispatches those same carriers directly, so dealers pay the real market rate plus a $50-per-vehicle dispatch fee when they pay the carrier directly, or $60 per vehicle when Y7 handles carrier payment, with no markup hidden inside the rate."
      secondaryCTA={{ intlKey: 'dealers', to: '/dealers', tone: 'teal' }}
      faqs={[
        {
          q: 'Is the auction’s in-house transport cheaper than using a broker?',
          a: 'Usually not. The auction’s in-house service is an intermediary that adds its own margin on top of the carrier’s rate. Cox Automotive — which owns Manheim — even positions its self-managed, dispatch-directly-to-carriers network as the money-saving route versus its full-service option. Independent transport companies say the same: the in-house option is usually pricier and slower.',
        },
        {
          q: 'How much do dealers save shipping auction cars through a broker?',
          a: 'It depends on the lane, so we don’t quote a blanket percentage. As an example, on a lane like New York to Boston an auction might quote around $500, while the market carrier rate is often closer to $340-360, plus our $50 dealer dispatch fee when the dealer pays the carrier directly - so a dealer typically saves at least about $100 on that move. You already know your auction’s quote; send us the lane and we’ll tell you the current market rate, and you decide.',
        },
        {
          q: 'Why does the auction’s transport quote include a markup?',
          a: 'Because every major auction earns money on transport - the quote you see is the carrier’s rate plus the auction’s cut. It’s their business model: Cox, Manheim’s parent, openly frames dispatching directly to carriers as the money-saving route. An FMCSA broker dispatches to those same carriers without the auction’s margin.',
        },
        {
          q: 'How do I know Y7 isn’t just marking up the carrier rate too?',
          a: 'With our cash-on-delivery option you pay the assigned carrier directly when the car is delivered, so you see the real carrier rate yourself - a hidden markup is impossible. Y7’s fee is separate: dealers pay $50 per vehicle when they pay the carrier directly, or the dealer-only $60 price when Y7 handles carrier payment; exporters pay $50 per vehicle with carrier-payment handling included; individual customers pay the greater of $75 or 10% of the carrier price.',
        },
        {
          q: 'How fast can you pick up an auction car?',
          a: 'It depends on the lane. Popular corridors dispatch quickly; rural or unusual routes take longer to source a carrier at a fair rate. We quote the real market rate, which is what actually gets a carrier assigned before storage fees start - an artificially low rate just sits on the board.',
        },
        {
          q: 'Do you handle Copart, IAA, Manheim, ADESA and ACV?',
          a: 'Yes - one broker for every major US auction. We coordinate the gate pass, dispatch a verified carrier through Central Dispatch, and you pay the real market rate plus a flat dispatch fee.',
        },
      ]}
      ctaLabel="Get your lane's real rate"
      ctaTo="/quote"
      related={[
        { label: 'Copart Shipping', to: '/copart-shipping' },
        { label: 'IAA Transport', to: '/iaai-transport' },
        { label: 'Manheim Transport', to: '/manheim-transport' },
        { label: 'Auction Car Shipping', to: '/auction-car-shipping' },
        { label: 'Dealer Auto Transport', to: '/dealer-auto-transport' },
      ]}
    >
      <Section title="Why the auction's quote is higher">
        <p style={p}>
          Every major auction earns money on transport &mdash; the price you see is the carrier&rsquo;s
          rate plus the auction&rsquo;s cut. It&rsquo;s their business model, not a secret. Cox
          Automotive, which owns Manheim, even frames it openly: its full-service option, Ready
          Logistics, is marketed to <strong style={strong}>&ldquo;Save time,&rdquo;</strong> while its
          self-managed network, Central Dispatch &mdash; where shippers dispatch directly to carriers
          &mdash; is positioned as the way to save money. An FMCSA broker dispatches to those same
          carriers without the auction&rsquo;s margin in the middle.
        </p>
      </Section>

      <Section title="Side by side: auction quote vs. broker direct">
        <AuctionVsBrokerCard />
        <p style={p}>
          <strong style={strong}>For example,</strong> on a lane like{' '}
          <strong style={strong}>New York &rarr; Boston</strong>, an auction might quote around{' '}
          <strong style={strong}>$500</strong>; the market carrier rate is often closer to{' '}
          <strong style={strong}>$340&ndash;360</strong>, plus our <strong style={strong}>$50 dealer fee</strong>{' '}
          when the dealer pays the carrier directly, so a dealer typically saves <strong style={strong}>at least ~$100</strong> on that
          move. <strong style={strong}>Every lane is different.</strong> Send us your route and we&rsquo;ll
          tell you the current market rate &mdash; you decide.
        </p>
        <Link
          to="/quote"
          style={{
            display: 'inline-block',
            background: colors.accent,
            color: '#fff',
            padding: '12px 28px',
            borderRadius: '20px',
            fontFamily: fonts.sans,
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
            textDecoration: 'none',
          }}
        >
          Get your lane&rsquo;s real rate
        </Link>
      </Section>

      <Section title="How Y7 keeps it honest">
        <p style={p}>
          With the dealer cash-on-delivery option, the dealer pays the assigned carrier{' '}
          <strong style={strong}>directly when the car is delivered</strong>, so the real carrier rate
          stays visible and a hidden markup is impossible. Y7&rsquo;s separate fee is{' '}
          <strong style={strong}>$50 per dealer vehicle</strong> with direct carrier payment, or{' '}
          the dealer-only <strong style={strong}>$60</strong> price when Y7 handles carrier payment;
          exporters pay <strong style={strong}>$50 per vehicle</strong> with carrier-payment handling
          included; individual customers pay the greater of <strong style={strong}>$75</strong>{' '}
          or 10% of the carrier price. The carrier rate is always itemized separately from the Y7 fee.
        </p>
      </Section>

      <Section title="Be realistic about timing">
        <p style={p}>
          Finding a good carrier at a fair rate takes a little time. Popular corridors dispatch quickly;
          rural or unusual routes take longer to source. We quote the real market rate &mdash; which is
          what actually gets a carrier assigned before storage fees start. An artificially low rate just
          sits on the load board while the clock runs.
        </p>
      </Section>
    </SeoLandingPage>
  );
}
