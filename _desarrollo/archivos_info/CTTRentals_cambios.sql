TRUNCATE TABLE `ctt_accessories`;
INSERT INTO `ctt_accessories` (`acr_id`, `acr_parent`, `acr_status`, `prd_id`) VALUES
(1, 19, '1', 15),
(2, 20, '1', 15),
(3, 21, '1', 15),
(4, 19, '1', 16),
(5, 20, '1', 16),
(6, 21, '1', 16),
(7, 19, '1', 17),
(8, 20, '1', 17),
(9, 21, '1', 17),
(10, 19, '1', 18),
(11, 20, '1', 18),
(12, 21, '1', 18);

TRUNCATE TABLE `ctt_categories`;
INSERT INTO `ctt_categories` (`cat_id`, `cat_name`, `cat_status`) VALUES
(1, 'ACCESORIOS DE CÁMARA', '1'),
(2, 'CÁMARAS', '1'),
(3, 'DOLLIES', '1'),
(4, 'EXPENDABLES', '1'),
(5, 'FILTROS DE CÁMARA 4x4\" ', '1'),
(6, 'FILTROS DE CÁMARA 6.6 x 6.6\" ', '1'),
(7, 'OTROS FILTROS', '1'),
(8, 'ILUMINACIÓN', '1'),
(9, 'JIBS Y GRUAS', '1'),
(10, 'ÓPTICA', '1'),
(11, 'UNIDADES MOVILES Y TRANSPORTACION', '1'),
(12, 'PLANTAS GENERADORAS', '1'),
(13, 'TEXTILES', '1'),
(14, 'TRAMOYA', '1'),
(15, 'COMBUSTIBLES Y HORAS EXTRAS', '1');

TRUNCATE TABLE `ctt_employees`;
INSERT INTO `ctt_employees` (`emp_id`, `emp_number`, `emp_fullname`, `emp_area`, `emp_report_to`, `emp_status`, `pos_id`) VALUES
(1, '10000', 'Super Usuario', NULL, NULL, '1', 1);

TRUNCATE TABLE `ctt_menu`;
INSERT INTO `ctt_menu` (`mnu_id`, `mnu_parent`, `mnu_item`, `mnu_description`, `mod_id`) VALUES
(1, 0, 'Inventarios', 'Seccion de inventarios', 1),
(2, 0, 'Programación', 'Seccion de programaciones', 2),
(3, 1, 'Almacenes', 'Seccion de almacenes', 3),
(4, 1, 'Categorias', 'Seccion de categorias', 4),
(5, 0, 'Administración', 'Seccion de administración', 5),
(6, 5, 'Usuarios', 'Seccion de usuarios', 6),
(7, 3, 'Movimiento entre almacenes', 'Sección de movimientos entre almacenes', 7),
(8, 3, 'Listado de almacenes', 'Sección de edición de almacenes', 8),
(9, 4, 'Listado de categorias', 'Sección de edición de categorias', 9),
(10, 4, 'Listado de productos', 'Sección de edición de productos', 10);

TRUNCATE TABLE `ctt_modules`;
INSERT INTO `ctt_modules` (`mod_id`, `mod_code`, `mod_name`, `mod_description`, `mod_item`) VALUES
(1, 'invt', 'Inventarios', 'Modulo que controla los inventarios', '#'),
(2, 'prog', 'Programación', 'Modulo de programación', '#'),
(3, 'alma', 'Almacenes', 'Modulo de almacenes', '#'),
(4, 'categ', 'Categorias', 'Modulo de categorias', 'Categories'),
(5, 'admin', 'Administracion', 'Modulo de administración', '#'),
(6, 'users', 'Usuarios', 'Modulo de usuarios', 'Usuarios'),
(7, 'mvalm', 'Movimiento de almacenes', 'Modulo de movimiento entre almacenes', 'MoveStores'),
(8, 'mvalm', 'Lista de almacenes', 'Modulo de edición de almacenes', 'Almacenes'),
(9, 'lscat', 'Lista de categorias', 'Modúlo de edicion de categorias', 'Categorias'),
(10, 'prods', 'Lista de productos', 'Modúlo de edicion de productos', 'Productos');

