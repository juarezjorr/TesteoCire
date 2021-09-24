let seccion = '';
let docs;
let grp = 50;
let num = 0;
let cats, subs, sku1, sku2, sku3, sku4;

$(document).ready(function () {
    verifica_usuario();
    inicial();
});

function inicial() {
    getCategories();
    getSubcategories();
    getServices();
    getCoins();
    getDocument();
    $('.deep_loading').css({display: 'flex'});
    $('.tblProdMaster').css({display: 'none'});
}

// Solicita las categorias
function getCategories() {
    var pagina = 'Products/listCategories';
    var par = '[{"parm":""}]';
    var tipo = 'json';
    var selector = putCategories;
    fillField(pagina, par, tipo, selector);
}

// Solicita las subcategorias
function getSubcategories() {
    var pagina = 'Products/listSubcategories';
    var par = '[{"parm":""}]';
    var tipo = 'json';
    var selector = putSubcategories;
    fillField(pagina, par, tipo, selector);
}

// Solicita los tipos de servicio
function getServices() {
    var pagina = 'Products/listServices';
    var par = '[{"parm":""}]';
    var tipo = 'json';
    var selector = putServices;
    fillField(pagina, par, tipo, selector);
}

// Solicita las monedas
function getCoins() {
    var pagina = 'Products/listCoins';
    var par = '[{"parm":""}]';
    var tipo = 'json';
    var selector = putCoins;
    fillField(pagina, par, tipo, selector);
}

// Solicita las monedas
function getDocument() {
    var pagina = 'Products/listDocument';
    var par = '[{"parm":""}]';
    var tipo = 'json';
    var selector = putDocuments;
    fillField(pagina, par, tipo, selector);
}

/** +++++  Obtiene los productos de la base */
function getProducts(catId) {
    var pagina = 'Products/listProducts';
    var par = `[{"catId":"${catId}","grp":"${grp}","num":"${num}"}]`;
    var tipo = 'json';
    var selector = putProducts;
    fillField(pagina, par, tipo, selector);
}

/** +++++  Obtiene el producto seleccionado */
function getSelectProduct(prdId) {
    var pagina = 'Products/getSelectProduct';
    var par = `[{"prdId":"${prdId}"}]`;
    var tipo = 'json';
    var selector = putSelectProduct;
    fillField(pagina, par, tipo, selector);
}

/** +++++  coloca las categorias */
function putCategories(dt) {
    cats = dt;

    if (dt[0].cat_id != '0') {
        let catId = dt[0].cat_id;
        $.each(dt, function (v, u) {
            var H = `<option value="${u.cat_id}">${u.cat_name}</option>`;
            $('#txtCategoryList').append(H);
            $('#txtCatId').append(H);
        });

        getProducts(0);

        $('#txtCategoryList').on('change', function () {
            let id = $(this).val();
            let catId = $(`#txtCategoryList option[value="${id}"]`).val();
            $('.deep_loading').css({display: 'flex'});
            $('.tblProdMaster').css({display: 'none'});
            $('#tblProducts').DataTable().destroy();
            getProducts(catId);
        });

        $('#txtCatId').on('change', function () {
            $(`#txtSbcId option`).addClass('hide');
            let id = $(this).val();
            let catId = $(`#txtCatId option[value="${id}"]`).val();
            $(`#txtSbcId option[data_category="${catId}"]`).removeClass('hide');
            $(`#txtSbcId`).val(0);
            sku1 = refil(catId, 2);
            sku2 = '';
            sku3 = '';
            sku4 = '';

            fillFieldSkuBox();
        });
    }
}
/** +++++  coloca las subcategorias */
function putSubcategories(dt) {
    subs = dt;
    if (dt[0].sbc_id != '0') {
        let sbcId = dt[0].sbc_id;
        $.each(dt, function (v, u) {
            var H = `<option class="hide" data_category="${u.cat_id}" value="${u.sbc_id}">${u.sbc_name}</option>`;
            $('#txtSbcId').append(H);
        });
    }
}
/** +++++  coloca los tipos de servicio */
function putServices(dt) {
    if (dt[0].srv_id != '0') {
        let srvId = dt[0].srv_id;
        $.each(dt, function (v, u) {
            var H = `<option value="${u.srv_id}">${u.srv_name}-${u.srv_description}</option>`;
            $('#txtSrvId').append(H);
        });
    }
}
/** +++++  coloca los tipos de moneda */
function putCoins(dt) {
    if (dt[0].cin_id != '0') {
        let cinId = dt[0].cin_id;
        $.each(dt, function (v, u) {
            var H = `<option value="${u.cin_id}">${u.cin_code}-${u.cin_name}</option>`;
            $('#txtCinId').append(H);
        });
    }
}
/** +++++  coloca los docuemntos */
function putDocuments(dt) {
    if (dt[0].doc_id != '0') {
        let docId = dt[0].doc_id;
        $.each(dt, function (v, u) {
            var H = `<option value="${u.doc_id}">${u.doc_name}</option>`;
            $('#txtDocId').append(H);
        });
    }
}

