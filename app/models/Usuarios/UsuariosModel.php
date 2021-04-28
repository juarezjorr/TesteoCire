<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class UsuariosModel extends Model
{

	public function __construct()
	{
		parent::__construct();
	}


// Optiene los Usuaios existentes
	public function GetUsuarios()
	{
		$qry = "SELECT u.usr_id, u.usr_username, e.emp_fullname, e.emp_number, p.prf_name, u.usr_dt_registry, u.usr_dt_last_access ,p.prf_id FROM ctt_users as u
		INNER JOIN ctt_employees as e on e.emp_id = u.emp_id
		LEFT JOIN ctt_profiles as p on p.prf_id = u.prf_id
		WHERE u.usr_status = '1'";
		return $this->db->query($qry);
	}


	public function GetUsuario($params)
	{
		//Optenemos los reportes asociados al usuario
		$qry = "SELECT mod_id FROM ctt_users_modules WHERE usr_id = '".$params['id']."'";
		$result = $this->db->query($qry);
		$modulesAsing = "";

		while ($row = $result->fetch_row()){
			$modulesAsing .= $row[0].",";
		}
		$modulesAsing = substr($modulesAsing, 0, -1);

		$qry = "SELECT 
					u.usr_id, u.usr_username, e.emp_fullname, e.emp_number, p.prf_name, u.usr_dt_registry, u.usr_dt_last_access ,p.prf_id , e.emp_area, e.emp_id , e.emp_report_to , e.pos_id, u.usr_password
				FROM ctt_users AS u
				INNER JOIN ctt_employees as e on e.emp_id = u.emp_id
		        LEFT JOIN ctt_profiles as p on p.prf_id = u.prf_id
				where u.usr_id =  ".$params['id'].";";
		$result = $this->db->query($qry);
		if($row = $result->fetch_row()){
			$item = array("usr_id" =>$row[0],
			"usr_username" =>$row[1],
			"emp_fullname"=>$row[2],
			"emp_number"=>$row[3],
			"prf_name"=>$row[4],
			"usr_dt_registry"=>$row[5],
			"usr_dt_last_access"=>$row[6],
			"prf_id"=>$row[7],
			"emp_area"=>$row[8],
			"emp_id"=>$row[9],
			"emp_report_to"=>$row[10],	
			"pos_id"=>$row[11],
			"usr_password"=>$row[12],
			"modulesAsing"=>$modulesAsing);
		}
		return $item;
	}

	


	
	public function SaveUsuario($params)
	{
        $estatus = 0;
			try {

				$pass = password_hash($this->db->real_escape_string($params['PassUsuario']), PASSWORD_DEFAULT);


				//Inserta Usuario-Empleado
				$qry = "insert into ctt_employees(emp_number, emp_fullname, emp_area, emp_status, pos_id, emp_report_to) 
				values(".$params['NumEmpUsuario'].",'".$params['NomUsuario']."', '".$params['AreaEmpUsuario']."',1,".$params['idPuesto'].",".$params['idUserReport'].");";
				$this->db->query($qry);

				//optiene id de Usuario insertado
				$qry = "SELECT MAX(emp_id) AS id FROM ctt_employees;";
				$result = $this->db->query($qry);
				if ($row = $result->fetch_row()) {
					$lastid = trim($row[0]);
				}

				//Inserta Usuario
				$qry = "insert into ctt_users (usr_username, usr_password, usr_dt_registry, emp_id, prf_id,usr_status) 
				      values('".$params['UserNameUsuario']."','".$pass."',NOW(),".$lastid.", ".$params['idPerfil'].",1 ) ;";
				$this->db->query($qry);

				//optiene id de Usuario insertado
				$qry = "SELECT MAX(usr_id) AS id FROM ctt_users;";
				$result = $this->db->query($qry);
				if ($row = $result->fetch_row()) {
					$lastid = trim($row[0]);
				}

				//inserta relacion modulo perfil
				$arrayModules = explode(",", $params['modulesAsig']);
				foreach ($arrayModules as $id) {
					$qry = "insert into ctt_users_modules (usr_id,mod_id) values (".$lastid.",".$id.");";
					$this->db->query($qry);
				}
				$estatus = $lastid;
			} catch (Exception $e) {
				$estatus = 0;
				//echo 'Excepción capturada: ',  $e->getMessage(), "\n";
			}
		return $estatus;
	}

	public function ActualizaUsuario($params)
	{
        $estatus = 0;
			try {
				$qry = "SELECT usr_password FROM ctt_users WHERE usr_id = ".$params['IdUsuario'].";";

				$result = $this->db->query($qry);
				if ($row = $result->fetch_row()) {
					$pass = trim($row[0]);
				}

				$password = "";

				if($pass == $params['PassUsuario']){
					$password = $params['PassUsuario'];
				}else{
					$password = password_hash($this->db->real_escape_string($params['PassUsuario']), PASSWORD_DEFAULT);
				}

				//Actualiza Usuario
				$qry = "UPDATE ctt_users 
						SET usr_username = '".$params['UserNameUsuario']."'
						,usr_password = '".$password."'
						,usr_dt_change_pwd = now()
						,prf_id = '".$params['idPerfil']."'
						WHERE usr_id =".$params['IdUsuario'].";";
				$this->db->query($qry);

				//Actualiza Empledo
				$qry = "UPDATE ctt_employees
						SET emp_number = '".$params['NumEmpUsuario']."'
						,emp_fullname = '".$params['NomUsuario']."'
						,emp_area = '".$params['AreaEmpUsuario']."'
						WHERE emp_id = ".$params['EmpIdUsuario'].";";
				$this->db->query($qry);

				//Borra los modulos asignados anteriormente al usuario 
				$qry = "DELETE FROM ctt_users_modules WHERE usr_id ='".$params['IdUsuario']."'";
				$result = $this->db->query($qry);

				//inserta relacion modulo perfil
				$arrayModules = explode(",", $params['modulesAsig']);
				foreach ($arrayModules as $id) {
					$qry = "insert into ctt_users_modules (usr_id,mod_id) values (".$params['IdUsuario'].",".$id.");";
					$this->db->query($qry);
				}
				$estatus = $params['IdUsuario'];
			} catch (Exception $e) {
				$estatus = 0;
				//echo 'Excepción capturada: ',  $e->getMessage(), "\n";
			}
		return $estatus;
	}

	//borra usuario
	public function DeleteUsuario($params)
	{
		$estatus = 0;
			try {
				//Borra perfil
				$qry = "UPDATE ctt_users
						SET usr_status = 0
						WHERE usr_id in (".$params['IdUsuario'].");";
				$this->db->query($qry);
				$estatus = 1;
			} catch (Exception $e) {
				$estatus = 0;
				//echo 'Excepción capturada: ',  $e->getMessage(), "\n";
			}
		return $estatus;
	}


}