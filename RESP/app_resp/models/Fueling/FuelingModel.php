<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class FuelingModel extends Model
{

    public function __construct()
    {
      parent::__construct();
    }


// Datos de la salida
  public function datosSalida($operador)
  {
    $operador = $this->db->real_escape_string($operador);

    $qry = "  SELECT 'S' as llave, mv.* , ds.dst_nombre, al.alc_nombre, tr.trj_numero, em.emp_nombre, au.emp_nombre as autorizo
              FROM sic_movimientos as mv
              LEFT JOIN sic_destinos as ds on ds.dst_id = mv.dst_id
              LEFT JOIN sic_alcaldias as al on al.alc_id = mv.alc_id
              LEFT JOIN sic_tarjetas as tr on tr.trj_id = mv.trj_id
              LEFT JOIN sic_empleados as em on em.emp_id = mv.emp_id
              LEFT JOIN sic_empleados as au on au.emp_id = mv.aut_id
              WHERE mv.emp_id = $operador and mv.mov_status = '2';";

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


// Datos de la Unidad
    public function datosUnidad($movi)
    {
    $movi = $this->db->real_escape_string($movi);

    $qry = "  SELECT 'S' as llave, un.*, em.emp_nombre, tr.trj_numero, cl.cls_nombre, cl.cls_transporte, ifnull(mv.mov_id,0) as mov_id, 
                    (un.und_litros_actuales / un.und_litros) *100 as cargado,
                    (SELECT count(*) FROM sic_unidades WHERE und_placa_padre = un.und_placa) AS planta 
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
                    (SELECT count(*) FROM sic_unidades WHERE und_placa_padre = un.und_placa) AS planta 
                FROM sic_unidades AS un 
                LEFT JOIN sic_empleados AS em ON em.emp_id = un.emp_id
                LEFT JOIN sic_tarjetas AS tr ON tr.trj_id = un.trj_id
                LEFT JOIN sic_clasificacion AS cl ON cl.cls_id = un.cls_id
                LEFT JOIN sic_movimientos AS mv ON mv.und_id = un.und_id
                WHERE mv.mov_id_padre = $movi;";

    return $this->db->query($qry);
    }

// Datos de consumo
    public function datosConsumo($movi)
    {
    $movi = $this->db->real_escape_string($movi);

    $qry = "  SELECT *
              FROM sic_consumo 
              WHERE mov_id = $movi 
              ORDER BY cns_fecha_carga ASC;";

    return $this->db->query($qry);
    }


// Registra el consumo
  public function registraConsumo($params)
  {
  $cns_tipo_movimiento = $this->db->real_escape_string($params['cns_tipo_movimiento']);
  $cns_litros_suministrados = $this->db->real_escape_string($params['cns_litros_suministrados']);
  $cns_importe = $this->db->real_escape_string($params['cns_importe']);
  $cns_precio = $this->db->real_escape_string($params['cns_precio']);
  $cns_item_registrados = $this->db->real_escape_string($params['cns_item_registrados']);
  $cns_item_consumidos = $this->db->real_escape_string($params['cns_item_consumidos']);
  $cns_item_rendimiento = $this->db->real_escape_string($params['cns_item_rendimiento']);
  $cns_amp_consumidos = $this->db->real_escape_string($params['cns_amp_consumidos']);
  $cns_amp_registrados = $this->db->real_escape_string($params['cns_amp_registrados']);
  $cns_amp_rendimiento = $this->db->real_escape_string($params['cns_amp_rendimiento']);
  $cns_litros_consumidos = $this->db->real_escape_string($params['cns_litros_consumidos']);
  $cns_litros_restantes = $this->db->real_escape_string($params['cns_litros_restantes']);
  $cns_pagador = $this->db->real_escape_string($params['cns_pagador']);
  $mov_id = $this->db->real_escape_string($params['mov_id']);
  $trj_id = $this->db->real_escape_string($params['trj_id']);
  $und_id = $this->db->real_escape_string($params['und_id']);


  $qry = "  INSERT INTO sic_consumo
              (cns_tipo_movimiento, cns_litros_suministrados, cns_importe, cns_precio, cns_item_registrados, cns_item_consumidos, cns_item_rendimiento, cns_amp_consumidos, cns_amp_registrados, cns_amp_rendimiento, cns_litros_consumidos, cns_litros_restantes, cns_pagador, mov_id, trj_id, und_id)
            VALUES
              ('$cns_tipo_movimiento', $cns_litros_suministrados, $cns_importe, $cns_precio, $cns_item_registrados, $cns_item_consumidos, $cns_item_rendimiento, $cns_amp_consumidos, $cns_amp_registrados, $cns_amp_rendimiento, $cns_litros_consumidos, $cns_litros_restantes, '$cns_pagador', $mov_id, $trj_id, $und_id);";

  return $this->db->query($qry);
  }

  // Registra el nivel de combustible
  public function actualizaNivel($params)
  {
    $cns_litros_restantes = $this->db->real_escape_string($params['cns_litros_restantes']);
    $und_id = $this->db->real_escape_string($params['und_id']);
    
    $qry = "UPDATE sic_unidades SET  und_litros_actuales = $cns_litros_restantes WHERE und_id = $und_id;";

    $this->db->query($qry);

  }

}