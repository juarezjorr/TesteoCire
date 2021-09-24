var seccion = '';
///const folio = uuidv4();
let folio;
let = pr = [];
let = link = '';

$(document).ready(function () {
    // folio = getFolio();
    verifica_usuario();
    inicial();
});

function inicial() {
    getExchange();
    getStores();
    getSuppliers();
    getInvoice();
    getCoins();
    getProducts();
    setting_table();
    $('#btn_exchange').on('click', function () {
        exchange_apply(0);
    });

    $('#txtCost').on('blur', function () {
        validator();
    });
    $('#txtSerie').on('blur', function () {
        validator();
    });
}
// Setea de la tabla
function setting_table() {
    let title = 'Entradas de Almacen';
    let filename = title.replace(/ /g, '_') + '-' + moment(Date()).format('YYYYMMDD');

    $('#tblExchanges').DataTable({
        order: [[0, 'desc']],
        dom: 'Blfrtip',
        buttons: [
            {
                //Botón para Excel
                extend: 'excel',
                footer: true,
                title: title,
                filename: filename,

                //Aquí es donde generas el botón personalizado
                text: '<button class="btn btn-excel"><i class="fas fa-file-excel"></i></button>',
            },
            {
                //Botón para PDF
                extend: 'pdf',
                footer: true,
                title: title,
                filename: filename,

                //Aquí es donde generas el botón personalizado
                text: '<button class="btn btn-pdf"><i class="fas fa-file-pdf"></i></button>',
            },
            {
                //Botón para imprimir
                extend: 'print',
                footer: true,
                title: title,
                filename: filename,

                //Aquí es donde generas el botón personalizado
                text: '<button class="btn btn-print"><i class="fas fa-print"></i></button>',
            },
            {
                // Boton aplicar cambios
                text: 'Aplicar movimientos',
                className: 'btn-apply hidden-field',
                action: function (e, dt, node, config) {
                    read_exchange_table();
                },
            },
        ],
        pagingType: 'simple_numbers',
        language: {
            url: 'app/assets/lib/dataTable/spanish.json',
        },
        scrollY: 'calc(100vh - 260px)',
        scrollX: true,
        fixedHeader: true,
        columns: [
            {data: 'editable', class: 'edit'},
            {data: 'prod_sku', class: 'sku'},
            {data: 'prodname', class: 'product-name'},
            {data: 'prodcant', class: 'quantity'},
            {data: 'prodcost', class: 'price'},
            {data: 'prodseri', class: 'serie-product'},
            {data: 'codexcsc', class: 'code-type_s'},
            {data: 'stnamesc', class: 'store-name_s'},
            {data: 'comments', class: 'comments'},
        ],
    });
}

