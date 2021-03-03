-- CREATE DATABASE `cttapp_cire` 

DROP TABLE `cttapp_cire`.`ctt_users`;
DROP TABLE `cttapp_cire`.`ctt_profiles`;
DROP TABLE `cttapp_cire`.`ctt_modules`;
DROP TABLE `cttapp_cire`.`ctt_profile_module`;
DROP TABLE `cttapp_cire`.`ctt_user_module`;
DROP TABLE `cttapp_cire`.`ctt_employees`;
DROP TABLE `cttapp_cire`.`ctt_post`;
DROP TABLE `cttapp_cire`.`ctt_menu`;
DROP TABLE `cttapp_cire`.`ctt_stores`;
DROP TABLE `cttapp_cire`.`ctt_categories`;
DROP TABLE `cttapp_cire`.`ctt_subcategories`;
DROP TABLE `cttapp_cire`.`ctt_services`;
DROP TABLE `cttapp_cire`.`ctt_suppliers`;
DROP TABLE `cttapp_cire`.`ctt_products`;
DROP TABLE `cttapp_cire`.`ctt_product_document`;
DROP TABLE `cttapp_cire`.`ctt_documents`;
DROP TABLE `cttapp_cire`.`ctt_accessories`;
DROP TABLE `cttapp_cire`.`ctt_actions`;
DROP TABLE `cttapp_cire`.`ctt_activity_log`;
DROP TABLE `cttapp_cire`.`ctt_store_exchange`;
DROP TABLE `cttapp_cire`.`ctt_type_exchange`;
DROP TABLE `cttapp_cire`.`ctt_store_product`;


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


CREATE TABLE `cttapp_cire`.`ctt_profiles` (
	`prf_id` 				INT NOT NULL AUTO_INCREMENT  COMMENT 'ID del perfil',
	`prf_code`				VARCHAR(50) NOT NULL		 COMMENT 'Código del perfi',
	`prf_name`				VARCHAR(50) NULL			 COMMENT 'Nombre del perfil',
	`prf_description`		VARCHAR(300) NULL			 COMMENT 'Descripción del perfil',
	`prf_mod_start` 		VARCHAR(50) NULL			 COMMENT 'ID del modulo de inicio',
PRIMARY KEY (`prf_id`))
COMMENT = 'Tabla de Perfiles';


CREATE TABLE `cttapp_cire`.`ctt_modules` (
	`mod_id` 				INT NOT NULL AUTO_INCREMENT  COMMENT 'ID del módulo',
	`mod_code`				VARCHAR(50) NOT NULL		 COMMENT 'Código del modulo',
	`mod_name`				VARCHAR(50) NULL			 COMMENT 'Nombre del modulo',
	`mod_description`		VARCHAR(300) NULL			 COMMENT 'Descripción del módulo',
	`mod_item`				VARCHAR(50) NULL			 COMMENT 'Elemento URL destino',
PRIMARY KEY (`mod_id`))
COMMENT = 'Tabla de Módulos que componen el sistema';


CREATE TABLE `cttapp_cire`.`ctt_profile_module` (
	`pfm_id` 				INT NOT NULL AUTO_INCREMENT  COMMENT 'ID de la relacion perfil - modulo',
	`prf_id` 				INT NOT NULL		 		 COMMENT 'FK ID del perfil relacion ctt_profile',
	`mod_id` 				INT NOT NULL			 	 COMMENT 'FK ID del modulo relación ctt_modulo',
PRIMARY KEY (`pfm_id`))
COMMENT = 'Tabla pivote m_to_m ctt_profile - ctt_modulo';


CREATE TABLE `cttapp_cire`.`ctt_user_module` (
	`urm_id` 				INT NOT NULL AUTO_INCREMENT  COMMENT 'ID de la relacion usuario - modulo',
	`usr_id` 				INT NOT NULL		 		 COMMENT 'FK ID del usuario relacion ctt_users',
	`mod_id` 				INT NOT NULL			 	 COMMENT 'FK ID del modulo relación ctt_modules',
PRIMARY KEY (`urm_id`))
COMMENT = 'Tabla pivote m_to_m ctt_usuarios - ctt_modules';


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


CREATE TABLE `cttapp_cire`.`ctt_post` (
	`pos_id` 				INT NOT NULL AUTO_INCREMENT  COMMENT 'ID del puesto',
	`pos_name`				VARCHAR(50) NOT NULL		 COMMENT 'Nombre del puesto',
	`pos_description`		VARCHAR(300) NOT NULL		 COMMENT 'Descripción del puesto',
	`pos_status`			VARCHAR(1) NULL			 	 COMMENT 'Estatus del puesto 1-Activo, 0-Inactivo',
PRIMARY KEY (`pos_id`))
COMMENT = 'Tabla de los empleados de la empresa';


