// Javascript Code.
jQuery(document).ready(function($) {
    $("button").click(function () {
        var country = $("input[name=country]").val();
        var province = $("input[name=province]").val();
        country = country.toLowerCase();
        var code_country = ""

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
                    alert("No existe")
                } else {
                    $.ajax({
                    url : "http://api.wunderground.com/api/0d95ff1db656d6bf/geolookup/conditions/q/"+code_country+"/"+province+".json",
                    dataType : "jsonp",
                    success : function(parsed_json) {
                    var location = parsed_json['location']['city'];
                    var temp_f = parsed_json['current_observation']['temp_f'];
                    alert("Current temperature in " + location + " is: " + temp_f);
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

