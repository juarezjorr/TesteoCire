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


            <div class="mb-3 mvst_panel">
                <div class="form-group">


                    <div class="row">
                        <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                            <select id="txtTypeExchange" class="form-select form-select-sm required"><option value="0" data-content="||||" selected>Selecciona tipo de movimiento</option></select>
                            <label for="txtTypeExchange">Tipo de movimiento</label>
                        </div>
                    </div>

                    <!-- Almacen posición 0 -->
                    <div class="row pos0">
                        <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                            <select id="txtStoreSource" class="form-select form-select-sm required"><option value="0" selected>Selecciona almacen</option></select>
                            <label for="txtStoreSource" class="form-label">Almacen</label>
                        </div>
                    </div>

                    <!-- Proveedores posición 1 -->
                    <div class="row pos1">
                        <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                            <select id="txtSuppliers" class="form-select form-select-sm"><option value="0" selected>Selecciona proveedor</option></select>
                            <label for="txtSuppliers">Proveedores</label>
                        </div>
                    </div>

                    <!-- Factura posición 2 -->
                    <div class="row pos2">
                        <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                            <select id="txtDocuments" class="form-select form-select-sm"><option value="0" selected>Selecciona factura</option></select>
                            <label for="txtDocuments">Factura</label>
                        </div>
                    </div>


                    <div class="row list-finder">
                        <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                            <div class="box-items-list" id="boxProducts">Productos
                                <i class="fas fa-angle-down"></i>
                            </div>
                        </div>
                        <div class="list-group list-hide">
                            <div class="list-items" id="listProducts"></div>
                        </div>
                    </div>



                    <!-- Factura posición 3 -->
                    <div class="row  pos3">
                        <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                            <textarea class="form-control form-control-sm" id="txtComments" style="height: 120px" rows="3"></textarea>
                            <label for="txtComments">Comentarios</label>
                        </div>
                    </div>
                    <!-- <div class="row">
                        <div class="col-md-12 mb-5">
                            <button type="button" class="btn btn-sm btn-primary disabled" id="btn_exchange">Agregar</button>
                        </div>
                    </div> -->
                </div>
            </div>


            <div class="mb-3 mvst_table">
                <h1>Entradas de almacenes</h1>
                <table class="display compact nowrap"  id="tblExchanges">
                    <thead>
                        <tr>
                            <th style="width:  80px">soppr</th>
                            <th style="width:  30px"></th>
                            <th style="width:  80px">SKU</th>
                            <th style="width: 350px">Producto</th>
                            <th style="width:  60px">Cantidad</th>
                            <th style="width: 100px">No. Serie</th>
                            <th style="width:  50px">Tipo Origen</th>
                            <th style="width: 150px">Almacen Origen</th>
                            <th style="width:  50px">Tipo Destino</th>
                            <th style="width: 150px">Almacen Destino</th>
                            <th style="width: 350px">Nota</th>
                        </tr>
                    </thead>
                    <tbody>	

                    </tbody>
    
                </table>
            </div>


        
            
        </div>

    </div>
</div>

<!-- Modal Borrar -->
<div class="modal fade" id="MoveFolioModal" tabindex="-1" aria-labelledby="BorrarPerfilLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-sm">
            <div class="modal-content">
            <div class="modal-header ">
            </div>
            <div class="modal-body" style="padding: 0px !important;">


            <div class="row">
                <div class="col-12 text-center">
                    <span class="modal-title text-center" style="font-size: 1.2rem;" id="BorrarPerfilLabel">Folio: <h3 class="resFolio">000000000000</h3></span>
                </div>
            </div>

            </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" id="btnHideModal">Cerrar</button>
                </div>
            </div>
    </div>
</div>

<script src="<?=  PATH_ASSETS . 'lib/functions.js' ?>"></script>
<script src="<?=  PATH_VIEWS . 'MoveStoresIn/MoveStoresIn.js' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>