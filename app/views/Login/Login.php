<?php 
  	defined('BASEPATH') or exit('No se permite acceso directo'); 
	  require ROOT . FOLDER_PATH . "/app/assets/header.php";
	  
?>

</div>
</header>


	<div class="container central login">
		<form method="POST" action="<?= FOLDER_PATH . '/Login/signin' ?>">
			<div class="login_box border">
				<div class="form_group">
					<!-- <label for="txtUserName">Numero de empleado</label><br /> -->
					<div class="group_simple">
						<input type="text" name="txtUserName" id="txtUserName" class="textbox"
							placeholder="usuario" />
					</div>
				</div>

				<div class="form_group">
					<!-- <label for="txtPassword">Contraseña</label><br /> -->
					<div class="group_simple">
						<input type="password" name="txtPassword" id="txtPassword" class="textbox"
							placeholder="contraseña" />
					</div>
				</div>

				<div class="form_group">
					<?php !empty($error_message) ? print($error_message) : '' ?>
				</div>

				<div class="form_group">
					<button type="submit" class="btn default">Ingresar</button>
				</div>
			</div>
		</form>
	</div>
</body>

</html>