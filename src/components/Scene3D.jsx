"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, MeshDistortMaterial, Sparkles, Float } from "@react-three/drei";
import { useRef } from "react";

// Núcleo neon distorcido (wireframe) que gira e reage ao mouse.
function Core() {
  const ref = useRef(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y += 0.0025;
    ref.current.rotation.x += (state.pointer.y * 0.4 - ref.current.rotation.x) * 0.05;
    ref.current.rotation.z += (state.pointer.x * 0.3 - ref.current.rotation.z) * 0.05;
  });
  return (
    <Float speed={1.4} rotationIntensity={0.5} floatIntensity={1.1}>
      <group ref={ref}>
        {/* Cage wireframe externo */}
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
        {/* Núcleo sólido interno translúcido */}
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

export default function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.2], fov: 50 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.35} />
      <pointLight position={[4, 4, 4]} color="#22d3ee" intensity={3} />
      <pointLight position={[-4, -2, -3]} color="#3b82f6" intensity={2} />
      <pointLight position={[0, 0, 3]} color="#67e8f9" intensity={1.2} />
      <Core />
      <Sparkles count={140} scale={[8, 6, 4]} size={2.4} speed={0.35} color="#67e8f9" opacity={0.7} />
    </Canvas>
  );
}
