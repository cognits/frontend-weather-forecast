

$(document).ready(function(){
	$(".button").click(function(){
	$(".modulo1").fadeTo("fast",0.6)
		var pais = $("input[name=pais]").val();
		var depto = $("input[name=depto]").val();
		var grados
		 = $("input[name=grados]").val();
		if (depto.length!=0 && pais.length!=0){
			jQuery(document).ready(function($) { 
				var codPais = "";
				$.ajax({ 
					url : "package.json", dataType : "json",
					success : function(parsed_json) {
						for (var i = 0; i <= 242; i++) { //recorrer el json de paises para encontrar su codigo
							if (((parsed_json[i]["name"]).toLowerCase()) == pais.toLowerCase()){
								codPais = parsed_json[i]["code"];
							};
						};
						//Codigo para el departamento
						if (codPais.length==0) { //error si no encontro el codigo para el pais ingresado
							alert("Ops! Looks like your country doesn't exist! Try again.");
						}else{
							var direccion = "http://api.wunderground.com/api/fde3850f4faccc2a/conditions/q/"+codPais+"/"+depto+".json";
							$(document).ready(function(){
								jQuery(document).ready(function($) { 
									$.ajax({ url : direccion, dataType : "jsonp",
										success : function(parsed_json2) {
											if(parsed_json2["current_observation"]){ //revisar si el departamento tiene esta llave
												if (grados == "c"){
													var tempC = parsed_json2['current_observation']['temp_c']+ "°C"; 
												}else{
													var tempC = parsed_json2['current_observation']['temp_f'] +"°F" ;
												}
												var location = parsed_json2['current_observation']['display_location']['full'];
												var wind = parsed_json2['current_observation']['wind_string'];
												var humidity = parsed_json2['current_observation']['relative_humidity'];
												var dew = parsed_json2['current_observation']['dewpoint_string'];
												var visibi = parsed_json2['current_observation']['visibility_mi'];
												var pressure = parsed_json2['current_observation']['pressure_in'];
												var gust = parsed_json2['current_observation']['wind_gust_mph'];
												var weatherImg = parsed_json2['current_observation']['icon_url'];
												var time = parsed_json2['current_observation']['local_time_rfc822'];
												$(".city").empty();
												$(".info1").empty();
												$(".info2").empty();
												$(".info3").empty();
												$(".info4").empty();
												$(".info5").empty();
												$(".info6").empty();
												$(".info7").empty();
												$(".info7").empty();
												$(".cuadro2").empty();
												$(".city").append(" " + location);
												$(".info1").append (" Wind String: " + wind);
												$(".info2").append(" Humidity: " + humidity);
												$(".info3").append(" Dew Point: " + dew);
												$(".info4").append(" Visibility: " + visibi +"mi");
												$(".info5").append("Pressure: " + pressure +" in");
												$(".info6").append("Gusts: " + gust + " mph");
												$(".info7").append("grados " + tempC);
												$(".info8").append(" " + time);
												$(".cuadro2").append(" " + "<br/><img src=\""+weatherImg+"\" width= 100px><br/>" );
											}else{//error si no tiene esa llave
												alert("Ops! The city you entered doesn't exist or we don't have any data of this city!");
											}
										}
									});
								});
							});
						};
					}
				});
			});
			$("input").val("");
		}else if (depto.length==0 && pais.length==0){
			alert("You must input something in both boxes!");
		}else if(depto.length==0){
			alert("You forgot to input something in city box!");
		}else if(pais.length==0){
			alert("You forgot to input something in country box!");
		}
		
	});
});
$(document).on("click", ".button", function() {
    $(this).remove();
    });
