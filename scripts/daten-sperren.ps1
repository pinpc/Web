# Erstellt ein passwortgeschuetztes 7z-Archiv aus dem Ordner daten\
$ErrorActionPreference = "Stop"
$root = Split-Path $PSScriptRoot -Parent
$datenDir = Join-Path $root "daten"
$archive = Join-Path $root "daten-geschuetzt.7z"

if (-not (Test-Path $datenDir)) {
    Write-Error "Ordner nicht gefunden: $datenDir"
}

$7z = Get-Command 7z -ErrorAction SilentlyContinue
if (-not $7z) {
    Write-Error "7-Zip (7z) nicht gefunden. Bitte installieren: scoop install 7zip"
}

Write-Host ""
Write-Host "Datenordner verschluesseln: $datenDir"
Write-Host "Zielarchiv: $archive"
Write-Host ""

$pass1 = Read-Host "Neues Passwort eingeben" -AsSecureString
$pass2 = Read-Host "Passwort wiederholen" -AsSecureString

function Get-PlainText([Security.SecureString]$secure) {
    $ptr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
    try { [Runtime.InteropServices.Marshal]::PtrToStringBSTR($ptr) }
    finally { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ptr) }
}

$p1 = Get-PlainText $pass1
$p2 = Get-PlainText $pass2

if ($p1 -ne $p2) {
    Write-Error "Passwoerter stimmen nicht ueberein."
}
if ($p1.Length -lt 8) {
    Write-Error "Passwort muss mindestens 8 Zeichen haben."
}

if (Test-Path $archive) {
    $backup = "$archive.bak-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
    Copy-Item $archive $backup
    Write-Host "Altes Archiv gesichert als: $backup"
    Remove-Item $archive -Force
}

& $7z.Source "a" "-t7z" "-mhe=on" "-mx=9" "-p$p1" $archive "$datenDir\*" | Out-Host
$p1 = $null

if ($LASTEXITCODE -ne 0) {
    Write-Error "7-Zip Archivierung fehlgeschlagen."
}

Write-Host ""
Write-Host "Fertig: $archive"
Write-Host "Die Ordner excel\, png\, pdf\ bleiben lokal unverschluesselt."
Write-Host "Fuer Backup nur die .7z-Datei verwenden – Passwort sicher aufbewahren."
