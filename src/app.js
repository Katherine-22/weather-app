function formatDate(cityTime) {
  geoDate = new Date(cityTime);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[geoDate.getDay()];

  let date = geoDate.getDate();
  if (date < 10) {
    date = `0${date}`;
  }

  let month = geoDate.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }

  let hours = geoDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = geoDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let geoDateString = `${day} ${date}.${month}, ${hours}:${minutes}`;
  return geoDateString;
}

//Displaying HTML forecast
function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#weekly-forecast");
  let forecastHTML = `<div class="row forecast">`;
  let days = ["Sun", "Mon", "Tue", "Wed"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` 
    <div class="col-6 col-md-3 px-1">
              <div class="week-day">
                <img src="images/sun_cloud.png" alt="" />
                <h3>
                  +31°C <br />
                  <span class="lower-temp">+24°C</span>
                </h3>
                <p id="weather-forecast-day">${day}</p>
              </div>
            </div>
          
    `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastElement);
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "31f7dc5277687ce116d1207621713d35";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  let mainCityName = document.querySelector("#main-city");
  mainCityName.innerHTML = response.data.name;

  celsiusTemperature = response.data.main.temp;

  let temperature = Math.round(celsiusTemperature);

  let cityTemp = document.querySelector("#main-temp");
  cityTemp.innerHTML = temperature;

  let weatherDescription = document.querySelector("#main-description");
  weatherDescription.innerHTML = response.data.weather[0].description;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = response.data.wind.speed;

  let pressure = document.querySelector("#pressure");
  pressure.innerHTML = response.data.main.pressure;

  //Fixing time zones for the searched city

  d = new Date();
  localTime = d.getTime();
  localOffset = d.getTimezoneOffset() * 60000;
  utc = localTime + localOffset;
  let cityTime = utc + 1000 * response.data.timezone;

  let dateElement = document.querySelector("#main-date");
  dateElement.innerHTML = formatDate(cityTime);

  //Adding icons from API
  let mainIconElement = document.querySelector("#main-weather-image");

  mainIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  mainIconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "31f7dc5277687ce116d1207621713d35";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  search(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

//current weather

function showPosition(position) {
  let latitude = position.coords.latitude;
  console.log(latitude);
  let longitude = position.coords.longitude;
  console.log(longitude);

  let apiKey = "31f7dc5277687ce116d1207621713d35";

  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=
${longitude}&units=metric
&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function localWeather() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let btnCurrent = document.querySelector("#current-btn");
btnCurrent.addEventListener("click", localWeather);

//weather in suggested cities
function newYorkWeather() {
  search("New York");
}
let newYork = document.querySelector("#new-york");
newYork.addEventListener("click", newYorkWeather);

function kyivWeather() {
  search("Kyiv");
}
let kyiv = document.querySelector("#kyiv");
kyiv.addEventListener("click", kyivWeather);

function parisWeather() {
  search("Paris");
}
let paris = document.querySelector("#paris");
paris.addEventListener("click", parisWeather);

function viennaWeather() {
  search("Vienna");
}
let vienna = document.querySelector("#vienna");
vienna.addEventListener("click", viennaWeather);

//Change temperature units
function displayFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#main-temp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);

  let unitElement = document.querySelector("#currentUnit");
  unitElement.innerHTML = "°F";

  //remove .active from celsiusLink
  celsiusLink.classList.remove("active");
  //add .active to fahrenheitLink
  fahrenheitLink.classList.add("active");
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#main-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

  let unitElement = document.querySelector("#currentUnit");
  unitElement.innerHTML = "°C";

  //remove .active from fahrenheitLink
  fahrenheitLink.classList.remove("active");
  //add .active to celsiusLink
  celsiusLink.classList.add("active");
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemp);

//default weather

search("London");
