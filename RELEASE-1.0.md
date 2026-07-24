# Release 1.0 — Ping Zhou Consulting Web

**Tag:** `rel-1.0`  
**Datum:** 24.07.2026  
**Commit:** Veröffentlichungsstand für Hub, Graphite (Thermofeld) und Ping-Pong-Robotik

---

## Enthaltene Anwendungen

| Bereich | Pfad | Beschreibung |
|---------|------|--------------|
| **Hub** | `/` | Startseite, Impressum, Datenschutz |
| **Graphite / Thermofeld** | `/graphiteproduct/` | B2B-Produktwelt: Weichfilz, Hartfilz, C/C, Downloads, Kontakt |
| **Ping-Pong-Roboter** | `/robot/` | B2C-Produktwelt: Dora-Serie, Training, Service, Kontakt (FormSubmit) |

Beide Bereiche: DE/EN, responsive Layout, `contact@zhou-consult.com`.

---

## Nicht enthalten (bewusst ausgeschlossen)

- `daten/` — private Geschäftsdateien (Preislisten, Kataloge)
- `server/private/` — passwortgeschützter FTP-Bereich `/private/`
- `scripts/` — lokale Wartungstools

---

## Deployment (SiteGround / zhou-consult.com)

### Öffentliche Website (Git → FTP)

```
index.html, css/, js/, images/
impressum.html, datenschutz.html
graphiteproduct/          → public_html/graphiteproduct/
robot/                    → public_html/robot/
```

`.htaccess` aus `server/htaccess-static.txt` → `public_html/.htaccess`  
(Wichtig: `RewriteRule ^private - [L]` für passwortgeschützten Bereich)

### Privater Bereich (nur FTP, nicht GitHub)

```
scripts\sync-daten-to-private.ps1
server\private\           → public_html/private/
```

Anleitung: `server/PRIVATE-BEREICH.txt`

---

## Release-Historie

| Tag | Inhalt |
|-----|--------|
| `graphiteproduct-rel-1.0-baseline-01` | Früher Graphite-Baseline-Stand |
| **`rel-1.0`** | Hub + Graphite + Robotik — Veröffentlichungsversion 1.0 |

---

## Kurz-Checkliste vor Go-Live

- [ ] Hub, Graphite, Robot per FTP hochgeladen
- [ ] Kontaktformular Robot einmal testen (FormSubmit-Aktivierung)
- [ ] `/private/` passwortgeschützt und getrennt deployt
- [ ] Cache leeren nach Upload (SiteGround / Strg+F5)
