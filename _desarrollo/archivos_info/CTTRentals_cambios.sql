-- CREATE DATABASE `cttapp_cire` 

DROP TABLE `cttapp_cire`.`ctt_users`;
CREATE TABLE `cttapp_cire`.`ctt_users` (
	`usr_id` 				INT NOT NULL AUTO_INCREMENT  COMMENT 'ID del usuario',
	`usr_username` 			VARCHAR(45) NOT NULL		 COMMENT 'Usuario',
	`usr_password` 			VARCHAR(200) NULL			 COMMENT 'Contraseña del Usuario',
	`usr_dt_registry` 		DATETIME NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de registro del usuario en el sistema',
	`usr_dt_last_access` 	DATETIME NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de ultimo acceso al sistema',
	`usr_dt_change_pwd` 	DATETIME NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha proxima definida del cambio de sistema',
	`usr_status` 			VARCHAR(1) NULL			 	 COMMENT 'Estatus del usuario 1-Activo, 0-Inactivo',
	`prf_id` 				INT NULL 					 COMMENT 'ID del perfil relacion ctt_profiles',
	`emp_id` 				INT NULL 					 COMMENT 'ID del empleado relacion ctt_employees',
PRIMARY KEY (`usr_id`))
COMMENT = 'Tabla de Usuarios registrados';

DROP TABLE `cttapp_cire`.`ctt_profiles`;
CREATE TABLE `cttapp_cire`.`ctt_profiles` (
	`prf_id` 				INT NOT NULL AUTO_INCREMENT  COMMENT 'ID del perfil',
	`prf_code`				VARCHAR(50) NOT NULL		 COMMENT 'Código del perfi',
	`prf_name`				VARCHAR(50) NULL			 COMMENT 'Nombre del perfil',
	`prf_description`		VARCHAR(300) NULL			 COMMENT 'Descripción del perfil',
	`prf_mod_start` 		VARCHAR(50) NULL			 COMMENT 'ID del modulo de inicio',
PRIMARY KEY (`prf_id`))
COMMENT = 'Tabla de Perfiles';

DROP TABLE `cttapp_cire`.`ctt_modules`;
CREATE TABLE `cttapp_cire`.`ctt_modules` (
	`mod_id` 				INT NOT NULL AUTO_INCREMENT  COMMENT 'ID del módulo',
	`mod_code`				VARCHAR(50) NOT NULL		 COMMENT 'Código del modulo',
	`mod_name`				VARCHAR(50) NULL			 COMMENT 'Nombre del modulo',
	`mod_description`		VARCHAR(300) NULL			 COMMENT 'Descripción del módulo',
	`mod_item`				VARCHAR(50) NULL			 COMMENT 'metodo que corresponde la sección',
PRIMARY KEY (`mod_id`))
COMMENT = 'Tabla de Módulos que componen el sistema';

DROP TABLE `cttapp_cire`.`ctt_profiles_modules`;
CREATE TABLE `cttapp_cire`.`ctt_profiles_modules` (
	`pfm_id` 				INT NOT NULL AUTO_INCREMENT  COMMENT 'ID de la relacion perfil - modulo',
	`prf_id` 				INT NOT NULL		 		 COMMENT 'FK ID del perfil relacion ctt_profile',
	`mod_id` 				INT NOT NULL			 	 COMMENT 'FK ID del modulo relación ctt_modulo',
PRIMARY KEY (`pfm_id`))
COMMENT = 'Tabla pivote m_to_m ctt_profile - ctt_modulo';

DROP TABLE `cttapp_cire`.`ctt_users_modules`;
CREATE TABLE `cttapp_cire`.`ctt_users_modules` (
	`urm_id` 				INT NOT NULL AUTO_INCREMENT  COMMENT 'ID de la relacion usuario - modulo',
	`usr_id` 				INT NOT NULL		 		 COMMENT 'FK ID del usuario relacion ctt_users',
	`mod_id` 				INT NOT NULL			 	 COMMENT 'FK ID del modulo relación ctt_modules',
PRIMARY KEY (`urm_id`))
COMMENT = 'Tabla pivote m_to_m ctt_usuarios - ctt_modules';

DROP TABLE `cttapp_cire`.`ctt_employees`;
CREATE TABLE `cttapp_cire`.`ctt_employees` (
	`emp_id` 				INT NOT NULL AUTO_INCREMENT  COMMENT 'ID del empleado',
	`emp_number`			VARCHAR(50) NOT NULL		 COMMENT 'Numero del empleado',
	`emp_fullname`			VARCHAR(100) NOT NULL		 COMMENT 'Nombre del empleado',
	`emp_area` 				VARCHAR(50) NULL			 COMMENT 'Area a la que pertenece el empleado',
	`emp_report_to`			INT NULL			 		 COMMENT 'ID del empleado jefe inmediato relacion asi mismo',
	`emp_status`			VARCHAR(1) NULL			 	 COMMENT 'Estatus del empleado 1-Activo, 0-Inactivo',
	`pos_id`				INT NULL			 	 	 COMMENT 'ID del puesto relación ctt_post',
PRIMARY KEY (`emp_id`))
COMMENT = 'Tabla de los empleados de la empresa';

