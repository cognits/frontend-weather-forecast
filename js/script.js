//The funcional the page

var parse2="";
jQuery(document).ready(function($) {
$('.fahrenheit').click(function() {
    var state = $("input[name=State]").val();
    var parse2="";
});
//The functionality of page
    $('#search').click(function() {
var codeCountrie="";
var mode_temp = $("input[name=temperature]:checked").val();
        country = $("input[name=Countrie]").val();
        state = $("input[name=State]").val();
        country = country.toLowerCase();
        state=state.toLowerCase();
        if (country.length !=0 && state.length !=0){
          $.ajax({
          url : "countries.json",
          dataType : "json",
          success : function(parsed_json1) {
            for (var i=0; i <= 242; i++) {
           if (parsed_json1[i]["name"].toLowerCase() === country) {
                    codeCountrie= parsed_json1[i]["code"]
                };
                console.log(codeCountrie);
            };
            if (codeCountrie.length===0) {
                if ($(".letererror").length===0){
                    $('.error').append("<p class =\"letererror\">You must enter a valid country and a state ....!</p>");
                }
            } else{
              $.ajax({
              url : "http://api.wunderground.com/api/f7b861602853b78f/geolookup/conditions/q/"+codeCountrie+"/"+state+".json",
              dataType : "jsonp",
              success : function(parsed_json) {
                    if (parsed_json["response"]["error"]) {
                        if ($(".country").length === 0) {
                            if ($(".letererror").length===0){
                                $('.error').append("<p class =\"letererror\">Your search yielded no results try again ....</p>");
                            };
                        };
                    };
                    console.log(parse2);
                    console.log(state);
                if ($(".weather").length === 0) {
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
                  $(".menu").each(function() {
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
                } else {
                    console.log("Has been double click on search");
                };
              }
              });
            }
            }
          });
            } else{
                if ($(".letererror").length===0){
                    $('.error').append("<p class =\"letererror\">You must enter a valid country and a state ....!!</p>");
                };
            };
    });
});

$('#reset').click(function() {
    $("#clcoment1").val("");
    $("#clcoment2").val("");
    location.reload();
});
//  the java of page!!