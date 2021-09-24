<?php
    defined('BASEPATH') or exit('No se permite acceso directo');
    require_once ROOT . FOLDER_PATH . '/app/models/TAdminTarjetas/TAdminTarjetasModel.php';
    require_once LIBS_ROUTE .'Session.php';

class TAdminTarjetasController extends Controller
{
    private $session;
    public $model;


  public function __construct()
  {
    $this->model = new TAdminTarjetasModel();
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

// Listado de tarjetas
  public function lista_tarjetas($request_params)
  {
      $params =  $this->session->get('empleado');
      $result = $this->model->listaTarjetas($request_params['status']);

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

// Listado de tipos
  public function lista_tipos($request_params)
  {
      $params =  $this->session->get('empleado');
      $result = $this->model->listaTipos($request_params['status']);

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
// Listado de estados
  public function lista_estados($request_params)
  {
      $params =  $this->session->get('empleado');
      $result = $this->model->listaEstados($request_params['status']);

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

// Actualiza tarjeta
  public function actualiza_tarjeta($request_params)
  {
      $params =  $this->session->get('empleado');
      $result = $this->model->actualizaTarjeta($request_params);
      $res = $result;
      echo $res;
      
  } 


// Agrega tarjeta
    public function agrega_tarjeta($request_params)
    {
        $params =  $this->session->get('empleado');
        $result = $this->model->agregaTarjeta($request_params);
        $res = $result;
        if ($res == 1){
            $res = $request_params;
        }
        echo $res;
        
    }

// Elimina tarjeta
    public function elimina_tarjeta($request_params)
    {
        $params =  $this->session->get('empleado');
        $result = $this->model->eliminaTarjeta($request_params['id']);
        $res = $result;
        if ($res == 1){
            $res = $request_params['id'];
        }
        echo $res;
        
    }
}