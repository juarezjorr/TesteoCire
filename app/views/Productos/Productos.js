var table = null;
var table2 = null;

var positionRow = 0;
var positionRowSKU = 0;

$(document).ready(function () {
    verifica_usuario();
    inicial();
});

function inicial() {
    getProductosTable();
    cargaInicial();

    //Open modal *
    $('#nuevoProducto').on('click', function () {
        LimpiaModal();
        getCategorias();
        getServicios(0);
        getProveedores();
        getAlmacenes();
        $('#formSubCategorias').removeClass('was-validated');
        NomProductoSelect();
    });

    $('#selectRowCategorias').change(function () {
        var idCategoria = $('#selectRowCategorias option:selected').attr('id');
        getSubCategorias(0, idCategoria);
    });

    $('#LimpiarFormulario').on('click', function () {
        LimpiaModal();
        getCategorias();
        getServicios(0);
        getProveedores();
        getAlmacenes();
        $('#formSubCategorias').removeClass('was-validated');
        EnableDisableComun(false);
        EnableDisableExt(false);
    });
    //Guardar almacen *
    $('#GuardarCategoria').on('click', function () {
        if (validaFormulario() == 1) {
            SaveProducto();
        }
    });
    //borra prodcuto +
    $('#BorrarProduct').on('click', function () {
        DeletProducto();
    });

    $('#ProductosTable tbody').on('click', 'tr', function () {
        positionRow = table.page.info().page * table.page.info().length + $(this).index();

        setTimeout(() => {
            RenglonesSelection = table.rows({selected: true}).count();
            if (RenglonesSelection == 0 || RenglonesSelection == 1) {
                $('.btn-apply').css('visibility', 'hidden');
            } else {
                $('.btn-apply').css('visibility', 'visible');
            }
        }, 10);
    });

    $('#SKUTable tbody').on('click', 'tr', function () {
        positionRowSKU = table.page.info().page * table.page.info().length + $(this).index();

        setTimeout(() => {
            RenglonesSelection = table.rows({selected: true}).count();
            if (RenglonesSelection == 0 || RenglonesSelection == 1) {
                $('.btn-apply').css('visibility', 'hidden');
            } else {
                $('.btn-apply').css('visibility', 'visible');
            }
        }, 10);
    });
}

function cargaInicial() {
    LimpiaModal();
    getCategorias();
    getServicios(0);
    getProveedores();
    getAlmacenes();
    getTipoMoneda();
    getDocumentos();
    $('#formSubCategorias').removeClass('was-validated');
    NomProductoSelect();
}

//Valida los campos seleccionado *
function validaFormulario() {
    var valor = 1;
    var forms = document.querySelectorAll('.needs-validation');
    Array.prototype.slice.call(forms).forEach(function (form) {
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            valor = 0;
        }
    });
    return valor;
}

//Edita el Proveedores *
function EditProducto(id, idCategoria, idSubCategoria, idServicio, idAlmacen, idTipoMoneda, idProveedor, idVisible, idStoreProducto) {
    UnSelectRowTable();
    LimpiaModal();
    var location = 'Productos/GetProducto';
    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        data: {id: id},
        url: location,
        success: function (respuesta) {
            $('#NomProducto').val(respuesta.prd_name);
            $('#IdProducto').val(respuesta.prd_id);
            $('#idStoreProducto').val(idStoreProducto);

            $('#NomEngProducto').val(respuesta.prd_english_name);
            $('#ModelProducto').val(respuesta.prd_model);
            $('#SerieProducto').val(respuesta.prd_serial_number);
            $('#CostProducto').val(respuesta.prd_cost);
            $('#PriceProducto').val(respuesta.prd_price);
            $('#SkuProducto').val(respuesta.prd_sku);
            $('#DesProducto').val(respuesta.prd_comments);

            getCategorias(idCategoria);
            getSubCategorias(idSubCategoria, idCategoria);
            getProveedores(idProveedor);
            getServicios(idServicio);
            getAlmacenes(idAlmacen);
            $("#selectMonedaProducto option[id='" + idTipoMoneda + "']").attr('selected', 'selected');
            if (idVisible == 1) {
                $('#checkProducto').prop('checked', true);
            } else {
                $('#checkProducto').prop('checked', false);
            }

            $('#ProductoModal').modal('show');
        },
        error: function (EX) {
            console.log(EX);
        },
    }).done(function () {});
}
//confirm para borrar **
function ConfirmDeletProducto(id) {
    //UnSelectRowTable();
    $('#BorrarProductoModal').modal('show');
    $('#IdProductoBorrar').val(id);
}

