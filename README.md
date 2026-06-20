# Academic Digital Portfolio — Political Constitution of Colombia

An academic digital magazine built with **Next.js** and **Strapi CMS** for the Universidad del Tolima's Political Constitution course (IDEAD — Systems Engineering). This platform publishes educational articles on politics, constitutionalism, democracy, human rights, civic participation, and case studies.

## Built With

- **Framework:** [Next.js 10](https://nextjs.org/) (Static Site Generation + TypeScript)
- **CMS:** [Strapi](https://strapi.io/) (headless CMS, embedded in `magazine-api/`)
- **Styling:** Tailwind CSS, CSS Modules, custom design system
- **PWA:** Workbox service worker for offline support
- **Storage:** IndexedDB via `idb-keyval` for saving articles offline
- **SEO:** next-seo, Open Graph, JSON-LD, dynamic sitemap

## Features

- Static site generation with dynamic content from Strapi
- Category-based article grouping (table of contents)
- Dark/light theme (next-themes)
- Offline support with service worker caching
- Save articles to read offline (IndexedDB + Content Index API)
- Full-text search across articles
- Preview unpublished content via preview secret
- Google Analytics integration
- Responsive, accessible design with academic typography
- University branding (Universidad del Tolima)

## Project Structure

```
├── components/        # React components (article, common, icons, search, UI)
├── lib/               # API client, constants, hooks, search, storage
├── pages/             # Next.js pages (home, articles, contributors, search, 404, offline)
├── public/            # Static assets (fonts, favicon, images, service worker)
├── styles/            # Global CSS with academic design tokens
├── magazine-api/      # Embedded Strapi CMS backend
└── .env.example       # Environment variables template
```

## Getting Started

### Prerequisites

- Node.js 20.x
- npm or yarn

### 1. Start the Strapi CMS

```bash
cd magazine-api
npm install
npm run develop
```

The admin panel will be available at [http://localhost:1337/admin](http://localhost:1337/admin).

### 2. Set up environment variables

Copy `.env.example` to `.env.local` and configure:

```
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

Create categories (Política, Constitucionalismo, Estado, Democracia, Derechos, Participación Ciudadana, Casos de Estudio), contributors, and articles through the Strapi admin panel. Set articles and pages to `published` status for them to appear on the frontend.

## Preview Mode

1. Set `PREVIEW_SECRET` in `.env.local`
2. In Strapi admin → Settings → Preview Content, configure the URL:
   `http://localhost:3000/api/article-preview?secret=<your-secret>&id=:id`

## Deployment

1. Deploy Strapi to a cloud host (Render, Railway, etc.)
2. Set `API_URL` and `PREVIEW_SECRET` environment variables on Vercel
3. Deploy the frontend to [Vercel](https://vercel.com)

## Issues Resolved & Improvements

| Problem | Solution |
|---------|----------|
| Project was a generic starter kit with unrelated demo content | Customized branding, colors, and layout for Universidad del Tolima |
| Dev-only scripts with hardcoded credentials (`create-articles.ps1`, `create-*.js`, `fix-articles.js`, `migrate-to-remote.js`) | Removed all development scripts from the repository |
| Log files cluttering the repo (`frontend.err.log`, `frontend.log`, `strapi*.log`) | Cleaned up all runtime log files |
| Claude IDE settings committed (`.claude/settings.local.json`) | Removed `.claude/` directory |
| Outdated documentation still referencing the original starter | Replaced with project-specific README |
| Stale `SITE_URL` pointing to old demo domain | Updated to reflect deployment URL |

## License

MIT — based on the [magazine](https://github.com/edgarlr/magazine) starter kit by edgarlr.
