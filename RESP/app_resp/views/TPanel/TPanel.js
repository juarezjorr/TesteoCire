var seccion = '';
var TpPeriodo = 'D';

$(document).ready(function () {
	pos = 3;
	verifica_usuario();
	busca_sidebar();
	date_selector();
	dateSelector();
	$('.dashboard').addClass('selected');
});

function arranque() {
	lista_destinos();
	kpis();
	grafica_unidades();
}

function busca_sidebar() {}

function obtiene_fechas() {
	var pagina = 'TPanel/obtiene_fechas';
	var par = `[{"o":""}]`;
	var tipo = 'json';
	var selector = define_rango_fechas;
	fillField(pagina, par, tipo, selector);
}

function date_selector() {
	var H = `
			<div class="date_selector">
				<div class="date_selector_box">
					<span class="date_selector_date"></span>
				</div>
			</div>
			`;
	$('.date_contenedor').html(H);
}

function lista_destinos() {
	var pagina = 'TPanel/lista_destinos';
	var par = `[{"rngini":"${rngini}", "rngfin":"${rngfin}"}]`;
	var tipo = 'json';
	var selector = grafica_destinos;
	fillField(pagina, par, tipo, selector);
}

// Grafica de salidas por destino
function grafica_destinos(dt) {
	var serie = [];
	$.each(dt, function (v, u) {
		serie.push(u.dst_nombre);
	});
	grfVDDestinos = new Highcharts.chart({
		chart: {
			renderTo: 'grfSalidas',
			type: 'column',
			height: '350px',
			backgroundColor: 'transparent',
			styledMode: false
		},
		title: {
			text: 'Salidas de unidades'
		},

		subtitle: {
			text: 'por periodo'
		},
		credits: { enabled: false },
		xAxis: {
			title: {
				enabled: false
			},
			labels: {
				useHTML: false
			},
			categories: serie,
			tickInterval: 1,
			gridLineWidth: 2,
			gridLineColor: '#DEDEDE',
			gridLineDashStyle: 'ShortDot'
		},
		yAxis: {
			title: {
				enabled: false
			},
			labels: {
				enabled: true,
				useHTML: true,
				style: {
					fontFamily: 'Bebas Neue',
					color: 'rgba(42, 63, 84, 0.6)'
				}
			},
			gridLineWidth: 1,
			tickInterval: 1,
			gridLineColor: '#DDDDDD',
			gridLineDashStyle: 'ShortDashDot',
			minorTicks: true,
			minorGridLineColor: '#DEDEDE',
			minorGridLineDashStyle: 'ShortDashDot'
		},
		plotOptions: {
			serie: {
				shadow: true
			}
		},
		series: [
			{
				type: 'column',
				colorByPoint: true,
				name: 'Salidas',
				data: [],
				showInLegend: false,
				dataLabels: {
					enabled: true
				},
				shadow: true,
				borderRadius: 5,
				groupPadding: 0
			}
		]
	});

	grfDestinos_obtiene_datos();
}

// KPI's
function kpis() {
	var H = `
		<div class="kpi_group">
			<div class="kpi_name_group"><i class="fas fa-door-open"></i> Salidas</div>
			<div class="kpi_cifra"><span class="kpi_cifra_num" id="kpiSalidas"></span></div>
		</div>

		<div class="kpi_group">
			<div class="kpi_name_group"><i class="fas fa-gas-pump"></i> Combustible</div>
			<div class="kpi_cifra"><span class="kpi_cifra_num" id="kpiCombustible"></span>Litros</div>
		</div>

		<div class="kpi_group">
			<div class="kpi_name_group"><i class="fas fa-dollar-sign"></i> Importe de combustible</div>
			<div class="kpi_cifra"><span class="kpi_cifra_num" id="kpiImporte"></span>pesos</div>
		</div>

		<div class="kpi_group">
			<div class="kpi_name_group"><i class="fas fa-truck"></i> Unidades</div>
			<div class="kpi_cifra"><span class="kpi_cifra_num" id="kpiUnidades"></span></div>
		</div>				
	`;

	$('#kpis').html(H);
	kpis_obtiene_datos();
}

