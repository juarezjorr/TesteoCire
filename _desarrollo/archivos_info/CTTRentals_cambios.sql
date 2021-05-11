-- 5 de Mayo 2021

 

-- Inserta en la tabla ctt_menu
TRUNCATE TABLE ctt_menu;
INSERT INTO ctt_menu (mnu_parent,mnu_item,mnu_description,mnu_order,mod_id) values (0,'Inventarios','Seccion de inventarios',1,1);
INSERT INTO ctt_menu (mnu_parent,mnu_item,mnu_description,mnu_order,mod_id) values (0,'Programación','Seccion de programaciones',2,2);
INSERT INTO ctt_menu (mnu_parent,mnu_item,mnu_description,mnu_order,mod_id) values (1,'Almacenes','Seccion de almacenes',1,3);
INSERT INTO ctt_menu (mnu_parent,mnu_item,mnu_description,mnu_order,mod_id) values (1,'Gestión de catálogos','Seccion de catálogos',2,4);
INSERT INTO ctt_menu (mnu_parent,mnu_item,mnu_description,mnu_order,mod_id) values (0,'Administración','Seccion de administración',4,5);
INSERT INTO ctt_menu (mnu_parent,mnu_item,mnu_description,mnu_order,mod_id) values (5,'Usuarios','Seccion de usuarios',1,6);
INSERT INTO ctt_menu (mnu_parent,mnu_item,mnu_description,mnu_order,mod_id) values (21,'Salidas de almacenes','Sección de movimientos entre almacenes',2,7);
INSERT INTO ctt_menu (mnu_parent,mnu_item,mnu_description,mnu_order,mod_id) values (4,'Almacenes','Sección de edición de almacenes',1,8);
INSERT INTO ctt_menu (mnu_parent,mnu_item,mnu_description,mnu_order,mod_id) values (4,'Catálogos','Sección de edición de catálogos',2,9);
INSERT INTO ctt_menu (mnu_parent,mnu_item,mnu_description,mnu_order,mod_id) values (4,'Productos','Sección de edición de productos',3,10);
INSERT INTO ctt_menu (mnu_parent,mnu_item,mnu_description,mnu_order,mod_id) values (2,'Productos en subarrendo','Seccion de productos en subarrendo',1,11);
INSERT INTO ctt_menu (mnu_parent,mnu_item,mnu_description,mnu_order,mod_id) values (5,'Perfil de usuario','Seccion de perfil de usuarios',2,12);
INSERT INTO ctt_menu (mnu_parent,mnu_item,mnu_description,mnu_order,mod_id) values (4,'Proveedores','Seccion de proveedores',4,13);
INSERT INTO ctt_menu (mnu_parent,mnu_item,mnu_description,mnu_order,mod_id) values (5,'Puestos','Seccion de puestos',3,14);
INSERT INTO ctt_menu (mnu_parent,mnu_item,mnu_description,mnu_order,mod_id) values (4,'Documentos','Seccion de docuementos de productos',5,15);
INSERT INTO ctt_menu (mnu_parent,mnu_item,mnu_description,mnu_order,mod_id) values (4,'Tipo de Servicios','Seccion de tipos de servicio',6,16);
INSERT INTO ctt_menu (mnu_parent,mnu_item,mnu_description,mnu_order,mod_id) values (4,'Subcategorias','Seccion de subcategorias',7,17);
INSERT INTO ctt_menu (mnu_parent,mnu_item,mnu_description,mnu_order,mod_id) values (2,'Lista de precios','Seccion de la lista de precios',2,18);
INSERT INTO ctt_menu (mnu_parent,mnu_item,mnu_description,mnu_order,mod_id) values (3,'Paquetes','Seccion de paquetes',1,19);
INSERT INTO ctt_menu (mnu_parent,mnu_item,mnu_description,mnu_order,mod_id) values (4,'Productos de almacen','Seccion delistado de productos de almacen',8,20);
INSERT INTO ctt_menu (mnu_parent,mnu_item,mnu_description,mnu_order,mod_id) values (3,'Movimientos','Seccion de movimiento',2,22);
INSERT INTO ctt_menu (mnu_parent,mnu_item,mnu_description,mnu_order,mod_id) values (21,'Entradas de almacen','Seccion de entradas de almacen',1,21);
INSERT INTO ctt_menu (mnu_parent,mnu_item,mnu_description,mnu_order,mod_id) values (0,'Operación','Seccion de operación',3,24);
INSERT INTO ctt_menu (mnu_parent,mnu_item,mnu_description,mnu_order,mod_id) values (23,'Código de barras','Seccion de impresor de códigos de barras',1,23);
 
