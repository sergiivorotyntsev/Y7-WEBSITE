import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { apiPost } from '../../hooks/useApi';
import landmaskB64 from './landmask.b64.txt?raw';
import styles from './DaytonaCargo.module.css';

/**
 * DaytonaCargoPage — scroll-driven "voyage" landing for DaytonaCargo LLC
 * (Y7 sister company, US auctions -> Rotterdam vehicle shipping).
 *
 * A fixed Three.js globe (real continents from a build-time landmask, 4 US
 * ports + Rotterdam, ocean lanes, a scroll-scrubbed ship, a day/night
 * terminator that also drives the page theme) sits behind a column of metric
 * "waypoint" cards. ALL browser/Three.js work lives inside one useEffect with
 * a full cleanup; the page degrades to a static gradient with no WebGL.
 *
 * Figures are market averages / pre-launch targets and carry the draft
 * footnote — replaced after sign-off with verified ops data.
 */

const BASE = 'https://www.y7agency.com';
const MAILTO = 'mailto:kontakt@daytonacargo.com?subject=3-VIN%20quote%20request';
const FOOTNOTE =
  '* market averages from published importer pricing, Feb–Apr 2026; Daytona values are pre-launch targets pending verified operations data.';
const FOOTNOTE2 =
  '** transit counted from title-in-hand to Rotterdam quay; excludes auction document processing. Auction policies allow sellers up to 30 days to deliver a title (e.g. Manheim), lien titles take longer. No operator can compress that stage.';

