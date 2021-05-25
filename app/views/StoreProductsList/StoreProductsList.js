var seccion = '';
///const folio = uuidv4();
let folio;
let pr = [];
let link = '';
let url;

$(document).ready(function () {
    url = getAbsolutePath();
    importarScript(url + 'app/assets/lib/kendo.js');

    folio = getFolio();
    verifica_usuario();
    inicial();
});

function inicial() {
    getStores();
    setting_table();
    setting_datepicket($('#txtStartDate'));
    $('#btn_products').on('click', function () {
        exchange_apply();
        $('#txtProducts').val('');
        $('#txtIdProducts').val('');
        $('#txtComments').val('');
    });
}

function setting_table() {
    let title = 'Salidas de Almacen';
    // let filename = title.replace(/ /g, '_') + '-' + moment(Date()).format('YYYYMMDD');

    $('#tblExchanges').DataTable({
        order: [[1, 'desc']],
        dom: 'Blrt',
        buttons: [
            {
                // Boton imprimir el el reporte
                text: 'Imprimir reporte',
                className: 'btn-apply hidden-field',
                action: function (e, dt, node, config) {
                    read_exchange_table();
                },
            },
            {
                // Boton limpiar la interface
                text: 'Nuevo reporte',
                className: 'btn-apply hidden-field',
                action: function (e, dt, node, config) {
                    window.location = 'StoreProductsList';
                },
            },
        ],
        paging: false,
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
            {data: 'prodseri', class: 'serie-product'},
            {data: 'comments', class: 'comments'},
        ],
    });
}

/** ++++  Setea el calendario ++++++ */
function setting_datepicket(selector) {
    let fecha = moment(Date()).format('DD/MM/YYYY');
    $(selector).daterangepicker({
        singleDatePicker: true,
        autoApply: true,
        locale: {
            format: 'DD/MM/YYYY',
            daysOfWeek: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
            monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            firstDay: 1,
        },
        minDate: fecha,
        startDate: fecha,
        opens: 'left',
        drops: 'auto',
    });
}

// Solicita los tipos de movimiento
function getExchange() {
    var pagina = 'StoreProductsList/listExchange';
    var par = '[{"parm":""}]';
    var tipo = 'json';
    var selector = putTypeExchange;
    fillField(pagina, par, tipo, selector);
}
// Solicita el listado de almacenes
function getStores() {
    var pagina = 'StoreProductsList/listStores';
    var par = '[{"parm":""}]';
    var tipo = 'json';
    var selector = putStores;
    fillField(pagina, par, tipo, selector);
}
// Solicita los productos de un almacen seleccionado
function getProducts(strId) {
    var pagina = 'StoreProductsList/listProducts';
    var par = `[{"store":"${strId}"}]`;
    var tipo = 'json';
    var selector = putProducts;
    fillField(pagina, par, tipo, selector);
}

/*  LLENA LOS DATOS DE LOS ELEMENTOS */
// Dibuja los almacenes
function putStores(dt) {
    if (dt[0].str_id != 0) {
        $.each(dt, function (v, u) {
            let H = `<option value="${u.str_id}">${u.str_name}</option>`;
            $('#txtStoreSource').append(H);
            // $('#txtStoreTarget').append(H);
        });
    }

    $('#txtStoreSource').on('change', function () {
        let strId = $(this).val();
        $('.list-group').slideUp('slow', function () {
            getProducts(strId);
            validator();
        });
    });

    active_list();
}

// Coloca los productos en el selector
function putProducts(dt) {
    if (dt[0].prd_id != '0') {
        var ps = $('#txtProducts').offset();
        $('.list-group').css({top: ps.top + 35 + 'px'});
        $('.list-group').slideUp('100', function () {
            $('#listProducts').html('');

            $.each(dt, function (v, u) {
                let H = `<div class="list-item" id="P-${u.prd_id}" data_complement="${u.ser_id}|${u.ser_sku}|${u.ser_serial_number}|${u.ser_cost}|${u.cin_id}">${u.ser_sku} - ${u.prd_name}</div>`;
                $('#listProducts').append(H);
            });
        });

        $('#txtProducts').on('focus', function () {
            $('.list-group').slideDown('slow');
        });

        $('.list-group .list-item').on('click', function () {
            let prdNm = $(this).html();
            let prdId = $(this).attr('id') + '|' + $(this).attr('data_complement');
            $('#txtProducts').val(prdNm);
            $('#txtIdProducts').val(prdId);
            $('.list-group').slideUp(100);
            validator();
        });
    } else {
        $('#listProducts').html('');
        $('#txtProducts').val('');
        $('#txtIdProducts').val('');
        $('.list-group').slideUp('slow');
    }
}

