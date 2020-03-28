
$(document).ready(function () {



    var APIKey = "86df572e26ff8d3c2b48e1e3a5809373";
    var cityArray = [];


    // Function to make the call and display current weather 

    function displayCurrentWeather(city) {

        // Var for OpenWeather Api Key, Var for text input and a Var to query the database

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APIKey + "&units=metric";



        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            
            .then(function (response) {
                // Log the queryURL
                console.log(queryURL);

                $(".weather-info").empty();
                $(".condition-image").empty();

                // Log the response object
                console.log(response);

                // Create a var for weather-info div

                var weatherInfo = $(".weather-info");

                console.log(weatherInfo);

                // Create var for temperature response

                var tempResponse = response.main.temp;

                // Create div to display temp

                var temperature = $("<div>").text("Temperature: " + tempResponse + "℃");

                // Append the temp to main WeatherInfo div

                weatherInfo.append(temperature)

                // Create a var for humidity response:

                var humidityResponse = response.main.humidity;

                // Create div to display humidity

                var humidity = $("<div>").text("Humidity: " + humidityResponse + "%");

                // Append the humidity to main WeatherInfo div

                weatherInfo.append(humidity);

                // Create var for wind response:

                var windResponse = response.wind.speed;

                console.log("response is: ", response)

                // Create div to display wind

                var wind = $("<div>").text("Wind Speed: " + windResponse + " MPH");

                // Append wind to weatherInfo

                weatherInfo.append(wind);

                // Display weather icon

                var iconcodeCurrent = response.weather[0].icon
                console.log(iconcodeCurrent);

                var iconurlCurrent = "http://openweathermap.org/img/w/" + iconcodeCurrent + ".png";

                $(".condition-image").append('<img src="' + iconurlCurrent + '" />');


                // Ending curly bracket for response function 
            });
    }

    // Function to get the stored city to display on the left:
    // newCity is a local variable to that function

    function displaySearchedCity(newCity) {

        $(".city-card-body").empty();

        console.log(cityArray);

        localStorage.setItem("searchedCity", JSON.stringify(cityArray))

        // for loop over the cityarry and then dynamically append each item in the array to the city-card-body. 

        for (var i = 0; i < cityArray.length; i++) {
            var cityName = $("<p>");

            // Adding a class of new-city-p to <p>
            cityName.addClass("new-city-p");

            cityName.attr(cityArray[i]);

            // Providing the <p> text
            cityName.text(cityArray[i]);
            // Adding the button to the buttons-view div
            $(".city-card-body").append(cityName);

            // ending bracket for displaySearchedCity function
        }
    }


    // Function to display 5-day forecast temperatures calling OpenWeather:

    function fiveDayForecast(inputCityName) {
        var queryTemp = "https://api.openweathermap.org/data/2.5/forecast?q=" + inputCityName + "&APPID=" + APIKey + "&units=metric";
        var queryConditionImage =

            // Run AJAX call to the OpenWeatherMap API
            $.ajax({
                url: queryTemp,
                method: "GET"
            })

                // Store retrieved data inside of an object called "responseTemp"

                .then(function (responseTemp) {

                    console.log(responseTemp)

                    $(".forecastCards").empty();

                    for (var i = 0; i < 5; i++) {

                        console.log(responseTemp.list[i].main.temp);



                        // Variables for forecast data:
                        var forecastDate = responseTemp.list[i].dt_txt.slice(0, 10);
                        console.log(forecastDate);
                        // forecastTemp.moment().format('MM/DD/YYYY');
                        var forecastTemp = responseTemp.list[i].main.temp;
                        var forecastHumidity = responseTemp.list[i].main.humidity;
                        var iconcode = responseTemp.list[i].weather[0].icon;
                        console.log(iconcode);
                        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

                        var cardContent =
                            "<div class='col-sm-2 cardDay'><p class='dateForecast'>" +
                            forecastDate +
                            "</p><p>" +
                            '<img src="' + iconurl + '" />' +
                            "</p><p>" +
                            "Temp: " +
                            forecastTemp +
                            '℃' +
                            "</p><p>" +
                            'Humidity: ' +
                            forecastHumidity +
                            '%' +
                            "</p></div>";


                        // format date 

                        // moment(".dateForecast").format('MM/DD/YYYY');
                        



                        // cardContent.attr("class", "background-color: blue");

                        $(".forecastCards").append(cardContent);





                    }
                })
    }

    // var queryHumidity = "api.openweathermap.org/data/2.5/forecast.humidity?q=" + inputCityName + "&APPID=" + APIKey;

    // // Run AJAX call to the OpenWeatherMap API
    // $.ajax({
    //     url: queryHumidity,
    //     method: "GET"
    // })
    // }


    // CLICK EVENT FOR SEARCH BUTTON:

    $("#search-button").on("click", function (event) {

        event.preventDefault();

        // Grab the input data 

        var inputCityName = $("#city-input").val().trim();
        cityArray.push(inputCityName);

        $(".city").text((inputCityName))


        //  Today's date goes next to city

        var todayDate = $('.today-date');
        console.log(todayDate)

        // I AM TRYING TO MAKE A SPACE BETWEEN CITY AND DATE:
        $(todayDate).text("(" + (moment().format('MM/DD/YYYY')) + ")")


        // 5-Day Forecast heading text

        var fiveDayText = $('#five-day-text')
        console.log(fiveDayText)
        $(fiveDayText).text("3-Hour Forecast: ")

        // Call functions

        displayCurrentWeather(inputCityName);
        displaySearchedCity(inputCityName);
        fiveDayForecast(inputCityName)
        console.log(cityArray)

    });


    // CLICK EVENT FOR previously searched city to display that city's weather again

    $(".city-card-body").on("click", ".new-city-p", function (event) {

        console.log(event.currentTarget.innerText);

        event.preventDefault();
        $(".city").text(event.currentTarget.innerText);
        displayCurrentWeather(event.currentTarget.innerText);

    })


    // Closing curly bracket for document ready function
})