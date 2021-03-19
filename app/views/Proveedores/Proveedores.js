var table = null;
var positionRow = 0;

$(document).ready(function () {
   verifica_usuario();
   inicial();
});

function inicial() {
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
   
   $('#LimpiarFormulario').on('click', function () {
      LimpiaModal();
   });

   $('#ProveedoresTable tbody').on('click', 'tr', function () {
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
function EditProveedores(id) {
    UnSelectRowTable();
    LimpiaModal();
    $('#titulo').text('Editar Proveedor');

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
            $('#EmailProveedor').val(respuesta.sup_email);
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

function UnSelectRowTable() {
    setTimeout(() => {table.rows().deselect();}, 10);
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
            if ((respuesta = 1)) {
                var arrayObJ = IdProveedor.split(',');
                if(arrayObJ.length == 1){
                   table.row(':eq('+positionRow+')').remove().draw();
                }else{
                   table.rows({ selected: true }).remove().draw();
                }
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

            if(IdProveedor != ''){
                table.row(':eq('+positionRow+')').remove().draw();
             }
             if ((respuesta != 0)) {
                //getAlmacenesTable();
                var rowNode = table.row.add( {
                   [0]:  '<button onclick="EditProveedores('+respuesta+')" type="button" class="btn btn-default btn-icon-edit" aria-label="Left Align"><i class="fas fa-pen modif"></i></button><button onclick="ConfirmDeletProveedor('+respuesta+')" type="button" class="btn btn-default btn-icon-delete" aria-label="Left Align"><i class="fas fa-times-circle kill"></i></button>',
                   [1]:   respuesta,
                   [2]:   NomProveedor,
                   [3]:   ContactoProveedor,
                   [4]:   RfcProveedor,
                   [5]:   EmailProveedor,
                   [6]:   PhoneProveedor
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
    $('#NomProveedor').val("");
    $('#RfcProveedor').val("");
    $('#EmpIdProveedor').val("");
    $('#IdProveedor').val("");
    $('#ContactoProveedor').val("");
    $('#EmailProveedor').val("");
    $('#PhoneProveedor').val("");
    $('#titulo').text('Nuevo Proveedor');
    $('#formProveedor').removeClass('was-validated');
}



function getProveedoresTable() {
    var location = 'Proveedores/GetProveedores';                
    $('#ProveedoresTable').DataTable().destroy();
    $("#tablaProveedoresRow").html('');;
 
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
                    '<button onclick="EditProveedores(' + row.sup_id +')" type="button" class="btn btn-default btn-icon-edit" aria-label="Left Align"><i class="fas fa-pen modif"></i></button>' +
                    '<button onclick="ConfirmDeletProveedor(' + row.sup_id +')" type="button" class="btn btn-default btn-icon-delete" aria-label="Left Align"><i class="fas fa-times-circle kill"></i></button>' +
                '</td>' +

                "<td class='dtr-control text-center'>" +
                row.sup_id +
                '</td>' +

                '<td>' +
                row.sup_buseiness_name +
                '</td>' +

                '<td>' +
                row.sup_contact +
                '</td>' +

                '<td>' +
                row.sup_rfc +
                '</td>' +
                
                '<td>' +
                row.sup_email +
                '</td>' +

                '<td>' +
                row.sup_phone +
                '</td>' +

                
                '</tr>';
             $('#tablaProveedoresRow').append(renglon);
          });
 
          let title = 'Proveedores';
          let filename =
             title.replace(/ /g, '_') + '-' + moment(Date()).format('YYYYMMDD');
 
          table = $('#ProveedoresTable').DataTable({
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
                        ConfirmDeletProveedor(idSelected);
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
       error: function () {},
    }).done(function () {});
 }

