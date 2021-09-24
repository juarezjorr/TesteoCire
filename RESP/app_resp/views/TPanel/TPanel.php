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


        <div class="lstDestinos border">
            <div class="date_contenedor"></div>
            <div class="panel">
                <div class="grafica grafica_3" id="grfSalidas"></div>
                <div class="grafica grafica_1" id="kpis"></div>
                <div class="grafica grafica_2" id="grfTopUnidades"></div>
                <div class="grafica grafica_2"></div>
            </div>
        </div>
    </div>


</div>

<script src="<?=  PATH_ASSETS . 'lib/moment/moment.js'?>"></script>
<script src="<?=  PATH_ASSETS . 'lib/moment/moment-with-locales.min.js'?>"></script>
<script src="<?=  PATH_ASSETS . 'lib/functions.js' ?>"></script>
<script src="<?=  PATH_ASSETS . 'lib/highcharts.js' ?>"></script>
<script src="<?=  PATH_ASSETS . 'lib/daterangepicker/daterangepicker.js' ?>"></script>
<script src="<?=  PATH_ASSETS . 'lib/daterangepicker/init_datepicker.js' ?>"></script>
<script src="<?=  PATH_ASSETS . 'lib/date_selector.js' ?>"></script>
<script src="<?=  PATH_VIEWS . 'TPanel/TPanel.js' ?>"></script>



<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>