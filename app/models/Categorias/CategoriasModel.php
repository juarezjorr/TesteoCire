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
                $qry = "INSERT INTO ctt_categories(cat_name, cat_status, str_id)
				VALUES ('".$params['NomCategoria']."',1,'".$params['idAlmacen']."')";
                $this->db->query($qry);	
				$qry = "SELECT MAX(cat_id) AS id FROM ctt_categories;";
				$result = $this->db->query($qry);
				if ($row = $result->fetch_row()) {
				    $lastid = trim($row[0]);
				}

				$estatus = $lastid;
			} catch (Exception $e) {
				$estatus = 0;
			}
		return $estatus;
	}
// Optiene los Usuaios existentes
	public function GetCategorias()
	{
		$qry = "SELECT ct.cat_id, ct.cat_name, ct.str_id, st.str_name,
				(select count(*) from ctt_subcategories as sub where sub.cat_id = ct.cat_id) as cantidad
				FROM ctt_categories AS ct
				LEFT JOIN ctt_stores AS st ON st.str_id = ct.str_id
				WHERE ct.cat_status = 1;";
		$result = $this->db->query($qry);
		$lista = array();
		while ($row = $result->fetch_row()){
			$item = array("cat_id" =>$row[0],
						"cat_name" =>$row[1],
						"str_id" =>$row[2],
						"str_name" =>$row[3],
						"cantidad" =>$row[4]);
			array_push($lista, $item);
		}
		//print_r($lista);
		return $lista;
	}

    public function GetCategoria($params)
	{
		$qry = "SELECT cat_id, cat_name, str_id FROM ctt_categories WHERE cat_id = ".$params['id'].";";
		$result = $this->db->query($qry);
		if($row = $result->fetch_row()){
			$item = array("cat_id" =>$row[0],
			"cat_name" =>$row[1],
			"str_id" =>$row[2]);
		}
		return $item;
	}


    public function ActualizaCategoria($params)
	{
        $estatus = 0;
			try {
                $qry = "UPDATE ctt_categories
                SET cat_name = '".$params['NomCategoria']."',
				str_id = '".$params['idAlmacen']."'
                WHERE cat_id = ".$params['IdCategoria'].";";

				$this->db->query($qry);	
				$estatus = $params['IdCategoria'];
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