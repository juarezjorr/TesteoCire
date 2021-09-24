var seccion = '';
var TpPeriodo = 'D';

$(document).ready(function () {
	pos = 3;
	verifica_usuario();
	//date_selector();
	dateSelector();
	//obtiene_fechas();
	// Create DataTable
	//$('#tblSalidas').DataTable({});
	$('.reporte02').addClass('selected');
});

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

function arranque() {
	console.log('arranque');
	lista_salidas();
	// genera_rep001_salidas()
}

function lista_salidas() {
	var pagina = 'TPanel_Rep002/rep002_salidas';
	var par = `[{"rngini":"${fechaInic}", "rngfin":"${fechaFinl}", "tranpr":"0"}]`;
	var tipo = 'json';
	var selector = genera_rep001_salidas;
	fillField(pagina, par, tipo, selector);
}

function genera_rep001_salidas(dt) {
	if (dt[0].llave == 'S') {
		$('#tblSalidas').DataTable({
			language: {
				url: './app/assets/lib/dataTable/spanish.json'
			},
			responsive: true,
			dom: 'fBlrtip',
			buttons: [
				{
					extend: 'excelHtml5',
					text: '<i class="fas fa-file-excel"></i>',
					titleAttr: 'Exportar a Excel',
					className: 'btn btn_excel'
				},
				{
					extend: 'pdfHtml5',
					text: '<i class="fas fa-file-pdf"></i>',
					titleAttr: 'Exportar a PDF',
					className: 'btn btn_pdf'
				},
				{
					extend: 'print',
					text: '<i class="fas fa-print"></i>',
					titleAttr: 'Imprimir',
					className: 'btn btn_prn'
				}
			],
			data: dt,
			colReorder: true,
			autoWidth: true,
			columns: [
				{ title: 'Id', data: 'mov_id', class: 'tbCen', width: '20px' },
				{ title: 'Fecha', data: 'mov_fecha_salida', class: 'tbLft', width: '150px' },
				{ title: 'Operador', data: 'operador', class: 'tbLft', width: '150px' },
				{ title: 'Nombre Planta', data: 'und_nombre', class: 'tbLft', width: '200px' },
				{ title: 'Placa', data: 'und_placa', class: 'tbCen', width: '60px' },
				{ title: 'Combustible', data: 'und_combustible', class: 'tbCen', width: '60px' },
				{ title: 'Tatuaje', data: 'und_tatuaje', class: 'tbCen', width: '50px' },
				{ title: 'Tarjeta', data: 'trj_numero', class: 'tbCen', width: '60px' },
				{ title: 'Tipo tarjeta', data: 'tipo_tarjeta', class: 'tbCen', width: '70px' },
				{ title: 'Proyecto', data: 'mov_proyecto', class: 'tbCen', width: '80px' },
				{ title: 'Destino', data: 'dst_nombre', class: 'tbCen', width: '100px' },
				{
					title: 'Horas Iniciales',
					data: 'km_iniciales',
					render: $.fn.dataTable.render.number(',', '.', 0, ''),
					class: 'tbRgt',
					width: '80px'
				},
				{
					title: 'Horas Finales',
					data: 'km_finales',
					render: $.fn.dataTable.render.number(',', '.', 0, ''),
					class: 'tbRgt',
					width: '80px'
				},
				{
					title: 'Horas Operando',
					data: 'km_recorridos',
					render: $.fn.dataTable.render.number(',', '.', 0, ''),
					class: 'tbRgt',
					width: '80px'
				},
				{
					title: 'Litros Consumidos',
					data: 'litros_consumidos',
					render: $.fn.dataTable.render.number(',', '.', 1, ''),
					class: 'tbRgt',
					width: '80px'
				},
				{
					title: 'Rendimiento hrs/litro',
					data: 'rendimiento',
					render: $.fn.dataTable.render.number(',', '.', 1, ''),
					class: 'tbRgt',
					width: '80px'
				}
			],

			scrollY: '40vh',
			scrollX: true
		});
	} else {
		console.log('Sin datos');
	}
}

function recarga() {
	$('#tblSalidas').DataTable().destroy();
	lista_salidas();
}
