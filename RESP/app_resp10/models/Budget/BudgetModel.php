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

        $qry = "SELECT pj.pjt_id, pj.pjt_number, pj.pjt_name,  DATE_FORMAT(pj.pjt_date_project,'%d/%m/%Y') AS pjt_date_project, 
                    DATE_FORMAT(pj.pjt_date_start,'%d/%m/%Y') AS pjt_date_start, DATE_FORMAT(pj.pjt_date_end,'%d/%m/%Y') AS pjt_date_end, 
                    pj.pjt_location, pj.pjt_type, pj.pjt_status, pj.cuo_id, pj.loc_id, co.cus_id, co.cus_parent, lo.loc_type_location
                FROM ctt_projects AS pj
                INNER JOIN ctt_customers_owner AS co ON co.cuo_id = pj.cuo_id
                INNER JOIN ctt_location AS lo ON lo.loc_id = pj.loc_id
                WHERE pj.pjt_status = '1' ORDER BY pj.pjt_id DESC;
    ";
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


    
// Listado de relaciones total
    public function listCustomersOwn($params)
    {
        $qry = "SELECT * FROM ctt_customers_owner";
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



// Agrega Version
    public function SaveVersion($params)
    {
        $pjtId                  = $this->db->real_escape_string($params['pjtId']);
        $verCode                = $this->db->real_escape_string($params['verCode']);
        $qry = "INSERT INTO ctt_version (ver_code, pjt_id) VALUES ('$verCode', $pjtId);";
        $this->db->query($qry);
        $result = $this->db->insert_id;
        return $result;
    }



// Agrega Cotizaciones
    public function SaveBudget($params)
    {

        $bdg_prod_sku           = $params['bdgSku'];
        $bdg_prod_name          = $params['bdgProduc'];
        $bdg_prod_price         = $params['bdgPricBs'];
        $bdg_quantity           = $params['bdgQtysBs'];
        $bdg_days_base          = $params['bdgDaysBs'];
        $bdg_discount_base      = $params['bdgDescBs'];
        $bdg_days_trip          = $params['bdgDaysTp'];
        $bdg_discount_trip      = $params['bdgDescTp'];
        $bdg_days_test          = $params['bdgDaysTr'];
        $bdg_discount_test      = $params['bdgDescTr'];
        $bdg_insured            = $params['bdgInsured'];
        $ver_id                 = $params['verId'];
        $prd_id                 = $params['prdId'];
        $pjt_id                 = $params['pjtId'];


        $qry = "INSERT INTO 
                    ctt_budget (bdg_prod_sku, bdg_prod_name, bdg_prod_price, bdg_quantity, bdg_days_base, bdg_discount_base, bdg_days_trip, bdg_discount_trip, bdg_days_test, bdg_discount_test,bdg_insured, ver_id, prd_id ) 
                VALUES
                    ('$bdg_prod_sku','$bdg_prod_name','$bdg_prod_price','$bdg_quantity','$bdg_days_base','$bdg_discount_base','$bdg_days_trip','$bdg_discount_trip','$bdg_days_test','$bdg_discount_test','$bdg_insured','$ver_id','$prd_id');
                ";
            $this->db->query($qry);
            $result = $this->db->insert_id;
            return $pjt_id;
    }



// Agrega nuevo proyecto
    public function SaveProject($params)
    {
        $cuo            =  $params['cuoId'];
        $cusId          =  $params['cusId'];
        $cusParent      =  $params['cusParent'];
        $cuoId          = $cuo;

        if ($cuo == '0'){
            $qry01 = "INSERT INTO ctt_customers_owner (cus_id, cus_parent)
                        VALUES ($cusId, $cusParent);";

            $this->db->query($qry01);
            $cuoId = $this->db->insert_id;
            
        }

        $pjt_name               = $params['pjtName'];
        $pjt_date_start         = $params['pjtDateStart'];
        $pjt_date_end           = $params['pjtDateEnd'];
        $pjt_location           = $params['pjtLocation'];
        $pjt_type               = $params['pjtType'];
        $cuo_id                 = $cuoId;
        $loc_id                 = $params['locId'];

        $qry02 = "INSERT INTO ctt_projects
                        (pjt_name, pjt_date_start, pjt_date_end, pjt_location, pjt_type, cuo_id, loc_id)
                    VALUES
                       ('$pjt_name', '$pjt_date_start','$pjt_date_end', '$pjt_location', '$pjt_type', $cuo_id, $loc_id);
                  ";
        $this->db->query($qry02);
        $pjtId = $this->db->insert_id;

        $pjt_number = 'P' . str_pad($pjtId, 7, "0", STR_PAD_LEFT);

        $qry03 = "UPDATE ctt_projects
                  SET pjt_number = '$pjt_number'
                  WHERE pjt_id = $pjtId;";
        $this->db->query($qry03);

        return $pjtId;


    }
}