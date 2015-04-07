//The efects of the page
//End the efect slide
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
var hcountrie="";
var hcity="";
var hstate="";
var tempc="";
var tempf="";
var weather="";
var dewpoint="";
var icon="";
var update="";
var visibility="";
var humidity="";
var wind="";
var codecountrie="";
var type_tempe = $("input[name=temperature]:checked").val();
    $('#search').click(function() {
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
                        codecountrie= parsed_json[i]["code"]
                };
                console.log(codecountrie);
            };
            if (codecountrie.length===0) {
                alert("Sorry there is no record of what calls");
            } else {
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
                    //the efect of slide 
              $.ajax({
              url : "http://api.wunderground.com/api/f7b861602853b78f/geolookup/conditions/q/"+codecountrie+"/"+state+".json",
              dataType : "jsonp",
              success : function(parsed_json) {
              console.log(type_tempe);
              var location = parsed_json['location']['city'];
              var temp_f = parsed_json['current_observation']['temp_f'];
              hcountrie = parsed_json["current_observation"]["display_location"]["full"];
              hcity = parsed_json["current_observation"]["display_location"]["country"];
              hstate = parsed_json["current_observation"]["display_location"]["state_name"];
              tempf = parsed_json["current_observation"]["temp_f"];
              tempc = parsed_json["current_observation"]["temp_c"];
              weather = parsed_json["current_observation"]["weather"];
              dewpoint = parsed_json["current_observation"]["dewpoint_string"];
              icon = parsed_json["current_observation"]["icon_url"];
              update = parsed_json["current_observation"]["observation_time"];
              visibility = parsed_json["current_observation"]["visibility_km"];
              humidity = parsed_json["current_observation"]["relative_humidity"];
              wind = parsed_json["current_observation"]["wind_kph"];
              if (type_tempe == "fahrenheit") {
                $('.TempBig').append("<p class =\"tempC\">"+ tempf +" °F</p>");
                  $('.TempF').append("<p>Celsius</p>"+"<p>"+tempc+"°C</p>");
              } else if (type_tempe=="celsius") {
                  $('.TempBig').append("<p class =\"tempC\">"+ tempc +" °C</p>");
                  $('.TempF').append( "<p>fahrenheit</p>"+"<p>"+tempf+"°F</p>");
              };

              $('.TempBig').append("<p class=\"weather\">"+weather+"</p>"+"<p class=\"dewpoint\">"+dewpoint+"</p>");
              $('.icon').append("<img src= \""+ icon +"\" alt =\"Image of weather\">");
              $('.location').append("<p class =\"country\">"+ hcountrie +"</p>"+"<h1 class=\"city\">"+hcity+"</h1>"+"<h1 class=\"state\">"+hstate+"</h1>");
              $('.update').append("<p>"+update+"</p>");
              $('.visibility_km').append("<p>"+visibility+"    Km</p>");
              $('.relative_humidity').append("<p>"+humidity+"</p>");
              $('.wind_string').append( "<p>"+wind+"   KM/h</p>");
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
