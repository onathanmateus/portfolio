"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Grid, Html, Edges, Sparkles } from "@react-three/drei";
import * as THREE from "three";

export const SECTIONS = [
  { id: "/sobre", label: "SOBRE", n: "01", pos: [0, 0, -38] },
  { id: "/experiencia", label: "EXPERIÊNCIA", n: "02", pos: [40, 0, -8] },
  { id: "/skills", label: "SKILLS", n: "03", pos: [26, 0, 36] },
  { id: "/formacao", label: "FORMAÇÃO", n: "04", pos: [-26, 0, 36] },
  { id: "/contato", label: "CONTATO", n: "05", pos: [-40, 0, -8] },
];

export const ARENA = 52;
const START = { x: 0, z: 18, heading: Math.PI };

function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ---- cidade neon ----
function Buildings() {
  const items = useMemo(() => {
    const r = rng(7);
    const out = [];
    for (let i = 0; i < 54; i++) {
      const ang = r() * Math.PI * 2;
      const rad = 66 + r() * 90;
      const w = 5 + r() * 13;
      const d = 5 + r() * 13;
      const h = 12 + r() * 60;
      const accent = r() > 0.82;
      const stripes = [];
      const sc = 2 + Math.floor(r() * 4);
      for (let k = 1; k <= sc; k++) stripes.push((k / (sc + 1)) * h - h / 2);
      out.push({ x: Math.cos(ang) * rad, z: Math.sin(ang) * rad, w, d, h, stripes, accent, key: i });
    }
    return out;
  }, []);
  return (
    <group>
      {items.map((b) => {
        const edge = b.accent ? "#4f8cff" : "#22d3ee";
        return (
          <group key={b.key} position={[b.x, 0, b.z]}>
            <mesh position={[0, b.h / 2, 0]}>
              <boxGeometry args={[b.w, b.h, b.d]} />
              <meshStandardMaterial color="#02060b" emissive={edge} emissiveIntensity={0.25} metalness={0.6} roughness={0.55} />
              <Edges color={edge} />
            </mesh>
            {b.stripes.map((y, si) => (
              <mesh key={si} position={[0, b.h / 2 + y, 0]}>
                <boxGeometry args={[b.w + 0.06, 0.18, b.d + 0.06]} />
                <meshBasicMaterial color={edge} transparent opacity={0.6} toneMapped={false} />
              </mesh>
            ))}
            <mesh position={[0, b.h + 0.6, 0]}>
              <sphereGeometry args={[0.3, 8, 8]} />
              <meshBasicMaterial color={edge} toneMapped={false} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

// ---- portais ----
function Portal({ pos, label, n, active }) {
  const r1 = useRef(null);
  const r2 = useRef(null);
  const core = useRef(null);
  const beam = useRef(null);
  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (r1.current) r1.current.rotation.z = t * 0.6;
    if (r2.current) { r2.current.rotation.z = -t * 0.9; r2.current.rotation.x = t * 0.4; }
    if (core.current) {
      core.current.rotation.y = t * 1.1;
      core.current.rotation.x = t * 0.7;
      core.current.scale.setScalar(1 + Math.sin(t * 2.5) * 0.12);
    }
    if (beam.current) beam.current.material.opacity = 0.16 + Math.sin(t * 3) * 0.05 + (active ? 0.22 : 0);
  });
  const color = active ? "#ffffff" : "#22d3ee";
  const ei = active ? 3.6 : 1.6;
  return (
    <group position={pos}>
      <mesh ref={r1} position={[0, 3.6, 0]}>
        <torusGeometry args={[3.2, 0.16, 16, 64]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={ei} toneMapped={false} />
      </mesh>
      <mesh ref={r2} position={[0, 3.6, 0]}>
        <torusGeometry args={[2.3, 0.1, 12, 48]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={ei * 0.8} toneMapped={false} />
      </mesh>
      <mesh ref={core} position={[0, 3.6, 0]}>
        <icosahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={ei * 1.2} wireframe toneMapped={false} />
      </mesh>
      {[-3.2, 3.2].map((x) => (
        <mesh key={x} position={[x, 1.8, 0]}>
          <cylinderGeometry args={[0.16, 0.22, 3.6, 12]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={ei * 0.6} toneMapped={false} />
        </mesh>
      ))}
      <mesh ref={beam} position={[0, 9, 0]}>
        <cylinderGeometry args={[1.6, 1.6, 18, 24, 1, true]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} side={THREE.DoubleSide} depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
        <ringGeometry args={[2.5, 3.9, 64]} />
        <meshBasicMaterial color={color} transparent opacity={active ? 0.6 : 0.24} toneMapped={false} />
      </mesh>
      <Sparkles count={22} scale={[5, 7, 5]} position={[0, 4, 0]} size={3} speed={0.5} color={color} opacity={0.7} />
      <pointLight position={[0, 3.6, 0]} color={color} intensity={active ? 12 : 4} distance={30} />
      <Html position={[0, 7, 0]} center distanceFactor={30} occlude={false}>
        <div className={`pointer-events-none whitespace-nowrap font-mono text-sm uppercase tracking-[0.25em] ${active ? "text-white" : "text-accent"}`}>
          <span className="opacity-60">[{n}]</span> {label}
        </div>
      </Html>
    </group>
  );
}

// ---- moto de luz detalhada ----
function Wheel({ z }) {
  return (
    <group position={[0, 0, z]}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.72, 0.72, 0.26, 32]} />
        <meshStandardMaterial color="#03070c" metalness={0.85} roughness={0.35} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.72, 0.07, 14, 40]} />
        <meshBasicMaterial color="#22d3ee" toneMapped={false} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.42, 0.04, 12, 32]} />
        <meshBasicMaterial color="#67e8f9" toneMapped={false} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.34, 0.34, 0.3, 20]} />
        <meshStandardMaterial color="#06121d" emissive="#22d3ee" emissiveIntensity={0.5} metalness={1} roughness={0.2} />
      </mesh>
    </group>
  );
}
function LightCycle({ bikeRef }) {
  return (
    <group ref={bikeRef}>
      <group position={[0, 0.72, 0]}>
        <mesh position={[0, -0.05, 0]}>
          <boxGeometry args={[0.36, 0.34, 2.7]} />
          <meshStandardMaterial color="#071521" emissive="#22d3ee" emissiveIntensity={0.3} metalness={0.95} roughness={0.18} />
        </mesh>
        <mesh position={[0, 0.02, 1.55]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.3, 1.3, 4]} />
          <meshStandardMaterial color="#06121d" emissive="#22d3ee" emissiveIntensity={0.35} metalness={0.95} roughness={0.18} />
        </mesh>
        <mesh position={[0, 0.05, -1.45]} rotation={[-Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.28, 1.1, 4]} />
          <meshStandardMaterial color="#06121d" emissive="#22d3ee" emissiveIntensity={0.35} metalness={0.95} roughness={0.18} />
        </mesh>
        <mesh position={[0, 0.18, 0]}>
          <boxGeometry args={[0.07, 0.06, 2.9]} />
          <meshBasicMaterial color="#a9f3ff" toneMapped={false} />
        </mesh>
        {[-0.2, 0.2].map((x) => (
          <mesh key={x} position={[x, -0.02, 0]}>
            <boxGeometry args={[0.04, 0.16, 2.6]} />
            <meshBasicMaterial color="#22d3ee" toneMapped={false} />
          </mesh>
        ))}
        <mesh position={[0, 0.26, -0.1]} scale={[0.7, 0.55, 1.5]}>
          <sphereGeometry args={[0.3, 18, 14]} />
          <meshStandardMaterial color="#020a12" emissive="#67e8f9" emissiveIntensity={0.4} metalness={1} roughness={0.08} />
        </mesh>
        <mesh position={[0, 0, -0.2]}>
          <sphereGeometry args={[0.16, 12, 12]} />
          <meshBasicMaterial color="#a9f3ff" toneMapped={false} />
        </mesh>
        <Wheel z={1.25} />
        <Wheel z={-1.25} />
        <pointLight position={[0, 0.1, 2]} color="#67e8f9" intensity={7} distance={18} />
        <pointLight position={[0, 0.5, 0]} color="#22d3ee" intensity={2.5} distance={7} />
      </group>
    </group>
  );
}

