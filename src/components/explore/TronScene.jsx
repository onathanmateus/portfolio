"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Grid, Trail, Html } from "@react-three/drei";
import * as THREE from "three";

export const SECTIONS = [
  { id: "/sobre", label: "SOBRE", n: "01", pos: [0, 0, -34] },
  { id: "/experiencia", label: "EXPERIÊNCIA", n: "02", pos: [36, 0, -8] },
  { id: "/skills", label: "SKILLS", n: "03", pos: [22, 0, 30] },
  { id: "/formacao", label: "FORMAÇÃO", n: "04", pos: [-22, 0, 30] },
  { id: "/contato", label: "CONTATO", n: "05", pos: [-36, 0, -8] },
];

function Portal({ pos, label, n, active }) {
  const ring = useRef(null);
  useFrame((s) => {
    if (ring.current) ring.current.rotation.y = s.clock.elapsedTime * 0.6;
  });
  const color = active ? "#ffffff" : "#22d3ee";
  const intensity = active ? 3.2 : 1.4;
  return (
    <group position={pos}>
      <mesh ref={ring} position={[0, 3.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3, 0.16, 16, 56]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={intensity} toneMapped={false} />
      </mesh>
      {[-3, 3].map((x) => (
        <mesh key={x} position={[x, 1.7, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 3.4, 10]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={intensity * 0.7} toneMapped={false} />
        </mesh>
      ))}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
        <ringGeometry args={[2.4, 3.6, 56]} />
        <meshBasicMaterial color={color} transparent opacity={active ? 0.55 : 0.22} toneMapped={false} />
      </mesh>
      <pointLight position={[0, 3, 0]} color={color} intensity={active ? 8 : 3} distance={20} />
      <Html position={[0, 6.4, 0]} center distanceFactor={26} occlude={false}>
        <div className={`pointer-events-none whitespace-nowrap font-mono text-sm uppercase tracking-[0.25em] ${active ? "text-white" : "text-accent"}`}>
          <span className="opacity-60">[{n}]</span> {label}
        </div>
      </Html>
    </group>
  );
}

function LightCycle({ bikeRef }) {
  return (
    <group ref={bikeRef}>
      <group position={[0, 0.55, 0]}>
        {/* corpo */}
        <mesh>
          <boxGeometry args={[0.5, 0.42, 2.8]} />
          <meshStandardMaterial color="#0a1828" emissive="#22d3ee" emissiveIntensity={0.35} metalness={0.9} roughness={0.25} />
        </mesh>
        {/* faixa neon */}
        <mesh>
          <boxGeometry args={[0.54, 0.1, 2.84]} />
          <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={3} toneMapped={false} />
        </mesh>
        {/* canopy */}
        <mesh position={[0, 0.28, -0.2]}>
          <boxGeometry args={[0.42, 0.3, 1]} />
          <meshStandardMaterial color="#06141f" emissive="#22d3ee" emissiveIntensity={0.5} metalness={0.9} roughness={0.2} />
        </mesh>
        {/* rodas */}
        {[1.05, -1.05].map((z) => (
          <mesh key={z} position={[0, -0.1, z]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.6, 0.6, 0.26, 28]} />
            <meshStandardMaterial color="#04060a" emissive="#22d3ee" emissiveIntensity={0.8} toneMapped={false} />
          </mesh>
        ))}
        {/* farol */}
        <pointLight position={[0, 0.1, 1.6]} color="#67e8f9" intensity={5} distance={14} />
      </group>
    </group>
  );
}

function World({ keysRef, onActive, active }) {
  const bikeRef = useRef(null);
  const { camera } = useThree();
  const st = useRef({ heading: 0, speed: 0, pos: new THREE.Vector3(0, 0, 14) });
  const lastActive = useRef(null);

  useFrame((s, delta) => {
    const dt = Math.min(delta, 0.05);
    const k = keysRef.current;
    const m = st.current;
    const accel = 24, maxFwd = 28, maxBack = 9, steer = 1.9, friction = 14;

    if (k.forward) m.speed += accel * dt;
    else if (k.back) m.speed -= accel * dt;
    else m.speed = THREE.MathUtils.damp(m.speed, 0, 3, dt);
    m.speed = THREE.MathUtils.clamp(m.speed, -maxBack, maxFwd);

    const turn = (k.left ? 1 : 0) - (k.right ? 1 : 0);
    const speedFactor = THREE.MathUtils.clamp(Math.abs(m.speed) / 5, 0, 1);
    m.heading += turn * steer * dt * speedFactor * Math.sign(m.speed || 1);

    const dirX = Math.sin(m.heading), dirZ = Math.cos(m.heading);
    m.pos.x += dirX * m.speed * dt;
    m.pos.z += dirZ * m.speed * dt;
    const B = 50;
    m.pos.x = THREE.MathUtils.clamp(m.pos.x, -B, B);
    m.pos.z = THREE.MathUtils.clamp(m.pos.z, -B, B);

    if (bikeRef.current) {
      bikeRef.current.position.copy(m.pos);
      bikeRef.current.rotation.y = m.heading;
      bikeRef.current.rotation.z = THREE.MathUtils.damp(bikeRef.current.rotation.z, -turn * 0.22 * speedFactor, 6, dt);
    }

    // câmera perseguição
    const camTarget = new THREE.Vector3(m.pos.x - dirX * 9, 5.2, m.pos.z - dirZ * 9);
    camera.position.lerp(camTarget, 1 - Math.pow(0.0008, dt));
    camera.lookAt(m.pos.x, m.pos.y + 1, m.pos.z);

    // proximidade dos portais
    let near = null;
    for (const sec of SECTIONS) {
      const dx = m.pos.x - sec.pos[0], dz = m.pos.z - sec.pos[2];
      if (dx * dx + dz * dz < 20) { near = sec.id; break; }
    }
    if (near !== lastActive.current) {
      lastActive.current = near;
      onActive(near);
    }
  });

  return (
    <>
      <color attach="background" args={["#04060a"]} />
      <fog attach="fog" args={["#04060a", 28, 95]} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[10, 20, 10]} intensity={0.4} color="#67e8f9" />

      <Grid
        args={[220, 220]}
        cellSize={2}
        cellThickness={0.6}
        cellColor="#0e3b44"
        sectionSize={10}
        sectionThickness={1.2}
        sectionColor="#22d3ee"
        infiniteGrid
        fadeDistance={95}
        fadeStrength={1.5}
      />

      <Trail width={4} length={7} color={new THREE.Color("#22d3ee")} attenuation={(w) => w} target={bikeRef} />
      <LightCycle bikeRef={bikeRef} />

      {SECTIONS.map((sec) => (
        <Portal key={sec.id} pos={sec.pos} label={sec.label} n={sec.n} active={active === sec.id} />
      ))}
    </>
  );
}

export default function TronScene({ keysRef, onActive, active }) {
  return (
    <Canvas
      camera={{ position: [0, 6, 26], fov: 58 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <World keysRef={keysRef} onActive={onActive} active={active} />
    </Canvas>
  );
}
