import { Card } from "@heroui/react";
import { contact } from "@/data/portfolio";
import { Reveal, Stagger, RevealItem } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const channels = [
  {
    label: "Email",
    value: contact.email,
    href: `mailto:${contact.email}`,
  },
  {
    label: "LinkedIn",
    value: "in/onathanmateus",
    href: contact.linkedin,
  },
  {
    label: "GitHub",
    value: "@onathanmateus",
    href: contact.github,
  },
];

export function Contact() {
  return (
    <section id="contato" className="mx-auto w-full max-w-5xl scroll-mt-24">
      <SectionHeading
        eyebrow="Contato"
        title="Vamos conversar"
        subtitle="Aberto a novas oportunidades e parcerias. Escolha o melhor canal."
      />

      <Stagger className="grid gap-5 sm:grid-cols-3">
        {channels.map((channel) => (
          <RevealItem key={channel.label}>
            <a
              href={channel.href}
              target={channel.href.startsWith("http") ? "_blank" : undefined}
              rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-2xl"
            >
              <Card className="lift h-full">
                <Card.Header>
                  <Card.Title className="text-base text-accent">{channel.label}</Card.Title>
                  <Card.Description className="break-all text-foreground">
                    {channel.value}
                  </Card.Description>
                </Card.Header>
              </Card>
            </a>
          </RevealItem>
        ))}
      </Stagger>

      <Reveal delay={0.15}>
        <p className="mt-10 text-center text-sm text-muted">
          Respondo normalmente em até um dia útil.
        </p>
      </Reveal>
    </section>
  );
}
