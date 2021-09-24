var cnsUnidad = '',
	cnsPlanta = '',
	cns = '';
var plta;

$(document).ready(function () {
	pos = 2;
	verifica_usuario();
	inicial();
});

function inicial() {
	localStorage.removeItem('movement');
	busca_salidas_pendientes();
}

function busca_salidas_pendientes() {
	var pagina = 'EntryRecords/lista_salida';
	var par = '[{"status":"2"}]';
	var tipo = 'json';
	var selector = pone_lista_salida;
	fillField(pagina, par, tipo, selector);
}
function busca_datos_salida(movement) {
	var pagina = 'EntryRecords/datos_salida';
	var par = '[{"movement":"' + movement + '"}]';
	var tipo = 'json';
	var selector = pone_datos_salida;
	fillField(pagina, par, tipo, selector);
}
function busca_datos_unidad(movement) {
	var pagina = 'EntryRecords/datos_unidad';
	var par = '[{"movement":"' + movement + '"}]';
	var tipo = 'json';
	var selector = pone_datos_unidad;
	fillField(pagina, par, tipo, selector);
}
function busca_datos_planta(placa) {
	var pagina = 'EntryRecords/datos_planta';
	var par = '[{"placa":"' + placa + '"}]';
	var tipo = 'json';
	var selector = pone_datos_planta;
	fillField(pagina, par, tipo, selector);
}
function busca_datos_observaciones(movement) {
	var pagina = 'EntryRecords/datos_observaciones';
	var par = '[{"movement":"' + movement + '"}]';
	var tipo = 'json';
	var selector = pone_datos_observaciones;
	fillField(pagina, par, tipo, selector);
}

function busca_datos_consumo(movUnd, movPta) {
	var pagina = 'EntryRecords/datos_consumo';
	var par = '[{"movUnd":"' + movUnd + '", "movPta":"' + movPta + '"}]';
	var tipo = 'json';
	var selector = pone_consumo;
	fillField(pagina, par, tipo, selector);
}

