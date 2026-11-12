<?php
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/../config/connect-db.php';

try {
    $category = $_GET['category'] ?? null;
    $categoryId = $_GET['category_id'] ?? null;
    $includeAll = isset($_GET['include_all']) || isset($_GET['admin']); // show sold products too

    // Base query
    $sql = "SELECT p.*, c.name as category_name 
            FROM products p 
            LEFT JOIN categories c ON p.category_id = c.id 
            WHERE 1=1";
    $params = [];

    if (!$includeAll) {
        $sql .= " AND LOWER(p.status) = 'available'";
    }

    if ($categoryId && is_numeric($categoryId)) {
        $sql .= " AND p.category_id = ?";
        $params[] = (int)$categoryId;
    } elseif ($category && $category !== 'ទាំងអស់' && $category !== 'all') {
        $sql .= " AND (c.name = ? OR c.slug = ?)";
        $params[] = $category;
        $params[] = strtolower(str_replace(' ', '-', $category));
    }

    $sql .= " ORDER BY p.id DESC";

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $rows = $stmt->fetchAll();

    if (empty($rows)) {
        echo json_encode([
            "success" => true,
            "products" => []
        ]);
        exit();
    }

    // Collect all product IDs to batch fetch images and attributes efficiently
    $productIds = array_column($rows, 'id');
    $placeholders = implode(',', array_fill(0, count($productIds), '?'));

    // Batch fetch images
    $imgStmt = $pdo->prepare("SELECT product_id, image_url, is_main FROM product_img WHERE product_id IN ($placeholders) ORDER BY is_main DESC, id ASC");
    $imgStmt->execute($productIds);
    $allImgs = $imgStmt->fetchAll();

    $imagesByProduct = [];
    foreach ($allImgs as $img) {
        $pid = $img['product_id'];
        if (!isset($imagesByProduct[$pid])) {
            $imagesByProduct[$pid] = [];
        }
        $imagesByProduct[$pid][] = $img['image_url'];
    }

    // Batch fetch attributes
    $attrStmt = $pdo->prepare("SELECT product_id, stat_key, stat_value FROM product_attribute WHERE product_id IN ($placeholders) ORDER BY id ASC");
    $attrStmt->execute($productIds);
    $allAttrs = $attrStmt->fetchAll();

    $attrsByProduct = [];
    foreach ($allAttrs as $attr) {
        $pid = $attr['product_id'];
        if (!isset($attrsByProduct[$pid])) {
            $attrsByProduct[$pid] = [];
        }
        $attrsByProduct[$pid][$attr['stat_key']] = $attr['stat_value'];
    }

    // Format products for Frontend
    $products = [];
    foreach ($rows as $row) {
        $pid = $row['id'];
        $gallery = $imagesByProduct[$pid] ?? ['/images/bloxfruits.jpg'];
        $mainImage = $gallery[0] ?? '/images/bloxfruits.jpg';
        $stats = $attrsByProduct[$pid] ?? [];

        $pFormatted = [
            "id" => (string)$pid,
            "title" => $row['title'],
            "category" => $row['category_name'] ?: 'Blox Fruits',
            "priceUsd" => (float)$row['price'],
            "priceKhr" => (float)($row['price_khr'] ?: round($row['price'] * 4100)),
            "level" => $row['acc_lvl'] ?: 'កម្រិត Max',
            "robux" => (int)$row['robux_amount'],
            "badge" => $row['special_tag'] ?: '',
            "image" => $mainImage,
            "gallery" => $gallery,
            "description" => $row['descript'] ?: '',
            "emailStatus" => $row['email_status'] ?: 'គណនីស្អាត ១០០% មិនទាន់ភ្ជាប់ Email',
            "status" => strtolower($row['status']) === 'sold' || strtolower($row['status']) === 'sold out' ? 'sold' : 'available',
            "gameStats" => $stats
        ];

        // Include credentials for admin or post-purchase
        $pFormatted["credentials"] = [
            "username" => $row['username'] ?: '',
            "password" => $row['password'] ?: '',
            "linkedEmail" => $row['email_status'] ?: 'មិនទាន់ភ្ជាប់',
            "registeredDate" => substr($row['created_at'], 0, 10),
            "note" => "សូមប្តូរលេខសម្ងាត់ភ្លាមៗក្រោយទិញរួចរាល់"
        ];

        $products[] = $pFormatted;
    }

    echo json_encode([
        "success" => true,
        "count" => count($products),
        "products" => $products
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Database error: " . $e->getMessage()
    ]);
}
