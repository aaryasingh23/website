"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, ContactShadows, Float } from "@react-three/drei";
import { useMemo, useRef, useState, useEffect, type ReactNode } from "react";
import * as THREE from "three";
import {
  bracketWeb,
  bracketFlange,
  busbarSpan,
  busbarTerminal,
  housingBody,
  housingFlange,
  stud,
} from "./geometry";

/* ============================================================
   Materials
   ============================================================ */

function useMetal(color: string, roughness = 0.24) {
  return useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(color),
        metalness: 1,
        roughness,
        clearcoat: 0.35,
        clearcoatRoughness: 0.35,
        envMapIntensity: 1.05,
      }),
    [color, roughness],
  );
}

/* ============================================================
   Part 01 — Stamped structural bracket
   ============================================================ */

function Bracket({ material }: { material: THREE.Material }) {
  const web = useMemo(() => bracketWeb(), []);
  const flange = useMemo(() => bracketFlange(), []);
  const studGeo = useMemo(() => stud(), []);

  return (
    <group>
      <mesh geometry={web} material={material} castShadow receiveShadow />
      <mesh
        geometry={flange}
        material={material}
        position={[0, -0.82, 0.3]}
        rotation={[Math.PI / 2, 0, 0]}
        castShadow
        receiveShadow
      />
      {[-0.92, 0.92].map((x) => (
        <mesh
          key={x}
          geometry={studGeo}
          material={material}
          position={[x, 0.5, 0.14]}
          rotation={[Math.PI / 2, 0, 0]}
          castShadow
        />
      ))}
    </group>
  );
}

/* ============================================================
   Part 02 — EV busbar
   ============================================================ */

function Busbar({ material }: { material: THREE.Material }) {
  const span = useMemo(() => busbarSpan(), []);
  const term = useMemo(() => busbarTerminal(), []);

  return (
    <group rotation={[0, 0, -0.06]} scale={0.84}>
      <mesh geometry={span} material={material} castShadow receiveShadow />
      <mesh
        geometry={term}
        material={material}
        position={[-1.62, -0.16, 0]}
        rotation={[0, 0, 0.42]}
        castShadow
      />
      <mesh
        geometry={term}
        material={material}
        position={[1.62, 0.16, 0]}
        rotation={[0, 0, 0.42]}
        castShadow
      />
      {/* insulator collars */}
      {[-0.62, 0.62].map((x) => (
        <mesh key={x} position={[x, 0, 0]} castShadow>
          <torusGeometry args={[0.24, 0.055, 14, 40]} />
          <meshPhysicalMaterial color="#0e1626" roughness={0.55} metalness={0.15} clearcoat={0.4} />
        </mesh>
      ))}
    </group>
  );
}

/* ============================================================
   Part 03 — Deep-drawn housing
   ============================================================ */

