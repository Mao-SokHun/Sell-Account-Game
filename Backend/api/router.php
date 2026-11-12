<?php
// Simple Router for PHP Built-in Server or Apache
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Normalize URI
$uri = preg_replace('#^/Backend/api#', '', $uri);
$uri = preg_replace('#^/api#', '', $uri);
$method = $_SERVER['REQUEST_METHOD'];

if ($uri === '' || $uri === '/' || $uri === '/index.php') {
    require __DIR__ . '/cors.php';
    echo json_encode(["status" => "online", "message" => "MIRA STORE Backend API (Neon PostgreSQL)"]);
    exit();
}

if (preg_match('#^/products/([0-9]+)$#', $uri, $matches)) {
    $_GET['id'] = $matches[1];
    if ($method === 'DELETE') {
        require __DIR__ . '/delete_product.php';
    } elseif ($method === 'PUT' || $method === 'PATCH') {
        require __DIR__ . '/update_product.php';
    } else {
        require __DIR__ . '/get_product_detail.php';
    }
    exit();
}

if ($uri === '/products' || $uri === '/get_product.php' || $uri === '/get_products.php') {
    if ($method === 'POST') {
        require __DIR__ . '/create_product.php';
    } else {
        require __DIR__ . '/get_product.php';
    }
    exit();
}

if ($uri === '/purchases' || $uri === '/purchases.php') {
    require __DIR__ . '/purchases.php';
    exit();
}

if ($uri === '/categories' || $uri === '/get_categories.php') {
    require __DIR__ . '/get_categories.php';
    exit();
}

// Fallback to static or script if exists
$file = __DIR__ . $uri;
if (file_exists($file) && !is_dir($file)) {
    return false; // let built-in server serve it
}

// 404
require __DIR__ . '/cors.php';
http_response_code(404);
echo json_encode(["success" => false, "message" => "Route not found: " . $uri]);
