<?php 
      defined('BASEPATH') or exit('No se permite acceso directo'); 
      require ROOT . FOLDER_PATH . "/app/assets/header.php";
            
?>

 <link rel="stylesheet" href="<?= PATH_ASSETS .	'css/select2.min.css' ?>" />
 

<header>
    <?php require ROOT . FOLDER_PATH . "/app/assets/menu.php"; ?>
</header>
<div class="container-fluid">
    <div class="contenido">
        <div class="row mvst_group">
                <!-- Start área de formularios -->
                <div class="mvst_panel">
                    <div class="form-group">
                        <h4 id="titulo">Nuevo Producto</h4>  
                        <form id="formProducto" class="row g-3 needs-validation" novalidate>

                            <div class="row" hidden>
                                <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                    <input id="idStoreProducto" name="idStoreProducto" type="text" class="form-control form-control-sm" >
                                    <input id="IdProducto" name="IdProducto" type="text" class="form-control form-control-sm" >
                                    <input id="esUnico" name="esUnico" type="text" class="form-control form-control-sm" >

                                </div>
                            </div>

                            <div class="row" >
                                <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="1" id="checkIsAccesorie" >
                                    <label class="form-check-label" for="flexCheckDefault">
                                        Es accesorio
                                    </label>
                                    </div>
                                </div>
                            </div>


                            <div class="row">
                                <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                    <input id="NomProducto" name="NomProducto" type="text" class="form-control form-control-sm" autocomplete="off"  required   style="text-transform: uppercase" >
                                    <label for="NomProducto">Nombre </label>
                                    <div id="suggestions"></div>

                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                    <input id="NomEngProducto" name="NomEngProducto" type="text" class="form-control form-control-sm" autocomplete="off"   >
                                    <label for="NomEngProducto">Nombre Ingles </label>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                    <input id="PriceProducto" name="PriceProducto" type="number" class="form-control form-control-sm" autocomplete="off"   >
                                    <label for="PriceProducto">Precio </label>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                    <input id="DesProducto" name="DesProducto" type="text" class="form-control form-control-sm" autocomplete="off"   >
                                    <label for="DesProducto">Descripcion Segun proveedor</label>
                                </div>
                            </div>


                            <div class="row">
                                <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                    <select id="selectMonedaProducto"  name="selectMonedaProducto"  class="form-select form-select-sm" autocomplete="off"  >
                                    </select>
                                    <label for="selectMonedaProducto" class="form-label">Tipo de moneda</label>
                                </div>
                            </div>

                            <div class="row" id="hiddenCatalago">
                                <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                    <select id="selectRowCategorias"  name="selectRowCategorias"  class="form-select form-select-sm" autocomplete="off" >
                                    </select>
                                    <label for="selectRowCategorias" class="form-label">Catalago</label>
                                </div>
                            </div>

                            <div class="row" id="hiddenSubcategoria">
                                <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                    <select id="selectRowSubCategorias"  name="selectRowSubCategorias"  class="form-select form-select-sm" autocomplete="off"  >
                                    </select>
                                    <label for="selectRowSubCategorias" class="form-label">SubCategoria</label>
                                </div>
                            </div>


                            <div class="row">
                                <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                    <select id="selectRowService"  name="selectRowService"  class="form-select form-select-sm" autocomplete="off"  >
                                    </select>
                                    <label for="selectRowService" class="form-label">Tipo de servicio</label>
                                </div>
                            </div>

                            
                            <div class="row">
                                <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                    <select id="selectRowDocument"  name="selectRowDocument"  class="form-select form-select-sm" >
                                    </select>
                                    <label for="selectRowDocument" class="form-label">Documento</label>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="1" id="checkProducto" checked>
                                    <label class="form-check-label" for="flexCheckDefault">
                                    visible en lista de precio
                                    </label>
                                    </div>
                                </div>
                            </div>

                            <div class="row" >
                                <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="1" id="checkRentAccesories" checked>
                                    <label class="form-check-label" for="flexCheckDefault">
                                        Renta sin accesorios
                                    </label>
                                    </div>
                                </div>
                            </div>

                            <div class="row" >
                                <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="1" id="checkAplicaSeguro" checked>
                                    <label class="form-check-label" for="checkAplicaSeguro">
                                        Aplica seguro
                                    </label>
                                    </div>
                                </div>
                            </div>




                            <div class="row">
                                <div class="col-6">
                                    <button type="button"  class="btn btn-primary btn-sm btn-block" style="font-size: 1rem !important;" id="GuardarCategoria">Guardar</button>
                                </div>
                                <div class="col-6">
                                    <button type="button"  class="btn btn-danger btn-sm btn-block" style="font-size: 1rem !important;" id="LimpiarFormulario">Limpiar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <!-- End área de formularios -->

                <!-- Start área de listado -->
                <div class="mvst_table">
                    <div class="row rowTop">
                        <h1>Productos</h1>
                        <select id="txtCategoryList" class="topList"></select>
                    </div>
                    <div class="row">
                        <div class="col-12 col-md-12 tblProdMaster">		
                                <table id="ProductosTable" class="display compact nowrap" style="width:100%; text-aling: rigth !important;">         
                                        <thead>
                                            <tr>
                                                <th style="width: 20px"></th>
                                                <th style="width: 30px" hidden >Id</th>
                                                <th style="width: 70px">SKU</th>
                                                <th style="width: auto">Nombre</th>
                                                <th style="width: auto">Precio</th>
                                                <th style="width: auto">Existencias</th>
                                                <th style="width: auto">Tipo</th>
                                                <th style="width: auto">Servicio</th>
                                                <th style="width: auto">Nombre ingles</th>
                                                <th style="width: auto">Catálogo</th>
                                                <th style="width: auto">Subcategoria</th>
                                                <th style="width: auto">Descripción Segun Proveedor</th>
                                            </tr>
                                        </thead>
                                        <tbody id="tablaProductosRow">
                                        </tbody>
                                    </table>
                            </div>
                            <div class="deep_loading">
                                <div class="flash_loading"> Cargando datos...</div>
                            </div>
                    </div>
                </div>
                <!-- End área de listado -->
            </div>
    </div>
