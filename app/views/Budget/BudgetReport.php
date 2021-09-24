<?php

ini_set('display_errors', 'On');

require_once '../../../vendor/autoload.php';

$usrId = $_GET['u'];


$dir = 'BudgetFile-'. $usrId .'.json';
// $file = fopen($dir, "r") or die ('problema al abrir archivo');

$file = @file_get_contents($dir);
$items = json_decode($file, true);

// var_dump($items);
// echo $items[0]['bdg_prod_name'];

    $header = '
    <header>
        <div class="cornisa">
            <table class="table-main" border="0">
                <tr>
                    <td class="box-logo side-color">
                        <img class="img-logo" src="../../../app/assets/img/logo-blanco.jpg"  style="width:20mm; height:auto; margin: 3mm 2.5mm 0 2.5mm;"/>
                    </td>
                    <td class="box-address top-color">
                        <!-- Direccion de la empresa -->
                        <table class="table-address">
                            <tr>
                                <td class="addData">55 5676-1113<br />55 5676-1483</td>
                                <td class="addIcon addColor01"><img class="img-logo" src="../../../app/assets/img/icon-phone.png" style="width:4mm; height:auto;" /></td>

                                <td class="addData">Av Guadalupe I. Ramírez 763,<br />Tepepan Xochimilco, 16020, CDMX</td>
                                <td class="addIcon addColor02"><img class="img-logo" src="../../../app/assets/img/icon-location.png" style="width:4mm; height:auto;" /></td>
                                <td class="addData">ventas@cttrentals.com<br />contacto@cttretnals.com<br />cotizaciones@cttrentals.com</td>
                                <td class="addIcon addColor03"><img class="img-logo" src="../../../app/assets/img/icon-email.png"  style="width:4mm; height:auto;"/></td>
                            </tr>
                        </table>
                       
                    </td>
                </tr>
            </table>
        </div>
    </header>';


    $costBase = 0;
    for ($i = 0; $i<count($items); $i++){
        $amount = $items[$i]['bdg_prod_price'] * $items[$i]['bdg_quantity'];
        $amountBase = ($amount * $items[$i]['bdg_days_base'])-($amount * $items[$i]['bdg_discount_base']);
        $amountTrip = ($amount * $items[$i]['bdg_days_trip'])-($amount * $items[$i]['bdg_discount_trip']);
        $amountTest = ($amount * $items[$i]['bdg_days_test'])-($amount * $items[$i]['bdg_discount_test']);
        $amountInsr = $amount -($amount * $items[$i]['bdg_insured']);
        $totalBase += $amountBase ;
        $totalTrip += $amountTrip ;
        $totalTest += $amountTest ;
        $totalInsr += $amountInsr ;
    }

    $html = '
        <section>
            <div class="container">
                <div class="name-report">
                    <p>
                        <span class="number">Cotización '. $items[0]['ver_code'] .'</span>
                    <br>
                        <span class="date">'.  $items[0]['ver_date_real'] .'</span>
                    </p>
                </div>

                <table class="table-data bline tline" border="0">
                    <tr>
                        <td class="rline half">
                            <!-- Start datos del cliente -->
                            <table class="table-data">
                                <tr>
                                    <td class="concept">Cliente:</td>
                                    <td class="data">'. $items[0]['cus_name'] .'</td>
                                </tr>
                                <tr>
                                    <td class="concept">Domicilio:</td>
                                    <td class="data">'.  $items[0]['cus_address'] .'</td>
                                </tr>
                                <tr>
                                    <td class="concept">Correo Electrónico:</td>
                                    <td class="data">'. $items[0]['cus_email'] .'</td>
                                </tr>
                                <tr>
                                    <td class="concept">Teléfono:</td>
                                    <td class="data">'. $items[0]['cus_phone'] .'</td>
                                </tr>
                            </table>
                            <!-- End datos del cliente -->
                        </td>
                        <td class="half">
                            <!-- Start Datos del projecto -->
                            <table class="table-data">
                                <tr>
                                    <td class="concept">Num. proyecto:</td>
                                    <td class="data"><strong>'. $items[0]['pjt_number'] .'</strong></td>
                                </tr>
                                <tr>
                                    <td class="concept">Proyecto:</td>
                                    <td class="data">'. $items[0]['pjt_name'] .'</td>
                                </tr>
                                <tr>
                                    <td class="concept">Locación:</td>
                                    <td class="data">'. $items[0]['pjt_location'] .'</td>
                                </tr>
                                <tr>
                                    <td class="concept">Tipo de Locación:</td>
                                    <td class="data">'. $items[0]['loc_type_location'] .'</td>
                                </tr>
                                <tr>
                                    <td class="concept">Tipo de proyecto:</td>
                                    <td class="data">'. $items[0]['pjttp_name'] .'</td>
                                </tr>
                                <tr>
                                    <td class="concept">Periodo:</td>
                                    <td class="data">'. $items[0]['period'] .'</td>
                                </tr>
                                <tr>
                                    <td class="concept">&nbsp;</td>
                                    <td class="data">&nbsp;</td>
                                </tr>
                                
                            </table>
                            <!-- End Datos del projecto -->
                        </td>
                    </tr>
                </table>
                <!-- End Datos de identificación  -->

                <!-- Start Tabla de totales  -->
                <table class="table-data tline-d bline">
                    <thead>
                        <tr>
                            <th class="tit-totals">Costo base</th>
                            <th class="tit-totals">Costo Viaje</th>
                            <th class="tit-totals">Costo Pruebas</th>
                            <th class="tit-totals">Seguro</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="dat-totals">' . number_format($totalBase, 2,'.',',') . '</td>
                            <td class="dat-totals">' . number_format($totalTrip, 2,'.',',') . '</td>
                            <td class="dat-totals">' . number_format($totalTest, 2,'.',',') . '</td>
                            <td class="dat-totals">' . number_format($totalInsr, 2,'.',',') . '</td>
                        </tr>
                    </tbody>
                </table>
                <!-- End Tabla de totales  -->


                <!-- Start Tabla de costo base  -->
                <h2>Costo Base</h2>
                <table autosize="1" class="table-data bline-d">
                    <thead>
                        <tr>
                            <th class="tit-figure prod">Producto</th>
                            <th class="tit-figure pric">Precio</th>
                            <th class="tit-figure qnty">Cant.</th>
                            <th class="tit-figure days">Días</th>
                            <th class="tit-figure disc">Descuento</th>
                            <th class="tit-figure amou">Importe</th>
                        </tr>
                    </thead>
                    <tbody>';

                    for ($i = 0; $i<count($items); $i++){
                        $price = $items[$i]['bdg_prod_price'] ;
                        $sbtt1 = $price * $items[$i]['bdg_quantity'];
                        $sbtt2 = $sbtt1 * $items[$i]['bdg_days_base'];
                        $disco = $sbtt2 * $items[$i]['bdg_discount_base'];
                        $amount = $sbtt2 - $disco;

    $html .= '
                        <tr>
                            <td class="dat-figure prod">'. $items[$i]['bdg_prod_name'] .'</td>
                            <td class="dat-figure pric">' . number_format($price , 2,'.',',') . '</td>
                            <td class="dat-figure qnty">'. $items[$i]['bdg_quantity'] .'</td>
                            <td class="dat-figure days">'. $items[$i]['bdg_days_base'] .'</td>
                            <td class="dat-figure disc">' . number_format($disco , 2,'.',',') . '</td>
                            <td class="dat-figure amou">' . number_format($amount , 2,'.',',') . '</td>
                        </tr>
                        ';

                    }
    $html .= '
                    </tbody>
                </table>
                <!-- End Tabla de costo base  -->

                <!-- Start Tabla de costo Viaje  -->
                <h2>Costo Viaje</h2>
                <table class="table-data bline-d">
                    <thead>
                        <tr>
                            <th class="tit-figure prod">Producto</th>
                            <th class="tit-figure pric">Precio</th>
                            <th class="tit-figure days">Días</th>
                            <th class="tit-figure disc">Descuento</th>
                            <th class="tit-figure amou">Importe</th>
                        </tr>
                    </thead>
                    <tbody>
                    
                    ';

                    for ($i = 0; $i<count($items); $i++){
                        $price = $items[$i]['bdg_prod_price'] ;
                        $sbtt1 = $price * $items[$i]['bdg_quantity'];
                        $sbtt2 = $sbtt1 * $items[$i]['bdg_days_trip'];
                        $disco = $sbtt2 * $items[$i]['bdg_discount_trip'];
                        $amount = $sbtt2 - $disco;

    $html .= '
                        <tr>
                            <td class="dat-figure prod">'. $items[$i]['bdg_prod_name'] .'</td>
                            <td class="dat-figure pric">' . number_format($price , 2,'.',',') . '</td>
                            <td class="dat-figure days">'. $items[$i]['bdg_days_trip'] .'</td>
                            <td class="dat-figure disc">' . number_format($disco , 2,'.',',') . '</td>
                            <td class="dat-figure amou">' . number_format($amount , 2,'.',',') . '</td>
                        </tr>
                        ';

                    }
    $html .= '
                    
                    </tbody>
                </table>
                <!-- End Tabla de costo Viaje  -->

                <!-- Start Tabla de costo Pruebas  -->
                <h2>Costo Pruebas</h2>
                <table class="table-data bline-d">
                    <thead>
                        <tr>
                            <th class="tit-figure prod">Producto</th>
                            <th class="tit-figure pric">Precio</th>
                            <th class="tit-figure days">Días</th>
                            <th class="tit-figure disc">Descuento</th>
                            <th class="tit-figure amou">Importe</th>
                        </tr>
                    </thead>
                    <tbody>
                    
                    ';

                    for ($i = 0; $i<count($items); $i++){
                        $price = $items[$i]['bdg_prod_price'] ;
                        $sbtt1 = $price * $items[$i]['bdg_quantity'];
                        $sbtt2 = $sbtt1 * $items[$i]['bdg_days_test'];
                        $disco = $sbtt2 * $items[$i]['bdg_discount_test'];
                        $amount = $sbtt2 - $disco;

    $html .= '
                        <tr>
                            <td class="dat-figure prod">'. $items[$i]['bdg_prod_name'] .'</td>
                            <td class="dat-figure pric">' . number_format($price , 2,'.',',') . '</td>
                            <td class="dat-figure days">'. $items[$i]['bdg_days_test'] .'</td>
                            <td class="dat-figure disc">' . number_format($disco , 2,'.',',') . '</td>
                            <td class="dat-figure amou">' . number_format($amount , 2,'.',',') . '</td>
                        </tr>
                        ';
                    }
    $html .=  '
                    </tbody>
                </table>
                <!-- End Tabla de costo Pruebas  -->


            </div>
        </section>
        ';

    $htmlx = '

        

        <section>
            <div class="container">
            
                <table class="table-main" border="0">
                    <tr>
                        <td class="side-color"></td>
                        <td class="box-data">
                            <!-- Start Datos de identificación  -->
                            <table class="table-data rtext" border="0">
                                <tr>
                                    <td>
                                        <div class="name-report">
                                            <p>Cotización C0005</p>
                                            <p class="date-tocp">21 Septiembre 2021 14:16</p>
                                        </div>
                                    <td>
                                <tr>
                            </table>
                            <table class="table-data bline tline" border="0">
                                <tr>
                                    <td class="rline half">
                                        <!-- Start datos del cliente -->
                                        <table class="table-data">
                                            <tr>
                                                <td class="concept">Cliente:</td>
                                                <td class="data">'. $items[0]['cus_name'] .'</td>
                                            </tr>
                                            <tr>
                                                <td class="concept">Domicilio:</td>
                                                <td class="data">'.  $items[0]['cus_address'] .'</td>
                                            </tr>
                                            <tr>
                                                <td class="concept">Correo Electrónico:</td>
                                                <td class="data">'. $items[0]['cus_email'] .'</td>
                                            </tr>
                                            <tr>
                                                <td class="concept">Teléfono:</td>
                                                <td class="data">'. $items[0]['cus_phone'] .'</td>
                                            </tr>
                                        </table>
                                        <!-- End datos del cliente -->
                                    </td>
                                    <td class="half">
                                        <!-- Start Datos del projecto -->
                                        <table class="table-data">
                                            <tr>
                                                <td class="concept">Num. proyecto:</td>
                                                <td class="data">'. $items[0]['pjt_number'] .'</td>
                                            </tr>
                                            <tr>
                                                <td class="concept">Proyecto:</td>
                                                <td class="data">'. $items[0]['pjt_name'] .'</td>
                                            </tr>
                                            <tr>
                                                <td class="concept">Locación:</td>
                                                <td class="data">'. $items[0]['pjt_location'] .'</td>
                                            </tr>
                                            <tr>
                                                <td class="concept">Tipo de Locación:</td>
                                                <td class="data">[tipo Locacion loc_id]</td>
                                            </tr>
                                            <tr>
                                                <td class="concept">Tipo de proyecto:</td>
                                                <td class="data">[tipo proyecto pjttp_id]</td>
                                            </tr>
                                            <tr>
                                                <td class="concept">Periodo:</td>
                                                <td class="data">'. $items[0]['pjt_date_start'] . '-' . $items[0]['pjt_date_end'] .'</td>
                                            </tr>
                                            <tr>
                                                <td class="concept">&nbsp;</td>
                                                <td class="data">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td class="concept">Versión:</td>
                                                <td class="data">'. $items[0]['ver_code'] .'</td>
                                            </tr>
                                        </table>
                                        <!-- End Datos del projecto -->
                                    </td>
                                </tr>
                            </table>
                            <!-- End Datos de identificación  -->
                        </td>
                    </tr>
                    <tr>
                        <td class="side-color"></td>
                        <td class="box-data">
                            <!-- Start Tabla de totales  -->
                            <table class="table-data bline">
                                <tr>
                                    <td>
                                        <table class="table-data">
                                            <thead>
                                                <tr>
                                                    <th class="tit-totals">Costo base</th>
                                                    <th class="tit-totals">Costo Viaje</th>
                                                    <th class="tit-totals">Costo Pruebas</th>
                                                    <th class="tit-totals">Seguro</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td class="dat-totals">0.00</td>
                                                    <td class="dat-totals">0.00</td>
                                                    <td class="dat-totals">0.00</td>
                                                    <td class="dat-totals">0.00</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            <!-- End Tabla de totales  -->
                        </td>
                    </tr>

                    <tr>
                        <td class="side-color"></td>
                        <td class="box-data">
                            <!-- Start Tabla de costo base  -->
                            <h2>Costo Base</h2>
                            <table autosize="1" class="table-data bline-d">
                                <thead>
                                    <tr>
                                        <th class="tit-figure prod">Producto</th>
                                        <th class="tit-figure pric">Precio</th>
                                        <th class="tit-figure qnty">Cant.</th>
                                        <th class="tit-figure days">Días</th>
                                        <th class="tit-figure disc">Descuento</th>
                                        <th class="tit-figure amou">Importe</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="dat-figure prod">CLAQUETA INSERT CON STICKS DE COLORES</td>
                                        <td class="dat-figure pric">1,400.00</td>
                                        <td class="dat-figure qnty">3</td>
                                        <td class="dat-figure days">23</td>
                                        <td class="dat-figure disc">0.00</td>
                                        <td class="dat-figure amou">96,600.00</td>
                                    </tr>
                                    <tr>
                                        <td class="dat-figure prod">CLAQUETA INSERT CON STICKS DE COLORES</td>
                                        <td class="dat-figure pric">1,400.00</td>
                                        <td class="dat-figure qnty">3</td>
                                        <td class="dat-figure days">23</td>
                                        <td class="dat-figure disc">0.00</td>
                                        <td class="dat-figure amou">96,600.00</td>
                                    </tr>
                                    <tr>
                                        <td class="dat-figure prod">CLAQUETA INSERT CON STICKS DE COLORES</td>
                                        <td class="dat-figure pric">1,400.00</td>
                                        <td class="dat-figure qnty">3</td>
                                        <td class="dat-figure days">23</td>
                                        <td class="dat-figure disc">0.00</td>
                                        <td class="dat-figure amou">96,600.00</td>
                                    </tr>
                                    <tr>
                                        <td class="dat-figure prod">CLAQUETA INSERT CON STICKS DE COLORES</td>
                                        <td class="dat-figure pric">1,400.00</td>
                                        <td class="dat-figure qnty">3</td>
                                        <td class="dat-figure days">23</td>
                                        <td class="dat-figure disc">0.00</td>
                                        <td class="dat-figure amou">96,600.00</td>
                                    </tr>
                                    <tr>
                                        <td class="dat-figure prod">CLAQUETA INSERT CON STICKS DE COLORES</td>
                                        <td class="dat-figure pric">1,400.00</td>
                                        <td class="dat-figure qnty">3</td>
                                        <td class="dat-figure days">23</td>
                                        <td class="dat-figure disc">0.00</td>
                                        <td class="dat-figure amou">96,600.00</td>
                                    </tr>
                                    <tr>
                                        <td class="dat-figure prod">CLAQUETA INSERT CON STICKS DE COLORES</td>
                                        <td class="dat-figure pric">1,400.00</td>
                                        <td class="dat-figure qnty">3</td>
                                        <td class="dat-figure days">23</td>
                                        <td class="dat-figure disc">0.00</td>
                                        <td class="dat-figure amou">96,600.00</td>
                                    </tr>
                                    <tr>
                                        <td class="dat-figure prod">CLAQUETA INSERT CON STICKS DE COLORES</td>
                                        <td class="dat-figure pric">1,400.00</td>
                                        <td class="dat-figure qnty">3</td>
                                        <td class="dat-figure days">23</td>
                                        <td class="dat-figure disc">0.00</td>
                                        <td class="dat-figure amou">96,600.00</td>
                                    </tr>
                                    <tr>
                                        <td class="dat-figure prod">CLAQUETA INSERT CON STICKS DE COLORES</td>
                                        <td class="dat-figure pric">1,400.00</td>
                                        <td class="dat-figure qnty">3</td>
                                        <td class="dat-figure days">23</td>
                                        <td class="dat-figure disc">0.00</td>
                                        <td class="dat-figure amou">96,600.00</td>
                                    </tr>
                                    <tr>
                                        <td class="dat-figure prod">CLAQUETA INSERT CON STICKS DE COLORES</td>
                                        <td class="dat-figure pric">1,400.00</td>
                                        <td class="dat-figure qnty">3</td>
                                        <td class="dat-figure days">23</td>
                                        <td class="dat-figure disc">0.00</td>
                                        <td class="dat-figure amou">96,600.00</td>
                                    </tr>
                                    <tr>
                                        <td class="dat-figure prod">CLAQUETA INSERT CON STICKS DE COLORES</td>
                                        <td class="dat-figure pric">1,400.00</td>
                                        <td class="dat-figure qnty">3</td>
                                        <td class="dat-figure days">23</td>
                                        <td class="dat-figure disc">0.00</td>
                                        <td class="dat-figure amou">96,600.00</td>
                                    </tr>
                                    <tr>
                                        <td class="dat-figure prod">CLAQUETA INSERT CON STICKS DE COLORES</td>
                                        <td class="dat-figure pric">1,400.00</td>
                                        <td class="dat-figure qnty">3</td>
                                        <td class="dat-figure days">23</td>
                                        <td class="dat-figure disc">0.00</td>
                                        <td class="dat-figure amou">96,600.00</td>
                                    </tr>
                                    <tr>
                                        <td class="dat-figure prod">CLAQUETA INSERT CON STICKS DE COLORES</td>
                                        <td class="dat-figure pric">1,400.00</td>
                                        <td class="dat-figure qnty">3</td>
                                        <td class="dat-figure days">23</td>
                                        <td class="dat-figure disc">0.00</td>
                                        <td class="dat-figure amou">96,600.00</td>
                                    </tr>
                                    <tr>
                                        <td class="dat-figure prod">CLAQUETA INSERT CON STICKS DE COLORES</td>
                                        <td class="dat-figure pric">1,400.00</td>
                                        <td class="dat-figure qnty">3</td>
                                        <td class="dat-figure days">23</td>
                                        <td class="dat-figure disc">0.00</td>
                                        <td class="dat-figure amou">96,600.00</td>
                                    </tr>
                                    <tr>
                                        <td class="dat-figure prod">CLAQUETA INSERT CON STICKS DE COLORES</td>
                                        <td class="dat-figure pric">1,400.00</td>
                                        <td class="dat-figure qnty">3</td>
                                        <td class="dat-figure days">23</td>
                                        <td class="dat-figure disc">0.00</td>
                                        <td class="dat-figure amou">96,600.00</td>
                                    </tr>
                                    <tr>
                                        <td class="dat-figure prod">CLAQUETA INSERT CON STICKS DE COLORES</td>
                                        <td class="dat-figure pric">1,400.00</td>
                                        <td class="dat-figure qnty">3</td>
                                        <td class="dat-figure days">23</td>
                                        <td class="dat-figure disc">0.00</td>
                                        <td class="dat-figure amou">96,600.00</td>
                                    </tr>
                                    <tr>
                                        <td class="dat-figure prod">CLAQUETA INSERT CON STICKS DE COLORES</td>
                                        <td class="dat-figure pric">1,400.00</td>
                                        <td class="dat-figure qnty">3</td>
                                        <td class="dat-figure days">23</td>
                                        <td class="dat-figure disc">0.00</td>
                                        <td class="dat-figure amou">96,600.00</td>
                                    </tr>
                                    <tr>
                                        <td class="dat-figure prod">CLAQUETA INSERT CON STICKS DE COLORES</td>
                                        <td class="dat-figure pric">1,400.00</td>
                                        <td class="dat-figure qnty">3</td>
                                        <td class="dat-figure days">23</td>
                                        <td class="dat-figure disc">0.00</td>
                                        <td class="dat-figure amou">96,600.00</td>
                                    </tr>
                                    <tr>
                                        <td class="dat-figure prod">CLAQUETA INSERT CON STICKS DE COLORES</td>
                                        <td class="dat-figure pric">1,400.00</td>
                                        <td class="dat-figure qnty">3</td>
                                        <td class="dat-figure days">23</td>
                                        <td class="dat-figure disc">0.00</td>
                                        <td class="dat-figure amou">96,600.00</td>
                                    </tr>
                                    <tr>
                                        <td class="dat-figure prod">CLAQUETA INSERT CON STICKS DE COLORES</td>
                                        <td class="dat-figure pric">1,400.00</td>
                                        <td class="dat-figure qnty">3</td>
                                        <td class="dat-figure days">23</td>
                                        <td class="dat-figure disc">0.00</td>
                                        <td class="dat-figure amou">96,600.00</td>
                                    </tr>
                                    <tr>
                                        <td class="dat-figure prod">CLAQUETA INSERT CON STICKS DE COLORES</td>
                                        <td class="dat-figure pric">1,400.00</td>
                                        <td class="dat-figure qnty">3</td>
                                        <td class="dat-figure days">23</td>
                                        <td class="dat-figure disc">0.00</td>
                                        <td class="dat-figure amou">96,600.00</td>
                                    </tr>
                                </tbody>
                            </table>
                            <!-- End Tabla de costo base  -->
                            <!-- Start Tabla de costo Viaje  -->
                            <h2>Costo Viaje</h2>
                            <table class="table-data bline-d">
                                <thead>
                                    <tr>
                                        <th class="tit-figure prod">Producto</th>
                                        <th class="tit-figure pric">Precio</th>
                                        <th class="tit-figure days">Días</th>
                                        <th class="tit-figure disc">Descuento</th>
                                        <th class="tit-figure amou">Importe</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="dat-figure prod">CLAQUETA INSERT CON STICKS DE COLORES</td>
                                        <td class="dat-figure pric">1,400.00</td>
                                        <td class="dat-figure days">23</td>
                                        <td class="dat-figure disc">0.00</td>
                                        <td class="dat-figure amou">96,600.00</td>
                                    </tr>
                                    <tr>
                                        <td class="dat-figure prod">CLAQUETA INSERT CON STICKS DE COLORES</td>
                                        <td class="dat-figure pric">1,400.00</td>
                                        <td class="dat-figure days">23</td>
                                        <td class="dat-figure disc">0.00</td>
                                        <td class="dat-figure amou">96,600.00</td>
                                    </tr>
                                    <tr>
                                        <td class="dat-figure prod">CLAQUETA INSERT CON STICKS DE COLORES</td>
                                        <td class="dat-figure pric">1,400.00</td>
                                        <td class="dat-figure days">23</td>
                                        <td class="dat-figure disc">0.00</td>
                                        <td class="dat-figure amou">96,600.00</td>
                                    </tr>
                                    <tr>
                                        <td class="dat-figure prod">CLAQUETA INSERT CON STICKS DE COLORES</td>
                                        <td class="dat-figure pric">1,400.00</td>
                                        <td class="dat-figure days">23</td>
                                        <td class="dat-figure disc">0.00</td>
                                        <td class="dat-figure amou">96,600.00</td>
                                    </tr>
                                </tbody>
                            </table>
                            <!-- End Tabla de costo base  -->
                            <!-- Start Tabla de costo Viaje  -->
                            <h2>Costo Pruebas</h2>
                            <table class="table-data bline-d">
                                <thead>
                                    <tr>
                                        <th class="tit-figure prod">Producto</th>
                                        <th class="tit-figure pric">Precio</th>
                                        <th class="tit-figure days">Días</th>
                                        <th class="tit-figure disc">Descuento</th>
                                        <th class="tit-figure amou">Importe</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="dat-figure prod">CLAQUETA INSERT CON STICKS DE COLORES</td>
                                        <td class="dat-figure pric">1,400.00</td>
                                        <td class="dat-figure days">23</td>
                                        <td class="dat-figure disc">0.00</td>
                                        <td class="dat-figure amou">96,600.00</td>
                                    </tr>
                                    <tr>
                                        <td class="dat-figure prod">CLAQUETA INSERT CON STICKS DE COLORES</td>
                                        <td class="dat-figure pric">1,400.00</td>
                                        <td class="dat-figure days">23</td>
                                        <td class="dat-figure disc">0.00</td>
                                        <td class="dat-figure amou">96,600.00</td>
                                    </tr>
                                    <tr>
                                        <td class="dat-figure prod">CLAQUETA INSERT CON STICKS DE COLORES</td>
                                        <td class="dat-figure pric">1,400.00</td>
                                        <td class="dat-figure days">23</td>
                                        <td class="dat-figure disc">0.00</td>
                                        <td class="dat-figure amou">96,600.00</td>
                                    </tr>
                                    <tr>
                                        <td class="dat-figure prod">CLAQUETA INSERT CON STICKS DE COLORES</td>
                                        <td class="dat-figure pric">1,400.00</td>
                                        <td class="dat-figure days">23</td>
                                        <td class="dat-figure disc">0.00</td>
                                        <td class="dat-figure amou">96,600.00</td>
                                    </tr>
                                </tbody>
                            </table>
                            <!-- End Tabla de costo base  -->
                        </td>
                    </tr>
                </table>
            </div>
        </section>

        
