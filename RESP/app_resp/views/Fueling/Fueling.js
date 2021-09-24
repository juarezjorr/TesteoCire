var operador;
var cnsUnidad, cnsPlanta;
var mv;

$(document).ready(function () {
	pos = 5;
	verifica_usuario();
	var galleta = Cookies.get('user');

	// var usuario = galleta.split('|')[4].replace(/\+/g, ' ');
	operador = galleta.split('|')[0];
	// $('.user_section').html(usuario + '<br>' + operador);

	inicial();
});

function inicial() {
	busca_datos_salida(operador);

	$('.selectores div').on('click', function () {
		var slt = $(this).attr('class').substring(4, 15);
		oculta_muestra($('.frame_list .unidad'), 'H');
		oculta_muestra($('.frame_list .planta'), 'H');
		oculta_muestra($('.frame_list .' + slt), 'S');
	});

	$('.ibtn').on('click', function () {
		var orden = $(this).attr('data_section');
		abre_selectores(orden);
	});
}

function abre_selectores(com) {
	var sts = $('#' + com + '.listado').css('display');
	$('.listado').slideUp(300);
	if (sts == 'none') {
		$('#' + com).slideDown(600);
	}
}

// Buscador de salidas
function busca_datos_salida(operador) {
	var pagina = 'Fueling/datos_salida';
	var par = '[{"operador":"' + operador + '"}]';
	var tipo = 'json';
	var selector = pone_datos_salida;
	fillField(pagina, par, tipo, selector);
}
function busca_datos_unidad(movement) {
	var pagina = 'Fueling/datos_unidad';
	var par = '[{"movement":"' + movement + '"}]';
	var tipo = 'json';
	var selector = pone_datos_unidad;
	fillField(pagina, par, tipo, selector);
}
function busca_datos_planta(movement) {
	var pagina = 'Fueling/datos_planta';
	var par = '[{"movement":"' + movement + '"}]';
	var tipo = 'json';
	var selector = pone_datos_planta;
	fillField(pagina, par, tipo, selector);
}
function busca_datos_observaciones(movement) {
	var pagina = 'Fueling/datos_observaciones';
	var par = '[{"movement":"' + movement + '"}]';
	var tipo = 'json';
	var selector = pone_datos_observaciones;
	fillField(pagina, par, tipo, selector);
}
function busca_datos_und_consumo(movement) {
	var pagina = 'Fueling/datos_consumo';
	var par = '[{"movement":"' + movement + '"}]';
	var tipo = 'json';
	// console.log(par);
	var selector = pone_datos_und_consumo;
	fillField(pagina, par, tipo, selector);
}
function busca_datos_pta_consumo(movement) {
	var pagina = 'Fueling/datos_consumo';
	var par = '[{"movement":"' + movement + '"}]';
	var tipo = 'json';
	var selector = pone_datos_pta_consumo;
	// console.log(par);
	fillField(pagina, par, tipo, selector);
}
function registra_datos_consumo(par) {
	var pagina = 'Fueling/registra_consumo';
	var par = par;
	var tipo = 'html';
	var selector = resultado_datos_consumo;
	fillField(pagina, par, tipo, selector);
}

