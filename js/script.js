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


jQuery(document).ready(function($) {
//The functionality of page
    $('#search').click(function() {
var codecountrie="";
        country = $("input[name=Countrie]").val();
        state = $("input[name=State]").val();

        if (country.length !=0 && state.length !=0){
          $.ajax({
          url : "countries.json",
          dataType : "json",
          success : function(parsed_json) {
            for (var i=0; i <= 242; i++) {
           if (parsed_json[i]["name"].toLowerCase() === country) {
                        codecountrie= parsed_json[i]["code"]
                };
                console.log(codecountrie);
            };
          }
          });


  $.ajax({
  url : "http://api.wunderground.com/api/f7b861602853b78f/geolookup/conditions/q/"+codecountrie+"/"+state+".json",
  dataType : "jsonp",
  success : function(parsed_json) {
  var location = parsed_json['location']['city'];
  var temp_f = parsed_json['current_observation']['temp_f'];
  alert("Current temperature in " + location + " is: " + temp_f);
  }
  });
        } else{
            alert("hola que hace");
        };



});

});
