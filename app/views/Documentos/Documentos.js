var table = null;
var positionRow = 0;
var archivo = null;

$(document).ready(function () {
   verifica_usuario();
   inicial();
});

function inicial() {
    getDocumentosTable(); 
    bsCustomFileInput.init();

    $("#cargaFiles").change(function () {
        archivo = this.files[0];
        filename = this.files[0].name;
        //var arrayName = filename.split(".");
        $('#NomDocumento').val(filename.split('.').slice(0, -1).join('.'));
        $('#ExtDocumento').val( filename.split('.').pop().toLowerCase());
    });

    //Open modal *
    $('#nuevaCategoria').on('click', function(){    
        LimpiaModal();
    });
    //Guardar almacen *
    $('#GuardarDocumento').on('click', function(){   
        if(validaFormulario() == 1){
            SaveDocumento();        
        }
    });
    //borra almacen +
    $('#BorrarProveedor').on('click', function(){    
        DeletDocumentos();
    });  

    $('#LimpiarFormulario').on('click', function () {
      LimpiaModal();
   });

    $('#DocumentosTable tbody').on('click', 'tr', function () {
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
function EditDocumento(id) {
    UnSelectRowTable();
    LimpiaModal();
    $('#titulo').text('Editar Documento');
    var location = "documentos/GetDocumento";
    $.ajax({
            type: "POST",
            dataType: 'JSON',
            data: { id : id
             },
            url: location,
        success: function (respuesta) {
            //console.log(respuesta);
            $('#NomDocumento').val(respuesta.doc_name);
            $('#IdDocumentNew').val(respuesta.doc_id);
            $('#ExtDocumento').val(respuesta.doc_type);
            $('#CodDocumento').val(respuesta.doc_code);
        },
        error: function (EX) {console.log(EX);}
    }).done(function () {});
}
//confirm para borrar **
function ConfirmDeletDocumento(id) {
    //UnSelectRowTable();
    $('#BorrarDocumentosModal').modal('show');
    $('#IdDocumentoBorrar').val(id);
}

function UnSelectRowTable() {
    setTimeout(() => {table.rows().deselect();}, 10);
}



//BORRAR  * *
function DeletDocumentos() {
    var location = "documentos/DeleteDocumentos";
    IdDocumento = $('#IdDocumentoBorrar').val();
    $.ajax({
            type: "POST",
            dataType: 'JSON',
            data: { 
                    IdDocumento : IdDocumento
             },
            url: location,
        success: function (respuesta) {

            if ((respuesta = 1)) {
               var arrayObJ = IdDocumento.split(',');
               if(arrayObJ.length == 1){
                  table.row(':eq('+positionRow+')').remove().draw();
               }else{
                  table.rows({ selected: true }).remove().draw();
               }
               $('#BorrarDocumentosModal').modal('hide');
            }
            LimpiaModal();
        },
        error: function (EX) {console.log(EX);}
        }).done(function () {});
}



//Guardar Almacen **
function SaveDocumento() {
    var location = "Documentos/SaveDocumento";
    var idDocumentos = $('#IdDocumentNew').val();
    var NomDocumento = $('#NomDocumento').val();
    var ExtDocumento = $('#ExtDocumento').val();
    var CodDocumento = $('#CodDocumento').val();

    var data = new FormData();
    data.append("file",archivo);
    data.append("NomDocumento", NomDocumento);
    data.append("Ext", ExtDocumento);
    data.append("idDocumento", idDocumentos);
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
            if(idDocumentos != ""){
                table.row(':eq('+positionRow+')').remove().draw();
             }
             if ((respuesta != 0)) {
                var rowNode = table.row.add( {
                   [0]:  '<button onclick="VerDocumento(' + respuesta +')" type="button" class="btn btn-default btn-icon-edit" aria-label="Left Align"><i class="fas fa-eye modif"></i></button><button onclick="EditDocumento('+respuesta+')" type="button" class="btn btn-default btn-icon-edit" aria-label="Left Align"><i class="fas fa-pen modif"></i></button><button onclick="ConfirmDeletDocumento('+respuesta+')" type="button" class="btn btn-default btn-icon-delete" aria-label="Left Align"><i class="fas fa-times-circle kill"></i></button>',
                   [1]:   respuesta,
                   [2]:   NomDocumento,
                   [3]:   CodDocumento,
                   [4]:   ExtDocumento
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
    $('#cargaFiles').val('')
    $('#IdDocumentNew').val("");
    $('#NomDocumento').val("");
    $('#IdDocumento').val("");
    $('#CodDocumento').val("");
    $('#formDocumento').removeClass('was-validated');
    $('#titulo').text('Nuevo Documento');

}

//ver Documentos
function VerDocumento(id) {
    var location = "Documentos/VerDocumento";
    $.ajax({
        type: "POST",
        dataType: 'JSON',
        data: {
            id: id
        },
        url: location,
        success: function (respuesta) {
            console.log(respuesta.doc_type);
            var a = document.createElement('a');
            a.href= "data:application/octet-stream;base64,"+respuesta.doc_document;
            a.target = '_blank';
            a.download = respuesta.doc_name;

            //a.download = respuesta.doc_name + "."+ respuesta.doc_type.trim();
            a.click();
        },
        error: function (jqXHR, textStatus, errorThrown){
            console.log( jqXHR, textStatus, errorThrown);
        }
    }).done(function () { });
} 

//obtiene la informacion de tabla Proveedores *
function getDocumentosTable() {
   var location = 'Documentos/GetDocumentos';                
   $('#DocumentosTable').DataTable().destroy();
   $("#tablaDocumentosRow").html('');

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
                   '<button onclick="VerDocumento(' + row.doc_id +')" type="button" class="btn btn-default btn-icon-edit" aria-label="Left Align"><i class="fas fa-eye modif"></i></button>' +
                   '<button onclick="EditDocumento(' + row.doc_id +')" type="button" class="btn btn-default btn-icon-edit" aria-label="Left Align"><i class="fas fa-pen modif"></i></button>' +
                   '<button onclick="ConfirmDeletDocumento(' + row.doc_id +')" type="button" class="btn btn-default btn-icon-delete" aria-label="Left Align"><i class="fas fa-times-circle kill"></i></button>' +
               '</td>' +

               "<td class='dtr-control text-center'>" +
               row.doc_id +
               '</td>' +

               '<td>' +
               row.doc_name +
               '</td>' +

               '<td>' +
               row.doc_code +
               '</td>' +

               '<td>' +
               row.doc_type +
               '</td>' +
      
               '</tr>';
            $('#tablaDocumentosRow').append(renglon);
         });

         let title = 'Categorias';
         let filename =
            title.replace(/ /g, '_') + '-' + moment(Date()).format('YYYYMMDD');

         table = $('#DocumentosTable').DataTable({
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
                        ConfirmDeletDocumento(idSelected);
                     }
                  },
               },
            ],
            // columnDefs: [
            //    { responsivePriority: 1, targets: 0 },
            //    { responsivePriority: 2, targets: -1 },
            // ],
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

