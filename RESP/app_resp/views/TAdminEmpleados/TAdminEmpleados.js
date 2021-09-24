var seccion = 'empleados';
var prex = 'emp';
var ptos = '',
	area = '';
var valor = '';

$(document).ready(function () {
	pos = 4;
	verifica_usuario();
	coloca_escenario();
});

function coloca_escenario() {
	var H = `
		<table style="width:660px" class="tablesorter tabla" >
		   <thead>
		       <tr>
                   <th class="nombre fix"   style="width:180px;"	>NOMBRE</th>
                   <th class="codigo"       style="width:80px;"	    >NUMERO</th>
                   <th class="descripcion"	style="width:200px;"	>AREA</th>
                   <th class="descripcion"	style="width:200px;"	>PUESTO</th>
		       </tr>
           </thead>
           <tbody>
           </tbody>
           <tfoot>
                <tr><td colspan="4">&nbsp;</td><tr>
           </tfoot>
		</table>`;

	$('#tabla_master_back').html(H);

	$('.empleados').parent().addClass('selected');

	busca_elementos();
	busca_puestos();
	busca_areas();

	$('.ibtn').on('click', function () {
		var orden = $(this).attr('data_section');
		abre_listados(orden);
	});
}
function busca_elementos() {
	var pagina = 'TAdminEmpleados/lista_empleados';
	var par = '[{"status":"1"}]';
	var tipo = 'json';
	var selector = pone_elementos;
	fillField(pagina, par, tipo, selector);
}
function pone_elementos(dt) {
	$.each(dt, function (v, u) {
		var H = `
            <tr class="v${v} ${u.emp_id}">
                <td class="nombre"><i class="fas fa-times-circle delete" title="Eliminar ${u.emp_numero} - ${u.emp_nombre}"></i><div class="editable" >${u.emp_nombre}</div></td>
                <td class="numero">${u.emp_numero}</td>
				<td class="area tsel are_id">
                    <i class="fas fa-caret-down edit are-${u.are_id}-${u.emp_id}"></i><span>${u.are_nombre}</span><br>
                    <div class="box_list"></div>
				</td>
				<td class="puesto tsel pto_id">
                    <i class="fas fa-caret-down edit pto-${u.pto_id}-${u.emp_id}"></i><span>${u.pto_nombre}</span><br>
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
	var optn = '';
	switch (field) {
		case 'are_id':
			optn = area;
			break;
		case 'pto_id':
			optn = ptos;
			break;

		default:
	}
	var resp = llena_popmenu(optn);
	return resp;
}

// BUSCADORES DE DATOS
function busca_puestos() {
	var pagina = 'TAdminEmpleados/lista_puestos';
	var par = '[{"status":"1"}]';
	var tipo = 'json';
	var selector = pone_puestos;
	fillField(pagina, par, tipo, selector);
}
function busca_areas() {
	var pagina = 'TAdminEmpleados/lista_areas';
	var par = '[{"status":"1"}]';
	var tipo = 'json';
	var selector = pone_areas;
	fillField(pagina, par, tipo, selector);
}

function pone_puestos(dt) {
	ptos = dt;
}
function pone_areas(dt) {
	area = dt;
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
	var pagina = 'TAdminEmpleados/actualiza_empleado';
	var par = parElemento;
	var tipo = 'html';
	var selector = pone_upd_elemento;
	fillField(pagina, par, tipo, selector);
}

// ELIMINA LOS DATOS DEL CAMPO SELECCIONADO
function elimina_elemento(id) {
	var parElemento = `[{"id"    : "${id}"}]`;
	var pagina = 'TAdminEmpleados/elimina_empleado';
	var par = parElemento;
	var tipo = 'html';
	var selector = pone_del_elemento;
	fillField(pagina, par, tipo, selector);
}

// lLENA DE ELEMENTOS EL LISTADO SELECCIONADO
function llena_selectores(com) {
	var dtst = '';
	switch (com) {
		case 'puestos':
			dtst = ptos;
			break;
		case 'areas':
			dtst = area;
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
		var emp_numero = $('#txtNumero').val();
		var emp_nombre = $('#txtNombre').val();
		var are_id = $('#txtArea').attr('data_selection');
		var pto_id = $('#txtPuesto').attr('data_selection');
		var parDatos = `
					[
						{
							"emp_numero"    	: "${emp_numero}",
							"emp_nombre" 		: "${emp_nombre}",
                            "are_id" 	        : "${are_id}",
                            "pto_id" 	        : "${pto_id}"
						}
					]
					`;
		var pagina = 'TAdminEmpleados/agrega_empleado';
		var par = parDatos;
		var tipo = 'html';
		var selector = pone_add_elemento;
		fillField(pagina, par, tipo, selector);
	}
}
