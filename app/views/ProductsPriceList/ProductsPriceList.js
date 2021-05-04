var seccion = '';
let docs;

$(document).ready(function () {
    verifica_usuario();
    inicial();
});

function inicial() {
    setting_table();
    getProducts();
}

/** +++++  configura la table de productos */
function setting_table() {
    let title = 'Lista de precios';
    let filename = title.replace(/ /g, '_') + '-' + moment(Date()).format('YYYYMMDD');

    $('#tblPriceList').DataTable({
        order: [[2, 'asc']],
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
            {data: 'produsku', class: 'sku'},
            {data: 'prodname', class: 'product-name'},
            {data: 'prodqtty', class: 'quantity'},
            {data: 'prodpric', class: 'price'},
            {data: 'prodcoin', class: 'sku'},
            {data: 'prddocum', class: 'catalog'},
            {data: 'categori', class: 'catalog'},
            {data: 'subcateg', class: 'catalog'},
            {data: 'typeserv', class: 'sku'},
            {data: 'prodengl', class: 'catalog'},
        ],
    });
}

/** +++++  Obtiene los productos de la base */
function getProducts() {
    var pagina = 'ProductsPriceList/listProducts';
    var par = `[{"store":""}]`;
    var tipo = 'json';
    var selector = putProducts;
    fillField(pagina, par, tipo, selector);
}

/** +++++  coloca los productos en la tabla */
function putProducts(dt) {
    let tabla = $('#tblPriceList').DataTable();
    getDocuments();

    $.each(dt, function (v, u) {
        pack = u.prd_level == 'K' ? 'fas' : 'far';
        tabla.row
            .add({
                editable: `<i class="fas fa-eye modif" id="${u.prd_id}" data-content="${u.prd_sku}|${u.prd_name}"></i>`,
                produsku: `<span class="hide-support">${u.prd_id}</span>${u.prd_sku}`,
                prodname: `<i class="${pack} fa-box-open fa-sm"></i> ${u.prd_name}`,
                prodqtty: `<span>${u.quantity}</span>`,
                prodpric: u.prd_price,
                prodcoin: u.prd_coin_type,
                prddocum: `<span id="F${u.prd_id}"></span>`,
                categori: u.cat_name,
                subcateg: u.sbc_name,
                typeserv: u.srv_name,
                prodengl: u.prd_english_name,
            })
            .draw();
    });

    $('.fa-eye')
        .unbind('click')
        .on('click', function () {
            let prodId = $(this).attr('id');
            let prdSku = $(this).attr('data-content').split('|')[0];
            let prdName = $(this).attr('data-content').split('|')[1];
            getSeries(prodId, prdSku, prdName);
        });
}

/** +++++  Obtiene los documentos asociados al producto */
function getDocuments() {
    var pagina = 'ProductsPriceList/listDocuments';
    var par = `[{"store":""}]`;
    var tipo = 'json';
    var selector = putDocuments;
    fillField(pagina, par, tipo, selector);
}

/** +++++  Coloca la referencia de documentos a su respectivo producto */
function putDocuments(dt) {
    $.each(dt, function (v, u) {
        $('#F' + u.prd_id).append(`<i class="fas fa-file docum" id="${u.doc_id}"></i>`);
    });
}

/** +++++  Obtiene los numeros de serie de cada producto */
function getSeries(prdId, prdSku, prdName) {
    var pagina = 'ProductsPriceList/listSeries';
    var par = `[{"prdId":"${prdId}","prdSku":"${prdSku}","prdName":"${prdName}"}]`;
    var tipo = 'json';
    var selector = putSeries;
    fillField(pagina, par, tipo, selector);
}

/** +++++  Abre el modal y coloca los seriales de cada producto */
function putSeries(dt) {
    $('.overlay_background').removeClass('overlay_hide');

    $('#tblSerialList').DataTable({
        destroy: true,
        order: [[2, 'asc']],
        pagingType: 'simple_numbers',
        language: {
            url: 'app/assets/lib/dataTable/spanish.json',
        },
        scrollY: 'calc(100vh - 350px)',
        scrollX: true,
        fixedHeader: true,
        columns: [
            {data: 'produsku', class: 'sku'},
            {data: 'serlnumb', class: 'product-name'},
            {data: 'serlcost', class: 'price'},
            {data: 'dateregs', class: 'sku'},
            {data: 'cvstatus', class: 'code-type_s'},
            {data: 'cvestage', class: 'code-type_s'},
            {data: 'typeprod', class: 'code-type_s'},
            {data: 'serqntty', class: 'quantity'},
            {data: 'serstore', class: 'catalog'},
            {data: 'comments', class: 'comments'},
        ],
    });

    $('.btn_close')
        .unbind('click')
        .on('click', function () {
            $('.overlay_background').addClass('overlay_hide');
        });

    build_modal_table(dt);
}

/** +++++  Coloca los seriales en la tabla de seriales */
function build_modal_table(dt) {
    let tabla = $('#tblSerialList').DataTable();

    $('.overlay_closer .title').html(`${dt[0].prd_sku} - ${dt[0].prd_name}`);
    tabla.rows().remove().draw();
    $.each(dt, function (v, u) {
        tabla.row
            .add({
                produsku: `<span class="hide-support">${u.ser_id}</span>${u.ser_sku}`,
                serlnumb: u.ser_serial_number,
                serlcost: u.ser_cost,
                dateregs: u.ser_date_registry,
                cvstatus: u.ser_situation,
                cvestage: u.ser_stage,
                typeprod: u.comportamiento,
                comments: u.comments,
                serqntty: u.stp_quantity,
                serstore: u.str_name,
            })
            .draw();
    });
}
