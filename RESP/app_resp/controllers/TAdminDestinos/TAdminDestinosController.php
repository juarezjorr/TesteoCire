<?php
    defined('BASEPATH') or exit('No se permite acceso directo');
    require_once ROOT . FOLDER_PATH . '/app/models/TAdminDestinos/TAdminDestinosModel.php';
    require_once LIBS_ROUTE .'Session.php';

class TAdminDestinosController extends Controller
{
    private $session;
    public $model;


  public function __construct()
  {
    $this->model = new TAdminDestinosModel();
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



// Listado de destinos
    public function lista_destinos($request_params)
    {
        $params =  $this->session->get('empleado');
        $result = $this->model->listaDestinos($request_params['status']);

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
// Actualiza destinos
    public function actualiza_destinos($request_params)
    {
        $params =  $this->session->get('empleado');
        $result = $this->model->actualizaDestinos($request_params);
        $res = $result;
        echo $res;
        
    }    

// Elimina destinos
    public function elimina_destinos($request_params)
    {
        $params =  $this->session->get('empleado');
        $result = $this->model->eliminaDestinos($request_params['id']);
        $res = $result;
        if ($res == 1){
            $res = $request_params['id'];
        }
        echo $res;
        
    }

// Agrega destinos
    public function agrega_destinos($request_params)
    {
        $params =  $this->session->get('empleado');
        $result = $this->model->agregaDestinos($request_params);
        $res = $result;
        if ($res == 1){
            $res = $request_params;
        }
        echo $res;
        
    }      
  
}