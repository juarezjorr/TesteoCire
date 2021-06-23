var seccion = '';
///const folio = uuidv4();
let folio;
let pr = [];
let link = '';
let url;
var isConcepto = 0;


$(document).ready(function () {
    url = getAbsolutePath();
    importarScript(url + 'app/assets/lib/kendo.js');

    folio = getFolio();
    verifica_usuario();
    inicial();
});

function inicial() {
    getStores();// optiene los almacenes.
    getCategorias();// Carga las categorias 
    // funcion para la carga de subcategorias
    $('#selectRowCategorias').change(function () {
        var idCategoria = $('#selectRowCategorias option:selected').attr('id');
        getSubCategorias(0, idCategoria);
    });

    setting_table();// Inicializa data table
    setting_table_pro();// inicializa la tabla de productos

    setting_datepicket($('#txtStartDate'));//fecha del dia en curso

    $('#btn_products').on('click', function () {
        getProducts();
    });

}



//conceptos
function setting_table() {
    let title = 'Salidas de Almacen';
    // let filename = title.replace(/ /g, '_') + '-' + moment(Date()).format('YYYYMMDD');

    $('#tblExchanges').DataTable({
        order: [[1, 'desc']],
        dom: 'Blrt',
        buttons: [
            {
                extend: 'excel',
                text: '<button class="btn btn-excel btn-apply hidden-field"><i class="fas fa-file-excel"></i></button>',
            },
            {
                // Boton imprimir el el reporte
                text: 'Imprimir reporte',
                className: 'btn-apply hidden-field',
                action: function (e, dt, node, config) {
                    read_exchange_table();
                },
            },
            {
                // Boton limpiar la interface
                text: 'Nuevo reporte',
                className: 'btn-apply hidden-field',
                action: function (e, dt, node, config) {
                    window.location = 'ProductStocks';
                },
            },
        ],
        paging: false,
        pagingType: 'simple_numbers',
        language: {
            url: 'app/assets/lib/dataTable/spanish.json',
        },
        scrollY: 'calc(100vh - 260px)',
        scrollX: true,
        fixedHeader: true,
        columns: [
            {data: 'skuColum', class: 'edit'},
            {data: 'nameColum', class: 'product-name'},
            {data: 'priceColum', class: 'product-name'},
            {data: 'subCategoriaColum', class: 'product-name'}
        ],
    });
}


//conceptos x prod
function setting_table_pro() {
    let title = 'Salidas de Almacen';
    // let filename = title.replace(/ /g, '_') + '-' + moment(Date()).format('YYYYMMDD');

    $('#tblExchangesProductos').DataTable({
        order: [[1, 'desc']],
        dom: 'Blrt',
        buttons: [
            {
                extend: 'excel',
                text: '<button class="btn btn-excel btn-apply hidden-field"><i class="fas fa-file-excel"></i></button>',
            },
            {
                // Boton imprimir el el reporte
                text: 'Imprimir reporte',
                className: 'btn-apply hidden-field',
                action: function (e, dt, node, config) {
                    read_exchange_table();
                },
            },
            {
                // Boton limpiar la interface
                text: 'Nuevo reporte',
                className: 'btn-apply hidden-field',
                action: function (e, dt, node, config) {
                    window.location = 'ProductStocks';
                },
            },
        ],
        paging: false,
        pagingType: 'simple_numbers',
        language: {
            url: 'app/assets/lib/dataTable/spanish.json',
        },
        scrollY: 'calc(100vh - 260px)',
        scrollX: true,
        fixedHeader: true,
        columns: [
            {data: 'skuColum', class: 'edit'},
            {data: 'nameColum', class: 'product-name'},
            {data: 'costoColum', class: 'product-name'},
            {data: 'SerieColum', class: 'serie-product'},
            {data: 'FechaAltaColum', class: 'serie-product'},
            {data: 'ProveedorColum', class: ''},
            {data: 'SubCategoriaColum', class: ''}
        ],
    });
    setTimeout(() => {
        $("#tblExchangesProductos_wrapper").attr("hidden",true);
    }, 20);
  
}


/** ++++  Setea el calendario ++++++ */
function setting_datepicket(selector) {
    let fecha = moment(Date()).format('DD/MM/YYYY');
    $(selector).daterangepicker({
        singleDatePicker: true,
        autoApply: true,
        locale: {
            format: 'DD/MM/YYYY',
            daysOfWeek: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
            monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            firstDay: 1,
        },
        minDate: fecha,
        startDate: fecha,
        opens: 'left',
        drops: 'auto',
    });
}

// Solicita los tipos de movimiento
function getExchange() {
    var pagina = 'ProductStocks/listExchange';
    var par = '[{"parm":""}]';
    var tipo = 'json';
    var selector = putTypeExchange;
    fillField(pagina, par, tipo, selector);
}
// Solicita el listado de almacenes
function getStores() {
    var pagina = 'ProductStocks/listStores';
    var par = '[{"parm":""}]';
    var tipo = 'json';
    var selector = putStores;
    fillField(pagina, par, tipo, selector);
}


