<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class BudgetModel extends Model
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

        $qry = "SELECT pj.*, co.cus_id, co.cus_parent 
                FROM ctt_projects AS pj
                INNER JOIN ctt_customers_owner AS co ON co.cuo_id = pj.cuo_id
                WHERE pj.pjt_status = '1';";
        return $this->db->query($qry);
    }    

    
// Listado de relaciones
    public function listCustomersDef($params)
    {
        $cusId = $this->db->real_escape_string($params['cusId']);
        $cutId = $this->db->real_escape_string($params['cutId']);

        if ($cutId == 1){
            $subQry = "SELECT cuo_id, cus_id AS cus_id, $cutId AS cut_id FROM ctt_customers_owner WHERE cus_parent = $cusId";
        } else {
            $subQry = "SELECT cuo_id, cus_parent AS cus_id, $cutId AS cut_id FROM ctt_customers_owner WHERE cus_id = $cusId";
        }


        $qry = $subQry;
        return $this->db->query($qry);
    }    


    
// Listado de claves de Relaciones
    public function listProjectsDef($params)
    {
        $cusId = $this->db->real_escape_string($params['cusId']);

        $qry = "SELECT * FROM ctt_customers_owner WHERE cus_id = $cusId OR cus_parent = $cusId;";
        return $this->db->query($qry);
    }    


    
    
// Listado de versiones
    public function listVersion($params)
    {
        $pjtId = $this->db->real_escape_string($params['pjtId']);

        $qry = "SELECT * FROM ctt_version WHERE pjt_id = $pjtId AND ver_status = 'C' ORDER BY ver_date DESC;";
        return $this->db->query($qry);
    }    


    
    
// Listado de cotizaciones
    public function listBudgets($params)
    {
        $verId = $this->db->real_escape_string($params['verId']);

        $qry = "SELECT * FROM ctt_budget WHERE ver_id = $verId ORDER BY bdg_prod_name ASC;";
        return $this->db->query($qry);
    }    


// Listado de productos
    public function listProducts($params)
    {
        

        $qry = "SELECT * FROM ctt_products ORDER BY prd_name;";
        return $this->db->query($qry);
    } 



// Agrega el serial del producto en subarrendo
    public function SaveBudget($params)
    {
        $bdg_prod_sku           = $params['prdSku'];
        $bdg_prod_name          = $params['prdName'];
        $bdg_prod_price         = $params['prdPrice'];
        $bdg_quantity           = '1';
        $bdg_days_base          = '1';
        $bdg_discount_base      = '0';
        $bdg_days_trip          = '1';
        $bdg_discount_trip      = '0';
        $bdg_days_test          = '1';
        $bdg_discount_test      = '0';
        $bdg_insured            = $params['prdInsur'];
        $prd_id                 = $params['prdId'];
        $ver_id                 = $params['verId'];


        $qry = "INSERT INTO 
                    ctt_budget (bdg_prod_sku, bdg_prod_name, bdg_prod_price, bdg_quantity, bdg_days_base, bdg_discount_base, bdg_days_trip, bdg_discount_trip, bdg_days_test, bdg_discount_test,bdg_insured, ver_id, prd_id ) 
                VALUES
                    ('$bdg_prod_sku','$bdg_prod_name','$bdg_prod_price','$bdg_quantity','$bdg_days_base','$bdg_discount_base','$bdg_days_trip','$bdg_discount_trip','$bdg_days_test','$bdg_discount_test','$bdg_insured','$ver_id','$prd_id');
                ";
            $this->db->query($qry);
            $result = $this->db->insert_id;
            return $result . '|' . $params['indx'];
    }
}