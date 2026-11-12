<?php
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/../config/connect-db.php';

try {
    $stmt = $pdo->query("SELECT id, name, slug FROM categories ORDER BY id ASC");
    $categories = $stmt->fetchAll();

    echo json_encode([
        "success" => true,
        "categories" => $categories
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}
