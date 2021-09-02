-- Actualizacion del 31 de agosto 2021

ALTER TABLE ctt_products
ADD COLUMN prd_code_provider VARCHAR(30) NULL DEFAULT NULL COMMENT 'Código del producto segun proveedor' AFTER prd_english_name,
ADD COLUMN prd_name_provider VARCHAR(100) NULL DEFAULT NULL COMMENT 'Nombre del producto segun proveedor' AFTER prd_code_provider;
ALTER TABLE ctt_series
ADD COLUMN ser_comments VARCHAR(500) NULL COMMENT 'Comentarios sobre la serie del producto' AFTER ser_behaviour;

UPDATE ctt_modules SET mod_item = 'Products' WHERE (mod_id = '10');