function UnSelectRowTable() {
    setTimeout(() => {
        table.rows().deselect();
    }, 10);
}

function UnSelectRowTableSku() {
    setTimeout(() => {
        table2.rows().deselect();
    }, 10);
}

//BORRAR  * *
function DeletProducto() {
    var location = 'Productos/DeleteProducto';
    IdProducto = $('#IdProductoBorrar').val();
    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        data: {
            IdProducto: IdProducto,
        },
        url: location,
        success: function (respuesta) {
            if ((respuesta = 1)) {
                getProductosTable();
                $('#BorrarProductoModal').modal('hide');
            }
        },
        error: function (EX) {
            console.log(EX);
        },
    }).done(function () {});
}

function addZeroNumber(number, length) {
    var my_string = '' + number;
    var largo = my_string.length;
    if (largo > length) {
        var restar = largo - length;
        my_string = my_string.substring(restar, largo);
    }
    while (my_string.length < length) {
        my_string = '0' + my_string;
    }
    return my_string;
}

//Guardar Almacen **
function SaveProducto() {
    var location = 'Productos/SaveProductos';

    var IdProducto = $('#IdProducto').val();
    var NomProducto = $('#NomProducto').val();
    var NomEngProducto = $('#NomEngProducto').val();
    /*         var ModelProducto = $('#ModelProducto').val();
     */ var SerieProducto = $('#SerieProducto').val();
    var CostProducto = $('#CostProducto').val();
    var PriceProducto = $('#PriceProducto').val();
    var DesProducto = $('#DesProducto').val();
    var idStoreProducto = $('#idStoreProducto').val();

    var esUnico = $('#esUnico').val();

    var idMoneda = $('#selectMonedaProducto option:selected').attr('id');
    var idCategoria = $('#selectRowCategorias option:selected').attr('id');
    var idSubCategoria = $('#selectRowSubCategorias option:selected').attr('id');
    var idTipeService = $('#selectRowService option:selected').attr('id');
    var idProveedor = $('#selectRowProovedores option:selected').attr('id');
    var idAlmacen = $('#selectRowAlmacen option:selected').attr('id');
    var idDocumento = $('#selectRowDocument option:selected').attr('id');

    var visible = 0;
    var rentSinAccesorios = 0;

    if ($('#checkProducto').prop('checked')) {
        visible = 1;
    }
    if ($('#checkRentAccesories').prop('checked')) {
        rentSinAccesorios = 1;
    }

    var idbehaviour = $('input[name="ventOrRent"]:checked').val();

    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        data: {
            IdProducto: IdProducto,
            NomProducto: NomProducto,
            NomEngProducto: NomEngProducto,
            SerieProducto: SerieProducto,
            CostProducto: CostProducto,
            PriceProducto: PriceProducto,
            DesProducto: DesProducto,
            idSubCategoria: idSubCategoria,
            idTipeService: idTipeService,
            idProveedor: idProveedor,
            idMoneda: idMoneda,
            visible: visible,
            idAlmacen: idAlmacen,
            idStoreProducto: idStoreProducto,
            idDocumento: idDocumento,
            idCategoria: idCategoria,
            rentSinAccesorios: rentSinAccesorios,
            idbehaviour: idbehaviour,
            esUnico: esUnico,
        },
        url: location,
        success: function (respuesta) {
            console.log(respuesta);
            if ((respuesta = 1)) {
                getProductosTable();
                $('#ProductoModal').modal('hide');
                LimpiaModal();
                EnableDisableComun(false);
            }
            $('#titulo').text('Nuevo Producto');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
        },
    }).done(function () {});
}

