<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class PerfilUserModel extends Model
{
	public function __construct()
	{
		parent::__construct();
	}

// Optiene los modulos existentes - TODOS
	public function GetModules($params)
	{
		if ($params['ModUser'] == '') {
			$qry = "select mod_id,mod_code,mod_name,mod_description from ctt_modules;";
		}  else {
			if($params['tipeModul'] == 'Asig'){
				$qry = "select mod_id,mod_code,mod_name,mod_description from ctt_modules where mod_id in (".$params['ModUser'].");"; //Asignados
			}else{
				$qry = "select mod_id,mod_code,mod_name,mod_description from ctt_modules where mod_id not in (".$params['ModUser'].");"; // Disponibles
			}
		}	
		$result = $this->db->query($qry);
		$lista = array();
		while ($row = $result->fetch_row()){
			$item = array("mod_id" =>$row[0],
						  "mod_code" =>$row[1],
						  "mod_name"=>$row[2],
						  "mod_description"=>$row[3]);
			array_push($lista, $item);
		}
		//print_r($lista);
		return $lista;
	}

// Optiene los Perfiles existentes
	public function GetPerfiles()
	{
		$qry = "select prf_id,prf_code, prf_name, prf_description from ctt_profiles where prf_status = 1;";
		$result = $this->db->query($qry);
		$lista = array();
		while ($row = $result->fetch_row()){
			$item = array("prf_id" =>$row[0],
						"prf_code" =>$row[1],
						"prf_name"=>$row[2],
						"prf_description"=>$row[3]);
			array_push($lista, $item);
		}
		return $lista;
	}

	// Optiene los Perfiles existentes
	public function getIdModuluesPerfiles($params)
	{
		//Optenemos los reportes asociados al perfil
		$qry = "SELECT mod_id FROM ctt_profile_module WHERE prf_id = '".$params['idPerfil']."'";
		$result = $this->db->query($qry);
		$modulesAsing = "";
		while ($row = $result->fetch_row()){
			$modulesAsing .= $row[0].",";
		}
		$modulesAsing = substr($modulesAsing, 0, -1);
		return $modulesAsing;
	}

	

//Guarda perfil
	public function SavePerfil($params)
	{
        $estatus = 0;
			try {
				//Inserta perfil
				$qry = "insert into ctt_profiles ( prf_code, prf_name, prf_description, prf_mod_start,prf_status) 
						values('".$params['CodPerfil']."','".$params['NomPerfil']."','".$params['DesPerfil']."', 'Start',1);";
				$this->db->query($qry);

				//optiene id de perfil insertado
				$qry = "SELECT MAX(prf_id) AS id FROM ctt_profiles;";
				$result = $this->db->query($qry);
				if ($row = $result->fetch_row()) {
				    $lastid = trim($row[0]);
				}

				//inserta relacion modulo perfil
				$arrayModules = explode(",", $params['modulesAsig']);
				foreach ($arrayModules as $id) {
					$qry = "insert into ctt_profile_module (prf_id,mod_id) values (".$lastid.",".$id.");";
					$this->db->query($qry);
				}

				$estatus = $lastid;
			} catch (Exception $e) {
				$estatus = 0;
				//echo 'Excepción capturada: ',  $e->getMessage(), "\n";
			}
		return $estatus;
	}

//Actuliza perfil
	public function ActualizaPerfil($params)
	{
        $estatus = 0;
			try {
				//Actualiza perfil
				$qry = "UPDATE ctt_profiles
						SET prf_code = '".$params['CodPerfil']."',
							prf_name = '".$params['NomPerfil']."',
							prf_description = '".$params['DesPerfil']."',
							prf_mod_start = 'menu'
						WHERE prf_id = ".$params['IdPerfil'].";";
				$this->db->query($qry);
				//Borra los modulos asignados anteriormente 
				$qry = "DELETE FROM ctt_profile_module WHERE prf_id ='".$params['IdPerfil']."'";
				$result = $this->db->query($qry);

				//inserta relacion modulo perfil
				$arrayModules = explode(",", $params['modulesAsig']);
				foreach ($arrayModules as $id) {
					$qry = "insert into ctt_profile_module (prf_id,mod_id) values (".$params['IdPerfil'].",".$id.");";
					$this->db->query($qry);
				}
				$estatus = $params['IdPerfil'];
			} catch (Exception $e) {
				$estatus = 0;
				//echo 'Excepción capturada: ',  $e->getMessage(), "\n";
			}
		return $estatus;
	}



	//borra perfil
	public function DeletePerfil($params)
	{
		$estatus = 0;
			try {
				//Borra perfil
				$qry = "UPDATE ctt_profiles
						SET prf_status = 0
						WHERE prf_id in (".$params['IdPerfil'].");";
				$this->db->query($qry);
				$estatus = 1;
			} catch (Exception $e) {
				$estatus = 0;
				//echo 'Excepción capturada: ',  $e->getMessage(), "\n";
			}
		return $estatus;
	}



	public function GetDataPerfil($params)
	{
		//Optenemos los reportes asociados al perfil
		$qry = "SELECT mod_id FROM ctt_profile_module WHERE prf_id = '".$params['id']."'";
		$result = $this->db->query($qry);
		$modulesAsing = "";
		while ($row = $result->fetch_row()){
			$modulesAsing .= $row[0].",";
		}
		$modulesAsing = substr($modulesAsing, 0, -1);

		//Optenemos los informacion del Usuario
		$qry = "SELECT prf_id,prf_code, prf_name, prf_description FROM ctt_profiles WHERE prf_id ='" .$params['id']."'";
		$result = $this->db->query($qry);
		if ($row = $result->fetch_row()) {
			$item = array("prf_id" =>$row[0],
			"prf_code" =>$row[1],
			"prf_name"=>$row[2],
			"prf_description"=>$row[3],
			"prf_modulesAsing"=>$modulesAsing);
		}
		return $item;
	}

}