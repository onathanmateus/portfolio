"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, MeshDistortMaterial, Sparkles, Float } from "@react-three/drei";

// Núcleo neon distorcido (wireframe) que gira e reage ao mouse (via ref global).
function Core({ mouse }) {
  const ref = useRef(null);
  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.y += 0.0025;
    ref.current.rotation.x += (mouse.current.y * 0.4 - ref.current.rotation.x) * 0.05;
    ref.current.rotation.z += (mouse.current.x * 0.3 - ref.current.rotation.z) * 0.05;
  });
  return (
    <Float speed={1.4} rotationIntensity={0.5} floatIntensity={1.1}>
      <group ref={ref}>
        <Icosahedron args={[1.55, 5]}>
          <MeshDistortMaterial
            color="#22d3ee"
            emissive="#0e7490"
            emissiveIntensity={0.7}
            wireframe
            distort={0.45}
            speed={2.2}
            roughness={0.2}
            metalness={0.9}
          />
        </Icosahedron>
        <Icosahedron args={[1.05, 4]}>
          <MeshDistortMaterial
            color="#0a1828"
            emissive="#22d3ee"
            emissiveIntensity={0.35}
            distort={0.5}
            speed={1.6}
            roughness={0.1}
            metalness={1}
            transparent
            opacity={0.55}
          />
        </Icosahedron>
      </group>
    </Float>
  );
}

// Layer 3D global e persistente: visível/ativo só na landing ("/").
// Não desmonta na navegação (evita "Context Lost") e fica pausado fora da home.
export default function Scene3D() {
  const pathname = usePathname();
  const active = pathname === "/";
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 -z-[5] transition-opacity duration-700 ${
        active ? "opacity-40 dark:opacity-100" : "opacity-0"
      }`}
    >
      <Canvas
        frameloop={active ? "always" : "never"}
        camera={{ position: [0, 0, 4.2], fov: 50 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.35} />
        <pointLight position={[4, 4, 4]} color="#22d3ee" intensity={3} />
        <pointLight position={[-4, -2, -3]} color="#3b82f6" intensity={2} />
        <pointLight position={[0, 0, 3]} color="#67e8f9" intensity={1.2} />
        <Core mouse={mouse} />
        <Sparkles count={140} scale={[8, 6, 4]} size={2.4} speed={0.35} color="#67e8f9" opacity={0.7} />
      </Canvas>
    </div>
  );
}
