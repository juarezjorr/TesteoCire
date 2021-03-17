var table = null;

$(document).ready(function () {
   verifica_usuario();
   inicial();
});

function inicial() {
   getUsuariosTableDatos();
   //Modal - lista - Permisos *
   $('#listDisponible').on('click', 'a', function () {
      $(this).appendTo('#listAsignado');
   });

   //Modal - lista - Permisos *
   $('#listAsignado').on('click', 'a', function () {
      $(this).appendTo('#listDisponible');
   });

   //Open modal *
   $('#nuevoUsuario').on('click', function () {
      LimpiaModal();
      getPerfilesUsuario();
      $('#formUsuario').removeClass('was-validated');
   });

   //Guardar Usuario *
   $('#GuardarUsuario').on('click', function () {
      if (validaFormulario() == 1) {
         SaveUsuario();
      }
   });

   //Select perfiles Usuario *
   $('#selectPerfilUsuario').change(function () {
      LimpiaModalModules();
      getIdModuluesPerfiles(
         $('#selectPerfilUsuario option:selected').attr('id')
      );
   });

   //borra Usuario +
   $('#BorrarUsuario').on('click', function () {
      DeletUsuario();
   });
}

// Optiene los perfiles disponibles *
function getIdModuluesPerfiles(idPerfil) {
   var location = 'perfilUser/getIdModuluesPerfiles';
   $.ajax({
      type: 'POST',
      dataType: 'JSON',
      data: { idPerfil: idPerfil },
      url: location,
      success: function (respuesta) {
         if (respuesta != '') {
            getModulesList(respuesta, 'Asig'); //Asignados
         }
         getModulesList(respuesta, 'Disp'); //Disponibles
      },
      error: function () {},
   }).done(function () {});
}

// Optiene los perfiles disponibles *
function getPerfilesUsuario(idPerfil) {
   var location = 'perfilUser/GetPerfiles';
   $.ajax({
      type: 'GET',
      dataType: 'JSON',
      url: location,
      success: function (respuesta) {
         var renglon =
            "<option id='0'  value=''>Seleccione un perfil...</option> ";
         respuesta.forEach(function (row, index) {
            renglon +=
               '<option id=' +
               row.prf_id +
               '  value="">' +
               row.prf_name +
               '</option> ';
         });
         $('#selectPerfilUsuario').append(renglon);
         if (idPerfil != '') {
            $("#selectPerfilUsuario option[id='" + idPerfil + "']").attr(
               'selected',
               'selected'
            );
         }
      },
      error: function () {},
   }).done(function () {});
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
   if ($('#listAsignado').find('a').length == 0) {
      valor = 0;
   }
   return valor;
}

//Edita el Usuario *
function EditUsuario(id, idPerfil) {
   UnSelectRowTable();
   LimpiaModal();
   getPerfilesUsuario(idPerfil);
   var location = 'Usuarios/GetUsuario';
   $.ajax({
      type: 'POST',
      dataType: 'JSON',
      data: { id: id },
      url: location,
      success: function (respuesta) {
         //console.log(respuesta);
         $('#NomUsuario').val(respuesta.emp_fullname);
         $('#PassUsuario').val(respuesta.usr_password);
         $('#EmpIdUsuario').val(respuesta.emp_id);
         $('#IdUsuario').val(respuesta.usr_id);
         $('#UserNameUsuario').val(respuesta.usr_username);
         $('#AreaEmpUsuario').val(respuesta.emp_area);
         $('#NumEmpUsuario').val(respuesta.emp_number);

         if (respuesta.modulesAsing != '') {
            getModulesList(respuesta.modulesAsing, 'Asig'); //Asignados
         }
         getModulesList(respuesta.modulesAsing, 'Disp'); //Disponibles

         $('#UsuariosModal').modal('show');
      },
      error: function (EX) {
         console.log(EX);
      },
   }).done(function () {});
}

//confirm para borrar *
function ConfirmDeletUser(id) {
   UnSelectRowTable();
   $('#BorrarUsuariosModal').modal('show');
   $('#IdUsuarioBorrar').val(id);
}

function UnSelectRowTable() {
   setTimeout(() => {
      table.rows().deselect();
   }, 10);
}

//BORRAR USUARIO *
function DeletUsuario() {
   var location = 'Usuarios/DeleteUsuario';
   var IdUsuario = $('#IdUsuarioBorrar').val();
   $.ajax({
      type: 'POST',
      dataType: 'JSON',
      data: {
         IdUsuario: IdUsuario,
      },
      url: location,
      success: function (respuesta) {
         if ((respuesta = 1)) {
            getUsuariosTable();
            $('#BorrarUsuariosModal').modal('hide');
         }
      },
      error: function (EX) {
         console.log(EX);
      },
   }).done(function () {});
}

