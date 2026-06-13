"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "#sobre", label: "Sobre" },
  { href: "#experiencia", label: "Experiência" },
  { href: "#skills", label: "Skills" },
  { href: "#formacao", label: "Formação" },
  { href: "#contato", label: "Contato" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
      <nav
        className={`flex items-center justify-between px-4 py-3 transition-all duration-300 sm:px-5 ${
          scrolled
            ? "mt-3 rounded-2xl border border-border glass glow-accent backdrop-blur-xl backdrop-saturate-150"
            : "border border-transparent"
        }`}
      >
        <a href="#top" className="font-mono text-sm font-semibold tracking-tight">
          <span className="text-gradient">NM</span>
          <span className="text-muted">.dev</span>
        </a>

        {/* Links desktop */}
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Abrir menu"
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface text-foreground md:hidden"
          >
            <Burger open={open} />
          </button>
        </div>
      </nav>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mx-4 mt-2 overflow-hidden rounded-2xl border border-border glass backdrop-blur-xl backdrop-saturate-150 p-2 md:hidden"
          >
            <ul className="flex flex-col">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Burger({ open }) {
  return (
    <div className="relative h-4 w-5">
      <span
        className={`absolute left-0 h-0.5 w-5 bg-current transition-all duration-300 ${
          open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
        }`}
      />
      <span
        className={`absolute left-0 top-1/2 h-0.5 w-5 -translate-y-1/2 bg-current transition-all duration-300 ${
          open ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`absolute left-0 h-0.5 w-5 bg-current transition-all duration-300 ${
          open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
        }`}
      />
    </div>
  );
}
