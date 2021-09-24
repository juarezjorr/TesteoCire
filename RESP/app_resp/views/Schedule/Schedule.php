<?php 
  	defined('BASEPATH') or exit('No se permite acceso directo'); 
	  require ROOT . FOLDER_PATH . "/app/assets/header.php";
	  require ROOT . FOLDER_PATH . "/app/assets/menu.php";
?>


<div class="container">
	<div class="frame_main central">
		<h1>Programacion de salidas de unidades</h1>
		<div class="frame_inside border">
			<div class="frame_inputs">
				<!-- NUMERO DE PLACAS -->
				<div class="form_group seg_placas">
					<label for="txtNumPlacas">Numero de placas</label><br />

					<div class="group_search-lf">
						<input type="text" name="txtNumPlacas" id="txtNumPlacas" class="textbox" />
						<i class="fas fa-search ibtn" data_section="placas"></i>
					</div>
				</div>

				<!-- OPERADOR DE LA UNIDAD
				<div class="form_group seg_operador noshow">
					<label for="txtOperador">Operador</label><br />
					<div class="group_search-lf">
						<input type="text" name="txtOperador" id="txtOperador" class="textbox" readonly />
						<i class="fas fa-caret-down ibtn" data_section="operador"></i>
					</div>
					<div class="listado" id="operador">
						<ul></ul>
					</div>
				</div> -->



				<!-- TARJETA -->
				<div class="form_group seg_tarjeta noshow">
					<label for="txtTarjeta">Tarjeta</label><br />
					<div class="group_search-lf">
						<input type="text" name="txtTarjeta" id="txtTarjeta" class="textbox" readonly />
						<i class="fas fa-caret-down ibtn" data_section="tarjeta"></i>
					</div>
					<div class="listado" id="tarjeta">
						<ul></ul>
					</div>
				</div>


				<!-- DESTINO -->
				<div class="form_group seg_destino noshow">
					<label for="txtDestino">Destino</label><br />
					<div class="group_search-lf">
						<input type="text" name="txtDestino" id="txtDestino" class="textbox requerido" data_req="0"
							data_fail="Se requiere seleccionar un destino" readonly />
						<i class="fas fa-caret-down ibtn" data_section="destino"></i>
					</div>
					<div class="listado" id="destino">
						<ul></ul>
					</div>
				</div>


				<!-- PROYECTO -->
				<div class="form_group seg_proyecto noshowafter clean">
					<label for="txtProyecto">Proyecto</label><br />
					<div class="group_simple">
						<input type="text" name="txtProyecto" id="txtProyecto" class="textbox requerido" data_req="1"
							data_fail="Se debe ingresar un identificador del proyecto" />
					</div>
				</div>


				<!-- DIRECCION DEL DESTINO -->
				<div class="form_group seg_direccion noshow  clean">
					<label for="txtDireccion">Dirección del destino</label><br />
					<div class="group_simple">
						<input type="text" name="txtDireccion" id="txtDireccion" class="textbox requerido" data_req="0"
							data_fail="Se debe ingresar una dirección" />
					</div>
				</div>

				<!-- ALCALDIAS -->
				<div class="form_group seg_alcaldia noshow  clean">
					<label for="txtAlcaldia">Alcaldia</label><br />
					<div class="group_search-lf">
						<input type="text" name="txtAlcaldia" id="txtAlcaldia" class="textbox" data_selection="0"
							readonly />
						<i class="fas fa-caret-down ibtn" data_section="alcaldia"></i>
					</div>
					<div class="listado" id="alcaldia">
						<ul></ul>
					</div>
				</div>



				<!-- AUTORIZADOR -->
				<div class="form_group seg_autorizacion noshow  clean">
					<label for="txtAutorizador">Autoriza</label><br />
					<div class="group_search-lf">
						<input type="text" name="txtAutorizador" id="txtAutorizador" class="textbox requerido"
							data_selection="0" data_req="0"
							data_fail="Se requiere seleccionar el nombre de la persona que autoriza" readonly />
						<i class="fas fa-caret-down ibtn" data_section="autorizador"></i>
					</div>
					<div class="listado" id="autorizador">
						<ul></ul>
					</div>
				</div>



				<!-- TAMAÑO DE CARGA -->
				<div class="form_group seg_carga noshow">
					<div class="carga">
						<h2>Carga</h2>
						<div class="group_check" id="C1">
							<span class="radio">
								<div class="icon_uncheck"></div>
							</span><br />
							<label>Completa</label>
						</div>
						<div class="group_check" id="C2">
							<span class="radio">
								<div class="icon_uncheck"></div>
							</span><br />
							<label>Media</label>
						</div>
						<div class="group_check" id="C3">
							<span class="radio">
								<div class="icon_uncheck"></div>
							</span><br />
							<label>Vacia</label>
						</div>
					</div>
					
				</div>

				<!-- PLANTA DE ENERGIA
				<div class="form_group seg_planta noshow">
					<div class="group_check">
						<span class="check" id="txtPlantaAsg">
							<div class="icon_check"></div>
						</span>
						<label>Planta de energía asignada</label>
					</div>
				</div> -->

				<!-- OBSERVACIONES -->
				<div class="form_group seg_observaciones noshow">
					<label for="txtObservaciones">Observaciones</label><br />
					<div class="group_simple">
						<textarea name="txtObservaciones" id="txtObservaciones" rows="7" class="textbox"></textarea>
					</div>
				</div>

				<!-- CAMPOS OCULTOS -->
				<div class="hiddenField">
				txtUnidad <input type="text" class="txthide" name="txtUnidad" id="txtUnidad" /><br>
				txtMedida <input type="text" class="txthide" name="txtMedida" id="txtMedida" /><br>
				txtOperador <input type="text" class="txthide" name="txtOperador" id="txtOperador" /><br>
				txtCarga <input type="text" class="txthide" name="txtCarga" id="txtCarga" class="textbox requerido" data_req="0" data_fail="Se debe indicar el nivel de carga de la unidad" /><br><br>
				txtPlaAsignada <input type="text" class="txthide" name="txtPlaAsignada" id="txtPlaAsignada" /><br>
				txtPlanta <input type="text" class="txthide" name="txtPlanta" id="txtPlanta" /><br>
				txtMedPlt <input type="text" class="txthide" name="txtMedPlt" id="txtMedPlt" /><br>
				txtCargaPlt <input type="text" class="txthide" name="txtCargaPlt" id="txtCargaPlt" /><br>
				txtTarjetaPlt <input type="text" class="txthide" name="txtTarjetaPlt" id="txtTarjetaPlt" /><br>
				
				</div>
				<!-- CAMPOS OCULTOS -->




				<!-- Fin de grupos -->
			</div>
			<div class="frame_list">
				<div class="nodata">
					<h2><br>UNIDAD NO REGISTRADA<br>CON ESTE NÚMERO DE PLACAS</h2>
				</div>
				<div class="nofound">
					<h2><br>ESTE TIPO DE UNIDAD REQUIERE DE<br>UN VEHÍCULO DE TRANSPORTE</h2>
				</div>
				<div class="unidad">
					<h2>Información de la unidad</h2>
					<table class="table_info tbl_unidad">
						<tr>
							<td class="concepto">Nombre de la unidad:</td>
							<td class="dato und_nombre"></td>
						</tr>
						<tr>
							<td class="concepto">Marca:</td>
							<td class="dato und_marca"></td>
						</tr>
						<tr>
							<td class="concepto">Modelo:</td>
							<td class="dato und_model"></td>
						</tr>
						<tr>
							<td class="concepto">Tipo:</td>
							<td class="dato und_tipo"></td>
						</tr>
						<tr>
							<td class="concepto">Serie:</td>
							<td class="dato und_serie"></td>
						</tr>
						<tr>
							<td class="concepto">Tatuaje:</td>
							<td class="dato und_tatuaje"></td>
						</tr>
						<tr>
							<td class="concepto">Clasificación:</td>
							<td class="dato und_clasificacion"></td>
						</tr>
						<tr>
							<td class="concepto">Tipo de combustible:</td>
							<td class="dato und_combustible"></td>
						</tr>
						<tr>
							<td class="concepto">Operador:</td>
							<td class="dato und_operador"></td>
						</tr>
						<tr>
							<td class="concepto">Rendimiento Km/ltr:</td>
							<td class="dato und_rendimiento"></td>
						</tr>
		
					</table>

					<div class="seg_ltsActual_und">

						<span class="titulo">Combustible</span>
						<div class="gas">
							<div class="box_litros">
								<div class="medidor"></div>
							</div>
							<i class="fas fa-gas-pump"></i>
						</div>
					</div>
				</div>
				<div class="separador"></div>
				<div class="planta">
					<h2>Información de la planta</h2>
					<table class="table_info tbl_planta">
						<tr>
							<td class="concepto">Nombre de la unidad:</td>
							<td class="dato und_nombre"></td>
						</tr>
						<tr>
							<td class="concepto">Tanques:</td>
							<td class="dato und_tanques"></td>
						</tr>
						<tr>
							<td class="concepto">Cap. litros totales:</td>
							<td class="dato und_litros"></td>
						</tr>
						<tr>
							<td class="concepto">Tipo de combustible:</td>
							<td class="dato und_combustible"></td>
						</tr>
						<tr>
							<td class="concepto">Rendimiento Hrs/ltr:</td>
							<td class="dato und_rendimiento"></td>
						</tr>
						<tr>
							<td class="concepto">Tarjeta:</td>
							<td class="dato trj_numero"></td>
						</tr>
						<tr>
							<td class="concepto">Operador:</td>
							<td class="dato emp_nombre"></td>
						</tr>
					</table>

					<div class="seg_ltsActual_pta">

						<span class="titulo">Combustible</span>
						<div class="gas">
							<div class="box_litros">
								<div class="medidor"></div>
							</div>
							<i class="fas fa-gas-pump"></i>
						</div>
					</div>
				</div>
			</div>


			<!-- BOTONES -->
			<div class="form_group seg_botones noshow">
				<div class="group_botons">
					<button class="btn default" id="guarda"><i class="fas fa-key"></i> Registrar</button>
					<button class="btn cancela" id="cancela"><i class="fas fa-times"></i> Cancelar</button>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="deep_loading"></div>

<script src="<?=  PATH_ASSETS . 'lib/functions.js' ?>"></script>
<script src="<?=  PATH_VIEWS . 'Schedule/Schedule.js' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>