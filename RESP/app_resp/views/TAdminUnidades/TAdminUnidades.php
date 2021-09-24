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
            <h2>Unidades</h2>
            <div class="add_Boton"><span><i class="fas fa-plus-circle"></i> Agregar Unidad</span></div>
            <div class="fra_contenedor">
                <div class="tabla_master" id="tabla_master"></div>
                <div class="tabla_oculta" id="tabla_master_back"></div>
            </div>


        </div>
    </div>


</div>

<div class="fondo_modal">
    <div class="caja">
        <h2>Agregando nueva unidad</h2>
        <div class="deslizante">
        
            <!-- CLASIFICACIÓN -->
            <div class="form_group seg_clasificaciones noshowafter clean">
                <label for="txtClasificacion">Clasificación</label><br />
                <div class="group_search-lf" style="width: 250px;">
                    <input type="text" name="txtClasificacion" id="txtClasificacion" class="textbox requerido"
                        data_selection="0" data_req="0"
                        data_fail="Se requiere seleccionar la clasificación de la unidad" readonly />
                    <i class="fas fa-caret-down ibtn" data_section="clasif"></i>
                </div>
                <div class="nota"></div>
                <div class="listado" id="clasif">
                    <ul></ul>
                </div>
            </div>


            <!-- NUMERO DE PLACA -->
            <div class="form_group seg_placa noshowafter clean">
                <label for="txtPlaca">Número de placa</label><br />
                <div class="group_simple" style="width: 150px;">
                    <input type="text" name="txtPlaca" id="txtPlaca" class="textbox requerido" data_req="1"
                        data_fail="Se debe ingresar un número de placa" />
                </div>
                <div class="nota"></div>
            </div>


            <!-- NOMBRE DE LA UNIDAD -->
            <div class="form_group seg_unidad noshowafter clean">
                <label for="txtNombre">Nombre de la unidad</label><br />
                <div class="group_simple" style="width: 300px;">
                    <input type="text" name="txtNombre" id="txtNombre" class="textbox requerido" data_req="1"
                        data_fail="Se debe ingresar un nombre de la unidad" />
                </div>
                <div class="nota"></div>
            </div>



            <!-- MARCA DE LA UNIDAD -->
            <div class="form_group seg_marca noshowafter clean">
                <label for="txtMarca">Marca</label><br />
                <div class="group_simple" style="width: 300px;">
                    <input type="text" name="txtMarca" id="txtMarca" class="textbox" data_req="0"
                        data_fail="Se debe ingresar la marca de la unidad" />
                </div>
                <div class="nota"></div>
            </div>



            <!-- MODELO DE LA UNIDAD -->
            <div class="form_group seg_modelo noshowafter clean">
                <label for="txtModelo">Modelo</label><br />
                <div class="group_simple" style="width: 70px;">
                    <input type="text" name="txtModelo" id="txtModelo" class="textbox" data_req="0"
                        data_fail="Se debe ingresar el modelo de la unidad" />
                </div>
                <div class="nota"></div>
            </div>



            <!-- MODELO DE LA SERIE -->
            <div class="form_group seg_serie noshowafter clean">
                <label for="txtSerie">Número de serie</label><br />
                <div class="group_simple" style="width: 150px;">
                    <input type="text" name="txtSerie" id="txtSerie" class="textbox" data_req="0"
                        data_fail="Se debe ingresar el número de serie de la unidad" />
                </div>
                <div class="nota"></div>
            </div>


            <!-- TIPO DE UNIDAD -->
            <div class="form_group seg_tipo noshowafter clean">
                <label for="txtTipo">Tipo de unidad</label><br />
                <div class="group_simple" style="width: 300px;">
                    <input type="text" name="txtTipo" id="txtTipo" class="textbox" data_req="0"
                        data_fail="Se debe ingresar el tipo unidad" />
                </div>
                <div class="nota"></div>
            </div>

            

            <!-- CAPACIDAD DE CARGA -->
            <div class="form_group seg_capacidad noshowafter clean">
                <label for="txtCapacidad">Capacidad de carga</label><br />
                <div class="group_simple" style="width: 300px;">
                    <input type="text" name="txtCapacidad" id="txtCapacidad" class="textbox" data_req="0"
                        data_fail="Se debe ingresar la capacidad de carga de la unidad" />
                </div>
                <div class="nota"></div>
            </div>
            

            <!-- TANQUES -->
            <div class="form_group seg_tanques noshowafter clean">
                <label for="txtTanque">Tanques</label><br />
                <div class="group_simple" style="width: 300px;">
                    <input type="text" name="txtTanque" id="txtTanque" class="textbox" data_req="0"
                        data_fail="Se deben ingresar los tanques de combustible de la unidad" />
                </div>
                <div class="nota"></div>
            </div>
            



            <!-- CAPACIDAD EN LITROS -->
            <div class="form_group seg_litros_act noshowafter clean">
                <label for="txtLitros">Capacidad de litros totales</label><br />
                <div class="group_simple" style="width: 100px;">
                    <input type="text" name="txtLitros" id="txtLitros" class="textbox" data_req="0"
                        data_fail="Se debe ingresar el numero de litros actuales en el tanque" />
                </div>
                <div class="nota"></div>
            </div>


            <!-- TIPO DE COMBUSTIBLE -->
            <div class="form_group seg_combustible noshowafter clean">
                <label for="txtCombustible">Tipo de combustible</label><br />
                <div class="group_simple" style="width: 100px;">
                    <input type="text" name="txtCombustible" id="txtCombustible" class="textbox" data_req="0"
                        data_fail="Se debe ingresar el tipo de combustible de la unidad" />
                </div>
                <div class="nota"></div>
            </div>



            <!-- LITROS ACTUALES EN EL TANQUE -->
            <div class="form_group seg_litros_act noshowafter clean">
                <label for="txtLitrosAct">Litros actuales en el tanque</label><br />
                <div class="group_simple" style="width: 100px;">
                    <input type="text" name="txtLitrosAct" id="txtLitrosAct" class="textbox" data_req="0"
                        data_fail="Se debe ingresar el numero de litros actuales en el tanque" />
                </div>
                <div class="nota"></div>
            </div>



            <!-- LLANTAS -->
            <div class="form_group seg_llantas noshowafter clean">
                <label for="txtLlantas">Llantas</label><br />
                <div class="group_simple" style="width: 200px;">
                    <input type="text" name="txtLlantas" id="txtLlantas" class="textbox" data_req="0"
                        data_fail="Se debe ingresar el tipo de llantas que utiliza la unidad" />
                </div>
                <div class="nota"></div>
            </div>



            <!-- TATUAJE -->
            <div class="form_group seg_tatuaje noshowafter clean">
                <label for="txtTatuaje">Tatuaje</label><br />
                <div class="group_simple" style="width: 100px;">
                    <input type="text" name="txtTatuaje" id="txtTatuaje" class="textbox requerido" data_req="1"
                        data_fail="Se debe ingresar el tatuaje de la unidad" />
                </div>
                <div class="nota"></div>
            </div>

            


            <!-- UNIDAD PADRE (solo planta) -->
            <div class="form_group seg_undAsigna noshow clean">
                <label for="txtUndPadre">Placas de la unidad movil asignada</label><br />
                <div class="group_search-lf" style="width: 100px;">
                    <input type="text" name="txtUndPadre" id="txtUndPadre" class="textbox"
                        data_selection="0" data_req="2"
                        data_fail="Se requiere seleccionar la placa de la unidad asignada" readonly />
                    <i class="fas fa-caret-down ibtn" data_section="placas"></i>
                </div>
                <div class="nota"></div>
                <div class="listado" id="placas">
                    <ul></ul>
                </div>
            </div>



            <!-- KILOMETROS POR CARGA COMPLETA -->
            <div class="form_group seg_ccompleta noshowafter clean">
                <label for="txtCCompleta">Rendimiento de Kms por litro con carga completa</label><br />
                <div class="group_simple" style="width: 100px;">
                    <input type="text" name="txtCCompleta" id="txtCCompleta" class="textbox requerido" data_req="1"
                        data_fail="Se debe ingresar numero de rendimiento con carga completa" />
                </div>
                <div class="nota"></div>
            </div>



            <!-- KILOMETROS POR MEDIA CARGA -->
            <div class="form_group seg_cmedia noshowafter clean">
                <label for="txtCMedia">Rendimiento de Kms por litro con media carga</label><br />
                <div class="group_simple" style="width: 100px;">
                    <input type="text" name="txtCMedia" id="txtCMedia" class="textbox requerido" data_req="1"
                        data_fail="Se debe ingresar numero de rendimiento con media carga" />
                </div>
                <div class="nota"></div>
            </div>



            <!-- KILOMETROS POR CARGA VACIA -->
            <div class="form_group seg_cvacia noshowafter clean">
                <label for="txtCVacia">Rendimiento de Kms por litro sin carga</label><br />
                <div class="group_simple" style="width: 100px;">
                    <input type="text" name="txtCVacia" id="txtCVacia" class="textbox requerido" data_req="1"
                        data_fail="Se debe ingresar numero de rendimiento unidad sin carga" />
                </div>
                <div class="nota"></div>
            </div>



            <!-- AREA ASIGNADA A LA UNIDAD -->
            <div class="form_group seg_area noshowafter clean">
                <label for="txtArea">Area</label><br />
                <div class="group_search-lf" style="width: 250px;">
                    <input type="text" name="txtArea" id="txtArea" class="textbox requerido" data_selection="0"
                        data_req="0" data_fail="Se requiere seleccionar el area asignada a la unidad" readonly />
                    <i class="fas fa-caret-down ibtn" data_section="areas"></i>
                </div>
                <div class="nota"></div>
                <div class="listado" id="areas">
                    <ul></ul>
                </div>
            </div>





            <!-- OPERADOR -->
            <div class="form_group seg_operador noshowafter clean">
                <label for="txtOperador">Operador de la unidad</label><br />
                <div class="group_search-lf" style="width: 250px;">
                    <input type="text" name="txtOperador" id="txtOperador" class="textbox requerido"
                        data_selection="0" data_req="0"
                        data_fail="Se requiere seleccionar el operador de la unidad" readonly />
                    <i class="fas fa-caret-down ibtn" data_section="operadores"></i>
                </div>
                <div class="nota"></div>
                <div class="listado" id="operadores">
                    <ul></ul>
                </div>
            </div>




            <!-- TARJETAS -->
            <div class="form_group seg_tarjeta noshowafter clean">
                <label for="txtTarjeta">Tarjeta</label><br />
                <div class="group_search-lf" style="width: 250px;">
                    <input type="text" name="txtTarjeta" id="txtTarjeta" class="textbox requerido"
                        data_selection="0" data_req="0"
                        data_fail="Se requiere seleccionar la tarjeta de carga de combustible" readonly />
                    <i class="fas fa-caret-down ibtn" data_section="tarjetas"></i>
                </div>
                <div class="nota"></div>
                <div class="listado" id="tarjetas">
                    <ul></ul>
                </div>
            </div>


            <div class="separador"></div>
            <div class="separador"></div>
            <div class="separador"></div>
            <div class="separador"></div>

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
<script src="<?=  PATH_VIEWS . 'TAdminUnidades/TAdminUnidades.js' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>