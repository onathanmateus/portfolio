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
const WALL_H = 2.2;
const MAX_PTS = 800;
const HIT2 = 0.75 * 0.75;
const COL_TOP = [0.45, 1.0, 1.15];
const COL_BOT = [0.03, 0.26, 0.34];

// ---- helpers ----
function buildTrail(points, geo) {
  const n = points.length;
  if (n < 2) {
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(0), 3));
    geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(0), 3));
    return;
  }
  const segs = n - 1;
  const pos = new Float32Array(segs * 18);
  const col = new Float32Array(segs * 18);
  for (let i = 0; i < segs; i++) {
    const a = points[i], b = points[i + 1];
    const P = [
      a.x, 0, a.y, a.x, WALL_H, a.y, b.x, WALL_H, b.y,
      a.x, 0, a.y, b.x, WALL_H, b.y, b.x, 0, b.y,
    ];
    const C = [
      ...COL_BOT, ...COL_TOP, ...COL_TOP,
      ...COL_BOT, ...COL_TOP, ...COL_BOT,
    ];
    const base = i * 18;
    for (let j = 0; j < 18; j++) {
      pos[base + j] = P[j];
      col[base + j] = C[j];
    }
  }
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
}
// faixa de luz no chão (sempre visível de cima), seguindo o caminho
function buildFloor(points, geo, halfW) {
  const n = points.length;
  if (n < 2) {
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(0), 3));
    return;
  }
  const segs = n - 1;
  const pos = new Float32Array(segs * 18);
  for (let i = 0; i < segs; i++) {
    const a = points[i], b = points[i + 1];
    let dx = b.x - a.x, dz = b.y - a.y;
    const len = Math.hypot(dx, dz) || 1;
    dx /= len;
    dz /= len;
    const px = -dz * halfW, pz = dx * halfW;
    const P = [
      a.x + px, 0.05, a.y + pz, a.x - px, 0.05, a.y - pz, b.x - px, 0.05, b.y - pz,
      a.x + px, 0.05, a.y + pz, b.x - px, 0.05, b.y - pz, b.x + px, 0.05, b.y + pz,
    ];
    const base = i * 18;
    for (let j = 0; j < 18; j++) pos[base + j] = P[j];
  }
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
}
function segDist2(px, pz, ax, az, bx, bz) {
  const dx = bx - ax, dz = bz - az;
  const l2 = dx * dx + dz * dz;
  let t = l2 > 0 ? ((px - ax) * dx + (pz - az) * dz) / l2 : 0;
  t = t < 0 ? 0 : t > 1 ? 1 : t;
  const ex = px - (ax + t * dx), ez = pz - (az + t * dz);
  return ex * ex + ez * ez;
}
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
      const sc = 1 + Math.sin(t * 2.5) * 0.12;
      core.current.scale.setScalar(sc);
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
        {/* chassi principal baixo */}
        <mesh position={[0, -0.05, 0]}>
          <boxGeometry args={[0.36, 0.34, 2.7]} />
          <meshStandardMaterial color="#071521" emissive="#22d3ee" emissiveIntensity={0.3} metalness={0.95} roughness={0.18} />
        </mesh>
        {/* carenagem dianteira (cunha) */}
        <mesh position={[0, 0.02, 1.55]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.3, 1.3, 4]} />
          <meshStandardMaterial color="#06121d" emissive="#22d3ee" emissiveIntensity={0.35} metalness={0.95} roughness={0.18} />
        </mesh>
        {/* carenagem traseira */}
        <mesh position={[0, 0.05, -1.45]} rotation={[-Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.28, 1.1, 4]} />
          <meshStandardMaterial color="#06121d" emissive="#22d3ee" emissiveIntensity={0.35} metalness={0.95} roughness={0.18} />
        </mesh>
        {/* espinha neon no topo */}
        <mesh position={[0, 0.18, 0]}>
          <boxGeometry args={[0.07, 0.06, 2.9]} />
          <meshBasicMaterial color="#a9f3ff" toneMapped={false} />
        </mesh>
        {/* faixas neon laterais */}
        {[-0.2, 0.2].map((x) => (
          <mesh key={x} position={[x, -0.02, 0]}>
            <boxGeometry args={[0.04, 0.16, 2.6]} />
            <meshBasicMaterial color="#22d3ee" toneMapped={false} />
          </mesh>
        ))}
        {/* canopy */}
        <mesh position={[0, 0.26, -0.1]} scale={[0.7, 0.55, 1.5]}>
          <sphereGeometry args={[0.3, 18, 14]} />
          <meshStandardMaterial color="#020a12" emissive="#67e8f9" emissiveIntensity={0.4} metalness={1} roughness={0.08} />
        </mesh>
        {/* núcleo do motor */}
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

