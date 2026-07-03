"use client";

import { Button } from "@heroui/react";
import { AnimatePresence, motion } from "motion/react";
import { useLang, useUi } from "./LanguageProvider";

export function LanguageToggle() {
  const { lang, toggleLang } = useLang();
  const t = useUi();
  // Mostra o idioma-alvo (o que será ativado ao clicar).
  const target = lang === "pt" ? "EN" : "PT";

  return (
    <Button
      isIconOnly
      variant="ghost"
      aria-label={t.langSwitch}
      onPress={toggleLang}
      className="relative h-10 w-10 rounded-full"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={target}
          initial={{ y: -12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 12, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="mono absolute text-xs font-semibold tracking-wide"
        >
          {target}
        </motion.span>
      </AnimatePresence>
    </Button>
  );
}
