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
                        <h1>Productos</h1>
                        <select id="txtCategoryList" class="topList">
                            <option value="0">SELECCIONA CATÁLOGO</option>
                        </select>
                    </div>
                    <table class="display compact nowrap"  id="tblProducts" style="min-width: 1880px">
                        <thead>
                            <tr>
                                <th style="width:  5px"></th>
                                <th style="width:  85px">SKU</th>
                                <th style="width: 350px">Nombre</th>
                                <th style="width:  70px">Precio</th>
                                <th style="width:  40px">Existencias</th>
                                <th style="width:  30px">Tipo</th>
                                <th style="width:  70px">Servicio</th>
                                <th style="width:  50px">Moneda</th>
                                <th style="width:  40px">Ficha<br>Técnica</th>
                                <th style="width: 220px">Subcategoría</th>
                                <th style="width: 220px">Catálogo</th>
                                <th style="width: 350px">Nombre ingles</th>
                                <th style="width: 350px">Descripción según proveedor</th>
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



<!-- Start Ventana modal SERIES -->
    <div class="overlay_background overlay_hide"id="SerieModal">
        <div class="overlay_modal">
            <div class="overlay_closer"><span class="title"></span><span class="btn_close">Cerrar</span></div>
            <table class="display compact nowrap"  id="tblSerialList">
                <thead>
                    <tr>
                        <th style="width:  30px"></th>
                        <th style="width: 100px">SKU</th>
                        <th style="width:  80px">Núm. serie</th>
                        <th style="width: 120px">Fecha de alta</th>
                        <th style="width:  50px">Clave status</th>
                        <th style="width:  50px">Clave etapa</th>
                        <th style="width:  50px">Factura</th>
                        <th style="width:  60px">Existencias</th>
                        <th style="width: 200px">Almacen</th>
                        <th style="width: 350px">Comentarios</th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
<!-- End Ventana modal SERIES -->



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
                        <td class="concept"><span class="reqsign">&nbsp;</span> Moneda:</td>
                        <td class="data">
                            <select id="txtCinId" name="txtCinId" class="textbox required" style="width:200px">
                                <option value="0">Selecciona moneda</option>
                            </select>
                            <span class="fail_note hide"><i class="fas fa-arrow-left"></i> Campo requerido</span>
                            <span class="intructions">Tipo de moneda aplicada al precio</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="concept"><span class="reqsign">&nbsp;</span> Catálogo:</td>
                        <td class="data">
                            <select id="txtCatId" name="txtCatId" class="textbox required" style="width:300px">
                                <option value="0">Selecciona catálogo</option>
                            </select>
                            <span class="fail_note hide"><i class="fas fa-arrow-left"></i> Campo requerido</span>
                            <span class="intructions">Selecciona el catálogo que corresponda al producto</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="concept"><span class="reqsign">&nbsp;</span> Subcategoria:</td>
                        <td class="data">
                            <select id="txtSbcId" name="txtSbcId" class="textbox required" style="width:300px">
                                <option value="0">Selecciona subcategoría</option>
                            </select>
                            <span class="fail_note hide"><i class="fas fa-arrow-left"></i> Campo requerido</span>
                            <span class="intructions">Selecciona la categoría que corresponda al producto</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="concept"><span class="reqsign">&nbsp;</span> Visible:</td>
                        <td class="data">
                            <div id="txtPrdVisibility"  class="checkbox"><i class="far fa-square"></i> </div>
                            <span class="fail_note hide"></span>
                            <span class="intructions">Indica si este producto se mostrará en la lista de precios</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="concept"><span class="reqsign">&nbsp;</span> Accesorio:</td>
                        <td class="data">
                            
                            <div id="txtPrdLevel"  class="checkbox "><i class="far fa-square"></i> <i class="fas fa-check-square"></i></div>
                            <span class="fail_note hide"></span>
                            <span class="intructions">Indica si es un producto o un accesorio</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="concept"><span class="reqsign">&nbsp;</span> Renta sin accesorios:</td>
                        <td class="data">
                            
                            <div id="txtPrdLonely"  class="checkbox"><i class="far fa-square"></i> <i class="fas fa-check-square"></i></div>
                            <span class="fail_note hide"></span>
                            <span class="intructions">Indica si el producto se puede rentar sin accesorios</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="concept"><span class="reqsign">&nbsp;</span> Seguro:</td>
                        <td class="data">
                            
                            <div id="txtPrdAssured"  class="checkbox"><i class="far fa-square"></i> <i class="fas fa-check-square"></i></div>
                            <span class="fail_note hide"></span>
                            <span class="intructions">Indica si aplica seguro en la cotización</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="concept"><span class="reqsign">&nbsp;</span> Tipo de servicio:</td>
                        <td class="data">
                            <select id="txtSrvId" name="txtSrvId" class="textbox required" style="width:260px">
                                <option value="0">Selecciona el tipo de servicio</option>
                            </select>
                            <span class="fail_note hide"><i class="fas fa-arrow-left"></i> Campo requerido</span>
                            <span class="intructions">Selecciona el tipo de servicio, si es para renta o para venta</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="concept"><span class="reqsign">&nbsp;</span> Ficha técnica:</td>
                        <td class="data">
                            <select id="txtDocId" name="txtDocId" class="textbox" style="width:300px">
                                <option value="0">Selecciona la ficha técnica</option>
                            </select>
                            <input type="hidden" id="txtDcpId" name="txtDcpId">
                            <span class="fail_note hide"></span>
                            <span class="intructions">Selecciona la ficha técnica correspondiente al producto</span>
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