//Limpia datos en modal  **
function LimpiaModal() {
    $('#NomProducto').val('');
    $('#IdProducto').val('');
    $('#NomEngProducto').val('');
    $('#ModelProducto').val('');
    $('#SerieProducto').val('');
    $('#CostProducto').val('');
    $('#PriceProducto').val('');
    $('#SkuProducto').val('');
    $('#DesProducto').val('');
    $('#selectRowSubCategorias').html('');
    $('#selectMonedaProducto').val('0');
    $('#checkProducto').prop('checked', true);
    $('#selectRowCategorias').val('0');
    $('#selectRowSubCategorias').val('0');
    $('#selectRowService').val('0');
    $('#selectRowProovedores').val('0');
    $('#selectRowAlmacen').val('0');
    $('#selectRowDocument').val('0');
    $('#titulo').text('Nuevo Producto');
}

// Optiene las categorias *
function getCategorias(id) {
    $('#selectRowCategorias').html('');
    var location = 'Categorias/GetCategorias';
    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        url: location,
        success: function (respuesta) {
            var renglon = "<option id='0'  value='0'>Seleccione...</option> ";
            respuesta.forEach(function (row, index) {
                renglon += '<option id=' + row.cat_id + '  value="' + row.cat_id + '">' + row.cat_name + '</option> ';
            });
            $('#selectRowCategorias').append(renglon);
            if (id != '') {
                $("#selectRowCategorias option[id='" + id + "']").attr('selected', 'selected');
            }
        },
        error: function () {},
    }).done(function () {});
}

// Optiene las Sub subcategorias *
function getSubCategorias(id, idCategoria) {
    $('#selectRowSubCategorias').html('');
    var location = 'SubCategorias/GetSubCategorias';
    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        data: {id: id, idCategoria: idCategoria},
        url: location,
        success: function (respuesta) {
            var renglon = "<option id='0'  value='0'>Seleccione...</option> ";
            if (respuesta[0].cat_id != 0) {
                respuesta.forEach(function (row, index) {
                    renglon += '<option id=' + row.sbc_id + '  value="">' + row.sbc_name + '</option> ';
                });
            }

            $('#selectRowSubCategorias').append(renglon);
            if (idCategoria != '') {
                $("#selectRowSubCategorias option[id='" + id + "']").attr('selected', 'selected');
            }
        },
        error: function () {},
    }).done(function () {});
}

// Optiene las Servicios *
function getServicios(id) {
    $('#selectRowService').html('');
    var location = 'Servicios/GetServicios';
    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        url: location,
        success: function (respuesta) {
            var renglon = "<option id='0'  value='0'>Seleccione...</option> ";
            respuesta.forEach(function (row, index) {
                renglon += '<option id=' + row.srv_id + '  value="' + row.srv_id + '">' + row.srv_name + '</option> ';
            });
            $('#selectRowService').append(renglon);

            if (id != '') {
                $("#selectRowService option[id='" + id + "']").attr('selected', 'selected');
            }
        },
        error: function () {},
    }).done(function () {});
}

// Optiene las proveedores *
function getProveedores(id) {
    $('#selectRowProovedores').html('');
    var location = 'Proveedores/GetProveedores';
    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        url: location,
        success: function (respuesta) {
            //console.log(respuesta);
            var renglon = "<option id='0'  value='0'>Seleccione...</option> ";
            respuesta.forEach(function (row, index) {
                renglon += '<option id=' + row.sup_id + '  value="' + row.sup_id + '">' + row.sup_business_name + '</option> ';
            });
            $('#selectRowProovedores').append(renglon);

            if (id != '') {
                $("#selectRowProovedores option[id='" + id + "']").attr('selected', 'selected');
            }
        },
        error: function () {},
    }).done(function () {});
}

// Optiene las proveedores *
function getAlmacenes(id) {
    $('#selectRowAlmacen').html('');
    var location = 'Almacenes/GetAlmacenes';
    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        url: location,
        success: function (respuesta) {
            var renglon = "<option id='0'  value='0'>Seleccione...</option> ";
            respuesta.forEach(function (row, index) {
                renglon += '<option id=' + row.str_id + '  value="">' + row.str_name + '</option> ';
            });
            $('#selectRowAlmacen').append(renglon);
            if (id != '') {
                $("#selectRowAlmacen option[id='" + id + "']").attr('selected', 'selected');
            }
        },
        error: function () {},
    }).done(function () {});
}

