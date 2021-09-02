let seccion = '';
let docs;
let grp = 50;
let num = 0;

$(document).ready(function () {
    verifica_usuario();
    inicial();
});

function inicial() {
    getCategories();
    $('.deep_loading').css({display: 'flex'});
    $('.tblProdMaster').css({display: 'none'});
    // setting_table();
    getPriceList();
    //$('#LoadingModal').addClass('overlay_hide');
}

/** +++++  configura la table de productos */
function setting_table() {
    let title = 'Lista de precios';
    let filename = title.replace(/ /g, '_') + '-' + moment(Date()).format('YYYYMMDD');

    $('#tblPriceList').DataTable({
        order: [[2, 'asc']],
        dom: 'Blfrtip',
        lengthMenu: [
            [100, 200, 300, -1],
            [100, 200, 300, 'Todos'],
        ],
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
        scrollY: 'calc(100vh - 200px)',
        scrollX: true,
        fixedHeader: true,
        columns: [
            {data: 'editable', class: 'edit'},
            {data: 'produsku', class: 'sku'},
            {data: 'prodname', class: 'product-name'},
            {data: 'prodqtty', class: 'quantity'},
            {data: 'prodpric', class: 'price'},
            {data: 'prodcoin', class: 'sku'},
            {data: 'prddocum', class: 'cellInvoice center'},
            {data: 'categori', class: 'catalog'},
            {data: 'subcateg', class: 'catalog'},
            {data: 'typeserv', class: 'sku'},
            {data: 'prodengl', class: 'catalog'},
        ],
    });

    $('.tblProdMaster')
        .delay(500)
        .slideDown('fast', function () {
            $('#tblPriceList').DataTable().draw();
            $('.deep_loading').css({display: 'none'});
        });
}

/** +++++  Obtiene los productos de la base */
function getPriceList(catId) {
    var pagina = 'ProductsPriceList/listProducts';
    var par = `[{"catId":"${catId}","grp":"${grp}","num":"${num}"}]`;
    var tipo = 'json';
    var selector = putPriceList;
    fillField(pagina, par, tipo, selector);
}

/** +++++  coloca los productos en la tabla */
function putPriceList(dt) {
    if (dt[0].prd_id != '0') {
        var catId = dt[0].cat_id;
        $.each(dt, function (v, u) {
            pack = u.prd_level == 'K' ? 'fas' : 'far';
            let docInvo = `<span class="invoiceView" id="F${u.doc_id}"><i class="fas fa-file-alt"></i></span>`;
            let invoice = u.doc_id == 0 ? '' : docInvo;
            var H = `
                <tr class="odd">
                    <td class="edit"></td>
                    <td class="sku"><span class="hide-support">${u.prd_id}</span>${u.prd_sku}</td>
                    <td class="product-name"><i class="${pack} fa-box-open fa-sm"></i> ${u.prd_name}</td>
                    <td class="quantity"><span class="toLink" id="${u.prd_id}" data-content="${u.prd_sku}|${u.prd_name}|${u.quantity}|${u.prd_level}">${u.quantity}</span></td>
                    <td class="price">${u.prd_price}</td>
                    <td class="sku">${u.prd_coin_type}</td>
                    <td class="cellInvoice center">${invoice}</td>
                    <td class="catalog">${u.cat_name}</td>
                    <td class="catalog">${u.sbc_name}</td>
                    <td class="sku">${u.srv_name}</td>
                    <td class="catalog">${u.prd_english_name}</td>
                </tr>`;
            $('#tblPriceList tbody').append(H);
        });
        setting_table();
        active_icons();
    }
}
// function x_putPriceList(dt) {
//     let tabla = $('#tblPriceList').DataTable();
//     if (dt[0].prd_id != '0') {
//         var catId = dt[0].cat_id;
//         $.each(dt, function (v, u) {
//             pack = u.prd_level == 'K' ? 'fas' : 'far';
//             let docInvo = `<span class="invoiceView" id="F${u.doc_id}"><i class="fas fa-file-alt"></i></span>`;
//             let invoice = u.doc_id == 0 ? '' : docInvo;
//             // console.log(u.prd_id);
//             tabla.row
//                 .add({
//                     editable: `&nbsp;`,
//                     produsku: `<span class="hide-support">${u.prd_id}</span>${u.prd_sku}`,
//                     prodname: `<i class="${pack} fa-box-open fa-sm"></i> ${u.prd_name}`,
//                     prodqtty: `<span class="toLink" id="${u.prd_id}" data-content="${u.prd_sku}|${u.prd_name}|${u.quantity}|${u.prd_level}">${u.quantity}</span>`,
//                     prodpric: u.prd_price,
//                     prodcoin: u.prd_coin_type,
//                     prddocum: invoice,
//                     categori: u.cat_name,
//                     subcateg: u.sbc_name,
//                     typeserv: u.srv_name,
//                     prodengl: u.prd_english_name,
//                 })
//                 .draw();
//         });

//         num += grp;
//         // setTimeout(() => {
//         getPriceList(catId);
//         // }, 10);
//     } else {
//         active_icons();
//     }
// }

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

// Solicita los tipos de movimiento
function getCategories() {
    var pagina = 'Productos/listCategories';
    var par = '[{"parm":""}]';
    var tipo = 'json';
    var selector = putCategories;
    fillField(pagina, par, tipo, selector);
}

