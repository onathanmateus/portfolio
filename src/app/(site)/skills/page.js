import { Skills } from "@/components/Skills";
import { SkillsMarquee } from "@/components/SkillsMarquee";
import { SectionShell } from "@/components/SectionShell";

export const metadata = { title: "Skills — Nathan Mateus" };

export default function Page() {
  return (
    <SectionShell prev={{ href: "/experiencia", label: "Experiência" }} next={{ href: "/formacao", label: "Formação" }}>
      <Skills />
      <SkillsMarquee />
    </SectionShell>
  );
}
