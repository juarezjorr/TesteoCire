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
    getProducts();
    setting_table();
    setting_datepicket($('#txtStartDate'));
    $('#listProducts').mouseleave(function () {
        $('.list-group').slideToggle('slow');
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
                // Boton aplicar cambios
                text: 'Imprimir reporte',
                className: 'btn-apply hidden-field',
                action: function (e, dt, node, config) {
                    read_exchange_table();
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
function getProducts() {
    var pagina = 'StoreProductsList/listProducts';
    var par = `[{"store":""}]`;
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
        let id = $(this).val();
        // $(`#txtStoreTarget option`).css({display: 'block'});
        // $(`#txtStoreTarget option[value="${id}"]`).css({display: 'none'});

        drawProducts(id);
    });
}

// Coloca los productos en el selector
function putProducts(dt) {
    $.each(dt, function (v, u) {
        let H = `<div class="list-item" id="P-${u.ser_id}" data-store="${u.str_id}" data-content="${u.ser_id}|${u.ser_sku}|${u.ser_serial_number}|${u.prd_name}|${u.ser_cost}|${u.prd_coin_type}">
         ${u.ser_sku} - ${u.prd_name}<div class="items-just"><i class="fas fa-arrow-circle-right"></i></div></div>`;
        $('#listProducts').append(H);
    });
}

// Dibuja los productos del almacen seleccionado
function drawProducts(str) {
    $('.list-item').addClass('hide-items');
    $(`.list-item[data-store^="${str}"]`).removeClass('hide-items');

    var ps = $('#boxProducts').offset();
    $('.list-group').css({top: ps.top + 30 + 'px', display: 'none'});
    $('.box-items-list i').removeClass('rotate');
    $('#boxProducts')
        .unbind('click')
        .on('click', function () {
            $('.list-group').slideToggle('slow');
            $('.box-items-list i').toggleClass('rotate');
        });

    $('.list-item .items-just i')
        .unbind('click')
        .on('click', function () {
            let id = $(this).parents('.list-item');
            exchange_apply(id);
        });
}

// Valida los campos
function validator(prId) {
    let ky = 0;

    let qtystk = prId.children().children('.quantity').attr('data-content');
    let qtysel = prId.children().children('.quantity').text();
    if (qtystk < qtysel) {
        prId.children().children('.quantity').text(qtystk);
    }
    if (qtysel < 1) {
        ky = 1;
        msg += 'No tiene stock suficiente';
    }

    $('.fail')
        .unbind('focus')
        .on('focus', function () {
            $(this).removeClass('fail');
        });
    return ky;
}
// Aplica la seleccion para la tabla de reporte
function exchange_apply(prId) {
    let prod = prId.attr('data-content').split('|');
    let productSKU = prod[1];
    let productName = prod[3];
    let productSerie = prod[2];

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
