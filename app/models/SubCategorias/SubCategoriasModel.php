<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class SubCategoriasModel extends Model
{

	public function __construct()
	{
		parent::__construct();
	}
//Guarda proveedor
	public function SaveSubCategoria($params)
	{
        $estatus = 0;
			try {
                $qry = "INSERT INTO ctt_subcategories(sbc_code, sbc_name, sbc_status, cat_id)
                VALUES('".$params['CodSubCategoria']."','".$params['NomSubCategoria']."',1,'".$params['idCategoria']."')";
                $this->db->query($qry);	
				$estatus = 1;
			} catch (Exception $e) {
				$estatus = 0;
			}
		return $estatus;
	}
// Optiene las subcategorias existentes
	public function GetSubCategorias()
	{
		$qry = "SELECT u.sbc_id, u.sbc_code, u.sbc_name, u.cat_id , e.cat_name
                FROM ctt_subcategories AS U 
                JOIN ctt_categories AS E
                ON U.cat_id = E.cat_id
                WHERE sbc_status = 1;";
		$result = $this->db->query($qry);
		$lista = array();
		while ($row = $result->fetch_row()){
			$item = array("sbc_id" =>$row[0],
						"sbc_code" =>utf8_decode($row[1]),
                        "sbc_name" =>utf8_decode($row[2]),
                        "cat_id" =>utf8_decode($row[3]),
                        "cat_name" =>utf8_decode($row[4]));
			array_push($lista, $item);
		}
		return $lista;
	}

    public function GetSubCategoria($params)
	{
		$qry = "SELECT sbc_id, sbc_code, sbc_name , cat_id FROM ctt_subcategories WHERE sbc_id = ".$params['id'].";";
		$result = $this->db->query($qry);
		if($row = $result->fetch_row()){
			$item = array("sbc_id" =>$row[0],
			"sbc_code" =>utf8_decode($row[1]),
            "sbc_name" =>utf8_decode($row[2]),
            "cat_id" =>utf8_decode($row[3]));
		}
		return $item;
	}


    public function ActualizaSubCategoria($params)
	{
        $estatus = 0;
			try {
                $qry = "UPDATE ctt_subcategories
                SET sbc_code = '".$params['CodSubCategoria']."'
                ,sbc_name = '".$params['NomSubCategoria']."'
                ,cat_id = '".$params['idCategoria']."'
                WHERE sbc_id =  ".$params['IdSubCategoria'].";";

				$this->db->query($qry);	
				$estatus = 1;
			} catch (Exception $e) {
				$estatus = 0;
			}
		return $estatus;
	}

    //borra proveedor
	public function DeleteSubCategoria($params)
	{
        $estatus = 0;
        try {
            $qry = "UPDATE ctt_subcategories
                    SET sbc_status = 0
                    WHERE sbc_id in (".$params['IdSubCategoria'].");";
            $this->db->query($qry);
            $estatus = 1;
        } catch (Exception $e) {
            $estatus = 0;
        }
		return $estatus;
	}


}