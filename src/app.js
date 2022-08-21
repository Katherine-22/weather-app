function formatDate(timestamp) {
  let userDate = new Date(timestamp);
  let date = userDate.getDate();

  let month = userDate.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[userDate.getDay()];
  return `${day}, ${date}.${month}`;
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

  let dateElement = document.querySelector("#main-date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

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

function romeWeather() {
  search("Rome");
}
let rome = document.querySelector("#rome");
rome.addEventListener("click", romeWeather);

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
