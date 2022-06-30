// Date//
function currentDate() {
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
let cityInput = document.querySelector("#city-input");
let city = document.querySelector("#city-name");

function showCity(event) {
  event.preventDefault();
  city.innerHTML = cityInput.value;
}
if (cityInput.value) {
  city.innerHTML = `${cityInput.value}`;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", showCity);

// Bonus (Conversion)//
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureCurrent = document.querySelector("#current-temperature");
  let F = Math.round(29 * 1.8 + 32);
  temperatureCurrent.innerHTML = F;
}
let temperatureFahrenheit = document.querySelector("#Fahrenheit");
temperatureFahrenheit.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureCurrent = document.querySelector("#current-temperature");
  temperatureCurrent.innerHTML = 29;
}
let temperatureCelsius = document.querySelector("#Celsius");
temperatureCelsius.addEventListener("click", convertToCelsius);

// Current Temperature//
let apiKey = "edafb8e14d32a1a359f2e6ca3eb0fdc2";
let cityName = `${cityInput.value}`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;

function showTemperature(response) {
  console.log(response);
  let temperatureCurrent = document.querySelector("#current-temperature");
  temperatureCurrent.innerHTML = Math.round(response.data.name);
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

// Current Location //
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "edafb8e14d32a1a359f2e6ca3eb0fdc2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function getCurrentCity() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentCity = document.querySelector("#current-city");
currentCity.addEventListener("click", getCurrentCity);
