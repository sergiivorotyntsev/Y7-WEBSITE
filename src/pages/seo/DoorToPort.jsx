import SeoLandingPage from './SeoLandingPage';

export default function DoorToPort() {
  return (
    <SeoLandingPage
      meta={{
        title: 'Door-to-Port Auto Transport — Vehicle Delivery to US Ports | Y7 Logistics',
        description:
          'Transport vehicles from anywhere in the US to major export ports. Newark, Houston, Savannah, LA, Baltimore, Jacksonville. Y7 Logistics.',
        path: '/door-to-port-auto-transport',
      }}
      heading="Door-to-Port Auto Transport — Vehicle Delivery to US Ports"
      intro="Y7 Logistics delivers vehicles from any US location to major export ports. Whether you're an exporter shipping overseas or need port-side delivery for any reason, we coordinate the entire domestic leg — from your door to the port warehouse."
      whenNeeded={[
        'Exporting a vehicle overseas',
        'Shipping auction purchase to port for export',
        'Dealer sending inventory to port',
        'Relocating vehicle for international shipping',
        'Consolidating multiple vehicles at port',
      ]}
      steps={[
        { title: 'Provide vehicle and port details', desc: 'Tell us what you are shipping and which port it needs to reach.' },
        { title: 'We quote the door-to-port route', desc: 'You receive a competitive quote for the full domestic transport leg.' },
        { title: 'Carrier assigned for your route', desc: 'A verified carrier is matched to your origin-to-port route.' },
        { title: 'Vehicle picked up from origin', desc: 'Carrier picks up from your home, dealership, auction yard, or other location.' },
        { title: 'Delivered to port warehouse or designated facility', desc: 'Vehicle arrives at the specific port warehouse or facility you specify.' },
      ]}
      requirements={[
        'Vehicle details',
        'Origin address',
        'Destination port',
        'Target delivery date',
        'Warehouse/facility name at port (if applicable)',
        'Any export documentation needs',
      ]}
      capabilities={[
        'All 6 major US export ports',
        'Auction-to-port service',
        'Multi-vehicle consolidation',
        'Warehouse delivery coordination',
        'Flexible scheduling for vessel dates',
        'Open and enclosed transport',
      ]}
      faqs={[
        {
          q: 'Which ports do you deliver to?',
          a: 'Newark NJ, Houston TX, Savannah GA, Los Angeles CA, Baltimore MD, Jacksonville FL — plus others on request.',
        },
        {
          q: 'Can you pick up from an auction and deliver to port?',
          a: 'Yes, auction-to-port is one of our most popular services for exporters. We handle the full chain from auction yard to port warehouse.',
        },
        {
          q: 'Do you handle export paperwork?',
          a: 'We handle the domestic transport leg. For export documentation such as title processing and customs filings, work with your freight forwarder.',
        },
        {
          q: 'How do you coordinate with port warehouses?',
          a: 'We deliver to the specific warehouse or facility you designate, coordinating delivery windows to align with your schedule and vessel dates.',
        },
        {
          q: 'Can you deliver multiple vehicles to the same port?',
          a: 'Yes, we offer multi-vehicle discounts for port consolidation. Whether it is 2 vehicles or 20, we coordinate efficient delivery.',
        },
      ]}
      ctaLabel="Get a Quote"
      ctaTo="/quote"
      related={[
        { label: 'Port Newark', to: '/ports/newark' },
        { label: 'Port Houston', to: '/ports/houston' },
        { label: 'Port Savannah', to: '/ports/savannah' },
        { label: 'Port Los Angeles', to: '/ports/los-angeles' },
        { label: 'For Exporters', to: '/exporters' },
        { label: 'Auction Shipping', to: '/auction-car-shipping' },
        { label: 'Get a Quote', to: '/quote' },
      ]}
    />
  );
}
