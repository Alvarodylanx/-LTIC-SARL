# LTIC SARL — Claude Code Instructions

## Auto-push rule (MANDATORY)
After **every** change you make to this codebase, you MUST:
1. `git add -A`
2. `git commit -m "<meaningful message>\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"`
3. `git push origin main`

Never leave changes uncommitted. Do this at the end of every task, before reporting to the user.

## Version control rule
Whenever a feature, fix, or improvement is shipped, also bump `version.json` at the monorepo root:
- New feature or group of features → bump **minor** (1.X.0)
- Bug fix or small patch → bump **patch** (1.0.X)
- Breaking change → bump **major** (X.0.0)

Add a changelog entry in `version.json` describing what changed. Commit this alongside the code changes.

## Project layout
- `apps/web` — Next.js 14 frontend (port 3000)
- `apps/api` — NestJS backend (port 4000)
- `packages/db` — Drizzle ORM schema + seed

## Admin credentials
- Default login email: `admin@ltic-sarl.com` (stored in `admin_profile` table)
- Default password: `ltic2024!` (falls back to `ADMIN_PASSWORD` env var until changed in DB)
- The admin changes email/password from the **My Profile** page — these are stored with bcrypt in `admin_profile`

## Key env vars
See `.env.example` for the full list. Critical ones:
- `DATABASE_URL` — PostgreSQL connection
- `ADMIN_PASSWORD` — initial password (used only until admin sets one via UI)
- `ADMIN_EMAIL` — initial login email (default: `admin@ltic-sarl.com`)
- `MAIL_HOST/USER/PASS/ADMIN_EMAIL` — optional email notifications

## Git remote
`https://github.com/Alvarodylanx/-LTIC-SARL.git` — branch `main`
