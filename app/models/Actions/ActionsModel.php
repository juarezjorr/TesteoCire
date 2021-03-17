<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class ActionsModel extends Model
{

	public function __construct()
	{
		parent::__construct();
	}
//Guarda proveedor
	public function SaveActions($params)
	{
        $estatus = 0;
			try {
                $qry = "INSERT INTO ctt_categories(cat_name, cat_status)VALUES ('".$params['NomCategoria']."',1)";
                $this->db->query($qry);	
				$estatus = 1;
			} catch (Exception $e) {
				$estatus = 0;
			}
		return $estatus;
	}

}