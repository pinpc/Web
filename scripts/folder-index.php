<?php
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');
header('Expires: 0');
header('Content-Type: text/html; charset=UTF-8');

$skip = array('index.html', 'index.php', 'viewer.php', 'list.php', '.htaccess', '.gitkeep', '.no-auto-index');
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
?><!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dateien</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 720px; margin: 2rem auto; padding: 0 1rem; line-height: 1.5; }
    a { color: #0b57d0; }
    .empty { color: #666; }
    .files { padding-left: 1.25rem; }
    .meta { color: #888; font-size: 0.85rem; margin-top: 2rem; }
  </style>
</head>
<body>
  <p><a href="../">Zur&uuml;ck</a></p>
  <h1>Dateien</h1>
<?php if (count($files) === 0): ?>
  <p class="empty">Noch keine Dateien in diesem Ordner.</p>
<?php else: ?>
  <ul class="files">
<?php foreach ($files as $name): ?>
    <li><a href="<?php echo pzc_href($name); ?>"><?php echo pzc_h($name); ?></a></li>
<?php endforeach; ?>
  </ul>
<?php endif; ?>
  <p class="meta">PHP-Liste</p>
</body>
</html>
