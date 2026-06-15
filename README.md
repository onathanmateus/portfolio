<div align="center">

# ⚡ Portfólio — Nathan Mateus

Portfólio pessoal **cyberpunk** de **Nathan Mateus**, Analista de Sistemas Pleno
especialista em **Protheus (ADVPL / TLPP)** com base sólida em desenvolvimento web.

Experiência imersiva e disruptiva: landing 3D, terminal interativo, fundo WebGL e tema claro/escuro.

<br/>

![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Three.js](https://img.shields.io/badge/Three.js-R3F-000000?style=for-the-badge&logo=three.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-0EA5E9?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Motion](https://img.shields.io/badge/Motion-12-FF4D8D?style=for-the-badge&logo=framer&logoColor=white)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

</div>

---

## ✨ Destaques

- 🧊 **Landing 3D** — abertura com um objeto neon distorcido (wireframe) e partículas, em WebGL via **React Three Fiber**, reagindo ao mouse.
- 🖥️ **Terminal interativo** — abre na primeira visita e fica acessível a qualquer momento (botão, `Ctrl+K` ou `~`); navegue digitando comandos.
- 🌌 **Fundo WebGL reativo** — campo de energia cyberpunk que responde ao scroll e ao cursor.
- 🗺️ **Multi-page** — landing + rotas dedicadas para cada seção, com transições (cortina + entrada animada).
- 🎯 **Cursor HUD custom** + botões magnéticos, **decode/scramble** de texto, **tilt 3D** nos cards e **marquee** de skills.
- 🌗 **Tema claro/escuro** — alternável, com persistência e _script_ anti-_flash_.
- 📊 **Vercel Analytics + Speed Insights** integrados.
- 📱 **Responsivo** e ♿ **acessível** — respeita `prefers-reduced-motion` e desliga efeitos pesados em telas de toque.

## 🗺️ Rotas

| Rota | Conteúdo |
| --- | --- |
| `/` | Landing 3D (nome, boas-vindas e navegação) |
| `/sobre` | Sobre mim |
| `/experiencia` | Experiência profissional (timeline) |
| `/skills` | Conhecimentos técnicos |
| `/formacao` | Formação acadêmica |
| `/contato` | Canais de contato |

## ⌨️ Comandos do terminal

`sobre` · `experiencia` · `skills` · `formacao` · `contato` · `github` · `linkedin` · `email` · `tema` · `clear` · `help` · `start`

## 🛠️ Tecnologias

| Camada | Ferramenta |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| UI | [React 19](https://react.dev) |
| 3D / WebGL | [Three.js](https://threejs.org) · [React Three Fiber](https://r3f.docs.pmnd.rs) · [drei](https://github.com/pmndrs/drei) |
| Estilo | [Tailwind CSS v4](https://tailwindcss.com) |
| Animações | [Motion](https://motion.dev) |
| Fontes | [Geist](https://vercel.com/font) + [Orbitron](https://fonts.google.com/specimen/Orbitron) via `next/font` |
| Métricas | [Vercel Analytics](https://vercel.com/analytics) · [Speed Insights](https://vercel.com/docs/speed-insights) |
| Hospedagem | [Vercel](https://vercel.com) |

---

## 🚀 Como rodar localmente

### Pré-requisitos

- [Node.js](https://nodejs.org) **18.18+** (recomendado 20 ou superior)
- npm (já vem com o Node) — ou `yarn`/`pnpm`, se preferir

### Passo a passo

**1.** Clone o repositório:

```bash
git clone https://github.com/onathanmateus/portfolio.git
cd portfolio
```

**2.** Instale as dependências:

```bash
npm install
```

**3.** Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

**4.** Abra no navegador:

```
http://localhost:3000
```

> 💡 A página recarrega automaticamente a cada alteração nos arquivos.

---

## 📜 Scripts disponíveis

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Sobe o servidor de desenvolvimento (hot reload) |
| `npm run build` | Gera a versão de produção otimizada |
| `npm run start` | Serve a versão de produção (após o `build`) |
| `npm run lint` | Verifica o código com o ESLint |

---

## ✏️ Personalizando o conteúdo

Todo o conteúdo (textos, experiências, skills, formação e contatos) está
centralizado em um único arquivo, fácil de editar:

```
src/data/portfolio.js
```

Basta alterar os dados desse arquivo — não é preciso mexer nos componentes.

## 📁 Estrutura do projeto

```
src/
├── app/
│   ├── layout.js          # Layout raiz: tema, cursor, terminal, shader, fontes
│   ├── page.js            # Landing (/)
│   ├── template.js        # Transição de entrada das páginas
│   ├── globals.css        # Tokens de tema, neon, circuito e utilitários
│   └── (site)/            # Rotas das seções (Navbar + Footer)
│       ├── sobre/ experiencia/ skills/ formacao/ contato/
├── components/            # Landing, Scene3D, Terminal, Navbar, Cursor, etc.
└── data/
    └── portfolio.js       # 👈 Conteúdo do site
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