DROP TABLE `cttapp_cire`.`ctt_position`;
CREATE TABLE `cttapp_cire`.`ctt_position` (
	`pos_id` 				INT NOT NULL AUTO_INCREMENT  COMMENT 'ID del puesto',
	`pos_name`				VARCHAR(50) NOT NULL		 COMMENT 'Nombre del puesto',
	`pos_description`		VARCHAR(300) NOT NULL		 COMMENT 'Descripción del puesto',
	`pos_status`			VARCHAR(1) NULL			 	 COMMENT 'Estatus del puesto 1-Activo, 0-Inactivo',
PRIMARY KEY (`pos_id`))
COMMENT = 'Puestos de empleados en la empresa';

DROP TABLE `cttapp_cire`.`ctt_menu`;
CREATE TABLE `cttapp_cire`.`ctt_menu` (
	`mnu_id` 				INT NOT NULL AUTO_INCREMENT  COMMENT 'ID del menu',
	`mnu_parent`			INT NULL		 			 COMMENT 'ID del menu padre',
	`mnu_item`				VARCHAR(100) NOT NULL		 COMMENT 'Elementos del menu',
	`mnu_description`		VARCHAR(300) NULL			 COMMENT 'Descripción del elemento del menu',
	`mod_id`				INT NULL		 			 COMMENT 'ID del modulo relación ctt_module',
PRIMARY KEY (`mnu_id`))
COMMENT = 'Tabla de los elementos que componene el menu susperior';

DROP TABLE `cttapp_cire`.`ctt_stores`;
CREATE TABLE `cttapp_cire`.`ctt_stores` (
	`str_id` 				INT NOT NULL AUTO_INCREMENT  COMMENT 'ID del almacén',
	`str_name`				VARCHAR(100) NULL 			 COMMENT 'Nombre del almacén',
	`str_status`			VARCHAR(1) NULL		 		 COMMENT 'Estatus del almacen 1-Activo, 0-Inactivo',
	`str_type`				VARCHAR(100) NULL			 COMMENT 'Tipo de almacén',
PRIMARY KEY (`str_id`))
COMMENT = 'Listado de almacenes.';

DROP TABLE `cttapp_cire`.`ctt_categories`;
CREATE TABLE `cttapp_cire`.`ctt_categories` (
	`cat_id` 				INT NOT NULL AUTO_INCREMENT  COMMENT 'ID del catálogo',
	`cat_name`				VARCHAR(100) NULL 			 COMMENT 'Nombre del catálogo',
	`cat_status`			VARCHAR(1) NULL		 		 COMMENT 'Estatus del catálogo 1-Activo, 0-Inactivo',
PRIMARY KEY (`cat_id`))
COMMENT = 'Catálogo.';

DROP TABLE `cttapp_cire`.`ctt_subcategories`;
CREATE TABLE `cttapp_cire`.`ctt_subcategories` (
	`sbc_id` 				INT NOT NULL AUTO_INCREMENT  COMMENT 'ID de la subcategoría',
	`sbc_code`				VARCHAR(10) NULL 			 COMMENT 'Clave de la subcategoría',
	`sbc_name`				VARCHAR(100) NULL 			 COMMENT 'Nombre de la subcategoría',
	`sbc_status`			VARCHAR(1) NULL		 		 COMMENT 'Estatus de la subcategoría 1-Activo, 0-Inactivo',
	`cat_id` 				INT NOT NULL   				 COMMENT 'ID del catálogo relación ctt_categories',
PRIMARY KEY (`sbc_id`))
COMMENT = 'Subcategorias.';

DROP TABLE `cttapp_cire`.`ctt_services`;
CREATE TABLE `cttapp_cire`.`ctt_services` (
	`srv_id` 				INT NOT NULL AUTO_INCREMENT  COMMENT 'ID del servicio',
	`srv_name`				VARCHAR(100) NULL 			 COMMENT 'Nombre del servicio',
	`srv_description`		VARCHAR(300) NULL 			 COMMENT 'Nombre del servicio',
	`srv_status`			VARCHAR(1) NULL		 		 COMMENT 'Estatus del servicio 1-Activo, 0-Inactivo',
PRIMARY KEY (`srv_id`))
COMMENT = 'Tipificación de los servicios.';

