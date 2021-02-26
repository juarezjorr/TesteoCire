<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class UsuariosModel extends Model
{

	public function __construct()
	{
		parent::__construct();
	}


// Lista el Menu
	public function listaMenu($userId)
	{
		$userId = $this->db->real_escape_string($userId);

		$qry = "SELECT *, (
					SELECT count(*) from ctt_menu as ms where ms.mnu_parent = mn.mnu_id) as sons 
				FROM ctt_menu AS mn
				INNER JOIN ctt_modules AS mo ON mo.mod_id = mn.mod_id
				INNER JOIN ctt_user_module AS um ON um.mod_id = mo.mod_id
				WHERE um.usr_id  = $userId;
		";

		return $this->db->query($qry);
	}

}