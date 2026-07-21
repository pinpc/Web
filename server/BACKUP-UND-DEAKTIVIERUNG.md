# SiteGround: Backup & Deaktivierung unbenutzter Daten

**Ziel:** Statische Website (Hub + graphiteproduct + robot) aktivieren, altes WordPress und Duplikate sichern und deaktivieren.

**Du musst dies im SiteGround File Manager ausführen** (Agent hat keinen Login-Zugang).

---

## Phase 1 – Vollständiges Backup (zuerst!)

### 1a) SiteGround-Backup (empfohlen)

1. https://tools.siteground.com/ → **Site Tools**
2. **Security → Backups** (oder **WordPress → Backups**)
3. **Create Backup** → Datum notieren (z. B. `2026-07-21-vor-static`)

### 1b) Manuelles ZIP im File Manager

Im Ordner `pingz.sg-host.com/`:

| Ordner/Datei | Aktion |
|---|---|
| `public_html/` (komplett) | Rechtsklick → **Compress** → `backup-public_html-2026-07-21.zip` |
| `graphiteproduct/` (außerhalb public_html) | Compress → `backup-graphiteproduct-ausserhalb-2026-07-21.zip` |

ZIP-Dateien **nicht löschen** – mindestens 4 Wochen behalten.

---

## Phase 2 – Was ist „unbenutzt“?

| Element | Grund | Aktion |
|---|---|---|
| **WordPress** (`wp-admin`, `wp-content`, `wp-includes`, `index.php`, …) | Platzhalter „My WordPress“, blockiert statische Hauptseite | Archivieren |
| **`graphiteproduct/` neben `public_html`** | Nicht öffentlich erreichbar, Duplikat | Archivieren |
| Alte PDF V1 in `public_html/graphiteproduct/downloads/` | Ersetzt durch V2 | Beim Upload ersetzen (in Backup enthalten) |

**Behalten / aktiv:**

- `public_html/graphiteproduct/` (aktuelle statische Seite)
- Neu: `public_html/index.html`, `robot/`, `css/`, `js/`, `impressum.html`, `datenschutz.html`

---

## Phase 3 – Deaktivieren (nicht sofort löschen!)

### Schritt 1: Archiv-Ordner anlegen

In `public_html/` neuen Ordner:

```
public_html/_archiv_2026-07-21/
```

### Schritt 2: WordPress verschieben (deaktivieren)

Diese Elemente **verschieben** nach `public_html/_archiv_2026-07-21/wordpress/`:

- `wp-admin/`
- `wp-content/`
- `wp-includes/`
- `index.php`
- `wp-*.php` (alle wp-Dateien in public_html)
- `.htaccess` (alte WordPress-Version – **vorher kopieren!**)

WordPress ist danach **deaktiviert**, Daten liegen im Archiv.

### Schritt 3: Duplikat außerhalb public_html

Ordner `pingz.sg-host.com/graphiteproduct/` ( **nicht** der in public_html):

→ Verschieben nach z. B. `pingz.sg-host.com/_archiv_2026-07-21/graphiteproduct-doppel/`

### Schritt 4: Neue statische Dateien hochladen

Aus `c:\temp_web\` nach `public_html/`:

```
index.html
impressum.html
datenschutz.html
css/
js/
images/          ← Logo aus graphiteproduct/images/zhou_consulting_logo.png kopieren
robot/
graphiteproduct/ ← komplett aktualisieren
```

### Schritt 5: Neue `.htaccess`

Datei `server/htaccess-static.txt` aus diesem Projekt nach `public_html/.htaccess` hochladen  
(bzw. Inhalt einfügen, wenn noch keine .htaccess existiert).

---

## Phase 4 – Testen

| URL | Erwartung |
|---|---|
| https://www.zhou-consult.com/ | Hub mit 2 Bereichen |
| https://www.zhou-consult.com/graphiteproduct/ | Thermofeld-Seite |
| https://www.zhou-consult.com/robot/ | Robotik-Platzhalter |
| https://www.zhou-consult.com/graphiteproduct/impressum.html | Impressum mit Inhalt |
| https://www.zhou-consult.com/wp-admin/ | 404 oder Fehler (WordPress aus) |

Browser: **Strg+F5**

---

## Rollback (falls etwas schiefgeht)

1. `public_html/_archiv_2026-07-21/wordpress/` → Inhalt zurück nach `public_html/`
2. Alte `.htaccess` aus Archiv wiederherstellen
3. Oder: SiteGround-Backup vom Phase 1 wieder einspielen

---

## Checkliste

- [ ] SiteGround-Backup erstellt
- [ ] ZIP von public_html erstellt
- [ ] WordPress nach `_archiv_2026-07-21/wordpress/` verschoben
- [ ] Duplikat-graphiteproduct außerhalb public_html archiviert
- [ ] Statische Dateien aus c:\temp_web hochgeladen
- [ ] `.htaccess` gesetzt
- [ ] Alle URLs getestet
