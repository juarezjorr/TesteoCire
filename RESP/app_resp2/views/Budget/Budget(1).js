let cust, proj, relc, vers, prod;

$('document').ready(function () {
    get_customers();
    get_projects();
    get_products();
    button_actions();
});

/** OBTENCION DE DATOS */
/**  Obtiene el listado de clientes */
function get_customers() {
    var pagina = 'Budget/listCustomers';
    var par = `[{"prm":""}]`;
    var tipo = 'json';
    var selector = put_customers;
    fillField(pagina, par, tipo, selector);
}

/**  Obtiene el listado de proyectos */
function get_projects() {
    var pagina = 'Budget/listProjects';
    var par = `[{"prm":""}]`;
    var tipo = 'json';
    var selector = put_projects;
    fillField(pagina, par, tipo, selector);
}

/**  Obtiene los Id's de los elementos relacionados con la seleccion del cliente */
function get_rel_customers(cusId, cutId) {
    var pagina = 'Budget/listCustomersDef';
    var par = `[{"cusId":"${cusId}", "cutId":"${cutId}"}]`;
    var tipo = 'json';
    var selector = put_rel_customers;
    fillField(pagina, par, tipo, selector);
}
/**  Obtiene los Id's de los proyectos relacionados con la seleccion del cliente */
function get_rel_projects(id, prn) {
    var pagina = 'Budget/listProjectsDef';
    var par = `[{"cusId":"${id}"}]`;
    var tipo = 'json';
    var selector = put_rel_projects;
    fillField(pagina, par, tipo, selector);
}

/**  Obtiene el listado de proyectos */
function get_version(pjtId) {
    var pagina = 'Budget/listVersion';
    var par = `[{"pjtId":"${pjtId}"}]`;
    var tipo = 'json';
    var selector = put_version;
    fillField(pagina, par, tipo, selector);
}

/**  Obtiene el listado de cotizaciones */
function get_budgets() {
    var pagina = 'Budget/listBudgets';
    var par = `[{"verId":"${vers}"}]`;
    var tipo = 'json';
    var selector = put_budgets;
    fillField(pagina, par, tipo, selector);
}

/**  Obtiene el listado de proyectos */
function get_products() {
    var pagina = 'Budget/listProducts';
    var par = `[{"pjtId":""}]`;
    var tipo = 'json';
    var selector = put_products;
    fillField(pagina, par, tipo, selector);
}

/**  Llena el listado de prductores */
function put_customers(dt) {
    cust = dt;
    $.each(cust, function (v, u) {
        let H = ` <li id="C${u.cus_id}" class="enable" data_content="${v}|${u.cut_name}">${u.cus_name}</li>`;
        // let L = ` <li id="R${u.cus_id}" data_content="${v}|${u.cut_name}">${u.cus_name}</li>`;
        $('#Customer .list_items ul').append(H);
        // $('#Relation .list_items ul').append(L);
        // $('#Relation .list_items ul li').css({display: 'none'});
    });
    select_customer();
    // get_projects();
}

/**  Llena el listado de proyectos */
function put_projects(dt) {
    proj = dt;
    $.each(proj, function (v, u) {
        let H = ` <li id="P${u.pjt_id}" class="enable" data_content="${v}|${u.cus_id}|${u.cus_parent}|${u.cuo_id}">${u.pjt_name}</li>`;
        $('#Projects .list_items ul').append(H);
    });

    selector_projects();
}

/**  Llena el listado de prductores */
function put_rel_customers(dt) {
    // console.log(dt);
    // $('#Relation .grouper').html('');
    $('#Relation .list_items ul li').css({display: 'none'});
    $.each(dt, function (v, u) {
        $(`#R${u.cus_id}`).css({display: 'block'});
    });
    select_relation();
}

/**  Llena el listado de prductores */
function put_rel_projects(dt) {
    $('#Projects .list_items ul li').removeClass('enable').addClass('disable');
    $.each(dt, function (v, u) {
        $('#Projects .list_items ul li').each(function () {
            let grp = $(this).attr('data_content');
            let pard = grp.split('|')[3];
            if (pard == u.cuo_id) {
                $(this).addClass('enable').removeClass('disable');
            }
        });
    });
    selector_projects();
}
/**  Llena el listado de versiones */
function put_version(dt) {
    let H = `
    <div class="full text_center">
        <h6>DOCUMENTOS</h6>
    </div>`;
    $('#versions').html(H);

    $.each(dt, function (v, u) {
        H = `
            <div class="blocks documents">
                <div class="half vers left" id="V${u.ver_id}">${u.ver_code}</div>
                <div class="half right">${moment(u.ver_date).format('DD-MMM-yyyy')}</div>
            </div>
        `;
        $('#versions').append(H);
    });

    $('.documents .vers')
        .unbind('click')
        .on('click', function () {
            vers = $(this).attr('id').substring(1, 100);
            console.log(vers);
            get_budgets();
            fill_dinamic_table();
            add_boton();
        });
}

