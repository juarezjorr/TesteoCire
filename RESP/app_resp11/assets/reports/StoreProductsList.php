
<?php




function getTemplate($getFile){
   
    $numProject = '';
    $nameProject = '';
    $version = '';
    $freelance = '';
    $date = '';

    $dato = explode('@', $getFile);
    //  var_dump(  $dato1 );
  
          foreach ($dato as $dt){
              echo $dt . '<br>';
              $el = explode('|', $dt);

              $numProject = $el[1];
              $nameProject = $el[2];
              $version = $el[4];
              $freelance = $el[5];
              $date = $el[3];
  
          }

    $template = '

        <section class="secc-inicial">
                <div class="concepts">
                    <div class="table">
                        <table>
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
                </div>
                <div class="datecreate">
                    '.$date.'
                </div>
                </div>

                <div class="listing">
                    <table>
                        <thead>
                            <tr>
                                <th>SKU</th>
                                <th>DESCRIPCIÓN</th>
                                <th>SERIE</th>
                                <th>NOTAS</th>
                            </tr>
                        </thead>
                        <TBody>';

                        $sof = 0;

                        foreach ($dato as $dt){
                            $el = explode('|', $dt);
                                $template .= '
                                <tr>
                                    <td style="width: 90px">'.$el[6].'</td>
                                    <td style="width: 380px">'.$el[7].'</td>
                                    <td style="width: 90px">'.$el[8].'</td>
                                    <td>'.$el[9].'</td>
                                </tr>';
                        }

                
                            $template .= '
                        </TBody>
                    </table>
                </div>

        </section>
';

    return $template;
}