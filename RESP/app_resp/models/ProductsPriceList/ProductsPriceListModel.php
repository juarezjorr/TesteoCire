<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class ProductsPriceListModel extends Model
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
                    p.prd_id, p.prd_sku, p.prd_name, ct.cat_name, sc.sbc_name, sv.srv_name, ifnull(sum(sp.stp_quantity),0) AS quantity, p.prd_price, p.prd_coin_type, p.prd_english_name, p.prd_level
                FROM  ctt_products AS p
                INNER JOIN ctt_subcategories 	AS sc ON sc.sbc_id = p.sbc_id 	AND sc.sbc_status = 1
                INNER JOIN ctt_categories 		AS ct ON ct.cat_id = sc.cat_id 	AND ct.cat_status = 1
                INNER JOIN ctt_services 		AS sv ON sv.srv_id = p.srv_id 	AND sv.srv_status = 1
                LEFT JOIN ctt_series 			AS sr ON sr.prd_id = p.prd_id
                LEFT JOIN ctt_stores_products 	AS sp ON sp.ser_id = sr.ser_id
                WHERE prd_status = 1 AND p.prd_visibility = 1
                GROUP BY 	p.prd_id, p.prd_sku, p.prd_name, ct.cat_name, sc.sbc_name, sv.srv_name, 
                p.prd_price, p.prd_coin_type, p.prd_english_name;";
        return $this->db->query($qry);
    }


// Listado de Documentos
    public function listDocuments($store)
    {
        $store = $this->db->real_escape_string($store);
        $qry = "SELECT * FROM ctt_products_documents;";
        return $this->db->query($qry);
    }

// Listado de seriales
    public function listSeries($params)
    {
        $prodId = $this->db->real_escape_string($params['prdId']);
        $prodSku = $this->db->real_escape_string($params['prdSku']);
        $prodName = $this->db->real_escape_string($params['prdName']);
        $qry = "SELECT 
                      se.ser_id
                    , se.ser_sku
                    , se.ser_serial_number
                    , se.ser_cost
                    , date_format(se.ser_date_registry, '%d/%m/%Y') AS ser_date_registry
                    , se.ser_situation
                    , se.ser_stage
                    , CASE WHEN se.ser_behaviour = 'R' THEN 'SUBABRRENDADO' ELSE '' END comportamiento
                    , '' AS comments
                    , '$prodSku' AS prd_sku
                    , '$prodName' AS prd_name
                    , sp.stp_quantity
                    , st.str_name
                FROM ctt_series as se
                LEFT JOIN ctt_stores_products AS sp ON sp.ser_id = se.ser_id
                LEFT JOIN ctt_stores As st ON st.str_id = sp.str_id 
                WHERE prd_id = $prodId;";
        return $this->db->query($qry);
    }


}