function active_list() {
    $('#txtProducts').on('keyup', function (e) {
        var res = $(this).val().toUpperCase();
        if (res == '') {
            $('.list-group').slideUp(100);
        } else {
            $('.list-group').slideDown(400);
        }
        res = omitirAcentos(res);
        sel_products(res);
    });
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

// Dibuja los productos del almacen seleccionado
// function drawProducts(str) {
//     $('.list-item').addClass('hide-items');
//     $(`.list-item[data-store^="${str}"]`).removeClass('hide-items');

//     var ps = $('#boxProducts').offset();
//     $('.list-group').css({top: ps.top + 30 + 'px', display: 'none'});
//     $('.box-items-list i').removeClass('rotate');
//     $('#boxProducts')
//         .unbind('click')
//         .on('click', function () {
//             $('.list-group').slideToggle('slow');
//             $('.box-items-list i').toggleClass('rotate');
//         });

//     $('.list-item .items-just i')
//         .unbind('click')
//         .on('click', function () {
//             let id = $(this).parents('.list-item');
//             exchange_apply(id);
//         });
// }

// Valida los campos
function validator() {
    let ky = 0;
    let msg = '';
    if ($('#txtStoreSource').val() == 0) {
        ky = 1;
        msg += 'Debes seleccionar un almacen';
    }

    if ($('#txtIdProducts').val() == 0) {
        ky = 1;
        msg += 'Debes seleccionar un producto';
    }

    if (ky == 0) {
        $('#btn_products').removeClass('disabled');
    } else {
        $('#btn_products').addClass('disabled');
        console.clear();
        console.log(msg);
    }
}
// Aplica la seleccion para la tabla de reporte
function exchange_apply() {
    let prId = $('#txtIdProducts').val();
    let productName = $('#txtProducts').val().split(' - ')[1].replace(/\"/g, "'");
    let prod = prId.split('|');
    let productSKU = prod[2];
    let productSerie = prod[3];

    let commnets = $('#txtComments').val();

    let par = `
[{  
    "support"	: 	"${productSKU}",
    "prodsku"	: 	"${productSKU}",
    "prodnme"	:	"${productName}",
    "prodser"	:	"${productSerie}",
    "comment"	:	"${commnets}"
}]
            `;
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
            editable: '<i class="fas fa-times-circle kill"></i>',
            prod_sku: `<span class="hide-support">${par[0].support}</span>${par[0].prodsku}`,
            prodname: par[0].prodnme,
            prodseri: par[0].prodser,
            comments: `<div>${par[0].comment}</div>`,
        })
        .draw();
    btn_apply_appears();

    // clean_selectors();

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
    $('#txtStoreSource').val(0);
    $('#txtProducts').html('<option value="0" selected>Selecciona producto</option>');
    $('#txtQuantity').val('');
    $('#txtQuantityStored').html('&nbsp;');
    $('#txtComments').val('');
}

function read_exchange_table() {
    let stornam = $('#txtStoreSource option:selected').text();
    let projnum = $('#txtProjectNum').val();
    let projnam = $('#txtProjectName').val();
    let datestr = $('#txtStartDate').val();
    let version = $('#txtVersion').val();
    let freelnc = $('#txtFreelance').val();
    let chain = '';

    $('#tblExchanges tbody tr').each(function (v, u) {
        let prodsku = $($(u).find('td')[1]).children('span.hide-support').text().split('|')[0];
        let prodnam = $($(u).find('td')[2]).text();
        let serinum = $($(u).find('td')[3]).text();
        let comment = $($(u).find('td')[4]).text();

        prodsku = prodsku.substring(0, 7) + '-' + prodsku.substring(7, prodsku.length);

        chain += `${stornam}|${projnum}|${projnam}|${datestr}|${version}|${freelnc}|${prodsku}|${prodnam}|${serinum}|${comment}@`;
    });
    chain = chain.substring(0, chain.length - 1);
    build_data_structure(chain);
}

function build_data_structure(pr) {
    let pa = `[{"par":"${pr}"}]`;
    var pagina = 'StoreProductsList/saveList';
    var par = pa;
    var tipo = 'html';
    var selector = putSaveList;
    fillField(pagina, par, tipo, selector);
}

function putSaveList(dt) {
    window.open(url + 'app/views/StoreProductsList/StoreProductsReport.php', '_blank');
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
