var table = null;
$(document).ready(function () {
   verifica_usuario();
   inicial();
});

function inicial() {
   getProductosTable();
   //Open modal *
   $('#nuevoProducto').on('click', function () {
      LimpiaModal();
      getCategorias();
      getServicios(0);
      getProveedores();
      getAlmacenes();
      $('#formSubCategorias').removeClass('was-validated');
   });
   //Guardar almacen *
   $('#GuardarCategoria').on('click', function () {
      if (validaFormulario() == 1) {
         SaveProducto();
      }
   });
   //borra almacen +
   $('#BorrarSubCategoria').on('click', function () {
      DeletProducto();
   });

   $('#selectRowCategorias').change(function () {
      var idCategoria = $('#selectRowCategorias option:selected').attr('id');
      getSubCategorias(0, idCategoria);
   });
}

//Valida los campos seleccionado *
function validaFormulario() {
   var valor = 1;
   var forms = document.querySelectorAll('.needs-validation');
   Array.prototype.slice.call(forms).forEach(function (form) {
      if (!form.checkValidity()) {
         form.classList.add('was-validated');
         valor = 0;
      }
   });
   return valor;
}

//Edita el Proveedores *
function EditProducto(
   id,
   idCategoria,
   idSubCategoria,
   idServicio,
   idAlmacen,
   idTipoMoneda,
   idProveedor,
   idVisible,
   idStoreProducto
) {
   UnSelectRowTable();
   LimpiaModal();
   var location = 'productos/GetProducto';
   $.ajax({
      type: 'POST',
      dataType: 'JSON',
      data: { id: id },
      url: location,
      success: function (respuesta) {
         $('#NomProducto').val(respuesta.prd_name);
         $('#IdProducto').val(respuesta.prd_id);
         $('#idStoreProducto').val(idStoreProducto);

         $('#NomEngProducto').val(respuesta.prd_english_name);
         $('#ModelProducto').val(respuesta.prd_model);
         $('#SerieProducto').val(respuesta.prd_serial_number);
         $('#CostProducto').val(respuesta.prd_cost);
         $('#PriceProducto').val(respuesta.prd_price);
         $('#SkuProducto').val(respuesta.prd_sku);
         $('#DesProducto').val(respuesta.prd_comments);

         getCategorias(idCategoria);
         getSubCategorias(idSubCategoria, idCategoria);
         getProveedores(idProveedor);
         getServicios(idServicio);
         getAlmacenes(idAlmacen);
         $("#selectMonedaProducto option[id='" + idTipoMoneda + "']").attr(
            'selected',
            'selected'
         );
         if (idVisible == 1) {
            $('#checkProducto').prop('checked', true);
         } else {
            $('#checkProducto').prop('checked', false);
         }

         $('#ProductoModal').modal('show');
      },
      error: function (EX) {
         console.log(EX);
      },
   }).done(function () {});
}
//confirm para borrar **
function ConfirmDeletProducto(id) {
   UnSelectRowTable();
   $('#BorrarProductoModal').modal('show');
   $('#IdProductoBorrar').val(id);
}

function UnSelectRowTable() {
   setTimeout(() => {
      table.rows().deselect();
   }, 10);
}

//BORRAR  * *
function DeletProducto() {
   var location = 'productos/DeleteProducto';
   IdProducto = $('#IdProductoBorrar').val();
   $.ajax({
      type: 'POST',
      dataType: 'JSON',
      data: {
         IdProducto: IdProducto,
      },
      url: location,
      success: function (respuesta) {
         if ((respuesta = 1)) {
            getProductosTable();
            $('#BorrarProductoModal').modal('hide');
         }
      },
      error: function (EX) {
         console.log(EX);
      },
   }).done(function () {});
}

