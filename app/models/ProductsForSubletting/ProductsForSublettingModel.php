<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class ProductsForSublettingModel extends Model
{

    public function __construct()
    {
      parent::__construct();
    }

// Listado de Productos
    public function listProducts($store)
    {
		$store = $this->db->real_escape_string($store);
		$qry = "SELECT p.prd_id, p.prd_name, p.prd_sku, ifnull(s.ser_id,0) as ser_id   
				FROM ctt_products AS p
				LEFT JOIN ctt_series AS s ON s.prd_id = p.prd_id AND s.ser_behaviour = 'R'
				WHERE p.prd_status = 1 ORDER BY p.prd_name asc ;";
		return $this->db->query($qry);
    }    


// Listado de Productos
public function listSuppliers($store)
{
	$store = $this->db->real_escape_string($store);
	$qry = "SELECT sup_id, sup_business_name FROM ctt_suppliers WHERE sup_status = 1 AND sup_behaviour = 'R' ORDER BY sup_business_name;";
	return $this->db->query($qry);
}   

// Listado de Productos
	public function addSerie($params)
	{
		$ser_sku = '';
		$ser_serial_number = 'R001';
		$ser_cost = $params['prprice'];
		$ser_status = '1';
		$ser_situation = 'D';
		$ser_stage = 'D';
		$ser_lonely = '1';
		$ser_behaviour = 'R';
		$prd_id = $params['productId'];
		
		$qry = "INSERT INTO 
					ctt_series (ser_sku, ser_serial_number, ser_cost, ser_status, ser_situation, ser_stage, ser_lonely, ser_behaviour, prd_id ) 
				VALUES
					('$sku','$ser_sku','$ser_serial_number','$ser_cost','$ser_status','$ser_situation','$ser_stage','$ser_lonely','$ser_behaviour','$prd_id');
				";
			//$this->db->query($qry);
			//$result = LAST_INSERT_ID();
			return $ser_cost;
	} 	
}