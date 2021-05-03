let subcategos;
let products;

$(document).ready(function () {
    verifica_usuario();
    inicial();
});

function inicial() {
    setting_table_products();
    setting_table_packages();
    getCategory();
    getSubcategory();
    getProducts();
    getPackages();
    $('#txtPackageName').on('change', function () {
        validator_part01();
    });
    $('#txtPackagePrice').on('change', function () {
        validator_part01();
    });

    $('#btn_packages').on('click', function () {
        let name = $(this).text();
        if (name == 'Aplicar') {
            packages_edit();
        } else {
            packages_apply();
        }
    });

    $('#btn_packages_cancel').on('click', function () {
        active_params();
    });
}
// Configura la tabla de paquetes
function setting_table_packages() {
    let tabla = $('#tblPackages').DataTable({
        order: [[1, 'asc']],
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
            {data: 'editable', class: 'edit'},
            {data: 'pack_sku', class: 'sel sku'},
            {data: 'packname', class: 'sel product-name'},
            {data: 'packpric', class: 'sel price'},
        ],
    });
}

// Configura la tabla de productos
function setting_table_products() {
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
            {data: 'prodpric', class: 'price'},
        ],
    });
}

// Solicita las categorias
function getCategory() {
    var pagina = 'Packages/listCategories';
    var par = '[{"parm":""}]';
    var tipo = 'json';
    var selector = putCategory;
    fillField(pagina, par, tipo, selector);
}
// Solicita las subcategorias
function getSubcategory() {
    var pagina = 'Packages/listSubCategories';
    var par = `[{"catId":""}]`;
    var tipo = 'json';
    var selector = putSubCategory;
    fillField(pagina, par, tipo, selector);
}
// Solicita los paquetes
function getPackages() {
    var pagina = 'Packages/listPackages';
    var par = `[{"pckId":""}]`;
    var tipo = 'json';
    var selector = putPackages;
    fillField(pagina, par, tipo, selector);
}
// Solicita los paquetes
function getProducts() {
    var pagina = 'Packages/listProducts';
    var par = `[{"prdId":""}]`;
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
        validator_part01();
    });

    $('#txtCategoryProduct').on('change', function () {
        let ops = `<option value="0" selected>Selecciona una subcategoría</option>`;
        $('#txtSubcategoryProduct').html(ops);
        let id = $(this).val();
        selSubcategoryProduct(id);
        // validator_part02();
    });
}
// Mantiene en memoria el set de subcategorias
function putSubCategory(dt) {
    subcategos = dt;
}

function putProducts(dt) {
    $.each(dt, function (v, u) {
        let H = `<div class="list-item" id="P-${u.prd_id}" data-subcateg="${u.sbc_id}" data-content="${u.prd_id}|${u.prd_sku}|${u.prd_name}|${u.prd_price}|${u.sbc_id}">
                    ${u.prd_sku} - ${u.prd_name}<div class="items-just"><i class="fas fa-arrow-circle-right"></i></div>
                </div>`;
        $('#listProducts').append(H);
    });
}

// Dibuja los productos
function drawProducts(str) {
    $('.list-item').addClass('hide-items');
    $(`.list-item[data-subcateg^="${str}"]`).removeClass('hide-items');

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
            product_apply(id);
        });
}

