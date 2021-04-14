<?php
defined('BASEPATH') or exit('No se permite acceso directo');

//////////////////////////////////////
// Valores de uri
/////////////////////////////////////

define('URI', $_SERVER['REQUEST_URI']);

define('REQUEST_METHOD', $_SERVER['REQUEST_METHOD']);

//////////////////////////////////////
// Valores de rutas
/////////////////////////////////////

define('FOLDER_PATH', '/cttrentals');               /* DESARROLLO LOCAL */
//define('FOLDER_PATH', '/TesteoCire');               /* DESARROLLO REMOTO */


define('ROOT', $_SERVER['DOCUMENT_ROOT']);

define('PATH_VIEWS', FOLDER_PATH . '/app/views/');

define('PATH_ASSETS', FOLDER_PATH . '/app/assets/');

define('PATH_CONTROLLERS', 'app/controllers/');

define('HELPER_PATH', 'system/helpers/');

define('LIBS_ROUTE', ROOT . FOLDER_PATH . '/system/libs/');

define('FULL_PATH', ROOT . FOLDER_PATH);


//////////////////////////////////////
// Valores de core
/////////////////////////////////////

define('CORE', 'system/core/');
define('DEFAULT_CONTROLLER', 'Login');

//////////////////////////////////////
// Valores de base de datos
/////////////////////////////////////

//////////////////////////////////////
// Parametros para conexión 
//////////////////////////////////////



define('HOST', 'localhost');
define('USER', 'root');
define('PASSWORD', '');
define('DB_NAME', 'cttapp_cire');




//////////////////////////////////////
// Valores configuracion
/////////////////////////////////////

define('ERROR_REPORTING_LEVEL', -1);