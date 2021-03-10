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
		  echo json_encode($result,JSON_UNESCAPED_UNICODE);	
		}

		public function GetProductos($request_params)
		{
	      $result = $this->model->GetProductos($request_params);
		  echo json_encode($result,JSON_UNESCAPED_UNICODE);	
		}

		public function DeleteProducto($request_params)
		{
		  $result = $this->model->DeleteProducto($request_params);	  
		  echo json_encode($result ,JSON_UNESCAPED_UNICODE);	
		}


	  
	}