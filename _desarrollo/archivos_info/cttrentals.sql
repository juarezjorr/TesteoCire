-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-02-2021 a las 21:59:48
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 7.4.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

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
--
-- Volcado de datos para la tabla `ctt_menu`
--

INSERT INTO `ctt_menu` (`mnu_id`, `mnu_parent`, `mnu_item`, `mnu_description`, `mod_id`) VALUES
(1, 0, 'Inventarios', 'Seccion de inventarios', 1),
(2, 0, 'Cotizaciones', 'Seccion de cotizaciones', 2);

--
-- Truncar tablas antes de insertar `ctt_modules`
--

TRUNCATE TABLE `ctt_modules`;
--
-- Volcado de datos para la tabla `ctt_modules`
--

INSERT INTO `ctt_modules` (`mod_id`, `mod_code`, `mod_name`, `mod_description`, `mod_item`) VALUES
(1, 'invt', 'Inventarios', 'Modulo que controla los inventarios', 'Inventory'),
(2, 'cotz', 'Cotizaciones', 'Modulo de cotizaciones', 'MarketRates');

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
(1, 'supuser', 'Super usuario', 'Control total sobre toda la aplicación', 'start');

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
--
-- Volcado de datos para la tabla `ctt_user_module`
--

INSERT INTO `ctt_user_module` (`urm_id`, `usr_id`, `mod_id`) VALUES
(1, 1, 1),
(2, 1, 2);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