//Guardar Almacen **
function SaveProducto() {
   var location = 'productos/SaveProductos';
   var IdProducto = $('#IdProducto').val();
   var NomProducto = $('#NomProducto').val();
   var NomEngProducto = $('#NomEngProducto').val();
   var ModelProducto = $('#ModelProducto').val();
   var SerieProducto = $('#SerieProducto').val();
   var CostProducto = $('#CostProducto').val();
   var PriceProducto = $('#PriceProducto').val();
   var SkuProducto = $('#SkuProducto').val();
   var DesProducto = $('#DesProducto').val();
   var idStoreProducto = $('#idStoreProducto').val();

   var idSubCategoria = $('#selectRowSubCategorias option:selected').attr('id');
   var idTipeService = $('#selectRowService option:selected').attr('id');
   var idProveedor = $('#selectRowProovedores option:selected').attr('id');
   var idMoneda = $('#selectMonedaProducto option:selected').attr('id');
   var idAlmacen = $('#selectRowAlmacen option:selected').attr('id');

   var visible = 0;
   if ($('#checkProducto').prop('checked')) {
      visible = 1;
   }

   $.ajax({
      type: 'POST',
      dataType: 'JSON',
      data: {
         IdProducto: IdProducto,
         NomProducto: NomProducto,
         NomEngProducto: NomEngProducto,
         SerieProducto: SerieProducto,
         CostProducto: CostProducto,
         ModelProducto: ModelProducto,
         PriceProducto: PriceProducto,
         SkuProducto: SkuProducto,
         DesProducto: DesProducto,
         idSubCategoria: idSubCategoria,
         idTipeService: idTipeService,
         idProveedor: idProveedor,
         idMoneda: idMoneda,
         visible: visible,
         idAlmacen: idAlmacen,
         idStoreProducto: idStoreProducto,
      },
      url: location,
      success: function (respuesta) {
         if ((respuesta = 1)) {
            getProductosTable();
            $('#ProductoModal').modal('hide');
         }
      },
      error: function (EX) {
         console.log(EX);
      },
   }).done(function () {});
}

//Limpia datos en modal  **
function LimpiaModal() {
   $('#NomProducto').val('');
   $('#IdProducto').val('');
   $('#NomEngProducto').val('');
   $('#ModelProducto').val('');
   $('#SerieProducto').val('');
   $('#CostProducto').val('');
   $('#PriceProducto').val('');
   $('#SkuProducto').val('');
   $('#DesProducto').val('');
   $('#selectRowSubCategorias').html('');
   $('#selectMonedaProducto').val('0');
   $('#checkProducto').prop('checked', true);
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
         var renglon =
            "<option id='0'  value=''>Seleccione una categoria...</option> ";
         respuesta.forEach(function (row, index) {
            renglon +=
               '<option id=' +
               row.cat_id +
               '  value="">' +
               row.cat_name +
               '</option> ';
         });
         $('#selectRowCategorias').append(renglon);
         if (id != '') {
            $("#selectRowCategorias option[id='" + id + "']").attr(
               'selected',
               'selected'
            );
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
      data: { id: id, idCategoria: idCategoria },
      url: location,
      success: function (respuesta) {
         var renglon =
            "<option id='0'  value=''>Seleccione una Subcategoria...</option> ";
         respuesta.forEach(function (row, index) {
            renglon +=
               '<option id=' +
               row.sbc_id +
               '  value="">' +
               row.sbc_name +
               '</option> ';
         });
         $('#selectRowSubCategorias').append(renglon);
         if (idCategoria != '') {
            $("#selectRowSubCategorias option[id='" + id + "']").attr(
               'selected',
               'selected'
            );
         }
      },
      error: function () {},
   }).done(function () {});
}

// Optiene las Servicios *
function getServicios(id) {
   $('#selectRowService').html('');
   var location = 'servicios/GetServicios';
   $.ajax({
      type: 'POST',
      dataType: 'JSON',
      url: location,
      success: function (respuesta) {
         var renglon =
            "<option id='0'  value=''>Seleccione un tipo Servicio...</option> ";
         respuesta.forEach(function (row, index) {
            renglon +=
               '<option id=' +
               row.srv_id +
               '  value="">' +
               row.srv_name +
               '</option> ';
         });
         $('#selectRowService').append(renglon);

         if (id != '') {
            $("#selectRowService option[id='" + id + "']").attr(
               'selected',
               'selected'
            );
         }
      },
      error: function () {},
   }).done(function () {});
}

// Optiene las proveedores *
function getProveedores(id) {
   $('#selectRowProovedores').html('');
   var location = 'proveedores/GetProveedores';
   $.ajax({
      type: 'POST',
      dataType: 'JSON',
      url: location,
      success: function (respuesta) {
         var renglon =
            "<option id='0'  value=''>Seleccione un Proveedor...</option> ";
         respuesta.forEach(function (row, index) {
            renglon +=
               '<option id=' +
               row.sup_id +
               '  value="">' +
               row.sup_buseiness_name +
               '</option> ';
         });
         $('#selectRowProovedores').append(renglon);

         if (id != '') {
            $("#selectRowProovedores option[id='" + id + "']").attr(
               'selected',
               'selected'
            );
         }
      },
      error: function () {},
   }).done(function () {});
}

