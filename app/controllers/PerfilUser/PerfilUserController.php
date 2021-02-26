<?php
	defined('BASEPATH') or exit('No se permite acceso directo');
	require_once ROOT . FOLDER_PATH . '/app/models/PerfilUser/PerfilUserModel.php';
	require_once LIBS_ROUTE . 'Session.php';

	class PerfilUserController extends Controller
	{

		private $session;
		public $model;

		public function __construct()
		{
			$this->model = new PerfilUserModel();
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

		public function GetModules($request_params)
		{
	      $result = $this->model->GetModules($request_params);
		  echo json_encode($result,JSON_UNESCAPED_UNICODE);	
		}

		public function getIdModuluesPerfiles($request_params)
		{
	      $result = $this->model->getIdModuluesPerfiles($request_params);
		  echo json_encode($result,JSON_UNESCAPED_UNICODE);	
		}
	  
		
		public function GetPerfiles()
		{
	      $result = $this->model->GetPerfiles();
		  echo json_encode($result,JSON_UNESCAPED_UNICODE);	
		}

		public function SavePerfil($request_params)
		{
		  if($request_params['IdPerfil'] == ""){
			$result = $this->model->SavePerfil($request_params);	  
		  }else{
			$result = $this->model->ActualizaPerfil($request_params);	  
		  }
		  echo json_encode($result ,JSON_UNESCAPED_UNICODE);	
		}

		public function DeletePerfil($request_params)
		{
		  $result = $this->model->DeletePerfil($request_params);	  
		  echo json_encode($result ,JSON_UNESCAPED_UNICODE);	
		}

		public function GetDataPerfil($request_params)
		{
		  $result = $this->model->GetDataPerfil($request_params);	  
		  echo json_encode($result ,JSON_UNESCAPED_UNICODE);	
		}
	}