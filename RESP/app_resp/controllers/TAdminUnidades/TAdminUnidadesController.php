<?php
    defined('BASEPATH') or exit('No se permite acceso directo');
    require_once ROOT . FOLDER_PATH . '/app/models/TAdminUnidades/TAdminUnidadesModel.php';
    require_once LIBS_ROUTE .'Session.php';

class TAdminUnidadesController extends Controller
{
    private $session;
    public $model;


  public function __construct()
  {
    $this->model = new TAdminUnidadesModel();
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

  
// Listado de unidades
  public function lista_unidades($request_params)
  {
      $params =  $this->session->get('empleado');
      $result = $this->model->listaUnidades($request_params['status']);

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

// Listado de clasificaciones
  public function lista_clasificacion($request_params)
  {
      $params =  $this->session->get('empleado');
      $result = $this->model->listaClasificacion($request_params['status']);

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

// Listado de operadores
    public function lista_operadores($request_params)
    {
        $params =  $this->session->get('empleado');
        $result = $this->model->listaOperadores($request_params['puesto']);

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

// Listado de tarjetas
    public function lista_tarjetas($request_params)
    {
        $params =  $this->session->get('empleado');
        $result = $this->model->listaTarjetas($request_params);

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
    $result = $this->model->listaAreas($request_params);

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

// Listado de unidades padre
public function lista_padres($request_params)
{
    $params =  $this->session->get('empleado');
    $result = $this->model->listaPadres($request_params);

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




// Actualiza unidades
    public function actualiza_unidades($request_params)
    {
        $params =  $this->session->get('empleado');
        $result = $this->model->actualizaUnidades($request_params);
        $res = $result;
        echo $res;

        $unidad = $this->model->actualizaPadre($request_params['id']);
        
    } 
// Elimina unidades
  public function elimina_unidad($request_params)
  {
      $params =  $this->session->get('empleado');
      $result = $this->model->eliminaUnidad($request_params['id']);
      $res = $result;
      if ($res == 1){
          $res = $request_params['id'];
      }
      echo $res;

      $unidad = $this->model->actualizaPadre($request_params['id']);
      
  }

// Agrega unidades
    public function agrega_unidades($request_params)
    {
        $params =  $this->session->get('empleado');
        $result = $this->model->agregaUnidades($request_params);
        $res = $result;
        if ($res == 1){
            $res = $request_params['und_id_padre'];
        }
        echo $res;

        $tarjeta = $this->model->updateTarjeta($request_params['trj_id']);
        $unidad = $this->model->actualizaPadre($request_params['und_id_padre']);
        
    }  
// Actualiza unidad padre
    public function unidad_padre($request_params)
    {
        $params =  $this->session->get('empleado');
        $result = $this->model->actualizaPadre($request_params['id']);
        $res = $result;
        echo $res;
    } 

}
