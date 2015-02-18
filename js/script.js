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
            $('.screen').append("<p class =\"pai\"> Pais : "+ pais +"</p>");
            $('.screen').append("<p class =\"cod\"> Codigo: "+ codigo +"</p></br></br>");
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
                        far = parse_clima["current_observation"]["temp_f"];
                        celcios = parse_clima["current_observation"]["temp_c"];
                        wind = parse_clima["current_observation"]["wind_string"];
                        humidity = parse_clima["current_observation"]["relative_humidity"];
                        pressure = parse_clima["current_observation"]["pressure_mb"];
                        visibility = parse_clima["current_observation"]["visibility_km"];

                        $('.screen').append("<p class =\"display\"> Pais : "+ display +"</p>");
                        $('.screen').append("<p class =\"up_date\"> Last Up Date: "+ up_date +"</p>");
                        $('.screen').append("<p class =\"weather\"> Weather: "+ weather +"</p>");

                        $('.screen').append("<img class =\"up_date\" src= \""+ image +"\" alt =\"Imagen Clima\">");

                        $('.screen').append("<p class =\"f\"> Temperatura : "+ far +" °F</p>");
                        $('.screen').append("<p class =\"c\"> Temperatura : "+ celcios +" °C</p>");
                        $('.screen').append("<p class =\"wind\"> Wind : "+ wind +"</p>");
                        $('.screen').append("<p class =\"humidity\"> Humidity : "+ humidity +"</p>");
                        $('.screen').append("<p class =\"pressure\"> Pressure : "+ pressure +" hPa</p>");
                        $('.screen').append("<p class =\"visibility\"> Visibility : "+ visibility +" Km</p>");




                        

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
    

    /*$(this).load("http://api.wunderground.com/api/8b7e28d768cfa522/conditions/q/"+String(codigo)+"/"+String(pais)+".json", function(data){
    console.log("p "+pais);
    console.log(codigo);
    var clima = JSON.parse(data);

    console.log(clima);
    alert("p "+pais);
    alert(codigo);

    /*alert(display);
    alert(far);
	});

    $('#boton2').click(function() {
        alert("Weit!!!");
        $('#boton2').hide();
    });

    $('#boton2').click(function() {
        alert("Weit!!!");
        $('.screen').append("<p class =\"display\"> Pais : "+ display +"</p>");
        $('.screen').append("<p class =\"f\"> Temperatura : "+ far +" °F</p>");
        $('#boton2').hide();
    });*/
 });
