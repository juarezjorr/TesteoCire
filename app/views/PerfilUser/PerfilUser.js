var table = null;
$(document).ready(function() {
    getPerfilesTable(); 
    //Modal - lista - Permisos
    $('#listDisponible').on('click', 'a', function(){    
        $(this).appendTo('#listAsignado');
    });
    
    $('#listAsignado').on('click', 'a', function(){    
        $(this).appendTo('#listDisponible');
    });

    //Open modal 
    $('#nuevoPerfil').on('click', function(){    
        LimpiaModal();
        getModulesList('',"Disp");
        $('#formPerfil').removeClass('was-validated');

    });

    $('#GuardarPerfil').on('click', function(){   
        if(validaFormulario() == 1){
            SavePerfil();        
        }
    });

    $('#BorrarPerfil').on('click', function(){    
        DeletPerfil();
    });    
});


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

function EditPerfil(id) {
    UnSelectRowTable();
    LimpiaModal();
    var location = "perfilUser/GetDataPerfil";
    $.ajax({
            type: "POST",
            dataType: 'JSON',
            data: { id : id
             },
            url: location,
        success: function (respuesta) {
            $('#NomPerfil').val(respuesta.prf_name);
            $('#CodPerfil').val(respuesta.prf_code);
            $('#DesPerfil').val(respuesta.prf_description);
            $('#IdPerfil').val(respuesta.prf_id);

            if(respuesta.prf_modulesAsing != ""){
                getModulesList(respuesta.prf_modulesAsing,"Asig");   //Asignados
            }
            getModulesList(respuesta.prf_modulesAsing,"Disp");//Disponibles

          $('#PerfilModal').modal('show');
        },
        error: function (EX) {console.log(EX);}
    }).done(function () {});

}

function ConfirmDeletPerfil(id) {
    UnSelectRowTable();
    $('#BorrarPerfilModal').modal('show');
    $('#IdPerfilBorrrar').val(id);
}

function UnSelectRowTable() {
    setTimeout(() => {table.rows().deselect();}, 10);
}

function DeletPerfil() {
    var location = "perfilUser/DeletePerfil";
    var IdPerfil = $('#IdPerfilBorrrar').val();
    console.log(IdPerfil);
    $.ajax({
            type: "POST",
            dataType: 'JSON',
            data: { 
                    IdPerfil : IdPerfil
             },
            url: location,
        success: function (respuesta) {
            if(respuesta = 1){
                getPerfilesTable(); 
                $('#BorrarPerfilModal').modal('hide');
            }
        },
        error: function (EX) {console.log(EX);}
        }).done(function () {});
}

//Guardar perfil
function SavePerfil() {
        var location = "perfilUser/SavePerfil";
        var NomPerfil = $('#NomPerfil').val();
        var DesPerfil = $('#DesPerfil').val();
        var CodPerfil = $('#CodPerfil').val();
        var IdPerfil = $('#IdPerfil').val();

        var modulesAsig = "";

        $('#listAsignado').children('a').each(function(){
            modulesAsig += $(this).attr('id') + ",";
        });
        modulesAsig = modulesAsig.slice(0,-1);

        $.ajax({
            type: "POST",
            dataType: 'JSON',
            data: { NomPerfil : NomPerfil,
                    DesPerfil : DesPerfil,
                    CodPerfil : CodPerfil,
                    IdPerfil : IdPerfil,
                    modulesAsig : modulesAsig
             },
            url: location,
        success: function (respuesta) {
            if(respuesta = 1){
                getPerfilesTable()
                $('#PerfilModal').modal('hide');
            }else{
                
            }
        },
        error: function (EX) {console.log(EX);}
        }).done(function () {});
    
}

//Limpia datos en modal perfil
function LimpiaModal() {
    $('#NomPerfil').val("");
    $('#CodPerfil').val("");
    $('#DesPerfil').val("");
    $('#IdPerfil').val("");
    $('#listDisponible').html("");
    $('#listAsignado').html("");
}

//obtiene la informacion de tabla perfiles
function getPerfilesTable() {
    var location = 'perfilUser/GetPerfiles';                
    $('#perfilesTable').DataTable().destroy();
    $("#tablaPerfilesRow").html('');

    $.ajax({
            type: "GET",
            dataType: 'JSON',
            url: location,
        success: function (respuesta) {
            var renglon = "";
            respuesta.forEach(function(row, index) {
                renglon = "<tr>"
                        + "<td class='dtr-control'>" + row.prf_id + "</td>"
                        + "<td>" + row.prf_code + "</td>"
                        + "<td>" + row.prf_name + "</td>"
                        + "<td>" + row.prf_description + "</td>"
                        + '<td class="text-center"> '
                        + '<button onclick="EditPerfil('+ row.prf_id +')" type="button" class="btn btn-default btn-icon-edit" aria-label="Left Align"><i class="fas fa-pen"></i></button>'
                        + '<button onclick="ConfirmDeletPerfil('+ row.prf_id +')" type="button" class="btn btn-default btn-icon-delete" aria-label="Left Align"><i class="fas fa-trash"></i></button>' 
                        + '</td>'
                        + "</tr>";
                $("#tablaPerfilesRow").append(renglon);

            });


            table = $('#perfilesTable').DataTable({
                select: {
                    style: 'multi', info: false
                },
                lengthMenu: [ [10, 50, 100, -1], ['10 Filas', '25 Filas', '50 Filas', 'Mostrar todo'] ], 
                dom: 'Bfrtip', 
                buttons: [ { extend: 'pdf', className: 'btnDatableAdd',text: '<i class="btn-add" >PDF</i>' },
                           { extend: 'excel', className: 'btnDatableAdd',text: '<i class="btn-add" >Excel</i>' }, 
                           { extend: 'pageLength', className: 'btnDatableAdd' },
                           {
                            text: 'Borrar seleccionados', className: 'btnDatableAddRed',
                            action: function () {
                                var selected = table.rows({ selected: true }).data();
                                var idSelected = "";
                                selected.each(function (index) {
                                    idSelected += index[0] + ",";
                                });
                                idSelected = idSelected.slice(0, -1);
                                if (idSelected != "") { ConfirmDeletPerfil(idSelected); }
                            }
                        }
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

            $('#perfilesTable tbody').on('click', 'tr', function () {
                setTimeout(() => {
                    RenglonesSelection = table.rows({ selected: true }).count();
                    if (RenglonesSelection == 0 || RenglonesSelection == 1) {
                        $(".btnDatableAddRed").css("visibility", "hidden");
                    } else {
                        $(".btnDatableAddRed").css("visibility", "visible");
                    }
                }, 10);
            });


        },
        error: function () {
        }
    }).done(function () {
    });
}

//Optiene los modulos 
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
                    renglon ='<a href="#" class="list-group-item list-group-item-action" id="'+row.mod_id+'">'+row.mod_code+' - '+row.mod_name+'<br><span class="list-group-item-Text">'+row.mod_description+'</span></a>';
                    $("#listAsignado").append(renglon);
                });
            }else{
                respuesta.forEach(function(row, index) {
                    renglon ='<a href="#" class="list-group-item list-group-item-action" id="'+row.mod_id+'">'+row.mod_code+' - '+row.mod_name+'<br><span class="list-group-item-Text" >'+row.mod_description+'</span></a>';
                    $("#listDisponible").append(renglon);
                });
            }
        },
        error: function () {
        }
    }).done(function () {
    });
}
