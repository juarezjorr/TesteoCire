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


			<div class="mvst_panel">
				<div class="form-group">


					<div class="row" hidden>
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

										
					<div class="row" hidden>
						<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
							<select id="txtStoreTarget" class="form-select form-select-sm"><option value="0" selected>Selecciona almacen</option></select>
							<label for="txtStoreTarget">Almacen Destino</label>
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

					<div class="row">
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<select id="selectTipoMedida"  name="selectTipoMedida"  class="form-select form-select-sm" required>
<!-- 										<option id='' value="0" >Seleccione...</option>
 -->								    <option id='1'  value='' >0.4</option> 
										<option id='2'  value='' >0.6</option> 
										<option id='3'  value='' >0.8</option> 
										<option id='4'  value='' >1</option> 
										<option id='5'  value='' >2</option> 

									</select>
									<label for="selectTipoMedida" class="form-label">Tamaño Codigos de Barras</label>
								</div>
							</div>


					<!-- <div class="row">
						<div class="col-md-7 col-lg-7 col-xl-7 mb-2 form-floating">
							Cantidad disponible <span id="txtQuantityStored" class="notify">&nbsp;</span>
						</div>
						<div class="col-md-5 col-lg-5 col-xl-5 mb-2 form-floating">
							<input id="txtQuantity" type="text" class="form-control form-control-sm text-center number" >
							<label for="txtQuantity">Cantidad</label>
						</div>
					</div> -->
					




<!-- 					<div class="row">
						<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
							<textarea class="form-control form-control-sm" id="txtComments" style="height: 120px" rows="3"></textarea>
							<label for="txtComments">Comentarios</label>
						</div>
					</div> -->
					<!-- <div class="row">
						<div class="col-md-12 mb-5">
							<button type="button" class="btn btn-sm btn-primary disabled" id="btn_exchange">Agregar</button>
						</div>
					</div> -->
				</div>
			</div>


			<div class="mvst_table">
				<h1>Codigo de Barras</h1>
				<table class="display compact nowrap"  id="tblExchanges"  style="width:100%">
					<thead>
						<tr>
							<th style="width:  80px">soppr</th>
							<th style="width:  30px"></th>
							<th style="width:  80px">SKU</th>
							<th style="width: 350px">Producto</th>
<!-- 							<th style="width:  60px">Cantidad</th>
 --><!-- 							<th style="width: 100px">No. Serie</th>
							<th style="width:  50px">Tipo Origen</th>
							<th style="width: 150px">Almacen Origen</th>
							<th style="width:  50px">Tipo Destino</th>
							<th style="width: 150px">Almacen Destino</th>
							<th style="width: 350px">Nota</th> -->
						</tr>
					</thead>
					<tbody>	

					</tbody>
	
				</table>
			</div>


		
			
		</div>

	</div>
</div>



<div class="modal fade" tabindex="-1" id="modalCodigoBarra">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" style="height: 500px !important;" id="modalSku">
<!--           <svg id="barcode"></svg> 
 -->      </div>
<!--  <button onclick="pdf_code()">Click me</button>
 -->
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onclick="PrintCodeBar()">Imprimir</button>
      </div> 
    </div>
  </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.3/dist/JsBarcode.all.min.js"></script>


<script src="<?=  PATH_ASSETS . 'lib/functions.js' ?>"></script>
<script src="<?=  PATH_VIEWS . 'CodeBar/CodeBar.js' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>