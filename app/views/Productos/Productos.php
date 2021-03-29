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
				<!-- Start área de formularios -->
				<div class="mb-3 mvst_panel">
					<div class="form-group">
						<h4 id="titulo">Nuevo Producto</h4>  
						<form id="formProducto" class="row g-3 needs-validation" novalidate>

							<div class="row" hidden>
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
								<input id="idStoreProducto" name="idStoreProducto" type="text" class="form-control form-control-sm" >

									<input id="IdProducto" name="IdProducto" type="text" class="form-control form-control-sm" >
								</div>
							</div>

							<div class="row">
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<input id="NomProducto" name="NomProducto" type="text" class="form-control form-control-sm" required >
									<label for="NomProducto">Nombre Producto</label>
								</div>
							</div>
                     		<div class="row">
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<input id="NomEngProducto" name="NomEngProducto" type="text" class="form-control form-control-sm" required >
									<label for="NomEngProducto">Nombre Ingles Producto</label>
								</div>
							</div>
                     		<div class="row">
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<input id="ModelProducto" name="ModelProducto" type="text" class="form-control form-control-sm" maxlength="3" style="text-transform: uppercase" required >
									<label for="ModelProducto">Modelo Producto</label>
								</div>
							</div>

<!--                      		<div class="row">
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<input id="SerieProducto" name="SerieProducto" type="text" class="form-control form-control-sm" required >
									<label for="SerieProducto">Numero de serie Producto</label>
								</div>
							</div> -->

                     		<div class="row">
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<input id="CostProducto" name="CostProducto" type="text" class="form-control form-control-sm" required >
									<label for="CostProducto">Costo Producto</label>
								</div>
							</div>

                     		<div class="row">
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<input id="PriceProducto" name="PriceProducto" type="text" class="form-control form-control-sm" required >
									<label for="PriceProducto">Precio Producto</label>
								</div>
							</div>

                     		<div class="row">
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<input id="DesProducto" name="DesProducto" type="text" class="form-control form-control-sm" required >
									<label for="DesProducto">Descripcion Producto</label>
								</div>
							</div>


                    		<div class="row">
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<select id="selectMonedaProducto"  name="selectMonedaProducto"  class="form-select form-select-sm" required>
									</select>
									<label for="selectMonedaProducto" class="form-label">Tipo de moneda</label>
								</div>
							</div>

                   			<div class="row">
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<select id="selectRowCategorias"  name="selectRowCategorias"  class="form-select form-select-sm" required>
									</select>
									<label for="selectRowCategorias" class="form-label">Categoria</label>
								</div>
							</div>

                    		 <div class="row">
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<select id="selectRowSubCategorias"  name="selectRowSubCategorias"  class="form-select form-select-sm" required>
									</select>
									<label for="selectRowSubCategorias" class="form-label">SubCategoria</label>
								</div>
							</div>

							<div class="row">
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<select id="selectRowService"  name="selectRowService"  class="form-select form-select-sm" required>
									</select>
									<label for="selectRowService" class="form-label">Tipo de servicio</label>
								</div>
							</div>

							<div class="row">
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<select id="selectRowProovedores"  name="selectRowProovedores"  class="form-select form-select-sm" required>
									</select>
									<label for="selectRowProovedores" class="form-label">Proveedor</label>
								</div>
							</div>

							<div class="row">
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<select id="selectRowAlmacen"  name="selectRowAlmacen"  class="form-select form-select-sm" required>
									</select>
									<label for="selectRowAlmacen" class="form-label">Almacen</label>
								</div>
							</div>

<!-- 							<div class="row">
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<select id="selectRowDocument"  name="selectRowDocument"  class="form-select form-select-sm" required>
									</select>
									<label for="selectRowDocument" class="form-label">Almacen</label>
								</div>
							</div> -->


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
				<div class="mb-3 mvst_table">
					<h1>Productos</h1>

					<div class="row">
						<div class="col-12 col-md-12">		
								<table id="ProductosTable" class="display compact nowrap" style="width:100%">         
										<thead>
											<tr>
													<th style="width: 30px"></th>
													<th style="width: 30px">Id</th>
													<th style="width: auto">Nombre</th>
                                       <th style="width: auto">Nombre ingles</th>
                                       <th style="width: auto">SKU</th>
                                       <th style="width: auto">Model</th>

<!--                                        <th style="width: auto">Numero serie</th>
 -->                                       <th style="width: auto">Costo</th>
                                       <th style="width: auto">Price</th>

									   <th style="width: auto">Descripcion</th>


                                       <th style="width: auto">Servicio</th>
                                       <th style="width: auto">Categoria</th>
                                       <th style="width: auto">Subcategoria</th>
                                       <th style="width: auto">Almacen</th>
											</tr>
										</thead>
										<tbody id="tablaProductosRow">
										</tbody>
									</table>
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

<script src="<?=  PATH_ASSETS . 'lib/functions.js' ?>"></script>
<script src="<?=  PATH_VIEWS . 'productos/productos.js' ?>"></script>





<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>