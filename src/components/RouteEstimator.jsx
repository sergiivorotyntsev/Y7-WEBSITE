import { useState, useEffect } from 'react';
import { colors, fonts } from '../theme';

// Simplified US ZIP centroids (first 3 digits → approximate lat/lng)
// Covers major regions. For ZIPs not found, uses geographic center of US.
const ZIP_REGIONS = {
  '070': [40.73, -74.17], '071': [40.73, -74.17], '100': [40.75, -73.99], '101': [40.75, -73.99],
  '021': [42.36, -71.06], '024': [42.33, -71.21], '330': [25.77, -80.19], '331': [26.12, -80.14],
  '770': [29.76, -95.37], '771': [29.76, -95.37], '900': [34.05, -118.24], '902': [34.05, -118.24],
  '303': [33.75, -84.39], '312': [32.08, -81.09], '212': [39.29, -76.61], '322': [30.33, -81.66],
  '750': [32.78, -96.80], '606': [41.88, -87.63], '981': [47.61, -122.33], '191': [39.95, -75.17],
  '481': [42.33, -83.05], '553': [44.98, -93.27], '802': [39.74, -104.99], '852': [33.45, -112.07],
  '146': [42.89, -78.88], '231': [36.85, -75.98], '276': [36.10, -79.83], '326': [29.19, -81.05],
  '334': [27.95, -82.46], '372': [36.16, -86.78], '631': [38.63, -90.20], '641': [39.10, -94.58],
  '681': [41.26, -95.94], '841': [40.76, -111.89],
};

function getZipCoords(zip) {
  const prefix = zip.substring(0, 3);
  return ZIP_REGIONS[prefix] || [39.83, -98.58]; // Geographic center of US
}

function haversineDistance(lat1, lng1, lat2, lng2) {
  const R = 3959; // Earth radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function RouteEstimator({ pickupZip, deliveryZip, transportType }) {
  const [estimate, setEstimate] = useState(null);

  useEffect(() => {
    if (!pickupZip || pickupZip.length < 5 || !deliveryZip || deliveryZip.length < 5) {
      setEstimate(null);
      return;
    }

    const [lat1, lng1] = getZipCoords(pickupZip);
    const [lat2, lng2] = getZipCoords(deliveryZip);
    const straightDist = haversineDistance(lat1, lng1, lat2, lng2);
    const roadDist = Math.round(straightDist * 1.3); // Road factor ~1.3x

    // Transit estimate: ~500 mi/day for carriers
    const transitDaysMin = Math.max(2, Math.ceil(roadDist / 600));
    const transitDaysMax = transitDaysMin + 2;

    // Price estimate: $0.30-$0.45/mi open, +40% enclosed
    const isEnclosed = transportType === 'enclosed';
    const baseLow = Math.max(300, Math.round(roadDist * 0.30));
    const baseHigh = Math.max(450, Math.round(roadDist * 0.45));
    const priceLow = isEnclosed ? Math.round(baseLow * 1.4) : baseLow;
    const priceHigh = isEnclosed ? Math.round(baseHigh * 1.4) : baseHigh;

    setEstimate({ roadDist, transitDaysMin, transitDaysMax, priceLow, priceHigh });
  }, [pickupZip, deliveryZip, transportType]);

  if (!estimate) return null;

  return (
    <div style={{
      background: colors.bgMuted,
      borderRadius: '12px',
      padding: '20px',
      marginTop: '8px',
      marginBottom: '8px',
      animation: 'fadeUp 300ms ease',
    }}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px',
      }}>
        <span style={{
          fontFamily: fonts.sans,
          fontSize: '13px',
          fontWeight: 600,
          color: colors.text,
        }}>
          {pickupZip} &rarr; {deliveryZip}
        </span>
        <span style={{
          fontFamily: fonts.mono,
          fontSize: '13px',
          fontWeight: 600,
          color: colors.accent,
        }}>
          ~{estimate.roadDist.toLocaleString()} mi
        </span>
      </div>

      {/* Progress bar */}
      <div style={{
        height: '4px',
        background: colors.border,
        borderRadius: '2px',
        position: 'relative',
        marginBottom: '12px',
      }}>
        <div style={{
          height: '100%',
          background: colors.accent,
          borderRadius: '2px',
          width: '100%',
          animation: 'growBar 600ms ease forwards',
        }} />
        <style>{`
          @keyframes growBar {
            from { width: 0%; }
            to { width: 100%; }
          }
        `}</style>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontFamily: fonts.sans,
        fontSize: '12px',
        color: colors.textMuted,
      }}>
        <span>Transit: {estimate.transitDaysMin}-{estimate.transitDaysMax} business days</span>
        <span>Est. ${estimate.priceLow}-${estimate.priceHigh}</span>
      </div>
    </div>
  );
}
