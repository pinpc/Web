# zhou-consult.com – lokales Webprojekt

**Pfad:** `C:\tmp_web`  
**In Cursor öffnen:** File → Open Folder → `C:\tmp_web`

## Struktur

```
C:\tmp_web\
├── index.html              Hauptseite (Hub)
├── impressum.html
├── datenschutz.html
├── css/  js/  images/
├── graphiteproduct/        Thermofeld-Materialien
│   ├── index.html
│   ├── products.html, contact.html, ...
│   ├── css/, js/, images/, downloads/
└── robot/                  Platzhalter (später ausbauen)
```

## Lokal testen

Doppelklick `index.html` oder:

```powershell
cd C:\tmp_web
python -m http.server 8080
```

- Hauptseite: http://localhost:8080/
- Graphite: http://localhost:8080/graphiteproduct/

## Upload SiteGround (später)

Gesamten Inhalt von `C:\tmp_web\` nach `public_html\` hochladen.

## Feintuning

| Was | Wo |
|-----|-----|
| Hub-Texte DE/EN | `js/content.js` |
| Graphite-Texte | `graphiteproduct/js/content.js` |
| Design / Mobil | `css/style.css` bzw. `graphiteproduct/css/style.css` |
