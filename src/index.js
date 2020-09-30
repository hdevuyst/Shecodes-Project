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

function updateCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#searchCity");
  let updateCity = document.querySelector("h1");
  updateCity.innerHTML = searchInput.value;
}
let form = document.querySelector("#searchform");
form.addEventListener("submit", updateCity);

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

function showWeather(response) {
  document.querySelector(updateCity).innerHTML = reponse.data.name;
  document.querySelector(".temperature").innerHTML = Math.round(
    response.data.main.temp
  );
}

let city = updateCity;
let apiKey = "46adf1c76d37271c2b55ccf797bdce14";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metrics`;

axios.get(apiUrl).then(showWeather);
