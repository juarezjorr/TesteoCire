<?php
    defined('BASEPATH') or exit('No se permite acceso directo');
    require_once ROOT . FOLDER_PATH . '/app/models/ProductsForSubletting/ProductsForSublettingModel.php';
    require_once LIBS_ROUTE .'Session.php';

class ProductsForSublettingController extends Controller
{
	private $session;
	public $model;


	public function __construct()
	{
		$this->model = new ProductsForSublettingModel();
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

// Lista los productos
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

// Lista los proveedores de subarrendo
	public function listSuppliers($request_params)
	{
		$params =  $this->session->get('user');
		$result = $this->model->listSuppliers($request_params['store']);
		$i = 0;
		while($row = $result->fetch_assoc()){
			$rowdata[$i] = $row;
			$i++;
		}
		if ($i>0){
			$res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
		} else {
			$res =  '[{"sup_id":"0"}]';	
		}
		echo $res;
	} 	 

// Agrega los seriales de los productos para subarrendo
	public function addSerie($request_params)
	{
		echo $request_params;
		$params =  $this->session->get('user');
		$result = $this->model->addSerie($request_params);
		echo $result;
		$res =  json_encode($result,JSON_UNESCAPED_UNICODE);	
		
		echo $res;
	} 	
}