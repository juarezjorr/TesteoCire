<?php
    defined('BASEPATH') or exit('No se permite acceso directo');
    require_once ROOT . FOLDER_PATH . '/app/models/TAdminUsuarios/TAdminUsuariosModel.php';
    require_once LIBS_ROUTE .'Session.php';

class TAdminUsuariosController extends Controller
{
    private $session;
    public $model;


	public function __construct()
	{
		$this->model = new TAdminUsuariosModel();
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

// Listado de usuarios
	public function lista_usuarios($request_params)
	{
		$params =  $this->session->get('empleado');
		$result = $this->model->listaUsuarios($request_params['status']);

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

    
// Listado de perfiles
	public function lista_perfiles($request_params)
	{
		$params =  $this->session->get('empleado');
		$result = $this->model->listaPerfiles($request_params['status']);

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

// Actualiza usuarios
	public function actualiza_usuario($request_params)
	{
		$params =  $this->session->get('empleado');
		$result = $this->model->actualizaUsuario($request_params);
		$res = $result;
		echo $res;

		$permisos = $this->model->actualizaPermisos($request_params['id']);
		
		
	}


// Elimina usuario
	public function elimina_usuario($request_params)
	{
		$params =  $this->session->get('empleado');
		$result = $this->model->eliminaUsuario($request_params['id']);
		$res = $result;
		if ($res == 1){
			$res = $request_params['id'];
		}
		echo $res;
		
	}	


// Agrega usuario
	public function agrega_usuario($request_params)
	{
		$params =  $this->session->get('empleado');
		$result = $this->model->agregaUsuario($request_params);
		$id = $result;
		
		$permisos = $this->model->actualizaPermisos($id);
		$empleado = $this->model->actualizaEmpleado($id);
		
	}


// Actualiza password
	public function guarda_password($request_params)
	{
		$params =  $this->session->get('empleado');
		$result = $this->model->guardaPassword($request_params);
		$res = $result;
		if ($res == 1){
			$res = $request_params['id'];
		}
		echo $res;
		
	}	

}