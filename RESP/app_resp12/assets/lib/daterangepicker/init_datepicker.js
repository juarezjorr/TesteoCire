var ff, fi;

function init_daterangepicker() {
	moment(new Date(ff));
	moment.locale('es');

	console.log(fi);
	console.log(ff);

	var cb = function (start, end, label) {
		$('.date_selector_date')
			.html(start.format('L') + ' - ' + end.format('L'))
			.attr('data-date', start.format('YYYYMMDD'));
	};
	var optionDoubleSet = {
		startDate: moment(ff).subtract(29, 'days'),
		endDate: moment(ff),
		minDate: new Date(fi),
		maxDate: new Date(ff),
		dateLimit: { days: 60 },
		showDropdowns: true,
		showWeekNumbers: true,
		timePicker: false,
		timePickerIncrement: 1,
		timePicker12Hour: true,
		ranges: {
			Hoy: [moment(ff), moment(ff)],
			Ayer: [moment(ff).subtract(1, 'days'), moment(ff).subtract(1, 'days')],
			'Ultimos 7 días': [moment(ff).subtract(6, 'days'), moment(ff)],
			'Ultimos 30 dias': [moment(ff).subtract(29, 'days'), moment(ff)],
			'Mes actual': [moment(ff).startOf('month'), moment(ff).endOf('month')],
			'Mes anterior': [
				moment(ff).subtract(1, 'month').startOf('month'),
				moment(ff).subtract(1, 'month').endOf('month')
			]
		},
		opens: 'left',
		buttonClasses: ['boton'],
		applyClass: 'btn_acplicar',
		cancelClass: 'btn_cancelar',
		format: 'DDMMYYYY',
		separator: ' a ',
		locale: {
			applyLabel: 'Aplicar',
			cancelLabel: 'Cancelar',
			fromLabel: 'desde',
			toLabel: 'a',
			customRangeLabel: 'Personalizado',
			daysOfWeek: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
			monthNames: [
				'Enero',
				'Febrero',
				'Marzo',
				'Abril',
				'Mayo',
				'Junio',
				'Julio',
				'Agosto',
				'Septiembre',
				'Octubre',
				'Noviembre',
				'Diciembre'
			],
			firstDay: 1
		}
	};

	var optionSingleSet = {
		startDate: moment(ff),
		endDate: moment(ff),
		minDate: new Date(fi),
		maxDate: new Date(ff),
		format: 'YYYYMMDD',
		singleDatePicker: true,
		showDropdowns: true,
		showWeekNumbers: true,
		timePicker: false,
		autoApply: true
	};

	$('.date_selector_date').daterangepicker(optionDoubleSet, cb);
	$('.date_selector_date').html(moment(fi).format('L') + ' - ' + moment(ff).format('L'));
	$('.date_selector_date').on('apply.daterangepicker', function (ev, picker) {
		setFecha = picker.startDate.format('YYYYMMDD');
		setPeriodo == 'D' ? selector_avance_dia() : selector_avance();

		rngini = picker.startDate.format('YYYYMMDD');
		rngfin = picker.endDate.format('YYYYMMDD');

		recarga();
	});
}