DROP TABLE `cttapp_cire`.`ctt_suppliers`;
CREATE TABLE `cttapp_cire`.`ctt_suppliers` (
	`sup_id` 				INT NOT NULL AUTO_INCREMENT  COMMENT 'ID del proveedor',
	`sup_buseiness_name`	VARCHAR(100) NULL 			 COMMENT 'Nombre de la empresa',
	`sup_contact`			VARCHAR(100) NULL 			 COMMENT 'Nombre del responsable',
	`sup_rfc`				VARCHAR(15)  NULL 			 COMMENT 'Registro Federal de Contribuyentes',
	`sup_email`				VARCHAR(100)  NULL 			 COMMENT 'Correo electrónico',
	`sup_phone`				VARCHAR(100)  NULL 			 COMMENT 'Número telefónico',
	`sup_status`			VARCHAR(1) NULL		 		 COMMENT 'Estatus del proveedor 1-Activo, 0-Inactivo',
PRIMARY KEY (`sup_id`))
COMMENT = 'Proveedores de la empresa.';

DROP TABLE `cttapp_cire`.`ctt_products`;
CREATE TABLE `cttapp_cire`.`ctt_products` (
	`prd_id` 				INT NOT NULL AUTO_INCREMENT  COMMENT 'ID del proveedor',
	`prd_sku`				VARCHAR(10) NULL 			 COMMENT 'SKU identificador del producto',
    `prd_name`				VARCHAR(100) NULL 			 COMMENT 'Nombre del producto',
	`prd_english_name`		VARCHAR(100)  NULL 			 COMMENT 'Nombre del producto en ingles',
    `prd_model`				VARCHAR(50) NULL 			 COMMENT 'Modelo del producto',
    `prd_price`				decimal(10,2)  NULL			 COMMENT 'Precio unitario del producto',
	`prd_coin_type`			VARCHAR(30)  NULL 			 COMMENT 'Tipo de moneda',
	`prd_visibility`		VARCHAR(1) NULL		 		 COMMENT 'Visibilidad del producto en cotización 1-visible, 0-no visible',
    `prd_comments`			VARCHAR(300) NULL	 		 COMMENT 'Observaciones',
    `prd_status`			VARCHAR(1) NULL		 		 COMMENT 'Estatus del producto 1-Activo, 0-Inactivo',
    `sbc_id` 				INT NULL 					 COMMENT 'ID de la subcategoría relacion ctt_subcategories',
    `sup_id` 				INT NULL 					 COMMENT 'ID de la proveedor relacion ctt_suppliers',
    `srv_id` 				INT NULL 					 COMMENT 'ID del tipo de servicio relacion ctt_services',
PRIMARY KEY (`prd_id`))
COMMENT = 'Productos de la empresa.';

DROP TABLE `cttapp_cire`.`ctt_series`;
CREATE TABLE `cttapp_cire`.`ctt_series` (
	`ser_id` 				INT NOT NULL AUTO_INCREMENT  COMMENT 'ID de la serie',
	`ser_sku`				VARCHAR(10) NULL 			 COMMENT 'SKU identificador del producto',
	`ser_serial_number`		VARCHAR(50)  NULL 			 COMMENT 'Numero de serie del producto',
	`ser_cost`				decimal(10,2)  NULL			 COMMENT 'Costo unitario del producto',
    `ser_status`			VARCHAR(1) NULL		 		 COMMENT 'Estatus del producto 1-Activo, 0-Inactivo',
	`ser_situation`			VARCHAR(5)  NULL 			 COMMENT 'Situación de estatus dentro del proceso ',
    `ser_stage`				VARCHAR(5) NULL 			 COMMENT 'Etapa dentro del proceso',
    `ser_date_registry`		datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de registro del producto',
    `ser_date_down`			datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de baja del producto',
	`ser_lonely`			VARCHAR(1) NULL		 		 COMMENT 'Se puede rentar sin accesosrios 1-si, 0-no',
    `prd_id` 				INT NULL 					 COMMENT 'ID del producto relacion ctt_productos',
PRIMARY KEY (`ser_id`))
COMMENT = 'Numero serie de productos correspondientes a un modelo.';

DROP TABLE `cttapp_cire`.`ctt_products_documents`;
CREATE TABLE `cttapp_cire`.`ctt_products_documents` (
	`dcp_id` 				INT NOT NULL AUTO_INCREMENT  COMMENT 'ID de relacion producto-documento',
    `prd_id` 				INT NULL 					 COMMENT 'ID del producto relacion ctt_productos',
	`doc_id`				INT NULL		 	 		 COMMENT 'ID del documento relación ctt_documents',
PRIMARY KEY (`dcp_id`))
COMMENT = 'Relación de documentos con productos';

DROP TABLE `cttapp_cire`.`ctt_documents`;
CREATE TABLE `cttapp_cire`.`ctt_documents` (
	`doc_id` 				INT NOT NULL AUTO_INCREMENT  COMMENT 'ID del documento',
	`doc_code`				VARCHAR(100) NULL		 	 COMMENT 'Código del documento',
	`doc_name`				VARCHAR(100) NULL		 	 COMMENT 'Nombre del documento',
    `doc_type`				VARCHAR(50) NULL		 	 COMMENT 'Tipo de docuemnto',
	`doc_size`				INT NULL		 			 COMMENT 'Tamaño del docuemnto',
    `doc_content_type`		VARCHAR(100) NULL		 	 COMMENT 'Tipo del contenido del documento',
    `doc_document`			BLOB NULL		 			 COMMENT 'Contetnido del documento',
PRIMARY KEY (`doc_id`))
COMMENT = 'Documentos de productos';

