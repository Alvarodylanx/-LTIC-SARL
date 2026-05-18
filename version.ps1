# LTIC SARL — Version Control Helper
# Usage:
#   .\version.ps1 save "what you changed"   — save current state as a new version
#   .\version.ps1 list                       — show all saved versions
#   .\version.ps1 show v1.2.0               — show what changed in that version
#   .\version.ps1 diff v1.1.0               — compare current code to a version
#   .\version.ps1 restore v1.1.0            — revert code to that version
#   .\version.ps1 status                    — show unsaved changes

param(
    [Parameter(Position=0)] [string]$Command,
    [Parameter(Position=1)] [string]$Arg
)

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

function Get-NextVersion {
    $tags = git tag --list "v*" | Sort-Object { [version]($_ -replace '^v','') } -ErrorAction SilentlyContinue
    if (-not $tags) { return "v1.1.0" }
    $last = $tags | Select-Object -Last 1
    $parts = ($last -replace '^v','').Split('.')
    $patch = [int]$parts[2] + 1
    return "v$($parts[0]).$($parts[1]).$patch"
}

switch ($Command) {

    "save" {
        if (-not $Arg) {
            Write-Host "ERROR: Provide a description. Example: .\version.ps1 save `"fixed navbar bug`"" -ForegroundColor Red
            exit 1
        }
        $version = Get-NextVersion
        $changed = git status --porcelain
        if (-not $changed) {
            Write-Host "Nothing to save — no changes detected." -ForegroundColor Yellow
            exit 0
        }
        git add .
        git commit -m "$version - $Arg"
        git tag $version
        Write-Host ""
        Write-Host "  Saved as $version" -ForegroundColor Green
        Write-Host "  Message : $Arg"
        Write-Host "  To restore this later: .\version.ps1 restore $version"
        Write-Host ""
    }

    "list" {
        Write-Host ""
        Write-Host "  Saved versions:" -ForegroundColor Cyan
        Write-Host ""
        $tags = git tag --list "v*" | Sort-Object { [version]($_ -replace '^v','') } -ErrorAction SilentlyContinue
        if (-not $tags) {
            Write-Host "  No versions saved yet." -ForegroundColor Yellow
        } else {
            foreach ($tag in ($tags | Sort-Object { [version]($_ -replace '^v','') } -Descending)) {
                $info = git log -1 --format="%ai  %s" $tag 2>$null
                $date = $info.Substring(0,10)
                $msg  = $info.Substring(26)
                Write-Host "  $tag  [$date]  $msg" -ForegroundColor White
            }
        }
        Write-Host ""
    }

    "show" {
        if (-not $Arg) { Write-Host "ERROR: Provide a version. Example: .\version.ps1 show v1.0.0" -ForegroundColor Red; exit 1 }
        Write-Host ""
        Write-Host "  Changes in $Arg :" -ForegroundColor Cyan
        Write-Host ""
        git show --stat $Arg
        Write-Host ""
    }

    "diff" {
        if (-not $Arg) { Write-Host "ERROR: Provide a version. Example: .\version.ps1 diff v1.0.0" -ForegroundColor Red; exit 1 }
        Write-Host ""
        Write-Host "  Differences between $Arg and current code:" -ForegroundColor Cyan
        Write-Host ""
        git diff $Arg HEAD --stat
        Write-Host ""
        $answer = Read-Host "Show full diff? (y/n)"
        if ($answer -eq "y") { git diff $Arg HEAD }
    }

    "restore" {
        if (-not $Arg) { Write-Host "ERROR: Provide a version. Example: .\version.ps1 restore v1.0.0" -ForegroundColor Red; exit 1 }

        # Verify the tag exists
        $tagExists = git tag --list $Arg
        if (-not $tagExists) {
            Write-Host "ERROR: Version '$Arg' not found. Run .\version.ps1 list to see all versions." -ForegroundColor Red
            exit 1
        }

        Write-Host ""
        Write-Host "  WARNING: This will restore the code to $Arg." -ForegroundColor Yellow
        Write-Host "  Any unsaved changes will be stashed (not lost) and can be recovered." -ForegroundColor Yellow
        Write-Host ""
        $answer = Read-Host "Continue? (y/n)"
        if ($answer -ne "y") { Write-Host "Cancelled." -ForegroundColor Gray; exit 0 }

        # Stash any current changes so nothing is lost
        $stashed = $false
        $dirty = git status --porcelain
        if ($dirty) {
            $stamp = Get-Date -Format "yyyy-MM-dd HH:mm"
            git stash push -m "Auto-stash before restoring $Arg at $stamp"
            $stashed = $true
        }

        # Create a restore commit (safer than hard reset — history is preserved)
        git checkout $Arg -- .
        git add .
        $restoreMsg = "restore: reverted to $Arg"
        git commit -m $restoreMsg

        Write-Host ""
        Write-Host "  Restored to $Arg" -ForegroundColor Green
        if ($stashed) {
            Write-Host "  Your previous unsaved changes are in git stash." -ForegroundColor DarkGray
            Write-Host "  To recover them: git stash pop" -ForegroundColor DarkGray
        }
        Write-Host ""
        Write-Host "  IMPORTANT: Rebuild the db package after restore:" -ForegroundColor Yellow
        Write-Host "  cd packages\db; pnpm build" -ForegroundColor Yellow
        Write-Host ""
    }

    "status" {
        Write-Host ""
        Write-Host "  Current status:" -ForegroundColor Cyan
        $current = git describe --tags --always 2>$null
        Write-Host "  Latest version: $current"
        Write-Host ""
        $changes = git status --short
        if ($changes) {
            Write-Host "  Unsaved changes:" -ForegroundColor Yellow
            $changes | ForEach-Object { Write-Host "  $_" }
        } else {
            Write-Host "  No unsaved changes — code matches last saved version." -ForegroundColor Green
        }
        Write-Host ""
    }

    default {
        Write-Host ""
        Write-Host "  LTIC SARL Version Control" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "  Commands:"
        Write-Host "    .\version.ps1 save `"description`"  — save current state as new version"
        Write-Host "    .\version.ps1 list                  — list all saved versions"
        Write-Host "    .\version.ps1 status                — show unsaved changes"
        Write-Host "    .\version.ps1 show v1.0.0           — what changed in that version"
        Write-Host "    .\version.ps1 diff v1.0.0           — compare current code to a version"
        Write-Host "    .\version.ps1 restore v1.0.0        — revert code to that version"
        Write-Host ""
    }
}
