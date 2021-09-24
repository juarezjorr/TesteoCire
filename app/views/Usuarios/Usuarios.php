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
				<div class="mvst_panel">
					<div class="form-group">
						<h4 id="titulo">Nuevo Usuarios</h4>  
						<form id="formUsuario" class="row g-3 needs-validation" novalidate>

							<div class="row" hidden>
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<input id="EmpIdUsuario" name="EmpIdUsuario" type="text" class="form-control form-control-sm"  autocomplete="off">
									<input id="lastDate" name="lastDate" type="text" class="form-control form-control-sm"  autocomplete="off">
									<input id="userRegistry" name="userRegistry" type="text" class="form-control form-control-sm"  autocomplete="off">
									<input id="IdUsuario" name="IdUsuario" type="text" class="form-control form-control-sm"  autocomplete="off">
								</div>
							</div>

							<div class="row">
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<input id="NomUsuario" name="NomUsuario" type="text" class="form-control form-control-sm"  autocomplete="off" required >
									<label for="NomUsuario">Nombre Usuario</label>
								</div>
							</div>

                    		 <div class="row">
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<input id="UserNameUsuario" name="tuti" type="text" class="form-control form-control-sm"  autocomplete="off" required >
									<label for="UserNameUsuario">UserName</label>
								</div>
							</div>

                    		 <div class="row" id="PassUsuarioRow">
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<input id="PassUsuario" name="Pato" type="text" class="form-control form-control-sm"  autocomplete="off" required >
									<label for="PassUsuario">Password </label>
								</div>
							</div>


                     		<div class="row">
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<input id="AreaEmpUsuario" name="AreaEmpUsuario" type="text" class="form-control form-control-sm"  autocomplete="off" required >
									<label for="AreaEmpUsuario">Area </label>
								</div>
							</div>


							<div class="row">
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<input id="NumEmpUsuario" name="NumEmpUsuario" type="text" class="form-control form-control-sm"  autocomplete="off" required >
									<label for="NumEmpUsuario">Numero Empleado</label>
								</div>
							</div>

							<div class="row">
									<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
										<div class="input-group">
											<select class="form-select form-select-sm" id="selectPerfilUsuario" name="selectPerfilUsuario" required>
											</select>

											<div class="input-group-append">
												<button id="modulesUserPerfil" class="btn btn-primary btn-Edit-Perfil" type="button" data-bs-toggle="collapse" data-target="#modulesUserColapse" data-bs-target="#modulesUserColapse" aria-expanded="false" aria-controls="modulesUserColapse">Editar</button>
											</div>
<!-- 											<label for="selectPerfilUsuario" class="form-label">Seleccione un perfil.</label>
 -->										</div>
									</div>
							</div>

							<div class="row">
									<div class="col-md-12 col-lg-12 col-xl-12 form-floating">
										<div class="collapse" id="modulesUserColapse">
											<div class="card card-body" style="padding: .4rem !important;">
											<div class="row">
												<div class="col-12 text-center colorSecundario" style="font-weight: 900 !important;">
													Modulos:
												</div>
											</div>
											<div class="row">
												<div class="col-12 col-md-12 ">
													<div class="col-12 text-center colorSecundario" style="font-weight: 600 !important;">
														Disponibles
													</div>
													<div class="card listContainer" style="">
														<div class="card-body card-body-add">
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
														<div class="card-body card-body-add">
														<div class="list-group" id="listAsignado">                     
														</div>
														</div>
													</div>
												</div>
											</div>
											</div>
										</div>
									</div>

							</div>




                            <div class="row">
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<select id="selectRowUserReporta"  name="selectRowUserReporta"  class="form-select form-select-sm" >
									</select>
									<label for="selectRowUserReporta" class="form-label">Usuario reporta</label>
								</div>
							</div>

							<div class="row">
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<select id="selectRowPuestos"  name="selectRowPuestos"  class="form-select form-select-sm" required>
									</select>
									<label for="selectRowPuestos" class="form-label">Puesto</label>
								</div>
							</div>





							<div class="row">
								<div class="col-6">
									<button type="button"  class="btn btn-primary btn-sm btn-block" style="font-size: 1rem !important;" id="GuardarUsuario">Guardar</button>
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
					<h1>Usuarios</h1>

					<div class="row">
						<div class="col-12 col-md-12">		
								<table id="usuariosTable" class="display compact nowrap" style="width:100%">         
										<thead>
											<tr>
													<th style="width: 30px"></th>
													<th style="width: 30px">Id</th>
													<th style="width: auto">Nombre Emp</th>
                                       				<th style="width: auto">Numero Emp</th>
													<th style="width: auto">Perfil </th>
                                      				<th style="width: auto">User name</th>
                                       				<th style="width: auto">Ultimo Acceso</th>
                                     				<th style="width: auto">Ultimo Registro</th>
											</tr>
										</thead>
										<tbody id="tablaUsuariosRow">
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
<div class="modal fade" id="BorrarUsuariosModal" tabindex="-1" aria-labelledby="BorrarPerfilLabel" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered modal-sm">
					 <div class="modal-content">
					 <div class="modal-header ">
					 </div>
					 <div class="modal-body" style="padding: 0px !important;">


					 <div class="row">
						  <input hidden type="text" class="form-control" id="IdUsuarioBorrar" aria-describedby="basic-addon3">
						  <div class="col-12 text-center">
								<span class="modal-title text-center" style="font-size: 1.2rem;" id="BorrarPerfilLabel">¿Seguro que desea borrarlo?</span>
						  </div>
					 </div>

					 </div>
						  <div class="modal-footer">
								<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
								<button type="button" class="btn btn-danger" id="BorrarUsuario">Borrar</button>
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
<script src="<?=  PATH_VIEWS . 'Usuarios/Usuarios.js' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>