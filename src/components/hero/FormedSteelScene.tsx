"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/* ===========================================================================
   The formed part is grown, not photographed.

   This is the SylvaHero scene re-dressed. The reference sweeps a tapered tube
   along a measured centreline and plants ~130,000 instanced blades of moss on
   whatever faces the light; the silhouette landmarks — crest at 25% of the
   width, valley at 50%, apex at 73% — are lifted off the original artwork so
   the composition holds around it.

   Those landmarks are kept exactly. What is swept along them is not a root but
   a formed steel channel: a rounded rectangular section that twists as it runs,
   the way a progressive die leaves a stamped rail. The instanced layer is no
   longer foliage but the tool marks — thousands of micro-facets planted on the
   lit flank, which is what makes a machined surface read as machined instead of
   as a grey plastic tube.

   Being procedural means the scene needs no texture upload, so it costs one
   script and no network round-trip for geometry.
   =========================================================================== */

/* One world unit is one CSS pixel at z = 0, so the part can be pinned to the
   same stage coordinates the copy is laid out on. */
const DIST = 1400;
const BOXW = 10; /* the part is modelled in its own 10-unit-wide box */

/* Where the part sits on the 1600 x 880 reference frame.

   Sylva's boxes are close to 2:1 because a moss arch is a tall organic mass.
   A formed rail is the opposite shape — it has to run the width of the frame
   and stay shallow, or the sweep alone eats a third of the composition before
   the section has any thickness at all. So the boxes here are ~4.6:1, which
   lands the run between y 430 and y 580: under the headline, across the lower
   third, brushing the capability card's shoulder on its way out. */
const RAIL = { w: 2040, left: -220, top: 434, aspect: 2040 / 224 };
const RAIL_N = { w: 1200, left: -190, top: 690, aspect: 1200 / 132 };
const FAR = { w: 1460, left: -70, top: 402, aspect: 1460 / 150, z: -260 };
const FAR_N = { w: 860, left: -90, top: 664, aspect: 860 / 88, z: -260 };