';



$foot = '
            <footer>
                <table class="table-footer">
                    <tr>
                        <td class="side-color"></td>
                        <td>
                            <table width="100%">
                                <tr>
                                    <td class="td-foot foot-date" width="33%">{DATE F j, Y}</td>
                                    <td class="td-foot foot-page" width="33%" align="center">{PAGENO}/{nbpg}</td>
                                    <td class="td-foot foot-rept" width="33%" style="text-align: right">Cotización</td>
                                </tr>
                            </table>

                        </td>
                    </tr>
                </table>
            </footer>
      
';

$css = file_get_contents('../../assets/css/reports_p.css');

ob_clean();
ob_get_contents();
$mpdf= new \Mpdf\Mpdf([
    'mode' => 'utf-8',
    'format' => 'Letter',
    'margin_left' => 0,
    'margin_right' => 0,
    'margin_top' => 25,
    'margin_bottom' => 15,
    'margin_header' => 0,
    'margin_footer' => 0, 
    'orientation' => 'P'
    ]);

$mpdf->shrink_tables_to_fit = 1;
$mpdf->SetHTMLHeader($header);
$mpdf->SetHTMLFooter($foot);
$mpdf->WriteHTML($css,\Mpdf\HTMLParserMode::HEADER_CSS);
$mpdf->WriteHTML($html,\Mpdf\HTMLParserMode::HTML_BODY);
$mpdf->Output(
    "Cotizacon.pdf",
    "I"
);