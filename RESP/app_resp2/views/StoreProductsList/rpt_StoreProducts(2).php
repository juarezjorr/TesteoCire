<?php


require_once '../../../vendor/autoload.php';





   require_once '../../assets/reports/StoreProductsList.php';
   require_once '../../assets/reports/header-001.php';
   require_once '../../assets/reports/footer-001.php';


    
    $dir = '../../assets/filesupport/listProducts.txt';
    $file = fopen($dir, "r") or die ('problema al abrir archivo');

    while (!feof($file)){
        $getFile = fgets($file);
    }



    $html = getTemplate($getFile); 
    $head = getHeader(); 
    $foot = getFooter(); 

    $css = file_get_contents('../../assets/css/reports.css');
    
    ob_clean();
    ob_get_contents();
    $mpdf = new \Mpdf\Mpdf([
        
        "mode" => "utf-8",
        "orientation" => "L",
        "setAutoTopMargin" =>true,
        "margin_top" => -30,
    ]);
    $mpdf -> setHTMLHeader($head);
    $mpdf->SetHTMLFooter($foot);

    $mpdf->WriteHTML($css,\Mpdf\HTMLParserMode::HEADER_CSS);
    $mpdf->WriteHTML($html,\Mpdf\HTMLParserMode::HTML_BODY);
    $mpdf->Output(
        "Listado de productos.pdf",
        "I"
    );
    