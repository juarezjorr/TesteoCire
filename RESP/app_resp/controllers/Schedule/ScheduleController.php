<?php
    defined('BASEPATH') or exit('No se permite acceso directo');
    require_once ROOT . FOLDER_PATH . '/app/models/Schedule/ScheduleModel.php';
    require_once LIBS_ROUTE .'Session.php';

class ScheduleController extends Controller
{
    private $session;
    public $model;


  public function __construct()
  {
    $this->model = new ScheduleModel();
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

// Datos de la unidad
  public function datos_unidad($request_params)
  {
    $params =  $this->session->get('empleado');
    $result = $this->model->datosUnidad($request_params['placa']);


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
    $result = $this->model->datosPlaca($request_params['placa']);

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

// Listado de operadores
  public function datos_operadores($request_params)
  {
    $params =  $this->session->get('empleado');
    $result = $this->model->datosOperador($request_params['puesto']);

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
  // Listado de autorizadores
  public function datos_autorizadores($request_params)
  {
    $params =  $this->session->get('empleado');
    $result = $this->model->datosAutorizador($request_params['puesto']);
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

// Listado de tarjetas comodín
  public function datos_tarjetas($request_params)
  {
    $params =  $this->session->get('empleado');
    $result = $this->model->datosTarjeta($request_params['tipo']);

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


// Listado de destinos
  public function datos_destinos($request_params)
  {
    $params =  $this->session->get('empleado');
    $result = $this->model->datosDestinos($request_params['status']);

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
// Listado de alcaldias
  public function datos_alcaldias($request_params)
  {
    $params =  $this->session->get('empleado');
    $result = $this->model->datosAlcaldias($request_params['status']);
    $res = '';
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
// Agrega Movimiento de unidades
  public function reg_MovUnidades($request_params)
  {
    $params =  $this->session->get('empleado');
    $result = $this->model->regMovUnidades($request_params);
    $res = $result;
    echo $res;

    if ( $request_params['observa']!= ''){

      
      $obs_evento = 'MOV';
      $obs_id_evento = $res;
      $obs_contenido = $request_params['observa'];
      $emp_id  = explode("|", $params);

      $observa = $this->model->observaciones($obs_evento, $obs_id_evento, $obs_contenido, $emp_id[0]);
    }
  }

// Agrega Movimiento de plantas
  public function reg_MovPlantas($request_params)
  {
    $params =  $this->session->get('empleado');
    $result = $this->model->regMovPlantas($request_params);
    $res = $result;
    echo $res;
    


  }
}