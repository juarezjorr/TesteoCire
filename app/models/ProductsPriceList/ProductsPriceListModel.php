<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class ProductsPriceListModel extends Model
{

    public function __construct()
    {
        parent::__construct();
    }


// Listado de Productos
public function listProducts($params)
    {
        $catId = $this->db->real_escape_string($params['catId']);
        $grp = $this->db->real_escape_string($params['grp']);
        $num = $this->db->real_escape_string($params['num']);

        $qry = "SELECT 
                    p.prd_id, p.prd_sku, p.prd_name, ct.cat_name, sc.sbc_name, sv.srv_name, 
                    CASE 
                        WHEN p.prd_level = 'K' THEN 
                            (SELECT COUNT(*)
                                FROM ctt_products AS pr
                                INNER JOIN ctt_products_packages AS pk ON pk.prd_id = pr.prd_id
                                WHERE pk.prd_parent = p.prd_id)
                        WHEN p.prd_level = 'P' THEN
                            ifnull(sum(sp.stp_quantity),0)
                        ELSE 0 END
                            AS quantity, 
                    p.prd_price, cn.cin_code AS prd_coin_type,  p.prd_english_name, p.prd_level, IFNULL(dc.doc_id, 0) AS doc_id, ct.cat_id
                FROM  ctt_products AS p
                INNER JOIN ctt_subcategories 	AS sc ON sc.sbc_id = p.sbc_id 	AND sc.sbc_status = 1
                INNER JOIN ctt_categories 		AS ct ON ct.cat_id = sc.cat_id 	AND ct.cat_status = 1
                INNER JOIN ctt_services 		AS sv ON sv.srv_id = p.srv_id 	AND sv.srv_status = 1
                LEFT JOIN ctt_series 			AS sr ON sr.prd_id = p.prd_id
                LEFT JOIN ctt_stores_products 	AS sp ON sp.ser_id = sr.ser_id
                LEFT JOIN ctt_coins				AS cn ON cn.cin_id = p.cin_id
                LEFT JOIN ctt_products_documents AS dc ON dc.prd_id = p.prd_id AND dc.dcp_source = 'P'
                WHERE prd_status = 1 AND p.prd_visibility = 1 
                GROUP BY 	p.prd_id, p.prd_sku, p.prd_name, ct.cat_name, sc.sbc_name, sv.srv_name, 
                p.prd_price, p.prd_coin_type, p.prd_english_name ORDER BY p.prd_name ;";
        return $this->db->query($qry);
    }


// Listado de Documentos
    public function listDocuments($params)
    {
        $qry = "SELECT dp.*, dc.doc_name 
                FROM ctt_products_documents AS dp
                INNER JOIN ctt_documents AS dc ON dc.doc_id = dp.doc_id
                WHERE dc.dot_id=2;";
        return $this->db->query($qry);
    }

// Listado de seriales
    public function listSeries($params)
    {
        $prodId = $this->db->real_escape_string($params['prdId']);
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
                    , pd.prd_sku 
                    , pd.prd_name
                    , sp.stp_quantity
                    , st.str_name
                FROM ctt_series as se
                INNER JOIN ctt_products AS pd ON pd.prd_id = se.prd_id 
                LEFT JOIN ctt_stores_products AS sp ON sp.ser_id = se.ser_id
                LEFT JOIN ctt_stores As st ON st.str_id = sp.str_id 
                WHERE se.prd_id IN ($prodId) AND sp.stp_quantity > 0
                ORDER BY se.prd_id, se.ser_sku;";
        return $this->db->query($qry);
    }


// Lista productos del paquete
    public function listProductPackages($params)
    {
        $prdId = $this->db->real_escape_string($params['prdId']);
        $prdName = $this->db->real_escape_string($params['prdName']);
        $qry = "SELECT 
                    p.prd_id, p.prd_sku, p.prd_name, ct.cat_name, sc.sbc_name, sv.srv_name, '$prdName' as paquete,
                    IFNULL((
                        SELECT sum(sp.stp_quantity) FROM ctt_series AS sr
                        INNER JOIN ctt_stores_products AS sp ON sp.ser_id = sr.ser_id
                        WHERE prd_id= p.prd_id
                    ),0) AS quantity, 
                    p.prd_price, cn.cin_code AS prd_coin_type,  p.prd_english_name, p.prd_level
                FROM  ctt_products AS p
                INNER JOIN ctt_products_packages    AS pk ON pk.prd_id = p.prd_id
                INNER JOIN ctt_subcategories        AS sc ON sc.sbc_id = p.sbc_id   AND sc.sbc_status = 1
                INNER JOIN ctt_categories           AS ct ON ct.cat_id = sc.cat_id  AND ct.cat_status = 1
                INNER JOIN ctt_services             AS sv ON sv.srv_id = p.srv_id   AND sv.srv_status = 1
                LEFT  JOIN ctt_coins                AS cn ON cn.cin_id = p.cin_id
                WHERE prd_status = 1 AND p.prd_visibility = 1 AND pk.prd_parent = $prdId
                GROUP BY p.prd_id, p.prd_sku, p.prd_name, ct.cat_name, sc.sbc_name, sv.srv_name, 
                        p.prd_price, p.prd_coin_type, p.prd_english_name 
                ORDER BY p.prd_name;";
        return $this->db->query($qry);
    }



}
