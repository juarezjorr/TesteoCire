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

		public function GetCategoria($request_params)
		{
	      $result = $this->model->GetCategoria($request_params);
		  echo json_encode($result,JSON_UNESCAPED_UNICODE);	
		}

		public function SaveDocumento($request_params)
		{
			
			$Nombre = $request_params['NomDocumento'];
			$Code = $request_params['CodDocumento'];
			$Type = $request_params['Ext'];
			$Size = $_FILES['file']['size'];
			$Content_type = $_FILES['file']['type'];

			//$data = addslashes(fread(fopen($binary_File, "r"), filesize($binary_File)));

			$Documento_binario = base64_encode((file_get_contents($_FILES['file']['tmp_name'])));


		  if($request_params['idDocumento'] == ""){
			$result = $this->model->SaveDocumento($Nombre,$Code,$Size,$Type,$Content_type,$Documento_binario,$request_params);	  
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

		public function verDocumento($request_params)
		{
		  $result = $this->model->verDocumento($request_params);	
		  //header para tranformar la salida en el tipo de archivo que hemos guardado
/* 		  header("Content-type: ".$result['doc_content_type']); 
		  header('Content-Disposition: attachment; filename="'.$result['doc_name'].'"');
		
		//imprimir el archivo
	      echo $result['doc_document'];   */
		  //print_r($result['doc_document']);

		  $archivo = "";

		  echo json_encode($archivo ,JSON_UNESCAPED_UNICODE);	

		}


	  
	}