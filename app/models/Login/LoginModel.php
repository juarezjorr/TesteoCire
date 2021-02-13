<?php 
/**
* 
*/
class LoginModel extends Model
{

public function __construct()
{
	parent::__construct();
}

/*  ---- Obtiene los datos del usuarios logueado ---- */
	public function signIn($employee)
	{
		$employee = $this->db->real_escape_string($employee);

		$sql = "SELECT *  FROM ctt_users AS usr 
				INNER JOIN ctt_employees AS emp ON emp.emp_id = usr.emp_id
				INNER JOIN ctt_profiles AS prf ON prf.prf_id = usr.prf_id 
				WHERE emp.emp_number = '{$employee}'";
				
		return $this->db->query($sql);
	}
}