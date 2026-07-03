// Idiomas suportados e strings de interface (rótulos, títulos de seção,
// botões e aria-labels). O conteúdo pessoal fica em `@/data/portfolio`.

export type Lang = "pt" | "en";

export const ui = {
  pt: {
    nav: {
      sobre: "Sobre",
      experiencia: "Experiência",
      projetos: "Projetos",
      skills: "Skills",
      formacao: "Formação",
      contato: "Contato",
    },
    openMenu: "Abrir menu",
    themeToDark: "Ativar tema escuro",
    themeToLight: "Ativar tema claro",
    langSwitch: "Switch to English",
    hero: {
      ctaJourney: "Conhecer trajetória",
      ctaContact: "Entrar em contato",
    },
    about: {
      eyebrow: "// sobre",
      title: "Um pouco sobre mim",
      role: "Cargo atual",
      location: "Localização",
      focus: "Foco",
      focusValue: "Protheus · ADVPL / TLPP · Web",
    },
    experience: {
      eyebrow: "// trajetoria",
      title: "Experiência profissional",
      current: "Atual",
    },
    projects: {
      eyebrow: "// projetos",
      title: "Projetos",
      subtitle: "Projetos que criei — disponíveis no ar para explorar.",
      access: "Acessar",
      online: "online",
    },
    skills: {
      eyebrow: "// stack",
      title: "Conhecimentos técnicos",
      subtitle: "Ferramentas e tecnologias com que trabalho no dia a dia.",
    },
    education: {
      eyebrow: "// formacao",
      title: "Educação",
    },
    contact: {
      eyebrow: "// contato",
      title: "Vamos conversar",
      subtitle: "Aberto a novas oportunidades e parcerias. Escolha o melhor canal.",
    },
  },
  en: {
    nav: {
      sobre: "About",
      experiencia: "Experience",
      projetos: "Projects",
      skills: "Skills",
      formacao: "Education",
      contato: "Contact",
    },
    openMenu: "Open menu",
    themeToDark: "Switch to dark theme",
    themeToLight: "Switch to light theme",
    langSwitch: "Mudar para português",
    hero: {
      ctaJourney: "Explore my journey",
      ctaContact: "Get in touch",
    },
    about: {
      eyebrow: "// about",
      title: "A bit about me",
      role: "Current role",
      location: "Location",
      focus: "Focus",
      focusValue: "Protheus · ADVPL / TLPP · Web",
    },
    experience: {
      eyebrow: "// journey",
      title: "Professional experience",
      current: "Current",
    },
    projects: {
      eyebrow: "// projects",
      title: "Projects",
      subtitle: "Projects I've built — live and ready to explore.",
      access: "Open",
      online: "online",
    },
    skills: {
      eyebrow: "// stack",
      title: "Technical skills",
      subtitle: "Tools and technologies I work with day to day.",
    },
    education: {
      eyebrow: "// education",
      title: "Education",
    },
    contact: {
      eyebrow: "// contact",
      title: "Let's talk",
      subtitle: "Open to new opportunities and partnerships. Pick the best channel.",
    },
  },
} as const;

export type UiStrings = (typeof ui)[Lang];
