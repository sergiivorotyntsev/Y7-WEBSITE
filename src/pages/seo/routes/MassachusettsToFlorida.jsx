import SeoLandingPage from '../SeoLandingPage';
import PricingRange from '../../../components/PricingRange';

export default function MassachusettsToFlorida() {
  return (
    <SeoLandingPage
      meta={{
        title: 'Massachusetts to Florida Car Shipping',
        description:
          'Ship your car from Massachusetts to Florida. ~1,500 miles, 4-6 business days. Open and enclosed transport. Snowbird specials.',
        path: '/massachusetts-to-florida-car-shipping',
      }}
      heading="Massachusetts to Florida Car Shipping"
      intro="The Massachusetts-to-Florida corridor is one of the busiest auto transport routes in the country, driven by snowbird migration, relocations, and dealer trades. Y7 Logistics — based in Newton, MA — runs this route year-round with reliable carriers along the I-95 corridor."
      whenNeeded={[
        'Snowbird seasonal move (MA→FL in fall, FL→MA in spring)',
        'Relocating from Massachusetts to Florida',
        'Buying a vehicle from a FL dealer or private seller',
        'Sending car ahead before a move',
        'Dealer trade between MA and FL',
        'Shipping auction purchase between states',
      ]}
      steps={[
        { title: 'Request a quote', desc: 'Mention MA→FL for corridor pricing.' },
        { title: 'Receive competitive pricing', desc: 'This is a high-volume route with strong carrier availability.' },
        { title: 'Confirm and pick your transport window', desc: 'Choose your preferred pickup dates.' },
        { title: 'Carrier picks up from your Massachusetts address', desc: 'Door-to-door service from anywhere in MA.' },
        { title: 'Delivered to your Florida address', desc: 'Door-to-door delivery in 4–6 business days.' },
      ]}
      requirements={[
        'Massachusetts pickup address',
        'Florida delivery address',
        'Vehicle details',
        'Preferred pickup dates',
        'Vehicle condition',
      ]}
      capabilities={[
        '~1,500 miles via I-95 corridor',
        'Transit time 4–6 business days (open) or 5–7 days (enclosed)',
        'Popular city pairs — Boston→Miami, Boston→Orlando, Worcester→Tampa, Springfield→Fort Lauderdale',
        'Snowbird seasonal scheduling with early booking discounts',
        'Both open and enclosed transport',
        'Year-round service with winter weather contingency',
      ]}
      faqs={[
        {
          q: 'How long does it take to ship a car from MA to FL?',
          a: 'Standard open transport takes 4–6 business days. Enclosed transport may take 5–7 days due to fewer available carriers. Expedited service (2–3 days) is available at a premium.',
        },
        {
          q: 'How much does MA to FL car shipping cost?',
          a: 'Pricing varies by season, vehicle type, and transport method. The MA-FL corridor is high-volume, which keeps rates competitive. Winter southbound rates are typically higher due to snowbird demand. Request a quote for current pricing.',
        },
        {
          q: 'When should I book snowbird transport?',
          a: 'Book early — ideally 2–4 weeks before your desired pickup date. The October–December southbound rush fills carrier slots quickly. Spring return trips (March–May) also book fast.',
        },
        {
          q: 'Can you ship both ways on this route?',
          a: 'Absolutely. We run carriers on the I-95 corridor year-round in both directions. Northbound spring transport often has better pricing than southbound fall transport.',
        },
      ]}
      related={[
        { label: 'Massachusetts Car Shipping', to: '/massachusetts-car-shipping' },
        { label: 'Florida Car Shipping', to: '/florida-car-shipping' },
        { label: 'Boston Car Shipping', to: '/boston-car-shipping' },
        { label: 'Car Shipping Cost', to: '/car-shipping-cost' },
        { label: 'Get a Quote', to: '/quote' },
      ]}
    >
      <PricingRange
        routeName="Massachusetts to Florida"
        openLow={600}
        openHigh={950}
        enclosedLow={1100}
        enclosedHigh={1650}
        distance={1320}
        typicalTransitDays="3-5"
        seasonalNote="Expect 15-20% higher rates November-March due to snowbird migration."
      />
    </SeoLandingPage>
  );
}