// Solicita los tipos de movimiento
function getExchange() {
    var pagina = 'MoveStoresIn/listExchange';
    var par = '[{"parm":""}]';
    var tipo = 'json';
    var selector = putTypeExchange;
    fillField(pagina, par, tipo, selector);
}
// Solicita el listado de almacenes
function getStores() {
    var pagina = 'MoveStoresIn/listStores';
    var par = '[{"parm":""}]';
    var tipo = 'json';
    var selector = putStores;
    fillField(pagina, par, tipo, selector);
}
// Solicita los provedores
function getSuppliers() {
    var pagina = 'MoveStoresIn/listSuppliers';
    var par = `[{"store":""}]`;
    var tipo = 'json';
    var selector = putSuppliers;
    fillField(pagina, par, tipo, selector);
}
// Solicita los documentos factura
function getInvoice() {
    var pagina = 'MoveStoresIn/listInvoice';
    var par = `[{"store":""}]`;
    var tipo = 'json';
    var selector = putInvoice;
    fillField(pagina, par, tipo, selector);
}
// Solicita los documentos factura
function getCoins() {
    var pagina = 'MoveStoresIn/listCoins';
    var par = `[{"store":""}]`;
    var tipo = 'json';
    var selector = putCoins;
    fillField(pagina, par, tipo, selector);
}
// Solicita los productos de un almacen seleccionado
function getProducts() {
    var pagina = 'MoveStoresIn/listProducts';
    var par = `[{"store":""}]`;
    var tipo = 'json';
    var selector = putProducts;
    fillField(pagina, par, tipo, selector);
}
// Solicita los movimientos acurridos
function getExchanges() {
    var pagina = 'MoveStoresIn/listExchanges';
    var par = `[{"folio":"${folio}"}]`;
    var tipo = 'json';
    var selector = putExchanges;
    fillField(pagina, par, tipo, selector);
}
/*  LLENA LOS DATOS DE LOS ELEMENTOS */
// Dibuja los tipos de movimiento
function putTypeExchange(dt) {
    if (dt[0].ext_id != 0) {
        $.each(dt, function (v, u) {
            if (u.ext_elements.substring(0, 1) != '0') {
                let H = `<option value="${u.ext_id}" data-content="${u.ext_code}|${u.ext_type}|${u.ext_link}|${u.ext_code_a}|${u.ext_type_a}|${u.ext_elements}">${u.ext_code} - ${u.ext_description}</option>`;
                $('#txtTypeExchange').append(H);
            }
        });
    }
    $('#txtTypeExchange').on('change', function () {
        let id = $(this).val();
        link = $(`#txtTypeExchange option[value="${id}"]`).attr('data-content').split('|')[2];
        code = $(`#txtTypeExchange option[value="${id}"]`).attr('data-content').split('|')[5];
        setting_interface(code);
        relocation_products();
        validator();
    });
}
/**  ++++++  configura la interfasede inputs requeridos */
function setting_interface(code) {
    code.substring(1, 2) == '0' ? $('.pos1').addClass('hide-items') : $('.pos1').removeClass('hide-items');
    code.substring(2, 3) == '0' ? $('.pos2').addClass('hide-items') : $('.pos2').removeClass('hide-items');
    code.substring(3, 4) == '0' ? $('.pos3').addClass('hide-items') : $('.pos3').removeClass('hide-items');
    code.substring(4, 5) == '0' ? $('.pos4').addClass('hide-items') : $('.pos4').removeClass('hide-items');
    code.substring(5, 6) == '0' ? $('.pos5').addClass('hide-items') : $('.pos5').removeClass('hide-items');
    code.substring(6, 7) == '0' ? $('.pos6').addClass('hide-items') : $('.pos6').removeClass('hide-items');
}

// Dibuja los almacenes
function putStores(dt) {
    if (dt[0].str_id != 0) {
        $.each(dt, function (v, u) {
            let H = `<option value="${u.str_id}">${u.str_name}</option>`;
            $('#txtStoreSource').append(H);
        });
    }

    $('#txtStoreSource').on('change', function () {
        validator();
    });
}

function putSuppliers(dt) {
    if (dt[0].sup_id != 0) {
        $.each(dt, function (v, u) {
            let H = `<option value="${u.sup_id}">${u.sup_business_name}</option>`;
            $('#txtSuppliers').append(H);
        });
    }

    $('#txtSuppliers').on('change', function () {
        validator();
    });
}

function putInvoice(dt) {
    if (dt[0].doc_id != 0) {
        $.each(dt, function (v, u) {
            let H = `<option value="${u.doc_id}">${u.doc_name}</option>`;
            $('#txtInvoice').append(H);
        });
    }

    $('#txtInvoice').on('change', function () {
        validator();
    });
}

function putCoins(dt) {
    if (dt[0].cin_id != 0) {
        $.each(dt, function (v, u) {
            let H = `<option value="${u.cin_id}">${u.cin_code} - ${u.cin_name}</option>`;
            $('#txtCoin').append(H);
        });
    }

    $('#txtCoin').on('change', function () {
        validator();
    });
}

