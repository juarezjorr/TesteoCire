-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-02-2021 a las 22:41:03
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Base de datos: `cttrentals`
--

--
-- Truncar tablas antes de insertar `ctt_employees`
--

TRUNCATE TABLE `ctt_employees`;
--
-- Volcado de datos para la tabla `ctt_employees`
--

INSERT INTO `ctt_employees` (`emp_id`, `emp_number`, `emp_fullname`, `emp_area`, `emp_status`, `pos_id`) VALUES
(1, '10000', 'Super Usuario', NULL, '1', 1);

--
-- Truncar tablas antes de insertar `ctt_menu`
--

TRUNCATE TABLE `ctt_menu`;
INSERT INTO `ctt_menu` (`mnu_id`, `mnu_parent`, `mnu_item`, `mnu_description`, `mod_id`) VALUES
(1, 0, 'Inventarios', 'Seccion de inventarios', 1),
(2, 0, 'Programación', 'Seccion de programaciones', 2),
(3, 1, 'Almacenes', 'Seccion de almacenes', 3),
(4, 1, 'Categorias', 'Seccion de categorias', 4),
(5, 0, 'Administración','Seccion de administración',5),
(6, 5, 'Usuarios','Seccion de usuarios', 6),
(7, 3, 'Movimiento entre almacenes','Sección de movimientos entre almacenes',7),
(8, 3, 'Listado de almacenes','Sección de edición de almacenes',8),


--
-- Truncar tablas antes de insertar `ctt_modules`
--

TRUNCATE TABLE `ctt_modules`;
INSERT INTO `ctt_modules` (`mod_id`, `mod_code`, `mod_name`, `mod_description`, `mod_item`) VALUES
(1, 'invt', 'Inventarios', 'Modulo que controla los inventarios', '#'),
(2, 'prog', 'Programación', 'Modulo de programación', '#'),
(3, 'alma', 'Almacenes', 'Modulo de almacenes', '#'),
(4, 'categ', 'Categorias', 'Modulo de categorias', 'Categories'),
(5, 'admin', 'Administracion', 'Modulo de administración', '#'),
(6, 'users', 'Usuarios', 'Modulo de usuarios','Usuarios'),
(7, 'mvalm', 'Movimiento de almacenes','Modulo de movimiento entre almacenes','MoveStores'),
(8, 'mvalm', 'Lista de almacenes','Modulo de edición de almacenes','Almacenes');

--
-- Truncar tablas antes de insertar `ctt_post`
--

TRUNCATE TABLE `ctt_post`;
--
-- Truncar tablas antes de insertar `ctt_profiles`
--

TRUNCATE TABLE `ctt_profiles`;
--
-- Volcado de datos para la tabla `ctt_profiles`
--

INSERT INTO `ctt_profiles` (`prf_id`, `prf_code`, `prf_name`, `prf_description`, `prf_mod_start`) VALUES
(1, 'supuser', 'Super usuario', 'Control total sobre toda la aplicación', 'Start');

--
-- Truncar tablas antes de insertar `ctt_profile_module`
--

TRUNCATE TABLE `ctt_profile_module`;
--
-- Truncar tablas antes de insertar `ctt_users`
--

TRUNCATE TABLE `ctt_users`;
--
-- Volcado de datos para la tabla `ctt_users`
--

INSERT INTO `ctt_users` (`usr_id`, `usr_username`, `usr_password`, `usr_dt_registry`, `usr_dt_last_access`, `usr_dt_change_pwd`, `prf_id`, `emp_id`) VALUES
(1, 'admin', '$2y$10$cCwBkjHX9U/FkZYO0m7KVOAvEiGOE7J3/nZy0/zcJSYrq5jl98ac6', '2021-02-12 12:14:09', '2021-02-12 12:14:09', '2021-02-12 10:28:19', 1, 1);

--
-- Truncar tablas antes de insertar `ctt_user_module`
--

TRUNCATE TABLE `ctt_user_module`;
INSERT INTO `ctt_user_module` (`urm_id`, `usr_id`, `mod_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 1, 4),
(5, 1, 5),
(6, 1, 6),
(7, 1, 7);
COMMIT;