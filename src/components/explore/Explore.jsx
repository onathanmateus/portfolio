"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SECTIONS } from "./TronScene";

const TronScene = dynamic(() => import("./TronScene"), { ssr: false, loading: () => null });

const KEYMAP = {
  ArrowUp: "forward",
  KeyW: "forward",
  ArrowDown: "back",
  KeyS: "back",
  ArrowLeft: "left",
  KeyA: "left",
  ArrowRight: "right",
  KeyD: "right",
};

export function Explore() {
  const router = useRouter();
  const [eligible, setEligible] = useState(null); // null = checando
  const [active, setActive] = useState(null);
  const keysRef = useRef({ forward: false, back: false, left: false, right: false });
  const activeRef = useRef(null);

  const enter = useCallback(
    (route) => {
      if (route) router.push(route);
    },
    [router]
  );

  const onActive = useCallback((id) => {
    activeRef.current = id;
    setActive(id);
  }, []);

  // Elegibilidade: só desktop (ponteiro fino + largura) e sem reduced-motion.
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches && window.matchMedia("(min-width: 768px)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- estado externo (media queries)
    setEligible(fine && !reduce);
  }, []);

  // Teclado: dirigir + entrar no portal ativo.
  useEffect(() => {
    if (!eligible) return;
    const down = (e) => {
      const m = KEYMAP[e.code];
      if (m) {
        keysRef.current[m] = true;
        e.preventDefault();
      }
      if ((e.code === "Enter" || e.code === "KeyE") && activeRef.current) {
        enter(activeRef.current);
      }
    };
    const up = (e) => {
      const m = KEYMAP[e.code];
      if (m) keysRef.current[m] = false;
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [eligible, enter]);

  if (eligible === null) {
    return <div className="fixed inset-0 bg-[#04060a]" />;
  }

  // Fallback (mobile / reduced-motion)
  if (!eligible) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center gap-6 bg-[#04060a] px-6 text-center">
        <p className="font-display text-2xl font-bold uppercase tracking-tight neon-text">Exploração 3D</p>
        <p className="max-w-sm font-mono text-sm text-muted">
          A pilotagem da moto de luz exige teclado e roda melhor no desktop. Abra no computador para explorar — ou navegue pelo site normalmente.
        </p>
        <Link
          href="/"
          className="rounded-sm border border-accent bg-accent/10 px-6 py-3 font-mono text-sm font-semibold uppercase tracking-wider text-accent transition-colors hover:bg-accent hover:text-white dark:hover:text-[#04060a]"
        >
          ← Voltar ao site
        </Link>
      </div>
    );
  }

  const activeSection = SECTIONS.find((s) => s.id === active);

  return (
    <div className="fixed inset-0 bg-[#04060a]">
      <TronScene keysRef={keysRef} onActive={onActive} active={active} />

      {/* HUD */}
      <Link
        href="/"
        className="fixed left-5 top-5 z-10 rounded-sm border border-border bg-surface/70 px-4 py-2 font-mono text-xs uppercase tracking-wider text-foreground backdrop-blur-md transition-colors hover:border-accent hover:text-accent"
      >
        ← Sair
      </Link>

      <div className="pointer-events-none fixed bottom-5 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 text-center">
        {activeSection ? (
          <button
            type="button"
            onClick={() => enter(activeSection.id)}
            className="pointer-events-auto animate-pulse rounded-sm border border-accent bg-accent/15 px-6 py-3 font-mono text-sm font-bold uppercase tracking-widest text-accent backdrop-blur-md"
            style={{ boxShadow: "0 0 24px -6px var(--glow)" }}
          >
            ▶ Entrar em {activeSection.label} <span className="opacity-70">(E)</span>
          </button>
        ) : (
          <p className="rounded-sm border border-border bg-surface/50 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted backdrop-blur-md">
            <span className="text-accent">WASD</span> / setas para pilotar · chegue perto de um portal
          </p>
        )}
      </div>
    </div>
  );
}
