// Javascript Code.
jQuery(document).ready(function($) {
    $("button").click(function () {
        var country = $("input[name=country]").val();
        var province = $("input[name=province]").val();
        country = country.toLowerCase();
        var temp_type = $("input[name=temperature]:checked").val();
        var code_country = "";

        if (country != "" && province != "") {
            $.ajax({
            url: "countries.json", dataType: "json",
            success : function(parsed_json) {
                for (var i=0; i <= 242; i++) {
                    if (parsed_json[i]["name"].toLowerCase() === country) {
                        code_country = parsed_json[i]["code"]
                    };
                };
                if (code_country.length === 0) {
                    alert("Sorry, we have no information of this country.")
                } else {
                    $.ajax({
                    url : "http://api.wunderground.com/api/0d95ff1db656d6bf/geolookup/conditions/q/"+code_country+"/"+province+".json",
                    dataType : "jsonp",
                    success : function(parsed_json) {
                        console.log(parsed_json["response"]["error"])
                        if (parsed_json["response"]["error"]) {
                            alert("Sorry, " + parsed_json["response"]["error"]["description"])
                        } else {
                            var location = parsed_json['location']['city'];
                            if (temp_type === "Fahrenheit") {
                                var temp_f = parsed_json['current_observation']['temp_f'];
                                alert("Current temperature in " + location + " is: " + temp_f);
                            } else {
                                var temp_c = parsed_json['current_observation']['temp_c'];
                                alert("Current temperature in" + location + "is" + temp_c);
                            };
                        };
                        console.log(parsed_json)
                    }
                    });
                        };
                    }
                    });
        } else {
            confirm('Please fill out all fields.')
        }
    });
});