// Optiene las proveedores *
function getAlmacenes(id) {
   $('#selectRowAlmacen').html('');
   var location = 'almacenes/GetAlmacenes';
   $.ajax({
      type: 'POST',
      dataType: 'JSON',
      url: location,
      success: function (respuesta) {
         var renglon =
            "<option id='0'  value=''>Seleccione un Almacen...</option> ";
         respuesta.forEach(function (row, index) {
            renglon +=
               '<option id=' +
               row.str_id +
               '  value="">' +
               row.str_name +
               '</option> ';
         });
         $('#selectRowAlmacen').append(renglon);
         if (id != '') {
            $("#selectRowAlmacen option[id='" + id + "']").attr(
               'selected',
               'selected'
            );
         }
      },
      error: function () {},
   }).done(function () {});
}

//obtiene la informacion de tabla Proveedores *
function getProductosTable() {
   var location = 'productos/GetProductos';
   $('#ProductosTable').DataTable().destroy();
   $('#tablaProductosRow').html('');

   $.ajax({
      type: 'POST',
      dataType: 'JSON',
      url: location,
      _success: function (respuesta) {
         var renglon = '';
         respuesta.forEach(function (row, index) {
            renglon =
               '<tr>' +
               '<td class="text-center"> ' +
               '<button onclick="EditProducto(' +
               row.prd_id +
               ',' +
               row.cat_id +
               ',' +
               row.sbc_id +
               ',' +
               row.srv_id +
               ',' +
               row.str_id +
               ',' +
               row.prd_coin_type +
               ',' +
               row.sup_id +
               ',' +
               row.prd_visibility +
               ',' +
               row.stp_id +
               ')" type="button" class="btn btn-default btn-icon-edit" aria-label="Left Align"><i class="fas fa-pen"></i></button>' +
               '<button onclick="ConfirmDeletProducto(' +
               row.prd_id +
               ')" type="button" class="btn btn-default btn-icon-delete" aria-label="Left Align"><i class="fas fa-trash"></i></button>' +
               '</td>' +
               "<td class='dtr-control'>" +
               row.prd_id +
               '</td>' +
               '<td>' +
               row.prd_name +
               '</td>' +
               '<td>' +
               row.prd_english_name +
               '</td>' +
               '<td>' +
               row.prd_sku +
               '</td>' +
               '<td>' +
               row.prd_model +
               '</td>' +
               '<td>' +
               row.prd_serial_number +
               '</td>' +
               '<td>' +
               row.prd_cost +
               '</td>' +
               '<td>' +
               row.prd_price +
               '</td>' +
               '<td>' +
               row.prd_comments +
               '</td>' +
               '<td>' +
               row.srv_name +
               '</td>' +
               '<td>' +
               row.cat_name +
               '</td>' +
               '<td>' +
               row.sbc_name +
               '</td>' +
               '<td>' +
               row.str_name +
               '</td>' +
               '</tr>';
            $('#tablaProductosRow').append(renglon);
         });

         let title = 'Productos';
         let filename =
            title.replace(/ /g, '_') + '-' + moment(Date()).format('YYYYMMDD');

         table = $('#ProductosTable').DataTable({
            order: [[2, 'asc']],
            select: {
               style: 'multi',
               info: false,
            },
            lengthMenu: [
               [10, 50, 100, -1],
               ['10', '25', '50', 'Todo'],
            ],
            dom: 'Blfrtip',
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
                  text: 'Borrar seleccionados',
                  className: 'btn-apply',
                  action: function () {
                     var selected = table.rows({ selected: true }).data();
                     var idSelected = '';
                     selected.each(function (index) {
                        idSelected += index[0] + ',';
                     });
                     idSelected = idSelected.slice(0, -1);
                     if (idSelected != '') {
                        ConfirmDeletProducto(idSelected);
                     }
                  },
               },
            ],
            // columnDefs: [
            //    { responsivePriority: 1, targets: 0 },
            //    { responsivePriority: 2, targets: -1 },
            // ],
            scrollY: 'calc(100vh - 260px)',
            scrollX: true,
            // scrollCollapse: true,
            paging: true,
            pagingType: 'simple_numbers',
            fixedHeader: true,
            language: {
               url: './app/assets/lib/dataTable/spanish.json',
            },
         });

         $('#ProductosTable tbody').on('click', 'tr', function () {
            setTimeout(() => {
               RenglonesSelection = table.rows({ selected: true }).count();
               if (RenglonesSelection == 0 || RenglonesSelection == 1) {
                  $('.btnDatableAddRed').css('visibility', 'hidden');
               } else {
                  $('.btnDatableAddRed').css('visibility', 'visible');
               }
            }, 10);
         });
      },
      get success() {
         return this._success;
      },
      set success(value) {
         this._success = value;
      },
      error: function () {},
   }).done(function () {});
}
