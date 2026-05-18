# LTIC SARL — Development Startup Script
# Run this from the project root: .\start.ps1

Write-Host "Starting LTIC SARL development servers..." -ForegroundColor Cyan

# Check .env exists
if (-not (Test-Path ".env")) {
  Write-Host "ERROR: .env file not found. Copy .env.example to .env and configure it." -ForegroundColor Red
  exit 1
}

# Start both servers concurrently
pnpm dev
