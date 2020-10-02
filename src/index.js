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

//form.addEventListener("submit", updateCity);
let temperature = 26;
let tempF = Math.round((temperature * 9) / 5 + 32);
let tempC = Math.round(temperature);

function changeF(event) {
  event.preventDefault();
  let currentTemp = document.querySelector(".temperature");
  currentTemp.innerHTML = tempF;
}

function changeC(event) {
  event.preventDefault();
  let currentTemp = document.querySelector(".temperature");
  currentTemp.innerHTML = tempC;
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", changeF);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", changeC);

//not working - see getWeatherCityData
function showWeather(response) {
  document.querySelector(".city").innerHTML = reponse.data.name;
  document.querySelector(".temperature").innerHTML = Math.round(
    response.data.main.temp
  );
}

// Mika
let form = document.querySelector("#searchform");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  getWeatherCityData();
});
form.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    getWeatherCityData();
  }
});

function getWeatherCityData() {
  let city = document.querySelector("#searchCity").value;
  let apiKey = "46adf1c76d37271c2b55ccf797bdce14";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

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
  updateIcon(data);
  console.log(data);
}

function updateCity(data) {
  let cityName = document.querySelector(".city");
  cityName.innerHTML = data.name;
  let cityWeather = document.querySelector("h2");
  cityWeather.innerHTML = data.weather[0].main;
  let cityTempC = document.querySelector(".temperature");
  cityTempC.innerHTML = Math.round(data.main.temp);
  temperature = data.main.temp;
  tempF = Math.round((temperature * 9) / 5 + 32);
  tempC = Math.round(temperature);
}

function updateIcon(data) {
  let imgCode = {
    "04n": "https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png",
    "03n": "https://ssl.gstatic.com/onebox/weather/64/sunny.png",
  };
  let cityIcon = document.querySelector(".main-icon");
  cityIcon.src = imgCode[data.weather[0].icon];
}
