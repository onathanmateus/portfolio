import type { Metadata } from "next";
import { Skills } from "@/components/Skills";
import { SectionShell } from "@/components/SectionShell";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Conhecimentos técnicos de Nathan Mateus: ADVPL / TLPP, PO-UI, JavaScript, TypeScript, React, Next.js, Node.js e mais.",
};

export default function Page() {
  return (
    <SectionShell>
      <Skills />
    </SectionShell>
  );
}
