-- ============================================================================
-- BASE DE DATOS OFICIAL: hercarbot_db
-- Sistema de Asistencia Virtual & Panel Administrativo HercarBot
-- Instituto de Educación Superior Tecnológico Público "Hermanos Cárcamo" - Paita
-- Compatible con: XAMPP, WampServer, phpMyAdmin, MySQL 5.7+ / 8.0+ y MariaDB
-- ============================================================================

CREATE DATABASE IF NOT EXISTS `hercarbot_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `hercarbot_db`;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "-05:00";

-- ----------------------------------------------------------------------------
-- 1. Tabla: `users` (Docentes, Directivos y Administradores Institucionales)
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL UNIQUE,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL UNIQUE,
  `password_hash` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Hash SHA-256 de seguridad',
  `password_plain` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Contraseña recuperable para soporte admin',
  `avatar` mediumtext COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Foto de perfil en URL o Base64',
  `full_name` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dni` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Celular o WhatsApp de contacto',
  `career` varchar(80) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT 'ACTIVO',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_login` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Volcado de Cuentas Oficiales Iniciales en `users`
-- ----------------------------------------------------------------------------
INSERT INTO `users` (`id`, `username`, `email`, `password_hash`, `password_plain`, `avatar`, `full_name`, `role`, `dni`, `phone`, `career`, `status`, `created_at`, `last_login`) VALUES
(1, 'admin', 'admin@ieshercar.edu.pe', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 'admin2026', 'assets/img/logo-hercar.png', 'Ing. Administrador General HercarBot', 'Administrador Institucional', '45892014', '968184783', 'Dirección General y TI', 'ACTIVO', NOW(), NOW()),
(2, 'profesor', 'profesor@ieshercar.edu.pe', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 'profesor2026', 'https://ui-avatars.com/api/?name=Profesor+Carcamo&background=0284c7&color=ffffff&bold=true', 'Profesor Titular IESTP Cárcamo', 'Docente Evaluador', '02849182', '973849102', 'APSTI - Desarrollo de Software', 'ACTIVO', NOW(), NOW());

-- ----------------------------------------------------------------------------
-- 2. Tabla: `password_resets` (Tokens de Recuperación de 6 Dígitos)
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `password_resets`;
CREATE TABLE `password_resets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Código numérico de 6 dígitos',
  `status` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT 'PENDIENTE',
  `expires_at` datetime NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_resets_user` (`user_id`),
  CONSTRAINT `fk_resets_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 3. Tabla: `audit_logs` (Pistas de Auditoría y Trazabilidad)
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `audit_logs`;
CREATE TABLE `audit_logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `action` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `details` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ip_origin` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT '127.0.0.1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `audit_logs` (`user_email`, `action`, `details`, `ip_origin`, `created_at`) VALUES
('SISTEMA', 'INIT_DATABASE', 'Base de datos hercarbot_db inicializada con éxito para XAMPP/MySQL.', '127.0.0.1', NOW());

COMMIT;
