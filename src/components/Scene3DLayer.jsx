"use client";

import dynamic from "next/dynamic";

// Carrega o 3D só no cliente (WebGL) e o mantém montado globalmente.
const Scene3D = dynamic(() => import("./Scene3D"), { ssr: false, loading: () => null });

export function Scene3DLayer() {
  return <Scene3D />;
}