// Grafica de Top 10 de unidades
function grafica_unidades() {
	grfVDUnidades = new Highcharts.chart({
		chart: {
			renderTo: 'grfTopUnidades',
			type: 'bar',
			height: '350px',
			backgroundColor: 'transparent',
			styledMode: false
		},
		title: {
			text: 'Top 10 Unidades'
		},

		subtitle: {
			text: 'Salidas'
		},
		credits: { enabled: false },
		xAxis: {
			title: {
				enabled: false
			},
			labels: {
				useHTML: false
			},
			categories: ['', '', '', '', '', '', '', '', '', ''],
			tickInterval: 1,
			gridLineWidth: 2,
			gridLineColor: '#DEDEDE',
			gridLineDashStyle: 'ShortDot'
		},
		yAxis: {
			title: {
				enabled: false
			},
			labels: {
				enabled: true,
				useHTML: true,
				style: {
					fontFamily: 'Bebas Neue',
					color: 'rgba(42, 63, 84, 0.6)'
				}
			},
			gridLineWidth: 1,
			tickInterval: 1,
			gridLineColor: '#DDDDDD',
			gridLineDashStyle: 'ShortDashDot',
			minorTicks: true,
			minorGridLineColor: '#DEDEDE',
			minorGridLineDashStyle: 'ShortDashDot'
		},
		plotOptions: {
			serie: {
				shadow: true
			}
		},
		series: [
			{
				type: 'bar',
				colorByPoint: true,
				name: 'Salidas',
				data: [],
				showInLegend: false,
				dataLabels: {
					enabled: true
				},
				shadow: true,
				borderRadius: 5,
				groupPadding: 0
			}
		]
	});
	grfUnidades_obtiene_datos();
}

function recarga() {
	grfDestinos_obtiene_datos();
	grfUnidades_obtiene_datos();
	kpis_obtiene_datos();
}
function grfDestinos_obtiene_datos() {
	var pagina = 'TPanel/lista_destinos';
	var par = `[{"rngini":"${rngini}", "rngfin":"${rngfin}"}]`;
	var tipo = 'json';
	var selector = grfDestinos_pone_datos;
	fillField(pagina, par, tipo, selector);
}
function grfDestinos_pone_datos(dt) {
	// grfSalidas

	var destino = [];
	var serie = [];
	$.each(dt, function (v, u) {
		destino.push(u.dst_nombre);
		serie.push(eval(u.salidas));
	});
	var data = { data: serie };
	grfVDDestinos.xAxis[0].setCategories(destino);
	grfVDDestinos.update({ series: data });
}
function kpis_obtiene_datos() {
	var pagina = 'TPanel/lista_kpis';
	var par = `[{"rngini":"${rngini}", "rngfin":"${rngfin}"}]`;
	var tipo = 'json';
	var selector = kpis_pone_datos;
	fillField(pagina, par, tipo, selector);
}
function kpis_pone_datos(dt) {
	$('#kpiSalidas').html(dt[0].numeros);
	$('#kpiCombustible').html(formato_numero(dt[1].numeros, 0, '.', ','));
	$('#kpiImporte').html(formato_numero(dt[2].numeros, 2, '.', ','));
	$('#kpiUnidades').html(dt[3].numeros);
}
function grfUnidades_obtiene_datos() {
	var pagina = 'TPanel/lista_unidades';
	var par = `[{"rngini":"${rngini}", "rngfin":"${rngfin}"}]`;
	var tipo = 'json';
	var selector = grfUnidades_pone_datos;
	fillField(pagina, par, tipo, selector);
}
function grfUnidades_pone_datos(dt) {
	var unidad = [];
	var serie = [];
	$.each(dt, function (v, u) {
		unidad.push(u.und_placa);
		serie.push(eval(u.salidas));
	});
	var data = { data: serie };
	grfVDUnidades.xAxis[0].setCategories(unidad);
	grfVDUnidades.update({ series: data });
}
