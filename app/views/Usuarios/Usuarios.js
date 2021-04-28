var table = null;
var positionRow = 0;

$(document).ready(function () {
    verifica_usuario();
    inicial();
 });

 function inicial() {
    getUsuariosTable(); 
    getPerfilesUsuario();
    getPuestos();
    getUserReport();

    //$('.collapse').collapse("toggle");
    //$('.collapse').collapse("hide");




    //Modal - lista - Permisos *
    $('#listDisponible').on('click', 'a', function(){    
        $(this).appendTo('#listAsignado');
    });
    
    //Modal - lista - Permisos *
    $('#listAsignado').on('click', 'a', function(){    
        $(this).appendTo('#listDisponible');
    });

    //Open modal *
    $('#nuevoUsuario').on('click', function(){    
        LimpiaModal();
        getPerfilesUsuario();
    });

    //Guardar Usuario *
    $('#GuardarUsuario').on('click', function(){   
        if(validaFormulario() == 1){
            SaveUsuario();        
        }else{console.log("no entra");}
    });

    //Select perfiles Usuario *
    $("#selectPerfilUsuario").change(function() {   
        LimpiaModalModules();
        getIdModuluesPerfiles($("#selectPerfilUsuario option:selected").attr("id"));
    });

    //borra Usuario +
    $('#BorrarUsuario').on('click', function(){    
        DeletUsuario();
    }); 

    $('#LimpiarFormulario').on('click', function () {
        LimpiaModal();
     });
  
    
    $('#usuariosTable tbody').on('click', 'tr', function () {
        positionRow = (table.page.info().page * table.page.info().length) + $(this).index();
  
        setTimeout(() => {
           RenglonesSelection = table.rows({ selected: true }).count();
           if (RenglonesSelection == 0 || RenglonesSelection == 1) {
                $('.btn-apply').addClass('hidden-field');
            } else {
                $('.btn-apply').removeClass('hidden-field');
            }
       }, 10);
     });
}

function addZeroNumber(number, length) {
    var my_string = '' + number;
    var largo = my_string.length;
    if(largo > length){var restar = largo - length; my_string = my_string.substring(restar, largo); }
    while (my_string.length < length) {
        my_string = '0' + my_string;
    }
    return my_string;
}

// Optiene los perfiles disponibles *
function getIdModuluesPerfiles(idPerfil) {
    var location = 'perfilUser/getIdModuluesPerfiles';                
    $.ajax({
            type: "POST",
            dataType: 'JSON',
            data: {idPerfil : idPerfil},
            url: location,
        success: function (respuesta) {
           if(respuesta!= ""){
                getModulesList(respuesta,"Asig");   //Asignados
            }
            getModulesList(respuesta,"Disp");//Disponibles
        },
        error: function () {
        }
    }).done(function () {
    });
}

// Optiene los perfiles disponibles *
function getPerfilesUsuario(idPerfil) {
    var location = 'perfilUser/GetPerfiles';                
    $.ajax({
            type: "GET",
            dataType: 'JSON',
            url: location,
        success: function (respuesta) {
            var renglon = "<option id='0'  value=''>Seleccione un perfil...</option> ";
            respuesta.forEach(function(row, index) {
                renglon += '<option id='+row.prf_id+'  value="">'+row.prf_name+'</option> ';
            });
            $("#selectPerfilUsuario").append(renglon);
            if(idPerfil != ""){
                $("#selectPerfilUsuario option[id='"+idPerfil+"']").attr("selected", "selected");
            }
        },
        error: function () {
        }
    }).done(function () {
    });
}

//Valida los campos seleccionado *
function validaFormulario() {
    var valor = 1;
    var forms = document.querySelectorAll('.needs-validation')
        Array.prototype.slice.call(forms)
            .forEach(function (form) {
                if (!form.checkValidity()) {
                    form.classList.add('was-validated')
                    valor = 0;
                }
        })
    if($('#listAsignado').find("a").length == 0){
        valor = 0;
    } 
    return valor;
}

