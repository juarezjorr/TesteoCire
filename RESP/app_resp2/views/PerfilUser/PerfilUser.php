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
						<h4 id="titulo">Nuevo Perfil Usuario</h4>  
						<form id="formPerfiluser" class="row g-3 needs-validation" novalidate>

							<div class="row" hidden>
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<input id="IdPerfil" name="IdPerfil" type="text" class="form-control form-control-sm" >
								</div>
							</div>

							<div class="row">
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<input id="NomPerfil" name="NomPerfil" type="text" class="form-control form-control-sm" required >
									<label for="NomPerfil">Nombre Perfil</label>
								</div>
							</div>

                     <div class="row">
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<input id="CodPerfil" name="CodPerfil" type="text" class="form-control form-control-sm" required >
									<label for="CodPerfil">Codigo Perfil</label>
								</div>
							</div>

                     <div class="row">
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<input id="DesPerfil" name="DesPerfil" type="text" class="form-control form-control-sm" required >
									<label for="DesPerfil">Descripcion Perfil</label>
								</div>
							</div>

                     
                     <div class="row">
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">

                        <div class="row margin-cero" >
                        <div class="col-12 col-md-12 " >
                              <div class="col-12 text-center colorSecundario" style="font-weight: 600 !important;">
                                 Disponibles
                              </div>
                              <div class="card listContainer" style="">
                                 <div class="card-body card-body-add" style="height: 13rem !important;">
                                    <div class="list-group" id="listDisponible">
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div class="col-12 col-md-12 ">
                              <div class="col-12 text-center colorSecundario" style="font-weight: 600 !important;">
                                 Asignados
                              </div>
                              <div class="card listContainer" style="">
                                 <div class="card-body card-body-add" style="height: 13rem !important;">
                                    <div class="list-group" id="listAsignado">                     
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>

								</div>
							</div>


							<div class="row">
								<div class="col-6">
									<button type="button"  class="btn btn-primary btn-sm btn-block" style="font-size: 1rem !important;" id="GuardarPerfil">Guardar</button>
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
					<h1>Perfiles Usuarios</h1>

					<div class="row">
						<div class="col-12 col-md-12">		
								<table id="perfilesTable" class="display compact nowrap" style="width:100%">         
										<thead>
											<tr>
													<th style="width: 30px"></th>
													<th style="width: 30px">Id</th>
													<th style="width: auto">Nombre</th>
                                       <th style="width: 30px">Codigo</th>
													<th style="width: auto">Descripcion</th>

											</tr>
										</thead>
										<tbody id="tablaPerfilesRow">
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
<div class="modal fade" id="BorrarPerfilModal" tabindex="-1" aria-labelledby="BorrarPerfilLabel" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered modal-sm">
					 <div class="modal-content">
					 <div class="modal-header ">
					 </div>
					 <div class="modal-body" style="padding: 0px !important;">


					 <div class="row">
						  <input hidden type="text" class="form-control" id="IdPerfilBorrrar" aria-describedby="basic-addon3">
						  <div class="col-12 text-center">
								<span class="modal-title text-center" style="font-size: 1.2rem;" id="BorrarPerfilLabel">¿Seguro que desea borrarlo?</span>
						  </div>
					 </div>

					 </div>
						  <div class="modal-footer">
								<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
								<button type="button" class="btn btn-danger" id="BorrarPerfil">Borrar</button>
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
<script src="<?=  PATH_VIEWS . 'PerfilUser/PerfilUser.js' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>