<?php
    defined('BASEPATH') or exit('No se permite acceso directo');
    require_once ROOT . FOLDER_PATH . '/app/models/WarehouseOutputs/WarehouseOutputsModel.php';
    require_once LIBS_ROUTE .'Session.php';

class WarehouseOutputsController extends Controller
{
	private $session;
	public $model;


	public function __construct()
	{
		$this->model = new WarehouseOutputsModel();
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

// Obtiene datos del proyecto seleccionado
public function getSelectProject($request_params)
{
	$params =  $this->session->get('user');
	$result = $this->model->getSelectProject($request_params);
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

}