function getAlmacenesSku(id) {
    $('#selectRowAlmacenSku').html('');
    var location = 'Almacenes/GetAlmacenes';
    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        url: location,
        success: function (respuesta) {
            var renglon = "<option id='0'  value='0'>Seleccione...</option> ";
            respuesta.forEach(function (row, index) {
                renglon += '<option id=' + row.str_id + '  value="">' + row.str_name + '</option> ';
            });
            $('#selectRowAlmacenSku').append(renglon);
            if (id != '') {
                $("#selectRowAlmacenSku option[id='" + id + "']").attr('selected', 'selected');
            }
        },
        error: function () {},
    }).done(function () {});
}

// Optiene las documentos *
function getDocumentos(id) {
    $('#selectRowDocument').html('');
    var location = 'Documentos/GetDocumentos';
    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        url: location,
        success: function (respuesta) {
            var renglon = "<option id='0'  value='0'>Seleccione...</option> ";
            respuesta.forEach(function (row, index) {
                renglon += '<option id=' + row.doc_id + '  value="' + row.doc_id + '">' + row.doc_code + '-' + row.doc_name + '</option> ';
            });
            $('#selectRowDocument').append(renglon);
            if (id != '') {
                $("#selectRowDocument option[id='" + id + "']").attr('selected', 'selected');
            }
        },
        error: function () {},
    }).done(function () {});
}

function getProductosTable() {
    var location = 'Productos/GetProductos';
    $('#ProductosTable').DataTable().destroy();
    $('#tablaProductosRow').html('');

    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        url: location,
        _success: function (respuesta) {
            //console.log(respuesta);
            respuesta.forEach(function (row, index) {
                renglon =
                    '<tr>' +
                    '<td class="text-center edit"> ' +
                    "<button onclick='getInfoComunByID(" +
                    row.prd_id +
                    ',1,' +
                    row.extNum +
                    ',' +
                    row.prd_id +
                    ")' type='button' class='btn btn-default btn-icon-edit' aria-label='Left Align'><i class='fas fa-pen modif'></i></button>" +
                    '<button onclick="ConfirmDeletProducto(' +
                    row.prd_id +
                    ')" type="button" class="btn btn-default btn-icon-delete" aria-label="Left Align"><i class="fas fa-times-circle kill"></i></button>' +
                    '</td>' +
                    "<td class='dtr-control text-center' hidden>" +
                    row.prd_id +
                    '</td>' +
                    '<td >' +
                    row.prd_name +
                    '</td>' +
                    '<td >' +
                    row.prd_english_name +
                    '</td>' +
                    '<td >' +
                    row.prd_model +
                    '</td>' +
                    '<td >' +
                    row.prd_price +
                    '</td>' +
                    '<td >' +
                    row.prd_comments +
                    '</td>' +
                    '<td >' +
                    row.srv_name +
                    '</td>' +
                    '<td >' +
                    row.cat_name +
                    '</td>' +
                    '<td >' +
                    row.sbc_name +
                    '</td>' +
                    "<td class='quantity'>" +
                    '<span onclick=skuByID(' +
                    row.prd_id +
                    ')>' +
                    row.extNum +
                    '</span>' +
                    '</td>' +
                    +'</tr>';
                $('#tablaProductosRow').append(renglon);
            });

            let title = 'Productos';
            let filename = title.replace(/ /g, '_') + '-' + moment(Date()).format('YYYYMMDD');

            table = $('#ProductosTable').DataTable({
                order: [[1, 'asc']],
                select: {
                    style: 'multi',
                    info: false,
                },
                lengthMenu: [
                    [10, 25, 50, 100, -1],
                    ['10', '25', '50', 'Todo'],
                ],
                dom: 'Blfrtip',
                buttons: [
                    {
                        extend: 'pdf',
                        footer: true,
                        title: title,
                        filename: filename,
                        text: '<button class="btn btn-pdf"><i class="fas fa-file-pdf"></i></button>',
                    },
                    {
                        extend: 'excel',
                        footer: true,
                        title: title,
                        filename: filename,
                        text: '<button class="btn btn-excel"><i class="fas fa-file-excel"></i></button>',
                    },

                    {
                        extend: 'print',
                        footer: true,
                        title: title,
                        filename: filename,
                        text: '<button class="btn btn-print"><i class="fas fa-print"></i></button>',
                    },
                    {
                        text: 'Borrar seleccionados',
                        className: 'btn-apply',
                        action: function () {
                            var selected = table.rows({selected: true}).data();
                            var idSelected = '';
                            selected.each(function (index) {
                                idSelected += index[1] + ',';
                            });
                            idSelected = idSelected.slice(0, -1);
                            if (idSelected != '') {
                                ConfirmDeletProducto(idSelected);
                            }
                        },
                    },
                ],
                scrollY: 'calc(100vh - 260px)',
                scrollX: true,
                paging: true,
                pagingType: 'simple_numbers',
                fixedHeader: true,
                language: {
                    url: './app/assets/lib/dataTable/spanish.json',
                },
            });
            $('.SKU').on('click', function () {
                UnSelectRowTable();
            });
        },
        get success() {
            return this._success;
        },
        set success(value) {
            this._success = value;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
        },
    }).done(function () {});
}

