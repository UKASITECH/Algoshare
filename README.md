# AlgoShare

AlgoShare is a Next.js platform for browsing and learning algorithms from a very large multi-language corpus (sourced from the TheAlgorithms organization and related datasets in this repository).

This repository includes:

- A web app with searchable algorithm pages and detail views
- A static catalog build pipeline for production browsing
- Optional AI enrichment and Supabase seeding scripts
- A large Algorithms Data folder with language-specific algorithm sources

## Who This Repo Is For

- Learners: Browse and study algorithms by category, difficulty, and source language.
- Contributors: Improve UI, metadata quality, extraction logic, and data pipelines.
- Maintainers: Rebuild catalogs, run enrichment jobs, and seed a database when needed.

## Tech Stack

- Next.js 14 (App Router)
- React 18 + TypeScript
- Tailwind CSS
- Supabase client libraries (for optional database-backed workflows)
- Node.js scripts for extraction, enrichment, and seeding

## Project Modes

This project currently supports two practical data modes:

1. Static catalog mode (default in UI)
- The app reads from src/data/algorithms-catalog.json through src/lib/algorithms-data.ts.
- This is the mode used by the algorithm browsing pages.

2. Supabase seeding mode (optional pipeline)
- scripts/extract.js generates raw-algorithms.json from Algorithms Data.
- scripts/enrich.js adds AI-generated metadata into enriched-algorithms.json.
- scripts/seed.js upserts categories and algorithms into Supabase tables.

## Quick Start (Local Development)

### 1. Prerequisites

- Node.js 18+ (recommended: latest LTS)
- npm 9+

### 2. Install dependencies

```bash
npm install
```

### 3. Run the app

```bash
npm run dev
```

Open http://localhost:3000.

### 4. Build and run production

```bash
npm run build
npm run start
```

## Core Commands

```bash
# App lifecycle
npm run dev
npm run build
npm run start
npm run lint

# Data pipeline
npm run extract
npm run enrich
npm run seed
npm run seed:all

# Static catalog rebuild (used by current UI data layer)
node scripts/build-algorithms-catalog.cjs
```

## Environment Variables

Create a .env.local file only if you run enrichment or seeding.

```bash
GROQ_KEY=your_groq_api_key
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

Notes:

- GROQ_KEY is required for npm run enrich.
- NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required for npm run seed.

## Data Workflows

### A) Rebuild the static app catalog (recommended for app updates)

Use this when source files under Algorithms Data change and you want the UI catalog refreshed.

```bash
node scripts/build-algorithms-catalog.cjs
```

Output:

- src/data/algorithms-catalog.json

### B) Run AI enrichment + Supabase seed (optional)

```bash
npm run extract
npm run enrich
npm run seed
```

Outputs:

- raw-algorithms.json
- enriched-algorithms.json
- Upserted rows in Supabase tables

## Database

If you plan to use the database workflow, apply the schema in:

- supabase/schema.sql

Important:

- The current app pages are primarily wired to static catalog data.
- Supabase seeding is available as a backend data pipeline but not the default rendering path for algorithm pages.

## Important Paths

- src/app: Next.js routes (home, algorithms, docs, submit)
- src/components: UI and algorithm presentation components
- src/lib/algorithms-data.ts: static data adapter used by algorithm pages
- src/data/algorithms-catalog.json: generated algorithm index consumed by UI
- scripts/build-algorithms-catalog.cjs: static catalog generator
- scripts/extract.js: extraction from Algorithms Data
- scripts/enrich.js: AI enrichment via Groq
- scripts/seed.js: Supabase seeding
- Algorithms Data: source corpus of algorithms across many language folders

## Repository Structure (High Level)

```text
AlgoShare/
	src/
		app/
		components/
		lib/
		data/
	scripts/
		build-algorithms-catalog.cjs
		extract.js
		enrich.js
		seed.js
	supabase/
		schema.sql
	Algorithms Data/
	raw-algorithms.json
	enriched-algorithms.json
```

## Typical Contributor Flows

### Frontend contributor

1. Run npm install.
2. Run npm run dev.
3. Update UI/components/routes in src.
4. Run npm run lint.
5. Open a pull request.

### Data contributor

1. Add or update files under Algorithms Data.
2. Rebuild catalog with node scripts/build-algorithms-catalog.cjs.
3. Validate browsing pages locally.
4. Commit catalog updates with source changes.

### Pipeline maintainer

1. Set .env.local values.
2. Run npm run seed:all.
3. Verify output JSON files and Supabase rows.
4. Re-run safely (upsert logic is used for categories and algorithms).

## Troubleshooting

### raw-algorithms.json not found

Run:

```bash
npm run extract
```

### GROQ_KEY environment variable not set

Set GROQ_KEY in .env.local or your shell before running npm run enrich.

### Missing Supabase credentials

Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY before running npm run seed.

### Local app does not reflect newly added source files

Rebuild the static catalog:

```bash
node scripts/build-algorithms-catalog.cjs
```

## Notes on Upstream Sources

Algorithms Data contains material mirrored from large open-source algorithm collections. Respect original licenses and attribution requirements for any redistributed content.
