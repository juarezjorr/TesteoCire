<?php 
  	defined('BASEPATH') or exit('No se permite acceso directo'); 	  
?>

<!DOCTYPE html>
<html lang="es">
	<head>
		<!-- Required meta tags -->
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="stylesheet" href="<?= FOLDER_PATH . '/app/assets/lib/DataTable_J/Css/bootstrap.css' ?>">
        <link rel="stylesheet" href="<?= FOLDER_PATH . '/app/assets/lib/DataTable_J/Css/dataTables.bootstrap4.min.css' ?>">
        <link rel="stylesheet" href="<?= FOLDER_PATH . '/app/assets/lib/DataTable_J/Css/responsive.bootstrap4.min.css' ?>">
        <link rel="stylesheet" href="<?= FOLDER_PATH . '/app/assets/lib/DataTable_J/Css/buttons.dataTables.min.css' ?>">

        <!-- Font Awesome -->
        <link rel="stylesheet" href="<?= FOLDER_PATH . '/app/assets/css/all.css' ?>" />


		<title>CTT Exp & Rentals</title>
        <link rel="stylesheet" href="<?= FOLDER_PATH . '/app/assets/css/estilos.css' ?>">
 	</head>
<body class="">
			<div class="container">
				<div class="row" style="margin-bottom: 10px !important;">
					<div class="col-md-6"></div>
					<div class="col-12 col-md-6 text-right">
					<button id="nuevoUsuario" type="button" class="btn btn-primary " data-bs-toggle="modal" data-bs-target="#UsuariosModal">
                    <i class="fas fa-user margin-der"> </i>   Nuevo Usuario
					</button>
					</div>
				</div>

				<div class="row">
					<div class="col-12 col-md-12">		
                      <table id="usuariosTable" class="table table-striped table-bordered dt-responsive nowrap" style="width:100%">         
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nombre</th>
                                    <th>Password</th>
                                    <th>Perfil Id</th>
                                    <th>Id Empleado</th>
                                    <th>Comandos</th>
                                </tr>
                            </thead>
                            <tbody id="tablaUsuariosRow">
                            </tbody>
                        </table>
                    </div>
				</div>
			</div>

<!-- Modal Agregar Usuario -->
<div class="modal fade" id="UsuariosModal" tabindex="-1" aria-labelledby="UsuariosModalLabel" aria-hidden="true">
   <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
         <div class="modal-header" style="padding: 10px !important;">
            <button type="button" class="close" style="padding: .6rem 1rem !important;" data-bs-dismiss="modal" aria-label="Close">
            <span  aria-hidden="true">&times;</span>
            </button>  
         </div>
         <div class="modal-body">
            <div class="row">
               <div class="col-12 text-center">
                  <span class="" id="PerfilModalLabel" style="font-weight: 600; font-size: 1.2rem;">Nuevo Usuario:</span>
               </div>
            </div>
            <form id="formUsuario" class="row g-3 needs-validation" novalidate>
               <div class="row">
                  <input hidden type="text" class="form-control" id="IdUsuario" aria-describedby="basic-addon3">
                  <input hidden type="text" class="form-control" id="EmpIdUsuario" aria-describedby="basic-addon3">
                  <div class="col-12 col-espace">
                     <input type="text" class="form-control" id="NomUsuario"  placeholder="Nombre Usuario..." autocomplete="off" required>
                     <div class="invalid-feedback">
                        Escriba un Nombre.
                     </div>
                  </div>
                  <div class="col-6 col-espace">
                     <input type="text" class="form-control" id="UserNameUsuario" placeholder="UserName..." autocomplete="off" required>
                     <div class="invalid-feedback">
                        Escriba un Username.
                     </div>
                  </div>
                  <div class="col-6 col-espace">
                     <input type="text" class="form-control" id="PassUsuario" placeholder="Password..." autocomplete="off" required>
                     <div class="invalid-feedback">
                        Escriba un Password.
                     </div>
                  </div>
                  <div class="col-md-12 col-espace">
                     <div class="input-group">
                        <select class="custom-select" id="selectPerfilUsuario" required>
                        </select>
                        <div class="input-group-append">
                           <button id="modulesUserPerfil" class="btn btn-primary btn-Edit-Perfil" type="button" data-bs-toggle="collapse" data-bs-target="#modulesUserColapse" aria-expanded="false" aria-controls="modulesUserColapse">Editar</button>
                        </div>
                        <div class="invalid-feedback">
                           Seleccione un perfil.
                        </div>
                     </div>
                  </div>
                  <div class="col-md-12 ">
                     <div class="collapse" id="modulesUserColapse">
                        <div class="card card-body" style="padding: .4rem !important;">
                           <div class="row">
                              <div class="col-12 text-center colorSecundario" style="font-weight: 900 !important;"">
                                 Modulos:
                              </div>
                           </div>
                           <div class="row">
                              <div class="col-12 col-md-6 ">
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
                              <div class="col-12 col-md-6 ">
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
                  <div class="col-6 col-espace">
                     <input type="text" class="form-control" id="AreaEmpUsuario" placeholder="Area Empresa..." autocomplete="off" required>
                     <div class="invalid-feedback">
                        Escriba un Area Empresa.
                     </div>
                  </div>
                  <div class="col-6 col-espace">
                     <input type="text" class="form-control" id="NumEmpUsuario" placeholder="Numero Empleado..." autocomplete="off" required>
                     <div class="invalid-feedback">
                        Escriba un Numero de Empleado.
                     </div>
                  </div>
               </div>
            </form>
            <div>
               <div class="modal-footer">
                  <div class="col-12" style="padding: 0px 70px 0px 70px !important;">
                     <button type="button"  class="btn btn-primary btn-lg btn-block" style="font-size: 1rem !important;" id="GuardarUsuario">Guardar Usuario</button>
                  </div>
               </div>
            </div>
         </div>
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
                    <input hidden type="text" class="form-control" id="IdPerfilBorrrar" aria-describedby="basic-addon3">
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

 <script src="<?=  PATH_ASSETS . 'lib/Datatable_J/Js/dataTables.buttons.min.js' ?>"></script>
 <script src="<?=  PATH_ASSETS . 'lib/Datatable_J/Js/jszip.min.js' ?>"></script>
 <script src="<?=  PATH_ASSETS . 'lib/Datatable_J/Js/pdfmake.min.js' ?>"></script>
 <script src="<?=  PATH_ASSETS . 'lib/Datatable_J/Js/vfs_fonts.js' ?>"></script>
 <script src="<?=  PATH_ASSETS . 'lib/Datatable_J/Js/buttons.html5.min.js' ?>"></script>
 <script src="<?=  PATH_ASSETS . 'lib/Datatable_J/Js/buttons.print.min.js' ?>"></script>

<script src="<?=  PATH_VIEWS . 'Usuarios/Usuarios.js' ?>"></script>

</body>
</html>