</div>


<!-- Modal Borrar -->
<div class="modal fade" id="BorrarProductoModal" tabindex="-1" aria-labelledby="BorrarPerfilLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-sm">
            <div class="modal-content">
            <div class="modal-header ">
            </div>
            <div class="modal-body" style="padding: 0px !important;">


            <div class="row">
                <input hidden type="text" class="form-control" id="IdProductoBorrar" aria-describedby="basic-addon3">
                <div class="col-12 text-center">
                    <span class="modal-title text-center" style="font-size: 1.2rem;" id="BorrarPerfilLabel">¿Seguro que desea borrarlo?</span>
                </div>
            </div>

            </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-danger" id="BorrarProduct">Borrar</button>
                </div>
            </div>
    </div>
</div>



<!-- Modal Borrar -->
<div class="modal fade" id="ProductoExisteModal" tabindex="-1" aria-labelledby="ProductoExisteLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-sm">
            <div class="modal-content">
            <div class="modal-header ">
            </div>
            <div class="modal-body" style="padding: 0px !important;">


            <div class="row">
                <div class="col-12 text-center">
                    <span class="modal-title text-center" style="font-size: .9rem;" id="ProductoExisteLabel">El concepto <span id="NombreConcepto"></span>  ya se encuentra registro en base de datos</span>
                </div>
            </div>

            </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
    </div>
</div>

