"use client";

import { motion, AnimatePresence } from "motion/react";
import { Button } from "@heroui/react";
import { useTheme } from "./ThemeProvider";
import { useUi } from "./LanguageProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const t = useUi();

  return (
    <Button
      isIconOnly
      variant="ghost"
      aria-label={theme === "dark" ? t.themeToLight : t.themeToDark}
      onPress={toggleTheme}
      className="relative h-10 w-10 rounded-full"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme ?? "init"}
          initial={{ y: -12, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 12, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.2 }}
          className="absolute grid place-items-center"
        >
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </motion.span>
      </AnimatePresence>
    </Button>
  );
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
