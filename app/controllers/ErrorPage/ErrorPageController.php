<?php
defined('BASEPATH') or exit('No se permite acceso directo');

/**
 * Home controller
 */
class ErrorPageController extends Controller
{
  /**
   * string 
   */
  public $nombre;

  /**
   * object 
   */
  public $model;


  /**
  * Método estándar
  */
  public function exec()
  {
    $this->show();
  }

  public function show()
    {
      $params = array('nombre' => $this->nombre);
      $this->render(__CLASS__, $params); 
    }

}