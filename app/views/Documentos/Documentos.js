var table = null;
var archivo = null;
$(document).ready(function () {
    getDocumentosTable();
    //Open modal *
    $('#nuevoDocumento').on('click', function () {
        LimpiaModal();
        $('#formCategorias').removeClass('was-validated');
    });

    //Open modal *
    $('#verDocumento').on('click', function () {
        verDocumento();
    });
    //Guardar almacen *
    $('#GuardarCategoria').on('click', function () {
        if (validaFormulario() == 1) {
            SaveDocumento();
        }
    });
    //borra almacen +
    $('#BorrarProveedor').on('click', function () {
        DeletCategoria();
    });

    bsCustomFileInput.init();


    $("#cargaFiles").change(function () {
        archivo = this.files[0];
        filename = this.files[0].name;
        var arrayName = filename.split(".");
        $('#NomDocumento').val(arrayName[0]);
        $('#ExtDocumento').val(arrayName[1]);

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
function verDocumento(id) {
    id = 4;
    var location = "Documentos/VerDocumento";
    $.ajax({
        type: "POST",
        dataType: 'JSON',
        data: {
            id: id
        },
        url: location,
        success: function (respuesta) {
            //console.log(respuesta);

            var a = document.createElement('a');
            a.href= "data:application/octet-stream;base64,"+respuesta;
            a.target = '_blank';
            a.download = 'filename.png';
            a.click();


        },
        error: function (EX) { console.log(EX); }
    }).done(function () { });

}

//Edita el Proveedores *
function EditCategoria(id) {
    UnSelectRowTable();
    LimpiaModal();
    var location = "Categorias/GetCategoria";
    $.ajax({
        type: "POST",
        dataType: 'JSON',
        data: {
            id: id
        },
        url: location,
        success: function (respuesta) {
            $('#NomCategoria').val(respuesta.cat_name);
            $('#idDocumento').val(respuesta.cat_id);
            $('#DocumentoModal').modal('show');
        },
        error: function (EX) { console.log(EX); }
    }).done(function () { });

}
//confirm para borrar **
function ConfirmDeletCategoria(id) {
    UnSelectRowTable();
    $('#BorrarDocumentoModal').modal('show');
    $('#idDocumentoBorrar').val(id);
}

function UnSelectRowTable() {
    setTimeout(() => { table.rows().deselect(); }, 10);
}



//BORRAR  * *
function DeletCategoria() {
    var location = "Categorias/DeleteCategoria";
    idDocumento = $('#idDocumentoBorrar').val();
    $.ajax({
        type: "POST",
        dataType: 'JSON',
        data: {
            idDocumento: idDocumento
        },
        url: location,
        success: function (respuesta) {
            if (respuesta = 1) {
                getDocumentosTable();
                $('#BorrarDocumentoModal').modal('hide');
            }
        },
        error: function (EX) { console.log(EX); }
    }).done(function () { });
}

//Guardar Almacen **
function SaveDocumento() {
    var location = "Documentos/SaveDocumento";
    var idDocumento = $('#idDocumento').val();
    var NomDocumento = $('#NomDocumento').val();
    var ExtDocumento = $('#ExtDocumento').val();
    var CodDocumento = $('#CodDocumento').val();



    var data = new FormData();
    data.append("file",archivo);
    data.append("NomDocumento", NomDocumento);
    data.append("Ext", ExtDocumento);
    data.append("idDocumento", idDocumento);
    data.append("CodDocumento", CodDocumento);



 $.ajax({
                type: "POST",
                //dataType: 'JSON',
                enctype: 'multipart/form-data',
                cache: false,
                contentType: false,
                processData: false,
                data:data,
                url: location,
            success: function (respuesta) {
                //console.log("llego");
                //console.log(respuesta);
               if(respuesta = 1){
                    getDocumentosTable();
                    $('#DocumentoModal').modal('hide');
                }  
         },
            error: function (EX) {console.log(EX);}
            }).done(function () {});  
} 

//Limpia datos en modal  **
function LimpiaModal() {
    $('#NomCategoria').val("");
    $('#idDocumento').val("");
    $("#selectTipoAlmacen").val("0");
}



//obtiene la informacion de tabla Proveedores *
function getDocumentosTable() {
    var location = 'Categorias/GetCategorias';
    $('#DocumentosTable').DataTable().destroy();
    $("#tablaDocumentosRow").html('');

    $.ajax({
        type: "POST",
        dataType: 'JSON',
        url: location,
        _success: function (respuesta) {
            var renglon = "";
            respuesta.forEach(function (row, index) {
                renglon = "<tr>"
                    + "<td class='dtr-control'>" + row.cat_id + "</td>"
                    + "<td>" + row.cat_name + "</td>"
                    + '<td class="text-center"> '
                    + '<button onclick="EditCategoria(' + row.cat_id + ')" type="button" class="btn btn-default btn-icon-edit" aria-label="Left Align"><i class="fas fa-pen"></i></button>'
                    + '<button onclick="ConfirmDeletCategoria(' + row.cat_id + ')" type="button" class="btn btn-default btn-icon-delete" aria-label="Left Align"><i class="fas fa-trash"></i></button>'
                    + '</td>'
                    + "</tr>";
                $("#tablaDocumentosRow").append(renglon);

            });

            table = $('#DocumentosTable').DataTable({
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

            $('#DocumentosTable tbody').on('click', 'tr', function () {
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

