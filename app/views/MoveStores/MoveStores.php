<?php 
	defined('BASEPATH') or exit('No se permite acceso directo'); 
	require ROOT . FOLDER_PATH . "/app/assets/header.php";
?>

<header>
	<?php require ROOT . FOLDER_PATH . "/app/assets/menu.php"; ?>
</header>
<div class="container-fluid">
		<div class="contenido">
		<div class="col-md-10 mb-3">
			<div class="form-group">

				<h1>Movimiento entre almacenes</h1>

				<div class="row">
					<div class="col-md-6 col-lg-5 col-xl-4 mb-3">
						<label for="txtTypeExchange" class="form-label">Tipo de movimiento</label>
						<select id="txtTypeExchange" class="form-select"><option selected>Selecciona tipo de movimiento</option></select>
					</div>
				</div>
				<div class="row">
					<div class="col-md-6 col-lg-5 col-xl-4 mb-3">
						<label for="txtStoreSource" class="form-label">Almacen Origen</label>
						<select id="txtStoreSource" class="form-select"><option selected>Selecciona almacen</option></select>
					</div>
					<div class="col-md-6 col-lg-5 col-xl-4 mb-3">
						<label for="txtStoreTarget" class="form-label">Almacen Destino</label>
						<select id="txtStoreTarget" class="form-select"><option selected>Selecciona almacen</option></select>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12 col-lg-10 col-xl-8 mb-3">
						<label for="txtProducts" class="form-label">Productos</label>
						<select id="txtProducts" class="form-select"><option selected>Selecciona producto</option></select>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12 col-lg-10 col-xl-8 mb-3">
						<label for="txtComments" class="form-label">Comentarios</label>
						<textarea class="form-control" id="txtComments" rows="3"></textarea>
					</div>
				</div>
				<div class="row">
					<div class="col-md-8 mb-5">
						<button type="button" class="btn btn-primary" id="btn_exchange">Aplicar</button>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="mb-3 p-4">
				<table class="table table-sm table-responsive-md" id="tblExchanges">
					<thead>
						<tr>
							<th>SKU</th>
							<th>Producto</th>
							<th>Cantidad</th>
							<th>Tipo</th>
							<th>Almacen</th>
							<th>No. Serie</th>
							<th>Fecha</th>
							<th>Nota</th>
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
<script src="<?=  PATH_VIEWS . 'MoveStores/MoveStores.js' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>