"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme | null;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  toggleTheme: () => {},
});

// Aplica a classe no <html> e persiste a escolha.
function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;

  // Força a recriação do render tree para repintar TODAS as camadas com o
  // tema novo. Sem isso, navegadores mobile mantêm camadas compostas com o
  // tema antigo até uma rolagem. O toggle de display é síncrono (mesmo
  // frame), então não há flash visível.
  const body = document.body;
  if (body) {
    body.style.display = "none";
    // Leitura força o reflow, impedindo que o navegador "una" as duas mudanças.
    void body.offsetHeight;
    body.style.display = "";
  }

  // Reforço: um "nudge" de rolagem de 1px replica o que corrige manualmente
  // (rolar), invalidando os tiles de pintura do conteúdo.
  requestAnimationFrame(() => {
    const y = window.scrollY;
    window.scrollTo(0, y + 1);
    window.scrollTo(0, y);
  });
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  // Sincroniza o estado do React com a classe que o script anti-flash já
  // aplicou no <html> antes da hidratação. Iniciar como null evita
  // divergência de hidratação (server/client).
  useEffect(() => {
    const initial: Theme = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sincronização com DOM externo (tema pré-hidratação)
    setTheme(initial);
  }, []);

  function toggleTheme() {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      applyTheme(next);
      try {
        localStorage.setItem("theme", next);
      } catch {
        /* ignora ambientes sem localStorage */
      }
      return next;
    });
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

// Script executado antes da pintura para evitar "flash" de tema incorreto.
export const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored || (prefersDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme;
  } catch (e) {}
})();
`;
