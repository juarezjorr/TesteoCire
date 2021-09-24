let prdItem, prdSupr;
let cnttot, cntcur;
let folio;

$(document).ready(function () {
    verifica_usuario();
    inicial();
});

function inicial() {
    folio = getFolio();
    setting_datepicket($('#txtStartDate'));
    setting_datepicket($('#txtEndDate'));
    setting_table();
    get_products();
    get_suppliers();
    get_coins();
    get_stores();

    $('#btn_subletting').on('click', function () {
        subletting_apply();
    });
    $('#txtEndDate').on('change', function () {
        validator();
    });
    $('#txtQuantity').on('change', function () {
        validator();
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

/** ++++  Setea la tabla ++++++ */
function setting_table() {
    let title = 'Productos en subarrendo';
    let filename = title.replace(/ /g, '_') + '-' + moment(Date()).format('YYYYMMDD');

    $('#tblProductForSubletting').DataTable({
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
                text: 'Aplicar subarrendos',
                footer: true,
                className: 'btn-apply hidden-field',
                action: function (e, dt, node, config) {
                    read_ProductForSubletting_table();
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
            {data: 'prodcant', class: 'quantity'},
            {data: 'prodpric', class: 'price'},
            {data: 'supplier', class: 'supply'},
            {data: 'datestar', class: 'date'},
            {data: 'date_end', class: 'date'},
            {data: 'comments', class: 'comments'},
        ],
    });
}
/**  +++++ Obtiene los datos de los productos activos +++++  */
function get_products() {
    var pagina = 'ProductsForSubletting/listProducts';
    var par = `[{"store":""}]`;
    var tipo = 'json';
    var selector = put_Products;
    fillField(pagina, par, tipo, selector);
}

/**  +++++ Obtiene los datos los proveedores que subarrendan +++++  */
function get_suppliers() {
    var pagina = 'ProductsForSubletting/listSuppliers';
    var par = `[{"store":""}]`;
    var tipo = 'json';
    var selector = put_suppliers;
    fillField(pagina, par, tipo, selector);
}

/**  +++++ Obtiene los datos los proveedores que subarrendan +++++  */
function get_coins() {
    var pagina = 'ProductsForSubletting/listCoins';
    var par = `[{"store":""}]`;
    var tipo = 'json';
    var selector = put_coins;
    fillField(pagina, par, tipo, selector);
}

/**  +++++ Obtiene los datos los proveedores que subarrendan +++++  */
function get_stores() {
    var pagina = 'ProductsForSubletting/listStores';
    var par = `[{"store":""}]`;
    var tipo = 'json';
    var selector = put_stores;
    fillField(pagina, par, tipo, selector);
}

/**  ++++   Coloca los productos en el listado del input */
function put_Products(dt) {
    var ps = $('#txtProducts').offset();

    $('.list-group').css({top: ps.top + 60 + 'px'});
    $('.list-group').slideUp('100', function () {
        $('#listProducts').html('');
    });

    $.each(dt, function (v, u) {
        let H = `<div class="list-item" id="P-${u.prd_id}" data_complement="${u.ser_id}|${u.prd_sku}|${u.ser_serial_number}|${u.ser_cost}|${u.cin_id}">${u.prd_name}</div>`;
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
        $('#txtProducts').val(prdNm);
        $('#txtIdProducts').val(prdId);
        $('#txtPrice').val($(this).attr('data_complement').split('|')[3]);
        $('#txtCoinType').val($(this).attr('data_complement').split('|')[4]);
        $('.list-group').slideUp(100);
        validator();
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
/**  ++++   Coloca los proveedores en el listado del input */
function put_suppliers(dt) {
    $.each(dt, function (v, u) {
        let H = `<option value="${u.sup_id}">${u.sup_business_name}</option>`;
        $('#txtSupplier').append(H);
    });
    $('#txtSupplier').on('change', function () {
        validator();
    });
}

/**  ++++   Coloca las monedas en el listado del input */
function put_coins(dt) {
    $.each(dt, function (v, u) {
        let H = `<option value="${u.cin_id}">${u.cin_code} - ${u.cin_name}</option>`;
        $('#txtCoinType').append(H);
    });
    $('#txtCoinType').on('change', function () {
        validator();
    });
}
/**  ++++   Coloca los almacenes en el listado del input */
function put_stores(dt) {
    $.each(dt, function (v, u) {
        let H = `<option value="${u.str_id}">${u.str_name}</option>`;
        $('#txtStoreSource').append(H);
    });
    $('#txtStoreSource').on('change', function () {
        validator();
    });
}

/* ++++  Registra el subarrendo  +++++++ */
function subletting_apply() {
    let sku = $('#txtIdProducts').val().split('|')[2];
    let productName = $('#txtProducts').val();
    let quantity = $('#txtQuantity').val();
    let supplierId = $('#txtSupplier').val();
    let supplierName = $('#txtSupplier option:selected').text();
    let dateStart = $('#txtStartDate').val();
    let dateEnd = $('#txtEndDate').val();

    let productId = $('#txtIdProducts').val().split('|')[0].substring(2, 10);
    let serieId = $('#txtIdProducts').val().split('|')[1];
    let serienumber = $('#txtIdProducts').val().split('|')[3];

    let price = $('#txtPrice').val();
    let coinType = $('#txtCoinType').val();
    let comments = $('#txtComments').val();

    let storeId = $('#txtStoreSource').val();
    let storeName = $('#txtStoreSource option:selected').text();

    prdSupr = `${serieId}|${productId}|${supplierId}|${serienumber}|${storeId}|${storeName}`;
    prdItem = `
   [{
      "support"  :  "${prdSupr}",
      "prodsku"  :  "${sku}R001",
      "prodnme"  :  "${productName}",
      "prodqty"  :  "${quantity}",
      "prodprc"  :  "${price}",
      "cointyp"  :  "${coinType}",
      "supplie"  :  "${supplierName}",
      "datestr"  :  "${dateStart}",
      "dateend"  :  "${dateEnd}",
      "comment"  :  "${comments}"
   }]`;

    if (serieId == 0) {
        let par_ser = `
            [{
               "prodsku"  :  "${sku}",
               "produid"  :  "${productId}",
               "prprice"  :  "${price}",
               "supplid"  :  "${supplierId}",
               "cointyp"  :  "${coinType}",
               "storeid"  :  "${storeId}",
               "storenm"  :  "${storeName}"
            }]`;
        get_serialid(par_ser);
    } else {
        fill_table();
    }
}

/* ++++  Agrega el producto a la tabla   +++++++ */
function get_serialid(par) {
    var pagina = 'ProductsForSubletting/addSerie';
    var par = par;
    var tipo = 'html';
    var selector = put_serialid;
    fillField(pagina, par, tipo, selector);
}

/* ++++  Obtiene el serial del producto agregado  +++++++ */
function put_serialid(dt) {
    prdSupr = dt;
    fill_table();
}

// Llena la tabla de subarrendos
function fill_table() {
    par = prdItem;
    let largo = $('#tblProductForSubletting tbody tr td').html();
    largo == 'Ningún dato disponible en esta tabla' ? $('#tblProductForSubletting tbody tr').remove() : '';
    par = JSON.parse(par);

    let tabla = $('#tblProductForSubletting').DataTable();

    tabla.row
        .add({
            supports: prdSupr,
            editable: '<i class="fas fa-times-circle kill"></i>',
            prod_sku: `<span class="hide-support">${prdSupr}|${par[0].prodsku}</span>${par[0].prodsku}`,
            prodname: par[0].prodnme,
            prodcant: `<span>${par[0].prodqty}</span>`,
            prodpric: `<span class="hide-support">${par[0].prodprc}|${par[0].cointyp}</span>${par[0].prodprc}`,
            supplier: par[0].supplie,
            datestar: par[0].datestr,
            date_end: par[0].dateend,
            comments: `<div>${par[0].comment}</div>`,
        })
        .draw();
    btn_apply_appears();

    clean_selectors();

    $('.edit')
        .unbind('click')
        .on('click', function () {
            let qty = parseInt($(this).parent().children('td.quantity').text()) * -1;
            let pid = $(this).parent().children('td.sku').children('span.hide-support').text().split('|')[4];

            tabla.row($(this).parent('tr')).remove().draw();
            btn_apply_appears();
            clean_selectors();
        });
}

/* ++++  Muestra y oculta el boton de aplicar movimiento  +++++++ */
function btn_apply_appears() {
    let tabla = $('#tblProductForSubletting').DataTable();
    let rengs = tabla.rows().count();
    if (rengs > 0) {
        $('.btn-apply').removeClass('hidden-field');
    } else {
        $('.btn-apply').addClass('hidden-field');
    }
}

// Limpia los campos para uns nueva seleccion
function clean_selectors() {
    $('#txtProducts').val('');
    $('#txtIdProducts').val(0);
    // setting_datepicket($('#txtStartDate'));
    // setting_datepicket($('#txtEndDate'));
    $('#txtPrice').val('');
    $('#txtQuantity').val('');
    // $('#txtSupplier').val(0);
    // $('#txtCoinType').val(0);
}

//  Lee el contenido de la tabla y construye la estructura para guardar los datoos
function read_ProductForSubletting_table() {
    cnttot = $('#tblProductForSubletting tbody tr').length;
    cntcur = 0;
    $('#tblProductForSubletting tbody tr').each(function (v, u) {
        let sub_price = $($(u).find('td')[4]).children('span.hide-support').text().split('|')[0];
        let sub_coin_type = $($(u).find('td')[4]).children('span.hide-support').text().split('|')[1];
        let sub_quantity = $($(u).find('td')[3]).text();
        let sub_date_start = moment($($(u).find('td')[6]).text(), 'DD/MM/YYYY').format('YYYYMMDD');
        let sub_date_end = moment($($(u).find('td')[7]).text(), 'DD/MM/YYYY').format('YYYYMMDD');
        let sub_comments = $($(u).find('td')[8]).text();
        let ser_id = $($(u).find('td')[1]).children('span.hide-support').text().split('|')[0];
        let sup_id = $($(u).find('td')[1]).children('span.hide-support').text().split('|')[2];
        let ser_sku = $($(u).find('td')[1]).children('span.hide-support').text().split('|')[6];
        let ser_serial = $($(u).find('td')[1]).children('span.hide-support').text().split('|')[3];
        let str_id = $($(u).find('td')[1]).children('span.hide-support').text().split('|')[4];
        let str_name = $($(u).find('td')[1]).children('span.hide-support').text().split('|')[5];
        let prd_name = $($(u).find('td')[2]).text();

        let chainText = `${sub_price}|${sub_coin_type}|${sub_quantity}|${sub_date_start}|${sub_date_end}|${sub_comments}|${ser_id}|${sup_id}|${ser_sku}|${prd_name}|${ser_serial}|${str_id}|${str_name}`;
        build_data_structure(chainText);
    });
}

/* ++++  Construye la estructura guardar el movimiento  +++++++ */
function build_data_structure(pr) {
    let el = pr.split('|');

    let par = `
    [{
        "prc" :  "${el[0]}",
        "cin" :  "${el[1]}",
        "qty" :  "${el[2]}",
        "dst" :  "${el[3]}",
        "den" :  "${el[4]}",
        "com" :  "${el[5]}",
        "ser" :  "${el[6]}",
        "sup" :  "${el[7]}",
        "fol" :  "${folio}",
        "sku" :  "${el[8]}",
        "nme" :  "${el[9]}",
        "srn" :  "${el[10]}",
        "stn" :  "${el[12]}",
        "sti" :  "${el[11]}",
        "exn" :  "ESA",
        "exi" :  "8",
        "prj" :  ""
    }]`;

    save_subletting(par);
}

/* ++++  Guarda el movimiento y el producto en subarrendo y actualiza el stock de almacen  +++++++ */
function save_subletting(par) {
    cntcur++;

    var pagina = 'ProductsForSubletting/addSubletting';
    var par = par;
    var tipo = 'html';
    var selector = put_subletting;
    fillField(pagina, par, tipo, selector);
}

/* ++++  Termina el proceso y refresca la interfase  +++++++ */
function put_subletting(dt) {
    if (cntcur >= cnttot) {
        $('.resFolio').text(folio);
        $('#MoveFolioModal').modal('show');
        $('#btnHideModal').on('click', function () {
            window.location = 'ProductsForSubletting';
        });
    }
}

/*  ++++++++ Valida los campos  +++++++ */
function validator() {
    let ky = 0;
    let msg = '';
    $('.required').each(function () {
        if ($(this).val() == 0) {
            msg += $(this).attr('data-mesage') + '\n';
            ky = 1;
        }
    });

    let a = moment($('#txtEndDate').val(), 'DD/MM/YYYY');
    let b = moment($('#txtStartDate').val(), 'DD/MM/YYYY');
    let dif = a.diff(b, 'days');

    if (dif < 1) {
        ky = 1;
        msg += 'La fecha final debe ser por lo menos de un día de diferencia';
    }
    if (ky == 0) {
        $('#btn_subletting').removeClass('disabled');
    } else {
        $('#btn_subletting').addClass('disabled');
    }
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
