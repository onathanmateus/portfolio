import type { Metadata } from "next";
import { Projects } from "@/components/Projects";
import { SectionShell } from "@/components/SectionShell";

export const metadata: Metadata = {
  title: "Projetos",
  description:
    "Projetos desenvolvidos por Nathan Mateus, com código aberto no GitHub e demonstrações no ar.",
};

export default function Page() {
  return (
    <SectionShell>
      <Projects />
    </SectionShell>
  );
}
