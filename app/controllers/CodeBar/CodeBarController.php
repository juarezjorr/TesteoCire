<?php
    defined('BASEPATH') or exit('No se permite acceso directo');
    require_once ROOT . FOLDER_PATH . '/app/models/CodeBar/CodeBarModel.php';
    require_once LIBS_ROUTE .'Session.php';

class CodeBarController extends Controller
{
	private $session;
	public $model;


	public function __construct()
	{
		$this->model = new CodeBarModel();
		$this->session = new Session();
		$this->session->init();
		if($this->session->getStatus() === 1 || empty($this->session->get('user')))
			header('location: ' . FOLDER_PATH .'/Login');
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

			  
		  // $params = array('unidad' => $res);
		  // $this->render(__CLASS__, $params);
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
		echo $res;
	} 

// Lista los almacenes 
	public function listExchanges($request_params)
	{
		$params =  $this->session->get('user');
		$result = $this->model->listExchanges($request_params['guid']);
		$i = 0;
		while($row = $result->fetch_assoc()){
			$rowdata[$i] = $row;
			$i++;
		}
		if ($i>0){
			$res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
			//$res =  json_encode($rowdata, JSON_HEX_QUOT);
		} else {
			$res =  '[{"exc_id":"0"}]';	
		}
		echo $res;
	} 

// Registra los movimientos entre almacenes
	public function SaveExchange($request_params)
	{
		$params =  $this->session->get('user');
		$result = $this->model->SaveExchange($request_params, $params);
		$res = $result;
        echo $res;
	} 


// Actualiza la situacion del almacen
	public function UpdateStores($request_params)
	{
		echo $request_params['mov'] ;
		if ($request_params['mov'] == 'S' ){
			$params =  $this->session->get('user');
			$result = $this->model->UpdateStoresSource($request_params);
			$res = $result;
			echo $res;
		}
		if ($request_params['mov'] == 'T' ){
			$params =  $this->session->get('user');
			$item = $this->model->SechingProducts($request_params);
			$num_items = $item->fetch_object();

			if ($num_items->items > 0){
				echo 'update';
				// actualiza la cantidad en el almacen destino
				$result = $this->model->UpdateProducts($request_params);
				
			} else {
				echo 'insert';
				//agrega la relación almacen - producto
				$result = $this->model->InsertProducts($request_params);
				
			}
			$res = $result;
			echo $res;
		}
	} 
}