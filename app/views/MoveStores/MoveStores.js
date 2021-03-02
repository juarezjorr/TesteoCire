var seccion = '';
const guid = uuidv4();

$(document).ready(function () {
   verifica_usuario();
   inicial();
});

function inicial() {
   getExchange();
   getStores();
   $('#btn_exchange').on('click', function () {
      exchange_apply();
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
function getProducts(al) {
   var pagina = 'MoveStores/listProducts';
   var par = `[{"store":"${al}"}]`;
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
      let link = $(`#txtTypeExchange option[value="${id}"]`)
         .attr('data-content')
         .split('|')[2];

      if (link == 'null') {
         $('#txtStoreTarget').parent().css({ display: 'none' });
      } else {
         $('#txtStoreTarget').parent().css({ display: 'block' });
      }
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
      getProducts(id);
   });
}
// Dibuja los productos
function putProducts(dt) {
   $('#txtProducts').html('');
   if (dt[0].prd_id != 0) {
      $.each(dt, function (v, u) {
         let H = `<option value="${u.prd_id}" data-content="${u.prd_sku}|${u.stp_quantity}|${u.prd_serial_number}|${u.stp_id}">${u.prd_name}</option>`;
         $('#txtProducts').append(H);
      });
   }
}

function uuidv4() {
   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
         v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
   });
}

function exchange_apply() {
   let typeCodeSrc = $('#txtTypeExchange option:selected')
      .attr('data-content')
      .split('|')[0];
   let typeCodeTrg = $('#txtTypeExchange option:selected')
      .attr('data-content')
      .split('|')[3];
   let typeLink = $('#txtTypeExchange option:selected')
      .attr('data-content')
      .split('|')[2];

   let storeSrc = $('#txtStoreSource option:selected').text();
   let storeTrg = $('#txtStoreTarget option:selected').text();
   let strIdSrc = $('#txtStoreSource option:selected').val();
   let strIdTrg = $('#txtStoreTarget option:selected').val();
   let idProduct = $('#txtProducts option:selected').val();
   let skuProduct = $('#txtProducts option:selected')
      .attr('data-content')
      .split('|')[0];
   let nameProduct = $('#txtProducts option:selected').text();
   let qtyProduct = $('#txtProducts option:selected')
      .attr('data-content')
      .split('|')[1];
   let serialProduct = $('#txtProducts option:selected')
      .attr('data-content')
      .split('|')[2];
   let storeProduct = $('#txtProducts option:selected')
      .attr('data-content')
      .split('|')[3];

   let IdTypeExchange = $('#txtTypeExchange option:selected').val();

   let commnets = $('#txtComments').val();
   let project = '';

   let par = `
	[{
		"sku"	: 	"${skuProduct}",
		"pnm"	:	"${nameProduct}",
		"qty"	:	"${qtyProduct}",
		"ser"	:	"${serialProduct}",
		"str"	:	"${storeSrc}",
		"com"	:	"${commnets}",
		"prj"	:	"${project}",
		"cod"	:	"${typeCodeSrc}",
		"idx"	:	"${IdTypeExchange}",
		"gui"	:	"${guid}"
	}]
   `;

   save_exchange(par);

   let aps = `[{"idPrd":"${idProduct}", "idStrSrc":"${strIdSrc}", "idStrTrg":"${strIdTrg}"}]`;
   console.log(aps);
   update_store(aps);

   if (typeCodeTrg != 'null') {
      let par = `
	  [{
		  "sku"	: 	"${skuProduct}",
		  "pnm"	:	"${nameProduct}",
		  "qty"	:	"${qtyProduct}",
		  "ser"	:	"${serialProduct}",
		  "str"	:	"${storeTrg}",
		  "com"	:	"${commnets}",
		  "prj"	:	"${project}",
		  "cod"	:	"${typeCodeTrg}",
		  "idx"	:	"${typeLink}",
		  "gui"	:	"${guid}"
	  }]
	 `;

      save_exchange(par);
   }

   setTimeout(() => {
      getExchanges();
   }, 3000);
}

function save_exchange(pr) {
   var pagina = 'MoveStores/SaveExchange';
   var par = pr;
   var tipo = 'html';
   var selector = exchange_result;
   fillField(pagina, par, tipo, selector);
}

function update_store(ap) {
   console.log(ap);
   var pagina = 'MoveStores/ApplyExchange';
   var par = ap;
   var tipo = 'html';
   var selector = applied_exchange;
   fillField(pagina, par, tipo, selector);
}

function applied_exchange(dt) {
   console.log(dt);
}

function exchange_result(dt) {}

function putExchanges(dt) {
   console.log(dt);
   $('#tblExchanges tbody').html('');

   $.each(dt, function (v, u) {
      let H = `
			<tr>
				<td>${u.exc_sku_product}</td>
				<td>${u.exc_product_name}</td>
				<td>${u.exc_quantity}</td>
				<td>${u.ext_code}</td>
				<td>${u.exc_store}</td>
				<td>${u.exc_serie_product}</td>
				<td>${u.exc_date}</td>
				<td>${u.exc_comments}</td>
			</tr>
		`;
      $('#tblExchanges tbody').append(H);
   });
}
