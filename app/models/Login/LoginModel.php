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
	public function signIn($username)
	{
		$username = $this->db->real_escape_string($username);

		$sql = "SELECT usr.*, urm.mod_id, prf.prf_mod_start FROM ctt_users AS usr
				INNER JOIN ctt_user_module AS urm ON urm.usr_id = usr.usr_id
				INNER JOIN ctt_profiles AS prf ON prf.prf_id = usr.prf_id
				WHERE usr.usr_name = '{$username}';";
				
		return $this->db->query($sql);
	}
}