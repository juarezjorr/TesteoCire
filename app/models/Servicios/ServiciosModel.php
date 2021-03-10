<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class ServiciosModel extends Model
{

	public function __construct()
	{
		parent::__construct();
	}
//Guarda proveedor
	public function SaveServicios($params)
	{
        $estatus = 0;
			try {
                $qry = "INSERT INTO ctt_services(srv_name, srv_description, srv_status)
                            VALUES('".$params['NomServicio']."','".$params['DesServicio']."',1)";

                $this->db->query($qry);	
				$estatus = 1;
			} catch (Exception $e) {
				$estatus = 0;
			}
		return $estatus;
	}
// Optiene los Usuaios existentes
	public function GetServicios($request)
	{


		$qry = "SELECT srv_id, srv_name, srv_description FROM ctt_services WHERE srv_status = 1 ;";
		$result = $this->db->query($qry);
		$lista = array();
		while ($row = $result->fetch_row()){
			$item = array("srv_id" =>$row[0],
						"srv_name" =>utf8_decode($row[1]),
                        "srv_description" =>utf8_decode($row[2]));
			array_push($lista, $item);
		}
		return $lista;
	}

    public function GetServicio($params)
	{
		$qry = "SELECT srv_id, srv_name, srv_description FROM ctt_services WHERE srv_id = ".$params['id'].";";
		$result = $this->db->query($qry);
		if($row = $result->fetch_row()){
			$item = array("srv_id" =>$row[0],
			"srv_name" =>utf8_decode($row[1]),
            "srv_description" =>utf8_decode($row[2]));
		}
		return $item;
	}


    public function ActualizaServicio($params)
	{
        $estatus = 0;
			try {
                $qry = "UPDATE ctt_services
                SET srv_name = '".$params['NomServicio']."'
                ,srv_description = '".$params['DesServicio']."'
                WHERE srv_id = ".$params['IdServicio'].";";

				$this->db->query($qry);	
				$estatus = 1;
			} catch (Exception $e) {
				$estatus = 0;
			}
		return $estatus;
	}

    //borra proveedor
	public function DeleteServicio($params)
	{
        $estatus = 0;
        try {
            $qry = "UPDATE ctt_services
                    SET srv_status = 0
                    WHERE srv_id in (".$params['IdServicio'].");";
            $this->db->query($qry);
            $estatus = 1;
        } catch (Exception $e) {
            $estatus = 0;
        }
		return $estatus;
	}


}