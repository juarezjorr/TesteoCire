<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class ProductStocksModel extends Model
{

    public function __construct()
    {
      parent::__construct();
    }

// Listado de Tipos de mivimiento
	public function listExchange()
	{
		$qry = "SELECT ex1.ext_id, ex1.ext_code, ex1.ext_type, ex1.ext_description, ex1.ext_link,
						ex2.ext_id as ext_id_a, ex2.ext_code as ext_code_a, ex2.ext_type as ext_type_a, ex2.ext_description as ext_description_a
				FROM ctt_type_exchange AS ex1
				LEFT JOIN ctt_type_exchange AS ex2 ON ex2.ext_link = ex1.ext_id 
				WHERE ex1.ext_type = 'S';";
		return $this->db->query($qry);
	}

// Listado de Almacecnes
    public function listStores()
    {
		$qry = "  SELECT * FROM ctt_stores";
		return $this->db->query($qry);
    }
// Listado de Productos
	public function listProducts($request)
	{
		$idAlmacen = $this->db->real_escape_string($request['idAlmacen']);
		$idCategoria = $this->db->real_escape_string($request['idCategoria']);
		$idSubCategoria = $this->db->real_escape_string($request['idSubCategoria']);
		$isConcepto = $this->db->real_escape_string($request['isConcepto']);
		$isPaquete = $this->db->real_escape_string($request['isPaquete']);
		$isProducto = $this->db->real_escape_string($request['isProducto']);
		$isAccesorio = $this->db->real_escape_string($request['isAccesorio']);


		$queryExt = "";
		$levelProduct = "";
		$BanderaLevel = 0;

		if($idAlmacen <> 0){
			$queryExt.= " AND st.str_id=".$idAlmacen;
		}

		if($idCategoria <> 0){
			if($idSubCategoria <> 0){
				$queryExt.= " AND pr.sbc_id=".$idSubCategoria;
			}else{
				$queryExt.= " AND pr.sbc_id in (select sbc_id from ctt_subcategories where cat_id =".$idCategoria.")";
			}
		}
	
		if($isPaquete == 1){
			$levelProduct.= "'K',";
			$BanderaLevel = 1;
		}
		if($isProducto == 1){
			$levelProduct.= "'P',";
			$BanderaLevel = 1;
		}
		if($isAccesorio == 1){
			$levelProduct.= "'A',";
			$BanderaLevel = 1;
		}

		if($BanderaLevel == 1){
			$levelProduct  = substr($levelProduct , 0, -1);
			$queryExt.= " AND pr.prd_level in (".$levelProduct.")";
		}


		if($isConcepto == 1){
			$qry = "SELECT distinct pr.prd_sku, pr.prd_name, prd_price, '' as ser_date_registry, '' as ser_serial_number FROM ctt_products AS pr
			INNER JOIN ctt_series AS sr ON sr.prd_id = pr.prd_id
			INNER JOIN ctt_stores_products AS st ON st.ser_id = sr.ser_id
			WHERE sr.ser_status = 1 AND st.stp_quantity > 0 ".$queryExt;
		}else{
			$qry = "SELECT pr.prd_sku, pr.prd_name, prd_price,  sr.ser_date_registry, sr.ser_serial_number FROM ctt_products AS pr
			INNER JOIN ctt_series AS sr ON sr.prd_id = pr.prd_id
			INNER JOIN ctt_stores_products AS st ON st.ser_id = sr.ser_id
			WHERE sr.ser_status = 1 AND st.stp_quantity > 0 ".$queryExt;
		}

		//print_r($qry);
		//exit();



		return $this->db->query($qry);
	}	
// Listado de Movimientos
	public function listExchanges($guid)
	{
		$guid = $this->db->real_escape_string($guid);
		$qry = "SELECT * FROM ctt_stores_exchange WHERE exc_guid = '$guid' ORDER BY exc_date DESC;";
		return $this->db->query($qry);
	}


// Busca si existe asignado un almacen con este producto
	public function SechingProducts($param)
	{
		$prodId = $this->db->real_escape_string($param['prd']);
		$storId = $this->db->real_escape_string($param['str']);

		$qry = "SELECT count(*) as items FROM ctt_stores_products WHERE ser_id = $prodId AND str_id = $storId;";
		return $this->db->query($qry);
	}

// Actualizala cantidad de productos en un almacen destino
	public function UpdateProducts($param)
	{
		$idPrd 			= $this->db->real_escape_string($param['prd']);
		$idStrSrc 		= $this->db->real_escape_string($param['str']);
		$quantity 		= $this->db->real_escape_string($param['qty']);

		$qry = "UPDATE ctt_stores_products SET stp_quantity = stp_quantity + {$quantity} WHERE str_id = {$idStrSrc} and  ser_id = {$idPrd};";
		return $this->db->query($qry);
	}


// Agrega el registro de relación almacen producto
	public function InsertProducts($param)
	{
		$idPrd 			= $this->db->real_escape_string($param['prd']);
		$idStrSrc 		= $this->db->real_escape_string($param['str']);
		$quantity 		= $this->db->real_escape_string($param['qty']);

		$qry = "INSERT INTO ctt_stores_products (stp_quantity, str_id, ser_id) VALUES ($quantity, $idStrSrc, $idPrd);";
		return $this->db->query($qry);
	}

	
}