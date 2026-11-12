<?php
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/../config/connect-db.php';

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid JSON payload"]);
    exit();
}

$productId = $data['id'] ?? $_GET['id'] ?? null;
if (!$productId) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Product ID is required"]);
    exit();
}

try {
    // Check if product exists
    $checkStmt = $pdo->prepare("SELECT * FROM products WHERE id = ?");
    $checkStmt->execute([(int)$productId]);
    $existing = $checkStmt->fetch();

    if (!$existing) {
        http_response_code(404);
        echo json_encode(["success" => false, "message" => "Product not found"]);
        exit();
    }

    // If only updating status ( marking as sold after payment)
    if (isset($data['status']) && count($data) <= 3) {
        $updateStatus = $pdo->prepare("UPDATE products SET status = ? WHERE id = ?");
        $updateStatus->execute([$data['status'], (int)$productId]);
        echo json_encode(["success" => true, "message" => "Product status updated"]);
        exit();
    }

    $title = trim($data['title'] ?? $existing['title']);
    $categoryName = trim($data['category'] ?? '');
    $priceUsd = (float)($data['priceUsd'] ?? $existing['price']);
    $priceKhr = (float)($data['priceKhr'] ?? round($priceUsd * 4100));
    $level = trim($data['level'] ?? $existing['acc_lvl']);
    $robux = (int)($data['robux'] ?? $existing['robux_amount']);
    $badge = trim($data['badge'] ?? $existing['special_tag']);
    $emailStatus = trim($data['emailStatus'] ?? $existing['email_status']);
    $description = trim($data['description'] ?? $existing['descript']);
    $status = trim($data['status'] ?? $existing['status']);

    $credentials = $data['credentials'] ?? [];
    $username = trim($credentials['username'] ?? $data['username'] ?? $existing['username']);
    $password = trim($credentials['password'] ?? $data['password'] ?? $existing['password']);

    // Handle category
    $catId = $existing['category_id'];
    if (!empty($categoryName)) {
        $catStmt = $pdo->prepare("SELECT id FROM categories WHERE name = ? OR slug = ?");
        $slug = strtolower(str_replace(' ', '-', $categoryName));
        $catStmt->execute([$categoryName, $slug]);
        $foundCat = $catStmt->fetchColumn();
        if ($foundCat) {
            $catId = $foundCat;
        }
    }

    $sql = "UPDATE products SET 
        category_id = ?, title = ?, price = ?, price_khr = ?, acc_lvl = ?, 
        robux_amount = ?, special_tag = ?, email_status = ?, descript = ?, 
        username = ?, password = ?, status = ?
        WHERE id = ?";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        $catId, $title, $priceUsd, $priceKhr, $level, 
        $robux, $badge, $emailStatus, $description, 
        $username, $password, $status, (int)$productId
    ]);

    // Update images if provided
    if (isset($data['gallery']) || isset($data['image'])) {
        $coverImage = $data['image'] ?? '/images/bloxfruits.jpg';
        $gallery = $data['gallery'] ?? [$coverImage];

        $pdo->prepare("DELETE FROM product_img WHERE product_id = ?")->execute([(int)$productId]);
        $imgStmt = $pdo->prepare("INSERT INTO product_img (product_id, image_url, is_main) VALUES (?, ?, ?)");
        $imgStmt->execute([(int)$productId, $coverImage, '1']);
        foreach ($gallery as $gUrl) {
            if ($gUrl !== $coverImage && !empty($gUrl)) {
                $imgStmt->execute([(int)$productId, $gUrl, '0']);
            }
        }
    }

    // Update gameStats if provided
    if (isset($data['gameStats']) && is_array($data['gameStats'])) {
        $pdo->prepare("DELETE FROM product_attribute WHERE product_id = ?")->execute([(int)$productId]);
        $attrStmt = $pdo->prepare("INSERT INTO product_attribute (product_id, stat_key, stat_value) VALUES (?, ?, ?)");
        foreach ($data['gameStats'] as $k => $v) {
            if (!empty($k) && !empty($v)) {
                $attrStmt->execute([(int)$productId, (string)$k, (string)$v]);
            }
        }
    }

    echo json_encode([
        "success" => true,
        "message" => "បានកែប្រែទិន្នន័យគណនីជោគជ័យ!",
        "product" => $data
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Database error: " . $e->getMessage()
    ]);
}