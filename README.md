<div align="center">

# 💻 Portfólio — Nathan Mateus

**Portfólio pessoal com visual _tech/terminal_** — tema azul (claro/escuro), fundo animado de circuito, efeito **Liquid Glass** e digitação, tudo em uma interface 100% responsiva.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-149eca?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5%2B-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![HeroUI](https://img.shields.io/badge/HeroUI-v3-7828c8)](https://www.heroui.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Motion](https://img.shields.io/badge/Motion-12-000000?logo=framer&logoColor=white)](https://motion.dev/)
[![Jest](https://img.shields.io/badge/Jest-tested-c21325?logo=jest&logoColor=white)](https://jestjs.io/)
[![Playwright](https://img.shields.io/badge/Playwright-E2E-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev/)
[![CI](https://github.com/onathanmateus/Portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/onathanmateus/Portfolio/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

</div>

---

## ✨ Funcionalidades

- 🧬 **Estética tech/terminal** — fonte **JetBrains Mono** em tudo, rótulos em estilo terminal e navbar translúcida.
- 🧊 **Liquid Glass** — vidro translúcido com relevo especular na navbar, no rodapé, nos cards e nos botões (a luz do fundo passa por trás).
- ⌨️ **Efeito de digitação** — o nome digita ao carregar e os títulos das seções redigitam ao passar o mouse (respeita `prefers-reduced-motion`).
- 🔌 **Fundo animado de circuito** — traços de "linhas de chip" com pulsos de luz (canvas 2D leve); pausa com `prefers-reduced-motion` e com a aba oculta, e o desenho permanece estável ao redimensionar.
- 🌗 **Tema claro/escuro** — azul nos dois; escuro em cinza-grafite, com persistência e _script_ anti-_flash_.
- 🖥️ **Uma tela por página** — no desktop cada seção ocupa a viewport inteira, com o rodapé sempre visível.
- 🎞️ **Animações** com [Motion](https://motion.dev/) — botões magnéticos, _pill_ deslizante na navbar, _shimmer_ no nome e _reveals_ no scroll.
- 🔎 **SEO & compartilhamento** — metadata por rota, **OG/Twitter image** dinâmica (`next/og`), `sitemap.xml`, `robots.txt` e **JSON-LD `Person`**.
- 📊 **Vercel Analytics + Speed Insights** integrados.
- 📱 **Responsivo** e ♿ **acessível** — foco visível por teclado, `theme-color`, `aria-label`s e respeito ao `prefers-reduced-motion`.
- ✅ **Testado** (Jest + Playwright) e com **CI/CD** (GitHub Actions + Dependabot _auto-merge_).

## 🧱 Stack

| Camada | Tecnologia |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| UI | [React 19](https://react.dev/) + [HeroUI v3](https://www.heroui.com/) + [Tailwind CSS v4](https://tailwindcss.com/) |
| Linguagem | [TypeScript](https://www.typescriptlang.org/) |
| Animações | [Motion](https://motion.dev/) |
| Fonte | [JetBrains Mono](https://www.jetbrains.com/lp/mono/) via `next/font` |
| Testes | [Jest](https://jestjs.io/) + [Testing Library](https://testing-library.com/) (unit) · [Playwright](https://playwright.dev/) (E2E) |
| Métricas | [Vercel Analytics](https://vercel.com/analytics) · [Speed Insights](https://vercel.com/docs/speed-insights) |
| CI | [GitHub Actions](https://github.com/onathanmateus/Portfolio/actions) (lint, tipos, testes, build, E2E) + [Dependabot](https://docs.github.com/code-security/dependabot) |
| Hospedagem | [Vercel](https://vercel.com/) |

## 🚀 Como executar

> Requisitos: **Node.js 20+**

```bash
# instalar dependências
npm install

# ambiente de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## 📜 Scripts

| Script | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento (Turbopack) |
| `npm run build` | Build de produção |
| `npm run start` | Servidor de produção |
| `npm run lint` | ESLint |
| `npm run typecheck` | Checagem de tipos (`tsc --noEmit`) |
| `npm run test` | Testes unitários (Jest) |
| `npm run test:watch` | Testes em modo *watch* |
| `npm run test:e2e` | Testes end-to-end (Playwright) |

## 🗂️ Estrutura

```
src/
├── app/
│   ├── layout.tsx        # raiz: tema, fonte, metadata, JSON-LD, fundo, métricas
│   ├── page.tsx          # landing (/)
│   ├── globals.css       # tokens do tema (azul claro/escuro) + Liquid Glass
│   ├── opengraph-image.tsx / twitter-image.tsx  # OG/Twitter dinâmicos (next/og)
│   ├── robots.ts / sitemap.ts
│   └── (site)/           # rotas com Navbar + Footer (uma tela por página)
│       └── sobre/ experiencia/ projetos/ skills/ formacao/ contato/
├── components/           # Hero, Navbar, Footer, About, Experience, Projects,
│                         #   Skills, Education, Contact, CircuitBackground,
│                         #   ThemeProvider/Toggle, Typewriter, Magnetic, Reveal...
├── data/
│   └── portfolio.ts      # 👈 todo o conteúdo do site
└── lib/
    └── site.ts           # config de SEO + URL base
__tests__/                # testes unitários (Jest + Testing Library)
tests-e2e/                # testes end-to-end (Playwright)
.github/                  # workflows de CI, Dependabot e auto-merge
```

## 🗺️ Rotas

| Rota | Conteúdo |
|---|---|
| `/` | Landing (nome, função e navegação) |
| `/sobre` | Sobre mim |
| `/experiencia` | Experiência profissional (timeline) |
| `/projetos` | Projetos (com demos no ar) |
| `/skills` | Conhecimentos técnicos |
| `/formacao` | Formação acadêmica |
| `/contato` | Canais de contato |

## 🎨 Personalizando o conteúdo

Todo o conteúdo (textos, experiências, skills, formação e contatos) fica centralizado em [`src/data/portfolio.ts`](src/data/portfolio.ts) — basta editar esse arquivo, sem mexer nos componentes.

## 🌗 Temas

O app tem tema **claro** e **escuro** (ambos em azul; o escuro em cinza-grafite), com persistência em `localStorage` e um _script_ anti-_flash_ que aplica o tema antes da pintura. As cores são **tokens semânticos do HeroUI v3** (`accent`, `surface`, `border`, `muted`...) sobrescritos em [`globals.css`](src/app/globals.css), então tudo — inclusive o fundo de circuito e o Liquid Glass — reage ao tema automaticamente. O botão de alternância fica na navbar.

## 🧪 Testes & CI

**Unitários (Jest)** — em [`__tests__/`](__tests__/), com Jest + Testing Library (ambiente `jsdom`), cobrindo conteúdo, componentes e seções.

```bash
npm run test      # unitários
npm run test:e2e  # end-to-end (Playwright)
```

**End-to-end (Playwright)** — em [`tests-e2e/`](tests-e2e/): navega pelas rotas, valida o conteúdo e a troca de tema.

**CI (GitHub Actions)** — a cada _push_ na `main` e em PRs, o [workflow](.github/workflows/ci.yml) roda **lint → typecheck → testes → build → E2E** (com upload do relatório do Playwright como artefato). O **Dependabot** abre PRs semanais de atualização e faz _auto-merge_ quando a CI passa.

---

## 📄 Licença

Distribuído sob a licença **MIT** — veja [`LICENSE`](LICENSE). Sinta-se livre para estudar e reutilizar o código. O conteúdo pessoal (nome, textos, identidade visual) permanece de propriedade de Nathan Mateus.

---

## 📫 Contato

- **E-mail:** [nathanmateudeo@hotmail.com](mailto:nathanmateudeo@hotmail.com)
- **LinkedIn:** [in/onathanmateus](https://www.linkedin.com/in/onathanmateus)
- **GitHub:** [@onathanmateus](https://github.com/onathanmateus)

<div align="center">
<sub>Feito com 💙 por <strong>Nathan Mateus</strong></sub>
</div>
