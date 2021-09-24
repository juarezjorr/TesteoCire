var seccion = 'puestos';
var prex = 'pto';

$(document).ready(function () {
	pos = 4;
	verifica_usuario();
	coloca_escenario();
});

function coloca_escenario() {
	var H = `
		<table style="width:470px" class="tablesorter tabla" >
		   <thead>
		       <tr>
                   <th class="nombre fix"   style="width:120px;"	>NOMBRE</th>
                   <th class="descripcion"	style="width:350px;"	>DESCRIPCION</th>
		       </tr>
           </thead>
           <tbody>
           </tbody>
           <tfoot>
                <tr><td colspan="2">&nbsp;</td><tr>
           </tfoot>
		</table>`;

	$('#tabla_master_back').html(H);

	$('.puestos').parent().addClass('selected');

	busca_elementos();

	$('.ibtn').on('click', function () {
		var orden = $(this).attr('data_section');
		abre_listados(orden);
	});
}

function busca_elementos() {
	var pagina = 'TAdminPuestos/lista_puestos';
	var par = '[{"status":"1"}]';
	var tipo = 'json';
	var selector = pone_elementos;
	fillField(pagina, par, tipo, selector);
}

function pone_elementos(dt) {
	$.each(dt, function (v, u) {
		var H = `
            <tr class="v${v} ${u.pto_id}">
                <td class="nombre"><i class="fas fa-times-circle delete" title="Eliminar ${u.pto_nombre}"></i><div class="editable" >${u.pto_nombre}</div></td>
                <td class="descripcion"><div class="editable" >${u.pto_descripcion}</div></td>
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
		case 'are_id':
			resp = llena_popmenu(area);
			break;
		case 'pto_id':
			resp = llena_popmenu(ptos);
			break;

		default:
	}
	return resp;
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
	var pagina = 'TAdminPuestos/actualiza_puesto';
	var par = parElemento;
	var tipo = 'html';
	var selector = pone_upd_elemento;
	fillField(pagina, par, tipo, selector);
}

// ELIMINA LOS DATOS DEL CAMPO SELECCIONADO
function elimina_elemento(id) {
	var parElemento = `[{"id"    : "${id}"}]`;
	var pagina = 'TAdminPuestos/elimina_puesto';
	var par = parElemento;
	var tipo = 'html';
	var selector = pone_del_elemento;
	fillField(pagina, par, tipo, selector);
}

// REGISTRA EL NUEVO ELEMENTO
function regista_elemento() {
	var ky = valida_campos();
	if (ky == 0) {
		var pto_nombre = $('#txtNombre').val();
		var pto_descripcion = $('#txtDescripcion').val();
		var parDatos = `
					[
						{
							"pto_nombre" 		: "${pto_nombre}",
                            "pto_descripcion" 	: "${pto_descripcion}"
						}
					]
					`;
		var pagina = 'TAdminPuestos/agrega_puesto';
		var par = parDatos;
		var tipo = 'html';
		var selector = pone_add_elemento;
		fillField(pagina, par, tipo, selector);
	}
}