<!-- ************* -->
<div class="overlay_background overlay_hide">
        <div class="overlay_modal">
            <div class="overlay_closer"><span class="title">SKU'S</span><span class="btn_close">Cerrar</span></div>
            

            <div class="collapse" id="collapseExample" style="margin-bottom: 1rem; !important">
            <div class="card card-body" style="height: 100%;">
               <div class="row" style="height: 100% !important;">

                <input id="idSku" name="idSku" type="text" class="form-control form-control-sm" required hidden >

                <div class="col-2">
                    <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating"  style="margin-bottom: .0rem!important;">
                        <input id="SerieSku" name="SerieSku" type="text" class="form-control form-control-sm" required >
                        <label for="SerieSku">Numero de serie Producto</label>
                    </div>
                </div>
                <div class="col-2" >
                    <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating" style="margin-bottom: .0rem!important;">
                        <input id="CostSku" name="CostSku" type="number" class="form-control form-control-sm" required >
                        <label for="CostSku">Costo</label>
                    </div>
                </div>
                <div class="col-2" >
                    <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating" style="margin-bottom: .0rem !important; height: 65px !important;">
                        <select id="selectRowAlmacenSku"  name="selectRowAlmacenSku"  class="selectRowAlmacen form-select form-select-sm" autocomplete="off"  >
                        </select>
                        <label for="selectRowAlmacenSku" class="form-label">Almacen</label>
                    </div>
                </div>

                <div class="col-2 align-middle" style="margin-bottom: .0rem!important; margin: 1.1rem 0rem;">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="1" id="checkRentAccesoriesSku" checked>
                        <label class="form-check-label" for="flexCheckDefault">
                            Renta sin accesorios
                        </label>
                    </div>
                </div>



                <div class="col-2 align-middle" style="margin-bottom: .0rem!important; margin: .4rem 0rem;">
                    <div class="form-check">
                    <input class="form-check-input" type="radio" name="ventOrRentSku" value="C" id="ventOrRentSku1" checked>
                    <label class="form-check-label" for="flexRadioDefault1">
                        Producto para Compra
                    </label>
                    </div>
                    <div class="form-check">
                    <input class="form-check-input" type="radio" name="ventOrRentSku"  value="R" id="ventOrRentSku2" >
                    <label class="form-check-label" for="flexRadioDefault2">
                        Producto para Renta
                    </label>
                    </div>
                </div>

                <div class="col-2" style="margin-bottom: .0rem !important; height: 100%; margin-top: .8rem">
                    <button type="button"  class="btn btn-primary btn-sm btn-block" style="font-size: 1rem !important;" id="GuardarSKU" onclick="SaveSku()">Guardar</button>
                </div>



                </div>			
            </div>
        </div>

            <table id="SKUTable" class="display compact nowrap"  >         
                        <thead>
                            <tr>
                                <th style="width:  30px" hidden></th>
                                <th style="width:  80px">SKU</th>
                                <th style="width: 130px">Numero Serie</th>
                                <th style="width:  70px">Costo</th>
                                <th style="width:  50px">Factura</th>
                                <th style="width: 120px">Fecha Registro</th>
                                <th >Uso</th>

                            </tr>
                        </thead>
                        <tbody id="tablaSKURow">
                        </tbody>
            </table>

            
        </div>
    </div>

<!-- ************* -->







     <script src="<?=  PATH_ASSETS . 'lib/Datatable_J/Js/bootstrap.bundle.min.js' ?>"></script>

    <!--  librerias para boostrap-->	
    <script src="<?=  PATH_ASSETS . 'lib/Datatable_J/Js/jquery-3.5.1.js' ?>"></script>
    <script src="<?=  PATH_ASSETS . 'lib/Datatable_J/Js/jquery.dataTables.min.js' ?>"></script>
    <script src="<?=  PATH_ASSETS . 'lib/Datatable_J/Js/dataTables.bootstrap4.min.js' ?>"></script>
    <script src="<?=  PATH_ASSETS . 'lib/Datatable_J/Js/dataTables.responsive.min.js' ?>"></script>
    <script src="<?=  PATH_ASSETS . 'lib/Datatable_J/Js/responsive.bootstrap4.min.js' ?>"></script>
    <script src="<?=  PATH_ASSETS . 'lib/Datatable_J/Js/dataTables.select.min.js' ?>"></script>

    <script src="<?=  PATH_ASSETS . 'lib/Datatable_J/Js/dataTables.buttons.min.js' ?>"></script>
    <script src="<?=  PATH_ASSETS . 'lib/Datatable_J/Js/jszip.min.js' ?>"></script>
    <script src="<?=  PATH_ASSETS . 'lib/Datatable_J/Js/pdfmake.min.js' ?>"></script>
    <script src="<?=  PATH_ASSETS . 'lib/Datatable_J/Js/vfs_fonts.js' ?>"></script>
    <script src="<?=  PATH_ASSETS . 'lib/Datatable_J/Js/buttons.html5.min.js' ?>"></script>
    <script src="<?=  PATH_ASSETS . 'lib/Datatable_J/Js/buttons.print.min.js' ?>"></script>
</div>



<script src="<?=  PATH_ASSETS . 'lib/select2.min.js' ?>"></script>
 <script src="<?=  PATH_ASSETS . 'lib/popper.min.js' ?>"></script>
<script src="<?=  PATH_ASSETS . 'lib/functions.js' ?>"></script>
<script src="<?=  PATH_VIEWS . 'Productos/Productos.js' ?>"></script>





<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>