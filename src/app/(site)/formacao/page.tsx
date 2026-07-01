import type { Metadata } from "next";
import { Education } from "@/components/Education";
import { SectionShell } from "@/components/SectionShell";

export const metadata: Metadata = {
  title: "Formação",
  description:
    "Formação acadêmica de Nathan Mateus: Análise e Desenvolvimento de Sistemas (UNP) e Administração (UNIFACEX).",
};

export default function Page() {
  return (
    <SectionShell>
      <Education />
    </SectionShell>
  );
}
