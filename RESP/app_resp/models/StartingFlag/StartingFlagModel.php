<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class StartingFlagModel extends Model
{

    public function __construct()
    {
      parent::__construct();
    }

// Listado de salidas pendientes
  public function listaSalidas($status)
  {
    $status = $this->db->real_escape_string($status);

    $qry = "  SELECT 'S' as llave, mv.mov_id, un.und_nombre, un.und_placa, ifnull(mv.mov_fecha_salida_prog ,'') as fecha_prog 
              FROM sic_movimientos as mv
              LEFT JOIN sic_unidades as un on un.und_id = mv.und_id
              WHERE mov_id_padre = 0 AND mov_status = $status
              ORDER BY mv.mov_fecha_salida_prog ASC;";

    return $this->db->query($qry);
  }

// Datos de la salida
  public function datosSalida($movi)
  {
    $movi = $this->db->real_escape_string($movi);

    $qry = "  SELECT mv.* , ds.dst_nombre, al.alc_nombre, tr.trj_numero, em.emp_nombre, au.emp_nombre as autorizo, mt.mov_id as mov_pta
              FROM sic_movimientos as mv
              LEFT JOIN sic_destinos as ds on ds.dst_id = mv.dst_id
              LEFT JOIN sic_alcaldias as al on al.alc_id = mv.alc_id
              LEFT JOIN sic_tarjetas as tr on tr.trj_id = mv.trj_id
              LEFT JOIN sic_empleados as em on em.emp_id = mv.emp_id
              LEFT JOIN sic_empleados as au on au.emp_id = mv.aut_id
              LEFT JOIN sic_movimientos as mt on mt.mov_id_padre = mv.mov_id
              WHERE mv.mov_id = $movi;";

    return $this->db->query($qry);
  }

// Datos de la Unidad
    public function datosUnidad($movi)
    {
      $movi = $this->db->real_escape_string($movi);

      $qry = "  SELECT 'S' as llave, un.*, em.emp_nombre, tr.trj_numero, cl.cls_nombre, cl.cls_transporte, ifnull(mv.mov_id,0) as mov_id, 
                    (un.und_litros_actuales / un.und_litros) *100 as cargado,
                    (SELECT count(*) FROM sic_unidades WHERE und_placa_padre = un.und_placa) AS planta,
                    ifnull((SELECT mov_item_in FROM sic_movimientos WHERE und_id = un.und_id order by mov_fecha_entrada limit 1 ),0) AS  kilometros
                FROM sic_unidades AS un 
                LEFT JOIN sic_empleados AS em ON em.emp_id = un.emp_id
                LEFT JOIN sic_tarjetas AS tr ON tr.trj_id = un.trj_id
                LEFT JOIN sic_clasificacion AS cl ON cl.cls_id = un.cls_id
                LEFT JOIN sic_movimientos AS mv ON mv.und_id = un.und_id
                WHERE mv.mov_id = $movi;";

      return $this->db->query($qry);
    }

// Datos de la Planta
    public function datosPlanta($movi)
    {
      $movi = $this->db->real_escape_string($movi);

      $qry = "  SELECT 'S' as llave, un.*, em.emp_nombre, tr.trj_numero, cl.cls_nombre, cl.cls_transporte, ifnull(mv.mov_id,0) as mov_id, 
                    (un.und_litros_actuales / un.und_litros) *100 as cargado,
                    (SELECT count(*) FROM sic_unidades WHERE und_placa_padre = un.und_placa) AS planta,
                    ifnull((SELECT mov_item_in FROM sic_movimientos WHERE und_id = un.und_id order by mov_fecha_entrada limit 1 ),0) AS horas 
                FROM sic_unidades AS un 
                LEFT JOIN sic_empleados AS em ON em.emp_id = un.emp_id
                LEFT JOIN sic_tarjetas AS tr ON tr.trj_id = un.trj_id
                LEFT JOIN sic_clasificacion AS cl ON cl.cls_id = un.cls_id
                LEFT JOIN sic_movimientos AS mv ON mv.und_id = un.und_id
                WHERE mv.mov_id_padre = $movi;";

      return $this->db->query($qry);
    }
// Datos de las Observaciones
    public function datosObservaciones($movi)
    {
      $movi = $this->db->real_escape_string($movi);

      $qry = "  SELECT  'S' as llave, ob.* , date_format(ob.obs_fecha, '%Y/%m/%d %r ') as fecha , em.emp_nombre
                FROM  sic_observaciones  as ob
                LEFT JOIN sic_empleados as em on em.emp_id = ob.emp_id
                WHERE obs_id_evento = $movi ORDER BY ob.obs_fecha desc;";

      return $this->db->query($qry);
    }

// Registra de salidas
  public function registraSalida($params)
  {
    $mov_id = $this->db->real_escape_string($params['mov_id']);
    $it_salida = $this->db->real_escape_string($params['it_salida']);

    $qry = "  UPDATE sic_movimientos SET mov_item_out = $it_salida, mov_status=2, mov_fecha_salida = now() WHERE mov_id =$mov_id;";
    return $this->db->query($qry);
  }

// Registra la matriz de consumo
  public function registraConsumo($params)
  {
    $mov_id = $this->db->real_escape_string($params['mov_id']);
    $it_salida = $this->db->real_escape_string($params['it_salida']);
    $lt_salida = $this->db->real_escape_string($params['lt_salida']);

    $qry = "  INSERT INTO sic_consumo (cns_tipo_movimiento, cns_litros_restantes, cns_item_registrados, cns_item_rendimiento, mov_id, trj_id, und_id)
              SELECT 'SALIDA' AS cns_tipo_movimiento, $lt_salida, $it_salida AS cns_item_registrados, mov_rendimiento, mov_id, trj_id, und_id  
              FROM sic_movimientos WHERE mov_id = $mov_id;";

    $this->db->query($qry);   
  }

  
// Actualiza los litros disponibles en la Unidad o planta
  public function actualizaLitros($params)
  {
    $und_id = $this->db->real_escape_string($params['und_id']);
    $lt_salida = $this->db->real_escape_string($params['lt_salida']);

    $qry = "  UPDATE sic_unidades SET  und_litros_actuales = $lt_salida WHERE und_id = $und_id;";

    $this->db->query($qry);
  }


}