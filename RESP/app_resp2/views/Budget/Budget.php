

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
                                    <td class="concepto">Nombre del Cliente</td>
                                    <td class="dato" id="Customer" >
                                        <div class="grouper" 
                                        
                                        contenteditable="true" data_identy=""></div>
                                        <div class="customerType"></div>
                                        <i class="fas fa-caret-down turn"></i>

                                        <div class="list_items">
                                           <ul></ul>
                                        </div>
                                    </td>
                                </tr> 
                                <tr>
                                    <td class="concepto" style="heigth:30px">&nbsp;</td>
                                    <td class="dato"></td>
                                </tr>   

                                <tr>
                                    <td class="concepto">&nbsp;</td>
                                    <td class="dato" id="Relation"></td>
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
                                    <td class="enlace">&nbsp;</td>
                                </tr>
                            </table>

                            <button class="btn-add right" id="addProducer"> + Agregar cliente</button>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 blocks">
                        
                        <div class="  block_01-02">
                            <table class="table_information">
                                <tr>
                                    <td class="concepto">Numero de proyecto</td>
                                    <td class="dato" id="numProject">
                                        <div class="search" contenteditable="true" ></div>
                                        <i class="fas fa-search serc"></i>
                                    </td>
                                </tr>    
                                <tr>
                                    <td class="concepto"></td>
                                    <td class="error">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td class="concepto">Proyecto</td>
                                    <td class="dato" id="Projects">
                                    <div class="grouper" contenteditable="true" data_identy=""></div>
                                        <i class="fas fa-caret-down turn"></i>

                                        <div class="list_items">
                                           <ul></ul>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="concepto">Locación</td>
                                    <td class="dato" id="LocationProject"></td>
                                </tr>
                                <tr>
                                    <td class="concepto">Periodo</td>
                                    <td class="dato" id="PeriodProject"></td>
                                </tr>
                                <tr>
                                    <td class="concepto">Tipo de locación</td>
                                    <td class="dato" id="TypeLocation"></td>
                                </tr>
                                <tr>
                                    <td class="concepto">Fecha del proyecto</td>
                                    <td class="dato" id="DateProject"></td>
                                </tr>
                               
                                <tr>
                                    <td class="concepto">Version</td>
                                    <td class="dato" id="version"></td>
                                </tr>
                                <tr>
                                    <td class="concepto"></td>
                                    <td class="enlace"></td>
                                </tr>
                            </table>
                            <button class="btn-add right" id="addProject"> + Agregar proyecto</button>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 blocks">
                        <div class="block_01-02">
                            <div id="tbl_dynamic"></div>
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
                <div class="blocks" id="versions">
                   
                </div>
            </div>


        </div>
            
                
            
        
    </div>

    <!-- Start Lista de productos -->
<div class="box_list_products">
    <div class="sel_product" contenteditable="true" >Producto</div>
    <div class="list_products">
        <ul></ul>
    </div>
</div>
<!-- End Lista de productos -->
</div>

<!-- Start Modales -->
<div class="box_modal_deep">
    <div class="box_modal"></div>
</div>
<!-- End Modales -->




<script src="<?=  PATH_ASSETS . 'lib/functions.js' ?>"></script>
<script src="<?=  PATH_VIEWS . 'Budget/Budget.js' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>