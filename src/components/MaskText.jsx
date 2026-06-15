"use client";

import { motion } from "motion/react";

// Texto que sobe palavra a palavra atrás de uma máscara (overflow hidden).
// O container (motion.span) é quem OBSERVA — sua caixa fica em vista normalmente —
// e escalona a entrada das palavras (que sobem de baixo da máscara).
export function MaskText({ text, className, as: Tag = "span", delay = 0 }) {
  const words = String(text).split(" ");
  return (
    <Tag className={className} aria-label={text}>
      <motion.span
        aria-hidden="true"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.07, delayChildren: delay } },
        }}
      >
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: "115%" },
                show: { y: "0%", transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] } },
              }}
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
