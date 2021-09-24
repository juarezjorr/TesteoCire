<?php 
  	defined('BASEPATH') or exit('No se permite acceso directo'); 
	  require ROOT . FOLDER_PATH . "/app/assets/header.php";
	  require ROOT . FOLDER_PATH . "/app/assets/menu.php";
?>


<div class="container">

    <div class="sidebar">

        <?php require ROOT . FOLDER_PATH . "/app/assets/sidebarAdm.php"; ?>


    </div>
    <div class="contenido">

        <div class="lstDestinos border">
            <h2>destinos</h2>
            <div class="add_Boton"><span><i class="fas fa-plus-circle"></i> Agregar destino</span></div>
            <div class="fra_contenedor">
                <div class="tabla_master" id="tabla_master"></div>
                <div class="tabla_oculta" id="tabla_master_back"></div>
            </div>

        </div>
    </div>


</div>

<div class="fondo_modal">
    <div class="caja">
        <h2>Agregando nuevo destino</h2>
        <!-- CODIGO -->
        <div class="form_group seg_codigo noshowafter clean">
            <label for="txtCodigo">Código</label><br />
            <div class="group_simple" style="width: 200px;">
                <input type="text" name="txtCodigo" id="txtCodigo" class="textbox requerido" data_req="1"
                    data_fail="Se debe ingresar un código del destino" />
            </div>
            <div class="nota noshow">Debes agregar el código del destino</div>
        </div>

        <!-- NOMBRE -->
        <div class="form_group seg_nombre noshowafter clean">
            <label for="txtNombre">Nombre</label><br />
            <div class="group_simple" style="width: 300px;">
                <input type="text" name="txtNombre" id="txtNombre" class="textbox requerido" data_req="1"
                    data_fail="Se debe ingresar el nombre del destino" />
            </div>
            <div class="nota noshow">Debes agregar el nombre del destino</div>
        </div>


        <!-- DESCRIPCION -->
        <div class="form_group seg_descripcion clean">
            <label for="txtDescripcion">Descripción</label><br />
            <div class="group_simple">
                <textarea name="txtDescripcion" id="txtDescripcion" rows="4" class="textbox"></textarea>
            </div>
        </div>


        <!-- BOTONES -->
        <div class="form_group seg_botones">
            <div class="group_botons">
                <button class="btn default" id="guarda"><i class="fas fa-key"></i> Registrar</button>
                <button class="btn cancela" id="cancela"><i class="fas fa-times"></i> Cancelar</button>
            </div>
        </div>
    </div>



</div>

<script src="<?=  PATH_ASSETS . 'lib/functions.js' ?>"></script>
<script src="<?=  PATH_ASSETS . 'lib/tablas.js' ?>"></script>
<script src="<?=  PATH_ASSETS . 'lib/TAdminTool.js' ?>"></script>
<script src="<?=  PATH_VIEWS . 'TAdminDestinos/TAdminDestinos.js' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>