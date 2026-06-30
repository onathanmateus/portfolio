// Conteúdo do portfólio — centralizado para facilitar manutenção.

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

export const profile: Profile = {
  name: "Nathan Mateus",
  role: "Analista de Sistemas Pleno",
  tagline: "Especialista em Protheus (ADVPL / TLPP) com base sólida em desenvolvimento web.",
  location: "Natal / RN — Brasil",
  about: [
    "Desde o início da minha trajetória como autodidata em programação, tenho me dedicado a aprender e aplicar conhecimentos que vão além da teoria. Participei de projetos voluntários e iniciativas desafiadoras, onde pude crescer e aprimorar minhas habilidades, especialmente em tecnologias web.",
    "Atualmente atuo como Analista de Sistemas Pleno, com foco no sistema Protheus e na linguagem ADVPL / TLPP, desenvolvendo soluções robustas e personalizadas para demandas empresariais. Também aplico meus conhecimentos em tecnologias web para criar integrações e soluções complementares, garantindo eficiência e inovação em cada projeto.",
  ],
};

export const contact: Contact = {
  email: "nathanmateudeo@hotmail.com",
  linkedin: "https://www.linkedin.com/in/onathanmateus/",
  github: "https://github.com/onathanmateus",
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
