<?php
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');
header('Expires: 0');

$f = isset($_GET['f']) ? basename($_GET['f']) : '';
$ext = strtolower(pathinfo($f, PATHINFO_EXTENSION));
$allowed = array('xlsx', 'xls', 'csv');

if ($f === '' || !in_array($ext, $allowed, true)) {
    http_response_code(400);
    header('Content-Type: text/plain; charset=UTF-8');
    echo 'Ungueltige Datei.';
    exit;
}

$path = __DIR__ . DIRECTORY_SEPARATOR . $f;
if (!is_file($path)) {
    http_response_code(404);
    header('Content-Type: text/plain; charset=UTF-8');
    echo 'Datei nicht gefunden.';
    exit;
}

header('Content-Type: text/html; charset=UTF-8');

function pzc_h($s) {
    return htmlspecialchars($s, ENT_QUOTES, 'UTF-8');
}

function pzc_href($name) {
    return str_replace('%2F', '/', rawurlencode($name));
}
?>
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php echo pzc_h($f); ?></title>
  <script src="https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js"></script>
  <style>
    body { font-family: system-ui, sans-serif; margin: 0; padding: 1rem; line-height: 1.4; color: #1a1a1a; }
    a { color: #0b57d0; }
    h1 { font-size: 1.1rem; margin: 0 0 0.75rem; word-break: break-word; }
    .toolbar { display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center; margin-bottom: 1rem; }
    .tabs { display: flex; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 0.75rem; }
    .tabs button {
      border: 1px solid #ccc; background: #f5f5f5; padding: 0.35rem 0.65rem;
      border-radius: 4px; cursor: pointer; font: inherit;
    }
    .tabs button.active { background: #0b57d0; color: #fff; border-color: #0b57d0; }
    .table-wrap { overflow: auto; max-width: 100%; border: 1px solid #ddd; border-radius: 4px; }
    table { border-collapse: collapse; min-width: 100%; font-size: 0.9rem; }
    td, th { border: 1px solid #ddd; padding: 0.35rem 0.5rem; white-space: nowrap; }
    th { background: #f0f0f0; position: sticky; top: 0; }
    .loading, .error { color: #666; }
    .meta { color: #888; font-size: 0.85rem; margin-top: 1rem; }
  </style>
</head>
<body>
  <p><a href="./">Zur&uuml;ck zur Liste</a></p>
  <h1><?php echo pzc_h($f); ?></h1>
  <div class="toolbar">
    <a href="<?php echo pzc_href($f); ?>">Download</a>
  </div>
  <div id="tabs" class="tabs"></div>
  <div id="status" class="loading">Lade Tabelle …</div>
  <div id="sheet" class="table-wrap"></div>
  <p class="meta">Excel-Vorschau im Browser</p>

  <script>
(function () {
  var fileName = <?php echo json_encode($f, JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT); ?>;
  var statusEl = document.getElementById('status');
  var sheetEl = document.getElementById('sheet');
  var tabsEl = document.getElementById('tabs');
  var workbook;

  function showSheet(name) {
    if (!workbook || !workbook.Sheets[name]) return;
    var html = XLSX.utils.sheet_to_html(workbook.Sheets[name], { editable: false });
    sheetEl.innerHTML = html;
    Array.prototype.forEach.call(tabsEl.querySelectorAll('button'), function (btn) {
      btn.classList.toggle('active', btn.textContent === name);
    });
  }

  fetch(encodeURI(fileName))
    .then(function (res) {
      if (!res.ok) throw new Error('Datei konnte nicht geladen werden.');
      return res.arrayBuffer();
    })
    .then(function (data) {
      workbook = XLSX.read(data, { type: 'array' });
      statusEl.style.display = 'none';
      if (!workbook.SheetNames.length) {
        statusEl.textContent = 'Keine Tabellenblätter gefunden.';
        statusEl.style.display = 'block';
        return;
      }
      workbook.SheetNames.forEach(function (name) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = name;
        btn.addEventListener('click', function () { showSheet(name); });
        tabsEl.appendChild(btn);
      });
      showSheet(workbook.SheetNames[0]);
    })
    .catch(function (err) {
      statusEl.className = 'error';
      statusEl.textContent = err.message || 'Fehler beim Laden.';
    });
})();
  </script>
</body>
</html>