CREATE TABLE `cttapp_cire`.`ctt_menu` (
	`mnu_id` 				INT NOT NULL AUTO_INCREMENT  COMMENT 'ID del menu',
	`mnu_parent`			INT NULL		 			 COMMENT 'ID del menu padre',
	`mnu_item`				VARCHAR(100) NOT NULL		 COMMENT 'Elementos del menu',
	`mnu_description`		VARCHAR(300) NULL			 COMMENT 'Descripción del elemento del menu',
	`mod_id`				INT NULL		 			 COMMENT 'ID del modulo relación ctt_module',
PRIMARY KEY (`mnu_id`))
COMMENT = 'Tabla de los elementos que componene el menu susperior';

CREATE TABLE `cttapp_cire`.`ctt_stores` (
	`str_id` 				INT NOT NULL AUTO_INCREMENT  COMMENT 'ID del almacén',
	`str_name`				VARCHAR(100) NULL 			 COMMENT 'Nombre del almacén',
	`str_status`			VARCHAR(1) NULL		 		 COMMENT 'Estatus del almacen 1-Activo, 0-Inactivo',
	`str_type`				VARCHAR(100) NULL			 COMMENT 'Tipo de almacén',
PRIMARY KEY (`str_id`))
COMMENT = 'Listado de almacenes.';

CREATE TABLE `cttapp_cire`.`ctt_categories` (
	`cat_id` 				INT NOT NULL AUTO_INCREMENT  COMMENT 'ID del catálogo',
	`cat_name`				VARCHAR(100) NULL 			 COMMENT 'Nombre del catálogo',
	`cat_status`			VARCHAR(1) NULL		 		 COMMENT 'Estatus del catálogo 1-Activo, 0-Inactivo',
PRIMARY KEY (`cat_id`))
COMMENT = 'Catálogo.';

CREATE TABLE `cttapp_cire`.`ctt_subcategories` (
	`sbc_id` 				INT NOT NULL AUTO_INCREMENT  COMMENT 'ID de la subcategoría',
	`sbc_code`				VARCHAR(10) NULL 			 COMMENT 'Clave de la subcategoría',
	`sbc_name`				VARCHAR(100) NULL 			 COMMENT 'Nombre de la subcategoría',
	`sbc_status`			VARCHAR(1) NULL		 		 COMMENT 'Estatus de la subcategoría 1-Activo, 0-Inactivo',
	`cat_id` 				INT NOT NULL   				 COMMENT 'ID del catálogo relación ctt_categories',
PRIMARY KEY (`sbc_id`))
COMMENT = 'Subcategorias.';

CREATE TABLE `cttapp_cire`.`ctt_services` (
	`srv_id` 				INT NOT NULL AUTO_INCREMENT  COMMENT 'ID del servicio',
	`srv_name`				VARCHAR(100) NULL 			 COMMENT 'Nombre del servicio',
	`srv_description`		VARCHAR(300) NULL 			 COMMENT 'Nombre del servicio',
	`srv_status`			VARCHAR(1) NULL		 		 COMMENT 'Estatus del servicio 1-Activo, 0-Inactivo',
PRIMARY KEY (`srv_id`))
COMMENT = 'Tipificación de los servicios.';

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

CREATE TABLE `cttapp_cire`.`ctt_products` (
	`prd_id` 				INT NOT NULL AUTO_INCREMENT  COMMENT 'ID del proveedor',
	`prd_sku`				VARCHAR(10) NULL 			 COMMENT 'SKU identificador del producto',
    `prd_name`				VARCHAR(100) NULL 			 COMMENT 'Nombre del producto',
	`prd_english_name`		VARCHAR(100)  NULL 			 COMMENT 'Nombre del producto en ingles',
    `prd_model`				VARCHAR(50) NULL 			 COMMENT 'Modelo del producto',
	`prd_serial_number`		VARCHAR(50)  NULL 			 COMMENT 'Numero de serie del producto',
	`prd_cost`				decimal(10,2)  NULL			 COMMENT 'Costo unitario del producto',
    `prd_price`				decimal(10,2)  NULL			 COMMENT 'Precio unitario del producto',
	`prd_coin_type`			VARCHAR(30)  NULL 			 COMMENT 'Tipo de moneda',
    `prd_date_registry`		datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de registro del producto',
    `prd_date_down`			datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de baja del producto',
	`prd_visibility`		VARCHAR(1) NULL		 		 COMMENT 'Visibilidad del producto en cotización 1-visible, 0-no visible',
    `prd_comments`			VARCHAR(300) NULL	 		 COMMENT 'Observaciones',
    `prd_status`			VARCHAR(1) NULL		 		 COMMENT 'Estatus del producto 1-Activo, 0-Inactivo',
    `sbc_id` 				INT NULL 					 COMMENT 'ID de la subcategoría relacion ctt_subcategories',
    `sup_id` 				INT NULL 					 COMMENT 'ID de la proveedor relacion ctt_suppliers',
    `srv_id` 				INT NULL 					 COMMENT 'ID del tipo de servicio relacion ctt_services',
PRIMARY KEY (`prd_id`))
COMMENT = 'Productos de la empresa.';

