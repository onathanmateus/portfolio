// Conteúdo do portfólio — centralizado e bilíngue (PT / EN).
// Os exports PT (profile, experiences, ...) são a fonte canônica usada nos
// testes e como idioma padrão (SSR). O bundle EN espelha a mesma estrutura.

import type { Lang } from "@/lib/i18n";

export interface Profile {
  name: string;
  role: string;
  tagline: string;
  location: string;
  about: string[];
}

export interface Contact {
  email: string;
  linkedin: string;
  github: string;
}

export interface Experience {
  company: string;
  url: string;
  role: string;
  period: string;
  current: boolean;
  summary: string;
  highlights: string[];
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface Education {
  course: string;
  school: string;
  url: string;
  period: string;
  location: string;
}

export interface Project {
  name: string;
  description: string;
  url?: string;
  repo?: string;
  tags: string[];
}

export interface PortfolioContent {
  profile: Profile;
  contact: Contact;
  experiences: Experience[];
  skillGroups: SkillGroup[];
  projects: Project[];
  education: Education[];
}

// Contatos são neutros de idioma (mesmos valores nos dois).
export const contact: Contact = {
  email: "nathanmateudeo@hotmail.com",
  linkedin: "https://www.linkedin.com/in/onathanmateus/",
  github: "https://github.com/onathanmateus",
};

// ─────────────────────────────── Português ───────────────────────────────

export const profile: Profile = {
  name: "Nathan Mateus",
  role: "Analista de Sistemas Pleno",
  tagline: "Especialista em Protheus (ADVPL / TLPP) com base sólida em desenvolvimento web.",
  location: "Parnamirim / RN — Brasil",
  about: [
    "Desde o início da minha trajetória como autodidata em programação, tenho me dedicado a aprender e aplicar conhecimentos que vão além da teoria. Participei de projetos voluntários e iniciativas desafiadoras, onde pude crescer e aprimorar minhas habilidades, especialmente em tecnologias web.",
    "Atualmente atuo como Analista de Sistemas Pleno, com foco no sistema Protheus e na linguagem ADVPL / TLPP, desenvolvendo soluções robustas e personalizadas para demandas empresariais. Também aplico meus conhecimentos em tecnologias web para criar integrações e soluções complementares, garantindo eficiência e inovação em cada projeto.",
  ],
};

export const experiences: Experience[] = [
  {
    company: "HSB Consultoria",
    url: "https://hsbconsultoria.com.br/",
    role: "Analista de Sistemas Pleno",
    period: "Dez 2025 — Presente",
    current: true,
    summary:
      "Foco no desenvolvimento de soluções complexas e na otimização de processos dentro do ecossistema Protheus, transitando entre a excelência técnica em ADVPL/TLPP e a consultoria estratégica para o negócio.",
    highlights: [
      "Desenvolvimento avançado: customizações, integrações e rotinas de alta complexidade com foco em performance e escalabilidade do ERP.",
      "Resolução de problemas críticos: análise de causa raiz em chamados de alta prioridade e melhorias definitivas para reduzir reincidência.",
      "Mentoria e processos: definição de fluxos internos e suporte técnico consultivo, com entrega de valor real aos clientes.",
    ],
  },
  {
    company: "HSB Consultoria",
    url: "https://hsbconsultoria.com.br/",
    role: "Analista de Sistemas Júnior",
    period: "Abr 2024 — Nov 2025",
    current: false,
    summary:
      "Atuação com a linguagem ADVPL/TLPP, desenvolvendo e customizando soluções no ERP Protheus para atender às necessidades específicas dos clientes.",
    highlights: [
      "Suporte técnico na resolução de chamados do ERP Protheus, garantindo pleno funcionamento e satisfação dos usuários.",
      "Desenvolvimento de customizações e melhorias alinhadas às boas práticas de programação.",
      "Colaboração com equipes internas e clientes para diagnosticar problemas e implementar novos processos.",
    ],
  },
  {
    company: "Aprimora Conhecimento",
    url: "https://www.linkedin.com/company/aprimoraconhecimento/",
    role: "Desenvolvedor Front-End (Voluntário)",
    period: "Dez 2023 — Abr 2024",
    current: false,
    summary:
      "Construção de interfaces web intuitivas e responsivas com TypeScript, JavaScript, React.js e Next.js, contribuindo para projetos de impacto positivo na comunidade.",
    highlights: [
      "Desenvolvimento de interfaces responsivas com React.js e Next.js.",
      "Aprimoramento contínuo de habilidades em desenvolvimento web.",
      "Contribuição voluntária para projetos com impacto social.",
    ],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "ERP / Protheus",
    items: ["ADVPL / TLPP", "PO-UI"],
  },
  {
    title: "Linguagens",
    items: ["JavaScript", "TypeScript", "HTML", "CSS"],
  },
  {
    title: "Frameworks & Bibliotecas",
    items: ["React.js", "Next.js", "Node.js", "Tailwind CSS", "Bootstrap"],
  },
];

export const projects: Project[] = [
  {
    name: "FinTrack",
    description:
      "Dashboard local-first de finanças pessoais: transações com categorias e carteiras, indicadores, metas de economia, gráficos, importação de CSV e relatórios em PDF. Mascaramento de valores — os dados ficam no próprio navegador.",
    url: "https://fintrack-nathan-mateus.vercel.app/",
    tags: ["Next.js", "React", "TypeScript", "HeroUI", "Tailwind CSS", "Recharts"],
  },
];

export const education: Education[] = [
  {
    course: "Análise e Desenvolvimento de Sistemas (ADS)",
    school: "Universidade Potiguar — UNP",
    url: "https://www.unp.br/",
    period: "Fev 2023 — Jul 2025",
    location: "Natal / RN",
  },
  {
    course: "Administração",
    school: "Centro Universitário UNIFACEX",
    url: "https://unifacex.com.br/",
    period: "Fev 2018 — Nov 2021",
    location: "Natal / RN",
  },
];

// ──────────────────────────────── English ────────────────────────────────

const profileEn: Profile = {
  name: "Nathan Mateus",
  role: "Mid-level Systems Analyst",
  tagline: "Protheus (ADVPL / TLPP) specialist with a solid foundation in web development.",
  location: "Parnamirim / RN — Brazil",
  about: [
    "Since the beginning of my journey as a self-taught programmer, I've been dedicated to learning and applying knowledge that goes beyond theory. I took part in volunteer projects and challenging initiatives where I grew and sharpened my skills, especially in web technologies.",
    "I currently work as a Mid-level Systems Analyst, focused on the Protheus system and the ADVPL / TLPP language, building robust, tailored solutions for business needs. I also apply my web development skills to create integrations and complementary solutions, ensuring efficiency and innovation in every project.",
  ],
};

const experiencesEn: Experience[] = [
  {
    company: "HSB Consultoria",
    url: "https://hsbconsultoria.com.br/",
    role: "Mid-level Systems Analyst",
    period: "Dec 2025 — Present",
    current: true,
    summary:
      "Focused on developing complex solutions and optimizing processes within the Protheus ecosystem, moving between technical excellence in ADVPL/TLPP and strategic business consulting.",
    highlights: [
      "Advanced development: customizations, integrations and high-complexity routines focused on ERP performance and scalability.",
      "Critical problem solving: root-cause analysis on high-priority tickets and definitive improvements to reduce recurrence.",
      "Mentoring and processes: definition of internal workflows and consultative technical support, delivering real value to clients.",
    ],
  },
  {
    company: "HSB Consultoria",
    url: "https://hsbconsultoria.com.br/",
    role: "Junior Systems Analyst",
    period: "Apr 2024 — Nov 2025",
    current: false,
    summary:
      "Worked with the ADVPL/TLPP language, developing and customizing solutions in the Protheus ERP to meet each client's specific needs.",
    highlights: [
      "Technical support resolving Protheus ERP tickets, ensuring full functionality and user satisfaction.",
      "Development of customizations and improvements aligned with good programming practices.",
      "Collaboration with internal teams and clients to diagnose problems and implement new processes.",
    ],
  },
  {
    company: "Aprimora Conhecimento",
    url: "https://www.linkedin.com/company/aprimoraconhecimento/",
    role: "Front-End Developer (Volunteer)",
    period: "Dec 2023 — Apr 2024",
    current: false,
    summary:
      "Built intuitive, responsive web interfaces with TypeScript, JavaScript, React.js and Next.js, contributing to projects with a positive community impact.",
    highlights: [
      "Development of responsive interfaces with React.js and Next.js.",
      "Continuous improvement of web development skills.",
      "Volunteer contribution to projects with social impact.",
    ],
  },
];

const skillGroupsEn: SkillGroup[] = [
  {
    title: "ERP / Protheus",
    items: ["ADVPL / TLPP", "PO-UI"],
  },
  {
    title: "Languages",
    items: ["JavaScript", "TypeScript", "HTML", "CSS"],
  },
  {
    title: "Frameworks & Libraries",
    items: ["React.js", "Next.js", "Node.js", "Tailwind CSS", "Bootstrap"],
  },
];

const projectsEn: Project[] = [
  {
    name: "FinTrack",
    description:
      "Local-first personal finance dashboard: transactions with categories and wallets, indicators, savings goals, charts, CSV import and PDF reports. Value masking — your data stays in your own browser.",
    url: "https://fintrack-nathan-mateus.vercel.app/",
    tags: ["Next.js", "React", "TypeScript", "HeroUI", "Tailwind CSS", "Recharts"],
  },
];

const educationEn: Education[] = [
  {
    course: "Systems Analysis and Development",
    school: "Universidade Potiguar — UNP",
    url: "https://www.unp.br/",
    period: "Feb 2023 — Jul 2025",
    location: "Natal / RN",
  },
  {
    course: "Business Administration",
    school: "Centro Universitário UNIFACEX",
    url: "https://unifacex.com.br/",
    period: "Feb 2018 — Nov 2021",
    location: "Natal / RN",
  },
];

// ─────────────────────────────── Bundles ───────────────────────────────

const portfolioPt: PortfolioContent = {
  profile,
  contact,
  experiences,
  skillGroups,
  projects,
  education,
};

const portfolioEn: PortfolioContent = {
  profile: profileEn,
  contact,
  experiences: experiencesEn,
  skillGroups: skillGroupsEn,
  projects: projectsEn,
  education: educationEn,
};

export const portfolio: Record<Lang, PortfolioContent> = {
  pt: portfolioPt,
  en: portfolioEn,
};
