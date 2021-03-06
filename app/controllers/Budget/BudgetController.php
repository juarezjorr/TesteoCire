<?php
    defined('BASEPATH') or exit('No se permite acceso directo');
    require_once ROOT . FOLDER_PATH . '/app/models/Budget/BudgetModel.php';
    require_once LIBS_ROUTE .'Session.php';

class BudgetController extends Controller
{
    private $session;
    public $model;


    public function __construct()
    {
        $this->model = new BudgetModel();
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

// Lista los Productores
    public function listCustomers($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->listCustomers($request_params);
        $i = 0;
        while($row = $result->fetch_assoc()){
            $rowdata[$i] = $row;
            $i++;
        }
        if ($i>0){
            $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
        } else {
            $res =  '[{"cus_id":"0"}]';	
        }
        echo $res;
    } 

    
// Lista los proyectos
    public function listProjects($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->listProjects($request_params);
        $i = 0;
        while($row = $result->fetch_assoc()){
            $rowdata[$i] = $row;
            $i++;
        }
        if ($i>0){
            $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
        } else {
            $res =  '[{"pjt_id":"0"}]';	
        }
        echo $res;

    } 

    
// Lista los tipos de proyectos
    public function listProjectsType($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->listProjectsType($request_params);
        $i = 0;
        while($row = $result->fetch_assoc()){
            $rowdata[$i] = $row;
            $i++;
        }
        if ($i>0){
            $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
        } else {
            $res =  '[{"pjt_id":"0"}]';	
        }
        echo $res;

    } 

    
// Lista las casas productoras
    public function listCustomersDef($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->listCustomersDef($request_params);
        $i = 0;
        while($row = $result->fetch_assoc()){
            $rowdata[$i] = $row;
            $i++;
        }
        if ($i>0){
            $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
        } else {
            $res =  '[{"cuo_id":"0"}]';	
        }
        echo $res;
    } 

 
// Lista las casas productoras
    public function listCustomersOwn($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->listCustomersOwn($request_params);
        $i = 0;
        while($row = $result->fetch_assoc()){
            $rowdata[$i] = $row;
            $i++;
        }
        if ($i>0){
            $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
        } else {
            $res =  '[{"cuo_id":"0"}]';	
        }
        echo $res;
    } 


    


// Lista los proyectos relacionados
    public function listProjectsDef($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->listProjectsDef($request_params);
        $i = 0;
        while($row = $result->fetch_assoc()){
            $rowdata[$i] = $row;
            $i++;
        }
        if ($i>0){
            $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
        } else {
            $res =  '[{"cuo_id":"0"}]';	
        }
        echo $res;
    } 
    

    
// Lista los versiones
    public function listVersion($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->listVersion($request_params);
        $i = 0;
        while($row = $result->fetch_assoc()){
            $rowdata[$i] = $row;
            $i++;
        }
        if ($i>0){
            $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
        } else {
            $res =  '[{"ver_id":"0"}]';	
        }
        echo $res;
    } 

    
// Lista las cotizaciones
    public function listBudgets($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->listBudgets($request_params);
        $i = 0;
        while($row = $result->fetch_assoc()){
            $rowdata[$i] = $row;
            $i++;
        }
        if ($i>0){
            $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
        } else {
            $res =  '[{"bdg_id":"0"}]';	
        }
        echo $res;
    } 

// Lista los descuentos
    public function listDiscounts($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->listDiscounts($request_params);
        $i = 0;
        while($row = $result->fetch_assoc()){
            $rowdata[$i] = $row;
            $i++;
        }
        if ($i>0){
            $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
        } else {
            $res =  '[{"dis_id":"0"}]';	
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

    
// Lista los relacionados al producto
public function listProductsRelated($request_params)
{
    $params =  $this->session->get('user');
    $result = $this->model->listProductsRelated($request_params);
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

// Guarda la cotizaci??n
    public function SaveBudget($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->SaveBudget($request_params);
        echo $result;
        
    } 


    
    
// Guarda nuevo proyecto
    public function SaveProject($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->SaveProject($request_params);
        echo $result;
    } 


        
// Guarda nueva version
    public function SaveVersion($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->SaveVersion($request_params);
        echo $result;
    } 


// Promueve proyecto
    public function PromoteProject($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->PromoteProject($request_params);
        echo $result;
    } 


// Promueve la version de proyecto
public function PromoteVersion($request_params)
{   
    $params =  $this->session->get('user');
    $result = $this->model->PromoteVersion($request_params);
    echo $result;
} 


    
}