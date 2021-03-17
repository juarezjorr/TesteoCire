var seccion = '';
const guid = uuidv4();
let = pr = [];
let = link = '';

$(document).ready(function () {
   verifica_usuario();
   inicial();
});

function inicial() {
   getExchange();
   getStores();
   getProducts();
   setting_table();
   $('#btn_exchange').on('click', function () {
      exchange_apply();
   });
}

function setting_table() {
   let title = 'Movimiento de Almacenes';
   let filename =
      title.replace(/ /g, '_') + '-' + moment(Date()).format('YYYYMMDD');

   $('#tblExchanges').DataTable({
      order: [[6, 'desc']],
      dom: 'Blfrtip',
      //   buttons: ['csv', 'excel', 'pdf', 'print'],
      buttons: [
         {
            //Botón para Excel
            extend: 'excel',
            footer: true,
            title: title,
            filename: filename,

            //Aquí es donde generas el botón personalizado
            text:
               '<button class="btn btn-excel"><i class="fas fa-file-excel"></i></button>',
         },
         {
            //Botón para PDF
            extend: 'pdf',
            footer: true,
            title: title,
            filename: filename,

            //Aquí es donde generas el botón personalizado
            text:
               '<button class="btn btn-pdf"><i class="fas fa-file-pdf"></i></button>',
         },
         {
            //Botón para imprimir
            extend: 'print',
            footer: true,
            title: title,
            filename: filename,

            //Aquí es donde generas el botón personalizado
            text:
               '<button class="btn btn-print"><i class="fas fa-print"></i></button>',
         },
         {
            // Boton aplicar cambios
            text: 'Aplicar movimientos',
            className: 'btn-apply',
            action: function (e, dt, node, config) {
               alert('Activado, sin aplicación ');
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
         { data: 'prod_sku', class: 'sku' },
         { data: 'prodname', class: 'product-name' },
         { data: 'prodcant', class: 'quantity' },
         { data: 'prodseri', class: 'serie-product' },
         { data: 'codexcsc', class: 'code-type' },
         { data: 'stnamesc', class: 'store-name' },
         { data: 'codexctg', class: 'code-type' },
         { data: 'stnametg', class: 'store-name' },
         { data: 'comments', class: 'comments' },
      ],
   });
}

// Solicita los tipos de movimiento
function getExchange() {
   var pagina = 'MoveStores/listExchange';
   var par = '[{"parm":""}]';
   var tipo = 'json';
   var selector = putTypeExchange;
   fillField(pagina, par, tipo, selector);
}
// Solicita el listado de almacenes
function getStores() {
   var pagina = 'MoveStores/listStores';
   var par = '[{"parm":""}]';
   var tipo = 'json';
   var selector = putStores;
   fillField(pagina, par, tipo, selector);
}
// Solicita los productos de un almacen seleccionado
function getProducts() {
   var pagina = 'MoveStores/listProducts';
   var par = `[{"store":""}]`;
   var tipo = 'json';
   var selector = putProducts;
   fillField(pagina, par, tipo, selector);
}
// Solicita los movimientos acurridos
function getExchanges() {
   var pagina = 'MoveStores/listExchanges';
   var par = `[{"guid":"${guid}"}]`;
   var tipo = 'json';
   var selector = putExchanges;
   fillField(pagina, par, tipo, selector);
}
/*  LLENA LOS DATOS DE LOS ELEMENTOS */
// Dibuja los tipos de movimiento
function putTypeExchange(dt) {
   if (dt[0].ext_id != 0) {
      $.each(dt, function (v, u) {
         let H = `<option value="${u.ext_id}" data-content="${u.ext_code}|${u.ext_type}|${u.ext_link}|${u.ext_code_a}|${u.ext_type_a}">${u.ext_description}</option>`;
         $('#txtTypeExchange').append(H);
      });
   }
   $('#txtTypeExchange').on('change', function () {
      let id = $(this).val();
      link = $(`#txtTypeExchange option[value="${id}"]`)
         .attr('data-content')
         .split('|')[2];

      if (link == 'null') {
         $('#txtStoreTarget').parent().css({ display: 'none' });
      } else {
         $('#txtStoreTarget').parent().css({ display: 'block' });
      }
      $('#txtStoreTarget').val(0);
      validator();
   });
}

// Dibuja los almacenes
function putStores(dt) {
   if (dt[0].str_id != 0) {
      $.each(dt, function (v, u) {
         let H = `<option value="${u.str_id}">${u.str_name}</option>`;
         $('#txtStoreSource').append(H);
         $('#txtStoreTarget').append(H);
      });
   }

   $('#txtStoreSource').on('change', function () {
      let id = $(this).val();
      $(`#txtStoreTarget option`).css({ display: 'block' });
      $(`#txtStoreTarget option[value="${id}"]`).css({ display: 'none' });
      validator();
      drawProducts(id);
   });

   $('#txtStoreTarget').on('change', function () {
      validator();
   });
}
// Dibuja los productos
function putProducts(dt) {
   for (let i in dt) {
      pr.push([i, dt[i]]);
   }
}

function drawProducts(str) {
   $('#txtProducts').html(
      '<option value="0" selected>Selecciona producto</option>'
   );
   if (pr[0][1].prd_id != 0) {
      $.each(pr, function (v, u) {
         if (str == u[1].str_id) {
            let H = `<option value="${u[1].prd_id}" data-content="${u[1].prd_sku}|${u[1].stp_quantity}|${u[1].prd_serial_number}|${u[1].stp_id}">${u[1].prd_serial_number} - ${u[1].prd_name}</option>`;
            $('#txtProducts').append(H);
         }
      });
   }

   $('#txtProducts').on('change', function () {
      let cant = $('#txtProducts option:selected')
         .attr('data-content')
         .split('|')[1];
      $('#txtQuantityStored').html(cant);
      $('#txtQuantity').val(cant);

      validator();
   });
}

function validator() {
   let ky = 0;
   let msg = '';
   if ($('#txtTypeExchange').val() == 0) {
      ky = 1;
      msg += 'Debes seleccionar un tipo de movimiento';
   }
   if ($('#txtStoreSource').val() == 0) {
      ky = 1;
      msg += 'Debes seleccionar un almacen origen';
   }
   if ($('#txtProducts').val() == 0) {
      ky = 1;
      msg += 'Debes seleccionar un producto';
   }
   console.log($('#txtStoreTarget').val(), link);
   if ($('#txtStoreTarget').val() == 0 && link != '' && link != 'null') {
      ky = 1;
      msg += 'Debes seleccionar un almacen destino';
   } else {
   }

   console.log(ky);
   if (ky == 0) {
      $('#btn_exchange').removeClass('disabled');
   } else {
      $('#btn_exchange').addClass('disabled');
   }
}

function exchange_apply() {
   let typeExchangeCodeSource = $('#txtTypeExchange option:selected')
      .attr('data-content')
      .split('|')[0];
   let typeExchangeCodeTarget = $('#txtTypeExchange option:selected')
      .attr('data-content')
      .split('|')[3];
   let typeExchangeIdSource = $('#txtTypeExchange option:selected').val();
   let typeExchangeIdTarget = $('#txtTypeExchange option:selected')
      .attr('data-content')
      .split('|')[2];

   let storeNameSource = $('#txtStoreSource option:selected').text();
   let storeNameTarget = $('#txtStoreTarget option:selected').text();
   let storeIdSource = $('#txtStoreSource option:selected').val();
   let storeIdTarget = $('#txtStoreTarget option:selected').val();

   let productId = $('#txtProducts option:selected').val();
   let productSKU = $('#txtProducts option:selected')
      .attr('data-content')
      .split('|')[0];
   let productName = $('#txtProducts option:selected').text();
   let productQuantity = $('#txtQuantity').val();
   let productSerie = $('#txtProducts option:selected')
      .attr('data-content')
      .split('|')[2];
   let storeProduct = $('#txtProducts option:selected')
      .attr('data-content')
      .split('|')[3];

   //console.log(storeProduct);

   let commnets = $('#txtComments').val();
   let project = '';

   update_array_products(productId, productQuantity);

   let par = `
            [{
               "prodsku"	: 	"${productSKU}",
               "prodnme"	:	"${productName}",
               "prodqty"	:	"${productQuantity}",
               "prodser"	:	"${productSerie}",
               "excodsr"	:	"${typeExchangeCodeSource}",
               "stnmesr"	:	"${storeNameSource}",
               "excodtg"	:	"${typeExchangeCodeTarget}",
               "stnmetg"	:	"${storeNameTarget}",
               "comment"	:	"${commnets}",
               "project"	:	"${project}",
               "excidsr"	:	"${typeExchangeIdSource}",
               "excidtg"	:	"${typeExchangeIdTarget}",
               "stoidsr"	:	"${storeIdSource}",
               "stoidtg"	:	"${storeIdTarget}",
               "folguid"	:	"${guid}"
            }]
            `;

   //    console.log(par);
   fill_table(par);

   // save_exchange(par);

   let aps = `[{"idPrd":"${productId}", "idStrSrc":"${storeIdSource}", "idStrTrg":"${storeIdTarget}"}]`;
   //    console.log(aps);
   // update_store(aps);

   //   save_exchange(par);

   // setTimeout(() => {
   //    getExchanges();
   // }, 3000);
}

function fill_table(par) {
   let largo = $('#tblExchanges tbody tr td').html();
   largo == 'Ningún dato disponible en esta tabla'
      ? $('#tblExchanges tbody tr').remove()
      : '';
   par = JSON.parse(par);

   let tabla = $('#tblExchanges').DataTable();

   tabla.row
      .add({
         supports: par[0].prodsku,
         prod_sku: par[0].prodsku,
         prodname: par[0].prodnme,
         prodcant: `<span>${par[0].prodqty}</span>`,
         prodseri: par[0].prodser,
         codexcsc: par[0].excodsr,
         stnamesc: par[0].stnmesr,
         codexctg: par[0].excodtg,
         stnametg: par[0].stnmetg,
         comments: `<div>${par[0].comment}</div>`,
      })
      .draw();

   clean_selectors();
}

function clean_selectors() {
   $('#txtTypeExchange').val(0);
   $('#txtStoreSource').val(0);
   $('#txtStoreTarget').val(0);
   $('#txtProducts').html(
      '<option value="0" selected>Selecciona producto</option>'
   );
   $('#txtQuantity').val();
   $('#txtQuantityStored').html('&nbsp;');
   $('#txtComments').val();
}

function update_array_products(id, cn) {
   $.each(pr, function (v, u) {
      //    console.log(u[1].prd_id);
      if (u[1].prd_id == id) {
         u[1].stp_quantity = u[1].stp_quantity - cn;
      }
   });
}

function save_exchange(pr) {
   var pagina = 'MoveStores/SaveExchange';
   var par = pr;
   var tipo = 'html';
   var selector = exchange_result;
   fillField(pagina, par, tipo, selector);
}

function update_store(ap) {
   //    console.log(ap);
   var pagina = 'MoveStores/ApplyExchange';
   var par = ap;
   var tipo = 'html';
   var selector = applied_exchange;
   fillField(pagina, par, tipo, selector);
}

function exchange_result(dt) {}

function putExchanges(dt) {
   //    console.log(dt);
   $('#tblExchanges tbody').html('');

   $.each(dt, function (v, u) {
      let H = `
			<tr>
				<td class="sku">${u.exc_sku_product}</td>
				<td class="prod-name">${u.exc_product_name}</td>
				<td class="quantity"><span>${u.exc_quantity}</span></td>
				<td class="serie-producto">${u.exc_serie_product}</td>
				<td class="clave-etapa">${u.ext_code}</td>
				<td class="clave-etapa">${u.exc_store}</td>
				<td>${u.exc_date}</td>
				<td><div>${u.exc_comments}</div></td>
			</tr>
		`;
      $('#tblExchanges tbody').append(H);
   });
}

function uuidv4() {
   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
         v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
   });
}
