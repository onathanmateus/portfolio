import type { Metadata } from "next";
import { Projects } from "@/components/Projects";
import { SectionShell } from "@/components/SectionShell";

export const metadata: Metadata = {
  title: "Projetos",
  description:
    "Projetos desenvolvidos por Nathan Mateus, disponíveis no ar para explorar.",
};

export default function Page() {
  return (
    <SectionShell>
      <Projects />
    </SectionShell>
  );
}
