<?php
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/../config/connect-db.php';

$productId = $_GET['id'] ?? null;

if (!$productId) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Product ID is required"
    ]);
    exit();
}

try {
    // 1. Get product base record
    $stmt = $pdo->prepare("SELECT p.*, c.name as category_name 
                           FROM products p 
                           LEFT JOIN categories c ON p.category_id = c.id 
                           WHERE p.id = ?");
    $stmt->execute([(int)$productId]);
    $row = $stmt->fetch();

    if (!$row) {
        http_response_code(404);
        echo json_encode([
            "success" => false,
            "message" => "Product not found"
        ]);
        exit();
    }

    // 2. Get images
    $imgStmt = $pdo->prepare("SELECT image_url, is_main FROM product_img WHERE product_id = ? ORDER BY is_main DESC, id ASC");
    $imgStmt->execute([(int)$productId]);
    $images = $imgStmt->fetchAll(PDO::FETCH_COLUMN, 0);
    if (empty($images)) {
        $images = ['/images/bloxfruits.jpg'];
    }

    // 3. Get attributes
    $attrStmt = $pdo->prepare("SELECT stat_key, stat_value FROM product_attribute WHERE product_id = ? ORDER BY id ASC");
    $attrStmt->execute([(int)$productId]);
    $attrs = $attrStmt->fetchAll();
    $gameStats = [];
    foreach ($attrs as $a) {
        $gameStats[$a['stat_key']] = $a['stat_value'];
    }

    $product = [
        "id" => (string)$row['id'],
        "title" => $row['title'],
        "category" => $row['category_name'] ?: 'Blox Fruits',
        "priceUsd" => (float)$row['price'],
        "priceKhr" => (float)($row['price_khr'] ?: round($row['price'] * 4100)),
        "level" => $row['acc_lvl'] ?: 'កម្រិត Max',
        "robux" => (int)$row['robux_amount'],
        "badge" => $row['special_tag'] ?: '',
        "image" => $images[0],
        "gallery" => $images,
        "description" => $row['descript'] ?: '',
        "emailStatus" => $row['email_status'] ?: 'គណនីស្អាត ១០០% មិនទាន់ភ្ជាប់ Email',
        "status" => strtolower($row['status']) === 'sold' || strtolower($row['status']) === 'sold out' ? 'sold' : 'available',
        "gameStats" => $gameStats,
        "credentials" => [
            "username" => $row['username'] ?: '',
            "password" => $row['password'] ?: '',
            "linkedEmail" => $row['email_status'] ?: 'មិនទាន់ភ្ជាប់',
            "registeredDate" => substr($row['created_at'], 0, 10),
            "note" => "សូមប្តូរលេខសម្ងាត់ភ្លាមៗក្រោយទិញរួចរាល់"
        ]
    ];

    echo json_encode([
        "success" => true,
        "product" => $product
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Database error: " . $e->getMessage()
    ]);
}
