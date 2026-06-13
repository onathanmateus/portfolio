"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

// Cursor HUD cyberpunk: ponto central instantâneo + anel/reticle que segue
// com leve atraso e reage ao passar sobre links/botões.
// Ativo só em ponteiro fino; com reduced-motion, mantém o cursor nativo.
export function Cursor() {
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 30, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 350, damping: 30, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    document.documentElement.classList.add("custom-cursor");

    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e) => {
      if (e.target.closest?.("a, button, [role='button'], [data-cursor]")) {
        setHovering(true);
      }
    };
    const onOut = (e) => {
      if (e.target.closest?.("a, button, [role='button'], [data-cursor]")) {
        setHovering(false);
      }
    };

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);
    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
    };
  }, [x, y]);

  return (
    <>
      {/* Ponto central */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[90] hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent [@media(pointer:fine)]:block"
        style={{ x, y, boxShadow: "0 0 8px var(--glow)" }}
      />
      {/* Anel / reticle */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[90] hidden h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent [@media(pointer:fine)]:block"
        style={{ x: ringX, y: ringY }}
        animate={{
          scale: hovering ? 1.8 : 1,
          opacity: hovering ? 1 : 0.5,
          borderRadius: hovering ? "8px" : "9999px",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </>
  );
}
