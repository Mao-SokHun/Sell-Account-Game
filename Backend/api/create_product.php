<?php
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/../config/connect-db.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
if ($method !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method not allowed. Use POST."]);
    exit();
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid JSON payload"]);
    exit();
}

try {
    $title = trim($data['title'] ?? '');
    $categoryName = trim($data['category'] ?? 'Blox Fruits');
    $priceUsd = (float)($data['priceUsd'] ?? $data['price'] ?? 0);
    $priceKhr = (float)($data['priceKhr'] ?? round($priceUsd * 4100));
    $level = trim($data['level'] ?? $data['acc_lvl'] ?? 'កម្រិត Max');
    $robux = (int)($data['robux'] ?? $data['robux_amount'] ?? 0);
    $badge = trim($data['badge'] ?? $data['special_tag'] ?? '');
    $emailStatus = trim($data['emailStatus'] ?? $data['email_status'] ?? 'គណនីស្អាត ១០០% មិនទាន់ភ្ជាប់ Email');
    $description = trim($data['description'] ?? $data['descript'] ?? '');
    $status = trim($data['status'] ?? 'available');

    // Extract credentials
    $credentials = $data['credentials'] ?? [];
    $username = trim($credentials['username'] ?? $data['username'] ?? '');
    $password = trim($credentials['password'] ?? $data['password'] ?? '');

    if (empty($title) || empty($username) || empty($password)) {
        http_response_code(400);
        echo json_encode([
            "success" => false, 
            "message" => "ចំណងជើង, Username និង Password ត្រូវបានទាមទារ!"
        ]);
        exit();
    }

    // 1. Find or create Category
    $catStmt = $pdo->prepare("SELECT id FROM categories WHERE name = ? OR slug = ?");
    $slug = strtolower(str_replace(' ', '-', $categoryName));
    $catStmt->execute([$categoryName, $slug]);
    $catId = $catStmt->fetchColumn();

    if (!$catId) {
        $insertCat = $pdo->prepare("INSERT INTO categories (name, slug) VALUES (?, ?) RETURNING id");
        $insertCat->execute([$categoryName, $slug]);
        $catId = $insertCat->fetchColumn();
    }

    // 2. Insert into products
    $sql = "INSERT INTO products (
        category_id, title, price, price_khr, acc_lvl, robux_amount, 
        special_tag, email_status, descript, username, password, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id, created_at";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        $catId,
        $title,
        $priceUsd,
        $priceKhr,
        $level,
        $robux,
        $badge,
        $emailStatus,
        $description,
        $username,
        $password,
        $status
    ]);
    $created = $stmt->fetch();
    $productId = $created['id'];
    $createdAt = $created['created_at'];

    // 3. Insert images into product_img
    $coverImage = $data['image'] ?? '/images/bloxfruits.jpg';
    $gallery = $data['gallery'] ?? [$coverImage];
    if (empty($gallery)) {
        $gallery = [$coverImage];
    }

    $imgStmt = $pdo->prepare("INSERT INTO product_img (product_id, image_url, is_main) VALUES (?, ?, ?)");
    $imgStmt->execute([$productId, $coverImage, '1']);

    foreach ($gallery as $gUrl) {
        if ($gUrl !== $coverImage && !empty($gUrl)) {
            $imgStmt->execute([$productId, $gUrl, '0']);
        }
    }

    // 4. Insert gameStats into product_attribute
    $gameStats = $data['gameStats'] ?? [];
    if (is_array($gameStats) && count($gameStats) > 0) {
        $attrStmt = $pdo->prepare("INSERT INTO product_attribute (product_id, stat_key, stat_value) VALUES (?, ?, ?)");
        foreach ($gameStats as $key => $val) {
            if (!empty($key) && !empty($val)) {
                $attrStmt->execute([$productId, (string)$key, (string)$val]);
            }
        }
    }

    // Format output product matching Frontend
    $newProduct = [
        "id" => (string)$productId,
        "title" => $title,
        "category" => $categoryName,
        "priceUsd" => $priceUsd,
        "priceKhr" => $priceKhr,
        "level" => $level,
        "robux" => $robux,
        "badge" => $badge,
        "image" => $coverImage,
        "gallery" => $gallery,
        "description" => $description,
        "emailStatus" => $emailStatus,
        "status" => $status,
        "gameStats" => $gameStats,
        "credentials" => [
            "username" => $username,
            "password" => $password,
            "linkedEmail" => $emailStatus,
            "registeredDate" => substr($createdAt, 0, 10),
            "note" => "សូមប្តូរលេខសម្ងាត់ភ្លាមៗ"
        ]
    ];

    echo json_encode([
        "success" => true,
        "message" => "បានបង្កើត និងដាក់លក់គណនីជោគជ័យ!",
        "product" => $newProduct
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Database error: " . $e->getMessage()
    ]);
}
