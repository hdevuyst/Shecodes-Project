// Update current Date
let now = new Date();
let updateDayOfWeek = document.querySelector(".dayofweek");
let updateMonthDayYear = document.querySelector(".monthdayyear");
let updateTimeOfDay = document.querySelector(".timeofday");

let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let year = now.getFullYear();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thurday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

updateDayOfWeek.innerHTML = `${day}`;
updateMonthDayYear.innerHTML = `${month} ${date} ${year}`;
updateTimeOfDay.innerHTML = `${hours}:${minutes}`;

let lat = null;
let lon = null;

//form.addEventListener("submit", updateCity);

// Change temp C to F
// let tempF = Math.round((temperature * 9) / 5 + 32);
// let tempC = Math.round(temperature);

function changeF(event) {
  event.preventDefault();
  let currentTemp = document.querySelector(".temperature");
  currentTemp.innerHTML = Math.round((currentTemp.innerHTML * 9) / 5 + 32);
  let forecastTemp = document.querySelectorAll(".card-temp");
  forecastTemp.forEach(function (temp) {
    let temperature = temp.innerHTML.replace("°", "");
    temp.innerHTML = `${Math.round((temperature * 9) / 5 + 32)}°`;
  });
}

function changeC(event) {
  event.preventDefault();
  let currentTemp = document.querySelector(".temperature");
  currentTemp.innerHTML = Math.round((5 / 9) * (currentTemp.innerHTML - 32));
  let forecastTemp = document.querySelectorAll(".card-temp");
  forecastTemp.forEach(function (temp) {
    let temperature = temp.innerHTML.replace("°", "");
    temp.innerHTML = `${Math.round((5 / 9) * (temperature - 32))}°`;
  });
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", changeF);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", changeC);

getWeatherCityData("Toronto");

// Search form JS
let form = document.querySelector("#searchform");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  resetLatLon();
  getWeatherCityData();
});
form.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    resetLatLon();
    getWeatherCityData();
  }
});

function resetLatLon() {
  lat = null;
  lon = null;
}

// API Update current weather & city info
function getWeatherCityData(defaultCity = null) {
  let city = defaultCity || document.querySelector("#searchCity").value;
  let apiKey = "46adf1c76d37271c2b55ccf797bdce14";
  let params = lat && lon ? `lat=${lat}&lon=${lon}` : `q=${city}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?${params}&appid=${apiKey}&units=metric`;

  axios
    .get(apiUrl)
    .then(setWeatherCityData)
    .catch(function (error) {
      if (!error.response) {
        console.log(error);
        return;
      }
      let status = error.response.status;
      if (status === 404) {
        alert("LA VILLE DOES NOT EXIST BORDEL");
        return;
      }
      alert("Something went wrong");
    });
}

function setWeatherCityData({ data }) {
  updateCity(data);
  updateIcon(data, ".main-icon");
  updateInfo(data);
  getFiveDaysWeather(data.name);
}

function updateCity(data) {
  let cityName = document.querySelector(".city");
  cityName.innerHTML = data.name;
  let cityWeather = document.querySelector("h2");
  cityWeather.innerHTML = data.weather[0].description;
  let cityTempC = document.querySelector(".temperature");
  cityTempC.innerHTML = Math.round(data.main.temp);
  temperature = data.main.temp;
  tempF = Math.round((temperature * 9) / 5 + 32);
  tempC = Math.round(temperature);
}

let imgCode = {
  "04n": "https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png",
  "10d": "https://ssl.gstatic.com/onebox/weather/64/rain_light.png",
  "10n": "https://ssl.gstatic.com/onebox/weather/64/rain_light.png",
  "04d": "https://ssl.gstatic.com/onebox/weather/64/cloudy.png",
  "03n": "https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png",
  "03d": "https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png",
  "01d": "https://ssl.gstatic.com/onebox/weather/64/sunny.png",
  "01n": "https://ssl.gstatic.com/onebox/weather/64/sunny.png",
  "09n": "https://ssl.gstatic.com/onebox/weather/64/rain_heavy.png",
  "02d": "https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png",
  "11d": "https://ssl.gstatic.com/onebox/weather/64/thunderstorms.png",
  "02n": "https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png",
};

function updateIcon(data, iconClass) {
  let cityIcon = document.querySelector(iconClass);
  cityIcon.src = imgCode[data.weather[0].icon];
}

function updateInfo(data) {
  let precipitationUpdate = document.querySelector(".precipitation");
  if (data.rain) {
    precipitationUpdate.innerHTML = data.rain[`1h`] * 100;
    console.log(data.rain[`1h`]);
  }
  if (!data.rain) {
    precipitationUpdate.innerHTML = 0;
  }
  let humidityUpdate = document.querySelector(".humidity");
  humidityUpdate.innerHTML = data.main.humidity;
  let windUpdate = document.querySelector(".wind");
  windUpdate.innerHTML = Math.round(data.wind.speed);
}

// Update 5 Days current city
function getFiveDaysWeather(city) {
  let apiKey = "46adf1c76d37271c2b55ccf797bdce14";
  let params = lat && lon ? `lat=${lat}&lon=${lon}` : `q=${city}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?${params}&cnt=5&appid=${apiKey}&units=metric`;

  axios
    .get(apiUrl)
    .then(setFiveDaysWeatherData)
    .catch(function (error) {
      if (!error.response) {
        console.log(error);
        return;
      }
    });
}

function setFiveDaysWeatherData({ data }) {
  let container = document.querySelector("#weather-week");
  container.innerHTML = "";
  data.list.forEach(function (item) {
    createForecastNode(item);
  });
}

function createForecastNode(item) {
  let container = document.querySelector("#weather-week");
  let element = document.createElement("div");
  element.classList.add("col-sm");

  let img = document.createElement("img");
  img.src = imgCode[item.weather[0].icon];
  img.width = 50;
  img.classList.add("forecast-icon");
  img.alt = "Sunny";

  let time = document.createElement("h5");
  time.classList.add("card-title");
  time.innerHTML = getTime(item.dt);

  let temperature = document.createElement("p");
  temperature.classList.add("card-temp");
  temperature.innerHTML = `${Math.round(item.main.temp)}°`;

  element.append(img);
  element.append(time);
  element.append(temperature);

  container.append(element);
}

function getTime(timestamp) {
  let date = new Date(timestamp * 1000);
  let options = { hour12: false, hour: "2-digit", minute: "2-digit" };
  return date.toLocaleTimeString([], options);
}

function showPosition(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  getWeatherCityData();
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector(".geoloc-btn");
button.addEventListener("click", getCurrentPosition);
