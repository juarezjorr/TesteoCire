<?php 
	defined('BASEPATH') or exit('No se permite acceso directo'); 
	require ROOT . FOLDER_PATH . "/app/assets/header.php";
?>

<header>
    <?php require ROOT . FOLDER_PATH . "/app/assets/menu.php"; ?>
</header>
<div class="container-fluid">
    <div class="contenido">
            
         
        <div class="row mvst_group">

            <!-- Start Sector lateral izquierdo, zona de fomularios -->
            <div class="mb-3 mvst_panel">
                <div class="form-group">
                <a href="<?= FOLDER_PATH . '/StoreProductsList/GenerateReport' ?>">Reporte</a>
                </div>
            </div>
            <!-- End Sector lateral izquierdo, zona de fomularios -->

            <!-- Start Sector de contenido, zona de tablas y operaciones -->
            <div class="mb-3 mvst_table">
            <?php !empty($report) ? require ROOT . PATH_VIEWS . 'StoreProductsList/rpt_StoreProducts.php' : '' ?>
            </div>
            <!-- End Sector de contenido, zona de tablas y operaciones -->

    </div>
</div>


<script src="<?=  PATH_ASSETS . 'lib/functions.js' ?>"></script>
<script src="<?=  PATH_VIEWS . 'StoreProductsList/StoreProductsList.js' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>