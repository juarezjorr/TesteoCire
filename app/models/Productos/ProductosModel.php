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

				//INSERTA PRODUCTO (VALIDAR QUE EXISTE)
		$qry = "SELECT count(prd_id) AS id FROM ctt_products WHERE prd_name = '".$params['NomProducto']."';";
		$result = $this->db->query($qry);
		if ($row = $result->fetch_row()) {
			$countId = trim($row[0]);
		}
		//print_r($countId);

        $estatus = 0;
			try {
				if($countId == 0){
					$qry = "INSERT INTO ctt_products(prd_name, 
										prd_english_name, 
										prd_model, 
										prd_price,  
										prd_coin_type, 
										prd_visibility, 
										prd_comments, 
										prd_status, 
										sbc_id, 
										sup_id, 
										srv_id) 
								VALUES('".$params['NomProducto']."',
									'".$params['NomEngProducto']."',
									'".$params['ModelProducto']."',
									".$params['PriceProducto'].",
									".$params['idMoneda'].",
									".$params['visible'].",
									'".$params['DesProducto']."',
									1,
									".$params['idSubCategoria'].",
									".$params['idProveedor'].",
									".$params['idTipeService']." )";
					$this->db->query($qry);	
					//print_r($qry . "-");
					$qry = "SELECT MAX(prd_id) AS id FROM ctt_products;";
					$result = $this->db->query($qry);
					if ($row = $result->fetch_row()) {
						$idProducto = trim($row[0]);
					}
				}else{
					$qry = "SELECT prd_id AS id FROM ctt_products WHERE prd_name = '".$params['NomProducto']."' limit 1;";
					$result = $this->db->query($qry);
					if ($row = $result->fetch_row()) {
						$idProducto = trim($row[0]);
					}
					//print_r($qry . "-");

				}

				/**********************************************/
				$SKU = "";
				//ID de categoria dos digitos.
				$categoria = str_pad($params['idCategoria'], 2, "0", STR_PAD_LEFT);
		
		
				$qry = "SELECT sbc_code FROM ctt_subcategories WHERE sbc_id = ".$params['idSubCategoria'].";";
				$result = $this->db->query($qry);
				if ($row = $result->fetch_row()) {
					$Subcategoria  = trim($row[0]);
				}
				//print_r($qry . "-");

				//SUBCATEGORIA dos digitos 
				$Subcategoria = str_pad($Subcategoria, 2, "0", STR_PAD_LEFT);
		
				//MODELO 3 DIGITOS
				$model = str_pad($params['ModelProducto'], 3, "0", STR_PAD_LEFT);
		
				$qry = "SELECT COUNT(ser_id) FROM  ctt_series WHERE prd_id = '".$idProducto."';";
				$result = $this->db->query($qry);
				if ($row = $result->fetch_row()) {
					$consecutivo  = trim($row[0]);
					$consecutivo = $consecutivo + 1;
				}
		
				//NUMERO CONSECUTIVO DE PRODUCTO 4 DIGITOS 
				$consecutivo = str_pad($consecutivo, 4, "0", STR_PAD_LEFT);
		
				//NUMERO DE ACCESORIO 3 DIGITOS
				$accesorio = "000";
		
				$SKU = $categoria.$Subcategoria.$model.$consecutivo.$accesorio;
				$SKU = strtoupper($SKU);

				/**********************************************/


				$qry = "INSERT INTO ctt_products_documents (prd_id, doc_id)
				VALUES(".$idProducto .",".$params['idDocumento'].")";
				$this->db->query($qry);	

				$qry = " INSERT INTO ctt_series (
					ser_sku, 
					ser_serial_number, 
					ser_cost, 
					ser_status, 
					ser_date_registry, 
					ser_lonely, 
					ser_behaviour, 
					prd_id
					)
					VALUES('".$SKU."',
						   '".$params['SerieProducto']."',
						   ".$params['CostProducto'].",
						   1,
						   NOW(),
						   '".$params['rentSinAccesorios']."',
						   '".$params['idbehaviour']."',
						   ". $idProducto.")";

				$this->db->query($qry);	
				//print_r($qry . "-");


				$qry = "SELECT MAX(ser_id) AS id FROM ctt_series;";
				$result = $this->db->query($qry);
				if ($row = $result->fetch_row()) {
				    $idSeries = trim($row[0]);
				}
				//print_r($qry . "-");


				$qry = "INSERT INTO ctt_stores_products (stp_quantity, str_id, ser_id)
						VALUES('1',".$params['idAlmacen'].",$idSeries)";
				$result = $this->db->query($qry);

				//print_r($qry . "-");

				$estatus = $idProducto;
			} catch (Exception $e) {
				$estatus = 0;
			}
		return $estatus;
	}