function putCategories(dt) {
    if (dt[0].cat_id != '0') {
        let catId = dt[0].cat_id;

        var H = `<option value="" selected>TODOS LOS PRODUCTOS</option>`;
        $('#txtCategoryList').html(H);

        $.each(dt, function (v, u) {
            H = `<option value="${u.cat_name}">${u.cat_name}</option>`;
            $('#txtCategoryList').append(H);
        });

        $('#txtCategoryList').on('change', function () {
            let id = $(this).val();
            let catName = $(`#txtCategoryList option[value="${id}"]`).val();
            num = 0;
            //$('.deep_loading').css({display: 'flex'});
            // getPriceList(catId);
            console.log(catName);
            $('#tblPriceList_filter input').val(catName).trigger('keyup');
        });
    }
}

/** +++++  Activa los iconos */
function active_icons() {
    $('.toLink')
        .unbind('click')
        .on('click', function () {
            let prd = $(this).attr('id');
            let qty = $(this).attr('data-content').split('|')[2];
            let pkt = $(this).attr('data-content').split('|')[3];
            let pkn = $(this).attr('data-content').split('|')[1];

            console.log(pkt, prd, qty);

            if (qty > 0) {
                if (pkt == 'K') {
                    getProduct(prd, pkn);
                } else {
                    getSeries(prd);
                }
            }
        });

    $('.invoiceView')
        .unbind('click')
        .on('click', function () {
            var id = $(this).attr('id').slice(1, 10);
            console.log(id);
            var pagina = 'Documentos/VerDocumento';
            var par = `[{"id":"${id}"}]`;
            var tipo = 'json';
            var selector = putDocument;
            fillField(pagina, par, tipo, selector);
        });

    $('.docum')
        .unbind('click')
        .on('click', function () {
            var id = $(this).attr('id');
            var pagina = 'Documentos/VerDocumento';
            var par = `[{"id":"${id}"}]`;
            var tipo = 'json';
            var selector = putDocument;
            fillField(pagina, par, tipo, selector);
        });
}

function putDocument(dt) {
    var a = document.createElement('a');
    a.href = 'data:application/octet-stream;base64,' + dt.doc_document;
    a.target = '_blank';
    a.download = dt.doc_name + '.' + dt.doc_type.trim();
    a.click();
}

function getProduct(prdId, prdName) {
    console.log(prdId, prdName);
    var pagina = 'ProductsPriceList/listProductPackages';
    var par = `[{"prdId":"${prdId}","prdName":"${prdName}"}]`;
    var tipo = 'json';
    var selector = putProducts;
    fillField(pagina, par, tipo, selector);
}

function putProducts(dt) {
    $('#ProductsModal').removeClass('overlay_hide');

    $('#tblProductlList').DataTable({
        destroy: true,
        order: [[2, 'desc']],
        lengthMenu: [
            [20, 50, 100, -1],
            [20, 50, 100, 'Todos'],
        ],
        pagingType: 'simple_numbers',
        language: {
            url: 'app/assets/lib/dataTable/spanish.json',
        },
        scrollY: 'calc(100vh - 280px)',
        scrollX: true,
        fixedHeader: true,
        columns: [
            {data: 'produsku', class: 'sku'},
            {data: 'prodname', class: 'product-name'},
            {data: 'prodqtty', class: 'quantity'},
            {data: 'prodpric', class: 'price'},
            {data: 'prodcoin', class: 'sku'},
            {data: 'categori', class: 'catalog'},
            {data: 'subcateg', class: 'catalog'},
        ],
    });

    $('.btn_close')
        .unbind('click')
        .on('click', function () {
            $('.overlay_background').addClass('overlay_hide');
        });

    build_modal_product(dt);
}

function build_modal_product(dt) {
    console.log(dt);
    let tabla = $('#tblProductlList').DataTable();

    $('.overlay_closer .title').html(`${dt[0].paquete}`);
    tabla.rows().remove().draw();
    $.each(dt, function (v, u) {
        pack = u.prd_level == 'K' ? 'fas' : 'far';
        var skufull = u.prd_sku.slice(7, 11) == '' ? '' : '-' + u.prd_sku.slice(7, 11);
        tabla.row
            .add({
                editable: ``,
                produsku: `${u.prd_sku.slice(0, 7)}${skufull}`,
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
}

/** +++++  Obtiene los numeros de serie de cada producto */
function getSeries(prdId) {
    var pagina = 'ProductsPriceList/listSeries';
    var par = `[{"prdId":"${prdId}"}]`;
    var tipo = 'json';
    var selector = putSeries;
    fillField(pagina, par, tipo, selector);
}

/** +++++  Abre el modal y coloca los seriales de cada producto */
function putSeries(dt) {
    $('#SerieModal').removeClass('overlay_hide');

    $('#tblSerialList').DataTable({
        destroy: true,
        order: [[2, 'desc']],
        lengthMenu: [
            [20, 50, 100, -1],
            [20, 50, 100, 'Todos'],
        ],
        pagingType: 'simple_numbers',
        language: {
            url: 'app/assets/lib/dataTable/spanish.json',
        },
        scrollY: 'calc(100vh - 290px)',
        scrollX: true,
        fixedHeader: true,
        columns: [
            {data: 'produsku', class: 'sku'},
            {data: 'serlnumb', class: 'product-name'},
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

    build_modal_serie(dt);
}

/** +++++  Coloca los seriales en la tabla de seriales */
function build_modal_serie(dt) {
    let tabla = $('#tblSerialList').DataTable();

    $('.overlay_closer .title').html(`${dt[0].prd_sku} - ${dt[0].prd_name}`);
    tabla.rows().remove().draw();
    $.each(dt, function (v, u) {
        tabla.row
            .add({
                produsku: `<span class="hide-support">${u.ser_id}</span>${u.ser_sku.slice(0, 7)}-${u.ser_sku.slice(7, 11)}`,
                serlnumb: u.ser_serial_number,
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
