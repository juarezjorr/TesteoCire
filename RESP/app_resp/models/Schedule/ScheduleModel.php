<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class ScheduleModel extends Model
{

    public function __construct()
    {
      parent::__construct();
    }

// Datos de la Unidad
    public function datosUnidad($placa)
    {
      $placas = $this->db->real_escape_string($placa);

      $qry = "  SELECT un.*, em.emp_nombre, tr.trj_numero, cl.cls_nombre, cl.cls_transporte, ifnull(mv.mov_id,0) as mov_id, 
                    (un.und_litros_actuales / un.und_litros) *100 as cargado,
                    (SELECT count(*) FROM sic_unidades WHERE und_placa_padre = un.und_placa) AS planta 
                FROM sic_unidades AS un 
                LEFT JOIN sic_empleados AS em ON em.emp_id = un.emp_id
                LEFT JOIN sic_tarjetas AS tr ON tr.trj_id = un.trj_id
                LEFT JOIN sic_clasificacion AS cl ON cl.cls_id = un.cls_id
                LEFT JOIN sic_movimientos AS mv ON mv.und_id = un.und_id and mv.mov_status != 3
                WHERE und_placa = '{$placas}';";

      return $this->db->query($qry);
    }

// Datos de laplanta asigna
    public function datosPlaca($placa)
    {
      $placas = $this->db->real_escape_string($placa);

      $qry = "  SELECT un.*, em.emp_nombre, tr.trj_numero, cl.cls_nombre, cl.cls_transporte, ifnull(mv.mov_id,0) as mov_id, 
                  (un.und_litros_actuales / un.und_litros) *100 as cargado,
                  (SELECT count(*) FROM sic_unidades WHERE und_placa_padre = un.und_placa) AS planta 
                FROM sic_unidades AS un 
                LEFT JOIN sic_empleados AS em ON em.emp_id = un.emp_id
                LEFT JOIN sic_tarjetas AS tr ON tr.trj_id = un.trj_id
                LEFT JOIN sic_clasificacion AS cl ON cl.cls_id = un.cls_id
                LEFT JOIN sic_movimientos AS mv ON mv.und_id = un.und_id and mv.mov_status != 3
                WHERE und_placa_padre = '{$placas}';";

      return $this->db->query($qry);
    }

// Listado de operadores
    public function datosOperador($puesto)
    {
      $puesto = $this->db->real_escape_string($puesto);

      $qry = "select 'S' as llave, em.* from sic_empleados as em where pto_id = {$puesto};";
      return $this->db->query($qry);
    }

    // Listado de autorizadores
    public function datosAutorizador($puesto)
    {
      $puesto = $this->db->real_escape_string($puesto);

      $qry = "SELECT * FROM sic_empleados WHERE pto_id = $puesto;";
      return $this->db->query($qry);
    }

// Listado de tarjetas comodín
    public function datosTarjeta($tipo)
    {
      $tipo = $this->db->real_escape_string($tipo);

      $qry = "  SELECT * FROM sic_tarjetas WHERE trj_tipo  = {$tipo}  and trj_status = 1;";

      return $this->db->query($qry);
    }
// Listado de destinos
  public function datosDestinos($status)
  {
    $status = $this->db->real_escape_string($status);

    $qry = "  SELECT * FROM sic_destinos WHERE  dst_status = '{$status}';";

    return $this->db->query($qry);
  }
// Listado de alcaldias
  public function datosAlcaldias($status)
  {
    $status = $this->db->real_escape_string($status);

    $qry = "  SELECT * FROM sic_alcaldias WHERE  alc_status ={$status} ORDER BY alc_nombre;";

    return $this->db->query($qry);
  }

// Agrega Movimiento de unidades
  public function regMovUnidades($params)
  {
    $mov_id_padre = $this->db->real_escape_string($params['mov_padre']);
    $mov_item = $this->db->real_escape_string($params['mov_item']);
    $mov_direcc_destino = $this->db->real_escape_string($params['mov_direcc_destino']);
    $mov_proyecto = $this->db->real_escape_string($params['mov_proyecto']);
    $mov_rendimiento = $this->db->real_escape_string($params['mov_rendimiento']);
    $mov_status = $this->db->real_escape_string($params['mov_status']);
    $emp_id = $this->db->real_escape_string($params['emp_id']);
    $und_id = $this->db->real_escape_string($params['und_id']);
    $trj_id = $this->db->real_escape_string($params['trj_id']);
    $dst_id = $this->db->real_escape_string($params['dst_id']);
    $alc_id = $this->db->real_escape_string($params['alc_id']);
    $aut_id = $this->db->real_escape_string($params['aut_id']);
    

    $qry = "  INSERT INTO  sic_movimientos
                (mov_id_padre,  mov_item,   mov_direcc_destino, mov_proyecto, mov_rendimiento, mov_status, emp_id, und_id, trj_id, dst_id, alc_id, aut_id) 
              VALUES
                ($mov_id_padre, '$mov_item', '$mov_direcc_destino', '$mov_proyecto', $mov_rendimiento, $mov_status, $emp_id, $und_id, $trj_id, $dst_id, $alc_id, $aut_id);";
    $this->db->query($qry);
    $id = $this->db->insert_id;
    return $id;
  }
// Agrega Movimiento de plantas
  public function regMovPlantas($params)
  {
    $mov_id_padre = $this->db->real_escape_string($params['mov_padre']);
    $mov_item = $this->db->real_escape_string($params['mov_item']);
    $mov_direcc_destino = $this->db->real_escape_string($params['mov_direcc_destino']);
    $mov_proyecto = $this->db->real_escape_string($params['mov_proyecto']);
    $mov_rendimiento = $this->db->real_escape_string($params['mov_rendimiento']);
    $mov_status = $this->db->real_escape_string($params['mov_status']);
    $emp_id = $this->db->real_escape_string($params['emp_id']);
    $und_id = $this->db->real_escape_string($params['und_id']);
    $trj_id = $this->db->real_escape_string($params['trj_id']);
    $dst_id = $this->db->real_escape_string($params['dst_id']);
    $alc_id = $this->db->real_escape_string($params['alc_id']);
    $aut_id = $this->db->real_escape_string($params['aut_id']);
    

    $qry = "  INSERT INTO  sic_movimientos
                (mov_id_padre,  mov_item,   mov_direcc_destino, mov_proyecto, mov_rendimiento, mov_status, emp_id, und_id, trj_id, dst_id,  alc_id, aut_id) 
              VALUES
                ($mov_id_padre, '$mov_item', '$mov_direcc_destino', '$mov_proyecto', $mov_rendimiento, $mov_status, $emp_id, $und_id, $trj_id, $dst_id, $alc_id, $aut_id);";
    return $this->db->query($qry);
  }
// Registra las Observaciones
  public function observaciones($pobs_evento, $pobs_id_evento, $pobs_contenido, $pemp_id)
  {
    $obs_evento =  $this->db->real_escape_string($pobs_evento);
    $obs_id_evento = $this->db->real_escape_string($pobs_id_evento);
    $obs_contenido =  $this->db->real_escape_string($pobs_contenido);
    $emp_id =  $this->db->real_escape_string($pemp_id);
    
    $qry = "  INSERT INTO sic_observaciones 
                (obs_evento,  obs_id_evento, obs_contenido,  emp_id) 
              VALUE
                ('$obs_evento',  $obs_id_evento, '$obs_contenido',  $emp_id) ;";

    return $this->db->query($qry);
    
  }
}