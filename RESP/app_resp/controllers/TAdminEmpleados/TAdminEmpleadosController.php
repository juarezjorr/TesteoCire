<?php
    defined('BASEPATH') or exit('No se permite acceso directo');
    require_once ROOT . FOLDER_PATH . '/app/models/TAdminEmpleados/TAdminEmpleadosModel.php';
    require_once LIBS_ROUTE .'Session.php';

class TAdminEmpleadosController extends Controller
{
    private $session;
    public $model;


  public function __construct()
  {
    $this->model = new TAdminEmpleadosModel();
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



// Listado de empleados
    public function lista_empleados($request_params)
    {
        $params =  $this->session->get('empleado');
        $result = $this->model->listaEmpleados($request_params['status']);

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

// Listado de areas
    public function lista_areas($request_params)
    {
        $params =  $this->session->get('empleado');
        $result = $this->model->listaAreas($request_params['status']);

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
// Actualiza empleados
    public function actualiza_empleado($request_params)
    {
        $params =  $this->session->get('empleado');
        $result = $this->model->actualizaEmpleado($request_params);
        $res = $result;
        echo $res;
        
    }    

// Elimina empleados
    public function elimina_empleado($request_params)
    {
        $params =  $this->session->get('empleado');
        $result = $this->model->eliminaEmpleado($request_params['id']);
        $res = $result;
        if ($res == 1){
            $res = $request_params['id'];
        }
        echo $res;
        
    }

// Agrega empleados
    public function agrega_empleado($request_params)
    {
        $params =  $this->session->get('empleado');
        $result = $this->model->agregaEmpleado($request_params);
        $res = $result;
        if ($res == 1){
            $res = $request_params;
        }
        echo $res;
        
    }      
  
}