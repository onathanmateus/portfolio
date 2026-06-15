"use client";

import { useRef } from "react";
import { motion } from "motion/react";

const EASE = [0.76, 0, 0.24, 1];
const VIEWPORT = { once: true, amount: 0.2, margin: "0px 0px -10% 0px" };

// O wrapper externo OBSERVA (nunca é cortado); o filho interno ANIMA (clip-path).
// Ao terminar, removemos o clip para não recortar a borda/bracket no hover (Tilt).
export function Reveal({ children, delay = 0, x = 0, y = 24, className }) {
  const ref = useRef(null);
  return (
    <motion.div
      className="h-full"
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{ hidden: {}, show: {} }}
    >
      <motion.div
        ref={ref}
        className={`h-full ${className || ""}`}
        onAnimationComplete={(def) => {
          if (def === "show" && ref.current) ref.current.style.clipPath = "none";
        }}
        variants={{
          hidden: { opacity: 0, x, y, clipPath: "inset(0% 0% 100% 0%)" },
          show: {
            opacity: 1,
            x: 0,
            y: 0,
            clipPath: "inset(0% 0% 0% 0%)",
            transition: { duration: 0.8, delay, ease: EASE },
          },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

// Container que escalona a entrada dos filhos (observa a si mesmo, sem clip).
export function Stagger({ children, className, gap = 0.1, delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: gap, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

// Item para usar dentro de <Stagger> — wipe da esquerda p/ direita.
export function RevealItem({ children, className, y = 14 }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y, clipPath: "inset(0% 100% 0% 0%)" },
        show: {
          opacity: 1,
          y: 0,
          clipPath: "inset(0% 0% 0% 0%)",
          transition: { duration: 0.55, ease: EASE },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
