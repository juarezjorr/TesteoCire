//ESTRUCTURACION DE TABLAS

function inicial(slector, wd) {
	caja = '';
	var caja = $('#' + slector + '_back').html();
	$('#' + slector + '_back').html('');
	arma_area(slector, caja, wd);
}

function arma_area(sl, cj, wd) {
	var H = `
		<div class="frame_principal">
		   <div class="frame_content"></div>
		   <div class="frame_fix_row"></div>
		   <div class="frame_fix_col"></div>
		   <div class="frame_fix_top"></div>
		</div>`;
	$('#' + sl).html(H);
	tabla_content(sl, cj);
	tabla_fix_row(sl);
	tabla_fix_col(sl);
	tabla_fix_top(sl);

	$('#' + sl + ' .frame_fix_row').css({ width: wd + 'px' });
	$('#' + sl + ' .frame_fix_top').css({ width: wd + 'px' });

	$('#' + sl + ' .frame_content').on('scroll', function () {
		$('#' + sl + ' .frame_fix_col').scrollLeft($(this).scrollLeft());
		$('#' + sl + ' .frame_fix_row').scrollTop($(this).scrollTop());
	});
}

function tabla_content(sl, cj) {
	var H = cj;

	$('#' + sl + ' .frame_content').html(H);
}

function tabla_fix_row(sl) {
	var H = $('#' + sl + ' .frame_content').html();
	$('#' + sl + ' .frame_fix_row').html(H);
}

function tabla_fix_col(sl) {
	var H = $('#' + sl + ' .frame_content').html();
	$('#' + sl + ' .frame_fix_col').html(H);
}

function tabla_fix_top(sl) {
	var H = $('#' + sl + ' .frame_content').html();
	$('#' + sl + ' .frame_fix_top').html(H);
}

function ordenamiento(tbl) {
	$('#' + tbl + ' table').tablesorter({
		sortList: [[0, 1]],
		widgets: ['zebra']
	});

	$('#' + tbl + ' .frame_fix_col table thead th').on('click', function () {
		var oy = $(this).attr('class').split(' ')[0];
		$('#' + tbl + ' .frame_content table thead th.' + oy).trigger('click');
		// $('#' + tbl + ' .frame_fix_top table thead th.' + oy).trigger('click');
		$('#' + tbl + ' .frame_fix_row table thead th.' + oy).trigger('click');
	});

	$('#' + tbl + ' .frame_fix_top table thead th').on('click', function () {
		var oy = $(this).attr('class').split(' ')[0];
		// console.log(oy);
		$('#' + tbl + ' .frame_content table thead th.' + oy).trigger('click');
		// $('#' + tbl + ' .frame_fix_col table thead th.' + oy).trigger('click');
		$('#' + tbl + ' .frame_fix_row table thead th.' + oy).trigger('click');
	});
}