//Edita el Usuario *
function EditUsuario(id,idPerfil) {
    UnSelectRowTable();
    LimpiaModal();
    $('#titulo').text('Editar Usuarios');
    var location = "Usuarios/GetUsuario";
    $.ajax({
            type: "POST",
            dataType: 'JSON',
            data: { id : id
             },
            url: location,
        success: function (respuesta) {
            //console.log(respuesta);
            $('#IdUsuario').val(respuesta.usr_id);

            $('#NomUsuario').val(respuesta.emp_fullname);
            $('#UserNameUsuario').val(respuesta.usr_username);

            $('#PassUsuario').val(respuesta.usr_password);
           // $("#PassUsuarioRow").attr("hidden",true);



            $('#AreaEmpUsuario').val(respuesta.emp_area);
            $('#NumEmpUsuario').val(respuesta.emp_number);



            $('#lastDate').val(respuesta.usr_dt_last_access);
            $('#userRegistry').val(respuesta.usr_dt_registry);

            getPerfilesUsuario(idPerfil)
            getUserReport(respuesta.emp_report_to);
            getPuestos(respuesta.pos_id);


            if(respuesta.modulesAsing != ""){
                getModulesList(respuesta.modulesAsing,"Asig");   //Asignados
            }
            getModulesList(respuesta.modulesAsing,"Disp");//Disponibles

          $('#UsuariosModal').modal('show');
        },
        error: function (EX) {console.log(EX);}
    }).done(function () {});

}

//confirm para borrar *
function ConfirmDeletUser(id) {
    $('#BorrarUsuariosModal').modal('show');
    $('#IdUsuarioBorrar').val(id);
}

function UnSelectRowTable() {
    setTimeout(() => {table.rows().deselect();}, 10);
}

//BORRAR USUARIO * 
function DeletUsuario() {
    var location = "Usuarios/DeleteUsuario";
    var IdUsuario = $('#IdUsuarioBorrar').val();
    $.ajax({
            type: "POST",
            dataType: 'JSON',
            data: { 
                    IdUsuario : IdUsuario
             },
            url: location,
        success: function (respuesta) {
            if ((respuesta = 1)) {
                var arrayObJ = IdUsuario.split(',');
                if(arrayObJ.length == 1){
                   table.row(':eq('+positionRow+')').remove().draw();
                }else{
                   table.rows({ selected: true }).remove().draw();
                }
                $('#BorrarUsuariosModal').modal('hide');
             }
             LimpiaModal();
             getPerfilesUsuario();
             getPuestos();
             getUserReport();
        },
        error: function (EX) {console.log(EX);}
        }).done(function () {});
}