function getTipoMoneda(id) {
    $('#selectMonedaProducto').html('');
    var location = 'Productos/GetTipoMoneda';
    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        data: {id: id},
        url: location,
        success: function (respuesta) {
            var renglon = "<option id='0'  value='0'>Seleccione...</option> ";
            respuesta.forEach(function (row, index) {
                renglon += '<option id=' + row.ext_id + '  value="' + row.ext_id + '">' + row.ext_name + '</option> ';
            });
            $('#selectMonedaProducto').append(renglon);
            if (id != undefined) {
                $("#selectMonedaProducto option[value='" + id + "']").attr('selected', 'selected');
            }
        },
        error: function () {},
    }).done(function () {});
}

function NomProductoSelect(id) {
    $('#NomProductoSelect').html('');
    var location = 'Productos/GetAutoComplete';
    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        data: {id: id},
        url: location,
        success: function (respuesta) {
            var renglon = "<option id='0'  value='0'>Seleccione...</option> ";
            respuesta.forEach(function (row, index) {
                renglon += '<option id=' + row.nombre + '  value="' + row.nombre + '">' + row.nombre + '</option> ';
            });
            $('#NomProductoSelect').append(renglon);
            if (id != undefined) {
                $("#NomProductoSelect option[value='" + id + "']").attr('selected', 'selected');
            }
        },
        error: function () {},
    }).done(function () {});
}

$(document).ready(function () {
    $('#NomProducto').on('keyup', function () {
        var key = $(this).val();
        var dataString = 'key=' + key;
        var location = 'Productos/GetAutoComplete';
        $.ajax({
            type: 'POST',
            url: location,
            dataType: 'JSON',
            data: dataString,
            success: function (respuesta) {
                var renglon = '';
                if (respuesta[0].prd_name != 0) {
                    respuesta.forEach(function (row, index) {
                        renglon += '<div><a class="suggest-element" data="' + row.prd_name + '" id="' + row.prd_name + '">' + row.prd_name + '</a></div>';
                    });
                }
                $('#suggestions').fadeIn(500).html(renglon);
                $('.suggest-element').on('click', function () {
                    var id = $(this).attr('id');
                    $('#NomProducto').val(id);
                    $('#suggestions').fadeOut(500);
                    getInfoComun(id, 1);
                    return false;
                });
            },
        });
    });
});

