var table = null;
var positionRow = 0;

$(document).ready(function () {
   verifica_usuario();
   inicial();
});

function inicial() {
    getProductosTable(); 
    cargaInicial();
    //Open modal *
    $('#nuevoProducto').on('click', function(){    
        LimpiaModal();
        getCategorias();
        getServicios(0);
        getProveedores();
        getAlmacenes();
        $('#formSubCategorias').removeClass('was-validated');
    });
    //Guardar almacen *
    $('#GuardarCategoria').on('click', function(){   
        if(validaFormulario() == 1){
            SaveProducto();        
        }
    });
    //borra almacen +
    $('#BorrarProduct').on('click', function(){    
        DeletProducto();
    });  

    $("#selectRowCategorias").change(function() {
        var idCategoria = $("#selectRowCategorias option:selected").attr("id");
        getSubCategorias(0,idCategoria);
    }); 

    $('#LimpiarFormulario').on('click', function () {
      LimpiaModal();
   });

    $('#ProductosTable tbody').on('click', 'tr', function () {
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





function cargaInicial() {
   LimpiaModal();
   getCategorias();
   getServicios(0);
   getProveedores();
   getAlmacenes();

   getTipoMoneda();
   getDocumentos();

   $('#formSubCategorias').removeClass('was-validated');
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
function EditProducto(id,idCategoria,idSubCategoria,idServicio,idAlmacen,idTipoMoneda,idProveedor,idVisible,idStoreProducto) {
    UnSelectRowTable();
    LimpiaModal();
    var location = "productos/GetProducto";
    $.ajax({
            type: "POST",
            dataType: 'JSON',
            data: { id : id
             },
            url: location,
        success: function (respuesta) {

            $('#NomProducto').val(respuesta.prd_name);
            $('#IdProducto').val(respuesta.prd_id);
            $('#idStoreProducto').val(idStoreProducto);

            $('#NomEngProducto').val(respuesta.prd_english_name);
            $('#ModelProducto').val(respuesta.prd_model);
            $('#SerieProducto').val(respuesta.prd_serial_number);
            $('#CostProducto').val(respuesta.prd_cost);
            $('#PriceProducto').val(respuesta.prd_price);
            $('#SkuProducto').val(respuesta.prd_sku);
            $('#DesProducto').val(respuesta.prd_comments);

            getCategorias(idCategoria);
            getSubCategorias(idSubCategoria,idCategoria);
            getProveedores(idProveedor);
            getServicios(idServicio);
            getAlmacenes(idAlmacen);
            $("#selectMonedaProducto option[id='"+idTipoMoneda+"']").attr("selected", "selected");
            if(idVisible == 1){ $( "#checkProducto" ).prop( "checked", true );}else{ $( "#checkProducto" ).prop( "checked", false ); }

            $('#ProductoModal').modal('show');
        },
        error: function (EX) {console.log(EX);}
    }).done(function () {});

}
//confirm para borrar **
function ConfirmDeletProducto(id) {
    //UnSelectRowTable();
    $('#BorrarProductoModal').modal('show');
    $('#IdProductoBorrar').val(id);
}

function UnSelectRowTable() {
    setTimeout(() => {table.rows().deselect();}, 10);
}

//BORRAR  * *
function DeletProducto() {
    var location = "productos/DeleteProducto";
    IdProducto = $('#IdProductoBorrar').val();
    $.ajax({
            type: "POST",
            dataType: 'JSON',
            data: { 
                    IdProducto : IdProducto
             },
            url: location,
        success: function (respuesta) {
            if(respuesta = 1){
                getProductosTable(); 
                $('#BorrarProductoModal').modal('hide');
            }
        },
        error: function (EX) {console.log(EX);}
        }).done(function () {});
}

function addZeroNumber(number, length) {
    var my_string = '' + number;
    var largo = my_string.length;
    if(largo > length){var restar = largo - length; my_string = my_string.substring(restar, largo); }
    while (my_string.length < length) {
        my_string = '0' + my_string;
    }
    return my_string;
}

//Guardar Almacen **
function SaveProducto() {
        var location = "productos/SaveProductos";

        var IdProducto = $('#IdProducto').val();
        var NomProducto = $('#NomProducto').val();
        var NomEngProducto = $('#NomEngProducto').val();
        var ModelProducto = $('#ModelProducto').val();
        var SerieProducto = $('#SerieProducto').val();
        var CostProducto = $('#CostProducto').val();
        var PriceProducto = $('#PriceProducto').val();
        var DesProducto = $('#DesProducto').val();
        var idStoreProducto = $('#idStoreProducto').val();

        var idMoneda = $("#selectMonedaProducto option:selected").attr("id");
        var idCategoria = $("#selectRowCategorias option:selected").attr("id");
        var idSubCategoria = $("#selectRowSubCategorias option:selected").attr("id");
        var idTipeService = $("#selectRowService option:selected").attr("id");
        var idProveedor = $("#selectRowProovedores option:selected").attr("id");
        var idAlmacen = $("#selectRowAlmacen option:selected").attr("id");
        var idDocumento = $("#selectRowAlmacen option:selected").attr("id");


/*         console.log(addZeroNumber(idCategoria,2));
        console.log(addZeroNumber(idSubCategoria,2));
        console.log(addZeroNumber(ModelProducto,3)); */




        var visible = 0;
        if( $('#checkProducto').prop('checked') ) {visible = 1;}

           $.ajax({
            type: "POST",
            dataType: 'JSON',
            data: { IdProducto : IdProducto,
                    NomProducto : NomProducto,
                    NomEngProducto : NomEngProducto,
                    SerieProducto : SerieProducto,
                    CostProducto : CostProducto,
                    ModelProducto : ModelProducto,
                    PriceProducto : PriceProducto,
                    DesProducto : DesProducto,
                    idSubCategoria : idSubCategoria,
                    idTipeService : idTipeService,
                    idProveedor : idProveedor,
                    idMoneda : idMoneda,
                    visible : visible,
                    idAlmacen : idAlmacen,
                    idStoreProducto : idStoreProducto, 
                    idDocumento : idDocumento,
                    idCategoria : idCategoria
             },
            url: location,
        success: function (respuesta) {
            if(respuesta = 1){
                getProductosTable();
                $('#ProductoModal').modal('hide');
            }
        },
        error: function (EX) {console.log(EX);}
        }).done(function () {}); 
}

//Limpia datos en modal  **
function LimpiaModal() {
    $('#NomProducto').val("");
    $('#IdProducto').val("");
    $('#NomEngProducto').val("");
    $('#ModelProducto').val("");
    $('#SerieProducto').val("");
    $('#CostProducto').val("");
    $('#PriceProducto').val("");
    $('#SkuProducto').val("");
    $('#DesProducto').val("");
    $("#selectRowSubCategorias").html("");
    $("#selectMonedaProducto").val( "0" );
    $( "#checkProducto" ).prop( "checked", true );
}

// Optiene las categorias *
function getCategorias(id) {
    $("#selectRowCategorias").html("");
    var location = 'Categorias/GetCategorias';                
    $.ajax({
            type: "POST",
            dataType: 'JSON',
            url: location,
        success: function (respuesta) {
            var renglon = "<option id='0'  value='0'>Seleccione...</option> ";
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

// Optiene las Sub subcategorias *
function getSubCategorias(id,idCategoria) {
    $("#selectRowSubCategorias").html("");
    var location = 'SubCategorias/GetSubCategorias';    
    $.ajax({
            type: "POST",
            dataType: 'JSON',
            data:{id:id,
                  idCategoria:idCategoria},
            url: location,
        success: function (respuesta) {
            var renglon = "<option id='0'  value='0'>Seleccione...</option> ";
            if(respuesta[0].cat_id != 0){
                respuesta.forEach(function(row, index) {
                    renglon += '<option id='+row.sbc_id+'  value="">'+row.sbc_name+'</option> ';
                }); 
             }

            $("#selectRowSubCategorias").append(renglon);
            if(idCategoria != ""){
                $("#selectRowSubCategorias option[id='"+id+"']").attr("selected", "selected");
            }
        },
        error: function () {
        }
    }).done(function () {
    });
}

// Optiene las Servicios *
function getServicios(id) {
    $("#selectRowService").html("");
    var location = 'servicios/GetServicios';                
    $.ajax({
            type: "POST",
            dataType: 'JSON',
            url: location,
        success: function (respuesta) {
            var renglon = "<option id='0'  value='0'>Seleccione...</option> ";
            respuesta.forEach(function(row, index) {
                renglon += '<option id='+row.srv_id+'  value="">'+row.srv_name+'</option> ';
            });
            $("#selectRowService").append(renglon);

            if(id != ""){
                $("#selectRowService option[id='"+id+"']").attr("selected", "selected");
            }
        },
        error: function () {
        }
    }).done(function () {
    });
}

// Optiene las proveedores *
function getProveedores(id) {
    $("#selectRowProovedores").html("");
    var location = 'proveedores/GetProveedores';                
    $.ajax({
            type: "POST",
            dataType: 'JSON',
            url: location,
        success: function (respuesta) {
            var renglon = "<option id='0'  value='0'>Seleccione...</option> ";
            respuesta.forEach(function(row, index) {
                renglon += '<option id='+row.sup_id+'  value="">'+row.sup_buseiness_name+'</option> ';
            });
            $("#selectRowProovedores").append(renglon);

            if(id != ""){
                $("#selectRowProovedores option[id='"+id+"']").attr("selected", "selected");
            }
        },
        error: function () {
        }
    }).done(function () {
    });
}



// Optiene las proveedores *
function getAlmacenes(id) {
    $("#selectRowAlmacen").html("");
    var location = 'almacenes/GetAlmacenes';                
    $.ajax({
            type: "POST",
            dataType: 'JSON',
            url: location,
        success: function (respuesta) {
            var renglon = "<option id='0'  value=''>Seleccione...</option> ";
            respuesta.forEach(function(row, index) {
                renglon += '<option id='+row.str_id+'  value="">'+row.str_name+'</option> ';
            });
            $("#selectRowAlmacen").append(renglon);
            if(id != ""){
                $("#selectRowAlmacen option[id='"+id+"']").attr("selected", "selected");
            }
        },
        error: function () {
        }
    }).done(function () {
    });
}

// Optiene las documentos *
function getDocumentos(id) {
    $("#selectRowDocument").html("");
    var location = 'documentos/GetDocumentos';                
    $.ajax({
            type: "POST",
            dataType: 'JSON',
            url: location,
        success: function (respuesta) {
            var renglon = "<option id='0'  value='0'>Seleccione...</option> ";
            respuesta.forEach(function(row, index) {
                renglon += '<option id='+row.doc_id+'  value="">'+row.doc_code+'-'+row.doc_name+'</option> ';
            });
            $("#selectRowDocument").append(renglon);
            if(id != ""){
                $("#selectRowDocument option[id='"+id+"']").attr("selected", "selected");
            }
        },
        error: function () {
        }
    }).done(function () {
    });
}



function getProductosTable() {
   var location = 'productos/GetProductos';                
   $('#ProductosTable').DataTable().destroy();
   $("#tablaProductosRow").html('');

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
                   '<button onclick="EditProducto(' + row.prd_id +','+ row.cat_id +','+ row.sbc_id +','+ row.srv_id +','+ row.str_id +','+ row.prd_coin_type +','+ row.sup_id +','+ row.prd_visibility +','+ row.stp_id +')" type="button" class="btn btn-default btn-icon-edit" aria-label="Left Align"><i class="fas fa-pen modif"></i></button>' +
                   '<button onclick="ConfirmDeletProducto(' + row.prd_id +')" type="button" class="btn btn-default btn-icon-delete" aria-label="Left Align"><i class="fas fa-times-circle kill"></i></button>' +
               '</td>' +

               "<td class='dtr-control text-center'>" +
               row.prd_id +
               '</td>' +

               "<td >" +
               row.prd_name +
               '</td>' +

               "<td >" +
               row.prd_english_name +
               '</td>' +

               "<td >" +
               row.prd_sku +
               '</td>' +

               "<td >" +
               row.prd_model +
               '</td>' +
/* 
               "<td >" +
               row.prd_serial_number +
               '</td>' + */

               "<td >" +
               row.prd_cost +
               '</td>' +

               "<td >" +
               row.prd_price +
               '</td>' +

               "<td >" +
               row.prd_comments +
               '</td>' +

               "<td >" +
               row.srv_name +
               '</td>' +

               "<td >" +
               row.cat_name +
               '</td>' +

               "<td >" +
               row.sbc_name +
               '</td>' +

               "<td >" +
               row.str_name +
               '</td>' +

               +'</tr>';
            $('#tablaProductosRow').append(renglon);
         });

         let title = 'Productos';
         let filename =
            title.replace(/ /g, '_') + '-' + moment(Date()).format('YYYYMMDD');

         table = $('#ProductosTable').DataTable({
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
                        ConfirmDeletProducto(idSelected);
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

function getTipoMoneda(id) {
   $('#selectMonedaProducto').html("");
   var location = 'productos/GetTipoMoneda';                
   $.ajax({
           type: "POST",
           dataType: 'JSON',
           data:{id:id},
           url: location,
       success: function (respuesta) {
           var renglon = "<option id='0'  value='0'>Seleccione...</option> ";
           respuesta.forEach(function(row, index) {
               renglon += '<option id='+row.ext_id+'  value="'+row.ext_id+'">'+row.ext_name+'</option> ';
           });
           $("#selectMonedaProducto").append(renglon);
           if(id != undefined){
               $("#selectMonedaProducto option[value='"+id+"']").attr("selected", "selected");
           }
       },
       error: function () {
       }
   }).done(function () {
   });
}



/* $("#NomProducto").autocomplete({
    source: function(request,response){
        var location = 'productos/GetAutoComplete';                

        $.ajax({
            url: location,
            type:"GET",
            dataType:"json",
            data:{
                search: request.term
            },                    
            success:function(data){
                response($.map(data, function (item) {
                    return {
                        label: item.nombre,
                        value: item.id
                    }
                }))
            }
        })
    },

}) */
