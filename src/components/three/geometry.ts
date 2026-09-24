import * as THREE from "three";

/** Rounded rectangle Shape centred on the origin. */
export function roundedRect(w: number, h: number, r: number) {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.absarc(x + w - r, y + r, r, -Math.PI / 2, 0, false);
  s.lineTo(x + w, y + h - r);
  s.absarc(x + w - r, y + h - r, r, 0, Math.PI / 2, false);
  s.lineTo(x + r, y + h);
  s.absarc(x + r, y + h - r, r, Math.PI / 2, Math.PI, false);
  s.lineTo(x, y + r);
  s.absarc(x + r, y + r, r, Math.PI, Math.PI * 1.5, false);
  return s;
}

export function punchHole(shape: THREE.Shape, x: number, y: number, r: number) {
  const p = new THREE.Path();
  p.absarc(x, y, r, 0, Math.PI * 2, true);
  shape.holes.push(p);
}

export function punchSlot(shape: THREE.Shape, x: number, y: number, w: number, h: number) {
  const r = Math.min(w, h) / 2;
  const p = new THREE.Path();
  const x0 = x - w / 2;
  const y0 = y - h / 2;
  p.moveTo(x0 + r, y0);
  p.lineTo(x0 + w - r, y0);
  p.absarc(x0 + w - r, y0 + r, r, -Math.PI / 2, Math.PI / 2, false);
  p.lineTo(x0 + r, y0 + h);
  p.absarc(x0 + r, y0 + r, r, Math.PI / 2, Math.PI * 1.5, false);
  shape.holes.push(p);
}

const EXTRUDE_BASE = {
  bevelEnabled: true,
  bevelSegments: 3,
  curveSegments: 22,
};

/** Sheet-metal plate: extruded shape with a small edge break. */
export function sheet(shape: THREE.Shape, thickness: number) {
  const g = new THREE.ExtrudeGeometry(shape, {
    ...EXTRUDE_BASE,
    depth: thickness,
    bevelThickness: thickness * 0.22,
    bevelSize: thickness * 0.22,
  });
  g.center();
  g.computeVertexNormals();
  return g;
}

/* ------------------------------------------------------------
   PART 01 — Stamped structural bracket
   Web plate + perpendicular mounting flange, corner holes,
   central lightening bore and a pair of relief slots.
   ------------------------------------------------------------ */

export function bracketWeb() {
  const s = roundedRect(2.5, 1.65, 0.2);
  punchHole(s, -0.92, 0.5, 0.135);
  punchHole(s, 0.92, 0.5, 0.135);
  punchHole(s, -0.92, -0.5, 0.135);
  punchHole(s, 0.92, -0.5, 0.135);
  punchHole(s, 0, 0, 0.42);
  punchSlot(s, 0, 0.62, 0.62, 0.15);
  punchSlot(s, 0, -0.62, 0.62, 0.15);
  return sheet(s, 0.13);
}

export function bracketFlange() {
  const s = roundedRect(2.5, 0.72, 0.16);
  punchHole(s, -0.78, 0, 0.115);
  punchHole(s, 0.78, 0, 0.115);
  punchSlot(s, 0, 0, 0.5, 0.16);
  return sheet(s, 0.13);
}

/* ------------------------------------------------------------
   PART 02 — EV busbar
   Flat copper strip with two bent legs and terminal holes.
   ------------------------------------------------------------ */

export function busbarSpan() {
  const s = roundedRect(2.9, 0.36, 0.1);
  punchSlot(s, 0, 0, 1.5, 0.12);
  return sheet(s, 0.07);
}

export function busbarTerminal() {
  const s = roundedRect(0.62, 0.56, 0.12);
  punchHole(s, 0, 0, 0.16);
  return sheet(s, 0.07);
}

/* ------------------------------------------------------------
   PART 03 — Deep-drawn housing
   Lathed cup with a stepped wall + bolted mounting flange.
   ------------------------------------------------------------ */

export function housingBody() {
  const pts: THREE.Vector2[] = [];
  const push = (x: number, y: number) => pts.push(new THREE.Vector2(x, y));

  push(0, -0.52);
  push(0.34, -0.52);
  push(0.42, -0.48);
  push(0.44, -0.4);
  // lower barrel
  push(0.44, -0.1);
  // step
  push(0.62, -0.04);
  push(0.64, 0.04);
  // upper barrel
  push(0.64, 0.42);
  push(0.62, 0.5);
  // lip
  push(0.7, 0.52);
  push(0.7, 0.6);
  push(0.6, 0.6);
  push(0.58, 0.52);
  // inner wall going back down
  push(0.56, 0.0);
  push(0.36, -0.06);
  push(0.36, -0.36);
  push(0, -0.36);

  const g = new THREE.LatheGeometry(pts, 72);
  g.computeVertexNormals();
  return g;
}

export function housingFlange() {
  const s = roundedRect(2.15, 1.3, 0.26);
  punchHole(s, 0, 0, 0.6);
  punchHole(s, -0.86, 0, 0.115);
  punchHole(s, 0.86, 0, 0.115);
  punchHole(s, -0.86, 0.42, 0.075);
  punchHole(s, 0.86, -0.42, 0.075);
  return sheet(s, 0.1);
}

/* ------------------------------------------------------------
   Shared: chamfered mounting stud
   ------------------------------------------------------------ */

export function stud() {
  return new THREE.CylinderGeometry(0.075, 0.09, 0.3, 20, 1, false);
}
