# LTIC SARL — Database Setup Script
# Run this after configuring DATABASE_URL in .env

Write-Host "Setting up LTIC SARL database..." -ForegroundColor Cyan

# Load DATABASE_URL from .env
$envContent = Get-Content ".env" | Where-Object { $_ -match "^DATABASE_URL=" }
if ($envContent) {
  $dbUrl = $envContent -replace "^DATABASE_URL=", ""
  Write-Host "Using database: $dbUrl" -ForegroundColor Gray
}

Write-Host "`n[1/3] Generating migrations..." -ForegroundColor Yellow
pnpm db:generate

Write-Host "`n[2/3] Running migrations..." -ForegroundColor Yellow
pnpm db:migrate

Write-Host "`n[3/3] Seeding sample data..." -ForegroundColor Yellow
pnpm db:seed

Write-Host "`nDatabase setup complete!" -ForegroundColor Green
Write-Host "You can now run: pnpm dev" -ForegroundColor Cyan