//Guardar Usuarios *
function SaveUsuario() {
   var location = 'Usuarios/SaveUsuario';

   var IdUsuario = $('#IdUsuario').val();
   var EmpIdUsuario = $('#EmpIdUsuario').val();
   var NomUsuario = $('#NomUsuario').val();
   var UserNameUsuario = $('#UserNameUsuario').val();
   var PassUsuario = $('#PassUsuario').val();
   var modulesAsig = '';
   $('#listAsignado')
      .children('a')
      .each(function () {
         modulesAsig += $(this).attr('id') + ',';
      });
   var AreaEmpUsuario = $('#AreaEmpUsuario').val();
   var NumEmpUsuario = $('#NumEmpUsuario').val();
   modulesAsig = modulesAsig.slice(0, -1);
   var idPerfil = $('#selectPerfilUsuario option:selected').attr('id');

   $.ajax({
      type: 'POST',
      dataType: 'JSON',
      data: {
         IdUsuario: IdUsuario,
         NomUsuario: NomUsuario,
         EmpIdUsuario: EmpIdUsuario,
         UserNameUsuario: UserNameUsuario,
         PassUsuario: PassUsuario,
         modulesAsig: modulesAsig,
         AreaEmpUsuario: AreaEmpUsuario,
         NumEmpUsuario: NumEmpUsuario,
         idPerfil: idPerfil,
      },
      url: location,
      success: function (respuesta) {
         if ((respuesta = 1)) {
            getUsuariosTable();
            $('#UsuariosModal').modal('hide');
         }
      },
      error: function (EX) {
         console.log(EX);
      },
   }).done(function () {});
}

//Limpia datos en modal perfil *
function LimpiaModal() {
   $('#NomUsuario').val('');
   $('#PassUsuario').val('');
   $('#EmpIdUsuario').val('');
   $('#IdUsuario').val('');
   $('#UserNameUsuario').val('');
   $('#AreaEmpUsuario').val('');
   $('#NumEmpUsuario').val('');
   $('#selectPerfilUsuario').html('');
   $('#listDisponible').html('');
   $('#listAsignado').html('');
}

//Limpia en formulario datos de perfil *
function LimpiaModalModules() {
   $('#listDisponible').html('');
   $('#listAsignado').html('');
}

//obtiene la informacion de tabla Usuarios *

function getUsuariosTableDatos() {
   var pagina = 'Usuarios/GetUsuarios';
   var par = '[{"parm":""}]';
   var tipo = 'json';
   var selector = getUsuariosTable;
   fillField(pagina, par, tipo, selector);
}
function getUsuariosTable(dt) {
   console.log(dt);
   respuesta = dt;
   //    $('#usuariosTable').DataTable().destroy();
   $('#tablaUsuariosRow').html('');

   var renglon = '';
   respuesta.forEach(function (row, index) {
      renglon =
         '<tr>' +
         '<td class="text-center edit"> ' +
         '<button onclick="EditUsuario(' +
         row.usr_id +
         ',' +
         row.prf_id +
         ')" type="button" class="btn btn-default btn-icon-edit" aria-label="Left Align"><i class="fas fa-pen modif"></i></button>' +
         '<button onclick="ConfirmDeletUser(' +
         row.usr_id +
         ')" type="button" class="btn btn-default btn-icon-delete" aria-label="Left Align"><i class="fas fa-times-circle kill"></i></button>' +
         '</td>' +
         "<td class='dtr-control text-center'>" +
         row.usr_id +
         '</td>' +
         '<td>' +
         row.usr_username +
         '</td>' +
         '<td>' +
         row.emp_fullname +
         '</td>' +
         '<td>' +
         row.emp_number +
         '</td>' +
         '<td>' +
         row.prf_name +
         '</td>' +
         '<td>' +
         row.usr_dt_registry +
         '</td>' +
         '<td>' +
         row.usr_dt_last_access +
         '</td>' +
         '</tr>';
      $('#tablaUsuariosRow').append(renglon);
   });

   let title = 'Usuarios';
   let filename =
      title.replace(/ /g, '_') + '-' + moment(Date()).format('YYYYMMDD');

   table = $('#usuariosTable').DataTable({
      order: [[1, 'asc']],
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
            extend: 'pdf',
            filename: filename,
            text:
               '<button class="btn btn-pdf"><i class="fas fa-file-pdf"></i></button>',
         },
         {
            extend: 'excel',
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
                  ConfirmDeletUser(idSelected);
               }
            },
         },
      ],
      //   columnDefs: [
      //      { responsivePriority: 1, targets: 0 },
      //      { responsivePriority: 2, targets: -1 },
      //   ],
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

   $('#usuariosTable tbody').on('click', 'tr', function () {
      setTimeout(() => {
         RenglonesSelection = table.rows({ selected: true }).count();
         if (RenglonesSelection == 0 || RenglonesSelection == 1) {
            $('.btnDatableAddRed').css('visibility', 'hidden');
         } else {
            $('.btnDatableAddRed').css('visibility', 'visible');
         }
      }, 10);
   });

   // }
   //     ,
   //     error: function () {
   //     }
   // }).done(function () {
   // }
   // );
}

//Optiene los modulos Para el Usuario *
function getModulesList(ModUser, tipeModul) {
   var location = 'perfilUser/GetModules';
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
                  row.mod_code +
                  ' - ' +
                  row.mod_name +
                  '<br><span style="font-size: 10px;">' +
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
                  row.mod_code +
                  ' - ' +
                  row.mod_name +
                  '<br><span style="font-size: 10px;">' +
                  row.mod_description +
                  '</span></a>';
               $('#listDisponible').append(renglon);
            });
         }
      },
      error: function () {},
   }).done(function () {});
}
