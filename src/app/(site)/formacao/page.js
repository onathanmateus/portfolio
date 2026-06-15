import { Education } from "@/components/Education";
import { SectionShell } from "@/components/SectionShell";

export const metadata = { title: "Formação — Nathan Mateus" };

export default function Page() {
  return (
    <SectionShell prev={{ href: "/skills", label: "Skills" }} next={{ href: "/contato", label: "Contato" }}>
      <Education />
    </SectionShell>
  );
}
