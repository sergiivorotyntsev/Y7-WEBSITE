// Topical clustering matrix for SEO landing pages.
//
// Maps each route key to 3-4 sibling SEO landings that belong to the same
// topical cluster. <RelatedGuides /> reads this matrix and renders a card
// grid near the bottom of each page, building internal cross-links between
// pages Google would otherwise see as orphans.
//
// Clusters:
//   - Auction: Copart, IAAI, Manheim, Auction-Car-Shipping, Auction-to-Port
//   - EV:      Tesla, EV-Auto, Cybertruck, EV-Port-Delivery
//   - MA loc:  Massachusetts, Boston, Newton, MA-to-FL
//   - FL loc:  Florida, MA-to-FL, NJ-to-FL
//   - Routes:  MA-FL, NJ-FL, TX-Newark, Chicago-Newark, Auction-to-Port
//   - Guides:  How-to-Ship-Auction, BOL, Open-vs-Enclosed
//
// Each link entry: { to: '/path', title: 'Card heading', description?: 'Sub-line' }

export const RELATED_GUIDES = {
  // ─── Auction cluster ───────────────────────────────────────────────────
  '/copart-shipping': [
    { to: '/iaai-transport',        title: 'IAA Auction Transport',     description: 'Pickup from IAA salvage auction yards nationwide.' },
    { to: '/manheim-transport',     title: 'Manheim Auction Transport', description: 'Dealer auction shipping with contract pricing.' },
    { to: '/auction-transport-savings', title: 'Auction Transport Savings', description: 'Where auction shipping fees actually go, and how to cut them.' },
    { to: '/how-to-ship-a-car-bought-at-auction', title: 'Auction Buyer Guide', description: 'Step-by-step from winning bid to delivery.' },
  ],
  '/iaai-transport': [
    { to: '/copart-shipping',       title: 'Copart Shipping',           description: 'Vehicle transport from Copart auctions.' },
    { to: '/manheim-transport',     title: 'Manheim Auction Transport', description: 'Dealer auction shipping with contract pricing.' },
    { to: '/salvage-car-shipping',  title: 'Salvage Car Shipping',      description: 'Inoperable and salvage vehicle transport.' },
    { to: '/auction-car-shipping',  title: 'Auction Car Shipping',      description: 'General auction pickup nationwide.' },
  ],
  '/manheim-transport': [
    { to: '/dealer-auto-transport', title: 'Dealer Auto Transport',     description: 'Volume pricing for dealerships.' },
    { to: '/copart-shipping',       title: 'Copart Shipping',           description: 'Vehicle transport from Copart auctions.' },
    { to: '/iaai-transport',        title: 'IAA Auction Transport',     description: 'Pickup from IAA salvage auction yards.' },
    { to: '/auction-car-shipping',  title: 'Auction Car Shipping',      description: 'General auction pickup nationwide.' },
  ],
  '/auction-car-shipping': [
    { to: '/copart-shipping',       title: 'Copart Shipping',           description: 'Vehicle transport from Copart auctions.' },
    { to: '/auction-transport-savings', title: 'Auction Transport Savings', description: 'Where auction shipping fees actually go, and how to cut them.' },
    { to: '/manheim-transport',     title: 'Manheim Auction Transport', description: 'Dealer auction shipping with contract pricing.' },
    { to: '/auction-to-port-transport', title: 'Auction to Port',       description: 'Auction pickup straight to a US export port.' },
  ],
  '/auction-to-port-transport': [
    { to: '/copart-shipping',       title: 'Copart Shipping',           description: 'Vehicle transport from Copart auctions.' },
    { to: '/iaai-transport',        title: 'IAA Auction Transport',     description: 'Pickup from IAA salvage auction yards.' },
    { to: '/door-to-port-auto-transport', title: 'Door-to-Port Auto Transport', description: 'Vehicle delivery to major US export ports.' },
    { to: '/auction-transport-savings', title: 'Auction Transport Savings', description: 'Where auction shipping fees actually go, and how to cut them.' },
  ],

  // SEOAI-T04: orphan rescue — savings page gets its own cluster so it both
  // receives and passes internal equity (it renders via SeoLandingPage).
  '/auction-transport-savings': [
    { to: '/auction-car-shipping',  title: 'Auction Car Shipping',      description: 'General auction pickup from any US auction.' },
    { to: '/copart-shipping',       title: 'Copart Shipping',           description: 'Vehicle transport from Copart auctions.' },
    { to: '/car-shipping-cost',     title: 'Car Shipping Cost',         description: 'How auto transport pricing works.' },
    { to: '/how-to-ship-a-car-bought-at-auction', title: 'Auction Buyer Guide', description: 'Step-by-step from winning bid to delivery.' },
  ],

  // ─── EV cluster ────────────────────────────────────────────────────────
  '/tesla-car-shipping': [
    { to: '/ev-auto-transport',     title: 'EV Auto Transport',         description: 'Specialized transport for any electric vehicle.' },
    { to: '/cybertruck-shipping',   title: 'Cybertruck Shipping',       description: 'Heavy-duty carriers for the Cybertruck.' },
    { to: '/electric-vehicle-port-delivery', title: 'EV Port Delivery', description: 'Electric vehicle delivery to US export ports.' },
    { to: '/enclosed-car-shipping', title: 'Enclosed Car Shipping',     description: 'Premium covered transport for high-value EVs.' },
  ],
  '/ev-auto-transport': [
    { to: '/tesla-car-shipping',    title: 'Tesla Car Shipping',        description: 'Specialized transport for every Tesla model.' },
    { to: '/cybertruck-shipping',   title: 'Cybertruck Shipping',       description: 'Heavy-duty carriers for the Cybertruck.' },
    { to: '/electric-vehicle-port-delivery', title: 'EV Port Delivery', description: 'Electric vehicle delivery to US export ports.' },
    { to: '/enclosed-car-shipping', title: 'Enclosed Car Shipping',     description: 'Premium covered transport for high-value EVs.' },
  ],
  '/cybertruck-shipping': [
    { to: '/tesla-car-shipping',    title: 'Tesla Car Shipping',        description: 'Specialized transport for every Tesla model.' },
    { to: '/ev-auto-transport',     title: 'EV Auto Transport',         description: 'Specialized transport for any electric vehicle.' },
    { to: '/enclosed-car-shipping', title: 'Enclosed Car Shipping',     description: 'Premium covered transport for high-value vehicles.' },
    { to: '/electric-vehicle-port-delivery', title: 'EV Port Delivery', description: 'Electric vehicle delivery to US export ports.' },
  ],
  '/electric-vehicle-port-delivery': [
    { to: '/ev-auto-transport',     title: 'EV Auto Transport',         description: 'Specialized transport for any electric vehicle.' },
    { to: '/tesla-car-shipping',    title: 'Tesla Car Shipping',        description: 'Specialized transport for every Tesla model.' },
    { to: '/door-to-port-auto-transport', title: 'Door-to-Port Auto Transport', description: 'Vehicle delivery to major US export ports.' },
    { to: '/auction-to-port-transport', title: 'Auction to Port',       description: 'Auction pickup straight to a US export port.' },
  ],

  // ─── Massachusetts location cluster ────────────────────────────────────
  '/massachusetts-car-shipping': [
    { to: '/boston-car-shipping',   title: 'Boston Car Shipping',       description: 'Auto transport from Boston to anywhere in the US.' },
    { to: '/newton-auto-transport', title: 'Newton Auto Transport',     description: 'Local Newton, MA pickup and delivery.' },
    { to: '/massachusetts-to-florida-car-shipping', title: 'Massachusetts to Florida', description: 'Snowbird-friendly MA → FL corridor.' },
  ],
  '/boston-car-shipping': [
    { to: '/massachusetts-car-shipping', title: 'Massachusetts Car Shipping', description: 'Statewide MA auto transport coverage.' },
    { to: '/newton-auto-transport', title: 'Newton Auto Transport',     description: 'Local Newton, MA pickup and delivery.' },
    { to: '/massachusetts-to-florida-car-shipping', title: 'Boston to Miami', description: 'High-volume MA → FL corridor.' },
  ],
  '/newton-auto-transport': [
    { to: '/boston-car-shipping',   title: 'Boston Car Shipping',       description: 'Auto transport from Boston to anywhere in the US.' },
    { to: '/massachusetts-car-shipping', title: 'Massachusetts Car Shipping', description: 'Statewide MA auto transport coverage.' },
    { to: '/massachusetts-to-florida-car-shipping', title: 'MA to FL Route', description: 'Snowbird-friendly MA → FL corridor.' },
  ],

  // ─── Florida location cluster ──────────────────────────────────────────
  '/florida-car-shipping': [
    { to: '/massachusetts-to-florida-car-shipping', title: 'MA → FL Car Shipping', description: 'Snowbird-friendly Massachusetts to Florida route.' },
    { to: '/new-jersey-to-florida-car-shipping', title: 'NJ → FL Car Shipping', description: 'New Jersey to Florida auto transport.' },
    { to: '/state-to-state-car-shipping', title: 'State-to-State Shipping', description: 'Cross-country auto transport for any route.' },
  ],

  // ─── Routes cluster ────────────────────────────────────────────────────
  '/massachusetts-to-florida-car-shipping': [
    { to: '/new-jersey-to-florida-car-shipping', title: 'NJ → FL Car Shipping', description: 'New Jersey to Florida auto transport.' },
    { to: '/florida-car-shipping',  title: 'Florida Car Shipping',      description: 'Auto transport into and out of Florida.' },
    { to: '/massachusetts-car-shipping', title: 'Massachusetts Car Shipping', description: 'Statewide MA auto transport coverage.' },
  ],
  '/new-jersey-to-florida-car-shipping': [
    { to: '/massachusetts-to-florida-car-shipping', title: 'MA → FL Car Shipping', description: 'Massachusetts to Florida snowbird corridor.' },
    { to: '/florida-car-shipping',  title: 'Florida Car Shipping',      description: 'Auto transport into and out of Florida.' },
    { to: '/new-jersey-auto-transport', title: 'New Jersey Auto Transport', description: 'Statewide NJ auto transport coverage.' },
  ],
  '/texas-to-newark-port-auto-transport': [
    { to: '/chicago-to-port-newark-car-shipping', title: 'Chicago → Newark Port', description: 'Inland US to Newark export terminal.' },
    { to: '/door-to-port-auto-transport', title: 'Door-to-Port Transport', description: 'Vehicle delivery to major US export ports.' },
    { to: '/texas-auto-transport',  title: 'Texas Auto Transport',      description: 'Statewide Texas auto transport coverage.' },
  ],
  '/chicago-to-port-newark-car-shipping': [
    { to: '/texas-to-newark-port-auto-transport', title: 'Texas → Newark Port', description: 'Inland US to Newark export terminal.' },
    { to: '/door-to-port-auto-transport', title: 'Door-to-Port Transport', description: 'Vehicle delivery to major US export ports.' },
    { to: '/auction-to-port-transport', title: 'Auction to Port',       description: 'Auction pickup straight to a US export port.' },
  ],

  // ─── Service / catch-all ───────────────────────────────────────────────
  '/door-to-port-auto-transport': [
    { to: '/auction-to-port-transport', title: 'Auction to Port',       description: 'Auction pickup straight to a US export port.' },
    { to: '/electric-vehicle-port-delivery', title: 'EV Port Delivery', description: 'Electric vehicle delivery to US export ports.' },
    { to: '/texas-to-newark-port-auto-transport', title: 'Texas → Newark Port', description: 'Inland US to Newark export terminal.' },
  ],
  '/dealer-auto-transport': [
    { to: '/manheim-transport',     title: 'Manheim Auction Transport', description: 'Dealer auction shipping with contract pricing.' },
    { to: '/copart-shipping',       title: 'Copart Shipping',           description: 'Vehicle transport from Copart auctions.' },
    { to: '/auction-car-shipping',  title: 'Auction Car Shipping',      description: 'General auction pickup nationwide.' },
  ],
  '/enclosed-car-shipping': [
    { to: '/tesla-car-shipping',    title: 'Tesla Car Shipping',        description: 'Specialized transport for every Tesla model.' },
    { to: '/ev-auto-transport',     title: 'EV Auto Transport',         description: 'Specialized transport for any electric vehicle.' },
    { to: '/open-car-shipping',     title: 'Open Car Shipping',         description: 'Cost-effective open-trailer transport.' },
  ],
  '/open-car-shipping': [
    { to: '/enclosed-car-shipping', title: 'Enclosed Car Shipping',     description: 'Premium covered transport for high-value vehicles.' },
    { to: '/state-to-state-car-shipping', title: 'State-to-State Shipping', description: 'Cross-country auto transport for any route.' },
    { to: '/car-shipping-cost',     title: 'Car Shipping Cost',         description: 'How auto transport pricing works.' },
  ],
  '/salvage-car-shipping': [
    { to: '/iaai-transport',        title: 'IAA Auction Transport',     description: 'Pickup from IAA salvage auction yards.' },
    { to: '/copart-shipping',       title: 'Copart Shipping',           description: 'Vehicle transport from Copart auctions.' },
    { to: '/auction-car-shipping',  title: 'Auction Car Shipping',      description: 'General auction pickup nationwide.' },
  ],
};
