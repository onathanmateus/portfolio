import type { Metadata } from "next";
import { About } from "@/components/About";
import { SectionShell } from "@/components/SectionShell";

export const metadata: Metadata = { title: "Sobre — Nathan Mateus" };

export default function Page() {
  return (
    <SectionShell next={{ href: "/experiencia", label: "Experiência" }}>
      <About />
    </SectionShell>
  );
}
