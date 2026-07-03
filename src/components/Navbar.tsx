"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { useUi } from "./LanguageProvider";

export function Navbar() {
  const pathname = usePathname();
  const t = useUi();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/sobre", label: t.nav.sobre },
    { href: "/experiencia", label: t.nav.experiencia },
    { href: "/projetos", label: t.nav.projetos },
    { href: "/skills", label: t.nav.skills },
    { href: "/formacao", label: t.nav.formacao },
    { href: "/contato", label: t.nav.contato },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
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
          className={`liquid-glass mt-3 flex items-center justify-between rounded-2xl border px-4 py-2.5 transition-all duration-300 sm:px-5 ${
            scrolled
              ? "shadow-[0_12px_36px_-16px_rgba(0,0,0,0.5)]"
              : "shadow-[0_6px_20px_-16px_rgba(0,0,0,0.4)]"
          }`}
        >
          <Link
            href="/"
            className="mono text-sm font-semibold tracking-tight text-foreground transition-opacity hover:opacity-70"
          >
            <span className="text-accent">~/</span>nathan
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href} className="relative">
                  {active ? (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-surface-tertiary"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  ) : null}
                  <Link
                    href={link.href}
                    className={`mono relative z-10 block rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                      active ? "text-accent" : "text-muted hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-1.5">
            <LanguageToggle />
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={t.openMenu}
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-full text-foreground transition-colors hover:bg-surface-tertiary md:hidden"
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
            className="liquid-glass mx-4 mt-2 overflow-hidden rounded-2xl border p-2 shadow-xl md:hidden"
          >
            <ul className="flex flex-col">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="mono block rounded-xl px-4 py-3 text-base text-muted transition-colors hover:bg-surface-tertiary hover:text-foreground"
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

function Burger({ open }: { open: boolean }) {
  return (
    <div className="relative h-4 w-5">
      <span className={`absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"}`} />
      <span className={`absolute left-0 top-1/2 h-0.5 w-5 -translate-y-1/2 rounded-full bg-current transition-all duration-300 ${open ? "opacity-0" : "opacity-100"}`} />
      <span className={`absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"}`} />
    </div>
  );
}
