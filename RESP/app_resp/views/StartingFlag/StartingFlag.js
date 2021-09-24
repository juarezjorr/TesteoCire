var plta = 1;

$(document).ready(function () {
	pos = 1;
	verifica_usuario();
	inicial();
});

function inicial() {
	localStorage.removeItem('movement');
	busca_salidas_pendientes();
}

function busca_salidas_pendientes() {
	var pagina = 'StartingFlag/lista_salida';
	var par = '[{"status":"1"}]';
	var tipo = 'json';
	var selector = pone_lista_salida;
	fillField(pagina, par, tipo, selector);
}
function busca_datos_salida(movement) {
	var pagina = 'StartingFlag/datos_salida';
	var par = '[{"movement":"' + movement + '"}]';
	var tipo = 'json';
	var selector = pone_datos_salida;
	fillField(pagina, par, tipo, selector);
}
function busca_datos_unidad(movement) {
	var pagina = 'StartingFlag/datos_unidad';
	var par = '[{"movement":"' + movement + '"}]';
	var tipo = 'json';
	var selector = pone_datos_unidad;
	fillField(pagina, par, tipo, selector);
}
function busca_datos_planta(movement) {
	var pagina = 'StartingFlag/datos_planta';
	var par = '[{"movement":"' + movement + '"}]';
	var tipo = 'json';
	var selector = pone_datos_planta;
	fillField(pagina, par, tipo, selector);
}
function busca_datos_observaciones(movement) {
	var pagina = 'StartingFlag/datos_observaciones';
	var par = '[{"movement":"' + movement + '"}]';
	var tipo = 'json';
	var selector = pone_datos_observaciones;
	fillField(pagina, par, tipo, selector);
}

// Coloca el listado de las salidas pendientes
function pone_lista_salida(dt) {
	limpia_campos();
	$('.deep_loading').css({ display: 'none' });
	if (dt[0].llave == 'S') {
		$.each(dt, function (v, u) {
			var H = `<li><a href="#" id="${u.mov_id}"><i class="fas fa-truck"></i><span class="placa">${u.und_placa}</span><span class="nombre">${u.und_nombre}</span><span class="fecha">${u.fecha_prog}</span></a></li>`;
			$('.frame_list .listado ul').append(H);
		});
	}
	$('.grupo_lista a')
		.unbind('click')
		.on('click', function (e) {
			e.preventDefault();
			var mov = $(this).attr('id');
			oculta_muestra($('.frame_list .listado'), 'H');
			oculta_muestra($('.frame_list .unidad'), 'S');
			oculta_muestra($('.seg_botones'), 'S');

			var movement = mov;
			busca_datos_salida(movement);
			busca_datos_unidad(movement);
			busca_datos_planta(movement);
			busca_datos_observaciones(movement);
		});

	$('.btn').on('click', function () {
		var acc = $(this).attr('id');
		switch (acc) {
			case 'cancela':
				cancela_accion();
				break;
			case 'guarda':
				guarda_accion();
				break;
			default:
		}
	});
}

// Coloca los datos de la salida
function pone_datos_salida(dt) {
	$('.table_info.tbl_salida .mov_id').html(refil(dt[0].mov_id, 7));
	$('.table_info.tbl_salida .mov_fecha_registro').html(dt[0].mov_fecha_registro);
	$('.table_info.tbl_salida .dst_nombre').html(dt[0].dst_nombre);
	$('.table_info.tbl_salida .mov_direcc_destino').html(dt[0].mov_direcc_destino);
	$('.table_info.tbl_salida .alc_nombre').html(dt[0].alc_nombre);
	$('.table_info.tbl_salida .mov_proyecto').html(dt[0].mov_proyecto);
	$('.table_info.tbl_salida .trj_numero').html(dt[0].trj_numero);
	$('.table_info.tbl_salida .emp_nombre').html(dt[0].emp_nombre);
	$('.table_info.tbl_salida .mov_autorizo').html(dt[0].autorizo);

	$('.table_info.tbl_unidad .und_rendimiento').html(dt[0].mov_rendimiento);

	$('#txtSalUnd').val(dt[0].mov_id);
	if (dt[0].mov_pta > 0) {
		$('#txtSalPta').val(dt[0].mov_pta);
	}

	if (dt[0].dst_id == 1) {
		oculta_muestra($('.frame_list .llamado'), 'S');
		oculta_muestra($('.frame_list .diverso'), 'H');
	} else {
		oculta_muestra($('.frame_list .diverso'), 'S');
		oculta_muestra($('.frame_list .llamado'), 'H');
	}
}

