import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider, themeInitScript } from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full" suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
