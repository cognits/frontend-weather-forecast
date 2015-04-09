// Javascript Code.

/*Titles of modals*/
var no_filled = "<h2 class='title_search'>Please fill out all fields.</h2>";
var some_wrong = "<h2 class='title_search'>Something is wrong...</h2>";
var weather_title = "<h2 class='title_search'>Weather forecast</h2>";

/*Error information.*/
var country_no = "<p class='info'>I don't know this country, but you can search again.</p>";
var error_no_city = "<p class='info'>Sorry, we have no information of this city.</p>";
var search_something = "<p class='info'>What do you want to search?</p>";

/*Images for description.*/
var fail_country = "<img src='images/failsearch.png' alt='not found'>";
var sad_face = "<img src='images/sad.png' alt='sad face'>";

/*Measurement scale.*/
var scale_farhen = "°F. ";
var scale_celcius = "°C. ";

jQuery(document).ready(function($) {
    $(".view_weather").click(function () {
        var country = $("input[name=country]").val();
        var province = $("input[name=province]").val();
        country = country.toLowerCase();
        var temp_type = $("input[name=temperature]:checked").val();
        var code_country = "";

        /*fields full*/
        if (country != "" && province != "") {
            $.ajax({
            url: "countries.json", dataType: "json",
            success : function(parsed_json) {
                /*Get country code*/
                for (var i=0; i <= 242; i++) {
                    if (parsed_json[i]["name"].toLowerCase() === country) {
                        code_country = parsed_json[i]["code"]
                    };
                };

                if (code_country.length === 0) {
                    for_errors(some_wrong, fail_country, country_no);
                } else {
                    $.ajax({
                    url : "http://api.wunderground.com/api/0d95ff1db656d6bf/geolookup/conditions/q/"+code_country+"/"+province+".json",
                    dataType : "jsonp",
                    success : function(parsed_json) {
                        if (parsed_json["response"]["error"]) {
                            for_errors(some_wrong, sad_face, error_no_city);
                        } else {
                            var location = parsed_json['location']['city'];
                            var weather = parsed_json["current_observation"]["weather"];
                            var weather_icon = parsed_json["current_observation"]["icon_url"];
                            var wind = parsed_json["current_observation"]["wind_string"];

                            /*Type of temperature*/
                            if (temp_type === "Fahrenheit") {
                                var temp_f = parsed_json['current_observation']['temp_f'];
                                valid_search(weather_icon, temp_f, scale_farhen, weather, wind, location);
                            } else {
                                var temp_c = parsed_json['current_observation']['temp_c'];
                                valid_search(weather_icon, temp_c, scale_celcius, weather, wind, location);
                            };
                        };
                    }
                    });
                        };
                    }
                    });
        } else {
            for_errors(no_filled, sad_face, search_something);
        }
    });
});

/*This function adds the items to the modal whenever an error occurs.*/
var for_errors = function(title, image, description) {
    if ($(".title_search").length === 0) {
        $(".modal-header").append(title);
        $(".icon").append(image);
        $(".description").append(description);
    } else {
        $('.title_search').remove();
        $("img").remove();
        $(".info").remove();
        $(".modal-header").append(title);
        $(".icon").append(image);
        $(".description").append(description);
    };
};

/*This function adds the items to the modal ever happens successful search.*/
var valid_search = function(icon, temperature, type_scale, weather, wind, city) {
    if ($(".title_search").length === 0) {
        $(".modal-header").append("<h2 class='title_search'>Weather forecast : "+ city +".</h2>");
        $(".icon").append("<img src='" + icon + "' alt='icon description'>");
        $(".description").append("<p class='info'> <b>Current temperature : </b>" + temperature + type_scale + "</p>");
        $(".description").append("<p class='info'> <b>Weather : </b>" + weather + ".</p>");
        $(".description").append("<p class='info'> <b>Wind conditions : </b>" + wind + ".</p>");
    } else {
        $('.title_search').remove();
        $("img").remove();
        $(".info").remove();
        $(".modal-header").append("<h2 class='title_search'>Weather forecast : "+ city +".</h2>");
        $(".icon").append("<img src='" + icon + "' alt='icon description'>");
        $(".description").append("<p class='info'> <b>Current temperature : </b>" + temperature + type_scale + "</p>");
        $(".description").append("<p class='info'> <b>Weather : </b>" + weather + ".</p>");
        $(".description").append("<p class='info'> <b>Wind conditions : </b>" + wind + ".</p>");
    };
};

