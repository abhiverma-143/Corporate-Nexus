# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Frontend**: React + Vite, Framer Motion, Tailwind CSS

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   ├── api-server/         # Express API server
│   └── corporate-website/  # Corporate group website (React + Vite)
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts (single workspace package)
│   └── src/                # Individual .ts scripts, run via `pnpm --filter @workspace/scripts run <script>`
├── pnpm-workspace.yaml     # pnpm workspace (artifacts/*, lib/*, lib/integrations/*, scripts)
├── tsconfig.base.json      # Shared TS options (composite, bundler resolution, es2022)
├── tsconfig.json           # Root TS project references
└── package.json            # Root package with hoisted devDeps
```

## Corporate Website

The main artifact is a full corporate group website for a multi-sector conglomerate.

### Pages
- **Home** - Hero with animated geometric background, KPI counters, sectors preview, CTA
- **About Us** - Group history, mission/vision, corporate values, governance
- **Leadership** - Board of Directors, executive team cards
- **Sectors** - Real Estate, Logistics, Technology, Construction, Financial Services, Energy
- **Subsidiaries** - Directory of subsidiary companies organized by sector
- **Sustainability** - ESG commitments, environmental targets, social impact
- **Careers** - Job categories, culture, benefits, open positions
- **Contact** - HQ info, office locations, contact form (submits to POST /api/contact)

### Design
- Dark navy (#0a0f1e) background with gold (#d4af37) accents
- Premium corporate aesthetic
- Fully responsive / mobile-first
- Framer Motion animations: scroll-triggered reveals, counters, parallax, card hover effects

### Frontend Libraries
- `framer-motion` - All animations
- `lucide-react` - Icons
- `react-hook-form` + `@hookform/resolvers` - Contact form
- `zod` - Form validation

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references. This means:

- **Always typecheck from the root** — run `pnpm run typecheck` (which runs `tsc --build --emitDeclarationOnly`). This builds the full dependency graph so that cross-package imports resolve correctly. Running `tsc` inside a single package will fail if its dependencies haven't been built yet.
- **`emitDeclarationOnly`** — we only emit `.d.ts` files during typecheck; actual JS bundling is handled by esbuild/tsx/vite...etc, not `tsc`.
- **Project references** — when package A depends on package B, A's `tsconfig.json` must list B in its `references` array. `tsc --build` uses this to determine build order and skip up-to-date packages.

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages that define it
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references

## API Server Routes

### Public
- `GET /api/healthz` — Health check
- `GET /api/sectors` — Fetch all sectors from DB (auto-seeds 6 default sectors if table is empty)
- `POST /api/contact` — Contact form submission (validates with Zod, persists to contacts table)

### Admin
- `GET /api/admin/stats` — Dashboard KPI counts
- `GET /api/admin/contacts` — List all contact inquiries (newest first)
- `PATCH /api/admin/contacts/:id/read` — Mark inquiry as read (sets read_at timestamp)
- `DELETE /api/admin/contacts/:id` — Delete inquiry
- `GET /api/admin/sectors` — List sectors
- `POST /api/admin/sectors` — Create sector
- `PUT /api/admin/sectors/:id` — Update sector
- `DELETE /api/admin/sectors/:id` — Delete sector
- `GET /api/admin/jobs` — List job postings
- `POST /api/admin/jobs` — Create job posting
- `PUT /api/admin/jobs/:id` — Update job posting
- `DELETE /api/admin/jobs/:id` — Delete job posting

## Packages

### `artifacts/corporate-website` (`@workspace/corporate-website`)

React + Vite frontend. Entry: `src/main.tsx`. Pages in `src/pages/`. Layout components in `src/components/layout/`.

### `artifacts/api-server` (`@workspace/api-server`)

Express 5 API server. Routes live in `src/routes/` and use `@workspace/api-zod` for request and response validation and `@workspace/db` for persistence.

- Entry: `src/index.ts` — reads `PORT`, starts Express
- App setup: `src/app.ts` — mounts CORS, JSON/urlencoded parsing, routes at `/api`
- Routes: `src/routes/index.ts` mounts sub-routers; `src/routes/health.ts` exposes `GET /healthz`; `src/routes/contact.ts` exposes `POST /contact`
- Depends on: `@workspace/db`, `@workspace/api-zod`

### `lib/db` (`@workspace/db`)

Database layer using Drizzle ORM with PostgreSQL. Exports a Drizzle client instance and schema models.

### `lib/api-spec` (`@workspace/api-spec`)

Owns the OpenAPI 3.1 spec (`openapi.yaml`) and the Orval config (`orval.config.ts`).

Run codegen: `pnpm --filter @workspace/api-spec run codegen`

### `lib/api-zod` (`@workspace/api-zod`)

Generated Zod schemas from the OpenAPI spec.

### `lib/api-client-react` (`@workspace/api-client-react`)

Generated React Query hooks and fetch client from the OpenAPI spec.
