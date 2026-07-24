<?php
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');
header('Expires: 0');
header('Content-Type: text/html; charset=UTF-8');

$skip = array('index.html', 'index.php', 'viewer.php', '.htaccess', '.gitkeep', '.no-auto-index');
$files = array();
$dir = __DIR__;
$entries = @scandir($dir);

if (is_array($entries)) {
    foreach ($entries as $name) {
        if ($name === '.' || $name === '..') {
            continue;
        }
        if (in_array($name, $skip, true)) {
            continue;
        }
        $path = $dir . DIRECTORY_SEPARATOR . $name;
        if (is_file($path)) {
            $files[] = $name;
        }
    }
}

sort($files, SORT_NATURAL | SORT_FLAG_CASE);

function pzc_h($s) {
    return htmlspecialchars($s, ENT_QUOTES, 'UTF-8');
}

function pzc_href($name) {
    return str_replace('%2F', '/', rawurlencode($name));
}

function pzc_is_spreadsheet($name) {
    $ext = strtolower(pathinfo($name, PATHINFO_EXTENSION));
    return in_array($ext, array('xlsx', 'xls', 'csv'), true);
}
?>
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Excel-Dateien</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 820px; margin: 2rem auto; padding: 0 1rem; line-height: 1.5; }
    a { color: #0b57d0; }
    .empty { color: #666; }
    .files { padding-left: 0; list-style: none; }
    .files li { margin: 0.75rem 0; padding: 0.65rem 0; border-bottom: 1px solid #eee; }
    .name { font-weight: 500; word-break: break-word; }
    .actions { margin-top: 0.35rem; font-size: 0.95rem; }
    .actions a { margin-right: 1rem; }
    .meta { color: #888; font-size: 0.85rem; margin-top: 2rem; }
  </style>
</head>
<body>
  <p><a href="../">Zur&uuml;ck</a></p>
  <h1>Excel-Dateien</h1>
<?php if (count($files) === 0): ?>
  <p class="empty">Noch keine Dateien in diesem Ordner.</p>
<?php else: ?>
  <ul class="files">
<?php foreach ($files as $name): ?>
    <li>
      <div class="name"><?php echo pzc_h($name); ?></div>
      <div class="actions">
        <a href="<?php echo pzc_href($name); ?>">Download</a>
<?php if (pzc_is_spreadsheet($name)): ?>
        <a href="viewer.php?f=<?php echo pzc_href($name); ?>">Im Browser anzeigen</a>
<?php endif; ?>
      </div>
    </li>
<?php endforeach; ?>
  </ul>
<?php endif; ?>
  <p class="meta">PHP-Liste · Excel-Vorschau</p>
</body>
</html>
