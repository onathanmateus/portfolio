import type { Metadata } from "next";
import { Skills } from "@/components/Skills";
import { SectionShell } from "@/components/SectionShell";

export const metadata: Metadata = { title: "Skills — Nathan Mateus" };

export default function Page() {
  return (
    <SectionShell>
      <Skills />
    </SectionShell>
  );
}