/**  Llena el listado de cotizaciones */
function put_budgets(dt) {
    console.log(dt);

    if (dt[0].bdg_id > 0) {
        console.log('fill_fields');

        $.each(dt, function (v, u) {
            let jsn = JSON.stringify(u);
            fill_budget_prods(jsn);
        });
    } else {
        console.log('no budgets there are');
    }
}

/**  Llena el listado de productos */
function put_products(dt) {
    prod = dt;
    $.each(dt, function (v, u) {
        let H = `
            <li data_indx ="${v}" data_content="${u.prd_sku}|${u.prd_name.replace(/"/g, '')}">${u.prd_name}</li>
        `;
        $('.list_products ul').append(H);
    });

    $('.list_products ul li').on('click', function () {
        let inx = $(this).attr('data_indx');

        save_budget(prod[inx], vers, inx);
    });

    $('#Products .sel_product')
        .unbind('keyup')
        .on('keyup', function () {
            let idSel = $(this).parent().attr('id');
            let text = $(this).text().toUpperCase();
            console.log(idSel, '-' + text + '-');

            sel_product(text, idSel);
        });
}

/**  Activa los botones de acciones */
function button_actions() {
    $('#addProducer')
        .unbind('click')
        .on('click', function () {
            add_client();
        });

    $('#addProject')
        .unbind('click')
        .on('click', function () {
            add_project();
        });

    $('#newQuote')
        .unbind('click')
        .on('click', function () {
            // new_quote();
            window.location = 'Budget';
        });
    $('.frame_fix_col .sel i').on('click', function (e) {
        let idsel = $(this).attr('id');
        let x = e.pageX;
        let y = e.pageY;
        show_minimenues(idsel, x, y);
    });

    $('.dato')
        .unbind('keyup')
        .on('keyup', function () {
            let idSel = $(this).attr('id');
            let grp = $(`#${idSel} .grouper`).text().toUpperCase();
            $(`#${idSel}`).children('.list_items').slideDown(200);
            $(`#${idSel}`).children('i').addClass('rotar');
            $('.customerType').html('');
            sel_items(grp, idSel);
        });

    $('.dato .grouper')
        .unbind('focus')
        .on('focus', function () {
            $('.list_items').slideUp(200);
            $('i').removeClass('rotar');
        });

    $('.dato')
        .parent()
        .parent()
        .parent()
        .on('mouseleave', function () {
            $('.list_items').slideUp(200);
            $('i').removeClass('rotar');
        });

    $('.dato .fa-caret-down')
        .unbind('click')
        .on('click', function () {
            //console.log($(this).parent().html());
            let idSel = $(this).parent().attr('id');
            let clss = $(`#${idSel}`).children('i').attr('class').indexOf('rotar');
            $('.list_items').slideUp(200);
            $('i').removeClass('rotar');
            if (clss < 0) {
                $(`#${idSel}`).children('.list_items').slideDown(200);
                $(`#${idSel}`).children('i').addClass('rotar');
            }
        });

    $('.dato')
        .unbind('change')
        .on('change', function () {
            console.log($(this).html());
        });

    $('.serc')
        .unbind('click')
        .on('click', function () {
            let projFind = $('#numProject .search').html();
            let found = 0;
            $.each(proj, function (v, u) {
                if (projFind == u.pjt_number) {
                    console.log(u);
                    $('#C' + u.cus_id).trigger('click');
                    $('#P' + u.pjt_id).trigger('click');
                    $('#R' + u.cus_parent).trigger('click');
                    found = 1;
                }
            });
            if (found == 0) {
                $('.error').html('Proyecto no encontrado');
                clena_projects_field();
                clena_customer_field();
                setTimeout(() => {
                    $('.error').html('&nbsp;');
                }, 3000);
            } else {
                $('.error').html('&nbsp;');
            }
        });
}

