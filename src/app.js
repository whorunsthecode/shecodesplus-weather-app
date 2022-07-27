// Date//
function currentDate(timestamp) {
  let date = new Date(timestamp);
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let today = `${day} ${hours}:${minutes}`;
  return today;
}

let date = document.querySelector("#current-date");
date.innerHTML = currentDate();
// Search for a city//

function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = document.querySelector("#city-name");
  city.innerHTML = cityInput.value;
  let cityName = `${cityInput.value}`;
  searchCity(cityName);
}

function searchCity(cityName) {
  let apiKey = "edafb8e14d32a1a359f2e6ca3eb0fdc2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showCurrentTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", showCity);

// C/F Conversion//

function convertToCelsius(event) {
  let temperatureCurrent = document.querySelector("#current-temperature");
  temperatureFahrenheit.classList.remove("active-link");
  temperatureCelsius.classList.add("active-link");
  temperatureCurrent.innerHTML = Math.round(celsiusTemp);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureCurrent = document.querySelector("#current-temperature");
  temperatureFahrenheit.classList.add("active-link");
  temperatureCelsius.classList.remove("active-link");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temperatureCurrent.innerHTML = Math.round(fahrenheitTemp);
}

let temperatureCelsius = document.querySelector(".celsius-link");
temperatureCelsius.addEventListener("click", convertToCelsius);

let temperatureFahrenheit = document.querySelector(".fahrenheit-link");
temperatureFahrenheit.addEventListener("click", convertToFahrenheit);

// Current Temperature//
function showCurrentTemperature(response) {
  console.log(response);
  let temperatureCurrent = document.querySelector("#current-temperature");
  temperatureCurrent.innerHTML = Math.round(response.data.main.temp);
  let city = document.querySelector("#city-name");
  city.innerHTML = response.data.name;
  celsiusTemp = response.data.main.temp;

  let cityDescription = response.data.weather[0].main;
  let cityWind = Math.round(response.data.wind.speed);
  let cityHumidity = response.data.main.humidity;
  let cityIcon = response.data.weather[0].icon;

  let description = document.querySelector(".current-condition-text");
  description.innerHTML = cityDescription;
  let wind = document.querySelector(".current-wind");
  wind.innerHTML = `${cityWind} m/h`;
  let icon = document.querySelector("#icon");
  icon.setAttribute("src", `images/${cityIcon}.svg`);
  getForecast(response.data.coord);
}

// Current Location //
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "edafb8e14d32a1a359f2e6ca3eb0fdc2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showCurrentTemperature);
}

function getCurrentCity() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentCity = document.querySelector("#current-city");
currentCity.addEventListener("click", getCurrentCity);

// Forecast //
function formatDay(timestamp) {
  let futureDate = new Date(timestamp * 1000);
  let day = futureDate.getDay();
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  return days[day];
}

function displayForecast(response) {
  console.log(response.data);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row d-flex px-3 mt-auto" id="forecast">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col m-2 block d-flex flex-column" >
                            <small class="text-muted mb-0">${formatDay(
                              forecastDay.dt
                            )}</small>
         
                <div class="text-center card-content">
                  <div>
                     <img src="images/${
                       forecastDay.weather[0].icon
                     }.svg" class="symbol-img" alt="..." />
                  </div><span class="card-temp-max">${Math.round(
                    forecastDay.temp.max
                  )}°</span>
                  <span class="card-temp-min">${Math.round(
                    forecastDay.temp.min
                  )}°</span>
                  
                </div>
              </div>
               
           `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;

  convertToCelsius();
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = `edafb8e14d32a1a359f2e6ca3eb0fdc2`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

//

let celsiusTemp = null;
searchCity("Hong Kong");
