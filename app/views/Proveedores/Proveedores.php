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
        <link rel="stylesheet" href="<?= FOLDER_PATH . '/app/assets/lib/DataTable_J/Css/select.bootstrap4.min.css' ?>">
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
					<button id="nuevoProveedor" type="button" class="btn btn-primary " data-bs-toggle="modal" data-bs-target="#ProveedorModal">
                    <i class="fas fa-user margin-der"> </i>   Nuevo Proveedor
					</button>
					</div>
				</div>

				<div class="row">
					<div class="col-12 col-md-12">		
                      <table id="ProveedoresTable" class="table table-striped table-bordered dt-responsive nowrap table-hover" style="width:100%">         
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nombre Proveedor</th>
                                    <th>Contacto</th>
                                    <th>RFC</th>
                                    <th>Email</th>
                                    <th>Telefono </th>
                                    <th>Comandos</th>
                                </tr>
                            </thead>
                            <tbody id="tablaProveedoresRow">
                            </tbody>
                        </table>
                    </div>
				</div>
			</div>

<!-- Modal Agregar Usuario -->
<div class="modal fade" id="ProveedorModal" tabindex="-1" aria-labelledby="ProveedorModalLabel" aria-hidden="true">
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
                  <span class="" id="PerfilModalLabel" style="font-weight: 600; font-size: 1.2rem;"><i class="fas fa-user margin-der"> </i>Nuevo Proveedor:</span>
               </div>
            </div>
            <form id="formProveedor" class="row g-3 needs-validation" novalidate>
               <div class="row">
                  <input hidden type="text" class="form-control" id="IdProveedor" aria-describedby="basic-addon3" autocomplete="off">
                  <div class="col-12 col-espace">
                     <input name="nem" type="text" class="form-control" id="NomProveedor"  placeholder="Nombre Proveedor..." autocomplete="off" required>
                     <div class="invalid-feedback">
                        Escriba un Nombre.
                     </div>
                  </div>
                  <div class="col-12 col-espace">
                     <input type="text" class="form-control" id="ContactoProveedor" placeholder="Contacto..." autocomplete="off" required>
                     <div class="invalid-feedback">
                        Escriba un Contacto.
                     </div>
                  </div>

                  <div class="col-12 col-espace">
                     <input type="text" class="form-control" id="EmailProveedor" placeholder="Email..." autocomplete="off" required>
                     <div class="invalid-feedback">
                        Escriba un Email.
                     </div>
                  </div>

                  <div class="col-6 col-espace">
                     <input type="text" class="form-control" id="RfcProveedor" placeholder="RFC..." autocomplete="off" required>
                     <div class="invalid-feedback">
                        Escriba un RFC.
                     </div>
                  </div>
                  <div class="col-6 col-espace">
                     <input name="none" type="text" class="form-control" id="PhoneProveedor" placeholder="Telefono..." autocomplete="nope" required>
                     <div class="invalid-feedback">
                        Escriba un Telefono.
                     </div>
                  </div>
               </div>
            </form>
            <div>
               <div class="modal-footer">
                  <div class="col-12" style="padding: 0px 70px 0px 70px !important;">
                     <button type="button"  class="btn btn-primary btn-lg btn-block" style="font-size: 1rem !important;" id="GuardarUsuario">Guardar Proveedor</button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>

<!-- Modal Borrar -->
<div class="modal fade" id="BorrarProveedorModal" tabindex="-1" aria-labelledby="BorrarPerfilLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-sm">
                <div class="modal-content">
                <div class="modal-header ">
                </div>
                <div class="modal-body" style="padding: 0px !important;">


                <div class="row">
                    <input hidden type="text" class="form-control" id="IdProveedorBorrar" aria-describedby="basic-addon3">
                    <div class="col-12 text-center">
                        <span class="modal-title text-center" style="font-size: 1.2rem;" id="BorrarPerfilLabel">¿Seguro que desea borrarlo?</span>
                    </div>
                </div>

                </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-danger" id="BorrarProveedor">Borrar</button>
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

<script src="<?=  PATH_VIEWS . 'Proveedores/Proveedores.js' ?>"></script>

</body>
</html>