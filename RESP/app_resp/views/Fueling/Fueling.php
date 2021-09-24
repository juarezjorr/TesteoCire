<?php 
  	defined('BASEPATH') or exit('No se permite acceso directo'); 
	  require ROOT . FOLDER_PATH . "/app/assets/header.php";
    //   require ROOT . FOLDER_PATH . "/app/assets/menu.php";
?>
</div>
</header>


<div class="container">
    <div class="frame_main central">
        <h1>Carga de combustible</h1>
        <div class="frame_inside border">
            <div class="frame_list">
                <div class="nodata">
                    <h2>No tienes salidas programadas</h2>
                </div>
                <div class="salida noshow">
                    <h2>salida</h2>
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


                    </table>
                    <table class="table_info tbl_observa">

                        <h3>Observaciones</h3>
                        <tr>
                            <td colspan="2" class="obs_contenido"></td>
                        </tr>
                    </table>

                </div>
            </div>
            <div class="frame_list">
                <div class="selectores">
                    <div class="sel_unidad">Unidad</div>
                    <div class="sel_planta">Planta</div>
                </div>
                <div class="separador"></div>
                <div class="unidad noshow">
                    <h2>Registro de carga de la unidad</h2>

                    <table class="table_resul tbl_unidad_info">
                        <thead>
                            <tr>
                                <th class="fecha" colspan="2">Fecha</th>
                                <th class="kmregs">Km<br>regs.</th>
                                <th class="kmrecr">Km<br>recr.</th>
                                <th class="litros">Lts<br>cargados</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>


                    <div class="separador"></div>

                    <!-- KILOMETROS REGISTRADOS -->
                    <div class="form_group seg_km_regs ">
                        <label for="txtkmRegistrads">Kilometro registrado</label><br />
                        <div class="group_simple">
                            <input type="number" name="txtkmRegistrads" id="txtkmRegistrads" class="textbox requerido"
                                data_fail="Se debe ingresar numero actual de kilometros registrados" /><br>
                        </div>
                        <span class="und_kms_anterio information">&nbsp;</span>
                        <span class="und_kms_totales information">&nbsp;</span>
                    </div>

                    <!-- LITROS INGRESADOS -->
                    <div class="form_group seg_litros_unidad ">
                        <label for="txtLitrosUnidad">Litros ingresados</label><br />
                        <div class="group_simple">
                            <input type="number" name="txtLitrosUnidad" id="txtLitrosUnidad" class="textbox requerido"
                                data_fail="Se debe ingresar numero de litros ingresados en la unidad" />
                        </div>
                        <span class="und_lts_anterio information">&nbsp;</span>
                        <span class="und_lts_conmdos information">&nbsp;</span>
                        <span class="und_lts_resulta information">&nbsp;</span>
                    </div>

                    <!-- IMPORTE PAGADO -->
                    <div class="form_group seg_importe_unidad ">
                        <label for="txtImportUnidad">Importe pagado</label><br />
                        <div class="group_simple">
                            <input type="number" name="txtImportUnidad" id="txtImportUnidad" class="textbox requerido"
                                pattern="^[0-9]{0,12}([,][0-9]{2,2})?$" data_req="1"
                                data_fail="Se debe ingresar la cantidad de dinero pagado por la carga" />
                        </div>
                        <span class="und_price_litro information">&nbsp;</span>
                    </div>


                    <!-- PAGADOR -->
                    <div class="form_group seg_pagador_unidad">
                        <label for="txtPagadoUnidad">¿Quién paga el importe?</label><br />
                        <div class="group_search-lf">
                            <input type="text" name="txtPagadoUnidad" data_req="1" id="txtPagadoUnidad" class="textbox"
                                readonly data_fail="Se debe seleccionar quien paga el importe de combustible" />
                            <i class="fas fa-caret-down ibtn" data_section="pagadorUnd"></i>
                        </div>
                        <div class="listado" id="pagadorUnd">
                            <ul>
                                <li><a href="#" id="1">CTT Rentals</a></li>
                                <li><a href="#" id="2">Producciòn de Proyecto</a></li>
                            </ul>
                        </div>
                    </div>

                    <input type="hidden" name="txtIdUnidad" id="txtIdUnidad" />
                    <input type="hidden" name="txtMoviIdUnd" id="txtMoviIdUnd" />
                    <input type="hidden" name="txtAmRegsUnd" id="txtAmRegsUnd" />
                    <input type="hidden" name="txtKmRegsUnd" id="txtKmRegsUnd" />
                    <input type="hidden" name="txtLtsResUnd" id="txtLtsResUnd" />
                    <input type="hidden" name="txtTanqueUnd" id="txtTanqueUnd" />
                    <input type="hidden" name="txtRendAmUnd" id="txtRendAmUnd" />
                    <input type="hidden" name="txtRendKmUnd" id="txtRendKmUnd" />

                    <div class="separador"></div>

                    <!-- BOTONES -->
                    <div class="form_group seg_botones ">
                        <div class="group_botons">
                            <button class="btn default" id="guarda_und"><i class="fas fa-key"></i> Registrar</button>
                        </div>
                    </div>
                    <div class="separador"></div>
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
                            <td class="concepto">Tarjeta:</td>
                            <td class="dato trj_numero"></td>
                        </tr>
                    </table>
                    <div class="separador"></div>


                </div>

                <div class="planta">

                <h2>Registro de carga de la planta</h2>
                    <table class="table_resul tbl_planta_info">
                        <thead>
                            <tr>
                                <th class="fecha" colspan="2">Fecha</th>
                                <th class="hrregs">Horas<br>regs.</th>
                                <th class="hrrecr">Horas<br>cons.</th>
                                <th class="litros">Lts<br>cargados</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>


                    <div class="separador"></div>

                    <!-- HORAS REGISTRADOS -->
                    <div class="form_group seg_km_regs ">
                        <label for="txtHrConsumidos">Horas consumidas</label><br />
                        <div class="group_simple">
                            <input type="number" name="txtHrConsumidos" id="txtHrConsumidos" class="textbox requerido"
                                data_req="1" data_fail="Se debe ingresar numero actual de horas consumidas" />
                        </div>
                        <span class="pta_hrs_anterio information">&nbsp;</span>
                        <span class="pta_hrs_totales information">&nbsp;</span>
                    </div>



                    <!-- LITROS INGRESADOS -->
                    <div class="form_group seg_litros_planta ">
                        <label for="txtLitrosPlanta">Litros ingresados</label><br />
                        <div class="group_simple">
                            <input type="number" name="txtLitrosPlanta" id="txtLitrosPlanta" class="textbox requerido"
                                data_req="1" data_fail="Se debe ingresar numero de litros ingresados en la unidad" />
                        </div>
                        <span class="pta_lts_anterio information">&nbsp;</span>
                        <span class="pta_lts_conmdos information">&nbsp;</span>
                        <span class="pta_lts_resulta information">&nbsp;</span>
                    </div>

                    <!-- IMPORTE PAGADO -->
                    <div class="form_group seg_importe_unidad ">
                        <label for="txtImportPlanta">Importe pagado</label><br />
                        <div class="group_simple">
                            <input type="number" name="txtImportPlanta" id="txtImportPlanta" class="textbox requerido"
                                data_req="1" data_fail="Se debe ingresar la cantidad de dinero pagado por la carga" />
                        </div>
                        <span class="pta_price_litro information">&nbsp;</span>
                    </div>


                    <!-- AMPERES REGISTRADOS -->
                    <div class="form_group seg_km_regs ">
                        <label for="txtAmConsumidos">Amperes consumidos</label><br />
                        <div class="group_simple">
                            <input type="number" name="txtAmConsumidos" id="txtAmConsumidos" class="textbox requerido"
                                data_req="1" data_fail="Se debe ingresar numero actual de amperes consumidos" />
                        </div>
                    </div>

                    <!-- PAGADOR -->
                    <div class="form_group seg_pagador_planta">
                        <label for="txtPagadoPlanta">¿Quién paga el importe?</label><br />
                        <div class="group_search-lf">
                            <input type="text" name="txtPagadoPlanta" id="txtPagadoPlanta" class="textbox" data_req="1"
                                readonly data_fail="Se debe seleccionar quien paga el importe de combustible" />
                            <i class="fas fa-caret-down ibtn" data_section="pagadorPta"></i>
                        </div>
                        <div class="listado" id="pagadorPta">
                            <ul>
                                <li><a href="#" id="1">CTT Rentals</a></li>
                                <li><a href="#" id="2">Producciòn de Proyecto</a></li>
                            </ul>
                        </div>
                    </div>

                    <input type="hidden" name="txtIdPlanta" id="txtIdPlanta" />
                    <input type="hidden" name="txtMoviIdPta" id="txtMoviIdPta" />
                    <input type="hidden" name="txtAmRegsPta" id="txtAmRegsPta" />
                    <input type="hidden" name="txtHrRegsPta" id="txtHrRegsPta" />
                    <input type="hidden" name="txtLtsResPta" id="txtLtsResPta" />
                    <input type="hidden" name="txtTanquePta" id="txtTanquePta" />
                    <input type="hidden" name="txtRendAmPta" id="txtRendAmPta" />
                    <input type="hidden" name="txtRendHrPta" id="txtRendHrPta" />

                    <div class="separador"></div>

                    <!-- BOTONES -->
                    <div class="form_group seg_botones ">
                        <div class="group_botons">
                            <button class="btn default" id="guarda_pta"><i class="fas fa-key"></i> Registrar</button>
                        </div>
                    </div>
                    <div class="separador"></div>
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
                            <td class="concepto">Rendimiento Amp/ltr:</td>
                            <td class="dato und_rendimiento"></td>
                        </tr>
                        <tr>
                            <td class="concepto">Tarjeta:</td>
                            <td class="dato trj_numero"></td>
                        </tr>

                    </table>
                    <div class="separador"></div>

                </div>
            </div>
        </div>
    </div>
</div>

<script src="<?=  PATH_ASSETS . 'lib/functions.js' ?>"></script>
<script src="<?=  PATH_ASSETS . 'lib/moment/moment-with-locales.min.js' ?>"></script>
<script src="<?=  PATH_VIEWS . 'Fueling/Fueling.js' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>