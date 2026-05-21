/**
 * PM2 Ecosystem Config — LTIC SARL
 *
 * Usage (on VPS after build):
 *   pm2 start ecosystem.config.js
 *   pm2 save
 *   pm2 startup
 *
 * Build commands:
 *   pnpm --filter web build        → creates apps/web/.next/standalone/
 *   pnpm --filter api build        → creates apps/api/dist/
 */

module.exports = {
  apps: [
    {
      name: 'ltic-api',
      cwd: './apps/api',
      script: 'dist/main.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
        PORT: 4000,
      },
    },
    {
      name: 'ltic-web',
      cwd: './apps/web/.next/standalone',
      script: 'server.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        HOSTNAME: '0.0.0.0',
      },
    },
  ],
};
