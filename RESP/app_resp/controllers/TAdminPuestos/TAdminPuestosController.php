<?php
    defined('BASEPATH') or exit('No se permite acceso directo');
    require_once ROOT . FOLDER_PATH . '/app/models/TAdminPuestos/TAdminPuestosModel.php';
    require_once LIBS_ROUTE .'Session.php';

class TAdminPuestosController extends Controller
{
    private $session;
    public $model;


  public function __construct()
  {
    $this->model = new TAdminPuestosModel();
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

// Listado de puestos
  public function lista_puestos($request_params)
  {
      $params =  $this->session->get('empleado');
      $result = $this->model->listaPuestos($request_params['status']);

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

// Actualiza puesto
  public function actualiza_puesto($request_params)
  {
      $params =  $this->session->get('empleado');
      $result = $this->model->actualizaPuesto($request_params);
      $res = $result;
      echo $res;
      
  } 


// Agrega puesto
    public function agrega_puesto($request_params)
    {
        $params =  $this->session->get('empleado');
        $result = $this->model->agregaPuesto($request_params);
        $res = $result;
        if ($res == 1){
            $res = $request_params;
        }
        echo $res;
        
    }

// Elimina puesto
    public function elimina_puesto($request_params)
    {
        $params =  $this->session->get('empleado');
        $result = $this->model->eliminaPuesto($request_params['id']);
        $res = $result;
        if ($res == 1){
            $res = $request_params['id'];
        }
        echo $res;
        
    }
}