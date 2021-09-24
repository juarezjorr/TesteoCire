<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class TAdminUsuariosModel extends Model
{

	public function __construct()
	{
		parent::__construct();
	}


// Listado de Empleados
	public function listaUsuarios($status)
	{
	$status = $this->db->real_escape_string($status);

	$qry = "    SELECT 'S' as llave, em.emp_nombre, em.emp_numero, pf.prf_nombre, 
						us.usr_id, us.usr_permisos, us.usr_fch_registro, 
						ifnull(us.usr_fch_ult_acceso,'') as usr_fch_ult_acceso, 
						ifnull(us.usr_fch_cambio_pwd,'') as usr_fch_cambio_pwd
				FROM sic_usuarios AS us
				LEFT JOIN sic_empleados as em ON em.emp_id = us.emp_id
				LEFT JOIN sic_perfiles as pf ON pf.prf_id = us.prf_id
				WHERE us.usr_status = $status;";

	return $this->db->query($qry);
	}	


	
// Listado de Perfiles
	public function listaPerfiles($status)
	{
		$status = $this->db->real_escape_string($status);

		$qry = "    SELECT 'S' as llave, prf_id as id, prf_nombre as nombre, prf_codificacion as codigos FROM sic_perfiles;";

		return $this->db->query($qry);
	}
	
// Listado de empleados
public function listaEmpleados($status)
{
	$status = $this->db->real_escape_string($status);

	$qry = "    SELECT 'S' AS llave, emp_id AS id, emp_nombre AS nombre, emp_numero AS numero FROM sic_empleados WHERE emp_status = $status;";

	return $this->db->query($qry);
}

// Actualiza Usuarios
	public function actualizaUsuario($params)
	{
		$id = $this->db->real_escape_string($params['id']);
		$field = $this->db->real_escape_string($params['field']);
		$valor = $this->db->real_escape_string($params['valor']);

		$qry = " UPDATE sic_usuarios SET ". $field . " = '" . $valor ."' WHERE usr_id = $id;";

		return $this->db->query($qry);
		
	}

// Actualiza Permisos
	public function actualizaPermisos($id)
	{
		$id = $this->db->real_escape_string($id);

		$qry = "UPDATE sic_usuarios as a
				INNER JOIN sic_perfiles as b ON b.prf_id = a.prf_id
				SET a.usr_permisos = b.prf_codificacion
				WHERE a.usr_id = $id;";

		return $this->db->query($qry);
		
	}

// Actualiza Empleados
	public function actualizaEmpleado($id)
	{
		$id = $this->db->real_escape_string($id);

		$qry = "UPDATE sic_usuarios as a
				INNER JOIN sic_empleados as b ON b.emp_id = a.emp_id
				SET a.emp_numero = b.emp_numero
				WHERE a.usr_id = $id;";

		return $this->db->query($qry);
		
	}



	
// Elimina Empleados
	public function eliminaUsuario($id)
	{
		$id = $this->db->real_escape_string($id);

		$qry = " UPDATE sic_usuarios SET usr_status = 0 WHERE usr_id = $id;";

		return $this->db->query($qry);
		
	}  


// Agrega Usuario
	public function agregaUsuario($params)
	{
		$emp_id = $this->db->real_escape_string($params['emp_id']);
		$prf_id = $this->db->real_escape_string($params['prf_id']);
		$usr_password = password_hash($this->db->real_escape_string($params['usr_password']), PASSWORD_DEFAULT);
		$usr_status = 1;

		$qry = " INSERT INTO sic_usuarios (emp_id, prf_id, usr_password, usr_status)
				VALUES ($emp_id, $prf_id, '$usr_password', $usr_status);";

		$this->db->query($qry);
		$id = $this->db->insert_id;
		return $id;
		
	}

	
// Elimina Empleados
	public function guardaPassword($params)
	{
		$id = $this->db->real_escape_string($params['id']);
		$passwd = password_hash($this->db->real_escape_string($params['passwd']), PASSWORD_DEFAULT);

		$qry = " UPDATE sic_usuarios SET usr_password = '$passwd' WHERE usr_id = $id;";

		return $this->db->query($qry);
		
	}  	

}