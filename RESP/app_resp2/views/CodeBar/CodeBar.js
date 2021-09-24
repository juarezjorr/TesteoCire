var seccion = '';
const guid = uuidv4();
let = pr = [];
let = link = '';

$(document).ready(function () {
    verifica_usuario();
    inicial();
});

function inicial() {
    $("#listProducts").mouseleave(function() {
       $('.list-group').slideToggle(80);
    });

    getExchange();
    getStores();
    getProducts();
    setting_table();
    $('#btn_exchange').on('click', function () {
        exchange_apply();
    });
}

function setting_table() {
    let title = 'Movimiento de Almacenes';
    let filename = title.replace(/ /g, '_') + '-' + moment(Date()).format('YYYYMMDD');

    $('#tblExchanges').DataTable({
        order: [[0, 'desc']],
        pageLength: 1000,
        dom: 'Blfrtip',
        buttons: [
            {
                //Botón para Excel
                extend: 'excel',
                footer: true,
                title: title,
                filename: filename,

                //Aquí es donde generas el botón personalizado
                text: '<button class="btn btn-excel" hidden><i class="fas fa-file-excel"></i></button>',
            },
            {
                //Botón para PDF
                extend: 'pdf',
                footer: true,
                title: title,
                filename: filename,

                //Aquí es donde generas el botón personalizado
                text: '<button class="btn btn-pdf" hidden><i class="fas fa-file-pdf"></i></button>',
            },
            {
                //Botón para imprimir
                extend: 'print',
                footer: true,
                title: title,
                filename: filename,

                //Aquí es donde generas el botón personalizado
                text: '<button class="btn btn-print" hidden><i class="fas fa-print"></i></button>',
            },
            {
                // Boton aplicar cambios
                text: 'Generar codigos de barras',
                className: 'btn-apply hidden-field',
                action: function (e, dt, node, config) {
                    print_Code();
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
            {
                data: 'supports',
                class: 'support',
                visible: false,
                searchable: false,
            },
            {data: 'editable', class: 'edit'},
            {data: 'prod_sku', class: 'sku'},
            {data: 'prodname', class: 'product-name'},
    

        ],
    });
}

// Solicita los tipos de movimiento
function getExchange() {
    var pagina = 'MoveStoresOut/listExchange';
    var par = '[{"parm":""}]';
    var tipo = 'json';
    var selector = putTypeExchange;
    fillField(pagina, par, tipo, selector);
}
// Solicita el listado de almacenes
function getStores() {
    var pagina = 'MoveStoresOut/listStores';
    var par = '[{"parm":""}]';
    var tipo = 'json';
    var selector = putStores;
    fillField(pagina, par, tipo, selector);
}
// Solicita los productos de un almacen seleccionado
function getProducts() {
    var pagina = 'MoveStoresOut/listProducts';
    var par = `[{"store":""}]`;
    var tipo = 'json';
    var selector = putProducts;
    fillField(pagina, par, tipo, selector);
}
// Solicita los movimientos acurridos
function getExchanges() {
    var pagina = 'MoveStoresOut/listExchanges';
    var par = `[{"guid":"${guid}"}]`;
    var tipo = 'json';
    var selector = putExchanges;
    fillField(pagina, par, tipo, selector);
}
/*  LLENA LOS DATOS DE LOS ELEMENTOS */
// Dibuja los tipos de movimiento
function putTypeExchange(dt) {
    if (dt[0].ext_id != 0) {
        $.each(dt, function (v, u) {
            let H = `<option value="${u.ext_id}" data-content="${u.ext_code}|${u.ext_type}|${u.ext_link}|${u.ext_code_a}|${u.ext_type_a}">${u.ext_code} - ${u.ext_description}</option>`;
            $('#txtTypeExchange').append(H);
        });
    }
    $('#txtTypeExchange').on('change', function () {
        let id = $(this).val();
        link = $(`#txtTypeExchange option[value="${id}"]`).attr('data-content').split('|')[2];

        if (link == 'null') {
            $('#txtStoreTarget').parent().css({display: 'none'});
            var ps = $('#boxProducts').offset();
            $('.list-group').css({top: ps.top + 30 + 'px', display: 'none'});
        } else {
            $('#txtStoreTarget').parent().css({display: 'block'});
            var ps = $('#boxProducts').offset();
            $('.list-group').css({top: ps.top + 30 + 'px', display: 'none'});
        }
        $('#txtStoreTarget').val(0);
    });
}

// Dibuja los almacenes
function putStores(dt) {
    if (dt[0].str_id != 0) {
        $.each(dt, function (v, u) {
            let H = `<option value="${u.str_id}">${u.str_name}</option>`;
            $('#txtStoreSource').append(H);
            $('#txtStoreTarget').append(H);
        });
    }

    $('#txtStoreSource').on('change', function () {
        let id = $(this).val();
        $(`#txtStoreTarget option`).css({display: 'block'});
        $(`#txtStoreTarget option[value="${id}"]`).css({display: 'none'});

        drawProducts(id);
    });
}
// Almacena los registros de productos en un arreglo
function putProducts(dt) {
    $.each(dt, function (v, u) {
        let H = `<div class="list-item" id="P-${u.ser_id}" data-store="${u.str_id}" data-content="${u.ser_id}|${u.ser_sku}|${u.ser_serial_number}|${u.prd_name}|${u.ser_cost}|${u.prd_coin_type}">
         ${u.ser_sku} - ${u.prd_name}<div class="items-just"><div class="quantity editable" data-content="1" contenteditable=true hidden>1</div><i class="fas fa-arrow-circle-right"></i></div></div>`;
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
            $('.list-group').slideToggle(100);
            $('.box-items-list i').toggleClass('rotate');
        });

    $('.list-item .items-just i').on('click', function () {
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
    let msg = '';

   /* if ($('#txtTypeExchange').val() == 0) {
        ky = 1;
        msg += 'Debes seleccionar un tipo de movimiento';
        $('#txtTypeExchange').addClass('fail');
    }

    if ($('#txtStoreTarget').val() == 0 && link != '' && link != 'null') {
        ky = 1;
        msg += 'Debes seleccionar un almacen destino';
        $('#txtStoreTarget').addClass('fail');
    }*/

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
    if (validator(prId) == 0) {
        let typeExchangeCodeSource = $('#txtTypeExchange option:selected').attr('data-content').split('|')[0];
        let typeExchangeCodeTarget = $('#txtTypeExchange option:selected').attr('data-content').split('|')[3];
        let typeExchangeIdSource = $('#txtTypeExchange option:selected').val();
        let typeExchangeIdTarget = $('#txtTypeExchange option:selected').attr('data-content').split('|')[2];

        let storeNameSource = $('#txtStoreSource option:selected').text();
        let storeNameTarget = $('#txtStoreTarget option:selected').text();
        let storeIdSource = $('#txtStoreSource option:selected').val();
        let storeIdTarget = $('#txtStoreTarget option:selected').val();

        if (link == 'null' || link == '') {
            typeExchangeCodeTarget = '';
            storeNameTarget = '';
        }

        let prod = prId.attr('data-content').split('|');
        let productId = prod[0];
        let productSKU = prod[1];
        let productName = prod[3];
        let productQuantity = prId.children().children('.quantity').text();
        let productSerie = prod[2];

        let commnets = $('#txtComments').val();
        let project = '';

        update_array_products(productId, productQuantity);
        let par = `
            [{
               "support"    :  "${guid}|${productSKU}|${typeExchangeIdSource}|${typeExchangeIdTarget}|${productId}|${storeIdSource}|${storeIdTarget}",
               "prodsku"	: 	"${productSKU}",
               "prodnme"	:	"${productName}",
               "prodqty"	:	"${productQuantity}",
               "prodser"	:	"${productSerie}",
               "excodsr"	:	"${typeExchangeCodeSource}",
               "stnmesr"	:	"${storeNameSource}",
               "excodtg"	:	"${typeExchangeCodeTarget}",
               "stnmetg"	:	"${storeNameTarget}",
               "comment"	:	"${commnets}",
               "project"	:	"${project}",
               "excidsr"	:	"${typeExchangeIdSource}",
               "excidtg"	:	"${typeExchangeIdTarget}",
               "stoidsr"	:	"${storeIdSource}",
               "stoidtg"	:	"${storeIdTarget}",
               "folguid"	:	"${guid}"
            }]
            `;
        //console.log(par);
        fill_table(par);
    }
}

// Llena la tabla de movimientos
function fill_table(par) {
    let largo = $('#tblExchanges tbody tr td').html();
    largo == 'Ningún dato disponible en esta tabla' ? $('#tblExchanges tbody tr').remove() : '';
    par = JSON.parse(par);

    let tabla = $('#tblExchanges').DataTable();

    tabla.row
        .add({
            supports: par[0].support,
            editable: '<i class="fas fa-times-circle kill"></i>',
            prod_sku: `<span class="hide-support">${par[0].support}</span>${par[0].prodsku}`,
            prodname: par[0].prodnme,
            prodcant: `<span>${par[0].prodqty}</span>`,
            prodseri: par[0].prodser,
            codexcsc: par[0].excodsr,
            stnamesc: par[0].stnmesr,
            codexctg: par[0].excodtg,
            stnametg: par[0].stnmetg,
            comments: `<div>${par[0].comment}</div>`,
        })
        .draw();
    btn_apply_appears();

    // clean_selectors();

    $('.edit')
        .unbind('click')
        .on('click', function () {
            let qty = parseInt($(this).parent().children('td.quantity').text()) ;
            let pid = $(this).parent().children('td.sku').children('span.hide-support').text().split('|')[4];
            console.log(qty);
            console.log(pid);

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
    $('#txtStoreTarget').val(0);
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
        .text(1);
}

function read_exchange_table() {
    $('#tblExchanges tbody tr').each(function (v, u) {
        let guid = $($(u).find('td')[1]).children('span.hide-support').text().split('|')[0];
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

        let exchstruc1 = `${guid}|${sku}|${product}|${quantity}|${serie}|${storeSource}|${comments}|${codeTypeExchangeSource}|${idTypeExchangeSource}`;
        let exchstruc2 = `${guid}|${sku}|${product}|${quantity}|${serie}|${storeTarget}|${comments}|${codeTypeExchangeTarget}|${idTypeExchangeTarget}`;
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
                  "gui" :  "${el[0]}",
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
function save_exchange(pr) {
    //   console.log(pr);
    var pagina = 'MoveStoresOut/SaveExchange';
    var par = pr;
    var tipo = 'html';
    var selector = exchange_result;
    fillField(pagina, par, tipo, selector);
}

function update_store(ap) {
    // console.log(ap);
    var pagina = 'MoveStoresOut/UpdateStores';
    var par = ap;
    var tipo = 'html';
    var selector = updated_stores;
    fillField(pagina, par, tipo, selector);
}

function exchange_result(dt) {}

function updated_stores(dt) {
    // console.log(dt);
    window.location = 'MoveStoresOut';
}

/* Generación del GUID  */
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

function generateBarcode(selector,SKU){

    var medidas = $('#selectTipoMedida option:selected').attr('id');
    var largo = 0;
    var alto = 0;
    var texto = 0;

    switch(medidas) {
        case '1':
            largo = .39;
            alto = 40;
            texto = 5;
          break;
        case '2':
            largo = .62;
            alto = 60;
            texto = 6;
          break;
        case '3':
            largo = .85;
            alto = 84;
            texto = 7;
          break;
        case '4':
            largo = 1.05;
            alto = 104;
            texto = 10;
          break;
        case '5':
            largo = 2.1;
            alto = 208;
            texto = 12;
          break;
        default:
          // code block
      }


    JsBarcode(selector, SKU, {
        format: "CODE128",
        lineColor: "#000000",
        width: largo,
        height: alto,
        displayValue: SKU,
        fontSize: texto,
        textMargin: 2,
        margin: 10
      });
  }


function print_Code(){
    $("#modalSku").html("");
    //$('#modalCodigoBarra').modal('show');
    let tabla = $('#tblExchanges').DataTable();

    var selected = tabla.data();
    var idSelected = '';
    var contador = 1;

    selected.each(function (index) {
       var arraySku =  index.supports.split("|");
       idSelected += arraySku[1] + ',';
       console.log(arraySku[1]);
       var selector = "barcode"+contador;
       $("#modalSku").append("<svg  id='"+selector+"'></svg  >");
       generateBarcode("#"+selector,arraySku[1]);
       contador++;

    });
    idSelected = idSelected.slice(0, -1);
    PrintCodeBar();
}

function PrintCodeBar() {
    var data = $("#modalSku").html();
    var source = '<html><head><title></title>'+'<link rel="stylesheet" href="css/mycss.css" type="text/css" />'+
    '<script type="text/javascript">'+
    //'setTimeout(() => {window.print();window.close();}, 1000);'+
    'setTimeout(() => {window.close();}, 3000);'+
    '</script>'+'</head><body onload="window.print();" >'+data+'</body></html>';

    Pagelink = "about:blank";
    var pwa = window.open(Pagelink, "_new");
    pwa.document.open();
    pwa.document.write(source);
    //pwa.print();
    pwa.document.close();
    //$('#modalCodigoBarra').modal('hide');
}

