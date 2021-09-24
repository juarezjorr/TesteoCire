var seccion = 'tarjetas';
var prex = 'trj';
var valor = '';
var tipo = '',
	estd = '';

$(document).ready(function () {
	pos = 4;
	verifica_usuario();
	coloca_escenario();
});

function coloca_escenario() {
	var H = `
		<table style="width:300px" class="tablesorter tabla" >
		   <thead>
		       <tr>
                   <th class="nombre fix"   style="width:100px;"	>NUMERO</th>
                   <th class="tipo"	        style="width:100px;"	>TIPO</th>
                   <th class="estado"	    style="width:100px;"	>ESTADO</th>
		       </tr>
           </thead>
           <tbody>
           </tbody>
           <tfoot>
                <tr><td colspan="3">&nbsp;</td><tr>
           </tfoot>
		</table>`;

	$('#tabla_master_back').html(H);

	$('.tarjetas').parent().addClass('selected');

	busca_elementos();
	busca_tipos();
	busca_estados();

	$('.ibtn').on('click', function () {
		var orden = $(this).attr('data_section');
		abre_listados(orden);
	});
}
function busca_elementos() {
	var pagina = 'TAdminTarjetas/lista_tarjetas';
	var par = '[{"status":"1"}]';
	var tipo = 'json';
	var selector = pone_elementos;
	fillField(pagina, par, tipo, selector);
}
function pone_elementos(dt) {
	$.each(dt, function (v, u) {
		var H = `
            <tr class="v${v} ${u.trj_id}">
                <td class="nombre"><i class="fas fa-times-circle delete" title="Eliminar ${u.trj_numero}"></i><div class="editable" >${u.trj_numero}</div></td>
				
				<td class="tipo tsel trj_tipo">
                    <i class="fas fa-caret-down edit tip-${u.trj_tipo}-${u.trj_id}"></i><span>${u.tipo}</span><br>
                    <div class="box_list"></div>
				</td>
				<td class="estado tsel trj_estado">
                    <i class="fas fa-caret-down edit edo-${u.trj_estado}-${u.trj_id}"></i><span>${u.estado}</span><br>
                    <div class="box_list"></div>
				</td>
				
            </tr>
        `;
		$('#tabla_master_back table tbody').append(H);
	});

	//contentEditable="true"

	var ancho = $('#tabla_master_back table thead th.fix').width() - 8;
	inicial('tabla_master', ancho.toString());
	//ordenamiento('tabla_productos');
	acciones_elementos();
}

// SELECCIONA LAS OPCIONES DE SELECTORES
function llena_menu(field) {
	var resp = '';
	switch (field) {
		case 'trj_tipo':
			resp = llena_popmenu(tipo);
			break;
		case 'trj_estado':
			resp = llena_popmenu(estd);
			break;

		default:
	}
	return resp;
}

// ALIMENTA LOS SELECTORES DE ACTUALIZACION
function llena_tipo() {
	var H = '';
	if (tipo[0].llave == 'S') {
		H = `<ul>`;
		$.each(tipo, function (v, u) {
			H += `<li class="ofc" id="${u.trj_tipo}">${u.trj_descr}</li>`;
		});
		H += `</ul>`;
	} else {
		H = `<ul><li>No hay tipos disponibles</li></ul>`;
	}

	return H;
}

// BUSCADORES DE DATOS
function busca_tipos() {
	var pagina = 'TAdminTarjetas/lista_tipos';
	var par = '[{"status":"1"}]';
	var tipo = 'json';
	var selector = pone_tipos;
	fillField(pagina, par, tipo, selector);
}
function busca_estados() {
	var pagina = 'TAdminTarjetas/lista_estados';
	var par = '[{"status":"1"}]';
	var tipo = 'json';
	var selector = pone_estados;
	fillField(pagina, par, tipo, selector);
}

function pone_tipos(dt) {
	tipo = dt;
}
function pone_estados(dt) {
	estd = dt;
}

// ACTUALIZA LOS DATOS DEL CAMPO SELECCIONADO
function actualiza_elemento(id, field, valor) {
	var parElemento = `
        [
            {
                "id"    : "${id}",
                "field" : "${field}",
                "valor" : "${valor}"
            }
        ]
	`;
	var pagina = 'TAdminTarjetas/actualiza_tarjeta';
	var par = parElemento;
	var tipo = 'html';
	var selector = pone_upd_elemento;
	fillField(pagina, par, tipo, selector);
}

// ELIMINA LOS DATOS DEL CAMPO SELECCIONADO
function elimina_elemento(id) {
	var parElemento = `[{"id"    : "${id}"}]`;
	var pagina = 'TAdminTarjetas/elimina_tarjeta';
	var par = parElemento;
	var tipo = 'html';
	var selector = pone_del_elemento;
	fillField(pagina, par, tipo, selector);
}

// lLENA DE ELEMENTOS EL LISTADO SELECCIONADO
function llena_selectores(com) {
	var dtst = '';
	switch (com) {
		case 'tipo':
			dtst = tipo;
			break;
		case 'estado':
			dtst = estd;
			break;
		default:
	}
	pone_datos_elementos(com, dtst);
	seleccion_elementos();
}

// REGISTRA EL NUEVO ELEMENTO
function regista_elemento() {
	var ky = valida_campos();
	if (ky == 0) {
		var trj_numero = $('#txtTarjeta').val();
		var trj_tipo = $('#txtTipo').attr('data_selection');
		var trj_estado = $('#txtEstado').attr('data_selection');
		var parDatos = `
					[
						{
							"trj_numero" 		: "${trj_numero}",
							"trj_tipo"          : "${trj_tipo}",
							"trj_estado"        : "${trj_estado}"
						}
					]
					`;
		var pagina = 'TAdminTarjetas/agrega_tarjeta';
		var par = parDatos;
		var tipo = 'html';
		var selector = pone_add_elemento;
		fillField(pagina, par, tipo, selector);
	}
}
