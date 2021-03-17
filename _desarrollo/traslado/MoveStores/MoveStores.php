<?php 
	defined('BASEPATH') or exit('No se permite acceso directo'); 
	require ROOT . FOLDER_PATH . "/app/assets/header.php";
?>

<header>
	<?php require ROOT . FOLDER_PATH . "/app/assets/menu.php"; ?>
</header>
<div class="container-fluid">
		<div class="contenido">
			<h1>Movimiento entre almacenes</h1>
		<div class="row mvst_group">
			<div class="mb-3 mvst_panel">
				<div class="form-group">


					<div class="row">
						<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
							<select id="txtTypeExchange" class="form-select form-select-sm required"><option value="0" data-content="||||" selected>Selecciona tipo de movimiento</option></select>
							<label for="txtTypeExchange">Tipo de movimiento</label>
						</div>
					</div>
					<div class="row">
						<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
							<select id="txtStoreSource" class="form-select form-select-sm required"><option value="0" selected>Selecciona almacen</option></select>
							<label for="txtStoreSource" class="form-label">Almacen Origen</label>
						</div>
					</div>
					<div class="row">
						<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
							<select id="txtProducts" class="form-select form-select-sm required"><option value="0" selected>Selecciona producto</option></select>
							<label for="txtProducts">Productos</label>
						</div>
					</div>
					<div class="row">
						<div class="col-md-7 col-lg-7 col-xl-7 mb-2 form-floating">
							Cantidad disponible <span id="txtQuantityStored" class="notify">&nbsp;</span>
						</div>
						<div class="col-md-5 col-lg-5 col-xl-5 mb-2 form-floating">
							<input id="txtQuantity" type="text" class="form-control form-control-sm text-center" >
							<label for="txtQuantity">Cantidad</label>
						</div>
					</div>
					<div class="row">
						<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
							<select id="txtStoreTarget" class="form-select form-select-sm"><option value="0" selected>Selecciona almacen</option></select>
							<label for="txtStoreTarget">Almacen Destino</label>
						</div>
					</div>

					<div class="row">
						<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
							<textarea class="form-control form-control-sm" id="txtComments" style="height: 120px" rows="3"></textarea>
							<label for="txtComments">Comentarios</label>
						</div>
					</div>
					<div class="row">
						<div class="col-md-12 mb-5">
							<button type="button" class="btn btn-sm btn-primary disabled" id="btn_exchange">Agregar</button>
						</div>
					</div>
				</div>
			</div>
		
			<div class="mb-3 mvst_table">
				<table class="display compact nowrap"  id="tblExchanges">
					<thead>
						<tr>
							<th style="width: 80px">soppr</th>
							<th style="width: 80px">SKU</th>
							<th style="width: 350px">Producto</th>
							<th style="width: 60px">Cantidad</th>
							<th style="width: 100px">No. Serie</th>
							<th style="width: 50px">Tipo Origen</th>
							<th style="width: 150px">Almacen Origen</th>
							<th style="width: 50px">Tipo Destino</th>
							<th style="width: 150px">Almacen Destino</th>
							<th style="width: 350px">Nota</th>
						</tr>
					</thead>
					<tbody>	
<!-- <tr>
	<td class="sku"></td>
	<td class="product-name">PHANTOM FLEX 2K/4K</td>
	<td class="quantity"><span>1</span></td>
	<td class="serie-product">1234</td>
	<td class="code-type">STA</td>
	<td class="store-name">CAMARA</td>
	<td class="code-type">ETA</td>
	<td class="store-name">MINIMAX D</td>
	<td class="comments"><div>Por otra parte, informamos a usted, que sus datos personales no serán compartidos con ninguna autoridad, empresa, organización o personas distintas a nosostros y serán utilizados exclusivamente para los fines señalados.</div>
</td>
</tr> -->
					</tbody>
	
				</table>
			</div>
		</div>

	</div>
</div>

<script src="<?=  PATH_ASSETS . 'lib/functions.js' ?>"></script>
<script src="<?=  PATH_VIEWS . 'MoveStores/MoveStores.js' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>