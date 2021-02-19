<?php 
  	defined('BASEPATH') or exit('No se permite acceso directo'); 	  
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

<style>

    .listContainer{
        height: 300px !important;
        overflow-y: scroll;
    }

    .form-control {
    color: #212529 ;
    }

</style>

<body class="">
			<div class="container">
				<div class="row">
					<div class="col-md-8"></div>
					<div class="col-6 col-md-4">
					<button id="nuevoPerfil" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
					    Nuevo Perfil
					</button>
					</div>
				</div>

				<!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
				<div class="row">
					<div class="col-12 col-md-12">
						
					<table id="example" class="table table-striped table-bordered" style="width:100%">
        <thead>
            <tr>
                <th>Id</th>
                <th>Code</th>
                <th>Nombre</th>
                <th>Descripcion</th>
                <th>Edit</th>
                <th>Delet</th>


            </tr>
        </thead>
        <tbody id="tablaPerfiles">

        </tbody>
       <!-- <tfoot>
            <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Office</th>
                <th>Age</th>

            </tr>
        </tfoot>-->
    </table>
				
				</div>

				</div>


			</div>







<!-- Modal -->
		<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="exampleModalLabel">Nuevo Perfil:</h5>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">


			<div class="row">
                <div class="col-9">
                <label for="basic-url" class="form-label">Nombre del Perfil</label>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" id="NomPerfil" aria-describedby="basic-addon3">
                        </div>
                </div>
                <div class="col-3">
                <label for="basic-url" class="form-label">Codigo Perfil</label>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" id="CodPerfil" aria-describedby="basic-addon3">
                        </div>
                </div>

                <div class="col-12">
                     <label for="basic-url" class="form-label">Descripcion:</label>

                    <div class="input-group">
                        <textarea class="form-control" id="DesPerfil" aria-label="With textarea"></textarea>
                    </div>
                </div>
		    </div>



			<div class="row">
                <div class="col-12 text-center">
                    Reportes:
                </div>
                <div class="col-6">
                    Disponibles
                </div>
                <div class="col-6">
                    Asignados
                </div>
            </div>


			<div class="row">

                <div class="col-6">
                    <div class="card listContainer" style="">
                        <div class="card-body">
                            <div class="list-group" id="listDisponible">

                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-6">
                    <div class="card listContainer" style="">
                        <div class="card-body">
                            <div class="list-group" id="listAsignado">
                               
                            </div>
                        </div>
                    </div>
                </div>

		    </div>

				

			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
				<button type="button" class="btn btn-primary" id="GuardarPerfil">Guardar Perfil</button>
			</div>
			</div>
		</div>
		</div>

	    <script
			src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js"
			integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0"
			crossorigin="anonymous"
		></script>

	    <script
			src="https://code.jquery.com/jquery-3.5.1.js"
		></script>
		<script
			src="https://cdn.datatables.net/1.10.23/js/jquery.dataTables.min.js"
		></script>
		<script
			src="https://cdn.datatables.net/1.10.23/js/dataTables.bootstrap4.min.js"
		></script>
<script>
	$(document).ready(function() {
        getPerfilesTable(); 

        //Modal - lista - Permisos
        $('#listDisponible').on('click', 'a', function(){    
            $(this).appendTo('#listAsignado');
        });
        
        $('#listAsignado').on('click', 'a', function(){    
            $(this).appendTo('#listDisponible');
        });

        //Open modal 
        $('#nuevoPerfil').on('click', function(){    
            getModulesList();
            LimpiaModal();
        });

        SavePerfil();

	    });

    //Guardar perfil
    function SavePerfil() {
        $('#GuardarPerfil').on('click', function(){    
            var location = "perfilUser/SavePerfil";
            var NomPerfil = $('#NomPerfil').val();
            var DesPerfil = $('#DesPerfil').val();
            var CodPerfil = $('#CodPerfil').val();
            var modulesAsig = "";

            $('#listAsignado').children('a').each(function(){
                modulesAsig += $(this).attr('id') + ",";
            });
            modulesAsig = modulesAsig.slice(0,-1);

            $.ajax({
                type: "POST",
                dataType: 'JSON',
                data: { NomPerfil : NomPerfil,
                        DesPerfil : DesPerfil,
                        CodPerfil : CodPerfil,
                        modulesAsig : modulesAsig
                 },
                url: location,
            success: function (respuesta) {
              console.log(respuesta);
            },
            error: function (EX) {console.log(EX);}
            }).done(function () {});
            });
    }
    
    //Limpia datos en modal perfil
    function LimpiaModal() {
        $('#NomPerfil').val("");
        $('#CodPerfil').val("");
        $('#DesPerfil').val("");
        $('#listDisponible').html("");
        $('#listAsignado').html("");
    }

    //obtiene la informacion de tabla perfiles
    function getPerfilesTable() {
        var location = 'perfilUser/GetPerfiles';
        $.ajax({
                type: "GET",
                dataType: 'JSON',
                url: location,
            success: function (respuesta) {
                var renglon = "";
                respuesta.forEach(function(row, index) {
                    renglon = "<tr>"
                            + "<td>" + row.prf_id + "</td>"
                            + "<td>" + row.prf_code + "</td>"
                            + "<td>" + row.prf_name + "</td>"
                            + "<td>" + row.prf_description + "</td>"
                            + "<td>" + row.mod_id + "</td>"
                            + "<td>" + row.mod_id + "</td>"
                            + "</tr>";
                    $("#tablaPerfiles").append(renglon);

                });
                $('#example').DataTable();
            },
            error: function () {
            }
        }).done(function () {
        });
    }

    //Optiene los modulos disponibles
    function getModulesList() {
        var location = 'http://localhost/cttrentals/perfilUser/GetModules';
        $.ajax({
                type: "GET",
                dataType: 'JSON',
                url: location,
            success: function (respuesta) {
                var renglon = "";
                respuesta.forEach(function(row, index) {
                    renglon ='<a href="#" class="list-group-item list-group-item-action" id="'+row.mod_id+'">'+row.mod_code+' - '+row.mod_name+'<br><span style="font-size: 10px;">'+row.mod_description+'</span></a>';
                    $("#listDisponible").append(renglon);

                });
                $('#example').DataTable();
            },
            error: function () {
            }
        }).done(function () {
        });
    }
   
</script>

</body>

</html>