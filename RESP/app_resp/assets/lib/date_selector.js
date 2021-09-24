var fechaInic, fechaFinl, rngini, rngfin;

// $(document).ready(function () {
// 	setPeriodo = 'D';
// });

function dateSelector() {
	setPeriodo = TpPeriodo;
	inicializa_fechas();
	select_periodo();
	setAvanc = 0;
	console.log('selector');
}

// SELECCIONA EL PERIODO DESDE EL SELECTOR
function select_periodo() {
	// Abre el listado de periodos
	$('.date_selector_result').on('click', function () {
		$('.date_selector_options').slideToggle(500);
	});

	// Selecciona el periodo
	$('.date_selector_item').on('click', function () {
		var periodo = $(this).html();
		var per = $(this).attr('data-date');
		$('.date_selector_result').html(periodo);
		$('.date_selector_options').slideUp(500);
		setPeriodo = per;
		//	setFecha = periodo;
		llena_etiquetas();
		cambia_periodo(per);
	});

	// Abre el selector de fechas
	$('.date_selector_periodos').on('click', function () {
		$('.date_selector_periodo_options').slideToggle(500);
	});

	$('.prev').on('click', function () {
		//	console.log(setPrev);
		setFecha = setPrev;
		setAvanc += 1;
		setPeriodo == 'D' ? selector_avance_dia() : selector_avance();
		recarga();
	});
	$('.next').on('click', function () {
		//	console.log(setPrev);
		setFecha = setNext;
		setAvanc -= 1;
		setPeriodo == 'D' ? selector_avance_dia() : selector_avance();
		recarga();
	});

	selector_fechas();
}

/*CONFIGURA LA SITUACIÓN DE AVANCE Y REROCESO DE FECHAS */
// CONSULTA POR DIA
function selector_avance_dia() {
	var xfprv = moment(setFecha).subtract(1, 'days');
	var xfnxt = moment(setFecha).add(1, 'days');

	// $('.date_selector_date').html(moment(setFecha).format('dddd, LL'));

	if (xfnxt > moment(setFechaMax)) {
		xfnxt = moment(setFechaMax);
		$('.next').css({ display: 'none' });
	} else {
		$('.next').css({ display: 'block' });
	}

	if (xfprv <= moment(setFechaMin)) {
		xfprv = moment(setFechaMin);
		$('.prev').css({ display: 'none' });
	} else {
		$('.prev').css({ display: 'block' });
	}

	setPrev = xfprv.format('YYYYMMDD');
	setNext = xfnxt.format('YYYYMMDD');
	llena_etiquetas();
}

// CONSULTA POR SEMANA, MES, AÑO
function selector_avance() {
	var lng = dtsFechas.length - 1;
	var psn = 0;

	psn = setAvanc > lng ? lng : setAvanc;
	setAvanc = psn;
	psn = setAvanc < 0 ? 0 : setAvanc;
	setAvanc = psn;
	if (psn <= 0) {
		$('.next').css({ display: 'none' });
	} else {
		$('.next').css({ display: 'block' });
	}

	if (psn >= lng) {
		$('.prev').css({ display: 'none' });
	} else {
		$('.prev').css({ display: 'block' });
	}

	$('.date_selector_periodo').html(dtsFechas[psn].descrip);
	setFecha = dtsFechas[psn].fecha;

	// setPrev = xfprv.format('YYYYMMDD');
	// setNext = xfnxt.format('YYYYMMDD');
	llena_etiquetas();
}

function ajusta_fechas() {
	// var fcc = moment(setFecha).startOf('isoWeek').format('YYYYMMDD');
	var fcc = moment(setFecha);

	setAvanc = 0;
	var cct = 0;
	$.each(dtsFechas, function (v, u) {
		switch (setPeriodo) {
			case 'W':
				if (fcc <= moment(u.fecha)) {
					cct = v;
				}
				break;
			case 'M':
				if (fcc.format('YYYYMM') == moment(u.fecha).format('YYYYMM')) {
					cct = v;
				}
				break;
			case 'Y':
				if (fcc.format('YYYY') == moment(u.fecha).format('YYYY')) {
					cct = v;
				}
				break;
			default:
		}
	});
	setAvanc = cct;
	selector_avance();
	$('.date_selector_periodo').html(dtsFechas[cct].descrip);
}

