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
		$qry = "SELECT usr_id, usr_username, usr_password, prf_id, emp_id FROM ctt_users WHERE usr_status = 1 ;";
		$result = $this->db->query($qry);
		$lista = array();
		while ($row = $result->fetch_row()){
			$item = array("usr_id" =>$row[0],
						"usr_username" =>utf8_decode($row[1]),
						"usr_password"=>utf8_decode($row[2]),
						"prf_id"=>$row[3],
						"emp_id"=>$row[4]);
			array_push($lista, $item);
		}
		return $lista;
	}


	public function GetUsuario($params)
	{
		//Optenemos los reportes asociados al usuario
		$qry = "SELECT mod_id FROM ctt_user_module WHERE usr_id = '".$params['id']."'";
		$result = $this->db->query($qry);
		$modulesAsing = "";
		while ($row = $result->fetch_row()){
			$modulesAsing .= $row[0].",";
		}
		$modulesAsing = substr($modulesAsing, 0, -1);

		$qry = "SELECT 
					U.usr_id, U.usr_username, U.usr_password, U.prf_id, E.emp_id, E.emp_number, E.emp_fullname, E.emp_area, E.pos_id
				FROM ctt_users AS U
				JOIN ctt_employees AS E
				ON U.emp_id = E.emp_id
				where U.usr_id =  ".$params['id'].";";
		$result = $this->db->query($qry);
		if($row = $result->fetch_row()){
			$item = array("usr_id" =>$row[0],
			"usr_username" =>utf8_decode($row[1]),
			"usr_password"=>utf8_decode($row[2]),
			"prf_id"=>$row[3],
			"emp_id"=>$row[4],
			"emp_number"=>$row[5],
			"emp_fullname"=>$row[6],
			"emp_area"=>$row[7],
			"pos_id"=>$row[8],
			"modulesAsing"=>$modulesAsing);
		}
		return $item;
	}

	


	
	public function SaveUsuario($params)
	{
        $estatus = 0;
			try {

				//Inserta Usuario-Empleado
				$qry = "insert into ctt_employees(emp_number, emp_fullname, emp_area, emp_status, pos_id) 
				values(".$params['NumEmpUsuario'].",'".$params['NomUsuario']."', '".$params['AreaEmpUsuario']."',1,1);";
				$this->db->query($qry);

				//optiene id de Usuario insertado
				$qry = "SELECT MAX(emp_id) AS id FROM ctt_employees;";
				$result = $this->db->query($qry);
				if ($row = $result->fetch_row()) {
					$lastid = trim($row[0]);
				}

				//Inserta Usuario
				$qry = "insert into ctt_users (usr_username, usr_password, usr_dt_registry, emp_id, prf_id) 
				      values('".$params['UserNameUsuario']."','".$params['PassUsuario']."',NOW(),".$lastid.", ".$params['idPerfil']." ) ;";
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
					$qry = "insert into ctt_user_module (usr_id,mod_id) values (".$lastid.",".$id.");";
					$this->db->query($qry);
				}
				$estatus = 1;
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
				//Actualiza Usuario
				$qry = "UPDATE ctt_users 
						SET usr_username = '".$params['UserNameUsuario']."'
						,usr_password = '".$params['PassUsuario']."'
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
				$qry = "DELETE FROM ctt_user_module WHERE usr_id ='".$params['IdUsuario']."'";
				$result = $this->db->query($qry);

				//inserta relacion modulo perfil
				$arrayModules = explode(",", $params['modulesAsig']);
				foreach ($arrayModules as $id) {
					$qry = "insert into ctt_user_module (usr_id,mod_id) values (".$params['IdUsuario'].",".$id.");";
					$this->db->query($qry);
				}
				$estatus = 1;
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