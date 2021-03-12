var table = null;
$(document).ready(function() {
    getPuestoTable(); 
    //Open modal *
    $('#nuevoPuesto').on('click', function(){    
        LimpiaModal();
        $('#formCategorias').removeClass('was-validated');
    });
    //Guardar almacen *
    $('#GuardarCategoria').on('click', function(){   
        if(validaFormulario() == 1){
            SavePuesto();        
        }
    });
    //borra almacen +
    $('#BorrarProveedor').on('click', function(){    
        DeletCategoria();
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
function EditPuesto(id) {
    UnSelectRowTable();
    LimpiaModal();
    var location = "Puestos/GetPuesto";
    $.ajax({
            type: "POST",
            dataType: 'JSON',
            data: { id : id
             },
            url: location,
        success: function (respuesta) {
            $('#NomPuesto').val(respuesta.pos_name);
            $('#IdPuesto').val(respuesta.pos_id);
            $('#DesPuesto').val(respuesta.pos_description);
          $('#PuestoModal').modal('show');
        },
        error: function (EX) {console.log(EX);}
    }).done(function () {});

}
//confirm para borrar **
function ConfirmDeletCategoria(id) {
    UnSelectRowTable();
    $('#BorrarPuestoModal').modal('show');
    $('#IdPuestoBorrar').val(id);
}

function UnSelectRowTable() {
    setTimeout(() => {table.rows().deselect();}, 10);
}

//BORRAR  * *
function DeletCategoria() {
    var location = "Puestos/DeletePuesto";
    IdPuesto = $('#IdPuestoBorrar').val();
    $.ajax({
            type: "POST",
            dataType: 'JSON',
            data: { 
                    IdPuesto : IdPuesto
             },
            url: location,
        success: function (respuesta) {
            if(respuesta = 1){
                getPuestoTable(); 
                $('#BorrarPuestoModal').modal('hide');
            }
        },
        error: function (EX) {console.log(EX);}
        }).done(function () {});
}

//Guardar Almacen **
function SavePuesto() {
        var location = "puestos/SavePuesto";
        var IdPuesto = $('#IdPuesto').val();
        var NomPuesto = $('#NomPuesto').val();
        var DesPuesto = $('#DesPuesto').val();

        $.ajax({
            type: "POST",
            dataType: 'JSON',
            data: { IdPuesto : IdPuesto,
                    NomPuesto : NomPuesto,
                    DesPuesto : DesPuesto
             },
            url: location,
        success: function (respuesta) {
            if(respuesta = 1){
                getPuestoTable();
                $('#PuestoModal').modal('hide');
            }
        },
        error: function (EX) {console.log(EX);}
        }).done(function () {});    
}

//Limpia datos en modal  **
function LimpiaModal() {
    $('#NomPuesto').val("");
    $('#IdPuesto').val("");
    $('#DesPuesto').val("");
}



//obtiene la informacion de tabla Proveedores *
function getPuestoTable() {
    var location = 'Puestos/GetPuestos';                
    $('#PuestoTable').DataTable().destroy();
    $("#tablaPuestoRow").html('');

    $.ajax({
            type: "POST",
            dataType: 'JSON',
            url: location,
            _success: function (respuesta) {
                var renglon = "";
                respuesta.forEach(function (row, index) {
                    renglon = "<tr>"
                        + "<td class='dtr-control'>" + row.pos_id + "</td>"
                        + "<td>" + row.pos_name + "</td>"
                        + "<td>" + row.pos_description + "</td>"
                        + '<td class="text-center"> '
                        + '<button onclick="EditPuesto(' + row.pos_id + ')" type="button" class="btn btn-default btn-icon-edit" aria-label="Left Align"><i class="fas fa-pen"></i></button>'
                        + '<button onclick="ConfirmDeletCategoria(' + row.pos_id + ')" type="button" class="btn btn-default btn-icon-delete" aria-label="Left Align"><i class="fas fa-trash"></i></button>'
                        + '</td>'
                        + "</tr>";
                    $("#tablaPuestoRow").append(renglon);

                });

                 table = $('#PuestoTable').DataTable({
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
                            if (idSelected != "") { ConfirmDeletCategoria(idSelected); }
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

                $('#PuestoTable tbody').on('click', 'tr', function () {
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

