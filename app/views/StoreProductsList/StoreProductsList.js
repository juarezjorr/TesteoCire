$(document).ready(function () {
    importarScript('https://unpkg.com/jspdf@latest/dist/jspdf.umd.min.js');
    verifica_usuario();
    inicial();
});

function inicial() {
    // Funciones de arranque ...
    /* Esta es una funcion de ejemplo de como generar el reporte en PDF */
    //   build_report();

    $('.generate_button').on('click', function () {
        build_report();
    });
}

function build_report() {
    let par = `[{
    "par1":"par1"
    }]`;

    var pagina = 'StoreProductsList/GenerateReport';
    var par = '[{"parm":""}]';
    var tipo = 'json';
    var selector = putListProducts;
    fillField(pagina, par, tipo, selector);
}

function putListProducts(dt) {}
