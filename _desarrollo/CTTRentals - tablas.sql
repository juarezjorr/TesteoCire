DROP TABLE `cttrentals`.`ctt_users`;
DROP TABLE `cttrentals`.`ctt_profiles`;
DROP TABLE `cttrentals`.`ctt_modules`;
DROP TABLE `cttrentals`.`ctt_profile_module`;
DROP TABLE `cttrentals`.`ctt_user_module`;

CREATE TABLE `cttrentals`.`ctt_users` (
  `usr_id` 				INT NOT NULL AUTO_INCREMENT  COMMENT 'ID del usuario',
  `usr_username` 		VARCHAR(45) NOT NULL		 COMMENT 'Usuario',
  `usr_password` 		VARCHAR(45) NULL			 COMMENT 'Contraseña del Usuario',
  `usr_fullname` 		VARCHAR(300) NULL			 COMMENT 'Nombre completo del usuario',
  `usr_phone` 			VARCHAR(45) NULL			 COMMENT 'Numero de telefono del usuario',
  `usr_dt_registry` 	DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Fecha de registro del usuario en el sistema',
  `usr_dt_last_access` 	DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Fecha de ultimo acceso al sistema',
  `usr_dt_change_pwd` 	DATETIME NULL DEFAULT (NOW() + 180) COMMENT 'Fecha proxima definida del cambio de sistema',
  `prf_id` 				INT NULL 					 COMMENT 'ID del perfil relacion usuario - perfil',
  PRIMARY KEY (`usr_id`))
COMMENT = 'Tabla de Usuarios registrados';

CREATE TABLE `cttrentals`.`ctt_profiles` (
  `prf_id` 				INT NOT NULL AUTO_INCREMENT  COMMENT 'ID del perfil',
  `prf_code` 			VARCHAR(50) NOT NULL		 COMMENT 'Código del perfi',
  `prf_name` 			VARCHAR(50) NULL			 COMMENT 'Nombre del perfil',
  `prf_description`		VARCHAR(300) NULL			 COMMENT 'Descripción del perfil',
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


