<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class TAdminPuestosModel extends Model
{

    public function __construct()
    {
      parent::__construct();
    }

// Listado de Empleados
  public function listaPuestos($status)
  {
    $status = $this->db->real_escape_string($status);

    $qry = " SELECT 'S' as llave, pt.* FROM sic_puestos as pt WHERE pto_status = $status;";

    return $this->db->query($qry);
  }

// Actualiza Puesto
  public function actualizaPuesto($params)
  {
      $id = $this->db->real_escape_string($params['id']);
      $field = $this->db->real_escape_string($params['field']);
      $valor = $this->db->real_escape_string($params['valor']);
      

      $qry = " UPDATE sic_puestos SET ". $field . " = '" . $valor ."' WHERE pto_id = $id;";

       return $this->db->query($qry);
       
  }

// Agrega Puesto
    public function agregaPuesto($params)
    {
        $pto_nombre = $this->db->real_escape_string($params['pto_nombre']);
        $pto_descripcion = $this->db->real_escape_string($params['pto_descripcion']);

        $qry = " INSERT INTO sic_puestos (pto_nombre, pto_descripcion)
                VALUES ('$pto_nombre', '$pto_descripcion');";

        return $this->db->query($qry);
        
    }      

// Elimina Empleados
    public function eliminaPuesto($id)
    {
        $id = $this->db->real_escape_string($id);
       

        $qry = " UPDATE sic_puestos SET pto_status = 0 WHERE pto_id = $id;";

        return $this->db->query($qry);
        
    }
}