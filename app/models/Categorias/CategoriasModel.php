<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class CategoriasModel extends Model
{

	public function __construct()
	{
		parent::__construct();
	}
//Guarda proveedor
	public function SaveCategoria($params)
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
// Optiene los Usuaios existentes
	public function GetCategorias()
	{
		$qry = "SELECT cat_id, cat_name FROM ctt_categories WHERE cat_status = '1';";
		$result = $this->db->query($qry);
		$lista = array();
		while ($row = $result->fetch_row()){
			$item = array("cat_id" =>$row[0],
						"cat_name" =>utf8_decode($row[1]));
			array_push($lista, $item);
		}
		return $lista;
	}

    public function GetCategoria($params)
	{
		$qry = "SELECT cat_id, cat_name FROM ctt_categories WHERE cat_id = ".$params['id'].";";
		$result = $this->db->query($qry);
		if($row = $result->fetch_row()){
			$item = array("cat_id" =>$row[0],
			"cat_name" =>utf8_decode($row[1]));
		}
		return $item;
	}


    public function ActualizaCategoria($params)
	{
        $estatus = 0;
			try {
                $qry = "UPDATE ctt_categories
                SET cat_name = '".$params['NomCategoria']."'
                WHERE cat_id = ".$params['IdCategoria'].";";

				$this->db->query($qry);	
				$estatus = 1;
			} catch (Exception $e) {
				$estatus = 0;
			}
		return $estatus;
	}

    //borra proveedor
	public function DeleteCategoria($params)
	{
        $estatus = 0;
        try {
            $qry = "UPDATE ctt_categories
                    SET cat_status = 0
                    WHERE cat_id in (".$params['IdCategoria'].");";
            $this->db->query($qry);
            $estatus = 1;
        } catch (Exception $e) {
            $estatus = 0;
        }
		return $estatus;
	}


}