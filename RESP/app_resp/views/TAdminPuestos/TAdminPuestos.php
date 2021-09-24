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
            <h2>Puestos</h2>
            <div class="add_Boton"><span><i class="fas fa-plus-circle"></i> Agregar Puesto</span></div>
            <div class="fra_contenedor">
                <div class="tabla_master" id="tabla_master"></div>
                <div class="tabla_oculta" id="tabla_master_back"></div>
            </div>
            

        </div>
    </div>


</div>

<div class="fondo_modal">
    <div class="caja">
        <h2>Agregando nuevo puesto</h2>

        <!-- NOMBRE DEL PUESTO -->
        <div class="form_group seg_puesto noshowafter clean">
            <label for="txtNombre">Nombre del puesto</label><br />
            <div class="group_simple" style="width: 400px;">
                <input type="text" name="txtNombre" id="txtNombre" class="textbox requerido" data_req="1"
                    data_fail="Se debe ingresar el nombre del puesto" />
            </div>
            <div class="nota noshow">Debes agregar el nombre del puesto</div>
        </div>


        <!-- DESCRIPCION -->
        <div class="form_group seg_descripcion noshowafter clean">
            <label for="txtDescripcion">Descripción</label><br />
            <div class="group_simple" style="width: 400px;">
                <input type="text" name="txtDescripcion" id="txtDescripcion" class="textbox requerido" data_req="1"
                    data_fail="Se debe ingresar ladescripción del puesto" />
            </div>
            <div class="nota noshow">Se debe ingresar ladescripción del puesto</div>
        </div>


        <div class="separador"></div>
        <div class="separador"></div>
        <div class="separador"></div>

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
<script src="<?=  PATH_VIEWS . 'TAdminPuestos/TAdminPuestos.js' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>