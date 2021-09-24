<?php
    defined('BASEPATH') or exit('No se permite acceso directo');
    require_once ROOT . FOLDER_PATH . '/app/models/StartingFlag/StartingFlagModel.php';
    require_once LIBS_ROUTE .'Session.php';

class StartingFlagController extends Controller
{
    private $session;
    public $model;


  public function __construct()
  {
    $this->model = new StartingFlagModel();
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

// Listado de salidas pendients
  public function lista_salida($request_params)
  {
    $params =  $this->session->get('empleado');
    $result = $this->model->listaSalidas($request_params['status']);

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


  
// Datos de la salida
  public function datos_salida($request_params)
  {
    $params =  $this->session->get('empleado');
    $result = $this->model->datosSalida($request_params['movement']);

      $i = 0;
        while($row = $result->fetch_assoc()){
            $rowdata[$i] = $row;
            $i++;
        }
        if ($i>0){
            $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
        } else {
            $res =  '[{"und_id":"0"}]';	
        }

        echo $res;
      
  }

// Datos de la unidad
  public function datos_unidad($request_params)
  {
    $params =  $this->session->get('empleado');
    $result = $this->model->datosUnidad($request_params['movement']);

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

        // $params = array('unidad' => $res);
        // $this->render(__CLASS__, $params);

        echo $res;
      
  }

// Datos de la planta
  public function datos_planta($request_params)
  {
    $params =  $this->session->get('empleado');
    $result = $this->model->datosPlanta($request_params['movement']);

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
// Datos de las observaciones
  public function datos_observaciones($request_params)
  {
    $params =  $this->session->get('empleado');
    $result = $this->model->datosObservaciones($request_params['movement']);

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

// Registra la salida de unidades
    public function registra_salida($request_params)
    {
      $params =  $this->session->get('empleado');
      $result = $this->model->registraSalida($request_params);
      $res = $result;
      echo $res;

      $consumo = $this->model->registraConsumo($request_params);
      $combust = $this->model->actualizaLitros($request_params);
   }


}