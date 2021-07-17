$('document').ready(function () {
    tbldynamic('tbl_dynamic');
    button_actions();
    add_boton();
});

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
}

function show_minimenues(idsel, x, y) {
    let inic = idsel.substring(0, 3);
    console.log(inic);
    let H = '';

    if (inic == 'day') {
        H = `
        <div class="box_days">
            <input type="text" id="txtdays" class="minitext">
        </div>
        `;
        psy = y - 20;
        psx = x - 50;
        $('body').append(H);
        $('.box_days').css({top: psy + 'px', left: psx + 'px'});

        $('.minitext').on('mouseout', function () {
            $('.' + idsel).text($('.minitext').val());
            $('.box_days').remove();
            update_totals();
        });
    }
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
}
/**  Coloca los datos del cliente del formulario en la cotización */
function save_costumer() {
    $('#FilmProducerHouse').html($('#txtFilmProducerHouse').val());
    $('#FilmProducer').html($('#txtFilmProducer').val());
    $('#AddressProducer').html($('#txtAddressProducer').val());
    $('#EmailProducer').html($('#txtEmailProducer').val());
    $('#PhoneProducer').html($('#txtPhoneProducer').val());
    $('#QualificationProducer').html($('#txtQualificationProducer').val());
    close_modal();
}

/**  Agrega nuevo proyecto */
function add_project() {
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
                <label for="txtProject">Proyecto:</label>
                <input type="text" id="txtProject" name="txtProject"  class="textbox">
            
                <div class="list_group">
                    <div class="list_items">
                        Proyecto
                    </div>
                </div>
            </div>

            <div class="form_group">
                <label for="txtLocation">Locación:</label>
                <input type="text" id="txtLocation" name="txtLocation"  class="textbox">
            </div>

            <div class="form_group">
                <label for="txtTypeProject">Tipo de proyecto:</label>
                <input type="text" id="txtTypeProject" name="txtTypeProject"  class="textbox">
            </div>

            <div class="form_group">
                <label for="txtTypeLocation">Otro tipo:</label>
                <input type="text" id="txtTypeLocation" name="txtTypeLocation"  class="textbox">
            </div>

            <div class="form_group">
                <label for="txtPeriodProject">Periodo:</label>
                <input type="text" id="txtPeriodProject" name="txtPeriodProject"  class="textbox">
                <i class="fas fa-calendar-alt"></i>
            </div>
                <button class="bn btn-ok" id="saveProject">agregar proyecto</button>
                <button class="bn btn-cn">Cancelar</button>
        </div>
        <div class="form col-sm-12 col-md-12 col-lg-4 col-xl-4 image img02"></div>
    </div>
`;

    $('.box_modal').html(H);
    $('#saveProject').on('click', function () {
        save_project();
    });

    $('.btn-cn').on('click', function () {
        close_modal();
    });
}
/**  Coloca los datos del proyecto del formulario en la cotización */
function save_project() {
    $('#Project').html($('#txtProject').val());
    $('#Location').html($('#txtLocation').val());
    $('#TypeProject').html($('#txtTypeProject').val());
    $('#PeriodProject').html($('#txtPeriodProject').val());
    $('#TypeLocation').html($('#txtTypeLocation').val());
    $('#version').html('C0001');
    close_modal();
}

/** Resetea la tabla y los datos del cliente y proyecto */
function new_quote() {
    clean_quote();
    $('#tblControl tbody tr').remove();
    add_boton();
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
var v = 0;
/** Construye la tabla de cotizaciones */
function build_format_requested() {
    if (v < 5) {
        let arrProd = `[
            {"product":"CABEZA ESTABILIZADA SCORPIO","price":"21000"},
            {"product":"CABEZA ESTABILIZADA FLIGHT HEAD V ADVANCED 2 EJES","price":"23000"},
            {"product":"CABEZA ESTABILIZADA ARRI MAXIMA QL","price":"15000"},
            {"product":"CABEZA DUTCH HEAD CARTONI C-40","price":"600"},
            {"product":"CABEZA RONFORD 7/ BASE MITCHELL","price":"1200"}
        ]`;
        let prds = JSON.parse(arrProd);

        let H = `
    <tr id="prd${v}">
        <td class="w1 product"><i class="fas fa-ellipsis-v"></i>${prds[v].product}<i class="fas fa-bars"></i></td>
        <td class="w2 zone_01 quantity qtybase" contenteditable="true">1</td>
        <td class="w3 zone_01 price prcbase">${prds[v].price}</td>
        <td class="w2 zone_01 days daybase" contenteditable="true">1</td>
        <td class="w2 zone_01 desct desbase sel"><i class="fas fa-caret-left"></i>0%</td>
        <td class="w3 zone_01 cost costbase">${prds[v].price}</td>
        <td class="w2 zone_02 days daytrip" contenteditable="true">0</td>
        <td class="w2 zone_02 desct destrip sel"><i class="fas fa-caret-left"></i>0%</td>
        <td class="w3 zone_02 cost costtrip">0</td>
        <td class="w2 zone_03 days daytest" contenteditable="true">0</td>
        <td class="w2 zone_03 desct destest sel"><i class="fas fa-caret-left"></i>0%</td>
        <td class="w3 zone_03 cost costtest">0</td>
    </tr>
    `;
        $('.table_control tbody tr:last-child').before(H);
        v++;
        update_totals();

        $('.quantity').on('blur', function () {
            update_totals();
        });
        $('.days').on('blur', function () {
            update_totals();
        });
    }
}

/** Actualiza los totales */
function update_totals() {
    let costbase = 0,
        costtrip = 0,
        costtest = 0;
    let total = 0;
    $('.frame_content #tblControl tbody tr').each(function (v) {
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

            $('#prd' + v)
                .children('td.costbase')
                .html(cstbs);
            $('#prd' + v)
                .children('td.costtrip')
                .html(csttr);
            $('#prd' + v)
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

/**  Cierra la ventana del modal */
function close_modal() {
    $('.box_modal').animate(
        {
            top: '120%',
        },
        500,
        function () {
            $('.box_modal_deep').css({display: 'none'});
        }
    );
}

/** Limpia los datos del cliente y proyecto */
function clean_quote() {
    $('.table_information td.dato').html('');
}
