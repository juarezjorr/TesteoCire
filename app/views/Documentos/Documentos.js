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
    GetTypeDocumento();

    $("#cargaFiles").change(function () {
        archivo = this.files[0];
        filename = this.files[0].name;
        //var arrayName = filename.split(".");
        $('#NomDocumento').val(filename.split('.').slice(0, -1).join('.'));
        var extenArchivo =  filename.split('.').pop().toLowerCase();
        $('#ExtDocumento').val(extenArchivo);

        if(extenArchivo == "jpg" || extenArchivo == "pdf" || extenArchivo == "png"){
        }else{
            $('#filtroDocumentoModal').modal('show');
            $('#cargaFiles').val('');
        }

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
            $('.btn-apply').addClass('hidden-field');
         } else {
            $('.btn-apply').removeClass('hidden-field');
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
            GetTypeDocumento(respuesta.dot_id);
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

    var tipoDocumento = $('#selectRowTipoDocumento option:selected').attr('id');
    var tipoDocumentoText = $('#selectRowTipoDocumento option:selected').text();



    var data = new FormData();
    data.append("file",archivo);
    data.append("NomDocumento", NomDocumento);
    data.append("Ext", ExtDocumento);
    data.append("idDocumento", idDocumentos);
    data.append("CodDocumento", CodDocumento);
    data.append("tipoDocumento", tipoDocumento);


    if(ExtDocumento == "jpg" || ExtDocumento == "pdf" || ExtDocumento == "png"){
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
                   [3]:   tipoDocumento,
                   [4]:   tipoDocumentoText,
                   [5]:   CodDocumento,
                   [6]:   ExtDocumento
                }).draw().node();
                $( rowNode ).find('td').eq(0).addClass('edit');
                $( rowNode ).find('td').eq(1).addClass('text-center');
                $(rowNode).find('td').eq(1).attr("hidden",true);
                $(rowNode).find('td').eq(3).attr("hidden",true);


               LimpiaModal();
             }
        },
        error: function (EX) {console.log(EX);}
        }).done(function () {}); 
    }else {
        $('#filtroDocumentoModal').modal('show');
    }

} 


//Limpia datos en modal  **
function LimpiaModal() {
    $('#cargaFiles').val('');
    $('#IdDocumentNew').val("");
    $('#NomDocumento').val("");
    $('#IdDocumento').val("");
    $('#CodDocumento').val("");
    $('#formDocumento').removeClass('was-validated');
    $('#titulo').text('Nuevo Documento');
    GetTypeDocumento();

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
            //console.log(respuesta.doc_type);
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

               "<td class='dtr-control text-center' hidden>" +
               row.doc_id +
               '</td>' +

               '<td>' +
               row.doc_name +
               '</td>' +

               '<td hidden>' +
               row.dot_id +
               '</td>' +

               '<td>' +
               row.dot_name +
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
                  className: 'btn-apply hidden-field',
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



// Optiene los tipos de documentos
function GetTypeDocumento(id) {
    $('#selectRowTipoDocumento').html("");
    var location = 'Documentos/GetTypeDocumento';
    $.ajax({
       type: 'POST',
       dataType: 'JSON',
       data: {id: id},
       url: location,
       success: function (respuesta) {
          var renglon = "<option id='0'  value=''>Seleccione...</option> ";
          respuesta.forEach(function (row, index) {
             renglon += '<option id=' + row.dot_id + '  value="' + row.dot_id + '">' + row.dot_name + '</option> ';
          });
          $('#selectRowTipoDocumento').append(renglon);
          if (id != undefined) {
             $("#selectRowTipoDocumento option[value='" + id + "']").attr('selected', 'selected');
          }
       },
       error: function () {},
    }).done(function () {});
 }