function World({ keysRef, onActive, telemetryRef, active }) {
  const bikeRef = useRef(null);
  const { camera } = useThree();
  const m = useRef({ heading: START.heading, speed: 0, pos: new THREE.Vector3(START.x, 0, START.z) });
  const lastActive = useRef(null);

  useFrame((stt, delta) => {
    const dt = Math.min(delta, 0.05);
    const s = m.current;
    const k = keysRef.current;

    const accel = 26, maxFwd = 32, maxBack = 10, steer = 2.1;
    if (k.forward) s.speed += accel * dt;
    else if (k.back) s.speed -= accel * dt;
    else s.speed = THREE.MathUtils.damp(s.speed, 0, 3, dt);
    s.speed = THREE.MathUtils.clamp(s.speed, -maxBack, maxFwd);

    const turn = (k.left ? 1 : 0) - (k.right ? 1 : 0);
    const sf = THREE.MathUtils.clamp(Math.abs(s.speed) / 5, 0, 1);
    s.heading += turn * steer * dt * sf * Math.sign(s.speed || 1);

    const dirX = Math.sin(s.heading), dirZ = Math.cos(s.heading);
    s.pos.x = THREE.MathUtils.clamp(s.pos.x + dirX * s.speed * dt, -ARENA, ARENA);
    s.pos.z = THREE.MathUtils.clamp(s.pos.z + dirZ * s.speed * dt, -ARENA, ARENA);

    if (bikeRef.current) {
      bikeRef.current.position.copy(s.pos);
      bikeRef.current.rotation.y = s.heading;
      bikeRef.current.rotation.z = THREE.MathUtils.damp(bikeRef.current.rotation.z, -turn * 0.24 * sf, 6, dt);
    }

    const ct = new THREE.Vector3(s.pos.x - dirX * 9.5, 5.6, s.pos.z - dirZ * 9.5);
    camera.position.lerp(ct, 1 - Math.pow(0.0009, dt));
    camera.lookAt(s.pos.x, 1, s.pos.z);

    let near = null;
    for (const sec of SECTIONS) {
      const dx = s.pos.x - sec.pos[0], dz = s.pos.z - sec.pos[2];
      if (dx * dx + dz * dz < 24) { near = sec.id; break; }
    }
    if (near !== lastActive.current) {
      lastActive.current = near;
      onActive(near);
    }

    const tel = telemetryRef.current;
    tel.x = s.pos.x;
    tel.z = s.pos.z;
    tel.heading = s.heading;
    tel.speed = s.speed;
  });

  return (
    <>
      <color attach="background" args={["#04060a"]} />
      <fog attach="fog" args={["#04060a", 42, 150]} />
      <ambientLight intensity={0.22} />
      <directionalLight position={[10, 30, 10]} intensity={0.4} color="#67e8f9" />
      <hemisphereLight args={["#0a2230", "#020308", 0.5]} />

      <Grid
        args={[300, 300]}
        cellSize={2}
        cellThickness={0.6}
        cellColor="#0e3b44"
        sectionSize={10}
        sectionThickness={1.2}
        sectionColor="#22d3ee"
        infiniteGrid
        fadeDistance={150}
        fadeStrength={1.3}
      />

      <LightCycle bikeRef={bikeRef} />
      <Buildings />
      {SECTIONS.map((sec) => (
        <Portal key={sec.id} pos={sec.pos} label={sec.label} n={sec.n} active={active === sec.id} />
      ))}
    </>
  );
}

export default function TronScene({ keysRef, onActive, telemetryRef, active }) {
  return (
    <Canvas
      camera={{ position: [0, 7, 30], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <World keysRef={keysRef} onActive={onActive} telemetryRef={telemetryRef} active={active} />
    </Canvas>
  );
}
