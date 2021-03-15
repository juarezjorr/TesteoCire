var table = null;

$(document).ready(function () {
   verifica_usuario();
   inicial();
});

function inicial() {
   getAlmacenesTable();
   //Open modal *
   $('#nuevoAlmacen').on('click', function () {
      LimpiaModal();
      $('#formProveedor').removeClass('was-validated');
   });
   //Guardar almacen *
   $('#GuardarAlmacen').on('click', function () {
      if (validaFormulario() == 1) {
         SaveAlmacen();
      }
   });
   //borra almacen +
   $('#BorrarProveedor').on('click', function () {
      DeletAlmacen();
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
function EditAlmacen(id) {
   UnSelectRowTable();
   LimpiaModal();
   var location = 'Almacenes/GetAlmacen';
   $.ajax({
      type: 'POST',
      dataType: 'JSON',
      data: { id: id },
      url: location,
      success: function (respuesta) {
         console.log(respuesta);
         $('#NomAlmacen').val(respuesta.str_name);
         $('#IdAlmacen').val(respuesta.str_id);
         $("#selectTipoAlmacen option[id='" + respuesta.str_type + "']").attr(
            'selected',
            'selected'
         );
         $('#AlmacenModal').modal('show');
      },
      error: function (EX) {
         console.log(EX);
      },
   }).done(function () {});
}
//confirm para borrar **
function ConfirmDeletAlmacen(id) {
   UnSelectRowTable();
   $('#BorrarAlmacenModal').modal('show');
   $('#IdAlmacenBorrar').val(id);
}

function UnSelectRowTable() {
   setTimeout(() => {
      table.rows().deselect();
   }, 10);
}

//BORRAR  * *
function DeletAlmacen() {
   var location = 'Almacenes/DeleteAlmacen';
   IdAlmacen = $('#IdAlmacenBorrar').val();
   $.ajax({
      type: 'POST',
      dataType: 'JSON',
      data: {
         IdAlmacen: IdAlmacen,
      },
      url: location,
      success: function (respuesta) {
         if ((respuesta = 1)) {
            getAlmacenesTable();
            $('#BorrarAlmacenModal').modal('hide');
         }
      },
      error: function (EX) {
         console.log(EX);
      },
   }).done(function () {});
}

//Guardar Almacen **
function SaveAlmacen() {
   var location = 'Almacenes/SaveAlmacen';
   var IdAlmacen = $('#IdAlmacen').val();
   var NomAlmacen = $('#NomAlmacen').val();
   var tipoAlmacen = $('#selectTipoAlmacen option:selected').attr('id');
   $.ajax({
      type: 'POST',
      dataType: 'JSON',
      data: {
         IdAlmacen: IdAlmacen,
         NomAlmacen: NomAlmacen,
         tipoAlmacen: tipoAlmacen,
      },
      url: location,
      success: function (respuesta) {
         if ((respuesta = 1)) {
            getAlmacenesTable();
            $('#AlmacenModal').modal('hide');
         }
      },
      error: function (EX) {
         console.log(EX);
      },
   }).done(function () {});
}

//Limpia datos en modal  **
function LimpiaModal() {
   $('#NomAlmacen').val('');
   $('#IdAlmacen').val('');
   $('#selectTipoAlmacen').val('0');
}

//obtiene la informacion de tabla Proveedores *
function getAlmacenesTable() {
   var location = 'Almacenes/GetAlmacenes';
   $('#AlmacenesTable').DataTable().destroy();
   $('#tablaAlmacenesRow').html('');

   $.ajax({
      type: 'POST',
      dataType: 'JSON',
      url: location,
      _success: function (respuesta) {
         var renglon = '';
         respuesta.forEach(function (row, index) {
            renglon =
               '<tr>' +
              
               '<td class="text-center edit"> ' +
               '<button onclick="EditAlmacen(' +
               row.str_id +
               ')" type="button" class="btn btn-default btn-icon-edit" aria-label="Left Align"><i class="fas fa-pen modif"></i></button>' +
               '<button onclick="ConfirmDeletAlmacen(' +
               row.str_id +
               ')" type="button" class="btn btn-default btn-icon-delete" aria-label="Left Align"><i class="fas fa-times-circle kill"></i></button>' +
               '</td>' +
               "<td class='dtr-control text-center'>" +
               row.str_id +
               '</td>' +
               '<td>' +
               row.str_name +
               '</td>' +
               '<td>' +
               row.str_type +
               '</td>' +
               
               '</tr>';
            $('#tablaAlmacenesRow').append(renglon);
         });

         let title = 'Almacenes';
         let filename =
            title.replace(/ /g, '_') + '-' + moment(Date()).format('YYYYMMDD');

         table = $('#AlmacenesTable').DataTable({
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
                  footer: true,
                  title: title,
                  filename: filename,
                  //   className: 'btnDatableAdd',
                  text:
                     '<button class="btn btn-pdf"><i class="fas fa-file-pdf"></i></button>',
               },
               {
                  extend: 'excel',
                  footer: true,
                  title: title,
                  filename: filename,
                  //   className: 'btnDatableAdd',
                  text:
                     '<button class="btn btn-excel"><i class="fas fa-file-excel"></i></button>',
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
                        ConfirmDeletAlmacen(idSelected);
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

         $('#AlmacenesTable tbody').on('click', 'tr', function () {
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
