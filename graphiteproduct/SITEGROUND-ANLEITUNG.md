# Website Thermofeld-Materialien – SiteGround Anleitung

Ziel-URL: **https://www.zhou-consult.com/graphiteproduct/**

## Was Cursor vorbereitet hat

Ordner: `c:\temp_ma\00_NACO\NACO Produkt\website\`

| Datei | Zweck |
|---|---|
| `index.html` | Startseite (DE/EN) |
| `products.html` | Produkte + Spezifikationstabellen (aus PDF 2026V1) |
| `applications.html` | Anwendungen nach Temperatur/Industrie |
| `technology.html` | CVD-Technologie, Anpassbarkeit |
| `contact.html` | Kontaktformular → **contact@zhou-consult.com** |
| `css/style.css` | Layout / Corporate Style |
| `js/content.js` | Alle Texte DE/EN + Produktdaten |
| `js/i18n.js` | Sprachumschaltung |
| `js/render.js` | Dynamische Tabellen |

Datenquellen:
- PDF: `Presentation\Introduction to Thermal field materials_Ping Zhou Consulting (2026V1).pdf`
- Referenzstruktur: SGL Carbon, Vulcan, HNFOT (Kategorien, Anwendungen, Kennwerte)

---

## Option A – Statische Website hochladen (empfohlen für Cursor-Entwurf)

1. Bei **SiteGround** einloggen: https://tools.siteground.com/
2. **Site Tools → File Manager** (oder FTP)
3. Ordner `public_html/graphiteproduct/` anlegen
4. Gesamten Inhalt aus `website\` hochladen (alle HTML, css/, js/)
5. Test: `https://www.zhou-consult.com/graphiteproduct/index.html`

### Kontaktformular aktivieren

Das Formular nutzt **FormSubmit.co**:
- Erste Anfrage löst Bestätigungs-Mail an `contact@zhou-consult.com` aus (einmalig bestätigen)
- Alternative in SiteGround: Formular-Widget im Website Builder + Ziel-Mail `contact@zhou-consult.com`

---

## Option B – SiteGround Website Builder

Wenn Sie den **Website Builder** nutzen möchten:

1. Neue Seite `/graphiteproduct` anlegen
2. Inhalte aus `js/content.js` und `products.html` **abschnittsweise kopieren**
3. DE- und EN-Version als zwei Seiten oder mit Builder-Sprachfunktion
4. Kontaktformular im Builder auf `contact@zhou-consult.com` setzen

Struktur wie Referenzseiten:
- **Start** → Hero + 3 Produktkategorien + ROI
- **Produkte** → Soft felt / Cured felt / C/C mit Tabellen
- **Anwendungen** → Temperaturbereiche + Branchen
- **Technologie** → CVD, Kennwerte
- **Kontakt** → Formular + Impressum-Link

---

## Bilder / Anwendungsfotos

Referenzquellen (nur als **Layout-Inspiration** oder mit **schriftlicher Freigabe**):
- https://www.vulcan-hz.com/
- http://www.goldstonelee.com/casesAll.html
- https://www.hnfot.com/

**Wichtig:** Fremde Website-Bilder nicht ohne Lizenz übernehmen.

Empfohlen:
1. Eigene Produkt- und Ofenfotos
2. Fotos aus der Präsentation (2026V1) exportieren → `website/images/`
3. Platzhalter in HTML durch `<img src="images/...">` ersetzen

---

## DE/EN Sprache

- Umschaltung oben rechts (**DE | EN**)
- Sprache wird im Browser gespeichert (`localStorage`)
- Alle Texte zentral in `js/content.js` editierbar

---

## Nächste Schritte (optional)

- [ ] Logo `zhou_consulting_logo.png` einbinden
- [ ] Impressum & Datenschutz von zhou-consult.com verlinken
- [ ] PDF-Datenblätter aus `Datasheets\` zum Download anbieten
- [ ] Google Search Console / Analytics
- [ ] Erste Formular-Testmail an contact@zhou-consult.com

---

## Kurz-Vergleich mit Referenz-Websites

| Element | SGL Carbon | Ihre Seite |
|---|---|---|
| Produktkategorien | SIGRATHERM, SIGRABOND | Soft felt, Cured felt, C/C |
| Anwendungen | Vakuumofen, Wärmebehandlung | ≤1500–3200 °C, PV, SiC |
| Kennwerte | PDF-Downloads | Tabellen auf products.html |
| Kontakt | Formular | contact@zhou-consult.com |
| Sprachen | DE/EN | DE/EN (umschaltbar) |