// Coloca los datos de la salida
function pone_datos_salida(dt) {
	mv = dt;
	if (dt[0].llave == 'S') {
		oculta_muestra($('.frame_list .salida'), 'S');
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

		$('#txtRendtoUnd').val(dt[0].mov_rendimiento);

		busca_datos_observaciones(dt[0].mov_id);
		busca_datos_unidad(dt[0].mov_id);

		var conbtns = dt.length;
		if (conbtns < 2) {
			var selmv = dt[0].mov_id_padre;
			$('.selectores').css({ display: 'none' });
			if (selmv > 0) {
				oculta_muestra($('.frame_list .planta'), 'S');
			} else {
				oculta_muestra($('.frame_list .unidad'), 'S');
			}
		} else {
			$('.selectores').css({ display: 'grid' });
		}

		if (dt[0].dst_id == 1) {
			oculta_muestra($('.frame_list .llamado'), 'S');
		} else {
			oculta_muestra($('.frame_list .diverso'), 'S');
		}
	} else {
		oculta_muestra($('.frame_list .nodata'), 'S');
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

	$('#txtIdUnidad').val(dt[0].und_id);
	$('#txtMoviIdUnd').val(dt[0].mov_id);
	$('#txtTanqueUnd').val(dt[0].und_litros);

	busca_datos_und_consumo(dt[0].mov_id);

	$('#guarda_und').on('click', function () {
		operaciones_unidad();

		oculta_muestra($('.frame_list .unidad'), 'H');
		var consumo = 'und';
		registra_consumo(consumo);
	});
	seleccion_elementos();

	if (dt[0].planta == '1') {
		busca_datos_planta(dt[0].mov_id);
	}
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

	$('#txtIdPlanta').val(dt[0].und_id);
	$('#txtMoviIdPta').val(dt[0].mov_id);
	$('#txtTanquePta').val(dt[0].und_litros);

	busca_datos_pta_consumo(dt[0].mov_id);

	$('#guarda_pta').on('click', function () {
		operaciones_planta();

		oculta_muestra($('.frame_list .planta'), 'H');
		var consumo = 'pta';
		registra_consumo(consumo);
	});
	seleccion_elementos();
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

function pone_datos_und_consumo(dt) {
	var act = dt.length - 1;
	$('#txtKmRegsUnd').val(dt[act].cns_item_registrados);
	$('#txtRendKmUnd').val(dt[act].cns_item_rendimiento);
	$('#txtAmRegsUnd').val(dt[act].cns_amp_registrados);
	$('#txtRendAmUnd').val(dt[act].cns_amp_rendimiento);
	$('#txtLtsResUnd').val(dt[act].cns_litros_restantes);

	$('.und_kms_anterio').html('Km anteriores registrados: ' + dt[act].cns_item_registrados);
	$('.und_lts_anterio').html('Litros anteriores restantes: ' + dt[act].cns_litros_restantes);

	$.each(dt, function (v, u) {
		var H = `
		<tr>
			<td class="fecha">${u.cns_fecha_carga}</td>
			<td class="evento">${u.cns_tipo_movimiento}</td>
			<td class="kmregs">${u.cns_item_registrados}</td>
			<td class="kmrecr">${u.cns_item_consumidos}</td>
			<td class="litros">${u.cns_litros_suministrados}</td>
		</tr>
		`;
		$('.tbl_unidad_info tbody').append(H);
	});

	$('.unidad .textbox').on('blur', function () {
		operaciones_unidad();
	});
}

function pone_datos_pta_consumo(dt) {
	var act = dt.length - 1;
	$('#txtHrRegsPta').val(dt[act].cns_item_registrados);
	$('#txtRendHrPta').val(dt[act].cns_item_rendimiento);
	$('#txtAmRegsPta').val(dt[act].cns_amp_registrados);
	$('#txtRendAmPta').val(dt[act].cns_amp_rendimiento);
	$('#txtLtsResPta').val(dt[act].cns_litros_restantes);

	$('.pta_hrs_anterio').html('Horas anteriores:   ' + dt[act].cns_item_registrados);
	$('.pta_lts_anterio').html('Litros anteriores restantes: ' + dt[act].cns_litros_restantes);

	$.each(dt, function (v, u) {
		var H = `
	 	<tr>
			<td class="fecha">${u.cns_fecha_carga}</td>
			<td class="evento">${u.cns_tipo_movimiento}</td>
			<td class="hrregs">${u.cns_item_registrados}</td>
			<td class="hrrecr">${u.cns_item_consumidos}</td>
			<td class="litros">${u.cns_litros_suministrados}</td>
	 	</tr>
	 	`;
		$('.tbl_planta_info tbody').append(H);
	});

	$('.planta .textbox').on('blur', function () {
		operaciones_planta();
	});
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
function operaciones_unidad() {
	var kmRegistrads = parseInt($('#txtkmRegistrads').val());
	var ltIngresados = parseInt($('#txtLitrosUnidad').val());
	var importLitros = parseInt($('#txtImportUnidad').val());

	var kmAnteriores = parseInt($('#txtKmRegsUnd').val());
	var kmRendimient = parseInt($('#txtRendKmUnd').val());
	var ltAnteriores = parseInt($('#txtLtsResUnd').val());
	var capaciTanque = parseInt($('#txtTanqueUnd').val());
	var amAnteriores = 0;
	var amConsumidos = 0;
	var amRendimient = $('#txtRendAmUnd').val();

	if (kmRegistrads < kmAnteriores) {
		$('#txtkmRegistrads').val(kmAnteriores);
		kmRegistrads = kmAnteriores;
		// console.log(kmRegistrads);
	}
	if (ltIngresados * 1 < 1) {
		$('#txtLitrosUnidad').val(0);
		$('#txtImportunidad').val(0);
		ltIngresados = 0;
		importLitros = 0;
	}
	var quienLosPaga = $('#txtPagadoUnidad').val();

	var kmConsumidos = kmRegistrads - kmAnteriores;
	var amRegistrads = 0;

	$('.und_kms_anterio').html('Km anteriores:  	' + kmAnteriores);
	$('.und_kms_totales').html('Km recorridos: 		' + kmConsumidos);
	$('.und_amp_anterio').html('Amperes acumulados: ' + amAnteriores);
	$('.und_amp_totales').html('Amperes totales: 	' + amRegistrads);

	$('.und_lts_resulta').html('&nbsp;');

	var ltsConsumids = kmConsumidos > 0 && kmRendimient > 0 ? kmConsumidos / kmRendimient : 0;
	var ltsRestantes = ltAnteriores + ltIngresados - ltsConsumids;
	if (ltsRestantes > capaciTanque) {
		$('.und_lts_resulta').html(
			'<span class="alerta">Sobrepasas el límite de la capacidad del tanque: +' +
				(ltsRestantes - capaciTanque) +
				'</span>'
		);
		ltsRestantes = capaciTanque;
	}

	var precioXLitro = importLitros / ltIngresados;
	$('.und_lts_consumo').html('Litros anteriores restantes: ' + ltAnteriores);
	$('.und_lts_conmdos').html('Litros consumidos: ' + formato_numero(ltsConsumids, 1, '.', ','));
	$('.und_price_litro').html(
		'Precio por litro: ' + formato_numero(parseInt(precioXLitro), 2, '.', ',')
	);

	var mov_id = mv[0].mov_id;
	var trj_id = mv[0].trj_id;
	var und_id = mv[0].und_id;

	cnsUnidad = `CARGA|${ltIngresados}|${importLitros}|${precioXLitro}|${kmRegistrads}|${kmConsumidos}|${kmRendimient}|${amRegistrads}|${amConsumidos}|${amRendimient}|${ltsConsumids}|${ltsRestantes}|${quienLosPaga}|${mov_id}|${trj_id}|${und_id}`;

	// console.clear();
	// console.log('lt Ingresados:  ' + ltIngresados);
	// console.log('Import Litros:  ' + importLitros);
	// console.log('Precio x litr:  ' + precioXLitro);
	// console.log('Kms anteriors:  ' + kmAnteriores);
	// console.log('km Consumidos:  ' + kmConsumidos);
	// console.log('km Rendimient:  ' + kmRendimient);
	// console.log('Amp anteriors:  ' + amAnteriores);
	// console.log('Am Consumidos:  ' + amConsumidos);
	// console.log('Amperes Rendi:  ' + amRendimient);
	// console.log('lt Consumidos:  ' + ltsConsumids);
	// console.log('lt Restantes :  ' + ltsRestantes);
	// console.log('Quien paga:     ' + quienLosPaga);
	// console.log('Movimiento id:  ' + mov_id);
	// console.log('Tarjeta id   :  ' + trj_id);
	// console.log('Unidad id    :  ' + und_id);
	// console.log(cnsUnidad);
}

function operaciones_planta() {
	var hrConsumidos = $('#txtHrConsumidos').val();
	var ltIngresados = $('#txtLitrosPlanta').val();
	var importLitros = $('#txtImportPlanta').val();

	var hrAnteriores = $('#txtHrRegsPta').val();
	var hrRendimient = $('#txtRendHrPta').val();
	var ltAnteriores = $('#txtLtsResPta').val();
	var capaciTanque = parseFloat($('#txtTanquePta').val());
	var amAnteriores = $('#txtAmRegsPta').val();
	var amConsumidos = $('#txtAmConsumidos').val();
	var amRendimient = $('#txtRendAmPta').val();

	if (ltIngresados * 1 < 1) {
		$('#txtLitrosPlanta').val(0);
		$('#txtImportPlanta').val(0);
		ltIngresados = 0;
		importLitros = 0;
	}
	var quienLosPaga = $('#txtPagadoPlanta').val();

	var hrRegistrads = parseFloat(hrAnteriores) + parseFloat(hrConsumidos);
	var amRegistrads = parseFloat(amAnteriores) + parseFloat(amConsumidos);

	$('.pta_hrs_anterio').html('Horas anteriores:   ' + hrAnteriores);
	$('.pta_hrs_totales').html('Horas totales:   	' + hrRegistrads);
	$('.pta_amp_anterio').html('Amperes acumulados: ' + amAnteriores);
	$('.pta_amp_totales').html('Amperes totales: 	' + amRegistrads);

	$('.pta_lts_resulta').html('&nbsp;');

	var ltsConsumids =
		hrConsumidos > 0 && hrRendimient > 0 ? parseFloat(hrConsumidos) / parseFloat(hrRendimient) : 0;

	console.log(hrConsumidos);
	console.log(hrRendimient);

	var ltsRestantes = parseFloat(ltAnteriores) + parseFloat(ltIngresados) - parseFloat(ltsConsumids);
	if (ltsRestantes > capaciTanque) {
		$('.pta_lts_resulta').html(
			'<span class="alerta">Sobrepasas el límite de la capacidad del tanque: +' +
				(ltsRestantes - capaciTanque) +
				'</span>'
		);
		ltsRestantes = parseFloat(capaciTanque);
	}

	var precioXLitro = importLitros / ltIngresados;
	$('.pta_lts_consumo').html('Litros anteriores restantes: ' + ltAnteriores);
	$('.pta_lts_conmdos').html('Litros consumidos: ' + formato_numero(ltsConsumids, 1, '.', ','));
	$('.pta_price_litro').html(
		'Precio por litro: ' + formato_numero(parseFloat(precioXLitro), 2, '.', ',')
	);
	var mov_id = mv[1].mov_id;
	var trj_id = mv[1].trj_id;
	var und_id = mv[1].und_id;

	cnsPlanta = `CARGA|${ltIngresados}|${importLitros}|${precioXLitro}|${hrRegistrads}|${hrConsumidos}|${hrRendimient}|${amConsumidos}|${amRegistrads}|${amRendimient}|${ltsConsumids}|${ltsRestantes}|${quienLosPaga}|${mov_id}|${trj_id}|${und_id}`;

	// console.clear();
	// console.log('lt Ingresados:  ' + ltIngresados);
	// console.log('Import Litros:  ' + importLitros);
	// console.log('Precio x litr:  ' + precioXLitro);
	// console.log('hrs registrad:  ' + hrRegistrads);
	// console.log('hr Consumidos:  ' + hrConsumidos);
	// console.log('hr Rendimient:  ' + hrRendimient);
	// console.log('Amp registrad:  ' + amRegistrads);
	// console.log('Am Consumidos:  ' + amConsumidos);
	// console.log('Amperes Rendi:  ' + amRendimient);
	// console.log('lt Consumidos:  ' + ltsConsumids);
	// console.log('Restantes    :  ' + ltsRestantes);
	// console.log('Quien paga:     ' + quienLosPaga);
	// console.log('Movimiento id:  ' + mov_id);
	// console.log('Tarjeta id   :  ' + trj_id);
	// console.log('Unidad id    :  ' + und_id);
}

function registra_consumo(consumo) {
	var sgt = '';
	if (consumo == 'und') {
		operaciones_unidad();
		sgt = cnsUnidad.split('|');
	} else {
		operaciones_planta();
		sgt = cnsPlanta.split('|');
	}

	var msj = '';
	var ps = 0;
	if (sgt[1] < 1) {
		ps = 1;
		msj += 'Debes ingresar la cantidad de litros suministrador<br>';
	}
	if (sgt[2] < 1) {
		ps = 1;
		msj += 'Debes ingresar el importe pagado por los litros suministrador<br>';
	}

	if (sgt[12] == '') {
		ps = 1;
		msj += 'Debes ingresar nombre de quien cubre el importe del suministro<br>';
	}

	if (ps == 0) {
		var par = `
			[
				{
					"cns_tipo_movimiento" 		: "${sgt[0]}",
					"cns_litros_suministrados" 	: "${sgt[1]}",
					"cns_importe" 				: "${sgt[2]}",
					"cns_precio" 				: "${sgt[3]}",
					"cns_item_registrados" 		: "${sgt[4]}",
					"cns_item_consumidos" 		: "${sgt[5]}",
					"cns_item_rendimiento" 		: "${sgt[6]}",
					"cns_amp_consumidos" 		: "${sgt[7]}",
					"cns_amp_registrados"	 	: "${sgt[8]}",
					"cns_amp_rendimiento"	 	: "${sgt[9]}",
					"cns_litros_consumidos" 	: "${sgt[10]}",
					"cns_litros_restantes" 		: "${sgt[11]}",
					"cns_pagador" 				: "${sgt[12]}",
					"mov_id" 					: "${sgt[13]}",
					"trj_id" 					: "${sgt[14]}",
					"und_id" 					: "${sgt[15]}"
				}
			]
		`;
		registra_datos_consumo(par);
	} else {
		alert(msj);
	}
}

function resultado_datos_consumo(dt) {
	window.location.href = 'Fueling';
}

function seleccion_elementos() {
	$('.listado ul li a')
		.unbind('click')
		.on('click', function (e) {
			e.preventDefault();

			var id = $(this);
			var name = $(this).text();
			var idsel = $(this).parent().parent().parent().attr('id');
			var selob = $('#' + idsel)
				.parent()
				.find('input')
				.attr('id');
			$('#' + selob).val(name);
			$('#' + selob).attr('data_selection', id);
			$('.listado').slideUp(300);
		});
}