// Optiene las categorias *
function getCategorias(id) {
    $('#selectRowCategorias').html('');
    var location = 'Categorias/GetCategorias';
    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        url: location,
        success: function (respuesta) {
            var renglon = "<option id='0'  value='0'>Seleccione...</option> ";         
            respuesta.forEach(function (row, index) {
                renglon += '<option id=' + row.cat_id + '  value="' + row.cat_id + '">' + row.cat_name + '</option> ';
            });
            $('#selectRowCategorias').append(renglon);
            if (id != '') {
                $("#selectRowCategorias option[id='" + id + "']").attr('selected', 'selected');
            }
        },
        error: function () {},
    }).done(function () {});
}


// Optiene las Sub subcategorias *
function getSubCategorias(id, idCategoria) {
    $('#selectRowSubCategorias').html('');
    var location = 'SubCategorias/GetSubCategorias';
    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        data: {id: id, idCategoria: idCategoria},
        url: location,
        success: function (respuesta) {
            //console.log(respuesta);
            var renglon = "<option id='0'  value='0'>Seleccione...</option> ";
            if (respuesta[0].sbc_id != 0) {
                respuesta.forEach(function (row, index) {
                    renglon += '<option id=' + row.sbc_id + '  value="' + row.sbc_id + '">' + row.sbc_name + '</option> ';
                });
            }

            $('#selectRowSubCategorias').append(renglon);
            if (idCategoria != '') {
                $("#selectRowSubCategorias option[id='" + id + "']").attr('selected', 'selected');
            }
        },
        error: function () {},
    }).done(function () {});
}




// Solicita los productos de un almacen seleccionado
function getProducts() {
    var idAlmacen = $('#txtStoreSource option:selected').val();
    var idCategoria = $('#selectRowCategorias option:selected').val();
    var idSubCategoria = $('#selectRowSubCategorias option:selected').val();
    var isPaquete = 0;
    var isProducto = 0;
    var isAccesorio = 0;
 
    if ($('#RadioConceptos1').prop('checked')) {
        isConcepto = 1;
    }else{
        isConcepto = 0;
    }

    if ($('#checkIsPaquete').prop('checked')) {
        isPaquete = 1;
    }
    
    if ($('#checkIsProducto').prop('checked')) {
        isProducto = 1;
    }
    
    if ($('#checkIsAccesorie').prop('checked')) {
        isAccesorio = 1;
    }

    //console.log(idAlmacen+idCategoria+idSubCategoria+isConcepto+isPaquete+isProducto+isAccesorio);

    var pagina = 'ProductStocks/listProducts';
    var par = `[{"idAlmacen":"${idAlmacen}","idCategoria":"${idCategoria}","idSubCategoria":"${idSubCategoria}","isConcepto":"${isConcepto}","isPaquete":"${isPaquete}","isProducto":"${isProducto}","isAccesorio":"${isAccesorio}"}]`;
    var tipo = 'json';
    var selector = putProducts;
    fillField(pagina, par, tipo, selector); 


}

function putProducts(dt) {

    let tabla = $('#tblExchanges').DataTable();
    tabla.clear().draw();

    let tablaProductos = $('#tblExchangesProductos').DataTable();
    tablaProductos.clear().draw();

    if(dt[0].prd_id != 0){
        if (isConcepto == 0){
            $("#tblExchangesProductos_wrapper").attr("hidden",false);
            $("#tblExchanges_wrapper").attr("hidden",true);

            $.each(dt, function (v, u) {
                fill_table_Productos(u); 
            });

            //console.log("entro if");
        }else{
            $("#tblExchanges_wrapper").attr("hidden",false);
            $("#tblExchangesProductos_wrapper").attr("hidden",true);

            $.each(dt, function (v, u) {
                fill_table(u); 
            });

            //console.log("entro else");
        }

        btn_apply_appears(); 
    }

}

/*  LLENA LOS DATOS DE LOS ELEMENTOS */
// Dibuja los almacenes
function putStores(dt) {
    if (dt[0].str_id != 0) {
        $.each(dt, function (v, u) {
            let H = `<option value="${u.str_id}">${u.str_name}</option>`;
            $('#txtStoreSource').append(H);
        });
    }
}


/**  +++ Ocultalos productos del listado que no cumplen con la cadena  */
function sel_products(res) {
    if (res.length < 1) {
        $('#listProducts div.list-item').css({display: 'block'});
    } else {
        $('#listProducts div.list-item').css({display: 'none'});
    }

    $('#listProducts div.list-item').each(function (index) {
        var cm = $(this).html();
        cm = omitirAcentos(cm);
        var cr = cm.indexOf(res);
        if (cr > -1) {
            $(this).css({display: 'block'});
        }
    });
}


// Valida los campos
function validator() {
    let ky = 0;
    let msg = '';
    if ($('#txtStoreSource').val() == 0) {
        ky = 1;
        msg += 'Debes seleccionar un almacen';
    }

    if ($('#txtIdProducts').val() == 0) {
        ky = 1;
        msg += 'Debes seleccionar un producto';
    }

    if (ky == 0) {
        $('#btn_products').removeClass('disabled');
    } else {
        $('#btn_products').addClass('disabled');
        console.clear();
        //console.log(msg);
    }
}