// Almacena los registros de productos en un arreglo
function putProducts(dt) {
    var ps = $('#txtProducts').offset();

    $('.list-group').css({top: ps.top + 40 + 'px'});
    $('.list-group').slideUp('100', function () {
        $('#listProducts').html('');
    });

    $.each(dt, function (v, u) {
        let H = `<div class="list-item" id="P-${u.prd_id}" data_serie="${u.serNext}" data_complement="${u.prd_sku}|${u.prd_name}">${u.prd_name}</div>`;
        $('#listProducts').append(H);
    });

    $('#txtProducts').on('focus', function () {
        $('.list-group').slideDown('slow');
    });

    $('#txtProducts').keyup(function (e) {
        var res = $(this).val().toUpperCase();
        if (res == '') {
            $('.list-group').slideUp(100);
        } else {
            $('.list-group').slideDown(400);
        }
        res = omitirAcentos(res);
        sel_products(res);
    });

    $('.list-group .list-item').on('click', function () {
        let prdNm = $(this).html();
        let prdId = $(this).attr('id') + '|' + $(this).attr('data_complement');
        let serie = $(this).attr('data_serie');
        $('#txtProducts').val(prdNm);
        $('#txtIdProducts').val(prdId);
        $('#txtNextSerie').val(serie);
        $('#txtPrice').val($(this).attr('data_complement').split('|')[3]);
        $('#txtCoinType').val($(this).attr('data_complement').split('|')[4]);
        $('.list-group').slideUp(100);
        validator();
    });
}
// reubica el input de los productos
function relocation_products() {
    var ps = $('#txtProducts').offset();

    $('.list-group').css({top: ps.top + 35 + 'px'});
}

// Valida los campos
function validator() {
    let ky = 0;
    let msg = '';

    if ($('#txtTypeExchange').val() == 0) {
        ky = 1;
        msg += 'Debes seleccionar un tipo de movimiento';
    }

    if ($('#txtStoreSource').val() == 0 && $('.pos1').attr('class').indexOf('hide-items') < 0) {
        ky = 1;
        msg += 'Debes seleccionar un almacen destino';
    }

    if ($('#txtSuppliers').val() == 0 && $('.pos2').attr('class').indexOf('hide-items') < 0) {
        ky = 1;
        msg += 'Debes seleccionar el proveedor';
    }

    if ($('#txtIdProducts').val() == 0) {
        ky = 1;
        msg += 'Debes seleccionar un producto';
    }

    // if ($('#txtCost').val() == 0 && $('.pos5').attr('class').indexOf('hide-items') < 0) {
    //     ky = 1;
    //     msg += 'Debes indicar el costo del producto';
    // }

    if ($('#txtSerie').val() == 0 && $('.pos6').attr('class').indexOf('hide-items') < 0) {
        ky = 1;
        msg += 'Debes indicar la serie del producto';
    }

    if ($('#txtCoin').val() == 0 && $('.pos5').attr('class').indexOf('hide-items') < 0) {
        ky = 1;
        msg += 'Debes indicar el tipo de moneda';
    }

    if (ky == 0) {
        $('#btn_exchange').removeClass('disabled');
    } else {
        $('#btn_exchange').addClass('disabled');
        console.clear();
        console.log(msg);
    }
}
// Aplica la seleccion para la tabla de movimientos
function exchange_apply() {
    let prdId = $('#txtIdProducts').val().split('|')[0].substring(2, 100);
    let prdSku = $('#txtIdProducts').val().split('|')[1];
    let prdName = $('#txtIdProducts').val().split('|')[2];
    let serie = parseInt($('#txtNextSerie').val());
    let sersku = prdSku + refil(serie, 4);
    let serser = $('#txtSerie').val();
    let sercost = $('#txtCost').val();
    let sercoin = $('#txtCoin').val();
    let quantity = $('#txtQuantity').val();
    let supplier = $('#txtSuppliers').val();
    let docinvoice = $('#txtInvoice').val();
    let excId = $('#txtTypeExchange').val();
    let exccode = $(`#txtTypeExchange option[value="${excId}"]`).attr('data-content').split('|')[0];
    let strid = $('#txtStoreSource').val();
    let strName = $(`#txtStoreSource option[value="${strid}"]`).text();
    let comment = $('#txtComments').val();

    serie++;
    update_array_products(prdId, serie);

    let par = `
[{
    "support"  : "${prdId}|${excId}|${strid}|${sersku}|${sercoin}|${supplier}|${docinvoice}",
    "sersku"   : "${sersku}",
    "prodser"  : "${serser}",
    "sercost"  : "${sercost}",
    "prodnme"  : "${prdName}",
    "prodqty"  : "${quantity}",
    "excodsr"  : "${exccode}",
    "stnmesr"  : "${strName}",
    "comment"  : "${comment}"
}]`;

    console.log(par);

    fill_table(par);
}

