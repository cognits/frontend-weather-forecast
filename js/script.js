// Javascript Code.
//Variables
var pais = "";
var codigo = "";
var url = "";
var display = "";
var far = "";

$(document).ready(function() {

	$(this).load("paises.json", function(data){
    var paises = JSON.parse(data);

    pais = paises[0]["name"];
    codigo = paises[0]["code"];
    dir = "http://api.wunderground.com/api/8b7e28d768cfa522/conditions/q/"+ codigo +"/"+ pais +".json";

    $('#boton1').click(function() {
        alert("Weit!!!");
        $('.screen').append("<p class =\"pai\"> Pais : "+ pais +"</p>");
        $('.screen').append("<p class =\"cod\"> Codigo: "+ codigo +"</p>");
  	});
   	

    });
    
    $(this).load(dir, function(data){
    var clima = JSON.parse(data);

    display = clima["current_observation"]["display_location"]["full"];
   	far = clima["current_observation"]["temp_f"];


    $('#boton2').click(function() {
        alert("Weit!!!");
        $('.screen').append("<p class =\"display\"> Pais : "+ display +"</p>");
        $('.screen').append("<p class =\"f\"> Temperatura °F: "+ far +" °F</p>");
  	});


	});
 });
