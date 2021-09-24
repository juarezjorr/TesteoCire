<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class TPanelModel extends Model
{

    public function __construct()
    {
      parent::__construct();
    }


// Fecha inicial y fecha final
  public function obtieneFechas($params)
  {
   
    $qry = " SELECT 
                date_format(min(mov_fecha_salida), '%Y%m%d')  as primera, 
                date_format(max(mov_fecha_salida), '%Y%m%d') as ultima 
              from sic_movimientos;";

    return $this->db->query($qry);
  }


// Listado de destinos
  public function listaDestinos($params)
  {
    $rngini = $this->db->real_escape_string($params['rngini']);
    $rngfin = $this->db->real_escape_string($params['rngfin']);

    $qry = " SELECT 'S' as llave, ds.dst_nombre, count(mv.mov_id) as salidas 
              from sic_movimientos as mv
              right join sic_destinos as ds on ds.dst_id = mv.dst_id
              and mv.mov_id_padre = 0 and mv.mov_status = 3
              and date_format(mov_fecha_salida, '%Y%m%d') between '$rngini' and '$rngfin'
              group by ds.dst_nombre
              order by ds.dst_id;";

    return $this->db->query($qry);
  }

// Listado de KPI's
  public function listaKpis($params)
  {
    $rngini = $this->db->real_escape_string($params['rngini']);
    $rngfin = $this->db->real_escape_string($params['rngfin']);

    $qry = " SELECT 'S' as llave, 'salidas' as concepto, count(*) as numeros from sic_movimientos where mov_id_padre = 0 and date_format(mov_fecha_salida, '%Y%m%d') between '$rngini' and '$rngfin' union
             SELECT 'S' as llave, 'combustible' as concepto, sum(cns_litros_suministrados) as numeros from sic_consumo where  date_format(cns_fecha_carga, '%Y%m%d') between '$rngini' and '$rngfin' union
             SELECT 'S' as llave, 'importe' as concepto, sum(cns_importe) as numeros from sic_consumo where  date_format(cns_fecha_carga, '%Y%m%d') between '$rngini' and '$rngfin' union
             SELECT 'S' as llave, 'unidades' as concepto, count(distinct und_id) as unidades from sic_movimientos where date_format(mov_fecha_salida, '%Y%m%d') between '$rngini' and '$rngfin';";

    return $this->db->query($qry);
  }
// Listado de unidades
  public function listaUnidades($params)
  {
    $rngini = $this->db->real_escape_string($params['rngini']);
    $rngfin = $this->db->real_escape_string($params['rngfin']);

    $qry = " SELECT 'S' as llave, mv.und_id, un.und_placa, un.und_nombre, count(*) as salidas 
             from sic_movimientos as mv
             inner join sic_unidades as un on un.und_id = mv.und_id
             where  date_format(mov_fecha_salida, '%Y%m%d') between '$rngini' and '$rngfin' 
             group by mv.und_id, un.und_placa, un.und_nombre 
             order by salidas desc, mv.und_id asc limit 10;";

    return $this->db->query($qry);
  }
}