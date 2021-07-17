-- Actualizacion del 15 de julio 2021

ALTER TABLE `cttapp_cire`.`ctt_products` CHANGE COLUMN `prd_assured` `prd_assured` VARCHAR(1) NULL DEFAULT 0 COMMENT 'Cotiza seguro 1-si, 0-no' ;
