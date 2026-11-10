<?php
/**
 * API PHP / MySQL: Recuperación Meticulosa de Contraseña
 * IESTP Hermanos Cárcamo - Paita
 * 
 * Flujo:
 * 1. action=request_token: Valida correo/usuario, genera código de 6 dígitos con vigencia de 15 minutos en la tabla `password_resets`.
 * 2. action=verify_and_reset: Valida el código, actualiza el hash SHA-256 y la contraseña en la tabla `users`, marca el token como UTILIZADO y guarda log de auditoría.
 */
require_once __DIR__ . '/db_connect.php';

$action = $_POST['action'] ?? $_GET['action'] ?? '';

// ----------------------------------------------------------------------------
// PASO 1: Generar Código de Recuperación de 6 Dígitos
// ----------------------------------------------------------------------------
if ($action === 'request_token') {
    $loginIdentifier = trim($_POST['identifier'] ?? '');
    if (empty($loginIdentifier)) {
        echo json_encode(['success' => false, 'message' => 'Ingresa tu correo institucional o nombre de usuario.']);
        exit;
    }

    // Buscar usuario en MySQL
    $stmt = $pdo->prepare("SELECT id, username, email, full_name, role FROM users WHERE LOWER(email) = LOWER(?) OR LOWER(username) = LOWER(?) LIMIT 1");
    $stmt->execute([$loginIdentifier, $loginIdentifier]);
    $user = $stmt->fetch();

    if (!$user) {
        echo json_encode([
            'success' => false, 
            'message' => 'No se encontró ninguna cuenta registrada con ese correo o usuario en la base de datos.'
        ]);
        exit;
    }

    // Generar código numérico de 6 dígitos aleatorio
    $token = (string)random_int(100000, 999999);
    $expiresAt = date('Y-m-d H:i:s', strtotime('+15 minutes'));

    // Insertar en password_resets
    $ins = $pdo->prepare("INSERT INTO password_resets (user_id, email, token, status, expires_at, created_at) VALUES (?, ?, ?, 'PENDIENTE', ?, NOW())");
    $ins->execute([$user['id'], $user['email'], $token, $expiresAt]);

    // Registrar en audit_logs
    $audit = $pdo->prepare("INSERT INTO audit_logs (user_email, action, details, ip_origin, created_at) VALUES (?, 'PASSWORD_RESET_REQUEST', ?, ?, NOW())");
    $audit->execute([$user['email'], "Token de 6 dígitos generado para {$user['full_name']}", $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1']);

    echo json_encode([
        'success' => true,
        'message' => 'Código de seguridad generado con éxito.',
        'email' => $user['email'],
        'fullName' => $user['full_name'],
        'role' => $user['role'],
        'token' => $token, // Se devuelve para confirmación visual inmediata
        'expires_at' => $expiresAt
    ]);
    exit;
}

// ----------------------------------------------------------------------------
// PASO 2: Validar Código y Actualizar Contraseña en MySQL
// ----------------------------------------------------------------------------
if ($action === 'verify_and_reset') {
    $email = trim($_POST['email'] ?? '');
    $token = trim($_POST['token'] ?? '');
    $newPassword = $_POST['new_password'] ?? '';

    if (empty($email) || empty($token) || empty($newPassword)) {
        echo json_encode(['success' => false, 'message' => 'Completa todos los campos obligatorios.']);
        exit;
    }

    if (strlen($newPassword) < 6) {
        echo json_encode(['success' => false, 'message' => 'La nueva contraseña debe tener al menos 6 caracteres.']);
        exit;
    }

    // Validar token en password_resets
    $stmt = $pdo->prepare("SELECT id, user_id, expires_at FROM password_resets WHERE LOWER(email) = LOWER(?) AND token = ? AND status = 'PENDIENTE' ORDER BY id DESC LIMIT 1");
    $stmt->execute([$email, $token]);
    $resetEntry = $stmt->fetch();

    if (!$resetEntry) {
        echo json_encode(['success' => false, 'message' => 'El código ingresado es inválido o ya fue utilizado.']);
        exit;
    }

    if (strtotime($resetEntry['expires_at']) < time()) {
        $pdo->prepare("UPDATE password_resets SET status = 'EXPIRADO' WHERE id = ?")->execute([$resetEntry['id']]);
        echo json_encode(['success' => false, 'message' => 'El código de seguridad ha expirado. Solicita uno nuevo.']);
        exit;
    }

    // Calcular Hash SHA-256
    $hash = hash('sha256', $newPassword);

    // Actualizar en tabla users
    $upd = $pdo->prepare("UPDATE users SET password_hash = ?, password_plain = ? WHERE id = ?");
    $upd->execute([$hash, $newPassword, $resetEntry['user_id']]);

    // Marcar token como utilizado
    $pdo->prepare("UPDATE password_resets SET status = 'UTILIZADO' WHERE id = ?")->execute([$resetEntry['id']]);

    // Registrar en auditoría
    $audit = $pdo->prepare("INSERT INTO audit_logs (user_email, action, details, ip_origin, created_at) VALUES (?, 'PASSWORD_RESET_SUCCESS', 'Contraseña restablecida exitosamente en MySQL', ?, NOW())");
    $audit->execute([$email, $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1']);

    echo json_encode([
        'success' => true,
        'message' => '¡Contraseña actualizada exitosamente en la base de datos MySQL!'
    ]);
    exit;
}

echo json_encode([
    'success' => false,
    'message' => 'Acción no válida. Se requiere action=request_token o action=verify_and_reset'
]);
