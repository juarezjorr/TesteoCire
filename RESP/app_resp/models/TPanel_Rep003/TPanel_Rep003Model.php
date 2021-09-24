<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class TPanel_Rep003Model extends Model
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

// Reporte de salidas
  public function rep003Consumo($params)
  {
    $rngini = $this->db->real_escape_string($params['rngini']);
    $rngfin = $this->db->real_escape_string($params['rngfin']);

    $qry = "SELECT  'S' as llave,  r1.* from rep_consumo as r1 where date_format(mov_fecha_salida, '%Y%m%d') between '$rngini' and '$rngfin';";

    return $this->db->query($qry);
  }  

}