import type { Metadata } from "next";
import { Experience } from "@/components/Experience";
import { SectionShell } from "@/components/SectionShell";

export const metadata: Metadata = { title: "Experiência — Nathan Mateus" };

export default function Page() {
  return (
    <SectionShell>
      <Experience />
    </SectionShell>
  );
}
