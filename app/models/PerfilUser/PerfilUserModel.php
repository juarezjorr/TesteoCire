<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class PerfilUserModel extends Model
{
	public function __construct()
	{
		parent::__construct();
	}

// Optiene los modulos existentes
	public function GetModules()
	{
		$qry = "select mod_id,mod_code,mod_name,mod_description from ctt_modules;";
		$result = $this->db->query($qry);
		$lista = array();
		while ($row = $result->fetch_row()){
			$item = array("mod_id" =>$row[0],
						"mod_code" =>utf8_decode($row[1]),
						"mod_name"=>utf8_decode($row[2]),
						"mod_description"=>$row[3]);
			array_push($lista, $item);
		}
		return $lista;
	}

// Optiene los modulos existentes
	public function GetPerfiles()
	{
		$qry = "select prf_id,prf_code, prf_name, prf_description from ctt_profiles;";
		$result = $this->db->query($qry);
		$lista = array();
		while ($row = $result->fetch_row()){
			$item = array("prf_id" =>$row[0],
						"prf_code" =>utf8_decode($row[1]),
						"prf_name"=>utf8_decode($row[2]),
						"prf_description"=>$row[3]);
			array_push($lista, $item);
		}
		return $lista;
	}


	public function SavePerfil($params)
	{
        $estatus = 0;
	try {
		$qry = "insert into ctt_profiles ( prf_code, prf_name, prf_description, prf_mod_start) 
                values('".$params['CodPerfil']."','".$params['NomPerfil']."','".$params['DesPerfil']."', 'menu');";
		$this->db->query($qry);
		$con = mysqli_connect(HOST, USER, PASSWORD, DB_NAME);
		$lastid = mysqli_insert_id($con); 
		$arrayModules = split(',', $params['modulesAsig']);
		
		foreach ($arrayModules as $id) {
			$qry = "insert into ctt_profile_module (prf_id,mod_id) values (".$lastid.",".$id.");";
			$this->db->query($qry);
		}
		$estatus = 1;
	} catch (Exception $e) {
		$estatus = 0;
		//echo 'Excepción capturada: ',  $e->getMessage(), "\n";
	}
		return $estatus;
	}

}