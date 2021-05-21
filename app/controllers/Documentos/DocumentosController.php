<?php
	defined('BASEPATH') or exit('No se permite acceso directo');
	require_once ROOT . FOLDER_PATH . '/app/models/Documentos/DocumentosModel.php';
	require_once LIBS_ROUTE . 'Session.php';

	class DocumentosController extends Controller
	{

		private $session;
		public $model;


		public function __construct()
		{
			$this->model = new DocumentosModel();
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

		public function GetDocumento($request_params)
		{
	      $result = $this->model->GetDocumento($request_params);
		  echo json_encode($result,JSON_UNESCAPED_UNICODE);	
		}

		public function SaveDocumento($request_params)
		{
			if($request_params['idDocumento'] == ""){
				$result = $this->model->SaveDocumento($request_params);	  
			}else{
				$result = $this->model->ActualizaDocumento($request_params);	  
			}
		  echo $result;	
		}

		public function GetDocumentos($request_params)
		{
	      $result = $this->model->GetDocumentos($request_params);
		  echo json_encode($result,JSON_UNESCAPED_UNICODE);	
		}
		public function GetDocumentosFicha($request_params)
		{
	      $result = $this->model->GetDocumentosFicha($request_params);
		  echo json_encode($result,JSON_UNESCAPED_UNICODE);	
		}

		public function DeleteDocumentos($request_params)
		{
		  $result = $this->model->DeleteDocumentos($request_params);	  
		  echo json_encode($result ,JSON_UNESCAPED_UNICODE);	
		}

		public function verDocumento($request_params)
		{
		  $result = $this->model->verDocumento($request_params);	
		  echo json_encode($result ,JSON_UNESCAPED_UNICODE);	
		}

		
		public function GetTypeDocumento($request_params)
		{
		  $result = $this->model->GetTypeDocumento($request_params);	
		  echo json_encode($result ,JSON_UNESCAPED_UNICODE);	
		}


	  
	}