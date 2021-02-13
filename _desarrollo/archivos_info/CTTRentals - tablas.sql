-- CREATE DATABASE `cttrentals` 

DROP TABLE `cttrentals`.`ctt_users`;
DROP TABLE `cttrentals`.`ctt_profiles`;
DROP TABLE `cttrentals`.`ctt_modules`;
DROP TABLE `cttrentals`.`ctt_profile_module`;
DROP TABLE `cttrentals`.`ctt_user_module`;
DROP TABLE `cttrentals`.`ctt_employees`;
DROP TABLE `cttrentals`.`ctt_post`;


CREATE TABLE `cttrentals`.`ctt_users` (
  `usr_id` 				INT NOT NULL AUTO_INCREMENT  COMMENT 'ID del usuario',
  `usr_username` 		VARCHAR(45) NOT NULL		 COMMENT 'Usuario',
  `usr_password` 		VARCHAR(200) NULL			 COMMENT 'Contraseña del Usuario',
  `usr_dt_registry` 	DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Fecha de registro del usuario en el sistema',
  `usr_dt_last_access` 	DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Fecha de ultimo acceso al sistema',
  `usr_dt_change_pwd` 	DATETIME NULL DEFAULT (NOW() + 180) COMMENT 'Fecha proxima definida del cambio de sistema',
  `prf_id` 				INT NULL 					 COMMENT 'ID del perfil relacion usuario - perfil',
  `emp_id` 				INT NULL 					 COMMENT 'ID del empleado relacion ctt_employees',
  PRIMARY KEY (`usr_id`))
COMMENT = 'Tabla de Usuarios registrados';


CREATE TABLE `cttrentals`.`ctt_profiles` (
  `prf_id` 				INT NOT NULL AUTO_INCREMENT  COMMENT 'ID del perfil',
  `prf_code` 			VARCHAR(50) NOT NULL		 COMMENT 'Código del perfi',
  `prf_name` 			VARCHAR(50) NULL			 COMMENT 'Nombre del perfil',
  `prf_description`		VARCHAR(300) NULL			 COMMENT 'Descripción del perfil',
  `prf_mod_start` 		VARCHAR(50) NULL			 COMMENT 'ID del modulo de inicio',
  PRIMARY KEY (`prf_id`))
COMMENT = 'Tabla de Perfiles';


CREATE TABLE `cttrentals`.`ctt_modules` (
  `mod_id` 				INT NOT NULL AUTO_INCREMENT  COMMENT 'ID del módulo',
  `mod_code` 			VARCHAR(50) NOT NULL		 COMMENT 'Código del modulo',
  `mod_name` 			VARCHAR(50) NULL			 COMMENT 'Nombre del modulo',
  `mod_description`		VARCHAR(300) NULL			 COMMENT 'Descripción del módulo',
  PRIMARY KEY (`mod_id`))
COMMENT = 'Tabla de Módulos que componen el sistema';


CREATE TABLE `cttrentals`.`ctt_profile_module` (
  `pfm_id` 				INT NOT NULL AUTO_INCREMENT  COMMENT 'ID de la relacion perfil - modulo',
  `prf_id` 				INT NOT NULL		 		 COMMENT 'FK ID del perfil relacion ctt_profile',
  `mod_id` 				INT NOT NULL			 	 COMMENT 'FK ID del modulo relación ctt_modulo',
  PRIMARY KEY (`pfm_id`))
COMMENT = 'Tabla pivote m_to_m ctt_profile - ctt_modulo';


CREATE TABLE `cttrentals`.`ctt_user_module` (
  `urm_id` 				INT NOT NULL AUTO_INCREMENT  COMMENT 'ID de la relacion usuario - modulo',
  `usr_id` 				INT NOT NULL		 		 COMMENT 'FK ID del usuario relacion ctt_users',
  `mod_id` 				INT NOT NULL			 	 COMMENT 'FK ID del modulo relación ctt_modules',
  PRIMARY KEY (`urm_id`))
COMMENT = 'Tabla pivote m_to_m ctt_usuarios - ctt_modules';


CREATE TABLE `cttrentals`.`ctt_employees` (
  `emp_id` 				INT NOT NULL AUTO_INCREMENT  COMMENT 'ID del empleado',
  `emp_number`			VARCHAR(50) NOT NULL		 COMMENT 'Numero del empleado',
  `emp_fullname`		VARCHAR(100) NOT NULL		 COMMENT 'Nombre del empleado',
  `emp_area` 			VARCHAR(50) NULL			 COMMENT 'Area a la que pertenece el empleado',
  `emp_status`			VARCHAR(1) NULL			 	 COMMENT 'Estatus del empleado 1-activo, 2-inactivo',
  `pos_id`				INT NULL			 	 	 COMMENT 'ID del puesto relación ctt_post',
  PRIMARY KEY (`emp_id`))
COMMENT = 'Tabla de los empleados de la empresa';


CREATE TABLE `cttrentals`.`ctt_post` (
  `pos_id` 				INT NOT NULL AUTO_INCREMENT  COMMENT 'ID del puesto',
  `pos_name`			VARCHAR(50) NOT NULL		 COMMENT 'Nombre del puesto',
  `pos_description`		VARCHAR(300) NOT NULL		 COMMENT 'Descripción del puesto',
  `pos_status`			VARCHAR(1) NULL			 	 COMMENT 'Estatus del puesto 1-activo, 2-inactivo',
  PRIMARY KEY (`pos_id`))
COMMENT = 'Tabla de los empleados de la empresa';
