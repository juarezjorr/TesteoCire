var seccion = 'destinos';
var prex = 'dst';
$(document).ready(function () {
	pos = 4;
	verifica_usuario();
	coloca_escenario();
});

function coloca_escenario() {
	var H = `
		<table style="width:480px" class="tablesorter tabla" >
		   <thead>
		       <tr>
                   <th class="nombre fix"   style="width:150px;"	>NOMBRE</th>
                   <th class="codigo"       style="width:80px;"	    >CÓDIGO</th>
                   <th class="descripcion"	style="width:270px;"	>DESCRIPCION</th>
		       </tr>
           </thead>
           <tbody>
           </tbody>
		</table>`;

	$('#tabla_master_back').html(H);

	$('.destinos').parent().addClass('selected');

	busca_elementos();
}

function busca_elementos() {
	var pagina = 'TAdminDestinos/lista_destinos';
	var par = '[{"status":"1"}]';
	var tipo = 'json';
	var selector = pone_elementos;
	fillField(pagina, par, tipo, selector);
}

function pone_elementos(dt) {
	$.each(dt, function (v, u) {
		var H = `
            <tr class="v${v} ${u.dst_id}">
			<td class="nombre"><i class="fas fa-times-circle delete" title="Eliminar ${u.dst_codigo} - ${u.dst_nombre}"></i><div class="editable" >${u.dst_nombre}</div></td>
            <td class="codigo">${u.dst_codigo}</td>
            <td class="descripcion"><div  class="editable" >${u.dst_descripcion}</div></td>
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
		// case 'are_id':
		// 	resp = llena_popmenu(area);
		// 	break;

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
	var pagina = 'TAdminDestinos/actualiza_destinos';
	var par = parElemento;
	var tipo = 'html';
	var selector = pone_upd_elemento;
	fillField(pagina, par, tipo, selector);
}

// function actualiza_destinos(id, field, valor) {
// 	var parDestino = `
//         [
//             {
//                 "id"    : "${id}",
//                 "field" : "${field}",
//                 "valor" : "${valor}"
//             }
//         ]
//     `;
// 	var pagina = 'TAdminDestinos/actualiza_destinos';
// 	var par = parDestino;
// 	var tipo = 'html';
// 	var selector = pone_upd_destinos;
// 	fillField(pagina, par, tipo, selector);
// }

// ELIMINA LOS DATOS DEL CAMPO SELECCIONADO
function elimina_elemento(id) {
	var parElemento = `[{"id"    : "${id}"}]`;
	var pagina = 'TAdminDestinos/elimina_destinos';
	var par = parElemento;
	var tipo = 'html';
	var selector = pone_del_elemento;
	fillField(pagina, par, tipo, selector);
}

// function elimina_destino(id) {
// 	var parDestino = `[{"id"    : "${id}"}]`;
// 	var pagina = 'TAdminDestinos/elimina_destinos';
// 	var par = parDestino;
// 	var tipo = 'html';
// 	var selector = pone_del_destinos;
// 	fillField(pagina, par, tipo, selector);
// }

// function pone_upd_destinos(dt) {
// 	var rs = dt > 0 ? 'Actualización Ok' : 'Actualización Fallida';
// 	console.log(rs);
// }

// function pone_del_destinos(dt) {
// 	var rs = dt > 0 ? 'Eliminación Ok' : 'Eliminación Fallida';
// 	console.log(rs);
// }

// function agrega_destino() {
// 	$('.fondo_modal').fadeIn(1000, function () {
// 		$('.caja').animate(
// 			{
// 				left: '10%',
// 				right: '10%'
// 			},
// 			1000
// 		);
// 	});
// }

// function cierra_modal() {
// 	$('.caja').animate(
// 		{
// 			left: '100%',
// 			right: '-100%'
// 		},
// 		1000,
// 		function () {
// 			$('.fondo_modal').fadeOut(1000);
// 			$('.textbox').val('');
// 		}
// 	);
// }

// REGISTRA EL NUEVO ELEMENTO
function regista_elemento() {
	var ky = valida_campos();
	if (ky == 0) {
		var dst_codigo = $('#txtCodigo').val();
		var dst_nombre = $('#txtNombre').val();
		var dst_descripcion = $('#txtDescripcion').val();
		var parDatos = `
					[
						{
							"dst_codigo"    	: "${dst_codigo}",
							"dst_nombre" 		: "${dst_nombre}",
							"dst_descripcion" 	: "${dst_descripcion}"
						}
					]
					`;
		var pagina = 'TAdminDestinos/agrega_destinos';
		var par = parDatos;
		var tipo = 'html';
		var selector = pone_add_elemento;
		fillField(pagina, par, tipo, selector);
	}
}

// function regista_destino() {
// 	var ky = valida_campos();
// 	if (ky == 0) {
// 		var dst_codigo = $('#txtCodigo').val();
// 		var dst_nombre = $('#txtNombre').val();
// 		var dst_descripcion = $('#txtDescripcion').val();
// 		var parDatos = `
// 					[
// 						{
// 							"dst_codigo"    	: "${dst_codigo}",
// 							"dst_nombre" 		: "${dst_nombre}",
// 							"dst_descripcion" 	: "${dst_descripcion}"
// 						}
// 					]
// 					`;
// 		var pagina = 'TAdminDestinos/agrega_destinos';
// 		var par = parDatos;
// 		var tipo = 'html';
// 		var selector = pone_add_destinos;
// 		fillField(pagina, par, tipo, selector);
// 	}
// }

// function pone_add_destinos(dt) {
// 	$('#tabla_master_back').html('');
// 	$('#tabla_master').html('');
// 	coloca_escenario();
// 	cierra_modal();
// }

// function valida_campos() {
// 	var ps = 0;
// 	$('.caja .textbox').each(function () {
// 		var req = $(this).attr('class').split(' ')[1];
// 		if (req == 'requerido') {
// 			if ($(this).val() == '') {
// 				$(this).parent().parent().children('.nota').removeClass('noshow');
// 				ps = 1;
// 			}
// 		}
// 	});

// 	return ps;
// }
