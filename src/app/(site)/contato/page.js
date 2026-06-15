import { Contact } from "@/components/Contact";
import { SectionShell } from "@/components/SectionShell";

export const metadata = { title: "Contato — Nathan Mateus" };

export default function Page() {
  return (
    <SectionShell prev={{ href: "/formacao", label: "Formação" }}>
      <Contact />
    </SectionShell>
  );
}
