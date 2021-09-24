<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class TAdminUnidadesModel extends Model
{

    public function __construct()
    {
      parent::__construct();
    }

// Listado de Unidades
    public function listaUnidades($status)
    {
        $status = $this->db->real_escape_string($status);

        $qry = " SELECT 'S' as llave, un.*, cl.cls_nombre, em.emp_nombre, tj.trj_numero, cls_transporte, ar.are_nombre,
                    (SELECT COUNT(*) FROM sic_unidades WHERE und_placa_padre = un.und_placa) AS hijos
                    FROM sic_unidades as un
                    LEFT JOIN sic_clasificacion as cl on cl.cls_id = un.cls_id
                    LEFT JOIN sic_empleados as em on em.emp_id = un.emp_id
                    LEFT JOIN sic_tarjetas as tj on tj.trj_id = un.trj_id
                    LEFT JOIN sic_areas as ar on ar.are_id = un.are_id
                    WHERE un.und_status = 1
                ;";

        return $this->db->query($qry);
  }

// Listado de clasificaciones
  public function listaClasificacion($status)
    {
        $status = $this->db->real_escape_string($status);

        $qry = "SELECT 'S' as llave, cl.cls_id AS id, cl.cls_nombre AS nombre FROM sic_clasificacion AS cl;";

        return $this->db->query($qry);
    }

// Listado de operadores
  public function listaOperadores($puesto)
  {
      $puesto = $this->db->real_escape_string($puesto);

      $qry = "SELECT 'S' as llave, em.emp_id AS id, em.emp_nombre AS nombre FROM sic_empleados AS em WHERE em.pto_id = $puesto ORDER BY em.emp_nombre ASC;";

      return $this->db->query($qry);
  }
// Listado de tarjetas
  public function listaTarjetas($params)
  {
      $trj_tipo = $this->db->real_escape_string($params['trj_tipo']);
      $trj_estado = $this->db->real_escape_string($params['trj_estado']);
      $trj_status = $this->db->real_escape_string($params['trj_status']);

      $qry = "SELECT 'S' as llave, tr.trj_id AS id, tr.trj_numero as nombre FROM sic_tarjetas as tr WHERE tr.trj_tipo = $trj_tipo and tr.trj_estado = $trj_estado and tr.trj_status = $trj_status;";

      return $this->db->query($qry);
  }

// Listado de areas
  public function listaAreas($params)
  {
      $are_status = $this->db->real_escape_string($params['are_status']);

      $qry = "SELECT 'S' as llave, ar.are_id AS id, ar.are_nombre AS nombre FROM sic_areas AS ar WHERE are_status = $are_status;";

      return $this->db->query($qry);
  }

// Listado de unidades padre
    public function listaPadres($params)
    {
        $status = $this->db->real_escape_string($params['status']);
  
        $qry = "SELECT 'S' as llave, un.und_id AS id, un.und_placa AS nombre FROM sic_unidades AS un WHERE und_status = $status 
                AND (SELECT COUNT(*) FROM sic_unidades WHERE und_placa_padre = un.und_placa) = 0 
                AND cls_id not in (5,6);"; 
  
        return $this->db->query($qry);
    }



// Actualiza Unidades
  public function actualizaUnidades($params)
  {
      $id = $this->db->real_escape_string($params['id']);
      $field = $this->db->real_escape_string($params['field']);
      $valor = $this->db->real_escape_string($params['valor']);
      
      $qry = " UPDATE sic_unidades SET ". $field . " = '" . $valor ."' WHERE und_id = $id;";

      return $this->db->query($qry);
      
  }    


// Elimina Unidades
  public function eliminaUnidad($id)
  {
      $id = $this->db->real_escape_string($id);

      $qry = " UPDATE sic_unidades SET und_status = 0 WHERE und_id = $id;";
      
      return $this->db->query($qry);
      
  } 
  // Elimina Planta
    public function eliminaPlanta($id)
    {
        $id = $this->db->real_escape_string($id);

        $qry = " UPDATE sic_unidades SET und_status = 0 WHERE und_id_padre = $id;";
        return $this->db->query($qry);

        
    }

    
// Agrega Unidades
  public function agregaUnidades($params)
  {

      $und_placa    		    = $this->db->real_escape_string($params['und_placa']);
      $und_nombre 			    = $this->db->real_escape_string($params['und_nombre']);
      $und_marca 			      = $this->db->real_escape_string($params['und_marca']);
      $und_model 			      = $this->db->real_escape_string($params['und_model']);
      $und_serie 			      = $this->db->real_escape_string($params['und_serie']);
      $und_tipo 			      = $this->db->real_escape_string($params['und_tipo']);
      $und_tanques 			    = $this->db->real_escape_string($params['und_tanques']);
      $und_capacidad 		    = $this->db->real_escape_string($params['und_capacidad']);
      $und_combustible 		  = $this->db->real_escape_string($params['und_combustible']);
      $und_litros 			    = $this->db->real_escape_string($params['und_litros']);
      $und_litros_actuales 	= $this->db->real_escape_string($params['und_litros_actuales']);
      $und_llantas 			    = $this->db->real_escape_string($params['und_llantas']);
      $und_tatuaje 			    = $this->db->real_escape_string($params['und_tatuaje']);
      $und_medida 			    = $this->db->real_escape_string($params['und_medida']);
      $cls_id				        = $this->db->real_escape_string($params['cls_id']);
      $und_placa_padre		  = $this->db->real_escape_string($params['und_placa_padre']);
      $und_rend_ccompleta	  = $this->db->real_escape_string($params['und_rend_ccompleta']);
      $und_rend_cmedia		  = $this->db->real_escape_string($params['und_rend_cmedia']);
      $und_rend_cvacio		  = $this->db->real_escape_string($params['und_rend_cvacio']);
      $are_id 	        	  = $this->db->real_escape_string($params['are_id']);
      $emp_id 	        	  = $this->db->real_escape_string($params['emp_id']);
      $trj_id 	        	  = $this->db->real_escape_string($params['trj_id']);

      $qry = " INSERT INTO sic_unidades (und_placa, und_placa_padre, und_nombre, und_marca, und_model, und_serie, und_tipo, 
	  						und_tanques, und_capacidad, und_combustible, und_litros, und_litros_actuales, 
							und_llantas, und_tatuaje, und_medida, cls_id, und_rend_ccompleta, 
							und_rend_cmedia, und_rend_cvacio, are_id, emp_id, trj_id)
              VALUES ('$und_placa', '$und_placa_padre', '$und_nombre', '$und_marca', '$und_model', '$und_serie', 
			  		  '$und_tipo', '$und_tanques', '$und_capacidad', '$und_combustible', '$und_litros', '$und_litros_actuales', 
					  '$und_llantas', '$und_tatuaje', '$und_medida', '$cls_id', '$und_rend_ccompleta', '$und_rend_cmedia', 
					  '$und_rend_cvacio', '$are_id', '$emp_id', '$trj_id');";

      return $this->db->query($qry);
      
  }

// Actualiza Tarjeta
   public function updateTarjeta($trj_id)
   {
    $trj_id = $this->db->real_escape_string($trj_id);

    $qry = " UPDATE sic_tarjetas SET trj_estado = 1 WHERE trj_id = $trj_id;";
    return $this->db->query($qry);
   }

// Agrega datos del padre
   public function actualizaPadre($id)
   {
    $id = $this->db->real_escape_string($id);

    $qry = "  UPDATE sic_unidades as un
              INNER JOIN sic_unidades as up ON up.und_placa = un.und_placa_padre
              SET un.emp_id = up.emp_id, un.are_id = up.are_id, un.und_status = up.und_status
              WHERE up.und_id = $id;";
    return  $this->db->query($qry);
   }
}