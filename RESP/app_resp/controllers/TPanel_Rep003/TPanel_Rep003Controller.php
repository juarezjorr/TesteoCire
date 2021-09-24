<?php
    defined('BASEPATH') or exit('No se permite acceso directo');
    require_once ROOT . FOLDER_PATH . '/app/models/TPanel_Rep003/TPanel_Rep003Model.php';
    require_once LIBS_ROUTE .'Session.php';

class TPanel_Rep003Controller extends Controller
{
    private $session;
    public $model;

    public function __construct()
    {
      $this->model = new TPanel_Rep003Model();
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

// Fecha inicial y fecha final
  public function obtiene_fechas($request_params)
  {
      $params =  $this->session->get('empleado');
      $result = $this->model->obtieneFechas($request_params);

      $i = 0;
          while($row = $result->fetch_assoc()){
              $rowdata[$i] = $row;
              $i++;
          }
          if ($i>0){
              $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
          } else {
              $res =  '[{"llave":"E"}]';	
          }
          echo $res;
      
  }


// Fecha inicial y fecha final
  public function rep003_consumo($request_params)
  {
      $params =  $this->session->get('empleado');
      $result = $this->model->rep003Consumo($request_params);

      $i = 0;
          while($row = $result->fetch_assoc()){
              $rowdata[$i] = $row;
              $i++;
          }
          if ($i>0){
              $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
          } else {
              $res =  '[{"llave":"E"}]';	
          }
          echo $res;
  }
}