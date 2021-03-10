var table = null;
$(document).ready(function() {
    getCategoriasTable(); 
    //Open modal *
    $('#nuevaCategoria').on('click', function(){    
        LimpiaModal();
        $('#formCategorias').removeClass('was-validated');
    });
    //Guardar almacen *
    $('#GuardarCategoria').on('click', function(){   
        if(validaFormulario() == 1){
            SaveCategoria();        
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
function EditCategoria(id) {
    UnSelectRowTable();
    LimpiaModal();
    var location = "Categorias/GetCategoria";
    $.ajax({
            type: "POST",
            dataType: 'JSON',
            data: { id : id
             },
            url: location,
        success: function (respuesta) {
            $('#NomCategoria').val(respuesta.cat_name);
            $('#IdCategoria').val(respuesta.cat_id);
          $('#CategoriaModal').modal('show');
        },
        error: function (EX) {console.log(EX);}
    }).done(function () {});

}
//confirm para borrar **
function ConfirmDeletCategoria(id) {
    UnSelectRowTable();
    $('#BorrarCategoriaModal').modal('show');
    $('#IdCategoriaBorrar').val(id);
}

function UnSelectRowTable() {
    setTimeout(() => {table.rows().deselect();}, 10);
}



//BORRAR  * *
function DeletCategoria() {
    var location = "Categorias/DeleteCategoria";
    IdCategoria = $('#IdCategoriaBorrar').val();
    $.ajax({
            type: "POST",
            dataType: 'JSON',
            data: { 
                    IdCategoria : IdCategoria
             },
            url: location,
        success: function (respuesta) {
            if(respuesta = 1){
                getCategoriasTable(); 
                $('#BorrarCategoriaModal').modal('hide');
            }
        },
        error: function (EX) {console.log(EX);}
        }).done(function () {});
}

//Guardar Almacen **
function SaveCategoria() {
        var location = "Categorias/SaveCategoria";
        var IdCategoria = $('#IdCategoria').val();
        var NomCategoria = $('#NomCategoria').val();
        $.ajax({
            type: "POST",
            dataType: 'JSON',
            data: { IdCategoria : IdCategoria,
                    NomCategoria : NomCategoria
             },
            url: location,
        success: function (respuesta) {
            if(respuesta = 1){
                getCategoriasTable();
                $('#CategoriaModal').modal('hide');
            }
        },
        error: function (EX) {console.log(EX);}
        }).done(function () {});    
}

//Limpia datos en modal  **
function LimpiaModal() {
    $('#NomCategoria').val("");
    $('#IdCategoria').val("");
    $("#selectTipoAlmacen").val( "0" );
}



//obtiene la informacion de tabla Proveedores *
function getCategoriasTable() {
    var location = 'Categorias/GetCategorias';                
    $('#CategoriasTable').DataTable().destroy();
    $("#tablaCategoriasRow").html('');

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
                    $("#tablaCategoriasRow").append(renglon);

                });

                 table = $('#CategoriasTable').DataTable({
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

                $('#CategoriasTable tbody').on('click', 'tr', function () {
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

