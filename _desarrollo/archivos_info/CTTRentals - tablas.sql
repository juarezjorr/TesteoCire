-- CREATE DATABASE `cttapp_cire` 


DROP TABLE `cttapp_cire`.`ctt_accesories`;
CREATE TABLE `cttapp_cire`.`ctt_accesories` (
    `acr_id`                INT NOT NULL AUTO_INCREMENT     COMMENT 'Id del accesorio',
    `acr_parent`            INT NOT NULL                    COMMENT 'Id del producto padre',
    `acr_status`            VARCHAR(1) NOT NULL             COMMENT 'Estatus del accesorio D-Disponible, N-No disponible',
    `prd_id`                INT NOT NULL                    COMMENT 'Id del producto relaciòn ctt_products',
PRIMARY KEY (`acr_id`))
COMMENT = 'Productos o accesorios dependientes de otros productos';


DROP TABLE `cttapp_cire`.`ctt_actions`;
CREATE TABLE `cttapp_cire`.`ctt_actions` (
    `acc_id`                 INT NOT NULL AUTO_INCREMENT    COMMENT 'Id de la acción',
    `acc_description`        VARCHAR(300) NOT NULL          COMMENT 'Descripción de la acción realizada por el usuario en un modulo',
    `acc_type`               VARCHAR(50) NOT NULL           COMMENT 'Tipo de accion',
    `mod_id`                 INT NULL                       COMMENT 'Id del modulo relacion ctt_module',
PRIMARY KEY (`acc_id`))
COMMENT = 'Tabla de tipos de acciones realizadas por un usuario dentro del sistema';


DROP TABLE `cttapp_cire`.`ctt_activity_log`;
CREATE TABLE `cttapp_cire`.`ctt_activity_log` (
    `log_id`                 INT NOT NULL AUTO_INCREMENT    COMMENT 'Id de la bitácora',
    `log_date`               DATETIME NULL DEFAULT CURRENT_TIMESTAMP  COMMENT 'Fecha de registro de la actividad',
    `log_event`              VARCHAR(100) NOT NULL          COMMENT 'Detalle de la acción realizada',
    `emp_number`             VARCHAR(50) NOT NULL           COMMENT 'Numero del empleado',
    `emp_fullname`           VARCHAR(100) NOT NULL          COMMENT 'Nombre del empleado',
    `acc_id`                 INT NULL                       COMMENT 'Id de la accion relacion ctt_actions',
PRIMARY KEY (`log_id`))
COMMENT = 'Bitácora de actividades realizadas en el sistema';


DROP TABLE `cttapp_cire`.`ctt_areas`;
CREATE TABLE `cttapp_cire`.`ctt_areas` (
  `are_id`                   INT NOT NULL AUTO_INCREMENT    COMMENT 'Id del área',
  `are_name`                 VARCHAR(50)                    COMMENT 'nombre del área',
  `are_status`               INT DEFAULT 1                  COMMENT 'Estatus del área 1-activo 0-inactivo',
PRIMARY KEY (`are_id`)) 
COMMENT='Áreas organizacionales de la empresa';




DROP TABLE `cttapp_cire`.`ctt_budget`;
CREATE TABLE `cttapp_cire`.`ctt_budget` (
  `bdg_id`                   INT NOT NULL AUTO_INCREMENT    COMMENT 'Id de la cotización',
  `bdg_prod_sku`             VARCHAR(15)  NULL              COMMENT 'SKU identificador del producto',
  `bdg_prod_name`            VARCHAR(100) NULL              COMMENT 'Nombre del producto',
  `bdg_prod_price`           DECIMAL(10,2) NULL             COMMENT 'Precio unitario del producto',
  `bdg_quantity`             INT NULL                       COMMENT 'Cantidad de productos',
  `bdg_days_base`            INT NULL                       COMMENT 'Días solicitados en renta',
  `bdg_discount_base`        DECIMAL(10,2) NULL             COMMENT 'Descuento aplicado a la renta',
  `bdg_days_trip`            INT NULL                       COMMENT 'Días solicitados en viaje',
  `bdg_discount_trip`        DECIMAL(10,2) NULL             COMMENT 'Descuento aplicado al viaje',
  `bdg_days_test`            INT NULL                       COMMENT 'Días solicitados en prueba',
  `bdg_discount_test`        DECIMAL(10,2) NULL             COMMENT 'Descuento aplicado en prueba',
  `bdg_insured`              DECIMAL(10,2) NULL DEFAULT .1  COMMENT 'Porcentaje de seguro',
  `ver_id`                   INT NOT NULL                   COMMENT 'FK Id de la version relación ctt_version',
  `prd_id`                   INT NOT NULL                   COMMENT 'FK Id del producto relación ctt_products',

PRIMARY KEY (`bdg_id`)) 
COMMENT='Áreas organizacionales de la empresa';



