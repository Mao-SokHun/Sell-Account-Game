<?php
/**
 * Database Connection Configuration
 * Supports Neon PostgreSQL (Cloud) and MySQL (Local Fallback)
 */

$dbType = getenv('DB_TYPE') ?: 'pgsql'; // 'pgsql' or 'mysql'

if ($dbType === 'pgsql') {
    // Neon PostgreSQL Cloud Database
    $host = getenv('DB_HOST') ?: "ep-empty-heart-a1ihvbmo-pooler.ap-southeast-1.aws.neon.tech";
    $port = getenv('DB_PORT') ?: 5432;
    $database = getenv('DB_NAME') ?: "neondb";
    $user = getenv('DB_USER') ?: "neondb_owner";
    $password = getenv('DB_PASSWORD') ?: "npg_X9HQ8fGDYKjd";
    $endpoint = getenv('DB_ENDPOINT') ?: "ep-empty-heart-a1ihvbmo";

    $dsn = "pgsql:host=$host;port=$port;dbname=$database;sslmode=require;options='endpoint=$endpoint'";

    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_TIMEOUT => 10
    ];

    try {
        $pdo = new PDO($dsn, $user, $password, $options);
    } catch (PDOException $e) {
        // Fallback or detailed error
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "message" => "PostgreSQL Connection Error: " . $e->getMessage()
        ]);
        exit();
    }
} else {
    // MySQL Local Fallback
    $host = "localhost";
    $user = "root";
    $password = "";
    $database = "mira_store_db";
    $charset = "utf8mb4";

    $dsn = "mysql:host=$host;dbname=$database;charset=$charset";
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ];

    try {
        $pdo = new PDO($dsn, $user, $password, $options);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "message" => "MySQL Connection Error: " . $e->getMessage()
        ]);
        exit();
    }
}
