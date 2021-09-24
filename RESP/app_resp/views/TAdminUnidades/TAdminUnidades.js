var valor = '';
var prex = 'und';
var area = '',
	clas = '',
	oper = '',
	unds = '',
	tarj = '';

$(document).ready(function () {
	pos = 4;
	verifica_usuario();
	coloca_escenario();
});

function coloca_escenario() {
	var H = `
		<table style="width:2690px" class="tablesorter tabla" >
		   <thead>
		       <tr>
                   <th class="placa fix"        style="width:120px;"	>PLACA</th>
                   <th class="nombre"           style="width:190px;"	>NOMBRE</th>
                   <th class="marca"	        style="width:150px;"	>MARCA</th>
                   <th class="modelo"	        style="width:60px;"	    >MODELO</th>
                   <th class="serie"	        style="width:90px;"	    >SERIE</th>
                   <th class="tipo"	            style="width:250px;"    >TIPO</th>
                   <th class="tanques"	        style="width:170px;"    >TANQUES</th>
                   <th class="capacidad"        style="width:180px;"    >CAPACIDAD</th>
                   <th class="litros"           style="width:60px;"     >COMBUSTIBLE</th>
                   <th class="litros"           style="width:80px;"     >LITROS</th>
                   <th class="litros_actuales"  style="width:80px;"     >LITROS EN TANQUE</th>
                   <th class="llantas"          style="width:140px;"     >LLANTAS</th>
                   <th class="tatuaje"          style="width:90px;"     >TATUAJE</th>
                   <th class="medida"           style="width:80px;"     >UND. DE MEDICIÓN</th>
                   <th class="ccompleta"        style="width:60px;"     >CARGA COMPLETA</th>
                   <th class="cmedia"           style="width:60px;"     >CARGA MEDIA</th>
                   <th class="cvacio"           style="width:60px;"     >VACIO</th>
                   <th class="area"             style="width:150px;"    >AREA</th>
                   <th class="clasificacion"    style="width:300px;"    >CLASIFICACIÓN</th>
                   <th class="operador"         style="width:180px;"    >OPERADOR</th>
                   <th class="tarjeta"          style="width:100px;"    >TARJETA</th>
               </tr>

           </thead>
           <tbody>
           </tbody>
           <tfoot>
                <tr><td colspan="21">&nbsp;</td><tr>
           </tfoot>
		</table>`;

	$('#tabla_master_back').html(H);

	$('.unidades').parent().addClass('selected');

	busca_elementos();
	busca_clasificacion();
	busca_operador();
	busca_tarjetas();
	busca_areas();
	busca_unidades();

	$('.ibtn')
		.unbind('click')
		.on('click', function () {
			var orden = $(this).attr('data_section');
			$(this).parent().parent().children('.nota').text('');
			abre_listados(orden);
		});
}

function busca_elementos() {
	var pagina = 'TAdminUnidades/lista_unidades';
	var par = '[{"status":"1"}]';
	var tipo = 'json';
	var selector = pone_elementos;
	fillField(pagina, par, tipo, selector);
}

