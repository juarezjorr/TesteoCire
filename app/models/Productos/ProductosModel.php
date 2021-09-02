<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class ProductosModel extends Model
{

    public function __construct()
    {
        parent::__construct();
    }

//Guarda prodducto 
    public function SaveProductos($params)
    {
        //$estatus = 0;


        //INSERTA PRODUCTO (VALIDAR QUE EXISTE)
        $qry = "SELECT count(prd_id) AS id FROM ctt_products WHERE prd_name = '".$params['NomProducto']."';";
        $result = $this->db->query($qry);
        if ($row = $result->fetch_row()) {
            $countId = trim($row[0]);
        }
        //print_r($countId);


/*********************************************************************/
/****** GENERERAR SKU SI ES PRODUCTO, CASO CONTRARIO DEJAR VACIO *****/
/*********************************************************************/
        $SKU = "";
        $model = "";
        $subcategoria = 0;

        if($params['IsAccesorio']=="A"){
            $qry1 = "SELECT sbc_id FROM ctt_subcategories WHERE sbc_behaviour = 'AC';";
            $result1 = $this->db->query($qry1);
            if ($row = $result1->fetch_row()) {
                $Subcategoria  = trim($row[0]);
            }
        }else{
            //ID de categoria dos digitos.
            $categoria = str_pad($params['idCategoria'], 2, "0", STR_PAD_LEFT);

            //SUBCATEGORIA dos digitos 
            $qry = "SELECT sbc_code FROM ctt_subcategories WHERE sbc_id = ".$params['idSubCategoria'].";";
            $result = $this->db->query($qry);
            if ($row = $result->fetch_row()) {
                $Subcategoria  = trim($row[0]);
            }

            $Subcategoria = str_pad($Subcategoria, 2, "0", STR_PAD_LEFT);

            //MODELO 3 DIGITOS
            $qry = "SELECT count(*) FROM ctt_products WHERE sbc_id =  ".$params['idSubCategoria'].";";
            $result = $this->db->query($qry);
            if ($row = $result->fetch_row()) {
                $consecutivoModel  = trim($row[0]);
                $consecutivoModel = $consecutivoModel + 1;
            }

            $model = str_pad($consecutivoModel, 3, "0", STR_PAD_LEFT);

            $SKU = $categoria.$Subcategoria.$model;
            $SKU = strtoupper($SKU);


            $Subcategoria = $params['idSubCategoria'];
        }
        $idProducto = 0;

            try {
                if($countId == 0){
                    $qry = "INSERT INTO ctt_products(prd_name, 
                                        prd_english_name, 
                                        prd_price,  
                                        prd_coin_type, 
                                        prd_visibility, 
                                        prd_comments, 
                                        prd_status, 
                                        sbc_id, 
                                        srv_id,
                                        prd_model,
                                        prd_sku,
                                        prd_lonely,
                                        prd_level,
                                        prd_assured,
                                        doc_id
                                        ) 
                                VALUES('".$params['NomProducto']."',
                                    '".$params['NomEngProducto']."',
                                    ".$params['PriceProducto'].",
                                    ".$params['idMoneda'].",
                                    ".$params['visible'].",
                                    '".$params['DesProducto']."',
                                    1,
                                    ".$Subcategoria.",			
                                    ".$params['idTipeService'].",
                                    '".$model."',
                                    '".$SKU."',
                                    '".$params['rentSinAccesorios']."',
                                    '".$params['IsAccesorio']."',
                                    '".$params['aplicaSeguro']."',
                                    ".$params['idDocumento'].")";

                    $this->db->query($qry);	
                    $qry = "SELECT MAX(prd_id) AS id FROM ctt_products;";

                    $result = $this->db->query($qry);
                    if ($row = $result->fetch_row()) {
                        $idProducto = trim($row[0]);
                    }

                    $doc_id = $params['idDocumento'];
                    $qry4 = "INSERT INTO ctt_products_documents (prd_id, doc_id, dcp_source) VALUES ($idProducto, $doc_id, 'P');";
                    $this->db->query($qry4);

                    $qry = "SELECT 
                    p.prd_id,ifnull(p.prd_sku,'') , p.prd_name, p.prd_english_name,p.prd_model,p.prd_price, p.prd_coin_type ,p.prd_visibility, p.prd_comments,p.sbc_id, sc.cat_id, sc.sbc_name,  ct.cat_name, 
                    sv.srv_name, p.prd_level, ifnull(sum(sp.stp_quantity),0) AS quantity, p.prd_assured
                    FROM  ctt_products AS p
                    INNER JOIN ctt_subcategories 	AS sc ON sc.sbc_id = p.sbc_id 	AND sc.sbc_status = 1
                    INNER JOIN ctt_categories 		AS ct ON ct.cat_id = sc.cat_id 	AND ct.cat_status = 1
                    INNER JOIN ctt_services 		AS sv ON sv.srv_id = p.srv_id 	AND sv.srv_status = 1
                    LEFT JOIN ctt_series 			AS sr ON sr.prd_id = p.prd_id
                    LEFT JOIN ctt_stores_products 	AS sp ON sp.ser_id = sr.ser_id
                    WHERE prd_status = 1 AND p.prd_id=".$idProducto."
                    GROUP BY 	p.prd_id, p.prd_sku, p.prd_name, ct.cat_name, sc.sbc_name, sv.srv_name, 
                    p.prd_price, p.prd_coin_type, p.prd_english_name;";
                
                    $result = $this->db->query($qry);
                    if($row = $result->fetch_row()){
                        $item = array("prd_id" =>$row[0],
                        "prd_sku" =>$row[1],
                        "prd_name" =>$row[2],
                        "prd_english_name" =>$row[3],
                        "prd_model" =>$row[4],
                        "prd_price" =>$row[5],
                        "prd_coin_type" =>$row[6],
                        "prd_visibility" =>$row[7],
                        "prd_comments" =>$row[8],
                        "sbc_id" =>$row[9],
                        "cat_id" =>$row[10],
                        "sbc_name" =>$row[11],
                        "cat_name" =>$row[12],
                        "srv_name" =>$row[13],
                        "prd_level" =>$row[14],
                        "extNum" => $row[15],
                        "prd_assured" => $row[16]);
                    }
                    $estatus = $item;

                }else{
                    $estatus = 0;
                }
            } catch (Exception $e) {
                $estatus = 0;
            }
        return $estatus;
    }

    public function GetProductos($params)
    {

        $catId = $this->db->real_escape_string($params['catId']);
        $qry = "SELECT 
        p.prd_id, ifnull(p.prd_sku,'') ,ifnull(p.prd_name,'') , ifnull( p.prd_english_name,''), p.prd_model, p.prd_price, p.prd_coin_type ,p.prd_visibility, ifnull( p.prd_comments,'') ,p.sbc_id, sc.cat_id, ifnull(sc.sbc_name,'') , ifnull(ct.cat_name,''), 
        ifnull(sv.srv_name,''), p.prd_level, ifnull(sum(sp.stp_quantity),0) AS quantity, p.doc_id
    FROM  ctt_products AS p
    INNER JOIN ctt_subcategories 	AS sc ON sc.sbc_id = p.sbc_id 	AND sc.sbc_status = 1
    INNER JOIN ctt_categories 		AS ct ON ct.cat_id = sc.cat_id 	AND ct.cat_status = 1
    INNER JOIN ctt_services 		AS sv ON sv.srv_id = p.srv_id 	AND sv.srv_status = 1
    LEFT JOIN ctt_series 			AS sr ON sr.prd_id = p.prd_id
    LEFT JOIN ctt_stores_products 	AS sp ON sp.ser_id = sr.ser_id
    WHERE prd_status = 1  AND ct.cat_id = $catId
    GROUP BY 	p.prd_id, p.prd_sku, p.prd_name, ct.cat_name, sc.sbc_name, sv.srv_name, 
    p.prd_price, p.prd_coin_type, p.prd_english_name;";

        $result = $this->db->query($qry);

        $lista = array();
        while ($row = $result->fetch_row()){
                $item = array("prd_id" =>$row[0],
                "prd_sku" =>$row[1],
                "prd_name" =>$row[2],
                "prd_english_name" =>$row[3],
                "prd_model" =>$row[4],
                "prd_price" =>$row[5],
                "prd_coin_type" =>$row[6],
                "prd_visibility" =>$row[7],
                "prd_comments" =>$row[8],
                "sbc_id" =>$row[9],
                "cat_id" =>$row[10],
                "sbc_name" =>$row[11],
                "cat_name" =>$row[12],
                "srv_name" =>$row[13],
                "prd_level" =>$row[14],
                "extNum" => $row[15]);
                array_push($lista, $item);
        }
        $lista = json_encode($lista,JSON_UNESCAPED_UNICODE);
        return $lista;
    }

   public function ActualizaProducto($params)
    {

        $Subcategoria = $params['idSubCategoria'];
        if($params['IsAccesorio']=="A"){
            $qry1 = "SELECT sbc_id FROM ctt_subcategories WHERE sbc_behaviour = 'AC';";
            $result1 = $this->db->query($qry1);
            if ($row = $result1->fetch_row()) {
                $Subcategoria  = trim($row[0]);
            }
        }

        $estatus = 0;
            try {

                //ACTUALIZA PRODUCTO
                $qry = "UPDATE ctt_products
                        SET 
                        prd_name = '".$params['NomProducto']."'
                        ,prd_english_name = '".$params['NomEngProducto']."'
                        ,prd_price = '".$params['PriceProducto']."' 
                        ,prd_lonely = '".$params['rentSinAccesorios']."' 
                        ,prd_coin_type = '".$params['idMoneda']."'
                        ,prd_visibility = '".$params['visible']."'
                        ,prd_comments = '".$params['DesProducto']."'
                        ,sbc_id = '".$Subcategoria."'
                        ,srv_id =  '".$params['idTipeService']."'
                        ,doc_id =  ".$params['idDocumento']."
                        ,prd_level = '".$params['IsAccesorio']."'
                        WHERE prd_id =   ".$params['IdProducto'].";";
                $this->db->query($qry);	

                $qry = "SELECT 
                p.prd_id,ifnull(p.prd_sku,'') , p.prd_name, p.prd_english_name,p.prd_model,p.prd_price, p.prd_coin_type ,p.prd_visibility, p.prd_comments,p.sbc_id, sc.cat_id, sc.sbc_name,  ct.cat_name, 
                sv.srv_name, p.prd_level, ifnull(sum(sp.stp_quantity),0) AS quantity 
                FROM  ctt_products AS p
                INNER JOIN ctt_subcategories 	AS sc ON sc.sbc_id = p.sbc_id 	AND sc.sbc_status = 1
                INNER JOIN ctt_categories 		AS ct ON ct.cat_id = sc.cat_id 	AND ct.cat_status = 1
                INNER JOIN ctt_services 		AS sv ON sv.srv_id = p.srv_id 	AND sv.srv_status = 1
                LEFT JOIN ctt_series 			AS sr ON sr.prd_id = p.prd_id
                LEFT JOIN ctt_stores_products 	AS sp ON sp.ser_id = sr.ser_id
                WHERE prd_status = 1 AND p.prd_id=".$params['IdProducto']."
                GROUP BY 	p.prd_id, p.prd_sku, p.prd_name, ct.cat_name, sc.sbc_name, sv.srv_name, 
                p.prd_price, p.prd_coin_type, p.prd_english_name;";
    
                $result = $this->db->query($qry);
                if($row = $result->fetch_row()){
                    $item = array("prd_id" =>$row[0],
                    "prd_sku" =>$row[1],
                    "prd_name" =>$row[2],
                    "prd_english_name" =>$row[3],
                    "prd_model" =>$row[4],
                    "prd_price" =>$row[5],
                    "prd_coin_type" =>$row[6],
                    "prd_visibility" =>$row[7],
                    "prd_comments" =>$row[8],
                    "sbc_id" =>$row[9],
                    "cat_id" =>$row[10],
                    "sbc_name" =>$row[11],
                    "cat_name" =>$row[12],
                    "srv_name" =>$row[13],
                    "prd_level" =>$row[14],
                    "extNum" => $row[15]);
                }

                $estatus = $item;






            } catch (Exception $e) {
                $estatus = 0;
            }
        return $estatus;
    }

    //borra proveedor
    public function DeleteProducto($params)
    {
        $estatus = 0;
        try {
            $qry = "UPDATE ctt_products
                    SET prd_status = 0
                    WHERE prd_id in (".$params['IdProducto'].");";
            $this->db->query($qry);
            $estatus = 1;
        } catch (Exception $e) {
            $estatus = 0;
        }
        return $estatus;
    }

    public function GetTipoMoneda()
    {
        $qry = "SELECT cin_id,cin_code, cin_name FROM ctt_coins WHERE cin_status = 1;";
        $result = $this->db->query($qry);
        $lista = array();
        while ($row = $result->fetch_row()){
            $item = array("cin_id" =>$row[0],
                        "cin_code" =>$row[1],
                        "cin_name" =>$row[2]);
            array_push($lista, $item);
        }
        return $lista;
    }

    public function GetAutoComplete($params)
    {
        $qry = "SELECT distinct prd_name FROM ctt_products WHERE prd_status = 1 and prd_name like '%".$params['key']."%' ;";
        return  $this->db->query($qry);
    }

    public function getInfoComun($params)
    {
        $qry = "SELECT pro.prd_english_name, pro.prd_model, pro.prd_price, pro.prd_coin_type, 
                pro.prd_visibility, pro.prd_comments, pro.prd_status, pro.sbc_id, 
                pro.srv_id, subcat.cat_id, pro.prd_lonely, pro.doc_id
                FROM ctt_products AS pro
                LEFT JOIN ctt_subcategories AS subcat ON subcat.sbc_id = pro.sbc_id
                LEFT JOIN ctt_products_documents AS productD ON productD.prd_id = pro.prd_id
                 where pro.prd_name = '".$params['nombreDocument']."';";
        return  $this->db->query($qry);
    }

    public function getInfoComunByID($params)
    {
        $qry = "SELECT pro.prd_name, pro.prd_english_name, pro.prd_model, pro.prd_price, pro.prd_coin_type, 
                pro.prd_visibility, pro.prd_comments, pro.prd_status, pro.sbc_id, 
                pro.srv_id, subcat.cat_id, pro.prd_lonely, pro.prd_level, pro.doc_id ,pro.prd_assured
                FROM ctt_products AS pro
                LEFT JOIN ctt_subcategories AS subcat ON subcat.sbc_id = pro.sbc_id
                LEFT JOIN ctt_products_documents AS productD ON productD.prd_id = pro.prd_id
                 where pro.prd_id = '".$params['idDocument']."' limit 1;";
        return  $this->db->query($qry);
    }

    public function getInfoComunByIDFull($params)
    {
        $qry = "SELECT pro.prd_id, pro.prd_name, pro.prd_english_name, pro.prd_model, pro.prd_price, pro.prd_coin_type, 
                pro.prd_visibility, pro.prd_comments, pro.prd_status, pro.sbc_id, 
                pro.srv_id, subcat.cat_id, ser.ser_serial_number , ser.ser_cost,
                ser.ser_lonely, sProduct.str_id , pro.prd_lonely, pro.prd_level, pro.doc_id ,pro.prd_assured
                FROM ctt_products AS pro
                LEFT JOIN ctt_subcategories AS subcat ON subcat.sbc_id = pro.sbc_id
                LEFT JOIN ctt_products_documents AS productD ON productD.prd_id = pro.prd_id
                LEFT JOIN ctt_series AS ser ON ser.prd_id = pro.prd_id
                LEFT JOIN ctt_stores_products AS sProduct ON sProduct.ser_id = ser.ser_id
                        where pro.prd_id = '".$params['idDocument']."';";
        return  $this->db->query($qry);
    }

    public function GetSkuById($params)
    {

        $prdId = $this->db->real_escape_string($params['prdId']);

        $qry = "SELECT sr.ser_id , sr.ser_sku, sr.ser_serial_number, sr.ser_cost, sr.ser_date_registry, 	
                IF(sr.ser_behaviour = 'C', 'COMPRA', 'RENTA') AS ser_behaviour_name, sr.ser_behaviour,
                IFNULL((
                    SELECT dc.doc_id FROM ctt_products_documents AS pd
                    INNER JOIN ctt_documents AS dc ON dc.doc_id = pd.doc_id
                    WHERE dc.dot_id = 1 AND pd.dcp_source = 'S' AND pd.prd_id = sr.ser_id LIMIT 1
                ),'') AS doc_id
                FROM ctt_series AS sr
                WHERE ser_status = 1 AND sr.prd_id = $prdId;";

        return $this->db->query($qry);

    }

    public function GetInfoSkuById($params)
    {
        $qry = "SELECT ser.ser_id, ser.ser_sku, ser.ser_serial_number, ser.ser_cost, 
        ser.ser_lonely, ser.ser_behaviour, storeP.str_id
        FROM ctt_series AS ser
        LEFT JOIN ctt_stores_products AS storeP ON storeP.ser_id = ser.ser_id
        WHERE ser.ser_id = '".$params['id']."';";
        return  $this->db->query($qry);
    }

    public function SaveSku($params)
    {
        $estatus = 0;
        try {
            $qry = "UPDATE ctt_series
                    SET ser_serial_number = '".$params['serieSku']."'
                    ,ser_cost = ".$params['costSku']."
                    ,ser_lonely = ".$params['rentSinAccesorios']."
                    ,ser_behaviour = '".$params['idbehaviour']."'
                    WHERE ser_id =  (".$params['idSku'].");";
            $this->db->query($qry);

            $qry = "UPDATE ctt_stores_products
                    SET str_id = '".$params['idAlmacenSku']."'
                    WHERE ser_id =  (".$params['idSku'].");";
            $this->db->query($qry);


            $qry = 'SELECT ser_id , ser_sku, ser_serial_number, ser_cost, ser_date_registry, 
            IF(ser_lonely = 1, "SI", "NO") AS ser_lonely_name , ser_lonely,
            IF(ser_behaviour = "C", "COMPRA", "RENTA") AS ser_behaviour_name, ser_behaviour 
            FROM ctt_series WHERE ser_status = 1 and ser_id = '.$params['idSku'].';';
            $result = $this->db->query($qry);

            $lista = array();
            while ($row = $result->fetch_row()){
                $item = array("ser_id" =>$row[0],
                            "ser_sku" =>$row[1],
                            "ser_serial_number" =>$row[2],
                            "ser_cost" =>$row[3],
                            "ser_date_registry" =>$row[4],
                            "ser_lonely_name" =>$row[5],
                            "ser_lonely" =>$row[6],
                            "ser_behaviour_name" =>$row[7],
                            "ser_behaviour" =>$row[8]);
                array_push($lista, $item);
            }

        } catch (Exception $e) {
            $lista = null;
        }
        return $lista;
    }

    public function DeleteSku($params)
    {
        $estatus = 0;
        try {
            $qry = "UPDATE ctt_series
                    SET ser_status = 0
                    WHERE ser_id in (".$params['idSku'].");";
            $this->db->query($qry);
            $estatus = 1;
        } catch (Exception $e) {
            $estatus = 0;
        }
        return $estatus;
    }

    public function listCategories()
        {
            $qry = "SELECT cat_id, cat_name FROM ctt_categories where cat_status = 1;";
            return $this->db->query($qry);
        }
    


 // Optiene La factura correspondiente al producto
    public function getDownloadInvoice($params)
    {

        $docId = $this->db->real_escape_string($params['docId']);

        $qry = "SELECT doc_id, doc_name, doc_type, doc_size, doc_content_type, doc_document         
                FROM ctt_documents WHERE doc_id = $docId;";
        $result = $this->db->query($qry);
		if($row = $result->fetch_row()){
			$item = array(
            "doc_id" =>$row[0],
            "doc_name" =>$row[1],
            "doc_type" =>$row[2],
			"doc_size" =>$row[3],
			"doc_content_type" =>$row[4],
			"doc_document" =>base64_encode($row[5]));
		}
		return $item;

    }

}