DROP TABLE `cttapp_cire`.`ctt_categories`;
CREATE TABLE `cttapp_cire`.`ctt_categories` (
    `cat_id`                INT NOT NULL AUTO_INCREMENT     COMMENT 'Id del catálogo',
    `cat_name`              VARCHAR(100) NULL               COMMENT 'Nombre del catálogo',
    `cat_status`            VARCHAR(1) NULL DEFAULT 1       COMMENT 'Estatus del catálogo 1-Activo, 0-Inactivo',
    `str_id`                INT NULL                        COMMENT 'Id del almacen relacion ctt_stores',
PRIMARY KEY (`cat_id`))
COMMENT = 'Corresponde a los catalogos de la organización.';


DROP TABLE `cttapp_cire`.`ctt_coins`;
CREATE TABLE `cttapp_cire`.`ctt_coins` (
    `cin_id`                INT NOT NULL AUTO_INCREMENT     COMMENT 'Id de la moneda',
    `cin_code`              VARCHAR(3)                      COMMENT 'Clave de la moneda',
    `cin_number`            INT                             COMMENT 'Numero de la moneda',
    `cin_name`              VARCHAR(100)                    COMMENT 'Nombre de la moneda',
    `cin_status`            INT DEFAULT 1                   COMMENT 'Estatus de la moneda 1-activo 0-inactivo',
PRIMARY KEY (`cin_id`)) 
COMMENT='Tabla catalogo de monedas';


DROP TABLE `cttapp_cire`.`ctt_customers`;
CREATE TABLE `cttapp_cire`.`ctt_customers` (
    `cus_id`                INT NOT NULL AUTO_INCREMENT     COMMENT 'Id del cliente',
    `cus_name`              VARCHAR(100)                    COMMENT 'Nombre del cliente',
    `cus_contact`           VARCHAR(50)                     COMMENT 'nombre del contacto',
    `cus_address`           VARCHAR(300)                    COMMENT 'Domicilio del cliente',
    `cus_email`             VARCHAR(100)                    COMMENT 'Correo electrónico del cliente',
    `cus_phone`             VARCHAR(100)                    COMMENT 'Teléfono del cliente',
    `cus_qualification`     VARCHAR(10)                     COMMENT 'Calificación del cliente',
    `cus_prospect`          VARCHAR(1) DEFAULT 0            COMMENT 'Registro de cliente 1-cliente 0-prospecto',
    `cus_sponsored`         VARCHAR(1) DEFAULT 0            COMMENT 'Cliente con patrocinio 1-con patrocinio 0-sin patrocinio',
    `cut_id`                INT NOT NULL                    COMMENT 'Tipo de cliente relacion con ctt_customer_type',
    `cus_status`            INT DEFAULT 1                   COMMENT 'Estatus de la moneda 1-activo 0-inactivo',
PRIMARY KEY (`cos_id`)) 
COMMENT='Clientes y prospectos de cliente';



DROP TABLE `cttapp_cire`.`ctt_customers_type`;
CREATE TABLE `cttapp_cire`.`ctt_customers_type` (
    `cut_id`                INT NOT NULL AUTO_INCREMENT     COMMENT 'Id del tipo de cliente',
    `cut_name`              VARCHAR(50)                     COMMENT 'Nombre del tipo de cliente',
PRIMARY KEY (`cut_id`)) 
COMMENT='Catálogo de tipos de cliente ';



DROP TABLE `cttapp_cire`.`ctt_customers_owner`;
CREATE TABLE `cttapp_cire`.`ctt_customers_owner` (
    `cuo_id`                INT NOT NULL AUTO_INCREMENT     COMMENT 'Id de la relacion',
    `cus_id`                INT                             COMMENT 'Id del cliente',
    `cus_parent`            INT                             COMMENT 'Id del cliente relación',
PRIMARY KEY (`cuo_id`)) 
COMMENT='Relacion de clientes pertenecientes a otros clientes';