/** +++++  coloca los productos en la tabla */
function putProducts(dt) {
    $('#tblProducts tbody').html('');
    if (dt[0].prd_id != '0') {
        var catId = dt[0].cat_id;
        $.each(dt, function (v, u) {
            pack = u.prd_level == 'K' ? 'fas' : 'far';
            let docInvo = `<span class="invoiceView" id="F${u.doc_id}"><i class="fas fa-file-alt"></i></span>`;
            let invoice = u.doc_id == 0 ? '' : docInvo;
            let skufull = u.prd_sku.slice(7, 11) == '' ? u.prd_sku.slice(0, 7) : u.prd_sku.slice(0, 7) + '-' + u.prd_sku.slice(7, 11);

            var H = `
                <tr id="${u.prd_id}">
                    <td class="edit"><i class='fas fa-pen modif'></i><i class="fas fa-times-circle kill"></i></td>
                    <td class="sku">${skufull}</td>
                    <td class="product-name editable" data_action="box" data_edit="prd_name"> ${u.prd_name}</td>
                    <td class="price editable" data_action="box" data_edit="prd_price">${u.prd_price}</td>
                    <td class="quantity" data-content="${u.prd_sku}|${u.prd_name}|${u.quantity}|${u.prd_level}"><span class="toLink">${u.quantity}</span></td>
                    <td class="sku">${u.prd_level}</td>
                    <td class="sku editable list">${u.srv_name}</td>
                    <td class="sku">${u.prd_coin_type}</td>
                    <td class="cellInvoice center editable fileload">${invoice}</td>
                    <td class="catalog editable" data_action="list">${u.sbc_name}</td>
                    <td class="catalog editable" data_action="list">${u.cat_name}</td>
                    <td class="catalog editable" data_action="box">${u.prd_english_name}</td>
                    <td class="catalog editable" data_action="box">${u.prd_comments}</td>
                </tr>`;
            $('#tblProducts tbody').append(H);
        });
        settingTable();
        activeIcons();
    } else {
        settingTable();
    }
}

/** +++++  configura la table de productos */
function settingTable() {
    let title = 'Lista de precios';
    let filename = title.replace(/ /g, '_') + '-' + moment(Date()).format('YYYYMMDD');
    $('#tblProducts').DataTable({
        order: [[4, 'desc']],
        dom: 'Blfrtip',
        lengthMenu: [
            [100, 200, 300, -1],
            [100, 200, 300, 'Todos'],
        ],
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
                // Boton nuevo producto
                text: 'Nuevo producto',
                className: 'btn-apply',
                action: function (e, dt, node, config) {
                    createNewProduct();
                },
            },
        ],
        pagingType: 'simple_numbers',
        language: {
            url: 'app/assets/lib/dataTable/spanish.json',
        },
        scrollY: 'calc(100vh - 200px)',
        scrollX: true,
        fixedHeader: true,
        columns: [
            {data: 'editable', class: 'edit', orderable: false},
            {data: 'produsku', class: 'sku'},
            {data: 'prodname', class: 'product-name'},
            {data: 'prodpric', class: 'price'},
            {data: 'prodqtty', class: 'quantity'},
            {data: 'prodtype', class: 'sku'},
            {data: 'typeserv', class: 'sku'},
            {data: 'prodcoin', class: 'sku'},
            {data: 'prddocum', class: 'cellInvoice center'},
            {data: 'subcateg', class: 'catalog'},
            {data: 'categori', class: 'catalog'},
            {data: 'prodengl', class: 'catalog'},
            {data: 'prdcomme', class: 'catalog'},
        ],
    });

    $('.tblProdMaster')
        .delay(500)
        .slideDown('fast', function () {
            $('.deep_loading').css({display: 'none'});
            $('#tblProducts').DataTable().draw();
        });
}

