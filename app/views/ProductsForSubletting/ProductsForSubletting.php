<?php 
	defined('BASEPATH') or exit('No se permite acceso directo'); 
	require ROOT . FOLDER_PATH . "/app/assets/header.php";
?>

<header>
	<?php require ROOT . FOLDER_PATH . "/app/assets/menu.php"; ?>
</header>
<div class="container-fluid">
		<div class="contenido ">
			<div class="row mvst_group">
				<div class="mb-3 mvst_panel">
					<div class="form-group">

						

						<div class="row list-finder">
							<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<input id="txtProducts" type="text" class="form-control form-control-sm required" data-mesage="Debes seleccionar un producto" >
									<label for="txtProducts">Productos</label>
									<input type="hidden" id="txtIdProducts" name="txtIdProducts">
							</div>
							<div class="list-group list-hide">
								<div class="list-items" id="listProducts"></div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-6 col-lg-6 col-xl-6 mb-2 form-floating">
								<input id="txtStartDate" type="text" class="form-control form-control-sm" placeholder="Fecha inicial">
								<label for="txtStartDate" >Fecha Incial</label>
							</div>
							<div class="col-md-6 col-lg-6 col-xl-6 mb-2 form-floating">
								<input id="txtEndDate" type="text" class="form-control form-control-sm required" placeholder="Fecha final"  data-mesage="La fecha final debe ser mayor a la fecha de inicio">
								<label for="txtEndDate">Fecha Final</label>
							</div>
						</div>

					<div class="row">
						<div class="col-md-6 col-lg-6 col-xl-6 mb-2 form-floating">
						<input id="txtPrice" type="text" class="form-control form-control-sm text-center number required" data-mesage="Debes Agregar el precio" >
							<label for="txtPrice">Precio</label>
						</div>
						<div class="col-md-6 col-lg-6 col-xl-6 mb-2 form-floating">
							<input id="txtQuantity" type="text" class="form-control form-control-sm text-center number required"  data-mesage="Debes agregar la cantidad de productos" >
							<label for="txtQuantity">Cantidad</label>
						</div>
					</div>

					<div class="row">
						<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
							<select id="txtCoinType" class="form-select form-select-sm  required" aria-label="Floating label select" data-mesage="Debes seleccionar el tipo de moneda">
								<option value="0" selected>Selecciona el tipo de moneda</option>
								<option value="MXN" >MXN - Peso mexicano</option>
								<option value="USD" >USD - Dólar norteamericano</option>
								<option value="EUR" >EUR - Euro europeo</option>
								<option value="JPY" >JPY - Yen japonés</option>
							</select>
							<label for="txtCoinType">Tipo de moneda</label>
						</div>
					</div>

						<div class="row">
							<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
								<select id="txtSupplier" class="form-select form-select-sm required" aria-label="Floating label select"  data-mesage="Debes seleccionar un proveedor">
									<option value="0" selected>Selecciona el proveedor</option>
								</select>
								<label for="txtSupplier">Proveedor</label>
							</div>
						</div>

						<div class="row">
							<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
								<textarea class="form-control form-control-sm" id="txtComments" style="height: 120px" rows="3"></textarea>
								<label for="txtComments">Comentarios</label>
							</div>
						</div>

						<div class="row">
							<div class="col-md-8 mb-5">
								<button type="button" class="btn btn-sm btn-primary disabled" id="btn_subletting">Agregar</button>
							</div>
						</div>

					</div>
				</div>

				<div class="mb-3 mvst_table">
					<h1>Productos para subarrendo</h1>
					<table class="display compact nowrap"  id="tblProductForSubletting">
						<thead>
							<tr>
								<th style="width:  80px">soppr</th>
								<th style="width:  30px"></th>
								<th style="width:  80px">SKU</th>
								<th style="width: 350px">Producto</th>
								<th style="width:  60px">Cantidad</th>
								<th style="width: 200px">Proveedor</th>
								<th style="width:  90px">Fecha Inicio</th>
								<th style="width:  90px">Fecha Fin</th>
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
<script src="<?=  PATH_VIEWS . 'ProductsForSubletting/ProductsForSubletting.js' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>