DROP TABLE `cttapp_cire`.`ctt_counter_exchange`;
CREATE TABLE `cttapp_cire`.`ctt_counter_exchange` (
    `con_id`                INT NOT NULL AUTO_INCREMENT     COMMENT 'Id del contador',
    `con_date`              DATETIME NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de registro del movimiento',
    `con_status`            INT DEFAULT 1                   COMMENT 'Estatus del folio 1-activo 0-inactivo',
PRIMARY KEY (`con_id`)) 
COMMENT='Tabla generador de folios';


DROP TABLE `cttapp_cire`.`ctt_documents`;
CREATE TABLE `cttapp_cire`.`ctt_documents` (
    `doc_id`                INT NOT NULL AUTO_INCREMENT     COMMENT 'Id del documento',
    `doc_code`              VARCHAR(100) NULL               COMMENT 'Código del documento',
    `doc_name`              VARCHAR(100) NULL               COMMENT 'Nombre del documento',
    `doc_type`              VARCHAR(10) NULL                COMMENT 'Extension del docuemnto',
    `doc_size`              INT NULL                        COMMENT 'Tamaño del documento',
    `doc_content_type`      VARCHAR(100) NULL               COMMENT 'Tipo del contenido del documento',
    `doc_document`          BLOB NULL                       COMMENT 'Contenido del documento',
    `dot_id`                INT NULL                        COMMENT 'Id del tipo de documento relacion ctt_documents_type',
PRIMARY KEY (`doc_id`))
COMMENT = 'Documentos de productos';


DROP TABLE `cttapp_cire`.`ctt_documents_type`;
CREATE TABLE `cttapp_cire`.`ctt_documents_type` (
    `dot_id`                INT NOT NULL AUTO_INCREMENT     COMMENT 'Id del tipo de documento',
    `dot_code`              VARCHAR(10) NULL                COMMENT 'código del tipo de documento',
    `dot_name`              VARCHAR(100) NULL               COMMENT 'Nombre del tipo documento',
    `dot_status`            VARCHAR(1) NULL DEFAULT 1       COMMENT 'Estatus del tipo de documento  1-Activo, 0-Inactivo',
PRIMARY KEY (`dot_id`))
COMMENT = 'Tipos de documentos de productos';



DROP TABLE `cttapp_cire`.`ctt_employees`;
CREATE TABLE `cttapp_cire`.`ctt_employees` (
    `emp_id`                INT NOT NULL AUTO_INCREMENT     COMMENT 'Id del empleado',
    `emp_number`            VARCHAR(50) NOT NULL            COMMENT 'Numero del empleado',
    `emp_fullname`          VARCHAR(100) NOT NULL           COMMENT 'Nombre del empleado',
    `emp_area`              VARCHAR(50) NULL                COMMENT 'Area a la que pertenece el empleado',
    `emp_report_to`         INT NULL DEFAULT 0              COMMENT 'Id del empleado jefe inmediato relacion asi mismo',
    `emp_status`            VARCHAR(1) NULL                 COMMENT 'Estatus del empleado 1-Activo, 0-Inactivo',
    `pos_id`                INT NULL                        COMMENT 'Id del puesto relación ctt_post',
    `are_id`                INT NULL                        COMMENT 'Id del area relacion con ctt_areas',
PRIMARY KEY (`emp_id`))
COMMENT = 'Tabla de los empleados de la empresa';


DROP TABLE `cttapp_cire`.`ctt_location`;
CREATE TABLE `cttapp_cire`.`ctt_location` (
    `loc_id`                INT NOT NULL AUTO_INCREMENT     COMMENT 'Id de la locación',
    `loc_location`          VARCHAR(100) NULL               COMMENT 'Ubicación de la locación',
    `loc_country`           VARCHAR(100) NULL               COMMENT 'Pais de la locación',
    `loc_type_location`     VARCHAR(100) NULL               COMMENT 'Tipo de locación',
PRIMARY KEY (`loc_id`))
COMMENT = 'Locación en donde se llevara la filmación';



