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
					<button id="nuevoProducto" type="button" class="btn btn-primary " data-bs-toggle="modal" data-bs-target="#ProductoModal">
               <i class="fas fa-box marginR"></i> Nuevo Producto
					</button>
					</div>
				</div>

				<div class="row">
					<div class="col-12 col-md-12">		
                      <table id="ProductosTable" class="table table-striped table-bordered dt-responsive nowrap table-hover" style="width:100%">         
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nombre</th>
                                    <th>Nombre English</th>
                                    <th>Sku</th>
                                    <th>Modelo</th>
                                    <th>Serial</th>
                                    <th>Cost</th>
                                    <th>Price</th>
                                    <th>Comentarios</th>
                                    <th>Tipo Servicio</th>

                                    <th>Categoria</th>
                                    <th>SubCategoria</th>
                                    <th>Almacen</th>
                                    <th>Comandos</th>
                                </tr>
                            </thead>
                            <tbody id="tablaProductosRow">
                            </tbody>
                        </table>
                    </div>
				</div>
			</div>

<!-- Modal Agregar Almacen -->
<div class="modal fade" id="ProductoModal" tabindex="-1" aria-labelledby="ProductoModalLabel" aria-hidden="true">
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
                  <span class="" id="ProductoModalLabel" style="font-weight: 600; font-size: 1.2rem;"> <i class="fas fa-box marginR"></i></i> Nuevo Producto:</span>
               </div>
            </div>
            <form id="formSubCategorias" class="row g-3 needs-validation" novalidate>
               <div class="row" style="width:  100% !important;">
                  <input hidden type="text" class="form-control" id="IdProducto" aria-describedby="basic-addon3" autocomplete="off">
                  <input hidden type="text" class="form-control" id="idStoreProducto" aria-describedby="basic-addon3" autocomplete="off">

                  
                  <div class="col-12 col-espace">
                     <input name="nem" type="text" class="form-control" id="NomProducto"  placeholder="Nombre Producto..." autocomplete="off" required>
                     <div class="invalid-feedback">
                        Escriba un Nombre.
                     </div>
                  </div>

                  <div class="col-12 col-espace">
                     <input name="nem" type="text" class="form-control" id="NomEngProducto"  placeholder="Nombre Ingles Producto..." autocomplete="off" required>
                     <div class="invalid-feedback">
                        Escriba un Nombre Ingles.
                     </div>
                  </div>
                  
                  <div class="col-6 col-espace">
                     <input name="nem" type="text" class="form-control" id="ModelProducto"  placeholder="Modelo Producto..." autocomplete="off" required>
                     <div class="invalid-feedback">
                        Escriba un modelo.
                     </div>
                  </div>

                  <div class="col-6 col-espace">
                     <input name="nem" type="text" class="form-control" id="SerieProducto"  placeholder="Serie Producto..." autocomplete="off" required>
                     <div class="invalid-feedback">
                        Escriba un numero de serie.
                     </div>
                  </div>

                  
                  <div class="col-6 col-espace">
                     <input name="nem" type="text" class="form-control" id="CostProducto"  placeholder="Costo Producto..." autocomplete="off" required>
                     <div class="invalid-feedback">
                        Escriba un Costo.
                     </div>
                  </div>
                  
                  <div class="col-6 col-espace">
                     <input name="nem" type="text" class="form-control" id="PriceProducto"  placeholder="Precio Producto..." autocomplete="off" required>
                     <div class="invalid-feedback">
                        Escriba un Precio.
                     </div>
                  </div>

                  <div class="col-12 col-espace">
                     <input name="nem" type="text" class="form-control" id="SkuProducto"  placeholder="SKU Producto..." autocomplete="off" required>
                     <div class="invalid-feedback">
                        Escriba un SKU.
                     </div>
                  </div>

                  <div class="col-md-6 col-espace">
                     <div class="input-group">
                        <select class="custom-select" id="selectMonedaProducto" required>
                           <option id='0'  value='0'>Seleccione tipo moneda...</option> 
                           <option id='1'  value=''>MXN</option> 
                           <option id='2'  value=''>USD</option> 

                        </select>
                        <div class="invalid-feedback">
                           Seleccione un tipo moneda.
                        </div>
                     </div>
                  </div>

                  <div class="col-md-6 col-espace">
                  <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="1" id="checkProducto" checked>
                  <label class="form-check-label" for="flexCheckDefault">
                     Visible
                  </label>
                  </div>
                  </div>





                  <div class="col-md-6 col-espace">
                     <div class="input-group">
                        <select class="custom-select" id="selectRowCategorias" required>
                        </select>
                        <div class="invalid-feedback">
                           Seleccione una Categoria.
                        </div>
                     </div>
                  </div>

                  <div class="col-md-6 col-espace">
                     <div class="input-group">
                        <select class="custom-select" id="selectRowSubCategorias" required>
                        </select>
                        <div class="invalid-feedback">
                           Seleccione una SubCategoria.
                        </div>
                     </div>
                  </div>

                  <div class="col-md-6 col-espace">
                     <div class="input-group">
                        <select class="custom-select" id="selectRowService" required>
                        </select>
                        <div class="invalid-feedback">
                           Seleccione un tipo servicio.
                        </div>
                     </div>
                  </div>
                  
                  <div class="col-md-6 col-espace">
                     <div class="input-group">
                        <select class="custom-select" id="selectRowProovedores" required>
                        </select>
                        <div class="invalid-feedback">
                           Seleccione un Proveedor.
                        </div>
                     </div>
                  </div>

                  <div class="col-md-6 col-espace">
                     <div class="input-group">
                        <select class="custom-select" id="selectRowAlmacen" required>
                        </select>
                        <div class="invalid-feedback">
                           Seleccione un Almacen.
                        </div>
                     </div>
                  </div>


                  <div class="col-12 col-espace">
                     <textarea class="form-control" id="DesProducto" aria-label="With textarea" placeholder="Descripcion..."  autocomplete="off" required></textarea>
                     <div class="invalid-feedback">
                        Escriba una Descripcion.
                     </div>
                  </div>

               </div>
            </form>
            <div>
               <div class="modal-footer">
                  <div class="col-12" style="padding: 0px 70px 0px 70px !important;">
                     <button type="button"  class="btn btn-primary btn-lg btn-block" style="font-size: 1rem !important;" id="GuardarCategoria">Guardar Producto</button>
                  </div>
               </div>
            </div>
         </div>
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

<script src="<?=  PATH_VIEWS . 'Productos/Productos.js' ?>"></script>

</body>
</html>