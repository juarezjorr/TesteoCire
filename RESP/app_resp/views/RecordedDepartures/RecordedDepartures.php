<?php 
  	defined('BASEPATH') or exit('No se permite acceso directo'); 
	  require ROOT . FOLDER_PATH . "/app/assets/header.php";
	  require ROOT . FOLDER_PATH . "/app/assets/menu.php";
?>



<div class="container">
    <div class="frame_main central">
        <h1>Programacion de salidas de unidades</h1>
        <div class="frame_inside border">
            <div class="frame_list">
                <div class="unidad">
                    <h2>Información de la salida<br>programada</h2>
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
                    <h3 class="stst2 noshow">La unidad se encuentra fuera de las instalaciones</h3>
                    <div class="back">
                        <a href="Schedule"><i class="far fa-arrow-alt-circle-left"></i>Programar otra salida</a>
                    </div>
                    <table class="table_info tbl_observa">
                  
                  <h3>Observaciones</h3>
                        <tr>
                            <td colspan="2" class="obs_contenido"></td>
                        </tr>
                    </table>

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
        </div>
    </div>
</div>


<script src="<?=  PATH_ASSETS . 'lib/functions.js' ?>"></script>
<script src="<?=  PATH_VIEWS . 'RecordedDepartures/RecordedDepartures.js' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>