/** +++++  Activa los iconos */
function activeIcons() {
    $('.toLink')
        .unbind('click')
        .on('click', function () {
            let prd = $(this).parents('tr').attr('id');
            let qty = $(this).parent().attr('data-content').split('|')[2];
            let pkt = $(this).parent().attr('data-content').split('|')[3];
            let pkn = $(this).parent().attr('data-content').split('|')[1];

            console.log(pkt, prd, qty);

            if (qty > 0) {
                getSeries(prd);
            }
        });

    $('.invoiceView')
        .unbind('click')
        .on('click', function () {
            var id = $(this).attr('id').slice(1, 10);
            console.log(id);
            var pagina = 'Documentos/VerDocumento';
            var par = `[{"id":"${id}"}]`;
            var tipo = 'json';
            var selector = putDocument;
            fillField(pagina, par, tipo, selector);
        });

    $('.modif')
        .unbind('click')
        .on('click', function () {
            let sltor = $(this);
            let prdId = sltor.parents('tr').attr('id');
            let prdNm = 'Modifica el producto';

            console.log('222');
            $('#ProductModal').removeClass('overlay_hide');
            $('.overlay_closer .title').html(prdNm);
            getSelectProduct(prdId);
            $('.btn_close')
                .unbind('click')
                .on('click', function () {
                    $('.overlay_background').addClass('overlay_hide');
                });
        });

    $('.kill')
        .unbind('click')
        .on('click', function () {
            let sltor = $(this);
            let prdId = sltor.parents('tr').attr('id');
            console.log('Kill ' + prdId);

            $('#delProdModal').modal('show');
            $('#txtIdProduct').val(prdId);
            //borra paquete +
            $('#btnDelProduct').on('click', function () {
                let Id = $('#txtIdProduct').val();
                console.log(Id);
                let tabla = $('#tblProducts').DataTable();
                $('#delProdModal').modal('hide');

                let prdRow = $(`#${Id}`);

                tabla.row(prdRow).remove().draw();

                var pagina = 'Products/deleteProduct';
                var par = `[{"prdId":"${Id}"}]`;
                var tipo = 'html';
                var selector = putDelProducts;
                fillField(pagina, par, tipo, selector);
            });
        });
}

function putDelProducts(dt) {
    console.log(dt);
}

function putDocument(dt) {
    console.log(dt);

    var a = document.createElement('a');
    a.href = 'data:application/octet-stream;base64,' + dt.doc_document;
    a.target = '_blank';
    // a.download = respuesta.doc_name;

    a.download = dt.doc_name + '.' + dt.doc_type.trim();
    a.click();
}

