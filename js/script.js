// Javascript Code.
//Variables
var pais = "";
var code = "";

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
var error ="";


/*  Variables de los Radio Buttons */
var radio_c = 0;
var radio_f = 0;

//Imputs:
var contry = "";
var city = "";

$(document).ready(function() {

    $(".insert").hide("slide");
    $(".screen2").hide("slide");
    $(".country").val("");
    $(".city").val("");

    //Button Start
    $('#start').click(function() {

        country = $("input[name=pais]").val();
        city = $("input[name=ciudad]").val();

        if (country.length != 0 && city.length != 0){

            $(this).load("paises.json", function(data){
            var paises = JSON.parse(data);

            //Search countrys in my Json
            for (var i = 0; i <= 242; i++) {
                if (((paises[i]["name"]).toLowerCase()) == country.toLowerCase()){
                    pais = paises[i]["name"];
                    code = paises[i]["code"];
                };
            };

            console.log(pais);
            console.log(code);

            url = "http://api.wunderground.com/api/8b7e28d768cfa522/conditions/q/"+code+"/"+city+".json";


            //After of press the buton, he hide 

            //Display the Country and Code
            $('.screen1').append("<p class =\"pai\">  * Pais : "+ pais +"</p>");
            $('.screen1').append("<p class =\"cod\">  * Codigo: "+ code +"</p></br>");

            console.log(url);
            $('#start').hide();

            if (code.length != 0){
                jQuery(document).ready(function($) { 
                    $.ajax({ 
                        url : url, 
                        dataType : "jsonp",
                        success : function(parse_clima) {

                            //Try for error conprovation
                            try {
                                error = parse_clima["response"]["error"]["type"];
                                if (error == "querynotfound"){
                                    alert("Json Not Found");
                                }
                            }
                            catch(TypeError) {
                                //Variables
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


                                //Add the Div Screen 2
                                $('.screen2').append("<p class =\"display\">"+ display +"</p><hr>");
                                
                                /* Logo Cognits */
                                $('.screen2').append("<img class =\"cloud\" src= \""+ image +"\" alt =\"Imagen Clima\">");
                                $('.screen2').append("<p class =\"icon\">"+ icon.toUpperCase() +"</p></br><hr>");

                                if (radio_c == 1){
                                    /* Celcious Temperature */
                                    $('.screen2').append("<p class =\"temp_c_f\"> Temperatura °C:</p> ");
                                    $('.screen2').append("<p class =\"t_c_f\">"+celcios+" °C</p>");}
                                else if (radio_f == 1){
                                    /*Farenheight Temperature */
                                    $('.screen2').append("<p class =\"temp_c_f\"> Temperatura °F:</p>");
                                    $('.screen2').append("<p class =\"t_c_f\">"+far+" °F</p>");
                                }
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

                                /** Show my Weather Div */
                                $(".screen2").show("slide");
                                /* Clear my Textbox */
                                $(".country").val("");
                                $(".city").val("");

                                /*Clear my radiobutton*/
                                $('input[name=celsius]').attr('checked',false);
                                $('input[name=fahrenheit]').attr('checked',false);
                            }
                        }
                    });
                });
            }
            else{
                alert("Code Contry not Exist");
            }
        });

        }
        else {
            alert("Input Error");
        }
    });
    //Radio Celcious
    $('.r1').click(function(){
        radio_c = 1;
        radio_f = 0;
        $('input[name=fahrenheit]').attr('checked',false);
    });

    //Radio Fahrenheit
    $('.r2').click(function(){
        radio_c = 0;
        radio_f = 1;
        $('input[name=celsius]').attr('checked',false);
    });

    //Text Press for Search
    $('.search').click(function() {
        $(".insert").toggle("slide");
    });

    
    //Button Delete
    $('#dell').click(function() {
        $('input[name=celsius]').attr('checked',false);
        $('input[name=fahrenheit]').attr('checked',false);
        $(".country").val("");
        $(".city").val("");
        location.reload();
    });

 }); /*Document Ready*/
