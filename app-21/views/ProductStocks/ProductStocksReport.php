<?php
    ini_set('display_errors', 'On');

    require_once '../../../vendor/autoload.php';
    
    $dir = 'ProductStocksFile.txt';
    $file = fopen($dir, "r") or die ('problema al abrir archivo');

    while (!feof($file)){
        $getFile = fgets($file);  
    }
 
    $numProject = '';
    $nameProject = '';
    $version = '';
    $freelance = '';
    $date = '';

    $isConcepto = 0;

    $dato = explode('@', $getFile);
    //  var_dump(  $dato1 );

    foreach ($dato as $dt){
        //  echo $dt . '<br>';
        $el = explode('|', $dt);

        $numProject = $el[1];
        $nameProject = $el[2];
        $version = $el[4];
        $freelance = $el[5];
        $date = $el[3];
        $isConcepto = $el[13];
    }


    $html = '
        <header>
            <div class="cornisa">
                <table class="table-main">
                    <tr>
                        <td class="box-logo">
                            <img class="img-logo" src="../../../app/assets/img/logo-blanco.jpg" width="70px" alt="">
                        </td>
                        <td class="box-data">
                                <h2>Productos en existencia</h2>
                                        <table class="table-data">
                                            <tr>
                                                <td class="concept">Fecha del reporte:</td>
                                                <td class="data">'. $date .'</td>
                                            </tr>

                                        </table>
                        </td>
                        <td  class="box-address">
                                <table class="table-address">
                                    <tr>
                                        <td class="addData">55 5676-1113<br />55 5676-1483</td>
                                        <td class="addIcon addColor01"><img class="img-logo" src="../../../app/assets/img/icon-phone.png" style="height:auto; width:14px;"></td>
                                    </tr>
                                    <tr>
                                        <td class="addData">Av Guadalupe I. Ramírez 763,<br />Tepepan Xochimilco, 16020, CDMX</td>
                                        <td class="addIcon addColor02"><img class="img-logo" src="../../../app/assets/img/icon-location.png" style="height:auto; width:14px;"></td>
                                    </tr>
                                    <tr>
                                        <td class="addData">ventas@cttrentals.com<br />contacto@cttretnals.com<br />cotizaciones@cttrentals.com</td>
                                        <td class="addIcon addColor03"><img class="img-logo" src="../../../app/assets/img/icon-email.png" style="height:auto; width:14px;"></td>
                                    </tr>
                                </table>
                        </td>
                    </tr>
                </table>
            </div>
        </header>
        <section>
            
            <div class="listing">
                <table class="tabla-content">
                    <thead>
                        <tr>';

                        if($isConcepto == 1){
                            $html .= '
                            <th style="width:  25mm;">SKU</th>
                            <th style="width:  150mm;">NOMBRE</th>
                            <th style="width: 15mm;">PRECIO</th>
                            <th style="width: 15mm;">SUBCATEGORIA</th>';
                        }else{
                            $html .= ' 
                            <th style="width:  25mm;">SKU</th>
                            <th style="width:  150mm;">NOMBRE</th>
                            <th style="width: 15mm;">COSTO</th>
                            <th style="width:  20mm;">SERIE</th>
                            <th style="width: 25mm;">FECHA ALTA</th>
                            <th style="width:  20mm;">PROVEEDOR</th>
                            <th style="width: 25mm;">SUBCATEGORIA</th>';
                        }

                $html .= '</tr>
                    </thead>
                    <tbody>
                ';

                if($isConcepto == 1){
                    foreach ($dato as $dt){
                        $el = explode('|', $dt);
                            $html .= '
                            <tr>
                                <td>'.$el[6].'</td>
                                <td>'.$el[7].'</td>
                                <td>'.$el[8].'</td>
                                <td>'.$el[9].'</td>
                            </tr>';
                    }
                }
                else{
                    foreach ($dato as $dt){
                        $el = explode('|', $dt);
                            $html .= '
                            <tr>
                                <td>'.$el[6].'</td>
                                <td>'.$el[7].'</td>
                                <td>'.$el[8].'</td>
                                <td>'.$el[9].'</td>
                                <td>'.$el[10].'</td>
                                <td>'.$el[11].'</td>
                                <td>'.$el[12].'</td>
                            </tr>';
                    }
                }

                $html .= '
                    
                    </tbody>
                </table>
            </div>
        </section>
    ';


 $foot = '
    <footer>
    <table width="100%">
        <tr>
            <td class="foot-date" width="33%">{DATE F j,  Y}</td>
            <td class="foot-page" width="33%" align="center">{PAGENO}/{nbpg}</td>
            <td class="foot-rept" width="33%" style="text-align: right;">Listado de Productos</td>
        </tr>
    </table>
    </footer>
 ';

    $css = file_get_contents('../../assets/css/reports.css');

    ob_clean();
    ob_get_contents();
    $mpdf= new \Mpdf\Mpdf([
        'mode' => 'utf-8',
        'format' => 'Letter',
        'margin_left' => 15,
        'margin_right' => 5,
        'margin_top' => 5,
        'margin_bottom' => 5,
        'margin_header' => 5,
        'margin_footer' => 5, 
        'orientation' => 'L'
        ]);
    
    $mpdf->SetHTMLFooter($foot);
    $mpdf->WriteHTML($css,\Mpdf\HTMLParserMode::HEADER_CSS);
    $mpdf->WriteHTML($html,\Mpdf\HTMLParserMode::HTML_BODY);
    $mpdf->Output(
        "Listado de Existencias.pdf",
        "I"
    );
    