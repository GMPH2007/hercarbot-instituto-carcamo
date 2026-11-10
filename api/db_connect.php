<?php
/**
 * Conexión a Base de Datos MySQL / MariaDB (XAMPP / Producción)
 * IESTP Hermanos Cárcamo - Paita
 */
header('Content-Type: application/json; charset=utf-8');

$host = '127.0.0.1';
$dbname = 'hercarbot_db';
$username = 'root';
$password = ''; // En XAMPP la contraseña por defecto es vacía

try {
    $pdo = new PDO("mysql:host={$host};dbname={$dbname};charset=utf8mb4", $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error de conexión a la base de datos MySQL (XAMPP): ' . $e->getMessage()
    ]);
    exit;
}
