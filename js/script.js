//The funcional the page
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
    }
jQuery(document).ready(function($) {
//The functionality of page
    $('#search').click(function() {
var codeCountrie="";
var nameState="";
var mode_temp = $("input[name=temperature]:checked").val();
        country = $("input[name=Countrie]").val();
        state = $("input[name=State]").val();
        country = country.toLowerCase();
        if (country.length !=0 && state.length !=0){
          $.ajax({
          url : "countries.json",
          dataType : "json",
          success : function(parsed_json) {
            for (var i=0; i <= 242; i++) {
           if (parsed_json[i]["name"].toLowerCase() === country) {
                    codeCountrie= parsed_json[i]["code"]
                };
                console.log(codeCountrie);
            };
            if (codeCountrie.length===0) {
                alert("Sorry there is no record of what calls");
            } else {
                    //the efect of slide 
              $.ajax({
              url : "http://api.wunderground.com/api/f7b861602853b78f/geolookup/conditions/q/"+codeCountrie+"/"+state+".json",
              dataType : "jsonp",
              success : function(parsed_json) {
              if (parsed_json["response"]["error"]) {
                   alert("Sorry entered in valid state")
              } else {
              var location = parsed_json['location']['city'];
              var temp_f = parsed_json['current_observation']['temp_f'];
              var hcountrie = parsed_json["current_observation"]["display_location"]["full"];
              var hcity = parsed_json["current_observation"]["display_location"]["country"];
              var hstate = parsed_json["current_observation"]["display_location"]["state_name"];
              var weather = parsed_json["current_observation"]["weather"];
              var dewpoint = parsed_json["current_observation"]["dewpoint_string"];
              var icon = parsed_json["current_observation"]["icon_url"];
              var update = parsed_json["current_observation"]["observation_time"];
              var visibility = parsed_json["current_observation"]["visibility_km"];
              var humidity = parsed_json["current_observation"]["relative_humidity"];
              var wind = parsed_json["current_observation"]["wind_kph"];
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
              if (mode_temp === "Fahrenheit") {
              var tempf = parsed_json["current_observation"]["temp_f"];
              var tempc = parsed_json["current_observation"]["temp_c"];
                $('.TempBig').append("<p class =\"tempC\">"+ tempf +" °F</p>");
                $('.TempF').append( "<p>Celsius</p>"+"<p>"+tempc+"°C</p>");
              } else {
              var tempc = parsed_json["current_observation"]["temp_c"];
              var tempf = parsed_json["current_observation"]["temp_f"];
                $('.TempBig').append("<p class =\"tempC\">"+ tempc +" °C</p>");
                $('.TempF').append( "<p>Fahrenheit</p>"+"<p>"+tempf+"°F</p>");
              };
              $('.TempBig').append("<p class=\"weather senst\">"+weather+"</p>"+"<p class=\"dewpoint senst\">"+dewpoint+"</p>"+"<p class=\"senst\">Feeling Climate</p>");
              $('.icon').append("<img src= \""+ icon +"\" alt =\"Image of weather\">");
              $('.location').append("<p class =\"country\">"+ hcountrie +"</p>"+"<h1 class=\"city\">"+hcity+"</h1>"+"<h1 class=\"state\">"+hstate+"</h1>");
              $('.update').append("<p>"+update+"</p>");
              $('.visibility_km').append("<p>"+visibility+"    Km</p>");
              $('.relative_humidity').append("<p>"+humidity+"</p>");
              $('.wind_string').append( "<p>"+wind+"   KM/h</p>");
              }
          }
              });
            };
          }
          });
        } else{
            alert("You must enter data to search");
        };
});
    $('#reset').click(function() {
        $("#clcoment1").val("");
        $("#clcoment2").val("");
        location.reload();
    });
});
