function showWeather(response) {
  let mainCityName = document.querySelector("#main-city");
  mainCityName.innerHTML = response.data.name;

  let temperature = Math.round(response.data.main.temp);
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

  // console.log(response.data);
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

// date and time
function showNewDate(userDate) {
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
  let date = userDate.getDate();
  if (date < 10) {
    date = `0${date}`;
  }
  let month = userDate.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }
  let hours = userDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = userDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let sentence = `${day} ${date}.${month}, ${hours}:${minutes}`;
  return sentence;
}

let currentDate = document.querySelector("#main-date");
currentDate.innerHTML = showNewDate(new Date());

//default weather

search("London");

//Change temperature units

// function changeToFahrenheit() {
//   let mainTemp = document.querySelector("#main-temp");
//   mainTemp.innerHTML = "66°F";
// }
// function changeToCelsius() {
//   let temp = document.querySelector("#main-temp");
//   temp.innerHTML = "33°C";
// }

// let fahrenheitTemp = document.querySelector("#fahrenheit");
// fahrenheitTemp.addEventListener("click", changeToFahrenheit);

// let celsiusTemp = document.querySelector("#celsius");
// celsiusTemp.addEventListener("click", changeToCelsius);
