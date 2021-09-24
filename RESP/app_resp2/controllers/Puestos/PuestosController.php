<?php
	defined('BASEPATH') or exit('No se permite acceso directo');
	require_once ROOT . FOLDER_PATH . '/app/models/Puestos/PuestosModel.php';
	require_once LIBS_ROUTE . 'Session.php';

	class PuestosController extends Controller
	{

		private $session;
		public $model;

		public function __construct()
		{
			$this->model = new PuestosModel();
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

		public function GetPuesto($request_params)
		{
	      $result = $this->model->GetPuesto($request_params);
		  echo json_encode($result,JSON_UNESCAPED_UNICODE);	
		}

		public function SavePuesto($request_params)
		{
		  if($request_params['IdPuesto'] == ""){
			$result = $this->model->SavePuesto($request_params);	  
		  }else{
			$result = $this->model->ActualizaPuesto($request_params);	  
		  }
		  echo json_encode($result,JSON_UNESCAPED_UNICODE);	
		}

		public function GetPuestos($request_params)
		{
	      $result = $this->model->GetPuestos($request_params);
		  echo json_encode($result,JSON_UNESCAPED_UNICODE);	
		}

		public function DeletePuesto($request_params)
		{
		  $result = $this->model->DeletePuesto($request_params);	  
		  echo json_encode($result ,JSON_UNESCAPED_UNICODE);	
		}


	  
	}