// Coloca los datos de la unidad
function pone_datos_unidad(dt) {
	$('.table_info.tbl_unidad .und_nombre').html(dt[0].und_nombre);
	$('.table_info.tbl_unidad .und_placa').html(dt[0].und_placa);
	$('.table_info.tbl_unidad .und_marca').html(dt[0].und_marca);
	$('.table_info.tbl_unidad .und_model').html(dt[0].und_model);
	$('.table_info.tbl_unidad .und_tipo').html(dt[0].und_tipo);
	$('.table_info.tbl_unidad .und_serie').html(dt[0].und_serie);
	$('.table_info.tbl_unidad .und_tatuaje').html(dt[0].und_tatuaje);
	$('.table_info.tbl_unidad .und_clasificacion').html(dt[0].cls_nombre);
	$('.table_info.tbl_unidad .und_combustible').html(dt[0].und_combustible);
	$('.table_info.tbl_unidad .emp_nombre').html(dt[0].emp_nombre);
	$('.table_info.tbl_unidad .trj_numero').html(dt[0].trj_numero);

	$('#txtIdeUnd').val(dt[0].und_id);
	$('#txtKmSalida').val(dt[0].kilometros);

	var cargado = parseFloat(dt[0].cargado);
	porcentaje_und_combustible(cargado);

	var ltscap = parseInt(dt[0].und_litros);
	var ltscon = parseInt(dt[0].und_litros_actuales);

	$('.und_tnk_litros').html(ltscon + ' <span>litros aproximados</span>');
	$('#txtTnkUnd').val(ltscon);

	$('#und_tnk_control').slider({
		range: 'min',
		value: ltscon,
		min: 0,
		max: ltscap,
		slide: function (e, ui) {
			$('.und_tnk_litros').html(ui.value + ' <span>litros aproximados</span>');
			$('#txtTnkUnd').val(ui.value);
			charg = (ui.value / ltscap) * 100;
			porcentaje_und_combustible(charg);
		}
	});
}

function porcentaje_und_combustible(cargado) {
	$('.seg_ltsActual_und .medidor').animate(
		{
			width: cargado + '%'
		},
		50,
		function () {
			$('.seg_ltsActual_und .medidor').html(parseInt(cargado) + '%');
		}
	);
}

// Coloca los datos de la planta
function pone_datos_planta(dt) {
	if (dt[0].llave == 'S') {
		oculta_muestra($('.frame_list .planta'), 'S');
		$('.table_info.tbl_planta .und_nombre').html(dt[0].und_nombre);
		$('.table_info.tbl_planta .und_tanques').html(dt[0].und_tanques);
		$('.table_info.tbl_planta .und_litros').html(dt[0].und_litros);
		$('.table_info.tbl_planta .trj_numero').html(dt[0].trj_numero);
		$('.table_info.tbl_planta .emp_nombre').html(dt[0].emp_nombre);
		$('.table_info.tbl_planta .und_combustible').html(dt[0].und_combustible);
		$('.table_info.tbl_planta .und_rendimiento').html(dt[0].und_rend_ccompleta);

		$('#txtIdePta').val(dt[0].und_id);
		$('#txtHrSalida').val(dt[0].horas);

		var cargado = parseFloat(dt[0].cargado);
		porcentaje_pta_combustible(cargado);

		var ltscap = parseInt(dt[0].und_litros);
		var ltscon = parseInt(dt[0].und_litros_actuales);

		$('.pta_tnk_litros').html(ltscon + ' <span>litros aproximados</span>');
		$('#txtTnkPta').val(ltscon);

		$('#pta_tnk_control').slider({
			range: 'min',
			value: ltscon,
			min: 0,
			max: ltscap,
			slide: function (e, ui) {
				$('.pta_tnk_litros').html(ui.value + ' <span>litros aproximados</span>');
				$('#txtTnkPta').val(ui.value);
				charg = (ui.value / ltscap) * 100;
				porcentaje_pta_combustible(charg);
			}
		});

		oculta_muestra($('.seg_tnk_unidad'), 'S');
		oculta_muestra($('.seg_Hr_salida'), 'S');
		plta = 2;
	} else {
	}
}

