<?php
    ini_set('display_errors', 'On');

    require_once '../../../vendor/autoload.php';
    
    $dir = 'StoreProductsFile.txt';
    $file = fopen($dir, "r") or die ('problema al abrir archivo');

    while (!feof($file)){
        $getFile = fgets($file);  
    }

    
    $numProject = '';
    $nameProject = '';
    $version = '';
    $freelance = '';
    $date = '';

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
                            <h2>Productos de almacén</h2>
                                    <table class="table-data">
                                        <tr>
                                            <td class="concept">Fecha del reporte:</td>
                                            <td class="data">2021/05/14</td>
                                        </tr>
                                        <tr>
                                            <td class="concept">Num. proyecto:</td>
                                            <td class="data">'. $numProject .'</td>
                                        </tr>
                                        <tr>
                                            <td class="concept">Proyecto:</td>
                                            <td class="data">'. $nameProject .'</td>
                                        </tr>
                                        <tr>
                                            <td class="concept">Version:</td>
                                            <td class="data">'. $version .'</td>
                                        </tr>
                                        <tr>
                                            <td class="concept">Freelance:</td>
                                            <td class="data">'. $freelance .'</td>
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
                    <tr>
                        <th style="width:  10mm;"></th>
                        <th style="width:  30mm;">SKU</th>
                        <th style="width: 100mm;">DESCRIPCIÓN</th>
                        <th style="width:  30mm;">SERIE</th>
                        <th style="width:  auto;">NOTA</th>
                    </tr>
                </thead>
                <tbody>

            ';

            foreach ($dato as $dt){
                $el = explode('|', $dt);
                    $html .= '
                    <tr>
                        <td style="width:  10mm;"><div class="check-box"></div></td>
                        <td style="width:  30mm;">'.$el[6].'</td>
                        <td style="width: 100mm;">'.$el[7].'</td>
                        <td style="width:  30mm;">'.$el[8].'</td>
                        <td style="width:  auto;">'.$el[9].'</td>
                    </tr>';
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
    $mpdf = new \Mpdf\Mpdf([
        
        "mode" => "utf-8",
        "orientation" => "L",
    ]);
//    $mpdf -> setHTMLHeader($head);
    $mpdf->SetHTMLFooter($foot);

    $mpdf->WriteHTML($css,\Mpdf\HTMLParserMode::HEADER_CSS);
    $mpdf->WriteHTML($html,\Mpdf\HTMLParserMode::HTML_BODY);
    $mpdf->Output(
        "Listado de productos.pdf",
        "I"
    );
    