
<?php

function getHeader(){

    $template = '
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
    </header>'
    ;

    return $template;
}