/** Coloca el boton de agregar nuevo producto en la tabla  */
function add_boton() {
    let H = `
    <tr>
        <td colspan="12">
            <button class="btn-add" id="addProduct">+ agregar producto</button>
        </td>
    </tr>
    `;
    $('#tblControl tbody').append(H);
    $('.frame_fix_row #addProduct').on('click', function () {
        var posLeft = $('#addProduct').offset().left;
        var posTop = $('#addProduct').offset().top;
        $('.box_list_products')
            .css({top: posTop + 'px', left: posLeft + 'px'})
            .slideDown(200);
    });
}

function modal_products() {
    $('.box_modal_deep').css({display: 'flex'});
    $('.box_modal').animate(
        {
            top: '70px',
        },
        500
    );
}

/** Selectores de items */
/** Clientes */
function select_customer() {
    $('#Customer .list_items ul li.enable')
        .unbind('click')
        .on('click', function () {
            let idSel = $(this).parents('.dato');
            let indx = $(this).attr('data_content').split('|')[0];
            let type = $(this).attr('data_content').split('|')[1];
            idSel.children('.grouper').html('<i class="fas fa-times-circle clean"></i> ' + $(this).html());
            idSel.children('.customerType').html('<span>' + type + '</span>');
            $('.list_items').slideUp(200);
            $('i').removeClass('rotar');
            let cs = cust[indx];
            let respons = cs.cut_id == 1 ? 'Productor responsable' : 'Casa productora';
            $('#Relation').parent().children('.concepto').html(respons);
            $('#AddressProducer').html(cs.cus_address);
            $('#EmailProducer').html(cs.cus_email);
            $('#PhoneProducer').html(cs.cus_phone);
            $('#QualificationProducer').html(cs.cus_qualification);
            $('#Relation .grouper').html('');
            $('#Customer .grouper').attr('data_identy', cs.cus_id);
            // get_rel_customers(cs.cus_id, cs.cut_id);
            get_rel_projects(cs.cus_id);
            clena_projects_field();

            $('#Customer i.clean')
                .unbind('click')
                .on('click', function () {
                    clena_customer_field();
                    clena_projects_field();
                });
        });
}
/** Relacion */
function select_relation() {
    $('#Relation .list_items li')
        .unbind('click')
        .on('click', function () {
            let idSel = $(this).parents('.dato');
            idSel.children('.grouper').html($(this).html());
            let pdrt = $(this).attr('id');
            let prnt = $('#Customer .grouper').attr('data_identy');
            console.log(pdrt, prnt);
            console.log(pdrt.substring(1, pdrt.length), prnt);
            get_rel_projects(pdrt.substring(1, pdrt.length), prnt);
            clena_projects_field();
            $('.list_items').slideUp(200);
            $('i').removeClass('rotar');
        });
}

/** Proyectos */
function selector_projects() {
    $('#Projects .list_items ul li')
        .unbind('click')
        .on('click', function () {
            let status = $(this).attr('class');
            if (status == 'enable') {
                let idSel = $(this).parents('.dato');
                let indx = $(this).attr('data_content').split('|')[0];
                $('.list_items').slideUp(200);
                $('i').removeClass('rotar');
                let pj = proj[indx];
                $('#C' + pj.cus_id).trigger('click');
                // $('#R' + pj.cus_parent).trigger('click');
                idSel.children('.grouper').html('<i class="fas fa-times-circle clean"></i> ' + $(this).html());
                $('#LocationProject').html(pj.pjt_location);
                $('#TypeLocation').html(pj.loc_id);
                $('#DateProject').html(pj.pjt_date_project);
                $('#numProject .search').html(pj.pjt_number);

                get_version(pj.pjt_id);

                $('#Projects i.clean')
                    .unbind('click')
                    .on('click', function () {
                        clena_projects_field();
                    });
            }
        });
}

