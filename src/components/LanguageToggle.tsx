"use client";

import { motion } from "motion/react";
import { useLang, useUi } from "./LanguageProvider";

// Switch PT/EN: uma pílula com duas opções e uma barrinha (knob) que desliza
// para o idioma ativo.
export function LanguageToggle() {
  const { lang, toggleLang } = useLang();
  const t = useUi();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={lang === "en"}
      aria-label={t.langSwitch}
      onClick={toggleLang}
      className="relative inline-flex items-center gap-1 rounded-full border border-border/70 bg-surface-tertiary/60 p-1"
    >
      <motion.span
        aria-hidden="true"
        className="absolute left-1 top-1 h-7 w-9 rounded-full bg-accent shadow-sm shadow-accent/25"
        animate={{ x: lang === "pt" ? 0 : 40 }}
        transition={{ type: "spring", stiffness: 400, damping: 32 }}
      />
      <span
        className={`mono relative z-10 grid h-7 w-9 place-items-center text-xs font-semibold transition-colors ${
          lang === "pt" ? "text-accent-foreground" : "text-muted"
        }`}
      >
        PT
      </span>
      <span
        className={`mono relative z-10 grid h-7 w-9 place-items-center text-xs font-semibold transition-colors ${
          lang === "en" ? "text-accent-foreground" : "text-muted"
        }`}
      >
        EN
      </span>
    </button>
  );
}
