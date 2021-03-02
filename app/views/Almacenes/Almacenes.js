$(document).ready(function() {
    getAlmacenesTable(); 
    //Open modal *
    $('#nuevoAlmacen').on('click', function(){    
        LimpiaModal();
        $('#formProveedor').removeClass('was-validated');
    });
    //Guardar almacen *
    $('#GuardarAlmacen').on('click', function(){   
        if(validaFormulario() == 1){
            SaveAlmacen();        
        }
    });
    //borra almacen +
    $('#BorrarProveedor').on('click', function(){    
        DeletAlmacen();
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
function EditAlmacen(id) {
    LimpiaModal();
    var location = "Almacenes/GetAlmacen";
    $.ajax({
            type: "POST",
            dataType: 'JSON',
            data: { id : id
             },
            url: location,
        success: function (respuesta) {
            console.log(respuesta);
            $('#NomAlmacen').val(respuesta.str_name);
            $('#IdAlmacen').val(respuesta.str_id);
            $("#selectTipoAlmacen option[id='"+respuesta.str_type+"']").attr("selected", "selected");
          $('#AlmacenModal').modal('show');
        },
        error: function (EX) {console.log(EX);}
    }).done(function () {});

}
//confirm para borrar **
function ConfirmDeletAlmacen(id) {
    $('#BorrarAlmacenModal').modal('show');
    $('#IdAlmacenBorrar').val(id);
}
//BORRAR  * *
function DeletAlmacen() {
    var location = "Almacenes/DeleteAlmacen";
    IdAlmacen = $('#IdAlmacenBorrar').val();
    $.ajax({
            type: "POST",
            dataType: 'JSON',
            data: { 
                    IdAlmacen : IdAlmacen
             },
            url: location,
        success: function (respuesta) {
            if(respuesta = 1){
                getAlmacenesTable(); 
                $('#BorrarAlmacenModal').modal('hide');
            }
        },
        error: function (EX) {console.log(EX);}
        }).done(function () {});
}

//Guardar Almacen **
function SaveAlmacen() {
        var location = "Almacenes/SaveAlmacen";
        var IdAlmacen = $('#IdAlmacen').val();
        var NomAlmacen = $('#NomAlmacen').val();
        var tipoAlmacen = $("#selectTipoAlmacen option:selected").attr("id");
        $.ajax({
            type: "POST",
            dataType: 'JSON',
            data: { IdAlmacen : IdAlmacen,
                    NomAlmacen : NomAlmacen,
                    tipoAlmacen : tipoAlmacen
             },
            url: location,
        success: function (respuesta) {
            if(respuesta = 1){
                getAlmacenesTable();
                $('#AlmacenModal').modal('hide');
            }
        },
        error: function (EX) {console.log(EX);}
        }).done(function () {});    
}

//Limpia datos en modal  **
function LimpiaModal() {
    $('#NomAlmacen').val("");
    $('#IdAlmacen').val("");
    $("#selectTipoAlmacen").val( "0" );
}



//obtiene la informacion de tabla Proveedores *
function getAlmacenesTable() {
    var location = 'Almacenes/GetAlmacenes';                
    $('#AlmacenesTable').DataTable().destroy();
    $("#tablaAlmacenesRow").html('');

    $.ajax({
            type: "POST",
            dataType: 'JSON',
            url: location,
            _success: function (respuesta) {
                var renglon = "";
                respuesta.forEach(function (row, index) {
                    renglon = "<tr>"
                        + "<td class='dtr-control'>" + row.str_id + "</td>"
                        + "<td>" + row.str_name + "</td>"
                        + "<td>" + row.str_type + "</td>"
                        + '<td class="text-center"> '
                        + '<button onclick="EditAlmacen(' + row.str_id + ')" type="button" class="btn btn-default btn-icon-edit" aria-label="Left Align"><i class="fas fa-pen"></i></button>'
                        + '<button onclick="ConfirmDeletAlmacen(' + row.str_id + ')" type="button" class="btn btn-default btn-icon-delete" aria-label="Left Align"><i class="fas fa-trash"></i></button>'
                        + '</td>'
                        + "</tr>";
                    $("#tablaAlmacenesRow").append(renglon);

                });

                var table = $('#AlmacenesTable').DataTable({
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
                            if (idSelected != "") { ConfirmDeletAlmacen(idSelected); }
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

                $('#AlmacenesTable tbody').on('click', 'tr', function () {
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

