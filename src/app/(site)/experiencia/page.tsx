import type { Metadata } from "next";
import { Experience } from "@/components/Experience";
import { SectionShell } from "@/components/SectionShell";

export const metadata: Metadata = {
  title: "Experiência",
  description:
    "Trajetória profissional de Nathan Mateus: Analista de Sistemas na HSB Consultoria e desenvolvimento front-end voluntário.",
};

export default function Page() {
  return (
    <SectionShell>
      <Experience />
    </SectionShell>
  );
}
