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
            <h2>Empleados</h2>
            <div class="add_Boton"><span><i class="fas fa-plus-circle"></i> Agregar Empleado</span></div>
            <div class="fra_contenedor">
                <div class="tabla_master" id="tabla_master"></div>
                <div class="tabla_oculta" id="tabla_master_back"></div>
            </div>
            

        </div>
    </div>


</div>

<div class="fondo_modal">
    <div class="caja">
        <h2>Agregando nuevo empleado</h2>
        <!-- NUMERO DE EMPLEADO -->
        <div class="form_group seg_codigo noshowafter clean">
            <label for="txtNumero">Número de empleado</label><br />
            <div class="group_simple" style="width: 200px;">
                <input type="text" name="txtNumero" id="txtNumero" class="textbox requerido" data_req="1"
                    data_fail="Se debe ingresar un número del empleado" />
            </div>
            <div class="nota noshow">Debes agregar el número del empleado</div>
        </div>

        <!-- NOMBRE DEL EMPLEADO -->
        <div class="form_group seg_nombre noshowafter clean">
            <label for="txtNombre">Nombre del empleado</label><br />
            <div class="group_simple" style="width: 400px;">
                <input type="text" name="txtNombre" id="txtNombre" class="textbox requerido" data_req="1"
                    data_fail="Se debe ingresar el nombre del empleado" />
            </div>
            <div class="nota noshow">Debes agregar el nombre del empleado</div>
        </div>


        <!-- AREA DE TRABAJO -->
        <div class="form_group seg_area noshowafter clean">
            <label for="txtArea">Area</label><br />
            <div class="group_search-lf"  style="width: 250px;">
                <input type="text" name="txtArea" id="txtArea" class="textbox requerido" data_selection=""
                    data_req="1" data_fail="Se requiere seleccionar el área del empleado" readonly />
                <i class="fas fa-caret-down ibtn" data_section="areas"></i>
            </div>
            <div class="nota noshow">Se debe ingresar el área del empleado</div>
            <div class="listado" id="areas">
                <ul></ul>
            </div>
        </div>



        <!-- PUESTO DEL EMPLEADO -->
        <div class="form_group seg_puesto noshowafter clean">
            <label for="txtPuesto">Puesto</label><br />
            <div class="group_search-lf"  style="width: 250px;">
                <input type="text" name="txtPuesto" id="txtPuesto" class="textbox requerido" data_selection="0"
                    data_req="0" data_fail="Se requiere seleccionar el puesto del empleado" readonly />
                <i class="fas fa-caret-down ibtn" data_section="puestos"></i>
            </div>
            <div class="nota noshow">Se debe ingresar el puesto del empleado</div>
            <div class="listado" id="puestos">
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
<script src="<?=  PATH_VIEWS . 'TAdminEmpleados/TAdminEmpleados.js' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>