<?php
    defined('BASEPATH') or exit('No se permite acceso directo');
    require_once ROOT . FOLDER_PATH . '/app/models/StoreProductsList/StoreProductsListModel.php';
    require_once LIBS_ROUTE .'Session.php';



class StoreProductsListController extends Controller
{
    private $session;
    public $model;
    


    public function __construct()
    {
        $this->model = new StoreProductsListModel();
        $this->session = new Session();
        $this->session->init();
        if($this->session->getStatus() === 1 || empty($this->session->get('user')))
            header('location: ' . FOLDER_PATH .'/login');
    }

    public function exec()
    {
        $params = array('user' => $this->session->get('user'));
        $this->render(__CLASS__, $params);
    }


    public function GenerateReport(){

        $params = array('user' => $this->session->get('user'),'report' => true);
        $this->render(__CLASS__, $params);
    }
}