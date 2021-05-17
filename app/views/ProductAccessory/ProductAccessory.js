let subcategos;
let products;
var productoSelectId = 0;
var productoSelectSKU = "";
var accesorioExist = 0;

$(document).ready(function () {
    verifica_usuario();
    inicial();
});

function inicial() {
    setting_table_accesorys();
    setting_table_product();
    getCategory();
    getSubcategory();
}

// Configura la tabla de paquetes
function setting_table_product() {
    let tabla = $('#tblPackages').DataTable({
        order: [[1, 'asc']],
        pageLength: 1000,
        select: true,
        dom: 'Brti',
        buttons: [
            {
                // Boton aplicar cambios
                text: 'Generar paquete',
                className: 'btn-apply hidden-field',
                action: function (e, dt, node, config) {
                    read_package_table();
                },
            },
        ],
        pagingType: 'simple_numbers',
        language: {
            url: 'app/assets/lib/dataTable/spanish.json',
        },
        scrollY: 'calc(100vh - 300px)',
        scrollX: true,
        fixedHeader: true,
        columns: [
            {data: 'pack_sku', class: 'sel sku'},
            {data: 'id', class: 'sel id hidden'},
            {data: 'packname', class: 'sel product-name'},
        ],
    });

}

// Configura la tabla de productos
function setting_table_accesorys() {
    $('#tblProducts').DataTable({
        order: [[1, 'asc']],
        dom: 'Brti',
        buttons: [
            {
                // Boton aplicar cambios
                text: 'Generar paquete',
                className: 'btn-apply hidden-field',
                action: function (e, dt, node, config) {
                    read_product_table();
                },
            },
        ],
        pagingType: 'simple_numbers',
        language: {
            url: 'app/assets/lib/dataTable/spanish.json',
        },
        scrollY: 'calc(100vh - 300px)',
        scrollX: true,
        fixedHeader: true,
        columns: [
            {data: 'editable', class: 'edit'},
            {data: 'prod_sku', class: 'sku'},
            {data: 'prodname', class: 'product-name'},
        ],
    });
}

// Solicita las categorias
function getCategory() {
    var pagina = 'ProductAccessory/listCategories';
    var par = '[{"parm":""}]';
    var tipo = 'json';
    var selector = putCategory;
    fillField(pagina, par, tipo, selector);
}
// Solicita las subcategorias
function getSubcategory() {
    var pagina = 'ProductAccessory/listSubCategories';
    var par = `[{"catId":""}]`;
    var tipo = 'json';
    var selector = putSubCategory;
    fillField(pagina, par, tipo, selector);
}

// SOLICITA LOS PRODUCTOS SEGUN SU SUBCATEGORIA ID
function getProducts(sbc_id) {
    //deleteTablaAccesorios();


    console.log("id subcategoria:"+ sbc_id);
    var pagina = 'ProductAccessory/listProductsById';
    var par = '[{"sbc_id":"'+sbc_id+'"}]';
    var tipo = 'json';
    var selector = putProducts;
    fillField(pagina, par, tipo, selector);
} 

/* LLENA LOS DATOS DE LOS ELEMENTOS */
// llena el selector de categorias
function putCategory(dt) {

    if (dt[0].cat_id != 0) {
        $.each(dt, function (v, u) {
            let H = `<option value="${u.cat_id}" data-content="${u.cat_id}">${u.cat_name}</option>`;
            $('#txtCategoryPack').append(H);
            $('#txtCategoryProduct').append(H);
        });
    }

    $('#txtCategoryPack').on('change', function () {
        let ops = `<option value="0" selected>Selecciona una subcategoría</option>`;
        $('#txtSubcategoryPack').html(ops);
        let id = $(this).val();
        selSubcategoryPack(id);
        //validator_part01();
    }); 
}
// Mantiene en memoria el set de subcategorias
function putSubCategory(dt) {
    subcategos = dt;
}

function putAccesorios(dt) {
    $('#listProducts').html("");
    if (dt[0].prd_id != "0") {
    $.each(dt, function (v, u) {
/*         let H = `<div class="list-item" id="${u.prd_id}-${u.prd_sku}-${u.prd_name}" data-subcateg="${u.prd_name}" >
 */
        let H = `<div class="list-item" id="${u.prd_id}-${u.prd_sku}-${u.prd_name}" data-subcateg="${u.prd_name}" >
        ${u.prd_name}<div class="items-just"><i class="fas fa-arrow-circle-right"></i></div>
              </div>`;
/*         let H = `<div class="list-item" id="${u.prd_id}-${u.prd_sku}-${u.prd_name}" data-subcateg="${u.prd_name}" >
                    ${u.prd_sku} - ${u.prd_name}<div class="items-just"><i class="fas fa-arrow-circle-right"></i></div>
                </div>`; */
        $('#listProducts').append(H);
    });
   }


    drawProducts(); 
} 

