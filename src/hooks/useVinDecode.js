import { useState } from 'react';

const NHTSA_URL = 'https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues';

export function useVinDecode() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  async function decode(vin) {
    if (!vin || vin.length !== 17) {
      setError('VIN must be 17 characters');
      return null;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${NHTSA_URL}/${vin}?format=json`);
      const data = await res.json();
      const r = data.Results?.[0];
      if (!r || r.ErrorCode !== '0') {
        setError('Could not decode VIN');
        setLoading(false);
        return null;
      }
      const decoded = {
        make: r.Make || '',
        model: r.Model || '',
        year: r.ModelYear || '',
        bodyClass: r.BodyClass || '',
        vehicleType: r.VehicleType || '',
      };
      setResult(decoded);
      setLoading(false);
      return decoded;
    } catch {
      setError('VIN decode failed');
      setLoading(false);
      return null;
    }
  }

  return { decode, loading, error, result };
}
