<?php 
  	defined('BASEPATH') or exit('No se permite acceso directo'); 
	  require ROOT . FOLDER_PATH . "/app/assets/header.php";
	  require ROOT . FOLDER_PATH . "/app/assets/menu.php";
?>


<div class="container">

    <div class="sidebar">
    
    <?php require ROOT . FOLDER_PATH . "/app/assets/sidebarAdm.php"; ?>


    </div>
    <div class="contenido"></div>


</div>

<script src="<?=  PATH_ASSETS . 'lib/functions.js' ?>"></script>
<script src="<?=  PATH_VIEWS . 'TAdmin/TAdmin.js' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>