$(document).ready(function () {
	var upper = new RegExp('^(?=.*[A-Z])');
	var number = new RegExp('^(?=.*[0-9])');
	var lower = new RegExp('^(?=.*[a-z])');
	var len = new RegExp('^(?=.{8,})');

	var regExp = [upper, number, lower, len];
	var elemnt = [$('#upper'), $('#number'), $('#lower'), $('#len')];

	$('#txtPassword').on('keyup', function () {
		var pass = $('#txtPassword').val();
		var check = 0;

		for (var i = 0; i < 4; i++) {
			if (regExp[i].test(pass)) {
				// elemnt[i].hide();
				elemnt[i].children('i').show();
				check++;
			} else {
				// elemnt[i].show();
				elemnt[i].children('i').hide();
			}
		}
		if (check == 0) {
			$('#mensaje').text('').css({ color: '#cc0000' });
		} else if (check == 1) {
			$('#mensaje').text('Muy bajo').css({ color: '#cc0000' });
		} else if (check > 1 && check <= 2) {
			$('#mensaje').text('Bajo').css({ color: '#cc0000' });
		} else if (check > 2 && check <= 3) {
			$('#mensaje').text('Medio').css({ color: '#cc0000' });
		} else if (check == 4) {
			$('#mensaje').text('Fuerte').css({ color: '#cc0000' });
		}
	});

	$('#guarda').on('click', function () {
		var ky = valida_campos();
		if (ky == 0) {
			guardar_contraseña();
		}
	});

	$('#txtNewPassword').on('focus', function () {
		$('#mensaje2').text('');
	});
});

function guardar_contraseña() {
	var galleta = Cookies.get('user');
	var emp = galleta.split('|')[0];
	var pwd = $('#txtPassword').val();
	var pag = galleta.split('|')[5];

	var parund = `[
        {
            "emp_id" 		: "${emp}",
            "passwd"		: "${pwd}",
            "page"		    : "${pag}"
        }
    ]
`;

	var pagina = 'ChangePassword/cambia_password';
	var par = parund;
	var tipo = 'html';
	var selector = cambia_password;
	fillField(pagina, par, tipo, selector);
}

function cambia_password(dt) {
	var galleta = Cookies.get('user');
	var pag = galleta.split('|')[5];
	if (dt == 1) {
		window.location.href = pag;
	} else {
		console.log('No cambio la contraseña');
	}
}

function valida_campos() {
	var ky = 0;
	var err = '';
	$('.frame_inputs .requerido').each(function () {
		if ($(this).attr('data_req') == 0 && $(this).val() == '') {
			ky = 1;
			err += $(this).attr('data_fail') + '<br>';
		}
	});
	if (err != '') {
		// Agregar un modal para los errores
		alert(err);
	} else {
		var pwd1 = $('#txtPassword').val();
		var pwd2 = $('#txtNewPassword').val();

		if (pwd1 != pwd2) {
			ky = 1;

			$('#mensaje2').text('La contraseña es distinta');
		}
	}

	return ky;
}
