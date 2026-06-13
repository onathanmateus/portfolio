"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const LINES = [
  "> NM_OS v4.8 — inicializando…",
  "> montando módulos ............ OK",
  "> carregando neural_profile ... OK",
  "> estabelecendo uplink ........ OK",
  "> ACESSO LIBERADO",
];

// Intro estilo terminal: roda uma vez por sessão e pode ser pulada com um clique.
export function BootSequence() {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);
  const [lines, setLines] = useState(0);

  function finish() {
    try {
      sessionStorage.setItem("nm_booted", "1");
    } catch {
      /* ignora */
    }
    setShow(false);
    document.body.style.overflow = "";
  }

  useEffect(() => {
    let booted = false;
    try {
      booted = sessionStorage.getItem("nm_booted") === "1";
    } catch {
      /* ignora */
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (booted || reduce) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- estado externo (sessão/preferência)
      setShow(false);
      return;
    }

    document.body.style.overflow = "hidden";
    const lineTimers = LINES.map((_, i) =>
      setTimeout(() => setLines(i + 1), 250 + i * 300)
    );
    const start = performance.now();
    let raf = 0;
    const tick = (now) => {
      const p = Math.min(100, ((now - start) / 1900) * 100);
      setProgress(p);
      if (p < 100) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const done = setTimeout(finish, 2400);

    return () => {
      lineTimers.forEach(clearTimeout);
      clearTimeout(done);
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          onClick={finish}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex cursor-pointer items-center justify-center bg-[#04060a] px-6"
        >
          <div className="scanlines pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
          <div className="relative w-full max-w-md font-mono text-sm">
            {LINES.slice(0, lines).map((l, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                className={i === LINES.length - 1 ? "mt-1 font-bold neon-text" : "text-accent/80"}
              >
                {l}
              </motion.div>
            ))}
            <div className="mt-5 h-1 w-full overflow-hidden rounded-sm bg-surface-2">
              <div
                className="h-full bg-accent transition-[width] duration-100"
                style={{ width: `${progress}%`, boxShadow: "0 0 12px var(--glow)" }}
              />
            </div>
            <div className="mt-2 flex justify-between text-[10px] uppercase tracking-widest text-muted">
              <span>{Math.floor(progress)}%</span>
              <span>clique para pular</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
