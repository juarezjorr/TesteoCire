var table = null;
var positionRow = 0;

$(document).ready(function () {
   verifica_usuario();
   inicial();
});

function inicial() {
    getCategoriasTable(); 
    getAlmacenes();
    //Open modal *
    $('#nuevaCategoria').on('click', function(){    
        LimpiaModal();
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

    $('#LimpiarFormulario').on('click', function () {
      LimpiaModal();
   });

    $('#CategoriasTable tbody').on('click', 'tr', function () {
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
function EditCategoria(id) {
    UnSelectRowTable();
    LimpiaModal();
    $('#titulo').text('Editar Catalago');
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
            getAlmacenes(respuesta.str_id);



          $('#CategoriaModal').modal('show');
        },
        error: function (EX) {console.log(EX);}
    }).done(function () {});

}
//confirm para borrar **
function ConfirmDeletCategoria(id,cantidad) {
    //UnSelectRowTable();

    console.log(cantidad);
    if(cantidad != 0){
      $('#NoBorrarModal').modal('show');
    }else{
      $('#BorrarCategoriaModal').modal('show');
      $('#IdCategoriaBorrar').val(id);
    }
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

            if ((respuesta = 1)) {
               var arrayObJ = IdCategoria.split(',');
               if(arrayObJ.length == 1){
                  table.row(':eq('+positionRow+')').remove().draw();
               }else{
                  table.rows({ selected: true }).remove().draw();
               }
               $('#BorrarCategoriaModal').modal('hide');
            }
            LimpiaModal();
        },
        error: function (EX) {console.log(EX);}
        }).done(function () {});
}

//Guardar Almacen **
function SaveCategoria() {
        var location = "Categorias/SaveCategoria";
        var IdCategoria = $('#IdCategoria').val();
        var NomCategoria = $('#NomCategoria').val();
        var idAlmacen = $('#selectRowAlmacen option:selected').attr('id');
        var NomAlmacen = $('#selectRowAlmacen option:selected').text();

        $.ajax({
            type: "POST",
            dataType: 'JSON',
            data: { IdCategoria : IdCategoria,
                    NomCategoria : NomCategoria, 
                    idAlmacen : idAlmacen
             },
            url: location,
        success: function (respuesta) {
            if(IdCategoria != ''){
               table.row(':eq('+positionRow+')').remove().draw();
            }
            if ((respuesta != 0)) {
               //getAlmacenesTable();
               var rowNode = table.row.add( {
                  [0]:  '<button onclick="EditProveedores('+respuesta+')" type="button" class="btn btn-default btn-icon-edit" aria-label="Left Align"><i class="fas fa-pen modif"></i></button><button onclick="ConfirmDeletProveedor('+respuesta+',0)" type="button" class="btn btn-default btn-icon-delete" aria-label="Left Align"><i class="fas fa-times-circle kill"></i></button>',
                  [1]:   respuesta,
                  [2]:   NomCategoria,
                  [3]:   NomAlmacen,
                  [4]:   idAlmacen,
                  [5]:   0,

               }).draw().node();
               $(rowNode).find('td').eq(0).addClass('edit');
               $(rowNode).find('td').eq(1).addClass('text-center');
               $(rowNode).find('td').eq(4).attr("hidden",true);
               $(rowNode).find('td').eq(5).attr("hidden",true);


              LimpiaModal();
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
    $('#formCategoria').removeClass('was-validated');
    $('#titulo').text('Nuevo Catalago');

}



//obtiene la informacion de tabla Proveedores *
function getCategoriasTable() {
   var location = 'Categorias/GetCategorias';                
   $('#CategoriasTable').DataTable().destroy();
   $("#tablaCategoriasRow").html('');

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
                   '<button onclick="EditCategoria(' + row.cat_id +')" type="button" class="btn btn-default btn-icon-edit" aria-label="Left Align"><i class="fas fa-pen modif"></i></button>' +
                   '<button onclick="ConfirmDeletCategoria(' + row.cat_id +','+row.cantidad+')" type="button" class="btn btn-default btn-icon-delete" aria-label="Left Align"><i class="fas fa-times-circle kill"></i></button>' +
               '</td>' +

               "<td class='dtr-control text-center'>" +
               row.cat_id +
               '</td>' +

               '<td>' +
               row.cat_name +
               '</td>' +

               '<td>' +
               row.str_name +
               '</td>' +

               '<td hidden>' +
               row.str_id +
               '</td>' +

               
               '<td hidden>' +
               row.cantidad +
               '</td>' +

               
               '</tr>';
            $('#tablaCategoriasRow').append(renglon);
         });

         let title = 'Categorias';
         let filename =
            title.replace(/ /g, '_') + '-' + moment(Date()).format('YYYYMMDD');

         table = $('#CategoriasTable').DataTable({
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
                        ConfirmDeletCategoria(idSelected);
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

function getAlmacenes(id) {
   $('#selectRowAlmacen').html("");
   var location = 'Almacenes/GetAlmacenes';
   $.ajax({
      type: 'POST',
      dataType: 'JSON',
      data: {id: id},
      url: location,
      success: function (respuesta) {
         console.log(respuesta);
         var renglon = "<option id='0'  value=''>Seleccione un Encargado...</option> ";
         respuesta.forEach(function (row, index) {
            renglon += '<option id=' + row.str_id + '  value="' + row.str_id + '">' + row.str_name + '</option> ';
         });
         $('#selectRowAlmacen').append(renglon);
         if (id != undefined) {
            $("#selectRowAlmacen option[value='" + id + "']").attr('selected', 'selected');
         }
      },
      error: function () {},
   }).done(function () {});
}

