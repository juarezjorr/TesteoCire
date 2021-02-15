<?php
defined('BASEPATH') or exit('No se permite acceso directo');
require_once ROOT . FOLDER_PATH .'/app/models/Login/LoginModel.php';
require_once LIBS_ROUTE .'Session.php';

/**
* Login controller
*/
class LoginController extends Controller
{
  private $model;

  private $session;

  public function __construct()
  {
    $this->model = new LoginModel();
    $this->session = new Session();

  }

  public function exec()
  {
    $this->render(__CLASS__);
  }

  public function signin($request_params)
  {

    if($this->verify($request_params))
      return $this->renderErrorMessage('El usuario y password son obligatorios');

    $result = $this->model->signIn($request_params['txtEmployee']);

    $numeros = $result->num_rows;
    if(!$result->num_rows)
      return $this->renderErrorMessage("El usuario {$request_params['txtUsername']} no fue encontrado");

    $result = $result->fetch_object();
     
    if(!password_verify($request_params['txtPassword'], $result->usr_password))
      return $this->renderErrorMessage('La contraseña es incorrecta');


    $user = $result->usr_id . '|' . $result->usr_username . '|' . $result->emp_fullname . '|' . $result->prf_id . '|' . $result->mod_id  . '|' . $result->prf_mod_start;

    $this->session->init();
    $this->session->add('user', $user);

    $page = $result->prf_mod_start;

//    $params = array('usuario' => $this->session->get('usuario'));

    setcookie("user", $user, time()+18000,'/');

    $pwd = $request_params['txtPassword'];
    if ( substr($pwd,0,3) == '$CH'){
      header('location: ' . FOLDER_PATH .'/changePassword');
    } else {

      header('location: ' . FOLDER_PATH .'/' . $page);
    }

  //$params =  $this->session->get('usuario');

  }

  private function verify($request_params)
  {
    
    return empty($request_params['txtEmployee']) OR empty($request_params['txtPassword']);
  }

  private function renderErrorMessage($message)
  {
    // $message = password_hash('secreto', PASSWORD_DEFAULT);
    $params = array('error_message' => $message);
    $this->render(__CLASS__, $params);
  }


  private function verify_code($codeReq, $usuarioId, $codeReg)
  {
    
    $usuario = str_pad($usuarioId, 6, "0", STR_PAD_LEFT) ;
    $compuesto = substr($codeReq,0,3)  . $usuario .  substr($codeReq,-6,6);
   
    if ($compuesto == $codeReg)
      return true;
   
    return false;
  }

 
  public function signout()
  {
    echo 'Cierra';
    setcookie('user','',time()-1000);
    $this->session->close();
    header('location: ' . FOLDER_PATH .'/Login');
  }

}