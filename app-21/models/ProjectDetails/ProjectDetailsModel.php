<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class ProjectDetailsModel extends Model
{

    public function __construct()
    {
        parent::__construct();
    }

    
// Listado de clientes
    public function listCustomers($params)
    {
        $prd = $this->db->real_escape_string($params['prm']);
        $qry = "SELECT cs.*, ct.cut_name FROM ctt_customers AS cs
                INNER JOIN ctt_customers_type AS ct ON ct.cut_id = cs.cut_id
                WHERE cs.cus_status = 1 ORDER BY cs.cus_name;";
        return $this->db->query($qry);
    }    

    
// Listado de proyectos
    public function listProjects($params)
    {

        $qry = "SELECT pj.pjt_id, pj.pjt_number, pj.pjt_name,  DATE_FORMAT(pj.pjt_date_project,'%d/%m/%Y') AS pjt_date_project, 
                    DATE_FORMAT(pj.pjt_date_start,'%d/%m/%Y') AS pjt_date_start, DATE_FORMAT(pj.pjt_date_end,'%d/%m/%Y') AS pjt_date_end, 
                    pj.pjt_location, pj.pjt_status, pj.cuo_id, pj.loc_id, co.cus_id, co.cus_parent, lo.loc_type_location,
                    pt.pjttp_name
                FROM ctt_projects AS pj
                INNER JOIN ctt_customers_owner AS co ON co.cuo_id = pj.cuo_id
                INNER JOIN ctt_location AS lo ON lo.loc_id = pj.loc_id
                LEFT JOIN ctt_projects_type As pt ON pt.pjttp_id = pj.pjttp_id
                WHERE pj.pjt_status = '2' ORDER BY pj.pjt_id DESC;
                ";
        return $this->db->query($qry);
    }    

    
// Listado de descuentos
    public function listDiscounts($params)
    {
        $level = $this->db->real_escape_string($params['level']);
        $qry = "SELECT * FROM ctt_discounts WHERE dis_level = $level ORDER BY dis_discount;";
        return $this->db->query($qry);
    }    
// Listado de claves de Relaciones
    public function listProjectsDef($params)
    {
        $cusId = $this->db->real_escape_string($params['cusId']);

        $qry = "SELECT * FROM ctt_customers_owner WHERE cus_id = $cusId OR cus_parent = $cusId;";
        return $this->db->query($qry);
    }    

// Listado de contenido de projecto
    public function listBudgets($params)
    {
        $pjtId = $this->db->real_escape_string($params['pjtId']);
        $dstr = $this->db->real_escape_string($params['dstr']);
        $dend = $this->db->real_escape_string($params['dend']);

        $qry = "SELECT pc.*, pj.pjt_id, 
                date_format(pj.pjt_date_start, '%Y%m%d') AS pjt_date_start, 
                date_format(pj.pjt_date_end, '%Y%m%d') AS pjt_date_end, 
                CASE 
                    WHEN pjtcn_prod_level ='K' THEN 
                        (SELECT count(*) FROM ctt_products_packages WHERE prd_parent = pc.prd_id)
                    WHEN pjtcn_prod_level ='P' THEN 
                        (SELECT ifnull(SUM(stp_quantity),0) FROM ctt_series AS sr 
                        INNER JOIN ctt_stores_products AS st ON st.ser_id = sr.ser_id 
                        WHERE prd_id =  pc.prd_id
                        AND (ser_reserve_end < '$dstr' OR ser_reserve_end IS NULL
                        AND ser_reserve_start > '$dend'  OR ser_reserve_start IS NULL) AND sr.ser_status = 1
                        )
                    ELSE 
                        (SELECT ifnull(SUM(stp_quantity),0) FROM ctt_series AS sr 
                        INNER JOIN ctt_stores_products AS st ON st.ser_id = sr.ser_id 
                        WHERE prd_id =  pc.prd_id
                        AND (ser_reserve_end < '$dstr' OR ser_reserve_end IS NULL
                        AND ser_reserve_start > '$dend'  OR ser_reserve_start IS NULL) AND sr.ser_status = 1
                        )
                    END AS bdg_stock
            FROM ctt_projects_content AS pc
            INNER JOIN ctt_projects AS pj ON pj.pjt_id = pc.pjt_id
            WHERE pc.pjt_id = $pjtId ORDER BY pjtcn_prod_name ASC;";
        return $this->db->query($qry);
    }  
}