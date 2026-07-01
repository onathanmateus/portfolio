import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider, themeInitScript } from "@/components/ThemeProvider";
import { CircuitBackground } from "@/components/CircuitBackground";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="relative min-h-full" suppressHydrationWarning>
        <ThemeProvider>
          <CircuitBackground />
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