// Optiene las subcategorias existentes
/* 	public function GetProductos()
	{
		$qry = "SELECT pro.prd_id, pro.prd_sku, pro.prd_name, pro.prd_english_name,
		pro.prd_model, pro.prd_cost, pro.prd_price,
		pro.prd_coin_type, pro.prd_visibility,pro.prd_comments, pro.sbc_id, 
		pro.sup_id, pro.srv_id, cat.cat_id, storeP.str_id 
	   ,subcat.sbc_name , cat.cat_name , store.str_name , serv.srv_name , storeP.stp_id
				FROM  ctt_products AS pro
				LEFT JOIN ctt_subcategories AS subcat ON subcat.sbc_id = pro.sbc_id
				LEFT JOIN ctt_categories AS cat ON cat.cat_id = subcat.cat_id
				LEFT JOIN ctt_store_product AS storeP ON storeP.prd_id = pro.prd_id
				LEFT JOIN ctt_stores AS store ON store.str_id = storeP.str_id
				LEFT JOIN ctt_services AS serv ON serv.srv_id = pro.srv_id
				where pro.prd_status = 1;";

		return $this->db->query($qry);
	} */


	public function GetProductos()
	{
		$qry = "SELECT pro.prd_id, pro.prd_sku, pro.prd_name, pro.prd_english_name,
		pro.prd_model, pro.prd_cost, pro.prd_price,
		pro.prd_coin_type, pro.prd_visibility,pro.prd_comments, pro.sbc_id, 
		pro.sup_id, pro.srv_id, cat.cat_id, storeP.str_id 
	   ,subcat.sbc_name , cat.cat_name , store.str_name , serv.srv_name , storeP.stp_id
				FROM  ctt_products AS pro
				LEFT JOIN ctt_subcategories AS subcat ON subcat.sbc_id = pro.sbc_id
				LEFT JOIN ctt_categories AS cat ON cat.cat_id = subcat.cat_id
				LEFT JOIN ctt_store_product AS storeP ON storeP.prd_id = pro.prd_id
				LEFT JOIN ctt_stores AS store ON store.str_id = storeP.str_id
				LEFT JOIN ctt_services AS serv ON serv.srv_id = pro.srv_id
				where pro.prd_status = 1;";

		$result = $this->db->query($qry);

		$lista = array();
		while ($row = $result->fetch_row()){

			$string = "";
			$Count = 0;
			$qry = "SELECT ser_sku FROM ctt_series WHERE prd_id = ".$row[0].";";
			$resultt = $this->db->query($qry);
     		while ($roww = $resultt->fetch_row()){
				$string .= $roww[0].",";
				$Count++;
			}
			$string = rtrim($string, ",");

			$item = array("prd_id" =>$row[0],
			"prd_sku" =>$row[1],
			"prd_name" =>$row[2],
			"prd_english_name" =>$row[3],
			"prd_model" =>$row[4],
			"prd_cost" =>$row[5],
			"prd_price" =>$row[6],
			"prd_coin_type" =>$row[7],
			"prd_visibility" =>$row[8],
			"prd_comments" =>$row[9],
			"sbc_id" =>$row[10],
			"sup_id" =>$row[11],
			"srv_id" =>$row[12],
			"cat_id" =>$row[13],
			"str_id" =>$row[14],
			"sbc_name" =>$row[15],
			"cat_name" =>$row[16],
			"str_name" =>$row[17],
			"srv_name" =>$row[18],
			"stp_id" =>$row[19],
			"extDocuments" =>$string,
		    "extNum" =>$Count);



			array_push($lista, $item);
		}
	
		$lista = json_encode($lista,JSON_UNESCAPED_UNICODE);
		return $lista;
	}

   /*  public function GetProducto($params)
	{
		$qry = "SELECT pro.prd_id,pro.prd_sku, pro.prd_name, pro.prd_english_name, pro.prd_model
					,pro.prd_cost, pro.prd_price, pro.prd_coin_type, pro.prd_visibility
					,pro.prd_comments, pro.sbc_id, pro.sup_id, pro.srv_id, cat.cat_id, storeP.str_id 
					,subcat.sbc_name , cat.cat_name , store.str_name , serv.srv_name , storeP.stp_id
					FROM  ctt_products AS pro
					INNER JOIN ctt_subcategories AS subcat ON subcat.sbc_id = pro.sbc_id
					INNER JOIN ctt_categories AS cat ON cat.cat_id = subcat.cat_id
					INNER JOIN ctt_store_product AS storeP ON storeP.prd_id = pro.prd_id
					INNER JOIN ctt_stores AS store ON store.str_id = storeP.str_id
					INNER JOIN ctt_services AS serv ON serv.srv_id = pro.srv_id
					where pro.prd_status = 1 and pro.prd_id =  ".$params['id'].";";

		$result = $this->db->query($qry);
		if($row = $result->fetch_row()){
			$item = array("prd_id" =>$row[0],
						"prd_sku" =>$row[1],
                        "prd_name" =>$row[2],
                        "prd_english_name" =>$row[3],
                        "prd_model" =>$row[4],
						"prd_cost" =>$row[5],
						"prd_price" =>$row[6],
						"prd_coin_type" =>$row[7],
						"prd_visibility" =>$row[8],
						"prd_comments" =>$row[9],
						"sbc_id" =>$row[10],
						"sup_id" =>$row[11],
						"srv_id" =>$row[12],
						"cat_id" =>$row[13],
						"str_id" =>$row[14],
						"sbc_name" =>$row[15],
						"cat_name" =>$row[16],
						"str_name" =>$row[17],
						"srv_name" =>$row[18],
						"stp_id" =>$row[19]);
		}
		return $item;
	}
 */
    public function ActualizaProducto($params)
	{
        $estatus = 0;
			try {

				//ACTUALIZA PRODUCTO
                $qry = "UPDATE ctt_products
						SET 
						prd_name = '".$params['NomProducto']."'
						,prd_english_name = '".$params['NomEngProducto']."'
						,prd_model = '".$params['ModelProducto']."'
						,prd_price = '".$params['PriceProducto']."' 
						,prd_coin_type = '".$params['idMoneda']."'
						,prd_visibility = '".$params['visible']."'
						,prd_comments = '".$params['DesProducto']."'
						,sbc_id = '".$params['idSubCategoria']."'
						,sup_id = '".$params['idProveedor']."'
						,srv_id =  '".$params['idTipeService']."'
						WHERE prd_id =   ".$params['IdProducto'].";";
				$this->db->query($qry);	

				//SI ES SOLO UNO ACTULIZA LO SIGUIENTE
				if($params['esUnico'] == 1){

					$qry = "SELECT ser_id AS id FROM ctt_series WHERE prd_id = ".$params['IdProducto'].";";
					$result = $this->db->query($qry);
					if ($row = $result->fetch_row()) {
						$idSeries = trim($row[0]);
					}
					//print_r($idSeries);

					$qry = "UPDATE ctt_series
							SET ser_serial_number ='".$params['SerieProducto']."'
							,ser_cost = ".$params['CostProducto']."
							,ser_lonely = '".$params['rentSinAccesorios']."'
							,ser_behaviour = '".$params['idbehaviour']."' 
							WHERE ser_id = ".$idSeries.";";
					$this->db->query($qry);	

					//print_r($qry);

					$qry = "UPDATE ctt_stores_products
					SET str_id ='".$params['idAlmacen']."' 
					WHERE ser_id = ".$idSeries.";";
					$this->db->query($qry);	
				}else{	
					$qry = "UPDATE ctt_products_documents
					SET doc_id ='".$params['idDocumento']."' 
					WHERE prd_id = ".$params['IdProducto'].";";
					$this->db->query($qry);	
				}





				$estatus = $params['IdProducto'];
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
		$qry = "SELECT ext_id, ext_name, ext_descripcion FROM ctt_exchange_currency WHERE ext_status = 1
		;";
		$result = $this->db->query($qry);
		$lista = array();
		while ($row = $result->fetch_row()){
			$item = array("ext_id" =>$row[0],
						"ext_name" =>$row[1],
                        "ext_descripcion" =>$row[2]);
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
				pro.prd_visibility, pro.prd_comments, pro.prd_status, pro.sbc_id, pro.sup_id, 
				pro.srv_id, subcat.cat_id, productD.doc_id
				FROM ctt_products AS pro
				LEFT JOIN ctt_subcategories AS subcat ON subcat.sbc_id = pro.sbc_id
				LEFT JOIN ctt_products_documents AS productD ON productD.prd_id = pro.prd_id
				 where pro.prd_name = '".$params['nombreDocument']."';";
		return  $this->db->query($qry);
	}

	public function getInfoComunByID($params)
	{
		$qry = "SELECT pro.prd_name, pro.prd_english_name, pro.prd_model, pro.prd_price, pro.prd_coin_type, 
				pro.prd_visibility, pro.prd_comments, pro.prd_status, pro.sbc_id, pro.sup_id, 
				pro.srv_id, subcat.cat_id, productD.doc_id
				FROM ctt_products AS pro
				LEFT JOIN ctt_subcategories AS subcat ON subcat.sbc_id = pro.sbc_id
				LEFT JOIN ctt_products_documents AS productD ON productD.prd_id = pro.prd_id
				 where pro.prd_id = '".$params['idDocument']."' limit 1;";
		return  $this->db->query($qry);
	}

	public function getInfoComunByIDFull($params)
	{
		$qry = "SELECT pro.prd_id, pro.prd_name, pro.prd_english_name, pro.prd_model, pro.prd_price, pro.prd_coin_type, 
				pro.prd_visibility, pro.prd_comments, pro.prd_status, pro.sbc_id, pro.sup_id, 
				pro.srv_id, subcat.cat_id, productD.doc_id, ser.ser_serial_number , ser.ser_cost,
				ser.ser_lonely, ser.ser_behaviour, sProduct.str_id
				FROM ctt_products AS pro
				LEFT JOIN ctt_subcategories AS subcat ON subcat.sbc_id = pro.sbc_id
				LEFT JOIN ctt_products_documents AS productD ON productD.prd_id = pro.prd_id
				LEFT JOIN ctt_series AS ser ON ser.prd_id = pro.prd_id
				LEFT JOIN ctt_stores_products AS sProduct ON sProduct.ser_id = ser.ser_id
						where pro.prd_id = '".$params['idDocument']."';";
		return  $this->db->query($qry);
	}




}