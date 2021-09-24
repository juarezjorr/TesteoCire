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
                <h4 id="titulo">Productos para Impresión</h4>

                    <div class="row">
                        <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                            <select id="txtStoreSource" class="form-select form-select-sm required"><option value="0" data-content="||" selected>Selecciona Almacén</option></select>
                            <label for="txtStoreSource" class="form-label">Almacén</label>
                        </div>
                    </div>

                    <!-- <div class="row list-finder">
                        <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                <div class="box-items-list" id="boxProducts">Productos
                                    <i class="fas fa-angle-down"></i>
                                </div>
                                
                        </div>
                        <div class="list-group list-hide">
                            <div class="list-items" id="listProducts"></div>
                        </div>
                    </div> -->

                    <div class="row list-finder">
                        <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                <input id="txtProducts" type="text" class="form-control form-control-sm required" data-mesage="Debes seleccionar un producto" >
                                <label for="txtProducts">Productos</label>
                            </div>
                            <input type="hidden" id="txtIdProducts" name="txtIdProducts">
                        <div class="list-group list-hide">
                            <div class="list-items" id="listProducts"></div>
                        </div>
                    </div>

                    
                  

                    <div class="row">
                        <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                            <textarea class="form-control form-control-sm" id="txtComments" style="height: 120px" rows="3"></textarea>
                            <label for="txtComments">Notas</label>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-8 mb-5">
                            <button type="button" class="btn btn-sm btn-primary disabled" id="btn_products">Agregar</button>
                        </div>
                    </div>


                </div>
            </div>


            <div class="mb-3 mvst_table" style="text-align:left">

                <h1>Productos de almacén</h1>

                <div class="row">

                        <div class="col-sm-12 col-md-2 col-lg-2 col-xl-2  mb-2 form-floating">
                            <input id="txtStartDate" type="text" class="form-control form-control-sm" placeholder="Fecha Salida">
                            <label for="txtStartDate" >Fecha Salida</label>
                        </div>

                        <div class="col-sm-12 col-md-2 col-lg-2 col-xl-2  mb-2 form-floating">
                            <input id="txtProjectNum" type="text" class="form-control form-control-sm"  data-mesage="Debes agregar el numero de proyecto" >
                            <label for="txtProjectNum">No. proyecto</label>
                        </div>

                        <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4 form-floating">
                            <input id="txtProjectName" type="text" class="form-control form-control-sm"  data-mesage="Debes agregar el nombre del proyecto" >
                            <label for="txtProjectName">Proyecto</label>
                        </div>

                        <div class="col-sm-12 col-md-2 col-lg-2 col-xl-2  mb-2 form-floating">
                            <input id="txtVersion" type="text" class="form-control form-control-sm"  data-mesage="Debes agregar la version del producto" >
                            <label for="txtVersion">Versión Doc.</label>
                        </div>

                        <div class="col-sm-12 col-md-2 col-lg-2 col-xl-2  mb-2 form-floating">
                            <input id="txtFreelance" type="text" class="form-control form-control-sm"  data-mesage="Debes agregar el nombre del freelance" >
                            <label for="txtFreelance">Freelance</label>
                        </div>
                    </div>

                <table class="display compact nowrap"  id="tblExchanges">
				
                    <thead>
                        <tr>
                            <th style="width:  30px"></th>
                            <th style="width:  80px">SKU</th>
                            <th style="width: 350px">Nombre</th>
                            <th style="width:  60px">No. Serie</th>
                            <th style="width: 400px">Notas</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>


        
            
        </div>

    </div>


</div>

    <!-- Start Formato para impresion -->
        <div class="prepress" id="format"></div>
    <!-- End Formato para impresion -->


<script src="<?=  PATH_ASSETS . 'lib/functions.js' ?>"></script>
<script src="<?=  PATH_VIEWS . 'StoreProductsList/StoreProductsList.js' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>