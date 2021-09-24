var seccion = '';
var TpPeriodo = 'D';

$(document).ready(function () {
	pos = 3;
	verifica_usuario();
	dateSelector();
	$('.reporte03').addClass('selected');
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
}

function lista_salidas() {
	var pagina = 'TPanel_Rep003/rep003_consumo';
	var par = `[{"rngini":"${fechaInic}", "rngfin":"${fechaFinl}", "tranpr":"1"}]`;
	var tipo = 'json';
	var selector = genera_rep003_consumo;
	fillField(pagina, par, tipo, selector);
}

function genera_rep003_consumo(dt) {
	if (dt[0].llave == 'S') {
		var groupColumn = 1;
		var table = $('#tblSalidas').DataTable({
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
			columnDefs: [{ visible: false, targets: groupColumn }],
			columns: [
				{ title: 'Id', data: 'mov_id', class: 'tbCen', width: '20px' },
				{ title: 'Fecha', data: 'mov_fecha_salida', class: 'tbLft' },
				{ title: 'Placa', data: 'und_placa', class: 'tbCen', width: '60px' },
				{ title: 'Combustible', data: 'und_combustible', class: 'tbCen', width: '60px' },
				{ title: 'Fecha de carga', data: 'cns_fecha_carga', class: 'tbCen', width: '150px' },
				{
					title: 'Hrs / Kms. registrados',
					data: 'cns_item_registrados',
					class: 'tbRgt',
					width: '100px'
				},
				{
					title: 'litros suministrados',
					data: 'cns_litros_suministrados',
					class: 'tbRgt',
					width: '100px'
				},
				{ title: 'litros restantes', data: 'cns_litros_restantes', class: 'tbRgt', width: '100px' },
				{ title: 'Importe', data: 'cns_importe', class: 'tbRgt', width: '100px' },
				{
					title: 'litros consumidos',
					data: 'cns_litros_consumidos',
					class: 'tbRgt',
					width: '100px'
				},
				{ title: 'Paga combustible', data: 'cns_pagador', class: 'tbLft', width: '100px' },
				{ title: 'Tipo de unidad', data: 'tipo_unidad', class: 'tbCen', width: '100px' }
			],
			order: [[groupColumn, 'desc']],
			drawCallback: function (settings) {
				var api = this.api();
				var rows = api.rows({ page: 'current' }).nodes();
				var last = null;

				api
					.column(groupColumn, { page: 'current' })
					.data()
					.each(function (group, i) {
						if (last !== group) {
							$(rows)
								.eq(i)
								.before('<tr class="group"><td colspan="11">' + group + '</td></tr>');

							last = group;
						}
					});
			},
			scrollY: '40vh',
			scrollX: true
		});

		$('#tblSalidas tbody').on('click', 'td.details-control', function () {
			var tr = $(this).closest('tr');
			var row = table.row(tr);

			if (row.child.isShown()) {
				// This row is already open - close it
				row.child.hide();
				tr.removeClass('shown');
			} else {
				// Open this row
				row.child(complementos(row.data())).show();
				tr.addClass('shown');
			}
		});
	} else {
		console.log('Sin datos');
	}
}

function complementos(d) {
	console.log('si pasa');
	return 'Regreso';
}

function recarga() {
	$('#tblSalidas').DataTable().destroy();
	lista_salidas();
}