function Housing({ material }: { material: THREE.Material }) {
  const body = useMemo(() => housingBody(), []);
  const flange = useMemo(() => housingFlange(), []);
  const studGeo = useMemo(() => stud(), []);

  return (
    <group rotation={[0.24, 0, 0]} scale={1.32} position={[0, -0.14, 0]}>
      <mesh geometry={body} material={material} castShadow receiveShadow />
      <mesh
        geometry={flange}
        material={material}
        position={[0, 0.46, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        castShadow
        receiveShadow
      />
      {[-0.82, 0.82].map((x) => (
        <mesh key={x} geometry={studGeo} material={material} position={[x, 0.56, 0]} castShadow />
      ))}
    </group>
  );
}

/* ============================================================
   Swapper — scales the active part in, others out
   ============================================================ */

function PartSlot({
  active,
  children,
  spinOffset = 0,
}: {
  active: boolean;
  children: ReactNode;
  spinOffset?: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const scale = useRef(active ? 1 : 0);

  useFrame((_, dt) => {
    const g = ref.current;
    if (!g) return;
    const target = active ? 1 : 0;
    // critically-damped-ish approach
    scale.current += (target - scale.current) * Math.min(1, dt * 6.5);
    const s = Math.max(0.0001, scale.current);
    g.scale.setScalar(s);
    g.rotation.z = (1 - s) * spinOffset;
    g.visible = s > 0.012;
  });

  return <group ref={ref}>{children}</group>;
}

/* ============================================================
   Metrology scan plane
   ============================================================ */

/**
 * A soft-edged strip so the sweep reads as a metrology scan over the part
 * rather than a rule drawn across the page.
 */
function useScanTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 256;
    c.height = 4;
    const ctx = c.getContext("2d")!;
    const g = ctx.createLinearGradient(0, 0, 256, 0);
    g.addColorStop(0, "rgba(255,255,255,0)");
    g.addColorStop(0.5, "rgba(255,255,255,1)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 256, 4);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
}

function ScanPlane() {
  const ref = useRef<THREE.Mesh>(null);
  const tex = useScanTexture();

  useFrame(({ clock }) => {
    const m = ref.current;
    if (!m) return;
    const t = (clock.elapsedTime % 5.6) / 5.6;
    m.position.y = THREE.MathUtils.lerp(-1.4, 1.4, t);
    const mat = m.material as THREE.MeshBasicMaterial;
    mat.opacity = Math.sin(t * Math.PI) * 0.38;
  });

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[3.1, 0.05]} />
      <meshBasicMaterial
        map={tex}
        color="#ff3b47"
        transparent
        opacity={0}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/* ============================================================
   Rotating rig: idle spin + pointer parallax
   ============================================================ */

function Rig({ children, reduced }: { children: ReactNode; reduced: boolean }) {
  const ref = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame((state, dt) => {
    const g = ref.current;
    if (!g) return;
    if (!reduced) g.rotation.y += dt * 0.24;
    const tx = -pointer.y * 0.26;
    const tz = pointer.x * 0.1;
    g.rotation.x += (tx - g.rotation.x) * Math.min(1, dt * 3);
    g.rotation.z += (tz - g.rotation.z) * Math.min(1, dt * 3);
    g.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.045;
  });

  return <group ref={ref}>{children}</group>;
}

/* ============================================================
   Studio lighting — red key left, blue key right, white top
   ============================================================ */

function Studio() {
  return (
    <Environment resolution={256} frames={1}>
      {/* broad white key — this is what makes the surface read as machined steel */}
      <Lightformer
        form="rect"
        intensity={16}
        position={[0, 5, 2]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[12, 6, 1]}
        color="#ffffff"
      />
      {/* narrow softbox streaks — the sharp specular bands that read as polished metal */}
      <Lightformer
        form="rect"
        intensity={26}
        position={[-2.4, 3.4, 3]}
        rotation={[0, 0, Math.PI / 3.2]}
        scale={[0.5, 9, 1]}
        color="#ffffff"
      />
      <Lightformer
        form="rect"
        intensity={18}
        position={[3.2, -2.6, 3]}
        rotation={[0, 0, Math.PI / 2.6]}
        scale={[0.32, 8, 1]}
        color="#e8f0ff"
      />
      {/*
        Front fill is split into two offset panels of differing intensity.
        A single uniform panel makes flat faces reflect one solid colour,
        which reads as plastic rather than metal.
      */}
      <Lightformer form="rect" intensity={2.4} position={[-2.6, 1.8, 7]} scale={[5, 6, 1]} color="#ffffff" />
      <Lightformer form="rect" intensity={0.9} position={[2.8, -1.6, 7]} scale={[5, 6, 1]} color="#cfdcf2" />
      {/* signal red edge rim, camera-left — grazing angle only */}
      <Lightformer
        form="rect"
        intensity={4.5}
        position={[-6, 0.6, 1]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[5, 4, 1]}
        color="#ff3b47"
      />
      {/* brand blue edge rim, camera-right */}
      <Lightformer
        form="rect"
        intensity={4.5}
        position={[6, 0.2, 1]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[5, 4, 1]}
        color="#3b82f6"
      />
      {/* cool separation from behind */}
      <Lightformer form="circle" intensity={2} position={[0, 1.5, -7]} scale={6} color="#bfd4fe" />
      {/* dark floor so the underside doesn't blow out */}
      <Lightformer
        form="rect"
        intensity={0.5}
        position={[0, -5, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[10, 10, 1]}
        color="#0f172a"
      />
    </Environment>
  );
}

/* ============================================================
   Scene
   ============================================================ */

const PARTS = ["bracket", "busbar", "housing"] as const;
export type PartKey = (typeof PARTS)[number];

function Scene({
  index,
  reduced,
  lite,
}: {
  index: number;
  reduced: boolean;
  lite: boolean;
}) {
  const steel = useMetal("#f4f7fb", 0.16);
  const brass = useMetal("#c9b083", 0.28);
  const alloy = useMetal("#d6dee8", 0.28);

  return (
    <>
      <color attach="background" args={["#04060c"]} />
      <fog attach="fog" args={["#04060c", 7, 15]} />

      <ambientLight intensity={0.12} />
      <directionalLight
        position={[4, 6, 5]}
        intensity={2.6}
        castShadow={!lite}
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-3, 2, 6]} intensity={0.5} color="#eef2f7" />
      <pointLight position={[-4.5, 1, 2]} intensity={7} color="#ff3b47" distance={12} decay={2} />
      <pointLight position={[4.5, -1, 2]} intensity={7} color="#3b82f6" distance={12} decay={2} />

      <Studio />

      <Float speed={reduced ? 0 : 1.15} rotationIntensity={reduced ? 0 : 0.16} floatIntensity={reduced ? 0 : 0.4}>
        <Rig reduced={reduced}>
          <PartSlot active={index === 0} spinOffset={0.7}>
            <Bracket material={steel} />
          </PartSlot>
          <PartSlot active={index === 1} spinOffset={-0.7}>
            <Busbar material={brass} />
          </PartSlot>
          <PartSlot active={index === 2} spinOffset={0.5}>
            <Housing material={alloy} />
          </PartSlot>
        </Rig>
      </Float>

      {!reduced && <ScanPlane />}

      {!lite && (
        <ContactShadows
          position={[0, -1.55, 0]}
          opacity={0.62}
          scale={11}
          blur={2.8}
          far={4}
          resolution={512}
          color="#000814"
        />
      )}
    </>
  );
}

/* ============================================================
   Exported canvas
   ============================================================ */

export default function PrecisionPartScene({
  index,
  className,
  lite = false,
  active = true,
}: {
  index: number;
  className?: string;
  /** Mobile / low-power mode: no shadows, lower pixel ratio. */
  lite?: boolean;
  /** False once the hero scrolls out of view — stops the render loop. */
  active?: boolean;
}) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  return (
    <Canvas
      className={className}
      shadows={!lite}
      frameloop={active ? "always" : "never"}
      dpr={lite ? [1, 1.25] : [1, 1.75]}
      gl={{
        antialias: !lite,
        alpha: false,
        powerPreference: lite ? "default" : "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
      }}
      camera={{ position: [0, 0.3, lite ? 6.1 : 5.4], fov: 38, near: 0.1, far: 40 }}
    >
      <Scene index={index} reduced={reduced} lite={lite} />
    </Canvas>
  );
}
