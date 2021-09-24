let cost, proj;

$('document').ready(function () {
    tbldynamic('tbl_dynamic');
    fill_list_cosutmers();

    button_actions();
    add_boton();
});

/** START ZONA DE CLEINTES */
/**  Obtiene el listado de clientes */
function fill_list_cosutmers() {
    var pagina = 'Budget/listCustomers';
    var par = `[{"prm":""}]`;
    var tipo = 'json';
    var selector = put_customers;
    fillField(pagina, par, tipo, selector);
}

/**  Llena el listado de prductores */
function put_customers(dt) {
    cost = dt;

    $.each(cost, function (v, u) {
        let H = ` <li id="C${u.cos_id}" data_content="${v}|${u.cot_name}">${u.cos_name}</li>`;
        let L = ` <li id="R${u.cos_id}" data_content="${v}|${u.cot_name}">${u.cos_name}</li>`;
        $('#Customer .list_items ul').append(H);
        $('#Relation .list_items ul').append(L);
        //  $('#Relation .list_items ul li').css({display: 'none'});
    });

    fill_list_projects();
}

/**  Obtiene el listado de proyectos */
function fill_list_projects() {
    var pagina = 'Budget/listProjects';
    var par = `[{"prm":""}]`;
    var tipo = 'json';
    var selector = put_projects;
    fillField(pagina, par, tipo, selector);
}

/** START ZONA DE PROYECTOS */

/**  Llena el listado de proyectos */
function put_projects(dt) {
    proj = dt;

    $.each(proj, function (v, u) {
        let H = ` <li id="P${u.pjt_id}" data_content="${v}|${u.cos_id}|${u.cos_parent}">${u.pjt_name}</li>`;
        $('#Projects .list_items ul').append(H);
    });

    selector_items();
}

function selector_items() {
    $('.list_items li')
        .unbind('click')
        .on('click', function () {
            let idSel = $(this).parents('.dato');
            let indx = $(this).attr('data_content').split('|')[0];
            let type = $(this).attr('data_content').split('|')[1];
            idSel.children('.grouper').html($(this).html());
            idSel.children('.customerType').html('<span>' + type + '</span>');
            $('.list_items').slideUp(200);
            $('i').removeClass('rotar');

            redraw_costumers(indx);
            let cs = cost[indx];
            refill_costumers(cs.cos_id, cs.cot_id);

            // if (idSel.attr('id') == 'Customer') {
            //     redraw_costumers(indx);
            // }
            // if (idSel.attr('id') == 'Project') {
            //     idSel.children('.grouper').attr('data_identity', $(this).attr('data_content'));
            // } else {
            //     idSel.children('.grouper').attr('data_identity', $(this).attr('id'));
            // }

            // task_hunter();
        });
}

function redraw_costumers(i) {
    let cs = cost[i];
    //  refill_costumers(cs.cos_id, cs.cot_id);

    let respons = cs.cot_id == 1 ? 'Productor responsable' : 'Casa productora';
    $('#Relation').parent().children('.concepto').html(respons);

    $('#AddressProducer').html(cs.cos_address);
    $('#EmailProducer').html(cs.cos_email);
    $('#PhoneProducer').html(cs.cos_phone);
    $('#QualificationProducer').html(cs.cos_qualification);
}

function refill_costumers(cosId, cotId) {
    var pagina = 'Budget/listCustomersDef';
    var par = `[{"cosId":"${cosId}", "cotId":"${cotId}"}]`;
    var tipo = 'json';
    var selector = put_refil_customers;
    fillField(pagina, par, tipo, selector);
}

/**  Llena el listado de prductores */
function put_refil_customers(dt) {
    // $('#Relation .grouper').html('');
    $('#Relation .list_items ul li').css({display: 'none'});
    $.each(dt, function (v, u) {
        $(`#R${u.cos_id}`).css({display: 'block'});
    });

    console.log('Seleccion proyectos');
}

/** END ZONA DE CLEINTES */

/** END ZONA DE PROYECTOS */

function task_hunter() {
    let cust = $('#Customer .grouper').attr('data_identity') == undefined ? 'C0' : $('#Customer .grouper').attr('data_identity');
    let rela = $('#Relation .grouper').attr('data_identity') == undefined ? 'R0' : $('#Relation .grouper').attr('data_identity');
    let proj = $('#Projects .grouper').attr('data_identity') == undefined ? 'P0' : $('#Projects .grouper').attr('data_identity');

    console.log(cust, rela, proj);
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
            new_quote();
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
        build_format_requested();
    });
}

/**  Agrega nuevo cliente */
function add_client() {
    $('.box_modal_deep').css({display: 'flex'});
    $('.box_modal').animate(
        {
            top: '70px',
        },
        500
    );

    let H = `
        <div class="row">
            <div class="form col-sm-12 col-md-12 col-lg-8 col-xl-8 qst">
                <div class="form_group list_select">
                    <label for="txtFilmProducerHouse">Casa Productora:</label>
                    <input type="text" id="txtFilmProducerHouse" name="txtFilmProducerHouse"  class="textbox">
                
                    <div class="list_group">
                        <div class="list_items">
                            Nombre de la casa productora
                        </div>
                    </div>
                </div>

                <div class="form_group">
                    <label for="txtFilmProducer">Productor responsable:</label>
                    <input type="text" id="txtFilmProducer" name="txtFilmProducer"  class="textbox">
                </div>

                <div class="form_group">
                    <label for="txtAddressProducer">Domicilio:</label>
                    <input type="text" id="txtAddressProducer" name="txtAddressProducer"  class="textbox">
                </div>

                <div class="form_group">
                    <label for="txtEmailProducer">Correo electrónico:</label>
                    <input type="text" id="txtEmailProducer" name="txtEmailProducer"  class="textbox">
                </div>

                <div class="form_group">
                    <label for="txtPhoneProducer">Teléfono:</label>
                    <input type="text" id="txtPhoneProducer" name="txtPhoneProducer"  class="textbox">
                </div>

                <div class="form_group">
                    <label for="txtQualificationProducer">Calificación:</label>
                    <input type="text" id="txtQualificationProducer" name="txtQualificationProducer"  class="textbox">
                </div>

                    <button class="bn btn-ok" id="saveCostumer">agregar cliente</button>
                    <button class="bn btn-cn">Cancelar</button>
            </div>
            <div class="form col-sm-12 col-md-12 col-lg-4 col-xl-4 image img01"></div>
        </div>
    `;
    $('.box_modal').html(H);

    $('#saveCostumer').on('click', function () {
        save_costumer();
    });

    $('.btn-cn').on('click', function () {
        close_modal();
    });

    $('#txtFilmProducerHouse').on('keyup', function () {
        let chain = $(this).val();
        get_costumer(chain);
    });
}

function get_costumer(chain) {
    console.log(chain);
    let long = chain.length;
    console.log(long);
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

/**  ++++ Omite acentos para su facil consulta */
function omitirAcentos(text) {
    var acentos = 'ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç';
    var original = 'AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc';
    for (var i = 0; i < acentos.length; i++) {
        text = text.replace(acentos.charAt(i), original.charAt(i));
    }
    return text;
}
