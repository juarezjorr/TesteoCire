const guid = uuidv4();

$(document).ready(function () {
   verifica_usuario();
   inicial();
});

function inicial() {
   setting_datepicket($('#txtStartDate'));
   setting_datepicket($('#txtEndDate'));
   setting_table();
   get_products();
   get_suppliers();
   $('#btn_subletting').on('click', function () {
      subletting_apply();
   });
   $('#txtEndDate').on('change', function () {
      validator();
   });
   $('#txtQuantity').on('change', function () {
      validator();
   });
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

/** ++++  Setea la tabla ++++++ */
function setting_table() {
   let title = 'Productos en subarrendo';
   let filename = title.replace(/ /g, '_') + '-' + moment(Date()).format('YYYYMMDD');

   $('#tblProductForSubletting').DataTable({
      order: [[0, 'desc']],
      dom: 'Blfrtip',
      buttons: [
         {
            //Botón para Excel
            extend: 'excel',
            footer: true,
            title: title,
            filename: filename,

            //Aquí es donde generas el botón personalizado
            text: '<button class="btn btn-excel"><i class="fas fa-file-excel"></i></button>',
         },
         {
            //Botón para PDF
            extend: 'pdf',
            footer: true,
            title: title,
            filename: filename,

            //Aquí es donde generas el botón personalizado
            text: '<button class="btn btn-pdf"><i class="fas fa-file-pdf"></i></button>',
         },
         {
            //Botón para imprimir
            extend: 'print',
            footer: true,
            title: title,
            filename: filename,

            //Aquí es donde generas el botón personalizado
            text: '<button class="btn btn-print"><i class="fas fa-print"></i></button>',
         },
         {
            // Boton aplicar cambios
            text: 'Aplicar subarrendos',
            footer: true,
            className: 'btn-apply',
            action: function (e, dt, node, config) {
               read_exchange_table();
            },
         },
      ],
      pagingType: 'simple_numbers',
      language: {
         url: 'app/assets/lib/dataTable/spanish.json',
      },
      scrollY: 'calc(100vh - 260px)',
      scrollX: true,
      fixedHeader: true,
      columns: [
         {
            data: 'supports',
            class: 'support',
            visible: false,
            searchable: false,
         },
         {data: 'editable', class: 'edit'},
         {data: 'prod_sku', class: 'sku'},
         {data: 'prodname', class: 'product-name'},
         {data: 'prodcant', class: 'quantity'},
         {data: 'supplier', class: 'supply'},
         {data: 'datestar', class: 'date'},
         {data: 'date_end', class: 'date'},
         {data: 'comments', class: 'comments'},
      ],
   });
}
/**  +++++ Obtiene los datos de los productos activos +++++  */
function get_products() {
   var pagina = 'ProductsForSubletting/listProducts';
   var par = `[{"store":""}]`;
   var tipo = 'json';
   var selector = put_Products;
   fillField(pagina, par, tipo, selector);
}
/**  ++++   Coloca los productos en el listado del input */
function put_Products(dt) {
   $.each(dt, function (v, u) {
      let H = `<div class="list-item" id="P-${u.prd_id}" data_complement="${u.ser_id}|${u.prd_sku}">${u.prd_name}</div>`;
      $('#listProducts').append(H);
   });

   $('#txtProducts').on('focus', function () {
      $('.list-group').slideDown('slow');
   });

   $('#txtProducts').keyup(function (e) {
      var res = $(this).val().toUpperCase();
      if (res == '') {
         $('.list-group').slideUp(100);
      } else {
         $('.list-group').slideDown(400);
      }
      res = omitirAcentos(res);
      sel_products(res);
   });

   $('.list-group .list-item').on('click', function () {
      let prdNm = $(this).html();
      let prdId = $(this).attr('id') + '|' + $(this).attr('data_complement');
      $('#txtProducts').val(prdNm);
      $('#txtIdProducts').val(prdId);
      $('.list-group').slideUp(100);
      validator();
   });
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
         //            alert($(this).children().html())
         $(this).css({display: 'block'});
      }
   });
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

/**  +++++ Obtiene los datos los proveedores que subarrendan +++++  */
function get_suppliers() {
   var pagina = 'ProductsForSubletting/listSuppliers';
   var par = `[{"store":""}]`;
   var tipo = 'json';
   var selector = put_suppliers;
   fillField(pagina, par, tipo, selector);
}

