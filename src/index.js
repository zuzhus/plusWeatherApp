let now = new Date();
let h4 = document.querySelector("h4");
const icons = {
  "01d": "☀️",
  "02d": "⛅",
  "03d": "☁️",
  "04d": "☁️",
  "09d": "🌧️",
  "10d": "🌦️",
  "11d": "⛈️",
  "13d": "❄️",
  "50d": "🌫️",
  "01n": "🌑",
  "02n": "⛅",
  "03n": "☁️",
  "04n": "☁️",
  "09n": "🌧️",
  "10n": "🌦️",
  "11n": "⛈️",
  "13n": "❄️",
  "50n": "🌫️",
};

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
  "December",
];
let month = months[now.getMonth()];
let date = now.getDate();
h4.innerHTML = `${day}, ${month} ${date}`;
let currentTime = document.querySelector(".currentTime");
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
currentTime.innerHTML = `${hours}:${minutes}`;

function enterCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  searchCity(cityInput.value);
}
let textForm = document.querySelector("#text-form");
textForm.addEventListener("submit", enterCity);

function searchCity(city) {
  let apiKey = "67a08e61017984c2bbf49beb981b5d89";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(`${apiUrl}`).then(showTemp);
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${cityInput.value}`;
}

function showTemp(weather) {
  console.log(weather.data);
  let apiKey = "67a08e61017984c2bbf49beb981b5d89";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${weather.data.coord.lat}&lon=${weather.data.coord.lon}&appid=${apiKey}&units=metric`;
  let h1 = document.querySelector("#temp");
  let h2 = document.querySelector("h2");
  let weatherIcon = document.querySelector(".weatherIcon");
  let textForm = document.querySelector("#text-form");
  textForm.addEventListener("submit", enterCity);
}
function searchCity(city) {
  let apiKey = "67a08e61017984c2bbf49beb981b5d89";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showTemp);
}

function showTemp(weather) {
  console.log(weather.data);
  let apiKey = "67a08e61017984c2bbf49beb981b5d89";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${weather.data.coord.lat}&lon=${weather.data.coord.lon}&appid=${apiKey}&units=metric`;
  let h1 = document.querySelector("#temp");
  let h2 = document.querySelector("h2");
  let weatherIcon = document.querySelector(".weatherIcon");
  let weatherDescription = document.querySelector(".weatherDescription");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#windSpeed");
  h1.innerHTML = `${Math.round(weather.data.main.temp)}`;
  h2.innerHTML = `${weather.data.name}, ${weather.data.sys.country}`;
  weatherIcon.innerHTML = icons[weather.data.weather[0].icon];

  weatherDescription.innerHTML = `${weather.data.weather[0].description}`;
  humidity.innerHTML = `${weather.data.main.humidity}`;
  windSpeed.innerHTML = `${Math.round(weather.data.wind.speed * 3.6)}`;
  axios.get(`${apiUrl}`).then(showForecast);
}
function handlePosition(position) {
  let apiKey = "67a08e61017984c2bbf49beb981b5d89";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}`).then(showTemp);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}
let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);

function showForecast(response) {
  let forecastHTML = document.querySelector("#forecast");
  let forecast = `<ul class="list-group border-top-0">`;

  response.data.daily.forEach(function (weatherForecast, index) {
    if (index < 5) {
      forecast =
        forecast +
        `<li class="list-group-item">
      <div class="row">
        <div class="col-5 move">${formatDay(weatherForecast.dt)}</div>
        <div class="col">${icons[weatherForecast.weather[0].icon]}
        
    </div>
        <div class="col-3">
          <strong>${Math.round(
            weatherForecast.temp.max
          )}°</strong> / ${Math.round(weatherForecast.temp.night)}°
        </div>
      </div>
    </li>`;
    }
  });
  forecast = forecast + `</ul>`;
  forecastHTML.innerHTML = forecast;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  return days[day];
}

getCurrentPosition();