TRUNCATE TABLE `ctt_products`;
INSERT INTO `ctt_products` (`prd_id`, `prd_sku`, `prd_name`, `prd_english_name`, `prd_model`, `prd_serial_number`, `prd_cost`, `prd_price`, `prd_coin_type`, `prd_date_registry`, `prd_date_down`, `prd_visibility`, `prd_comments`, `prd_status`, `sbc_id`, `sup_id`, `srv_id`) VALUES
(1, '', 'PHANTOM FLEX 2K/4K', 'PHANTOM FLEX 2K / 4K', '', '', '0.00', '42000.00', 'pesos', '2020-02-25 00:00:00', '0000-00-00 00:00:00', '1', '', '1', 2, 0, 1),
(2, '', 'ARRI ALEXA XT PLUS 4:3', 'ARRI ALEXA XT PLUS 4: 3', '', '8901', '0.00', '32000.00', 'pesos', '2020-03-10 00:00:00', '0000-00-00 00:00:00', '1', '', '1', 2, 0, 1),
(3, '', 'ARRI ALEXA XR MODULE', 'ARRI ALEXA XR MODULE', '', '2519', '0.00', '20000.00', 'pesos', '2020-02-15 00:00:00', '0000-00-00 00:00:00', '1', '', '1', 2, 0, 1),
(4, '', 'ARRI ALEXA THE ORIGINAL (EV)', 'ARRI ALEXA THE ORIGINAL (EV)', '', '3076', '0.00', '16000.00', 'pesos', '2020-10-01 00:00:00', '0000-00-00 00:00:00', '1', '', '1', 2, 0, 1),
(5, '', 'ARRI ALEXA PLUS 16:9', 'ARRI ALEXA PLUS 16: 9', '', '4007', '0.00', '22000.00', 'pesos', '2020-06-29 00:00:00', '0000-00-00 00:00:00', '1', '', '1', 2, 0, 1),
(6, '', 'ARRI ALEXA STUDIO', 'ARRI ALEXA STUDIO', '', '6057', '0.00', '23000.00', 'pesos', '2020-03-01 00:00:00', '0000-00-00 00:00:00', '1', '', '1', 2, 0, 1),
(7, '', 'ARRI ALEXA M', 'ARRI ALEXA M', '', '', '0.00', '24000.00', 'pesos', '2020-08-02 00:00:00', '0000-00-00 00:00:00', '1', '', '1', 2, 0, 1),
(8, '', 'ARRI ALEXA MINI 16:9/4:3/ ARRI RAW/ OPEN GATE       ', 'ARRI ALEXA MINI 16:9/4:3/ ARRI RAW/ OPEN GATE       ', '', '22377', '0.00', '33000.00', 'pesos', '2020-08-02 00:00:00', '0000-00-00 00:00:00', '1', '', '1', 2, 0, 1),
(9, '', 'ARRI ALEXA MINI 16:9/4:3/ ARRI RAW/ OPEN GATE       ', 'ARRI ALEXA MINI 16:9/4:3/ ARRI RAW/ OPEN GATE       ', '', '21447', '0.00', '33000.00', 'pesos', '2020-08-02 00:00:00', '0000-00-00 00:00:00', '1', '', '1', 2, 0, 1),
(10, '', 'ARRI ALEXA MINI 16:9/4:3/ ARRI RAW/ OPEN GATE       ', 'ARRI ALEXA MINI 16:9/4:3/ ARRI RAW/ OPEN GATE       ', '', '20883', '0.00', '33000.00', 'pesos', '2020-08-02 00:00:00', '0000-00-00 00:00:00', '1', '', '1', 2, 0, 1),
(11, '', 'ARRI ALEXA MINI 16:9/4:3/ ARRI RAW/ OPEN GATE ', 'ARRI ALEXA MINI 16:9/4:3/ ARRI RAW/ OPEN GATE ', '', '20490', '0.00', '33000.00', 'pesos', '2020-08-02 00:00:00', '0000-00-00 00:00:00', '1', '', '1', 2, 0, 1),
(12, '', 'ARRI ALEXA MINI 16:9/4:3/ ARRI RAW/ OPEN GATE ', 'ARRI ALEXA MINI 16:9/4:3/ ARRI RAW/ OPEN GATE ', '', '24217', '0.00', '33000.00', 'pesos', '2020-08-02 00:00:00', '0000-00-00 00:00:00', '1', '', '1', 2, 0, 1),
(13, '', 'ARRI ALEXA MINI 16:9/4:3/ ARRI RAW/ OPEN GATE ', 'ARRI ALEXA MINI 16:9/4:3/ ARRI RAW/ OPEN GATE ', '', '25314', '0.00', '33000.00', 'pesos', '2020-08-02 00:00:00', '0000-00-00 00:00:00', '1', '', '1', 2, 0, 1),
(14, '', 'ARRI ALEXA MINI 16:9/4:3/ ARRI RAW/ OPEN GATE ', 'ARRI ALEXA MINI 16:9/4:3/ ARRI RAW/ OPEN GATE ', '', '22556', '0.00', '33000.00', 'pesos', '2020-08-02 00:00:00', '0000-00-00 00:00:00', '1', '', '1', 2, 0, 1),
(15, '', '575 W HMI REFLECTOR PAR LITE', '575 W HMI REFLECTOR PAR LITE', '', '1574', '0.00', '575.00', 'pesos', '2020-02-25 00:00:00', '0000-00-00 00:00:00', '1', '', '1', 8, 0, 1),
(16, '', '575 W HMI REFLECTOR PAR LITE', '575 W HMI REFLECTOR PAR LITE', '', '946', '0.00', '575.00', 'pesos', '2020-02-25 00:00:00', '0000-00-00 00:00:00', '1', '', '1', 8, 0, 1),
(17, '', '575 W HMI REFLECTOR PAR LITE', '575 W HMI REFLECTOR PAR LITE', '', '943', '0.00', '575.00', 'pesos', '2020-02-25 00:00:00', '0000-00-00 00:00:00', '1', '', '1', 8, 0, 1),
(18, '', '575 W HMI REFLECTOR PAR LITE', '575 W HMI REFLECTOR PAR LITE', '', '1324', '0.00', '575.00', 'pesos', '2020-02-25 00:00:00', '0000-00-00 00:00:00', '1', '', '1', 8, 0, 1),
(19, '', 'CABLE', 'CABLE', '', 'SN', '0.00', '1.00', 'pesos', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0', '', '1', 51, 0, 1),
(20, '', 'GASAS', 'GASES', '', 'SN', '0.00', '1.00', 'pesos', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0', '', '1', 51, 0, 1),
(21, '', 'ASPAS', 'BLADES', '', 'SN', '0.00', '1.00', 'pesos', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0', '', '1', 51, 0, 1),
(22, '', 'BALASTRA', 'BALLAST', '', 'SN', '0.00', '1.00', 'pesos', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0', '', '1', 51, 0, 1),
(23, '', 'LENTILLAS', 'CONTACT LENSES', '', 'SN', '0.00', '1.00', 'pesos', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0', '', '1', 51, 0, 1),
(24, '', 'BEAMER', 'BEAMER', '', 'SN', '0.00', '1.00', 'pesos', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0', '', '1', 51, 0, 1),
(25, '', 'ARO PARA CHIMERA', 'RING FOR CHIMERA', '', 'SN', '0.00', '1.00', 'pesos', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0', '', '1', 51, 0, 1);

TRUNCATE TABLE `ctt_profiles`;
INSERT INTO `ctt_profiles` (`prf_id`, `prf_code`, `prf_name`, `prf_description`, `prf_mod_start`) VALUES
(1, 'supuser', 'Super usuario', 'Control total sobre toda la aplicación', 'start');

TRUNCATE TABLE `ctt_stores`;
INSERT INTO `ctt_stores` (`str_id`, `str_name`, `str_status`, `str_type`) VALUES
(1, 'CAMARA', '1', 'estaticos'),
(2, 'SUBARRENDO CAMARA.', '1', 'estaticos'),
(3, 'ILUMINACION.', '1', 'estaticos'),
(4, 'SUBARRENDO ILUMINACION.', '1', 'estaticos'),
(5, 'EXPENDABLES.', '1', 'estaticos'),
(6, 'MAXIMOVIL.', '1', 'moviles'),
(7, 'MOVIL C.', '1', 'moviles'),
(8, 'MOVIL D.', '1', 'moviles'),
(9, 'MOVIL E.', '1', 'moviles'),
(10, 'MINIMAX A.', '0', 'moviles'),
(11, 'MINIMAX B.', '1', 'moviles'),
(12, 'MINIMAX C.', '1', 'moviles'),
(13, 'MINIMAX D.', '1', 'moviles'),
(14, 'MINIMOVIL A.', '1', 'moviles'),
(15, 'MINIMOVIL B.', '1', 'moviles'),
(16, 'MINIMOVIL C.', '1', 'moviles'),
(17, 'MINIMOVIL D.', '1', 'moviles'),
(18, 'VAN DAY LIGHT 1.', '1', 'moviles'),
(19, 'VAN DAY LIGHT 2.', '1', 'moviles'),
(20, 'MICROMOVIL.', '1', 'moviles'),
(21, 'PLANTA A.', '1', 'moviles'),
(22, 'PLANTA B.', '1', 'moviles'),
(23, 'PLANTA C.', '1', 'moviles'),
(24, 'PLANTA E.', '1', 'moviles'),
(25, 'PLANTA F.', '1', 'moviles'),
(26, 'PLANTA G.', '1', 'moviles'),
(27, 'PLANTA H.', '1', 'moviles'),
(28, 'PLANTA REMOLQUE A.', '1', 'moviles'),
(29, 'PLANTA REMOLQUE B.', '1', 'moviles'),
(30, 'vehiculos', '0', 'moviles'),
(31, '', '1', ''),
(32, '', '1', '');

TRUNCATE TABLE `ctt_stores_exchange`;
INSERT INTO `ctt_stores_exchange` (`exc_id`, `exc_date`, `exc_guid`, `exc_sku_product`, `exc_product_name`, `exc_quantity`, `exc_serie_product`, `exc_store`, `exc_comments`, `exc_proyect`, `exc_employee_name`, `ext_code`, `ext_id`) VALUES
(1, '2021-03-09 07:08:20', '8a2b9dfc-445e-479b-95a8-5fbf1e2d1e74', '', 'ARRI ALEXA XR MODULE', 1, '2519', 'CAMARA', '', '', 'Super Usuario', 'STA', 2),
(2, '2021-03-09 07:08:21', '8a2b9dfc-445e-479b-95a8-5fbf1e2d1e74', '', 'ARRI ALEXA XR MODULE', 1, '2519', 'ILUMINACION.', '', '', 'Super Usuario', 'ETA', 1);

TRUNCATE TABLE `ctt_stores_products`;
INSERT INTO `ctt_stores_products` (`stp_id`, `stp_quantity`, `str_id`, `prd_id`) VALUES
(1, 0, 1, 1),
(2, 0, 1, 2),
(3, 0, 1, 3),
(4, 1, 1, 4),
(5, 1, 1, 5),
(6, 1, 1, 6),
(7, 1, 1, 7),
(8, 1, 1, 8),
(9, 1, 1, 9),
(10, 1, 1, 10),
(11, 1, 1, 11),
(12, 1, 1, 12),
(13, 1, 1, 13),
(14, 1, 1, 14),
(18, 1, 3, 1),
(19, 1, 3, 3);

TRUNCATE TABLE `ctt_type_exchange`;
INSERT INTO `ctt_type_exchange` (`ext_id`, `ext_code`, `ext_type`, `ext_description`, `ext_link`) VALUES
(1, 'ETA', 'E', 'ENTRADA POR TRASPASO DE ALMACEN', 2),
(2, 'STA', 'S', 'PARA TRASLADO A OTRO ALMACEN', 1),
(3, 'SCI', 'S', 'POR CONSUMO INTERNO', NULL);

TRUNCATE TABLE `ctt_users`;
INSERT INTO `ctt_users` (`usr_id`, `usr_username`, `usr_password`, `usr_dt_registry`, `usr_dt_last_access`, `usr_dt_change_pwd`, `usr_status`, `prf_id`, `emp_id`) VALUES
(1, 'admin', '$2y$10$cCwBkjHX9U/FkZYO0m7KVOAvEiGOE7J3/nZy0/zcJSYrq5jl98ac6', '2021-02-12 12:14:09', '2021-02-12 12:14:09', '2021-02-12 10:28:19', '1', 1, 1);

TRUNCATE TABLE `ctt_users_modules`;
INSERT INTO `ctt_users_modules` (`urm_id`, `usr_id`, `mod_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 1, 4),
(5, 1, 5),
(6, 1, 6),
(7, 1, 7),
(8, 1, 8),
(9, 1, 9),
(10, 1, 10);