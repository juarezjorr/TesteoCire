
DROP TABLE IF EXISTS `ctt_accessories`;
CREATE TABLE `ctt_accessories` (
  `acr_id` int(11) NOT NULL COMMENT 'ID del accesorio',
  `acr_parent` int(11) DEFAULT NULL COMMENT 'ID del producto padre',
  `acr_status` varchar(1) DEFAULT NULL COMMENT 'Estatus del accesorio D-Disponible, N-No disponible',
  `ser_id` int(11) DEFAULT NULL COMMENT 'Id del producto relaciòn ctt_products'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Productos o accesorios dependientes de otros productos';

INSERT INTO `ctt_accessories` (`acr_id`, `acr_parent`, `acr_status`, `ser_id`) VALUES
(1, 0, '1', 1),
(2, 0, '1', 2),
(3, 0, '1', 3),
(4, 0, '1', 4),
(5, 0, '1', 5),
(6, 0, '1', 6),
(7, 0, '1', 7),
(8, 0, '1', 8),
(9, 0, '1', 9),
(10, 0, '1', 10),
(11, 0, '1', 11),
(12, 0, '1', 12),
(13, 0, '1', 13),
(14, 0, '1', 14),
(15, 0, '1', 15),
(16, 0, '1', 16),
(17, 0, '1', 17),
(18, 0, '1', 18),
(19, 15, '1', 19),
(20, 15, '1', 20),
(21, 15, '1', 21),
(22, 15, '1', 22),
(23, 15, '1', 23),
(24, 15, '1', 24),
(25, 15, '1', 25);


DROP TABLE IF EXISTS `ctt_actions`;
CREATE TABLE `ctt_actions` (
  `acc_id` int(11) NOT NULL COMMENT 'ID de la acción',
  `acc_description` varchar(300) NOT NULL COMMENT 'Descripción de la acción realizada por el usuario en un modulo',
  `acc_type` varchar(50) NOT NULL COMMENT 'Tipo de accion',
  `mod_id` int(11) DEFAULT NULL COMMENT 'ID del modulo relacion ctt_module'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Tabla de tipos de acciones realizadas por un usuario dentro del sistema';


DROP TABLE IF EXISTS `ctt_activity_log`;
CREATE TABLE `ctt_activity_log` (
  `log_id` int(11) NOT NULL COMMENT 'ID de la bitácora',
  `log_date` datetime DEFAULT current_timestamp() COMMENT 'Fecha de registro de la actividad',
  `log_event` varchar(100) NOT NULL COMMENT 'Detalle de la acción realizada',
  `emp_number` varchar(50) NOT NULL COMMENT 'Numero del empleado',
  `emp_fullname` varchar(100) NOT NULL COMMENT 'Nombre del empleado',
  `acc_id` int(11) DEFAULT NULL COMMENT 'ID de la accion relacion ctt_actions'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Bitácora de actividades realizadas en el sistema';

DROP TABLE IF EXISTS `ctt_categories`;
CREATE TABLE `ctt_categories` (
  `cat_id` int(11) NOT NULL COMMENT 'ID del catálogo',
  `cat_name` varchar(100) DEFAULT NULL COMMENT 'Nombre del catálogo',
  `cat_status` varchar(1) DEFAULT NULL COMMENT 'Estatus del catálogo 1-Activo, 0-Inactivo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Catálogo.';

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
(15, 'COMBUSTIBLES Y HORAS EXTRAS', '1'),
(16, 'Nuevo items de catálogo', '0');

DROP TABLE IF EXISTS `ctt_documents`;
CREATE TABLE `ctt_documents` (
  `doc_id` int(11) NOT NULL COMMENT 'ID del documento',
  `doc_code` varchar(100) DEFAULT NULL COMMENT 'Código del documento',
  `doc_name` varchar(100) DEFAULT NULL COMMENT 'Nombre del documento',
  `doc_type` varchar(50) DEFAULT NULL COMMENT 'Tipo de docuemnto',
  `doc_size` int(11) DEFAULT NULL COMMENT 'Tamaño del docuemnto',
  `doc_content_type` varchar(100) DEFAULT NULL COMMENT 'Tipo del contenido del documento',
  `doc_document` blob DEFAULT NULL COMMENT 'Contetnido del documento'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Documentos de productos';

DROP TABLE IF EXISTS `ctt_employees`;
CREATE TABLE `ctt_employees` (
  `emp_id` int(11) NOT NULL COMMENT 'ID del empleado',
  `emp_number` varchar(50) NOT NULL COMMENT 'Numero del empleado',
  `emp_fullname` varchar(100) NOT NULL COMMENT 'Nombre del empleado',
  `emp_area` varchar(50) DEFAULT NULL COMMENT 'Area a la que pertenece el empleado',
  `emp_report_to` int(11) DEFAULT NULL COMMENT 'ID del empleado jefe inmediato relacion asi mismo',
  `emp_status` varchar(1) DEFAULT NULL COMMENT 'Estatus del empleado 1-Activo, 0-Inactivo',
  `pos_id` int(11) DEFAULT NULL COMMENT 'ID del puesto relación ctt_post'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Tabla de los empleados de la empresa';

INSERT INTO `ctt_employees` (`emp_id`, `emp_number`, `emp_fullname`, `emp_area`, `emp_report_to`, `emp_status`, `pos_id`) VALUES
(1, '10000', 'Super Usuario', NULL, NULL, '1', 1);


DROP TABLE IF EXISTS `ctt_menu`;
CREATE TABLE `ctt_menu` (
  `mnu_id` int(11) NOT NULL COMMENT 'ID del menu',
  `mnu_parent` int(11) DEFAULT NULL COMMENT 'ID del menu padre',
  `mnu_item` varchar(100) NOT NULL COMMENT 'Elementos del menu',
  `mnu_description` varchar(300) DEFAULT NULL COMMENT 'Descripción del elemento del menu',
  `mod_id` int(11) DEFAULT NULL COMMENT 'ID del modulo relación ctt_module'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Tabla de los elementos que componene el menu susperior';

INSERT INTO `ctt_menu` (`mnu_id`, `mnu_parent`, `mnu_item`, `mnu_description`, `mod_id`) VALUES
(1, 0, 'Inventarios', 'Seccion de inventarios', 1),
(2, 0, 'Programación', 'Seccion de programaciones', 2),
(3, 1, 'Almacenes', 'Seccion de almacenes', 3),
(4, 1, 'Gestión de catálogos', 'Seccion de catálogos', 4),
(5, 0, 'Administración', 'Seccion de administración', 5),
(6, 5, 'Usuarios', 'Seccion de usuarios', 6),
(7, 3, 'Movimiento entre almacenes', 'Sección de movimientos entre almacenes', 7),
(8, 4, 'Almacenes', 'Sección de edición de almacenes', 8),
(9, 4, 'Catálogos', 'Sección de edición de catálogos', 9),
(10, 4, 'Productos', 'Sección de edición de productos', 10),
(11, 3, 'Productos en subarrendo', 'Seccion de productos en subarrendo', 11),
(12, 5, 'Perfil de usuario', 'Seccion de perfil de usuarios', 12),
(13, 4, 'Proveedores', 'Seccion de proveedores', 13),
(14, 5, 'Puestos', 'Seccion de puestos', 14),
(15, 4, 'Documentos', 'Seccion de docuementos de productos', 15),
(16, 4, 'Tipo de Servicios', 'Seccion de tipos de servicio', 16),
(17, 4, 'Subcategorias', 'Seccion de subcategorias', 17);

DROP TABLE IF EXISTS `ctt_modules`;
CREATE TABLE `ctt_modules` (
  `mod_id` int(11) NOT NULL COMMENT 'ID del módulo',
  `mod_code` varchar(50) NOT NULL COMMENT 'Código del modulo',
  `mod_name` varchar(50) DEFAULT NULL COMMENT 'Nombre del modulo',
  `mod_description` varchar(300) DEFAULT NULL COMMENT 'Descripción del módulo',
  `mod_item` varchar(50) DEFAULT NULL COMMENT 'metodo que corresponde la sección'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Tabla de Módulos que componen el sistema';

INSERT INTO `ctt_modules` (`mod_id`, `mod_code`, `mod_name`, `mod_description`, `mod_item`) VALUES
(1, 'invt', 'Inventarios', 'Modulo que controla los inventarios', '#'),
(2, 'prog', 'Programación', 'Modulo de programación', '#'),
(3, 'alma', 'Almacenes', 'Modulo de almacenes', '#'),
(4, 'catal', 'Catalogos', 'Modulo de catálogos', '#'),
(5, 'admin', 'Administracion', 'Modulo de administración', '#'),
(6, 'users', 'Usuarios', 'Modulo de usuarios', 'Usuarios'),
(7, 'mvalm', 'Movimiento de almacenes', 'Modulo de movimiento entre almacenes', 'MoveStores'),
(8, 'mvalm', 'Lista de almacenes', 'Modulo de edición de almacenes', 'Almacenes'),
(9, 'lscat', 'Lista de categorias', 'Modúlo de edicion de categorias', 'Categorias'),
(10, 'prods', 'Lista de productos', 'Modúlo de edicion de productos', 'Productos'),
(11, 'prsub', 'Productos en subarrendo', 'Modulo de productos en subarrendo', 'ProductsForSubletting'),
(12, 'prfus', 'Perfil de usuario', 'Modulo de perfil deusuario', 'PerfilUser'),
(13, 'prvedr', 'Proveedores', 'Modulo de proveedores', 'Proveedores'),
(14, 'puests', 'Puestos', 'Modulo de puestos de la organizacion', 'Puestos'),
(15, 'doctos', 'Documentos', 'Modulo de documentos de productos', 'Documentos'),
(16, 'servic', 'Servicios', 'Modulo de tipos de servicio', 'Servicios'),
(17, 'subcat', 'Subcategorias', 'Modulo de subcategorias', 'SubCategorias');


DROP TABLE IF EXISTS `ctt_position`;
CREATE TABLE `ctt_position` (
  `pos_id` int(11) NOT NULL COMMENT 'ID del puesto',
  `pos_name` varchar(50) NOT NULL COMMENT 'Nombre del puesto',
  `pos_description` varchar(300) NOT NULL COMMENT 'Descripción del puesto',
  `pos_status` varchar(1) DEFAULT NULL COMMENT 'Estatus del puesto 1-Activo, 0-Inactivo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Puestos de empleados en la empresa';

DROP TABLE IF EXISTS `ctt_products`;
CREATE TABLE `ctt_products` (
  `prd_id` int(11) NOT NULL COMMENT 'ID del proveedor',
  `prd_sku` varchar(10) DEFAULT NULL COMMENT 'SKU identificador del producto',
  `prd_name` varchar(100) DEFAULT NULL COMMENT 'Nombre del producto',
  `prd_english_name` varchar(100) DEFAULT NULL COMMENT 'Nombre del producto en ingles',
  `prd_model` varchar(50) DEFAULT NULL COMMENT 'Modelo del producto',
  `prd_price` decimal(10,2) DEFAULT NULL COMMENT 'Precio unitario del producto',
  `prd_coin_type` varchar(30) DEFAULT NULL COMMENT 'Tipo de moneda',
  `prd_visibility` varchar(1) DEFAULT NULL COMMENT 'Visibilidad del producto en cotización 1-visible, 0-no visible',
  `prd_comments` varchar(300) DEFAULT NULL COMMENT 'Observaciones',
  `prd_status` varchar(1) DEFAULT NULL COMMENT 'Estatus del producto 1-Activo, 0-Inactivo',
  `sbc_id` int(11) DEFAULT NULL COMMENT 'ID de la subcategoría relacion ctt_subcategories',
  `sup_id` int(11) DEFAULT NULL COMMENT 'ID de la proveedor relacion ctt_suppliers',
  `srv_id` int(11) DEFAULT NULL COMMENT 'ID del tipo de servicio relacion ctt_services'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Productos de la empresa.';

INSERT INTO `ctt_products` (`prd_id`, `prd_sku`, `prd_name`, `prd_english_name`, `prd_model`, `prd_price`, `prd_coin_type`, `prd_visibility`, `prd_comments`, `prd_status`, `sbc_id`, `sup_id`, `srv_id`) VALUES
(1, '', 'PHANTOM FLEX 2K/4K', 'PHANTOM FLEX 2K / 4K', '', '42000.00', 'MXN', '1', '', '1', 2, 0, 1),
(2, '', 'ARRI ALEXA XT PLUS 4:3', 'ARRI ALEXA XT PLUS 4: 3', '', '32000.00', 'MXN', '1', '', '1', 2, 0, 1),
(3, '', 'ARRI ALEXA XR MODULE', 'ARRI ALEXA XR MODULE', '', '20000.00', 'MXN', '1', '', '1', 2, 0, 1),
(4, '', 'ARRI ALEXA THE ORIGINAL (EV)', 'ARRI ALEXA THE ORIGINAL (EV)', '', '16000.00', 'MXN', '1', '', '1', 2, 0, 1),
(5, '', 'ARRI ALEXA PLUS 16:9', 'ARRI ALEXA PLUS 16: 9', '', '22000.00', 'MXN', '1', '', '1', 2, 0, 1),
(6, '', 'ARRI ALEXA STUDIO', 'ARRI ALEXA STUDIO', '', '23000.00', 'MXN', '1', '', '1', 2, 0, 1),
(7, '', 'ARRI ALEXA M', 'ARRI ALEXA M', '', '24000.00', 'MXN', '1', '', '1', 2, 0, 1),
(8, '', 'ARRI ALEXA MINI 16:9/4:3/ ARRI RAW/ OPEN GATE       ', 'ARRI ALEXA MINI 16:9/4:3/ ARRI RAW/ OPEN GATE       ', '', '33000.00', 'MXN', '1', '', '1', 2, 0, 1),
(9, '', '575 W HMI REFLECTOR PAR LITE', '575 W HMI REFLECTOR PAR LITE', '', '575.00', 'MXN', '1', '', '1', 8, 0, 1),
(10, '', 'CABLE', 'CABLE', '', '1.00', 'MXN', '0', '', '1', 51, 0, 1),
(11, '', 'GASAS', 'GASES', '', '1.00', 'MXN', '0', '', '1', 51, 0, 1),
(12, '', 'ASPAS', 'BLADES', '', '1.00', 'MXN', '0', '', '1', 51, 0, 1),
(13, '', 'BALASTRA', 'BALLAST', '', '1.00', 'MXN', '0', '', '1', 51, 0, 1),
(14, '', 'LENTILLAS', 'CONTACT LENSES', '', '1.00', 'MXN', '0', '', '1', 51, 0, 1),
(15, '', 'BEAMER', 'BEAMER', '', '1.00', 'MXN', '0', '', '1', 51, 0, 1),
(16, '', 'ARO PARA CHIMERA', 'RING FOR CHIMERA', '', '1.00', 'MXN', '0', '', '1', 51, 0, 1);

DROP TABLE IF EXISTS `ctt_products_documents`;
CREATE TABLE `ctt_products_documents` (
  `dcp_id` int(11) NOT NULL COMMENT 'ID de relacion producto-documento',
  `prd_id` int(11) DEFAULT NULL COMMENT 'ID del producto relacion ctt_productos',
  `doc_id` int(11) DEFAULT NULL COMMENT 'ID del documento relación ctt_documents'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Relación de documentos con productos';

DROP TABLE IF EXISTS `ctt_profiles`;
CREATE TABLE `ctt_profiles` (
  `prf_id` int(11) NOT NULL COMMENT 'ID del perfil',
  `prf_code` varchar(50) NOT NULL COMMENT 'Código del perfi',
  `prf_name` varchar(50) DEFAULT NULL COMMENT 'Nombre del perfil',
  `prf_description` varchar(300) DEFAULT NULL COMMENT 'Descripción del perfil',
  `prf_mod_start` varchar(50) DEFAULT NULL COMMENT 'ID del modulo de inicio'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Tabla de Perfiles';

INSERT INTO `ctt_profiles` (`prf_id`, `prf_code`, `prf_name`, `prf_description`, `prf_mod_start`) VALUES
(1, 'supuser', 'Super usuario', 'Control total sobre toda la aplicación', 'Start');

DROP TABLE IF EXISTS `ctt_profiles_modules`;
CREATE TABLE `ctt_profiles_modules` (
  `pfm_id` int(11) NOT NULL COMMENT 'ID de la relacion perfil - modulo',
  `prf_id` int(11) NOT NULL COMMENT 'FK ID del perfil relacion ctt_profile',
  `mod_id` int(11) NOT NULL COMMENT 'FK ID del modulo relación ctt_modulo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Tabla pivote m_to_m ctt_profile - ctt_modulo';

DROP TABLE IF EXISTS `ctt_series`;
CREATE TABLE `ctt_series` (
  `ser_id` int(11) NOT NULL COMMENT 'ID de la serie',
  `ser_sku` varchar(10) DEFAULT NULL COMMENT 'SKU identificador del producto',
  `ser_serial_number` varchar(50) DEFAULT NULL COMMENT 'Numero de serie del producto',
  `ser_cost` decimal(10,2) DEFAULT NULL COMMENT 'Costo unitario del producto',
  `ser_status` varchar(1) DEFAULT NULL COMMENT 'Estatus del producto 1-Activo, 0-Inactivo',
  `ser_situation` varchar(5) DEFAULT NULL COMMENT 'Situación de estatus dentro del proceso ',
  `ser_stage` varchar(5) DEFAULT NULL COMMENT 'Etapa dentro del proceso',
  `ser_date_registry` datetime DEFAULT current_timestamp() COMMENT 'Fecha de registro del producto',
  `ser_date_down` datetime DEFAULT NULL COMMENT 'Fecha de baja del producto',
  `ser_lonely` varchar(1) DEFAULT NULL COMMENT 'Se puede rentar sin accesosrios 1-si, 0-no',
  `ser_behaviour` varchar(1) NOT NULL COMMENT 'Comportamiento del producto C-Compra, R-Renta',
  `prd_id` int(11) DEFAULT NULL COMMENT 'ID del producto relacion ctt_productos'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Numero serie de productos correspondientes a un modelo.';

INSERT INTO `ctt_series` (`ser_id`, `ser_sku`, `ser_serial_number`, `ser_cost`, `ser_status`, `ser_situation`, `ser_stage`, `ser_date_registry`, `ser_date_down`, `ser_lonely`, `ser_behaviour`, `prd_id`) VALUES
(1, '', '', '0.00', '1', 'D', 'D', '2021-03-17 18:01:33', NULL, '1', 'C', 1),
(2, '', '8901', '0.00', '1', 'D', 'D', '2021-03-17 18:01:34', NULL, '1', 'C', 2),
(3, '', '2519', '0.00', '1', 'D', 'D', '2021-03-17 18:01:34', NULL, '1', 'C', 3),
(4, '', '3076', '0.00', '1', 'D', 'D', '2021-03-17 18:01:34', NULL, '1', 'C', 4),
(5, '', '4007', '0.00', '1', 'D', 'D', '2021-03-17 18:01:34', NULL, '1', 'C', 5),
(6, '', '6057', '0.00', '1', 'D', 'D', '2021-03-17 18:01:34', NULL, '1', 'C', 6),
(7, '', '', '0.00', '1', 'D', 'D', '2021-03-17 18:01:34', NULL, '1', 'C', 7),
(8, '', '22377', '0.00', '1', 'D', 'D', '2021-03-17 18:01:34', NULL, '1', 'C', 8),
(9, '', '21447', '0.00', '1', 'D', 'D', '2021-03-17 18:01:34', NULL, '1', 'C', 8),
(10, '', '20883', '0.00', '1', 'D', 'D', '2021-03-17 18:01:34', NULL, '1', 'C', 8),
(11, '', '20490', '0.00', '1', 'D', 'D', '2021-03-17 18:01:34', NULL, '1', 'C', 8),
(12, '', '24217', '0.00', '1', 'D', 'D', '2021-03-17 18:01:34', NULL, '1', 'C', 8),
(13, '', '25314', '0.00', '1', 'D', 'D', '2021-03-17 18:01:34', NULL, '1', 'C', 8),
(14, '', '22556', '0.00', '1', 'D', 'D', '2021-03-17 18:01:34', NULL, '1', 'C', 8),
(15, '', '1574', '0.00', '1', 'D', 'D', '2021-03-17 18:01:34', NULL, '1', 'C', 9),
(16, '', '946', '0.00', '1', 'D', 'D', '2021-03-17 18:01:34', NULL, '1', 'C', 9),
(17, '', '943', '0.00', '1', 'D', 'D', '2021-03-17 18:01:34', NULL, '1', 'C', 9),
(18, '', '1324', '0.00', '1', 'D', 'D', '2021-03-17 18:01:34', NULL, '1', 'C', 9),
(19, '', 'SN', '0.00', '1', 'D', 'D', '2021-03-17 18:01:34', NULL, '1', 'C', 10),
(20, '', 'SN', '0.00', '1', 'D', 'D', '2021-03-17 18:01:34', NULL, '1', 'C', 11),
(21, '', 'SN', '0.00', '1', 'D', 'D', '2021-03-17 18:01:34', NULL, '1', 'C', 12),
(22, '', 'SN', '0.00', '1', 'D', 'D', '2021-03-17 18:01:34', NULL, '1', 'C', 13),
(23, '', 'SN', '0.00', '1', 'D', 'D', '2021-03-17 18:01:35', NULL, '1', 'C', 14),
(24, '', 'SN', '0.00', '1', 'D', 'D', '2021-03-17 18:01:35', NULL, '1', 'C', 15),
(25, '', 'SN', '0.00', '1', 'D', 'D', '2021-03-17 18:01:35', NULL, '1', 'C', 16),
(26, '', 'R001', '1.00', '1', 'D', 'D', '2021-03-25 06:12:51', NULL, '1', 'R', 6);

DROP TABLE IF EXISTS `ctt_services`;
CREATE TABLE `ctt_services` (
  `srv_id` int(11) NOT NULL COMMENT 'ID del servicio',
  `srv_name` varchar(100) DEFAULT NULL COMMENT 'Nombre del servicio',
  `srv_description` varchar(300) DEFAULT NULL COMMENT 'Nombre del servicio',
  `srv_status` varchar(1) DEFAULT NULL COMMENT 'Estatus del servicio 1-Activo, 0-Inactivo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Tipificación de los servicios.';

INSERT INTO `ctt_services` (`srv_id`, `srv_name`, `srv_description`, `srv_status`) VALUES
(1, 'Renta', 'Servicio para renta de productos', '1');

DROP TABLE IF EXISTS `ctt_stores`;
CREATE TABLE `ctt_stores` (
  `str_id` int(11) NOT NULL COMMENT 'ID del almacén',
  `str_name` varchar(100) DEFAULT NULL COMMENT 'Nombre del almacén',
  `str_status` varchar(1) DEFAULT NULL COMMENT 'Estatus del almacen 1-Activo, 0-Inactivo',
  `str_type` varchar(100) DEFAULT NULL COMMENT 'Tipo de almacén'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Listado de almacenes.';

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
(31, '', '0', ''),
(32, '', '0', ''),
(33, 'Almacen pruebas', '0', 'estaticos'),
(34, 'Almacen pruebas', '0', 'estaticos'),
(35, 'Test store', '1', '');

DROP TABLE IF EXISTS `ctt_stores_exchange`;
CREATE TABLE `ctt_stores_exchange` (
  `exc_id` int(11) NOT NULL COMMENT 'ID del movimiento',
  `exc_date` datetime DEFAULT current_timestamp() COMMENT 'Fecha de registro del movimiento',
  `exc_guid` varchar(200) NOT NULL COMMENT 'codigo del movimiento',
  `exc_sku_product` varchar(100) NOT NULL COMMENT 'SKU del producto',
  `exc_product_name` varchar(200) NOT NULL COMMENT 'Nombre del producto',
  `exc_quantity` int(11) DEFAULT NULL COMMENT 'Cantidad de piezas',
  `exc_serie_product` varchar(200) NOT NULL COMMENT 'Numero de series del producto',
  `exc_store` varchar(50) NOT NULL COMMENT 'Almacen que afecto el movimiento',
  `exc_comments` varchar(300) NOT NULL COMMENT 'Comentarios referentes al movimiento',
  `exc_proyect` varchar(100) NOT NULL COMMENT 'Nombre del proyecto',
  `exc_employee_name` varchar(100) NOT NULL COMMENT 'Nombre del empleado',
  `ext_code` varchar(100) NOT NULL COMMENT 'Còdigo del tipo de movimiento',
  `ext_id` int(11) DEFAULT NULL COMMENT 'ID del tipo de movimiento relación ctt_type_exchange'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Movimientos de productos entre almacenes';

INSERT INTO `ctt_stores_exchange` (`exc_id`, `exc_date`, `exc_guid`, `exc_sku_product`, `exc_product_name`, `exc_quantity`, `exc_serie_product`, `exc_store`, `exc_comments`, `exc_proyect`, `exc_employee_name`, `ext_code`, `ext_id`) VALUES
(1, '2021-03-09 07:08:20', '8a2b9dfc-445e-479b-95a8-5fbf1e2d1e74', '', 'ARRI ALEXA XR MODULE', 1, '2519', 'CAMARA', '', '', 'Super Usuario', 'STA', 2),
(2, '2021-03-09 07:08:21', '8a2b9dfc-445e-479b-95a8-5fbf1e2d1e74', '', 'ARRI ALEXA XR MODULE', 1, '2519', 'ILUMINACION.', '', '', 'Super Usuario', 'ETA', 1);

DROP TABLE IF EXISTS `ctt_stores_products`;
CREATE TABLE `ctt_stores_products` (
  `stp_id` int(11) NOT NULL COMMENT 'ID del registro',
  `stp_quantity` int(11) NOT NULL DEFAULT 0 COMMENT 'Cantidad de productos',
  `str_id` int(11) NOT NULL COMMENT 'ID del almacen relacion ctt_store',
  `ser_id` int(11) NOT NULL COMMENT 'ID del numerode serie relacion ctt_series'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Tabla de cantidad de productos en almacen';

INSERT INTO `ctt_stores_products` (`stp_id`, `stp_quantity`, `str_id`, `ser_id`) VALUES
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

DROP TABLE IF EXISTS `ctt_subcategories`;
CREATE TABLE `ctt_subcategories` (
  `sbc_id` int(11) NOT NULL COMMENT 'ID de la subcategoría',
  `sbc_code` varchar(10) DEFAULT NULL COMMENT 'Clave de la subcategoría',
  `sbc_name` varchar(100) DEFAULT NULL COMMENT 'Nombre de la subcategoría',
  `sbc_status` varchar(1) DEFAULT NULL COMMENT 'Estatus de la subcategoría 1-Activo, 0-Inactivo',
  `cat_id` int(11) NOT NULL COMMENT 'ID del catálogo relación ctt_categories'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Subcategorias.';

INSERT INTO `ctt_subcategories` (`sbc_id`, `sbc_code`, `sbc_name`, `sbc_status`, `cat_id`) VALUES
(1, 'A', 'CABEZAS ESTABILIZADAS', '1', 1),
(2, 'B', 'CABEZAS', '1', 1),
(3, 'C', 'ACCESORIOS Y EQUIPO ESPECIAL', '1', 1),
(4, 'D', 'MONITORES', '1', 1),
(5, 'E', 'ACCESORIOS ELECTRONICOS', '1', 1),
(6, 'F', 'CUBIERTAS PARA CÁMARA', '1', 1),
(7, 'G', 'CLIP ON/ MATTE BOX/ FOLLOW FOCUS', '1', 1),
(8, 'H', 'MAGAZINES', '1', 1),
(9, 'I', 'TRIPIES', '1', 1),
(10, 'J', 'MICRÓFONOS', '1', 1),
(11, 'K', 'BATERÍAS', '1', 1),
(12, 'L', 'TARJETAS', '1', 1),
(13, 'M', 'LECTOR TARJETAS', '1', 1),
(14, 'N', 'DOWNCONVERTER', '1', 1),
(15, 'O', 'DISCO DURO', '1', 1),
(16, 'P', 'DATAS', '1', 1),
(17, 'Q', 'POSTPRODUCCIÓN', '1', 1),
(18, 'R', 'ACCESORIOS PAQUETES DE CÁMARA', '1', 1),
(19, 'S', 'ACCESORIOS PAQUETES DE CÁMARA CINE', '1', 1),
(20, 'A', 'CÁMARAS', '1', 2),
(21, 'B', 'CÁMARAS VIDEO FULL HD', '1', 2),
(22, 'C', 'CÁMARAS DE CINE 35MM', '1', 2),
(23, 'D', 'CÁMARAS DE CINE 16MM', '1', 2),
(24, 'A', 'DOLLIES', '1', 3),
(25, 'B', 'ACCESORIOS PARA DOLLIES', '1', 3),
(26, 'A', 'SOLIDOS 4X4', '1', 5),
(27, 'B', 'DEGRADADOS 4X4', '1', 5),
(28, 'C', 'NEUTRAL DENSITY 4X4', '1', 5),
(29, 'D', 'DIFUSIÓN 4X4', '1', 5),
(30, 'E', 'CONTRASTE 4X4', '1', 5),
(31, 'F', 'POLARIZADORES 4X4', '1', 5),
(32, 'G', 'CORRECCIÓN 4X4', '1', 5),
(33, 'H', 'EFECTOS 4X4', '1', 5),
(34, 'I', 'IR 4X4', '1', 5),
(35, 'A', 'SOLIDOS 6.6 x6.6\"', '1', 6),
(36, 'B', 'DEGRADADOS 6.6 x6.6\"', '1', 6),
(37, 'C', 'NEUTRAL DENSITY 6.6 x 6.6\"', '1', 6),
(38, 'D', 'DIFUSIÓN 6.6 x6.6\"', '1', 6),
(39, 'E', 'CONTRASTE 6.6 x6.6\"', '1', 6),
(40, 'F', 'POLA 6.6 x6.6\"', '1', 6),
(41, 'G', 'CORRECCIÓN 6.6 x6.6\"', '1', 6),
(42, 'H', 'EFECTOS 6.6 x6.6\"', '1', 6),
(43, 'I', 'IR 6.6 x6.6\"', '1', 6),
(44, 'A', '138MM', '1', 7),
(45, 'B', '4- 1/2\"', '1', 7),
(46, 'C', '4x 5.65\"', '1', 7),
(47, 'A', 'HMI ARRI MAX', '1', 8),
(48, 'AA', 'MALETAS LEDS', '1', 8),
(49, 'AB', 'CHIMERAS', '1', 8),
(50, 'AC', 'CONTROLES/ TRANSMISORES/ CONSOLAS', '1', 8),
(51, 'B', 'HMI PAR LITE', '1', 8),
(52, 'C', 'HMI FRESNEL', '1', 8),
(53, 'D', 'HMI GOYA', '1', 8),
(54, 'E', 'HMI K5600', '1', 8),
(55, 'F', 'HMI JOKERS', '1', 8),
(56, 'G', 'SUN GUNS', '1', 8),
(57, 'H', 'CHIMERAS Y EGG CRATES', '1', 8),
(58, 'I', 'TUNGSTENO', '1', 8),
(59, 'J', 'TUNGSTENO PAR LITE', '1', 8),
(60, 'K', 'TUNGSTENO CUARZO', '1', 8),
(61, 'L', 'TUNGSTENO DEDO LITE', '1', 8),
(62, 'M', 'TUNGSTENO MINIBRUTOS', '1', 8),
(63, 'N', 'TUNGSTENO MAXIBRUTOS ,RUBY 7 Y PAR 64', '1', 8),
(64, 'O', 'ILUMINACIÓN TUNGSTENO CICLORAMA LITE', '1', 8),
(65, 'P', 'ILUMINACIÓN TUNGSTENO SKY Y SPACE LITE', '1', 8),
(66, 'Q', 'ILUMINACIÓN TUNGSTENO SOFT LITE', '1', 8),
(67, 'R', 'ILUMINACIÓN TUNGSTENO SOURCE FOUR', '1', 8),
(68, 'T', 'SEGUIDOR DE TEATRO', '1', 8),
(69, 'U', 'RGB Y EFECTOS', '1', 8),
(70, 'V', 'ILUMINACIÓN KINO FLO 3,200 K/ 5,600K', '1', 8),
(71, 'W', 'ELÉCTRICOS', '1', 8),
(72, 'X', 'ILUMINACIÓN EFECTOS', '1', 8),
(73, 'Y', 'LEDS BICOLOR', '1', 8),
(74, 'Z', 'TAPETES LEDS BICOLOR', '1', 8),
(75, 'A', 'JIBS Y GRUAS', '1', 9),
(76, 'B', 'Súper Techno Telescopic', '1', 9),
(77, 'E', 'Foxy Advanced ', '1', 9),
(78, 'G', 'GIBS', '1', 9),
(79, 'H', 'Grúa CamMate', '1', 9),
(80, 'I', 'Scorpio', '1', 9),
(81, 'A', 'COOKE S4/i 35 MM', '1', 10),
(82, 'AA', 'COOKE S7 FULL FRAME', '1', 10),
(83, 'AB', 'COOKE PANCHRO/i CLASSIC', '1', 10),
(84, 'AC', 'ANGENIEUX OPTIMO PRIME', '1', 10),
(85, 'B', 'MINI COOKE S4/i 35 MM', '1', 10),
(86, 'C', 'MASTER PRIMER', '1', 10),
(87, 'D', 'ULTRA PRIME 35 MM', '1', 10),
(88, 'E', 'ULTRA PRIME LDS 35 MM', '1', 10),
(89, 'F', 'ULTRA PRIME 16 MM', '1', 10),
(90, 'G', 'TELEFOTO', '1', 10),
(91, 'H', 'ZOOM 35MM', '1', 10),
(92, 'I', 'ZOOM 16MM', '1', 10),
(93, 'J', 'VARIABLE PRIME', '1', 10),
(94, 'K', 'MACRO', '1', 10),
(95, 'L', 'CLOSE FOCUS', '1', 10),
(96, 'M', 'ANGULARES', '1', 10),
(97, 'N', 'HIGH SPEED 35MM', '1', 10),
(98, 'O', 'HIGH SPEED 16MM', '1', 10),
(99, 'P', 'NORMAL SPEED 35MM', '1', 10),
(100, 'Q', 'SWING & SHIFT', '1', 10),
(101, 'R', 'SET DE LENTES', '1', 10),
(102, 'S', 'OTROS LENTES', '1', 10),
(103, 'T', 'EXTENDERS', '1', 10),
(104, 'U', 'VIEWFINDER', '1', 10),
(105, 'V', 'LEICA SUMMILUX-C EXTRAS', '1', 10),
(106, 'W', 'COOKE ANAMÓRFICO', '1', 10),
(107, 'X', 'COMPACT PRIME', '1', 10),
(108, 'Y', 'SUPREME PRIME', '1', 10),
(109, 'Z', 'WHITE POINT', '1', 10),
(110, 'A', 'PAQUETES CON MAXIMÓVIL', '1', 11),
(111, 'B', 'PAQUETES CON MÓVIL', '1', 11),
(112, 'C', 'PAQUETES CON MINIMÓVIL', '1', 11),
(113, 'D', 'PAQUETES CON MINIMÓVIL HMI', '1', 11),
(114, 'E', 'PAQUETES DE FILMACIÓN CON MICROMÓVIL', '1', 11),
(115, 'F', 'VANDAYLIGHT', '1', 11),
(116, 'H', 'PAQUETES DE FILMACIÓN CON MINIMAX', '1', 11),
(117, 'I', 'MOVIL', '1', 11),
(118, 'J', 'MINIMOVILES', '1', 11),
(119, 'K', 'MINIMAX', '1', 11),
(120, 'L', 'VAN', '1', 11),
(121, 'M', 'TRANSPORTACIÓN', '1', 11),
(122, 'N', 'TRANSPORTACIÓN CAMARA', '1', 11),
(123, 'O', 'TRANSPORTACIÓN BODEGA', '1', 11),
(124, 'A', 'PLANTAS GENERADORAS GENERALES', '1', 12),
(125, 'B', 'GENERADORES PORTÁTILES', '1', 12),
(126, 'E', 'PLANTAS GENERADORAS', '1', 12),
(127, 'A', 'TEXTILES', '1', 13),
(128, 'B', 'CROMAS', '1', 13),
(129, 'C', 'MARCOS PARA TEXTILES', '1', 13),
(130, 'D', 'BANDERAS', '1', 13),
(131, 'E', 'GOBOS', '1', 13),
(132, 'F', 'FLOPPY', '1', 13),
(133, 'G', 'JUEGO DE FINGERS', '1', 13),
(134, 'A', 'TRAMOYA', '1', 14),
(135, 'C', 'CARROS PARA TRANSPORTAR TRAMOYA', '1', 14);

DROP TABLE IF EXISTS `ctt_subletting`;
CREATE TABLE `ctt_subletting` (
  `sub_id` int(11) NOT NULL COMMENT 'ID del subarrendo',
  `sub_price` decimal(10,2) DEFAULT 0.00 COMMENT 'precio de renta del producto por unidad',
  `sub_coin_type` varchar(30) DEFAULT NULL COMMENT 'Tipo de moneda',
  `sub_quantity` int(11) DEFAULT NULL COMMENT 'Cantidad de piezas subarrendadas',
  `sub_date_start` datetime DEFAULT NULL COMMENT 'Fecha de inicio de periodo de subarrendo',
  `sub_date_end` datetime DEFAULT NULL COMMENT 'Fecha de término de periodo de subarrendo',
  `sub_comments` varchar(300) NOT NULL COMMENT 'Comentarios referentes al subarrendo',
  `ser_id` int(11) DEFAULT NULL COMMENT 'Id del serial del producto relacion ctt_serial',
  `sup_id` int(11) DEFAULT NULL COMMENT 'Id del proveedor relacion ctt_suppliers',
  `prj_id` int(11) DEFAULT NULL COMMENT 'Id del proyecto '
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Tabla de situación de subarrendos';

DROP TABLE IF EXISTS `ctt_suppliers`;
CREATE TABLE `ctt_suppliers` (
  `sup_id` int(11) NOT NULL COMMENT 'ID del proveedor',
  `sup_business_name` varchar(100) DEFAULT NULL COMMENT 'Nombre de la empresa',
  `sup_contact` varchar(100) DEFAULT NULL COMMENT 'Nombre del responsable',
  `sup_rfc` varchar(15) DEFAULT NULL COMMENT 'Registro Federal de Contribuyentes',
  `sup_email` varchar(100) DEFAULT NULL COMMENT 'Correo electrónico',
  `sup_phone` varchar(100) DEFAULT NULL COMMENT 'Número telefónico',
  `sup_status` varchar(1) DEFAULT NULL COMMENT 'Estatus del proveedor 1-Activo, 0-Inactivo',
  `sup_behaviour` varchar(1) DEFAULT NULL COMMENT 'Comportamiento del proveedor C-Compra, R-Renta'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Proveedores de la empresa.';

INSERT INTO `ctt_suppliers` (`sup_id`, `sup_business_name`, `sup_contact`, `sup_rfc`, `sup_email`, `sup_phone`, `sup_status`, `sup_behaviour`) VALUES
(1, 'Proveedor 1', 'Contacto delproveedor', 'XXXX-XXXXXX-XX', 'contacto@proveedor.com', '00-0000-0000', '1', 'R'),
(3, 'Proveedor 2', 'Contacto del proveedor 2', 'XXXX-XXXXXX-YY', 'contacto@proveedor2.com', '00-0000-0001', '1', 'R');

DROP TABLE IF EXISTS `ctt_type_exchange`;
CREATE TABLE `ctt_type_exchange` (
  `ext_id` int(11) NOT NULL COMMENT 'ID del tipo de movimiento',
  `ext_code` varchar(100) NOT NULL COMMENT 'Còdigo del tipo de movimiento',
  `ext_type` varchar(1) NOT NULL COMMENT 'Tipo de movimiento E-Entrada, S-Salida, R-Renta',
  `ext_description` varchar(300) NOT NULL COMMENT 'Descripcion del movimiento',
  `ext_link` int(11) DEFAULT NULL COMMENT 'Relacion con otro movimiento',
  `ext_affect_product` varchar(5) NOT NULL COMMENT 'Clave de afectaciòn a la situaciòn del producto'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Tipos de movimientos entre almacenes';

INSERT INTO `ctt_type_exchange` (`ext_id`, `ext_code`, `ext_type`, `ext_description`, `ext_link`, `ext_affect_product`) VALUES
(1, 'ETA', 'E', 'ENTRADA POR TRASPASO DE ALMACEN', 2, ''),
(2, 'STA', 'S', 'PARA TRASLADO A OTRO ALMACEN', 1, ''),
(3, 'SCI', 'S', 'POR CONSUMO INTERNO', NULL, '');

DROP TABLE IF EXISTS `ctt_users`;
CREATE TABLE `ctt_users` (
  `usr_id` int(11) NOT NULL COMMENT 'ID del usuario',
  `usr_username` varchar(45) NOT NULL COMMENT 'Usuario',
  `usr_password` varchar(200) DEFAULT NULL COMMENT 'Contraseña del Usuario',
  `usr_dt_registry` datetime DEFAULT current_timestamp() COMMENT 'Fecha de registro del usuario en el sistema',
  `usr_dt_last_access` datetime DEFAULT current_timestamp() COMMENT 'Fecha de ultimo acceso al sistema',
  `usr_dt_change_pwd` datetime DEFAULT current_timestamp() COMMENT 'Fecha proxima definida del cambio de sistema',
  `usr_status` varchar(1) DEFAULT NULL COMMENT 'Estatus del usuario 1-Activo, 0-Inactivo',
  `prf_id` int(11) DEFAULT NULL COMMENT 'ID del perfil relacion ctt_profiles',
  `emp_id` int(11) DEFAULT NULL COMMENT 'ID del empleado relacion ctt_employees'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Tabla de Usuarios registrados';

INSERT INTO `ctt_users` (`usr_id`, `usr_username`, `usr_password`, `usr_dt_registry`, `usr_dt_last_access`, `usr_dt_change_pwd`, `usr_status`, `prf_id`, `emp_id`) VALUES
(1, 'admin', '$2y$10$cCwBkjHX9U/FkZYO0m7KVOAvEiGOE7J3/nZy0/zcJSYrq5jl98ac6', '2021-02-12 12:14:09', '2021-02-12 12:14:09', '2021-02-12 10:28:19', '1', 1, 1);

DROP TABLE IF EXISTS `ctt_users_modules`;
CREATE TABLE `ctt_users_modules` (
  `urm_id` int(11) NOT NULL COMMENT 'ID de la relacion usuario - modulo',
  `usr_id` int(11) NOT NULL COMMENT 'FK ID del usuario relacion ctt_users',
  `mod_id` int(11) NOT NULL COMMENT 'FK ID del modulo relación ctt_modules'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Tabla pivote m_to_m ctt_usuarios - ctt_modules';

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
(10, 1, 10),
(11, 1, 11),
(12, 1, 12),
(13, 1, 13),
(14, 1, 14),
(15, 1, 15),
(16, 1, 16),
(17, 1, 17);

ALTER TABLE `ctt_accessories`
  ADD PRIMARY KEY (`acr_id`);

ALTER TABLE `ctt_actions`
  ADD PRIMARY KEY (`acc_id`);

ALTER TABLE `ctt_activity_log`
  ADD PRIMARY KEY (`log_id`);

ALTER TABLE `ctt_categories`
  ADD PRIMARY KEY (`cat_id`);

ALTER TABLE `ctt_documents`
  ADD PRIMARY KEY (`doc_id`);

ALTER TABLE `ctt_employees`
  ADD PRIMARY KEY (`emp_id`);

ALTER TABLE `ctt_menu`
  ADD PRIMARY KEY (`mnu_id`);

ALTER TABLE `ctt_modules`
  ADD PRIMARY KEY (`mod_id`);

ALTER TABLE `ctt_position`
  ADD PRIMARY KEY (`pos_id`);

ALTER TABLE `ctt_products`
  ADD PRIMARY KEY (`prd_id`);

ALTER TABLE `ctt_products_documents`
  ADD PRIMARY KEY (`dcp_id`);

ALTER TABLE `ctt_profiles`
  ADD PRIMARY KEY (`prf_id`);

ALTER TABLE `ctt_profiles_modules`
  ADD PRIMARY KEY (`pfm_id`);

ALTER TABLE `ctt_series`
  ADD PRIMARY KEY (`ser_id`);

ALTER TABLE `ctt_services`
  ADD PRIMARY KEY (`srv_id`);

ALTER TABLE `ctt_stores`
  ADD PRIMARY KEY (`str_id`);

ALTER TABLE `ctt_stores_exchange`
  ADD PRIMARY KEY (`exc_id`);

ALTER TABLE `ctt_stores_products`
  ADD PRIMARY KEY (`stp_id`);

ALTER TABLE `ctt_subcategories`
  ADD PRIMARY KEY (`sbc_id`);

ALTER TABLE `ctt_subletting`
  ADD PRIMARY KEY (`sub_id`);

ALTER TABLE `ctt_suppliers`
  ADD PRIMARY KEY (`sup_id`);

ALTER TABLE `ctt_type_exchange`
  ADD PRIMARY KEY (`ext_id`);

ALTER TABLE `ctt_users`
  ADD PRIMARY KEY (`usr_id`);

ALTER TABLE `ctt_users_modules`
  ADD PRIMARY KEY (`urm_id`);

ALTER TABLE `ctt_accessories`
  MODIFY `acr_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID del accesorio', AUTO_INCREMENT=26;

ALTER TABLE `ctt_actions`
  MODIFY `acc_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID de la acción';

ALTER TABLE `ctt_activity_log`
  MODIFY `log_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID de la bitácora';

ALTER TABLE `ctt_categories`
  MODIFY `cat_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID del catálogo', AUTO_INCREMENT=17;

ALTER TABLE `ctt_documents`
  MODIFY `doc_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID del documento', AUTO_INCREMENT=2;

ALTER TABLE `ctt_employees`
  MODIFY `emp_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID del empleado', AUTO_INCREMENT=2;

ALTER TABLE `ctt_menu`
  MODIFY `mnu_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID del menu', AUTO_INCREMENT=18;

ALTER TABLE `ctt_modules`
  MODIFY `mod_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID del módulo', AUTO_INCREMENT=18;

ALTER TABLE `ctt_position`
  MODIFY `pos_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID del puesto';

ALTER TABLE `ctt_products`
  MODIFY `prd_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID del proveedor', AUTO_INCREMENT=17;

ALTER TABLE `ctt_products_documents`
  MODIFY `dcp_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID de relacion producto-documento';

ALTER TABLE `ctt_profiles`
  MODIFY `prf_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID del perfil', AUTO_INCREMENT=2;

ALTER TABLE `ctt_profiles_modules`
  MODIFY `pfm_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID de la relacion perfil - modulo';

ALTER TABLE `ctt_series`
  MODIFY `ser_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID de la serie', AUTO_INCREMENT=27;

ALTER TABLE `ctt_services`
  MODIFY `srv_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID del servicio', AUTO_INCREMENT=2;

ALTER TABLE `ctt_stores`
  MODIFY `str_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID del almacén', AUTO_INCREMENT=36;

ALTER TABLE `ctt_stores_exchange`
  MODIFY `exc_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID del movimiento', AUTO_INCREMENT=3;

ALTER TABLE `ctt_stores_products`
  MODIFY `stp_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID del registro', AUTO_INCREMENT=20;

ALTER TABLE `ctt_subcategories`
  MODIFY `sbc_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID de la subcategoría', AUTO_INCREMENT=136;

ALTER TABLE `ctt_subletting`
  MODIFY `sub_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID del subarrendo';

ALTER TABLE `ctt_suppliers`
  MODIFY `sup_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID del proveedor', AUTO_INCREMENT=4;

ALTER TABLE `ctt_type_exchange`
  MODIFY `ext_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID del tipo de movimiento', AUTO_INCREMENT=4;

ALTER TABLE `ctt_users`
  MODIFY `usr_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID del usuario', AUTO_INCREMENT=2;

ALTER TABLE `ctt_users_modules`
  MODIFY `urm_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID de la relacion usuario - modulo', AUTO_INCREMENT=18;
COMMIT;
