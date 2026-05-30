# LTIC SARL — Claude Code Instructions

## Auto-push rule (MANDATORY — NO EXCEPTIONS)
After **every single change** you make to this codebase, you MUST:
1. Bump `version.json` (minor for features, patch for fixes, major for breaking)
2. `git add -A`
3. `git commit -m "<type>: <description>\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"`
4. `git push origin main`

**This is non-negotiable.** Never finish a task without committing and pushing. Do this before reporting back to the user. If you skip this, you have not completed the task.

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
- Login email: `alvarodylan10@gmail.com` (stored in `admin_profile` table)
- Password: `655197772` (bcrypt hash stored in DB)
- The admin changes email/password from the **My Profile** page — these are stored with bcrypt in `admin_profile`
- NEVER reset or overwrite the admin email/password without the user's explicit request

## Key env vars
See `.env.example` for the full list. Critical ones:
- `DATABASE_URL` — PostgreSQL connection
- `ADMIN_PASSWORD` — initial password (used only until admin sets one via UI)
- `ADMIN_EMAIL` — initial login email (default: `admin@ltic-sarl.com`)
- `MAIL_HOST/USER/PASS/ADMIN_EMAIL` — optional email notifications

## Git remote
`https://github.com/Alvarodylanx/-LTIC-SARL.git` — branch `main`
