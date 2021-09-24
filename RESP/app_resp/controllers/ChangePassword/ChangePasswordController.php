<?php
    defined('BASEPATH') or exit('No se permite acceso directo');
    require_once ROOT . FOLDER_PATH . '/app/models/ChangePassword/ChangePasswordModel.php';
    require_once LIBS_ROUTE .'Session.php';

class ChangePasswordController extends Controller
{
    private $session;
    public $model;


  public function __construct()
  {
    $this->model = new ChangePasswordModel();
    $this->session = new Session();
    $this->session->init();
    if($this->session->getStatus() === 1 || empty($this->session->get('empleado')))
      header('location: ' . FOLDER_PATH .'/login');
  }

  public function exec()
  {
    $params = array('empleado' => $this->session->get('empleado'));
    $this->render(__CLASS__, $params);
  }


  public function cambia_password($request_params){
    $params =  $this->session->get('empleado');
    $result = $this->model->cambiaPassword($request_params);
    $res = $result;
    echo $res;
  }

}