function pone_elementos(dt) {
	$.each(dt, function (v, u) {
		if (u.cls_transporte == 1) {
			var rows = u.hijos > 0 ? ' rowspan=2' : '';
			var H = `
            <tr class="v${v} ${u.und_id}">
                <td class="placa">			<i class="fas fa-times-circle delete" title="Eliminar ${u.und_placa} - ${u.und_nombre}"></i><div class="editable" >${u.und_placa}</div></td>
                <td class="nombre">			<div class="editable" >${u.und_nombre}</div></td>
                <td class="marca">			<div class="editable" >${u.und_marca}</div></td>
                <td class="modelo">			<div class="editable" >${u.und_model}</div></td>
                <td class="serie">			<div class="editable" >${u.und_serie}</div></td>
                <td class="tipo">			<div class="editable" >${u.und_tipo}</div></td>
                <td class="tanques">		<div class="editable" >${u.und_tanques}</div></td>
                <td class="capacidad">		<div class="editable" >${u.und_capacidad}</div></td>
                <td class="combustible">	<div class="editable" >${u.und_combustible}</div></td>
                <td class="litros">			<div class="editable" >${u.und_litros}</div></td>
                <td class="litros_actuales"><div class="editable" >${u.und_litros_actuales}</div></td>
                <td class="llantas">		<div class="editable" >${u.und_llantas}</div></td>
                <td class="tatuaje">		<div class="editable" >${u.und_tatuaje}</div></td>
                <td class="medida">			<div class="editable" >${u.und_medida}</div></td>
                <td class="rend_ccompleta">	<div class="editable" >${u.und_rend_ccompleta}</div></td>
                <td class="rend_cmedia">	<div class="editable" >${u.und_rend_cmedia}</div></td>
                <td class="rend_cvacio">	<div class="editable" >${u.und_rend_cvacio}</div></td>
				<td class="area tsel are_id" ${rows}>
                    <i class="fas fa-caret-down edit are-${u.are_id}-${u.und_id}"></i><span>${u.are_nombre}</span><br>
                    <div class="box_list"></div>
				</td>
				<td class="clasificacion tsel cls_id">
                    <i class="fas fa-caret-down edit cls-${u.cls_id}-${u.und_id}"></i><span>${u.cls_nombre}</span><br>
                    <div class="box_list"></div>
				</td>
				<td class="empleado tsel emp_id" ${rows}>
                    <i class="fas fa-caret-down edit emp-${u.emp_id}-${u.und_id}"></i><span>${u.emp_nombre}</span><br>
                    <div class="box_list"></div>
				</td>
				<td class="tarjeta tsel trj_id">
                    <i class="fas fa-caret-down edit trj-${u.trj_id}-${u.und_id}"></i><span>${u.trj_numero}</span><br>
                    <div class="box_list"></div>
                </td>
            </tr>
		`;
			H += llena_relacionados(dt, u.und_placa, u.und_id);
			$('#tabla_master_back table tbody').append(H);
		}
	});

	var ancho = $('#tabla_master_back table thead th.fix').width() - 8;
	inicial('tabla_master', ancho.toString());

	acciones_elementos();
}

function llena_relacionados(dt, pk, pr) {
	var H = '';
	$.each(dt, function (v, u) {
		if (u.und_placa_padre == pk) {
			H = `
            <tr class="v${v} ${u.und_id} ${pr}">
                <td class="placa">			<span class="noedit"></span><div class="editable" >${u.und_placa}</div></td>
                <td class="nombre">			<div class="editable" >${u.und_nombre}</div></td>
                <td class="marca">			<div class="editable" >${u.und_marca}</div></td>
                <td class="modelo">			<div class="editable" >${u.und_model}</div></td>
                <td class="serie">			<div class="editable" >${u.und_serie}</div></td>
                <td class="tipo">			<div class="editable" >${u.und_tipo}</div></td>
                <td class="tanques">		<div class="editable" >${u.und_tanques}</div></td>
                <td class="capacidad">		<div class="editable" >${u.und_capacidad}</div></td>
                <td class="combustible">	<div class="editable" >${u.und_combustible}</div></td>
                <td class="litros">			<div class="editable" >${u.und_litros}</div></td>
                <td class="litros_actuales"><div class="editable" >${u.und_litros_actuales}</div></td>
                <td class="llantas">		<div class="editable" >${u.und_llantas}</div></td>
                <td class="tatuaje">		<div class="editable" >${u.und_tatuaje}</div></td>
                <td class="medida">			<div class="editable" >${u.und_medida}</div></td>
                <td class="rend_ccompleta">	<div class="editable" >${u.und_rend_ccompleta}</div></td>
                <td class="rend_cmedia">	<div class="editable" >${u.und_rend_cmedia}</div></td>
                <td class="rend_cvacio">	<div class="editable" >${u.und_rend_cvacio}</div></td>
				<td class="clasificacion tsel cls_id">
                    <i class="fas fa-caret-down edit cls-${u.cls_id}-${u.und_id}"></i><span>${u.cls_nombre}</span><br>
                    <div class="box_list"></div>
				</td>
				<td class="tarjeta tsel trj_id">
                    <i class="fas fa-caret-down edit trj-${u.trj_id}-${u.und_id}"></i><span>${u.trj_numero}</span><br>
                    <div class="box_list"></div>
                </td>
            </tr>
        `;
		}
	});
	return H;
}