//Guardar Usuarios * 
function SaveUsuario() {
        var location = "Usuarios/SaveUsuario";
        var today = new Date();
        var fechaAcceso = today.getFullYear()+"-"+addZeroNumber(today.getMonth(),2)+"-"+today.getDate()+" "+addZeroNumber(today.getHours(),2)+":"+addZeroNumber(today.getMinutes(),2)+":"+addZeroNumber(today.getSeconds(),2);
        var fechaRegistro = fechaAcceso;

        var IdUsuario = $('#IdUsuario').val();
        var NomUsuario = $('#NomUsuario').val().trim();
        var UserNameUsuario = $('#UserNameUsuario').val().trim();
        var PassUsuario = $('#PassUsuario').val().trim();
        var AreaEmpUsuario = $('#AreaEmpUsuario').val().trim();
        var NumEmpUsuario = $('#NumEmpUsuario').val().trim();     
        var EmpIdUsuario = $('#EmpIdUsuario').val().trim();  
    

        var idPerfil = $("#selectPerfilUsuario option:selected").attr("id");
        var idUserReport = $("#selectRowUserReporta option:selected").attr("id");
        var idPuesto = $("#selectRowPuestos option:selected").attr("id");

        var NomPuesto = $("#selectRowPuestos option:selected").text();


       

        var modulesAsig = "";
        $('#listAsignado').children('a').each(function(){
            modulesAsig += $(this).attr('id') + ",";
        });
        modulesAsig = modulesAsig.slice(0,-1);

        $.ajax({
            type: "POST",
            dataType: 'JSON',
            data: { IdUsuario : IdUsuario,
                    NomUsuario : NomUsuario,
                    EmpIdUsuario : EmpIdUsuario,
                    UserNameUsuario : UserNameUsuario,
                    PassUsuario : PassUsuario,
                    modulesAsig : modulesAsig,
                    AreaEmpUsuario : AreaEmpUsuario,
                    NumEmpUsuario : NumEmpUsuario,
                    idPerfil : idPerfil,
                    idUserReport : idUserReport,
                    idPuesto : idPuesto
             },
            url: location,
            success: function (respuesta) {
                if(IdUsuario != ''){
                    table.row(':eq('+positionRow+')').remove().draw();
                    fechaAcceso = $('#lastDate').val();  
                    fechaRegistro = $('#userRegistry').val();  
                }
                if ((respuesta != 0)) {
                    //getAlmacenesTable();
                    var rowNode = table.row.add( {
                    [0]:  '<button onclick="EditUsuario('+respuesta+','+idPerfil+')" type="button" class="btn btn-default btn-icon-edit" aria-label="Left Align"><i class="fas fa-pen modif"></i></button><button onclick="ConfirmDeletUser('+respuesta+')" type="button" class="btn btn-default btn-icon-delete" aria-label="Left Align"><i class="fas fa-times-circle kill"></i></button>',
                    [1]:   respuesta,
                    [2]:   NomUsuario,
                    [3]:   NumEmpUsuario,
                    [4]:   NomPuesto,
                    [5]:   UserNameUsuario,
                    [6]:   fechaAcceso,
                    [7]:   fechaRegistro
                    }).draw().node();
                    $( rowNode ).find('td').eq(0).addClass('edit');
                    $( rowNode ).find('td').eq(1).addClass('text-center');
                LimpiaModal();
                getPerfilesUsuario();
                getPuestos();
                getUserReport();
                }

            },
            error: function (EX) {console.log(EX);}
            }).done(function () {});    
}

//Limpia datos en modal perfil *
function LimpiaModal() {
    $('#NomUsuario').val("");
    $('#PassUsuario').val("");
    $('#EmpIdUsuario').val("");
    $('#IdUsuario').val("");
    $('#UserNameUsuario').val("");
    $('#AreaEmpUsuario').val("");
    $('#NumEmpUsuario').val("");
    $('#selectPerfilUsuario').html("");
    $('#listDisponible').html("");
    $('#listAsignado').html("");
    $('#formUsuario').removeClass('was-validated');
    $('#titulo').text('Nuevo Usuarios');
    $("#PassUsuarioRow").attr("hidden",false);
    getPerfilesUsuario();
    $('.collapse').collapse("hide");


}

//Limpia en formulario datos de perfil *
function LimpiaModalModules() {
    $('#listDisponible').html("");
    $('#listAsignado').html("");
}

