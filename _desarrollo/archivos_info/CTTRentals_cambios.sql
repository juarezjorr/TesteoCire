-- 2 de Abril 2021

ALTER TABLE `cttapp_cire`.`ctt_documents` ADD COLUMN `doc_type` VARCHAR(10) NULL COMMENT 'Extension del docuemnto' AFTER `doc_name`;
