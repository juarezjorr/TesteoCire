<?php 
/**
* 
*/
class MainModel extends Model
{
  
  	public function __construct()
  	{
    	parent::__construct();
  	}

  	public function affected_rows()
  	{
   	 	return $this->db->affected_rows;
  	}

// Agrega nuevo cliente
  	public function addClient($params)
  	{
    	$name = $this->db->real_escape_string($params['name']);
    	$email = $this->db->real_escape_string($params['email']);
    	$address = $this->db->real_escape_string($params['address']);
    	$sql = "INSERT INTO clients (name, email, address) VALUES ('$name', '$email', '$address')";
    	return $this->db->query($sql);
  	}

// Listado de clientes
	public function clientsList()
	{
		$sql = 'SELECT * FROM clients';
		return $this->db->query($sql);
	}
// Detalle del cliente
	public function clientList($id)
	{
		$sql = "SELECT * FROM clients WHERE id='{$id}'";
		return $this->db->query($sql);
	}

// Elimina un cliente
	public function removeClient($id)
  	{
    	$sql = "DELETE FROM clients WHERE id={$id}";
    	return $this->db->query($sql);
  	}

// Actualiza datos del cliente
  	public function updateClient($params)
  	{
    	$name = $this->db->real_escape_string($params['name']);
    	$email = $this->db->real_escape_string($params['email']);
    	$address = $this->db->real_escape_string($params['address']);
    	$id = $this->db->real_escape_string($params['id']);
    	$sql = "UPDATE clients SET name='{$name}', email='{$email}', address='{$address}' WHERE id='{$id}'";
    	return $this->db->query($sql);
  	}
}