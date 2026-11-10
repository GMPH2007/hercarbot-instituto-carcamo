<?php
/**
 * API PHP / MySQL: Autenticación y Registro de Usuarios
 * IESTP Hermanos Cárcamo - Paita
 */
require_once __DIR__ . '/db_connect.php';

$action = $_POST['action'] ?? $_GET['action'] ?? '';

// ----------------------------------------------------------------------------
// LOGIN CON HASH SHA-256
// ----------------------------------------------------------------------------
if ($action === 'login') {
    $identifier = trim($_POST['identifier'] ?? '');
    $password = $_POST['password'] ?? '';

    if (empty($identifier) || empty($password)) {
        echo json_encode(['success' => false, 'message' => 'Ingresa tu usuario y contraseña.']);
        exit;
    }

    $hash = hash('sha256', $password);

    $stmt = $pdo->prepare("SELECT * FROM users WHERE (LOWER(email) = LOWER(?) OR LOWER(username) = LOWER(?)) AND password_hash = ? LIMIT 1");
    $stmt->execute([$identifier, $identifier, $hash]);
    $user = $stmt->fetch();

    if (!$user) {
        // Registrar intento fallido
        $pdo->prepare("INSERT INTO audit_logs (user_email, action, details, ip_origin, created_at) VALUES (?, 'LOGIN_FAILED', 'Intento de acceso fallido', ?, NOW())")
            ->execute([$identifier, $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1']);
        echo json_encode(['success' => false, 'message' => 'Credenciales incorrectas.']);
        exit;
    }

    if ($user['status'] !== 'ACTIVO') {
        echo json_encode(['success' => false, 'message' => 'Tu cuenta se encuentra inactiva. Contacta a Dirección.']);
        exit;
    }

    // Actualizar último login
    $pdo->prepare("UPDATE users SET last_login = NOW() WHERE id = ?")->execute([$user['id']]);

    // Registrar login exitoso
    $pdo->prepare("INSERT INTO audit_logs (user_email, action, details, ip_origin, created_at) VALUES (?, 'LOGIN_SUCCESS', 'Inicio de sesión exitoso', ?, NOW())")
        ->execute([$user['email'], $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1']);

    echo json_encode([
        'success' => true,
        'message' => 'Inicio de sesión exitoso.',
        'user' => [
            'id' => $user['id'],
            'username' => $user['username'],
            'email' => $user['email'],
            'full_name' => $user['full_name'],
            'role' => $user['role'],
            'dni' => $user['dni'],
            'career' => $user['career'],
            'avatar' => $user['avatar']
        ]
    ]);
    exit;
}

// ----------------------------------------------------------------------------
// REGISTRO DE NUEVO DOCENTE / USUARIO
// ----------------------------------------------------------------------------
if ($action === 'register') {
    $fullName = trim($_POST['full_name'] ?? '');
    $dni = trim($_POST['dni'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $username = trim($_POST['username'] ?? '');
    $career = trim($_POST['career'] ?? '');
    $role = trim($_POST['role'] ?? 'Docente Evaluador');
    $password = $_POST['password'] ?? '';
    $avatar = $_POST['avatar'] ?? null;
    $masterKey = strtoupper(trim($_POST['master_key'] ?? ''));

    if (empty($fullName) || empty($email) || empty($password) || empty($dni)) {
        echo json_encode(['success' => false, 'message' => 'Completa todos los campos obligatorios.']);
        exit;
    }

    // Validar clave maestra
    $validKeys = ['HERCAR2026', 'HERCAR-SEC-2026', 'ADMIN2026', 'CARCAMO2026'];
    if (!in_array($masterKey, $validKeys, true)) {
        echo json_encode(['success' => false, 'message' => 'Clave Maestra Institucional inválida (Usa HERCAR2026).']);
        exit;
    }

    // Validar duplicados
    $chk = $pdo->prepare("SELECT id FROM users WHERE LOWER(email) = LOWER(?) OR LOWER(username) = LOWER(?) LIMIT 1");
    $chk->execute([$email, $username]);
    if ($chk->fetch()) {
        echo json_encode(['success' => false, 'message' => 'El correo o usuario ya se encuentra registrado.']);
        exit;
    }

    $hash = hash('sha256', $password);
    if (empty($avatar)) {
        $avatar = "https://ui-avatars.com/api/?name=" . urlencode($fullName) . "&background=0284c7&color=ffffff&bold=true";
    }

    $ins = $pdo->prepare("INSERT INTO users (username, email, password_hash, password_plain, avatar, full_name, role, dni, career, status, created_at, last_login) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'ACTIVO', NOW(), NOW())");
    $ins->execute([$username, $email, $hash, $password, $avatar, $fullName, $role, $dni, $career]);

    $pdo->prepare("INSERT INTO audit_logs (user_email, action, details, ip_origin, created_at) VALUES (?, 'USER_REGISTERED', ?, ?, NOW())")
        ->execute([$email, "Nuevo docente registrado: {$fullName} [{$role}]", $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1']);

    echo json_encode([
        'success' => true,
        'message' => 'Docente registrado exitosamente en MySQL.'
    ]);
    exit;
}

// ----------------------------------------------------------------------------
// LISTAR USUARIOS (ADMINISTRADOR)
// ----------------------------------------------------------------------------
if ($action === 'get_users') {
    $stmt = $pdo->query("SELECT id, username, email, full_name, role, dni, career, status, avatar, password_plain, created_at, last_login FROM users ORDER BY id ASC");
    $users = $stmt->fetchAll();
    echo json_encode(['success' => true, 'users' => $users]);
    exit;
}

echo json_encode(['success' => false, 'message' => 'Acción no reconocida.']);
