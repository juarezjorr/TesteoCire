var pos = 0;

function fillField(pagina, par, tipo, selector) {
    $.ajax({
        url: pagina,
        type: 'post',
        data: parse_data(par),
        dataType: tipo,
        cache: false,
        success: function (dt) {
            bufunc(selector(dt));
        },
        error: function (xhr, textStatus, error) {
            show_error(xhr, textStatus, error, selector);
        },
    });
}

function bufunc(fnn) {
    /*alert(fnn);*/ var fnt = fnn;
    calfun(fnt);
}
function calfun(fnc) {
    fnc;
}

function secfunc(fnn) {
    /*alert(fnn);*/ var fnt = fnn();
    flwfun(fnt);
}
function flwfun(fnc) {
    fnc;
}
function endsec() {}

function parse_data(P) {
    var PR = $.parseJSON(P);
    var par = '';
    //var cobj = PR.prmt
    $.each(PR, function (v, ob) {
        $.each(ob, function (k, u) {
            par += k + '=' + u + '&';
        });
    });
    par = par.substring(0, par.length - 1);
    return par;
}

function show_error(xhr, textStatus, error, selector) {
    var error = xhr.responseText.substring(0, 5);
    if (error == 'ERROR') {
        window.location = 'index2.html';
    }
    var errors =
        'xhr.statusText: ' +
        xhr.statusText +
        '<br>status: ' +
        xhr.statusText +
        '<br>textStatus: ' +
        textStatus +
        '<br>error: ' +
        error +
        '<br>xhr.responseText: ' +
        xhr.responseText +
        '<br>selector: ' +
        selector.name;
    //alert('error ' + xhr.responseText);
    var H = '';
    H += errors;
    alert(H);
    console.log(error, selector.name);
    //$('#msgError').append(H)
}

// RELLENA CON CEROS A LA IZQUIERDA
function refil(number, length) {
    var str = '' + number;
    while (str.length < length) str = '0' + str;
    return str;
}

function pure_num(nm) {
    let num = nm.replace(/,/g, '');
    return num;
}

// DA FORMATO A LOS NUMEROS
function formato_numero(numero, decimales, separador_decimal, separador_miles) {
    // v2007-08-06

    numero = parseFloat(numero);

    if (isNaN(numero)) {
        return '';
    }

    if (decimales !== undefined) {
        // Redondeamos
        numero = numero.toFixed(decimales);
    }

    // Convertimos el punto en separador_decimal
    numero = numero.toString().replace(',', separador_decimal !== undefined ? separador_decimal : '.');

    if (separador_miles) {
        // Añadimos los separadores de miles
        var miles = new RegExp('(-?[0-9]+)([0-9]{3})');
        while (miles.test(numero)) {
            numero = numero.replace(miles, '$1' + separador_miles + '$2');
        }
    }

    return numero;
}

/** Genera el folio de los movimientos */
function getFolio() {
    let fl = moment(Date()).format('YYMMDDHHmmss');
    return fl;
}

/* ---- ----  IMPORTA LOS SCRIPTS NECESARIOS ----- ------ */

function importarScript(nombre) {
    var s = document.createElement('script');
    s.src = nombre;
    document.querySelector('head').appendChild(s);
}

function importarStyleSheet(nombre) {
    var s = document.createElement('link');
    s.href = nombre;
    document.querySelector('head').appendChild(s);
}

// Limpia los campos de entrada de datos
function limpia_campos() {
    $('input').val('');
    $('input').removeAttr('data_selection');
    $('.icon_check').removeAttr('class').addClass('icon_uncheck');
    $('textarea').val('');
}

function verifica_usuario() {
    var galleta = Cookies.get('user');
    if (galleta == undefined) {
        window.location = 'Login';
    } else {
        var pagina = 'Menu/menu';
        var par = `[{"userid":"${galleta[0]}"}]`;
        var tipo = 'json';
        var selector = set_menu_on_page;
        fillField(pagina, par, tipo, selector);
    }
}

function set_menu_on_page(dt) {
    build_menu(dt);

    var galleta = Cookies.get('user');
    var usuario = galleta.split('|')[2].replace(/\+/g, ' ');
    var H = `<div class="user_space">${usuario} <i class="fas fa-power-off salir"></i></div>`;

    $('.sign-out').html(H);

    $('.salir').on('click', function () {
        window.location = 'Login/logout';
    });
}

function build_menu(dt) {
    $.each(dt, function (v, u) {
        if (u.mnu_parent == 0) {
            let H = `<li><a href="${u.mod_item}">${u.mnu_item}</a>${sublevel(u.mnu_id, u.sons, dt)}</li>`;
            $('ul.menu').append(H);
        }
    });
}

function sublevel(id, sn, dt) {
    let H = '';
    if (sn > 0) {
        H += `<ul>`;
        $.each(dt, function (v, u) {
            if (u.mnu_parent == id) {
                let sons = u.sons > 0 ? '<i class="fas fa-angle-right"></i>' : '';
                H += `<li><a href="${u.mod_item}">${u.mnu_item}${sons}</a>${sublevel(u.mnu_id, u.sons, dt)}</li>`;
            }
        });
        H += `</ul>`;
    }
    return H;
}

function getAbsolutePath() {
    var loc = window.location;
    var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
    return loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length));
}
