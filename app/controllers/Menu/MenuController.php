<?php
    defined('BASEPATH') or exit('No se permite acceso directo');
    require_once ROOT . FOLDER_PATH . '/app/models/Menu/MenuModel.php';
    require_once LIBS_ROUTE .'Session.php';

    class MenuController extends Controller

{
    private $session;
    public $model;


  public function __construct()
  {
    $this->model = new MenuModel();
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

// Listado de elementos del menu
  public function menu($request_params)
	{
	//$params =  $this->session->get('user');
		$result = $this->model->listaMenu($request_params['userid']);
		$i = 0;
        while($row = $result->fetch_assoc()){
            $rowdata[$i] = $row;
            $i++;
        }
        if ($i>0){
            $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
        } else {
            $res =  '[{"mnu_id":"0"}]';	
        }

        // $params = array('unidad' => $res);
        // $this->render(__CLASS__, $params);

        echo $res;
	}



// Listado de elementos del menu
	public function lista_menu($request_params)
	{
	//$params =  $this->session->get('user');
		$result = $this->model->listaMenu($request_params['userid']);
		$params = array('menu' => $result);
		$this->render(__CLASS__, $params);
	}


}