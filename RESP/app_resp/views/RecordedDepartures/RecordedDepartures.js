$(document).ready(function () {
	pos = 1;
	verifica_usuario();
	inicial();
});

function inicial() {
	oculta_muestra($('.frame_list .unidad'), 'S');

	var movement = localStorage.getItem('movement');
	busca_datos_salida(movement);
	busca_datos_unidad(movement);
	busca_datos_observaciones(movement);
}

function busca_datos_salida(movement) {
	var pagina = 'RecordedDepartures/datos_salida';
	var par = '[{"movement":"' + movement + '"}]';
	var tipo = 'json';
	var selector = pone_datos_salida;
	fillField(pagina, par, tipo, selector);
}
function busca_datos_unidad(movement) {
	var pagina = 'RecordedDepartures/datos_unidad';
	var par = '[{"movement":"' + movement + '"}]';
	var tipo = 'json';
	var selector = pone_datos_unidad;
	fillField(pagina, par, tipo, selector);
}
function busca_datos_planta(placa) {
	var pagina = 'RecordedDepartures/datos_planta';
	var par = '[{"placa":"' + placa + '"}]';
	var tipo = 'json';
	var selector = pone_datos_planta;
	fillField(pagina, par, tipo, selector);
}
function busca_datos_observaciones(movement) {
	var pagina = 'RecordedDepartures/datos_observaciones';
	var par = '[{"movement":"' + movement + '"}]';
	var tipo = 'json';
	var selector = pone_datos_observaciones;
	fillField(pagina, par, tipo, selector);
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

	if (dt[0].mov_status == 2) {
		oculta_muestra($('.stst2'), 'S');
	}

	if (dt[0].dst_id == 1) {
		oculta_muestra($('.frame_list .llamado'), 'S');
	} else {
		oculta_muestra($('.frame_list .diverso'), 'S');
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

	if (dt[0].planta == '1') {
		busca_datos_planta(dt[0].und_placa);
	}

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
}

// Coloca los datos de la planta
function pone_datos_planta(dt) {
	$('.table_info.tbl_planta .und_nombre').html(dt[0].und_nombre);
	$('.table_info.tbl_planta .und_tanques').html(dt[0].und_tanques);
	$('.table_info.tbl_planta .und_litros').html(dt[0].und_litros);
	$('.table_info.tbl_planta .trj_numero').html(dt[0].trj_numero);
	$('.table_info.tbl_planta .emp_nombre').html(dt[0].emp_nombre);
	$('.table_info.tbl_planta .und_combustible').html(dt[0].und_combustible);
	$('.table_info.tbl_planta .und_rendimiento').html(dt[0].und_rend_ccompleta);

	oculta_muestra($('.frame_list .planta'), 'S');
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
}
// Coloca los datos de las observaciones
function pone_datos_observaciones(dt) {
	if (dt[0].llave == 'S') {
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
