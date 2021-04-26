<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class MoveStoresInModel extends Model
{

    public function __construct()
    {
      parent::__construct();
    }


// Listado de Tipos de movimiento
    public function listExchange()
    {
        $qry = "SELECT ex1.ext_id, ex1.ext_code, ex1.ext_type, ex1.ext_description, ex1.ext_link,
                    ex2.ext_id as ext_id_a, ex2.ext_code as ext_code_a, ex2.ext_type as ext_type_a, ex2.ext_description as ext_description_a,
                    ex1.ext_elements
                FROM ctt_type_exchange AS ex1
                LEFT JOIN ctt_type_exchange AS ex2 ON ex2.ext_link = ex1.ext_id 
                WHERE ex1.ext_type = 'E';";
        return $this->db->query($qry);
    }


// Listado de Almacecnes
    public function listStores()
    {
        $qry = "  SELECT * FROM ctt_stores";
        return $this->db->query($qry);
    }

}