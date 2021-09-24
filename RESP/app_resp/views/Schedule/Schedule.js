var destino = '';

$(document).ready(function () {
	pos = 0;
	verifica_usuario();
	inicial();
});

function inicial() {
	$('#txtNumPlacas').on('focus', function () {
		$('#txtNumPlacas').val('');
		limpia_campos();
		oculta_muestra($('.form_group.noshow'), 'H');
		oculta_muestra($('.frame_list .nodata'), 'H');
		oculta_muestra($('.frame_list .nofound'), 'H');
		oculta_muestra($('.frame_list .unidad'), 'H');
		oculta_muestra($('.frame_list .planta'), 'H');
		oculta_muestra($('.noshowafter'), 'H');
	});

	$('.ibtn').on('click', function () {
		var orden = $(this).attr('data_section');
		comandos(orden);
	});

	// busca_datos_operadores();
	busca_datos_tarjetas();
	busca_datos_destinos();
	busca_datos_alcaldias();
	busca_datos_autorizador();
	seleccion_elementos();

	$('.btn').on('click', function () {
		var acc = $(this).attr('id');
		switch (acc) {
			case 'guarda':
				guarda_movimiento();
				break;
			case 'cancela':
				$('#txtNumPlacas').trigger('focus');
				break;
			default:
		}
	});
}

function comandos(com) {
	switch (com) {
		case 'placas':
			busca_datos_unidad();
			break;
		case 'operador':
		case 'tarjeta':
		case 'destino':
		case 'alcaldia':
		case 'autorizador':
			abre_selectores(com);
			break;
		default:
	}
}

function busca_datos_unidad(placa) {
	var placa = $('#txtNumPlacas').val().toUpperCase();
	if (placa != '') {
		var pagina = 'Schedule/datos_unidad';
		var par = '[{"placa":"' + placa + '"}]';
		var tipo = 'json';
		var selector = valida_movimiento;
		fillField(pagina, par, tipo, selector);
	}
}
function busca_datos_planta(placa) {
	var pagina = 'Schedule/datos_planta';
	var par = '[{"placa":"' + placa + '"}]';
	var tipo = 'json';
	var selector = pone_datos_planta;
	fillField(pagina, par, tipo, selector);
}

function abre_selectores(com) {
	var sts = $('#' + com + '.listado').css('display');
	$('.listado').slideUp(300);
	if (sts == 'none') {
		$('#' + com).slideDown(600);
	}
}
function valida_movimiento(dt) {
	var unidad = dt[0].und_id;
	if (unidad == 0 || unidad == null) {
		oculta_muestra($('.frame_list .nodata'), 'S');
	} else {
		localStorage.setItem('movement', dt[0].mov_id);
		var status = dt[0].mov_id;
		if (status == '0') {
			pone_datos_unidad(dt);
		} else {
			window.location = 'RecordedDepartures';
		}
	}
}

