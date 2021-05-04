<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class MoveStoresInModel extends Model
{

    public function __construct()
    {
      parent::__construct();
    }


// Listado de Tipos de movimiento
    public function listExchange()
    {
        $qry = "SELECT ex1.ext_id, ex1.ext_code, ex1.ext_type, ex1.ext_description, ex1.ext_link,
                    ex2.ext_id as ext_id_a, ex2.ext_code as ext_code_a, ex2.ext_type as ext_type_a, ex2.ext_description as ext_description_a,
                    ex1.ext_elements
                FROM ctt_type_exchange AS ex1
                LEFT JOIN ctt_type_exchange AS ex2 ON ex2.ext_link = ex1.ext_id 
                WHERE ex1.ext_type = 'E';";
        return $this->db->query($qry);
    }


// Listado de Almacecnes
    public function listStores()
    {
        $qry = "  SELECT * FROM ctt_stores WHERE str_status = 1";
        return $this->db->query($qry);
    }


// Listado de proveedores
    public function listSuppliers()
    {
        $qry = "  SELECT * FROM ctt_suppliers WHERE sup_status = 1 AND sut_id IN (3);";
        return $this->db->query($qry);
    }

    
// Listado de Facturas
    public function listInvoice()
    {
        $qry = "SELECT doc_id, doc_name FROM ctt_documents WHERE dot_id = 1;";
        return $this->db->query($qry);
    }

        
// Listado de Monedas
    public function listCoins()
    {
        $qry = "SELECT cin_id, cin_code, cin_name FROM ctt_coins WHERE cin_status = 1;";
        return $this->db->query($qry);
    }

// Listado de Productos
    public function listProducts()
    {
        $qry = "SELECT pd.prd_id, pd.prd_sku, pd.prd_name, (
                    SELECT ifnull(max(convert(substring( ser_sku,8,3), signed integer)),0) + 1 
                    FROM ctt_series WHERE prd_id = pd.prd_id AND ser_behaviour = 'C'
                ) as serNext
                FROM ctt_products AS pd WHERE pd.prd_status = 1 AND pd.prd_level ='P';";
        return $this->db->query($qry);
    }	

// Registra los movimientos entre almacenes
public function NextExchange()
{
    $qry = "INSERT INTO ctt_counter_exchange (con_status) VALUES ('1');	";
    $this->db->query($qry);
    return $this->db->insert_id;
}

// Registra los movimientos entre almacenes
    public function SaveExchange($param, $user)
    {
        $employee_data = explode("|",$user);
        $con_id			    = $this->db->real_escape_string($param['fol']);
        $exc_sku_product 	= $this->db->real_escape_string($param['sku']);
        $exc_product_name 	= $this->db->real_escape_string($param['pnm']);
        $exc_quantity 		= $this->db->real_escape_string($param['qty']);
        $exc_serie_product	= $this->db->real_escape_string($param['ser']);
        $exc_store			= $this->db->real_escape_string($param['str']);
        $exc_comments		= $this->db->real_escape_string($param['com']);
        $ext_code			= $this->db->real_escape_string($param['cod']);
        $ext_id				= $this->db->real_escape_string($param['idx']);
        $cin_id				= $this->db->real_escape_string($param['cin']);
        $prd_id 			= $this->db->real_escape_string($param['prd']);
		$str_id 	    	= $this->db->real_escape_string($param['sti']);
        $ser_cost           = $this->db->real_escape_string($param['cos']);
        $sup_id             = $this->db->real_escape_string($param['sup']);
        $doc_id             = $this->db->real_escape_string($param['doc']);
        $exc_employee_name	= $this->db->real_escape_string($employee_data[2]);
        $ser_status         = '1';
        $ser_situation      = 'D';
        $ser_stage          = 'D';
        $ser_lonely         = '1';
        $ser_behaviour      = 'C';

        
		$qry1 = "INSERT INTO ctt_series (
                    ser_sku, ser_serial_number, ser_cost, ser_status, ser_situation, ser_stage, ser_lonely, ser_behaviour, prd_id, sup_id, cin_id
                ) VALUES (
                    '$exc_sku_product', '$exc_serie_product', '$ser_cost', '$ser_status', '$ser_situation', '$ser_stage', '$ser_lonely', '$ser_behaviour', '$prd_id', '$sup_id', '$cin_id');";

        $this->db->query($qry1);
        $serId = $this->db->insert_id;

        $qry2 = "INSERT INTO ctt_stores_exchange (
                    exc_sku_product, exc_product_name, exc_quantity, exc_serie_product, exc_store, exc_comments,  exc_employee_name, ext_code, ext_id, cin_id, con_id
                ) VALUES (
                    '$exc_sku_product', '$exc_product_name', $exc_quantity, '$exc_serie_product', '$exc_store', '$exc_comments', '$exc_employee_name', '$ext_code', $ext_id, $cin_id, $con_id
                );";
        $this->db->query($qry2);


		$qry3 = "INSERT INTO ctt_stores_products (stp_quantity, str_id, ser_id) VALUES ($exc_quantity, $str_id, $serId);";
        $this->db->query($qry3);

        
		$qry4 = "INSERT INTO ctt_products_documents (prd_id, doc_id) VALUES ($prd_id, $doc_id);";
        $this->db->query($qry4);

        return $exc_guid ;

    }



}