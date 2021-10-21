let now = new Date();

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
if (hours < 10) {
  hours = `0${hours}`;
}

if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let month = months[now.getMonth()];

let h2 = document.querySelector("h2");
h2.innerHTML = `${day}, ${month} ${date} , ${hours}:${minutes}`;

function formatDay (timestamp) {

  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  return days[day];
  
  }


function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML =`<div class="row"> `;
  forecast.forEach(function (forecastDay, index) {
if (index < 6) {
  forecastHTML = 
  forecastHTML + 
   `

  <div class="col-2">
    <div class = "weather-forecast-date">${formatDay(forecastDay.dt)}</div>
   <img 
   src = "http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
   alt= ""
   width="42" 
   />
   <div class= "weather-forecast-temperature">
     <span class= "weather-forecast-temperature-max"> ${Math.round(forecastDay.temp.max)}° </span>
   <span class= "weather-forecast-temperature-min"> ${Math.round(forecastDay.temp.min)}°</span>
   
</div>
</div>

  `;
}
   });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;

  }

  function getForecast(coordinates) {
    console.log(coordinates);
    let apiKey = "6a40fb3730e1b90ea73fd96f4eab80d7";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
      axios.get(apiUrl).then(displayForecast);
    }
    




function displayWeatherCondition(response) {
  console.log(response.data.name);
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

document.querySelector("#icon").setAttribute(
  "src",
  `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
);

document.querySelector("#icon").setAttribute("alt", response.data.weather[0].description);

getForecast(response.data.coord);


}



function searchCity(city) {
  let apiKey = "6a40fb3730e1b90ea73fd96f4eab80d7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayWeatherCondition);
}

function searchLocation(position) {
  let apiKey = "6a40fb3730e1b90ea73fd96f4eab80d7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function heandleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}


function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}  

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}  


let celsiusTemperature = null;

let searchForm = document.querySelector("#search-bar");
searchForm.addEventListener("submit", heandleSubmit);

let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);


searchCity("New York");