/* ── deterministic noise — the same part is formed on every reload ───────── */
function makeRng(seed: number) {
  let a = seed | 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* Parallel-transport frames. A Frenet frame flips its normal through an
   inflection and the section would corkscrew there; transporting the previous
   normal forward keeps the flange on the same side the whole run. */
function transportFrames(curve: THREE.CatmullRomCurve3, segs: number) {
  const pts: THREE.Vector3[] = [];
  const tan: THREE.Vector3[] = [];
  const nor: THREE.Vector3[] = [];
  const bin: THREE.Vector3[] = [];

  for (let i = 0; i <= segs; i++) {
    const t = i / segs;
    pts.push(curve.getPoint(t));
    tan.push(curve.getTangent(t).normalize());
  }

  /* seed the first normal off whichever axis is least parallel to the tangent */
  const t0 = tan[0];
  const seed = Math.abs(t0.y) < 0.9 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(0, 0, 1);
  let n = new THREE.Vector3().crossVectors(t0, seed).normalize();
  nor.push(n.clone());
  bin.push(new THREE.Vector3().crossVectors(t0, n).normalize());

  const axis = new THREE.Vector3();
  for (let i = 1; i <= segs; i++) {
    n = nor[i - 1].clone();
    axis.crossVectors(tan[i - 1], tan[i]);
    if (axis.lengthSq() > 1e-10) {
      axis.normalize();
      const ang = Math.acos(THREE.MathUtils.clamp(tan[i - 1].dot(tan[i]), -1, 1));
      n.applyAxisAngle(axis, ang);
    }
    /* re-orthogonalise, or accumulated float error slowly shears the section */
    n.sub(tan[i].clone().multiplyScalar(n.dot(tan[i]))).normalize();
    nor.push(n.clone());
    bin.push(new THREE.Vector3().crossVectors(tan[i], n).normalize());
  }
  return { pts, tan, nor, bin };
}

/* A rounded rectangle in section — a channel rolled from sheet, not a pipe.
   Returns unit-space offsets plus the section normal at each ring vertex. */
function railSection(sides: number, flange: number, fillet: number) {
  const out: { x: number; y: number; nx: number; ny: number }[] = [];
  for (let i = 0; i < sides; i++) {
    const a = (i / sides) * Math.PI * 2;
    const c = Math.cos(a);
    const s = Math.sin(a);
    /* superellipse: exponent 4 is a formed corner radius, 2 would be a pipe */
    const k = 1 / Math.pow(Math.pow(Math.abs(c), fillet) + Math.pow(Math.abs(s) / flange, fillet), 1 / fillet);
    const x = c * k;
    const y = s * k * flange;
    /* analytic normal of the superellipse, which stays correct through the
       corners where a finite-difference normal goes to noise */
    const nx = Math.sign(c) * Math.pow(Math.abs(c), fillet - 1);
    const ny = (Math.sign(s) * Math.pow(Math.abs(s) / flange, fillet - 1)) / flange;
    const l = Math.hypot(nx, ny) || 1;
    out.push({ x, y, nx: nx / l, ny: ny / l });
  }
  return out;
}

type LimbSpec = { pts: [number, number, number][]; r0: number; r1: number; twist: number };

/* Sweep one limb into a buffer geometry, and hand back surface samples the
   facet layer can be planted on. */
function buildLimb(
  P: (fx: number, fy: number, z: number) => THREE.Vector3,
  spec: LimbSpec,
  segs: number,
  sides: number,
) {
  const curve = new THREE.CatmullRomCurve3(
    spec.pts.map((p) => P(p[0], p[1], p[2])),
    false,
    "catmullrom",
    0.5,
  );
  const F = transportFrames(curve, segs);
  const sect = railSection(sides, 0.62, 4);

  const pos = new Float32Array((segs + 1) * (sides + 1) * 3);
  const nrm = new Float32Array((segs + 1) * (sides + 1) * 3);
  const uv = new Float32Array((segs + 1) * (sides + 1) * 2);
  const idx: number[] = [];

  const samples: { p: THREE.Vector3; n: THREE.Vector3; t: number }[] = [];

  let v = 0;
  for (let i = 0; i <= segs; i++) {
    const t = i / segs;
    /* taper: thick where the rail enters, drawn down toward the apex, with a
       slight swell through the crest so the form has a shoulder to catch light */
    const taper = spec.r0 + (spec.r1 - spec.r0) * t + 0.16 * Math.sin(t * Math.PI) * spec.r0;
    const roll = spec.twist * t;
    const cr = Math.cos(roll);
    const sr = Math.sin(roll);

    for (let j = 0; j <= sides; j++) {
      const s = sect[j % sides];
      /* roll the section about the tangent as it travels */
      const sx = s.x * cr - s.y * sr;
      const sy = s.x * sr + s.y * cr;
      const nx = s.nx * cr - s.ny * sr;
      const ny = s.nx * sr + s.ny * cr;

      const o = v * 3;
      pos[o] = F.pts[i].x + (F.nor[i].x * sx + F.bin[i].x * sy) * taper;
      pos[o + 1] = F.pts[i].y + (F.nor[i].y * sx + F.bin[i].y * sy) * taper;
      pos[o + 2] = F.pts[i].z + (F.nor[i].z * sx + F.bin[i].z * sy) * taper;

      nrm[o] = F.nor[i].x * nx + F.bin[i].x * ny;
      nrm[o + 1] = F.nor[i].y * nx + F.bin[i].y * ny;
      nrm[o + 2] = F.nor[i].z * nx + F.bin[i].z * ny;

      uv[v * 2] = t;
      uv[v * 2 + 1] = j / sides;

      /* Sample every few rings for the facet layer. Only the upper flank is
         worth planting: facets on the underside never see the key light and
         cost the same to draw. */
      if (i % 2 === 0 && j % 2 === 0 && nrm[o + 1] > -0.12) {
        samples.push({
          p: new THREE.Vector3(pos[o], pos[o + 1], pos[o + 2]),
          n: new THREE.Vector3(nrm[o], nrm[o + 1], nrm[o + 2]),
          t,
        });
      }
      v++;
    }
  }

  const ring = sides + 1;
  for (let i = 0; i < segs; i++) {
    for (let j = 0; j < sides; j++) {
      const a = i * ring + j;
      const b = a + ring;
      idx.push(a, b, a + 1, b, b + 1, a + 1);
    }
  }

  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  g.setAttribute("normal", new THREE.BufferAttribute(nrm, 3));
  g.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  g.setIndex(idx);
  g.computeBoundingSphere();
  return { geometry: g, samples };
}

/* ── shader chunks ──────────────────────────────────────────────────────── */

/* Lighting is a three-term rig — key, fill, sky ambient — plus a tight
   specular lobe. Steel is defined by the specular: a diffuse-only metal reads
   as painted MDF no matter how grey you make it. */
const LIGHT_GLSL = /* glsl */ `
uniform vec3 uKeyDir, uKeyCol, uFillDir, uFillCol, uAmbCol, uHazeCol;
uniform float uHaze, uFog;

vec3 litMetal(vec3 N, vec3 V, vec3 albedo, float ao, float rough){
  float k = max(dot(N, uKeyDir), 0.0);
  float f = max(dot(N, uFillDir), 0.0);
  float sky = 0.5 + 0.5 * N.y;

  // A metal is mostly specular. Push too much energy through the diffuse term
  // and the result is painted MDF no matter how grey the albedo is.
  vec3 diff = albedo * (uKeyCol * (0.06 + 0.46 * k) + uFillCol * (0.02 + 0.16 * f) + uAmbCol * (0.22 + 0.58 * sky));

  // two specular lobes: a tight one for the polished face and a broad one
  // standing in for the room the part sits in
  vec3 Hk = normalize(uKeyDir + V);
  vec3 Hf = normalize(uFillDir + V);
  float shin = mix(220.0, 14.0, rough);
  float sk = pow(max(dot(N, Hk), 0.0), shin);
  float sf = pow(max(dot(N, Hf), 0.0), shin * 0.25);

  // grazing angles throw more light back — without it the silhouette dies
  float fres = pow(1.0 - max(dot(N, V), 0.0), 4.0);

  // The fill's half-vector sits close to the view vector, so a broad lobe on it
  // lights almost every camera-facing surface at once. On a red fill that is a
  // rose wash over the whole part, not a bounce — so the fill contributes to
  // the diffuse only, and every specular term here is cool.
  // Kept under 1.0. Push the specular far above white and the tone mapper's
  // shoulder is doing the colouring instead of the lights — ACES rolls
  // everything past the knee toward orange, which is why an all-cool rig can
  // still render the whole part rose.
  vec3 spec = uKeyCol * sk * (0.98 - 0.34 * rough)
            + uKeyCol * sf * 0.07
            + mix(uHazeCol, uKeyCol, 0.55) * fres * 0.34;
  return (diff + spec) * ao;
}

// Aerial perspective: the part reads paler and less saturated where it climbs
// out of the light pool. Weighted by the surface's own luminance, because a
// flat mix puts a floor under every shadow.
vec3 aerial(vec3 c, float h){
  float amt = clamp(uFog + uHaze * smoothstep(0.05, 0.95, h), 0.0, 1.0);
  float gain = smoothstep(0.003, 0.075, dot(c, vec3(0.30, 0.59, 0.11)));
  return mix(c, uHazeCol, amt * mix(0.35, 1.0, gain));
}
`;

/* The survey pulse. A wavefront expands from one point at the low left and the
   part only exists behind it, so the rail is drawn in as the pulse passes over
   — the right entrance for a company whose whole pitch is measurement. `lag`
   holds the solid a beat behind the wire edge, which is what makes it read as
   a scan rather than as a wipe. */
const SCAN_GLSL = /* glsl */ `
uniform vec3 uScanO;
uniform float uScanR, uScanOn, uWire;

float scanMask(vec3 wp, float lag){
  if(uScanOn < 0.5) return 1.0;
  float d = distance(wp, uScanO);
  // wobble the front by two long sines so it never reads as a perfect circle
  d += 26.0 * sin(wp.y * 0.9 + uScanR * 0.004) + 17.0 * sin(wp.x * 0.6 - uScanR * 0.003);
  return smoothstep(uScanR, uScanR - 150.0 - lag, d);
}
`;

const RAIL_VERT = /* glsl */ `
uniform float uTime;
uniform vec3 uMouse;
varying vec3 vN;
varying vec3 vW;
varying vec2 vUv;
varying float vFlex;

void main(){
  vUv = uv;
  vec3 p = position;

  // The rail flexes where the pointer presses on it — a sheet under load,
  // deflecting away and springing back, not a blob following the cursor.
  //
  // The falloff constant has to be read against the box the part is modelled
  // in, which is BOXW = 10 units across. At 0.010 the gaussian is still ~1.0
  // at d = 6, i.e. over the entire rail, so "press" stopped being local and
  // became a constant: every vertex displaced at once and the whole surface
  // carried the flex tint. 1.6 puts the well at roughly one unit across.
  float d = distance(p, uMouse);
  float press = exp(-d * d * 1.6);
  vFlex = press;
  p -= normal * press * 0.075;

  // a slow standing oscillation so the part is never completely dead
  p.y += sin(uv.x * 7.0 + uTime * 0.6) * 0.030 * (1.0 - uv.x * 0.4);

  vN = normalize(normalMatrix * normal);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vW = (modelMatrix * vec4(p, 1.0)).xyz;
  gl_Position = projectionMatrix * mv;
}
`;

const RAIL_FRAG = /* glsl */ `
precision highp float;
uniform float uTime;
uniform vec3 uTint;
uniform float uHeightRef;
varying vec3 vN;
varying vec3 vW;
varying vec2 vUv;
varying float vFlex;
${LIGHT_GLSL}
${SCAN_GLSL}

void main(){
  float m = scanMask(vW, 120.0);
  if(m < 0.02) discard;

  vec3 N = normalize(vN);
  vec3 V = normalize(cameraPosition - vW);

  // Brushed grain, running along the sweep. Anisotropy is the whole tell for
  // rolled steel: the highlight has to smear along the direction of travel.
  float grain = sin(vUv.y * 260.0 + sin(vUv.x * 18.0) * 3.0) * 0.5 + 0.5;
  float rough = 0.30 + 0.30 * grain;

  // die lines: a coarser periodic band left by the forming tool
  float die = smoothstep(0.42, 0.5, abs(fract(vUv.x * 26.0) - 0.5));
  rough += die * 0.16;

  vec3 albedo = uTint * (0.86 + 0.18 * grain);
  vec3 c = litMetal(N, V, albedo, 1.0 - die * 0.12, rough);

  // The flex under the pointer glows faintly, like metal worked warm. Kept
  // low: this is the only saturated colour on the part and it reads as heat
  // only while it stays a hint.
  c += vec3(1.0, 0.36, 0.30) * vFlex * 0.55;

  // the scan's leading edge is drawn as a bright wire before the solid lands
  float edge = smoothstep(0.02, 0.35, m) * (1.0 - smoothstep(0.35, 0.95, m));
  c += vec3(0.45, 0.68, 1.0) * edge * (0.55 + uWire);

  c = aerial(c, clamp(vW.y / uHeightRef + 0.5, 0.0, 1.0));
  gl_FragColor = vec4(c, 1.0);

  /* A raw ShaderMaterial gets neither of these for free. three linearises
     every THREE.Color on the way in (colour management is on by default), so
     without the matching encode on the way out the whole part renders in
     linear space — which reads as a dark, hue-shifted brown no matter what the
     albedo says. The tone-mapping chunk has to come first, on linear values. */
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

/* Instanced tool marks. Each is a single triangle standing off the surface, so
   130k of them cost one draw call and 390k vertices — the same budget the
   reference spends on moss. */
const FACET_VERT = /* glsl */ `
uniform float uTime;
uniform vec3 uMouse;
attribute vec3 aPos;
attribute vec3 aNor;
attribute vec3 aRand;
varying float vShade;
varying vec3 vW;
varying float vLen;

void main(){
  vec3 base = aPos;
  // same well as the rail body, or the tool marks tear away from the surface
  // they are planted on the moment the pointer arrives
  float d = distance(base, uMouse);
  float press = exp(-d * d * 1.6);
  base -= aNor * press * 0.075;

  // build a frame on the surface so the facet lies in the plane of travel
  vec3 up = abs(aNor.y) < 0.9 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
  vec3 tx = normalize(cross(aNor, up));
  vec3 ty = normalize(cross(aNor, tx));

  float ang = aRand.x * 6.2831;
  vec3 dir = tx * cos(ang) + ty * sin(ang);
  float len = (0.010 + aRand.y * 0.028) * (1.0 - press * 0.5);
  vLen = aRand.y;

  // a hairline shiver, so the surface glitters rather than sitting frozen
  float sh = sin(uTime * 1.7 + aRand.z * 40.0) * 0.012;

  vec3 p = base
         + dir * (position.x * len)
         + aNor * (position.y * len * 0.30 + 0.0012)
         + tx * sh;

  vShade = 0.45 + 0.55 * max(dot(aNor, normalize(vec3(-0.30, 0.92, 0.28))), 0.0);
  vW = (modelMatrix * vec4(p, 1.0)).xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}
`;

const FACET_FRAG = /* glsl */ `
precision highp float;
/* uWire, uScanO, uScanR and uScanOn all arrive with SCAN_GLSL below — declaring
   uWire here as well is a GLSL redefinition error, not a shadow. */
uniform vec3 uSpark;
varying float vShade;
varying vec3 vW;
varying float vLen;
${SCAN_GLSL}

void main(){
  float m = scanMask(vW, 0.0);
  if(m < 0.35) discard;
  float a = (0.20 + vLen * 0.55) * vShade * m;
  gl_FragColor = vec4(uSpark * vShade * (1.0 + uWire * 0.6), a);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

type Props = { className?: string };

export default function FormedSteelScene({ className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    /* Bound to fresh consts after the guard: layout() below is a hoisted
       function declaration, and TypeScript will not carry a narrowing into one
       because it could in principle be called before the check runs. */
    const shellMaybe = canvas.closest<HTMLElement>(".hero-shell");
    const stageMaybe = shellMaybe?.querySelector<HTMLElement>(".hero-stage");
    if (!shellMaybe || !stageMaybe) return;
    const shell: HTMLElement = shellMaybe;
    const stageEl: HTMLElement = stageMaybe;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const narrowMq = window.matchMedia("(max-width: 900px)");

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    } catch {
      return; /* no WebGL: the CSS light pool carries the hero on its own */
    }

    const small =
      narrowMq.matches || window.innerWidth * window.innerHeight < 620000;
    const FACETS_NEAR = small ? 34000 : 96000;
    const FACETS_FAR = small ? 9000 : 26000;

    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, small ? 1.6 : 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 10, 6000);
    camera.position.set(0, 0, DIST);

    /* ── shared uniforms ──────────────────────────────────────────────── */
    const uTime = { value: 0 };
    const uMouseNear = { value: new THREE.Vector3(9999, 9999, 9999) };
    const uMouseFar = { value: new THREE.Vector3(9999, 9999, 9999) };
    const uScanO = { value: new THREE.Vector3(-900, -260, 240) };
    const uScanR = { value: 0 };
    const uScanOn = { value: 0 };
    const uWire = { value: 0 };

    const KEY = new THREE.Vector3(-0.3, 0.92, 0.28).normalize();
    const FILL = new THREE.Vector3(0.12, -0.86, 0.5).normalize();

    /* Cool key, warm-red fill. The fill is the red bounce the CSS paints on the
       left wall, brought into the shading so the part belongs to the room. */
    const lightUniforms = () => ({
      uKeyDir: { value: KEY },
      uKeyCol: { value: new THREE.Color(0xe8f0ff) },
      uFillDir: { value: FILL },
      /* The fill is the red bounce the CSS paints on the left wall, brought
         into the shading so the part belongs to the room. It has to stay this
         dim: at any real brightness a full-width red fill on a downward vector
         floods every underside and the rail stops being metal. */
      uFillCol: { value: new THREE.Color(0x3d0c14) },
      uAmbCol: { value: new THREE.Color(0x16243f) },
      uHazeCol: { value: new THREE.Color(0x1b2b47) },
      uHaze: { value: 0.30 },
      uFog: { value: 0.04 },
      uScanO,
      uScanR,
      uScanOn,
      uWire,
      uTime,
    });

    /* ── build one rail ───────────────────────────────────────────────── */
    const makeP = (aspect: number) => {
      const bh = BOXW / aspect;
      return (fx: number, fy: number, z: number) =>
        new THREE.Vector3((fx - 0.5) * BOXW, (0.5 - fy) * bh, z || 0);
    };

    function buildRail(
      aspect: number,
      limbs: LimbSpec[],
      count: number,
      tint: number,
      spark: number,
      seed: number,
      segs: number,
      sides: number,
    ) {
      const P = makeP(aspect);
      const group = new THREE.Group();
      const allSamples: { p: THREE.Vector3; n: THREE.Vector3; t: number }[] = [];

      const railMat = new THREE.ShaderMaterial({
        uniforms: {
          ...lightUniforms(),
          uMouse: aspect === RAIL.aspect ? uMouseNear : uMouseFar,
          uTint: { value: new THREE.Color(tint) },
          uHeightRef: { value: 600 },
        },
        vertexShader: RAIL_VERT,
        fragmentShader: RAIL_FRAG,
      });

      for (const spec of limbs) {
        const { geometry, samples } = buildLimb(P, spec, segs, sides);
        group.add(new THREE.Mesh(geometry, railMat));
        allSamples.push(...samples);
      }

      /* plant the facets */
      const rng = makeRng(seed);
      const tri = new THREE.BufferGeometry();
      tri.setAttribute(
        "position",
        new THREE.BufferAttribute(new Float32Array([-0.5, 0, 0, 0.5, 0, 0, 0, 1, 0]), 3),
      );
      const inst = new THREE.InstancedBufferGeometry();
      inst.index = tri.index;
      inst.setAttribute("position", tri.getAttribute("position"));

      const n = Math.min(count, allSamples.length * 3);
      const aPos = new Float32Array(n * 3);
      const aNor = new Float32Array(n * 3);
      const aRand = new Float32Array(n * 3);
      for (let i = 0; i < n; i++) {
        const s = allSamples[Math.floor(rng() * allSamples.length)];
        /* jitter along the surface so the facets do not sit on the sample grid */
        const j = 0.012;
        aPos[i * 3] = s.p.x + (rng() - 0.5) * j;
        aPos[i * 3 + 1] = s.p.y + (rng() - 0.5) * j;
        aPos[i * 3 + 2] = s.p.z + (rng() - 0.5) * j;
        aNor[i * 3] = s.n.x;
        aNor[i * 3 + 1] = s.n.y;
        aNor[i * 3 + 2] = s.n.z;
        aRand[i * 3] = rng();
        aRand[i * 3 + 1] = rng();
        aRand[i * 3 + 2] = rng();
      }
      inst.setAttribute("aPos", new THREE.InstancedBufferAttribute(aPos, 3));
      inst.setAttribute("aNor", new THREE.InstancedBufferAttribute(aNor, 3));
      inst.setAttribute("aRand", new THREE.InstancedBufferAttribute(aRand, 3));
      inst.instanceCount = n;

      const facetMat = new THREE.ShaderMaterial({
        uniforms: {
          uTime,
          uMouse: aspect === RAIL.aspect ? uMouseNear : uMouseFar,
          uSpark: { value: new THREE.Color(spark) },
          uScanO,
          uScanR,
          uScanOn,
          uWire,
        },
        vertexShader: FACET_VERT,
        fragmentShader: FACET_FRAG,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
      });
      const facets = new THREE.Mesh(inst, facetMat);
      facets.frustumCulled = false;
      group.add(facets);

      return { group, railMat, facetMat, inst, meshes: group.children };
    }

    /* The near rail: enters low left, crests at 25% of the width, drops into
       the valley at 50%, rises to the apex at 73%, runs out right. These are
       Sylva's landmarks — the composition was drawn around them. */
    const nearLimbs: LimbSpec[] = [
      {
        pts: [
          [-0.075, 0.845, -0.62],
          [0.0, 0.79, -0.38],
          [0.107, 0.695, 0.04],
          [0.196, 0.588, 0.28],
          [0.25, 0.566, 0.34],
          [0.304, 0.603, 0.22],
          [0.402, 0.706, 0.02],
          [0.5, 0.772, -0.1],
          [0.598, 0.73, 0.06],
          [0.66, 0.64, 0.24],
          [0.73, 0.508, 0.36],
          [0.79, 0.472, 0.3],
          [0.87, 0.508, 0.12],
          [0.96, 0.6, -0.16],
          [1.06, 0.7, -0.5],
        ],
        r0: 0.130,
        r1: 0.070,
        twist: 0.9,
      },
      /* the loop that makes the arch — a second pass over the apex */
      {
        pts: [
          [0.62, 0.72, -0.2],
          [0.676, 0.63, -0.02],
          [0.732, 0.545, 0.1],
          [0.8, 0.56, 0.06],
          [0.85, 0.63, -0.08],
          [0.88, 0.72, -0.24],
        ],
        r0: 0.078,
        r1: 0.042,
        twist: -1.4,
      },
    ];

    const farLimbs: LimbSpec[] = [
      {
        pts: [
          [-0.06, 0.62, 0.0],
          [0.12, 0.5, 0.1],
          [0.28, 0.42, 0.16],
          [0.41, 0.395, 0.18],
          [0.56, 0.44, 0.1],
          [0.72, 0.53, -0.04],
          [0.9, 0.6, -0.2],
          [1.05, 0.64, -0.34],
        ],
        r0: 0.095,
        r1: 0.052,
        twist: 0.6,
      },
    ];

    const nearBox = narrowMq.matches ? RAIL_N : RAIL;
    const farBox = narrowMq.matches ? FAR_N : FAR;

    const near = buildRail(
      nearBox.aspect,
      nearLimbs,
      FACETS_NEAR,
      0xb9c6d6,
      0xbcd6ff,
      0x3f9a1c7b,
      small ? 120 : 190,
      small ? 14 : 20,
    );
    const far = buildRail(
      farBox.aspect,
      farLimbs,
      FACETS_FAR,
      0x46536b,
      0x5b78a6,
      0x71c3a5d,
      small ? 70 : 110,
      small ? 10 : 14,
    );
    scene.add(near.group, far.group);

    /* A soft contact shadow and a bloom behind the apex, both billboards. They
       cost two quads and do the job an entire shadow pass would. */
    const soft = (() => {
      const c = document.createElement("canvas");
      c.width = c.height = 128;
      const g = c.getContext("2d")!;
      const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
      grd.addColorStop(0, "rgba(255,255,255,1)");
      grd.addColorStop(0.5, "rgba(255,255,255,0.32)");
      grd.addColorStop(1, "rgba(255,255,255,0)");
      g.fillStyle = grd;
      g.fillRect(0, 0, 128, 128);
      return new THREE.CanvasTexture(c);
    })();

    const shadowMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshBasicMaterial({
        map: soft,
        transparent: true,
        opacity: 0.5,
        color: 0x02040a,
        depthWrite: false,
      }),
    );
    const glowMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshBasicMaterial({
        map: soft,
        transparent: true,
        opacity: 0.3,
        color: 0x2f5fa8,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    scene.add(shadowMesh, glowMesh);

    /* ── size the scene in stage-pixel space ──────────────────────────── */
    let W = 0;
    let H = 0;
    let scanMax = 3000;

    function layout() {
      W = shell.clientWidth;
      H = shell.clientHeight;
      if (!W || !H) return;
      renderer.setSize(W, H, false);
      camera.fov = ((2 * Math.atan(H / 2 / DIST)) * 180) / Math.PI;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();

      const narrow = narrowMq.matches;
      const s = stageEl.getBoundingClientRect();
      const h = shell.getBoundingClientRect();
      const u = s.width / (narrow ? 760 : 1600);
      const ox = s.left - h.left;
      const oy = s.top - h.top;
      const wx = (px: number) => ox + px * u - W / 2;
      const wy = (py: number) => H / 2 - (oy + py * u);

      const A = narrow ? RAIL_N : RAIL;
      const F = narrow ? FAR_N : FAR;
      /* wider than the stage: grow the rails to cover, pinned at a landmark */
      const cover = Math.max(1, W / s.width);

      const place = (
        group: THREE.Group,
        box: { w: number; left: number; top: number; aspect: number },
        pinFx: number,
        pinFy: number,
        z: number,
      ) => {
        const boxH = box.w / box.aspect;
        const scale = (box.w * u * cover) / BOXW;
        const k = (DIST - z) / DIST; /* undo the perspective shrink */
        const lx = (pinFx - 0.5) * BOXW;
        const ly = (0.5 - pinFy) * (BOXW / box.aspect);
        const px = wx(box.left + pinFx * box.w);
        const py = wy(box.top + pinFy * boxH);
        group.scale.setScalar(scale * k);
        group.position.set((px - lx * scale) * k, (py - ly * scale) * k, z);
        return { px, py, scale, boxH: boxH * u * cover };
      };

      /* the near rail pins at its apex, the far one at its crest */
      place(near.group, A, 0.732, 0.508, 0);
      place(far.group, F, 0.41, 0.395, F.z);

      const aw = A.w * u * cover;
      const ah = aw / A.aspect;
      const cx = wx(A.left + 0.5 * A.w);
      const cy = wy(A.top + 0.5 * (A.w / A.aspect));

      shadowMesh.scale.set(aw * 1.02, ah * 0.72, 1);
      shadowMesh.position.set(cx, cy - ah * 0.4, -70);
      glowMesh.scale.set(aw * 1.15, ah * 1.5, 1);
      glowMesh.position.set(cx - aw * 0.06, cy - ah * 0.18, -320);

      /* the pulse leaves from the low left, in front of the rail, and has to
         reach the far corner — resolved here because it depends on where
         layout() has just put everything */
      near.group.updateMatrixWorld(true);
      uScanO.value.set(-5.2, -0.9, 1.8);
      near.group.localToWorld(uScanO.value);
      scanMax = Math.hypot(W, H) * 1.3 + 900;

      for (const m of [near.railMat, far.railMat]) {
        m.uniforms.uHeightRef.value = Math.max(200, H * 0.5);
      }
    }

    /* ── pointer → the plane the rail stands in, in the rail's own space ── */
    const ndc = new THREE.Vector2(10, 10);
    const raycaster = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const hitWorld = new THREE.Vector3();
    const tmp = new THREE.Vector3();
    let mouseLive = false;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      /* The camera is framed on the shell, not on the window — on the narrow
         layout the shell is the taller of the two, so the pointer has to be put
         back into the canvas's own box or the rail flexes in the wrong place. */
      const r = shell.getBoundingClientRect();
      ndc.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      ndc.y = -((e.clientY - r.top) / r.height) * 2 + 1;
    };
    const onLeave = () => {
      ndc.x = 10;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    function updateMouse(dt: number) {
      if (ndc.x > 2 || reduced) mouseLive = false;
      else {
        raycaster.setFromCamera(ndc, camera);
        mouseLive = !!raycaster.ray.intersectPlane(plane, hitWorld);
      }
      for (const [g, u] of [
        [near.group, uMouseNear],
        [far.group, uMouseFar],
      ] as const) {
        if (!mouseLive) {
          u.value.set(9999, 9999, 9999);
          continue;
        }
        tmp.copy(hitWorld);
        g.worldToLocal(tmp);
        if (u.value.x > 999) u.value.copy(tmp);
        else u.value.lerp(tmp, 1 - Math.pow(0.0002, dt));
      }
    }

    /* ── frame ────────────────────────────────────────────────────────── */
    const clock = new THREE.Clock();
    let raf = 0;
    let inView = true;

    /* Stop rendering once the hero leaves the viewport. A hero canvas that
       keeps drawing while the visitor reads the page below it is the single
       biggest thing a scene like this can get wrong. */
    const io = new IntersectionObserver(([e]) => (inView = e.isIntersecting), {
      rootMargin: "120px",
    });
    io.observe(shell);

    const loop = () => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(clock.getDelta(), 0.05);
      if (!inView) return;
      if (!reduced) uTime.value += dt;
      updateMouse(dt);

      if (uScanOn.value > 0.5) {
        uScanR.value += dt * scanMax * 0.62;
        /* the wire edge burns off as the pulse finishes its run */
        uWire.value = Math.max(0, 1 - uScanR.value / (scanMax * 0.75));
        if (uScanR.value > scanMax) {
          uScanOn.value = 0;
          uWire.value = 0;
        }
      }
      renderer.render(scene, camera);
    };

    layout();
    /* Reduced motion gets the finished part, not the scan. */
    if (!reduced) {
      uScanOn.value = 1;
      uScanR.value = 0;
      uWire.value = 1;
    }
    shell.classList.add("is-ready");
    raf = requestAnimationFrame(loop);

    const onResize = () => layout();
    window.addEventListener("resize", onResize);
    const mqHandler = () => window.location.reload();
    /* Crossing the 900px breakpoint swaps which box the rails are modelled in;
       rebuilding in place is more code than it is worth for a resize that
       almost only happens when a device is rotated. */
    narrowMq.addEventListener?.("change", mqHandler);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      narrowMq.removeEventListener?.("change", mqHandler);
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.geometry) m.geometry.dispose();
        const mat = m.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
        else mat?.dispose();
      });
      soft.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className={className ?? "hero-canvas"} aria-hidden="true" />;
}
