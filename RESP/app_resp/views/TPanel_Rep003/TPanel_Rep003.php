<?php 
  	defined('BASEPATH') or exit('No se permite acceso directo'); 
	  require ROOT . FOLDER_PATH . "/app/assets/header.php";
	  require ROOT . FOLDER_PATH . "/app/assets/menu.php";
?>



<div class="container">

    <div class="sb_panel">

        <?php require ROOT . FOLDER_PATH . "/app/assets/sidebarPnl.php"; ?>


    </div>
    <div class="contenido">
        <div class="lstReportes border">
        <h1>Reporte de consumo de combustible</h1>
            <div class="panel">
                <div class="grafica grafica_4" style="max-width:1350px">
                    <table id="tblSalidas" class="datatable display" style="max-width:1330px"></table>
                </div>
            </div>
        </div>
    </div>

    <script src="<?=  PATH_ASSETS . 'lib/moment/moment-with-locales.min.js'?>"></script>
    <script src="<?=  PATH_ASSETS . 'lib/dataTable/datatables.min.js' ?>"></script>
    <script src="<?=  PATH_ASSETS . 'lib/dataTable/Buttons-1.6.5/js/dataTables.buttons.min.js' ?>"></script>
    <script src="<?=  PATH_ASSETS . 'lib/dataTable/JSZip-2.5.0/jszip.js' ?>"></script>
    <script src="<?=  PATH_ASSETS . 'lib/dataTable/pdfmake-0.1.36/pdfmake.min.js' ?>"></script>
    <script src="<?=  PATH_ASSETS . 'lib/dataTable/pdfmake-0.1.36/vfs_fonts.js' ?>"></script>
    <script src="<?=  PATH_ASSETS . 'lib/dataTable/Buttons-1.6.5/js/buttons.html5.min.js' ?>"></script>
    <script src="<?=  PATH_ASSETS . 'lib/dataTable/Buttons-1.6.5/js/buttons.print.min.js' ?>"></script>
    <script src="<?=  PATH_ASSETS . 'lib/dataTable/colreorder/dataTables.colReorder.js' ?>"></script>
    <script src="<?=  PATH_ASSETS . 'lib/functions.js' ?>"></script>
    <script src="<?=  PATH_ASSETS . 'lib/daterangepicker/daterangepicker.js' ?>"></script>
    <script src="<?=  PATH_ASSETS . 'lib/daterangepicker/init_datepicker.js' ?>"></script>
    <script src="<?=  PATH_ASSETS . 'lib/date_selector.js' ?>"></script>
    <script src="<?=  PATH_VIEWS . 'TPanel_Rep003/TPanel_Rep003.js' ?>"></script>



    <?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>