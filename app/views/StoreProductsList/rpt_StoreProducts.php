<?php

    require_once ROOT . PATH_ASSETS . 'lib/dompdf/autoload.inc.php';


    use Dompdf\Dompdf;
    $dompdf = new Dompdf();
    $dompdf->loadHtml('Reporte PDF');
    $dompdf->setPaper('letter', 'landscape');
    $dompdf->render();
    $dompdf->stream();