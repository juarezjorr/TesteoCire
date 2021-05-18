-- 18 de Mayo 2021

 
ALTER TABLE `cttapp_cire`.`ctt_products` CHANGE COLUMN `prd_sku` `prd_sku` VARCHAR(15) NULL DEFAULT NULL COMMENT 'SKU identificador del producto' ;
ALTER TABLE `cttapp_cire`.`ctt_series` CHANGE COLUMN `ser_sku` `ser_sku` VARCHAR(15) NULL DEFAULT NULL COMMENT 'SKU identificador del producto' ;
ALTER TABLE `cttapp_cire`.`ctt_stores_exchange` CHANGE COLUMN `exc_sku_product` `exc_sku_product` VARCHAR(15) NOT NULL COMMENT 'SKU del producto' ;


