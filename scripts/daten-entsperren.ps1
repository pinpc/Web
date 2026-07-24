# Entpackt daten-geschuetzt.7z in den Ordner daten\
$ErrorActionPreference = "Stop"
$root = Split-Path $PSScriptRoot -Parent
$datenDir = Join-Path $root "daten"
$archive = Join-Path $root "daten-geschuetzt.7z"

if (-not (Test-Path $archive)) {
    Write-Error "Archiv nicht gefunden: $archive`nBitte zuerst scripts\daten-sperren.ps1 ausfuehren."
}

$7z = Get-Command 7z -ErrorAction SilentlyContinue
if (-not $7z) {
    Write-Error "7-Zip (7z) nicht gefunden."
}

$pass = Read-Host "Passwort eingeben" -AsSecureString
$ptr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($pass)
try { $plain = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($ptr) }
finally { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ptr) }

New-Item -ItemType Directory -Force -Path $datenDir | Out-Null

& $7z.Source "x" "-y" "-p$plain" "-o$datenDir" $archive | Out-Host
$plain = $null

if ($LASTEXITCODE -ne 0) {
    Write-Error "Entpacken fehlgeschlagen (Passwort falsch oder Archiv beschaedigt)."
}

Write-Host ""
Write-Host "Entpackt nach: $datenDir"
