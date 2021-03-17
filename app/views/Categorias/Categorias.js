var table = null;
$(document).ready(function () {
   verifica_usuario();
   inicial();
});

function inicial() {
   getCategoriasTable();
   //Open modal *
   $('#nuevaCategoria').on('click', function () {
      LimpiaModal();
      $('#formCategorias').removeClass('was-validated');
   });
   //Guardar almacen *
   $('#GuardarCategoria').on('click', function () {
      if (validaFormulario() == 1) {
         SaveCategoria();
      }
   });
   //borra almacen +
   $('#BorrarProveedor').on('click', function () {
      DeletCategoria();
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
function EditCategoria(id) {
   UnSelectRowTable();
   LimpiaModal();
   var location = 'Categorias/GetCategoria';
   $.ajax({
      type: 'POST',
      dataType: 'JSON',
      data: { id: id },
      url: location,
      success: function (respuesta) {
         $('#NomCategoria').val(respuesta.cat_name);
         $('#IdCategoria').val(respuesta.cat_id);
         $('#CategoriaModal').modal('show');
      },
      error: function (EX) {
         console.log(EX);
      },
   }).done(function () {});
}
//confirm para borrar **
function ConfirmDeletCategoria(id) {
   UnSelectRowTable();
   $('#BorrarCategoriaModal').modal('show');
   $('#IdCategoriaBorrar').val(id);
}

function UnSelectRowTable() {
   setTimeout(() => {
      table.rows().deselect();
   }, 10);
}

//BORRAR  * *
function DeletCategoria() {
   var location = 'Categorias/DeleteCategoria';
   IdCategoria = $('#IdCategoriaBorrar').val();
   $.ajax({
      type: 'POST',
      dataType: 'JSON',
      data: {
         IdCategoria: IdCategoria,
      },
      url: location,
      success: function (respuesta) {
         if ((respuesta = 1)) {
            getCategoriasTable();
            $('#BorrarCategoriaModal').modal('hide');
         }
      },
      error: function (EX) {
         console.log(EX);
      },
   }).done(function () {});
}

//Guardar Almacen **
function SaveCategoria() {
   var location = 'Categorias/SaveCategoria';
   var IdCategoria = $('#IdCategoria').val();
   var NomCategoria = $('#NomCategoria').val();
   $.ajax({
      type: 'POST',
      dataType: 'JSON',
      data: { IdCategoria: IdCategoria, NomCategoria: NomCategoria },
      url: location,
      success: function (respuesta) {
         if ((respuesta = 1)) {
            getCategoriasTable();
            $('#CategoriaModal').modal('hide');
         }
      },
      error: function (EX) {
         console.log(EX);
      },
   }).done(function () {});
}

//Limpia datos en modal  **
function LimpiaModal() {
   $('#NomCategoria').val('');
   $('#IdCategoria').val('');
   $('#selectTipoAlmacen').val('0');
}

//obtiene la informacion de tabla Proveedores *
function getCategoriasTable() {
   var location = 'Categorias/GetCategorias';
   $('#CategoriasTable').DataTable().destroy();
   $('#tablaCategoriasRow').html('');

   $.ajax({
      type: 'POST',
      dataType: 'JSON',
      url: location,
      _success: function (respuesta) {
         console.log(respuesta);
         var renglon = '';
         respuesta.forEach(function (row, index) {
            renglon =
               '<tr>' +
               '<td class="text-center edit"> ' +
               '<button onclick="EditCategoria(' +
               row.cat_id +
               ')" type="button" class="btn btn-default btn-icon-edit" aria-label="Left Align"><i class="fas fa-pen modif"></i></button>' +
               '<button onclick="ConfirmDeletCategoria(' +
               row.cat_id +
               ')" type="button" class="btn btn-default btn-icon-delete" aria-label="Left Align"><i class="fas fa-times-circle kill"></i></button>' +
               '</td>' +
               "<td class='dtr-control'>" +
               row.cat_id +
               '</td>' +
               '<td>' +
               row.cat_name +
               '</td>' +
               '</tr>';
            $('#tablaCategoriasRow').append(renglon);
         });

         let title = 'Catalogos';
         let filename =
            title.replace(/ /g, '_') + '-' + moment(Date()).format('YYYYMMDD');

         table = $('#CategoriasTable').DataTable({
            order: [[1, 'asc']],
            select: {
               style: 'multi',
               info: false,
            },
            lengthMenu: [
               [10, 25, 50, 100, -1],
               ['10', '25', '50', 'Todo'],
            ],
            dom: 'Blfrtip',
            buttons: [
               {
                  extend: 'pdf',
                  filename: filename,
                  text:
                     '<button class="btn btn-pdf"><i class="fas fa-file-pdf"></i></button>',
               },
               {
                  extend: 'excel',
                  filename: filename,
                  text:
                     '<button class="btn btn-excel"><i class="fas fa-file-excel"></i></button>',
               },
               ,
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
                        ConfirmDeletCategoria(idSelected);
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

         $('#CategoriasTable tbody').on('click', 'tr', function () {
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