// Llena la tabla de paquetes
function putPackages(dt) {
    if (dt[0].prd_id != '0') {
        let tabla = $('#tblPackages').DataTable();
        $.each(dt, function (v, u) {
            tabla.row
                .add({
                    editable: `<i class="fas fa-pen choice pack modif" id="E-${u.prd_id}"></i>
                           <i class="fas fa-times-circle choice pack kill" id="D-${u.prd_id}"></i>`,
                    pack_sku: `<span class="hide-support" id="SKU-${u.prd_sku}">${u.prd_id}</span>${u.prd_sku}`,
                    packname: u.prd_name,
                    packpric: u.prd_price,
                })
                .draw();

            $(`#SKU-${u.prd_sku}`).parent().parent().attr('id', u.prd_id).addClass('indicator');
        });
        action_selected_packages();
    }
}
// Llena el selector de subcategorias
function selSubcategoryPack(id) {
    if (subcategos[0].sbc_id != 0) {
        $.each(subcategos, function (v, u) {
            if (u.cat_id === id) {
                let H = `<option value="${u.sbc_id}" data-content="${u.sbc_id}|${u.cat_id}|${u.sbc_code}">${u.sbc_code} - ${u.sbc_name}</option>`;
                $('#txtSubcategoryPack').append(H);
            }
        });
    }

    $('#txtSubcategoryPack')
        .unbind('change')
        .on('change', function () {
            let id = $(this).val();
            validator_part01();
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

// Crea el paquete
let sbccnt = 0;
function packages_apply(subcat) {
    let sbcId = $('#txtSubcategoryPack option:selected').val();
    if (subcat != '' && subcat != undefined) {
        let catId = refil($('#txtCategoryPack option:selected').val(), 2);
        let subId = refil($('#txtSubcategoryPack option:selected').attr('data-content').split('|')[2], 2);
        let prdsku = catId + subId + refil(subcat, 3);
        let prdName = $('#txtPackageName').val();
        let prdModel = '';
        let prdPrice = $('#txtPackagePrice').val();
        let prdCoinType = 'MXN';
        let prdVisibility = 1;
        let prdComments = '';
        let prdStatus = 1;
        let prdLevel = 'K';
        let supId = 0;
        let srvId = 1;
        let exmId = 1;

        sbccnt = 0;

        //     console.log(`
        // prdsku:         ${prdsku}
        // prdName:        ${prdName}
        // prdModel:       ${prdModel}
        // prdPrice:       ${prdPrice}
        // prdCoinType:    ${prdCoinType}
        // prdVisibility:  ${prdVisibility}
        // prdComments:    ${prdComments}
        // prdStatus:      ${prdStatus}
        // prdLevel:       ${prdLevel}
        // sbcId:          ${sbcId}
        // supId:          ${supId}
        // srvId:          ${srvId}
        // exmId:          ${exmId}
        //     `);

        let par = `[{
        "prdsku"        : "${prdsku}",
        "prdName"       : "${prdName}",
        "prdModel"      : "${prdModel}",
        "prdPrice"      : "${prdPrice}",
        "prdCoinType"   : "${prdCoinType}",
        "prdVisibility" : "${prdVisibility}",
        "prdComments"   : "${prdComments}",
        "prdStatus"     : "${prdStatus}",
        "prdLevel"      : "${prdLevel}",
        "sbcId"         : "${sbcId}",
        "supId"         : "${supId}",
        "srvId"         : "${srvId}",
        "exmId"         : "${exmId}"
    }]`;

        fill_table_packs(par);
    } else {
        if (sbccnt < 10) {
            setTimeout(() => {
                sbccnt++;
                build_sku_product(sbcId);
            }, 1000);
        }
    }
}

function packages_edit() {
    let prdId = $('#txtIdPackages').val();
    let prdName = $('#txtPackageName').val();
    let prdPrice = $('#txtPackagePrice').val();

    // console.log(`
    // prdId:          ${prdId}
    // prdName:        ${prdName}
    // prdPrice:       ${prdPrice}
    //     `);

    active_params();

    // var pagina = 'Packages/lastIdSubcategory';
    // var par = `[{"sbcId":"${sbcId}"}]`;
    // var tipo = 'json';
    // var selector = putIdSubcategory;
    // fillField(pagina, par, tipo, selector);
}

function active_params() {
    $('#txtIdPackages').val(0);
    $('#txtPackageName').val('');
    $('#txtPackagePrice').val('');
    $('.mainTitle').html('Generar paquete');
    $(`#txtCategoryPack`).attr('disabled', false);
    $(`#txtSubcategoryPack`).attr('disabled', false);
    $('#btn_packages').html('Crear paquete').addClass('disabled');
    $(`#txtCategoryPack`).val(0);
    $(`#txtCategoryPack option[value="0"]`).trigger('change');
    $(`#txtSubcategoryPack`).val(0);
    $('#btn_packages_cancel').addClass('hide-items');
}

function build_sku_product(sbcId) {
    var pagina = 'Packages/lastIdSubcategory';
    var par = `[{"sbcId":"${sbcId}"}]`;
    var tipo = 'json';
    var selector = putIdSubcategory;
    fillField(pagina, par, tipo, selector);
}

function putIdSubcategory(dt) {
    packages_apply(dt[0].nextId);
}

function fill_table_packs(par) {
    let largo = $('#tblPackages tbody tr td').html();
    largo == 'Ningún dato disponible en esta tabla' ? $('#tblPackages tbody tr').remove() : '';

    pr = JSON.parse(par);

    var pagina = 'Packages/savePack';
    var par = par;
    var tipo = 'html';
    var selector = putNewPackage;
    fillField(pagina, par, tipo, selector);
}

function putNewPackage(dt) {
    let id = dt.split('|')[0];
    let sku = dt.split('|')[1];
    let name = dt.split('|')[2];
    let price = dt.split('|')[3];
    $(`#SKU-${sku}`).text(id);

    let tabla = $('#tblPackages').DataTable();

    tabla.row
        .add({
            editable: `<i class="fas fa-pen choice pack modif" id="E-${id}"></i>
            <i class="fas fa-times-circle choice pack kill" id="D-${id}"></i>`,
            pack_sku: `<span class="hide-support" id="SKU-${sku}"></span>${sku}`,
            packname: name,
            packpric: price,
        })
        .draw();
    $(`#SKU-${sku}`).parent().parent().attr('id', id).addClass('indicator');
    action_selected_packages();

    tabla.on('select', function (e, dt, type, i) {
        $('#txtCategoryProduct').val(0);
        $('#txtSubcategoryProduct').val(0);
        $('#txtIdPackages').val(0);
    });
}

function action_selected_packages() {
    $('.indicator td.sel')
        .unbind('click')
        .on('click', function () {
            let selected = $(this).parent().attr('class').indexOf('selected');
            if (selected < 0) {
                let prdId = $(this).parent().attr('id');
                console.log(prdId);
                select_products(prdId);

                $('#txtCategoryProduct').val(0);
                $('#txtSubcategoryProduct').val(0);

                drawProducts(0);
                $('.form_primary').slideUp('slow', function () {
                    $('.form_secundary').slideDown('slow');
                    $('#txtIdPackages').val(prdId);
                });
            } else {
                $('#txtIdPackages').val(0);
                $('.form_secundary').slideUp('slow', function () {
                    $('.form_primary').slideDown('slow');
                    active_params();
                });
                $('#tblProducts').DataTable().rows().remove().draw();
            }
        });

    $('.choice')
        .unbind('click')
        .on('click', function () {
            let edt = $(this).attr('class').indexOf('modif');
            let prdId = $(this).attr('id').substring(2, 100);
            if (edt >= 0) {
                var pagina = 'Packages/detailPack';
                var par = `[{"prdId":"${prdId}"}]`;
                var tipo = 'json';
                var selector = put_detailPack;
                fillField(pagina, par, tipo, selector);
            } else {
                confirm_delet_packages(prdId);
            }
        });
}

function action_selected_products() {
    $('#tblProducts .choice')
        .unbind('click')
        .on('click', function () {
            let edt = $(this).attr('class').indexOf('kill');
            // console.log(edt);
            let prdId = $(this).attr('id');
            confirm_delet_product(prdId);
        });
}

function put_detailPack(dt) {
    let chc = dt[0].prd_id;
    setTimeout(() => {
        $('#tblPackages').DataTable().rows().deselect();
        $('#txtIdPackages').val(chc);
        $('#txtPackageName').val(dt[0].prd_name);
        $('#txtPackagePrice').val(dt[0].prd_price);
        $('.mainTitle').html('Editar paquete');
        $('#txtCategoryPack').val(dt[0].cat_id);
        // $(`#txtCategoryPack option[value="${dt[0].cat_id}"]`).attr('selected', true);
        $(`#txtCategoryPack option[value="${dt[0].cat_id}"]`).trigger('change');
        $(`#txtSubcategoryPack option[value="${dt[0].sbc_id}"]`).attr('selected', true);
        $(`#txtCategoryPack`).attr('disabled', true);
        $(`#txtSubcategoryPack`).attr('disabled', true);
        $('#btn_packages').html('Aplicar').removeClass('disabled');
        $('#btn_packages_cancel').removeClass('hide-items');
        $('.form_secundary').slideUp('slow', function () {
            $('.form_primary').slideDown('slow');
        });
        $('#tblProducts').DataTable().rows().remove().draw();
    }, 50);
}

function select_products(prdId) {
    var pagina = 'Packages/listProductsPack';
    var par = `[{"prdId":"${prdId}"}]`;
    var tipo = 'json';
    var selector = putProductsPack;
    fillField(pagina, par, tipo, selector);
}

function putProductsPack(dt) {
    let tabla = $('#tblProducts').DataTable();
    tabla.rows().remove().draw();
    if (dt[0].prd_id != '') {
        $.each(dt, function (v, u) {
            tabla.row
                .add({
                    editable: `<i class="fas fa-times-circle choice prod kill" id="D-${u.prd_id}-${u.prd_parent}"></i>`,
                    prod_sku: `<span class="hide-support" id="SKU-${u.prd_sku}">${u.prd_id}</span>${u.prd_sku}`,
                    prodname: u.prd_name,
                    prodpric: u.prd_price,
                })
                .draw();
        });
        action_selected_products();
    }
}

function product_apply(prId) {
    let prod = prId.attr('data-content').split('|');
    let productId = prod[0];
    let productSKU = prod[1];
    let productName = prod[3];
    let productParent = $('#txtIdPackages').val();

    console.log(productParent);

    var pagina = 'Packages/SaveProduct';
    var par = `[{"prdId":"${productId}","prdParent":"${productParent}"}]`;
    var tipo = 'json';
    var selector = putNewProductsPack;
    fillField(pagina, par, tipo, selector);
}

function putNewProductsPack(dt) {
    let tabla = $('#tblProducts').DataTable();
    tabla.row
        .add({
            editable: `<i class="fas fa-times-circle choice prod kill" id="D-${dt[0].prd_id}-${dt[0].prd_parent}"></i>`,
            prod_sku: `<span class="hide-support" id="SKU-${dt[0].prd_sku}">${dt[0].prd_id}</span>${dt[0].prd_sku}`,
            prodname: dt[0].prd_name,
            prodpric: dt[0].prd_price,
        })
        .draw();
    action_selected_products();
}

function confirm_delet_packages(id) {
    $('#delPackModal').modal('show');
    $('#txtIdPackage').val(id);

    //borra paquete +
    $('#btnDelPackage').on('click', function () {
        let prdId = $('#txtIdPackage').val();
        let tabla = $('#tblPackages').DataTable();
        let row = $('#' + prdId);
        tabla.row(row).remove().draw();

        var pagina = 'Packages/deletePackages';
        var par = `[{"prdId":"${prdId}"}]`;
        var tipo = 'json';
        var selector = putDelPackages;
        fillField(pagina, par, tipo, selector);
    });
}

function confirm_delet_product(id) {
    $('#delProdModal').modal('show');
    $('#txtIdProductPack').val(id);
    //borra paquete +
    $('#btnDelProduct').on('click', function () {
        let Id = $('#txtIdProductPack').val();
        let prdId = Id.split('-')[1];
        let prdParent = Id.split('-')[2];
        let tabla = $('#tblProducts').DataTable();
        $('#delProdModal').modal('hide');

        let prdRow = $(`#${Id}`).parents('tr');

        tabla.row(prdRow).remove().draw();

        var pagina = 'Packages/deleteProduct';
        var par = `[{"prdId":"${prdId}","prdParent":"${prdParent}"}]`;
        var tipo = 'json';
        var selector = putDelPackages;
        fillField(pagina, par, tipo, selector);
    });
}

function putDelPackages(dt) {
    $('#delPackModal').modal('hide');
}

function validator_part01() {
    let ky = 0;
    let msg = '';
    if ($('#txtSubcategoryPack').val() == 0) {
        ky = 1;
        msg += 'Debes seleccionar una subcategoria';
    }

    if ($('#txtPackageName').val() == 0) {
        ky = 1;
        msg += 'Debes indicar el nombre del paquete';
    }
    if ($('#txtPackagePrice').val() == 0) {
        ky = 1;
        msg += 'Debes indicar el precio del paquete';
    }

    if (ky == 0) {
        $('#btn_packages').removeClass('disabled');
    } else {
        $('#btn_packages').addClass('disabled');
    }
}
