import { About } from "@/components/About";
import { SectionShell } from "@/components/SectionShell";

export const metadata = { title: "Sobre — Nathan Mateus" };

export default function Page() {
  return (
    <SectionShell next={{ href: "/experiencia", label: "Experiência" }}>
      <About />
    </SectionShell>
  );
}
