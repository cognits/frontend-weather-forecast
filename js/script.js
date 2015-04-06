//<div onclick="addClass(this,'verde');">Pulse para Colorear de Verde</div>

//<div class="rojo" onclick="removeClass(this,'rojo');">Pulse para Remover la clase Rojo</div>

//The efects of the page
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
//the efect of slide 
function abajo() {
window.scrollBy(-0,50); // velocidad abajo
scrolldelay = setTimeout('abajo()',20); // tiempo
}
function subir() {
window.scrollBy(-0,-50); // velocidad subir
scrolldelay = setTimeout('subir()',20); // tiempo
}
function stopScroll() {
clearTimeout(scrolldelay);
}//End the efect slide

//The functionality of page
    $('#search').click(function() {

        country = $("input[name=country]").val();
        state = $("input[name=state]").val();

jQuery(document).ready(function($) {
  $.ajax({
  url : "http://api.wunderground.com/api/f7b861602853b78f/geolookup/conditions/q/"+country+"/"+state+".json",
  dataType : "jsonp",
  success : function(parsed_json) {
  var location = parsed_json['location']['city'];
  var temp_f = parsed_json['current_observation']['temp_f'];
  alert("Current temperature in " + location + " is: " + temp_f);
  display = parse_clima["current_observation"]["display_location"]["full"];

  $('.tempC').append("<p class =\"tempC\">"+ display +"</p><hr>");
  }
  });
});
        });
