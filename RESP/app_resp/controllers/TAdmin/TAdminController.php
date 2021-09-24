<?php
    defined('BASEPATH') or exit('No se permite acceso directo');
    require_once ROOT . FOLDER_PATH . '/app/models/TAdmin/TAdminModel.php';
    require_once LIBS_ROUTE .'Session.php';

class TAdminController extends Controller
{
    private $session;
    public $model;


  public function __construct()
  {
    $this->model = new TAdminModel();
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


  
}