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
					<button id="nuevaSubCategoria" type="button" class="btn btn-primary " data-bs-toggle="modal" data-bs-target="#SubCategoriaModal">
                    <i class="fas fa-boxes marginR"></i> Nueva SubCategorias
					</button>
					</div>
				</div>

				<div class="row">
					<div class="col-12 col-md-12">		
                      <table id="SubCategoriasTable" class="table table-striped table-bordered dt-responsive nowrap table-hover" style="width:100%">         
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nombre</th>
                                    <th>Code</th>
                                    <th>Categoria</th>
                                    <th>Comandos</th>
                                </tr>
                            </thead>
                            <tbody id="tablaSubCategoriasRow">
                            </tbody>
                        </table>
                    </div>
				</div>
			</div>

<!-- Modal Agregar Almacen -->
<div class="modal fade" id="SubCategoriaModal" tabindex="-1" aria-labelledby="SubCategoriaModalLabel" aria-hidden="true">
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
                  <span class="" id="SubCategoriaModalLabel" style="font-weight: 600; font-size: 1.2rem;"> <i class="fas fa-boxes marginR"></i> Nueva SubCategoria:</span>
               </div>
            </div>
            <form id="formSubCategorias" class="row g-3 needs-validation" novalidate>
               <div class="row" style="width:  100% !important;">
                  <input hidden type="text" class="form-control" id="IdSubCategoria" aria-describedby="basic-addon3" autocomplete="off">

                  <div class="col-12 col-espace">
                     <input name="nem" type="text" class="form-control" id="NomSubCategoria"  placeholder="Nombre Subcategoria..." autocomplete="off" required>
                     <div class="invalid-feedback">
                        Escriba un Nombre.
                     </div>
                  </div>

                  <div class="col-md-12 col-espace">
                     <div class="input-group">
                        <select class="custom-select" id="selectRowCategorias" required>
                        </select>
                        <div class="invalid-feedback">
                           Seleccione una Categoria.
                        </div>
                     </div>
                  </div>



                  <div class="col-6 col-espace">
                     <input name="nem" type="text" class="form-control" id="CodSubCategoria"  placeholder="Codigo Subcategoria..." autocomplete="off" required>
                     <div class="invalid-feedback">
                        Escriba un Codigo.
                     </div>
                  </div>

               </div>
            </form>
            <div>
               <div class="modal-footer">
                  <div class="col-12" style="padding: 0px 70px 0px 70px !important;">
                     <button type="button"  class="btn btn-primary btn-lg btn-block" style="font-size: 1rem !important;" id="GuardarCategoria">Guardar Categorias</button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>

<!-- Modal Borrar -->
<div class="modal fade" id="BorrarSubCategoriaModal" tabindex="-1" aria-labelledby="BorrarPerfilLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-sm">
                <div class="modal-content">
                <div class="modal-header ">
                </div>
                <div class="modal-body" style="padding: 0px !important;">


                <div class="row">
                    <input hidden type="text" class="form-control" id="IdSubCategoriaBorrar" aria-describedby="basic-addon3">
                    <div class="col-12 text-center">
                        <span class="modal-title text-center" style="font-size: 1.2rem;" id="BorrarPerfilLabel">¿Seguro que desea borrarlo?</span>
                    </div>
                </div>

                </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-danger" id="BorrarSubCategoria">Borrar</button>
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

<script src="<?=  PATH_VIEWS . 'Subcategorias/SubCategorias.js' ?>"></script>

</body>
</html>