// Dibuja los productos
function drawProducts() {
    $('.list-item').addClass('hide-items');
    $(`.list-item`).removeClass('hide-items');
    //$(`.list-item[data-subcateg^="${str}"]`).removeClass('hide-items');


    var ps = $('#boxProducts').offset();
    $('.list-group').css({top: ps.top + 30 + 'px', display: 'none'});
    $('.box-items-list i').removeClass('rotate');
    $('#boxProducts')
        .unbind('click')
        .on('click', function () {
            $('.list-group').slideToggle('slow');
            $('.box-items-list i').toggleClass('rotate');
        });

    $('.list-item .items-just i')
        .unbind('click')
        .on('click', function () {
            let id = $(this).parents('.list-item');
            console.log("se dio"+id);
            console.log( $(this).val());

            //console.log( $(this).parents('.list-item').attr('id'));
            console.log("se dio click em el circulo");
            product_apply(id);
        });
}


//llena la tabla de productos
function putProducts(dt) {
    deleteTablaAccesorios();
    deleteTablaProducts();
    console.log(dt);
    if (dt[0].prd_id != '0') {
        let tabla = $('#tblPackages').DataTable();
        tabla.clear().draw(); //BORRA LOS REGISTROS EXISTENTES

        $.each(dt, function (v, u) {
            var rowNode = tabla.row
                .add({
                    pack_sku: `<span class="hide-support" id="SKU-${u.prd_id}">${u.prd_id}</span>${u.prd_sku}`,
                    id: u.prd_id+'-'+u.prd_sku,
                    packname: u.prd_name,
                })
                
                .draw()
                .node();
                $(rowNode).find('td').eq(1).attr("hidden",true);


            $(`#SKU-${u.prd_id}`).parent().parent().attr('id', u.prd_id+'-'+u.prd_sku).addClass('indicator');
        });

        load_Accesories();
        action_selected_packages();
    }else {
        console.log("llego al else");
    }
}

// Llena el selector de subcategorias
function selSubcategoryPack(id) {
    deleteTablaAccesorios();
    deleteTablaProducts();

    console.log("selSubcategoryPack");

    if (subcategos[0].sbc_id != 0) {
        $.each(subcategos, function (v, u) {
            if (u.cat_id === id) {
                let H = `<option value="${u.sbc_id}" data-content="${u.sbc_id}|${u.cat_id}|${u.sbc_code}">${u.sbc_code} - ${u.sbc_name}</option>`;
                $('#txtSubcategoryPack').append(H);
            }
        });
    }
    $("#txtSubcategoryPack").change(function(){
        let id = $(this).val();
        console.log(id);
        getProducts(id);
	});
}

// Llena el selector de subcategorias
function selSubcategoryProduct(id) {
    if (subcategos[0].sbc_id != 0) {
        $.each(subcategos, function (v, u) {
            if (u.cat_id === id) {
                let H = `<option value="${u.sbc_id}" data-content="${u.sbc_id}|${u.cat_id}|${u.sbc_code}">${u.sbc_code} - ${u.sbc_name}</option>`;
                $('#txtSubcategoryProduct').append(H);
            }
        });
    }

    $('#txtSubcategoryProduct')
        .unbind('change')
        .on('change', function () {
            let id = $(this).val();
            drawProducts(id);
        });
}
let sbccnt = 0;

//***************************************** */
//****************AQUI***************** */
//***************************************** */

function action_selected_packages() {

    $('.indicator td')
        .unbind('click')
        .on('click', function () {
                var prdId = $(this).parent().attr('id');
                var arraryPrd = prdId.split('-');
                
                //$("#selectAccesorios").css('visibility', 'visible');;

                let tabla = $('#tblPackages').DataTable();

                setTimeout(() => {
                    var RenglonesSelection = tabla.rows({selected: true}).count();
                    if (RenglonesSelection == 0 ) {
                        $("#selectAccesorios").css('visibility', 'hidden');
                        deleteTablaAccesorios();
                    } else {
                        $("#selectAccesorios").css('visibility', 'visible');
                    }
                 }, 100);

                productoSelectId = arraryPrd[0];
                productoSelectSKU = arraryPrd[1];

/*                 console.log("se seleccione un producto");
                console.log(productoSelectSKU);
                console.log(productoSelectId); */


                getAccesoriesById(productoSelectId);
                //select_products(prdId);
     });
}

function getAccesoriesById(prdId) {
    var pagina = 'ProductAccessory/getAccesoriesById';
    var par = `[{"prdId":"${prdId}"}]`;
    var tipo = 'json';
    var selector = putAccesoriesById;
    fillField(pagina, par, tipo, selector);
}

