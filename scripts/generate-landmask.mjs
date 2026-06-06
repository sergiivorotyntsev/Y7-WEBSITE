// scripts/generate-landmask.mjs
import fs from 'node:fs';
import path from 'node:path';
const SRC = path.resolve('scripts/world.geo.json');
const OUT = path.resolve('src/pages/daytonacargo/landmask.b64.txt');
const W = 720, H = 360;
const geo = JSON.parse(fs.readFileSync(SRC, 'utf8'));
const polys = [];
for (const f of geo.features) {
  const g = f.geometry;
  const cs = g.type === 'MultiPolygon' ? g.coordinates : [g.coordinates];
  for (const poly of cs) {
    let minX = 180, maxX = -180, minY = 90, maxY = -90;
    for (const [x, y] of poly[0]) {
      if (x < minX) minX = x; if (x > maxX) maxX = x;
      if (y < minY) minY = y; if (y > maxY) maxY = y;
    }
    polys.push({ rings: poly, minX, maxX, minY, maxY });
  }
}
function inRing(x, y, ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const xi = ring[i][0], yi = ring[i][1], xj = ring[j][0], yj = ring[j][1];
    if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) inside = !inside;
  }
  return inside;
}
function isLand(lon, lat) {
  for (const p of polys) {
    if (lon < p.minX || lon > p.maxX || lat < p.minY || lat > p.maxY) continue;
    if (inRing(lon, lat, p.rings[0])) {
      let hole = false;
      for (let h = 1; h < p.rings.length; h++) if (inRing(lon, lat, p.rings[h])) { hole = true; break; }
      if (!hole) return true;
    }
  }
  return false;
}
const bits = new Uint8Array(Math.ceil(W * H / 8));
for (let y = 0; y < H; y++) {
  const lat = 90 - (y + 0.5) * 180 / H;
  for (let x = 0; x < W; x++) {
    const lon = -180 + (x + 0.5) * 360 / W;
    if (isLand(lon, lat)) { const idx = y * W + x; bits[idx >> 3] |= 0x80 >> (idx & 7); }
  }
}
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, Buffer.from(bits).toString('base64'));
console.log('landmask written:', OUT, Math.round(fs.statSync(OUT).size / 1024) + 'KB');
