// Javascript Code.
//Variables
var pais = "";
var codigo = "";

//**** Json Appi  Variables ****
var url = "";
var display = "";
var up_date = "";
var weather = "";
var image = "";
var icon = "";
var far = "";
var celcios = "";
var wind = "";
var humidity = "";
var pressure ="";
var visibility ="";




//Imputs:
var contry = "";
var city = "";

$(document).ready(function() {
    //$('#country').val(" ");
    //$('#city').val(" ");
    $(".insert").hide("slide");
    $(".screen2").hide("slide");

    $('#start').click(function() {

        country = $("input[name=pais]").val();
        city = $("input[name=ciudad]").val();

        if (country.length != 0 && city.length != 0){

            $(this).load("paises.json", function(data){
            var paises = JSON.parse(data);

            for (var i = 0; i <= 242; i++) {
                if (((paises[i]["name"]).toLowerCase()) == country.toLowerCase()){
                    pais = paises[i]["name"];
                    codigo = paises[i]["code"];
                };
            };

            console.log(pais);
            console.log(codigo);
            url = "http://api.wunderground.com/api/8b7e28d768cfa522/conditions/q/"+codigo+"/"+city+".json";
            $('#start').hide();
            $('.screen1').append("<p class =\"pai\">  * Pais : "+ pais +"</p>");
            $('.screen1').append("<p class =\"cod\">  * Codigo: "+ codigo +"</p></br>");
            console.log(url);

            if (codigo.length != 0){
                jQuery(document).ready(function($) { 
                $.ajax({ 
                    url : url, 
                    dataType : "jsonp",
                    success : function(parse_clima) {

                        display = parse_clima["current_observation"]["display_location"]["full"];
                        up_date = parse_clima["current_observation"]["local_time_rfc822"];
                        weather = parse_clima["current_observation"]["weather"];
                        image = parse_clima["current_observation"]["icon_url"];
                        icon = parse_clima["current_observation"]["icon"];
                        far = parse_clima["current_observation"]["temp_f"];
                        celcios = parse_clima["current_observation"]["temp_c"];
                        wind = parse_clima["current_observation"]["wind_string"];
                        humidity = parse_clima["current_observation"]["relative_humidity"];
                        pressure = parse_clima["current_observation"]["pressure_mb"];
                        visibility = parse_clima["current_observation"]["visibility_km"];

                        $('.screen2').append("<p class =\"display\">"+ display +"</p><hr>");
                        

                        $('.screen2').append("<img class =\"cloud\" src= \""+ image +"\" alt =\"Imagen Clima\">");
                        $('.screen2').append("<p class =\"icon\">"+ icon.toUpperCase() +"</p></br><hr>");

                        /* Celcious Temperature */
                        $('.screen2').append("<p class =\"cel\"> Temperatura °C:</p> ");
                        $('.screen2').append("<p class =\"tc\">"+celcios+" °C</p>");

                        /*Farenheight Temperature */
                        $('.screen2').append("<p class =\"far\"> Temperatura °F:</p>");
                        $('.screen2').append("<p class =\"tf\">"+far+" °F</p>");

                        /* up_date */
                        $('.screen2').append("<p class =\"up_date\"> Last Up Date: "+ up_date +"</p>");
                        /*Weather*/
                        $('.screen2').append("<p class =\"weather\"> Weather: "+ weather +"</p>");

                        /*Wind*/
                        $('.screen2').append("<p class =\"wind\"> Wind : "+ wind +"</p>");

                        /*Humidity*/
                        $('.screen2').append("<p class =\"humidity\"> Humidity : "+ humidity +"</p>");

                        /*Preasure*/
                        $('.screen2').append("<p class =\"pressure\"> Pressure : "+ pressure +" hPa</p>");

                        /*Visibility*/
                        $('.screen2').append("<p class =\"visibility\"> Visibility : "+ visibility +" Km</p>");

                        /*
                        $(".tc").hide();
                        $(".tf").hide();*/
                        $(".screen2").show("slide");
                    }
            });
            });
            }
            else{
                alert("Error Don't find Json");
            }
        });

        }
        else {
            alert("Input Error");
        }
    });
    
    $('.could').click(function() {
        alert("°C"); 
       $('.tc').show('slide');
    });
    $('.search').click(function() {
        $(".insert").toggle("slide");
    });
    
    $('#dell').click(function() {

        location.reload();
    });

 }); /*Document Ready*/
