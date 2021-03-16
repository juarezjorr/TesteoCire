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