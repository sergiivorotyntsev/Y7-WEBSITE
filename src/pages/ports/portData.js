export const PORTS = {
  newark: {
    name: 'Port Newark',
    fullName: 'Port of New York and New Jersey',
    city: 'Newark', state: 'NJ', zip: '07114',
    address: 'Port Newark-Elizabeth Marine Terminal, 241 Calcutta St, Newark, NJ 07114',
    routes: [
      { from: 'Miami, FL', days: '2-3' },
      { from: 'Chicago, IL', days: '2-3' },
      { from: 'Houston, TX', days: '3-4' },
      { from: 'Los Angeles, CA', days: '5-7' },
      { from: 'Atlanta, GA', days: '2-3' },
    ],
  },
  houston: {
    name: 'Port of Houston',
    fullName: 'Port of Houston, Barbours Cut & Bayport Terminals',
    city: 'Houston', state: 'TX', zip: '77029',
    address: 'Barbours Cut Terminal, 1000 Barbours Cut Blvd, La Marque, TX 77568',
    routes: [
      { from: 'Dallas, TX', days: '1' },
      { from: 'Miami, FL', days: '2-3' },
      { from: 'Chicago, IL', days: '2-3' },
      { from: 'New York, NY', days: '3-4' },
      { from: 'Los Angeles, CA', days: '3-4' },
    ],
  },
  savannah: {
    name: 'Port of Savannah',
    fullName: 'Georgia Ports Authority \u2014 Garden City Terminal',
    city: 'Savannah', state: 'GA', zip: '31402',
    address: 'Garden City Terminal, 2 Main St, Garden City, GA 31408',
    routes: [
      { from: 'Atlanta, GA', days: '1' },
      { from: 'Miami, FL', days: '1-2' },
      { from: 'Charlotte, NC', days: '1-2' },
      { from: 'New York, NY', days: '2-3' },
      { from: 'Chicago, IL', days: '2-3' },
    ],
  },
  'los-angeles': {
    name: 'Port of Los Angeles',
    fullName: 'Port of Los Angeles \u2014 WorldCargo Terminal',
    city: 'Los Angeles', state: 'CA', zip: '90731',
    address: 'WorldCargo Terminal, 300 E Ocean Blvd, Long Beach, CA 90802',
    routes: [
      { from: 'Phoenix, AZ', days: '1' },
      { from: 'Las Vegas, NV', days: '1' },
      { from: 'San Francisco, CA', days: '1' },
      { from: 'Dallas, TX', days: '2-3' },
      { from: 'New York, NY', days: '5-7' },
    ],
  },
  baltimore: {
    name: 'Port of Baltimore',
    fullName: 'Dundalk Marine Terminal',
    city: 'Baltimore', state: 'MD', zip: '21224',
    address: 'Dundalk Marine Terminal, 2700 Broening Hwy, Baltimore, MD 21224',
    routes: [
      { from: 'Washington, DC', days: '1' },
      { from: 'Philadelphia, PA', days: '1' },
      { from: 'New York, NY', days: '1-2' },
      { from: 'Charlotte, NC', days: '1-2' },
      { from: 'Chicago, IL', days: '2-3' },
    ],
  },
  jacksonville: {
    name: 'Port of Jacksonville',
    fullName: 'JAXPORT \u2014 Blount Island Marine Terminal',
    city: 'Jacksonville', state: 'FL', zip: '32206',
    address: 'Blount Island Marine Terminal, 9620 Dave Rawls Blvd, Jacksonville, FL 32226',
    routes: [
      { from: 'Miami, FL', days: '1' },
      { from: 'Orlando, FL', days: '1' },
      { from: 'Atlanta, GA', days: '1-2' },
      { from: 'New York, NY', days: '2-3' },
      { from: 'Houston, TX', days: '2-3' },
    ],
  },
};

// Single source of truth for the port slugs. Derived from PORTS so the list
// can never drift from the data. Consumed by isTranslatable (localePaths.js),
// the prerender route list, and the sitemap generator. portData.js has no
// React/asset imports, so it is safe to import from plain Node build scripts.
export const PORT_SLUGS = Object.keys(PORTS);
