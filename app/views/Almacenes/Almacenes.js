var table = null;
var positionRow = 0;

$(document).ready(function () {
   verifica_usuario();
   inicial();
});

function inicial() {
   getAlmacenesTable();
   getEncargadoAlmacen();
   //Open modal *
   $('#nuevoAlmacen').on('click', function () {
      LimpiaModal();
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

   $('#LimpiarFormulario').on('click', function () {
      LimpiaModal();
   });

   $('#AlmacenesTable tbody').on('click', 'tr', function () {
      positionRow = table.page.info().page * table.page.info().length + $(this).index();

      setTimeout(() => {
         RenglonesSelection = table.rows({selected: true}).count();
         if (RenglonesSelection == 0 || RenglonesSelection == 1) {
            $('.btn-apply').css('visibility', 'hidden');
         } else {
            $('.btn-apply').css('visibility', 'visible');
         }
      }, 10);
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
   $('#titulo').text('Editar almacen');

   var location = 'Almacenes/GetAlmacen';
   $.ajax({
      type: 'POST',
      dataType: 'JSON',
      data: {id: id},
      url: location,
      success: function (respuesta) {
         $('#IdAlmacen').val(respuesta.str_id);
         $('#NomAlmacen').val(respuesta.str_name);
         $('#selectTipoAlmacen').val(respuesta.str_type);
         getEncargadoAlmacen(respuesta.emp_id); 
      },
      error: function (EX) {
         console.log(EX);
      },
   }).done(function () {});
}
//confirm para borrar **
function ConfirmDeletAlmacen(id) {
   //UnSelectRowTable();
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
            var arrayAlmacen = IdAlmacen.split(',');
            if (arrayAlmacen.length == 1) {
               table
                  .row(':eq(' + positionRow + ')')
                  .remove()
                  .draw();
            } else {
               table.rows({selected: true}).remove().draw();
            }
            $('#BorrarAlmacenModal').modal('hide');
         }
         LimpiaModal();
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
   var EncargadoAlmacen = $('#selectRowEncargado option:selected').attr('id');
   var Encargado = $('#selectRowEncargado option:selected').text();


   $.ajax({
      type: 'POST',
      dataType: 'JSON',
      data: {
         IdAlmacen: IdAlmacen,
         NomAlmacen: NomAlmacen,
         tipoAlmacen: tipoAlmacen,
         EncargadoAlmacen: EncargadoAlmacen
      },
      url: location,
      success: function (respuesta) {
         if (IdAlmacen != '') {
            table
               .row(':eq(' + positionRow + ')')
               .remove()
               .draw();
         }
         if (respuesta != 0) {
            //getAlmacenesTable();
            var rowNode = table.row
               .add({
                  [0]:
                     '<button onclick="EditAlmacen(' +
                     respuesta +
                     ')" type="button" class="btn btn-default btn-icon-edit" aria-label="Left Align"><i class="fas fa-pen modif"></i></button><button onclick="ConfirmDeletAlmacen(' +
                     respuesta +
                     ')" type="button" class="btn btn-default btn-icon-delete" aria-label="Left Align"><i class="fas fa-times-circle kill"></i></button>',
                  [1]: respuesta,
                  [2]: NomAlmacen,
                  [3]: Encargado,
                  [4]: EncargadoAlmacen,
                  [5]: tipoAlmacen,
               })
               .draw()
               .node();
            $(rowNode).find('td').eq(0).addClass('edit');
            $(rowNode).find('td').eq(1).addClass('text-center');
            $(rowNode).find('td').eq(4).attr("hidden",true);
            LimpiaModal();
         }
      },
      error: function (EX) {
         console.log(EX);
      },
   }).done(function () {});
}

//Limpia datos en modal  **
function LimpiaModal() {
   $('#titulo').text('Nuevo Almacen');
   $('#NomAlmacen').val('');
   $('#IdAlmacen').val('');
   $('#selectTipoAlmacen').val('0');
   getEncargadoAlmacen();
   $('#formProveedor').removeClass('was-validated');
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
               row.emp_fullname +
               '</td>' +
               '<td hidden>' +
               row.emp_id +
               '</td>' +
               '<td>' +
               row.str_type +
               '</td>' +
               '</tr>';
            $('#tablaAlmacenesRow').append(renglon);
         });

         let title = 'Almacenes';
         let filename = title.replace(/ /g, '_') + '-' + moment(Date()).format('YYYYMMDD');

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
                  text: '<button class="btn btn-pdf"><i class="fas fa-file-pdf"></i></button>',
               },
               {
                  extend: 'excel',
                  footer: true,
                  title: title,
                  filename: filename,
                  //   className: 'btnDatableAdd',
                  text: '<button class="btn btn-excel"><i class="fas fa-file-excel"></i></button>',
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
                  text: 'Borrar seleccionados',
                  className: 'btn-apply hidden-field',
                  action: function () {
                     var selected = table.rows({selected: true}).data();
                     var idSelected = '';
                     selected.each(function (index) {
                        idSelected += index[1] + ',';
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
            scrollY: 'calc(100vh - 280px)',
            scrollX: true,
            // scrollCollapse: true,
            paging: true,
            pagingType: 'simple_numbers',
            fixedHeader: true,
            language: {
               url: './app/assets/lib/dataTable/spanish.json',
            },
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

// Optiene los usuarios disponibles para encargados *
function getEncargadoAlmacen(id) {
   $('#selectRowEncargado').html("");
   var location = 'Almacenes/GetEncargadosAlmacen';
   $.ajax({
      type: 'POST',
      dataType: 'JSON',
      data: {id: id},
      url: location,
      success: function (respuesta) {
         var renglon = "<option id='0'  value=''>Seleccione un Encargado...</option> ";
         respuesta.forEach(function (row, index) {
            renglon += '<option id=' + row.emp_id + '  value="' + row.emp_id + '">' + row.emp_fullname + '</option> ';
         });
         $('#selectRowEncargado').append(renglon);
         if (id != undefined) {
            $("#selectRowEncargado option[value='" + id + "']").attr('selected', 'selected');
         }
      },
      error: function () {},
   }).done(function () {});
}