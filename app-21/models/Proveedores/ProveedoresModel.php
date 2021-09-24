<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class ProveedoresModel extends Model
{

	public function __construct()
	{
		parent::__construct();
	}
//Guarda proveedor
	public function SaveProveedores($params)
	{
        $estatus = 0;
			try {
                $qry = "INSERT INTO ctt_suppliers (sup_business_name, sup_contact, sup_rfc, sup_email, sup_phone,sup_status, sut_id)
                VALUES('".$params['NomProveedor']."','".$params['ContactoProveedor']."','".$params['RfcProveedor']."','".$params['EmailProveedor']."','".$params['PhoneProveedor']."',1,'".$params['tipoProveedorId']."');";
                $this->db->query($qry);	

				$qry = "SELECT MAX(sup_id) AS id FROM ctt_suppliers;";
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
	public function GetProveedores()
	{
		$qry = "SELECT sp.sup_id, sp.sup_business_name, sp.sup_contact, sp.sup_rfc, sp.sup_email, sp.sup_phone , sp.sut_id, ts.sut_name
				FROM ctt_suppliers AS sp
				LEFT JOIN ctt_suppliers_type AS ts on ts.sut_id = sp.sut_id
				WHERE sp.sup_status = 1;";
		return $this->db->query($qry);
	}

    public function GetProveedor($params)
	{
		$qry = "SELECT sup_id, sup_business_name, sup_contact, sup_rfc, sup_email, sup_phone, sut_id FROM ctt_suppliers
        WHERE sup_id =  ".$params['id'].";";
		$result = $this->db->query($qry);
		if($row = $result->fetch_row()){
			$item = array("sup_id" =>$row[0],
			"sup_business_name" =>$row[1],
			"sup_contact"=>$row[2],
			"sup_rfc"=>$row[3],
			"sup_email"=>$row[4],
			"sup_phone"=>$row[5],
			"sut_id"=>$row[6]);
		}
		return $item;
	}


    public function ActualizaProveedor($params)
	{
        $estatus = 0;
			try {
                $qry = " UPDATE ctt_suppliers
                SET sup_business_name = '".$params['NomProveedor']."'
                ,sup_contact = '".$params['ContactoProveedor']."'
                ,sup_rfc = '".$params['RfcProveedor']."' 
                ,sup_email = '".$params['EmailProveedor']."'
				,sut_id = '".$params['tipoProveedorId']."'
                ,sup_phone = '".$params['PhoneProveedor']."'
                WHERE Sup_id = ".$params['IdProveedor'].";";

				$this->db->query($qry);	
				$estatus = $params['IdProveedor'];
			} catch (Exception $e) {
				$estatus = 0;
			}
		return $estatus;
	}

    //borra proveedor
	public function DeleteProveedores($params)
	{
        $estatus = 0;
        try {
            $qry = "UPDATE ctt_suppliers
                    SET sup_status = 0
                    WHERE sup_id in (".$params['IdProveedor'].");";
            $this->db->query($qry);
            $estatus = 1;
        } catch (Exception $e) {
            $estatus = 0;
        }
		return $estatus;
	}

	public function GetTipoProveedores()
	{
		$qry = "SELECT sut_id,sut_name FROM ctt_suppliers_type WHERE sut_status = 1;";
		$result = $this->db->query($qry);
		$lista = array();
		while ($row = $result->fetch_row()){
			$item = array("sut_id" =>$row[0],
						"sut_name" =>$row[1]);
			array_push($lista, $item);
		}
		return $lista;
	}



}