

<?php 
	defined('BASEPATH') or exit('No se permite acceso directo'); 
	require ROOT . FOLDER_PATH . "/app/assets/header.php";
?>

<header>
	<?php require ROOT . FOLDER_PATH . "/app/assets/menu.php"; ?>
</header>



<div class="container-fluid">
    <div class="contenido ">
        <div class="row">
            <div class="block_01">
                <div class="row">
                    <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 blocks">
                        <div class="  block_01-01 ">
                            <table class="table_information">
                                <tr>
                                    <td class="concepto">Casa productora</td>
                                    <td class="dato" id="FilmProducerHouse"></td>
                                </tr>
                                <tr>
                                    <td class="concepto">Productor responsable</td>
                                    <td class="dato" id="FilmProducer"></td>
                                </tr>
                                <tr>
                                    <td class="concepto">Domicilio</td>
                                    <td class="dato" id="AddressProducer"></td>
                                </tr>
                                <tr>
                                    <td class="concepto">Correo electrónico</td>
                                    <td class="dato" id="EmailProducer"></td>
                                </tr>
                                <tr>
                                    <td class="concepto">Teléfono</td>
                                    <td class="dato" id="PhoneProducer"></td>
                                </tr>
                                <tr>
                                    <td class="concepto">Calificación</td>
                                    <td class="dato" id="QualificationProducer"></td>
                                </tr>
                                <tr>
                                    <td class="concepto"></td>
                                    <td class="enlace"><button class="btn-add" id="addProducer"> + Agregar cliente</button></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 blocks">
                        
                        <div class="  block_01-02">
                            <table class="table_information">
                                <tr>
                                    <td class="concepto">Proyecto</td>
                                    <td class="dato" id="Project"></td>
                                </tr>
                                <tr>
                                    <td class="concepto">Locación</td>
                                    <td class="dato" id="Location"></td>
                                </tr>
                                <tr>
                                    <td class="concepto">Tpo de proyecto</td>
                                    <td class="dato" id="TypeProject"></td>
                                </tr>
                                <tr>
                                    <td class="concepto">Tipo de locación</td>
                                    <td class="dato" id="TypeLocation"></td>
                                </tr>
                                <tr>
                                    <td class="concepto">Fecha del proyecto</td>
                                    <td class="dato" id="PeriodProject"></td>
                                </tr>
                               
                                <tr>
                                    <td class="concepto">Version</td>
                                    <td class="dato" id="version"></td>
                                </tr>
                                <tr>
                                    <td class="concepto"></td>
                                    <td class="enlace"><button class="btn-add" id="addProject"> + Agregar proyecto</button></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 blocks">
                        <div class="block_01-02">
                            <div id="tbl_dynamic">
                                <table class="table_control" id="tblControl" style="width: 1310px;">
                                    <thead>
                                        <tr class="headrow">
                                            <th rowspan="2" class="w1 fix product">PRODUCTO</th>
                                            <th colspan="5" class="zone_01 headrow" >COTIZACIÓN BASE</th>
                                            <th colspan="3" class="zone_02 headrow" >VIAJE</th>
                                            <th colspan="3" class="zone_03 headrow" >PRUEBAS</th>
                                        </tr>
                                        <tr>
                                            <th class="w2 zone_01" >Cantidad</th>
                                            <th class="w3 zone_01" >Precio</th>
                                            <th class="w2 zone_01 sel" ><i class="fas fa-caret-left" id="daybase"></i>Días</th>
                                            <th class="w2 zone_01 sel" ><i class="fas fa-caret-left" id="desbase"></i>Desc.</th>
                                            <th class="w3 zone_01" >Costo</th>
                                            <th class="w2 zone_02 sel" ><i class="fas fa-caret-left" id="daytrip"></i>Días</th>
                                            <th class="w2 zone_02 sel" ><i class="fas fa-caret-left" id="destrip"></i>Desc.</th>
                                            <th class="w3 zone_02" >Costo</th>
                                            <th class="w2 zone_03 sel" ><i class="fas fa-caret-left" id="daytest"></i>Días</th>
                                            <th class="w2 zone_03 sel" ><i class="fas fa-caret-left" id="destest"></i>Desc.</th>
                                            <th class="w3 zone_03" >Costo</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>   
                    </div>
                </div>

            </div>
            <div class="block_02">
                <div class="blocks">
                    <button class="btn-add" id="newQuote"> + nueva cotización</button>
                </div>
                <hr>
                <div class="blocks">
                    <div class="half left concepto">cotización base</div>
                    <div class="half right dato" id="costbase">0</div>
                </div>
                <div class="blocks">
                    <div class="half left concepto">Costo viaje</div>
                    <div class="half right dato" id="costtrip">0</div>
                </div>
                <div class="blocks">
                    <div class="half left concepto">Costo pruebas</div>
                    <div class="half right dato" id="costtest">0</div>
                </div>
                <div class="blocks">
                    <div class="half left concepto">Seguro</div>
                    <div class="half right dato">0</div>
                </div>

                <div class="blocks total">
                    <div class="half left concepto">Total</div>
                    <div class="half right total dato" id="total">0</div>
                </div>
                
                <div class="blocks">
                    <div class="full text_center">
                        <button class="bn btn-ok"> aceptar cotización</button>
                    </div>
                </div>
                <hr>
                <div class="blocks">
                    <div class="full text_center">
                        <h6>DOCUMENTOS</h6>
                    </div>
                </div>
                <div class="blocks documents">
                    <div class="half left">C0001</div>
                    <div class="half right">00/00/0000</div>
                </div>
                <div class="blocks documents">
                    <div class="half left">C0002</div>
                    <div class="half right">00/00/0000</div>
                </div>
            </div>


        </div>
            
                
            
        
    </div>
</div>

<!-- Start Modales -->
<div class="box_modal_deep">
    <div class="box_modal"></div>
</div>
<!-- End Modales -->


<script src="<?=  PATH_ASSETS . 'lib/functions.js' ?>"></script>
<script src="<?=  PATH_VIEWS . 'budget/budget.js' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>