import type { Metadata } from "next";
import { About } from "@/components/About";
import { SectionShell } from "@/components/SectionShell";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Quem é Nathan Mateus — Analista de Sistemas Pleno, autodidata, com foco em Protheus (ADVPL / TLPP) e desenvolvimento web.",
};

export default function Page() {
  return (
    <SectionShell>
      <About />
    </SectionShell>
  );
}
