<div align="center">

# Academic Digital Magazine — Political Constitution of Colombia

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-000000?logo=vercel&logoColor=white)](https://mazine-brown.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-TypeScript-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Strapi](https://img.shields.io/badge/CMS-Strapi-4945FF?logo=strapi&logoColor=white)](https://strapi.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-10b981.svg)](LICENSE)

**An academic digital magazine built with Next.js, TypeScript, and Strapi CMS for the *Political Constitution of Colombia* course (Universidad del Tolima — IDEAD, Systems Engineering).**

**[Live Demo](https://mazine-brown.vercel.app)** · [Features](#-features) · [Project Structure](#-project-structure) · [Getting Started](#-getting-started) · [Deployment](#-deployment)

</div>

---

## 📖 Overview

This platform publishes structured educational articles covering politics, constitutionalism, state theory, democracy, human rights, civic participation, and constitutional case studies, powered by Static Site Generation (SSG) and a headless Strapi CMS backend.

---

## 🛠️ Built With

- **Framework:** [Next.js](https://nextjs.org/) (Static Site Generation + TypeScript)
- **Headless CMS:** [Strapi](https://strapi.io/) (embedded in `magazine-api/`)
- **Styling:** Tailwind CSS, CSS Modules, custom academic design tokens
- **PWA & Offline Reading:** Workbox service worker + IndexedDB (`idb-keyval`)
- **SEO:** `next-seo`, Open Graph, JSON-LD, and dynamic sitemap

---

## ✨ Features

- Static site generation with dynamic content management from Strapi
- Category-based article grouping and interactive table of contents
- Dark / light mode support (`next-themes`)
- Offline caching via Service Worker and saved reading list in IndexedDB
- Full-text search across published articles
- Preview mode for unpublished drafts via `PREVIEW_SECRET`
- Responsive academic typography with Universidad del Tolima branding

---

## 📂 Project Structure

```text
mazine/
├── components/        # React components (article, common, icons, search, UI)
├── lib/               # API client, constants, hooks, search, storage
├── pages/             # Next.js pages (home, articles, contributors, search, 404, offline)
├── public/            # Static assets (fonts, favicon, images, service worker)
├── styles/            # Global CSS with academic design tokens
├── magazine-api/      # Embedded Strapi CMS backend
├── .env.example       # Environment variables template
├── vercel.json        # Vercel deployment config
└── LICENSE
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x
- npm or yarn

### 1. Start the Strapi CMS

```bash
cd magazine-api
npm install
npm run develop
```

The Strapi admin panel will be available at `http://localhost:1337/admin`.

### 2. Configure environment variables

Copy `.env.example` to `.env.local` and set:

```env
API_URL=http://localhost:1337
PREVIEW_SECRET=your-preview-secret
GA_MEASUREMENT_ID=your-ga-id
```

### 3. Start the frontend

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Seed Content

Create categories (*Política, Constitucionalismo, Estado, Democracia, Derechos, Participación Ciudadana, Casos de Estudio*), contributors, and articles from the Strapi admin panel, setting entries to `published` so they appear on the frontend.

---

## 🔍 Preview Mode

1. Set `PREVIEW_SECRET` in `.env.local`.
2. In **Strapi Admin → Settings → Preview Content**, configure:
   `http://localhost:3000/api/article-preview?secret=<your-secret>&id=:id`

---

## ☁️ Deployment

1. Deploy `magazine-api/` (Strapi) to a cloud host (Render, Railway, etc.).
2. Configure `API_URL` and `PREVIEW_SECRET` in Vercel Project Settings.
3. Deploy the frontend to [Vercel](https://vercel.com) (live instance: [mazine-brown.vercel.app](https://mazine-brown.vercel.app)).

---

## 👨‍💻 Author & License

Adapted and customized by **Juan Sebastián Sandoval** ([@Sebas0317](https://github.com/Sebas0317)) — Bogotá, Colombia.  
Licensed under the [MIT License](LICENSE) — based on the [magazine](https://github.com/edgarlr/magazine) starter kit by edgarlr.
