import { Card } from "@heroui/react";
import { contact } from "@/data/portfolio";
import { Reveal, Stagger, RevealItem } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const channels = [
  { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
  { label: "LinkedIn", value: "in/onathanmateus", href: contact.linkedin },
  { label: "GitHub", value: "@onathanmateus", href: contact.github },
];

export function Contact() {
  return (
    <section id="contato" className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center">
      <SectionHeading
        eyebrow="// contato"
        title="Vamos conversar"
        subtitle="Aberto a novas oportunidades e parcerias. Escolha o melhor canal."
      />

      <Stagger className="grid flex-1 gap-5 sm:grid-cols-3">
        {channels.map((channel) => (
          <RevealItem key={channel.label} className="h-full">
            <a
              href={channel.href}
              target={channel.href.startsWith("http") ? "_blank" : undefined}
              rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="block h-full rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Card className="lift flex h-full flex-col justify-center">
                <Card.Header>
                  <Card.Title className="mono text-sm text-accent">{channel.label}</Card.Title>
                  <Card.Description className="break-all text-lg text-foreground">
                    {channel.value}
                  </Card.Description>
                </Card.Header>
              </Card>
            </a>
          </RevealItem>
        ))}
      </Stagger>

      <Reveal delay={0.15}>
        <p className="mono mt-8 text-center text-sm text-muted">
          Respondo normalmente em até um dia útil.
        </p>
      </Reveal>
    </section>
  );
}