function put_suppliers(dt) {
   $.each(dt, function (v, u) {
      let H = `<option value="${u.sup_id}">${u.sup_business_name}</option>`;
      $('#txtSupplier').append(H);
   });
   $('#txtSupplier').on('change', function () {
      validator();
   });
}

/* ++++  Registra el subarrendo  +++++++ */
function subletting_apply() {
   let sku = $('#txtIdProducts').val().split('|')[2];
   let productName = $('#txtProducts').val();
   let quantity = $('#txtQuantity').val();
   let supplierId = $('#txtSupplier').val();
   let supplierName = $('#txtSupplier option:selected').text();
   let dateStart = $('#txtStartDate').val();
   let dateEnd = $('#txtEndDate').val();

   let productId = $('#txtIdProducts').val().split('|')[0].substring(2, 10);
   let serieId = $('#txtIdProducts').val().split('|')[1];

   let price = $('#txtPrice').val();
   let coinType = $('#txtCoinType').val();
   let comments = $('#txtComments').val();

   // console.log(
   //    `Subarrendo \n productID: ${productId} \n productName: ${productName} \n serieID: ${serieId} \n sku: ${sku}  \n precio: ${price} \n moneda: ${coinType} \n cantidad: ${quantity} \n proveedorId: ${supplierId} \n provedor: ${supplierName} \n fecha de inicio: ${dateStart} \n fecha final: ${dateEnd} \n Comentario: ${comments}`
   // );

   let par_sub = `
            [{
               "support"  :  "${serieId}|${productId}|${supplierId}",
               "prodsku"  :  "${sku}",
               "prodnme"  :  "${productName}",
               "prodqty"  :  "${quantity}",
               "supplie"  :  "${supplierName}",
               "datestr"  :  "${dateStart}",
               "dateend"  :  "${dateEnd}",
               "comment"  :  "${comments}"
            }]`;
   fill_table(par_sub);

   if (serieId == 0) {
      let par_ser = `
            [{
               "produid"  :  "${productId}",
               "prprice"  :  "${price}",
               "supplid"  :  "${supplierId}",
            }]`;
      get_serialid(par_ser);
      //console.log(`Serie \n serieId: ${serieId} \n costo: ${price} \n productId: ${productId}`);
   }
}

function get_serialid(par) {
   console.log(par);
   var pagina = 'ProductsForSubletting/addSerie';
   var par = par;
   var tipo = 'html';
   var selector = put_serialid;
   fillField(pagina, par, tipo, selector);
}

function put_serialid(dt) {
   console.log(dt);
}

// Llena la tabla de subarrendos
function fill_table(par) {
   let largo = $('#tblProductForSubletting tbody tr td').html();
   largo == 'Ningún dato disponible en esta tabla' ? $('#tblProductForSubletting tbody tr').remove() : '';
   par = JSON.parse(par);

   let tabla = $('#tblProductForSubletting').DataTable();

   tabla.row
      .add({
         supports: par[0].support,
         editable: '<i class="fas fa-times-circle kill"></i>',
         prod_sku: `<span class="hide-support">${par[0].support}</span>${par[0].prodsku}`,
         prodname: par[0].prodnme,
         prodcant: `<span>${par[0].prodqty}</span>`,
         supplier: par[0].supplie,
         datestar: par[0].datestr,
         date_end: par[0].dateend,
         comments: `<div>${par[0].comment}</div>`,
      })
      .draw();

   clean_selectors();
}

// Limpia los campos para uns nueva seleccion
function clean_selectors() {
   $('#txtProducts').val('');
   $('#txtIdProducts').val(0);
   setting_datepicket($('#txtStartDate'));
   setting_datepicket($('#txtEndDate'));
   $('#txtPrice').val('');
   $('#txtQuantity').val('');
   $('#txtSupplier').html('<option value="0" selected>Debes seleccionar un proveedor</option>');
   $('#txtCoinType').html('<option value="0" selected>Selecciona el tipo de moneda</option>');
}

/*  ++++++++ Valida los campos  +++++++ */
function validator() {
   let ky = 0;
   let msg = '';
   $('.required').each(function () {
      if ($(this).val() == 0) {
         msg += $(this).attr('data-mesage') + '\n';
         ky = 1;
      }
   });

   if ($('#txtEndDate').val() <= $('#txtStartDate').val()) {
      ky = 1;
      msg += 'La fecha final debe ser por lo menos de un día de diferencia';
   }

   if (ky == 0) {
      $('#btn_subletting').removeClass('disabled');
   } else {
      $('#btn_subletting').addClass('disabled');
   }
}

function uuidv4() {
   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
         v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
   });
}
