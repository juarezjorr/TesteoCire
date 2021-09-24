function acciones_elementos() {
	/* ---- ---- PASAR EL RATON POR ENCIMA DEL ROW  ----- ------ */
	$('#tabla_master tbody tr').on('mouseover', function () {
		var idrow = $(this).attr('class').split(' ')[0];
		$('.' + idrow).addClass('over');
	});
	$('#tabla_master tbody tr').on('mouseleave', function () {
		var idrow = $(this).attr('class').split(' ')[0];
		$('.' + idrow).removeClass('over');
	});

	$('i.edit').on('click', function (e) {
		var id = $(this).attr('class').split(' ')[3];
		var field = $(this).parent().attr('class').split(' ')[2];
		var style = $('.' + id)
			.parent()
			.children('.box_list')
			.attr('style');
		$('.box_list').slideUp(500);
		if (style != 'display: block;') {
			$('.' + id)
				.parent()
				.children('.box_list')
				.html(llena_menu(field))
				.slideDown(500);
		}

		$('li.ofc')
			.unbind('click')
			.on('click', function () {
				var slName = $(this).text();
				var slSg = id.split('-')[0];
				var slId = $(this).attr('id');
				var orId = slSg + '-' + slId + '-' + id.split('-')[2];
				$('.' + id)
					.removeClass(id)
					.addClass(orId)
					.parent()
					.children('span')
					.html(slName);
				actualiza_elemento(id.split('-')[2], field, slId);
				$('.box_list').slideUp(500);
			});
	});
	$('.tabla_master div.editable').on('focus', function () {
		valor = $(this).text();
		$(this).addClass('activo');
	});
	$('.tabla_master div.editable').on('blur', function () {
		$(this).removeClass('activo');
		$(this).attr('contentEditable', 'false');
		var id = $(this).parent().parent().attr('class').split(' ')[1];
		var field = prex + '_' + $(this).parent().attr('class');
		var nvalor = $(this).text();

		if (valor != nvalor) {
			actualiza_elemento(id, field, nvalor);
		}
	});
	$('.tabla_master div.editable').on('keypress', function (e) {
		var code = e.keyCode ? e.keyCode : e.which;
		if (code == 13) {
			$(this).trigger('blur');
		}
	});
	$('.tabla_master td div.editable').on('click', function () {
		$(this).attr('contentEditable', 'true');
		$(this).trigger('focus');
	});
	$('i.delete').on('click', function () {
		var del = confirm('Realmente quieres eliminar este elemento');
		if (del == true) {
			var id = $(this).parent().parent().attr('class').split(' ')[1];
			$('.' + id).remove();
			elimina_elemento(id);
		}
	});

	//---  Click para agregar nuevo elemento ---
	$('.add_Boton span').on('click', function () {
		agrega_elemento();
	});
	//---  Click para cancelar la accion ---
	$('#cancela').on('click', function () {
		cierra_modal();
	});

	//---  Click para guardar los nuevos elementos ---
	$('#guarda').on('click', function () {
		regista_elemento();
	});

	$('.requerido').on('focus', function () {
		$(this).parent().parent().children('.nota').text('');
	});
}

// VALIDA QUE EXISTAN VALORES EN LOS CAMPOS REQUERIDOS
function valida_campos() {
	var ps = 0;
	$('.caja .textbox').each(function () {
		var req = $(this).attr('class').split(' ')[1];
		if (req == 'requerido') {
			if ($(this).val() == '') {
				var nota = $(this).attr('data_fail');
				$(this).parent().parent().children('.nota').text(nota);
				ps = 1;
			}
		}
	});

	return ps;
}
function pone_add_elemento(dt) {
	$('#tabla_master_back').html('');
	$('#tabla_master').html('');
	coloca_escenario();
	cierra_modal();
	console.log('Registro de elemento.');
}

// SELECCIONA EL ELEMENTO DEL LISTADO
function seleccion_elementos() {
	$('.listado ul li a')
		.unbind('click')
		.on('click', function (e) {
			e.preventDefault();
			var id = $(this).attr('id');
			var name = $(this).text();
			var idsel = $(this).parent().parent().parent().attr('id');
			var selob = $('#' + idsel)
				.parent()
				.find('input')
				.attr('id');
			$('#' + selob).val(name);
			$('#' + selob).attr('data_selection', id);
			$('.listado').slideUp(300);
		});
}

function pone_upd_elemento(dt) {
	var rs = dt > 0 ? 'Actualización de elemento' : 'Actualización Fallída';
	console.log(rs);
}

function pone_del_elemento(dt) {
	var rs = dt > 0 ? 'Eliminación Ok' : 'Eliminación Fallida';
	console.log(rs);
}

// ABRE EL MODAL PARA NUEVO ELEMENTO
function agrega_elemento() {
	$('.fondo_modal').fadeIn(1000, function () {
		$('.caja').animate(
			{
				left: '5%',
				right: '5%'
			},
			1000
		);
	});
	seleccion_elementos();
}
function cierra_modal() {
	$('.caja').animate(
		{
			left: '100%',
			right: '-100%'
		},
		1000,
		function () {
			$('.fondo_modal').fadeOut(1000);
			$('.textbox').val('').attr({ data_selection: '0' });
		}
	);
}

// ALIMENTA LOS SELECTORES DE ACTUALIZACION POPMENU
function llena_popmenu(elms) {
	var H = '';
	if (elms[0].llave == 'S') {
		H = `<ul>`;
		$.each(elms, function (v, u) {
			H += `<li class="ofc" id="${u.id}">${u.nombre}</li>`;
		});
		H += `</ul>`;
	} else {
		H = `<ul><li>No hay elemento disponible</li></ul>`;
	}

	return H;
}

// ABRE LOS SELECTORES DEL FORMULARIO
function abre_listados(com) {
	var txt = $('#' + com)
		.parents('div.form_group')
		.find('div.group_search-lf')
		.width();

	$('#' + com + '.listado').width(txt + 'px');
	var sts = $('#' + com + '.listado').css('display');
	$('.listado').slideUp(300);
	if (sts == 'none') {
		$('#' + com)
			.html(llena_selectores(com))
			.slideDown(600);
	}
}

// LLENADO DE ELEMENTOS DEL FORMULARIO
function pone_datos_elementos(sctr, dtst) {
	$('#' + sctr + ' ul').html('');
	if (dtst[0].llave == 'S') {
		$.each(dtst, function (v, u) {
			$('#' + sctr + ' ul').append(`<li><a href="#" id="${u.id}">${u.nombre}</a></li>`);
		});
	} else {
		$('#' + sctr + ' ul').append(`<li>No hay elementos disponibles</li>`);
	}
}