function World({ keysRef, onActive, telemetryRef, onDeath, active }) {
  const bikeRef = useRef(null);
  const { camera } = useThree();
  const wallGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(0), 3));
    g.setAttribute("color", new THREE.BufferAttribute(new Float32Array(0), 3));
    return g;
  }, []);
  const floorGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(0), 3));
    return g;
  }, []);
  const m = useRef({
    heading: START.heading,
    speed: 0,
    pos: new THREE.Vector3(START.x, 0, START.z),
    points: [],
    lastX: START.x,
    lastZ: START.z,
    dead: false,
    deadAt: 0,
  });
  const lastActive = useRef(null);

  function respawn() {
    const s = m.current;
    s.pos.set(START.x, 0, START.z);
    s.heading = START.heading;
    s.speed = 0;
    s.points = [];
    s.lastX = START.x;
    s.lastZ = START.z;
    buildTrail(s.points, wallGeo);
    buildFloor(s.points, floorGeo, 0.45);
  }

  useFrame((stt, delta) => {
    const dt = Math.min(delta, 0.05);
    const s = m.current;
    const now = stt.clock.elapsedTime;

    if (s.dead) {
      if (bikeRef.current) bikeRef.current.scale.setScalar(THREE.MathUtils.damp(bikeRef.current.scale.x, 0.01, 10, dt));
      if (now - s.deadAt > 1) { s.dead = false; respawn(); }
      telemetryRef.current.dead = true;
      telemetryRef.current.speed = 0;
      return;
    }
    if (bikeRef.current && bikeRef.current.scale.x < 0.999) {
      bikeRef.current.scale.setScalar(THREE.MathUtils.damp(bikeRef.current.scale.x, 1, 10, dt));
    }

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

    if (s.speed > 1) {
      const d2 = (s.pos.x - s.lastX) ** 2 + (s.pos.z - s.lastZ) ** 2;
      if (d2 > 0.6) {
        s.points.push(new THREE.Vector2(s.pos.x, s.pos.z));
        s.lastX = s.pos.x;
        s.lastZ = s.pos.z;
        if (s.points.length > MAX_PTS) s.points.shift();
        buildTrail(s.points, wallGeo);
        buildFloor(s.points, floorGeo, 0.45);
      }
    }

    const pts = s.points;
    const skip = 6;
    let crashed = false;
    for (let i = 0; i < pts.length - 1 - skip; i++) {
      if (segDist2(s.pos.x, s.pos.z, pts[i].x, pts[i].y, pts[i + 1].x, pts[i + 1].y) < HIT2) {
        crashed = true;
        break;
      }
    }
    if (crashed) {
      s.dead = true;
      s.deadAt = now;
      if (onDeath) onDeath();
      telemetryRef.current.dead = true;
      return;
    }

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
    tel.dead = false;
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

      <mesh geometry={floorGeo}>
        <meshBasicMaterial color="#3ee4f5" transparent opacity={0.7} side={THREE.DoubleSide} depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
      </mesh>
      <mesh geometry={wallGeo}>
        <meshBasicMaterial vertexColors transparent opacity={0.9} side={THREE.DoubleSide} depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
      </mesh>

      <LightCycle bikeRef={bikeRef} />
      <Buildings />
      {SECTIONS.map((sec) => (
        <Portal key={sec.id} pos={sec.pos} label={sec.label} n={sec.n} active={active === sec.id} />
      ))}
    </>
  );
}

export default function TronScene({ keysRef, onActive, telemetryRef, onDeath, active }) {
  return (
    <Canvas
      camera={{ position: [0, 7, 30], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <World keysRef={keysRef} onActive={onActive} telemetryRef={telemetryRef} onDeath={onDeath} active={active} />
    </Canvas>
  );
}