function fill_dinamic_table() {
    let H = `
    <table class="table_control" id="tblControl" style="width: 1310px;">
        <thead>
            <tr class="headrow">
                <th rowspan="2" class="w1 fix product">PRODUCTO</th>
                <th colspan="5" class="zone_01 headrow" >COTIZACIÓN BASE</th>
                <th colspan="3" class="zone_02 headrow" >VIAJE</th>
                <th colspan="3" class="zone_03 headrow" >PRUEBAS</th>
            </tr>
            <tr>
                <th class="w2 zone_01" >Cantidad</th>
                <th class="w3 zone_01" >Precio</th>
                <th class="w2 zone_01 sel" ><i class="fas fa-caret-left" id="daybase"></i>Días</th>
                <th class="w2 zone_01 sel" ><i class="fas fa-caret-left" id="desbase"></i>Desc.</th>
                <th class="w3 zone_01" >Costo</th>
                <th class="w2 zone_02 sel" ><i class="fas fa-caret-left" id="daytrip"></i>Días</th>
                <th class="w2 zone_02 sel" ><i class="fas fa-caret-left" id="destrip"></i>Desc.</th>
                <th class="w3 zone_02" >Costo</th>
                <th class="w2 zone_03 sel" ><i class="fas fa-caret-left" id="daytest"></i>Días</th>
                <th class="w2 zone_03 sel" ><i class="fas fa-caret-left" id="destest"></i>Desc.</th>
                <th class="w3 zone_03" >Costo</th>
            </tr>
        </thead>
        <tbody>
            
        </tbody>
    </table>
    `;
    $('#tbl_dynamic').html(H);
    tbldynamic('tbl_dynamic');
}

/** Limpiadores de campos */
/** Limpia proyectos */
function clena_projects_field() {
    $('#Projects .grouper').html('');
    $('#LocationProject').html('');
    $('#PeriodProject').html('');
    $('#TypeLocation').html('');
    $('#DateProject').html('');
    $('#numProject .search').html('');
    $('#versions').html('');
    $('#Projects .list_items ul li').addClass('enable').removeClass('disable');
    $('#tbl_dynamic').html('');
    $('.box_list_products').css({display: 'none'});
}
/** Limpia clientes */
function clena_customer_field() {
    $('#Customer .grouper').html('');
    $('#Customer .grouper').attr('data_identy', '');
    $('#Relation .grouper').html('');
    $('#Relation').parent().children('.concepto').html('');
    $('#AddressProducer').html('');
    $('#EmailProducer').html('');
    $('#PhoneProducer').html('');
    $('#QualificationProducer').html('');
    $('#Customer .customerType').html('');
    $('#Projects .list_items ul li').addClass('enable').removeClass('disable');
}

/** Actualiza los totales */
function update_totals() {
    let costbase = 0,
        costtrip = 0,
        costtest = 0;
    let total = 0;
    $('.frame_content #tblControl tbody tr').each(function (v) {
        let pid = $(this).attr('id');
        if ($(this).children('td.qtybase').html() != undefined) {
            qtybs = parseInt($(this).children('td.qtybase').text());
            prcbs = parseFloat($(this).children('td.prcbase').text());
            daybs = parseInt($(this).children('td.daybase').text());
            desbs = parseInt($(this).children('td.desbase').text());
            daytr = parseInt($(this).children('td.daytrip').text());
            destr = parseInt($(this).children('td.destrip').text());
            dayts = parseInt($(this).children('td.daytest').text());
            dests = parseInt($(this).children('td.destest').text());

            stt01 = qtybs * prcbs; // Importe de cantidad x precio
            stt02 = stt01 * daybs; // Costo de Importe x días base
            stt03 = desbs / 100; // Porcentaje de descuento base
            stt04 = stt02 * stt03; // Costo de Importe x porcentaje descuento base
            cstbs = stt02 - stt04; // Costo base

            console.log(pid, cstbs);

            stt05 = stt01 * daytr; // Costo de Importe x dias viaje
            stt06 = destr / 100; // Porcentaje de descuento viaje
            stt07 = stt05 * stt06; // Costo de Importe x porcentaje descuento viaje
            csttr = stt05 - stt07; // Costo viaje

            stt08 = stt01 * dayts; // Costo de Importe x dias prueba
            stt09 = dests / 100; // Porcentaje de descuento prueba
            stt10 = stt08 * stt09; // Costo de Importe x porcentaje prueba
            cstts = stt08 - stt10; // Costo prueba

            costbase += cstbs; // Total de Costo Base
            costtrip += csttr; // Total de Costo Viaje
            costtest += cstts; // Total de Costo Prueba

            $('#' + pid)
                .children('td.costbase')
                .html(cstbs);
            $('#' + pid)
                .children('td.costtrip')
                .html(csttr);
            $('#' + pid)
                .children('td.costtest')
                .html(cstts);
        }
    });
    total = costbase + costtrip + costtest;
    $('#costbase').html(costbase);
    $('#costtrip').html(costtrip);
    $('#costtest').html(costtest);
    $('#total').html(total);
}

