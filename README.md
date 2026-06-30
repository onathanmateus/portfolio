<div align="center">

# Portfólio — Nathan Mateus

Portfólio pessoal de **Nathan Mateus**, Analista de Sistemas Pleno especialista em
**Protheus (ADVPL / TLPP)** com base sólida em desenvolvimento web.

Visual limpo e elegante inspirado na **Apple**, com tema escuro **Dracula**,
componentes **HeroUI** e animações sutis.

<br/>

[![CI](https://github.com/onathanmateus/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/onathanmateus/portfolio/actions/workflows/ci.yml)

![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![HeroUI](https://img.shields.io/badge/HeroUI-v3-7C3AED?style=for-the-badge)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-0EA5E9?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

</div>

---

## ✨ Destaques

- 🍎 **Design inspirado na Apple** — tipografia generosa, bastante respiro, cards suaves e foco no conteúdo.
- 🧩 **HeroUI v3** — biblioteca de componentes (Card, Button, Chip…) como base da interface.
- 🌗 **Tema claro/escuro** — claro estilo Apple (accent azul) e escuro **Dracula** (accent roxo), com persistência e _script_ anti-_flash_.
- 🎞️ **Animações sutis** — entradas suaves com [Motion](https://motion.dev), sem exageros.
- 🧷 **100% TypeScript** — tipagem de ponta a ponta.
- ✅ **Testes automatizados** — unitários com **Jest** + Testing Library e e2e com **Playwright**.
- 🔄 **CI/CD** — GitHub Actions roda lint, typecheck, testes e build a cada push; Dependabot mantém as dependências atualizadas com _auto-merge_.
- 📊 **Vercel Analytics + Speed Insights** integrados.
- 📱 **Responsivo** e ♿ **acessível** — respeita `prefers-reduced-motion`.

## 🗺️ Rotas

| Rota | Conteúdo |
| --- | --- |
| `/` | Landing (nome, função e navegação) |
| `/sobre` | Sobre mim |
| `/experiencia` | Experiência profissional (timeline) |
| `/skills` | Conhecimentos técnicos |
| `/formacao` | Formação acadêmica |
| `/contato` | Canais de contato |

## 🛠️ Tecnologias

| Camada | Ferramenta |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Linguagem | [TypeScript](https://www.typescriptlang.org) |
| UI | [React 19](https://react.dev) |
| Componentes | [HeroUI v3](https://heroui.com) |
| Estilo | [Tailwind CSS v4](https://tailwindcss.com) |
| Animações | [Motion](https://motion.dev) |
| Testes | [Jest](https://jestjs.io) + [Testing Library](https://testing-library.com) · [Playwright](https://playwright.dev) |
| CI/CD | [GitHub Actions](https://github.com/features/actions) + [Dependabot](https://docs.github.com/code-security/dependabot) |
| Fontes | [Geist](https://vercel.com/font) via `next/font` |
| Métricas | [Vercel Analytics](https://vercel.com/analytics) · [Speed Insights](https://vercel.com/docs/speed-insights) |
| Hospedagem | [Vercel](https://vercel.com) |

---

## 🚀 Como rodar localmente

### Pré-requisitos

- [Node.js](https://nodejs.org) **20+**
- npm (já vem com o Node)

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/onathanmateus/portfolio.git
cd portfolio

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

Abra <http://localhost:3000> no navegador. A página recarrega automaticamente a cada alteração.

---

## 📜 Scripts disponíveis

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Sobe o servidor de desenvolvimento (hot reload) |
| `npm run build` | Gera a versão de produção otimizada |
| `npm run start` | Serve a versão de produção (após o `build`) |
| `npm run lint` | Verifica o código com o ESLint |
| `npm run typecheck` | Checa os tipos com o TypeScript |
| `npm run test` | Roda os testes unitários (Jest) |
| `npm run test:e2e` | Roda os testes end-to-end (Playwright) |

---

## 🧪 Testes

- **Unitários** (`__tests__/`): Jest + React Testing Library, ambiente `jsdom`.
- **End-to-end** (`tests-e2e/`): Playwright navega pelas rotas e valida o conteúdo.

```bash
npm run test          # unitários
npm run test:e2e      # e2e (instale os navegadores com: npx playwright install)
```

---

## 🔄 CI/CD e automação

Os workflows ficam em `.github/`:

| Arquivo | O que faz |
| --- | --- |
| `workflows/ci.yml` | A cada `push` no `main` e em todo PR: `lint` → `typecheck` → Jest → `build` → Playwright |
| `dependabot.yml` | Abre PRs semanais de atualização (npm + GitHub Actions), agrupados |
| `workflows/dependabot-auto-merge.yml` | Quando a CI passa num PR do Dependabot, faz _squash merge_ e apaga o branch |

### ⚙️ Configuração única no GitHub (necessária para o auto-merge)

O merge automático só funciona depois de habilitar, uma vez, nas configurações do repositório:

1. **Settings → Actions → General → Workflow permissions** → marcar **Read and write permissions**.
2. **Settings → General → Pull Requests** → marcar **Allow auto-merge**.

Sem isso, a CI continua rodando normalmente — apenas o merge automático fica sem permissão.

---

## ✏️ Personalizando o conteúdo

Todo o conteúdo (textos, experiências, skills, formação e contatos) está centralizado em:

```
src/data/portfolio.ts
```

Basta alterar os dados desse arquivo — não é preciso mexer nos componentes.

## 📁 Estrutura do projeto

```
.
├── .github/               # Workflows de CI, Dependabot e auto-merge
├── __tests__/             # Testes unitários (Jest)
├── tests-e2e/             # Testes end-to-end (Playwright)
└── src/
    ├── app/
    │   ├── layout.tsx     # Layout raiz: tema, fontes, métricas
    │   ├── page.tsx       # Landing (/)
    │   ├── globals.css    # Tokens de tema (Apple/Dracula) sobre o HeroUI
    │   └── (site)/        # Rotas das seções (Navbar + Footer)
    │       ├── sobre/ experiencia/ skills/ formacao/ contato/
    ├── components/        # Hero, Navbar, About, Experience, Skills… (HeroUI)
    └── data/
        └── portfolio.ts   # 👈 Conteúdo do site
```

---

## 📬 Contato

- **E-mail:** nathanmateudeo@hotmail.com
- **LinkedIn:** [in/onathanmateus](https://www.linkedin.com/in/onathanmateus/)
- **GitHub:** [@onathanmateus](https://github.com/onathanmateus)

<div align="center">
<br/>
Feito com 💙 por <strong>Nathan Mateus</strong>
</div>
