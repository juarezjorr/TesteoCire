<?php
	defined('BASEPATH') or exit('No se permite acceso directo');
	require_once ROOT . FOLDER_PATH . '/app/models/Productos/ProductosModel.php';
	require_once LIBS_ROUTE . 'Session.php';

	class ProductosController extends Controller
	{

		private $session;
		public $model;

		public function __construct()
		{
			$this->model = new ProductosModel();
			$this->session= new Session();
			$this->session->init();
			if($this->session->getStatus()===1 || empty($this->session->get('user')))
				header('location: ' . FOLDER_PATH . '/Login');
		}
		public function exec()
		{
		  $params = array('user' => $this->session->get('user'));
		  $this->render(__CLASS__, $params);
		}

		public function GetProducto($request_params)
		{
	      $result = $this->model->GetProducto($request_params);
		  echo json_encode($result,JSON_UNESCAPED_UNICODE);	
		}

		public function SaveProductos($request_params)
		{
		  if($request_params['IdProducto'] == ""){
			$result = $this->model->SaveProductos($request_params);	  
		  }else{
			$result = $this->model->ActualizaProducto($request_params);	  
		  } 
		  $result=1;
		  echo json_encode($result,JSON_UNESCAPED_UNICODE);	
		}

 		public function GetProductos($request_params)
		{
			echo $this->model->GetProductos($request_params);
			
	
		  //echo json_encode($result,JSON_UNESCAPED_UNICODE);	
		} 

/* 		public function GetProductos($request_params)
		{
			$result = $this->model->GetProductos($request_params);
			$i = 0;
			while($row = $result->fetch_assoc()){
				$rowdata[$i] = $row;
				$i++;
			}
			if ($i>0){
				$res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
			} else {
				$res =  '[]';	
			}
			echo $res;
		  //echo json_encode($result,JSON_UNESCAPED_UNICODE);	
		} */

		public function DeleteProducto($request_params)
		{
		  $result = $this->model->DeleteProducto($request_params);	  
		  echo json_encode($result ,JSON_UNESCAPED_UNICODE);	
		}

		public function GetTipoMoneda($request_params)
		{
		  $result = $this->model->GetTipoMoneda($request_params);	  
		  echo json_encode($result ,JSON_UNESCAPED_UNICODE);	
		}

		
		public function GetAutoComplete($request_params)
		{
		  $result = $this->model->GetAutoComplete($request_params);	  
		  $i = 0;
		  while($row = $result->fetch_assoc()){
			 $rowdata[$i] = $row;
			$i++;
			}
			if ($i>0){
				$res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
			} else {
				$res =  '[{"prd_name":"0"}]';	
			}
			echo $res;
		}

		public function getInfoComun($request_params)
		{
		  $result = $this->model->getInfoComun($request_params);	  
		  $i = 0;
		  while($row = $result->fetch_assoc()){
			 $rowdata[$i] = $row;
			$i++;
			}
			if ($i>0){
				$res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
			} else {
				$res =  '[{"prd_english_name":"0"}]';	
			}
			echo $res;
		}

		public function getInfoComunByID($request_params)
		{
		  $result = $this->model->getInfoComunByID($request_params);	  
		  $i = 0;
		  while($row = $result->fetch_assoc()){
			 $rowdata[$i] = $row;
			$i++;
			}
			if ($i>0){
				$res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
			} else {
				$res =  '[{"prd_english_name":"0"}]';	
			}
			echo $res;
		}
		
		public function getInfoComunByIDFull($request_params)
		{
		  $result = $this->model->getInfoComunByIDFull($request_params);	  
		  $i = 0;
		  while($row = $result->fetch_assoc()){
			 $rowdata[$i] = $row;
			$i++;
			}
			if ($i>0){
				$res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
			} else {
				$res =  '[{"prd_english_name":"0"}]';	
			}
			echo $res;
		}

		public function GetSkuById($request_params)
		{
		  $result = $this->model->GetSkuById($request_params);	  
		  echo json_encode($result ,JSON_UNESCAPED_UNICODE);
		}

		public function GetInfoSkuById($request_params)
		{
		  $result = $this->model->GetInfoSkuById($request_params);	  
		  $i = 0;
		  while($row = $result->fetch_assoc()){
			 $rowdata[$i] = $row;
			$i++;
			}
			if ($i>0){
				$res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
			} else {
				$res =  '[{"sup_id":"0"}]';	
			}
			echo $res;
		}

		public function SaveSku($request_params)
		{
		  $result = $this->model->SaveSku($request_params);	  
		  echo json_encode($result ,JSON_UNESCAPED_UNICODE);
		}

		public function DeleteSku($request_params)
		{
		  $result = $this->model->DeleteSku($request_params);	  
		  echo json_encode($result ,JSON_UNESCAPED_UNICODE);
		}
	
 }


