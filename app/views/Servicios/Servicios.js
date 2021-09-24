var table = null;
var positionRow = 0;

$(document).ready(function () {
   verifica_usuario();
   inicial();
});

function inicial() {
   getServiciosTable(0);
   //Open modal *
   $('#nuevoServicios').on('click', function () {
      LimpiaModal();
      $('#formServicios').removeClass('was-validated');
   });
   //Guardar almacen *
   $('#GuardarServicio').on('click', function () {
      if (validaFormulario() == 1) {
         SaveServicios();
      }
   });
   //borra almacen +
   $('#BorrarServicio').on('click', function () {
      DeletServicio();
   });

   $('#LimpiarFormulario').on('click', function () {
      LimpiaModal();
   });

   $('#ServiciosTable tbody').on('click', 'tr', function () {
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
function EditServicios(id) {
   $('#titulo').text('Edita Servicio');

   UnSelectRowTable();
   LimpiaModal();
   var location = 'Servicios/GetServicio';
   $.ajax({
      type: 'POST',
      dataType: 'JSON',
      data: {id: id},
      url: location,
      success: function (respuesta) {
        
         $('#NomServicio').val(respuesta.srv_name);
         $('#IdServicio').val(respuesta.srv_id);
         $('#DesServicio').val(respuesta.srv_description);

         $('#ServiciosModal').modal('show');
      },
      error: function (EX) {
         console.log(EX);
      },
   }).done(function () {});
}
//confirm para borrar **
function ConfirmDeletServicio(id) {
   //UnSelectRowTable();
   $('#BorrarServiciosModal').modal('show');
   $('#IdServicioBorrar').val(id);
}

function UnSelectRowTable() {
   setTimeout(() => {
      table.rows().deselect();
   }, 10);
}

//BORRAR  * *
function DeletServicio() {
   var location = 'Servicios/DeleteServicio';
   IdServicio = $('#IdServicioBorrar').val();
   $.ajax({
      type: 'POST',
      dataType: 'JSON',
      data: {
         IdServicio: IdServicio,
      },
      url: location,
      success: function (respuesta) {
         if ((respuesta = 1)) {
            getServiciosTable(0);
            $('#BorrarServiciosModal').modal('hide');
         }
      },
      error: function (EX) {
         console.log(EX);
      },
   }).done(function () {});
}

//Guardar Almacen **
function SaveServicios() {
   var location = 'Servicios/SaveServicios';
   var IdServicio = $('#IdServicio').val();
   var NomServicio = $('#NomServicio').val();
   var DesServicio = $('#DesServicio').val();

   $.ajax({
      type: 'POST',
      dataType: 'JSON',
      data: {IdServicio: IdServicio, NomServicio: NomServicio, DesServicio: DesServicio},
      url: location,
      success: function (respuesta) {
         if (IdServicio != '') {
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
                     '<button onclick="EditServicios(' +
                     respuesta +
                     ')" type="button" class="btn btn-default btn-icon-edit" aria-label="Left Align"><i class="fas fa-pen modif"></i></button><button onclick="ConfirmDeletServicio(' +
                     respuesta +
                     ')" type="button" class="btn btn-default btn-icon-delete" aria-label="Left Align"><i class="fas fa-times-circle kill"></i></button>',
                  [1]: respuesta,
                  [2]: NomServicio,
                  [3]: DesServicio,
               })
               .draw()
               .node();
            $(rowNode).find('td').eq(0).addClass('edit');
            $(rowNode).find('td').eq(1).addClass('text-center');
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
   $('#NomServicio').val('');
   $('#IdServicio').val('');
   $('#DesServicio').val('');
   $('#titulo').text('Nuevo Servicio');
}

//obtiene la informacion de tabla Proveedores *

function getServiciosTable() {
   var location = 'Servicios/GetServicios';
   $('#ServiciosTable').DataTable().destroy();
   $('#tablaServiciosRow').html('');

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
               '<button onclick="EditServicios(' +
               row.srv_id +
               ')" type="button" class="btn btn-default btn-icon-edit" aria-label="Left Align"><i class="fas fa-pen modif"></i></button>' +
               '<button onclick="ConfirmDeletServicio(' +
               row.srv_id +
               ')" type="button" class="btn btn-default btn-icon-delete" aria-label="Left Align"><i class="fas fa-times-circle kill"></i></button>' +
               '</td>' +
               "<td class='dtr-control text-center'>" +
               row.srv_id +
               '</td>' +
               '<td>' +
               row.srv_name +
               '</td>' +
               '<td>' +
               row.srv_description +
               '</td>' +
               '</tr>';
            $('#tablaServiciosRow').append(renglon);
         });

         let title = 'Categorias';
         let filename = title.replace(/ /g, '_') + '-' + moment(Date()).format('YYYYMMDD');

         table = $('#ServiciosTable').DataTable({
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
                  className: 'btn-apply',
                  action: function () {
                     var selected = table.rows({selected: true}).data();
                     var idSelected = '';
                     selected.each(function (index) {
                        idSelected += index[1] + ',';
                     });
                     idSelected = idSelected.slice(0, -1);
                     if (idSelected != '') {
                        ConfirmDeletServicio(idSelected);
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
      },
      get success() {
         return this._success;
      },
      set success(value) {
         this._success = value;
      },
      error: function (jqXHR, textStatus, errorThrown) {
         console.log(jqXHR, textStatus, errorThrown);
      },
   }).done(function () {});
}