-- Inserta en la tabla ctt_modules
TRUNCATE TABLE ctt_modules;
INSERT INTO ctt_modules (mod_code,mod_name,mod_description,mod_item) values ('invt','Inventarios','Modulo que controla los inventarios','#');
INSERT INTO ctt_modules (mod_code,mod_name,mod_description,mod_item) values ('prog','Programación','Modulo de programación','#');
INSERT INTO ctt_modules (mod_code,mod_name,mod_description,mod_item) values ('alma','Almacenes','Modulo de almacenes','#');
INSERT INTO ctt_modules (mod_code,mod_name,mod_description,mod_item) values ('catal','Catalogos','Modulo de catálogos','#');
INSERT INTO ctt_modules (mod_code,mod_name,mod_description,mod_item) values ('admin','Administracion','Modulo de administración','#');
INSERT INTO ctt_modules (mod_code,mod_name,mod_description,mod_item) values ('users','Usuarios','Modulo de usuarios','Usuarios');
INSERT INTO ctt_modules (mod_code,mod_name,mod_description,mod_item) values ('mvalms','Salidas de almacenes','Modulo de salidas de almacenes','MoveStoresOut');
INSERT INTO ctt_modules (mod_code,mod_name,mod_description,mod_item) values ('lsalma','Lista de almacenes','Modulo de edición de almacenes','Almacenes');
INSERT INTO ctt_modules (mod_code,mod_name,mod_description,mod_item) values ('lscat','Lista de categorias','Modúlo de edicion de categorias','Categorias');
INSERT INTO ctt_modules (mod_code,mod_name,mod_description,mod_item) values ('prods','Lista de productos','Modúlo de edicion de productos','Productos');
INSERT INTO ctt_modules (mod_code,mod_name,mod_description,mod_item) values ('prsub','Productos en subarrendo','Modulo de productos en subarrendo','ProductsForSubletting');
INSERT INTO ctt_modules (mod_code,mod_name,mod_description,mod_item) values ('prfus','Perfil de usuario','Modulo de perfil deusuario','PerfilUser');
INSERT INTO ctt_modules (mod_code,mod_name,mod_description,mod_item) values ('prvedr','Proveedores','Modulo de proveedores','Proveedores');
INSERT INTO ctt_modules (mod_code,mod_name,mod_description,mod_item) values ('puests','Puestos','Modulo de puestos de la organizacion','Puestos');
INSERT INTO ctt_modules (mod_code,mod_name,mod_description,mod_item) values ('doctos','Documentos','Modulo de documentos de productos','Documentos');
INSERT INTO ctt_modules (mod_code,mod_name,mod_description,mod_item) values ('servic','Servicios','Modulo de tipos de servicio','Servicios');
INSERT INTO ctt_modules (mod_code,mod_name,mod_description,mod_item) values ('subcat','Subcategorias','Modulo de subcategorias','SubCategorias');
INSERT INTO ctt_modules (mod_code,mod_name,mod_description,mod_item) values ('prclst','Lista de precios','Modulo de la lista de precios','ProductsPriceList');
INSERT INTO ctt_modules (mod_code,mod_name,mod_description,mod_item) values ('packgs','Paquetes','Modulo de paquetes','Packages');
INSERT INTO ctt_modules (mod_code,mod_name,mod_description,mod_item) values ('stlstpr','Lista de productos de almacen','Modulo que lista los productos de un almacen','StoreProductsList');
INSERT INTO ctt_modules (mod_code,mod_name,mod_description,mod_item) values ('mvalme','Entradas de almacenes','Modulo de entradas de productos alalmacen','MoveStoresIn');
INSERT INTO ctt_modules (mod_code,mod_name,mod_description,mod_item) values ('codbar','Codigo de barras','Modulo de codigo de barras','CodeBar');
INSERT INTO ctt_modules (mod_code,mod_name,mod_description,mod_item) values ('oper','Operación','Modulo deoperacion','H');



 
-- Inserta en la tabla ctt_users_modules
TRUNCATE TABLE ctt_users_modules;
INSERT INTO ctt_users_modules (usr_id,mod_id) values (1,1);
INSERT INTO ctt_users_modules (usr_id,mod_id) values (1,2);
INSERT INTO ctt_users_modules (usr_id,mod_id) values (1,3);
INSERT INTO ctt_users_modules (usr_id,mod_id) values (1,4);
INSERT INTO ctt_users_modules (usr_id,mod_id) values (1,5);
INSERT INTO ctt_users_modules (usr_id,mod_id) values (1,6);
INSERT INTO ctt_users_modules (usr_id,mod_id) values (1,7);
INSERT INTO ctt_users_modules (usr_id,mod_id) values (1,8);
INSERT INTO ctt_users_modules (usr_id,mod_id) values (1,9);
INSERT INTO ctt_users_modules (usr_id,mod_id) values (1,10);
INSERT INTO ctt_users_modules (usr_id,mod_id) values (1,11);
INSERT INTO ctt_users_modules (usr_id,mod_id) values (1,12);
INSERT INTO ctt_users_modules (usr_id,mod_id) values (1,13);
INSERT INTO ctt_users_modules (usr_id,mod_id) values (1,14);
INSERT INTO ctt_users_modules (usr_id,mod_id) values (1,15);
INSERT INTO ctt_users_modules (usr_id,mod_id) values (1,16);
INSERT INTO ctt_users_modules (usr_id,mod_id) values (1,17);
INSERT INTO ctt_users_modules (usr_id,mod_id) values (1,18);
INSERT INTO ctt_users_modules (usr_id,mod_id) values (1,19);
INSERT INTO ctt_users_modules (usr_id,mod_id) values (1,20);
INSERT INTO ctt_users_modules (usr_id,mod_id) values (1,22);
INSERT INTO ctt_users_modules (usr_id,mod_id) values (1,21);
INSERT INTO ctt_users_modules (usr_id,mod_id) values (1,23);
INSERT INTO ctt_users_modules (usr_id,mod_id) values (1,24);

