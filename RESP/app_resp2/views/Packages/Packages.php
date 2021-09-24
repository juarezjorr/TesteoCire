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
                <div class="form_primary">
                    <h4 class="mainTitle">Generar paquete</h4>


                        <div class="row">
                            <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                <input id="txtPackageName" type="text" class="form-control form-control-sm" >
                                <label for="txtPackageName">Nombre del packete</label>
                            </div>
                           
                        </div>

                        <div class="row">
                            <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                <input id="txtPackagePrice" type="text" class="form-control form-control-sm" >
                                <label for="txtPackagePrice">Precio del paquete</label>
                            </div>
                        </div>


                        <div class="row">
                            <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                <select id="txtCategoryPack" class="form-select form-select-sm required">
                                    <option value="0" data-content="||||" selected>Selecciona una categoría</option>
                                </select>
                                <label for="txtCategoryPack">Categoria</label>
                            </div>
                        </div>


                        <div class="row">
                            <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                <select id="txtSubcategoryPack" class="form-select form-select-sm required">
                                    <option value="0" selected>Selecciona una subcategoría</option>
                                </select>
                                <label for="txtSubcategoryPack" class="form-label">Subcategoia</label>
                            </div>
                          
                        </div>

                        
                        <div class="row">
                            <div class="col-md-12 mb-5">
                                <button type="button" class="btn btn-sm btn-primary disabled" id="btn_packages">Crear paquete</button>
                                <button type="button" class="btn btn-sm btn-danger hide-items" id="btn_packages_cancel">Cancelar</button>
                            </div>
                        </div>

                    </div>

                    <div class="form_secundary">
                        <h4>Seleccion de productos</h4>
                        <div class="row">
                            <input type="hidden" id="txtIdPackages" name="txtIdPackages"><br>
                            <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                <select id="txtCategoryProduct" class="form-select form-select-sm required">
                                    <option value="0" data-content="||||" selected>Selecciona una categoría</option>
                                </select>
                                <label for="txtCategoryProduct">Categoria</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                <select id="txtSubcategoryProduct" class="form-select form-select-sm required">
                                    <option value="0" selected>Selecciona una subcategoría</option>
                                </select>
                                <label for="txtSubcategoryProduct" class="form-label">Subcategoia</label>
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
                        
                    </div>
                </div>
            </div>


            <div class="mb-3 mvst_table">
                <h1>Paquetes</h1>
                <div class="double-column">
                    <div class="left-side">
                        <h3>Paquetes</h3>
                        <table class="display compact nowrap"  id="tblPackages"  style="width:100%">
                            <thead>
                                <tr>
                                    <th style="width:  30px"></th>
                                    <th style="width:  80px">SKU</th>
                                    <th style="width:  auto">Nombre</th>
                                    <th style="width:  90px">Precio</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                    <div class="right-side">
                        <h3>Productos</h3>
                        <table class="display compact nowrap"  id="tblProducts" style="width:100%">
                            <thead>
                                <tr>
                                    <th style="width:  30px"></th>
                                    <th style="width:  80px">SKU</th>
                                    <th style="width:  auto">Producto</th>
                                    <th style="width:  90px">Precio</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                    
                </div>
            </div>


        
            
        </div>

    </div>
</div>


<!-- Modal Borrar -->
<div class="modal fade" id="delPackModal" tabindex="-1" aria-labelledby="BorrarPerfilLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-sm">
            <div class="modal-content">
            <div class="modal-header ">
            </div>
            <div class="modal-body" style="padding: 0px !important;">


            <div class="row">
                <input type="hidden" class="form-control" id="txtIdPackage" aria-describedby="basic-addon3">
                <div class="col-12 text-center">
                    <span class="modal-title text-center" style="font-size: 1.2rem;" id="BorrarPerfilLabel">¿Seguro que desea borrarlo?</span>
                </div>
            </div>

            </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-danger" id="btnDelPackage">Borrar</button>
                </div>
            </div>
    </div>
</div>


<div class="modal fade" id="delProdModal" tabindex="-1" aria-labelledby="BorrarPerfilLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-sm">
            <div class="modal-content">
            <div class="modal-header ">
            </div>
            <div class="modal-body" style="padding: 0px !important;">


            <div class="row">
                <input type="hidden" class="form-control" id="txtIdProductPack" aria-describedby="basic-addon3">
                <div class="col-12 text-center">
                    <span class="modal-title text-center" style="font-size: 1.2rem;" id="BorrarPerfilLabel">¿Seguro que desea borrarlo?</span>
                </div>
            </div>

            </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-danger" id="btnDelProduct">Borrar</button>
                </div>
            </div>
    </div>
</div>


<script src="<?=  PATH_ASSETS . 'lib/functions.js' ?>"></script>
<script src="<?=  PATH_VIEWS . 'Packages/Packages.js' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>