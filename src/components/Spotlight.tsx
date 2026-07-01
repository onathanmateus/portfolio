"use client";

import { useEffect, useRef, useState } from "react";

// Brilho radial suave que segue o cursor. Só em ponteiro fino e quando o
// usuário não pediu menos movimento.
export function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- depende de media queries do cliente
    setEnabled(true);

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        el.style.setProperty("--spot-x", `${e.clientX}px`);
        el.style.setProperty("--spot-y", `${e.clientY}px`);
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 opacity-70 transition-opacity"
      style={{
        background:
          "radial-gradient(500px circle at var(--spot-x, 50%) var(--spot-y, 0px), color-mix(in oklab, var(--accent) 18%, transparent), transparent 60%)",
      }}
    />
  );
}
