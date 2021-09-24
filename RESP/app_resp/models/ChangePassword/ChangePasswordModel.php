<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class ChangePasswordModel extends Model
{

    public function __construct()
    {
      parent::__construct();
    }


// actualiza la contraseña
  public function cambiaPassword($params)
  {
    $emp_id =  $this->db->real_escape_string($params['emp_id']);
    $passwd = password_hash($this->db->real_escape_string($params['passwd']), PASSWORD_DEFAULT);

		$qry = " UPDATE sic_usuarios SET usr_password = '$passwd' WHERE emp_id = $emp_id;";

    return $this->db->query($qry);
    
  }

}