var table = null;
$(document).ready(function() {
    getServiciosTable(); 
    //Open modal *
    $('#nuevoServicios').on('click', function(){    
        LimpiaModal();
        $('#formCategorias').removeClass('was-validated');
    });
    //Guardar almacen *
    $('#GuardarServicio').on('click', function(){   
        if(validaFormulario() == 1){
            SaveServicios();        
        }
    });
    //borra almacen +
    $('#BorrarProveedor').on('click', function(){    
        DeletServicio();
    });  
});

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
    return valor;
}

//Edita el Proveedores *
function EditServicios(id) {
    UnSelectRowTable();
    LimpiaModal();
    var location = "Servicios/GetServicio";
    $.ajax({
            type: "POST",
            dataType: 'JSON',
            data: { id : id
             },
            url: location,
        success: function (respuesta) {
            $('#NomServicio').val(respuesta.srv_name);
            $('#IdServicio').val(respuesta.srv_id);
            $('#DesServicio').val(respuesta.srv_description);

          $('#ServiciosModal').modal('show');
        },
        error: function (EX) {console.log(EX);}
    }).done(function () {});

}
//confirm para borrar **
function ConfirmDeletServicio(id) {
    UnSelectRowTable();
    $('#BorrarServiciosModal').modal('show');
    $('#IdServicioBorrar').val(id);
}

function UnSelectRowTable() {
    setTimeout(() => {table.rows().deselect();}, 10);
}



//BORRAR  * *
function DeletServicio() {
    var location = "Servicios/DeleteServicio";
    IdServicio = $('#IdServicioBorrar').val();
    $.ajax({
            type: "POST",
            dataType: 'JSON',
            data: { 
                    IdServicio : IdServicio
             },
            url: location,
        success: function (respuesta) {
            if(respuesta = 1){
                getServiciosTable(); 
                $('#BorrarServiciosModal').modal('hide');
            }
        },
        error: function (EX) {console.log(EX);}
        }).done(function () {});
}

//Guardar Almacen **
function SaveServicios() {
        var location = "Servicios/SaveServicios";
        var IdServicio = $('#IdServicio').val();
        var NomServicio = $('#NomServicio').val();
        var DesServicio = $('#DesServicio').val();

        $.ajax({
            type: "POST",
            dataType: 'JSON',
            data: { IdServicio : IdServicio,
                    NomServicio : NomServicio,
                    DesServicio : DesServicio
             },
            url: location,
        success: function (respuesta) {
            if(respuesta = 1){
                getServiciosTable();
                $('#ServiciosModal').modal('hide');
            }
        },
        error: function (EX) {console.log(EX);}
        }).done(function () {});    
}

//Limpia datos en modal  **
function LimpiaModal() {
    $('#NomServicio').val("");
    $('#IdServicio').val("");
    $("#DesServicio").val("");
}



//obtiene la informacion de tabla Proveedores *
function getServiciosTable() {
    var location = 'Servicios/GetServicios';                
    $('#ServiciosTable').DataTable().destroy();
    $("#tablaServiciosRow").html('');

    $.ajax({
            type: "POST",
            dataType: 'JSON',
            url: location,
            _success: function (respuesta) {
                var renglon = "";
                respuesta.forEach(function (row, index) {
                    renglon = "<tr>"
                        + "<td class='dtr-control'>" + row.srv_id + "</td>"
                        + "<td>" + row.srv_name + "</td>"
                        + "<td>" + row.srv_description + "</td>"
                        + '<td class="text-center"> '
                        + '<button onclick="EditServicios(' + row.srv_id + ')" type="button" class="btn btn-default btn-icon-edit" aria-label="Left Align"><i class="fas fa-pen"></i></button>'
                        + '<button onclick="ConfirmDeletServicio(' + row.srv_id + ')" type="button" class="btn btn-default btn-icon-delete" aria-label="Left Align"><i class="fas fa-trash"></i></button>'
                        + '</td>'
                        + "</tr>";
                    $("#tablaServiciosRow").append(renglon);

                });

                 table = $('#ServiciosTable').DataTable({
                    select: {
                        style: 'multi', info: false
                    },
                    lengthMenu: [[10, 50, 100, -1], ['10 Filas', '25 Filas', '50 Filas', 'Mostrar todo']],
                    dom: 'Bfrtip',
                    buttons: [{ extend: 'pdf', className: 'btnDatableAdd', text: '<i class="btn-add" >PDF</i>' },
                    { extend: 'excel', className: 'btnDatableAdd', text: '<i class="btn-add" >Excel</i>' },
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
                            if (idSelected != "") { ConfirmDeletServicio(idSelected); }
                        }
                    }
                    ],
                    columnDefs: [
                        { responsivePriority: 1, targets: 0 },
                        { responsivePriority: 2, targets: -1 }
                    ],
                    scrollY: "50vh",
                    scrollCollapse: true,
                    paging: true,
                    language: {
                        url: './app/assets/lib/dataTable/spanish.json'
                    }
                });

                $('#ServiciosTable tbody').on('click', 'tr', function () {
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
        get success() {
            return this._success;
        },
        set success(value) {
            this._success = value;
        },
        error: function () {
        }
    }).done(function () {
    });
}

