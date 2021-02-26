<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class MoveStoresModel extends Model
{

    public function __construct()
    {
      parent::__construct();
    }
// Listado de Tipos de mivimiento
	public function listExchange()
	{
		$qry = "  SELECT * FROM ctt_type_exchange";
		return $this->db->query($qry);
	}

// Listado de Almacecnes
    public function listStores()
    {
		$qry = "  SELECT * FROM ctt_stores";
		return $this->db->query($qry);
    }
// Listado de Productos
	public function listProducts($store)
	{
		$store = $this->db->real_escape_string($store);
		$qry = "SELECT * FROM ctt_products AS pr
				INNER JOIN ctt_store_product AS ex ON ex.prd_id = pr.prd_id
				WHERE ex.str_id = $store;";
		return $this->db->query($qry);
	}	
}