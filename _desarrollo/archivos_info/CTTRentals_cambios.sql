


ALTER TABLE `cttapp_cire`.`ctt_products` 
ADD COLUMN `prd_level` VARCHAR(1) NULL DEFAULT 'P' COMMENT 'Nivel del producto  K=Kit, P=Producto' AFTER `prd_status`,
ADD COLUMN `exm_id` INT NULL DEFAULT 1 COMMENT 'ID del tipo de moneda relacion ctt_exchange_currency' AFTER `srv_id`;


DROP TABLE `cttapp_cire`.`ctt_packages_products`;
CREATE TABLE `cttapp_cire`.`ctt_packages_products` (
	`pck_id` 				INT NOT NULL AUTO_INCREMENT  COMMENT 'ID dela relaión paquete producto',
	`prd_parent`			INT NULL		 			 COMMENT 'ID del producto padre',
	`prd_id`				INT NULL					 COMMENT 'Id del producto hijo relaciòn ctt_products',
PRIMARY KEY (`pck_id`))
COMMENT = 'Tabla pivote que relaiona los productos a un paquete';




INSERT INTO `ctt_menu` (`mnu_id`, `mnu_parent`, `mnu_item`, `mnu_description`, `mod_id`) VALUES
(18, 3, 'Lista de precios', 'Seccion dela lista de precios', 18);

INSERT INTO `ctt_modules` (`mod_id`, `mod_code`, `mod_name`, `mod_description`, `mod_item`) VALUES
(18, 'prclst', 'Lista de precios', 'Modulo de la lista de precios', 'ProductsPriceList');

INSERT INTO `ctt_users_modules` (`urm_id`, `usr_id`, `mod_id`) VALUES
(18, 1, 18);



