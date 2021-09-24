<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class TAdminDestinosModel extends Model
{

    public function __construct()
    {
      parent::__construct();
    }


// Listado de destinos
  public function listaDestinos($status)
  {
    $status = $this->db->real_escape_string($status);

    $qry = " SELECT 'S' as llave, ds.* FROM sic_destinos AS ds WHERE dst_status = $status;";

    return $this->db->query($qry);
  }

// Actualiza destinos
    public function actualizaDestinos($params)
    {
        $id = $this->db->real_escape_string($params['id']);
        $field = $this->db->real_escape_string($params['field']);
        $valor = $this->db->real_escape_string($params['valor']);
        

        $qry = " UPDATE sic_destinos SET ". $field . " = '" . $valor ."' WHERE dst_id = $id;";

         return $this->db->query($qry);
         
    }

// Elimina destinos
    public function eliminaDestinos($id)
    {
        $id = $this->db->real_escape_string($id);

        

        $qry = " UPDATE sic_destinos SET dst_status = 0 WHERE dst_id = $id;";

        return $this->db->query($qry);
        
    }    

// Agrega destinos
    public function agregaDestinos($params)
    {
        $dst_codigo = $this->db->real_escape_string($params['dst_codigo']);
        $dst_nombre = $this->db->real_escape_string($params['dst_nombre']);
        $dst_descripcion = $this->db->real_escape_string($params['dst_descripcion']);
        $dst_status = 1;

        $qry = " INSERT INTO sic_destinos (dst_codigo, dst_nombre, dst_descripcion, dst_status)
                 VALUES ('$dst_codigo', '$dst_nombre', '$dst_descripcion', $dst_status);";

        return $this->db->query($qry);
        
    }    
}