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
				<h4 id="titulo">productos para Impresión</h4>   

                     
					<div class="row">
						<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
							<select id="txtStoreSource" class="form-select form-select-sm required"><option value="0" selected>Selecciona almacen</option></select>
							<label for="txtStoreSource" class="form-label">Almacén</label>
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


			<div class="mb-3 mvst_table">
			<h1>Productos de Almacén</h1>
                <div class="row">

                    <div class="col-md-3 col-lg-3 col-xl-3 mb-2 form-floating">
                        <input id="txtPrice" type="text" class="form-control form-control-sm text-center number required" data-mesage="Debes Agregar el precio" >
                        <label for="txtPrice">No. Proyecto</label>
                    </div>

                    <div class="col-md-4 col-lg-4 col-xl-4 mb-2 form-floating">
                        <input id="txtQuantity" type="text" class="form-control form-control-sm text-center number required"  data-mesage="Debes agregar la cantidad de productos" >
                        <label for="txtQuantity">Nombre Proyecto</label>
                    </div>

                    <div class="col-md-2 col-lg-2 col-xl-2 mb-2 form-floating">
                        <input id="txtQuantity" type="date" class="form-control form-control-sm text-center number required"  data-mesage="Debes agregar la cantidad de productos" >
                        <label for="txtQuantity">Fecha Salida</label>
                    </div>

                    <div class="col-md-2 col-lg-2 col-xl-2 mb-2 form-floating">
                        <input id="txtQuantity" type="text" class="form-control form-control-sm text-center number required"  data-mesage="Debes agregar la cantidad de productos" >
                        <label for="txtQuantity">Versión Doc.</label>
                    </div>

                    <div class="col-md-3 col-lg-3 col-xl-3 mb-2 form-floating">
                        <input id="txtQuantity" type="text" class="form-control form-control-sm text-center number required"  data-mesage="Debes agregar la cantidad de productos" >
                        <label for="txtQuantity">Nombre Freelance</label>
                    </div>

                </div>


				<table class="display compact nowrap"  id="tblExchanges">
					<thead>
						<tr>
							<th style="width:  30px"></th>
							<th style="width:  80px">SKU</th>
							<th style="width: 250px">Nombre</th>
							<th style="width: 100px">No. Serie</th>
							<th style="width: 350px">Nota</th>
						</tr>
					</thead>
					<tbody>	

					</tbody>
	
				</table>
			</div>


		
			
		</div>

	</div>
</div>


<script src="<?=  PATH_ASSETS . 'lib/functions.js' ?>"></script>
<script src="<?=  PATH_VIEWS . 'StoreProductsList/StoreProductsList.js' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>