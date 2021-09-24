var seccion = 'usuarios';
var prex = 'usr';
var perf = '',
	empl = '';

$(document).ready(function () {
	pos = 4;
	verifica_usuario();
	coloca_escenario();
});

function coloca_escenario() {
	var H = `
		<table style="width:780px" class="tablesorter tabla" >
		   <thead>
		       <tr>
                   <th class="nombre fix"   style="width:180px;"	>NOMBRE</th>
                   <th class="codigo"       style="width:120px;"	>PERFIL</th>
                   <th class="descripcion"	style="width:140px;"	>FECHA REGISTRO</th>
                   <th class="descripcion"	style="width:140px;"	>FECHA ULTIMO ACCESO</th>
                   <th class="descripcion"	style="width:140px;"	>FECHA<br>CAMBIO CONTRASEÑA</th>
		       </tr>
           </thead>
           <tbody>
           </tbody>
           <tfoot>
                <tr><td colspan="4">&nbsp;</td><tr>
           </tfoot>
		</table>`;

	$('#tabla_master_back').html(H);

	$('.usuarios').parent().addClass('selected');

	busca_elementos();
	busca_perfiles();
	busca_empleados();

	$('.ibtn')
		.unbind('click')
		.on('click', function () {
			var orden = $(this).attr('data_section');
			abre_listados(orden);
		});
}

function busca_elementos() {
	var pagina = 'TAdminUsuarios/lista_usuarios';
	var par = '[{"status":"1"}]';
	var tipo = 'json';
	var selector = pone_elementos;
	fillField(pagina, par, tipo, selector);
}

function pone_elementos(dt) {
	$.each(dt, function (v, u) {
		var H = `
            <tr class="v${v} ${u.usr_id}">
				<td class="nombre">
					<i class="fas fa-times-circle delete" title="Eliminar ${u.emp_numero} - ${u.emp_nombre}"></i>
					<i class="fas fa-key passwd" title="Generar nueva contraseña a ${u.emp_numero} - ${u.emp_nombre}"></i>
					${u.emp_nombre}
				</td>
				<td class="perfil tsel prf_id">
                    <i class="fas fa-caret-down edit are-${u.prf_id}-${u.usr_id}"></i><span>${u.prf_nombre}</span><br>
                    <div class="box_list"></div>
				</td>
				<td class="fch_registro centro">${u.usr_fch_registro}</div></td>
				<td class="fch_ult_registro centro">${u.usr_fch_ult_acceso}</div></td>
				<td class="fch_cambio_pwd centro">${u.usr_fch_cambio_pwd}</div></td>
            </tr>
        `;
		$('#tabla_master_back table tbody').append(H);
	});

	var ancho = $('#tabla_master_back table thead th.fix').width() - 8;
	inicial('tabla_master', ancho.toString());
	//ordenamiento('tabla_productos');
	acciones_elementos();

	$('i.passwd')
		.unbind('click')
		.on('click', function () {
			var id = $(this).parents('tr').attr('class').split(' ')[1];
			cambia_password(id);
		});
}

// SELECCIONA LAS OPCIONES DE SELECTORES
function llena_menu(field) {
	var optn = '';
	switch (field) {
		case 'prf_id':
			optn = perf;
			break;
		default:
	}
	var resp = llena_popmenu(optn);
	return resp;
}

// BUSCADORES DE DATOS
function busca_perfiles() {
	var pagina = 'TAdminUsuarios/lista_perfiles';
	var par = '[{"status":"1"}]';
	var tipo = 'json';
	var selector = pone_perfiles;
	fillField(pagina, par, tipo, selector);
}
function busca_empleados() {
	var pagina = 'TAdminUsuarios/lista_empleados';
	var par = '[{"status":"1"}]';
	var tipo = 'json';
	var selector = pone_empleados;
	fillField(pagina, par, tipo, selector);
}

