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
            <div class="mvst_list tblProdMaster">
                <div class="row rowTop">
                    <h1>Lista de precios</h1>
                    <select id="txtCategoryList" class="topList"></select>
                </div>
                <table class="display compact nowrap"  id="tblPriceList">
                    <thead>
                        <tr>
                            <th style="width:  10px"></th>
                            <th style="width:  70px">SKU</th>
                            <th style="width: 350px">Producto</th>
                            <th style="width:  60px">Existencias</th>
                            <th style="width:  70px">Precio</th>
                            <th style="width:  50px">Moneda</th>
                            <th style="width:  40px">Ficha<br>Técnica</th>
                            <th style="width: 180px">Catálogo</th>
                            <th style="width: 180px">Subcategoría</th>
                            <th style="width:  70px">Tipo</th>
                            <th style="width:  auto">Descripción en inglés</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>

            </div>
        </div>
        <div class="deep_loading">
            <div class="flash_loading"> Cargando datos...</div>
        </div>
    </div>
</div>


<!-- Start Ventana modal SERIES -->
    <div class="overlay_background overlay_hide"id="SerieModal">
        <div class="overlay_modal">
            <div class="overlay_closer"><span class="title"></span><span class="btn_close">Cerrar</span></div>
            <table class="display compact nowrap"  id="tblSerialList">
                <thead>
                    <tr>
                        <th style="width: 100px">SKU</th>
                        <th style="width:  80px">Núm. serie</th>
                        <th style="width: 120px">Fecha de alta</th>
                        <th style="width:  50px">Clave status</th>
                        <th style="width:  50px">Clave etapa</th>
                        <th style="width: 100px">Tipo de producto</th>
                        <th style="width:  60px">Existencias</th>
                        <th style="width: 200px">Almacen</th>
                        <th style="width: 350px">Comentarios</th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
<!-- End Ventana modal SERIES -->


<!-- Start Ventana modal PRODUCTOS -->
<div class="overlay_background overlay_hide" id="ProductsModal">
        <div class="overlay_modal">
            <div class="overlay_closer"><span class="title"></span><span class="btn_close">Cerrar</span></div>
            <table class="display compact nowrap"  id="tblProductlList">
                <thead>
                    <tr>
                        <th style="width: 100px">SKU</th>
                        <th style="width: 350px">Producto</th>
                        <th style="width:  60px">Existencias</th>
                        <th style="width:  70px">Precio</th>
                        <th style="width:  50px">Moneda</th>
                        <th style="width: 180px">Catálogo</th>
                        <th style="width: 180px">Subcategoría</th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
<!-- End Ventana modal PRODUCTOS -->


<!-- Start Ventana modal PRODUCTOS -->
<div class="overlay_background overlay_hide" id="LoadingModal">

    </div>
<!-- End Ventana modal PRODUCTOS -->



<script src="<?=  PATH_ASSETS . 'lib/functions.js' ?>"></script>
<script src="<?=  PATH_VIEWS . 'ProductsPriceList/ProductsPriceList.js' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>