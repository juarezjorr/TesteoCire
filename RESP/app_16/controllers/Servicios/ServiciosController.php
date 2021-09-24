<?php
	defined('BASEPATH') or exit('No se permite acceso directo');
	require_once ROOT . FOLDER_PATH . '/app/models/Servicios/ServiciosModel.php';
	require_once LIBS_ROUTE . 'Session.php';

	class ServiciosController extends Controller
	{

		private $session;
		public $model;

		public function __construct()
		{
			$this->model = new ServiciosModel();
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

		public function GetServicio($request_params)
		{
	      $result = $this->model->GetServicio($request_params);
		  echo json_encode($result,JSON_UNESCAPED_UNICODE);	
		}

		public function SaveServicios($request_params)
		{
		  if($request_params['IdServicio'] == ""){
			$result = $this->model->SaveServicios($request_params);	  
		  }else{
			$result = $this->model->ActualizaServicio($request_params);	  
		  }
		  echo json_encode($result,JSON_UNESCAPED_UNICODE);	
		}

		public function GetServicios($request_params)
		{
	      $result = $this->model->GetServicios($request_params);
		  echo json_encode($result,JSON_UNESCAPED_UNICODE);	
		}

		public function DeleteServicio($request_params)
		{
		  $result = $this->model->DeleteServicio($request_params);	  
		  echo json_encode($result ,JSON_UNESCAPED_UNICODE);	
		}


	  
	}