// SELECCIONA LAS OPCIONES DE SELECTORES
function llena_menu(field) {
	var optn = '';
	switch (field) {
		case 'are_id':
			optn = area;
			break;
		case 'cls_id':
			optn = clas;
			break;
		case 'emp_id':
			optn = oper;
			break;
		case 'trj_id':
			optn = tarj;
			break;
		default:
	}
	var resp = llena_popmenu(optn);
	return resp;
}

// BUSCADORES DE DATOS
function busca_clasificacion() {
	var pagina = 'TAdminUnidades/lista_clasificacion';
	var par = '[{"status":"1"}]';
	var tipo = 'json';
	var selector = pone_clasificacion;
	fillField(pagina, par, tipo, selector);
}
function busca_operador() {
	var pagina = 'TAdminUnidades/lista_operadores';
	var par = '[{"puesto":"2"}]';
	var tipo = 'json';
	var selector = pone_operadores;
	fillField(pagina, par, tipo, selector);
}
function busca_tarjetas() {
	var pagina = 'TAdminUnidades/lista_tarjetas';
	var par = '[{"trj_tipo":"1", "trj_estado":"0", "trj_status":"1"}]';
	var tipo = 'json';
	var selector = pone_tarjetas;
	fillField(pagina, par, tipo, selector);
}
function busca_areas() {
	var pagina = 'TAdminUnidades/lista_areas';
	var par = '[{"are_status":"1"}]';
	var tipo = 'json';
	var selector = pone_areas;
	fillField(pagina, par, tipo, selector);
}
function busca_unidades() {
	var pagina = 'TAdminUnidades/lista_padres';
	var par = '[{"status":"1"}]';
	var tipo = 'json';
	var selector = pone_unidadesPadre;
	fillField(pagina, par, tipo, selector);
}

function pone_clasificacion(dt) {
	clas = dt;
}
function pone_operadores(dt) {
	oper = dt;
}
function pone_tarjetas(dt) {
	tarj = dt;
}
function pone_areas(dt) {
	area = dt;
}
function pone_unidadesPadre(dt) {
	unds = dt;
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
	var pagina = 'TAdminUnidades/actualiza_unidades';
	var par = parElemento;
	var tipo = 'html';
	var selector = pone_upd_elemento;
	fillField(pagina, par, tipo, selector);
}

// ELIMINA LOS DATOS DEL CAMPO SELECCIONADO
function elimina_elemento(id) {
	var parElemento = `[{"id"    : "${id}"}]`;
	var pagina = 'TAdminUnidades/elimina_unidad';
	var par = parElemento;
	var tipo = 'html';
	var selector = pone_del_elemento;
	fillField(pagina, par, tipo, selector);
}

// lLENA DE ELEMENTOS EL LISTADO SELECCIONADO
function llena_selectores(com) {
	var dtst = '';
	switch (com) {
		case 'areas':
			dtst = area;
			break;
		case 'clasif':
			dtst = clas;
			break;
		case 'operadores':
			dtst = oper;
			break;
		case 'tarjetas':
			dtst = tarj;
			break;
		case 'placas':
			dtst = unds;
			break;
		default:
	}
	pone_datos_elementos(com, dtst);
	seleccion_elementos();
	accion_unidades();
}

