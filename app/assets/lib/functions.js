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
		}
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
	//$('#msgError').append(H)
}

// RELLENA CON CEROS A LA IZQUIERDA
function refil(number, length) {
	var str = '' + number;
	while (str.length < length) str = '0' + str;
	return str;
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
	numero = numero
		.toString()
		.replace(',', separador_decimal !== undefined ? separador_decimal : '.');

	if (separador_miles) {
		// Añadimos los separadores de miles
		var miles = new RegExp('(-?[0-9]+)([0-9]{3})');
		while (miles.test(numero)) {
			numero = numero.replace(miles, '$1' + separador_miles + '$2');
		}
	}

	return numero;
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
		var cerradura = galleta.split('|')[2];
		var candado = cerradura.split('');

		var usuario = galleta.split('|')[4].replace(/\+/g, ' ');

		var H = `<div class="user_space">${usuario} <i class="fas fa-power-off salir"></i></div>`;

		$('.user_section').html(H);

		$('.salir').on('click', function () {
			window.location = 'Login/logout';
		});

		if (candado[pos] != 1) {
			//	console.log(candado[pos]);
			$('.salir').trigger('click');
		}

		activa_menu();
	}
}

function activa_menu() {
	var galleta = Cookies.get('user');
	var per = galleta.split('|')[2].split('');

	$('.menu li').each(function (v, u) {
		if (per[v] == 1) {
			$(this).removeClass('noshow');
		} else {
			$(this).addClass('noshow');
		}
	});
}