function porcentaje_pta_combustible(cargado) {
	$('.seg_ltsActual_pta .medidor').animate(
		{
			width: cargado + '%'
		},
		50,
		function () {
			$('.seg_ltsActual_pta .medidor').html(parseInt(cargado) + '%');
		}
	);
}
// Coloca los datos de las observaciones
function pone_datos_observaciones(dt) {
	if (dt[0].llave == 'S') {
		$('.obs_contenido').html('');
		$.each(dt, function (v, u) {
			var H = `<div class="contenido">
					<span class="empleado">${u.emp_nombre}</span>
					<span class="fecha">${u.fecha}</span>
					<span class="resumen">${u.obs_contenido}</span>
				</div>`;
			$('.obs_contenido').append(H);
		});
	}
}

function guarda_accion(dt) {
	var ky = valida_campos();
	if (ky == 0) {
		$('.deep_loading').css({ display: 'block' });
		var mov_id = $('#txtSalUnd').val();
		var und_id = $('#txtIdeUnd').val();
		var km_salida = $('#txtKmSalida').val();
		var lt_salida = $('#txtTnkUnd').val();
		var parUnidad = `[{
			"mov_id": 			"${mov_id}",
			"und_id": 			"${und_id}",
			"it_salida": 		"${km_salida}",
			"lt_salida": 		"${lt_salida}"
		}]`;

		var pagina = 'StartingFlag/registra_salida';
		var par = parUnidad;
		var tipo = 'html';
		var selector = registra_mov_planta;
		fillField(pagina, par, tipo, selector);
	}
}

function registra_mov_planta(dt) {
	if (plta == 2) {
		var mov_id = $('#txtSalPta').val();
		var und_id = $('#txtIdePta').val();
		var hr_salida = $('#txtHrSalida').val();
		var lt_salida = $('#txtTnkPta').val();
		var parPlanta = `[{
			"mov_id": 			"${mov_id}",
			"und_id": 			"${und_id}",
			"it_salida": 		"${hr_salida}",
			"lt_salida": 		"${lt_salida}"
		}]`;

		var pagina = 'StartingFlag/registra_salida';
		var par = parPlanta;
		var tipo = 'html';
		var selector = retorno_listado;
		fillField(pagina, par, tipo, selector);
	} else {
		retorno_listado();
	}
}

function retorno_listado(dt) {
	$('.frame_list .listado ul').html('');
	busca_salidas_pendientes();
	oculta_muestra($('.frame_list .listado'), 'S');
	oculta_muestra($('.frame_list .unidad'), 'H');
	oculta_muestra($('.frame_list .planta'), 'H');
	oculta_muestra($('.seg_botones'), 'H');
	oculta_muestra($('.noshow'), 'H');
	$('.textbox').val('');
}

function cancela_accion() {
	$('.textbox').val('');
	oculta_muestra($('.frame_list .listado'), 'S');
	oculta_muestra($('.frame_list .unidad'), 'H');
	oculta_muestra($('.frame_list .planta'), 'H');
	oculta_muestra($('.seg_botones'), 'H');
	oculta_muestra($('.noshow'), 'H');
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

function valida_campos() {
	var ky = 0;
	var err = '';
	$('.frame_inputs .requerido').each(function () {
		if ($(this).attr('data_req') == 0 && $(this).val() == '') {
			ky = 1;
			err += $(this).attr('data_fail') + '<br>';
		}
		if ($(this).attr('data_req') == plta && $(this).val() == '') {
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
