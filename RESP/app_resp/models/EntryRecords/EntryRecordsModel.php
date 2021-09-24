<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class EntryRecordsModel extends Model
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

    $qry = "SELECT 'S' as llave, mv.* , ds.dst_nombre, al.alc_nombre, tr.trj_numero, em.emp_nombre, au.emp_nombre as autorizo,
            un.und_placa, mp.mov_id as planta
            FROM sic_movimientos as mv
            LEFT JOIN sic_destinos as ds on ds.dst_id = mv.dst_id
            LEFT JOIN sic_alcaldias as al on al.alc_id = mv.alc_id
            LEFT JOIN sic_tarjetas as tr on tr.trj_id = mv.trj_id
            LEFT JOIN sic_empleados as em on em.emp_id = mv.emp_id
            LEFT JOIN sic_empleados as au on au.emp_id = mv.aut_id
            LEFT JOIN sic_unidades as un on un.und_id = mv.und_id
            LEFT JOIN sic_movimientos as mp on mp.mov_id_padre = mv.mov_id
            WHERE mv.mov_id = $movi";

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
    public function datosPlanta($placa)
    {
    $placas = $this->db->real_escape_string($placa);

    $qry = "  SELECT 'S' as llave, un.*, em.emp_nombre, tr.trj_numero, cl.cls_nombre, cl.cls_transporte, ifnull(mv.mov_id,0) as mov_id, 
                    (un.und_litros_actuales / un.und_litros) *100 as cargado,
                    (SELECT count(*) FROM sic_unidades WHERE und_placa_padre = un.und_placa) AS planta 
                FROM sic_unidades AS un 
                LEFT JOIN sic_empleados AS em ON em.emp_id = un.emp_id
                LEFT JOIN sic_tarjetas AS tr ON tr.trj_id = un.trj_id
                LEFT JOIN sic_clasificacion AS cl ON cl.cls_id = un.cls_id
                LEFT JOIN sic_movimientos AS mv ON mv.und_id = un.und_id
                WHERE und_placa_padre = '{$placas}';";

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

// Datos de las Observaciones
    public function datosConsumo($moviUnd, $moviPta)
    {
    $moviUnd = $this->db->real_escape_string($moviUnd);
    $moviPta = $this->db->real_escape_string($moviPta);

    $qry = "  (SELECT cn.*, un.und_litros, mv.mov_item_out
                FROM sic_consumo as cn 
                LEFT JOIN sic_unidades as un on un.und_id = cn.und_id
                LEFT JOIN sic_movimientos as mv on mv.mov_id = cn.mov_id
                WHERE cn.mov_id = $moviUnd ORDER BY cns_fecha_carga DESC LIMIT 1) union
                (SELECT cn.*, un.und_litros, mv.mov_item_out
                FROM sic_consumo as cn 
                LEFT JOIN sic_unidades as un on un.und_id = cn.und_id
                LEFT JOIN sic_movimientos as mv on mv.mov_id = cn.mov_id
                WHERE cn.mov_id = $moviPta ORDER BY cns_fecha_carga DESC LIMIT 1);";

    return $this->db->query($qry);
    }


// Registra de entrada
  public function registraEntrada($params)
  {
    $mov_id                 = $this->db->real_escape_string($params['mov_id']);
    $cns_item_registrados   = $this->db->real_escape_string($params['cns_item_registrados']);
    $cns_item_consumidos    = $this->db->real_escape_string($params['cns_item_consumidos']);

    $qry = "UPDATE sic_movimientos 
            SET mov_item_in = $cns_item_registrados, 
                mov_items_cons = $cns_item_consumidos,
                mov_fecha_entrada = now(), 
                mov_status = 3
            WHERE mov_id = $mov_id;";

    return $this->db->query($qry);
  }

  
// Registra la matriz de consumo
    public function registraConsumo($params)
    {
        $cns_tipo_movimiento    = $this->db->real_escape_string($params['cns_tipo_movimiento']);
        $cns_item_registrados   = $this->db->real_escape_string($params['cns_item_registrados']);
        $cns_item_consumidos    = $this->db->real_escape_string($params['cns_item_consumidos']);
        $cns_item_rendimiento   = $this->db->real_escape_string($params['cns_item_rendimiento']);
        $cns_amp_consumidos     = $this->db->real_escape_string($params['cns_amp_consumidos']);
        $cns_amp_registrados    = $this->db->real_escape_string($params['cns_amp_registrados']);
        $cns_amp_rendimiento    = $this->db->real_escape_string($params['cns_amp_rendimiento']);
        $cns_litros_consumidos  = $this->db->real_escape_string($params['cns_litros_consumidos']);
        $cns_litros_restantes   = $this->db->real_escape_string($params['cns_litros_restantes']);
        $mov_id                 = $this->db->real_escape_string($params['mov_id']);
        $trj_id                 = $this->db->real_escape_string($params['trj_id']);
        $und_id                 = $this->db->real_escape_string($params['und_id']);


        $qry = "  INSERT INTO sic_consumo
                    (cns_tipo_movimiento, cns_item_registrados, cns_item_consumidos, cns_item_rendimiento, cns_amp_consumidos, cns_amp_registrados, cns_amp_rendimiento, cns_litros_consumidos, cns_litros_restantes, mov_id, trj_id, und_id)
                    VALUES
                    ('$cns_tipo_movimiento', $cns_item_registrados, $cns_item_consumidos, $cns_item_rendimiento, $cns_amp_consumidos, $cns_amp_registrados, $cns_amp_rendimiento, $cns_litros_consumidos, $cns_litros_restantes, $mov_id, $trj_id, $und_id);";

        return $this->db->query($qry);
    }   


// Registra el nivel de combustible
    public function actualizaNivel($params)
    {
        $cns_litros_restantes = $this->db->real_escape_string($params['litros_reales']);
        $und_id = $this->db->real_escape_string($params['und_id']);
        
        $qry = "UPDATE sic_unidades SET  und_litros_actuales = $cns_litros_restantes WHERE und_id = $und_id;";

        $this->db->query($qry);

    }    

}