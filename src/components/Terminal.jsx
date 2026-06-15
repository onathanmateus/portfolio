"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { contact } from "@/data/portfolio";
import { useTheme } from "./ThemeProvider";

const HELP = [
  "comandos disponíveis:",
  "  sobre         quem é o Nathan",
  "  experiencia   trajetória profissional",
  "  skills        conhecimentos técnicos",
  "  formacao      formação acadêmica",
  "  contato       canais de contato",
  "  github linkedin email",
  "  tema          alterna claro/escuro",
  "  clear         limpa o terminal",
  "  start         entrar no site",
];

const NAV = {
  sobre: "/sobre",
  about: "/sobre",
  experiencia: "/experiencia",
  experiência: "/experiencia",
  exp: "/experiencia",
  skills: "/skills",
  formacao: "/formacao",
  formação: "/formacao",
  contato: "/contato",
  contact: "/contato",
  inicio: "/",
  início: "/",
  home: "/",
};

const BOOT = [
  "> NM_OS v4.8 — inicializando…",
  "> montando módulos ............ OK",
  "> carregando neural_profile ... OK",
  "> uplink estabelecido ......... OK",
  "",
  "bem-vindo ao terminal. digite 'help' para comandos,",
  "ou 'start' (ou apenas ENTER) para entrar no site.",
];

export function Terminal() {
  const { toggleTheme } = useTheme();
  const router = useRouter();
  const [desktop, setDesktop] = useState(false);
  const [open, setOpen] = useState(false);
  const [intro, setIntro] = useState(false);
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  // O terminal só existe no desktop (precisa de teclado).
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e) => setDesktop(e.matches);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- estado externo (media query)
    setDesktop(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const print = useCallback((text, type = "out") => {
    const arr = Array.isArray(text) ? text : [text];
    setLines((l) => [...l, ...arr.map((t) => ({ type, text: t }))]);
  }, []);

  const enterSite = useCallback(() => {
    try {
      sessionStorage.setItem("nm_booted", "1");
    } catch {
      /* ignora */
    }
    setOpen(false);
    setIntro(false);
    document.body.style.overflow = "";
  }, []);

  const goto = useCallback(
    (route) => {
      enterSite();
      router.push(route);
    },
    [enterSite, router]
  );

  const run = useCallback(
    (raw) => {
      const cmd = raw.trim().toLowerCase();
      if (!cmd) {
        if (intro) enterSite();
        return;
      }
      print("> " + raw, "cmd");
      if (cmd === "help" || cmd === "ajuda") print(HELP);
      else if (cmd === "clear" || cmd === "cls") setLines([]);
      else if (["start", "enter", "init", "exit", "sair"].includes(cmd)) {
        print("inicializando interface…");
        enterSite();
      } else if (cmd === "tema" || cmd === "theme") {
        toggleTheme();
        print("tema alternado.");
      } else if (cmd === "whoami") print("Nathan Mateus — Analista de Sistemas Pleno");
      else if (cmd === "github") {
        print("abrindo github…");
        window.open(contact.github, "_blank", "noopener");
      } else if (cmd === "linkedin") {
        print("abrindo linkedin…");
        window.open(contact.linkedin, "_blank", "noopener");
      } else if (cmd === "email" || cmd === "mail") {
        print("abrindo e-mail…");
        window.location.href = "mailto:" + contact.email;
      } else if (NAV[cmd]) {
        print("navegando para " + cmd + "…");
        goto(NAV[cmd]);
      } else {
        print("comando não encontrado: " + cmd + " — digite 'help'", "err");
      }
    },
    [print, enterSite, goto, toggleTheme, intro]
  );

  // Atalhos globais: Ctrl+K ou ` abre/fecha; Esc fecha.
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey && e.key.toLowerCase() === "k") || e.key === "`") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        if (intro) enterSite();
        else setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [intro, enterSite]);

  // Intro (boot) na primeira visita da sessão — apenas no desktop.
  useEffect(() => {
    if (!desktop) return;
    let booted = false;
    try {
      booted = sessionStorage.getItem("nm_booted") === "1";
    } catch {
      /* ignora */
    }
    if (booted) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- abertura (estado de sessão)
    setOpen(true);
    setIntro(true);
    document.body.style.overflow = "hidden";
    if (reduce) {
      setLines(BOOT.map((t) => ({ type: "out", text: t })));
      return;
    }
    const timers = BOOT.map((t, i) =>
      setTimeout(() => setLines((l) => [...l, { type: "out", text: t }]), 200 + i * 260)
    );
    return () => timers.forEach(clearTimeout);
  }, [desktop]);

  // Foco no input ao abrir + autoscroll do corpo.
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 60);
  }, [open]);
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines, open]);

  function onSubmit(e) {
    e.preventDefault();
    run(input);
    setInput("");
  }

  // Sem terminal/console no mobile.
  if (!desktop) return null;

  return (
    <>
      {/* Botão flutuante para abrir o console */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Abrir console"
        className="fixed bottom-5 right-5 z-[80] flex items-center gap-2 rounded-sm border border-border bg-surface/80 px-3 py-2 font-mono text-xs uppercase tracking-wider text-accent backdrop-blur-md transition-colors hover:border-accent hover:bg-accent hover:text-[#04060a]"
      >
        <span className="text-base leading-none">▸</span> console
        <kbd className="ml-1 hidden rounded-sm border border-border px-1 text-[10px] text-muted sm:inline">^K</kbd>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={
              intro
                ? "fixed inset-0 z-[100] flex items-center justify-center bg-[#04060a] p-4 sm:p-8"
                : "fixed inset-0 z-[95] flex items-end justify-center p-0 sm:items-center sm:p-6"
            }
          >
            {!intro && (
              <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} aria-hidden="true" />
            )}
            <div className="scanlines pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />

            <motion.div
              initial={{ y: intro ? 0 : 24, opacity: intro ? 1 : 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: intro ? 0 : 24, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex w-full max-w-2xl flex-col overflow-hidden rounded-sm border border-accent/40 bg-[#06080e]/95 font-mono text-sm shadow-[0_0_40px_-8px_var(--glow)] backdrop-blur-xl"
            >
              {/* Cabeçalho do terminal */}
              <div className="flex items-center justify-between border-b border-border px-4 py-2">
                <span className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted">
                  <span className="h-2.5 w-2.5 rounded-full bg-accent" style={{ boxShadow: "0 0 8px var(--glow)" }} />
                  nm_os — console
                </span>
                <button
                  type="button"
                  onClick={() => (intro ? enterSite() : setOpen(false))}
                  className="text-xs uppercase tracking-wider text-muted transition-colors hover:text-accent"
                >
                  {intro ? "entrar ✕" : "fechar ✕"}
                </button>
              </div>

              {/* Corpo */}
              <div ref={bodyRef} className="max-h-[60vh] min-h-[180px] overflow-y-auto px-4 py-3 leading-relaxed">
                {lines.map((l, i) => (
                  <div
                    key={i}
                    className={
                      l.type === "err"
                        ? "text-red-400"
                        : l.type === "cmd"
                        ? "text-foreground"
                        : "text-accent/80"
                    }
                  >
                    {l.text || " "}
                  </div>
                ))}
              </div>

              {/* Linha de comando */}
              <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-border px-4 py-3">
                <span className="text-accent">$</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  spellCheck={false}
                  autoComplete="off"
                  placeholder={intro ? "digite 'help' ou 'start'…" : "digite um comando…"}
                  className="w-full bg-transparent text-foreground caret-accent outline-none placeholder:text-muted/60"
                />
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
