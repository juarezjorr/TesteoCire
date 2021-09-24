<?php
    defined('BASEPATH') or exit('No se permite acceso directo');
    require_once ROOT . FOLDER_PATH . '/app/models/Products/ProductsModel.php';
    require_once LIBS_ROUTE .'Session.php';

class ProductsController extends Controller
{
	private $session;
	public $model;


	public function __construct()
	{
		$this->model = new ProductsModel();
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



// Lista las categorias
	public function listCategories($request_params)
	{
		$params =  $this->session->get('user');
		$result = $this->model->listCategories($request_params);
		$i = 0;
		while($row = $result->fetch_assoc()){
			$rowdata[$i] = $row;
			$i++;
		}
		if ($i>0){
			$res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
		} else {
			$res =  '[{"cat_id":"0"}]';	
		}
		echo $res;
	}



// Lista las subcategorias
	public function listSubcategories($request_params)
	{
		$params =  $this->session->get('user');
		$result = $this->model->listSubcategories($request_params);
		$i = 0;
		while($row = $result->fetch_assoc()){
			$rowdata[$i] = $row;
			$i++;
		}
		if ($i>0){
			$res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
		} else {
			$res =  '[{"sbc_id":"0"}]';	
		}
		echo $res;
	}


// Lista los servicios
public function listServices($request_params)
{
	$params =  $this->session->get('user');
	$result = $this->model->listServices($request_params);
	$i = 0;
	while($row = $result->fetch_assoc()){
		$rowdata[$i] = $row;
		$i++;
	}
	if ($i>0){
		$res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
	} else {
		$res =  '[{"srv_id":"0"}]';	
	}
	echo $res;
}


// Lista los tipos de monedas
public function listCoins($request_params)
	{
		$params =  $this->session->get('user');
		$result = $this->model->listCoins($request_params);
		$i = 0;
		while($row = $result->fetch_assoc()){
			$rowdata[$i] = $row;
			$i++;
		}
		if ($i>0){
			$res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
		} else {
			$res =  '[{"cin_id":"0"}]';	
		}
		echo $res;
	}


// Lista los documentos de fichas técnicas
public function listDocument($request_params)
	{
		$params =  $this->session->get('user');
		$result = $this->model->listDocument($request_params);
		$i = 0;
		while($row = $result->fetch_assoc()){
			$rowdata[$i] = $row;
			$i++;
		}
		if ($i>0){
			$res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
		} else {
			$res =  '[{"doc_id":"0"}]';	
		}
		echo $res;
	}

	
// Lista los productos
	public function listProducts($request_params)
	{
		$params =  $this->session->get('user');
		$result = $this->model->listProducts($request_params);
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

	// Lista las Facturas
	public function listInvoice($request_params)
	{
		$params =  $this->session->get('user');
		$result = $this->model->listInvoice($request_params);
		$i = 0;
		while($row = $result->fetch_assoc()){
			$rowdata[$i] = $row;
			$i++;
		}
		if ($i>0){
			$res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
		} else {
			$res =  '[{"doc_id":"0"}]';	
		}
		echo $res;
    }


// Obtiene datos del producto seleccionado
	public function getSelectProduct($request_params)
	{
		$params =  $this->session->get('user');
		$result = $this->model->getSelectProduct($request_params);
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

	
	
// Lista las series
	public function listSeries($request_params)
	{
		$params =  $this->session->get('user');
		$result = $this->model->listSeries($request_params);
		$i = 0;
		while($row = $result->fetch_assoc()){
			$rowdata[$i] = $row;
			$i++;
		}
		if ($i>0){
			$res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
		} else {
			$res =  '[{"ser_id":"0"}]';	
		}
		echo $res;
	}

	

// Obtiene datos del producto seleccionado
public function getSelectSerie($request_params)
{
	$params =  $this->session->get('user');
	$result = $this->model->getSelectSerie($request_params);
	$i = 0;
	while($row = $result->fetch_assoc()){
		$rowdata[$i] = $row;
		$i++;
	}
	if ($i>0){
		$res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
	} else {
		$res =  '[{"ser_id":"0"}]';	
	}
	echo $res;
}



// Guarda los cambios de un producto
	public function saveEdtProduct($request_params)
	{
		$params =  $this->session->get('user');
		$result = $this->model->saveEdtProduct($request_params);
		$res = $result ;
		echo $res;
	}



// Guarda los cambios de una serie
public function saveEdtSeries($request_params)
{
	$params =  $this->session->get('user');
	$result = $this->model->saveEdtSeries($request_params);
	$res = $result;
	echo $res;
}


// Guarda nuevo producto
	public function saveNewProduct($request_params)
	{
		$params =  $this->session->get('user');
		$result = $this->model->saveNewProduct($request_params);
		$res = $result ;
		echo $res;
	}


	
// Borra un producto seleccionado
	public function deleteProduct($request_params)
	{
		$params =  $this->session->get('user');
		$result = $this->model->deleteProduct($request_params);
		$res = $result ;
		echo $res;
	}


	
// Borra una serie seleccionada
public function deleteSerie($request_params)
{
	$params =  $this->session->get('user');
	$result = $this->model->deleteSerie($request_params);
	$res = $result ;
	echo $res;
}

	

}