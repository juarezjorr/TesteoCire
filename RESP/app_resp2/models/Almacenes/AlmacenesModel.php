<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class AlmacenesModel extends Model
{

	public function __construct()
	{
		parent::__construct();
	}
//Guarda proveedor
	public function SaveAlmacen($params)
	{
        $estatus = 0;
			try {
                $qry = "INSERT INTO ctt_stores(str_name, str_type,str_status, emp_id) 
                VALUES ('".$params['NomAlmacen']."','".$params['tipoAlmacen']."',1,'".$params['EncargadoAlmacen']."')";
                $this->db->query($qry);	
				$qry = "SELECT MAX(str_id) AS id FROM ctt_stores;";
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
	public function GetAlmacenes()
	{
		$qry = "SELECT str_id, str_name, str_type, str.emp_id , emp_fullname  FROM ctt_stores AS str
				LEFT JOIN ctt_employees AS emp ON emp.emp_id = str.emp_id
				WHERE str.str_status = 1;";
		$result = $this->db->query($qry);
		$lista = array();
		while ($row = $result->fetch_row()){
			$item = array("str_id" =>$row[0],
						"str_name" =>$row[1],
						"str_type"=>$row[2],
						"emp_id"=>$row[3],
						"emp_fullname"=>$row[4]);
			array_push($lista, $item);
		}
		return $lista;
	}

    public function GetAlmacen($params)
	{
		$qry = "SELECT str_id, str_name, str_type, emp_id  FROM ctt_stores WHERE str_id = ".$params['id'].";";
		$result = $this->db->query($qry);
		if($row = $result->fetch_row()){
			$item = array("str_id" =>$row[0],
			"str_name" =>$row[1],
			"str_type"=>$row[2],
			"emp_id"=>$row[3]);
		}
		return $item;
	}


    public function ActualizaAlmacen($params)
	{
        $estatus = 0;
			try {
                $qry = " UPDATE ctt_stores
                SET str_name = '".$params['NomAlmacen']."'
                ,str_type ='".$params['tipoAlmacen']."'
				,emp_id ='".$params['EncargadoAlmacen']."'

                WHERE str_id = ".$params['IdAlmacen'].";";

				$this->db->query($qry);	
				$estatus = $params['IdAlmacen'];
			} catch (Exception $e) {
				$estatus = 0;
			}
		return $estatus;
	}

    //borra proveedor
	public function DeleteAlmacen($params)
	{
        $estatus = 0;
        try {
            $qry = "UPDATE ctt_stores
                    SET str_status = 0
                    WHERE str_id in (".$params['IdAlmacen'].")";
            $this->db->query($qry);
            $estatus = 1;
        } catch (Exception $e) {
            $estatus = 0;
        }
		return $estatus;
	}


	public function GetEncargadosAlmacen()
	{
		$qry = "SELECT emp_id, emp_fullname FROM ctt_employees WHERE emp_status = 1;";
		$result = $this->db->query($qry);
		$lista = array();
		while ($row = $result->fetch_row()){
			$item = array("emp_id" =>$row[0],
						  "emp_fullname" =>$row[1]);
			array_push($lista, $item);
		}
		return $lista;
	}


}