function getInfoComun(nombreDocument, productoComun, cantidadSKU, idproducto) {
    UnSelectRowTable();
    EnableDisableComun(false);
    EnableDisableExt(false);
    if (idproducto != '') {
        $('#IdProducto').val(idproducto);
    }
    $('#NomProductoSelect').html('');
    var location = 'Productos/getInfoComun';
    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        data: {nombreDocument: nombreDocument},
        url: location,
        success: function (respuesta) {
            //console.log(respuesta);
            setTimeout(() => {
                $('#selectMonedaProducto option[value=' + respuesta[0].prd_coin_type + ']').prop('selected', true);
                getSubCategorias(respuesta[0].sbc_id, respuesta[0].cat_id);
                getDocumentos(respuesta[0].doc_id);
                $('#selectRowCategorias option[value=' + respuesta[0].cat_id + ']').prop('selected', true);
                $('#selectRowService option[value=' + respuesta[0].srv_id + ']').prop('selected', true);
                $('#selectRowProovedores option[value=' + respuesta[0].sup_id + ']').prop('selected', true);
            }, 500);
            $('#NomProducto').val(nombreDocument);
            $('#DesProducto').val(respuesta[0].prd_comments);
            $('#NomEngProducto').val(respuesta[0].prd_english_name);
            $('#ModelProducto').val(respuesta[0].prd_model);
            $('#PriceProducto').val(respuesta[0].prd_price);
            if (respuesta[0].prd_visibility == 1) {
                $('#checkProducto').prop('checked', true);
            } else {
                $('#checkProducto').prop('checked', false);
            }
            if (1 >= cantidadSKU) {
            } else {
                EnableDisableComun(true);
            }

            $('#titulo').text('Nuevo Producto');
        },
        error: function () {},
    }).done(function () {});
}

function getInfoComunByID(idDocument, productoComun, cantidadSKU, idproducto) {
    UnSelectRowTable();
    EnableDisableComun(false);
    EnableDisableExt(false);
    if (idproducto != '') {
        $('#IdProducto').val(idproducto);
    }
    console.log(cantidadSKU);
    if (1 >= cantidadSKU) {
        var location = 'Productos/getInfoComunByIDFull';
    } else {
        var location = 'Productos/getInfoComunByID';
    }
    $('#NomProductoSelect').html('');
    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        data: {idDocument: idDocument},
        url: location,
        success: function (respuesta) {
            setTimeout(() => {
                $('#selectMonedaProducto option[value=' + respuesta[0].prd_coin_type + ']').prop('selected', true);
                getSubCategorias(respuesta[0].sbc_id, respuesta[0].cat_id);
                getDocumentos(respuesta[0].doc_id);
                $('#selectRowCategorias option[value=' + respuesta[0].cat_id + ']').prop('selected', true);
                $('#selectRowService option[value=' + respuesta[0].srv_id + ']').prop('selected', true);
                $('#selectRowProovedores option[value=' + respuesta[0].sup_id + ']').prop('selected', true);
            }, 500);
            $('#NomProducto').val(respuesta[0].prd_name);
            $('#DesProducto').val(respuesta[0].prd_comments);
            $('#NomEngProducto').val(respuesta[0].prd_english_name);
            $('#ModelProducto').val(respuesta[0].prd_model);
            $('#PriceProducto').val(respuesta[0].prd_price);
            if (respuesta[0].prd_visibility == 1) {
                $('#checkProducto').prop('checked', true);
            } else {
                $('#checkProducto').prop('checked', false);
            }

            if (productoComun == 1) {
                if (1 >= cantidadSKU) {
                    $('#esUnico').val(1);
                    getAlmacenes(respuesta[0].str_id);
                    $('#SerieProducto').val(respuesta[0].ser_serial_number);
                    $('#CostProducto').val(respuesta[0].ser_cost);
                    if (respuesta[0].ser_lonely == 1) {
                        $('#checkRentAccesories').prop('checked', true);
                    } else {
                        $('#checkRentAccesories').prop('checked', false);
                    }
                    if (respuesta[0].ser_behaviour == 'C') {
                        $('#ventOrRent1').prop('checked', true);
                    } else {
                        $('#ventOrRent2').prop('checked', false);
                    }
                } else {
                    $('#esUnico').val(0);
                    $('#selectRowAlmacen').val('0');
                    $('#SerieProducto').val('');
                    $('#CostProducto').val('');
                    EnableDisableExt(true);
                }
            } else {
                EnableDisableComun(true);
            }
            $('#titulo').text('Editar Producto');
        },
        error: function () {},
    }).done(function () {});
}

