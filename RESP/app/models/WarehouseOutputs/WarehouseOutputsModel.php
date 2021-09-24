<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class WarehouseOutputsModel extends Model
{

    public function __construct()
    {
        parent::__construct();
    }



// Obtiene el siguiente SKU
    public function getNextSku($sbcId)
    {
        $qry = "SELECT ifnull(max(convert(substring(prd_sku,5,3), signed integer)),0) + 1 AS next
                FROM ctt_products  WHERE sbc_id = $sbcId;";
        return $this->db->query($qry);
    }


// Listado de Productos
    public function listProjects($params)
    {
        $catId = $this->db->real_escape_string($params['catId']);
        $grp = $this->db->real_escape_string($params['grp']);
        $num = $this->db->real_escape_string($params['num']);

        $qry = "SELECT pt.pjttp_name, pj.pjt_name, pj.pjt_number,
         DATE_FORMAT(pj.pjt_date_start,'%d/%m/%Y') AS pjt_date_start, 
         DATE_FORMAT(pj.pjt_date_end,'%d/%m/%Y') AS pjt_date_end, 
         DATE_FORMAT(pj.pjt_date_project,'%d/%m/%Y %H:%i ') AS pjt_date_project, 
         pj.pjt_location, pj.pjt_status,pj.pjt_id
        FROM ctt_projects AS pj INNER JOIN ctt_location AS lo ON lo.loc_id = pj.loc_id 
        LEFT JOIN ctt_projects_type As pt ON pt.pjttp_id = pj.pjttp_id 
        WHERE pj.pjt_status = '2' ORDER BY pjt_date_start ASC;";
        return $this->db->query($qry);
    }

    public function getSelectProject($params)
    {
/* $prdId = $this->db->real_escape_string($params['prdId']); */
        $qry = "SELECT pjtcn_id,pjtcn_prod_sku,pjtcn_prod_name,pjtcn_quantity,pjtcn_prod_level
                FROM ctt_projects_content AS pj
                WHERE pj.pjt_id = 1 limit 1;";
        return $this->db->query($qry);
    }

}

