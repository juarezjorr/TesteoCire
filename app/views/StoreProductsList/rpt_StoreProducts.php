<?php

    require_once ROOT . PATH_ASSETS . 'vendor/autoload.php';

ob_clean();
    $mpdf = new \Mpdf\Mpdf();
    $mpdf->WriteHTML('<html><head><title>PDF</title></head><body><h1>Hello world!</h1></body></html>');
    $mpdf->Output(
        "reporte.pdf",
        "I"
    );