DROP TABLE `cttapp_cire`.`ctt_menu`;
CREATE TABLE `cttapp_cire`.`ctt_menu` (
    `mnu_id`                INT NOT NULL AUTO_INCREMENT     COMMENT 'Id del menu',
    `mnu_parent`            INT NULL                        COMMENT 'Id del menu padre',
    `mnu_item`              VARCHAR(100) NOT NULL           COMMENT 'Elementos del menu',
    `mnu_description`       VARCHAR(300) NULL               COMMENT 'Descripción del elemento del menu',
    `mnu_order`             INT NULL                        COMMENT 'Ordenamiento de los elementos del menu para su presentación',
    `mod_id`                INT NULL                        COMMENT 'Id del modulo relación ctt_module',
PRIMARY KEY (`mnu_id`))
COMMENT = 'Tabla de los elementos que componen el menu susperior';



DROP TABLE `cttapp_cire`.`ctt_modules`;
CREATE TABLE `cttapp_cire`.`ctt_modules` (
    `mod_id`                INT NOT NULL AUTO_INCREMENT     COMMENT 'Id del módulo',
    `mod_code`              VARCHAR(50) NOT NULL            COMMENT 'Código del modulo',
    `mod_name`              VARCHAR(50) NULL                COMMENT 'Nombre del modulo',
    `mod_description`       VARCHAR(300) NULL               COMMENT 'Descripción del módulo',
    `mod_item`              VARCHAR(50) NULL                COMMENT 'metodo que corresponde la sección',
PRIMARY KEY (`mod_id`))
COMMENT = 'Tabla de Módulos que componen el sistema';



DROP TABLE `cttapp_cire`.`ctt_position`;
CREATE TABLE `cttapp_cire`.`ctt_position` (
    `pos_id`                INT NOT NULL AUTO_INCREMENT     COMMENT 'Id del puesto',
    `pos_name`              VARCHAR(50) NOT NULL            COMMENT 'Nombre del puesto',
    `pos_description`       VARCHAR(300) NOT NULL           COMMENT 'Descripción del puesto',
    `pos_status`            VARCHAR(1) NULL                 COMMENT 'Estatus del puesto 1-Activo, 0-Inactivo',
PRIMARY KEY (`pos_id`))
COMMENT = 'Puestos de empleados en la empresa';




DROP TABLE `cttapp_cire`.`ctt_products`;
CREATE TABLE `cttapp_cire`.`ctt_products` (
    `prd_id`                INT NOT NULL AUTO_INCREMENT     COMMENT 'Id del proveedor',
    `prd_sku`               VARCHAR(15) NULL                COMMENT 'SKU identificador del producto',
    `prd_name`              VARCHAR(100) NULL               COMMENT 'Nombre del producto',
    `prd_english_name`      VARCHAR(100)  NULL              COMMENT 'Nombre del producto en ingles',
    `prd_model`             VARCHAR(50) NULL                COMMENT 'Modelo del producto',
    `prd_price`             DECIMAL(10,2)  NULL             COMMENT 'Precio unitario del producto',
    `prd_visibility`        VARCHAR(1) NULL                 COMMENT 'Visibilidad del producto en cotización 1-visible, 0-no visible',
    `prd_comments`          VARCHAR(300) NULL               COMMENT 'Observaciones',
    `prd_status`            VARCHAR(1) NULL                 COMMENT 'Estatus del producto 1-Activo, 0-Inactivo',
    `prd_level`             VARCHAR(1) DEFAULT 'P'          COMMENT 'Nivel del producto  K=Kit, P=Producto',
    `prd_lonely`            VARCHAR(1)                      COMMENT 'Se puede rentar sin accesosrios 1-si, 0-no',
    `prd_assured`           VARCHAR(1)                      COMMENT 'Cotiza seguro 1-si, 0-no',
    `doc_id`                INT NULL                        COMMENT 'Id del docuemnto para relacionar la ficha técnica ctt_products_documents',
    `sbc_id`                INT NULL                        COMMENT 'Id de la subcategoría relacion ctt_subcategories',
    `srv_id`                INT NULL                        COMMENT 'Id del tipo de servicio relacion ctt_services',
    `cin_id`                INT NULL                        COMMENT 'Id del tipo de moneda relacion ctt_coins',
PRIMARY KEY (`prd_id`))
COMMENT = 'Productos de la empresa.';