// Llena la tabla de movimientos
function fill_table(par) {
    let largo = $('#tblExchanges tbody tr td').html();
    largo == 'Ningún dato disponible en esta tabla' ? $('#tblExchanges tbody tr').remove() : '';
    par = JSON.parse(par);

    let tabla = $('#tblExchanges').DataTable();

    tabla.row
        .add({
            editable: `<i class="fas fa-times-circle kill"></i>`,
            prod_sku: `<span class="hide-support" id="SKU-${par[0].sersku}"></span>${par[0].sersku}`,
            prodname: par[0].prodnme,
            prodcant: `<span>${par[0].prodqty}</span>`,
            prodcost: par[0].sercost,
            prodseri: par[0].prodser,
            codexcsc: par[0].excodsr,
            stnamesc: par[0].stnmesr,
            comments: `<div>${par[0].comment}</div>`,
        })
        .draw();

    $(`#SKU-${par[0].sersku}`).parent().parent().attr('data-content', par[0].support);

    btn_apply_appears();

    $('.edit')
        .unbind('click')
        .on('click', function () {
            tabla.row($(this).parent('tr')).remove().draw();
            btn_apply_appears();
        });
}

function btn_apply_appears() {
    let tabla = $('#tblExchanges').DataTable();
    let rengs = tabla.rows().count();
    if (rengs > 0) {
        $('.btn-apply').removeClass('hidden-field');
    } else {
        $('.btn-apply').addClass('hidden-field');
    }
}

// Limpia los campos para uns nueva seleccion
function clean_selectors() {
    // $('#txtTypeExchange').val(0);
    $('#txtStoreSource').val(0);
    $('#txtStoreTarget').val(0);
    $('#txtProducts').html('<option value="0" selected>Selecciona producto</option>');
    $('#txtQuantity').val('');
    $('#txtQuantityStored').html('&nbsp;');
    $('#txtComments').val('');
}
/** Actualiza la cantidad de cada producto dentro del arreglo */
function update_array_products(id, sr) {
    $('#txtNextSerie').val(sr);
    $(`#P-${id}`).attr('data_serie', sr);
}

function read_exchange_table() {
    if (folio == undefined) {
        var pagina = 'MoveStoresIn/NextExchange';
        var par = '[{"par":""}]';
        var tipo = 'html';
        var selector = putNextExchangeNumber;
        fillField(pagina, par, tipo, selector);
    } else {
        $('#tblExchanges tbody tr').each(function (v, u) {
            let seriesku = $(this).attr('data-content').split('|')[3];
            let prodname = $($(u).find('td')[2]).text();
            let quantity = $($(u).find('td')[3]).text();
            let serienum = $($(u).find('td')[5]).text();
            let storname = $($(u).find('td')[7]).text();
            let comments = $($(u).find('td')[8]).text();
            let codeexch = $($(u).find('td')[6]).text();
            let sericost = $($(u).find('td')[4]).text();
            let typeexch = $(this).attr('data-content').split('|')[1];
            let producid = $(this).attr('data-content').split('|')[0];
            let storesid = $(this).attr('data-content').split('|')[2];
            let sericoin = $(this).attr('data-content').split('|')[4];
            let suppliid = $(this).attr('data-content').split('|')[5];
            let docinvoi = $(this).attr('data-content').split('|')[6];

            let truk = `${folio}|${seriesku}|${prodname}|${quantity}|${serienum}|${storname}|${comments}|${codeexch}|${typeexch}|${producid}|${storesid}|${sericost}|${sericoin}|${suppliid}|${docinvoi}`;

            /**
             *  0 - fol    folio          mov exc_guid
             *  1 - sku    seriesku       mov exc_sku_product      ser ser_sku
             *  2 - pnm    prodname       mov exc_product_name
             *  3 - qty    quantity       mov exc_quantity                                   str stp_quantity
             *  4 - ser    serienum       mov exc_serie_product    ser ser_serial_number
             *  5 - str    storname       mov exc_store
             *  6 - com    comments       mov exc_comments
             *  7 - cod    codeexch       mov ext_code
             *  8 - idx    typeexch       mov ext_id
             *  9 - prd    producid                                ser prd_id                                    doc prd_id
             * 10 - sti    storesid                                                          str str_id
             * 11 - cos    sericost                                ser ser_cost
             * 12 - cin    sericoin       mov cin_id               ser cin_id
             * 13 - sup    suppliid                                ser sup_id
             * 14 - doc    docinvoi                                                                              doc doc_id
             */

            //console.log(truk);
            build_data_structure(truk);
        });
    }
}

