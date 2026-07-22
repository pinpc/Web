# Lokal bauen → später auf SiteGround uploaden

## 1. Lokal testen (jetzt)

1. Ordner öffnen: `c:\temp_ma\00_NACO\NACO Produkt\website\`
2. Doppelklick auf **`index.html`** im Browser
3. Alle Seiten prüfen: Produkte, Anwendungen, Downloads, Kontakt, Impressum, Datenschutz
4. Sprache umschalten: **DE | EN**

Optional mit lokalem Server (Formular-Tests):
```powershell
cd "c:\temp_ma\00_NACO\NACO Produkt\website"
python -m http.server 8080
```
Dann: http://localhost:8080/

---

## 2. Was lokal fertig ist (Punkte 1–4)

| # | Inhalt | Status |
|---|--------|--------|
| 1 | Logo + Produkt-/Anwendungsbilder | `images/` (Logo, Foto, 38 Präsentationsbilder) |
| 2 | Datenblätter als Download | `downloads/` (PDF + 3 DOCX) |
| 3 | Impressum & Datenschutz | `impressum.html`, `datenschutz.html` + Link zu zhou-consult.com |
| 4 | Vollständige lokale Website | 8 HTML-Seiten, DE/EN, Kontaktformular |

---

## 3. Upload auf SiteGround (später)

1. Login: https://tools.siteground.com/
2. **Site Tools → File Manager**
3. Zielordner: `public_html/graphiteproduct/`
4. **Gesamten Inhalt** aus `website\` hochladen:
   - alle `.html`
   - Ordner `css/`, `js/`, `images/`, `downloads/`
5. URL testen: https://www.zhou-consult.com/graphiteproduct/

### Wichtig beim Upload
- Ordnerstruktur beibehalten (relative Pfade!)
- `images/` und `downloads/` vollständig hochladen (~100+ MB wegen Bilder)
- Nach Upload: Kontaktformular einmal testen → FormSubmit-Bestätigung an `contact@zhou-consult.com`

---

## 4. Checkliste vor Go-Live

- [ ] Alle Seiten im Browser getestet
- [ ] DE/EN Texte geprüft
- [ ] Downloads funktionieren
- [ ] Kontaktformular sendet an contact@zhou-consult.com
- [ ] Impressum/Datenschutz verlinkt
- [ ] Optional: Weiterleitung von `/graphiteproduct` auf `index.html` in SiteGround einrichten

---

## Ordnerstruktur

```
website/
├── index.html
├── products.html
├── applications.html
├── technology.html
├── downloads.html
├── contact.html
├── impressum.html
├── datenschutz.html
├── css/style.css
├── js/ (content.js, i18n.js, layout.js, render.js)
├── images/ (Logo + Produktfotos)
└── downloads/ (PDF/DOCX Datenblätter)
```
