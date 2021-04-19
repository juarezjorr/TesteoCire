<?php
	defined('BASEPATH') or exit('No se permite acceso directo');
	require_once ROOT . FOLDER_PATH . '/app/models/Almacenes/AlmacenesModel.php';
	require_once LIBS_ROUTE . 'Session.php';

	class AlmacenesController extends Controller
	{

		private $session;
		public $model;

		public function __construct()
		{
			$this->model = new AlmacenesModel();
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

		public function GetAlmacen($request_params)
		{
	      $result = $this->model->GetAlmacen($request_params);
		  echo json_encode($result,JSON_UNESCAPED_UNICODE);	
		}

		public function SaveAlmacen($request_params)
		{
		  if($request_params['IdAlmacen'] == ""){
			$result = $this->model->SaveAlmacen($request_params);	  
		  }else{
			$result = $this->model->ActualizaAlmacen($request_params);	  
		  }
		  echo json_encode($result,JSON_UNESCAPED_UNICODE);	
		}

		public function GetAlmacenes($request_params)
		{
	      $result = $this->model->GetAlmacenes($request_params);
		  echo json_encode($result,JSON_UNESCAPED_UNICODE);	
		}

		public function DeleteAlmacen($request_params)
		{
		  $result = $this->model->DeleteAlmacen($request_params);	  
		  echo json_encode($result ,JSON_UNESCAPED_UNICODE);	
		}

		public function GetEncargadosAlmacen($request_params)
		{
	      $result = $this->model->GetEncargadosAlmacen($request_params);
		  echo json_encode($result,JSON_UNESCAPED_UNICODE);	
		}


	  
	}