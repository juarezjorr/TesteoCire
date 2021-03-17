<?php
	defined('BASEPATH') or exit('No se permite acceso directo');
	require_once ROOT . FOLDER_PATH . '/app/models/Usuarios/UsuariosModel.php';
	require_once ROOT . FOLDER_PATH . '/app/models/Actions/ActionsModel.php';
	require_once LIBS_ROUTE . 'Session.php';

	class UsuariosController extends Controller
	{

		private $session;
		public $model;
		public $modelActions;

		public function __construct()
		{
			$this->model = new UsuariosModel();
			$this->modelActions = new ActionsModel();

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

		public function GetUsuarios()
		{
	      $result = $this->model->GetUsuarios();
		  $i = 0;
			while($row = $result->fetch_assoc()){
				$rowdata[$i] = $row;
				$i++;
			}
			if ($i>0){
				$res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
			} else {
				$res =  '[{"usr_id":"0"}]';	
			}
			echo $res;
		}

		public function SaveUsuario($request_params)
		{
		  if($request_params['IdUsuario'] == ""){
			$result = $this->model->SaveUsuario($request_params);	  
		  }else{
			$result = $this->model->ActualizaUsuario($request_params);	  
		  }

		  echo json_encode($result,JSON_UNESCAPED_UNICODE);	
		}

		public function GetUsuario($request_params)
		{
	      $result = $this->model->GetUsuario($request_params);
		  echo json_encode($result,JSON_UNESCAPED_UNICODE);	
		}

		public function DeleteUsuario($request_params)
		{
		  $result = $this->model->DeleteUsuario($request_params);	  
		  echo json_encode($result ,JSON_UNESCAPED_UNICODE);	
		}


	  
	}