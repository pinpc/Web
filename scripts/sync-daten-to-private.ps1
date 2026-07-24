# Kopiert Dateien aus daten\ nach server\private\ und aktualisiert Indexe
$ErrorActionPreference = "Stop"
$root = Split-Path $PSScriptRoot -Parent
$from = Join-Path $root "daten"
$to = Join-Path $root "server\private"

$datenDirs = @(
    "price\graphite\excel", "price\graphite\png", "price\graphite\pdf",
    "price\ping-pong-robot\excel", "price\ping-pong-robot\png", "price\ping-pong-robot\pdf",
    "produkt\graphite\excel", "produkt\graphite\png", "produkt\graphite\pdf",
    "produkt\ping-pong-robot\excel", "produkt\ping-pong-robot\png", "produkt\ping-pong-robot\pdf"
)

if (-not (Test-Path $from)) {
    Write-Host "Erstelle daten\ Ordnerstruktur ..."
    foreach ($d in $datenDirs) {
        $p = Join-Path $from $d
        New-Item -ItemType Directory -Force -Path $p | Out-Null
        $gk = Join-Path $p ".gitkeep"
        if (-not (Test-Path $gk)) { New-Item -ItemType File -Path $gk | Out-Null }
    }
}

$ext = @(".xlsx", ".xls", ".csv", ".png", ".pdf", ".jpg", ".jpeg", ".webp")
$count = 0

Get-ChildItem $from -Recurse -File | Where-Object {
    $ext -contains $_.Extension.ToLower() -and $_.Name -ne ".gitkeep"
} | ForEach-Object {
    $rel = $_.FullName.Substring($from.Length + 1)
    $dest = Join-Path $to $rel
    $destDir = Split-Path $dest -Parent
    New-Item -ItemType Directory -Force -Path $destDir | Out-Null
    Copy-Item $_.FullName $dest -Force
    Write-Host "OK  $rel"
    $count++
}

Write-Host ""
Write-Host "$count Datei(en) kopiert."

& (Join-Path $PSScriptRoot "regenerate-private-indexes.ps1")

Write-Host ""
Write-Host "FTP-Upload: server\private\ -> public_html\private\"
