<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class PackagesModel extends Model
{

    public function __construct()
    {
      parent::__construct();
    }

// Listado de categorias
    public function listCategories()
    {
        $qry = "SELECT * FROM ctt_categories WHERE cat_status = 1;";
        return $this->db->query($qry);
    }

// Listado de subcategorias
    public function listSubCategories($params)
    {
        $catId = $this->db->real_escape_string($params);
        $qry = "SELECT * FROM ctt_subcategories WHERE sbc_status = 1;";
        return $this->db->query($qry);
    }

// Listado de paquetes
public function listPackages()
{
    $qry = "SELECT * FROM ctt_products WHERE prd_level ='K' AND prd_status =1;";
    return $this->db->query($qry);
}

// Listado de subcategorias
    public function lastIdSubcategory($params)
    {
        $sbcId = $this->db->real_escape_string($params);
        $qry = "SELECT ifnull(max(convert(substring( prd_sku,5,3), signed integer)),0) + 1 as nextId  FROM ctt_products where sbc_id = $sbcId;";
        return $this->db->query($qry);
    }

    
// Listado de productos
public function listProducts($params)
{
    $prdId = $this->db->real_escape_string($params);
    $qry = "SELECT pr.prd_id, pr.prd_sku, pr.prd_name, pr.prd_price 
            FROM ctt_products_packages AS pk
            INNER JOIN ctt_products AS pr ON pr.prd_id = pk.prd_parent
            WHERE pk.prd_parent = $prdId AND prd_status =1;";
    return $this->db->query($qry);
}

// Registra el paquete o kit en la tabla de productos
    public function savePack($param)
    {
        $prd_sku            = $this->db->real_escape_string($param['prdsku']);
        $prd_name           = $this->db->real_escape_string($param['prdName']);
        $prd_model          = $this->db->real_escape_string($param['prdModel']);
        $prd_price	        = $this->db->real_escape_string($param['prdPrice']);
        $prd_coin_type      = $this->db->real_escape_string($param['prdCoinType']);
        $prd_visibility     = $this->db->real_escape_string($param['prdVisibility']);
        $prd_comments       = $this->db->real_escape_string($param['prdComments']);
        $prd_status	        = $this->db->real_escape_string($param['prdStatus']);
        $prd_level          = $this->db->real_escape_string($param['prdLevel']);
        $sbc_id             = $this->db->real_escape_string($param['sbcId']);
        $sup_id             = $this->db->real_escape_string($param['supId']);
        $srv_id             = $this->db->real_escape_string($param['srvId']);
        $exm_id             = $this->db->real_escape_string($param['exmId']);

        $qry = "INSERT INTO ctt_products (
            prd_sku, prd_name, prd_model, prd_price, prd_coin_type, prd_visibility, prd_comments, prd_status, prd_level, sbc_id, sup_id, srv_id, exm_id
        ) VALUES (
        '$prd_sku', '$prd_name', '$prd_model', '$prd_price', '$prd_coin_type', '$prd_visibility', '$prd_comments', '$prd_status', '$prd_level', '$sbc_id', '$sup_id', '$srv_id', '$exm_id');
        ";
         $this->db->query($qry);
        $result = $this->db->insert_id;
        return $result . '|' . $param['prdsku'];
    }
}