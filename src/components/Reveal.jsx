"use client";

import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1];

// Gatilho de viewport compartilhado: a margem inferior negativa atrasa o
// disparo até o elemento subir mais para o centro da tela, dando tempo de
// a pessoa ver a animação acontecendo (em vez de já pronta lá embaixo).
const VIEWPORT = { once: true, amount: 0.2, margin: "0px 0px -12% 0px" };

// Revela um elemento quando ele entra na viewport (fade + slide + leve "foco").
export function Reveal({ children, delay = 0, x = 0, y = 28, blur = true, className }) {
  const hidden = { opacity: 0, x, y };
  const show = { opacity: 1, x: 0, y: 0 };
  if (blur) {
    hidden.filter = "blur(8px)";
    show.filter = "blur(0px)";
  }
  return (
    <motion.div
      className={className}
      initial={hidden}
      whileInView={show}
      viewport={VIEWPORT}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

// Container que escalona a entrada dos filhos (use com <RevealItem>).
export function Stagger({ children, className, gap = 0.12, delay = 0 }) {
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

// Item animado para usar dentro de <Stagger>.
export function RevealItem({ children, className, y = 20 }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y, scale: 0.96 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}
