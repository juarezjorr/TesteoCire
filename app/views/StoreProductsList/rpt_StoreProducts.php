<?php

    require_once '../../assets/vendor/autoload.php';
    require_once '../../assets/reports/StoreProductsList.php';

    $dir = '../../assets/filesupport/listProducts.txt';
    $file = fopen($dir, "r") or die ('problema al abrir archivo');

    while (!feof($file)){
        $getFile = fgets($file);
    }



    $html = getTemplate($getFile); 

    $css = file_get_contents('../../assets/css/reports.css');
    
    ob_clean();
    ob_get_contents();
    $mpdf = new \Mpdf\Mpdf([
        
        "mode" => "utf-8",
        "orientation" => "L",
        "setAutoTopMargin" =>true,
        "margin_top" => -25,
    ]);
    $mpdf -> setHTMLHeader('
        <header>
                <div class="cornisa">
                    <div class="box-logo">
                        <div class="logo">
                            <img class="img-logo" src="../../assets/img/logo-blanco.jpg" style="height:120px; width:auto;">
                        </div>
                    </div>
                    <div class="address">
                        <table>
                            <tr>
                                <td class="addData">55 5676-1113<br />55 5676-1483</td>
                                <td class="addIcon addColor01"><img class="img-logo" src="../../assets/img/icon-phone.png" style="height:auto; width:14px;"></td>
                            </tr>
                            <tr>
                                <td class="addData">Av Guadalupe I. Ramírez 763,<br />Tepepan Xochimilco, 16020, CDMX</td>
                                <td class="addIcon addColor02"><img class="img-logo" src="../../assets/img/icon-location.png" style="height:auto; width:14px;"></td>
                            </tr>
                            <tr>
                                <td class="addData">ventas@cttrentals.com<br />contacto@cttretnals.com<br />cotizaciones@cttrentals.com</td>
                                <td class="addIcon addColor03"><img class="img-logo" src="../../assets/img/icon-email.png" style="height:auto; width:14px;"></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </header>
    ');
    $mpdf->SetHTMLFooter('
    <footer>
        <table width="100%">
            <tr>
                <td class="foot-date" width="33%">{DATE F j,  Y}</td>
                <td class="foot-page" width="33%" align="center">{PAGENO}/{nbpg}</td>
                <td class="foot-rept" width="33%" style="text-align: right;">Listado de Productos</td>
            </tr>
        </table>
    </footer>
        '
    );

    $mpdf->WriteHTML($css,\Mpdf\HTMLParserMode::HEADER_CSS);
    $mpdf->WriteHTML($html,\Mpdf\HTMLParserMode::HTML_BODY);
    $mpdf->Output(
        "Listado de productos.pdf",
        "I"
    );