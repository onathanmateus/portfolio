import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { SectionShell } from "@/components/SectionShell";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com Nathan Mateus por email, LinkedIn ou GitHub.",
};

export default function Page() {
  return (
    <SectionShell>
      <Contact />
    </SectionShell>
  );
}
