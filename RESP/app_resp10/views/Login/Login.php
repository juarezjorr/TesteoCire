<?php 
  	defined('BASEPATH') or exit('No se permite acceso directo'); 
	//   require ROOT . FOLDER_PATH . "/app/assets/header.php";
	  
?>

<!DOCTYPE html>
<html lang="es">
	<head>
		<!-- Required meta tags -->
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />

		<!-- Bootstrap CSS -->
		<link
			href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css"
			rel="stylesheet"
			integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl"
			crossorigin="anonymous"
		/>

		<link rel="preconnect" href="https://fonts.gstatic.com" />
		<link
			href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Titillium+Web:wght@400;600&display=swap"
			rel="stylesheet"
		/>

		<title>CTT Exp & Rentals</title>

		<link rel="stylesheet" href="<?= FOLDER_PATH . '/app/assets/css/estilos.css' ?>">

	</head>
	<body class="bg-dark">
		<section class="login-section">
			<div class="row g-0">
				<div class="col-lg-8 d-none d-lg-block">
					<div id="carousel_login" class="carousel slide" data-bs-ride="carousel">
						<div class="carousel-inner">
							<div class="carousel-item img-2 min-vh-100 active"></div>
							<div class="carousel-item img-3 min-vh-100"></div>
							<div class="carousel-item img-1 min-vh-100"></div>
						</div>
					</div>
				</div>
				<div class="col-lg-4 d-flex flex-column align-items-end min-vh-100 set-login">
					<div class="px-lg-5 pt-lg-4 pb-lg-3 p-4 w-100 mb-auto">
						<img src="<?=  PATH_ASSETS . 'img/logo.png' ?>" alt="logo CTT Exr & Rentals" class="img-fluid logo" />
					</div>
					<div class="px-lg-5 py-lg-4 p-4 w-100 align-self-center">
						<h1 class="mb-4"><small>Bienvenido a</small><br />CTT Exp & Rentals</h1>
						<form method="POST" action="<?= FOLDER_PATH . '/Login/signin' ?>">
							<div class="mb-3">
								<label for="txtEmployee" class="form-label">Número de empleado</label>
								<input
									type="text"
									class="form-control bg-dark-x border-0"
									placeholder="Ingresa tu numero de empleado"
									id="txtEmployee"
									name="txtEmployee"
									autocomplete="off"
									aria-describedby="employeeHelp"
								/>
								<div id="employeeHelp" class="form-text">
									No compartas tu número de empleado ni tu contraseña.
								</div>
							</div>
							<div class="mb-3">
								<label for="txtPassword" class="form-label">Contraseña</label>
								<input
									type="password"
									class="form-control bg-dark-x border-0 mb-2"
									placeholder="Ingresa tu contraseña"
									id="txtPassword"
									name="txtPassword"
								/>

								<p id="errorHelp" class="form-text text-muted text-decoration-none">
									<?php !empty($error_message) ? print($error_message) : '' ?>
								</p>

								<a href="#" id="employeeHelp" class="form-text text-muted text-decoration-none">
									¿Has olvidado tu contraseña?
								</a>
							</div>
							<button type="submit" class="btn btn-primary w-100">iniciar sesión</button>
						</form>
					</div>
					<div class="px-lg-5 pt-lg-3 pb-lg-4 p-4-w-100 mt-auto"></div>
				</div>
			</div>
		</section>
<body>
<!-- 	
	<div class="container central login">
		<form method="POST" action="<?= FOLDER_PATH . '/Login/signin' ?>">
			<div class="login_box border">
				<div class="form_group">
					<div class="group_simple">
						<input type="text" name="txtUserName" id="txtUserName" class="textbox"
							placeholder="usuario" />
					</div>
				</div>

				<div class="form_group">
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
	</div> -->

	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js" integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0" crossorigin="anonymous"></script>
	<script src="<?=  PATH_ASSETS . 'lib/jquery.js' ?>"></script>
	<script src="<?=  PATH_ASSETS . 'lib/jquery-ui.js' ?>"></script>
</body>

</html>