DROP TABLE `cttapp_cire`.`ctt_products_documents`;
CREATE TABLE `cttapp_cire`.`ctt_products_documents` (
    `dcp_id`                INT NOT NULL AUTO_INCREMENT     COMMENT 'Id de relacion producto-documento',
    `dcp_id_source`         INT NULL                        COMMENT 'Id del producto o serie',
    `doc_id`                INT NULL                        COMMENT 'Id del documento relación ctt_documents',
PRIMARY KEY (`dcp_id`))
COMMENT = 'Relación de documentos con productos';



DROP TABLE `cttapp_cire`.`ctt_products_packages`;
CREATE TABLE `cttapp_cire`.`ctt_products_packages` (
    `pck_id`                INT NOT NULL AUTO_INCREMENT     COMMENT 'Id dela relaión paquete producto',
    `prd_parent`            INT NULL                        COMMENT 'Id del producto padre',
    `prd_id`                INT NULL                        COMMENT 'Id del producto hijo relaciòn ctt_products',
PRIMARY KEY (`pck_id`))
COMMENT = 'Tabla pivote que relaiona los productos a un paquete';




DROP TABLE `cttapp_cire`.`ctt_profiles`;
CREATE TABLE `cttapp_cire`.`ctt_profiles` (
    `prf_id`                INT NOT NULL AUTO_INCREMENT     COMMENT 'Id del perfil',
    `prf_code`              VARCHAR(50) NOT NULL            COMMENT 'Código del perfi',
    `prf_name`              VARCHAR(50) NULL                COMMENT 'Nombre del perfil',
    `prf_description`       VARCHAR(300) NULL               COMMENT 'Descripción del perfil',
    `prf_mod_start`         VARCHAR(50) NULL                COMMENT 'Id del modulo de inicio',
    `prf_status`            VARCHAR(1) NULL DEFAULT 1       COMMENT 'Estatus del perfil 1-Activo, 0-Inactivo',
PRIMARY KEY (`prf_id`))
COMMENT = 'Tabla de Perfiles';



DROP TABLE `cttapp_cire`.`ctt_profiles_modules`;
CREATE TABLE `cttapp_cire`.`ctt_profiles_modules` (
    `pfm_id`                INT NOT NULL AUTO_INCREMENT     COMMENT 'Id de la relacion perfil - modulo',
    `prf_id`                INT NOT NULL                    COMMENT 'FK Id del perfil relacion ctt_profile',
    `mod_id`                INT NOT NULL                    COMMENT 'FK Id del modulo relación ctt_modulo',
PRIMARY KEY (`pfm_id`))
COMMENT = 'Tabla pivote m_to_m ctt_profile - ctt_modulo';



DROP TABLE `cttapp_cire`.`ctt_projects`;
CREATE TABLE `cttapp_cire`.`ctt_projects` (
      `pjt_id`              INT NOT NULL AUTO_INCREMENT     COMMENT 'Id del proyecto',
      `pjt_number`          VARCHAR(50)                     COMMENT 'Numero del proyecto',
      `pjt_name`            VARCHAR(100)                    COMMENT 'Nombre del proyecto',
      `pjt_date_project`    DATETIME NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de generación del proyecto',
      `pjt_date_start`      DATETIME NULL                   COMMENT 'Fecha de inicio del proyecto',
      `pjt_date_end`        DATETIME NULL                   COMMENT 'Fecha de fin del proyecto',
      `pjt_location`        VARCHAR(200) NULL               COMMENT 'Ubicación del desarrollo del proyecto',
      `pjt_status`          VARCHAR(1) NULL DEFAULT 1       COMMENT 'Estatus del proyecto 1-Activo, 0-Inactivo',
      `cuo_id`              INT NOT NULL                    COMMENT 'FK Id de propietario relacion con ctt_costumer_owner',
      `loc_id`              INT NOT NULL                    COMMENT 'FK Id de la locación relación ctt_location',
PRIMARY KEY (`pjt_id`))
COMMENT='proyectos registrados';