DROP TABLE `cttapp_cire`.`ctt_accessories`;
CREATE TABLE `cttapp_cire`.`ctt_accessories` (
	`acr_id` 				INT NOT NULL AUTO_INCREMENT  COMMENT 'ID del accesorio',
	`acr_parent`			INT NULL		 			 COMMENT 'ID del producto padre',
    `acr_status`			VARCHAR(1)  NULL		 	 COMMENT 'Estatus del accesorio D-Disponible, N-No disponible',
	`ser_id`				INT NULL					 COMMENT 'Id del producto relaciòn ctt_products',
PRIMARY KEY (`acr_id`))
COMMENT = 'Productos o accesorios dependientes de otros productos';

DROP TABLE `cttapp_cire`.`ctt_actions`;
CREATE TABLE `cttapp_cire`.`ctt_actions` (
	`acc_id` 				INT NOT NULL AUTO_INCREMENT  COMMENT 'ID de la acción',
	`acc_description`		VARCHAR(300) NOT NULL		 COMMENT 'Descripción de la acción realizada por el usuario en un modulo',
	`acc_type`				VARCHAR(50) NOT NULL		 COMMENT 'Tipo de accion',
	`mod_id` 				INT NULL 					 COMMENT 'ID del modulo relacion ctt_module',
PRIMARY KEY (`acc_id`))
COMMENT = 'Tabla de tipos de acciones realizadas por un usuario dentro del sistema';

DROP TABLE `cttapp_cire`.`ctt_activity_log`;
CREATE TABLE `cttapp_cire`.`ctt_activity_log` (
	`log_id` 				INT NOT NULL AUTO_INCREMENT  COMMENT 'ID de la bitácora',
	`log_date`				DATETIME NULL DEFAULT CURRENT_TIMESTAMP  COMMENT 'Fecha de registro de la actividad',
	`log_event`				VARCHAR(100) NOT NULL		 COMMENT 'Detalle de la acción realizada',
    `emp_number`			VARCHAR(50) NOT NULL		 COMMENT 'Numero del empleado',
	`emp_fullname`			VARCHAR(100) NOT NULL		 COMMENT 'Nombre del empleado',
    `acc_id` 				INT NULL 					 COMMENT 'ID de la accion relacion ctt_actions',
PRIMARY KEY (`log_id`))
COMMENT = 'Bitácora de actividades realizadas en el sistema';

DROP TABLE `cttapp_cire`.`ctt_stores_exchange`;
CREATE TABLE `cttapp_cire`.`ctt_stores_exchange` (
	`exc_id` 				INT NOT NULL AUTO_INCREMENT  COMMENT 'ID del movimiento',
	`exc_date`				DATETIME NULL DEFAULT CURRENT_TIMESTAMP  COMMENT 'Fecha de registro del movimiento',
	`exc_guid`				VARCHAR(200) NOT NULL		 COMMENT 'codigo del movimiento',
	`exc_sku_product`		VARCHAR(100) NOT NULL		 COMMENT 'SKU del producto',
	`exc_product_name`		VARCHAR(200) NOT NULL		 COMMENT 'Nombre del producto',
	`exc_quantity`			INT NULL		 			 COMMENT 'Cantidad de piezas',
	`exc_serie_product`		VARCHAR(200) NOT NULL		 COMMENT 'Numero de series del producto',
    `exc_store`				VARCHAR(50) NOT NULL		 COMMENT 'Almacen que afecto el movimiento',
	`exc_comments`			VARCHAR(300) NOT NULL		 COMMENT 'Comentarios referentes al movimiento',
    `exc_proyect`			VARCHAR(100) NOT NULL		 COMMENT 'Nombre del proyecto',
    `exc_employee_name`		VARCHAR(100) NOT NULL		 COMMENT 'Nombre del empleado',
	`ext_code`				VARCHAR(100) NOT NULL		 COMMENT 'Còdigo del tipo de movimiento',
    `ext_id` 				INT NULL 					 COMMENT 'ID del tipo de movimiento relación ctt_type_exchange',
PRIMARY KEY (`exc_id`))
COMMENT = 'Movimientos de productos entre almacenes';

