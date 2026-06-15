"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Grid, Html, Edges } from "@react-three/drei";
import * as THREE from "three";

export const SECTIONS = [
  { id: "/sobre", label: "SOBRE", n: "01", pos: [0, 0, -36] },
  { id: "/experiencia", label: "EXPERIÊNCIA", n: "02", pos: [38, 0, -8] },
  { id: "/skills", label: "SKILLS", n: "03", pos: [24, 0, 34] },
  { id: "/formacao", label: "FORMAÇÃO", n: "04", pos: [-24, 0, 34] },
  { id: "/contato", label: "CONTATO", n: "05", pos: [-38, 0, -8] },
];

export const ARENA = 50;
const START = { x: 0, z: 18, heading: Math.PI };
const WALL_H = 1.8;
const MAX_PTS = 260;
const HIT2 = 0.75 * 0.75;

// ---- helpers ----
function buildWall(points, geo) {
  const n = points.length;
  if (n < 2) {
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(0), 3));
    return;
  }
  const segs = n - 1;
  const pos = new Float32Array(segs * 18);
  let o = 0;
  for (let i = 0; i < segs; i++) {
    const a = points[i], b = points[i + 1];
    const v = [
      a.x, 0, a.y, a.x, WALL_H, a.y, b.x, WALL_H, b.y,
      a.x, 0, a.y, b.x, WALL_H, b.y, b.x, 0, b.y,
    ];
    for (let j = 0; j < 18; j++) pos[o++] = v[j];
  }
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geo.computeVertexNormals();
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

// ---- cenário: cidade de neon ----
function Buildings() {
  const items = useMemo(() => {
    const r = rng(99);
    const out = [];
    for (let i = 0; i < 46; i++) {
      const ang = r() * Math.PI * 2;
      const rad = 64 + r() * 70;
      const w = 5 + r() * 12;
      const d = 5 + r() * 12;
      const h = 10 + r() * 46;
      out.push({ x: Math.cos(ang) * rad, z: Math.sin(ang) * rad, w, d, h, key: i });
    }
    return out;
  }, []);
  return (
    <group>
      {items.map((b) => (
        <mesh key={b.key} position={[b.x, b.h / 2, b.z]}>
          <boxGeometry args={[b.w, b.h, b.d]} />
          <meshStandardMaterial color="#02060b" emissive="#0a2b33" emissiveIntensity={0.4} metalness={0.6} roughness={0.5} />
          <Edges color="#22d3ee" />
        </mesh>
      ))}
    </group>
  );
}

