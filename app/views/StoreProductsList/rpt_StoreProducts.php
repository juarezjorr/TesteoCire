<?php

    require_once '../../assets/vendor/autoload.php';
    require_once '../../assets/reports/StoreProductsList.php';

    $dir = '../../assets/filesupport/listProducts.txt';
    $file = fopen($dir, "r") or die ('problema al abrir archivo');

    while (!feof($file)){
        $traer = fgets($file);
    }

    $dato1 = explode('@', $traer);
  //  var_dump(  $dato1 );

        foreach ($dato1 as $dt){
            echo $dato1[$dt] . '<br>';

        }

    $html = getTemplate(); 

    $css = file_get_contents('../../assets/css/reports.css');
    
    // ob_clean();
    // $mpdf = new \Mpdf\Mpdf();
    // $mpdf->WriteHTML($css,\Mpdf\HTMLParserMode::HEADER_CSS);
    // $mpdf->WriteHTML($html,\Mpdf\HTMLParserMode::HTML_BODY);
    // $mpdf->Output(
    //     "reporte.pdf",
    //     "I"
    // );