DROP TABLE `cttapp_cire`.`ctt_series`;
CREATE TABLE `cttapp_cire`.`ctt_series` (
    `ser_id`                INT NOT NULL AUTO_INCREMENT     COMMENT 'Id de la serie',
    `ser_sku`               VARCHAR(15) NULL                COMMENT 'SKU identificador del producto',
    `ser_serial_number`     VARCHAR(50)  NULL               COMMENT 'Numero de serie del producto',
    `ser_cost`              DECIMAL(10,2)  NULL             COMMENT 'Costo unitario del producto',
    `ser_status`            VARCHAR(1) NULL                 COMMENT 'Estatus del producto 1-Activo, 0-Inactivo',
    `ser_situation`         VARCHAR(5)  NULL                COMMENT 'Situación de estatus dentro del proceso ',
    `ser_stage`             VARCHAR(5) NULL                 COMMENT 'Etapa dentro del proceso',
    `ser_date_registry`     DATETIME NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de registro del producto',
    `ser_date_down`         DATETIME NULL                   COMMENT 'Fecha de baja del producto',
    `ser_behaviour`         VARCHAR(1) NOT NULL             COMMENT 'Comportamiento del producto C-Compra, R-Renta',
    `prd_id`                INT NULL                        COMMENT 'Id del producto relacion ctt_productos',
    `sup_id`                INT NULL                        COMMENT 'Id de la proveedor relacion ctt_suppliers',
    `cin_id`                INT NULL                        COMMENT 'Id del tipo de moneda relacion ctt_coins',
PRIMARY KEY (`ser_id`))
COMMENT = 'Numero serie de productos correspondientes a un modelo.';




DROP TABLE `cttapp_cire`.`ctt_services`;
CREATE TABLE `cttapp_cire`.`ctt_services` (
    `srv_id`                INT NOT NULL AUTO_INCREMENT     COMMENT 'Id del servicio',
    `srv_name`              VARCHAR(100) NULL               COMMENT 'Nombre del servicio',
    `srv_description`       VARCHAR(300) NULL               COMMENT 'Descripcion del servicio',
    `srv_status`            VARCHAR(1) NULL                 COMMENT 'Estatus del servicio 1-Activo, 0-Inactivo',
PRIMARY KEY (`srv_id`))
COMMENT = 'Tipificación de los servicios.';



DROP TABLE `cttapp_cire`.`ctt_stores`;
CREATE TABLE `cttapp_cire`.`ctt_stores` (
    `str_id`                INT NOT NULL AUTO_INCREMENT     COMMENT 'Id del almacén',
    `str_name`              VARCHAR(100) NULL               COMMENT 'Nombre del almacén',
    `str_status`            VARCHAR(1) NULL                 COMMENT 'Estatus del almacen 1-Activo, 0-Inactivo',
    `str_type`              VARCHAR(100) NULL               COMMENT 'Tipo de almacén',
    `emp_id`                INT NULL                        COMMENT 'Id del empleado relacion ctt_employees',
PRIMARY KEY (`str_id`))
COMMENT = 'Listado de almacenes.';



DROP TABLE `cttapp_cire`.`ctt_stores_exchange`;
CREATE TABLE `cttapp_cire`.`ctt_stores_exchange` (
    `exc_id`                INT NOT NULL AUTO_INCREMENT     COMMENT 'Id del movimiento',
    `exc_date`              DATETIME NULL DEFAULT CURRENT_TIMESTAMP  COMMENT 'Fecha de registro del movimiento',
    `exc_sku_product`       VARCHAR(15) NOT NULL           COMMENT 'SKU del producto',
    `exc_product_name`      VARCHAR(200) NOT NULL           COMMENT 'Nombre del producto',
    `exc_quantity`          INT NULL                        COMMENT 'Cantidad de piezas',
    `exc_serie_product`     VARCHAR(200) NOT NULL           COMMENT 'Numero de series del producto',
    `exc_store`             VARCHAR(50) NOT NULL            COMMENT 'Almacen que afecto el movimiento',
    `exc_comments`          VARCHAR(300) NOT NULL           COMMENT 'Comentarios referentes al movimiento',
    `exc_proyect`           VARCHAR(100) NOT NULL           COMMENT 'Nombre del proyecto',
    `exc_employee_name`     VARCHAR(100) NOT NULL           COMMENT 'Nombre del empleado',
    `ext_code`              VARCHAR(100) NOT NULL           COMMENT 'Còdigo del tipo de movimiento',
    `con_id`                INT NULL                        COMMENT 'Id del folio relación ctt_counter_exchange',
    `ext_id`                INT NULL                        COMMENT 'Id del tipo de movimiento relación ctt_type_exchange',
    `cin_id`                INT NULL                        COMMENT 'Id del tipo de moneda relación ctt_coins',
PRIMARY KEY (`exc_id`))
COMMENT = 'Movimientos de productos entre almacenes';




