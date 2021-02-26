<?php
    defined('BASEPATH') or exit('No se permite acceso directo');
    require_once ROOT . FOLDER_PATH . '/app/models/MoveStores/MoveStoresModel.php';
    require_once LIBS_ROUTE .'Session.php';

class MoveStoresController extends Controller
{
	private $session;
	public $model;


	public function __construct()
	{
		$this->model = new MoveStoresModel();
		$this->session = new Session();
		$this->session->init();
		if($this->session->getStatus() === 1 || empty($this->session->get('user')))
			header('location: ' . FOLDER_PATH .'/login');
	}

	public function exec()
	{
		$params = array('user' => $this->session->get('user'));
		$this->render(__CLASS__, $params);
	}

// Lista los tipos de movimiento
	public function listExchange()
	{
		$params =  $this->session->get('user');
		$result = $this->model->listExchange();
		  $i = 0;
			while($row = $result->fetch_assoc()){
				$rowdata[$i] = $row;
				$i++;
			}
			if ($i>0){
				$res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
			} else {
				$res =  '[{"ext_id":"0"}]';	
			}
			echo $res;
	}

// Lista los almacenes 
	public function listStores($request_params)
	{
	  $params =  $this->session->get('user');
	  $result = $this->model->listStores();
		$i = 0;
		  while($row = $result->fetch_assoc()){
			  $rowdata[$i] = $row;
			  $i++;
		  }
		  if ($i>0){
			  $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
		  } else {
			  $res =  '[{"str_id":"0"}]';	
		  }
  
		  // $params = array('unidad' => $res);
		  // $this->render(__CLASS__, $params);
  
		  echo $res;
		
	}
 // Lista los almacenes 
	public function listProducts($request_params)
	{
		$params =  $this->session->get('user');
		$result = $this->model->listProducts($request_params['store']);
		$i = 0;
		while($row = $result->fetch_assoc()){
			$rowdata[$i] = $row;
			$i++;
		}
		if ($i>0){
			$res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
		} else {
			$res =  '[{"prd_id":"0"}]';	
		}

		// $params = array('unidad' => $res);
		// $this->render(__CLASS__, $params);

		echo $res;
		
	} 
}