function putNextExchangeNumber(dt) {
    console.log(dt);
    folio = dt;
    read_exchange_table();
}

function build_data_structure(pr) {
    let el = pr.split('|');
    let par = `
[{
    "fol" :  "${el[0]}",
    "sku" :  "${el[1]}",
    "pnm" :  "${el[2]}",
    "qty" :  "${el[3]}",
    "ser" :  "${el[4]}",
    "str" :  "${el[5]}",
    "com" :  "${el[6]}",
    "cod" :  "${el[7]}",
    "idx" :  "${el[8]}",
    "prd" :  "${el[9]}",
    "sti" :  "${el[10]}",
    "cos" :  "${el[11]}",
    "cin" :  "${el[12]}",
    "sup" :  "${el[13]}",
    "doc" :  "${el[14]}"
}]`;
    save_exchange(par);
}
function build_update_store_data(pr) {
    let el = pr.split('|');
    let par = `
[{
    "prd" :  "${el[0]}",
    "qty" :  "${el[1]}",
    "str" :  "${el[2]}",
    "mov" :  "${el[3]}"
}]`;

    update_store(par);
}

/** Graba intercambio de almacenes */
function save_exchange(pr) {
    //   console.log(pr);
    var pagina = 'MoveStoresIn/SaveExchange';
    var par = pr;
    var tipo = 'html';
    var selector = exchange_result;
    fillField(pagina, par, tipo, selector);
}

function update_store(ap) {
    // console.log(ap);
    var pagina = 'MoveStoresIn/UpdateStores';
    var par = ap;
    var tipo = 'html';
    var selector = updated_stores;
    fillField(pagina, par, tipo, selector);
}

function exchange_result(dt) {
    $('.resFolio').text(refil(folio, 7));
    $('#MoveFolioModal').modal('show');
    $('#btnHideModal').on('click', function () {
        window.location = 'MoveStoresIn';
    });
    $('#btnPrintReport').on('click', function () {
        $('.btn-print').trigger('click');
    });
}

function updated_stores(dt) {
    // console.log(dt);

    $('.resFolio').text(refil(folio, 7));
    $('#MoveFolioModal').modal('show');
    $('#btnHideModal').on('click', function () {
        window.location = 'MoveStoresIn';
    });
    $('#btnPrintReport').on('click', function () {
        $('.btn-print').trigger('click');
    });
}

/* Generación del folio  */
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

/**  ++++ Omite acentos para su facil consulta */
function omitirAcentos(text) {
    var acentos = 'ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç';
    var original = 'AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc';
    for (var i = 0; i < acentos.length; i++) {
        text = text.replace(acentos.charAt(i), original.charAt(i));
    }
    return text;
}

/**  +++ Ocultalos productos del listado que no cumplen con la cadena  */
function sel_products(res) {
    if (res.length < 1) {
        $('#listProducts div.list-item').css({display: 'block'});
    } else {
        $('#listProducts div.list-item').css({display: 'none'});
    }

    $('#listProducts div.list-item').each(function (index) {
        var cm = $(this).html();

        cm = omitirAcentos(cm);
        var cr = cm.indexOf(res);
        if (cr > -1) {
            //            alert($(this).children().html())
            $(this).css({display: 'block'});
        }
    });
}