/**  +++ Oculta los productos del listado que no cumplen con la cadena  */
function sel_items(res, sele) {
    if (res.length < 1) {
        $(`#${sele} .list_items ul li`).css({display: 'block'});
    } else {
        $(`#${sele} .list_items ul li`).css({display: 'none'});
    }

    $(`#${sele} .list_items ul li`).each(function (index) {
        var cm = $(this).text().toUpperCase();

        cm = omitirAcentos(cm);
        var cr = cm.indexOf(res);
        if (cr > -1) {
            //            alert($(this).children().html())
            $(this).css({display: 'block'});
        }
    });
}

/**  +++++ Guarda el producto en la cotización +++++ */
function save_budget(pr, vr, ix) {
    // console.log(pr);
    // console.log(vr);
    // console.log(pr.prd_assured);

    let insurance = pr.prd_assured == 0 ? 0 : 0.1;

    var par = `
    [{
        "prdSku"    : "${pr.prd_sku}",
        "prdName"   : "${pr.prd_name}",
        "prdPrice"  : "${pr.prd_price}",
        "prdId"     : "${pr.prd_id}",
        "prdInsur"  : "${insurance}",
        "verId"     : "${vr}",
        "indx"      : "${ix}"
    }]
    `;

    var pagina = 'Budget/SaveBudget';
    var tipo = 'html';
    var selector = load_budget;
    fillField(pagina, par, tipo, selector);
}

function load_budget(dt) {
    let inx = dt.split('|')[1];
    let bdgId = dt.split('|')[0];

    let insurance = prod[inx].prd_assured == 0 ? 0 : 0.1;

    let par = `{
        "bdg_id"            : "${bdgId}",
        "bdg_prod_sku"      : "${prod[inx].prd_sku}",
        "bdg_prod_name"     : "${prod[inx].prd_name}",
        "bdg_prod_price"    : "${prod[inx].prd_price}",
        "bdg_quantity"      : "1",
        "bdg_days_base"     : "1",
        "bdg_discount_base" : "0",
        "bdg_days_trip"     : "0",
        "bdg_discount_trip" : "0",
        "bdg_days_test"     : "0",
        "bdg_discount_test" : "0",
        "bdg_insured"       : "${insurance}",
        "prd_id"            : "${prod[inx].prd_id}",
        "ver_id"            : "${vers}"
    }
    `;
    console.log(par);
    fill_budget_prods(par);
}

function fill_budget_prods(pd) {
    let pds = JSON.parse(pd);
    console.log(pds);
    let H = `
    <tr id="bdg${pds.bdg_id}" data_sku="${pds.bdg_prod_sku}">
        <td class="w1 product"><i class="fas fa-ellipsis-v"></i>${pds.bdg_prod_name}<i class="fas fa-bars"></i></td>
        <td class="w2 zone_01 quantity qtybase" contenteditable="true">${pds.bdg_quantity}</td>
        <td class="w3 zone_01 price prcbase">${pds.bdg_prod_price}</td>
        <td class="w2 zone_01 days daybase" contenteditable="true">${pds.bdg_days_base}</td>
        <td class="w2 zone_01 desct desbase sel"><i class="fas fa-caret-left"></i>${pds.bdg_discount_base}%</td>
        <td class="w3 zone_01 cost costbase">0</td>
        <td class="w2 zone_02 days daytrip" contenteditable="true">${pds.bdg_days_trip}</td>
        <td class="w2 zone_02 desct destrip sel"><i class="fas fa-caret-left"></i>${pds.bdg_discount_trip}%</td>
        <td class="w3 zone_02 cost costtrip">0</td>
        <td class="w2 zone_03 days daytest" contenteditable="true">${pds.bdg_days_test}</td>
        <td class="w2 zone_03 desct destest sel"><i class="fas fa-caret-left"></i>${pds.bdg_discount_test}%</td>
        <td class="w3 zone_03 cost costtest">0</td>
    </tr>
    `;
    $('.table_control tbody tr:last-child').before(H);
    $('.box_list_products').slideUp(200);

    update_totals();

    $('.quantity').on('blur', function () {
        update_totals();
    });
    $('.days').on('blur', function () {
        update_totals();
    });
}

function sel_product(res, sele) {
    if (res.length < 1) {
        $(`#${sele} .list_products ul li`).css({display: 'block'});
    } else {
        $(`#${sele} .list_products ul li`).css({display: 'none'});
    }

    $(`#${sele} .list_products ul li`).each(function () {
        var cm = $(this).attr('data_content').toUpperCase();

        cm = omitirAcentos(cm);
        var cr = cm.indexOf(res);
        if (cr > -1) {
            //            alert($(this).children().html())
            $(this).css({display: 'block'});
        }
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
