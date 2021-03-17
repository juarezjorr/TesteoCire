<?php 
	defined('BASEPATH') or exit('No se permite acceso directo'); 
	require ROOT . FOLDER_PATH . "/app/assets/header.php";
?>

<header>
	<?php require ROOT . FOLDER_PATH . "/app/assets/menu.php"; ?>
</header>
<div class="container-fluid">
		<div class="contenido ">
		<div class="col-md-12 col-sm-12 mb-3">
			<div class="form-group">

				<h1>Productos para subarrendo</h1>

                <div class="row">
                    <div class="col-md-12 col-lg-10 col-xl-8 mb-2 form-floating">
                        <input id="txtProducts" type="text" class="form-control form-control-sm" >
                        <label for="txtProducts">Productos</label>
                    </div>
                </div>
				<div class="row">
                    <div class="col-md-6 col-lg-5 col-xl-4 mb-2 form-floating">
                        <input id="txtStartDate" type="text" class="form-control form-control-sm" placeholder="Fecha inicial">
                        <label for="txtStartDate" >Fecha Incial</label>
                    </div>
					<div class="col-md-6 col-lg-5 col-xl-4 mb-2 form-floating">
                        <input id="txtEndDate" type="text" class="form-control form-control-sm" placeholder="Fecha final">
                        <label for="txtEndDate">Fecha Final</label>
                    </div>
				</div>

                <div class="row">
                    <div class="col-md-2 col-lg-2 col-xl-1 mb-2  form-floating">
                        <input id="txtQuantity" type="text" class="form-control form-control-sm text-center" >
						<label for="txtQuantity">Cantidad</label>
					</div>
                    <div class="col-md-4 col-lg-3 col-xl-3 mb-2"></div>
					<div class="col-md-6 col-lg-5 col-xl-4 mb-2 form-floating">
                        <select id="txtSupplier" class="form-select form-select-sm" aria-label="Floating label select">
                            <option value="0" selected>Selecciona el proveedor</option>
                        </select>
						<label for="txtSupplier">Proveedor</label>
					</div>
					
				</div>

				<div class="row">
					<div class="col-md-12 col-lg-10 col-xl-8 mb-2 form-floating">
                        <textarea class="form-control form-control-sm" id="txtComments" style="height: 150px" rows="10"></textarea>
						<label for="txtComments">Comentarios</label>
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
        <div class="row">
            <div class="col-md-8 mb-5">
                <button type="button" class="btn btn-primary" id="btn_exchange">Aplicar Movimiento</button>
            </div>
        </div>

	</div>
</div>

<script src="<?=  PATH_ASSETS . 'lib/functions.js' ?>"></script>
<script src="<?=  PATH_VIEWS . 'ProductsForSubletting/ProductsForSubletting.js' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>