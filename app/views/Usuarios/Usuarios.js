$(document).ready(function() {
    getUsuariosTable(); 
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
        $('#formUsuario').removeClass('was-validated');
    });

    //Guardar Usuario *
    $('#GuardarUsuario').on('click', function(){   
        if(validaFormulario() == 1){
            SaveUsuario();        
        }
    });

    //Select perfiles Usuario *
    $("#selectPerfilUsuario").change(function() {   
        LimpiaModalModules();
        getIdModuluesPerfiles($("#selectPerfilUsuario option:selected").attr("id"));
    });

    //borra Usuario +
    $('#BorrarUsuario').on('click', function(){    
        DeletPerfil();
    });  
});

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
    LimpiaModal();
    getPerfilesUsuario(idPerfil)
    var location = "Usuarios/GetUsuario";
    $.ajax({
            type: "POST",
            dataType: 'JSON',
            data: { id : id
             },
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
//BORRAR USUARIO * 
function DeletPerfil() {
    var location = "Usuarios/DeleteUsuario";
    IdUsuario = $('#IdUsuarioBorrar').val();
    $.ajax({
            type: "POST",
            dataType: 'JSON',
            data: { 
                    IdUsuario : IdUsuario
             },
            url: location,
        success: function (respuesta) {
            if(respuesta = 1){
                getUsuariosTable(); 
                $('#BorrarUsuariosModal').modal('hide');
            }
        },
        error: function (EX) {console.log(EX);}
        }).done(function () {});
}

//Guardar Usuarios * 
function SaveUsuario() {
        var location = "Usuarios/SaveUsuario";

        var IdUsuario = $('#IdUsuario').val();
        var EmpIdUsuario = $('#EmpIdUsuario').val();      
        var NomUsuario = $('#NomUsuario').val();
        var UserNameUsuario = $('#UserNameUsuario').val();
        var PassUsuario = $('#PassUsuario').val();
        var modulesAsig = "";
        $('#listAsignado').children('a').each(function(){
            modulesAsig += $(this).attr('id') + ",";
        });
        var AreaEmpUsuario = $('#AreaEmpUsuario').val();
        var NumEmpUsuario = $('#NumEmpUsuario').val();         
        modulesAsig = modulesAsig.slice(0,-1);
        var idPerfil = $("#selectPerfilUsuario option:selected").attr("id");

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
                    idPerfil : idPerfil
             },
            url: location,
        success: function (respuesta) {
            if(respuesta = 1){
                getUsuariosTable();
                $('#UsuariosModal').modal('hide');
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
            type: "POST",
            dataType: 'JSON',
            url: location,
        success: function (respuesta) {
            var renglon = "";
            respuesta.forEach(function(row, index) {
                renglon = "<tr>"
                        + "<td class='dtr-control'>" + row.usr_id + "</td>"
                        + "<td>" + row.usr_username + "</td>"
                        + "<td>" + row.usr_password + "</td>"
                        + "<td>" + row.prf_id + "</td>"
                        + "<td>" + row.emp_id + "</td>"
                        + '<td class="text-center"> '
                        + '<button onclick="EditUsuario('+ row.usr_id+","+row.prf_id+')" type="button" class="btn btn-default btn-icon-edit" aria-label="Left Align"><i class="fas fa-pen"></i></button>'
                        + '<button onclick="ConfirmDeletUser('+ row.usr_id +')" type="button" class="btn btn-default btn-icon-delete" aria-label="Left Align"><i class="fas fa-trash"></i></button>' 
                        + '</td>'
                        + "</tr>";
                $("#tablaUsuariosRow").append(renglon);

            });


            



            $('#usuariosTable').DataTable({
                select: true, 
                lengthMenu: [ [10, 50, 100, -1], ['10 Filas', '25 Filas', '50 Filas', 'Mostrar todo'] ], 
                dom: 'Bfrtip', 
                buttons: [ { extend: 'pdf', className: 'btnDatableAdd',text: '<i class="btn-add" >PDF</i>' },
                           { extend: 'excel', className: 'btnDatableAdd',text: '<i class="btn-add" >Excel</i>' }, 
                           { extend: 'pageLength', className: 'btnDatableAdd' }
                           ],                
                columnDefs: [
                    { responsivePriority: 1, targets: 0 },
                    { responsivePriority: 2, targets: -1 }
                ],
                scrollY:        "50vh",
                scrollCollapse: true,
                paging:         true,
                language: {
                    url: './app/assets/lib/dataTable/spanish.json'
                }

            });
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