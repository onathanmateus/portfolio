import { Geist, Geist_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import { ThemeProvider, themeInitScript } from "@/components/ThemeProvider";
import { Cursor } from "@/components/Cursor";
import { Terminal } from "@/components/Terminal";
import { ShaderBackground } from "@/components/ShaderBackground";
import { Scene3DLayer } from "@/components/Scene3DLayer";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata = {
  title: "Nathan Mateus — Analista de Sistemas Pleno",
  description:
    "Portfólio de Nathan Mateus, Analista de Sistemas Pleno especialista em Protheus (ADVPL / TLPP) com experiência em desenvolvimento web (React, Next.js, Node.js).",
  keywords: ["Nathan Mateus", "Protheus", "ADVPL", "TLPP", "Desenvolvedor", "React", "Next.js"],
  authors: [{ name: "Nathan Mateus" }],
  openGraph: {
    title: "Nathan Mateus — Analista de Sistemas Pleno",
    description: "Especialista em Protheus (ADVPL / TLPP) com base sólida em desenvolvimento web.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="relative min-h-full" suppressHydrationWarning>
        {/* Fundo WebGL surreal (atrás de tudo) */}
        <ShaderBackground className="pointer-events-none fixed inset-0 -z-10 h-full w-full" />
        {/* Objeto 3D da landing (layer global persistente) */}
        <Scene3DLayer />
        <ThemeProvider>
          {children}
          <Cursor />
          <Terminal />
        </ThemeProvider>
        {/* Scanlines globais (overlay sutil) */}
        <div
          className="scanlines pointer-events-none fixed inset-0 z-50 opacity-60"
          aria-hidden="true"
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
