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
            <h2>Usuarios</h2>
            <div class="add_Boton"><span><i class="fas fa-plus-circle"></i> Agregar usuario</span></div>
            <div class="fra_contenedor">
                <div class="tabla_master" id="tabla_master"></div>
                <div class="tabla_oculta" id="tabla_master_back"></div>
            </div>
            

        </div>
    </div>


</div>


<div class="fondo_modal">
    <div class="caja">
    <h2>Agregando nuevo usuario</h2>
            <!-- EMPLEADOS -->
            <div class="form_group seg_empleado noshowafter clean">
            <label for="txtEmpleado">Empleado</label><br />
            <div class="group_search-lf"  style="width: 250px;">
                <input type="text" name="txtEmpleado" id="txtEmpleado" class="textbox requerido" data_selection=""
                    data_req="1" data_fail="Se requiere seleccionar el empleado" readonly />
                <i class="fas fa-caret-down ibtn" data_section="empleados"></i>
            </div>
            <div class="nota noshow">Se debe ingresar el empleado</div>
            <div class="listado" id="empleados">
                <ul></ul>
            </div>
        </div>

            <!-- PERFILES -->
            <div class="form_group seg_perfil noshowafter clean">
            <label for="txtPerfil">Perfil</label><br />
            <div class="group_search-lf"  style="width: 250px;">
                <input type="text" name="txtPerfil" id="txtPerfil" class="textbox requerido" data_selection=""
                    data_req="1" data_fail="Se requiere seleccionar el perfil del usuario" readonly />
                <i class="fas fa-caret-down ibtn" data_section="perfiles"></i>
            </div>
            <div class="nota noshow">Se requiere seleccionar el perfil del usuario</div>
            <div class="listado" id="perfiles">
                <ul></ul>
            </div>
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
<script src="<?=  PATH_VIEWS . 'TAdminUsuarios/TAdminUsuarios.js' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>