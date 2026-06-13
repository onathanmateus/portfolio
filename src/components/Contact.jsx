import { contact } from "@/data/portfolio";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { Circuit } from "./Circuit";

const channels = [
  {
    label: "E-mail",
    value: contact.email,
    href: `mailto:${contact.email}`,
    icon: (
      <path d="M4 4h16v16H4z M22 6l-10 7L2 6" />
    ),
  },
  {
    label: "LinkedIn",
    value: "in/onathanmateus",
    href: contact.linkedin,
    icon: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v6h-4v-6a2 2 0 0 0-4 0v6h-4v-6a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
  },
  {
    label: "GitHub",
    value: "@onathanmateus",
    href: contact.github,
    icon: (
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    ),
  },
];

export function Contact() {
  return (
    <section id="contato" className="relative scroll-mt-24 overflow-hidden">
      {/* Acento de circuito (pulsos ocasionais) */}
      <div
        className="pointer-events-none absolute left-0 top-0 -z-10 h-full w-1/2 opacity-50"
        style={{
          maskImage: "linear-gradient(to right, #000, transparent 85%)",
          WebkitMaskImage: "linear-gradient(to right, #000, transparent 85%)",
        }}
        aria-hidden="true"
      >
        <Circuit variant="accent" count={10} seed={23} className="h-full w-full" />
      </div>

      <div className="mx-auto max-w-5xl px-5 py-20 sm:px-6 sm:py-28">
      <SectionHeading
        index="05"
        title="Vamos conversar"
        subtitle="Escolha o canal de sua preferência."
      />

      <div className="grid gap-5 sm:grid-cols-3">
        {channels.map((ch, i) => (
          <Reveal key={ch.label} delay={i * 0.08}>
            <a
              href={ch.href}
              target={ch.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="cyber-card group flex h-full flex-col gap-3 p-6"
            >
              <span className="grid h-11 w-11 place-items-center rounded-sm border border-border bg-surface-2 text-accent transition-colors group-hover:bg-accent group-hover:text-[#04060a]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {ch.icon}
                </svg>
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-muted">{ch.label}</span>
              <span className="break-all font-medium">{ch.value}</span>
            </a>
          </Reveal>
        ))}
      </div>
      </div>
    </section>
  );
}