export default function DaytonaCargoPage() {
  const pageRef = useRef(null);
  const canvasRef = useRef(null);
  const shipMarkerRef = useRef(null);
  const legNameRef = useRef(null);
  const nmRef = useRef(null);
  const nmTotalRef = useRef(null);
  const pctRef = useRef(null);

  const [form, setForm] = useState({ company: '', email: '', vins: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | ok | err
  const [errMsg, setErrMsg] = useState('');

  function setField(k, v) {
    setForm((p) => ({ ...p, [k]: v }));
  }

  async function submitQuote(e) {
    e.preventDefault();
    setErrMsg('');
    if (!form.company.trim()) { setErrMsg('Company name is required.'); return; }
    if (!form.email.trim()) { setErrMsg('Email is required.'); return; }
    if (!form.vins.trim()) { setErrMsg('Add at least one VIN.'); return; }
    setStatus('sending');
    try {
      await apiPost('/api/public/contact', {
        name: form.company.trim(),
        email: form.email.trim(),
        phone: '',
        message: `DaytonaCargo 3-VIN quote request\n\nVINs:\n${form.vins.trim()}`,
      });
      setStatus('ok');
    } catch (err) {
      setStatus('err');
      setErrMsg(err?.message || 'Could not send. Email kontakt@daytonacargo.com instead.');
    }
  }

  useEffect(() => {
    const page = pageRef.current;
    const canvas = canvasRef.current;
    if (!page || !canvas) return undefined;

    // Start in night (departure pre-dawn). The first sunrise happens on scroll.
    page.classList.add(styles.night);

    let disposed = false;
    let teardown = null;

    // Load three only on this route (plain dynamic import — NOT React.lazy, so
    // prerender still renders the full DOM synchronously). Keeps the ~150KB
    // gzip globe library out of the site-wide bundle.
    import('three')
      .then((THREE) => { if (!disposed) teardown = buildScene(THREE); })
      .catch(() => { if (!disposed) page.classList.add(styles.noWebgl); });

    function buildScene(THREE) {
    let raf = 0;
    const disposables = [];
    let observer = null;

    // ---- WebGL guard: never throw; fall back to static gradient. ----
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch {
      page.classList.add(styles.noWebgl);
      return null;
    }
    if (!renderer) {
      page.classList.add(styles.noWebgl);
      return null;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0.02, 5.5);

    const globe = new THREE.Group();
    scene.add(globe);

    // ---- geometry helpers ----
    const R = 1.45;
    const SURF = R * 1.012;
    function ll(lat, lon, r) {
      const phi = (90 - lat) * Math.PI / 180;
      const theta = (lon + 180) * Math.PI / 180;
      return new THREE.Vector3(
        -r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta),
      );
    }
    function slerpV(a, b, t) {
      const an = a.clone().normalize();
      const bn = b.clone().normalize();
      const dot = THREE.MathUtils.clamp(an.dot(bn), -1, 1);
      const om = Math.acos(dot);
      const len = a.length() * (1 - t) + b.length() * t;
      if (om < 1e-6) return a.clone().lerp(b, t);
      const so = Math.sin(om);
      const s1 = Math.sin((1 - t) * om) / so;
      const s2 = Math.sin(t * om) / so;
      return an.multiplyScalar(s1).add(bn.multiplyScalar(s2)).normalize().multiplyScalar(len);
    }
    const clampN = (v) => Math.max(0, Math.min(1, v));
    function smoothstep(e0, e1, x) {
      const t = clampN((x - e0) / (e1 - e0));
      return t * t * (3 - 2 * t);
    }
    function kf(p, pairs) {
      if (p <= pairs[0][0]) return pairs[0][1];
      const last = pairs[pairs.length - 1];
      if (p >= last[0]) return last[1];
      for (let i = 0; i < pairs.length - 1; i++) {
        const [t0, v0] = pairs[i];
        const [t1, v1] = pairs[i + 1];
        if (p >= t0 && p <= t1) {
          const lt = (p - t0) / (t1 - t0);
          return v0 + (v1 - v0) * (lt * lt * (3 - 2 * lt));
        }
      }
      return last[1];
    }

    // ---- ports ----
    const ports = [
      { name: 'SAVANNAH', coords: '32.08°N 81.09°W', lat: 32.08, lon: -81.09, us: 1, alt: 1.30 },
      { name: 'NEWARK', coords: '40.73°N 74.17°W', lat: 40.73, lon: -74.17, us: 1, alt: 1.46 },
      { name: 'HOUSTON', coords: '29.76°N 95.36°W', lat: 29.76, lon: -95.36, us: 1, alt: 1.38 },
      { name: 'LOS ANGELES', coords: '33.73°N 118.26°W', lat: 33.73, lon: -118.26, us: 1, alt: 1.22 },
      { name: 'ROTTERDAM', coords: '51.95°N 4.14°E', lat: 51.95, lon: 4.14, us: 0, alt: 1.27 },
    ];

    // ---- landmask decode ----
    const MW = 720;
    const MH = 360;
    const bin = atob(landmaskB64.trim());
    const mask = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) mask[i] = bin.charCodeAt(i);
    function maskLand(lat, lon) {
      let x = Math.floor((lon + 180) / 360 * MW);
      let y = Math.floor((90 - lat) / 180 * MH);
      x = ((x % MW) + MW) % MW;
      if (y < 0) y = 0;
      if (y >= MH) y = MH - 1;
      const idx = y * MW + x;
      return (mask[idx >> 3] & (0x80 >> (idx & 7))) !== 0;
    }

    // ---- round sprite texture (shared) ----
    function discTexture() {
      const s = 64;
      const cv = document.createElement('canvas');
      cv.width = cv.height = s;
      const ctx = cv.getContext('2d');
      const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
      g.addColorStop(0, 'rgba(255,255,255,1)');
      g.addColorStop(0.55, 'rgba(255,255,255,0.85)');
      g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(s / 2, s / 2, s / 2, 0, Math.PI * 2);
      ctx.fill();
      const tex = new THREE.CanvasTexture(cv);
      return tex;
    }
    const disc = discTexture();
    disposables.push(disc);

    // ---- ocean sphere + graticule ----
    const oceanGeo = new THREE.SphereGeometry(R * 0.996, 64, 48);
    const oceanMat = new THREE.MeshBasicMaterial({ color: 0x07101e });
    const ocean = new THREE.Mesh(oceanGeo, oceanMat);
    globe.add(ocean);
    disposables.push(oceanGeo, oceanMat);

    const gratGeo = new THREE.SphereGeometry(R * 1.0, 36, 24);
    const gratMat = new THREE.MeshBasicMaterial({ color: 0x33507a, wireframe: true, transparent: true, opacity: 0.10 });
    const grat = new THREE.Mesh(gratGeo, gratMat);
    globe.add(grat);
    disposables.push(gratGeo, gratMat);

    // ---- continents (dot field) ----
    const base = new THREE.Color(0x2e4e78);
    const amber = new THREE.Color(0xff6b1a);
    const cyan = new THREE.Color(0x36ddf2);
    const usDirs = ports.filter((p) => p.us).map((p) => ll(p.lat, p.lon, 1).normalize());
    const nlDir = ll(51.95, 4.14, 1).normalize();
    const dotPos = [];
    const dotCol = [];
    for (let lat = -84; lat <= 84; lat += 0.72) {
      const count = Math.max(8, Math.floor(500 * Math.cos(lat * Math.PI / 180)));
      for (let i = 0; i < count; i++) {
        const lon = -180 + (i + 0.5) * 360 / count;
        if (!maskLand(lat, lon)) continue;
        const v = ll(lat, lon, R * 1.004);
        dotPos.push(v.x, v.y, v.z);
        const dir = v.clone().normalize();
        const c = base.clone().multiplyScalar(1 + (Math.random() * 0.1 - 0.05));
        let bestUS = Infinity;
        for (const d of usDirs) {
          const a = Math.acos(THREE.MathUtils.clamp(dir.dot(d), -1, 1));
          if (a < bestUS) bestUS = a;
        }
        if (bestUS < 0.30) c.lerp(amber, (1 - bestUS / 0.30) * 0.85);
        const aNL = Math.acos(THREE.MathUtils.clamp(dir.dot(nlDir), -1, 1));
        if (aNL < 0.26) c.lerp(cyan, (1 - aNL / 0.26) * 0.85);
        dotCol.push(c.r, c.g, c.b);
      }
    }
    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute('position', new THREE.Float32BufferAttribute(dotPos, 3));
    dotGeo.setAttribute('color', new THREE.Float32BufferAttribute(dotCol, 3));
    const dotMat = new THREE.PointsMaterial({
      size: 0.022, map: disc, vertexColors: true, transparent: true,
      alphaTest: 0.25, depthWrite: false, sizeAttenuation: true,
    });
    const dots = new THREE.Points(dotGeo, dotMat);
    globe.add(dots);
    disposables.push(dotGeo, dotMat);

    // ---- sea lanes ----
    const CHANNEL = [[48.6, -12], [49.4, -6], [49.8, -3.5], [50.4, -0.5], [50.9, 1.6], [51.5, 2.9], [51.95, 4.14]];
    const NATL = [[44.5, -42], [47, -30], [48.2, -20]];
    const SAV = [[32.08, -81.09], [31.2, -79.4], [33.5, -74], [37, -65], [41, -54], ...NATL, ...CHANNEL];
    const NWK = [[40.73, -74.17], [40.4, -71], [41.5, -64], [43.5, -54], [45.5, -43], [47.2, -31], [48.2, -20], ...CHANNEL];
    const HOU = [[29.76, -95.36], [28.6, -93.5], [26.5, -89.5], [24.8, -85.5], [23.9, -83], [24.1, -81], [25.2, -79.9], [26.4, -79.6], [28.5, -78.5], [31.5, -75.5], [34.5, -70], [37.5, -63], [41, -54], ...NATL, ...CHANNEL];
    const LA = [[33.73, -118.26], [31.5, -117.8], [27.5, -114.8], [23, -110], [18.5, -104.5], [14, -98], [10.5, -90], [8, -84.5], [7.4, -80.5], [9, -79.55], [9.6, -79], [10.5, -77], [12.5, -73], [15, -68.5], [17.5, -63], [21, -57], [27, -49], [34, -40], [41, -31], [46, -22], [48.2, -16], ...CHANNEL.slice(1)];

    function laneCurve(pts) {
      const vecs = pts.map(([la, lo]) => ll(la, lo, SURF));
      const dense = [];
      for (let i = 0; i < vecs.length - 1; i++) {
        for (let s = 0; s < 10; s++) dense.push(slerpV(vecs[i], vecs[i + 1], s / 10));
      }
      dense.push(vecs[vecs.length - 1]);
      return new THREE.CatmullRomCurve3(dense);
    }
    function addLane(pts, r, opacity, color) {
      const curve = laneCurve(pts);
      const seg = Math.max(40, Math.floor(curve.getLength() * 130));
      const geo = new THREE.TubeGeometry(curve, seg, r, 8, false);
      const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity, depthWrite: false });
      const mesh = new THREE.Mesh(geo, mat);
      globe.add(mesh);
      disposables.push(geo, mat);
      return curve;
    }

    addLane(NWK, 0.005, 0.22, 0x6f8db5);
    addLane(HOU, 0.005, 0.22, 0x6f8db5);
    addLane(LA, 0.005, 0.22, 0x6f8db5);
    const savCurve = addLane(SAV, 0.010, 0.8, 0xff6b1a);
    const NM_TOTAL = Math.round(savCurve.getLength() / R * 3440);
    if (nmTotalRef.current) nmTotalRef.current.textContent = NM_TOTAL.toLocaleString('en-US');

    // ---- port markers + ripples ----
    const ripples = [];
    ports.forEach((pt) => {
      const pos = ll(pt.lat, pt.lon, R * 1.01);
      const col = pt.us ? 0xff6b1a : 0x36ddf2;
      const dGeo = new THREE.SphereGeometry(0.024, 16, 16);
      const dMat = new THREE.MeshBasicMaterial({ color: col });
      const dot = new THREE.Mesh(dGeo, dMat);
      dot.position.copy(pos);
      globe.add(dot);
      disposables.push(dGeo, dMat);
      for (let r = 0; r < 2; r++) {
        const rGeo = new THREE.RingGeometry(0.028, 0.034, 36);
        const rMat = new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.5, side: THREE.DoubleSide, depthWrite: false });
        const ring = new THREE.Mesh(rGeo, rMat);
        ring.position.copy(pos);
        ring.lookAt(pos.clone().multiplyScalar(2));
        globe.add(ring);
        ripples.push({ ring, mat: rMat, phase: r * 0.5 });
        disposables.push(rGeo, rMat);
      }
    });

    // ---- ship + wake ----
    const ship = new THREE.Group();
    const hullGeo = new THREE.BoxGeometry(0.016, 0.009, 0.07);
    const hullMat = new THREE.MeshBasicMaterial({ color: 0xede6d6 });
    const hull = new THREE.Mesh(hullGeo, hullMat);
    const contGeo = new THREE.BoxGeometry(0.012, 0.009, 0.04);
    const contMat = new THREE.MeshBasicMaterial({ color: 0xff6b1a });
    const cont = new THREE.Mesh(contGeo, contMat);
    cont.position.y = 0.008;
    ship.add(hull, cont);
    globe.add(ship);
    disposables.push(hullGeo, hullMat, contGeo, contMat);

    const wake = [];
    for (let i = 0; i < 7; i++) {
      const wGeo = new THREE.SphereGeometry(0.006, 8, 8);
      const wMat = new THREE.MeshBasicMaterial({ color: 0x36ddf2, transparent: true, opacity: 0.5 });
      const w = new THREE.Mesh(wGeo, wMat);
      globe.add(w);
      wake.push({ mesh: w, mat: wMat, k: i + 1 });
      disposables.push(wGeo, wMat);
    }

    // ---- day/night terminator ----
    const termMat = new THREE.ShaderMaterial({
      uniforms: { sunDir: { value: new THREE.Vector3(1, 0.3, 0.45).normalize() } },
      transparent: true, depthWrite: false, side: THREE.FrontSide,
      vertexShader: `
        varying vec3 vN;
        void main(){ vN = normalize(mat3(modelMatrix) * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }
      `,
      fragmentShader: `
        uniform vec3 sunDir; varying vec3 vN;
        void main(){
          float d = dot(normalize(vN), normalize(sunDir));
          float night = smoothstep(0.06, -0.22, d);
          float edge = smoothstep(0.16, 0.0, abs(d));
          vec3 nightTint = vec3(0.004, 0.010, 0.028);
          vec3 warm = vec3(1.0, 0.55, 0.26);
          vec3 col = mix(nightTint, warm, edge * 0.55);
          float a = max(night * 0.62, edge * 0.35);
          gl_FragColor = vec4(col, a);
        }
      `,
    });
    const termGeo = new THREE.SphereGeometry(R * 1.006, 64, 48);
    const term = new THREE.Mesh(termGeo, termMat);
    term.renderOrder = 3;
    globe.add(term);
    disposables.push(termGeo, termMat);

    // ---- atmosphere (BackSide additive fresnel) ----
    // Tightened + day-aware: on the cream day background the additive glow used
    // to render as a wide pale-blue donut. amp damps it to a thin cool rim in
    // daylight (full glow only at night). Radius pulled in to R*1.10 and the
    // fresnel exponent raised so the rim never exceeds ~6% of globe radius.
    const atmMat = new THREE.ShaderMaterial({
      uniforms: { amp: { value: 1 } },
      transparent: true, side: THREE.BackSide, blending: THREE.AdditiveBlending, depthWrite: false,
      vertexShader: `
        varying vec3 vN; varying vec3 vP;
        void main(){ vN = normalize(normalMatrix * normal); vec4 mv = modelViewMatrix * vec4(position,1.0); vP = mv.xyz; gl_Position = projectionMatrix * mv; }
      `,
      fragmentShader: `
        uniform float amp; varying vec3 vN; varying vec3 vP;
        void main(){ vec3 v = normalize(-vP); float i = pow(1.0 - abs(dot(vN, v)), 5.0); vec3 c = vec3(0.18, 0.45, 0.95); gl_FragColor = vec4(c, 1.0) * i * amp * 0.5; }
      `,
    });
    const atmGeo = new THREE.SphereGeometry(R * 1.10, 48, 32);
    const atm = new THREE.Mesh(atmGeo, atmMat);
    globe.add(atm);
    disposables.push(atmGeo, atmMat);

    // ---- starfield ----
    const starPos = [];
    for (let i = 0; i < 1000; i++) {
      const v = new THREE.Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
      if (v.length() < 0.01) { i--; continue; }
      v.normalize().multiplyScalar(8 + Math.random() * 6);
      starPos.push(v.x, v.y, v.z);
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.03, transparent: true, opacity: 0.6, depthWrite: false });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);
    disposables.push(starGeo, starMat);

    // ---- port labels (after fonts ready) ----
    const labels = [];
    function roundRect(ctx, x, y, w, h, r) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    }
    function buildLabels() {
      if (disposed) return;
      ports.forEach((pt) => {
        const accent = pt.us ? '#FF6B1A' : '#36DDF2';
        const cv = document.createElement('canvas');
        cv.width = 512; cv.height = 140;
        const ctx = cv.getContext('2d');
        ctx.fillStyle = 'rgba(7,13,26,0.58)';
        roundRect(ctx, 6, 6, 500, 128, 18); ctx.fill();
        ctx.fillStyle = accent;
        roundRect(ctx, 6, 6, 10, 128, 5); ctx.fill();
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#F3F6FB';
        ctx.font = '600 46px "JetBrains Mono", monospace';
        ctx.fillText(pt.name, 38, 52);
        ctx.fillStyle = '#9DB0CC';
        ctx.font = '400 28px "JetBrains Mono", monospace';
        ctx.fillText(pt.coords, 38, 98);
        const tex = new THREE.CanvasTexture(cv);
        tex.minFilter = THREE.LinearFilter;
        const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, depthTest: false, opacity: 0 });
        const sp = new THREE.Sprite(mat);
        sp.scale.set(0.46, 0.123, 1);
        sp.center.set(0.16, 0);
        const lp = ll(pt.lat, pt.lon, 1).normalize().multiplyScalar(pt.alt);
        sp.position.copy(lp);
        sp.renderOrder = 5;
        globe.add(sp);
        // steel connector line from surface to label base
        const cGeo = new THREE.BufferGeometry().setFromPoints([ll(pt.lat, pt.lon, R * 1.01), lp]);
        const cMat = new THREE.LineBasicMaterial({ color: 0x5a7396, transparent: true, opacity: 0 });
        const line = new THREE.Line(cGeo, cMat);
        globe.add(line);
        labels.push({ sp, mat, lineMat: cMat });
        disposables.push(tex, mat, cGeo, cMat);
      });
    }
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(buildLabels);
    } else {
      buildLabels();
    }

    // ---- choreography keyframes ----
    const KF = {
      rotY: [[0, -1.00], [0.15, -1.00], [0.45, -0.92], [0.7, -0.74], [1, -0.50]],
      rotX: [[0, 0.32], [0.5, 0.36], [1, 0.30]],
      // camZ is built per-frame from a responsive heroZ (closer on desktop so the
      // hero globe matches its mid-page size). See frame().
      camY: [[0, 0.10], [0.13, 0.10], [0.24, 0.12], [1, 0.10]],
      groupX: [[0, 0.35], [0.13, 0.35], [0.22, -0.9], [0.82, -0.9], [0.93, 0], [1, 0]],
    };

    // ---- scroll state ----
    let smooth = 0;
    let nightActive = true;
    const clock = new THREE.Clock();
    const tmpV = new THREE.Vector3();
    const tmpNext = new THREE.Vector3();
    const tmpUp = new THREE.Vector3();
    const tmpM = new THREE.Matrix4();
    const baseSun = new THREE.Vector3(1, 0.3, 0.45).normalize();
    const yAxis = new THREE.Vector3(0, 1, 0);

    function scrollProgress() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      return max > 0 ? clampN(window.scrollY / max) : 0;
    }

    const LEGS = [
      [0.10, 'LEG 00 · DEPARTURE'],
      [0.28, 'LEG 01 · THE AUCTION'],
      [0.46, 'LEG 02 · LAND HAUL'],
      [0.64, 'LEG 03 · THE OCEAN'],
      [0.82, 'LEG 04 · CONSOLIDATION'],
      [1.01, 'LEG 05 · ROTTERDAM QUAY'],
    ];
    function legName(p) {
      for (const [t, n] of LEGS) if (p < t) return n;
      return LEGS[LEGS.length - 1][1];
    }

    let lastLeg = '';
    let lastNm = -1;
    let lastPct = -1;

    function frame() {
      if (disposed) return;
      const prog = scrollProgress();
      smooth += (prog - smooth) * 0.07;
      const p = smooth;
      const desktop = window.innerWidth > 880;
      const heroZ = desktop ? 4.35 : 5.2;

      const gx = desktop ? kf(p, KF.groupX) : 0;
      globe.rotation.y = kf(p, KF.rotY);
      globe.rotation.x = kf(p, KF.rotX);
      globe.position.x = gx;
      camera.position.set(0, kf(p, KF.camY), kf(p, [[0, heroZ], [0.13, heroZ], [0.5, 4.45], [0.85, 4.4], [1, 3.8]]));
      camera.lookAt(gx, 0, 0);

      // sun / day-night
      const ang = p * Math.PI * 2 * 2;
      const sd = tmpV.copy(baseSun).applyAxisAngle(yAxis, ang);
      termMat.uniforms.sunDir.value.copy(sd);
      const dayF = 0.5 - 0.5 * Math.cos(ang);
      starMat.opacity = (1 - dayF) * 0.6;
      // Damp the atmosphere glow in daylight: full at night, barely-there cool
      // rim by day (kills the pale-blue donut over the cream background).
      atmMat.uniforms.amp.value = 0.18 + 0.82 * (1 - dayF);
      if (dayF < 0.42 && !nightActive) { nightActive = true; page.classList.add(styles.night); }
      else if (dayF > 0.58 && nightActive) { nightActive = false; page.classList.remove(styles.night); }

      // ship scrub along Savannah curve
      const u = clampN((p - 0.06) / (0.88 - 0.06));
      const st = u * u * (3 - 2 * u);
      savCurve.getPointAt(st, tmpV);
      savCurve.getPointAt(Math.min(st + 0.001, 1), tmpNext);
      tmpUp.copy(tmpV).normalize();
      tmpM.lookAt(tmpV, tmpNext, tmpUp);
      ship.quaternion.setFromRotationMatrix(tmpM);
      ship.position.copy(tmpV);
      for (const w of wake) {
        const ws = clampN(st - w.k * 0.009);
        savCurve.getPointAt(ws, w.mesh.position);
        w.mat.opacity = clampN(st - w.k * 0.009 > 0 ? (1 - w.k / 8) * 0.55 : 0);
      }

      // ripples
      const tsec = clock.getElapsedTime();
      for (const rp of ripples) {
        const k = ((tsec * 0.5) + rp.phase) % 1;
        rp.ring.scale.setScalar(1 + k * 3);
        rp.mat.opacity = (1 - k) * 0.5;
      }

      // labels: limb fade-in + fade-out near arrival
      if (labels.length) {
        const fadeOut = 1 - smoothstep(0.80, 0.96, p);
        for (const lb of labels) {
          lb.sp.getWorldPosition(tmpV);
          const o = smoothstep(0.10, 0.42, tmpV.z) * fadeOut;
          lb.mat.opacity = o;
          lb.lineMat.opacity = o * 0.6;
        }
      }

      // HUD
      const nm = Math.round(st * NM_TOTAL);
      const pct = Math.round(p * 100);
      if (shipMarkerRef.current) shipMarkerRef.current.style.left = `${clampN(p) * 100}%`;
      const ln = legName(p);
      if (ln !== lastLeg && legNameRef.current) { legNameRef.current.textContent = ln; lastLeg = ln; }
      if (nm !== lastNm && nmRef.current) { nmRef.current.textContent = nm.toLocaleString('en-US'); lastNm = nm; }
      if (pct !== lastPct && pctRef.current) { pctRef.current.textContent = pct; lastPct = pct; }

      renderer.render(scene, camera);
      raf = window.requestAnimationFrame(frame);
    }
    raf = window.requestAnimationFrame(frame);

    // ---- resize ----
    function onResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', onResize);

    // ---- reveal + counters (IntersectionObserver) ----
    function runCounters(card) {
      const els = card.querySelectorAll('[data-to]');
      els.forEach((el) => {
        const to = parseFloat(el.dataset.to);
        const div = parseFloat(el.dataset.div || '1');
        const target = to / div;
        const t0 = performance.now();
        function step(now) {
          if (disposed) return;
          const k = Math.min(1, (now - t0) / 1300);
          const e = 1 - Math.pow(1 - k, 3);
          const val = target * e;
          el.textContent = div === 1 ? Math.round(val).toLocaleString('en-US') : val.toFixed(1);
          if (k < 1) window.requestAnimationFrame(step);
        }
        window.requestAnimationFrame(step);
      });
    }
    const cards = Array.from(page.querySelectorAll('[data-card]'));
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.classList.contains(styles.in)) {
          entry.target.classList.add(styles.in);
          runCounters(entry.target);
        }
      });
    }, { threshold: 0.2 });
    cards.forEach((c) => observer.observe(c));

    // ---- cleanup (returned from buildScene; run by the effect teardown) ----
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      if (observer) observer.disconnect();
      disposables.forEach((d) => { if (d && d.dispose) d.dispose(); });
      renderer.dispose();
    };
    } // end buildScene

    return () => {
      disposed = true;
      if (teardown) teardown();
    };
  }, []);

  return (
    <div ref={pageRef} className={styles.page}>
      <Helmet>
        <title>DaytonaCargo — US Auctions to Rotterdam, One Chain</title>
        <meta
          name="description"
          content="Vehicle shipping from US auctions to Rotterdam as one itemized chain: bidding, land haul, ocean freight, paperwork. Send 3 VINs - get a comparable quote in 24h."
        />
        <link rel="canonical" href={`${BASE}/daytonacargo`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="DaytonaCargo — US Auctions to Rotterdam, One Chain" />
        <meta
          property="og:description"
          content="US auctions to Rotterdam as one itemized chain. Send 3 VINs, get a comparable quote in 24h."
        />
        <meta property="og:url" content={`${BASE}/daytonacargo`} />
      </Helmet>

      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.fallback} />
      <div className={styles.grain} />

      {/* ---- HUD ---- */}
      <header className={styles.hud}>
        <div className={styles.hudBrand}>DAYTONA<span>|</span><b>CARGO</b></div>
        <div className={styles.hudLane}>
          <span ref={shipMarkerRef} className={styles.hudShip} />
        </div>
        <div className={styles.hudRight}>
          <i ref={legNameRef}>LEG 00 &middot; DEPARTURE</i> &middot;{' '}
          <b ref={nmRef}>0</b> / <span ref={nmTotalRef}>0</span> NM &middot;{' '}
          <b ref={pctRef}>0</b>%
        </div>
      </header>

      <main className={styles.content}>
        {/* ---- HERO ---- */}
        <section className={styles.hero}>
          <div className={styles.heroPill}>
            <em>&#9670;</em> THE VOYAGE &middot; AN INTERACTIVE SHIPMENT &middot; SAVANNAH &rarr; ROTTERDAM
          </div>
          <div className={styles.heroBottom}>
            <div className={styles.heroKicker}>FOUR US PORTS &middot; ONE GATEWAY &middot; US AUCTIONS &rarr; ROTTERDAM</div>
            <h1 className={styles.heroH1}>Daytona<i>Cargo.</i></h1>
            <div className={styles.scrollCue}>SCROLL TO SET SAIL</div>
          </div>
        </section>

        {/* ---- VOYAGE COLUMN ---- */}
        <section className={styles.voyage}>
          {/* Leg 00 — brief */}
          <article className={`${styles.card} ${styles.briefCard}`} data-card>
            <div className={styles.cardTag}><span>LEG 00 &middot; DEPARTURE</span><i>&#9670;</i></div>
            <h2 className={styles.cardH2}>Scroll, and the ship sails</h2>
            <p className={styles.cardBody}>
              A vehicle bought at a US auction reaches Rotterdam through one chain of hands:
              bidding, the land haul to the port, the ocean leg, and the paperwork. Most
              importers stitch that chain from separate vendors. Daytona runs it as one.
            </p>
            <div className={styles.briefStat}>
              <b className={styles.cnt} data-to="1200" data-div="1">0</b>+ vehicles* this way &middot; EN/PL/RU
            </div>
            <p className={styles.footnote}>{FOOTNOTE}</p>
          </article>

          {/* Leg 01 — auction */}
          <article className={styles.card} data-card>
            <div className={styles.cardTag}><span>LEG 01 &middot; THE AUCTION</span><i>&#9670;</i></div>
            <h2 className={styles.cardH2}>One fee, not a stack</h2>
            <p className={styles.cardBody}>
              At the block, a generalist broker layers buyer fees, gate fees, and handling
              charges that surface one at a time. Daytona quotes the auction leg as <strong>a
              single itemized fee</strong> you can read before you bid.
            </p>
            <div className={styles.vs}>
              <div className={`${styles.vsCell} ${styles.them}`}>
                <div className={styles.vsLabel}>Typical broker stack</div>
                <div className={styles.vsNum}>3&ndash;4 fees layered*</div>
              </div>
              <div className={`${styles.vsCell} ${styles.us}`}>
                <div className={styles.vsLabel}>Daytona</div>
                <div className={styles.vsNum}><b>1 itemized fee</b></div>
              </div>
            </div>
            <span className={styles.chip}>METRIC 01 &middot; FEE TRANSPARENCY</span>
            <p className={styles.footnote}>{FOOTNOTE}</p>
          </article>

          {/* Leg 02 — own brokerage runs the land leg */}
          <article className={styles.card} data-card>
            <div className={styles.cardTag}><span>LEG 02 &middot; YARD &rarr; PORT</span><i>OWN US BROKERAGE</i></div>
            <h2 className={styles.cardH2}>Our own brokerage runs the land leg.</h2>
            <p className={styles.cardBody}>
              The haul from the auction yard to the port is not handed to a random dispatcher.
              It is administered by our affiliated FMCSA licensed &amp; bonded brokerage,
              <strong> Y7 Logistics (MC #1741537)</strong>, through a vetted network of
              <strong> ~500 carriers</strong>, assigned by lane and rated by performance.
              Shorter hauls to the nearest of four ports, accountable drivers.
            </p>
            <div className={styles.vs}>
              <div className={`${styles.vsCell} ${styles.them}`}>
                <div className={styles.vsLabel}>Industry claims</div>
                <div className={styles.vsNum}>~2.5%*</div>
              </div>
              <div className={`${styles.vsCell} ${styles.us}`}>
                <div className={styles.vsLabel}>Daytona target</div>
                <div className={styles.vsNum}><b>0.8%*</b></div>
              </div>
            </div>
            <span className={styles.chip}>METRIC 02 &middot; OWN NETWORK &middot; ~500 CARRIERS</span>
            <p className={styles.footnote}>{FOOTNOTE}</p>
          </article>

          {/* Leg 03 — ocean */}
          <article className={styles.card} data-card>
            <div className={styles.cardTag}><span>LEG 03 &middot; THE OCEAN</span><i>&#9670;</i></div>
            <h2 className={styles.cardH2}>Yard to Rotterdam</h2>
            <p className={styles.cardBody}>
              Most of the wait is not the crossing. Pure ocean time New York &rarr; Rotterdam is
              only <strong>18&ndash;20 days</strong>. Everything else is the chain: yard
              clearance, consolidation, and booking. Daytona compresses the chain on the
              Savannah lane.
            </p>
            <div className={styles.vs}>
              <div className={`${styles.vsCell} ${styles.them}`}>
                <div className={styles.vsLabel}>Market typical</div>
                <div className={styles.vsNum}>8&ndash;10 wk**</div>
              </div>
              <div className={`${styles.vsCell} ${styles.us}`}>
                <div className={styles.vsLabel}>Daytona (Savannah)</div>
                <div className={styles.vsNum}><b>6&ndash;8 wk**</b></div>
              </div>
            </div>
            <span className={styles.chip}>METRIC 03 &middot; YARD-TO-QUAY TIME</span>
            <p className={styles.footnote}>{FOOTNOTE}</p>
            <p className={styles.footnote}>{FOOTNOTE2}</p>
          </article>

          {/* Leg 04 — consolidation */}
          <article className={styles.card} data-card>
            <div className={styles.cardTag}><span>LEG 04 &middot; CONSOLIDATION</span><i>&#9670;</i></div>
            <h2 className={styles.cardH2}>Share the box, split the cost</h2>
            <p className={styles.cardBody}>
              A 40ft container holds up to three cars. Consolidating turns the ocean leg from
              a fixed cost into a shared one: per-unit price drops with every vehicle you add
              to the box.
            </p>
            <div className={styles.bars}>
              <div className={styles.bar}>
                <span>1 car</span>
                <div className={styles.barTrack}><div className={styles.barFill} style={{ '--fill': '8%' }} /></div>
                <span className={styles.barVal}>$<b className={styles.cnt} data-to="1540" data-div="1">0</b>*</span>
              </div>
              <div className={styles.bar}>
                <span>2 cars</span>
                <div className={styles.barTrack}><div className={styles.barFill} style={{ '--fill': '24%' }} /></div>
                <span className={styles.barVal}>$<b className={styles.cnt} data-to="1260" data-div="1">0</b>* <i style={{ color: 'var(--amber)' }}>(&minus;18%)</i></span>
              </div>
              <div className={styles.bar}>
                <span>3 cars</span>
                <div className={styles.barTrack}><div className={styles.barFill} style={{ '--fill': '33%' }} /></div>
                <span className={styles.barVal}>$<b className={styles.cnt} data-to="1120" data-div="1">0</b>* <i style={{ color: 'var(--amber)' }}>(&minus;27%)</i></span>
              </div>
            </div>
            <span className={styles.chip}>METRIC 04 &middot; PER-UNIT OCEAN COST</span>
            <p className={styles.footnote}>{FOOTNOTE}</p>
          </article>
        </section>

        {/* ---- THE DECISION PACK ---- */}
        <section className={styles.decision}>
          <div className={styles.dpInner}>
            <div className={styles.dpHead}>
              <div className={styles.dpKicker}>FOR THE DECISION-MAKER</div>
              <h2 className={styles.dpH2}>The decision pack.</h2>
              <p className={styles.dpSub}>The facts you would ask for on a call, on one screen.</p>
            </div>

            <div className={styles.dpGrid}>
              {/* Card 1 — Lanes & Ports */}
              <article className={styles.card} data-card>
                <div className={styles.dpTitle}>&#9670; LANES &amp; PORTS</div>
                <table className={styles.dpTable}>
                  <thead>
                    <tr><th>Origin</th><th>Lane</th><th>Transit**</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Savannah, GA</td><td>North Atlantic &rarr; Channel</td><td><b>6&ndash;8 wk*</b></td></tr>
                    <tr><td>Newark, NJ</td><td>North Atlantic &rarr; Channel</td><td><b>6&ndash;8 wk*</b></td></tr>
                    <tr><td>Houston, TX</td><td>Gulf &rarr; Florida Straits &rarr; Atlantic</td><td><b>7&ndash;9 wk*</b></td></tr>
                    <tr><td>Los Angeles, CA</td><td>Pacific &rarr; Panama Canal &rarr; Atlantic</td><td><b>9&ndash;11 wk*</b></td></tr>
                  </tbody>
                </table>
                <div className={styles.dpTableFoot}>
                  Pure ocean time New York &rarr; Rotterdam is 18&ndash;20 days. The rest is the chain.
                </div>
              </article>

              {/* Card 2 — What's in the quote */}
              <article className={styles.card} data-card>
                <div className={styles.dpTitle}>&#9670; WHAT&apos;S IN THE QUOTE</div>
                <ul className={styles.dpCheck}>
                  <li>auction bidding &amp; a single buy fee</li>
                  <li>Carfax / AutoCheck before every bid</li>
                  <li>yard photos before the haul</li>
                  <li>land haul via our own ~500-carrier network</li>
                  <li>container loading with a photo report</li>
                  <li>ocean freight, insurance options stated</li>
                  <li>export documents &amp; title handling</li>
                  <li>EV surcharge declared upfront (+$150)</li>
                </ul>
              </article>

              {/* Card 3 — Titles, honestly */}
              <article className={styles.card} data-card>
                <div className={styles.dpTitle}>&#9670; TITLES, HONESTLY</div>
                <p className={styles.dpText}>
                  Transit starts when the title is in hand. Auction policies allow sellers up to
                  30 days to deliver a title (e.g. Manheim), and lien titles take longer to
                  release. No operator can compress that stage; anyone promising otherwise is
                  hiding it in the fine print. We flag title status before you bid and chase the
                  document daily after.
                </p>
              </article>

              {/* Card 4 — You see everything */}
              <article className={styles.card} data-card>
                <div className={styles.dpTitle}>&#9670; YOU SEE EVERYTHING</div>
                <p className={styles.dpText}>
                  One panel for your whole fleet in transit: status, documents and photo
                  checkpoints per VIN, yard, loading, container, quay. No
                  &ldquo;call us for an update&rdquo;.
                </p>
              </article>

              {/* Card 5 — Who you are dealing with */}
              <article className={styles.card} data-card>
                <div className={styles.dpTitle}>&#9670; WHO YOU ARE DEALING WITH</div>
                <p className={styles.dpText}>
                  <strong>DaytonaCargo LLC</strong>, Dover, DE, USA. Land leg administered by our
                  affiliated FMCSA licensed &amp; bonded brokerage <strong>Y7 Logistics
                  (MC #1741537)</strong>. EN / PL / RU team. Rotterdam-first clearing through
                  established port partners.
                </p>
              </article>

              {/* Card 6 — Wholesale terms */}
              <article className={styles.card} data-card>
                <div className={styles.dpTitle}>&#9670; WHOLESALE TERMS</div>
                <p className={styles.dpText}>
                  Individual terms by monthly volume, one itemized invoice per vehicle,
                  consolidation pricing for 2&ndash;3 units per container. Start with a
                  no-commitment 3-VIN comparative quote, returned within 24 hours.
                </p>
                <a className={styles.dpCta} href="#daytona-quote">REQUEST A 3-VIN QUOTE &rarr;</a>
              </article>
            </div>

            <div className={styles.dpFootnotes}>{FOOTNOTE}</div>
            <div className={styles.dpFootnotes}>{FOOTNOTE2}</div>
          </div>
        </section>

        {/* ---- ARRIVAL ---- */}
        <section className={styles.arrival} id="daytona-quote">
          <div className={styles.arrivalKicker}>LEG 05 &middot; ROTTERDAM QUAY &middot; 51.95&deg;N 4.14&deg;E</div>
          <h2 className={styles.arrivalH2}>Arrived. Now compare.</h2>
          <div className={styles.totals}>
            <span className={styles.totalThem}>$2,850*</span>
            <span className={styles.totalUs}>$2,420*</span>
          </div>
          <p className={styles.arrivalLead}>
            All-in, the typical generalist chain runs about <strong>$2,850*</strong> per
            vehicle to Rotterdam. Daytona&apos;s itemized chain targets <strong>$2,420*</strong>:
            same Atlantic, fewer hands on the wheel. Send three VINs and we will return a
            line-by-line comparable.
          </p>

          {status === 'ok' ? (
            <div className={styles.formOk}>Received. We will reply within 24h.</div>
          ) : (
            <form className={styles.quoteForm} onSubmit={submitQuote}>
              <input
                className={styles.field}
                type="text"
                placeholder="Company / name"
                value={form.company}
                onChange={(e) => setField('company', e.target.value)}
                autoComplete="organization"
              />
              <input
                className={styles.field}
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setField('email', e.target.value)}
                autoComplete="email"
              />
              <textarea
                className={styles.field}
                placeholder="Up to 3 VINs, one per line"
                value={form.vins}
                onChange={(e) => setField('vins', e.target.value)}
                rows={3}
              />
              {errMsg && <div className={styles.formErr}>{errMsg}</div>}
              <button className={styles.cta} type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'SENDING…' : 'REQUEST THE 3-VIN QUOTE → 24H'}
              </button>
              <div className={styles.formNote}>
                Prefer email? Write <a href={MAILTO}>kontakt@daytonacargo.com</a> directly.
              </div>
            </form>
          )}

          <div className={styles.contactLine}>
            DaytonaCargo LLC &middot; <a href={MAILTO}>kontakt@daytonacargo.com</a>
          </div>
        </section>

        {/* ---- FOOTER ---- */}
        <footer className={styles.footer}>
          <div><b>DaytonaCargo LLC</b> &middot; 8 The Green, Dover, DE 19901</div>
          <div>In cooperation with <b>Y7 Logistics</b></div>
          <div className={styles.footerFoot}>{FOOTNOTE}</div>
          <div className={styles.footerFoot}>{FOOTNOTE2}</div>
        </footer>
      </main>
    </div>
  );
}