function accion_unidades() {
	$('.listado ul li')
		.unbind('click')
		.on('click', function (e) {
			var ellm = $(this).parents('div.form_group').find('.textbox').attr('id');
			if (ellm == 'txtClasificacion') {
				var obj = $('#txtUndPadre');
				var asg = $('.seg_undAsigna');
				var id = $('#' + ellm).attr('data_selection');
				if (id == 5 || id == 6) {
					asg.removeClass('noshow');
					obj.addClass('requerido');
					$('#txtCMedia').removeClass('requerido').parents('div.form_group').addClass('noshow');
					$('#txtCVacia').removeClass('requerido').parents('div.form_group').addClass('noshow');
					$('#txtArea').removeClass('requerido').parents('div.form_group').addClass('noshow');
					$('#txtOperador').removeClass('requerido').parents('div.form_group').addClass('noshow');
					$('.seg_ccompleta').children('label').text('Rendimiento de horas por litro');
				} else {
					asg.addClass('noshow');
					obj.removeClass('requerido');
					obj.val('');
					obj.parent().parent().children('.nota').text('');
					$('#txtCMedia').addClass('requerido').parents('div.form_group').removeClass('noshow');
					$('#txtCVacia').addClass('requerido').parents('div.form_group').removeClass('noshow');
					$('#txtArea').addClass('requerido').parents('div.form_group').removeClass('noshow');
					$('#txtOperador').addClass('requerido').parents('div.form_group').removeClass('noshow');
					$('.seg_ccompleta')
						.children('label')
						.text('Rendimiento de Kms por litro con carga completa');
				}
			}
		});
}

// REGISTRA EL NUEVO ELEMENTO
function regista_elemento() {
	var ky = valida_campos();
	if (ky == 0) {
		var und_placa = $('#txtPlaca').val();
		var und_nombre = $('#txtNombre').val();
		var und_marca = $('#txtMarca').val();
		var und_model = $('#txtModelo').val();
		var und_serie = $('#txtSerie').val();
		var und_tipo = $('#txtTipo').val();
		var und_tanques = $('#txtTanque').val();
		var und_capacidad = $('#txtCapacidad').val();
		var und_combustible = $('#txtCombustible').val();
		var und_litros = $('#txtLitros').val();
		var und_litros_actuales = $('#txtLitrosAct').val();
		var und_llantas = $('#txtLlantas').val();
		var und_tatuaje = $('#txtTatuaje').val();
		var cls_id = $('#txtClasificacion').attr('data_selection');
		var und_placa_padre = $('#txtUndPadre').val() == '' ? 0 : $('#txtUndPadre').val();
		var und_id_padre = $('#txtUndPadre').attr('data_selection');
		var und_medida = und_id_padre > 0 ? 'HR' : 'KM';
		var und_rend_ccompleta = $('#txtCCompleta').val();
		var und_rend_cmedia = $('#txtCMedia').val();
		var und_rend_cvacio = $('#txtCVacia').val();
		var are_id = $('#txtArea').attr('data_selection');
		var emp_id = $('#txtOperador').attr('data_selection');
		var trj_id = $('#txtTarjeta').attr('data_selection');
		var parDatos = `
					[
						{
							"und_placa"    			: "${und_placa}",
							"und_nombre" 			: "${und_nombre}",
							"und_marca" 			: "${und_marca}",
							"und_model" 			: "${und_model}",
							"und_serie" 			: "${und_serie}",
							"und_tipo" 				: "${und_tipo}",
							"und_tanques" 			: "${und_tanques}",
							"und_capacidad" 		: "${und_capacidad}",
							"und_combustible" 		: "${und_combustible}",
							"und_litros" 			: "${und_litros}",
							"und_litros_actuales" 	: "${und_litros_actuales}",
							"und_llantas" 			: "${und_llantas}",
							"und_tatuaje" 			: "${und_tatuaje}",
							"und_medida" 			: "${und_medida}",
							"cls_id"				: "${cls_id}",
							"und_placa_padre"		: "${und_placa_padre}",
							"und_id_padre"			: "${und_id_padre}",
							"und_rend_ccompleta"	: "${und_rend_ccompleta}",
							"und_rend_cmedia"		: "${und_rend_cmedia}",
							"und_rend_cvacio"		: "${und_rend_cvacio}",
							"are_id" 	        	: "${are_id}",
							"emp_id" 	        	: "${emp_id}",
                            "trj_id" 	        	: "${trj_id}"
						}
					]
					`;
		//console.log(parDatos);
		var pagina = 'TAdminUnidades/agrega_unidades';
		var par = parDatos;
		var tipo = 'html';
		var selector = pone_add_elemento;
		fillField(pagina, par, tipo, selector);
	}
}
