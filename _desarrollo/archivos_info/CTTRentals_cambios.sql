-- Actualizacion del 3 de septiembre 2021


ALTER TABLE ctt_proyects_detail RENAME TO  ctt_projects_detail ;
ALTER TABLE ctt_projects_detail CHANGE COLUMN pjt_id pjtcn_id INT(11) NOT NULL COMMENT 'FK Id del proyecto relación ctt_projects_content' ;
ALTER TABLE ctt_projects_detail DROP COLUMN ver_id;
CREATE TABLE `cttapp_cire`.`ctt_projects_content` (
    `pjtcn_id`                  INT NOT NULL AUTO_INCREMENT    COMMENT 'Id del contenido del projecto',
    `pjtcn_prod_sku`            VARCHAR(15)  NULL              COMMENT 'SKU identificador del producto',
    `pjtcn_prod_name`           VARCHAR(100) NULL              COMMENT 'Nombre del producto',
    `pjtcn_prod_price`          DECIMAL(10,2) NULL             COMMENT 'Precio unitario del producto',
    `pjtcn_quantity`            INT NULL                       COMMENT 'Cantidad de productos',
    `pjtcn_days_base`           INT NULL                       COMMENT 'Días solicitados en renta',
    `pjtcn_discount_base`       DECIMAL(10,2) NULL             COMMENT 'Descuento aplicado a la renta',
    `pjtcn_days_trip`           INT NULL                       COMMENT 'Días solicitados en viaje',
    `pjtcn_discount_trip`       DECIMAL(10,2) NULL             COMMENT 'Descuento aplicado al viaje',
    `pjtcn_days_test`           INT NULL                       COMMENT 'Días solicitados en prueba',
    `pjtcn_discount_test`       DECIMAL(10,2) NULL             COMMENT 'Descuento aplicado en prueba',
    `pjtcn_insured`             DECIMAL(10,2) NULL DEFAULT .1  COMMENT 'Porcentaje de seguro',
    `pjtcn_prod_level`          VARCHAR(1) DEFAULT 'P'         COMMENT 'Nivel del producto  K=Kit, P=Producto',
    `pjtcn_status`              VARCHAR(1) DEFAULT '1'         COMMENT 'Status del contendo del proyecto 1-activo 0-inactivo',
    `ver_id`                    INT NOT NULL                   COMMENT 'FK Id de la version relación ctt_version',
    `prd_id`                    INT NOT NULL                   COMMENT 'FK Id del producto relación ctt_products',
    `pjt_id`                    INT NOT NULL                   COMMENT 'FK Id del proyecto relación ctt_proyect',
PRIMARY KEY (`pjtcn_id`)) COMMENT='Contenido del proyecto cotización promovida';




