<div align="center">

# 💼 Portfólio — Nathan Mateus

Portfólio pessoal _single-page_ de **Nathan Mateus**, Analista de Sistemas Pleno
especialista em **Protheus (ADVPL / TLPP)** com base sólida em desenvolvimento web.

Estética _Apple_ com toque futurista, tema claro/escuro e animações suaves.

<br/>

![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-0EA5E9?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Motion](https://img.shields.io/badge/Motion-12-FF4D8D?style=for-the-badge&logo=framer&logoColor=white)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

</div>

---

## ✨ Destaques

- 🎨 **Visual elegante** — inspirado na estética Apple, com detalhes futuristas e cor de destaque ciano.
- 🌗 **Tema claro/escuro** — alternável por um botão, com persistência e _script_ anti-_flash_ (respeita a preferência do sistema na primeira visita).
- 🌌 **Fundo aurora animado** no _hero_ e **parallax** do avatar conforme o mouse se move.
- 🎬 **Animações de scroll** — o conteúdo se revela em cascata à medida que você navega.
- 📱 **100% responsivo** — _mobile-first_, com menu adaptado para telas pequenas.
- ♿ **Acessível** — respeita `prefers-reduced-motion` para quem prefere menos movimento.
- ⚡ **Totalmente estático** — gerado em build, rápido e ótimo para SEO.

## 🧩 Seções

`Hero` · `Sobre mim` · `Experiência` (timeline) · `Conhecimentos técnicos` · `Formação` · `Contato`

## 🛠️ Tecnologias

| Camada        | Ferramenta                          |
| ------------- | ----------------------------------- |
| Framework     | [Next.js 16](https://nextjs.org) (App Router) |
| UI            | [React 19](https://react.dev)       |
| Estilo        | [Tailwind CSS v4](https://tailwindcss.com) |
| Animações     | [Motion](https://motion.dev)        |
| Fontes        | [Geist](https://vercel.com/font) via `next/font` |
| Hospedagem    | [Vercel](https://vercel.com)        |

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

| Comando         | O que faz                                            |
| --------------- | ---------------------------------------------------- |
| `npm run dev`   | Sobe o servidor de desenvolvimento (hot reload)      |
| `npm run build` | Gera a versão de produção otimizada                  |
| `npm run start` | Serve a versão de produção (após o `build`)          |
| `npm run lint`  | Verifica o código com o ESLint                       |

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
│   ├── layout.js        # Layout raiz, metadados e tema
│   ├── page.js          # Monta as seções da página
│   └── globals.css      # Tokens de tema, aurora e utilitários
├── components/          # Hero, Navbar, Experience, Skills, etc.
└── data/
    └── portfolio.js     # 👈 Conteúdo do site
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
