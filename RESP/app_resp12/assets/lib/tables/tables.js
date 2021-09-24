//ESTRUCTURACION DE TABLAS

function tbldynamic(st) {
    let dysel = $('#' + st);
    let dytbl = dysel.children('table');
    let dtwht = dytbl.width();
    dytbl.css({width: dtwht + 'px'});
    dynamic_start(st, dysel, dtwht);
}

function dynamic_start(sel, st, wd) {
    caja = '';
    var caja = st.html();
    // st.html('');
    arma_area(sel, caja, wd);
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
    let wht = $('#' + sl + ' table .fix').width() - 1;
    $('#' + sl + ' .frame_fix_row').css({width: wht + 'px'});
    $('#' + sl + ' .frame_fix_row td').attr('contenteditable', false);
}

function tabla_fix_col(sl) {
    var H = $('#' + sl + ' .frame_content').html();
    $('#' + sl + ' .frame_fix_col').html(H);
    let hg = $('#' + sl + ' table thead').height() + 2;
    $('#' + sl + ' .frame_fix_col').css({height: hg + 'px'});
    $('#' + sl + ' .frame_fix_col td').attr('contenteditable', false);
}

function tabla_fix_top(sl) {
    var H = $('#' + sl + ' .frame_content').html();
    $('#' + sl + ' .frame_fix_top').html(H);
    let hg = $('#' + sl + ' table thead').height() + 2;
    let wht = $('#' + sl + ' table .fix').width() - 1;
    $('#' + sl + ' .frame_fix_top').css({width: wht + 'px'});
    $('#' + sl + ' .frame_fix_top').css({height: hg + 'px'});
    $('#' + sl + ' .frame_fix_top td').attr('contenteditable', false);
}

function ordenamiento(tbl) {
    $('#' + tbl + ' table').tablesorter({
        sortList: [[0, 1]],
        widgets: ['zebra'],
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

function add_columns(tbl) {
    let rows = 0;
    $('#' + tbl + ' table thead tr th').each(function () {
        rows++;
    });

    let H = '<tr>';
    for (let i = 1; i <= rows; i++) {
        H += '<td>&nbsp;</td>';
    }
    H += '</tr>';
    $('#' + tbl + ' table tbody').append(H);
}

function editable_disable(tbl) {
    $('#' + tbl + ' .frame_fix_row td').removeAttr('contenteditable');
    $('#' + tbl + ' .frame_fix_col td').removeAttr('contenteditable');
    $('#' + tbl + ' .frame_fix_top td').removeAttr('contenteditable');

    // $('.frame_content').on('focus', function (event) {
    //     console.log(event);
    //     if (event.keyCode == 9) {
    //         // Código para la tecla TAB
    //         console.log('Oprimiste la tecla TAB');
    //     }
    // });
}
