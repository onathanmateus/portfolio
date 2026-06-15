"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Carrega o 3D só no cliente (WebGL) e o mantém montado globalmente.
const Scene3D = dynamic(() => import("./Scene3D"), { ssr: false, loading: () => null });

// O 3D (three.js) só é baixado/renderizado no desktop e sem reduced-motion.
// No mobile evitamos ~243 KiB de JS e o trabalho pesado de main-thread.
export function Scene3DLayer() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(wide.matches && !reduce.matches);
    update();
    wide.addEventListener("change", update);
    reduce.addEventListener("change", update);
    return () => {
      wide.removeEventListener("change", update);
      reduce.removeEventListener("change", update);
    };
  }, []);

  if (!enabled) return null;
  return <Scene3D />;
}