DROP TABLE `cttapp_cire`.`ctt_type_exchange`;
CREATE TABLE `cttapp_cire`.`ctt_type_exchange` (
	`ext_id` 				INT NOT NULL AUTO_INCREMENT  COMMENT 'ID del tipo de movimiento',
	`ext_code`				VARCHAR(100) NOT NULL		 COMMENT 'Còdigo del tipo de movimiento',
	`ext_type`				VARCHAR(1) NOT NULL		 	 COMMENT 'Tipo de movimiento E-Entrada, S-Salida, R-Renta',
	`ext_description`		VARCHAR(300) NOT NULL		 COMMENT 'Descripcion del movimiento',
	`ext_link`				INT NULL					 COMMENT 'Relacion con otro movimiento',
	`ext_affect_product`	VARCHAR(5) NOT NULL		 	 COMMENT 'Clave de afectaciòn a la situaciòn del producto',
PRIMARY KEY (`ext_id`))
COMMENT = 'Tipos de movimientos entre almacenes';

DROP TABLE `cttapp_cire`.`ctt_stores_products`;
CREATE TABLE `cttapp_cire`.`ctt_stores_products` (
  	`stp_id` 				INT(11) NOT NULL AUTO_INCREMENT COMMENT 'ID del registro',
  	`stp_quantity` 			INT(11) NOT NULL DEFAULT 0   COMMENT 'Cantidad de productos',
  	`str_id` 				INT(11) NOT NULL 			 COMMENT 'ID del almacen relacion ctt_store',
  	`ser_id` 				INT(11) NOT NULL			 COMMENT 'ID del numerode serie relacion ctt_series',
PRIMARY KEY (`stp_id`))
COMMENT='Tabla de cantidad de productos en almacen';






TRUNCATE TABLE `ctt_accessories`;

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
INSERT INTO `ctt_products` (`prd_id`, `prd_sku`, `prd_name`, `prd_english_name`, `prd_model`, `prd_price`, `prd_coin_type`, `prd_visibility`, `prd_comments`, `prd_status`, `sbc_id`, `sup_id`, `srv_id`) VALUES
(1, '', 'PHANTOM FLEX 2K/4K', 'PHANTOM FLEX 2K / 4K', '', '42000.00', 'pesos', '1', '', '1', 2, 0, 1),
(2, '', 'ARRI ALEXA XT PLUS 4:3', 'ARRI ALEXA XT PLUS 4: 3', '', '32000.00', 'pesos', '1', '', '1', 2, 0, 1),
(3, '', 'ARRI ALEXA XR MODULE', 'ARRI ALEXA XR MODULE', '', '20000.00', 'pesos', '1', '', '1', 2, 0, 1),
(4, '', 'ARRI ALEXA THE ORIGINAL (EV)', 'ARRI ALEXA THE ORIGINAL (EV)', '', '16000.00', 'pesos', '1', '', '1', 2, 0, 1),
(5, '', 'ARRI ALEXA PLUS 16:9', 'ARRI ALEXA PLUS 16: 9', '', '22000.00', 'pesos', '1', '', '1', 2, 0, 1),
(6, '', 'ARRI ALEXA STUDIO', 'ARRI ALEXA STUDIO', '', '23000.00', 'pesos', '1', '', '1', 2, 0, 1),
(7, '', 'ARRI ALEXA M', 'ARRI ALEXA M', '', '24000.00', 'pesos', '1', '', '1', 2, 0, 1),
(8, '', 'ARRI ALEXA MINI 16:9/4:3/ ARRI RAW/ OPEN GATE       ', 'ARRI ALEXA MINI 16:9/4:3/ ARRI RAW/ OPEN GATE       ', '', '33000.00', 'pesos', '1', '', '1', 2, 0, 1),
(9, '', '575 W HMI REFLECTOR PAR LITE', '575 W HMI REFLECTOR PAR LITE', '', '575.00', 'pesos', '1', '', '1', 8, 0, 1),
(10, '', 'CABLE', 'CABLE', '', '1.00', 'pesos', '0', '', '1', 51, 0, 1),
(11, '', 'GASAS', 'GASES', '', '1.00', 'pesos', '0', '', '1', 51, 0, 1),
(12, '', 'ASPAS', 'BLADES', '', '1.00', 'pesos', '0', '', '1', 51, 0, 1),
(13, '', 'BALASTRA', 'BALLAST', '', '1.00', 'pesos', '0', '', '1', 51, 0, 1),
(14, '', 'LENTILLAS', 'CONTACT LENSES', '', '1.00', 'pesos', '0', '', '1', 51, 0, 1),
(15, '', 'BEAMER', 'BEAMER', '', '1.00', 'pesos', '0', '', '1', 51, 0, 1),
(16, '', 'ARO PARA CHIMERA', 'RING FOR CHIMERA', '', '1.00', 'pesos', '0', '', '1', 51, 0, 1);

TRUNCATE TABLE `ctt_profiles`;
INSERT INTO `ctt_profiles` (`prf_id`, `prf_code`, `prf_name`, `prf_description`, `prf_mod_start`) VALUES
(1, 'supuser', 'Super usuario', 'Control total sobre toda la aplicación', 'start');

