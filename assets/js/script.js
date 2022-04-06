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
                console.log(geoData);
                getWeatherData(geoData);
            });
        } else {
            alert("Somebody just got diagnosed with skill issue. Could be you, could be me, could be the API I'm getting the data you requested from. It doesn't matter who has skill issue in the end though, as it is a disease that stops everything in its tracks. Maybe try submitting that city again and see if it changes anything.");
        }
    });
};

var getWeatherData = function(geoData) {
    var oneCallApiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + geoData[0].lat + "&lon=" + geoData[0].lon + "&units=imperial&appid=" + apiKey;

    fetch(oneCallApiUrl).then(function(response) {
        if(response.ok) {
            response.json().then(function(weatherData) {
                console.log(weatherData);
                displayWeatherData(geoData, weatherData);
            });
        } else {
            alert("Somebody just got diagnosed with skill issue. Could be you, could be me, could be the API I'm getting the data you requested from. It doesn't matter who has skill issue in the end though, as it is a disease that stops everything in its tracks. Maybe try submitting that city again and see if it changes anything.");
        }
    });
};

var displayWeatherData = function(geoData, weatherData) {
    var date = new Date();

    var currentWeatherEl = document.createElement("section")
    var headerEl = document.createElement("div");

    var headerTextEl = document.createElement("h2");
    headerTextEl.textContent = geoData[0].name + " (" + String(date.getMonth() + 1).padStart(2, '0') + "/" + String(date.getDate()).padStart(2, '0') + "/" + date.getFullYear() + ")";

    var imageEl = document.createElement("img");
    imageEl.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherData.current.weather[0].icon + "@2x.png");

    var currentTempEl = document.createElement("p");
    currentTempEl.textContent = "Temp: " + weatherData.current.temp + "°F";

    var currentWindEl = document.createElement("p");
    currentWindEl.textContent = "Wind: " + weatherData.current.wind_speed + " MPH";

    var currentHumidityEl = document.createElement("p");
    currentHumidityEl.textContent = "Humidity: " + weatherData.current.humidity + " %";

    var currentUVEl = document.createElement("p");
    currentUVEl.textContent = "UV Index: ";

    var UVColorEl = document.createElement("span");
    if(weatherData.current.uvi < 3) {
        UVColorEl.className = "low";
    } else if(weatherData.current.uvi < 6) {
        UVColorEl.className = "moderate";
    } else if(weatherData.current.uvi < 8) {
        UVColorEl.className = "high";
    } else if(weatherData.current.uvi <= 10) {
        UVColorEl.className = "very-high";
    } else {
        UVColorEl.className = "extreme";
    }
    UVColorEl.textContent = weatherData.current.uvi;

    headerEl.appendChild(headerTextEl);
    headerEl.appendChild(imageEl);
    currentWeatherEl.appendChild(headerEl);
    currentWeatherEl.appendChild(currentTempEl);
    currentWeatherEl.appendChild(currentWindEl);
    currentWeatherEl.appendChild(currentHumidityEl);
    currentUVEl.appendChild(UVColorEl);
    currentWeatherEl.appendChild(currentUVEl);
    articleEl.appendChild(currentWeatherEl);
};

cityFormEl.addEventListener("submit", formSubmitHandler);