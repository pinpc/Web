# Private Daten – Scripts
# =======================

Workflow:
  1. Dateien in daten\ ablegen (siehe daten\README.txt)
  2. .\sync-daten-to-private.ps1
  3. FTP: server\private\ -> public_html\private\

Scripts:
  sync-daten-to-private.ps1       daten\ -> server\private\ + Indexe
  regenerate-private-indexes.ps1   nur Indexe neu erzeugen
  daten-sperren.ps1                daten\ -> daten-geschuetzt.7z
  daten-entsperren.ps1             Archiv entpacken

Vorlagen (werden nach server\private\ kopiert):
  folder-index.php                 PDF/PNG-Ordner
  folder-index-excel.php           Excel-Ordner
  excel-viewer.php                 Excel-Vorschau im Browser
  folder-htaccess.txt              .htaccess pro Ordner
  private-root-index.html          Startseite /private/
  private-root.htaccess            .htaccess /private/

Anleitung Server: server\PRIVATE-BEREICH.txt

Hinweis: daten\ und server\private\ sind in .gitignore (nicht auf GitHub).