TRUNCATE TABLE `ctt_series`;
INSERT INTO `ctt_series` (`ser_id`, `ser_sku`, `ser_serial_number`, `ser_cost`, `ser_status`, `ser_situation`, `ser_stage`, `ser_date_registry`, `ser_date_down`, `ser_lonely`, `prd_id`) VALUES
(1, '', '', '0.00', '1', 'D', 'D', '2021-03-17 18:01:33', '2021-03-17 18:01:33', '1', 1),
(2, '', '8901', '0.00', '1', 'D', 'D', '2021-03-17 18:01:34', '2021-03-17 18:01:34', '1', 2),
(3, '', '2519', '0.00', '1', 'D', 'D', '2021-03-17 18:01:34', '2021-03-17 18:01:34', '1', 3),
(4, '', '3076', '0.00', '1', 'D', 'D', '2021-03-17 18:01:34', '2021-03-17 18:01:34', '1', 4),
(5, '', '4007', '0.00', '1', 'D', 'D', '2021-03-17 18:01:34', '2021-03-17 18:01:34', '1', 5),
(6, '', '6057', '0.00', '1', 'D', 'D', '2021-03-17 18:01:34', '2021-03-17 18:01:34', '1', 6),
(7, '', '', '0.00', '1', 'D', 'D', '2021-03-17 18:01:34', '2021-03-17 18:01:34', '1', 7),
(8, '', '22377', '0.00', '1', 'D', 'D', '2021-03-17 18:01:34', '2021-03-17 18:01:34', '1', 8),
(9, '', '21447', '0.00', '1', 'D', 'D', '2021-03-17 18:01:34', '2021-03-17 18:01:34', '1', 8),
(10, '', '20883', '0.00', '1', 'D', 'D', '2021-03-17 18:01:34', '2021-03-17 18:01:34', '1', 8),
(11, '', '20490', '0.00', '1', 'D', 'D', '2021-03-17 18:01:34', '2021-03-17 18:01:34', '1', 8),
(12, '', '24217', '0.00', '1', 'D', 'D', '2021-03-17 18:01:34', '2021-03-17 18:01:34', '1', 8),
(13, '', '25314', '0.00', '1', 'D', 'D', '2021-03-17 18:01:34', '2021-03-17 18:01:34', '1', 8),
(14, '', '22556', '0.00', '1', 'D', 'D', '2021-03-17 18:01:34', '2021-03-17 18:01:34', '1', 8),
(15, '', '1574', '0.00', '1', 'D', 'D', '2021-03-17 18:01:34', '2021-03-17 18:01:34', '1', 9),
(16, '', '946', '0.00', '1', 'D', 'D', '2021-03-17 18:01:34', '2021-03-17 18:01:34', '1', 9),
(17, '', '943', '0.00', '1', 'D', 'D', '2021-03-17 18:01:34', '2021-03-17 18:01:34', '1', 9),
(18, '', '1324', '0.00', '1', 'D', 'D', '2021-03-17 18:01:34', '2021-03-17 18:01:34', '1', 9),
(19, '', 'SN', '0.00', '1', 'D', 'D', '2021-03-17 18:01:34', '2021-03-17 18:01:34', '1', 10),
(20, '', 'SN', '0.00', '1', 'D', 'D', '2021-03-17 18:01:34', '2021-03-17 18:01:34', '1', 11),
(21, '', 'SN', '0.00', '1', 'D', 'D', '2021-03-17 18:01:34', '2021-03-17 18:01:34', '1', 12),
(22, '', 'SN', '0.00', '1', 'D', 'D', '2021-03-17 18:01:34', '2021-03-17 18:01:34', '1', 13),
(23, '', 'SN', '0.00', '1', 'D', 'D', '2021-03-17 18:01:35', '2021-03-17 18:01:35', '1', 14),
(24, '', 'SN', '0.00', '1', 'D', 'D', '2021-03-17 18:01:35', '2021-03-17 18:01:35', '1', 15),
(25, '', 'SN', '0.00', '1', 'D', 'D', '2021-03-17 18:01:35', '2021-03-17 18:01:35', '1', 16);

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