function selector_fechas() {
	// Selecciona la fecha a consultar
	$('.date_selector_periodo_items').on('click', function () {
		var periodo = $(this).html();
		var per = $(this).attr('data-date');
		$('.date_selector_periodo').html(periodo);
		setFecha = per;
		ajusta_fechas();
		llena_etiquetas();
		recarga();
	});
}

// DECIDE EL TIPO DE PERIODO A CONSULTAR
function cambia_periodo(per) {
	switch (per) {
		case 'D':
			$('.date_selector_date').css({ display: 'block' });
			$('.date_selector_periodos').css({ display: 'none' });
			selector_avance_dia();
			break;
		case 'W':
			$('.date_selector_date').css({ display: 'none' });
			$('.date_selector_periodos').css({ display: 'block' });
			$('.date_selector_periodo_options').css({ display: 'none' });
			obtiene_semanas();
			break;
		case 'M':
			$('.date_selector_date').css({ display: 'none' });
			$('.date_selector_periodos').css({ display: 'block' });
			$('.date_selector_periodo_options').css({ display: 'none' });
			obtiene_meses();
			break;
		case 'Y':
			$('.date_selector_date').css({ display: 'none' });
			$('.date_selector_periodos').css({ display: 'block' });
			$('.date_selector_periodo_options').css({ display: 'none' });
			obtiene_anios();
			break;
		default:
	}
	recarga();
}

// OBTIENE EL LISTADO DE LAS SEMANAS PARA EL SELECTOR DE PERIODOS
function obtiene_semanas() {
	var par = `[{"fechaini":"${fechaInic}", "fechaFin":"${fechaFinl}"}]`;
	obtiene_datos('listaSemanas', pone_periodos, par);
}

// OBTIENE EL LISTADO DE LOS MESES PARA EL SELECTOR DE PERIDDOS
function obtiene_meses() {
	var par = `[{"fechaini":"${fechaInic}", "fechaFin":"${fechaFinl}"}]`;
	obtiene_datos('listaMeses', pone_periodos, par);
}

// OBTIENE EL LISTADO DE LOS AÑOS PARA EL SELECTOR DE PERIDDOS
function obtiene_anios() {
	var par = `[{"fechaini":"${fechaInic}", "fechaFin":"${fechaFinl}"}]`;
	obtiene_datos('listaAnios', pone_periodos, par);
}

// LLENA LOS PERIODOS
function pone_periodos(dt) {
	dtsFechas = dt;

	$('.date_selector_periodo_options').html('');
	$.each(dt, function (v, u) {
		var H =
			'<div class="date_selector_periodo_items" data-date="' +
			u.fecha +
			'">' +
			u.descrip +
			'</div>';
		$('.date_selector_periodo_options').append(H);
	});

	$('.date_selector_periodo').html(dt[0].descrip);
	// setFecha = dt[0].fecha;
	llena_etiquetas();
	ajusta_fechas();

	selector_fechas();
}

// INICIALIZA LAS FECHAS INICIAL Y FINAL
function inicializa_fechas() {
	var pagina = 'TPanel/obtiene_fechas';
	var par = `[{"o":""}]`;
	var tipo = 'json';
	var selector = define_fechas;
	fillField(pagina, par, tipo, selector);
}

function define_fechas(dt) {
	fechaInic = dt[0].primera;
	fechaFinl = dt[0].ultima;
	var fecha_inicial = moment(fechaFinl).subtract(3, 'months').format('YYYYMMDD');
	fi = fecha_inicial;
	ff = fechaFinl;
	rngini = fecha_inicial;
	rngfin = fechaFinl;
	init_daterangepicker();
	setFechaMin = fi;
	setFechaMax = ff;
	setFecha = ff;
	selector_avance_dia();
	llena_etiquetas();
	arranque();
}

/**  LLENA LAS ETIQUETAS INFORMATIVAS DEL ESTADO DE LAS VARIABLES */
function llena_etiquetas() {
	$('.periodo').html('Periodo: ' + setPeriodo);
	$('.fecha').html(setFecha + ' - Fecha seleccionada');
	$('.fechaini').html(setFechaMin + ' - Fecha mínima');
	$('.fechafin').html(setFechaMax + ' - Fecha máxima');
	$('.lblprev').html(setPrev + ' - previo');
	$('.lblnext').html(setNext + ' - next');
}
