$(document).ready(function() {
    getProveedoresTable(); 
    //Open modal *
    $('#nuevoProveedor').on('click', function(){    
        LimpiaModal();
        $('#formProveedor').removeClass('was-validated');
    });

    //Guardar Usuario *
    $('#GuardarUsuario').on('click', function(){   
        if(validaFormulario() == 1){
            SaveProveedores();        
        }
    });
    //borra Usuario +
    $('#BorrarProveedor').on('click', function(){    
        DeletProveedor();
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
function EditProveedores(id) {
    LimpiaModal();
    var location = "Proveedores/GetProveedor";
    $.ajax({
            type: "POST",
            dataType: 'JSON',
            data: { id : id
             },
            url: location,
        success: function (respuesta) {
            //console.log(respuesta);
            $('#NomProveedor').val(respuesta.sup_buseiness_name);
            $('#RfcProveedor').val(respuesta.sup_rfc);
            $('#EmpIdProveedor').val(respuesta.emp_id);
            $('#IdProveedor').val(respuesta.sup_id);
            $('#ContactoProveedor').val(respuesta.sup_contact);
            $('#EmailProveedor').val(respuesta.sup_emal);
            $('#PhoneProveedor').val(respuesta.sup_phone);

          $('#ProveedorModal').modal('show');
        },
        error: function (EX) {console.log(EX);}
    }).done(function () {});

}

//confirm para borrar **
function ConfirmDeletProveedor(id) {
    $('#BorrarProveedorModal').modal('show');
    $('#IdProveedorBorrar').val(id);
}
//BORRAR  * *
function DeletProveedor() {
    var location = "Proveedores/DeleteProveedores";
    IdProveedor = $('#IdProveedorBorrar').val();
    $.ajax({
            type: "POST",
            dataType: 'JSON',
            data: { 
                    IdProveedor : IdProveedor
             },
            url: location,
        success: function (respuesta) {
            if(respuesta = 1){
                getProveedoresTable(); 
                $('#BorrarProveedorModal').modal('hide');
            }
        },
        error: function (EX) {console.log(EX);}
        }).done(function () {});
}

//Guardar Proveedores **
function SaveProveedores() {
        var location = "Proveedores/SaveProveedores";
        var IdProveedor = $('#IdProveedor').val();
        var NomProveedor = $('#NomProveedor').val();
        var ContactoProveedor = $('#ContactoProveedor').val();
        var RfcProveedor = $('#RfcProveedor').val();
        var EmailProveedor = $('#EmailProveedor').val();
        var PhoneProveedor = $('#PhoneProveedor').val();         

        $.ajax({
            type: "POST",
            dataType: 'JSON',
            data: { IdProveedor : IdProveedor,
                    NomProveedor : NomProveedor,
                    ContactoProveedor : ContactoProveedor,
                    RfcProveedor : RfcProveedor,
                    EmailProveedor : EmailProveedor,
                    PhoneProveedor : PhoneProveedor
             },
            url: location,
        success: function (respuesta) {
            if(respuesta = 1){
                getProveedoresTable();
                $('#ProveedorModal').modal('hide');
            }
        },
        error: function (EX) {console.log(EX);}
        }).done(function () {});    
}

//Limpia datos en modal  **
function LimpiaModal() {
    $('#NomProveedor').val("");
    $('#RfcProveedor').val("");
    $('#EmpIdProveedor').val("");
    $('#IdProveedor').val("");
    $('#ContactoProveedor').val("");
    $('#EmailProveedor').val("");
    $('#PhoneProveedor').val("");
}



//obtiene la informacion de tabla Proveedores *
function getProveedoresTable() {
    var location = 'Proveedores/GetProveedores';                
    $('#ProveedoresTable').DataTable().destroy();
    $("#tablaProveedoresRow").html('');

    $.ajax({
            type: "POST",
            dataType: 'JSON',
            url: location,
            _success: function (respuesta) {
                var renglon = "";
                respuesta.forEach(function (row, index) {
                    renglon = "<tr>"
                        + "<td class='dtr-control'>" + row.sup_id + "</td>"
                        + "<td>" + row.sup_buseiness_name + "</td>"
                        + "<td>" + row.sup_contact + "</td>"
                        + "<td>" + row.sup_rfc + "</td>"
                        + "<td>" + row.sup_emal + "</td>"
                        + "<td>" + row.sup_phone + "</td>"
                        + '<td class="text-center"> '
                        + '<button onclick="EditProveedores(' + row.sup_id + ')" type="button" class="btn btn-default btn-icon-edit" aria-label="Left Align"><i class="fas fa-pen"></i></button>'
                        + '<button onclick="ConfirmDeletProveedor(' + row.sup_id + ')" type="button" class="btn btn-default btn-icon-delete" aria-label="Left Align"><i class="fas fa-trash"></i></button>'
                        + '</td>'
                        + "</tr>";
                    $("#tablaProveedoresRow").append(renglon);

                });

                var table = $('#ProveedoresTable').DataTable({
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
                            if (idSelected != "") { console.log(idSelected);ConfirmDeletProveedor(idSelected); }
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

                $('#ProveedoresTable tbody').on('click', 'tr', function () {
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