DROP TABLE `cttapp_cire`.`ctt_stores_products`;
CREATE TABLE `cttapp_cire`.`ctt_stores_products` (
      `stp_id`              INT NOT NULL AUTO_INCREMENT     COMMENT 'Id del registro',
      `stp_quantity`        INT NOT NULL DEFAULT 0          COMMENT 'Cantidad de productos',
      `str_id`              INT NOT NULL                    COMMENT 'Id del almacen relacion ctt_store',
      `ser_id`              INT NOT NULL                    COMMENT 'Id del numero de serie relacion ctt_series',
PRIMARY KEY (`stp_id`))
COMMENT='Tabla de cantidad de productos en almacen';





DROP TABLE `cttapp_cire`.`ctt_subcategories`;
CREATE TABLE `cttapp_cire`.`ctt_subcategories` (
    `sbc_id`                INT NOT NULL AUTO_INCREMENT     COMMENT 'Id de la subcategoría',
    `sbc_code`              VARCHAR(10) NULL                COMMENT 'Clave de la subcategoría',
    `sbc_name`              VARCHAR(100) NULL               COMMENT 'Nombre de la subcategoría',
    `sbc_behaviour`         VARCHAR(2) NULL                 COMMENT 'Comportamiento de la subcategoría',
    `sbc_status`            VARCHAR(1) NULL DEFAULT 1       COMMENT 'Estatus de la subcategoría 1-Activo, 0-Inactivo',
    `cat_id`                INT NOT NULL                    COMMENT 'Id del catálogo relación ctt_categories',
PRIMARY KEY (`sbc_id`))
COMMENT = 'Subcategorias.';




DROP TABLE `cttapp_cire`.`ctt_subletting`;
CREATE TABLE `cttapp_cire`.`ctt_subletting` (
    `sub_id`                INT NOT NULL AUTO_INCREMENT     COMMENT 'Id del subarrendo',
    `sub_price`             DECIMAL(10,2)  NULL DEFAULT 0   COMMENT 'precio de renta del producto por unidad',
    `sub_quantity`          INT NULL                        COMMENT 'Cantidad de piezas subarrendadas',
    `sub_date_start`        DATETIME NULL                   COMMENT 'Fecha de inicio de periodo de subarrendo',
    `sub_date_end`          DATETIME NULL                   COMMENT 'Fecha de término de periodo de subarrendo',
    `sub_comments`          VARCHAR(300) NOT NULL           COMMENT 'Comentarios referentes al subarrendo',
    `ser_id`                INT NULL                        COMMENT 'Id del serial del producto relacion ctt_serial',
    `sup_id`                INT NULL                        COMMENT 'Id del proveedor relacion ctt_suppliers',
    `prj_id`                INT NULL                        COMMENT 'Id del proyecto ',
    `cin_id`                INT NULL                        COMMENT 'Id del tipo de moneda relación ctt_coins',
PRIMARY KEY (`sub_id`))
COMMENT='Tabla de situación de subarrendos';



DROP TABLE `cttapp_cire`.`ctt_suppliers`;
CREATE TABLE `cttapp_cire`.`ctt_suppliers` (
    `sup_id`                INT NOT NULL AUTO_INCREMENT     COMMENT 'Id del proveedor',
    `sup_buseiness_name`    VARCHAR(100) NULL               COMMENT 'Nombre de la empresa',
    `sup_contact`           VARCHAR(100) NULL               COMMENT 'Nombre del responsable',
    `sup_rfc`               VARCHAR(15)  NULL               COMMENT 'Registro Federal de Contribuyentes',
    `sup_email`             VARCHAR(100)  NULL              COMMENT 'Correo electrónico',
    `sup_phone`             VARCHAR(100)  NULL              COMMENT 'Número telefónico',
    `sup_status`            VARCHAR(1) NULL                 COMMENT 'Estatus del proveedor 1-Activo, 0-Inactivo',
    `sut_id`                INT NULL                        COMMENT 'Id del tipo de proveedor relación ctt_suppliers_type',
PRIMARY KEY (`sup_id`))
COMMENT = 'Proveedores de la empresa.';



