# LTIC SARL — Full-Stack Website

**Logistics and Transit International SARL** — Multinational business solutions provider.

## Tech Stack

- **Frontend**: Next.js 14 (App Router) · TypeScript · Tailwind CSS · TanStack Query · React Hook Form · Zod
- **Backend**: NestJS · Drizzle ORM · PostgreSQL
- **Monorepo**: pnpm workspaces

## Project Structure

```
ltic-sarl/
├── apps/
│   ├── web/          # Next.js 14 frontend (port 3000)
│   └── api/          # NestJS backend (port 4000)
└── packages/
    └── db/           # Drizzle ORM schema & seed data
```

## Quick Start

### Prerequisites
- Node.js 18+
- pnpm 8+
- PostgreSQL 15+

### 1. Clone & Install

```bash
cd ltic-sarl
pnpm install
```

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env with your database credentials
```

### 3. Database Setup

```bash
# Create the database
createdb ltic_sarl

# Generate & run migrations
pnpm db:generate
pnpm db:migrate

# Seed with sample data
pnpm db:seed
```

### 4. Run Development Servers

```bash
pnpm dev
```

- Frontend: http://localhost:3000
- API: http://localhost:4000
- Admin: http://localhost:3000/admin (admin / ltic2024!)

## Features

### Public Website
- **Home** — Hero, stats, services overview, featured products, CTA
- **About** — Company history, mission/vision/values, key capabilities
- **Services** — 7 detailed service sections with alternating layout
- **Products** — Catalog with category filtering
- **Order Tracking** — Real-time shipment tracking with timeline
- **Quote Request** — Multi-field inquiry form
- **News** — Article listing and detail pages
- **Contact** — Contact form with map info
- **Legal** — Privacy Policy, Terms & Conditions, Cookie Policy

### Admin Panel
- Dashboard with KPI stats and recent activity
- Full CRUD for Products, Categories, News
- Quote request management with status workflow
- Order/shipment status management
- Contact inquiry management with read/unread
- Social media settings

### i18n
- English / French language switching
- Language stored in localStorage
- All content bilingual via database dual columns

## Admin Credentials
- Username: `admin`
- Password: `ltic2024!`
# -LTIC-SARL
