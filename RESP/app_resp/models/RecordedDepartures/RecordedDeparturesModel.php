<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class RecordedDeparturesModel extends Model
{

    public function __construct()
    {
      parent::__construct();
    }

// Datos de la salida
  public function datosSalida($movi)
  {
    $movi = $this->db->real_escape_string($movi);

    $qry = "  SELECT mv.* , ds.dst_nombre, al.alc_nombre, tr.trj_numero, em.emp_nombre, au.emp_nombre as autorizo
              FROM sic_movimientos as mv
              LEFT JOIN sic_destinos as ds on ds.dst_id = mv.dst_id
              LEFT JOIN sic_alcaldias as al on al.alc_id = mv.alc_id
              LEFT JOIN sic_tarjetas as tr on tr.trj_id = mv.trj_id
              LEFT JOIN sic_empleados as em on em.emp_id = mv.emp_id
              LEFT JOIN sic_empleados as au on au.emp_id = mv.aut_id
              WHERE mv.mov_id = $movi;";

    return $this->db->query($qry);
  }

// Datos de la Unidad
    public function datosUnidad($movi)
    {
      $movi = $this->db->real_escape_string($movi);

      $qry = "  SELECT un.*, em.emp_nombre, tr.trj_numero, cl.cls_nombre, cl.cls_transporte, ifnull(mv.mov_id,0) as mov_id, 
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

      $qry = "  SELECT un.*, em.emp_nombre, tr.trj_numero, cl.cls_nombre, cl.cls_transporte, ifnull(mv.mov_id,0) as mov_id, 
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
}