// Coloca los datos en los inputs y selectores
function pone_datos_unidad(dt) {
	$('#txtNumPlacas').attr('data_selection', dt[0].und_id);
	$('.table_info.tbl_unidad .und_nombre').html(dt[0].und_nombre);
	$('.table_info.tbl_unidad .und_marca').html(dt[0].und_marca);
	$('.table_info.tbl_unidad .und_model').html(dt[0].und_model);
	$('.table_info.tbl_unidad .und_tipo').html(dt[0].und_tipo);
	$('.table_info.tbl_unidad .und_serie').html(dt[0].und_serie);
	$('.table_info.tbl_unidad .und_tatuaje').html(dt[0].und_tatuaje);
	$('.table_info.tbl_unidad .und_clasificacion').html(dt[0].cls_nombre);
	$('.table_info.tbl_unidad .und_combustible').html(dt[0].und_combustible);
	$('.table_info.tbl_unidad .und_operador').html(dt[0].emp_nombre);

	$('#txtOperador').val(dt[0].emp_id);

	if (dt[0].planta == '1') {
		planta = 'icon_check';
		busca_datos_planta(dt[0].und_placa);
	} else {
		planta = 'icon_uncheck';
	}

	$('#txtPlaAsignada').val(dt[0].planta);

	var cargado = dt[0].cargado;
	$('.seg_ltsActual_und .medidor')
		.delay(2000)
		.animate(
			{
				width: cargado + '%'
			},
			1000,
			function () {
				$('.seg_ltsActual_und .medidor').html(parseInt(cargado) + '%');
			}
		);

	$('#txtPlantaAsg > div').removeAttr('class').addClass(planta);
	$('#txtTarjeta').val(dt[0].trj_numero);

	if (dt[0].cls_transporte == '1') {
		oculta_muestra($('.form_group.noshow'), 'S');
		oculta_muestra($('.frame_list .nofound'), 'H');
		oculta_muestra($('.frame_list .unidad'), 'S');
	} else {
		oculta_muestra($('.form_group.noshow'), 'H');
		oculta_muestra($('.frame_list .nofound'), 'S');
		oculta_muestra($('.frame_list .unidad'), 'H');
		oculta_muestra($('.frame_list .planta'), 'H');
	}

	// Activa radios del rendimiento de combustible
	$('.seg_carga .radio').on('click', function () {
		$('.seg_carga .radio').children('div').removeAttr('class').addClass('icon_uncheck');
		$(this).children('div').removeAttr('class').addClass('icon_check');
		var rdo = $(this).parent().attr('id');
		var chrg = '';
		switch (rdo) {
			case 'C1':
				$('.table_info.tbl_unidad .und_rendimiento').html(dt[0].und_rend_ccompleta);
				chrg = dt[0].und_rend_ccompleta;
				break;
			case 'C2':
				$('.table_info.tbl_unidad .und_rendimiento').html(dt[0].und_rend_cmedia);
				chrg = dt[0].und_rend_cmedia;
				break;
			case 'C3':
				$('.table_info.tbl_unidad .und_rendimiento').html(dt[0].und_rend_cvacio);
				chrg = dt[0].und_rend_cvacio;
				break;
			default:
		}
		$('#txtCarga').val(chrg);
	});

	$('#txtMedida').val(dt[0].und_medida);
	$('#txtUnidad').val(dt[0].und_id);
	$('#txtOperador').attr('data_selection', dt[0].emp_id);
	$('#txtTarjeta').attr('data_selection', dt[0].trj_id);
}
function pone_datos_planta(dt) {
	$('.table_info.tbl_planta .und_nombre').html(dt[0].und_nombre);
	$('.table_info.tbl_planta .und_tanques').html(dt[0].und_tanques);
	$('.table_info.tbl_planta .und_litros').html(dt[0].und_litros);
	$('.table_info.tbl_planta .trj_numero').html(dt[0].trj_numero);
	$('.table_info.tbl_planta .emp_nombre').html(dt[0].emp_nombre);
	$('.table_info.tbl_planta .und_combustible').html(dt[0].und_combustible);
	$('.table_info.tbl_planta .und_rendimiento').html(dt[0].und_rend_cmedia);

	$('.frame_list .planta').css({ display: 'block' });

	var cargado = dt[0].cargado;
	$('.seg_ltsActual_pta .medidor')
		.delay(2000)
		.animate(
			{
				width: cargado + '%'
			},
			1000,
			function () {
				$('.seg_ltsActual_pta .medidor').html(parseInt(cargado) + '%');
			}
		);

	$('#txtPlanta').val(dt[0].und_id);
	$('#txtMedPlt').val(dt[0].und_medida);
	$('#txtCargaPlt').val(dt[0].und_rend_cmedia);
	$('#txtTarjetaPlt').val(dt[0].trj_id);
}
function pone_datos_operadores(dt) {
	$.each(dt, function (v, u) {
		$('#operador ul').append(`<li><a href="#" id="${u.emp_id}">${u.emp_nombre}</a></li>`);
	});
	seleccion_elementos();
}
function pone_datos_tarjetas(dt) {
	$.each(dt, function (v, u) {
		$('#tarjeta ul').append(`<li><a href="#" id="${u.trj_id}">${u.trj_numero}</a></li>`);
	});
	seleccion_elementos();
}
function pone_datos_destinos(dt) {
	$.each(dt, function (v, u) {
		$('#destino ul').append(`<li><a href="#" id="${u.dst_id}">${u.dst_nombre}</a></li>`);
	});
	seleccion_elementos();
}
function pone_datos_alcaldias(dt) {
	$.each(dt, function (v, u) {
		$('#alcaldia ul').append(`<li><a href="#" id="${u.alc_id}">${u.alc_nombre}</a></li>`);
	});
	seleccion_elementos();
}
function pone_datos_autorizador(dt) {
	$.each(dt, function (v, u) {
		$('#autorizador ul').append(`<li><a href="#" id="${u.emp_id}">${u.emp_nombre}</a></li>`);
	});
	seleccion_elementos();
}