TRUNCATE TABLE `ctt_subcategories`;
INSERT INTO `ctt_subcategories` (`sbc_id`, `sbc_code`, `sbc_name`, `sbc_status`, `cat_id`) VALUES
(1, 'A', 'CABEZAS ESTABILIZADAS', 'A', 1),
(2, 'B', 'CABEZAS', 'A', 1),
(3, 'C', 'ACCESORIOS Y EQUIPO ESPECIAL', 'A', 1),
(4, 'D', 'MONITORES', 'A', 1),
(5, 'E', 'ACCESORIOS ELECTRONICOS', 'A', 1),
(6, 'F', 'CUBIERTAS PARA CÁMARA', 'A', 1),
(7, 'G', 'CLIP ON/ MATTE BOX/ FOLLOW FOCUS', 'A', 1),
(8, 'H', 'MAGAZINES', 'A', 1),
(9, 'I', 'TRIPIES', 'A', 1),
(10, 'J', 'MICRÓFONOS', 'A', 1),
(11, 'K', 'BATERÍAS', 'A', 1),
(12, 'L', 'TARJETAS', 'A', 1),
(13, 'M', 'LECTOR TARJETAS', 'A', 1),
(14, 'N', 'DOWNCONVERTER', 'A', 1),
(15, 'O', 'DISCO DURO', 'A', 1),
(16, 'P', 'DATAS', 'A', 1),
(17, 'Q', 'POSTPRODUCCIÓN', 'A', 1),
(18, 'R', 'ACCESORIOS PAQUETES DE CÁMARA', 'A', 1),
(19, 'S', 'ACCESORIOS PAQUETES DE CÁMARA CINE', 'A', 1),
(20, 'A', 'CÁMARAS', 'A', 2),
(21, 'B', 'CÁMARAS VIDEO FULL HD', 'A', 2),
(22, 'C', 'CÁMARAS DE CINE 35MM', 'A', 2),
(23, 'D', 'CÁMARAS DE CINE 16MM', 'A', 2),
(24, 'A', 'DOLLIES', 'A', 3),
(25, 'B', 'ACCESORIOS PARA DOLLIES', 'A', 3),
(26, 'A', 'SOLIDOS 4X4', 'A', 5),
(27, 'B', 'DEGRADADOS 4X4', 'A', 5),
(28, 'C', 'NEUTRAL DENSITY 4X4', 'A', 5),
(29, 'D', 'DIFUSIÓN 4X4', 'A', 5),
(30, 'E', 'CONTRASTE 4X4', 'A', 5),
(31, 'F', 'POLARIZADORES 4X4', 'A', 5),
(32, 'G', 'CORRECCIÓN 4X4', 'A', 5),
(33, 'H', 'EFECTOS 4X4', 'A', 5),
(34, 'I', 'IR 4X4', 'A', 5),
(35, 'A', 'SOLIDOS 6.6 x6.6\"', 'A', 6),
(36, 'B', 'DEGRADADOS 6.6 x6.6\"', 'A', 6),
(37, 'C', 'NEUTRAL DENSITY 6.6 x 6.6\"', 'A', 6),
(38, 'D', 'DIFUSIÓN 6.6 x6.6\"', 'A', 6),
(39, 'E', 'CONTRASTE 6.6 x6.6\"', 'A', 6),
(40, 'F', 'POLA 6.6 x6.6\"', 'A', 6),
(41, 'G', 'CORRECCIÓN 6.6 x6.6\"', 'A', 6),
(42, 'H', 'EFECTOS 6.6 x6.6\"', 'A', 6),
(43, 'I', 'IR 6.6 x6.6\"', 'A', 6),
(44, 'A', '138MM', 'A', 7),
(45, 'B', '4- 1/2\"', 'A', 7),
(46, 'C', '4x 5.65\"', 'A', 7),
(47, 'A', 'HMI ARRI MAX', 'A', 8),
(48, 'AA', 'MALETAS LEDS', 'A', 8),
(49, 'AB', 'CHIMERAS', 'A', 8),
(50, 'AC', 'CONTROLES/ TRANSMISORES/ CONSOLAS', 'A', 8),
(51, 'B', 'HMI PAR LITE', 'A', 8),
(52, 'C', 'HMI FRESNEL', 'A', 8),
(53, 'D', 'HMI GOYA', 'A', 8),
(54, 'E', 'HMI K5600', 'A', 8),
(55, 'F', 'HMI JOKERS', 'A', 8),
(56, 'G', 'SUN GUNS', 'A', 8),
(57, 'H', 'CHIMERAS Y EGG CRATES', 'A', 8),
(58, 'I', 'TUNGSTENO', 'A', 8),
(59, 'J', 'TUNGSTENO PAR LITE', 'A', 8),
(60, 'K', 'TUNGSTENO CUARZO', 'A', 8),
(61, 'L', 'TUNGSTENO DEDO LITE', 'A', 8),
(62, 'M', 'TUNGSTENO MINIBRUTOS', 'A', 8),
(63, 'N', 'TUNGSTENO MAXIBRUTOS ,RUBY 7 Y PAR 64', 'A', 8),
(64, 'O', 'ILUMINACIÓN TUNGSTENO CICLORAMA LITE', 'A', 8),
(65, 'P', 'ILUMINACIÓN TUNGSTENO SKY Y SPACE LITE', 'A', 8),
(66, 'Q', 'ILUMINACIÓN TUNGSTENO SOFT LITE', 'A', 8),
(67, 'R', 'ILUMINACIÓN TUNGSTENO SOURCE FOUR', 'A', 8),
(68, 'T', 'SEGUIDOR DE TEATRO', 'A', 8),
(69, 'U', 'RGB Y EFECTOS', 'A', 8),
(70, 'V', 'ILUMINACIÓN KINO FLO 3,200 K/ 5,600K', 'A', 8),
(71, 'W', 'ELÉCTRICOS', 'A', 8),
(72, 'X', 'ILUMINACIÓN EFECTOS', 'A', 8),
(73, 'Y', 'LEDS BICOLOR', 'A', 8),
(74, 'Z', 'TAPETES LEDS BICOLOR', 'A', 8),
(75, 'A', 'JIBS Y GRUAS', 'A', 9),
(76, 'B', 'Súper Techno Telescopic', 'A', 9),
(77, 'E', 'Foxy Advanced ', 'A', 9),
(78, 'G', 'GIBS', 'A', 9),
(79, 'H', 'Grúa CamMate', 'A', 9),
(80, 'I', 'Scorpio', 'A', 9),
(81, 'A', 'COOKE S4/i 35 MM', 'A', 10),
(82, 'AA', 'COOKE S7 FULL FRAME', 'A', 10),
(83, 'AB', 'COOKE PANCHRO/i CLASSIC', 'A', 10),
(84, 'AC', 'ANGENIEUX OPTIMO PRIME', 'A', 10),
(85, 'B', 'MINI COOKE S4/i 35 MM', 'A', 10),
(86, 'C', 'MASTER PRIMER', 'A', 10),
(87, 'D', 'ULTRA PRIME 35 MM', 'A', 10),
(88, 'E', 'ULTRA PRIME LDS 35 MM', 'A', 10),
(89, 'F', 'ULTRA PRIME 16 MM', 'A', 10),
(90, 'G', 'TELEFOTO', 'A', 10),
(91, 'H', 'ZOOM 35MM', 'A', 10),
(92, 'I', 'ZOOM 16MM', 'A', 10),
(93, 'J', 'VARIABLE PRIME', 'A', 10),
(94, 'K', 'MACRO', 'A', 10),
(95, 'L', 'CLOSE FOCUS', 'A', 10),
(96, 'M', 'ANGULARES', 'A', 10),
(97, 'N', 'HIGH SPEED 35MM', 'A', 10),
(98, 'O', 'HIGH SPEED 16MM', 'A', 10),
(99, 'P', 'NORMAL SPEED 35MM', 'A', 10),
(100, 'Q', 'SWING & SHIFT', 'A', 10),
(101, 'R', 'SET DE LENTES', 'A', 10),
(102, 'S', 'OTROS LENTES', 'A', 10),
(103, 'T', 'EXTENDERS', 'A', 10),
(104, 'U', 'VIEWFINDER', 'A', 10),
(105, 'V', 'LEICA SUMMILUX-C EXTRAS', 'A', 10),
(106, 'W', 'COOKE ANAMÓRFICO', 'A', 10),
(107, 'X', 'COMPACT PRIME', 'A', 10),
(108, 'Y', 'SUPREME PRIME', 'A', 10),
(109, 'Z', 'WHITE POINT', 'A', 10),
(110, 'A', 'PAQUETES CON MAXIMÓVIL', 'A', 11),
(111, 'B', 'PAQUETES CON MÓVIL', 'A', 11),
(112, 'C', 'PAQUETES CON MINIMÓVIL', 'A', 11),
(113, 'D', 'PAQUETES CON MINIMÓVIL HMI', 'A', 11),
(114, 'E', 'PAQUETES DE FILMACIÓN CON MICROMÓVIL', 'A', 11),
(115, 'F', 'VANDAYLIGHT', 'A', 11),
(116, 'H', 'PAQUETES DE FILMACIÓN CON MINIMAX', 'A', 11),
(117, 'I', 'MOVIL', 'A', 11),
(118, 'J', 'MINIMOVILES', 'A', 11),
(119, 'K', 'MINIMAX', 'A', 11),
(120, 'L', 'VAN', 'A', 11),
(121, 'M', 'TRANSPORTACIÓN', 'A', 11),
(122, 'N', 'TRANSPORTACIÓN CAMARA', 'A', 11),
(123, 'O', 'TRANSPORTACIÓN BODEGA', 'A', 11),
(124, 'A', 'PLANTAS GENERADORAS GENERALES', 'A', 12),
(125, 'B', 'GENERADORES PORTÁTILES', 'A', 12),
(126, 'E', 'PLANTAS GENERADORAS', 'A', 12),
(127, 'A', 'TEXTILES', 'A', 13),
(128, 'B', 'CROMAS', 'A', 13),
(129, 'C', 'MARCOS PARA TEXTILES', 'A', 13),
(130, 'D', 'BANDERAS', 'A', 13),
(131, 'E', 'GOBOS', 'A', 13),
(132, 'F', 'FLOPPY', 'A', 13),
(133, 'G', 'JUEGO DE FINGERS', 'A', 13),
(134, 'A', 'TRAMOYA', 'A', 14),
(135, 'C', 'CARROS PARA TRANSPORTAR TRAMOYA', 'A', 14);

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
