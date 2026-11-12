<?php
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/../config/connect-db.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'GET') {
    $buyerId = $_GET['buyerId'] ?? null;
    $invoiceId = $_GET['invoiceId'] ?? null;

    try {
        if ($invoiceId) {
            $stmt = $pdo->prepare("SELECT * FROM purchases WHERE UPPER(invoice_id) = UPPER(?)");
            $stmt->execute([trim($invoiceId)]);
            $order = $stmt->fetch();
            if ($order) {
                echo json_encode([
                    "success" => true,
                    "data" => [
                        "id" => $order['product_id'],
                        "invoiceId" => $order['invoice_id'],
                        "title" => $order['title'],
                        "category" => $order['category'],
                        "priceUsd" => (float)$order['price_usd'],
                        "priceKhr" => (float)$order['price_khr'],
                        "level" => $order['acc_lvl'],
                        "emailStatus" => $order['email_status'],
                        "purchaseDate" => $order['purchase_date'],
                        "credentials" => [
                            "username" => $order['username'],
                            "password" => $order['password']
                        ]
                    ]
                ]);
            } else {
                http_response_code(404);
                echo json_encode(["success" => false, "message" => "Invoice not found"]);
            }
            exit();
        }

        if ($buyerId) {
            $stmt = $pdo->prepare("SELECT * FROM purchases WHERE buyer_session_id = ? ORDER BY id DESC");
            $stmt->execute([$buyerId]);
            $rows = $stmt->fetchAll();

            $list = [];
            foreach ($rows as $r) {
                $list[] = [
                    "id" => $r['product_id'],
                    "invoiceId" => $r['invoice_id'],
                    "title" => $r['title'],
                    "category" => $r['category'],
                    "priceUsd" => (float)$r['price_usd'],
                    "priceKhr" => (float)$r['price_khr'],
                    "level" => $r['acc_lvl'],
                    "emailStatus" => $r['email_status'],
                    "purchaseDate" => $r['purchase_date'],
                    "credentials" => [
                        "username" => $r['username'],
                        "password" => $r['password']
                    ]
                ];
            }

            echo json_encode($list);
            exit();
        }

        // Return empty list if no buyerId
        echo json_encode([]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => $e->getMessage()]);
    }
} elseif ($method === 'POST') {
    $rawInput = file_get_contents('php://input');
    $data = json_decode($rawInput, true);

    if (!$data) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Invalid JSON payload"]);
        exit();
    }

    $invoiceId = $data['invoiceId'] ?? ('RBX-' . rand(100000, 999999));
    $buyerSessionId = $data['buyerSessionId'] ?? 'guest';
    $productId = (int)($data['id'] ?? 0);
    $title = $data['title'] ?? 'Roblox Account';
    $category = $data['category'] ?? 'Blox Fruits';
    $priceUsd = (float)($data['priceUsd'] ?? 0);
    $priceKhr = (float)($data['priceKhr'] ?? round($priceUsd * 4100));
    $level = $data['level'] ?? '';
    $emailStatus = $data['emailStatus'] ?? '';
    $purchaseDate = $data['purchaseDate'] ?? date('Y-m-d H:i:s');

    $creds = $data['credentials'] ?? [];
    $username = $creds['username'] ?? ($data['username'] ?? '');
    $password = $creds['password'] ?? ($data['password'] ?? '');

    try {
        $stmt = $pdo->prepare("INSERT INTO purchases (
            invoice_id, buyer_session_id, product_id, title, category,
            price_usd, price_khr, acc_lvl, username, password, email_status, purchase_date
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT (invoice_id) DO NOTHING
        RETURNING id");

        $stmt->execute([
            $invoiceId, $buyerSessionId, $productId, $title, $category,
            $priceUsd, $priceKhr, $level, $username, $password, $emailStatus, $purchaseDate
        ]);

        // Also mark product as sold in products table
        if ($productId > 0) {
            $pdo->prepare("UPDATE products SET status = 'sold' WHERE id = ?")->execute([$productId]);
        }

        echo json_encode([
            "success" => true,
            "message" => "Order recorded successfully",
            "invoiceId" => $invoiceId,
            "data" => $data
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
    }
}
