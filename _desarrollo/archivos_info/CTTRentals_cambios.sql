-- Actualizacion del 04 de agosto 2021

INSERT INTO ctt_modules (mod_code,mod_name,mod_description,mod_item) values ('prodet','Proyectos','Modulo de proyectos','ProjecDetails');
INSERT INTO ctt_menu (mnu_parent,mnu_item,mnu_description,mnu_order,mod_id) values (2,'Proyectos','Detalle de proyectos',2,29);
INSERT INTO ctt_users_modules (usr_id,mod_id) values (1,29);
UPDATE ctt_menu SET mnu_order = 3 WHERE mnu_id = 11;
UPDATE ctt_menu SET mnu_order = 4 WHERE mnu_id = 18;


ALTER TABLE `cttapp_cire`.`ctt_series` 
ADD COLUMN `ser_reserve_start` DATETIME NULL AFTER `ser_date_down`,
ADD COLUMN `ser_reserve_end` DATETIME NULL AFTER `ser_reserve_start`;

ALTER TABLE `cttapp_cire`.`ctt_series` 
CHANGE COLUMN `ser_reserve_start` `ser_reserve_start` DATETIME NULL DEFAULT NULL COMMENT 'Fecha de reservado comienzo' ,
CHANGE COLUMN `ser_reserve_end` `ser_reserve_end` DATETIME NULL DEFAULT NULL COMMENT 'Fecha de reservado termino' ;


ALTER TABLE `cttapp_cire`.`ctt_budget` 
CHANGE COLUMN `bdg_prod_level` `bdg_prod_level` VARCHAR(1) NULL DEFAULT 'P' COMMENT 'Nivel del producto  K=Kit, P=Producto' AFTER `bdg_prod_price`;
ALTER TABLE `cttapp_cire`.`ctt_budget` COMMENT = 'Cotizaciones generadas' ;

ALTER TABLE `cttapp_cire`.`ctt_series` 
ADD COLUMN `ser_reserve_count` INT NULL COMMENT 'Contador de rentas' AFTER `ser_reserve_end`,
ADD COLUMN `pjtdt_id` INT NULL COMMENT 'Id del detalle de proyecto relacion ctt_projects_detail' AFTER `cin_id`;


CREATE TABLE `cttapp_cire`.`ctt_proyects_detail` (
    `pjtdt_id`                   INT NOT NULL AUTO_INCREMENT    COMMENT 'Id del detalle de proyecto',
    `pjtdt_prod_sku`             VARCHAR(15)  NULL              COMMENT 'SKU identificador del producto',
    `pjtdt_prod_name`            VARCHAR(100) NULL              COMMENT 'Nombre del producto',
    `pjtdt_prod_price`           DECIMAL(10,2) NULL             COMMENT 'Precio unitario del producto',
    `pjtdt_prod_level`           VARCHAR(1) DEFAULT 'P'         COMMENT 'Nivel del producto  K=Kit, P=Producto',
    `pjtdt_quantity`             INT NULL                       COMMENT 'Cantidad de productos',
    `pjtdt_days_base`            INT NULL                       COMMENT 'Días solicitados en renta',
    `pjtdt_discount_base`        DECIMAL(10,2) NULL             COMMENT 'Descuento aplicado a la renta',
    `pjtdt_days_trip`            INT NULL                       COMMENT 'Días solicitados en viaje',
    `pjtdt_discount_trip`        DECIMAL(10,2) NULL             COMMENT 'Descuento aplicado al viaje',
    `pjtdt_days_test`            INT NULL                       COMMENT 'Días solicitados en prueba',
    `pjtdt_discount_test`        DECIMAL(10,2) NULL             COMMENT 'Descuento aplicado en prueba',
    `pjtdt_insured`              DECIMAL(10,2) NULL DEFAULT .1  COMMENT 'Porcentaje de seguro',
    `pjtdt_status`               VARCHAR(1) NULL DEFAULT 1      COMMENT 'Estatus de la serie 1-Activo, 0-Inactivo',
    `ver_id`                     INT NOT NULL                   COMMENT 'FK Id de la version relación ctt_version',
    `ser_id`                     INT NOT NULL                   COMMENT 'FK Id de la serie relación ctt_series',
    `pjt_id`                     INT NOT NULL                   COMMENT 'FK Id del proyecto relación ctt_projects',

PRIMARY KEY (`pjtdt_id`)) 
COMMENT='Detalle del proyecto, cotización promovida';

