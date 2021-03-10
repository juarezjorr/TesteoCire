<?php
	defined('BASEPATH') or exit('No se permite acceso directo');
	require_once ROOT . FOLDER_PATH . '/app/models/Categorias/CategoriasModel.php';
	require_once LIBS_ROUTE . 'Session.php';

	class CategoriasController extends Controller
	{

		private $session;
		public $model;

		public function __construct()
		{
			$this->model = new CategoriasModel();
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

		public function GetCategoria($request_params)
		{
	      $result = $this->model->GetCategoria($request_params);
		  echo json_encode($result,JSON_UNESCAPED_UNICODE);	
		}

		public function SaveCategoria($request_params)
		{
		  if($request_params['IdCategoria'] == ""){
			$result = $this->model->SaveCategoria($request_params);	  
		  }else{
			$result = $this->model->ActualizaCategoria($request_params);	  
		  }
		  echo json_encode($result,JSON_UNESCAPED_UNICODE);	
		}

		public function GetCategorias($request_params)
		{
	      $result = $this->model->GetCategorias($request_params);
		  echo json_encode($result,JSON_UNESCAPED_UNICODE);	
		}

		public function DeleteCategoria($request_params)
		{
		  $result = $this->model->DeleteCategoria($request_params);	  
		  echo json_encode($result ,JSON_UNESCAPED_UNICODE);	
		}


	  
	}