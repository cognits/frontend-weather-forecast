// Javascript Code.
//Variables
var pais = "";
var codigo = "";
var display = "";
var far = "";
var url = "";

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
            $('.screen').append("<p class =\"cod\"> Codigo: "+ codigo +"</p>");
        });



        }
        else {
            alert("Input Error");
        }


        console.log(url);
        if (codigo.length != 0){
            jQuery(document).ready(function($) { 
            $.ajax({ 
                url : url, 
                dataType : "jsonp",
                success : function(parse_clima) {

                    display = parse_clima["current_observation"]["display_location"]["full"];
                    far = parse_clima["current_observation"]["temp_f"];

                    $('.screen').append("<p class =\"display\"> Pais : "+ display +"</p>");
                    $('.screen').append("<p class =\"f\"> Temperatura : "+ far +" °F</p>");

                }
        });
        });


        }
        else{
            alert("Error Don't find Json");
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
