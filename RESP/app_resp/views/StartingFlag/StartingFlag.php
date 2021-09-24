<?php 
  	defined('BASEPATH') or exit('No se permite acceso directo'); 
	  require ROOT . FOLDER_PATH . "/app/assets/header.php";
      require ROOT . FOLDER_PATH . "/app/assets/menu.php";
?>



<div class="container">
    <div class="frame_main central">
        <h1>Registro de salidas de unidades</h1>
        <div class="frame_inside border">

            <div class="frame_list">
                <div class="listado">
                    <h2>Salidas pendientes</h2>
                    <ul class="grupo_lista"></ul>
                </div>
                <div class="unidad">
                    <h2>Información de la salida</h2>
                    <table class="table_info tbl_salida">
                        <tr>
                            <td class="concepto">Id de salida:</td>
                            <td class="dato mov_id"></td>
                        </tr>
                        <tr>
                            <td class="concepto">Fecha de registro:</td>
                            <td class="dato mov_fecha_registro"></td>
                        </tr>
                        <tr class="fech_prog noshow">
                            <td class="concepto">Fecha programada:</td>
                            <td class="dato mov_fecha_salida_prog"></td>
                        </tr>
                        <tr>
                            <td class="concepto">Tipo de salida:</td>
                            <td class="dato dst_nombre"></td>
                        </tr>
                        <tr class="diverso noshow">
                            <td class="concepto">Dirección:</td>
                            <td class="dato mov_direcc_destino"></td>
                        </tr>
                        <tr class="diverso noshow">
                            <td class="concepto">Alcaldía:</td>
                            <td class="dato alc_nombre"></td>
                        </tr>
                        <tr class="llamado noshow">
                            <td class="concepto">Proyecto:</td>
                            <td class="dato mov_proyecto"></td>
                        </tr>
                        <tr class="diverso noshow">
                            <td class="concepto">Autorizo:</td>
                            <td class="dato mov_autorizo"></td>
                        </tr>
                        <tr>
                            <td class="concepto">Tarjeta:</td>
                            <td class="dato trj_numero"></td>
                        </tr>
                        <tr>
                            <td class="concepto">Operador:</td>
                            <td class="dato emp_nombre"></td>
                        </tr>

                    </table>

                    <table class="table_info tbl_observa">

                        <h3>Observaciones</h3>
                        <tr>
                            <td colspan="2" class="obs_contenido"></td>
                        </tr>
                    </table>
                    <div class="separador"></div>

                    <div class="frame_inputs">

                        <!-- KILOMETROS SALIDA -->
                        <div class="form_group seg_km_salida">
                            <h2>Salida</h2>
                            <label for="txtKmSalida">Kilómetros registrados en la unidad</label><br />
                            <div class="group_simple">
                                <input type="number" name="txtKmSalida" id="txtKmSalida" class="textbox requerido"
                                    data_req="0" data_fail="Se debe ingresar el número de kilometros del la unidad" />
                            </div>
                        </div>

                        <!-- NIVEL DECOMBUSTIBLE -->
                        <div class="form_group seg_tnk_unidad">
                            <div class="und_tnk_contenedor tnk_contenedor">
                                <label>Nivel de combustible Unidad</label>
                                <div class="tnk_contenedor_control">
                                    <div class="tnk_medidor"></div>
                                    <div class="tnk_control" id="und_tnk_control"></div>
                                </div>

                                <i class="fas fa-gas-pump"></i>
                                <span class="tnk_litros und_tnk_litros"></span>

                            </div>
                        </div>




                        <div class="separador"></div>


                        <!-- HORAS SALIDA -->
                        <div class="form_group seg_Hr_salida noshow">
                            <label for="txtHrSalida">Horas registradas en la planta</label><br />
                            <div class="group_simple">
                                <input type="number" name="txtHrSalida" id="txtHrSalida" class="textbox requerido"
                                    data_req="2" data_fail="Se debe ingresar el numero de horas de la planta" />
                            </div>
                        </div>

                        <!-- NIVEL DECOMBUSTIBLE -->
                        <div class="form_group seg_tnk_unidad noshow">
                            <div class="pta_tnk_contenedor tnk_contenedor">
                                <label>Nivel de combustible Planta</label>
                                <div class="tnk_contenedor_control">
                                    <div class="tnk_medidor"></div>
                                    <div class="tnk_control" id="pta_tnk_control"></div>
                                </div>

                                <i class="fas fa-gas-pump"></i>
                                <span class="tnk_litros pta_tnk_litros"></span>

                            </div>
                        </div>



                    </div>


                    <input type="hidden" name="txtSalUnd" id="txtSalUnd" />
                    <input type="hidden" name="txtSalPta" id="txtSalPta" />
                    <input type="hidden" name="txtTnkUnd" id="txtTnkUnd" />
                    <input type="hidden" name="txtTnkPta" id="txtTnkPta" />
                    <input type="hidden" name="txtIdeUnd" id="txtIdeUnd" />
                    <input type="hidden" name="txtIdePta" id="txtIdePta" />

                </div>
            </div>
            <div class="frame_list">
                <div class="unidad">
                    <h2>Información de la unidad</h2>
                    <table class="table_info tbl_unidad">
                        <tr>
                            <td class="concepto">Nombre de la unidad:</td>
                            <td class="dato und_nombre"></td>
                        </tr>
                        <tr>
                            <td class="concepto">Placas:</td>
                            <td class="dato und_placa"></td>
                        </tr>
                        <tr>
                            <td class="concepto">Marca:</td>
                            <td class="dato und_marca"></td>
                        </tr>
                        <tr>
                            <td class="concepto">Modelo:</td>
                            <td class="dato und_model"></td>
                        </tr>
                        <tr>
                            <td class="concepto">Tipo:</td>
                            <td class="dato und_tipo"></td>
                        </tr>
                        <tr>
                            <td class="concepto">Serie:</td>
                            <td class="dato und_serie"></td>
                        </tr>
                        <tr>
                            <td class="concepto">Tatuaje:</td>
                            <td class="dato und_tatuaje"></td>
                        </tr>
                        <tr>
                            <td class="concepto">Clasificación:</td>
                            <td class="dato und_clasificacion"></td>
                        </tr>
                        <tr>
                            <td class="concepto">Tipo de combustible:</td>
                            <td class="dato und_combustible"></td>
                        </tr>
                        <tr>
                            <td class="concepto">Rendimiento Km/ltr:</td>
                            <td class="dato und_rendimiento"></td>
                        </tr>
                        <tr>
                            <td class="concepto">Operador:</td>
                            <td class="dato emp_nombre"></td>
                        </tr>
                        <tr>
                            <td class="concepto">Tarjeta:</td>
                            <td class="dato trj_numero"></td>
                        </tr>
                    </table>

                    <div class="seg_ltsActual_und">

                        <span class="titulo">Combustible</span>
                        <div class="gas">
                            <div class="box_litros">
                                <div class="medidor"></div>
                            </div>
                            <i class="fas fa-gas-pump"></i>
                        </div>
                    </div>
                </div>
                <div class="separador"></div>
                <div class="planta">
                    <h2>Información de la planta</h2>
                    <table class="table_info tbl_planta">
                        <tr>
                            <td class="concepto">Nombre de la unidad:</td>
                            <td class="dato und_nombre"></td>
                        </tr>
                        <tr>
                            <td class="concepto">Tanques:</td>
                            <td class="dato und_tanques"></td>
                        </tr>
                        <tr>
                            <td class="concepto">Cap. litros totales:</td>
                            <td class="dato und_litros"></td>
                        </tr>
                        <tr>
                            <td class="concepto">Tipo de combustible:</td>
                            <td class="dato und_combustible"></td>
                        </tr>
                        <tr>
                            <td class="concepto">Rendimiento Hrs/ltr:</td>
                            <td class="dato und_rendimiento"></td>
                        </tr>
                        <tr>
                            <td class="concepto">Tarjeta:</td>
                            <td class="dato trj_numero"></td>
                        </tr>
                        <tr>
                            <td class="concepto">Operador:</td>
                            <td class="dato emp_nombre"></td>
                        </tr>
                    </table>

                    <div class="seg_ltsActual_pta">

                        <span class="titulo">Combustible</span>
                        <div class="gas">
                            <div class="box_litros">
                                <div class="medidor"></div>
                            </div>
                            <i class="fas fa-gas-pump"></i>
                        </div>
                    </div>
                </div>
            </div>

            <!-- BOTONES -->
            <div class="form_group seg_botones noshowafter">
                <div class="group_botons">
                    <button class="btn default" id="guarda"><i class="fas fa-key"></i> Registrar</button>
                    <button class="btn cancela" id="cancela"><i class="fas fa-times"></i> Cancelar</button>
                </div>
            </div>

        </div>
    </div>
</div>

<div class="deep_loading"></div>

<script src="<?=  PATH_ASSETS . 'lib/functions.js' ?>"></script>
<script src="<?=  PATH_VIEWS . 'StartingFlag/StartingFlag.js' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>