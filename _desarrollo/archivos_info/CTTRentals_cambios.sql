
INSERT INTO `ctt_menu` (`mnu_id`, `mnu_parent`, `mnu_item`, `mnu_description`, `mod_id`) VALUES
(18, 3, 'Lista de precios', 'Seccion dela lista de precios', 18);

INSERT INTO `ctt_modules` (`mod_id`, `mod_code`, `mod_name`, `mod_description`, `mod_item`) VALUES
(18, 'prclst', 'Lista de precios', 'Modulo de la lista de precios', 'ProductsPriceList');

INSERT INTO `ctt_users_modules` (`urm_id`, `usr_id`, `mod_id`) VALUES
(18, 1, 18);

