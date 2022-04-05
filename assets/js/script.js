var apiKey = "4" + "8" + "0" + "6" + "b" + "8" + "0" + "a" + "8" + "7" + "d" + "4" + "d" + "5" + "f" + "0" + "3" + "2" + "1" + "3" + "f" + "3" + "9" + "8" + "1" + "b" + "4" + "7" + "9" + "9" + "a" + "d";
var articleEl = document.querySelector("article");
var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city");

var formSubmitHandler = function(event) {
    event.preventDefault();

    articleEl.innerHTML = "";

    var city = cityInputEl.value.trim();

    if(city) {
        getLocation(city);
        cityInputEl.value = "";
    }  else {
        alert("Please enter a city");
    }
};

var getLocation = function(city) {
    var geoApiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + apiKey;

    fetch(geoApiUrl).then(function(response) {
        if(response.ok) {
            response.json().then(function(geoData) {
                var cityNameEl = document.createElement("h3");
                cityNameEl.textContent = geoData[0].name + ", " + geoData[0].state;
                console.log(geoData);
                getWeatherData(geoData[0].lat, geoData[0].lon);
            });
        } else {
            alert("Somebody just got diagnosed with skill issue. Could be you, could be me, could be the API I'm getting the data you requested from. It doesn't matter who has skill issue in the end though, as it is a disease that stops everything in its tracks. Maybe try submitting that city again and see if it changes anything.");
        }
    });
};

var getWeatherData = function(lat, lon) {
    var oneCallApiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;

    fetch(oneCallApiUrl).then(function(response) {
        if(response.ok) {
            response.json().then(function(weatherData) {
                console.log(weatherData);
                //functionName(weatherData);
            });
        } else {
            alert("Somebody just got diagnosed with skill issue. Could be you, could be me, could be the API I'm getting the data you requested from. It doesn't matter who has skill issue in the end though, as it is a disease that stops everything in its tracks. Maybe try submitting that city again and see if it changes anything.");
        }
    });
};

cityFormEl.addEventListener("submit", formSubmitHandler);