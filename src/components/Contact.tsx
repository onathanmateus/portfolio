import { contact } from "@/data/portfolio";
import { Stagger, RevealItem } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const channels = [
  { label: "email", value: contact.email, href: `mailto:${contact.email}` },
  { label: "linkedin", value: "in/onathanmateus", href: contact.linkedin },
  { label: "github", value: "@onathanmateus", href: contact.github },
];

export function Contact() {
  return (
    <section id="contato" className="mx-auto my-auto w-full max-w-5xl">
      <SectionHeading
        eyebrow="// contato"
        title="Vamos conversar"
        subtitle="Aberto a novas oportunidades e parcerias. Escolha o melhor canal."
      />

      <Stagger className="flex flex-col gap-3">
        {channels.map((channel) => (
          <RevealItem key={channel.label}>
            <a
              href={channel.href}
              target={channel.href.startsWith("http") ? "_blank" : undefined}
              rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="liquid-glass lift group grid items-center gap-1 rounded-2xl border p-5 md:grid-cols-[220px_1fr] focus:outline-none focus-visible:text-accent"
            >
              <span className="mono text-sm text-muted">{`// ${channel.label}`}</span>
              <span className="flex items-center gap-3 text-2xl font-medium text-foreground transition-colors group-hover:text-accent sm:text-3xl">
                {channel.value}
                <span className="text-accent transition-transform group-hover:translate-x-1">→</span>
              </span>
            </a>
          </RevealItem>
        ))}
      </Stagger>
    </section>
  );
}
