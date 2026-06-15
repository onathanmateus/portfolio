"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "/sobre", label: "Sobre" },
  { href: "/experiencia", label: "Experiência" },
  { href: "/skills", label: "Skills" },
  { href: "/formacao", label: "Formação" },
  { href: "/contato", label: "Contato" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- fecha o menu ao navegar
    setOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <nav
          className={`glass flex items-center justify-between px-4 py-3 backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300 sm:px-5 ${
            scrolled ? "mt-3 rounded-sm border border-border" : "border-b border-border"
          }`}
          style={scrolled ? { boxShadow: "0 0 24px -10px var(--glow)" } : undefined}
        >
          <Link href="/" className="font-display text-sm font-bold uppercase tracking-widest">
            <span className="neon-text">NM</span>
            <span className="text-muted">_dev</span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`rounded-sm px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors ${
                      active ? "text-accent" : "text-muted hover:bg-surface-2 hover:text-accent"
                    }`}
                  >
                    {active ? <span className="text-accent/60">&gt; </span> : null}
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Abrir menu"
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-sm border border-border bg-surface text-foreground md:hidden"
            >
              <Burger open={open} />
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mx-4 mt-2 overflow-hidden rounded-sm border border-border glass backdrop-blur-2xl backdrop-saturate-150 p-2 md:hidden"
          >
            <ul className="flex flex-col">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-sm px-4 py-3 font-mono text-sm uppercase tracking-wider text-muted transition-colors hover:bg-surface-2 hover:text-accent"
                  >
                    {link.label}
                  </Link>
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
      <span className={`absolute left-0 h-0.5 w-5 bg-current transition-all duration-300 ${open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"}`} />
      <span className={`absolute left-0 top-1/2 h-0.5 w-5 -translate-y-1/2 bg-current transition-all duration-300 ${open ? "opacity-0" : "opacity-100"}`} />
      <span className={`absolute left-0 h-0.5 w-5 bg-current transition-all duration-300 ${open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"}`} />
    </div>
  );
}