function editBySku(idSerie) {
    UnSelectRowTableSku();
    $('#collapseExample').collapse('show');
    var location = 'Productos/GetInfoSkuById';
    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        data: {id: idSerie},
        url: location,
        success: function (respuesta) {
            $('#idSku').val(idSerie);
            $('#SerieSku').val(respuesta[0].ser_serial_number);
            $('#CostSku').val(respuesta[0].ser_cost);
            if (respuesta[0].ser_lonely == 1) {
                $('#checkRentAccesoriesSku').prop('checked', true);
            } else {
                $('#checkRentAccesoriesSku').prop('checked', false);
            }
            if (respuesta[0].ser_behaviour == 'C') {
                $('#ventOrRentSku1').prop('checked', true);
            } else {
                $('#ventOrRentSku2').prop('checked', true);
            }
            getAlmacenesSku(respuesta[0].str_id);
        },
        error: function () {},
    }).done(function () {});
}

function DeletSKU(idSku) {
    var location = 'Productos/DeleteSku';
    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        data: {
            idSku: idSku,
        },
        url: location,
        success: function (respuesta) {
            table2
                .row(':eq(' + positionRow + ')')
                .remove()
                .draw();
        },
        error: function (EX) {
            console.log(EX);
        },
    }).done(function () {});
}

function skuByID(idProduct) {
    UnSelectRowTable();
    $('#collapseExample').collapse('hide');
    $('#SKUTable').DataTable().destroy();
    $('#tablaSKURow').html('');
    var location = 'Productos/GetSkuById';
    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        data: {id: idProduct},
        url: location,
        success: function (respuesta) {
            respuesta.forEach(function (row, index) {
                renglon =
                    '<tr>' +
                    '<td class="text-center edit"> ' +
                    "<button onclick='editBySku(" +
                    row.ser_id +
                    ")' type='button' class='btn btn-default btn-icon-edit' aria-label='Left Align'><i class='fas fa-pen modif'></i></button>" +
                    '<button onclick="DeletSKU(' +
                    row.ser_id +
                    ')" type="button" class="btn btn-default btn-icon-delete" aria-label="Left Align"><i class="fas fa-times-circle kill"></i></button>' +
                    '</td>' +
                    "<td class='dtr-control text-center'>" +
                    row.ser_sku.slice(0, 7) +
                    '-' +
                    row.ser_sku.slice(7, 11) +
                    '-' +
                    row.ser_sku.slice(11, 14) +
                    '</td>' +
                    '<td >' +
                    row.ser_serial_number +
                    '</td>' +
                    '<td >' +
                    row.ser_cost +
                    '</td>' +
                    '<td >' +
                    row.ser_date_registry +
                    '</td>' +
                    '<td >' +
                    row.ser_lonely_name +
                    '</td>' +
                    '<td >' +
                    row.ser_behaviour_name +
                    '</td>' +
                    +'</tr>';
                $('#tablaSKURow').append(renglon);
            });
            let title = 'Productos';
            let filename = title.replace(/ /g, '_') + '-' + moment(Date()).format('YYYYMMDD');
            table2 = $('#SKUTable').DataTable({
                order: [[1, 'asc']],
                select: {
                    style: 'multi',
                    info: false,
                },
                lengthMenu: [
                    [10, 25, 50, 100, -1],
                    ['10', '25', '50', 'Todo'],
                ],
                dom: 'Blfrtip',
                buttons: [
                    {
                        extend: 'pdf',
                        footer: true,
                        title: title,
                        filename: filename,
                        text: '<button class="btn btn-pdf"><i class="fas fa-file-pdf"></i></button>',
                    },
                    {
                        extend: 'excel',
                        footer: true,
                        title: title,
                        filename: filename,
                        text: '<button class="btn btn-excel"><i class="fas fa-file-excel"></i></button>',
                    },

                    {
                        extend: 'print',
                        footer: true,
                        title: title,
                        filename: filename,
                        text: '<button class="btn btn-print"><i class="fas fa-print"></i></button>',
                    },
                    {
                        text: 'Borrar seleccionados',
                        className: 'btn-apply',
                        action: function () {
                            var selected = table2.rows({selected: true}).data();
                            var idSelected = '';
                            selected.each(function (index) {
                                idSelected += index[1] + ',';
                            });
                            idSelected = idSelected.slice(0, -1);
                            if (idSelected != '') {
                                ConfirmDeletProducto(idSelected);
                            }
                        },
                    },
                ],
                scrollY: 'calc(100vh - 260px)',
                scrollX: true,
                paging: true,
                pagingType: 'simple_numbers',
                fixedHeader: true,
                language: {
                    url: './app/assets/lib/dataTable/spanish.json',
                },
            });
            //$("#modalSKU").modal('show');

            $('.overlay_background').removeClass('overlay_hide');
            $('.btn_close')
                .unbind('click')
                .on('click', function () {
                    $('#collapseExample').collapse('hide');

                    $('.overlay_background').addClass('overlay_hide');
                });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
        },
    }).done(function () {});
}

