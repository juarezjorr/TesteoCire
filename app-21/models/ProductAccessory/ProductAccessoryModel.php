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
public function listProductsById($sbc_id)
{
    //$sbc_id = $this->db->real_escape_string($param['sbc_id']);
    
    $qry = "SELECT prd_id, prd_sku, prd_name, prd_price, sbc_id 
            FROM ctt_products 
            WHERE prd_status = 1 and sbc_id = $sbc_id and  prd_level <> 'A' ;";
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

// Listado de accesorios por id
public function getAccesoriesById($params)
{
    $prdId = $this->db->real_escape_string($params['prdId']);
    $qry = "SELECT prd.prd_id , prd.prd_sku, prd_name FROM ctt_accesories as acc
            INNER JOIN ctt_products AS prd on prd.prd_id = acc.prd_id
            WHERE acc.acr_parent = $prdId and acc.acr_status = 1;";
    return $this->db->query($qry);
}

// Listado de accesorios
public function listAccesorios()
{
    //$prdId = $this->db->real_escape_string($params);
    $qry = "SELECT prd_id, prd_name, prd_sku FROM ctt_products WHERE prd_level = 'A' AND prd_sku = '';";
    return $this->db->query($qry);
}


// Registra el paquete o kit en la tabla de productos
public function saveAccesorioByProducto($param)
{
    $prd_id                     = $this->db->real_escape_string($param['prdId']);
    $prd_parent_id              = $this->db->real_escape_string($param['parentId']);
    $prd_parent_Sku             = $this->db->real_escape_string($param['skuPrdPadre']);

    $countId = 1;

    //validamos que no exista previamente
    $qry = "SELECT COUNT(*) FROM ctt_accesories WHERE prd_id = ".$prd_id ." AND acr_parent = ". $prd_parent_id."";
    $result = $this->db->query($qry);
    if ($row = $result->fetch_row()) {
        $countId = trim($row[0]);
    }

    if($countId == 0){

        //GENERAMOS EL NUMERO SUCESIVO DEL ACCESORIO

        $qry = "SELECT count(*)+1 FROM ctt_accesories WHERE acr_parent =".$prd_parent_id."";
        $result = $this->db->query($qry);
        if ($row = $result->fetch_row()) {
            $acConsecutivo = trim($row[0]);
        }


        $prd_parent_Sku =  $prd_parent_Sku."A".str_pad($acConsecutivo, 3, "0", STR_PAD_LEFT);

        //print_r($prd_parent_Sku);
        //exit();

        $qry = "UPDATE ctt_products SET prd_sku = '".$prd_parent_Sku."' WHERE prd_id = ".$prd_id."";
        $this->db->query($qry);

/*         print_r($qry);
        exit(); */

        $qry = "INSERT INTO ctt_accesories(acr_parent,acr_status,prd_id)
        VALUES ($prd_parent_id,1,$prd_id)";
        $this->db->query($qry);

        $result = $prd_parent_Sku;


        //$result = $this->db->insert_id;
    }else{
        $result = 0;
    }
    return $result ;
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


// Obtiene detalle del producto
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

// Borra el accesorio del producto
    public function deleteProduct($param)
    {
        $prd_id            = $this->db->real_escape_string($param['prdId']);
        $prd_parent        = $this->db->real_escape_string($param['prdParent']);

        $qry =  "DELETE FROM ctt_accesories WHERE acr_parent = $prd_parent AND prd_id = $prd_id;" ;
/*         print_r($qry );
        exit(); */
        $this->db->query($qry);


        $qry = "UPDATE ctt_products SET prd_sku = '' WHERE prd_id = ".$prd_id."";
        $this->db->query($qry);
        

        return $prd_id;
    }    
}