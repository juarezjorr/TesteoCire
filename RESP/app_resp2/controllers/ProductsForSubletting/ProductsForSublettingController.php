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

// Lista los monedas
    public function listCoins($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->listCoins($request_params['store']);
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


// Lista los monedas
    public function listStores($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->listStores($request_params['store']);
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

// Agrega los seriales de los productos para subarrendo
    public function addSerie($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->addSerie($request_params);
        echo $result;
        
    } 	


// Agrega los productos subarrendados
    public function addSubletting($request_params)
    {
        $params =  $this->session->get('user');
        $result1 = $this->model->addSubletting($request_params);

        $params =  $this->session->get('user');
        $result2 = $this->model->SaveExchange($request_params, $params);

        $params =  $this->session->get('user');
        $item = $this->model->SechingProducts($request_params);
        $num_items = $item->fetch_object();

        if ($num_items->items > 0){
            echo 'update';
            // actualiza la cantidad en el almacen destino
            $result3 = $this->model->UpdateProducts($request_params);
            
        } else {
            echo 'insert';
            //agrega la relación almacen - producto
            $result3 = $this->model->InsertProducts($request_params);
        }
        $res = $result3;
        echo $res;
    } 		
}