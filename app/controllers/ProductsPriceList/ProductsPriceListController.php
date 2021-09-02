<?php
    defined('BASEPATH') or exit('No se permite acceso directo');
    require_once ROOT . FOLDER_PATH . '/app/models/ProductsPriceList/ProductsPriceListModel.php';
    require_once LIBS_ROUTE .'Session.php';

class ProductsPriceListController extends Controller
{
	private $session;
	public $model;


	public function __construct()
	{
		$this->model = new ProductsPriceListModel();
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

 
// Lista los documentos
    public function listDocuments($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->listDocuments($request_params['store']);
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



// Lista los documentos
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


// Lista productos del paquete
    public function listProductPackages($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->listProductPackages($request_params);
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



}