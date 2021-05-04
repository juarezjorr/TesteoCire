<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class ProductAccessoryModel extends Model
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
public function listProducts()
{
    $qry = "SELECT prd_id, prd_sku, prd_name, prd_price, sbc_id 
            FROM ctt_products 
            WHERE prd_status = 1;";
    return $this->db->query($qry);
}

// Listado de productos
public function listProductsById($params)
{
    $sbc_id = $this->db->real_escape_string($param['sbc_id']);
    
    $qry = "SELECT prd_id, prd_sku, prd_name, prd_price, sbc_id 
            FROM ctt_products 
            WHERE prd_status = 1 and sbc_id = $sbc_id ;";
    return $this->db->query($qry);
}

// Listado de productos del paquete
public function listProductsPack($params)
{
    $prdId = $this->db->real_escape_string($params);
    $qry = "SELECT pr.prd_id, pr.prd_sku, pr.prd_name, pr.prd_price, pk.prd_parent  
            FROM ctt_products_packages AS pk
            INNER JOIN ctt_products AS pr ON pr.prd_id = pk.prd_id
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
        $srv_id             = $this->db->real_escape_string($param['srvId']);
        $cin_id             = $this->db->real_escape_string($param['exmId']);

        $qry = "INSERT INTO ctt_products (
            prd_sku, prd_name, prd_model, prd_price, prd_visibility, prd_comments, prd_status, prd_level, sbc_id, srv_id, cin_id
        ) VALUES (
        '$prd_sku', '$prd_name', '$prd_model', '$prd_price', '$prd_visibility', '$prd_comments', '$prd_status', '$prd_level', '$sbc_id', '$srv_id', '$cin_id');
        ";
         $this->db->query($qry);
        $result = $this->db->insert_id;
        return $result . '|' . $prd_sku . '|' . $prd_name . '|' . $prd_price;
    }


// Registra el producto al paquete
    public function SaveProduct($param)
    {
        $prd_id            = $this->db->real_escape_string($param['prdId']);
        $prd_parent        = $this->db->real_escape_string($param['prdParent']);

        $qry = "INSERT INTO ctt_products_packages ( prd_parent, prd_id ) 
                VALUES ( '$prd_parent', '$prd_id');
        ";

        $this->db->query($qry);
        $pckId = $this->db->insert_id;
                
        $qrr =  "SELECT pr.prd_id, pr.prd_sku, pr.prd_name, pr.prd_price, pk.prd_parent  
                 FROM ctt_products_packages AS pk
                 INNER JOIN ctt_products AS pr ON pr.prd_id = pk.prd_id
                 WHERE pk.pck_id = $pckId;" ;
        
        $result = $this->db->query($qrr);
        return $result;
    }


// Obtiene detalle de paquete
    public function detailPack($param)
    {
        $prd_id            = $this->db->real_escape_string($param['prdId']);

        $qry =  "SELECT pr.prd_id, pr.prd_sku, pr.prd_name, pr.prd_price, 
                        pr.sbc_id, sb.cat_id
                FROM ctt_products AS pr
                INNER JOIN ctt_subcategories AS sb ON sb.sbc_id = pr.sbc_id 
                WHERE prd_id = $prd_id" ;
        
        $result = $this->db->query($qry);
        return $result;
    }    

// Borra el producto y paquete
    public function deletePackages($param)
    {
        $prd_id            = $this->db->real_escape_string($param['prdId']);

        $qry =  "DELETE FROM ctt_products WHERE prd_id = $prd_id" ;
        
        $this->db->query($qry);

        $qrr =  "DELETE FROM ctt_products_packages WHERE prd_parent = $prd_id" ;
        
        $this->db->query($qrr);

        return $prd_id;
    }    


// Borra el producto del paquete
    public function deleteProduct($param)
    {
        $prd_id            = $this->db->real_escape_string($param['prdId']);
        $prd_parent        = $this->db->real_escape_string($param['prdParent']);

        $qry =  "DELETE FROM ctt_products_packages WHERE prd_parent = $prd_parent AND prd_id = $prd_id;" ;
        
        $this->db->query($qry);

        return $prd_id;
    }    
}