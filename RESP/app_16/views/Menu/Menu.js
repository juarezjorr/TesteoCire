$(document).ready(main);

let cont = 1;

function main(){
 $('.menu_bar').on('click', function(){
     console.log(cont);
     if (cont == 1 ){
         $('nav').animate({
             right:'0%'
         });
         cont = 0;
     } else {
        cont =1
        $('nav').animate({
            right:'100%'
        });
     }
 })
}