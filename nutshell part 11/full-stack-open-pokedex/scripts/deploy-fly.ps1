# Run this in PowerShell (interactive) after winget install Fly-io.flyctl
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot\..

$app = (Select-String -Path fly.toml -Pattern "^app = '(.+)'").Matches.Groups[1].Value
Write-Host "Fly app name: $app"

flyctl auth whoami 2>$null
if ($LASTEXITCODE -ne 0) {
  Write-Host "Opening browser login..."
  flyctl auth login
}

flyctl apps list | Select-String $app
if ($LASTEXITCODE -ne 0 -or -not (flyctl apps list 2>$null | Select-String $app)) {
  Write-Host "Creating app $app ..."
  flyctl apps create $app --org personal
}

npm run deploy:full

Write-Host ""
Write-Host "Create GitHub secret FLY_API_TOKEN (repo Settings -> Secrets -> Actions):"
flyctl tokens create deploy -a $app

Write-Host ""
Write-Host "Deployed URL: https://${app}.fly.dev"
Write-Host "Verify: curl https://${app}.fly.dev/health"
