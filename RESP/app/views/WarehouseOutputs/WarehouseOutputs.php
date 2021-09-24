<?php 
	defined('BASEPATH') or exit('No se permite acceso directo'); 
	require ROOT . FOLDER_PATH . "/app/assets/header.php";
?>

<header>
	<?php require ROOT . FOLDER_PATH . "/app/assets/menu.php"; ?>
</header>


<!-- Start Contenedor Listado de PRODUCTOS  -->
    <div class="container-fluid">
        <div class="contenido">
            <div class="row mvst_group">
                <div class="mvst_list tblProdMaster">
                    <div class="row rowTop">
                        <h1>Control Salida de Proyecto</h1>
                     </div>
                    <table class="display compact nowrap"  id="tblProducts" style="min-width: 1480px">
                        <thead>
                            <tr>
                                <th style="width:  30px">Acciones</th>
                                <th style="width: 100px">Tipo Proyecto</th>
                                <th style="width: 320px">Descripcion Proyecto</th>
                                <th style="width:  70px">No. Proyecto</th>
                                <th style="width:  40px">Fecha Inicio</th>
                                <th style="width:  40px">Fecha Final</th>
                                <th style="width:  70px">Hora <br>ultimo cambio</th>
                                <th style="width:  40px">Locacion</th>
                                <th style="width: 100px">Status</th>
                                <th style="width: 100px">ID</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>

                </div>
            </div>
            <div class="deep_loading">
                <div class="flash_loading"> Cargando datos...</div>
            </div>
        </div>
    </div>
<!-- End Contenedor Listado de PRODUCTOS  -->

<!-- Start Ventana modal AGREGA O MODIFICA PRODUCTO -->
<div class="overlay_background overlay_hide"id="ProductModal">
        <div class="overlay_modal">
            <div class="overlay_closer"><span class="title"></span><span class="btn_close">Cerrar</span></div>
            <div class="formButtons">
                <button type="button" class="btn btn-sm btn-primary" id="btn_save">Guardar</button>
            </div>
            <div class="formContent">
                <table id="tblEditProduct">
                    <tr>
                        <td class="concept"><span class="reqsign">*</span> Nombre del producto:</td>
                        <td class="data">
                            <input type="hidden" id="txtPrdId" name="txtPrdId" >
                            <input type="text" id="txtPrdName" name="txtPrdName" class="textbox required" style="width:300px">
                            <span class="fail_note hide"><i class="fas fa-arrow-left"></i> Campo requerido</span>
                            <span class="intructions">&nbsp;</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="concept"><span class="reqsign">*</span> SKU:</td>
                        <td class="data">
                            <input type="text" id="txtPrdSku" name="txtPrdSku" disabled class="textbox" style="width:150px">
                            <span class="fail_note hide"><i class="fas fa-arrow-left"></i> Campo requerido</span>
                            <span class="intructions">SKU del producto</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="concept"><span class="reqsign">&nbsp;</span> Modelo:</td>
                        <td class="data">
                            <input type="text" id="txtPrdModel" name="txtPrdModel" class="textbox" style="width:200px">
                            <span class="fail_note hide"></span>
                            <span class="intructions">Modelo del producto</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="concept"><span class="reqsign">&nbsp;</span> Precio:</td>
                        <td class="data">
                            <input type="text" id="txtPrdPrice" name="txtPrdPrice" class="textbox" style="width:150px">
                            <span class="fail_note hide"></span>
                            <span class="intructions">Precio de renta del producto</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="concept"><span class="reqsign">&nbsp;</span> Código del producto:</td>
                        <td class="data">
                            <input type="text" id="txtPrdCodeProvider" name="txtPrdCodeProvider" class="textbox" style="width:200px">
                            <span class="fail_note hide"></span>
                            <span class="intructions">Código del producto definido por el proveedor</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="concept"><span class="reqsign">&nbsp;</span> Descripción por proveedor:</td>
                        <td class="data">
                            <input type="text" id="txtPrdNameProvider" name="txtPrdCodeProvider" class="textbox" style="width:300px">
                            <span class="fail_note hide"></span>
                            <span class="intructions">Nombre descriptivo segun el proveedor</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="concept"><span class="reqsign">&nbsp;</span> Nombre del producto en inglés:</td>
                        <td class="data">
                            <input type="text" id="txtPrdEnglishName" name="txtPrdEnglishName" class="textbox" style="width:300px">
                            <span class="fail_note hide"></span>
                            <span class="intructions">Nombre del producto identificado en inglés</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="concept"><span class="reqsign">&nbsp;</span> Descripción:</td>
                        <td class="data">
                            <textarea name="txtPrdComments" id="txtPrdComments" class="textbox" style="width:300px" rows="10"></textarea>
                            <span class="fail_note hide"></span>
                            <span class="intructions">Descripción del producto</span>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
<!-- End Ventana modal AGREGA O MODIFICA PRODUCTO -->


<script src="<?=  PATH_ASSETS . 'lib/functions.js' ?>"></script>
<script src="<?=  PATH_VIEWS . 'WarehouseOutputs/WarehouseOutputs.js' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>