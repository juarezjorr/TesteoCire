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
        <div class="mb-3 mvst_list">
        <h1>Lista de precios</h1>
            <table class="display compact nowrap"  id="tblPriceList">
                <thead>
                    <tr>
                        <th style="width:  30px"></th>
                        <th style="width:  80px">SKU</th>
                        <th style="width: 350px">Producto</th>
                        <th style="width:  60px">Stock</th>
                        <th style="width:  70px">Precio</th>
                        <th style="width:  50px">Moneda</th>
                        <th style="width: 120px">Documentos</th>
                        <th style="width: 180px">Catálogo</th>
                        <th style="width: 180px">Subcategoría</th>
                        <th style="width:  70px">Tipo</th>
                        <th style="width: 350px">Descripción en inglés</th>
                    </tr>
                </thead>
                <tbody>	

                </tbody>

            </table>
</div>
        </div>
    </div>
</div>


<!-- Start Ventana modal -->
    <div class="overlay_background overlay_hide">
        <div class="overlay_modal">
            <div class="overlay_closer"><span class="title">Nombre del producto</span><span class="btn_close">Cerrar</span></div>
            <table class="display compact nowrap"  id="tblSerialList">
                <thead>
                    <tr>
                        <th style="width:  160px">SKU</th>
                        <th style="width:  80px">Núm. serie</th>
                        <th style="width:  80px">Costo</th>
                        <th style="width: 120px">Fecha de alta</th>
                        <th style="width:  50px">Clave status</th>
                        <th style="width:  50px">Clave etapa</th>
                        <th style="width: 100px">Tipo de producto</th>
                        <th style="width:  60px">Stock</th>
                        <th style="width: 160px">Almacen</th>
                        <th style="width: 350px">Comentarios</th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
<!-- End Ventana modal -->


<script src="<?=  PATH_ASSETS . 'lib/functions.js' ?>"></script>
<script src="<?=  PATH_VIEWS . 'ProductsPriceList/ProductsPriceList.js' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>