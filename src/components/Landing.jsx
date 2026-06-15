"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { profile, contact } from "@/data/portfolio";
import { ScrambleText } from "./ScrambleText";
import { Magnetic } from "./Magnetic";

// 3D só no cliente (WebGL).
const Scene3D = dynamic(() => import("./Scene3D"), { ssr: false, loading: () => null });

const sections = [
  { href: "/sobre", n: "01", label: "Sobre" },
  { href: "/experiencia", n: "02", label: "Experiência" },
  { href: "/skills", n: "03", label: "Skills" },
  { href: "/formacao", n: "04", label: "Formação" },
  { href: "/contato", n: "05", label: "Contato" },
];

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] } }),
};

export function Landing() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 py-24">
      {/* Cena 3D (centro, reage ao mouse) */}
      <div className="absolute inset-0 z-0">
        <Scene3D />
      </div>

      {/* Conteúdo (deixa passar o mouse para o 3D, exceto nos elementos interativos) */}
      <div className="pointer-events-none relative z-10 flex flex-col items-center text-center">
        <motion.span
          custom={0}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mb-6 inline-flex items-center gap-2 rounded-sm border border-border bg-surface/50 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.25em] text-muted backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          bem-vindo
        </motion.span>

        <motion.h1
          custom={1}
          variants={fade}
          initial="hidden"
          animate="show"
          className="font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight neon-text sm:text-7xl md:text-8xl"
        >
          <ScrambleText as="span" text="Nathan" duration={800} />
          <br />
          <ScrambleText as="span" text="Mateus" duration={900} />
        </motion.h1>

        <motion.p
          custom={2}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mt-5 font-mono text-xs uppercase tracking-[0.3em] text-accent-soft sm:text-sm"
        >
          {profile.role}
        </motion.p>

        <motion.p
          custom={3}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mt-4 max-w-md text-balance text-sm leading-relaxed text-muted sm:text-base"
        >
          {profile.tagline}
        </motion.p>

        {/* Botões para as seções */}
        <motion.nav
          custom={4}
          variants={fade}
          initial="hidden"
          animate="show"
          className="pointer-events-auto mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          {sections.map((s) => (
            <Magnetic key={s.href} strength={0.4}>
              <Link
                href={s.href}
                className="group flex items-center gap-2 rounded-sm border border-border bg-surface/60 px-5 py-3 font-mono text-sm uppercase tracking-wider backdrop-blur-md transition-colors hover:border-accent hover:bg-accent hover:text-[#04060a]"
              >
                <span className="text-accent transition-colors group-hover:text-[#04060a]">{s.n}</span>
                {s.label}
              </Link>
            </Magnetic>
          ))}
        </motion.nav>

        {/* Links externos */}
        <motion.div
          custom={5}
          variants={fade}
          initial="hidden"
          animate="show"
          className="pointer-events-auto mt-8 flex items-center gap-5 font-mono text-xs uppercase tracking-wider text-muted"
        >
          <a href={contact.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">GitHub</a>
          <span className="text-border">/</span>
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">LinkedIn</a>
          <span className="text-border">/</span>
          <a href={`mailto:${contact.email}`} className="transition-colors hover:text-accent">Email</a>
        </motion.div>
      </div>

      {/* Dica do terminal */}
      <motion.p
        custom={6}
        variants={fade}
        initial="hidden"
        animate="show"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted/70"
      >
        dica: pressione <span className="text-accent">~</span> ou <span className="text-accent">Ctrl+K</span> para o console
      </motion.p>
    </section>
  );
}