CREATE TABLE `cttapp_cire`.`ctt_products_documents` (
	`dcp_id` 				INT NOT NULL AUTO_INCREMENT  COMMENT 'ID de relacion producto-documento',
    `prd_id` 				INT NULL 					 COMMENT 'ID del producto relacion ctt_productos',
	`doc_id`				INT NULL		 	 		 COMMENT 'ID del documento relación ctt_documents',
PRIMARY KEY (`dcp_id`))
COMMENT = 'Relación de documentos con productos';

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

CREATE TABLE `cttapp_cire`.`ctt_accessories` (
	`acr_id` 				INT NOT NULL AUTO_INCREMENT  COMMENT 'ID del accesorio',
	`acr_parent`			INT NULL		 			 COMMENT 'ID del producto padre',
    `acr_status`			VARCHAR(1)  NULL		 	 COMMENT 'Estatus del accesorio D-Disponible, N-No disponible',
	`prd_id`				INT NULL					 COMMENT 'Id del producto relaciòn ctt_products',
PRIMARY KEY (`acr_id`))
COMMENT = 'Productos o accesorios dependientes de otros productos';

CREATE TABLE `cttapp_cire`.`ctt_actions` (
	`acc_id` 				INT NOT NULL AUTO_INCREMENT  COMMENT 'ID de la acción',
	`acc_description`		VARCHAR(300) NOT NULL		 COMMENT 'Descripción de la acción realizada por el usuario en un modulo',
	`acc_type`				VARCHAR(50) NOT NULL		 COMMENT 'Tipo de accion',
	`mod_id` 				INT NULL 					 COMMENT 'ID del modulo relacion ctt_module',
PRIMARY KEY (`acc_id`))
COMMENT = 'Tabla de tipos de acciones realizadas por un usuario dentro del sistema';

CREATE TABLE `cttapp_cire`.`ctt_activity_log` (
	`log_id` 				INT NOT NULL AUTO_INCREMENT  COMMENT 'ID de la bitácora',
	`log_date`				DATETIME NULL DEFAULT CURRENT_TIMESTAMP  COMMENT 'Fecha de registro de la actividad',
	`log_event`				VARCHAR(100) NOT NULL		 COMMENT 'Detalle de la acción realizada',
    `emp_number`			VARCHAR(50) NOT NULL		 COMMENT 'Numero del empleado',
	`emp_fullname`			VARCHAR(100) NOT NULL		 COMMENT 'Nombre del empleado',
    `acc_id` 				INT NULL 					 COMMENT 'ID de la accion relacion ctt_actions',
PRIMARY KEY (`log_id`))
COMMENT = 'Bitácora de actividades realizadas en el sistema';

CREATE TABLE `cttapp_cire`.`ctt_store_exchange` (
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

CREATE TABLE `cttapp_cire`.`ctt_type_exchange` (
	`ext_id` 				INT NOT NULL AUTO_INCREMENT  COMMENT 'ID del tipo de movimiento',
	`ext_code`				VARCHAR(100) NOT NULL		 COMMENT 'Còdigo del tipo de movimiento',
	`ext_type`				VARCHAR(1) NOT NULL		 	 COMMENT 'Tipo de movimiento E-Entrada, S-Salida, R-Renta',
	`ext_description`		VARCHAR(300) NOT NULL		 COMMENT 'Descripcion del movimiento',
	`ext_link`				INT NULL					 COMMENT 'Relacion con otro movimiento',
PRIMARY KEY (`ext_id`))
COMMENT = 'Tipos de movimientos entre almacenes';

CREATE TABLE `cttapp_cire`.`ctt_store_product` (
  	`stp_id` 				INT(11) NOT NULL AUTO_INCREMENT COMMENT 'ID del registro',
  	`stp_quantity` 			INT(11) NOT NULL DEFAULT 0   COMMENT 'Cantidad de productos',
  	`str_id` 				INT(11) NOT NULL 			 COMMENT 'ID del almacen relacion ctt_store',
  	`prd_id` 				INT(11) NOT NULL			 COMMENT 'ID del producto relacion ctt_products',
PRIMARY KEY (`stp_id`))
COMMENT='Tabla de cantidad de productos en almacen';