function putSelectProduct(dt) {
    cleanProductsFields();
    console.log(dt);
    let prdId = dt[0].prd_id;
    let prdName = dt[0].prd_name;
    let prdSku = dt[0].prd_sku;
    let prdModel = dt[0].prd_model;
    let prdPrice = dt[0].prd_price;
    let prdEnglishName = dt[0].prd_english_name;
    let prdCodeProvider = dt[0].prd_code_provider;
    let prdNameProvider = dt[0].prd_name_provider;
    let prdComments = dt[0].prd_comments;
    let prdVisibility = dt[0].prd_visibility;
    let prdLevel = dt[0].prd_level;
    let prdLonely = dt[0].prd_lonely;
    let prdAssured = dt[0].prd_assured;
    let sbcId = dt[0].sbc_id;
    let catId = $(`#txtSbcId option[value="${sbcId}"]`).attr('data_category');
    let cinId = dt[0].cin_id;
    let srvId = dt[0].srv_id;
    let docId = dt[0].docum;
    let dcpId = dt[0].documId;

    let vsb = prdVisibility == '1' ? ' <i class="fas fa-check-square" data_val="1"></i>' : '<i class="far fa-square" data_val="0"></i>';
    // let lvl = prdLevel == 'A' ? ' <i class="fas fa-check-square" data_val="1"></i>' : '<i class="far fa-square" data_val="0"></i>';
    let lvl = prdLevel == 'A' ? ' Accesorio' : 'Producto';
    let lnl = prdLonely == '1' ? ' <i class="fas fa-check-square" data_val="1"></i>' : '<i class="far fa-square" data_val="0"></i>';
    let ass = prdAssured == '1' ? ' <i class="fas fa-check-square" data_val="1"></i>' : '<i class="far fa-square" data_val="0"></i>';

    $(`#txtCatId`).attr('disabled', true);
    $(`#txtSbcId`).attr('disabled', true);

    $('#txtPrdId').val(prdId);
    $('#txtPrdName').val(prdName);
    $('#txtPrdSku').val(prdSku);
    $('#txtPrdModel').val(prdModel);
    $('#txtPrdPrice').val(prdPrice);
    $('#txtPrdEnglishName').val(prdEnglishName);
    $('#txtPrdCodeProvider').val(prdCodeProvider);
    $('#txtPrdNameProvider').val(prdNameProvider);
    $('#txtPrdComments').val(prdComments);
    $(`#txtCatId`).val(catId);
    $(`#txtSbcId`).val(sbcId);
    $(`#txtCinId`).val(cinId);
    $(`#txtSrvId`).val(srvId);
    $(`#txtDocId`).val(docId);
    $(`#txtDcpId`).val(dcpId);
    $('#txtPrdVisibility').html(vsb);
    $('#txtPrdLevel').html(lvl);
    $('#txtPrdLonely').html(lnl);
    $('#txtPrdAssured').html(ass);

    $('#tblEditProduct .checkbox i')
        .unbind('click')
        .on('click', function () {
            let itm = $(this);
            let itmId = itm.parents('div').attr('id');

            let itmCl = itm.attr('class').indexOf('fa-square');
            if (itmCl >= 0) {
                itm.removeAttr('class').addClass('fas fa-check-square');
                itm.attr('data_val', '1');
            } else {
                itm.removeAttr('class').addClass('far fa-square');
                itm.attr('data_val', '0');
            }
        });

    $('#txtSbcId')
        .unbind('change')
        .on('change', function () {
            let catId = $(`#txtCatId option[value="${id}"]`).val();
            let sbcId = $(`#txtSbcId option[value="${id}"]`).val();
            console.log(cat_id, sbcId);
        });

    $('#btn_save')
        .unbind('click')
        .on('click', function () {
            saveEditProduct();
        });
}

