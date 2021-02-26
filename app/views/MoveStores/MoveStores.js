var seccion = '';

$(document).ready(function () {
	verifica_usuario();
	inicial();
});


function inicial(){
	getExchange();
	getStores();
	$('#btn_exchange').on('click', function(){
console.log('ok');
	});
}

// Solicita los tipos de movimiento
function getExchange(){
	var pagina = 'MoveStores/listExchange';
	var par = '[{"parm":""}]';
	var tipo = 'json';
	var selector = putTypeExchange;
	fillField(pagina, par, tipo, selector);
}
// Solicita el listado de almacenes
function getStores(){
	var pagina = 'MoveStores/listStores';
	var par = '[{"parm":""}]';
	var tipo = 'json';
	var selector = putStores;
	fillField(pagina, par, tipo, selector);
}

// Solicita los productos de un almacen seleccionado
function getProducts(al){
	var pagina = 'MoveStores/listProducts';
	var par = `[{"store":"${al}"}]`;
	var tipo = 'json';
	var selector = putProducts;
	fillField(pagina, par, tipo, selector);
}


// Dibuja los tipos de movimiento
function putTypeExchange(dt){
	if (dt[0].ext_id != 0){
		$.each(dt, function(v,u){
			let H = `<option value="${u.ext_id}" data-content="${u.ext_code}|${u.ext_type}">${u.ext_name}</option>`
			$('#txtTypeExchange').append(H);
		});
	}
}
// Dibuja los almacenes
function putStores(dt){
	if (dt[0].str_id != 0){
		$.each(dt, function(v,u){
			let H = `<option value="${u.str_id}">${u.str_name}</option>`
			$('#txtStoreSource').append(H);
			$('#txtStoreTarget').append(H);
		});
	}
	$('#txtStoreSource').on('change', function(){
		let id =$(this).val();
		$(`#txtStoreTarget option`).css({display:'block'});
		$(`#txtStoreTarget option[value="${id}"]`).css({display:'none'});
		getProducts(id);
	})
}

function putProducts(dt){
	$('#txtProducts').html('');
	if (dt[0].prd_id != 0){
		$.each(dt, function(v,u){
			let H = `<option value="${u.prd_id}">${u.prd_name}</option>`
			$('#txtProducts').append(H);
		});
	}
}



