DROP TABLE `cttapp_cire`.`ctt_prod_documents`;
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
    `doc_document`			BLOB NULL		 			 COMMENT 'Contenido del documento',
PRIMARY KEY (`doc_id`))
COMMENT = 'Documentos de productos';

ALTER TABLE `cttapp_cire`.`ctt_store_exchange` RENAME TO  `cttapp_cire`.`ctt_stores_exchange` ;
ALTER TABLE `cttapp_cire`.`ctt_store_product` RENAME TO  `cttapp_cire`.`ctt_stores_products` ;
ALTER TABLE `cttapp_cire`.`ctt_user_module` RENAME TO  `cttapp_cire`.`ctt_users_modules` ;
ALTER TABLE `cttapp_cire`.`ctt_profile_module` RENAME TO  `cttapp_cire`.`ctt_profiles_modules` ;