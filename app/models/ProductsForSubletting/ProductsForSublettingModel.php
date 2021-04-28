<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class ProductsForSublettingModel extends Model
{

    public function __construct()
    {
      parent::__construct();
    }

// Listado de Productos
    public function listProducts($store)
    {
        $store = $this->db->real_escape_string($store);
        $qry = "SELECT 
                    p.prd_id, p.prd_name, p.prd_sku, ifnull(s.ser_id,0) as ser_id, ifnull(s.ser_serial_number,'') as ser_serial_number, ifnull(s.ser_cost,'') as ser_cost, ifnull(p.cin_id,'0') as cin_id
                FROM ctt_products AS p
                LEFT JOIN ctt_series AS s ON s.prd_id = p.prd_id AND s.ser_behaviour = 'R'
                WHERE p.prd_status = 1 AND prd_visibility = 1 ORDER BY p.prd_name asc ;";
        return $this->db->query($qry);
    }    


// Listado de Proveedores
    public function listSuppliers($store)
    {
        $store = $this->db->real_escape_string($store);
        $qry = "SELECT sup_id, sup_business_name FROM ctt_suppliers WHERE sup_status = 1 AND sut_id in (3) ORDER BY sup_business_name;";
        return $this->db->query($qry);
    }   


// Listado de monedas
    public function listCoins()
    {
        $qry = "SELECT * FROM ctt_coins WHERE cin_status = 1;";
        return $this->db->query($qry);
    }   


// Listado de Almacenes
    public function listStores()
    {
        $qry = "SELECT str_id, str_name FROM ctt_stores WHERE str_type = 'estaticos' AND str_status = 1;";
        return $this->db->query($qry);
    }



// Agrega el serial del producto en subarrendo
    public function addSerie($params)
    {
        $ser_sku = $params['prodsku'] . 'R001';
        $ser_serial_number = 'R001';
        $ser_cost = $params['prprice'];
        $ser_status = '1';
        $ser_situation = 'D';
        $ser_stage = 'D';
        $ser_lonely = '1';
        $ser_behaviour = 'R';
        $prd_id = $params['produid'];
        $cin_id = $params['cointyp'];


        $qry = "INSERT INTO 
                    ctt_series (ser_sku, ser_serial_number, ser_cost, ser_status, ser_situation, ser_stage, ser_lonely, ser_behaviour, prd_id, cin_id ) 
                VALUES
                    ('$ser_sku','$ser_serial_number','$ser_cost','$ser_status','$ser_situation','$ser_stage','$ser_lonely','$ser_behaviour','$prd_id','$cin_id');
                ";
            $this->db->query($qry);
            $result = $this->db->insert_id;
            return $result . '|' . $params['produid'] .'|'.$params['supplid'] .'|'.$ser_serial_number .'|'.$params['storeid'] .'|'.$params['storenm'];
    }

// Agrega los productos subarrendados
    public function addSubletting($params)
    {
        $sub_price = $params['prc'];
        $sub_coin_type = $params['cin'];
        $sub_quantity = $params['qty'];
        $sub_date_start = $params['dst'];
        $sub_date_end = $params['den'];
        $sub_comments = $params['com'];
        $ser_id = $params['ser'];
        $sup_id = $params['sup'];
        $prj_id = $params['prj'];

        $qry = "INSERT INTO 
                    ctt_subletting (sub_price, sub_quantity, sub_date_start, sub_date_end, sub_comments, ser_id, sup_id, prj_id, cin_id ) 
                VALUES
                    ('$sub_price','$sub_quantity','$sub_date_start','$sub_date_end','$sub_comments','$ser_id','$sup_id','$prj_id','$sub_coin_type');
                ";
            $this->db->query($qry);
            $result = $this->db->insert_id;
            return $result ;
    } 

// Registra los movimientos entre almacenes
    public function SaveExchange($param, $user)
    {
        $employee_data = explode("|",$user);
        $exc_sku_product    = $this->db->real_escape_string($param['sku']);
        $exc_product_name   = $this->db->real_escape_string($param['nme']);
        $exc_quantity       = $this->db->real_escape_string($param['qty']);
        $exc_serie_product  = $this->db->real_escape_string($param['srn']);
        $exc_store          = $this->db->real_escape_string($param['stn']);
        $exc_comments       = $this->db->real_escape_string($param['com']);
        $exc_proyect        = $this->db->real_escape_string($param['prj']);
        $exc_employee_name  = $this->db->real_escape_string($employee_data[2]);
        $ext_code           = $this->db->real_escape_string($param['exn']);
        $ext_id             = $this->db->real_escape_string($param['exi']);
        $exc_guid           = $this->db->real_escape_string($param['fol']);
        $cin_id             = $this->db->real_escape_string($param['cin']);

        $qry = "INSERT INTO ctt_stores_exchange
                (exc_guid, exc_sku_product, exc_product_name, exc_quantity, exc_serie_product, exc_store, exc_comments, exc_proyect, exc_employee_name, ext_code, ext_id, cin_id)
                VALUES
                ('$exc_guid', '$exc_sku_product', '$exc_product_name', $exc_quantity, '$exc_serie_product', '$exc_store', '$exc_comments', '$exc_proyect', '$exc_employee_name', '$ext_code', $ext_id, $cin_id);
                ";
        return $this->db->query($qry);
    }

// Busca si existe asignado un almacen con este producto
    public function SechingProducts($param)
    {
        $prodId = $this->db->real_escape_string($param['ser']);
        $storId = $this->db->real_escape_string($param['sti']);

        $qry = "SELECT count(*) as items FROM ctt_stores_products WHERE ser_id = $prodId AND str_id = $storId;";
        return $this->db->query($qry);
    }


// Actualizala cantidad de productos en un almacen destino
    public function UpdateProducts($param)
    {
        $idPrd 			= $this->db->real_escape_string($param['ser']);
        $idStrSrc 		= $this->db->real_escape_string($param['sti']);
        $quantity 		= $this->db->real_escape_string($param['qty']);

        $qry = "UPDATE ctt_stores_products SET stp_quantity = stp_quantity + {$quantity} WHERE str_id = {$idStrSrc} and  ser_id = {$idPrd};";
        return $this->db->query($qry);
    }

// Agrega el registro de relación almacen producto
    public function InsertProducts($param)
    {
        $idPrd 			= $this->db->real_escape_string($param['ser']);
        $idStrSrc 		= $this->db->real_escape_string($param['sti']);
        $quantity 		= $this->db->real_escape_string($param['qty']);

        $qry = "INSERT INTO ctt_stores_products (stp_quantity, str_id, ser_id) VALUES ($quantity, $idStrSrc, $idPrd);";
        return $this->db->query($qry);
    }

}