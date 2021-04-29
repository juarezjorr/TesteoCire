var seccion = '';
///const folio = uuidv4();
let folio;
let = pr = [];
let = link = '';

$(document).ready(function () {
    // importarScript('https://unpkg.com/jspdf@latest/dist/jspdf.umd.min.js');

    folio = getFolio();
    verifica_usuario();
    inicial();
});

function inicial() {
    getStores();
    getProducts();
    setting_table();
    // $('.generate_button').on('click', function () {
    //     build_report();
    // });

    // $('#btn_exchange').on('click', function () {
    //     exchange_apply();
    // });
}

// function build_report() {
//     let par = `[{

//     "par1":"par1"


//     }]`;

    
// }

// function putListProducts(dt) {

// }

function setting_table() {
    let title = 'Salidas de Almacen';
    // let filename = title.replace(/ /g, '_') + '-' + moment(Date()).format('YYYYMMDD');

    $('#tblExchanges').DataTable({
        order: [[0, 'desc']],
        dom: 'Blfrtip',
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
// Solicita los movimientos acurridos
// function getExchanges() {
//     var pagina = 'MoveStoresOut/listExchanges';
//     var par = `[{"folio":"${folio}"}]`;
//     var tipo = 'json';
//     var selector = putExchanges;
//     fillField(pagina, par, tipo, selector);
// }
/*  LLENA LOS DATOS DE LOS ELEMENTOS */
// Dibuja los tipos de movimiento

// function putTypeExchange(dt) {
//     if (dt[0].ext_id != 0) {
//         $.each(dt, function (v, u) {
//             let H = `<option value="${u.ext_id}" data-content="${u.ext_code}|${u.ext_type}|${u.ext_link}|${u.ext_code_a}|${u.ext_type_a}">${u.ext_code} - ${u.ext_description}</option>`;
//             $('#txtTypeExchange').append(H);
//         });
//     }
//     $('#txtTypeExchange').on('change', function () {
//         let id = $(this).val();
//         link = $(`#txtTypeExchange option[value="${id}"]`).attr('data-content').split('|')[2];

//         if (link == 'null') {
//             $('#txtStoreTarget').parent().css({display: 'none'});
//             var ps = $('#boxProducts').offset();
//             $('.list-group').css({top: ps.top + 30 + 'px', display: 'none'});
//         } else {
//             $('#txtStoreTarget').parent().css({display: 'block'});
//             var ps = $('#boxProducts').offset();
//             $('.list-group').css({top: ps.top + 30 + 'px', display: 'none'});
//         }
//         $('#txtStoreTarget').val(0);
//     });
// }

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


// Almacena los registros de productos en un arreglo
function putProducts(dt) {
    $.each(dt, function (v, u) {
        let H = `<div class="list-item" id="P-${u.ser_id}" data-store="${u.str_id}" data-content="${u.ser_id}|${u.ser_sku}|${u.ser_serial_number}|${u.prd_name}|${u.ser_cost}|${u.prd_coin_type}">
         ${u.ser_sku} - ${u.prd_name}<div class="items-just"><i class="fas fa-arrow-circle-right"></i></div></div>`;
        $('#listProducts').append(H);
    });
}

// Dibuja los productos
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

    $('.list-item .items-just i').unbind('click')
    .on('click', function () {
        let id = $(this).parents('.list-item');
        exchange_apply(id);
    });
}

function xdrawProducts(str) {
    $('#txtProducts').html('<option value="0" selected>Selecciona producto</option>');
    if (pr[0][1].prd_id != 0) {
        $.each(pr, function (v, u) {
            if (str == u[1].str_id) {
                let H = `<option value="${u[1].ser_id}" data-content="${u[1].prd_sku}|${u[1].stp_quantity}|${u[1].ser_serial_number}|${u[1].stp_id}">${u[1].ser_serial_number} - ${u[1].prd_name}</option>`;
                $('#txtProducts').append(H);
            }
        });
    }

    $('#txtProducts').on('change', function () {
        let cant = $('#txtProducts option:selected').attr('data-content').split('|')[1];
        $('#txtQuantityStored').html(cant);
        $('#txtQuantity').val(cant);
    });
}
// Valida los campos
function validator(prId) {
    let ky = 0;
    // let msg = '';

    // if ($('#txtTypeExchange').val() == 0) {
    //     ky = 1;
    //     msg += 'Debes seleccionar un tipo de movimiento';
    //     $('#txtTypeExchange').addClass('fail');
    // }

    // if ($('#txtStoreTarget').val() == 0 && link != '' && link != 'null') {
    //     ky = 1;
    //     msg += 'Debes seleccionar un almacen destino';
    //     $('#txtStoreTarget').addClass('fail');
    // }

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
// Aplica la seleccion para la tabla de movimientos
function exchange_apply(prId) {
    
        // let typeExchangeCodeSource = $('#txtTypeExchange option:selected').attr('data-content').split('|')[0];
        // let typeExchangeCodeTarget = $('#txtTypeExchange option:selected').attr('data-content').split('|')[3];
        // let typeExchangeIdSource = $('#txtTypeExchange option:selected').val();
        // let typeExchangeIdTarget = $('#txtTypeExchange option:selected').attr('data-content').split('|')[2];

        let storeName = $('#txtStoreSource option:selected').text();
        let storeId = $('#txtStoreSource option:selected').val();
        
        // if (link == 'null' || link == '') {
        //     typeExchangeCodeTarget = '';
        //     storeNameTarget = '';
        // }

        let prod = prId.attr('data-content').split('|');
        let productId = prod[0];
        let productSKU = prod[1];
        let productName = prod[3];
        let productSerie = prod[2];

        let commnets = $('#txtComments').val();

        update_array_products(productId);
        let par = `
            [{  
               "support"	: 	"${productSKU}",
               "prodsku"	: 	"${productSKU}",
               "prodnme"	:	"${productName}",
               "prodser"	:	"${productSerie}",
               "comment"	:	"${commnets}"
            }]
            `;
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
            editable: '<i class="fas fa-times-circle kill"></i>',
            prod_sku: `<span class="hide-support">${par[0].support}</span>${par[0].prodsku}`,
            prodname: par[0].prodnme,
            prodseri: par[0].prodser,
            comments: `<div>${par[0].comment}</div>`
            
        })
        .draw();
    btn_apply_appears();

    // clean_selectors();

    $('.edit')
        .unbind('click')
        .on('click', function () {
            let qty = parseInt($(this).parent().children('td.quantity').text()) * -1;
            let pid = $(this).parent().children('td.sku').children('span.hide-support').text().split('|')[4];
            update_array_products(pid, qty);
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
    // $('#txtStoreTarget').val(0);
    $('#txtProducts').html('<option value="0" selected>Selecciona producto</option>');
    $('#txtQuantity').val('');
    $('#txtQuantityStored').html('&nbsp;');
    $('#txtComments').val('');
}
/** Actualiza la cantidad de cada producto dentro del arreglo */
function update_array_products(id, cn) {
    let prId = $('#P-' + id);
    let qtystk = prId.children().children('.quantity').text();
    prId.children()
        .children('.quantity')
        .text(qtystk - cn);
}

function read_exchange_table() {

    $('#tblExchanges tbody tr').each(function (v, u) { //lee todo el tbody y tr, y lee como hijo td, lo que este de cada celda


            // cadena = valor1|valor2|valor3|valor4
            // variable[0] = valor1
            // variable[1] = valor2
            // variable[2] = valor3
            // variable[3] = valor4 

            // vari = cadena.split('|')[1]
            // vari = valor2



        let sku = $($(u).find('td')[1]).children('span.hide-support').text().split('|')[1];
        let product = $($(u).find('td')[2]).text();
        let quantity = $($(u).find('td')[3]).text();
        let serie = $($(u).find('td')[4]).text();
        let storeSource = $($(u).find('td')[6]).text();
        let comments = $($(u).find('td')[9]).text();
        let codeTypeExchangeSource = $($(u).find('td')[5]).text();
        let idTypeExchangeSource = $($(u).find('td')[1]).children('span.hide-support').text().split('|')[2];
        let storeTarget = $($(u).find('td')[8]).text();
        let codeTypeExchangeTarget = $($(u).find('td')[7]).text();
        let idTypeExchangeTarget = $($(u).find('td')[1]).children('span.hide-support').text().split('|')[3];
        let productId = $($(u).find('td')[1]).children('span.hide-support').text().split('|')[4];
        let storeIdSource = $($(u).find('td')[1]).children('span.hide-support').text().split('|')[5];
        let storeIdTarget = $($(u).find('td')[1]).children('span.hide-support').text().split('|')[6];

        let exchstruc1 = `${folio}|${sku}|${product}|${quantity}|${serie}|${storeSource}|${comments}|${codeTypeExchangeSource}|${idTypeExchangeSource}`;
        let exchstruc2 = `${folio}|${sku}|${product}|${quantity}|${serie}|${storeTarget}|${comments}|${codeTypeExchangeTarget}|${idTypeExchangeTarget}`;
        let exchupda1 = `${productId}|${quantity}|${storeIdSource}`;
        let exchupda2 = `${productId}|${quantity}|${storeIdTarget}`;

        console.log(exchupda1);
        console.log(exchupda2);

        if (codeTypeExchangeSource != '') {
            build_data_structure(exchstruc1);
            build_update_store_data(`${exchupda1}|S`);
        }
        if (codeTypeExchangeTarget != '') {
            build_data_structure(exchstruc2);
            build_update_store_data(`${exchupda2}|T`);
        }
    });
}

function build_data_structure(pr) {
    let el = pr.split('|');
    let par = `[
               {
                  "fol" :  "${el[0]}",
                  "sku" :  "${el[1]}",
                  "pnm" :  "${el[2]}",
                  "qty" :  "${el[3]}",
                  "ser" :  "${el[4]}",
                  "str" :  "${el[5]}",
                  "com" :  "${el[6]}",
                  "cod" :  "${el[7]}",
                  "idx" :  "${el[8]}",
                  "prj" :  ""
               }
            ]`;
    save_exchange(par);
}
function build_update_store_data(pr) {
    let el = pr.split('|');
    let par = `[
               {
                  "prd" :  "${el[0]}",
                  "qty" :  "${el[1]}",
                  "str" :  "${el[2]}",
                  "mov" :  "${el[3]}"
               }
            ]`;

    update_store(par);
}

/** Graba intercambio de almacenes */
// function save_exchange(pr) {
//     //   console.log(pr);
//     var pagina = 'MoveStoresOut/SaveExchange';
//     var par = pr;
//     var tipo = 'html';
//     var selector = exchange_result;
//     fillField(pagina, par, tipo, selector);
// }

// function update_store(ap) {
//     // console.log(ap);
//     var pagina = 'MoveStoresOut/UpdateStores';
//     var par = ap;
//     var tipo = 'html';
//     var selector = updated_stores;
//     fillField(pagina, par, tipo, selector);
// }

// function exchange_result(dt) {}

// function updated_stores(dt) {
//     // console.log(dt);

//     $('.resFolio').text(folio);
//     $('#MoveFolioModal').modal('show');
//     $('#btnHideModal').on('click', function () {
//         window.location = 'MoveStoresOut';
//     });
// }

// /* Generación del folio  */
// function uuidv4() {
//     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
//         var r = (Math.random() * 16) | 0,
//             v = c == 'x' ? r : (r & 0x3) | 0x8;
//         return v.toString(16);
//     });
// }
