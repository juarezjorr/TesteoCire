var table = null;
var positionRow = 0;

$(document).ready(function () {
    verifica_usuario();
    inicial();
 });

 function inicial() {
    getPuestoTable(); 
    //Open modal *
    $('#nuevoPuesto').on('click', function(){    
        LimpiaModal();
        $('#formPuestos').removeClass('was-validated');
    });
    //Guardar almacen *
    $('#GuardarPuesto').on('click', function(){   
        if(validaFormulario() == 1){
            SavePuesto();        
        }
    });
    //borra almacen +
    $('#BorrarPuesto').on('click', function(){    
        DeletPuesto();
    });  

    $('#LimpiarFormulario').on('click', function () {
        LimpiaModal();
     });
  
      $('#PuestoTable tbody').on('click', 'tr', function () {
        positionRow = (table.page.info().page * table.page.info().length) + $(this).index();
  
        setTimeout(() => {
           RenglonesSelection = table.rows({ selected: true }).count();
           if (RenglonesSelection == 0 || RenglonesSelection == 1) {
               $(".btn-apply").css("visibility", "hidden");
           } else {
               $(".btn-apply").css("visibility", "visible");
           }
       }, 10);
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
    return valor;
}

//Edita el Proveedores *
function EditPuesto(id) {
    UnSelectRowTable();
    LimpiaModal();
    $('#titulo').text('Editar Puesto');

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
function ConfirmDeletPuesto(id) {
    //UnSelectRowTable();
    $('#BorrarPuestoModal').modal('show');
    $('#IdPuestoBorrar').val(id);
}

function UnSelectRowTable() {
    setTimeout(() => {table.rows().deselect();}, 10);
}

//BORRAR  * *
function DeletPuesto() {
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
            if ((respuesta = 1)) {
                var arrayObJ = IdPuesto.split(',');
                if(arrayObJ.length == 1){
                   table.row(':eq('+positionRow+')').remove().draw();
                }else{
                   table.rows({ selected: true }).remove().draw();
                }
                $('#BorrarPuestoModal').modal('hide');
             }
             LimpiaModal();
        },
        error: function (EX) {console.log(EX);}
        }).done(function () {});
}

//Guardar Almacen **
function SavePuesto() {
        var location = "Puestos/SavePuesto";
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
            if(IdPuesto != ''){
                table.row(':eq('+positionRow+')').remove().draw();
             }
             if ((respuesta != 0)) {
                //getAlmacenesTable();
                var rowNode = table.row.add( {
                   [0]:  '<button onclick="EditPuesto('+respuesta+')" type="button" class="btn btn-default btn-icon-edit" aria-label="Left Align"><i class="fas fa-pen modif"></i></button><button onclick="ConfirmDeletPuesto('+respuesta+')" type="button" class="btn btn-default btn-icon-delete" aria-label="Left Align"><i class="fas fa-times-circle kill"></i></button>',
                   [1]:   respuesta,
                   [2]:   NomPuesto,
                   [3]:   DesPuesto
                }).draw().node();
                $( rowNode ).find('td').eq(0).addClass('edit');
                $( rowNode ).find('td').eq(1).addClass('text-center');
               LimpiaModal();
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
    $('#titulo').text('Nuevo Puesto');
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
                        + '<button onclick="ConfirmDeletPuesto(' + row.pos_id + ')" type="button" class="btn btn-default btn-icon-delete" aria-label="Left Align"><i class="fas fa-trash"></i></button>'
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
                            if (idSelected != "") { ConfirmDeletPuesto(idSelected); }
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

function getPuestoTable() {
    var location = 'Puestos/GetPuestos';                
    $('#PuestoTable').DataTable().destroy();
    $("#tablaPuestoRow").html('');
 
    $.ajax({
       type: 'POST',
       dataType: 'JSON',
       url: location,
       _success: function (respuesta) {
          var renglon = '';
          respuesta.forEach(function (row, index) {
             renglon =
                '<tr>' +
               
                '<td class="text-center edit"> ' +
                    '<button onclick="EditPuesto(' + row.pos_id +')" type="button" class="btn btn-default btn-icon-edit" aria-label="Left Align"><i class="fas fa-pen modif"></i></button>' +
                    '<button onclick="ConfirmDeletPuesto(' + row.pos_id +')" type="button" class="btn btn-default btn-icon-delete" aria-label="Left Align"><i class="fas fa-times-circle kill"></i></button>' +
                '</td>' +
 
                "<td class='dtr-control text-center'>" +
                row.pos_id +
                '</td>' +
 
                '<td>' +
                row.pos_name +
                '</td>' +

                '<td>' +
                row.pos_description +
                '</td>' +
 
                
                '</tr>';
             $('#tablaPuestoRow').append(renglon);
          });
 
          let title = 'Puesto';
          let filename =
             title.replace(/ /g, '_') + '-' + moment(Date()).format('YYYYMMDD');
 
          table = $('#PuestoTable').DataTable({
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
                   className: 'btn-apply',
                   action: function () {
                      var selected = table.rows({ selected: true }).data();
                      var idSelected = '';
                      selected.each(function (index) {
                         idSelected += index[1] + ',';
                      });
                      idSelected = idSelected.slice(0, -1);
                      if (idSelected != '') {
                         ConfirmDeletPuesto(idSelected);
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