var table = null;
$(document).ready(function() {
    getSubCategoriasTable("0"); 
    //Open modal *
    $('#nuevaSubCategoria').on('click', function(){    
        LimpiaModal();
        getCategorias();
        $('#formSubCategorias').removeClass('was-validated');
    });
    //Guardar almacen *
    $('#GuardarCategoria').on('click', function(){   
        if(validaFormulario() == 1){
            SaveSubCategoria();        
        }
    });
    //borra almacen +
    $('#BorrarSubCategoria').on('click', function(){    
        DeletSubCategoria();
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
function EditSubCategoria(id,idCategoria) {
    UnSelectRowTable();
    LimpiaModal();
    var location = "SubCategorias/GetSubCategoria";
    $.ajax({
            type: "POST",
            dataType: 'JSON',
            data: { id : id
             },
            url: location,
        success: function (respuesta) {
            $('#NomSubCategoria').val(respuesta.sbc_name);
            $('#IdSubCategoria').val(respuesta.sbc_id);
            $('#CodSubCategoria').val(respuesta.sbc_code);
            getCategorias(idCategoria)

          $('#SubCategoriaModal').modal('show');
        },
        error: function (EX) {console.log(EX);}
    }).done(function () {});

}
//confirm para borrar **
function ConfirmDeletSubCategoria(id) {
    UnSelectRowTable();
    $('#BorrarSubCategoriaModal').modal('show');
    $('#IdSubCategoriaBorrar').val(id);
}

function UnSelectRowTable() {
    setTimeout(() => {table.rows().deselect();}, 10);
}



//BORRAR  * *
function DeletSubCategoria() {
    var location = "SubCategorias/DeleteSubCategoria";
    IdSubCategoria = $('#IdSubCategoriaBorrar').val();
    $.ajax({
            type: "POST",
            dataType: 'JSON',
            data: { 
                    IdSubCategoria : IdSubCategoria
             },
            url: location,
        success: function (respuesta) {
            if(respuesta = 1){
                getSubCategoriasTable("0"); 
                $('#BorrarSubCategoriaModal').modal('hide');
            }
        },
        error: function (EX) {console.log(EX);}
        }).done(function () {});
}

//Guardar Almacen **
function SaveSubCategoria() {
        var location = "SubCategorias/SaveSubCategoria";
        var IdSubCategoria = $('#IdSubCategoria').val();
        var NomSubCategoria = $('#NomSubCategoria').val();
        var CodSubCategoria = $('#CodSubCategoria').val();
        var idCategoria = $("#selectRowCategorias option:selected").attr("id");


        $.ajax({
            type: "POST",
            dataType: 'JSON',
            data: { IdSubCategoria : IdSubCategoria,
                    NomSubCategoria : NomSubCategoria,
                    CodSubCategoria : CodSubCategoria,
                    idCategoria : idCategoria
             },
            url: location,
        success: function (respuesta) {
            if(respuesta = 1){
                getSubCategoriasTable("0");
                $('#SubCategoriaModal').modal('hide');
            }
        },
        error: function (EX) {console.log(EX);}
        }).done(function () {});    
}

//Limpia datos en modal  **
function LimpiaModal() {
    $('#NomSubCategoria').val("");
    $('#IdSubCategoria').val("");
    $('#selectRowCategorias').html("");
    $('#CodSubCategoria').val("");
}

// Optiene los categorias disponibles *
function getCategorias(id) {
    var location = 'categorias/GetCategorias';                
    $.ajax({
            type: "POST",
            dataType: 'JSON',
            data:{id:id},
            url: location,
        success: function (respuesta) {
            console.log(respuesta);
            var renglon = "<option id='0'  value=''>Seleccione una categoria...</option> ";
            respuesta.forEach(function(row, index) {
                renglon += '<option id='+row.cat_id+'  value="">'+row.cat_name+'</option> ';
            });
            $("#selectRowCategorias").append(renglon);
            if(id != ""){
                $("#selectRowCategorias option[id='"+id+"']").attr("selected", "selected");
            }
        },
        error: function () {
        }
    }).done(function () {
    });
}



//obtiene la informacion de tabla Proveedores *
function getSubCategoriasTable(idCategoria) {
    var location = 'SubCategorias/GetSubCategorias';                
    $('#SubCategoriasTable').DataTable().destroy();
    $("#tablaSubCategoriasRow").html('');

    $.ajax({
            type: "POST",
            dataType: 'JSON',
            data:{idCategoria:idCategoria},
            url: location,
            _success: function (respuesta) {
                var renglon = "";
                respuesta.forEach(function (row, index) {
                    renglon = "<tr>"
                        + "<td class='dtr-control'>" + row.sbc_id + "</td>"
                        + "<td>" + row.sbc_name + "</td>"
                        + "<td>" + row.sbc_code + "</td>"
                        + "<td>" + row.cat_name + "</td>"
                        + '<td class="text-center"> '
                        + '<button onclick="EditSubCategoria(' + row.sbc_id +','+ row.cat_id +')" type="button" class="btn btn-default btn-icon-edit" aria-label="Left Align"><i class="fas fa-pen"></i></button>'
                        + '<button onclick="ConfirmDeletSubCategoria(' + row.sbc_id + ')" type="button" class="btn btn-default btn-icon-delete" aria-label="Left Align"><i class="fas fa-trash"></i></button>'
                        + '</td>'
                        + "</tr>";
                    $("#tablaSubCategoriasRow").append(renglon);

                });

                 table = $('#SubCategoriasTable').DataTable({
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
                            if (idSelected != "") { ConfirmDeletSubCategoria(idSelected); }
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

                $('#SubCategoriasTable tbody').on('click', 'tr', function () {
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