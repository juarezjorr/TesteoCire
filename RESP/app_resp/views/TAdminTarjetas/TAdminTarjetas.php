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
            <h2>Tarjetas</h2>
            <div class="add_Boton"><span><i class="fas fa-plus-circle"></i> Agregar Tarjeta</span></div>
            <div class="fra_contenedor">
                <div class="tabla_master" id="tabla_master"></div>
                <div class="tabla_oculta" id="tabla_master_back"></div>
            </div>
            

        </div>
    </div>


</div>

<div class="fondo_modal">
    <div class="caja">
        <h2>Agregando nueva tarjeta</h2>

        <!-- NOMBRE DEL PUESTO -->
        <div class="form_group seg_tarjeta noshowafter clean">
            <label for="txtTarjeta">Número de tarjeta</label><br />
            <div class="group_simple" style="width: 200px;">
                <input type="text" name="txtTarjeta" id="txtTarjeta" class="textbox requerido" data_req="1"
                    data_fail="Se debe ingresar el número de la tarjeta" />
            </div>
            <div class="nota noshow">Se debe ingresar el número de la tarjeta</div>
        </div>


        <!-- TIPO DE TARJETA -->
        <div class="form_group seg_tipo noshowafter clean">
            <label for="txtTipo">Tipo</label><br />
            <div class="group_search-lf"  style="width: 200px;">
                <input type="text" name="txtTipo" id="txtTipo" class="textbox requerido" data_selection="0"
                    data_req="0" data_fail="Se requiere seleccionar el tipo de tarjeta " readonly />
                <i class="fas fa-caret-down ibtn" data_section="tipo"></i>
            </div>
            <div class="nota noshow">Se requiere seleccionar el tipo de tarjeta</div>
            <div class="listado" id="tipo">
                <ul></ul>
            </div>
        </div>


        <!-- ESTADO DE LA TARJETA -->
        <div class="form_group seg_estado noshowafter clean">
            <label for="txtEstado">Estado</label><br />
            <div class="group_search-lf"  style="width: 200px;">
                <input type="text" name="txtEstado" id="txtEstado" class="textbox requerido" data_selection="0"
                    data_req="0" data_fail="Se requiere seleccionar el estado de la tarjeta" readonly />
                <i class="fas fa-caret-down ibtn" data_section="estado"></i>
            </div>
            <div class="nota noshow">Se requiere seleccionar el estado de la tarjeta</div>
            <div class="listado" id="estado">
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
<script src="<?=  PATH_VIEWS . 'TAdminTarjetas/TAdminTarjetas.js' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>
