<?php 
  	defined('BASEPATH') or exit('No se permite acceso directo'); 
	  require ROOT . FOLDER_PATH . "/app/assets/header.php";
	  require ROOT . FOLDER_PATH . "/app/assets/menu.php";
?>

<div class="container">
	<div class="frame_main central">
		<h1>Cambia de contraseña</h1>
		<div class="frame_inside border">
			<div class="frame_inputs">

				<!-- CONTRASEÑA -->
				<div class="form_group seg_password clean">
					<label for="txtPassword">Nueva contraseña</label><br />
					<div class="group_simple">
						<input type="password" name="txtPassword" id="txtPassword" class="textbox requerido" data_req="0"
							data_fail="Se debe ingresar la nueva contraseña" />
					</div>
					<p id="mensaje" class="nota"></p>

				</div>

				<!-- REESCRIBE CONTRASEÑA -->
				<div class="form_group seg_newpassword clean">
					<label for="txtNewPassword">Reescribe contraseña</label><br />
					<div class="group_simple">
						<input type="password" name="txtNewPassword" id="txtNewPassword" class="textbox requerido"
							data_req="0" data_fail="Se debes reescribir la contraseña" />
					</div>
					<p id="mensaje2" class="nota"></p>
				</div>



			</div>


			<div class="frame_list">
			<p><b>La contraseña debe contener</b></p>
				<ul>
					<li id="upper">Mayusculas <i class="fas fa-check-circle"></i></li>
					<li id="number">Números <i class="fas fa-check-circle"></i></li>
					<li id="lower">Minusculas <i class="fas fa-check-circle"></i></li>
					<li id="len">Minimo 8 caracteres <i class="fas fa-check-circle"></i></li>
				</ul>
			</div>

			<!-- BOTONES -->
			<div class="form_group seg_botones ">
				<div class="group_botons">
					<button class="btn default" id="guarda"><i class="fas fa-key"></i> Cambiar</button>
					<button class="btn cancela" id="cancela"><i class="fas fa-times"></i> Cancelar</button>
				</div>
			</div>
		</div>
	</div>
</div>


<script src="<?=  PATH_ASSETS . 'lib/functions.js' ?>"></script>
<script src="<?=  PATH_VIEWS . 'ChangePassword/ChangePassword.js' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>