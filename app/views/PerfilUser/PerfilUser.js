var table = null;
var positionRow = 0;

$(document).ready(function () {
   verifica_usuario();
   inicial();
});

function inicial() {
   getPerfilesTable();
   getModulesList('', 'Disp');

   //Modal - lista - Permisos
   $('#listDisponible').on('click', 'a', function () {
      $(this).appendTo('#listAsignado');
   });

   $('#listAsignado').on('click', 'a', function () {
      $(this).appendTo('#listDisponible');
   });

   //Open modal
   $('#nuevoPerfil').on('click', function () {
      LimpiaModal();
      getModulesList('', 'Disp');
      $('#formPerfil').removeClass('was-validated');
   });

   $('#GuardarPerfil').on('click', function () {
      if (validaFormulario() == 1) {
         SavePerfil();
      }
   });

   $('#BorrarPerfil').on('click', function () {
      DeletPerfil();
   });

   $('#LimpiarFormulario').on('click', function () {
      LimpiaModal();
      getModulesList('', 'Disp');
   });

   $('#perfilesTable tbody').on('click', 'tr', function () {
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

function validaFormulario() {
   var valor = 1;
   var forms = document.querySelectorAll('.needs-validation');
   Array.prototype.slice.call(forms).forEach(function (form) {
      if (!form.checkValidity()) {
         form.classList.add('was-validated');
         valor = 0;
      }
   });
   if ($('#listAsignado').find('a').length == 0) {
      valor = 0;
   }
   return valor;
}

function EditPerfil(id) {
   UnSelectRowTable();
   LimpiaModal();
   $('#titulo').text('Editar Perfil Usuario');

   var location = 'PerfilUser/GetDataPerfil';
   $.ajax({
      type: 'POST',
      dataType: 'JSON',
      data: {id: id},
      url: location,
      success: function (respuesta) {
         $('#NomPerfil').val(respuesta.prf_name);
         $('#CodPerfil').val(respuesta.prf_code);
         $('#DesPerfil').val(respuesta.prf_description);
         $('#IdPerfil').val(respuesta.prf_id);

         if (respuesta.prf_modulesAsing != '') {
            getModulesList(respuesta.prf_modulesAsing, 'Asig'); //Asignados
         }
         getModulesList(respuesta.prf_modulesAsing, 'Disp'); //Disponibles

         $('#PerfilModal').modal('show');
      },
      error: function (EX) {
         console.log(EX);
      },
   }).done(function () {});
}

function ConfirmDeletPerfil(id) {
   $('#BorrarPerfilModal').modal('show');
   $('#IdPerfilBorrrar').val(id);
}

function UnSelectRowTable() {
   setTimeout(() => {
      table.rows().deselect();
   }, 10);
}

function DeletPerfil() {
   var location = 'PerfilUser/DeletePerfil';
   var IdPerfil = $('#IdPerfilBorrrar').val();
   console.log(IdPerfil);
   $.ajax({
      type: 'POST',
      dataType: 'JSON',
      data: {
         IdPerfil: IdPerfil,
      },
      url: location,
      success: function (respuesta) {
         if ((respuesta = 1)) {
            var arrayObJ = IdPerfil.split(',');
            if (arrayObJ.length == 1) {
               table
                  .row(':eq(' + positionRow + ')')
                  .remove()
                  .draw();
            } else {
               table.rows({selected: true}).remove().draw();
            }
            $('#BorrarPerfilModal').modal('hide');
         }
         LimpiaModal();
         getModulesList('', 'Disp');
      },
      error: function (EX) {
         console.log(EX);
      },
   }).done(function () {});
}

//Guardar perfil
function SavePerfil() {
   var location = 'PerfilUser/SavePerfil';
   var NomPerfil = $('#NomPerfil').val();
   var DesPerfil = $('#DesPerfil').val();
   var CodPerfil = $('#CodPerfil').val();
   var IdPerfil = $('#IdPerfil').val();

   var modulesAsig = '';

   $('#listAsignado')
      .children('a')
      .each(function () {
         modulesAsig += $(this).attr('id') + ',';
      });
   modulesAsig = modulesAsig.slice(0, -1);

   $.ajax({
      type: 'POST',
      dataType: 'JSON',
      data: {NomPerfil: NomPerfil, DesPerfil: DesPerfil, CodPerfil: CodPerfil, IdPerfil: IdPerfil, modulesAsig: modulesAsig},
      url: location,
      success: function (respuesta) {
         if (IdPerfil != '') {
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
                     '<button onclick="EditPerfil(' +
                     respuesta +
                     ')" type="button" class="btn btn-default btn-icon-edit" aria-label="Left Align"><i class="fas fa-pen modif"></i></button><button onclick="ConfirmDeletPerfil(' +
                     respuesta +
                     ')" type="button" class="btn btn-default btn-icon-delete" aria-label="Left Align"><i class="fas fa-times-circle kill"></i></button>',
                  [1]: respuesta,
                  [2]: NomPerfil,
                  [3]: CodPerfil,
                  [4]: DesPerfil,
               })
               .draw()
               .node();
            $(rowNode).find('td').eq(0).addClass('edit');
            $(rowNode).find('td').eq(1).addClass('text-center');
            LimpiaModal();
            getModulesList('', 'Disp');
         }
      },
      error: function (EX) {
         console.log(EX);
      },
   }).done(function () {});
}

//Limpia datos en modal perfil
function LimpiaModal() {
   $('#NomPerfil').val('');
   $('#CodPerfil').val('');
   $('#DesPerfil').val('');
   $('#IdPerfil').val('');
   $('#listDisponible').html('');
   $('#listAsignado').html('');
   $('#titulo').text('Nuevo Perfil Usuario');
}

function getPerfilesTable() {
   var location = 'PerfilUser/GetPerfiles';
   $('#perfilesTable').DataTable().destroy();
   $('#tablaPerfilesRow').html('');

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
               '<button onclick="EditPerfil(' +
               row.prf_id +
               ')" type="button" class="btn btn-default btn-icon-edit" aria-label="Left Align"><i class="fas fa-pen modif"></i></button>' +
               '<button onclick="ConfirmDeletPerfil(' +
               row.prf_id +
               ')" type="button" class="btn btn-default btn-icon-delete" aria-label="Left Align"><i class="fas fa-times-circle kill"></i></button>' +
               '</td>' +
               "<td class='dtr-control text-center'>" +
               row.prf_id +
               '</td>' +
               '<td >' +
               row.prf_name +
               '</td>' +
               '<td>' +
               row.prf_code +
               '</td>' +
               '<td>' +
               row.prf_description +
               '</td>' +
               '</tr>';
            $('#tablaPerfilesRow').append(renglon);
         });

         let title = 'PerfilesUser';
         let filename = title.replace(/ /g, '_') + '-' + moment(Date()).format('YYYYMMDD');

         table = $('#perfilesTable').DataTable({
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
                        ConfirmDeletPerfil(idSelected);
                     }
                  },
               },
            ],

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

//Optiene los modulos
function getModulesList(ModUser, tipeModul) {
   var location = 'PerfilUser/GetModules';
   $.ajax({
      type: 'POST',
      dataType: 'JSON',
      data: {
         ModUser: ModUser,
         tipeModul: tipeModul,
      },
      url: location,
      success: function (respuesta) {
         var renglon = '';
         if (tipeModul == 'Asig') {
            respuesta.forEach(function (row, index) {
               renglon =
                  '<a href="#" class="list-group-item list-group-item-action" id="' +
                  row.mod_id +
                  '">' +
                  row.mod_name +
                  '<br><span class="list-group-item-Text">' +
                  row.mod_description +
                  '</span></a>';
               $('#listAsignado').append(renglon);
            });
         } else {
            respuesta.forEach(function (row, index) {
               renglon =
                  '<a href="#" class="list-group-item list-group-item-action" id="' +
                  row.mod_id +
                  '">' +
                  row.mod_name +
                  '<br><span class="list-group-item-Text" >' +
                  row.mod_description +
                  '</span></a>';
               $('#listDisponible').append(renglon);
            });
         }
      },
      error: function (jqXHR, textStatus, errorThrown) {},
   }).done(function () {});
}
