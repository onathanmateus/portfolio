"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { portfolio, type PortfolioContent } from "@/data/portfolio";
import { ui, type Lang, type UiStrings } from "@/lib/i18n";

interface LanguageContextValue {
  lang: Lang;
  toggleLang: () => void;
}

// Padrão "pt": é o idioma renderizado no servidor e o usado quando não há
// provider (ex.: testes unitários).
const LanguageContext = createContext<LanguageContextValue>({
  lang: "pt",
  toggleLang: () => {},
});

function htmlLangFor(lang: Lang): string {
  return lang === "pt" ? "pt-BR" : "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("pt");

  // Sincroniza com a escolha salva antes da hidratação (o script anti-flash
  // já ajustou o atributo <html lang>). Iniciar em "pt" evita divergência de
  // hidratação server/client.
  useEffect(() => {
    const stored = localStorage.getItem("lang");
    if (stored === "en" || stored === "pt") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sincronização com preferência salva
      setLang(stored);
    }
  }, []);

  function toggleLang() {
    setLang((prev) => {
      const next: Lang = prev === "pt" ? "en" : "pt";
      document.documentElement.lang = htmlLangFor(next);
      try {
        localStorage.setItem("lang", next);
      } catch {
        /* ignora ambientes sem localStorage */
      }
      return next;
    });
  }

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang(): LanguageContextValue {
  return useContext(LanguageContext);
}

// Conteúdo do portfólio no idioma atual.
export function useContent(): PortfolioContent {
  return portfolio[useContext(LanguageContext).lang];
}

// Strings de interface no idioma atual.
export function useUi(): UiStrings {
  return ui[useContext(LanguageContext).lang];
}

// Executado antes da pintura: aplica o idioma salvo no atributo <html lang>.
export const langInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('lang');
    if (stored === 'en') { document.documentElement.lang = 'en'; }
    else { document.documentElement.lang = 'pt-BR'; }
  } catch (e) {}
})();
`;