function SaveSku() {
    var location = 'Productos/SaveSku';
    var idSku = $('#idSku').val();
    var serieSku = $('#SerieSku').val();
    var costSku = $('#CostSku').val();
    var rentSinAccesorios = 0;
    if ($('#checkRentAccesoriesSku').prop('checked')) {
        rentSinAccesorios = 1;
    }
    var idbehaviour = $('input[name="ventOrRentSku"]:checked').val();
    var idAlmacenSku = $('#selectRowAlmacenSku option:selected').attr('id');

    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        data: {idSku: idSku, serieSku: serieSku, costSku: costSku, rentSinAccesorios: rentSinAccesorios, idbehaviour: idbehaviour, idAlmacenSku: idAlmacenSku},
        url: location,
        success: function (respuesta) {
            if (respuesta != 0) {
                $('#collapseExample').collapse('hide');
            }
            table2
                .row(':eq(' + positionRow + ')')
                .remove()
                .draw();
            if (respuesta != 0) {
                var rowNode = table2.row
                    .add({
                        [0]:
                            '<button onclick="editBySku(' +
                            respuesta[0].ser_id +
                            ')" type="button" class="btn btn-default btn-icon-edit" aria-label="Left Align"><i class="fas fa-pen modif"></i></button><button onclick="DeletSKU(' +
                            respuesta[0].ser_id +
                            ')" type="button" class="btn btn-default btn-icon-delete" aria-label="Left Align"><i class="fas fa-times-circle kill"></i></button>',
                        [1]: respuesta[0].ser_sku,
                        [2]: respuesta[0].ser_serial_number,
                        [3]: respuesta[0].ser_cost,
                        [4]: respuesta[0].ser_date_registry,
                        [5]: respuesta[0].ser_lonely_name,
                        [6]: respuesta[0].ser_behaviour_name,
                    })
                    .draw()
                    .node();
                $(rowNode).find('td').eq(0).addClass('edit');
                $(rowNode).find('td').eq(1).addClass('text-center');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
        },
    }).done(function () {});
}

function EnableDisableComun(estatus) {
    $('#NomEngProducto').prop('disabled', estatus);
    $('#selectMonedaProducto').prop('disabled', estatus);
    $('#DesProducto').prop('disabled', estatus);
    $('#ModelProducto').prop('disabled', estatus);
    $('#PriceProducto').prop('disabled', estatus);
    $('#checkProducto').prop('disabled', estatus);
    $('#selectRowSubCategorias').prop('disabled', estatus);
    $('#selectRowCategorias').prop('disabled', estatus);
    $('#selectRowService').prop('disabled', estatus);
    $('#selectRowProovedores').prop('disabled', estatus);
    $('#selectRowDocument').prop('disabled', estatus);
}

function EnableDisableExt(estatus) {
    $('#selectRowAlmacen').prop('disabled', estatus);
    $('#SerieProducto').prop('disabled', estatus);
    $('#CostProducto').prop('disabled', estatus);
    $('#checkRentAccesories').prop('disabled', estatus);
    $('#ventOrRent1').prop('disabled', estatus);
    $('#ventOrRent2').prop('disabled', estatus);
}
