let subcategos;

$(document).ready(function () {
    verifica_usuario();
    inicial();
});

function inicial() {
    setting_table_products();
    setting_table_packages();
    getCategory();
    getSubcategory();
    getPackages();
    $('#txtPackageName').on('change', function () {
        validator_part01();
    });
    $('#txtPackagePrice').on('change', function () {
        validator_part01();
    });

    $('#btn_packages').on('click', function () {
        packages_apply();
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
                    read_exchange_table();
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
            {data: 'pack_sku', class: 'sku'},
            {data: 'packname', class: 'product-name'},
            {data: 'packpric', class: 'price'},
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
                    read_exchange_table();
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

/* LLENA LOS DATOS DE LOS ELEMENTOS */
// llena el selector de categorias
function putCategory(dt) {
    if (dt[0].cat_id != 0) {
        $.each(dt, function (v, u) {
            let H = `<option value="${u.cat_id}" data-content="${u.cat_id}">${u.cat_name}</option>`;
            $('#txtCategoryPack').append(H);
            $('#txtCategory').append(H);
        });
    }

    $('#txtCategoryPack').on('change', function () {
        let ops = `<option value="0" selected>Selecciona una subcategoría</option>`;
        $('#txtSubcategoryPack').html(ops);
        let id = $(this).val();
        selSubcategory(id);
        validator_part01();
    });
}
// Mantiene en memoria el set de subcategorias
function putSubCategory(dt) {
    subcategos = dt;
}
// Mantiene en memoria el set de subcategorias
function putPackages(dt) {
    let tabla = $('#tblPackages').DataTable();
    $.each(dt, function (v, u) {
        tabla.row
            .add({
                editable: `<i class="fas fa-times-circle kill" id="D-${u.prd_id}"></i>`,
                pack_sku: `<span class="hide-support" id="SKU-${u.prd_sku}">${u.prd_id}</span>${u.prd_sku}`,
                packname: u.prd_name,
                packpric: u.prd_price,
            })
            .draw();

        $(`#SKU-${u.prd_sku}`).parent().parent().attr('id', u.prd_id).addClass('indicator');
    });
    action_selected_packages();
}
// Llena el selector de subcategorias
function selSubcategory(id) {
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

        console.log(` 
    prdsku:         ${prdsku}
    prdName:        ${prdName}
    prdModel:       ${prdModel}
    prdPrice:       ${prdPrice}
    prdCoinType:    ${prdCoinType}
    prdVisibility:  ${prdVisibility}
    prdComments:    ${prdComments}
    prdStatus:      ${prdStatus}
    prdLevel:       ${prdLevel}
    sbcId:          ${sbcId}
    supId:          ${supId}
    srvId:          ${srvId}
    exmId:          ${exmId}
        `);

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
    let tabla = $('#tblPackages').DataTable();

    tabla.row
        .add({
            editable: '<i class="fas fa-times-circle kill"></i>',
            pack_sku: `<span class="hide-support" id="SKU-${pr[0].prdsku}"></span>${pr[0].prdsku}`,
            packname: pr[0].prdName,
            packpric: pr[0].prdPrice,
        })
        .draw();
    action_selected_packages();

    console.log(par);
    var pagina = 'Packages/savePack';
    var par = par;
    var tipo = 'html';
    var selector = putNewPackage;
    fillField(pagina, par, tipo, selector);
}

function putNewPackage(dt) {
    console.log(dt);
    let sku = dt.split('|')[1];
    let id = dt.split('|')[0];
    $(`#SKU-${sku}`).text(id);

    let tabla = $('#tblPackages').DataTable();
    tabla.unbind('select').on('select', function (e, dt, type, i) {
        console.log(tabla.row(i).data().pack_sku);
    });
}

function action_selected_packages() {
    $('.indicator')
        .unbind('click')
        .on('click', function () {
            let selected = $(this).attr('class').indexOf('selected');
            if (selected < 0) {
                let prdId = $(this).attr('id');
                select_products(prdId);
                $('.form_primary').slideUp('slow', function () {
                    $('.form_secundary').slideDown('slow');
                });
            } else {
                $('.form_secundary').slideUp('slow', function () {
                    $('.form_primary').slideDown('slow');
                });
                $('#tblProducts').DataTable().rows().remove().draw();
            }
        });
}

function select_products(prdId) {
    console.log(prdId);
    var pagina = 'Packages/listProducts';
    var par = `[{"prdId":"${prdId}"}]`;
    var tipo = 'json';
    var selector = putProducts;
    fillField(pagina, par, tipo, selector);
}

function putProducts(dt) {
    let tabla = $('#tblProducts').DataTable();
    tabla.rows().remove().draw();
    if (dt[0].prd_id != '') {
        $.each(dt, function (v, u) {
            tabla.row
                .add({
                    editable: `<i class="fas fa-times-circle kill" id="D-${u.prd_id}"></i>`,
                    prod_sku: `<span class="hide-support" id="SKU-${u.prd_sku}">${u.prd_id}</span>${u.prd_sku}`,
                    prodname: u.prd_name,
                    prodpric: u.prd_price,
                })
                .draw();
        });
    }
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
