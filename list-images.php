<?php
header('Content-Type: application/json');

$directory = $_GET['directory'] ?? '';
$allowedDirectories = ['images/heads', 'images/bodies', 'images/shoes', 'backgrounds'];

if (!in_array($directory, $allowedDirectories)) {
    echo json_encode([]);
    exit;
}

$files = glob("$directory/*.png");
$files = array_map(function($file) use ($directory) {
    return basename($file);
}, $files);

echo json_encode($files);