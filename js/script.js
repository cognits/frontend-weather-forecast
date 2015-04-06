//<div onclick="addClass(this,'verde');">Pulse para Colorear de Verde</div>

//<div class="rojo" onclick="removeClass(this,'rojo');">Pulse para Remover la clase Rojo</div>

  $(document).ready(function(){
   $("#search").click(function () {
      $("#oculto").each(function() {
        displaying = $(this).css("display");
        if(displaying == "block") {
          $(this).fadeOut('slow',function() {
           $(this).css("display","none");
          });
        } else if (displaying == "none") {
          $(this).fadeOut('slow',function() {
           $(this).css("display","inline");
          });
        } else {
          $(this).fadeIn('slow',function() {
            $(this).css("display","block");
          });
        }
      });
    });
  });

function abajo() {
window.scrollBy(-0,50); // velocidad abajo
scrolldelay = setTimeout('abajo()',20); // tiempo
}
function subir() {
window.scrollBy(0,-50); // velocidad subir
scrolldelay = setTimeout('subir()',20); // tiempo
}
function stopScroll() {
clearTimeout(scrolldelay);
}
