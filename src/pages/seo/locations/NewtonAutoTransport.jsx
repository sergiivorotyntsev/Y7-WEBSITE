import SeoLandingPage, { Section } from '../SeoLandingPage';

const prose = {
  fontFamily: 'system-ui, -apple-system, sans-serif',
  fontSize: '15px',
  color: '#2C2C2A',
  lineHeight: 1.75,
  margin: '0 0 16px',
};
const muted = { ...prose, color: '#4A4A46' };
const subhead = {
  fontFamily: 'Georgia, serif',
  fontSize: '1.15rem',
  fontWeight: 700,
  color: '#2C2C2A',
  margin: '24px 0 10px',
};
const tableWrap = { overflowX: 'auto', margin: '12px 0 20px' };
const table = {
  width: '100%', borderCollapse: 'collapse',
  fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: '14px',
};
const th = {
  textAlign: 'left', padding: '10px 12px',
  borderBottom: '2px solid #E5E0D8', color: '#2C2C2A', fontWeight: 700,
};
const td = { padding: '10px 12px', borderBottom: '1px solid #E5E0D8', color: '#4A4A46' };

export default function NewtonAutoTransport() {
  return (
    <SeoLandingPage
      meta={{
        title: 'Newton MA Auto Transport',
        description:
          'Licensed auto transport broker based in Newton, MA. Pickup from all Newton villages + Greater Boston. Y7 Logistics MC #1741537 / USDOT #4427359.',
        path: '/newton-auto-transport',
      }}
      primaryCTA={{ intlKey: 'shipMyCar', to: '/ship-my-car', tone: 'coral' }}
      secondaryCTA={{ intlKey: 'dealers', to: '/dealers', tone: 'teal' }}
      heading="Newton Auto Transport — Your Local Car Shipping Company"
      intro="Y7 Logistics is based in Newton, Massachusetts. Our team coordinates a nationwide auto transport brokerage from the Newton area, serving Greater Boston and the entire United States. When you work with us, you're working with a local business that understands your community and the logistics of moving vehicles in and out of this market."
      whenNeeded={[
        'Shipping a vehicle from your Newton home',
        'Receiving a car purchased out of state',
        'Sending your car to Florida or Arizona for the season',
        'Dealer transport in the Newton / Wellesley / Needham area',
        'Local business needing fleet transport',
        'Moving to Massachusetts for a new job or school',
      ]}
      steps={[
        { title: 'Request a Quote', desc: 'Online form or Telegram — mention you are local for fastest response.' },
        { title: 'Receive Pricing', desc: 'Within 1 hour during business hours, all-inclusive quote.' },
        { title: 'Confirm and Schedule', desc: 'Lock in your pickup window at your convenience.' },
        { title: 'Carrier Arrives', desc: 'Driver calls 12–24h before, picks up at your Newton address.' },
        { title: 'Vehicle Delivered', desc: 'Door-to-door delivery anywhere in the US with BOL at both ends.' },
      ]}
      requirements={[
        'Your Newton-area pickup address',
        'Vehicle year, make, and model (or VIN)',
        'Destination address or ZIP',
        'Preferred pickup window',
        'Any access notes (gated driveway, narrow street, low canopy)',
      ]}
      capabilities={[
        'Based in Newton, MA — serving the entire United States',
        'Same-day quote response for local customers',
        'Coverage across Newton + Wellesley + Needham + Waltham + Watertown + Brookline',
        'All transport types — open, enclosed, auction, port, dealer',
        'Direct relationships with Northeast corridor carriers',
        'USDOT #4427359 • MC #1741537 • FMCSA-registered broker',
      ]}
      faqs={[
        {
          q: 'How much does it cost to ship a car from Newton, MA?',
          a: 'Typical open-trailer pricing from Newton: Miami $800–$1,100 (5–7 days), Los Angeles $1,100–$1,500 (8–12 days), Houston $900–$1,200, Chicago $650–$900, Washington DC $450–$650. Rates fluctuate with season, vehicle size, and trailer type.',
        },
        {
          q: 'How long does auto transport from Newton take?',
          a: 'Transit ranges from 1–2 days to DC/NYC, 4–6 days to Florida or the Midwest, and 8–12 days cross-country to California. Pickup itself usually happens 1–5 days after your first available date once you confirm the quote.',
        },
        {
          q: 'Can a carrier pick up from my driveway in Newton?',
          a: 'Yes for most Newton streets. Narrow streets in Waban, Chestnut Hill, or Newton Highlands may require a nearby meet-up at a commercial lot. Our dispatcher flags this when we see the pickup address and offers the best option at no extra cost when possible.',
        },
        {
          q: 'What is the cheapest time to ship from Newton?',
          a: 'Shoulder seasons — mid-April to late May, and the first two weeks of November. These windows fall between snowbird (Oct–Jan) and college move-in (August) cycles, so carriers compete harder for loads and rates drop 10–20% versus peak.',
        },
        {
          q: 'Do you serve all of Newton\u2019s villages?',
          a: 'Yes — all thirteen villages including Newton Centre, Newton Corner, Newtonville, West Newton, Waban, Auburndale, Chestnut Hill, Newton Highlands, Newton Upper Falls, Newton Lower Falls, Nonantum, Thompsonville, and Oak Hill. Plus adjacent Wellesley, Brookline, Waltham, Watertown, and Needham.',
        },
        {
          q: 'Is my car insured during transport from Newton?',
          a: 'Yes. Every carrier in our Central Dispatch network carries cargo insurance — typically $100,000–$250,000 for open carriers and $250,000–$500,000 for enclosed transport. We verify active coverage before assigning any load. Your BOL at pickup and delivery is the evidence base for any claim.',
        },
      ]}
      related={[
        { label: 'Boston Car Shipping', to: '/boston-car-shipping' },
        { label: 'Massachusetts Car Shipping', to: '/massachusetts-car-shipping' },
        { label: 'MA to FL Shipping', to: '/massachusetts-to-florida-car-shipping' },
        { label: 'Ship My Car', to: '/ship-my-car' },
      ]}
    >
      <Section title="Auto Transport from Newton, Massachusetts">
        <p style={prose}>
          Newton sits 8 miles west of downtown Boston at the intersection of three of New England&apos;s
          busiest highways — I-90 (Massachusetts Turnpike) east-west, I-95 / Route 128 beltway, and
          Route 9 as the local east-west artery. That geography is why auto carriers crossing New
          England run through Newton every week, and why shipping a vehicle from here is cheaper
          and faster than from rural parts of the state.
        </p>
        <p style={muted}>
          Y7 Logistics is a licensed FMCSA auto transport broker (MC #1741537, USDOT #4427359) based
          locally in Newton. We do not own trucks — we coordinate with a vetted network of 100+
          carriers on Central Dispatch, the industry&apos;s primary load board. That means you get
          access to the full New England carrier market through a single dispatcher who knows your
          neighborhood and can fix problems when they come up.
        </p>
      </Section>

      <Section title="Why Newton Is a Strategic Transport Hub">
        <p style={prose}>
          Dense carrier frequency on the Northeast Corridor keeps Newton rates among the most
          competitive in Massachusetts. Typical open-trailer pricing from Newton to common
          destinations (pickup at a residential address, 7&ndash;10 car open carrier):
        </p>
        <div style={tableWrap}>
          <table style={table}>
            <thead>
              <tr>
                <th style={th}>Destination</th>
                <th style={th}>Distance</th>
                <th style={th}>Typical Price</th>
                <th style={th}>Transit</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={td}>Miami, FL</td><td style={td}>1,500 mi</td><td style={td}>$800&ndash;$1,100</td><td style={td}>5&ndash;7 days</td></tr>
              <tr><td style={td}>Los Angeles, CA</td><td style={td}>2,980 mi</td><td style={td}>$1,100&ndash;$1,500</td><td style={td}>8&ndash;12 days</td></tr>
              <tr><td style={td}>Houston, TX</td><td style={td}>1,800 mi</td><td style={td}>$900&ndash;$1,200</td><td style={td}>6&ndash;8 days</td></tr>
              <tr><td style={td}>Chicago, IL</td><td style={td}>980 mi</td><td style={td}>$650&ndash;$900</td><td style={td}>4&ndash;6 days</td></tr>
              <tr><td style={td}>Washington, DC</td><td style={td}>440 mi</td><td style={td}>$450&ndash;$650</td><td style={td}>2&ndash;4 days</td></tr>
              <tr><td style={td}>Atlanta, GA</td><td style={td}>1,080 mi</td><td style={td}>$700&ndash;$950</td><td style={td}>4&ndash;6 days</td></tr>
            </tbody>
          </table>
        </div>
        <p style={muted}>
          Ranges reflect season, vehicle size, and trailer type. Enclosed transport runs 40&ndash;60%
          higher than the open-trailer numbers above. Non-running vehicles add $100&ndash;$300 for
          winch or forklift loading.
        </p>
      </Section>

      <Section title="Serving the Greater Newton Area">
        <p style={prose}>
          We coordinate pickups and deliveries across all of Newton&apos;s villages:
          Newton Centre, Newton Corner, Newtonville, West Newton, Waban, Auburndale,
          Chestnut Hill, Newton Highlands, Newton Upper Falls, Newton Lower Falls,
          Nonantum, Thompsonville, and Oak Hill.
        </p>
        <p style={prose}>
          We also regularly pick up in adjacent communities that share the same carrier lanes:
          Wellesley, Brookline, Waltham, Watertown, Needham, Weston, and Wayland. If you are
          coordinating for a parent, sibling, or college student in any of these towns, we can
          route everything through one point of contact.
        </p>
      </Section>

      <Section title="How Pickup Works in Newton">
        <p style={prose}>
          Most Newton streets are wide enough for a full multi-car carrier, but some residential
          blocks in Waban, Chestnut Hill, and the Newton Highlands are narrow or have low tree
          canopy. When that is the case, our dispatcher arranges one of three options:
        </p>
        <h3 style={subhead}>Direct residential pickup</h3>
        <p style={muted}>
          If your street has normal clearance (13&apos;6&quot; minimum overhead, at least 11&apos;
          wide) and a reasonable turnaround, the carrier picks up at your driveway. The driver
          calls 12&ndash;24 hours before arrival with a two-hour window.
        </p>
        <h3 style={subhead}>Nearby meet-up</h3>
        <p style={muted}>
          For tight residential streets we arrange a meeting at a large commercial lot — commonly
          Whole Foods on Washington Street, Chestnut Hill Mall, or the commercial strip around
          Newton Corner. You drive the few blocks; the inspection and BOL signing happens there.
        </p>
        <h3 style={subhead}>Flatbed tow to main carrier</h3>
        <p style={muted}>
          In rare cases a local flatbed brings the vehicle to a staging point where the long-haul
          carrier picks it up. This adds $50&ndash;$150 but is sometimes the only option for
          inoperable vehicles on narrow streets.
        </p>
      </Section>

      <Section title="Seasonal Patterns for Newton Shippers">
        <h3 style={subhead}>Snowbird season (October &ndash; January)</h3>
        <p style={muted}>
          Southbound rates to Florida, the Carolinas, and Arizona spike 20&ndash;30% as retirees
          head south. Northbound rates from Florida in this window drop because carriers need
          paying loads to avoid deadheading back. If your schedule is flexible, ship before
          October 1st or after the New Year for the best MA-to-FL pricing.
        </p>
        <h3 style={subhead}>College move-in / move-out (May &ndash; September)</h3>
        <p style={muted}>
          Boston University, Boston College, Northeastern, MIT, Harvard, and Tufts generate
          heavy inbound and outbound car shipments around August and May. Rates into the Boston
          area during August run 10&ndash;15% higher; book two to three weeks in advance for
          the best carrier selection.
        </p>
        <h3 style={subhead}>Shoulder seasons (April &ndash; May, late October)</h3>
        <p style={muted}>
          These weeks offer the cheapest rates in either direction because carrier supply
          outpaces demand. If you can wait, shipping in mid-April or the first two weeks of
          November typically saves 10&ndash;20% versus peak windows.
        </p>
      </Section>
    </SeoLandingPage>
  );
}
