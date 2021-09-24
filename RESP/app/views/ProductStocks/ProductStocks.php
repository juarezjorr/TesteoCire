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


            <div class="mvst_panel">
                <div class="form-group">
                <h4 id="titulo">Productos en Existencia</h4>

                    <div class="row">
                        <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                            <select id="txtStoreSource" class="form-select form-select-sm required"><option value="0" data-content="||" selected>Seleccione...</option></select>
                            <label for="txtStoreSource" class="form-label">Almacén</label>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                            <select id="selectRowCategorias" class="form-select form-select-sm required"><option value="0" data-content="||" selected>Seleccione...</option></select>
                            <label for="selectRowCategorias" class="form-label">Catalogo</label>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                            <select id="selectRowSubCategorias" class="form-select form-select-sm required"><option value="0" data-content="||" selected>Seleccione...</option></select>
                            <label for="selectRowSubCategorias" class="form-label">SubCategoria</label>
                        </div>
                    </div>

                    

                    <div class="row" style="height: 10px">
					</div>




                    <div class="row" >
						<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                            <div class="form-check">
                                <input class="form-check-input checkTipe" type="radio" name="RadioConceptos" id="RadioConceptos1" checked>
                                <label class="form-check-label" for="RadioConceptos1">
                                  Conceptos
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input checkTipe" type="radio" name="RadioConceptos" id="RadioConceptos2" >
                                <label class="form-check-label" for="RadioConceptos2">
                                Prod x serie
                                </label>
                            </div>
						</div>
					</div>

                    <div class="row" style="height: 10px">
					</div>


                    <div class="row" >
						<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
								<div class="form-check">
									<input class="form-check-input" type="checkbox" value="1" id="checkIsPaquete" checked >
									<label class="form-check-label" for="flexCheckDefault">
										Paquetes
									</label>
								</div>
						</div>
					</div>

                    <div class="row" >
						<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
								<div class="form-check">
									<input class="form-check-input" type="checkbox" value="1" id="checkIsProducto" checked >
									<label class="form-check-label" for="flexCheckDefault">
										Productos
									</label>
								</div>
						</div>
					</div>

                    <div class="row" >
						<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
								<div class="form-check">
									<input class="form-check-input" type="checkbox" value="1" id="checkIsAccesorie" checked >
									<label class="form-check-label" for="flexCheckDefault">
										Accesorios
									</label>
								</div>
						</div>
					</div>


                    <div class="row">
                        <div class="col-md-8 mb-5">
                            <button type="button" class="btn btn-sm btn-primary" id="btn_products">Cargar</button>
                        </div>
                    </div>


                </div>
            </div>


            <div class="mvst_table" style="text-align:left">

                <h1>Productos en Existencia</h1>

                   <div class="row">
                        <div class="col-sm-12 col-md-2 col-lg-2 col-xl-2  mb-2 form-floating" hidden>
                            <input id="txtStartDate" type="text" class="form-control form-control-sm" placeholder="Fecha Salida">
                            <label for="txtStartDate" >Fecha Salida</label>
                        </div>
                    </div>

                <table class="display compact nowrap"  id="tblExchanges"  style="width: 100%;">
                    <thead>
                        <tr>
                            <th style="width:  70px">SkU</th>
                            <th style="width: 600px">Nombre</th>
                            <th style="width:  80px">Precio</th>
                            <th style="width:  80px">Subcategoria</th>

<!--                             <th style="width:  60px" id="numeroSerieColum">No. Serie</th>
                            <th style="width:  auto" id="fechaRegColum">Fecha registro</th> -->
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>

                 <table class="display compact nowrap"  id="tblExchangesProductos"  style="width: 100%;"  >
                    <thead>
                        <tr>
                            <th style="width:  70px">SkU</th>
                            <th style="width: 600px">Nombre</th>
                            <th style="width:  auto">Costo</th>
                            <th style="width:  auto">Serie</th>
                            <th style="width:  auto">Fecha Alta</th>
                            <th style="width:  auto">Proveedor</th> 
                            <th style="width:  auto">Subcategoria</th> 

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
<script src="<?=  PATH_VIEWS . 'ProductStocks/ProductStocks.js' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>