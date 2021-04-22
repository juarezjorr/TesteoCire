<?php
	defined('BASEPATH') or exit('No se permite acceso directo');
	require_once ROOT . FOLDER_PATH . '/app/models/Proveedores/ProveedoresModel.php';
	require_once LIBS_ROUTE . 'Session.php';

	class ProveedoresController extends Controller
	{

		private $session;
		public $model;

		public function __construct()
		{
			$this->model = new ProveedoresModel();
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

		public function GetProveedores()
		{
	      $result = $this->model->GetProveedores();
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

		public function SaveProveedores($request_params)
		{
		  if($request_params['IdProveedor'] == ""){
			$result = $this->model->SaveProveedores($request_params);	  
		  }else{
			$result = $this->model->ActualizaProveedor($request_params);	  
		  }
		  echo json_encode($result,JSON_UNESCAPED_UNICODE);	
		}

		public function GetProveedor($request_params)
		{
	      $result = $this->model->GetProveedor($request_params);
		  echo json_encode($result,JSON_UNESCAPED_UNICODE);	
		}

		public function DeleteProveedores($request_params)
		{
		  $result = $this->model->DeleteProveedores($request_params);	  
		  echo json_encode($result ,JSON_UNESCAPED_UNICODE);	
		}

		public function GetTipoProveedores($request_params)
		{
		  $result = $this->model->GetTipoProveedores($request_params);	  
		  echo json_encode($result ,JSON_UNESCAPED_UNICODE);	
		}

	  
	}