// Llena la tabla de movimientos
function  fill_table(par, tipoDato) {

    let largo = $('#tblExchanges tbody tr td').html();
    largo == 'Ningún dato disponible en esta tabla' ? $('#tblExchanges tbody tr').remove() : '';
   // par = JSON.parse(par);
   //console.log(par);
   let tabla = $('#tblExchanges').DataTable();
   var rowNode = tabla.row
        .add({
            skuColum: par.prd_sku,
            nameColum: par.prd_name,
            priceColum: par.prd_price,
            subCategoriaColum: par.sbc_name
        })
        .draw() 
        .node();
}


// Llena la tabla de movimientos
function  fill_table_Productos(par, tipoDato) {

   let largo = $('#tblExchangesProductos tbody tr td').html();
   largo == 'Ningún dato disponible en esta tabla' ? $('#tblExchanges tbody tr').remove() : '';
   let tabla = $('#tblExchangesProductos').DataTable();
   var rowNode = tabla.row
        .add({
            skuColum: par.ser_sku,
            nameColum: par.prd_name,
            costoColum: par.ser_cost,
            SerieColum: par.ser_serial_number,
            FechaAltaColum: par.ser_date_registry,
            ProveedorColum: par.sup_business_name,
            SubCategoriaColum: par.sbc_name
        })
        .draw() 
        .node();
}



function btn_apply_appears() {

    $('.btn-apply').removeClass('hidden-field');

/*     let tabla = $('#tblExchanges').DataTable();
    let rengs = tabla.rows().count();
    if (rengs > 0) {
        $('.btn-apply').removeClass('hidden-field');
    } else {
        $('.btn-apply').addClass('hidden-field');
    } */
}

// Limpia los campos para uns nueva seleccion
function clean_selectors() {
    $('#txtStoreSource').val(0);
    $('#txtProducts').html('<option value="0" selected>Selecciona producto</option>');
    $('#txtQuantity').val('');
    $('#txtQuantityStored').html('&nbsp;');
    //$('#txtComments').val('');
}

function read_exchange_table() {
    let stornam = $('#txtStoreSource option:selected').text();
    let projnum = $('#txtProjectNum').val();
    let projnam = $('#txtProjectName').val();
    let datestr = $('#txtStartDate').val();
    let version = $('#txtVersion').val();
    let freelnc = $('#txtFreelance').val();
    let chain = '';

    if (isConcepto == 0){
        $('#tblExchangesProductos tbody tr').each(function (v, u) {
            let prodsku = $($(u).find('td')[0]).text();
            let prodnam = $($(u).find('td')[1]).text();
            let prodPrice = $($(u).find('td')[2]).text();
            let serinum = $($(u).find('td')[3]).text();
            let dateRegis = $($(u).find('td')[4]).text();

            let pos5 = $($(u).find('td')[5]).text();
            let pos6 = $($(u).find('td')[6]).text();

            prodsku = prodsku.substring(0, 7) + '-' + prodsku.substring(7, prodsku.length);
    
            chain += `${stornam}|${projnum}|${projnam}|${datestr}|${version}|${freelnc}|${prodsku}|${prodnam}|${prodPrice}|${serinum}|${dateRegis}|${pos5}|${pos6}|${isConcepto}@`;
        });
    }else{
        $('#tblExchanges tbody tr').each(function (v, u) {
            let prodsku = $($(u).find('td')[0]).text();
            let prodnam = $($(u).find('td')[1]).text();
            let prodPrice = $($(u).find('td')[2]).text();
            let serinum = $($(u).find('td')[3]).text();
            let dateRegis = $($(u).find('td')[4]).text();

            let pos5 = $($(u).find('td')[5]).text();
            let pos6 = $($(u).find('td')[6]).text();
    
            prodsku = prodsku.substring(0, 7) + '-' + prodsku.substring(7, prodsku.length);
    
            chain += `${stornam}|${projnum}|${projnam}|${datestr}|${version}|${freelnc}|${prodsku}|${prodnam}|${prodPrice}|${serinum}|${dateRegis}|${pos5}|${pos6}|${isConcepto}@`;
        });
    }

    chain = chain.substring(0, chain.length - 1);
    build_data_structure(chain);
}

function build_data_structure(pr) {
    let pa = `[{"par":"${pr}"}]`;
    var pagina = 'ProductStocks/saveList';
    var par = pa;
    var tipo = 'html';
    var selector = putSaveList;
    fillField(pagina, par, tipo, selector);
}

function putSaveList(dt) {
    window.open(url + 'app/views/ProductStocks/ProductStocksReport.php', '_blank');
}

/**  ++++ Omite acentos para su facil consulta */
function omitirAcentos(text) {
    var acentos = 'ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç';
    var original = 'AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc';
    for (var i = 0; i < acentos.length; i++) {
        text = text.replace(acentos.charAt(i), original.charAt(i));
    }
    return text;
}
