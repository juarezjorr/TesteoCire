<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class TAdminEmpleadosModel extends Model
{

    public function __construct()
    {
      parent::__construct();
    }


// Listado de Empleados
  public function listaEmpleados($status)
  {
    $status = $this->db->real_escape_string($status);

    $qry = "    SELECT 'S' AS llave, em.*, pt.pto_nombre, ar.are_nombre  
                FROM sic_empleados AS em 
                LEFT JOIN sic_puestos AS pt ON pt.pto_id = em.pto_id AND pt.pto_status = 1
                LEFT JOIN sic_areas AS ar ON ar.are_id = em.are_id AND ar.are_status = 1
                WHERE em.emp_status= 1;";

    return $this->db->query($qry);
  }

// Listado de Puestos
  public function listaPuestos($status)
  {
    $status = $this->db->real_escape_string($status);

    $qry = " SELECT 'S' AS llave, pt.pto_id AS id, pt.pto_nombre AS nombre FROM sic_puestos AS pt WHERE pt.pto_status=$status;";

    return $this->db->query($qry);
  }

// Listado de areas
    public function listaAreas($status)
    {
    $status = $this->db->real_escape_string($status);

    $qry = " SELECT 'S' as llave, ar.are_id AS id, ar.are_nombre AS nombre FROM sic_areas as ar WHERE ar.are_status=$status;";

    return $this->db->query($qry);
    }  

// Actualiza Empleados
    public function actualizaEmpleado($params)
    {
        $id = $this->db->real_escape_string($params['id']);
        $field = $this->db->real_escape_string($params['field']);
        $valor = $this->db->real_escape_string($params['valor']);
        

        $qry = " UPDATE sic_empleados SET ". $field . " = '" . $valor ."' WHERE emp_id = $id;";

         return $this->db->query($qry);
         
    }

// Elimina Empleados
    public function eliminaEmpleado($id)
    {
        $id = $this->db->real_escape_string($id);

        

        $qry = " UPDATE sic_empleados SET emp_status = 0 WHERE emp_id = $id;";

        return $this->db->query($qry);
        
    }    

// Agrega Empleados
    public function agregaEmpleado($params)
    {
        $emp_numero = $this->db->real_escape_string($params['emp_numero']);
        $emp_nombre = $this->db->real_escape_string($params['emp_nombre']);
        $are_id = $this->db->real_escape_string($params['are_id']);
        $pto_id = $this->db->real_escape_string($params['pto_id']);
        $emp_status = 1;

        $qry = " INSERT INTO sic_empleados (emp_numero, emp_nombre, are_id, pto_id, emp_status)
                 VALUES ('$emp_numero', '$emp_nombre', '$are_id', $pto_id, $emp_status);";

        return $this->db->query($qry);
        
    }    
}