<!-- Start Ventana modal AGREGA O MODIFICA PRODUCTO -->
<div class="overlay_background overlay_hide"id="ModifySerieModal">
        <div class="overlay_modal">
            <div class="overlay_closer"><span class="title"></span><span class="btn_close">Cerrar</span></div>
            <div class="formButtons">
                <button type="button" class="btn btn-sm btn-primary" id="btn_save_serie">Guardar</button>
            </div>
            <div class="formContent">
                <table id="tblEditSerie">
                    <tr>
                        <td class="concept"><span class="reqsign"></span> SKU:</td>
                        <td class="data">
                            <input type="hidden" id="txtSerIdSerie" name="txtSerIdSerie" >
                            <input type="text" id="txtSerSkuSerie" name="txtSerSkuSerie" class="textbox" style="width:200px" disabled>
                            <span class="fail_note hide"><i class="fas fa-arrow-left"></i></span>
                            <span class="intructions">Numero de serie del producto</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="concept"><span class="reqsign"></span> Numero de serie:</td>
                        <td class="data">
                            <input type="text" id="txtSerSerialNumber" name="txtSerSerialNumber" class="textbox" style="width:200px">
                            <span class="fail_note hide"><i class="fas fa-arrow-left"></i></span>
                            <span class="intructions">Numero de serie del producto</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="concept"><span class="reqsign"></span> Fecha de Alta:</td>
                        <td class="data">
                            <input type="text" id="txtSerDateRegistry" name="txtSerDateRegistry" disabled class="textbox" style="width:150px"> <i class="fas fa-calendar-alt" id="calendar"></i>
                            <span class="fail_note hide"><i class="fas fa-arrow-left"></i></span>
                            <span class="intructions">Fecha de registro del producto</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="concept"><span class="reqsign">&nbsp;</span> Factura:</td>
                        <td class="data">
                            <select id="txtDocIdSerie" name="txtDocIdSerie" class="textbox" style="width:300px">
                                <option value="0">Selecciona la factura</option>
                            </select>
                            <input type="hidden" id="txtDcpIdSerie" name="txtDcpIdSerie">
                            <span class="fail_note hide"></span>
                            <span class="intructions">Selecciona la factura correspondiente al producto</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="concept"><span class="reqsign">&nbsp;</span> Descripción:</td>
                        <td class="data">
                            <textarea name="txtSerComments" id="txtSerComments" class="textbox" style="width:300px" rows="10"></textarea>
                            <span class="fail_note hide"></span>
                            <span class="intructions">Descripción del producto</span>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
<!-- End Ventana modal AGREGA O MODIFICA PRODUCTO -->




<!-- Start Ventana modal ELIMINA PRODUCTO -->
    <div class="modal fade" id="delProdModal" tabindex="-1" aria-labelledby="BorrarPerfilLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-sm">
                <div class="modal-content">
                <div class="modal-header ">
                </div>
                <div class="modal-body" style="padding: 0px !important;">


                <div class="row">
                    <input type="hidden" class="form-control" id="txtIdProduct" aria-describedby="basic-addon3">
                    <div class="col-12 text-center">
                        <span class="modal-title text-center" style="font-size: 1.2rem;" id="BorrarPerfilLabel">¿Seguro que desea borrarlo?</span>
                    </div>
                </div>

                </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-danger" id="btnDelProduct">Borrar</button>
                    </div>
                </div>
        </div>
    </div>
<!-- End Ventana modal ELIMINA PRODUCTO -->

<script src="<?=  PATH_ASSETS . 'lib/functions.js' ?>"></script>
<script src="<?=  PATH_VIEWS . 'Products/Products.js' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>