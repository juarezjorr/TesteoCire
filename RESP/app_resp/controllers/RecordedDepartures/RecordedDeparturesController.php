<?php
    defined('BASEPATH') or exit('No se permite acceso directo');
    require_once ROOT . FOLDER_PATH . '/app/models/RecordedDepartures/RecordedDeparturesModel.php';
    require_once LIBS_ROUTE .'Session.php';

class RecordedDeparturesController extends Controller
{
    private $session;
    public $model;


  public function __construct()
  {
    $this->model = new RecordedDeparturesModel();
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
            $res =  '[{"und_id":"0"}]';	
        }

        // $params = array('unidad' => $res);
        // $this->render(__CLASS__, $params);

        echo $res;
      
  }

// Datos de la planta
  public function datos_planta($request_params)
  {
    $params =  $this->session->get('empleado');
    $result = $this->model->datosPlanta($request_params['placa']);

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


}