DROP TABLE `cttapp_cire`.`ctt_suppliers_type`;
CREATE TABLE `cttapp_cire`.`ctt_suppliers_type` (
    `sut_id`                INT NOT NULL AUTO_INCREMENT     COMMENT 'Id del tipo de proveedor',
    `sut_code`              VARCHAR(1) NULL                 COMMENT 'Código del tipo de proveedor',
    `sut_name`              VARCHAR(100) NULL               COMMENT 'Nombre del tipo de proveddor',
    `sut_status`            VARCHAR(1) NULL                 COMMENT 'Estatus del tipo de proveedor 1-Activo, 0-Inactivo',
PRIMARY KEY (`sut_id`))
COMMENT = 'Tipos de proveedores de la empresa.';


DROP TABLE `cttapp_cire`.`ctt_type_exchange`;
CREATE TABLE `cttapp_cire`.`ctt_type_exchange` (
    `ext_id`                INT NOT NULL AUTO_INCREMENT     COMMENT 'Id del tipo de movimiento',
    `ext_code`              VARCHAR(100) NOT NULL           COMMENT 'Còdigo del tipo de movimiento',
    `ext_type`              VARCHAR(1) NOT NULL             COMMENT 'Tipo de movimiento E-Entrada, S-Salida, R-Renta',
    `ext_description`       VARCHAR(300) NOT NULL           COMMENT 'Descripcion del movimiento',
    `ext_link`              INT NULL                        COMMENT 'Relacion con otro movimiento',
    `ext_affect_product`    VARCHAR(5) NOT NULL             COMMENT 'Clave de afectaciòn a la situaciòn del producto',
    `ext_elements`          VARCHAR(10) NOT NULL            COMMENT 'Elementos que se muestan en la interfase',
PRIMARY KEY (`ext_id`))
COMMENT = 'Tipos de movimientos entre almacenes';





DROP TABLE `cttapp_cire`.`ctt_users`;
CREATE TABLE `cttapp_cire`.`ctt_users` (
    `usr_id`                INT NOT NULL AUTO_INCREMENT     COMMENT 'Id del usuario',
    `usr_username`          VARCHAR(45) NOT NULL            COMMENT 'Usuario',
    `usr_password`          VARCHAR(200) NULL               COMMENT 'Contraseña del Usuario',
    `usr_dt_registry`       DATETIME NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de registro del usuario en el sistema',
    `usr_dt_last_access`    DATETIME NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de ultimo acceso al sistema',
    `usr_dt_change_pwd`     DATETIME NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha proxima definida del cambio de sistema',
    `usr_status`            VARCHAR(1) NULL                 COMMENT 'Estatus del usuario 1-Activo, 0-Inactivo',
    `prf_id`                INT NULL                        COMMENT 'Id del perfil relacion ctt_profiles',
    `emp_id`                INT NULL                        COMMENT 'Id del empleado relacion ctt_employees',
PRIMARY KEY (`usr_id`))
COMMENT = 'Tabla de Usuarios registrados';




DROP TABLE `cttapp_cire`.`ctt_users_modules`;
CREATE TABLE `cttapp_cire`.`ctt_users_modules` (
    `urm_id`                INT NOT NULL AUTO_INCREMENT     COMMENT 'Id de la relacion usuario - modulo',
    `usr_id`                INT NOT NULL                    COMMENT 'FK Id del usuario relacion ctt_users',
    `mod_id`                INT NOT NULL                    COMMENT 'FK Id del modulo relación ctt_modules',
PRIMARY KEY (`urm_id`))
COMMENT = 'Tabla pivote m_to_m ctt_usuarios - ctt_modules';



DROP TABLE `cttapp_cire`.`ctt_version`;
CREATE TABLE `cttapp_cire`.`ctt_version` (
    `ver_id`                INT NOT NULL AUTO_INCREMENT     COMMENT 'Id de la version',
    `ver_code`              VARCHAR(20) NULL                COMMENT 'Código de la version',
    `ver_date`              DATETIME NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de generación del documento',
    `ver_status`            VARCHAR(1) NULL                 COMMENT 'Código de la version',
    `pjt_id`                INT NOT NULL                    COMMENT 'FK Id del projeto relación ctt_projects',
PRIMARY KEY (`ver_id`))
COMMENT = 'Version de docuemntos de cotización';



