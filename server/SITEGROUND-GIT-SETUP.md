# SiteGround Git – Deployment aus GitHub

**SiteGround:** [Git Tool](https://tools.siteground.com/git?siteId=Smd2Mlpub0lJdz09)  
**Repository:** https://github.com/pinpc/Web.git  
**Branch:** `main`

---

## Voraussetzungen

- Hosting-Plan mit **Git-Tool** (GrowBig/GoGeek je nach Tarif – in Site Tools prüfen)
- GitHub-Repo `pinpc/Web` ist aktuell (letzter Push: `main`)
- **Vor dem ersten Deploy:** WordPress backup + archivieren (siehe `BACKUP-UND-DEAKTIVIERUNG.md`)

---

## Schritt 1 – SiteGround Git öffnen

1. https://tools.siteground.com/git?siteId=Smd2Mlpub0lJdz09
2. Domain **zhou-consult.com** auswählen (falls mehrere Sites)

---

## Schritt 2 – GitHub-Repository verbinden

1. **Create New Repository** oder **Import / Clone from GitHub**
2. Repository-URL: `git@github.com:pinpc/Web.git`  
   (alternativ HTTPS: `https://github.com/pinpc/Web.git`)
3. Branch: **`main`**

### SSH-Schlüssel (privates Repo oder empfohlen)

1. In SiteGround Git: **SSH Key** anzeigen / generieren
2. In GitHub: **Repo → Settings → Deploy keys → Add deploy key**
3. Öffentlichen Schlüssel von SiteGround einfügen (nur Read reicht für Pull)

---

## Schritt 3 – Deploy-Ziel (wichtig!)

| Einstellung | Wert |
|---|---|
| **Zielordner** | `public_html` |
| **Effekt** | Inhalt von `c:\temp_web\` landet direkt unter der Website-Wurzel |

Ergebnis auf dem Server:

```
public_html/
├── index.html              ← Hub-Hauptseite
├── graphiteproduct/        ← Thermofeld
├── robot/                  ← Ping-Pong-Robotik
├── css/, js/, impressum.html, datenschutz.html
└── (WordPress-Reste vorher archivieren!)
```

---

## Schritt 4 – Dateien ausschließen (Exclude List)

Im SiteGround Git Tool unter **Files Exclude List** eintragen:

```
punu/
server/
README.md
.gitignore
.git/
```

Damit werden Planungsdocs und Punu-Projekt **nicht** auf den Server kopiert.

---

## Schritt 5 – Ersten Deploy ausführen

1. **Deploy** / **Pull** / **Update** klicken (Bezeichnung je nach UI)
2. Log prüfen – keine Fehler?
3. Testen:
   - https://www.zhou-consult.com/graphiteproduct/
   - https://www.zhou-consult.com/robot/
   - https://www.zhou-consult.com/ (nach `.htaccess` + WordPress-Archiv)

---

## Schritt 6 – `.htaccess` für statische Hauptseite

Nach erstem Deploy manuell oder per Git:

Datei `server/htaccess-static.txt` → Inhalt nach `public_html/.htaccess` kopieren  
(WordPress-`.htaccess` vorher ins Archiv sichern!)

---

## Workflow danach (Alltag)

```text
Lokal ändern → git commit → git push origin main → SiteGround Git → Deploy
```

Oder: **Auto-Deploy on push** aktivieren (falls in SiteGround verfügbar).

---

## Noch nicht im Repo (lokal committen vor Deploy)

Diese Dateien existieren lokal, sind aber noch nicht gepusht:

- `graphiteproduct/impressum.html`
- `graphiteproduct/datenschutz.html`
- `graphiteproduct/js/layout.js` (Footer-Links)
- `graphiteproduct/js/content.js` (Datenschutz-Text)

→ Zuerst lokal committen und pushen, dann SiteGround Deploy.

---

## Fehlerbehebung

| Problem | Lösung |
|---|---|
| Hauptseite zeigt WordPress | WordPress archivieren + `.htaccess` setzen |
| Impressum leer | `graphiteproduct/impressum.html` deployen |
| Bilder fehlen | `graphiteproduct/images/` vollständig im Repo? Große Dateien ggf. Git LFS |
| Deploy schlägt fehl | Exclude-Liste prüfen; SiteGround Deploy-Log lesen |
| `images/` Logo auf Hub fehlt | `zhou_consulting_logo.png` nach `public_html/images/` (einmalig kopieren) |

---

## Alternative: GitHub Actions + SSH

Falls SiteGround Git eingeschränkt ist: GitHub Action mit SSH auf SiteGround (Port oft **18765**).  
Siehe [SiteGround Git Tutorial](https://www.siteground.com/tutorials/sg-git/) und [Deploy via GitHub Actions](https://laravelsharedhosting.novate.co.uk/siteground-shared-hosting/deploy-using-github-actions).
