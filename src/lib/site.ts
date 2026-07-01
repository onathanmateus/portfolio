import { profile, contact } from "@/data/portfolio";

// URL base do site. Em produção use NEXT_PUBLIC_SITE_URL; na Vercel cai no
// VERCEL_URL do deploy; localmente, localhost.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const siteConfig = {
  name: profile.name,
  role: profile.role,
  title: `${profile.name} — ${profile.role}`,
  description:
    "Portfólio de Nathan Mateus, Analista de Sistemas Pleno especialista em Protheus (ADVPL / TLPP) com experiência em desenvolvimento web (React, Next.js, Node.js).",
  locale: "pt_BR",
  links: {
    linkedin: contact.linkedin,
    github: contact.github,
    email: contact.email,
  },
} as const;
