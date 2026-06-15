import { Experience } from "@/components/Experience";
import { SectionShell } from "@/components/SectionShell";

export const metadata = { title: "Experiência — Nathan Mateus" };

export default function Page() {
  return (
    <SectionShell prev={{ href: "/sobre", label: "Sobre" }} next={{ href: "/skills", label: "Skills" }}>
      <Experience />
    </SectionShell>
  );
}
