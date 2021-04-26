DROP TABLE `cttapp_cire`.`ctt_suppliers_type`;
CREATE TABLE `cttapp_cire`.`ctt_suppliers_type` (
    `sut_id`                INT NOT NULL AUTO_INCREMENT     COMMENT 'Id del tipo de proveedor',
    `sut_code`              VARCHAR(1) NULL                 COMMENT 'Código del tipo de proveedor',
    `sut_name`              VARCHAR(100) NULL               COMMENT 'Nombre del tipo de proveddor',
    `sut_status`            VARCHAR(1) NULL                 COMMENT 'Estatus del tipo de proveedor 1-Activo, 0-Inactivo',
PRIMARY KEY (`sut_id`))
COMMENT = 'Tipos de proveedores de la empresa.';


ALTER TABLE `cttapp_cire`.`ctt_suppliers` ADD COLUMN `sut_id` INT NULL AFTER `sup_status`;


TRUNCATE TABLE `ctt_suppliers_type`;


INSERT INTO `ctt_suppliers_type` (`sut_id`, `sut_code`, `sut_name`, `sut_status`) VALUES
(1, 'I', 'INTERNACIONAL', '1'),
(2, 'N', 'NACIONAL', '1'),
(3, 'R', 'SUBARRENDO', '1');