function saveEditProduct() {
    let ky = validatorProductsFields();
    if (ky == 0) {
        let prdId = $('#txtPrdId').val();
        let prdNm = $('#txtPrdName').val().replace(/\"/g, '°');
        let prdSk = $('#txtPrdSku').val();
        let prdMd = $('#txtPrdModel').val();
        let prdPr = $('#txtPrdPrice').val();
        let prdEn = $('#txtPrdEnglishName').val();
        let prdCd = $('#txtPrdCodeProvider').val();
        let prdNp = $('#txtPrdCodeProvider').val();
        let prdCm = $('#txtPrdComments').val();
        let prdVs = $('#txtPrdVisibility').children('i').attr('data_val');
        let prdLv = $('#txtPrdLevel').children('i').attr('data_val');
        prdLv = prdLv == '1' ? 'A' : 'P';
        let prdLn = $('#txtPrdLonely').children('i').attr('data_val');
        let prdAs = $('#txtPrdAssured').children('i').attr('data_val');
        let prdCt = $(`#txtCatId`).val();
        let prdSb = $(`#txtSbcId`).val();
        let prdCn = $(`#txtCinId`).val();
        let prdSv = $(`#txtSrvId`).val();
        let prdDc = $(`#txtDocId`).val();
        let prdDi = $(`#txtDcpId`).val();

        var par = `
                [{
                    "prdId" : "${prdId}",
                    "prdNm" : "${prdNm}",
                    "prdSk" : "${prdSk}",
                    "prdMd" : "${prdMd}",
                    "prdPr" : "${prdPr}",
                    "prdEn" : "${prdEn}",
                    "prdCd" : "${prdCd}",
                    "prdNp" : "${prdNp}",
                    "prdCm" : "${prdCm}",
                    "prdVs" : "${prdVs}",
                    "prdLv" : "${prdLv}",
                    "prdLn" : "${prdLn}",
                    "prdAs" : "${prdAs}",
                    "prdCt" : "${prdCt}",
                    "prdSb" : "${prdSb}",
                    "prdCn" : "${prdCn}",
                    "prdSv" : "${prdSv}",
                    "prdDc" : "${prdDc}",
                    "prdDi" : "${prdDi}"
                }]
            `;
        var pagina = 'Products/saveEdtProduct';
        var tipo = 'html';
        var selector = resEdtProduct;
        fillField(pagina, par, tipo, selector);
    }
}

function resEdtProduct(dt) {
    let prdId = dt.split('|')[0];
    let prdNm = $('#txtPrdName').val().replace(/\"/g, '°');
    let prdSk = $('#txtPrdSku').val();
    let prdPr = formato_numero($('#txtPrdPrice').val(), 2, '.', ',');
    let prdEn = $('#txtPrdEnglishName').val();
    let prdCm = $('#txtPrdComments').val();
    let prdLv = $('#txtPrdLevel').children('i').attr('data_val');
    let prdCt = $(`#txtCatId option:selected`).text();
    let prdSb = $(`#txtSbcId option:selected`).text();
    let prdCn = $(`#txtCinId option:selected`).val() == 0 ? '' : $(`#txtCinId option:selected`).text().split('-')[0];
    let prdSv = $(`#txtSrvId option:selected`).val() == 0 ? '' : $(`#txtSrvId option:selected`).text().split('-')[0];
    let prdDi = $(`#txtDocId option:selected`).val() == 0 ? '' : $(`#txtDocId option:selected`).val();

    let docInvo = `<span class="invoiceView" id="F${prdDi}"><i class="fas fa-file-alt"></i></span>`;
    let prdDc = prdDi == 0 ? '' : docInvo;
    prdLv = prdLv == '1' ? 'A' : 'P';

    let el = $(`#tblProducts tr[id="${prdId}"]`);
    $(el.find('td')[1]).text(prdSk);
    $(el.find('td')[2]).text(prdNm);
    $(el.find('td')[3]).text(prdPr);
    $(el.find('td')[5]).text(prdLv);
    $(el.find('td')[6]).text(prdSv);
    $(el.find('td')[7]).text(prdCn);
    $(el.find('td')[8]).html(prdDc);
    $(el.find('td')[9]).text(prdSb);
    $(el.find('td')[10]).text(prdCt);
    $(el.find('td')[11]).text(prdEn);
    $(el.find('td')[12]).text(prdCm);

    $('.btn_close').trigger('click');
    activeIcons();
}

function createNewProduct() {
    let prdNm = 'Nuevo producto';
    cleanProductsFields();

    $(`#txtCatId`).attr('disabled', false);
    $(`#txtSbcId`).attr('disabled', false);
    $('#ProductModal').removeClass('overlay_hide');
    $('#txtPrdVisibility').html('<i class="fas fa-check-square"></i>');
    $('.overlay_closer .title').html(prdNm);

    $('#tblEditProduct .checkbox i')
        .unbind('click')
        .on('click', function () {
            let itm = $(this);
            let itmId = itm.parents('div').attr('id');

            let itmCl = itm.attr('class').indexOf('fa-square');
            if (itmCl >= 0) {
                itm.removeAttr('class').addClass('fas fa-check-square');
                itm.attr('data_val', '1');
            } else {
                itm.removeAttr('class').addClass('far fa-square');
                itm.attr('data_val', '0');
            }
            let accr = $(this).attr('data_val');
            console.log(itmId, accr);

            if (itmId == 'txtPrdLevel' && accr == 1) {
                $(`#txtCatId`).val(20);
                $(`#txtSbcId`).val(142);
                $(`#txtCatId`).attr('disabled', true);
                $(`#txtSbcId`).attr('disabled', true);
            } else {
                $(`#txtCatId`).val(0);
                $(`#txtSbcId`).val(0);
                $(`#txtCatId`).attr('disabled', false);
                $(`#txtSbcId`).attr('disabled', false);
            }
        });

    $('#txtSbcId')
        .unbind('change')
        .on('change', function () {
            let catId = $(`#txtCatId`).val();
            let sbcId = $(this).val();
            console.log(catId, sbcId);
            sbcCode = subcategoriesGetCode(sbcId);

            sku2 = refil(sbcCode, 2);
            sku3 = '';
            sku4 = '';

            fillFieldSkuBox();
        });

    $('.btn_close')
        .unbind('click')
        .on('click', function () {
            $('.overlay_background').addClass('overlay_hide');
        });

    $('#btn_save')
        .unbind('click')
        .on('click', function () {
            saveNewProduct();
        });
}

function subcategoriesGetCode(sbcId) {
    let sbcCode = '';
    $.each(subs, function (v, u) {
        if (u.sbc_id == sbcId) {
            sbcCode = u.sbc_code;
        }
    });
    return sbcCode;
}

function fillFieldSkuBox() {
    sku3 = sku3 == '' ? '' : sku3;
    sku4 = sku4 == '' ? '' : '-' + sku4;
    $('#txtPrdSku').val(sku1 + sku2 + sku3 + sku4);
}

function saveNewProduct() {
    let ky = validatorProductsFields();
    if (ky == 0) {
        let prdId = '0';
        let prdNm = $('#txtPrdName').val().replace(/\"/g, '°');
        let prdSk = $('#txtPrdSku').val();
        let prdMd = $('#txtPrdModel').val();
        let prdPr = $('#txtPrdPrice').val();
        let prdEn = $('#txtPrdEnglishName').val();
        let prdCd = $('#txtPrdCodeProvider').val();
        let prdNp = $('#txtPrdNameProvider').val();
        let prdCm = $('#txtPrdComments').val();
        let prdVs = $('#txtPrdVisibility').children('i').attr('data_val');
        let prdLv = $('#txtPrdLevel').children('i').attr('data_val');
        prdLv = prdLv == '1' ? 'A' : 'P';
        let prdLn = $('#txtPrdLonely').children('i').attr('data_val');
        let prdAs = $('#txtPrdAssured').children('i').attr('data_val');
        let prdCt = $(`#txtCatId`).val();
        let prdSb = $(`#txtSbcId`).val();
        let prdCn = $(`#txtCinId`).val();
        let prdSv = $(`#txtSrvId`).val();
        let prdDc = $(`#txtDocId`).val();
        let prdDi = $(`#txtDcpId`).val();

        var par = `
                [{
                    "prdId" : "${prdId}",
                    "prdNm" : "${prdNm}",
                    "prdSk" : "${prdSk}",
                    "prdMd" : "${prdMd}",
                    "prdPr" : "${prdPr}",
                    "prdEn" : "${prdEn}",
                    "prdCd" : "${prdCd}",
                    "prdNp" : "${prdNp}",
                    "prdCm" : "${prdCm}",
                    "prdVs" : "${prdVs}",
                    "prdLv" : "${prdLv}",
                    "prdLn" : "${prdLn}",
                    "prdAs" : "${prdAs}",
                    "prdCt" : "${prdCt}",
                    "prdSb" : "${prdSb}",
                    "prdCn" : "${prdCn}",
                    "prdSv" : "${prdSv}",
                    "prdDc" : "${prdDc}",
                    "prdDi" : "${prdDi}"
                }]
            `;
        console.log(par);
        var pagina = 'Products/saveNewProduct';
        var tipo = 'html';
        var selector = resNewProduct;
        fillField(pagina, par, tipo, selector);
    }
}
function resNewProduct(dt) {
    console.log(dt);
    $('#txtCategoryList').val(dt).trigger('change');
    $('.btn_close').trigger('click');
}

function cleanProductsFields() {
    $('.textbox').val('');
    $('td.data select').val(0);
    $('td.data .checkbox').html('<i class="far fa-square" data_val="0"></i>');
    $('.required').removeClass('fail').parent().children('.fail_note').addClass('hide');
}

function validatorProductsFields() {
    let ky = 0;

    $('.required').each(function () {
        if ($(this).val() == '' || $(this).val() == 0) {
            ky = 1;
            $(this).addClass('fail').parent().children('.fail_note').removeClass('hide');
        }
    });
    console.log(ky);
    inactiveFocus();
    return ky;
}

function inactiveFocus() {
    $('.required')
        .unbind('focus')
        .on('focus', function () {
            $(this).removeClass('fail').parent().children('.fail_note').addClass('hide');
        });
}

function getSeries(prdId) {
    var pagina = 'Products/listSeries';
    var par = `[{"prdId":"${prdId}"}]`;
    var tipo = 'json';
    var selector = putSeries;
    fillField(pagina, par, tipo, selector);
}

/** +++++  Abre el modal y coloca los seriales de cada producto */
function putSeries(dt) {
    $('#SerieModal').removeClass('overlay_hide');

    $('#tblSerialList').DataTable({
        destroy: true,
        order: [[2, 'desc']],
        lengthMenu: [
            [20, 50, 100, -1],
            [20, 50, 100, 'Todos'],
        ],
        pagingType: 'simple_numbers',
        language: {
            url: 'app/assets/lib/dataTable/spanish.json',
        },
        scrollY: 'calc(100vh - 290px)',
        scrollX: true,
        fixedHeader: true,
        columns: [
            {data: 'sermodif', class: 'edit'},
            {data: 'produsku', class: 'sku'},
            {data: 'serlnumb', class: 'product-name'},
            {data: 'dateregs', class: 'sku'},
            {data: 'cvstatus', class: 'code-type_s'},
            {data: 'cvestage', class: 'code-type_s'},
            {data: 'typeprod', class: 'code-type_s'},
            {data: 'serqntty', class: 'quantity'},
            {data: 'serstore', class: 'catalog'},
            {data: 'comments', class: 'comments'},
        ],
    });

    $('.btn_close')
        .unbind('click')
        .on('click', function () {
            $('.overlay_background').addClass('overlay_hide');
        });

    build_modal_serie(dt);
}

/** +++++  Coloca los seriales en la tabla de seriales */
function build_modal_serie(dt) {
    let tabla = $('#tblSerialList').DataTable();

    $('.overlay_closer .title').html(`${dt[0].prd_sku} - ${dt[0].prd_name}`);
    tabla.rows().remove().draw();
    $.each(dt, function (v, u) {
        tabla.row
            .add({
                sermodif: `<i class='fas fa-pen serie modif' id="E${u.ser_id}"></i><i class="fas fa-times-circle serie kill" id="K${u.ser_id}"></i>`,
                produsku: `<span class="hide-support">${u.ser_id}</span>${u.ser_sku.slice(0, 7)}-${u.ser_sku.slice(7, 11)}`,
                serlnumb: u.ser_serial_number,
                dateregs: u.ser_date_registry,
                cvstatus: u.ser_situation,
                cvestage: u.ser_stage,
                typeprod: u.comportamiento,
                comments: u.comments,
                serqntty: u.stp_quantity,
                serstore: u.str_name,
            })
            .draw();
    });

    $('.serie.modif')
        .unbind('click')
        .on('click', function () {
            let serId = $(this).attr('id');

            //  $('#ModifySerieModal').removeClass('overlay_hide');
        });
    $('.serie.kill')
        .unbind('click')
        .on('click', function () {
            console.log('Elimina serie');
        });
}
