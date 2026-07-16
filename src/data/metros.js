// T13: metro list for the homepage rate calculator.
// Union of the V1 BaitQuote 12 metros and the metro areas represented by
// pickup points in src/data/rates/*.csv (satellite towns folded into their
// metro: Elgin->Chicago, Wilmer->Dallas, Gardena->LA, Opa Locka->Miami,
// Pennsburg->Philadelphia, Aliquippa->Pittsburgh, Caseyville->St. Louis,
// Lebanon->Nashville, Medford->NYC, Clayton->Raleigh, Fremont->SF Bay,
// Carville->Baton Rouge). zip = representative ZIP for /quote prefill
// (CSV pickup ZIP where present, metro-core ZIP otherwise).
//
// ROAD_FACTOR: road-miles / haversine-miles. V1 used 1.18; recalibrated
// against 37 known metro pairs in the ratings CSV -> median 1.12
// (p25-p75 1.108-1.178). Keeps Chicago->Newark at ~787 road miles,
// matching the shipped T12 preview band.
export const ROAD_FACTOR = 1.12;

export const METROS = [
  { name: 'Atlanta, GA',       lat: 33.7490,  lng: -84.3880,  zip: '30303' },
  { name: 'Baltimore, MD',     lat: 39.2904,  lng: -76.6122,  zip: '21230' },
  { name: 'Baton Rouge, LA',   lat: 30.4515,  lng: -91.1871,  zip: '70721' },
  { name: 'Boston, MA',        lat: 42.3601,  lng: -71.0589,  zip: '02108' },
  { name: 'Chicago, IL',       lat: 41.8781,  lng: -87.6298,  zip: '60601' },
  { name: 'Dallas, TX',        lat: 32.7767,  lng: -96.7970,  zip: '75201' },
  { name: 'Denver, CO',        lat: 39.7392,  lng: -104.9903, zip: '80202' },
  { name: 'Houston, TX',       lat: 29.7604,  lng: -95.3698,  zip: '77002' },
  { name: 'Jacksonville, FL',  lat: 30.3322,  lng: -81.6557,  zip: '32202' },
  { name: 'Los Angeles, CA',   lat: 34.0522,  lng: -118.2437, zip: '91605' },
  { name: 'Miami, FL',         lat: 25.7617,  lng: -80.1918,  zip: '33054' },
  { name: 'Nashville, TN',     lat: 36.1627,  lng: -86.7816,  zip: '37203' },
  { name: 'New York, NY',      lat: 40.7128,  lng: -74.0060,  zip: '10001' },
  { name: 'Oklahoma City, OK', lat: 35.4676,  lng: -97.5164,  zip: '73102' },
  { name: 'Philadelphia, PA',  lat: 39.9526,  lng: -75.1652,  zip: '19107' },
  { name: 'Phoenix, AZ',       lat: 33.4484,  lng: -112.0740, zip: '85004' },
  { name: 'Pittsburgh, PA',    lat: 40.4406,  lng: -79.9959,  zip: '15001' },
  { name: 'Portland, OR',      lat: 45.5152,  lng: -122.6784, zip: '97204' },
  { name: 'Raleigh, NC',       lat: 35.7796,  lng: -78.6382,  zip: '27520' },
  { name: 'San Diego, CA',     lat: 32.7157,  lng: -117.1611, zip: '92101' },
  { name: 'San Francisco, CA', lat: 37.7749,  lng: -122.4194, zip: '94538' },
  { name: 'Seattle, WA',       lat: 47.6062,  lng: -122.3321, zip: '98104' },
  { name: 'St. Louis, MO',     lat: 38.6270,  lng: -90.1994,  zip: '63101' },
  { name: 'Tucson, AZ',        lat: 32.2226,  lng: -110.9747, zip: '85701' },
];

// The six port/warehouse metros the site features (deliver-to list leads
// with these; /ports pages map 1:1).
export const PORT_METROS = [
  { name: 'Newark, NJ',       lat: 40.7357, lng: -74.1724,  zip: '07105' },
  { name: 'Houston, TX (port)', lat: 29.6658, lng: -95.0194, zip: '77571' },
  { name: 'Savannah, GA',     lat: 32.2960, lng: -81.2354,  zip: '31326' },
  { name: 'Baltimore, MD (port)', lat: 39.2624, lng: -76.5490, zip: '21226' },
  { name: 'Los Angeles, CA (port)', lat: 33.8883, lng: -118.3090, zip: '90248' },
  { name: 'Jacksonville, FL (port)', lat: 30.3852, lng: -81.6120, zip: '32226' },
];

export function haversineMiles(a, b) {
  const R = 3958.8, t = (d) => (d * Math.PI) / 180;
  const dLa = t(b.lat - a.lat), dLo = t(b.lng - a.lng);
  const x = Math.sin(dLa / 2) ** 2 + Math.cos(t(a.lat)) * Math.cos(t(b.lat)) * Math.sin(dLo / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
}

export function roadMiles(a, b) {
  return Math.round(haversineMiles(a, b) * ROAD_FACTOR);
}
