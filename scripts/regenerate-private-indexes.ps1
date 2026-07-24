# Erzeugt server\private\ Struktur, index.php + HTML-Fallback in excel/png/pdf
$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Web

$root = Split-Path $PSScriptRoot -Parent
$private = Join-Path $root "server\private"
$indexDefault = Join-Path $PSScriptRoot "folder-index.php"
$indexExcel = Join-Path $PSScriptRoot "folder-index-excel.php"
$viewerExcel = Join-Path $PSScriptRoot "excel-viewer.php"
$templateHt = Join-Path $PSScriptRoot "folder-htaccess.txt"
$rootIndex = Join-Path $PSScriptRoot "private-root-index.html"
$rootHt = Join-Path $PSScriptRoot "private-root.htaccess"

$sections = @(
    @{ Path = "price\graphite";           Title = "Price · Graphite / Thermofeld" },
    @{ Path = "price\ping-pong-robot";   Title = "Price · Ping-Pong-Roboter" },
    @{ Path = "produkt\graphite";         Title = "Produkt · Graphite / Thermofeld" },
    @{ Path = "produkt\ping-pong-robot"; Title = "Produkt · Ping-Pong-Roboter" }
)

function Write-SectionIndex($dir, $title) {
    $html = @"
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>$title</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 720px; margin: 2rem auto; padding: 0 1rem; line-height: 1.5; }
    a { color: #0b57d0; }
    ul { padding-left: 1.25rem; }
    li { margin: 0.5rem 0; }
  </style>
</head>
<body>
  <p><a href="../../">Interne Daten</a></p>
  <h1>$title</h1>
  <ul>
    <li><a href="excel/">Excel</a> — Tabellen (Vorschau im Browser)</li>
    <li><a href="pdf/">PDF</a> — Kataloge, Dokumente</li>
    <li><a href="png/">PNG</a> — Bilder</li>
  </ul>
</body>
</html>
"@
    $utf8 = New-Object System.Text.UTF8Encoding $false
    [System.IO.File]::WriteAllText((Join-Path $dir "index.html"), $html, $utf8)
}

function Write-FallbackHtml($dir, $isExcel) {
    $skip = @("index.html", "index.php", "viewer.php", ".htaccess", ".gitkeep", ".no-auto-index")
    $files = Get-ChildItem $dir -File -ErrorAction SilentlyContinue | Where-Object {
        $skip -notcontains $_.Name
    } | Sort-Object Name

    $title = if ($isExcel) { "Excel-Dateien" } else { "Dateien" }
    $lines = @()
    foreach ($f in $files) {
        $href = [System.Uri]::EscapeUriString($f.Name)
        $name = [System.Web.HttpUtility]::HtmlEncode($f.Name)
        if ($isExcel -and $f.Extension -match '^\.(xlsx|xls|csv)$') {
            $lines += ('    <li><strong>{0}</strong> &mdash; <a href="{1}">Download</a> &middot; <a href="viewer.php?f={1}">Anzeigen</a></li>' -f $name, $href)
        } else {
            $lines += ('    <li><a href="{0}">{1}</a></li>' -f $href, $name)
        }
    }

    if ($files.Count -eq 0) {
        $body = '  <p class="empty">Noch keine Dateien.</p>'
    } else {
        $body = "  <ul>`n" + ($lines -join "`n") + "`n  </ul>"
    }

    $html = @"
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>$title</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 720px; margin: 2rem auto; padding: 0 1rem; line-height: 1.5; }
    a { color: #0b57d0; }
    .empty { color: #666; }
    .meta { color: #888; font-size: 0.85rem; margin-top: 2rem; }
  </style>
</head>
<body>
  <p><a href="../">Zur&uuml;ck</a></p>
  <h1>$title</h1>
$body
  <p class="meta">HTML-Fallback</p>
</body>
</html>
"@

    $path = Join-Path $dir "index.html"
    $utf8 = New-Object System.Text.UTF8Encoding $false
    [System.IO.File]::WriteAllText($path, $html, $utf8)
}

New-Item -ItemType Directory -Force -Path $private | Out-Null
Copy-Item $rootIndex (Join-Path $private "index.html") -Force
Copy-Item $rootHt (Join-Path $private ".htaccess") -Force

foreach ($sec in $sections) {
    $secDir = Join-Path $private $sec.Path
    New-Item -ItemType Directory -Force -Path $secDir | Out-Null
    Write-SectionIndex $secDir $sec.Title
    foreach ($sub in @("excel", "png", "pdf")) {
        $subDir = Join-Path $secDir $sub
        New-Item -ItemType Directory -Force -Path $subDir | Out-Null
        $gk = Join-Path $subDir ".gitkeep"
        if (-not (Test-Path $gk)) { New-Item -ItemType File -Path $gk | Out-Null }
    }
}

Get-ChildItem $private -Recurse -Directory | Where-Object { $_.Name -in @("excel", "png", "pdf") } | ForEach-Object {
    $dir = $_.FullName
    $rel = $dir.Substring($private.Length + 1)
    $isExcel = ($_.Name -eq "excel")

    if ($isExcel) {
        Copy-Item $indexExcel (Join-Path $dir "index.php") -Force
        Copy-Item $viewerExcel (Join-Path $dir "viewer.php") -Force
    } else {
        Copy-Item $indexDefault (Join-Path $dir "index.php") -Force
        $viewer = Join-Path $dir "viewer.php"
        if (Test-Path $viewer) { Remove-Item $viewer -Force }
    }

    Copy-Item $templateHt (Join-Path $dir ".htaccess") -Force
    Write-FallbackHtml $dir $isExcel
    Write-Host "OK  $rel"
}

Write-Host "OK  (root + sections)"
