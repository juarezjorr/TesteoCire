<?php
    defined('BASEPATH') or exit('No se permite acceso directo');
    require_once ROOT . FOLDER_PATH . '/app/models/MoveStoresIn/MoveStoresInModel.php';
    require_once LIBS_ROUTE .'Session.php';

class MoveStoresInController extends Controller
{
    private $session;
    public $model;


    public function __construct()
    {
        $this->model = new MoveStoresInModel();
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

// Lista los Categorias 
    public function listCategories($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->listCategories();
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


// Lista los proveedores
    public function listSuppliers($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->listSuppliers();
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

// Lista los Facturas
    public function listInvoice($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->listInvoice();
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
// Lista los Monedas
    public function listCoins($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->listCoins();
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

// Obtiene el folio del movimiento
	public function NextExchange($request_params)
	{
		$params =  $this->session->get('user');
		$result = $this->model->NextExchange();
		$res = $result;
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


}