// Coloca el listado de las salidas pendientes
function pone_lista_salida(dt) {
	limpia_campos();
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
			busca_datos_observaciones(movement);
		});

	$('.btn').on('click', function () {
		var acc = $(this).attr('id');
		switch (acc) {
			case 'cancela':
				cancela_accion();
				break;
			case 'guarda':
				operaciones();
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

	var planta = dt[0].planta;

	busca_datos_consumo(dt[0].mov_id, dt[0].planta);

	if (planta > 0) {
		busca_datos_planta(dt[0].und_placa);
		oculta_muestra($('.frame_list .planta'), 'S');
	}

	$('.textbox').on('keyup', function () {
		operaciones();
	});
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
	plta = 1;
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
	$('.table_info.tbl_planta .und_nombre').html(dt[0].und_nombre);
	$('.table_info.tbl_planta .und_tanques').html(dt[0].und_tanques);
	$('.table_info.tbl_planta .und_litros').html(dt[0].und_litros);
	$('.table_info.tbl_planta .trj_numero').html(dt[0].trj_numero);
	$('.table_info.tbl_planta .emp_nombre').html(dt[0].emp_nombre);
	$('.table_info.tbl_planta .und_combustible').html(dt[0].und_combustible);
	$('.table_info.tbl_planta .und_rendimiento').html(dt[0].und_rend_ccompleta);
	$('#txtPtaCapTnk').val(dt[0].und_litros);
	plta = 2;

	oculta_muestra($('.seg_tnk_unidad'), 'S');
	oculta_muestra($('.seg_Hr_salida'), 'S');
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
		var bk = cnsUnidad.split('|');
		var parund = `
			[
				{
					"cns_tipo_movimiento" 		: "${bk[0]}",
					"cns_item_registrados"		: "${bk[1]}",
					"cns_item_consumidos"		: "${bk[2]}",
					"cns_item_rendimiento" 		: "${bk[3]}",
					"cns_amp_registrados"		: "${bk[4]}",
					"cns_amp_consumidos"		: "${bk[5]}",
					"cns_amp_rendimiento"		: "${bk[6]}",
					"cns_litros_consumidos"		: "${bk[7]}",
					"cns_litros_restantes"		: "${bk[8]}",
					"mov_id"					: "${bk[9]}",
					"trj_id"					: "${bk[10]}",
					"und_id"					: "${bk[11]}",
					"litros_reales"				: "${bk[12]}"
				}
			]
		`;

		var pagina = 'EntryRecords/registra_entrada';
		var par = parund;
		var tipo = 'html';
		var selector = registra_mov_planta;
		fillField(pagina, par, tipo, selector);
	}
}

function registra_mov_planta(dt) {
	if (plta == 2) {
		var bk = cnsPlanta.split('|');
		var parpta = `
			[
				{
					"cns_tipo_movimiento" 		: "${bk[0]}",
					"cns_item_registrados"		: "${bk[1]}",
					"cns_item_consumidos"		: "${bk[2]}",
					"cns_item_rendimiento" 		: "${bk[3]}",
					"cns_amp_registrados"		: "${bk[4]}",
					"cns_amp_consumidos"		: "${bk[5]}",
					"cns_amp_rendimiento"		: "${bk[6]}",
					"cns_litros_consumidos"		: "${bk[7]}",
					"cns_litros_restantes"		: "${bk[8]}",
					"mov_id"					: "${bk[9]}",
					"trj_id"					: "${bk[10]}",
					"und_id"					: "${bk[11]}",
					"litros_reales"				: "${bk[12]}"
				}
			]
		`;

		var pagina = 'EntryRecords/registra_entrada';
		var par = parpta;
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
	cnsUnidad = '';
	cnsPlanta = '';
}

function cancela_accion() {
	retorno_listado('0');
}

function operaciones() {
	// UNIDAD
	var undTipoMov = 'ENTRADA';
	var undKmRegis = parseInt($('#txtUndKmRegis').val());
	undKmRegis = undKmRegis > 0 ? undKmRegis : 0;
	var undKmAnter = cns[0].cns_item_registrados;
	var undKmRecor = undKmRegis < undKmAnter ? 0 : undKmRegis - undKmAnter;
	undKmRegis = undKmRegis < undKmAnter ? undKmAnter : undKmRegis;

	var undKmRendi = cns[0].cns_item_rendimiento;

	var undAmRegis = 0;
	var undAmConsu = 0;
	var undAmRendi = 0;
	var undLtConsu = undKmRecor > 0 && undKmRendi > 0 ? undKmRecor / undKmRendi : 0;
	var undLtAnter = cns[0].cns_litros_restantes;
	var undLtResta = undLtAnter - undLtConsu;
	var undMovimId = cns[0].mov_id;
	var undTarjeId = cns[0].trj_id;
	var undIdentif = cns[0].und_id;
	var undltReale = $('#txtUndLtReals').val();
	var undKmSalid = parseInt(cns[0].mov_item_out);
	var undKmCnsTl = undKmRegis - undKmSalid;

	cnsUnidad = `${undTipoMov}|${undKmRegis}|${undKmRecor}|${undKmRendi}|${undAmRegis}|${undAmConsu}|${undAmRendi}|${undLtConsu}|${undLtResta}|${undMovimId}|${undTarjeId}|${undIdentif}|${undltReale}|${undKmCnsTl}`;

	var undCapTank = cns[0].und_litros;
	var undPorcent = (undLtResta / undCapTank) * 100;
	porcentaje_und_combustible(undPorcent);
	$('.und_tnk_litros').html(undLtResta + ' <span>litros aproximados</span>');

	$('#und_tnk_control').slider({
		range: 'min',
		value: undLtResta,
		min: 0,
		max: undCapTank,
		slide: function (e, ui) {
			$('.und_tnk_litros').html(ui.value + ' <span>litros aproximados</span>');
			$('#txtTnkUnd').val(ui.value);
			charg = (ui.value / undCapTank) * 100;
			porcentaje_und_combustible(charg);
			$('#txtUndLtReals').val(ui.value);
		}
	});

	if (cns.length > 1) {
		// PLANTA
		var ptaTipoMov = 'ENTRADA';
		var ptaHrRegis = parseInt($('#txtUndHrRegis').val());
		ptaHrRegis = ptaHrRegis > 0 ? ptaHrRegis : 0;
		var ptaHrAnter = parseInt(cns[1].cns_item_registrados);
		var ptaHrTotal = ptaHrRegis + ptaHrAnter;
		var ptaHrRendi = cns[1].cns_item_rendimiento;
		var ptaAmRegis = cns[1].cns_amp_registrados;
		var ptaAmConsu = cns[1].cns_amp_consumidos;
		var ptaAmRendi = cns[1].cns_amp_rendimiento;
		var ptaLtConsu = ptaHrRegis > 0 && ptaHrRendi > 0 ? ptaHrRegis / ptaHrRendi : 0;
		var ptaLtAnter = cns[1].cns_litros_restantes;
		var ptaLtResta = ptaLtAnter - ptaLtConsu;
		var ptaMovimId = cns[1].mov_id;
		var ptaTarjeId = cns[1].trj_id;
		var ptaIdentif = cns[1].und_id;
		var ptaltReale = $('#txtPtaLtReals').val();
		var ptaHrSalid = parseInt(cns[0].mov_item_out);
		var ptaHrCnsTl = ptaHrAnter - ptaHrSalid;

		cnsPlanta = `${ptaTipoMov}|${ptaHrTotal}|${ptaHrRegis}|${ptaHrRendi}|${ptaAmRegis}|${ptaAmConsu}|${ptaAmRendi}|${ptaLtConsu}|${ptaLtResta}|${ptaMovimId}|${ptaTarjeId}|${ptaIdentif}|${ptaltReale}|${ptaHrCnsTl}`;

		var ptaCapTank = cns[1].und_litros;
		var ptaPorcent = (ptaLtResta / ptaCapTank) * 100;
		porcentaje_pta_combustible(ptaPorcent);
		$('.pta_tnk_litros').html(ptaLtResta + ' <span>litros aproximados</span>');

		$('#pta_tnk_control').slider({
			range: 'min',
			value: ptaLtResta,
			min: 0,
			max: ptaCapTank,
			slide: function (e, ui) {
				$('.pta_tnk_litros').html(ui.value + ' <span>litros aproximados</span>');
				$('#txtTnkPta').val(ui.value);
				charg = (ui.value / ptaCapTank) * 100;
				porcentaje_pta_combustible(charg);
				$('#txtPtaLtReals').val(ui.value);
			}
		});
	}
}

function pone_consumo(dt) {
	cns = dt;

	$('#txtUndLtReals').val(cns[0].cns_litros_restantes);
	$('#txtUndKmRegis').val(cns[0].cns_item_registrados);

	if (dt.length > 1) {
		$('#txtPtaLtReals').val(cns[1].cns_litros_restantes);
		$('#txtUndHrRegis').val(cns[1].cns_item_consumidos);
	}

	operaciones();
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
