<?php

function getFooter(){

    $template = '
    <footer>
        <table width="100%">
            <tr>
                <td class="foot-date" width="33%">{DATE F j,  Y}</td>
                <td class="foot-page" width="33%" align="center">{PAGENO}/{nbpg}</td>
                <td class="foot-rept" width="33%" style="text-align: right;">Listado de Productos</td>
            </tr>
        </table>
    </footer>'
    ;

    return $template;
}