function pone_perfiles(dt) {
	perf = dt;
}
function pone_empleados(dt) {
	empl = dt;
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
	var pagina = 'TAdminUsuarios/actualiza_usuario';
	var par = parElemento;
	var tipo = 'html';
	var selector = pone_upd_elemento;
	fillField(pagina, par, tipo, selector);
}

// ELIMINA LOS DATOS DEL CAMPO SELECCIONADO
function elimina_elemento(id) {
	var parElemento = `[{"id"    : "${id}"}]`;
	var pagina = 'TAdminUsuarios/elimina_usuario';
	var par = parElemento;
	var tipo = 'html';
	var selector = pone_del_elemento;
	fillField(pagina, par, tipo, selector);
}

// lLENA DE ELEMENTOS EL LISTADO SELECCIONADO
function llena_selectores(com) {
	var dtst = '';
	switch (com) {
		case 'empleados':
			dtst = empl;
			break;
		case 'perfiles':
			dtst = perf;
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
		var emp_id = $('#txtEmpleado').attr('data_selection');
		var prf_id = $('#txtPerfil').attr('data_selection');
		var usr_password = generador_paswword();
		var parDatos = `
					[
						{
                            "emp_id" 	        : "${emp_id}",
							"prf_id" 	        : "${prf_id}",
							"usr_password" 	    : "${usr_password}"
						}
					]
					`;
		var pagina = 'TAdminUsuarios/agrega_usuario';
		var par = parDatos;
		var tipo = 'html';
		var selector = pone_add_elemento;
		fillField(pagina, par, tipo, selector);
	}
}

function cambia_password(id) {
	var passwd = generador_paswword();
	registra_password(passwd, id);

	var H = `
		<div class="pass_modal">
			<div class="pass_caja">
				<i class="fas fa-times close"></i>
				<h2>Nueva contraseña</h2>
				<input type="text" readonly  class="password" value="${passwd}">
				<div class="copiado"><i class="fas fa-copy"></i> &nbsp;&nbsp;&nbsp;código copiado</div>
			</div>
		</div>
	`;
	$('body').append(H);

	$('.close').on('click', function () {
		$('.pass_modal').fadeOut(500, function () {
			$('.pass_modal').remove();
		});
	});
	$('.password').on('click', function () {
		copiar_password();
	});
}

function generador_paswword() {
	var numeroCaracteres = 15;
	var configura = {
		caracteres: numeroCaracteres,
		simbolos: true,
		numeros: true,
		mayusculas: true,
		minusculas: true
	};

	var caracteres = {
		numeros: '0 1 2 3 4 5 6 7 8 9',
		simbolos: '! @ # $ % & * ( ) _ - + = { [ ] } ; : < , > . ? /',
		mayusculas: 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z',
		minusculas: 'a b c d e f g h i j k l m n o p q r s t u v w x y z'
	};

	var caracteresFinales = '';
	var password = '';

	for (propiedad in configura) {
		if (configura[propiedad] == true) {
			caracteresFinales += caracteres[propiedad] + ' ';
		}
	}
	caracteresFinales = caracteresFinales.trim();
	caracteresFinales = caracteresFinales.split(' ');

	for (var i = 0; i < configura.caracteres; i++) {
		password += caracteresFinales[Math.floor(Math.random() * caracteresFinales.length)];
	}

	var contr = '$CH' + password;
	return contr;
}

function copiar_password() {
	$('.password').select();
	document.execCommand('copy');

	$('.copiado').css({ display: 'block' });

	setTimeout(function () {
		$('.copiado').css({ display: 'none' });
	}, 2000);
}

function registra_password(passwd, id) {
	var parElemento = `[{"id"    : "${id}","passwd"    : "${passwd}"}]`;
	var pagina = 'TAdminUsuarios/guarda_password';
	var par = parElemento;
	var tipo = 'html';
	var selector = pone_upd_elemento;
	fillField(pagina, par, tipo, selector);
}