//obtiene la informacion de tabla Usuarios *
function getUsuariosTable() {
   var location = 'Usuarios/GetUsuarios';                
   $('#usuariosTable').DataTable().destroy();
   $("#tablaUsuariosRow").html('');

   $.ajax({
      type: 'POST',
      dataType: 'JSON',
      url: location,
      _success: function (respuesta) {
         var renglon = '';
         console.log(respuesta);
         respuesta.forEach(function (row, index) {
            renglon =
               '<tr>' +
      
               '<td class="text-center edit"> ' +
                   '<button onclick="EditUsuario(' + row.usr_id +','+row.prf_id+')" type="button" class="btn btn-default btn-icon-edit" aria-label="Left Align"><i class="fas fa-pen modif"></i></button>' +
                   '<button onclick="ConfirmDeletUser(' + row.usr_id +')" type="button" class="btn btn-default btn-icon-delete" aria-label="Left Align"><i class="fas fa-times-circle kill"></i></button>' +
               '</td>' +

               "<td class='dtr-control text-center'>" +
               row.usr_id +
               '</td>' +

               '<td>' +
               row.emp_fullname +
               '</td>' +

               "<td >" +
               row.emp_number +
               '</td>' +

               '<td>' +
               row.prf_name +

               '<td>' +
               row.usr_username +
               '</td>' +

               '<td>' +
               row.usr_dt_last_access +
               '</td>' +

               '<td>' +
               row.usr_dt_registry +
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
               }
               ,
               {
                  text: 'Borrar seleccionados',
                  className: 'btn-apply hidden-field',
                  action: function () {
                     var selected = table.rows({ selected: true }).data();
                     var idSelected = '';
                     selected.each(function (index) {
                        idSelected += index[1] + ',';
                     });
                     idSelected = idSelected.slice(0, -1);
                     if (idSelected != '') {
                        ConfirmDeletUser(idSelected);
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
      error: function ( jqXHR, textStatus, errorThrown) {
         console.log( jqXHR, textStatus, errorThrown);
      },
   }).done(function () {});
}

function getUserReport(id) {
    $('#selectRowUserReporta').html("");
    var location = 'Usuarios/GetUsuarios';                
    $.ajax({
            type: "POST",
            dataType: 'JSON',
            data:{id:id},
            url: location,
        success: function (respuesta) {
            var renglon = "<option id='0'  value='0'>Seleccione...</option> ";
            respuesta.forEach(function(row, index) {
                renglon += '<option id='+row.usr_id+'  value="'+row.usr_id+'">'+row.emp_fullname+'</option> ';
            });
            $("#selectRowUserReporta").append(renglon);
            if(id != undefined){
                $("#selectRowUserReporta option[value='"+id+"']").attr("selected", "selected");
            }
        },
        error: function () {
        }
    }).done(function () {
    });
}

function getPuestos(id) {
    $('#selectRowPuestos').html("");
    var location = 'Puestos/GetPuestos';                
    $.ajax({
            type: "POST",
            dataType: 'JSON',
            data:{id:id},
            url: location,
        success: function (respuesta) {


            var renglon = "<option id='0'  value='0'>Seleccione...</option> ";
            respuesta.forEach(function(row, index) {
                renglon += '<option id='+row.pos_id+'  value="'+row.pos_id+'">'+row.pos_name+'</option> ';
            });
            $("#selectRowPuestos").append(renglon);

            if(id != undefined){
                $("#selectRowPuestos option[value='"+id+"']").attr("selected", "selected");
            }
        },
        error: function () {
        }
    }).done(function () {
    });
}







//Optiene los modulos Para el Usuario *
function getModulesList(ModUser,tipeModul,) {
    var location = 'perfilUser/GetModules';
    $.ajax({
            type: "POST",
            dataType: 'JSON',
            data:{
                ModUser : ModUser,
                tipeModul : tipeModul
            },
            url: location,
        success: function (respuesta) {
            var renglon = "";

            if(tipeModul == "Asig"){
                respuesta.forEach(function(row, index) {
                    renglon ='<a href="#" class="list-group-item list-group-item-action" id="'+row.mod_id+'">'+row.mod_code+' - '+row.mod_name+'<br><span style="font-size: 10px;">'+row.mod_description+'</span></a>';
                    $("#listAsignado").append(renglon);
                });
            }else{
                respuesta.forEach(function(row, index) {
                    renglon ='<a href="#" class="list-group-item list-group-item-action" id="'+row.mod_id+'">'+row.mod_code+' - '+row.mod_name+'<br><span style="font-size: 10px;">'+row.mod_description+'</span></a>';
                    $("#listDisponible").append(renglon);
                });
            }
        },
        error: function () {
        }
    }).done(function () {
    });
}