<?php
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/../config/connect-db.php';

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

$productId = $data['id'] ?? $_GET['id'] ?? null;

if (!$productId) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Product ID is required"]);
    exit();
}

try {
    $stmt = $pdo->prepare("DELETE FROM products WHERE id = ?");
    $stmt->execute([(int)$productId]);

    if ($stmt->rowCount() > 0) {
        echo json_encode([
            "success" => true,
            "message" => "បានលុបគណនីចេញពីប្រព័ន្ធដោយជោគជ័យ!"
        ]);
    } else {
        http_response_code(404);
        echo json_encode([
            "success" => false,
            "message" => "រកមិនឃើញគណនីដែលត្រូវលុបទេ"
        ]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Database error: " . $e->getMessage()
    ]);
}