// Obtiene datos de la base
function busca_datos_operadores() {
	var pagina = 'Schedule/datos_operadores';
	var par = '[{"puesto":"2"}]';
	var tipo = 'json';
	var selector = pone_datos_operadores;
	fillField(pagina, par, tipo, selector);
}
function busca_datos_tarjetas() {
	var pagina = 'Schedule/datos_tarjetas';
	var par = '[{"tipo":"2"}]';
	var tipo = 'json';
	var selector = pone_datos_tarjetas;
	fillField(pagina, par, tipo, selector);
}
function busca_datos_destinos() {
	var pagina = 'Schedule/datos_destinos';
	var par = '[{"status":"1"}]';
	var tipo = 'json';
	var selector = pone_datos_destinos;
	fillField(pagina, par, tipo, selector);
}
function busca_datos_alcaldias() {
	var pagina = 'Schedule/datos_alcaldias';
	var par = '[{"status":"1"}]';
	var tipo = 'json';
	var selector = pone_datos_alcaldias;
	fillField(pagina, par, tipo, selector);
}
function busca_datos_autorizador() {
	var pagina = 'Schedule/datos_autorizadores';
	var par = '[{"puesto":"3"}]';
	var tipo = 'json';
	var selector = pone_datos_autorizador;
	fillField(pagina, par, tipo, selector);
}
function seleccion_elementos() {
	$('.listado ul li a')
		.unbind('click')
		.on('click', function (e) {
			e.preventDefault();
			var id = $(this).attr('id');
			var name = $(this).text();
			var idsel = $(this).parent().parent().parent().attr('id');
			var selob = $('#' + idsel)
				.parent()
				.find('input')
				.attr('id');
			$('#' + selob).val(name);
			$('#' + selob).attr('data_selection', id);
			$('.listado').slideUp(300);
			if (idsel == 'destino') {
				seleccion_destino(id);
			}
		});
}
function seleccion_destino(id) {
	$('.clean input').val('');
	if (id == 1) {
		oculta_muestra($('.seg_proyecto'), 'S');
		destino = '1';
	} else {
		destino = '2';
		oculta_muestra($('.noshowafter'), 'H');
	}
}
function oculta_muestra(obj, acc) {
	var speed = 700;
	switch (acc) {
		case 'S':
			obj.slideDown(speed);
			break;
		case 'H':
			obj.slideUp(speed);
			break;
		default:
	}
}
function guarda_movimiento() {
	var ky = valida_campos();
	if (ky == 0) {
		$('.deep_loading').css({ display: 'block' });
		var mov_item = $('#txtMedida').val();
		var mov_padre = '0';
		var mov_direcc_destino = $('#txtDireccion').val();
		var mov_proyecto = $('#txtProyecto').val();
		var mov_rendimiento = $('#txtCarga').val();
		var mov_status = 1;
		var emp_id = $('#txtOperador').attr('data_selection');
		var und_id = $('#txtUnidad').val();
		var dst_id = $('#txtDestino').attr('data_selection');
		var trj_id = $('#txtTarjeta').attr('data_selection');
		var alcaldia = $('#txtAlcaldia').attr('data_selection');
		var alc_id = alcaldia == undefined ? 0 : alcaldia;
		var aut_id = $('#txtAutorizador').attr('data_selection');
		var observa = $('#txtObservaciones').val();

		//Datos de la planta

		var parUnidad = `[{
			"mov_item": 			"${mov_item}",
			"mov_padre": 			"${mov_padre}",
			"mov_direcc_destino": 	"${mov_direcc_destino}",
			"mov_proyecto": 		"${mov_proyecto}",
			"mov_rendimiento": 		"${mov_rendimiento}",
			"mov_status": 			"${mov_status}",
			"emp_id": 				"${emp_id}",
			"und_id": 				"${und_id}",
			"trj_id": 				"${trj_id}",
			"dst_id": 				"${dst_id}",
			"alc_id": 				"${alc_id}",
			"aut_id": 				"${aut_id}",
			"observa": 				"${observa}"
		}]`;

		var pagina = 'Schedule/reg_MovUnidades';
		var par = parUnidad;
		var tipo = 'html';
		var selector = registra_mov_unidad;
		fillField(pagina, par, tipo, selector);
	}
}
function registra_mov_unidad(dt) {
	var plaasg = $('#txtPlaAsignada').val();
	localStorage.setItem('movement', dt);
	if (plaasg == '1') {
		var mov_item = $('#txtMedPlt').val();
		var mov_padre = dt;
		var mov_direcc_destino = $('#txtDireccion').val();
		var mov_proyecto = $('#txtProyecto').val();
		var mov_rendimiento = $('#txtCargaPlt').val();
		var mov_status = 1;
		var emp_id = $('#txtOperador').attr('data_selection');
		var und_id = $('#txtPlanta').val();
		var dst_id = $('#txtDestino').attr('data_selection');
		var trj_id = $('#txtTarjetaPlt').val();
		var alcaldia = $('#txtAlcaldia').attr('data_selection');
		var alc_id = alcaldia == undefined ? 0 : alcaldia;
		var aut_id = $('#txtAutorizador').attr('data_selection');

		var parPlanta = `[{
			"mov_item": 			"${mov_item}",
			"mov_padre": 			"${mov_padre}",
			"mov_direcc_destino": 	"${mov_direcc_destino}",
			"mov_proyecto": 		"${mov_proyecto}",
			"mov_rendimiento": 		"${mov_rendimiento}",
			"mov_status": 			"${mov_status}",
			"emp_id": 				"${emp_id}",
			"und_id": 				"${und_id}",
			"trj_id": 				"${trj_id}",
			"dst_id": 				"${dst_id}",
			"alc_id": 				"${alc_id}",
			"aut_id": 				"${aut_id}"
		}]`;
		var pagina = 'Schedule/reg_MovPlantas';
		var par = parPlanta;
		var tipo = 'html';
		var selector = registra_mov_planta;
		fillField(pagina, par, tipo, selector);
	} else {
		window.location = 'RecordedDepartures';
	}
}
function registra_mov_planta(dt) {
	window.location = 'RecordedDepartures';
}
function valida_campos() {
	var ky = 0;
	var err = '';
	$('.frame_inputs .requerido').each(function () {
		if ($(this).attr('data_req') == 0 && $(this).val() == '') {
			ky = 1;
			err += $(this).attr('data_fail') + '<br>';
		}
		if ($(this).attr('data_req') == destino && $(this).val() == '') {
			ky = 1;
			err += $(this).attr('data_fail') + '<br>';
		}
	});
	if (err != '') {
		// Agregar un modal para los errores
		alert(err);
	}
	return ky;
}
