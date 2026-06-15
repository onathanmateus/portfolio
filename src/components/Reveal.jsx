"use client";

import { motion } from "motion/react";

const EASE = [0.76, 0, 0.24, 1];
const VIEWPORT = { once: true, amount: 0.2, margin: "0px 0px -10% 0px" };

// O wrapper externo é quem OBSERVA (nunca é cortado, então o IntersectionObserver
// sempre detecta). O filho interno é quem ANIMA (clip-path), evitando o paradoxo
// de o elemento se esconder de si mesmo antes de entrar em vista.
export function Reveal({ children, delay = 0, x = 0, y = 24, className }) {
  return (
    <motion.div
      className="h-full"
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{ hidden: {}, show: {} }}
    >
      <motion.div
        className={`h-full ${className || ""}`}
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
