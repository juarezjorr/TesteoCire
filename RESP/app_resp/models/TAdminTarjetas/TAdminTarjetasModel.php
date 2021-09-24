<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class TAdminTarjetasModel extends Model
{

    public function __construct()
    {
      parent::__construct();
    }

// Listado de tarjetas
  public function listaTarjetas($status)
  {
    $status = $this->db->real_escape_string($status);

    $qry = " SELECT 'S' as llave, tj.* ,
             CASE WHEN tj.trj_tipo = 1 THEN 'Asignación' ELSE 'Comodín' END tipo,
             CASE WHEN tj.trj_estado = 1 THEN 'Asignada' ELSE 'No asignada' END estado
             FROM sic_tarjetas as tj WHERE trj_status = $status;";

    return $this->db->query($qry);
  }
// Listado de tarjetas
  public function listaTipos($status)
  {
    $status = $this->db->real_escape_string($status);

    $qry = " SELECT 'S' AS llave, '1' AS id, 'Asignación' AS nombre UNION
             SELECT 'S' AS llave, '2' AS id, 'Comodín' AS nombre ;";

    return $this->db->query($qry);
  }

// Listado de estados
  public function listaEstados($status)
  {
    $status = $this->db->real_escape_string($status);

    $qry = " SELECT 'S' AS llave, '1' AS id, 'Asignada' AS nombre UNION
            SELECT 'S' AS llave, '0' AS id, 'No asignada' AS nombre ;";

    return $this->db->query($qry);
  }  

// Actualiza Tarjeta
  public function actualizaTarjeta($params)
  {
      $id = $this->db->real_escape_string($params['id']);
      $field = $this->db->real_escape_string($params['field']);
      $valor = $this->db->real_escape_string($params['valor']);
      

      $qry = " UPDATE sic_tarjetas SET ". $field . " = '" . $valor ."' WHERE trj_id = $id;";

       return $this->db->query($qry);
       
  }

// Agrega tarjeta
    public function agregaTarjeta($params)
    {
        $trj_numero = $this->db->real_escape_string($params['trj_numero']);
        $trj_tipo = $this->db->real_escape_string($params['trj_tipo']);

        $qry = " INSERT INTO sic_tarjetas (trj_numero, trj_tipo)
                VALUES ('$trj_numero', '$trj_tipo');";

        return $this->db->query($qry);
        
    }      

// Elimina tarjeta
    public function eliminaTarjeta($id)
    {
        $id = $this->db->real_escape_string($id);

        $qry = " UPDATE sic_tarjetas SET trj_status = 0 WHERE trj_id = $id;";

        return $this->db->query($qry);
        
    }
}