// ---- portais ----
function Portal({ pos, label, n, active }) {
  const r1 = useRef(null);
  const r2 = useRef(null);
  const beam = useRef(null);
  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (r1.current) r1.current.rotation.z = t * 0.6;
    if (r2.current) r2.current.rotation.z = -t * 0.9;
    if (beam.current) beam.current.material.opacity = 0.18 + Math.sin(t * 3) * 0.06 + (active ? 0.2 : 0);
  });
  const color = active ? "#ffffff" : "#22d3ee";
  const ei = active ? 3.4 : 1.5;
  return (
    <group position={pos}>
      <mesh ref={r1} position={[0, 3.4, 0]}>
        <torusGeometry args={[3, 0.16, 16, 60]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={ei} toneMapped={false} />
      </mesh>
      <mesh ref={r2} position={[0, 3.4, 0]}>
        <torusGeometry args={[2.2, 0.1, 12, 48]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={ei * 0.8} toneMapped={false} />
      </mesh>
      {[-3, 3].map((x) => (
        <mesh key={x} position={[x, 1.7, 0]}>
          <cylinderGeometry args={[0.14, 0.18, 3.4, 12]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={ei * 0.6} toneMapped={false} />
        </mesh>
      ))}
      <mesh ref={beam} position={[0, 8, 0]}>
        <cylinderGeometry args={[1.4, 1.4, 16, 24, 1, true]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} side={THREE.DoubleSide} depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
        <ringGeometry args={[2.3, 3.7, 60]} />
        <meshBasicMaterial color={color} transparent opacity={active ? 0.55 : 0.22} toneMapped={false} />
      </mesh>
      <pointLight position={[0, 3, 0]} color={color} intensity={active ? 10 : 3.5} distance={26} />
      <Html position={[0, 6.6, 0]} center distanceFactor={28} occlude={false}>
        <div className={`pointer-events-none whitespace-nowrap font-mono text-sm uppercase tracking-[0.25em] ${active ? "text-white" : "text-accent"}`}>
          <span className="opacity-60">[{n}]</span> {label}
        </div>
      </Html>
    </group>
  );
}

// ---- moto de luz ----
function LightCycle({ bikeRef }) {
  return (
    <group ref={bikeRef}>
      <group position={[0, 0.62, 0]}>
        {/* chassi baixo e alongado */}
        <mesh position={[0, -0.05, 0]}>
          <boxGeometry args={[0.34, 0.28, 3.1]} />
          <meshStandardMaterial color="#081521" emissive="#22d3ee" emissiveIntensity={0.3} metalness={0.95} roughness={0.2} />
        </mesh>
        {/* carenagem superior inclinada */}
        <mesh position={[0, 0.16, -0.1]} rotation={[0.12, 0, 0]}>
          <boxGeometry args={[0.3, 0.22, 1.9]} />
          <meshStandardMaterial color="#06121d" emissive="#22d3ee" emissiveIntensity={0.45} metalness={0.95} roughness={0.18} />
        </mesh>
        {/* faixas neon laterais */}
        {[-0.18, 0.18].map((x) => (
          <mesh key={x} position={[x, 0, 0]}>
            <boxGeometry args={[0.04, 0.12, 3.0]} />
            <meshBasicMaterial color="#22d3ee" toneMapped={false} />
          </mesh>
        ))}
        {/* cockpit */}
        <mesh position={[0, 0.3, -0.15]}>
          <sphereGeometry args={[0.26, 16, 12]} />
          <meshStandardMaterial color="#031018" emissive="#67e8f9" emissiveIntensity={0.5} metalness={1} roughness={0.1} />
        </mesh>
        {/* rodas + aros neon */}
        {[1.25, -1.2].map((z) => (
          <group key={z} position={[0, -0.12, z]}>
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.62, 0.62, 0.22, 28]} />
              <meshStandardMaterial color="#03060a" metalness={0.9} roughness={0.3} />
            </mesh>
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <torusGeometry args={[0.62, 0.06, 12, 32]} />
              <meshBasicMaterial color="#22d3ee" toneMapped={false} />
            </mesh>
          </group>
        ))}
        <pointLight position={[0, 0.1, 1.8]} color="#67e8f9" intensity={6} distance={16} />
        <pointLight position={[0, 0.6, 0]} color="#22d3ee" intensity={2} distance={6} />
      </group>
    </group>
  );
}

function World({ keysRef, onActive, telemetryRef, onDeath, active }) {
  const bikeRef = useRef(null);
  const { camera } = useThree();
  const wallGeo = useMemo(() => new THREE.BufferGeometry(), []);
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
    buildWall(s.points, wallGeo);
  }

  useFrame((stt, delta) => {
    const dt = Math.min(delta, 0.05);
    const s = m.current;
    const now = stt.clock.elapsedTime;

    if (s.dead) {
      if (bikeRef.current) bikeRef.current.scale.setScalar(THREE.MathUtils.damp(bikeRef.current.scale.x, 0.01, 10, dt));
      if (now - s.deadAt > 1) {
        s.dead = false;
        respawn();
      }
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

    // rastro persistente
    if (s.speed > 1) {
      const d2 = (s.pos.x - s.lastX) ** 2 + (s.pos.z - s.lastZ) ** 2;
      if (d2 > 0.7) {
        s.points.push(new THREE.Vector2(s.pos.x, s.pos.z));
        s.lastX = s.pos.x;
        s.lastZ = s.pos.z;
        if (s.points.length > MAX_PTS) s.points.shift();
        buildWall(s.points, wallGeo);
      }
    }

    // colisão com o próprio rastro (pula os últimos segmentos perto da cauda)
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

    // proximidade dos portais
    let near = null;
    for (const sec of SECTIONS) {
      const dx = s.pos.x - sec.pos[0], dz = s.pos.z - sec.pos[2];
      if (dx * dx + dz * dz < 22) { near = sec.id; break; }
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
      <fog attach="fog" args={["#04060a", 36, 130]} />
      <ambientLight intensity={0.22} />
      <directionalLight position={[10, 30, 10]} intensity={0.4} color="#67e8f9" />

      <Grid
        args={[260, 260]}
        cellSize={2}
        cellThickness={0.6}
        cellColor="#0e3b44"
        sectionSize={10}
        sectionThickness={1.2}
        sectionColor="#22d3ee"
        infiniteGrid
        fadeDistance={130}
        fadeStrength={1.4}
      />

      <mesh geometry={wallGeo}>
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.4} side={THREE.DoubleSide} depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
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
