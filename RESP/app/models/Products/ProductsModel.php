<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class ProductsModel extends Model
{

    public function __construct()
    {
        parent::__construct();
    }



// Listado de categorias
    public function listCategories()
    {
        $qry = "SELECT cat_id, cat_name FROM ctt_categories WHERE cat_status = 1;";
        return $this->db->query($qry);
    }

// Listado de categorias
    public function listSubcategories()
    {
        $qry = "SELECT cat_id, sbc_id, sbc_name, sbc_code FROM ctt_subcategories WHERE sbc_status = 1;";
        return $this->db->query($qry);
    }

// Listado de servicios
    public function listServices()
    {
        $qry = "SELECT srv_id, srv_name, srv_description FROM ctt_services WHERE srv_status = 1;";
        return $this->db->query($qry);
    }

// Listado de tipos de moneda
    public function listCoins()
    {
        $qry = "SELECT * FROM ctt_coins WHERE cin_status = 1;";
        return $this->db->query($qry);
    }


// Listado de fichas técnicas
    public function listDocument()
    {
        $qry = "SELECT doc_id, doc_name FROM ctt_documents WHERE dot_id = 2;";
        return $this->db->query($qry);
    }

// Obtiene el siguiente SKU
    public function getNextSku($sbcId)
    {
        $qry = "SELECT ifnull(max(convert(substring(prd_sku,5,3), signed integer)),0) + 1 AS next
                FROM ctt_products  WHERE sbc_id = $sbcId;";
        return $this->db->query($qry);
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
                        WHEN p.prd_level = 'P' THEN  ifnull(sum(sp.stp_quantity),0)
                        ELSE 0 
                    END AS quantity, 
                    p.prd_price, cn.cin_code AS prd_coin_type,  p.prd_english_name, p.prd_level, IFNULL(dc.doc_id, 0) AS doc_id, ct.cat_id,
                    sv.srv_name, p.prd_comments
                FROM  ctt_products AS p
                INNER JOIN ctt_subcategories        AS sc ON sc.sbc_id = p.sbc_id   AND sc.sbc_status = 1
                INNER JOIN ctt_categories           AS ct ON ct.cat_id = sc.cat_id  AND ct.cat_status = 1
                INNER JOIN ctt_services             AS sv ON sv.srv_id = p.srv_id   AND sv.srv_status = 1
                LEFT JOIN ctt_series                AS sr ON sr.prd_id = p.prd_id
                LEFT JOIN ctt_stores_products       AS sp ON sp.ser_id = sr.ser_id
                LEFT JOIN ctt_coins                 AS cn ON cn.cin_id = p.cin_id
                LEFT JOIN ctt_products_documents    AS dc ON dc.prd_id = p.prd_id   AND dc.dcp_source = 'P'
                WHERE prd_status = 1 AND p.prd_level IN ('A', 'P') AND ct.cat_id = $catId
                GROUP BY p.prd_id, p.prd_sku, p.prd_name, ct.cat_name, sc.sbc_name, sv.srv_name, p.prd_price, p.prd_coin_type, p.prd_english_name 
                ORDER BY p.prd_sku ;";
        return $this->db->query($qry);
    }

    // Listado de Productos
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


// Obtiene datos del producto selecionado
    public function getSelectProduct($params)
    {
        $prdId = $this->db->real_escape_string($params['prdId']);
        $qry = "SELECT pr.*, 
                        ifnull((
                                SELECT dt.doc_id FROM ctt_products_documents AS dc 
                                LEFT JOIN ctt_documents AS dt ON dt.doc_id = dc.doc_id AND  dt.dot_id = 2
                                WHERE  dt.dot_id = 2 AND dc.prd_id = pr.prd_id
                                ),0) AS docum, 
                        ifnull((
                                SELECT dc.dcp_id FROM ctt_products_documents AS dc 
                                LEFT JOIN ctt_documents AS dt ON dt.doc_id = dc.doc_id AND  dt.dot_id = 2
                                WHERE  dt.dot_id = 2 AND dc.prd_id = pr.prd_id
                                ),0) AS documId
                FROM ctt_products AS pr
                WHERE pr.prd_id = $prdId limit 1;";
        return $this->db->query($qry);
    }


// Guarda los cambios de un producto
    public function saveEdtProduct($params)
    {
        $prdId = $this->db->real_escape_string($params['prdId']);
        $prdNm = $this->db->real_escape_string($params['prdNm']);
        $prdSk = $this->db->real_escape_string($params['prdSk']);
        $prdMd = $this->db->real_escape_string($params['prdMd']);
        $prdPr = $this->db->real_escape_string($params['prdPr']);
        $prdEn = $this->db->real_escape_string($params['prdEn']);
        $prdCd = $this->db->real_escape_string($params['prdCd']);
        $prdNp = $this->db->real_escape_string($params['prdNp']);
        $prdCm = $this->db->real_escape_string($params['prdCm']);
        $prdVs = $this->db->real_escape_string($params['prdVs']);
        $prdLv = $this->db->real_escape_string($params['prdLv']);
        $prdLn = $this->db->real_escape_string($params['prdLn']);
        $prdAs = $this->db->real_escape_string($params['prdAs']);
        $prdSb = $this->db->real_escape_string($params['prdSb']);
        $prdCn = $this->db->real_escape_string($params['prdCn']);
        $prdSv = $this->db->real_escape_string($params['prdSv']);
        $prdDc = $this->db->real_escape_string($params['prdDc']);
        $prdDi = $this->db->real_escape_string($params['prdDi']);

        $qry = "UPDATE ctt_products
                SET
                        prd_sku             = '$prdSk',
                        prd_name            = '$prdNm',
                        prd_english_name    = '$prdEn',
                        prd_code_provider   = '$prdCd',
                        prd_name_provider   = '$prdNp',
                        prd_model           = '$prdMd',
                        prd_price           = '$prdPr',
                        prd_visibility      = '$prdVs',
                        prd_comments        = '$prdCm',
                        prd_level           = '$prdLv',
                        prd_lonely          = '$prdLn',
                        prd_assured         = '$prdAs',
                        sbc_id              = '$prdSb',
                        srv_id              = '$prdSv',
                        cin_id              = '$prdCn'
                WHERE   prd_id              = '$prdId';";
        $this->db->query($qry);

            if ($prdDi == '0'&& $prdDc > '0' ){
                $qry1 = "INSERT INTO ctt_products_documents 
                            (dcp_source, prd_id, doc_id) 
                        VALUES
                            ('P', '$prdId', '$prdDc')
                        ";
                        $this->db->query($qry1);
                        $prdDc = $this->db->insert_id;

            } elseif($prdDi > '0' && $prdDc > '0'){
                $qry1 = "UPDATE ctt_products_documents 
                         SET  doc_id = '$prdDc'
                         WHERE dcp_id = '$prdDi';
                        ";
                        $this->db->query($qry1);

            } elseif ($prdDi > '0' && $prdDc == '0'){
                $qry1 = "DELETE FROM ctt_products_documents 
                         WHERE dcp_id = '$prdDi';
                        ";
                        $this->db->query($qry1);
            } 
            


        return $prdId .'|'. $prdDc;
    }


// Guarda nuevo producto
    public function saveNewProduct($params)
    {
        $prdId = $this->db->real_escape_string($params['prdId']);
        $prdNm = $this->db->real_escape_string($params['prdNm']);
        $prdSk = $this->db->real_escape_string($params['prdSk']);
        $prdMd = $this->db->real_escape_string($params['prdMd']);
        $prdPr = $this->db->real_escape_string($params['prdPr']);
        $prdEn = $this->db->real_escape_string($params['prdEn']);
        $prdCd = $this->db->real_escape_string($params['prdCd']);
        $prdNp = $this->db->real_escape_string($params['prdNp']);
        $prdCm = $this->db->real_escape_string($params['prdCm']);
        $prdVs = $this->db->real_escape_string($params['prdVs']);
        $prdLv = $this->db->real_escape_string($params['prdLv']);
        $prdLn = $this->db->real_escape_string($params['prdLn']);
        $prdAs = $this->db->real_escape_string($params['prdAs']);
        $prdCt = $this->db->real_escape_string($params['prdCt']);
        $prdSb = $this->db->real_escape_string($params['prdSb']);
        $prdCn = $this->db->real_escape_string($params['prdCn']);
        $prdSv = $this->db->real_escape_string($params['prdSv']);
        $prdDc = $this->db->real_escape_string($params['prdDc']);
        $prdDi = $this->db->real_escape_string($params['prdDi']);
        $prdSt = '1';
        $NxtId ='';

        if ($prdLv == 'P'){

            $NxtId = "SELECT ifnull(max(convert(substring(prd_sku,5,3), signed integer)),0) + 1 AS next
                FROM ctt_products  WHERE sbc_id = $prdSb;";
            $rss = $this->db->query($NxtId);

            if ($row = $rss->fetch_row()) {
                $skires = trim($row[0]);
                $NxtId = str_pad($skires, 3, "0", STR_PAD_LEFT);
            }
        }
        

        $prdSk .=  $NxtId ;

        $qry = "INSERT INTO ctt_products (
                    prd_sku, prd_name, prd_english_name, prd_code_provider, prd_name_provider, 
                    prd_model, prd_price, prd_visibility, prd_comments, prd_level, prd_lonely, 
                    prd_assured, sbc_id, srv_id, cin_id, prd_status
                ) VALUES (
                    '$prdSk', '$prdNm', '$prdEn', '$prdCd', '$prdNp', 
                    '$prdMd', '$prdPr', '$prdVs', '$prdCm', '$prdLv', '$prdLn', 
                    '$prdAs', '$prdSb', '$prdSv', '$prdCn', '$prdSt'
                );";
        $this->db->query($qry);
        $prdId = $this->db->insert_id;

            if ($prdDi == '0'&& $prdDc > '0' ){
                $qry1 = "INSERT INTO ctt_products_documents 
                            (dcp_source, prd_id, doc_id) 
                        VALUES
                            ('P', '$prdId', '$prdDc')
                        ";
                        $this->db->query($qry1);

            } elseif($prdDi > '0' && $prdDc > '0'){
                $qry1 = "UPDATE ctt_products_documents 
                        SET  doc_id = '$prdDc'
                        WHERE dcp_id = '$prdDi';
                        ";
                        $this->db->query($qry1);

            } elseif ($prdDi > '0' && $prdDc == '0'){
                $qry1 = "DELETE FROM ctt_products_documents 
                        WHERE dcp_id = '$prdDi';
                        ";
                        $this->db->query($qry1);
            } 

            return  $prdCt;
            
    
    }

// Guarda nuevo producto
    public function deleteProduct($params)
    {

        $prdId = $this->db->real_escape_string($params['prdId']);
        $qry = " UPDATE ctt_products SET prd_status = '0' WHERE prd_id = $prdId; ";
        
        $this->db->query($qry);
        return $prdId;

    }
}

