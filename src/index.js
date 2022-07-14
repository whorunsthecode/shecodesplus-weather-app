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

function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = document.querySelector("#city-name");
  city.innerHTML = cityInput.value;
  let apiKey = "edafb8e14d32a1a359f2e6ca3eb0fdc2";
  let cityName = `${cityInput.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showCurrentTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", showCity);

// C/F Conversion//

function convertToCelsius(event) {
  event.preventDefault();
  temperatureFahrenheit.classList.remove("active-link");
  temperatureCelsius.classList.add("active-link");
  let temperatureCelsius = Math.round(((temperatureFahrenheit - 32) * 5) / 9);
  let temperatureCurrent = document.querySelector("#current-temperature");
  temperatureCurrent.innerHTML = temperatureCelsius;
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureCurrent = document.querySelector("#current-temperature");
  temperatureFahrenheit.classList.add("active-link");
  temperatureCelsius.classList.remove("active-link");
  temperatureCurrent.innerHTML = Math.round(temperatureFahrenheit);
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
