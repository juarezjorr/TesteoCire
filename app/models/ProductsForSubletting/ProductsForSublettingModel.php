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
		$qry = "SELECT 
					p.prd_id, p.prd_name, p.prd_sku, ifnull(s.ser_id,0) as ser_id, ifnull(s.ser_serial_number,'') as ser_serial_number, ifnull(s.ser_cost,'') as ser_cost, ifnull(p.prd_coin_type,'0') as prd_coin_type
				FROM ctt_products AS p
				LEFT JOIN ctt_series AS s ON s.prd_id = p.prd_id AND s.ser_behaviour = 'R'
				WHERE p.prd_status = 1 AND prd_visibility = 1 ORDER BY p.prd_name asc ;";
		return $this->db->query($qry);
    }    


// Listado de Proveedores
	public function listSuppliers($store)
	{
		$store = $this->db->real_escape_string($store);
		$qry = "SELECT sup_id, sup_business_name FROM ctt_suppliers WHERE sup_status = 1 AND sup_behaviour = 'R' ORDER BY sup_business_name;";
		return $this->db->query($qry);
	}   

// Agrega el serial del producto en subarrendo
	public function addSerie($params)
	{
		$ser_sku = $params['prodsku'] . 'R001';
		$ser_serial_number = 'R001';
		$ser_cost = $params['prprice'];
		$ser_status = '1';
		$ser_situation = 'D';
		$ser_stage = 'D';
		$ser_lonely = '1';
		$ser_behaviour = 'R';
		$prd_id = $params['produid'];

		$qry = "INSERT INTO 
					ctt_series (ser_sku, ser_serial_number, ser_cost, ser_status, ser_situation, ser_stage, ser_lonely, ser_behaviour, prd_id ) 
				VALUES
					('$ser_sku','$ser_serial_number','$ser_cost','$ser_status','$ser_situation','$ser_stage','$ser_lonely','$ser_behaviour','$prd_id');
				";
			$this->db->query($qry);
			$result = $this->db->insert_id;
			return $result . '|' . $params['produid'] .'|'.$params['supplid'] ;
	} 	

// Agrega los productos subarrendados
	public function addSubletting($params)
	{
		$sub_price = $params['prc'];
		$sub_coin_type = $params['cin'];
		$sub_quantity = $params['qty'];
		$sub_date_start = $params['dst'];
		$sub_date_end = $params['den'];
		$sub_comments = $params['com'];
		$ser_id = $params['ser'];
		$sup_id = $params['sup'];
		$prj_id = $params['prj'];

		$qry = "INSERT INTO 
					ctt_subletting (sub_price, sub_coin_type, sub_quantity, sub_date_start, sub_date_end, sub_comments, ser_id, sup_id, prj_id ) 
				VALUES
					('$sub_price','$sub_coin_type','$sub_quantity','$sub_date_start','$sub_date_end','$sub_comments','$ser_id','$sup_id','$prj_id');
				";
			$this->db->query($qry);
			$result = $this->db->insert_id;
			return $result ;
	} 	

}