function putAccesoriesById(dt) {
    console.log(" carga de accesorios por id");
    deleteTablaAccesorios();

    if (dt[0].prd_id != '') {
        $.each(dt, function (v, u) {
           putNewAccesorio(u.prd_id,u.prd_sku,u.prd_name);
        });
    }
}

function deleteTablaAccesorios() {
    let tabla = $('#tblProducts').DataTable();
    tabla.rows().remove().draw();
}

function deleteTablaProducts() {
    let tabla = $('#tblPackages').DataTable();
    tabla.rows().remove().draw();
}



function saveAccesoryId(prdId) {
    var pagina = 'ProductAccessory/saveAccesorioByProducto';
    var par = `[{"prdId":"${prdId}","parentId":"${productoSelectId}","skuPrdPadre":"${productoSelectSKU}"}]`;
    var tipo = 'json';
    var selector = putAccesoriesRes;
    fillField(pagina, par, tipo, selector);
}
function putAccesoriesRes(dt) {
    console.log("respuesta de grabar"+dt);
    accesorioExist = dt;
}

function action_selected_products() {
    $('#tblProducts .choice')
        .unbind('click')
        .on('click', function () {
            let edt = $(this).attr('class').indexOf('kill');
            // console.log(edt);
            let prdId = $(this).attr('id');
            console.log("se borrara el producto = "+prdId);
            confirm_delet_product(prdId);
        });
}

function load_Accesories(prdId) {
    console.log("load_Accesories");
    var pagina = 'ProductAccessory/listAccesorios';
    var par = `[{"prdId":"${prdId}"}]`;
    var tipo = 'json';
    var selector = putAccesorios;
    fillField(pagina, par, tipo, selector);
}

//valido
function putAccesoriostable(dt) {
    console.log("llego a carga de accesorios");
    let tabla = $('#tblProducts').DataTable();
    tabla.rows().remove().draw();

    if (dt[0].prd_id != '') {
        $.each(dt, function (v, u) {
            tabla.row
                .add({
                    editable: `<i class="fas fa-times-circle choice prod kill" id="${u.prd_id}-${u.prd_parent}"></i>`,
                    prod_sku: `<span class="hide-support" id="SKU-${u.prd_sku}">${u.prd_id}</span>${u.prd_sku}`,
                    prodname: u.prd_name,
                })
                .draw();
        });
        action_selected_products();
    }
}

//revisar aqui si no graba producto
function product_apply(prId) {
    console.log("llego aqui ii");

    console.log(prId);
    let acce = prId.attr('id').split('-');
    console.log(acce);
    //VALIDAR QUE NO EXISTA EL ACCESORIO 
    saveAccesoryId(acce[0]);
    console.log(acce[2]);
    //console.log("respuesta conseguida"+accesorioExist);
    setTimeout(() => {
        if(accesorioExist != 0){
            putNewAccesorio(acce[0],productoSelectSKU,acce[2]);

            //$(`.list-item[data-subcateg^="accesorio 41"]`).attr("hidden",true);
            $(`.list-item[data-subcateg^="${acce[2]}"]`).attr("hidden",true);
        }
    }, 500);
}

function putNewAccesorio(idAccesorio,idSku,idName) {
  //inserta el renglon en base
    console.log(idAccesorio+idSku+idName);

    let tabla = $('#tblProducts').DataTable();
    tabla.row
        .add({
            editable: `<i class="fas fa-times-circle choice prod kill" id="${idAccesorio}-${productoSelectId}"></i>`,
            prod_sku: `<span >${idSku}</span>`,
            prodname: idName,
        })
        .draw();
    action_selected_products();
}

function confirm_delet_product(id) {
    $('#delProdModal').modal('show');
    $('#txtIdProductPack').val(id);
    //borra paquete +
    $('#btnDelProduct').on('click', function () {
        let Id = $('#txtIdProductPack').val();

        var arrayID = Id.split('-');
        let prdId = arrayID[0];
        let prdParent = arrayID[1];

        let tabla = $('#tblProducts').DataTable();
        $('#delProdModal').modal('hide');

        let prdRow = $(`#${Id}`).parents('tr');

        tabla.row(prdRow).remove().draw();

        var pagina = 'ProductAccessory/deleteProduct';
        var par = `[{"prdId":"${prdId}","prdParent":"${prdParent}"}]`;
        var tipo = 'json';
        var selector = putDelPackages;
        fillField(pagina, par, tipo, selector);
    });
}

function putDelPackages(dt) {
    $('#delPackModal').modal('hide');
    load_Accesories();
} 